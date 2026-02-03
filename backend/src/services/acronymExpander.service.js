import prisma from '../config/database.js';

export const expandAcronyms = async (clinicalData) => {
  try {
    // Get all acronyms from dictionary
    const acronyms = await prisma.acronymDictionary.findMany({
      where: { isActive: true },
    });
    
    // Create a map for quick lookup
    const acronymMap = new Map();
    acronyms.forEach(a => {
      acronymMap.set(a.acronym.toLowerCase(), a);
    });
    
    // Expand clinical data
    let expanded = [];
    
    for (const [key, value] of Object.entries(clinicalData)) {
      const acronym = acronymMap.get(key.toLowerCase());
      
      if (acronym) {
        let line = `${acronym.expansion}`;
        
        if (value !== null && value !== undefined) {
          line += `: ${value}`;
          
          if (acronym.unit) {
            line += ` ${acronym.unit}`;
          }
          
          // Add normal range context if available
          if (acronym.normalRangeMin !== null && acronym.normalRangeMax !== null) {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              if (numValue < acronym.normalRangeMin || numValue > acronym.normalRangeMax) {
                line += ` (Normal range: ${acronym.normalRangeMin}-${acronym.normalRangeMax} ${acronym.unit || ''})`;
              } else {
                line += ` (Normal)`;
              }
            }
          }
        }
        
        expanded.push(line);
      } else {
        // If no acronym found, just use the key-value as is
        expanded.push(`${key}: ${value}`);
      }
    }
    
    return expanded.join('\n');
  } catch (error) {
    console.error('Error expanding acronyms:', error);
    return JSON.stringify(clinicalData);
  }
};

export const getAcronyms = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    
    const where = {
      isActive: true,
    };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { acronym: { contains: search, mode: 'insensitive' } },
        { expansion: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const acronyms = await prisma.acronymDictionary.findMany({
      where,
      orderBy: { acronym: 'asc' },
    });
    
    res.json(acronyms);
  } catch (error) {
    next(error);
  }
};

export const expandText = async (req, res, next) => {
  try {
    const { text, clinicalData } = req.body;
    
    if (clinicalData) {
      const expanded = await expandAcronyms(clinicalData);
      return res.json({ expanded });
    }
    
    // If just text, try to find and expand acronyms
    const acronyms = await prisma.acronymDictionary.findMany({
      where: { isActive: true },
    });
    
    let expandedText = text;
    acronyms.forEach(a => {
      const regex = new RegExp(`\\b${a.acronym}\\b`, 'gi');
      expandedText = expandedText.replace(regex, `${a.acronym} (${a.expansion})`);
    });
    
    res.json({ expanded: expandedText });
  } catch (error) {
    next(error);
  }
};

export const bulkImportAcronyms = async (req, res, next) => {
  try {
    const { acronyms } = req.body;
    
    // Validate input
    if (!Array.isArray(acronyms) || acronyms.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid input. Expected array of acronyms.' 
      });
    }
    
    // Validate each acronym object
    const validAcronyms = [];
    const errors = [];
    
    acronyms.forEach((item, index) => {
      if (!item.acronym || !item.expansion) {
        errors.push(`Item ${index}: Missing required fields (acronym, expansion)`);
        return;
      }
      
      validAcronyms.push({
        acronym: item.acronym,
        expansion: item.expansion,
        unit: item.unit || null,
        normalRangeMin: item.normalRangeMin || null,
        normalRangeMax: item.normalRangeMax || null,
        category: item.category || 'general',
        clinicId: null, // Global acronyms
        isActive: true,
      });
    });
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation errors',
        details: errors 
      });
    }
    
    // Check for existing acronyms to avoid duplicates
    const existingAcronyms = await prisma.acronymDictionary.findMany({
      where: {
        acronym: {
          in: validAcronyms.map(a => a.acronym),
        },
      },
      select: { acronym: true },
    });
    
    const existingSet = new Set(existingAcronyms.map(a => a.acronym));
    const newAcronyms = validAcronyms.filter(a => !existingSet.has(a.acronym));
    
    // Bulk insert new acronyms
    const result = await prisma.acronymDictionary.createMany({
      data: newAcronyms,
      skipDuplicates: true,
    });
    
    res.json({
      success: true,
      imported: result.count,
      skipped: validAcronyms.length - result.count,
      total: validAcronyms.length,
      message: `Successfully imported ${result.count} acronyms. Skipped ${validAcronyms.length - result.count} duplicates.`,
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    next(error);
  }
};
