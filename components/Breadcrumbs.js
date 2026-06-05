"use client";

export default function Breadcrumbs({ path }) {
  return (
    <div className="flex items-center space-x-2 text-xs text-text-secondary px-4 py-2 border-b border-white/5 bg-surface/50">
      <div className="flex items-center cursor-pointer hover:text-white transition-colors">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>SecureVault</span>
      </div>
      
      {path.map((segment, index) => (
        <div key={index} className="flex items-center space-x-2">
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={`cursor-pointer hover:text-white transition-colors ${index === path.length - 1 ? "text-accent font-medium" : ""}`}>
            {segment}
          </span>
        </div>
      ))}
    </div>
  );
}
