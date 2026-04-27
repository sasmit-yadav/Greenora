import React, { useState } from 'react'

export default function LayerControl({ layers, onLayerToggle }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30 group-hover:border-blue-500/60 transition-colors duration-300">
            <span className="text-xl">🗺️</span>
          </div>
          <div>
            <span className="font-bold text-white text-lg">Map Layers</span>
            <p className="text-sm text-slate-400">Toggle data overlays</p>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <span className="text-slate-400 group-hover:text-white">▼</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-700/50 divide-y divide-slate-700/30 p-4 space-y-3">
          {layers.map((layer) => (
            <button
              type="button"
              key={layer.id}
              onClick={() => onLayerToggle(layer.id)}
              className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group hover:scale-[1.02] text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-lg border-2 border-slate-600 shadow-lg group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: layer.color + (layer.visible ? 'cc' : '66') }}
                  />
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
                    {layer.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed group-hover:text-slate-400 transition-colors duration-200">
                  {layer.description}
                </p>
              </div>
            </button>
          ))}

          {/* Layer Control Footer */}
          <div className="border-t border-slate-700/50 pt-3 mt-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Multiple layers can be active simultaneously</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
