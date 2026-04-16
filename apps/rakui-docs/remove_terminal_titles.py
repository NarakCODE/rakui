import re
from pathlib import Path

CONTENT_DIR = Path("/Users/narak/Documents/narakcode/next-js/rakui-docs/content")

removed_count = 0
files_changed = []

for path in sorted(CONTENT_DIR.rglob("*.mdx")):
    content = path.read_text(encoding="utf-8")
    original = content
    
    # Remove title="Terminal" from bash code block fences
    # Match ```bash followed by optional whitespace and title="Terminal"
    pattern = re.compile(r'(```bash)\s+title="Terminal"', re.MULTILINE)
    
    new_content, count = pattern.subn(r'\1', content)
    
    if count:
        path.write_text(new_content, encoding="utf-8")
        removed_count += count
        files_changed.append(str(path.relative_to(CONTENT_DIR)))

print("# Removed title=\"Terminal\" from CLI bash blocks\n")
print(f"Files changed: {len(files_changed)}")
print(f"Total replacements: {removed_count}\n")

for f in files_changed:
    print(f"  - {f}")
