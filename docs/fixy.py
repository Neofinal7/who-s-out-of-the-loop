#!/usr/bin/env python3
"""
Fix the back button on the players screen to properly reset the match state.
Run this script from the docs folder.
"""

import re
from pathlib import Path

# Paths
base = Path(__file__).parent
index_file = base / "index.html"

def fix_back_button(html):
    """Change the players screen back button to call goHome() instead of show('s-home')."""
    # Look for the button with id="btn-back-players"
    pattern = r'<button\s+class="btn btn-ghost"\s+id="btn-back-players"\s+onclick="show\(\'s-home\'\)">← رجوع</button>'
    replacement = '<button class="btn btn-ghost" id="btn-back-players" onclick="goHome()">← رجوع</button>'
    new_html = re.sub(pattern, replacement, html)
    if new_html == html:
        print("Pattern not found. Trying a more flexible match...")
        # Try a more flexible pattern
        pattern = r'<button[^>]*id="btn-back-players"[^>]*onclick="show\(\'s-home\'\)"[^>]*>.*?</button>'
        replacement = '<button class="btn btn-ghost" id="btn-back-players" onclick="goHome()">← رجوع</button>'
        new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)
    return new_html

def main():
    print("Reading index.html...")
    with open(index_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    print("Fixing back button...")
    new_html = fix_back_button(html)
    
    if new_html == html:
        print("Warning: Could not find the back button. Check the HTML.")
    else:
        print("Back button updated.")
    
    print("Writing changes...")
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("Done! The back button now calls goHome(), resetting match state.")

if __name__ == "__main__":
    main()
