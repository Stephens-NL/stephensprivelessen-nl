# Aantekeningen Dashboard Setup Guide

Een database-loze, GDPR-proof notities dashboard voor `stephensprivelessen.nl/aantekeningen`.

## 🚀 Snelle Setup (20 minuten)

### Stap 1: Google Cloud Console Setup

1. **Ga naar [Google Cloud Console](https://console.cloud.google.com/)**
2. **Maak een nieuw project** of selecteer bestaand project
3. **Enable Google Drive API**:
   - Ga naar "APIs & Services" → "Library"
   - Zoek naar "Google Drive API"
   - Klik "Enable"

### Stap 2: Service Account Aanmaken

1. **Ga naar "APIs & Services" → "Credentials"**
2. **Klik "Create Credentials" → "Service Account"**
3. **Vul details in**:
   - Name: `stephensprivelessen-aantekeningen`
   - Description: `Service account for accessing Notability notes`
4. **Klik "Create and Continue"**
5. **Skip de optionele stappen** en klik "Done"

### Stap 3: Service Account Key Genereren

1. **Klik op je service account**
2. **Ga naar "Keys" tab**
3. **Klik "Add Key" → "Create new key"**
4. **Kies "JSON" format**
5. **Download het JSON bestand**

### Stap 4: Google Drive Folder Delen

1. **Open Google Drive** voor `lessen@stephensprivelessen.nl`
2. **Navigeer naar je Notability folder**
3. **Rechtsklik → "Share"**
4. **Voeg het service account email toe** (uit het JSON bestand als `client_email`)
5. **Geef "Viewer" permissies**
6. **Klik "Send"**

### Stap 5: Environment Variables

Maak een `.env.local` bestand in je project root:

```env
# Google Service Account Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Notability Folder Configuration (kies één)
NOTABILITY_FOLDER_ID=your-notability-folder-id-here
# OF
NOTABILITY_FOLDER_NAME=Notability
```

**Belangrijk**: 
- Kopieer de volledige private key uit het JSON bestand
- Behoud de `\n` characters voor line breaks
- Gebruik folder ID voor betere prestaties

### Stap 6: Dependencies Installeren

```bash
npm install
```

### Stap 7: Testen

```bash
npm run test:aantekeningen
```

### Stap 8: Development Server Starten

```bash
npm run dev
```

Ga naar: `http://localhost:3000/aantekeningen`

## 📁 Google Drive Structuur

Organiseer je Drive als volgt:

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
    ├── Rachel_2009-01-03/  (voor unieke identificatie)
    │   └── 2024-10-01__Physics__v001.pdf
    └── ...
```

### Bestandsnaam Conventies

- **Aanbevolen**: `YYYY-MM-DD__topic__v001.pdf`
- **Voorbeelden**:
  - `2024-10-01__Calculus__v001.pdf`
  - `2024-10-08__Statistics__v002.pdf`
  - `2024-10-15__Physics__v001.pdf`

## 🔧 Features

### ✅ Wat werkt nu:
- **Zoeken op voornaam** (case-insensitive)
- **Automatische sortering** (nieuwste eerst)
- **Directe Google Drive links** (bekijken + downloaden)
- **Responsive design** (mobiel + desktop)
- **Rate limiting** (30 requests/minuut per IP)
- **In-memory caching** (1 minuut)
- **Error handling** met gebruiksvriendelijke berichten

### 🎯 Geavanceerde features:
- **Session info parsing** uit bestandsnamen
- **File type icons** (PDF, image, etc.)
- **Intelligente naam matching** met score systeem
- **Privacy-vriendelijk** (geen database, geen opslag)

## 🔒 Privacy & GDPR

### Wat we NIET doen:
- ❌ Geen database met persoonsgegevens
- ❌ Geen wachtwoorden of BSN-achtige data
- ❌ Geen tracking of analytics
- ❌ Geen opslag van zoekopdrachten

### Wat we WEL doen:
- ✅ Alleen voornaam voor identificatie
- ✅ Directe Google Drive integratie
- ✅ Geen server-side opslag
- ✅ Rate limiting voor beveiliging
- ✅ Transparante privacy policy

## 🚀 Deployment

### Vercel (Aanbevolen)
1. **Push naar GitHub**
2. **Connect met Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy**

### Hostinger/VPS met NGINX
```nginx
location /aantekeningen/ {
  proxy_pass http://127.0.0.1:3000/aantekeningen/;
  include proxy_params;
}
location /api/aantekeningen/ {
  proxy_pass http://127.0.0.1:3000/api/aantekeningen/;
  include proxy_params;
}
```

## 📱 Gebruik door Leerlingen

### Eerste keer:
1. Leerling gaat naar `stephensprivelessen.nl/aantekeningen`
2. Voert voornaam in
3. Kiest juiste map (als er meerdere zijn)
4. Ziet alle notities met download links

### Volgende keren:
- Direct naar de link
- Voornaam invullen
- Notities bekijken/downloaden

## 🔧 Troubleshooting

### "Notability folder not found"
- Controleer of de map exact `Notability` heet
- Controleer of je ingelogd bent met het juiste Google account
- Gebruik `NOTABILITY_FOLDER_ID` in plaats van naam

### "Service account authentication failed"
- Controleer of de private key correct is gekopieerd
- Zorg dat `\n` characters behouden zijn
- Controleer of de service account email klopt

### "No student folders found"
- Controleer of er submappen zijn in de Notability folder
- Controleer of de service account toegang heeft tot de folder
- Test met `npm run test:aantekeningen`

### Rate limiting errors
- Wacht 1 minuut en probeer opnieuw
- Controleer of er geen andere processen veel requests maken

## 📞 Support

Voor vragen of problemen:
- Check de console logs in development
- Test met `npm run test:aantekeningen`
- Controleer Google Drive permissies
- Check de rate limiting logs

## 🎯 Roadmap

### Korte termijn:
- **PDF inline viewer** (pdf.js)
- **Zoek binnen map** functionaliteit
- **Filters** (alleen PDF's, alleen afbeeldingen)

### Lange termijn:
- **Magic links** per leerling
- **Ouder-toegang** (read-only)
- **AI samenvattingen** van lessen
- **Automatische tagging** van onderwerpen

---

**Klaar om te beginnen?** Volg de stappen hierboven en je hebt binnen 20 minuten een werkende aantekeningen dashboard! 🎉
