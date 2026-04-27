import React, { useState } from 'react'

export default function Legend() {
  const [expanded, setExpanded] = useState(false)

  const legends = [
    {
      title: 'Risk Level',
      items: [
        { color: '#991b1b', label: 'Critical Risk (75-100%)', range: '0.75 - 1.0' },
        { color: '#dc2626', label: 'High Risk (50-75%)', range: '0.5 - 0.75' },
        { color: '#f97316', label: 'Medium Risk (25-50%)', range: '0.25 - 0.5' },
        { color: '#eab308', label: 'Low Risk (0-25%)', range: '0.0 - 0.25' }
      ]
    },
    {
      title: 'Vegetation (NDVI)',
      items: [
        { color: '#7c2d12', label: 'Degraded', range: '< 0.2' },
        { color: '#b45309', label: 'Sparse', range: '0.2 - 0.4' },
        { color: '#84cc16', label: 'Moderate', range: '0.4 - 0.6' },
        { color: '#16a34a', label: 'Healthy', range: '> 0.6' }
      ]
    },
    {
      title: 'Heat (Inferno)',
      items: [
        { color: '#170b3b', label: 'Very Cool', range: '0.0 - 0.2' },
        { color: '#5f1e9c', label: 'Cool', range: '0.2 - 0.4' },
        { color: '#a02c8d', label: 'Warm', range: '0.4 - 0.6' },
        { color: '#dd513a', label: 'Hot', range: '0.6 - 0.8' },
        { color: '#f9c74f', label: 'Very Hot', range: '0.8 - 1.0' }
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors duration-300">
            <span className="text-xl">📋</span>
          </div>
          <div>
            <span className="font-bold text-white text-lg">Color Legend</span>
            <p className="text-sm text-slate-400">Map visualization guide</p>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <span className="text-slate-400 group-hover:text-white">▼</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-700/50 p-6 space-y-6 max-h-96 overflow-y-auto">
          {legends.map((legend, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-emerald-400 to-blue-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-emerald-400">{legend.title}</h4>
              </div>
              <div className="space-y-2 pl-3">
                {legend.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-200 group cursor-pointer">
                    <div
                      className="w-5 h-5 rounded-lg border-2 border-slate-600 shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        Range: {item.range}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend Footer */}
          <div className="border-t border-slate-700/50 pt-4 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span>Click map areas for detailed analysis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
