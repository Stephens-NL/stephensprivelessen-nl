# Notability Notes Dashboard Setup Guide

This guide will help you set up the Google Drive integration for your Notability notes dashboard.

## Prerequisites

1. **Google Account**: Access to `lessen@stephensprivelessen.nl` Google account
2. **Google Drive Structure**: Your Notability files should be organized as:
   ```
   Google Drive: lessen@stephensprivelessen.nl
   └── Notability/
       └── Prefales/
           ├── Course 1/
           │   ├── Lesson 1.pdf
           │   ├── Lesson 2.pdf
           │   └── ...
           ├── Course 2/
           │   ├── Lesson 1.pdf
           │   └── ...
           └── ...
   ```

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the **Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Name: `stephensprivelessen-notes-api`
   - Description: `Service account for accessing Notability notes`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key

1. Click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file and keep it secure

## Step 4: Share Google Drive Folder

1. Open Google Drive for `lessen@stephensprivelessen.nl`
2. Navigate to the **Notability** folder
3. Right-click and select "Share"
4. Add the service account email (found in the JSON file as `client_email`)
5. Give it "Viewer" permissions
6. Click "Send"

## Step 5: Environment Variables

Create a `.env.local` file in your project root with:

```env
# Google Service Account Configuration
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}

# Alternative: Use key file path (if you prefer to store the JSON file)
# GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./path/to/your-service-account-key.json
```

**Important**: Replace the entire JSON object with your actual service account credentials from the downloaded JSON file.

## Step 6: Install Dependencies

```bash
npm install
```

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/notes`

3. You should see your course folders and notes from Google Drive

## Troubleshooting

### Common Issues

1. **"Failed to fetch notes from Google Drive"**
   - Check if the service account has access to the Notability folder
   - Verify the environment variables are set correctly
   - Ensure the Google Drive API is enabled

2. **"No course folders found"**
   - Verify your folder structure matches the expected format
   - Check if the Notability and Prefales folders exist
   - Ensure the service account has been shared with the correct folder

3. **"File not found or access denied"**
   - Check if individual files are shared with the service account
   - Verify file permissions in Google Drive

### Security Notes

- Never commit the service account JSON file to version control
- Use environment variables for production deployment
- Regularly rotate service account keys
- Limit service account permissions to only what's necessary

## Production Deployment

For production deployment (Vercel, etc.):

1. Add the environment variables in your deployment platform
2. Ensure the service account has access to the production Google Drive
3. Test the integration in the production environment

## Features

The dashboard includes:

- **Folder-based navigation** matching your Notability structure
- **Search functionality** across all notes
- **Direct download links** for each file
- **Responsive design** for mobile and desktop
- **File metadata** (size, modification date)
- **Error handling** and loading states

## API Endpoints

- `GET /api/notes` - Get all course folders and files
- `GET /api/notes/search?q=query` - Search for specific files
- `GET /api/notes/download/[fileId]` - Get download link for a file

## Customization

You can customize the dashboard by:

1. Modifying the folder structure in `lib/google-drive.ts`
2. Updating the UI components in `components/notes/`
3. Adding new features like file preview, favorites, etc.
4. Implementing user authentication for student-specific access
