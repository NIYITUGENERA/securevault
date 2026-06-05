"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import TreeItem from "./TreeItem";
import PropertiesPanel from "./PropertiesPanel";
import Breadcrumbs from "./Breadcrumbs";
import data from "../data.json";

export default function FileExplorer() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [focusedId, setFocusedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const prevSearchQuery = useRef("");

  const getVisibleItems = useCallback((nodes, expanded) => {
    let result = [];
    for (const node of nodes) {
      result.push(node);
      if (node.type === "folder" && expanded.has(node.id) && node.children) {
        result = [...result, ...getVisibleItems(node.children, expanded)];
      }
    }
    return result;
  }, []);

  const visibleItems = useMemo(() => getVisibleItems(data, expandedFolders), [expandedFolders, getVisibleItems]);

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleKeyDown = (e) => {
    if (!focusedId && visibleItems.length > 0) {
      setFocusedId(visibleItems[0].id);
      return;
    }

    const currentIndex = visibleItems.findIndex((item) => item.id === focusedId);
    const currentItem = visibleItems[currentIndex];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < visibleItems.length - 1) {
          setFocusedId(visibleItems[currentIndex + 1].id);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          setFocusedId(visibleItems[currentIndex - 1].id);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentItem?.type === "folder" && !expandedFolders.has(currentItem.id)) {
          toggleFolder(currentItem.id);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (currentItem?.type === "folder" && expandedFolders.has(currentItem.id)) {
          toggleFolder(currentItem.id);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (currentItem) {
          setSelectedItem(currentItem);
          if (currentItem.type === "folder") {
            toggleFolder(currentItem.id);
          }
        }
        break;
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const filterNodes = (nodes) => {
      return nodes.reduce((acc, node) => {
        const matches = node.name.toLowerCase().includes(searchQuery.toLowerCase());
        let childrenMatches = [];
        if (node.children) {
          childrenMatches = filterNodes(node.children);
        }
        if (matches || childrenMatches.length > 0) {
          acc.push({
            ...node,
            children: childrenMatches.length > 0 ? childrenMatches : node.children,
            _hasMatch: matches,
            _hasChildMatch: childrenMatches.length > 0
          });
        }
        return acc;
      }, []);
    };

    return filterNodes(data);
  }, [searchQuery]);

  // Fix: compute folders to expand inside useMemo instead of useEffect
  const expandedFoldersWithSearch = useMemo(() => {
    if (!searchQuery || searchQuery === prevSearchQuery.current) return expandedFolders;
    prevSearchQuery.current = searchQuery;

    const getFolderIdsToExpand = (nodes) => {
      let ids = [];
      for (const node of nodes) {
        if (node.type === "folder" && node._hasChildMatch) {
          ids.push(node.id);
          if (node.children) {
            ids = [...ids, ...getFolderIdsToExpand(node.children)];
          }
        }
      }
      return ids;
    };

    const idsToExpand = getFolderIdsToExpand(filteredData);
    if (idsToExpand.length === 0) return expandedFolders;

    const next = new Set(expandedFolders);
    idsToExpand.forEach((id) => next.add(id));
    return next;
  }, [filteredData, searchQuery, expandedFolders]);

  const breadcrumbPath = useMemo(() => {
    if (!selectedItem) return [];

    const findPath = (nodes, targetId, currentPath = []) => {
      for (const node of nodes) {
        if (node.id === targetId) return [...currentPath, node.name];
        if (node.children) {
          const path = findPath(node.children, targetId, [...currentPath, node.name]);
          if (path) return path;
        }
      }
      return null;
    };

    return findPath(data, selectedItem.id) || [];
  }, [selectedItem]);

  return (
    <div
      className="flex h-screen bg-background overflow-hidden border border-white/5 m-4 rounded-xl shadow-2xl"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Left Sidebar */}
      <div className="w-80 flex flex-col border-r border-white/5 bg-surface/50 backdrop-blur-xl">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] ml-4 font-bold">SecureVault v1.0</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-9 text-xs text-white placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {filteredData.map((node) => (
            <TreeItem
              key={node.id}
              node={node}
              expandedFolders={expandedFoldersWithSearch}
              toggleFolder={toggleFolder}
              selectedId={selectedItem?.id}
              onSelect={setSelectedItem}
              onFocus={setFocusedId}
              isFocused={focusedId === node.id}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black/20">
        <Breadcrumbs path={breadcrumbPath} />

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col p-8 border-r border-white/5">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Workspace</h1>
              <p className="text-sm text-text-secondary">Manage your secure documents and legal assets.</p>
            </div>

            {selectedItem ? (
              <div className="bg-surface border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="p-6 bg-accent/5 rounded-full">
                  <svg className="w-16 h-16 text-accent/50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414L13.586 3H9z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white">{selectedItem.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">Ready for inspection</p>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    className="px-4 py-2 bg-surface-hover border border-white/10 rounded-lg text-xs hover:bg-white hover:text-black transition-all"
                    onClick={() => alert(`Opening preview for: ${selectedItem.name}`)}
                  >Open Preview</button>
                  <button
                    className="px-4 py-2 bg-accent/20 text-accent border border-accent/30 rounded-lg text-xs hover:bg-accent hover:text-white transition-all"
                    onClick={() => alert(`Access authorized for: ${selectedItem.name}`)}
                  >Authorize Access</button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-text-secondary space-y-4 opacity-50">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1m-6 9a2 2 0 01-2-2V7m6 9l2 2m0 0l2-2m-2 2V5" />
                </svg>
                <p className="text-sm">Select an item to begin secure session</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-72 bg-surface/30 backdrop-blur-md">
            <PropertiesPanel selectedItem={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
}