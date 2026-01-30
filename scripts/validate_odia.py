#!/usr/bin/env python3
"""
Validate Odia translations for completeness and quality
"""

import json
import re
from pathlib import Path
from typing import List, Dict

ODIA_DIR = Path(__file__).parent.parent / 'backend' / 'prisma' / 'seeds' / 'odia'

def validate_template(template: Dict, index: int) -> List[str]:
    """Validate a single Odia template"""
    
    issues = []
    
    # Required fields
    required_fields = [
        'eventName', 'channel', 'language', 'greeting', 'context',
        'explanation', 'next_steps', 'reassurance', 'call_to_action', 'contact_info'
    ]
    
    for field in required_fields:
        if field not in template:
            issues.append(f"Template {index}: Missing field '{field}'")
        elif not template[field] or not str(template[field]).strip():
            issues.append(f"Template {index}: Empty field '{field}'")
    
    # Language check
    if template.get('language') != 'odia':
        issues.append(f"Template {index}: Language should be 'odia', got '{template.get('language')}'")
    
    # Variable placeholder preservation check
    variable_pattern = r'\{\{[^}]+\}\}'
    
    for field in ['greeting', 'context', 'explanation', 'next_steps', 'reassurance', 'call_to_action', 'contact_info']:
        if field in template:
            text = template[field]
            # Check if variables are preserved
            variables = re.findall(variable_pattern, text)
            if variables:
                # Ensure proper format
                for var in variables:
                    if not re.match(r'\{\{[a-z_]+\}\}', var):
                        issues.append(f"Template {index}: Invalid variable format in {field}: {var}")
    
    # Odia script check (basic - just check if Odia characters present)
    odia_range = r'[\u0B00-\u0B7F]'  # Odia Unicode range
    
    has_odia = False
    for field in ['greeting', 'explanation', 'next_steps', 'reassurance']:
        if field in template:
            if re.search(odia_range, template[field]):
                has_odia = True
                break
    
    if not has_odia:
        issues.append(f"Template {index}: No Odia script detected - may not be translated")
    
    return issues

def validate_file(file_path: Path) -> Dict:
    """Validate all templates in a file"""
    
    print(f"\n📄 Validating: {file_path.name}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        templates = json.load(f)
    
    all_issues = []
    
    for i, template in enumerate(templates, 1):
        issues = validate_template(template, i)
        all_issues.extend(issues)
    
    return {
        'file': file_path.name,
        'total_templates': len(templates),
        'issues': all_issues,
        'valid': len(all_issues) == 0
    }

def main():
    """Main validation workflow"""
    
    print("=" * 70)
    print("🔍 ODIA TRANSLATION VALIDATION")
    print("=" * 70)
    
    if not ODIA_DIR.exists():
        print(f"\n❌ Odia directory not found: {ODIA_DIR}")
        print("   Run translation script first: python scripts/translate_to_odia.py")
        return
    
    odia_files = list(ODIA_DIR.glob('*.json'))
    
    if not odia_files:
        print(f"\n❌ No Odia translation files found in {ODIA_DIR}")
        return
    
    print(f"\n📋 Found {len(odia_files)} files to validate\n")
    
    results = []
    total_templates = 0
    total_issues = 0
    
    for file_path in odia_files:
        result = validate_file(file_path)
        results.append(result)
        total_templates += result['total_templates']
        total_issues += len(result['issues'])
        
        if result['valid']:
            print(f"   ✅ VALID - {result['total_templates']} templates")
        else:
            print(f"   ⚠️  ISSUES FOUND - {len(result['issues'])} problems")
            for issue in result['issues'][:5]:  # Show first 5
                print(f"      • {issue}")
            if len(result['issues']) > 5:
                print(f"      ... and {len(result['issues']) - 5} more")
    
    print("\n" + "=" * 70)
    print("📊 VALIDATION SUMMARY")
    print("=" * 70)
    print(f"Total files validated: {len(results)}")
    print(f"Total templates: {total_templates}")
    print(f"Total issues: {total_issues}")
    
    if total_issues == 0:
        print("\n✅ ALL TEMPLATES VALID! Ready for production.")
    else:
        print(f"\n⚠️  {total_issues} issues need attention")
        print("\nRecommendations:")
        print("1. Review templates with missing Odia script")
        print("2. Check variable placeholder preservation")
        print("3. Validate medical terminology with native speaker")

if __name__ == '__main__':
    main()
