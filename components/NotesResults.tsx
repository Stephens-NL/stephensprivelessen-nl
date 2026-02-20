"use client";

import useSWR from "swr";
// Helper function to format dates (client-side safe)
function formatDate(dateString?: string): string {
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

interface DriveFile {
  id: string;
  name: string;
  modifiedTime?: string;
  mimeType?: string;
  viewUrl: string;
  dlUrl: string;
  fileType: string;
  sessionInfo: {
    date: string | null;
    topic: string | null;
    version: string | null;
    displayName: string;
  };
}

interface StudentFolder {
  id: string;
  name: string;
}

interface NotesResultsProps {
  folder: StudentFolder;
}

const notesFetcher = (url: string, folderId: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folderId }),
  }).then((res) => {
    if (!res.ok) return res.json().then((d: { error?: string }) => { throw new Error(d.error || "Failed to load files"); });
    return res.json();
  });

export default function NotesResults({ folder }: NotesResultsProps) {
  const { data: files, isLoading: loading, error: swrError } = useSWR<DriveFile[]>(
    ["/api/aantekeningen/list", folder.id],
    ([url, id]) => notesFetcher(url, id)
  );
  const error = swrError ? (swrError instanceof Error ? swrError.message : "Er is een fout opgetreden") : null;

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📁 {folder.name}
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span>Bestanden laden...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📁 {folder.name}
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600">❌</span>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        📁 {folder.name}
      </h2>
      
      {!files || files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-lg font-medium mb-1">Geen bestanden gevonden</p>
          <p className="text-sm">Er zijn nog geen notities beschikbaar in deze map.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>📄 {files.length} bestand{files.length !== 1 ? 'en' : ''}</span>
            <span>📅 Sorteerd op: Nieuwste eerst</span>
          </div>
          
          {files.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{file.fileType}</span>
                    <h3 className="font-medium text-gray-900 truncate">
                      {file.sessionInfo.displayName}
                    </h3>
                  </div>
                  
                  <div className="text-sm text-gray-500 space-y-1">
                    {file.sessionInfo.date && (
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>Les van {formatDate(file.sessionInfo.date)}</span>
                      </div>
                    )}
                    {file.sessionInfo.topic && (
                      <div className="flex items-center gap-1">
                        <span>📝</span>
                        <span>Onderwerp: {file.sessionInfo.topic}</span>
                      </div>
                    )}
                    {file.modifiedTime && (
                      <div className="flex items-center gap-1">
                        <span>🕒</span>
                        <span>Laatst gewijzigd: {formatDate(file.modifiedTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={file.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    👁️ Bekijken
                  </a>
                  <a
                    href={file.dlUrl}
                    download={file.name}
                    className="px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    ⬇️ Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
