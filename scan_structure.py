import os
import json

def scan_directory(directory):
    structure = {}
    for root, dirs, files in os.walk(directory):
        path = root.split(os.sep)
        current = structure
        for folder in path[1:]:
            if folder not in current:
                current[folder] = {}
            current = current[folder]
        for file in files:
            current[file] = None
    return structure

def main():
    project_root = '.'  # Current directory
    output_file = 'project_structure.json'

    structure = scan_directory(project_root)

    with open(output_file, 'w') as f:
        json.dump(structure, f, indent=2)

    print(f"Project structure has been saved to {output_file}")

if __name__ == "__main__":
    main()