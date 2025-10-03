// Initialize Google Drive API with JWT authentication (server-side only)
async function getGoogleDrive() {
  if (typeof window !== 'undefined') {
    throw new Error('Google Drive API can only be used server-side');
  }

  const { google } = await import('googleapis');
  
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/drive.readonly"]
  );

  return google.drive({ version: "v3", auth });
}

export interface DriveFile {
  id: string;
  name: string;
  modifiedTime?: string;
  mimeType?: string;
  viewUrl: string;
  dlUrl: string;
}

export interface StudentFolder {
  id: string;
  name: string;
}

/**
 * Get the Notability folder ID from environment or by name
 */
export async function getNotabilityFolderId(): Promise<string> {
  // Use folder ID if provided (faster and more reliable)
  if (process.env.NOTABILITY_FOLDER_ID) {
    return process.env.NOTABILITY_FOLDER_ID;
  }

  // Fallback to searching by name
  const name = process.env.NOTABILITY_FOLDER_NAME || "Notability";
  const q = `mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false`;
  
  try {
    const drive = await getGoogleDrive();
    const res = await drive.files.list({ 
      q, 
      fields: "files(id,name)" 
    });
    
    const folder = res.data.files?.[0];
    if (!folder) {
      throw new Error(`Notability folder '${name}' not found in Google Drive`);
    }
    
    return folder.id!;
  } catch (error) {
    console.error('Error finding Notability folder:', error);
    throw new Error(`Could not find Notability folder: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Find student folders that contain the search name (case-insensitive)
 */
export async function findStudentFolders(parentId: string, needle: string): Promise<StudentFolder[]> {
  const q = `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const files: StudentFolder[] = [];
  let pageToken: string | undefined;

  try {
    const drive = await getGoogleDrive();
    
    do {
      const res = await drive.files.list({
        q,
        pageToken,
        fields: "nextPageToken, files(id,name)",
      });

      for (const file of res.data.files || []) {
        if (file.id && file.name) {
          files.push({ id: file.id, name: file.name });
        }
      }
      
      pageToken = res.data.nextPageToken || undefined;
    } while (pageToken);

    // Filter by name (case-insensitive)
    const searchTerm = needle.trim().toLowerCase();
    const matches = files.filter(f => 
      f.name.toLowerCase().includes(searchTerm)
    );

    // Sort by relevance (exact matches first, then starts with, then contains)
    return matches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      if (aName === searchTerm) return -1;
      if (bName === searchTerm) return 1;
      if (aName.startsWith(searchTerm)) return -1;
      if (bName.startsWith(searchTerm)) return 1;
      
      return aName.localeCompare(bName);
    });

  } catch (error) {
    console.error('Error finding student folders:', error);
    throw new Error(`Could not search student folders: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * List files in a specific folder with download links
 */
export async function listFiles(folderId: string): Promise<DriveFile[]> {
  const q = `'${folderId}' in parents and trashed=false`;
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  try {
    const drive = await getGoogleDrive();
    
    do {
      const res = await drive.files.list({
        q,
        pageToken,
        fields: "nextPageToken, files(id,name,mimeType,modifiedTime)",
        orderBy: "modifiedTime desc",
      });

      for (const file of res.data.files || []) {
        if (file.id && file.name) {
          files.push({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            modifiedTime: file.modifiedTime,
            viewUrl: `https://drive.google.com/file/d/${file.id}/view`,
            dlUrl: `https://drive.google.com/uc?id=${file.id}&export=download`,
          });
        }
      }
      
      pageToken = res.data.nextPageToken || undefined;
    } while (pageToken);

    return files;

  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error(`Could not list files: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse session information from filename
 * Expected format: YYYY-MM-DD__topic__v001.pdf
 */
export function parseSessionInfo(filename: string) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})__(.+)__v(\d+)\.(.+)$/);
  
  if (match) {
    return {
      date: match[1],
      topic: match[2].replace(/_/g, ' '),
      version: match[3],
      displayName: `${match[1]} - ${match[2].replace(/_/g, ' ')}`
    };
  }
  
  // Fallback for other formats
  return {
    date: null,
    topic: null,
    version: null,
    displayName: filename
  };
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Format date in Dutch locale
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Test function to verify Google Drive access
 */
export async function testDriveAccess(): Promise<{ success: boolean; message: string; folderCount?: number }> {
  try {
    const folderId = await getNotabilityFolderId();
    const folders = await findStudentFolders(folderId, '');
    
    return {
      success: true,
      message: `Successfully connected to Google Drive. Found ${folders.length} student folders.`,
      folderCount: folders.length
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to connect to Google Drive: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
