"use client";

import { useState } from "react";

export default function TreeItem({
  node,
  level = 0,
  expandedFolders,
  toggleFolder,
  selectedId,
  onSelect,
  onFocus,
  isFocused,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedFolders.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) {
      toggleFolder(node.id);
    }
    onSelect(node);
  };

  return (
    <div className="flex flex-col">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onFocus={() => onFocus(node.id)}
        className={`
          flex items-center px-4 py-2 cursor-pointer transition-colors outline-none
          ${isSelected ? "bg-accent-muted border-l-2 border-accent" : "border-l-2 border-transparent"}
          ${isFocused ? "bg-surface-hover ring-1 ring-inset ring-accent/30" : "hover:bg-surface-hover"}
        `}
        style={{ paddingLeft: `${(level + 1) * 1.25}rem` }}
      >
        <span className="mr-2 flex items-center justify-center w-4 h-4 text-xs">
          {isFolder ? (
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <div className="w-1 h-1 bg-text-secondary rounded-full" />
          )}
        </span>
        
        <span className="mr-2">
          {isFolder ? (
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
          )}
        </span>

        <span className={`text-sm truncate ${isSelected ? "text-white font-medium" : "text-text-secondary"}`}>
          {node.name}
        </span>
      </div>

      {isFolder && isExpanded && node.children && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
              selectedId={selectedId}
              onSelect={onSelect}
              onFocus={onFocus}
              isFocused={isFocused === child.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
