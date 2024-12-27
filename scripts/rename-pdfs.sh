#!/bin/bash

# Create the dummy directory if it doesn't exist
mkdir -p public/notes/dummy

# Array of source files (your existing PDFs)
SOURCE_FILES=(
    "1014.pdf"
    "2316b39e-aa92-4901-bb5e-18efc962c47d.pdf"
    "ABC-REGEL SEM.pdf"
    "ANOVA1.pdf"
    "Begroting.pdf"
    "Caspar.pdf"
    "Create Next App.pdf"
    "grid.pdf"
    "Hand-in3.pdf"
    "MIMI_1.pdf"
    "period1-tutorial4.pdf"
    "plotexample.pdf"
    "sparseModels.pdf"
    "tentamen-16-december-2014-antwoorden.pdf"
    "va-c33.pdf"
    # Add more source files as needed
)

# Array of destination filenames (matching subjectNotes in SubjectSelection.tsx)
DEST_FILES=(
    "calculus-example.pdf"
    "linear-algebra-example.pdf"
    "statistics-example.pdf"
    "probability-example.pdf"
    "physics-university-example.pdf"
    "wiskunde-hbo-example.pdf"
    "statistiek-hbo-example.pdf"
    "natuurkunde-hbo-example.pdf"
    "wiskunde-a-vwo-example.pdf"
    "wiskunde-b-vwo-example.pdf"
    "wiskunde-c-vwo-example.pdf"
    "wiskunde-d-vwo-example.pdf"
    "natuurkunde-vwo-example.pdf"
    "informatica-vwo-example.pdf"
    "python-example.pdf"
    "java-example.pdf"
    "javascript-example.pdf"
    "cpp-example.pdf"
    "csharp-example.pdf"
    "r-example.pdf"
    "matlab-example.pdf"
    "sql-example.pdf"
    "html-css-example.pdf"
    "react-example.pdf"
)

cd public/notes/dummy

# Copy and rename files
for i in "${!DEST_FILES[@]}"; do
    if [ $i -lt ${#SOURCE_FILES[@]} ]; then
        if [ -f "../${SOURCE_FILES[$i]}" ]; then
            cp "../${SOURCE_FILES[$i]}" "${DEST_FILES[$i]}"
            echo "Copied ${SOURCE_FILES[$i]} to ${DEST_FILES[$i]}"
        else
            echo "Source file ${SOURCE_FILES[$i]} not found"
        fi
    fi
done

echo "Done renaming files!" 