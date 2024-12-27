import os
from jinja2 import Template
import pdfkit
import json
import platform

# Define the subjects and their example problems
subjects_data = {
    # University Level
    'Calculus': {
        'problem': 'Find the derivative of f(x) = x³ + 2x² - 4x + 1 and evaluate it at x = 2.'
    },
    'Linear Algebra': {
        'problem': 'Solve the system of equations:\n3x + 2y = 12\n2x - y = 3'
    },
    'Statistics': {
        'problem': 'Calculate the mean, median, and standard deviation for the dataset: [12, 15, 18, 22, 25, 27, 30]'
    },
    'Probability': {
        'problem': 'If P(A) = 0.3, P(B) = 0.4, and P(A∩B) = 0.1, find P(A∪B).'
    },
    'Physics': {
        'problem': 'A car accelerates from 0 to 60 km/h in 8 seconds. Calculate the average acceleration.'
    },
    # HBO Level
    'Wiskunde': {
        'problem': 'Los op: 2x² + 5x - 12 = 0'
    },
    'Statistiek': {
        'problem': 'Bereken het gemiddelde en de standaardafwijking van: [10, 12, 15, 15, 18, 20]'
    },
    'Natuurkunde': {
        'problem': 'Een voorwerp valt van 20 meter hoogte. Bereken de eindsnelheid.'
    },
    # VWO Level
    'Wiskunde A': {
        'problem': 'Bereken de kans op precies 3 keer kop bij 5 keer munten werpen.'
    },
    'Wiskunde B': {
        'problem': 'Bepaal de vergelijking van de raaklijn aan f(x) = x² + 3x in x = 2.'
    },
    'Wiskunde C': {
        'problem': 'Los op: log₂(x + 3) = 4'
    },
    'Wiskunde D': {
        'problem': 'Bereken de oppervlakte tussen de curves y = x² en y = 2x van x = 0 tot x = 2.'
    },
    'Natuurkunde VWO': {
        'problem': 'Een condensator van 100 µF wordt opgeladen met een spanning van 12V. Bereken de opgeslagen energie.'
    },
    'Informatica': {
        'problem': 'Schrijf een algoritme om te controleren of een getal een priemgetal is.'
    },
    # Programming Languages
    'Python': {
        'problem': 'Write a function to find the nth Fibonacci number using recursion.'
    },
    'Java': {
        'problem': 'Create a class representing a Bank Account with methods for deposit and withdrawal.'
    },
    'JavaScript': {
        'problem': 'Write an async function to fetch data from an API and handle errors.'
    },
    'C++': {
        'problem': 'Implement a templated function to find the maximum element in an array.'
    },
    'C#': {
        'problem': 'Create a generic List class with basic operations (add, remove, find).'
    },
    'R': {
        'problem': 'Create a function to perform linear regression on a given dataset.'
    },
    'MATLAB': {
        'problem': 'Write a script to solve a system of differential equations.'
    },
    'SQL': {
        'problem': 'Write a query to find the top 5 customers by order value including their details.'
    },
    'HTML/CSS': {
        'problem': 'Create a responsive navigation bar with dropdown menus.'
    },
    'React': {
        'problem': 'Create a custom hook to handle form validation and submission.'
    }
}

def get_wkhtmltopdf_path():
    system = platform.system().lower()
    if system == 'windows':
        return r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
    elif system == 'darwin':  # macOS
        # Use the path from `which wkhtmltopdf` command
        return '/opt/homebrew/bin/wkhtmltopdf'  # This is the typical path on M1 Macs
        # or '/usr/local/bin/wkhtmltopdf'  # This is the typical path on Intel Macs
    else:  # Linux
        return '/usr/bin/wkhtmltopdf'

def sanitize_filename(filename):
    # Replace problematic characters
    return filename.lower().replace('/', '-').replace('\\', '-').replace(' ', '-').replace('#', 'sharp')

def generate_pdfs():
    # Get the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    template_path = os.path.join(script_dir, 'note-template.html')
    output_dir = os.path.join(project_root, 'public', 'notes')
    temp_dir = os.path.join(project_root, 'temp')

    # Create necessary directories
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(temp_dir, exist_ok=True)

    # Read the HTML template
    try:
        with open(template_path, 'r', encoding='utf-8') as file:
            template_str = file.read()
    except FileNotFoundError:
        print(f"Template file not found at: {template_path}")
        return

    # Create Jinja2 template
    template = Template(template_str)

    # Configure pdfkit options
    wkhtmltopdf_path = get_wkhtmltopdf_path()
    config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)
    
    options = {
        'encoding': 'UTF-8',
        'page-size': 'A4',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'enable-local-file-access': None
    }

    # Generate PDF for each subject
    for subject, data in subjects_data.items():
        print(f"Generating PDF for {subject}...")
        
        # Render the template with subject data
        html_content = template_str.replace('[SUBJECT]', subject).replace('[EXAMPLE PROBLEM PLACEHOLDER]', data['problem'])
        
        # Create sanitized filenames
        safe_subject = sanitize_filename(subject)
        temp_html = os.path.join(temp_dir, f'temp_{safe_subject}.html')
        output_pdf = os.path.join(output_dir, f'{safe_subject}-example.pdf')

        try:
            # Save the HTML content to a temporary file
            with open(temp_html, 'w', encoding='utf-8') as f:
                f.write(html_content)

            # Convert HTML to PDF
            pdfkit.from_file(temp_html, output_pdf, options=options, configuration=config)
            print(f"Created {output_pdf}")

        except Exception as e:
            print(f"Error generating PDF for {subject}: {str(e)}")
        
        finally:
            # Clean up temporary HTML file
            if os.path.exists(temp_html):
                os.remove(temp_html)

    # Clean up temp directory
    try:
        os.rmdir(temp_dir)
    except:
        pass

    print("\nPDF generation complete!")

if __name__ == "__main__":
    generate_pdfs() 