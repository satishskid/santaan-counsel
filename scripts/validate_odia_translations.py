"""
Validation script for Odia template translations
Ensures quality and completeness before database seeding
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Tuple


def validate_template(template: Dict, original: Dict = None) -> Tuple[bool, List[str]]:
    """
    Validate a single Odia template
    
    Returns:
        (is_valid, list_of_errors)
    """
    errors = []
    
    # Required fields
    required_fields = [
        'eventName', 'channel', 'language', 'greeting', 
        'context', 'explanation', 'next_steps', 
        'reassurance', 'call_to_action', 'contact_info'
    ]
    
    for field in required_fields:
        if field not in template:
            errors.append(f"Missing required field: {field}")
        elif not template[field] or template[field].strip() == "":
            errors.append(f"Empty field: {field}")
    
    # Language must be 'odia'
    if template.get('language') != 'odia':
        errors.append(f"Language must be 'odia', got: {template.get('language')}")
    
    # Check for variable placeholders preservation
    if original:
        for field in ['greeting', 'context', 'explanation', 'next_steps', 'reassurance', 'call_to_action', 'contact_info']:
            if field in original and field in template:
                original_vars = set(re.findall(r'\{\{[^}]+\}\}', original[field]))
                translated_vars = set(re.findall(r'\{\{[^}]+\}\}', template[field]))
                
                if original_vars != translated_vars:
                    errors.append(f"Variable mismatch in {field}: {original_vars} vs {translated_vars}")
    
    # Check for Odia script (should contain at least some Odia characters)
    odia_pattern = re.compile(r'[\u0B00-\u0B7F]+')
    has_odia = any(
        odia_pattern.search(str(template.get(field, ''))) 
        for field in ['greeting', 'context', 'explanation', 'next_steps', 'reassurance']
    )
    
    if not has_odia:
        errors.append("Template does not contain Odia script characters")
    
    return (len(errors) == 0, errors)


def validate_batch(file_path: Path) -> Dict:
    """
    Validate all templates in a file
    
    Returns:
        Validation report dict
    """
    print(f"\n📋 Validating: {file_path.name}")
    print("=" * 70)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        templates = json.load(f)
    
    total = len(templates)
    valid = 0
    invalid = 0
    all_errors = []
    
    for i, template in enumerate(templates, 1):
        is_valid, errors = validate_template(template)
        
        if is_valid:
            valid += 1
            print(f"✅ [{i}/{total}] {template.get('eventName', 'Unknown')}")
        else:
            invalid += 1
            print(f"❌ [{i}/{total}] {template.get('eventName', 'Unknown')}")
            for error in errors:
                print(f"   → {error}")
            all_errors.append({
                'template': template.get('eventName', 'Unknown'),
                'errors': errors
            })
    
    report = {
        'file': file_path.name,
        'total': total,
        'valid': valid,
        'invalid': invalid,
        'success_rate': valid / total * 100 if total > 0 else 0,
        'errors': all_errors
    }
    
    print("\n" + "=" * 70)
    print(f"📊 Validation Summary:")
    print(f"   Total templates: {total}")
    print(f"   ✅ Valid: {valid} ({report['success_rate']:.1f}%)")
    print(f"   ❌ Invalid: {invalid}")
    
    return report


def main():
    """Main validation workflow"""
    print("🔍 Odia Template Validation")
    print("=" * 70)
    
    seeds_dir = Path(__file__).parent.parent / "backend" / "prisma" / "seeds"
    
    # Find all Odia template files
    odia_files = list(seeds_dir.glob("*odia*.json"))
    
    if not odia_files:
        print("⚠️  No Odia template files found!")
        print(f"   Looking in: {seeds_dir}")
        return
    
    print(f"📁 Found {len(odia_files)} Odia template file(s)")
    
    all_reports = []
    
    for file in odia_files:
        report = validate_batch(file)
        all_reports.append(report)
    
    # Overall summary
    print("\n" + "=" * 70)
    print("🎯 OVERALL SUMMARY")
    print("=" * 70)
    
    total_templates = sum(r['total'] for r in all_reports)
    total_valid = sum(r['valid'] for r in all_reports)
    total_invalid = sum(r['invalid'] for r in all_reports)
    
    print(f"Total templates validated: {total_templates}")
    print(f"✅ Valid: {total_valid} ({total_valid/total_templates*100:.1f}%)")
    print(f"❌ Invalid: {total_invalid}")
    
    if total_invalid > 0:
        print(f"\n⚠️  {total_invalid} templates need attention before deployment!")
        print("\nMost common issues:")
        
        error_counts = {}
        for report in all_reports:
            for error_item in report['errors']:
                for error in error_item['errors']:
                    error_type = error.split(':')[0]
                    error_counts[error_type] = error_counts.get(error_type, 0) + 1
        
        for error_type, count in sorted(error_counts.items(), key=lambda x: x[1], reverse=True)[:5]:
            print(f"   • {error_type}: {count} occurrences")
    else:
        print("\n🎉 All templates passed validation! Ready for deployment.")
    
    # Save validation report
    report_path = Path(__file__).parent.parent / "validation_report_odia.json"
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(all_reports, f, ensure_ascii=False, indent=2)
    
    print(f"\n📄 Detailed report saved to: {report_path}")


if __name__ == "__main__":
    main()
