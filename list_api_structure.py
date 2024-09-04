import os

def list_project_structure(file, path='.', level=0):
    relevant_dirs = ['pages', 'app', 'components', 'contexts', 'hooks', 'lib', 'prisma', 'public', 'stores']
    relevant_files = ['.env', '.env.local', 'next.config.mjs', 'package.json', 'tsconfig.json', 
                      'sentry.client.config.ts', 'sentry.edge.config.ts', 'sentry.server.config.ts', 
                      'tailwind.config.ts', 'instrumentation.ts']
    
    for item in sorted(os.listdir(path)):
        full_path = os.path.join(path, item)
        if os.path.isdir(full_path):
            if item in relevant_dirs or (level == 0 and not item.startswith('.')):
                file.write('  ' * level + item + '/\n')
                list_project_structure(file, full_path, level + 1)
        elif os.path.isfile(full_path):
            if level == 0 and item in relevant_files:
                file.write('  ' * level + item + '\n')
            elif 'pages' in full_path.split(os.sep) or 'api' in full_path.split(os.sep):
                file.write('  ' * level + item + '\n')

if __name__ == "__main__":
    output_file = 'project_structure.txt'
    with open(output_file, 'w') as f:
        f.write("Project structure:\n")
        list_project_structure(f)
    print(f"Project structure has been written to {output_file}")