#!/bin/bash
for img in og-image.jpg images/{about,blog,contact,consultancy,faq,services}-banner.jpg images/{thesis-supervision,tutoring-banner,tutoring-location,workshops-banner}.jpg images/{consultancy,thesis,tutoring}-hero.jpg images/locations/amsterdam-{zuid,centrum,noord,oost,west}.jpg; do [ -f "public/$img" ] && echo "✓ $img exists" || echo "✗ $img missing"; done
echo "Checking PDFs:" && for pdf in notes/dummy/{wiskunde,statistiek,natuurkunde,programmeren,web-development}/*.pdf; do [ -f "public/$pdf" ] && echo "✓ $pdf exists" || echo "✗ $pdf missing"; done
