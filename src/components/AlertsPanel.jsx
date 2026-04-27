import React, { useState } from 'react'

export default function AlertsPanel({ alerts }) {
  const [expanded, setExpanded] = useState(false)

  const alertConfig = {
    critical: { color: 'bg-red-500/20', borderColor: 'border-red-500', icon: '🚨', textColor: 'text-red-400' },
    warning: { color: 'bg-orange-500/20', borderColor: 'border-orange-500', icon: '⚠️', textColor: 'text-orange-400' },
    info: { color: 'bg-blue-500/20', borderColor: 'border-blue-500', icon: 'ℹ️', textColor: 'text-blue-400' }
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30 group-hover:border-orange-500/60 transition-colors duration-300">
            <span className="text-xl">🔔</span>
          </div>
          <div>
            <span className="font-bold text-white text-lg">Active Alerts</span>
            <p className="text-sm text-slate-400">Critical notifications & events</p>
          </div>
          <div className="ml-3 px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full">
            <span className="text-sm font-bold text-red-400">{alerts.length}</span>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <span className="text-slate-400 group-hover:text-white">▼</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-700/50 divide-y divide-slate-700/30 max-h-80 overflow-y-auto">
          {alerts.map((alert) => {
            const config = alertConfig[alert.severity]
            return (
              <div key={alert.id} className={`${config.color} border-l-4 ${config.borderColor} p-4 hover:bg-slate-700/20 transition-colors duration-200 cursor-pointer group`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.color} border ${config.borderColor} group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-lg">{config.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-bold text-sm ${config.textColor} group-hover:text-white transition-colors duration-200`}>
                        {alert.title}
                      </p>
                      <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 flex items-center gap-1 group-hover:text-slate-300 transition-colors duration-200">
                      <span>📍</span>
                      {alert.location}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-slate-500 hover:text-white cursor-pointer">→</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
