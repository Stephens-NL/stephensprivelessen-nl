import os

def get_size_string(size_bytes):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} GB"

def list_project_structure(file, path='.', prefix=''):
    items = sorted(os.listdir(path))
    for i, item in enumerate(items):
        full_path = os.path.join(path, item)
        is_last = (i == len(items) - 1)
        
        if item.startswith('.') and item not in ['.env', '.env.local']:
            continue
        
        if os.path.isdir(full_path):
            if item not in ['node_modules', '.next']:
                file.write(f"{prefix}{'└---' if is_last else '├---'}{item}/\n")
                list_project_structure(file, full_path, prefix + ('    ' if is_last else '│   '))
        else:
            size = os.path.getsize(full_path)
            size_str = get_size_string(size)
            file.write(f"{prefix}{'└---' if is_last else '├---'}{item} ({size_str})\n")

if __name__ == "__main__":
    output_file = 'project_structure.txt'
    with open(output_file, 'w') as f:
        f.write("Project structure:\n")
        list_project_structure(f)
    print(f"Project structure has been written to {output_file}")