import os
from tree_format import format_tree
from git import Repo
import re

def should_ignore(path):
    # Patterns specific to Angular projects
    ignore_patterns = [
        r'\.git',
        r'\.github',
        r'node_modules',
        r'dist',
        r'coverage',
        r'\.angular',
        r'\.vscode/settings\.json$',
        r'\.DS_Store',
        r'__pycache__',
        r'\.pyc$',
        r'\.env',
        r'\.idea',
        r'\.next',
        r'\.workspace',
        r'\.(jpg|jpeg|png|gif|ico|svg)$'  # Ignore image files in the structure
    ]
    
    # Specific files that should always be shown even if they match above patterns
    always_show = [
        'angular.json',
        'package.json',
        'package-lock.json',
        'tsconfig.json',
        'tsconfig.app.json',
        'tsconfig.spec.json',
        '.gitignore',
        '.editorconfig',
        'README.md',
        'CONTRIBUTING.md',
        'CODE_OF_CONDUCT.md',
        'netlify.toml'
    ]
    
    basename = os.path.basename(path)
    if basename in always_show:
        return False
        
    return any(re.search(pattern, path) for pattern in ignore_patterns)

def get_tree_structure(path):
    def _get_tree(dir_path):
        entries = []
        try:
            with os.scandir(dir_path) as it:
                # Sort entries: directories first, then files, both alphabetically
                sorted_entries = sorted(it, 
                                     key=lambda e: (not e.is_dir(), e.name.lower()))
                
                for entry in sorted_entries:
                    if should_ignore(entry.path):
                        continue
                    if entry.is_dir():
                        children = _get_tree(entry.path)
                        if children:  # Only add directories that have visible contents
                            entries.append((f"📁 {entry.name}", children))
                    else:
                        entries.append((f"📄 {entry.name}", []))
        except PermissionError:
            return []
        return entries
    
    return _get_tree(path)

def update_readme(tree_structure):
    # Read existing README content
    try:
        with open('README.md', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        content = '# Project Structure\n\n'

    # Generate tree structure string
    tree_string = format_tree(('', tree_structure), format_node=lambda x: x[0])
    
    # Prepare the new structure section
    structure_section = '''## Project Structure

The project structure is organized as follows:

```
''' + tree_string + '''```

- 📁 Folders
- 📄 Files
'''

    # Update or add project structure section
    if '## Project Structure' in content:
        # Replace existing structure section
        content = re.sub(
            r'## Project Structure[\s\S]*?(?=##|$)',
            structure_section,
            content
        )
    else:
        # Add new structure section
        content += '\n' + structure_section

    # Write updated content
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # Get repository root
    repo = Repo('.', search_parent_directories=True)
    repo_root = repo.working_tree_dir
    
    # Generate tree structure
    tree_structure = get_tree_structure(repo_root)
    
    # Update README
    update_readme(tree_structure)

if __name__ == '__main__':
    main()