# Google Apps Script Setup - Veilige Aanpak Zonder Service Account Keys

Deze aanpak gebruikt Google Apps Script in plaats van service account keys, wat veiliger is en geen organisatie policy problemen geeft.

## 🚀 **Snelle Setup (10 minuten)**

### **Stap 1: Google Apps Script Project Aanmaken**

1. **Ga naar [script.google.com](https://script.google.com)**
2. **Klik "Nieuw project"**
3. **Verwijder de standaard code** in `Code.gs`
4. **Plak de code** uit `scripts/apps-script-solution/Code.gs`

### **Stap 2: HTML Bestand Aanmaken**

1. **Klik "Bestand" → "Nieuw" → "HTML"**
2. **Noem het bestand `index`**
3. **Plak de HTML code** uit `scripts/apps-script-solution/index.html`

### **Stap 3: Google Drive Structuur**

Zorg dat je Google Drive deze structuur heeft:

```
Google Drive: lessen@stephensprivelessen.nl
└── Notability/
    ├── Rachel/
    │   ├── 2024-10-01__Calculus__v001.pdf
    │   └── 2024-10-08__Calculus__v002.pdf
    ├── Sam/
    │   ├── 2024-10-02__Statistics__v001.pdf
    │   └── 2024-10-09__Statistics__v002.pdf
    └── ...
```

### **Stap 4: Apps Script Deployen**

1. **Klik "Implementeren" → "Nieuwe implementatie"**
2. **Kies type: "Web-app"**
3. **Instellingen:**
   - **Uitvoeren als**: Ik (jouw email)
   - **Wie heeft toegang**: Iedereen met de link
4. **Klik "Implementeren"**
5. **Kopieer de web-app URL**

### **Stap 5: Testen**

1. **Open de web-app URL** in een nieuwe tab
2. **Test met een leerlingnaam**
3. **Controleer of bestanden correct worden getoond**

## ✅ **Voordelen van deze Aanpak**

- **🔒 Veilig**: Geen service account keys nodig
- **🚫 Geen Policy Problemen**: Werkt met organisatie restrictions
- **⚡ Snel**: Directe Google Drive toegang
- **🆓 Gratis**: Geen hosting kosten
- **🔧 Eenvoudig**: Geen complexe setup

## 📁 **Folder Conventies**

### **Leerling Mappen**
- **Simpel**: `Voornaam` (bijv. `Rachel`)
- **Met geboortedatum**: `Voornaam_YYYY-MM-DD` (bijv. `Rachel_2009-01-03`)
- **Uniek**: Voeg een korte code toe als er conflicten zijn (bijv. `Rachel_A7`)

### **Bestandsnamen**
- **Aanbevolen**: `YYYY-MM-DD__topic__v001.pdf`
- **Voorbeelden**:
  - `2024-10-01__Calculus__v001.pdf`
  - `2024-10-08__Statistics__v002.pdf`

## 🔧 **Features**

### **✅ Wat werkt:**
- **Zoeken op voornaam** (case-insensitive)
- **Automatische sortering** (nieuwste eerst)
- **Directe Google Drive links** (bekijken + downloaden)
- **Responsive design** (mobiel + desktop)
- **Session info parsing** uit bestandsnamen
- **Privacy-vriendelijk** (geen database, geen opslag)

## 📱 **Gebruik door Leerlingen**

### **Eerste keer:**
1. Leerling krijgt link van jou
2. Voert voornaam in
3. Kiest juiste map (als er meerdere zijn)
4. Ziet alle notities met download links

### **Volgende keren:**
- Direct naar link
- Voornaam invullen
- Notities bekijken/downloaden

## 🔒 **Privacy & GDPR**

### **Wat we NIET doen:**
- ❌ Geen database met persoonsgegevens
- ❌ Geen wachtwoorden of BSN-achtige data
- ❌ Geen tracking of analytics
- ❌ Geen opslag van zoekopdrachten

### **Wat we WEL doen:**
- ✅ Alleen voornaam voor identificatie
- ✅ Directe Google Drive integratie
- ✅ Geen server-side opslag
- ✅ Transparante privacy policy

## 🚨 **Troubleshooting**

### **"Folder 'Notability' niet gevonden"**
- Controleer of de map exact `Notability` heet
- Controleer of je ingelogd bent met het juiste Google account

### **"Geen map gevonden voor [naam]"**
- Controleer spelling van de mapnaam
- Controleer of de map binnen `Notability/` staat

### **Bestanden worden niet getoond**
- Controleer of er bestanden in de map staan
- Controleer of de bestanden leesbaar zijn

## 📞 **Support**

Voor vragen of problemen:
- Check de Google Apps Script logs
- Test met de `testAccess()` functie
- Controleer Google Drive permissies

## 🎯 **Volgende Stappen**

1. **Test de basis functionaliteit**
2. **Organiseer je Drive mappen**
3. **Deel de link met leerlingen**
4. **Verzamel feedback**
5. **Voeg geavanceerde features toe** (QR codes, magic links, etc.)

---

**Klaar om te beginnen?** Volg de stappen hierboven en je hebt binnen 10 minuten een werkende aantekeningen dashboard! 🎉

## 🔗 **Link naar je Dashboard**

Zodra je de web-app hebt gedeployed, krijg je een URL zoals:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Deel deze link met je leerlingen voor directe toegang tot hun notities!
