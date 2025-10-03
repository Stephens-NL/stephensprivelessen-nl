import { google } from 'googleapis';

// Google Drive API configuration
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  parents?: string[];
  modifiedTime?: string;
  size?: string;
}

export interface DriveFolder {
  id: string;
  name: string;
  files: DriveFile[];
  subfolders: DriveFolder[];
}

class GoogleDriveService {
  private drive: any;
  private isInitialized = false;

  constructor() {
    this.initializeDrive();
  }

  private async initializeDrive() {
    try {
      // Initialize Google Drive API
      const auth = new google.auth.GoogleAuth({
        scopes: SCOPES,
        // You'll need to set up service account credentials
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
        // Or use environment variables for the credentials
        credentials: process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS ? 
          JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) : undefined,
      });

      this.drive = google.drive({ version: 'v3', auth });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Google Drive API:', error);
      throw error;
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized) {
      await this.initializeDrive();
    }
  }

  /**
   * Get the root Notability folder ID
   */
  async getNotabilityRootFolder(): Promise<string | null> {
    await this.ensureInitialized();
    
    try {
      const response = await this.drive.files.list({
        q: "name='Notability' and mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: 'files(id, name)',
        pageSize: 1,
      });

      return response.data.files?.[0]?.id || null;
    } catch (error) {
      console.error('Error finding Notability root folder:', error);
      return null;
    }
  }

  /**
   * Get the Prefales folder ID within Notability
   */
  async getPrefalesFolder(): Promise<string | null> {
    await this.ensureInitialized();
    
    const notabilityRootId = await this.getNotabilityRootFolder();
    if (!notabilityRootId) return null;

    try {
      const response = await this.drive.files.list({
        q: `name='Prefales' and mimeType='application/vnd.google-apps.folder' and '${notabilityRootId}' in parents and trashed=false`,
        fields: 'files(id, name)',
        pageSize: 1,
      });

      return response.data.files?.[0]?.id || null;
    } catch (error) {
      console.error('Error finding Prefales folder:', error);
      return null;
    }
  }

  /**
   * Get all folders within the Prefales directory
   */
  async getCourseFolders(): Promise<DriveFolder[]> {
    await this.ensureInitialized();
    
    const prefalesFolderId = await this.getPrefalesFolder();
    if (!prefalesFolderId) return [];

    try {
      const response = await this.drive.files.list({
        q: `'${prefalesFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name, modifiedTime)',
        orderBy: 'name',
      });

      const folders = response.data.files || [];
      
      // Get files for each folder
      const courseFolders: DriveFolder[] = await Promise.all(
        folders.map(async (folder: any) => {
          const files = await this.getFilesInFolder(folder.id);
          return {
            id: folder.id,
            name: folder.name,
            files,
            subfolders: [], // We can add subfolder support later if needed
          };
        })
      );

      return courseFolders;
    } catch (error) {
      console.error('Error getting course folders:', error);
      return [];
    }
  }

  /**
   * Get all files within a specific folder
   */
  async getFilesInFolder(folderId: string): Promise<DriveFile[]> {
    await this.ensureInitialized();
    
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType, webViewLink, webContentLink, modifiedTime, size)',
        orderBy: 'name',
      });

      return response.data.files || [];
    } catch (error) {
      console.error(`Error getting files in folder ${folderId}:`, error);
      return [];
    }
  }

  /**
   * Get a direct download link for a file
   */
  async getFileDownloadLink(fileId: string): Promise<string | null> {
    await this.ensureInitialized();
    
    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'webContentLink, webViewLink',
      });

      return response.data.webContentLink || response.data.webViewLink || null;
    } catch (error) {
      console.error(`Error getting download link for file ${fileId}:`, error);
      return null;
    }
  }

  /**
   * Search for files by name across all course folders
   */
  async searchFiles(query: string): Promise<DriveFile[]> {
    await this.ensureInitialized();
    
    const prefalesFolderId = await this.getPrefalesFolder();
    if (!prefalesFolderId) return [];

    try {
      const response = await this.drive.files.list({
        q: `'${prefalesFolderId}' in parents and name contains '${query}' and trashed=false`,
        fields: 'files(id, name, mimeType, webViewLink, webContentLink, modifiedTime, size, parents)',
        orderBy: 'name',
      });

      return response.data.files || [];
    } catch (error) {
      console.error(`Error searching files with query '${query}':`, error);
      return [];
    }
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();
