import React, { useState, useEffect } from 'react'
import StatCard from './StatCard'
import LayerControl from './LayerControl'
import AlertsPanel from './AlertsPanel'
import Legend from './Legend'
import { dataService } from '../services/dataService'
import { searchService } from '../services/searchService'

export default function Sidebar({ onLayerToggle, activeLayerIds, onLocationSelect }) {
  const [stats, setStats] = useState(dataService.stats)
  const [layers, setLayers] = useState(dataService.layers)
  const [alerts, setAlerts] = useState(dataService.alerts)
  const [allZones, setAllZones] = useState([])

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = dataService.subscribeToUpdates((newStats) => {
      setStats(newStats)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    // Load all zones
    setAllZones(searchService.getAllZones())
  }, [])

  const handleLayerToggle = (layerId) => {
    const updatedLayers = layers.map(l =>
      l.id === layerId ? { ...l, visible: !l.visible } : l
    )
    setLayers(updatedLayers)
    onLayerToggle(layerId)
  }

  return (
    <aside className="w-full md:w-96 bg-black/95 border-b border-emerald-950/80 md:border-b-0 md:border-r overflow-y-auto shadow-2xl flex flex-col md:h-screen h-auto backdrop-blur-sm">
      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-emerald-950/70 bg-emerald-950/20 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
            <p className="text-sm text-emerald-200/70">Environmental monitoring system</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 font-medium">System Active</span>
          <span className="text-emerald-900">•</span>
          <span className="text-emerald-200/60">Refresh: 5s</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 p-6">
        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Key Metrics
            </h3>
          </div>

          <div className="grid gap-4">
            <StatCard
              title="High Risk Area"
              value={stats.highRiskArea}
              unit="%"
              icon="🚨"
              color="red"
              description="Critical environmental zones requiring immediate attention"
            />

            <StatCard
              title="Average NDVI"
              value={stats.averageNDVI}
              unit=""
              icon="🌿"
              color="green"
              description="Normalized Difference Vegetation Index across monitored areas"
            />

            <StatCard
              title="Population at Risk"
              value={Math.floor(stats.affectedPopulation / 1000)}
              unit="K"
              icon="👥"
              color="blue"
              description="Estimated population in high-risk environmental zones"
            />
          </div>
        </div>

        {/* Zone List */}
        <div>
          <div className="flex items-center gap-2 px-1 mb-3">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Environmental Zones ({allZones.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[42vh] md:max-h-96 overflow-y-auto">
            {allZones.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <div className="text-2xl mb-2">📍</div>
                <p className="text-sm">No zones available</p>
              </div>
            ) : (
              allZones.map(zone => (
                <div
                  key={zone.id}
                  onClick={() => onLocationSelect(zone)}
                  className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/30 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:border-slate-600/50 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors">
                      {zone.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      zone.riskLevel === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      zone.riskLevel === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      zone.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {zone.riskLevel === 'critical' ? '🔴' :
                       zone.riskLevel === 'high' ? '🟠' :
                       zone.riskLevel === 'medium' ? '🟡' :
                       '🟢'} {zone.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{zone.type}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{zone.description}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/30">
                    <span className="text-xs text-slate-500">{zone.coordinates}</span>
                    <span className="text-xs text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
                      Click to zoom →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Alerts Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider px-1 mb-3">
            Alerts & Events
          </h3>
          <AlertsPanel alerts={alerts} />
        </div>

        {/* Layer Controls */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider px-1 mb-3">
            Visualization
          </h3>
          <LayerControl layers={layers} onLayerToggle={handleLayerToggle} />
        </div>

        {/* Legend */}
        <Legend />

        {/* System Status Card */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg border border-emerald-500/30">
              <span className="text-xl">ℹ️</span>
            </div>
            <h4 className="font-bold text-white text-lg">System Status</h4>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Monitored Area</p>
                <p className="text-lg font-bold text-emerald-400">{stats.monitored_area_sqkm} km²</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Coverage</p>
                <p className="text-lg font-bold text-emerald-400">100%</p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Update Interval</p>
                <span className="text-sm font-bold text-emerald-400">5s</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
                <span className="text-xs text-slate-400">Live</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></span>
                <span className="font-semibold text-emerald-400">System Online</span>
              </div>
              <div className="text-xs text-slate-500">
                {stats.last_update.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-emerald-950/70 p-6 bg-gradient-to-r from-black to-emerald-950/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">⚡</span>
            </div>
            <span className="text-sm font-bold text-emerald-400">Greenora</span>
          </div>
          <p className="text-xs text-emerald-200/55">Real-time monitoring platform v1</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-emerald-200/45">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
