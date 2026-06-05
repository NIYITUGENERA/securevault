"use client";
export default function PropertiesPanel({ selectedItem }) {
  if (!selectedItem) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-secondary text-sm p-8 text-center">
        Select a file or folder to view its properties
      </div>
    );
  }
  const isFolder = selectedItem.type === "folder";

  const handleDownload = () => {
    const content = JSON.stringify(selectedItem, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedItem.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-2xl ${isFolder ? "bg-accent/10" : "bg-white/5"} border border-white/10`}>
          {isFolder ? (
            <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
          )}
        </div>
        <h2 className="text-xl font-bold text-white truncate max-w-full" title={selectedItem.name}>
          {selectedItem.name}
        </h2>
        <span className="px-3 py-1 bg-surface-hover text-text-secondary text-xs rounded-full uppercase tracking-widest border border-white/5">
          {selectedItem.type}
        </span>
      </div>
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-secondary uppercase tracking-tight">System ID</span>
          <span className="text-sm font-mono text-accent">{selectedItem.id}</span>
        </div>
        {!isFolder && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary uppercase tracking-tight">Size</span>
            <span className="text-sm text-white">{selectedItem.size || "Unknown"}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-secondary uppercase tracking-tight">Location</span>
          <span className="text-sm text-white truncate max-w-[200px]" title="Cloud/SecureVault/Enterprise">
            Cloud/SecureVault/...
          </span>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <button
          onClick={handleDownload}
          className="w-full py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Download File
        </button>
      </div>
    </div>
  );
}