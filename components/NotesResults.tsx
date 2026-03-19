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
      <div className="bg-[var(--cream)] rounded-lg border border-[var(--border-warm)] p-6">
        <h2 className="text-xl font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">
          📁 {folder.name}
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-[var(--muted-text)]">
            <div className="w-5 h-5 border-2 border-[var(--border-warm)] border-t-[var(--amber)] rounded-full animate-spin"></div>
            <span>Bestanden laden...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[var(--cream)] rounded-lg border border-[var(--terracotta)]/30 p-6">
        <h2 className="text-xl font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">
          📁 {folder.name}
        </h2>
        <div className="bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-[var(--terracotta)]">❌</span>
            <p className="text-[var(--terracotta)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] rounded-lg border border-[var(--border-warm)] p-6">
      <h2 className="text-xl font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">
        📁 {folder.name}
      </h2>

      {!files || files.length === 0 ? (
        <div className="text-center py-8 text-[var(--muted-text)]">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-lg font-medium mb-1">Geen bestanden gevonden</p>
          <p className="text-sm">Er zijn nog geen notities beschikbaar in deze map.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-[var(--muted-text)] mb-4">
            <span>📄 {files.length} bestand{files.length !== 1 ? 'en' : ''}</span>
            <span>📅 Sorteerd op: Nieuwste eerst</span>
          </div>
          
          {files.map((file) => (
            <div key={file.id} className="border border-[var(--border-warm)] rounded-lg p-4 hover:border-[var(--amber)] hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{file.fileType}</span>
                    <h3 className="font-medium text-[var(--ink)] truncate">
                      {file.sessionInfo.displayName}
                    </h3>
                  </div>
                  
                  <div className="text-sm text-[var(--muted-text)] space-y-1">
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
                    className="px-3 py-2 bg-[var(--ink)] text-[var(--cream)] text-sm font-medium rounded-md hover:bg-[var(--ink-light)] focus:ring-2 focus:ring-[var(--amber)] focus:ring-offset-2 transition-colors"
                  >
                    👁️ Bekijken
                  </a>
                  <a
                    href={file.dlUrl}
                    download={file.name}
                    className="px-3 py-2 bg-[var(--muted-text)] text-[var(--cream)] text-sm font-medium rounded-md hover:bg-[var(--warm-text)] focus:ring-2 focus:ring-[var(--muted-text)] focus:ring-offset-2 transition-colors"
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
