import os

def list_structure(path='.', level=0):
    for item in os.listdir(path):
        if item.startswith('.'):
            continue
        print('  ' * level + item)
        if os.path.isdir(os.path.join(path, item)):
            list_structure(os.path.join(path, item), level + 1)

if __name__ == "__main__":
    print("Project structure:")
    list_structure()