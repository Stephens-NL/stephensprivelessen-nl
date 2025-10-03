# Notability Dashboard Setup - Google Apps Script

## 🚀 Snelle Setup (15 minuten)

### Stap 1: Google Apps Script aanmaken

1. Ga naar [script.google.com](https://script.google.com)
2. Klik op "Nieuw project"
3. Verwijder de standaard code en plak de inhoud van `Code.gs`
4. Klik op "Bestand" → "Nieuw" → "HTML"
5. Noem het bestand `index` en plak de inhoud van `index.html`

### Stap 2: Google Drive structuur opzetten

Maak deze folder structuur in je Google Drive:

```
Google Drive: lessen@stephensprivelessen.nl
└── Notability/
    ├── Rachel/
    │   ├── 2024-10-01__Calculus__v001.pdf
    │   ├── 2024-10-08__Calculus__v002.pdf
    │   └── 2024-10-15__Calculus__v003.pdf
    ├── Sam/
    │   ├── 2024-10-02__Statistics__v001.pdf
    │   └── 2024-10-09__Statistics__v002.pdf
    ├── Rachel_2009-01-03/  (als er meerdere Rachel's zijn)
    │   └── 2024-10-01__Physics__v001.pdf
    └── ...
```

### Stap 3: Apps Script deployen

1. In Apps Script, klik op "Implementeren" → "Nieuwe implementatie"
2. Kies type: "Web-app"
3. Instellingen:
   - **Uitvoeren als**: Ik (jouw email)
   - **Wie heeft toegang**: Iedereen met de link
4. Klik "Implementeren"
5. Kopieer de web-app URL

### Stap 4: Testen

1. Open de web-app URL in een nieuwe tab
2. Test met een leerlingnaam
3. Controleer of de bestanden correct worden getoond

## 📁 Folder Conventies

### Leerling Mappen
- **Simpel**: `Voornaam` (bijv. `Rachel`)
- **Met geboortedatum**: `Voornaam_YYYY-MM-DD` (bijv. `Rachel_2009-01-03`)
- **Uniek**: Voeg een korte code toe als er conflicten zijn (bijv. `Rachel_A7`)

### Bestandsnamen
- **Aanbevolen format**: `YYYY-MM-DD__topic__v001.pdf`
- **Voorbeelden**:
  - `2024-10-01__Calculus__v001.pdf`
  - `2024-10-08__Statistics__v002.pdf`
  - `2024-10-15__Physics__v001.pdf`

## 🔧 Features

### ✅ Wat werkt nu:
- **Zoeken op voornaam** (case-insensitive)
- **Geboortedatum filter** (optioneel, format: DD-MM)
- **PDF-only filter**
- **Automatische sortering** (nieuwste eerst)
- **Directe Google Drive links** (bekijken + downloaden)
- **Responsive design** (mobiel + desktop)
- **Privacy-vriendelijk** (geen database, geen opslag)

### 🎯 Geavanceerde features (optioneel):
- **QR codes** per leerling
- **Magic links** (directe toegang zonder zoeken)
- **Ouder-toegang** (read-only voor ouders)
- **AI samenvattingen** (later uit te breiden)

## 🔒 Privacy & GDPR

### Wat we NIET doen:
- ❌ Geen database met persoonsgegevens
- ❌ Geen wachtwoorden of BSN-achtige data
- ❌ Geen tracking of analytics
- ❌ Geen opslag van zoekopdrachten

### Wat we WEL doen:
- ✅ Alleen voornaam + geboortedatum (optioneel)
- ✅ Directe Google Drive integratie
- ✅ Geen server-side opslag
- ✅ Transparante privacy policy

## 🚀 Deployment Opties

### Optie A: Google Apps Script (Aanbevolen)
- ✅ Gratis
- ✅ Geen server nodig
- ✅ Draait op jouw Google account
- ✅ Automatische updates

### Optie B: Vercel/Netlify (Later)
- Voor als je meer controle wilt
- Kan gecombineerd worden met database
- Meer geavanceerde features mogelijk

## 📱 Gebruik door Leerlingen

### Eerste keer:
1. Leerling krijgt link van jou
2. Voert voornaam in
3. Optioneel: geboortedatum (DD-MM)
4. Kiest juiste map (als er meerdere zijn)
5. Ziet alle notities

### Volgende keren:
- Direct naar link
- Voornaam invullen
- Notities bekijken/downloaden

## 🔧 Troubleshooting

### "Folder 'Notability' niet gevonden"
- Controleer of de map exact `Notability` heet
- Controleer of je ingelogd bent met het juiste Google account

### "Geen map gevonden voor [naam]"
- Controleer spelling van de mapnaam
- Controleer of de map binnen `Notability/` staat
- Probeer met geboortedatum (DD-MM format)

### Bestanden worden niet getoond
- Controleer of er bestanden in de map staan
- Controleer of de bestanden leesbaar zijn
- Probeer de "Alleen PDF's" optie

## 📞 Support

Voor vragen of problemen:
- Check de Google Apps Script logs
- Test met de `testAccess()` functie
- Controleer Google Drive permissies

## 🎯 Volgende Stappen

1. **Test de basis functionaliteit**
2. **Organiseer je Drive mappen**
3. **Deel de link met leerlingen**
4. **Verzamel feedback**
5. **Voeg geavanceerde features toe** (QR codes, magic links, etc.)

---

**Klaar om te beginnen?** Volg de stappen hierboven en je hebt binnen 15 minuten een werkende notities dashboard! 🎉
