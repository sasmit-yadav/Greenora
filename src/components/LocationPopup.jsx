import React, { useState, useEffect } from 'react'

export default function LocationPopup({ location, onClose }) {
  const [showDetails, setShowDetails] = useState(false)

  if (!location) return null

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'critical': return 'from-red-600 to-red-700'
      case 'high': return 'from-orange-600 to-orange-700'
      case 'medium': return 'from-yellow-600 to-yellow-700'
      case 'low': return 'from-green-600 to-green-700'
      default: return 'from-blue-600 to-blue-700'
    }
  }

  const getRiskIcon = (riskLevel) => {
    switch(riskLevel) {
      case 'critical': return '🚨'
      case 'high': return '⚠️'
      case 'medium': return '⚡'
      case 'low': return '✓'
      default: return '?'
    }
  }

  const getRiskText = (riskLevel) => {
    switch(riskLevel) {
      case 'critical': return 'CRITICAL ENVIRONMENTAL RISK'
      case 'high': return 'HIGH ENVIRONMENTAL RISK'
      case 'medium': return 'MODERATE ENVIRONMENTAL RISK'
      case 'low': return 'LOW ENVIRONMENTAL RISK'
      default: return 'UNKNOWN RISK LEVEL'
    }
  }

  const getVegetationStatus = (ndvi) => {
    const ndviValue = parseFloat(ndvi)
    if (ndviValue >= 0.6) return { status: 'Excellent', color: 'text-green-400', icon: '🌿' }
    if (ndviValue >= 0.4) return { status: 'Good', color: 'text-lime-400', icon: '🌱' }
    if (ndviValue >= 0.2) return { status: 'Moderate', color: 'text-yellow-400', icon: '🟡' }
    return { status: 'Poor', color: 'text-red-400', icon: '🥀' }
  }

  const getSoilMoistureStatus = (moisture) => {
    const moistureValue = parseFloat(moisture)
    if (moistureValue >= 70) return { status: 'Saturated', color: 'text-blue-400', icon: '💧' }
    if (moistureValue >= 50) return { status: 'Optimal', color: 'text-cyan-400', icon: '💦' }
    if (moistureValue >= 30) return { status: 'Adequate', color: 'text-blue-300', icon: '🌊' }
    return { status: 'Dry', color: 'text-orange-400', icon: '🏜️' }
  }

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRiskColor(location.riskLevel)} p-6 text-white`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                <span>{getRiskIcon(location.riskLevel)}</span>
                {getRiskText(location.riskLevel)}
              </h2>
              <p className="text-sm opacity-90">Comprehensive Environmental Analysis Report</p>
              <div className="mt-2 text-xs opacity-75 flex items-center gap-2">
                <span>📅 Latest Data:</span>
                <span>{formatDateTime(location.lastUpdated)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors ml-4"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Location Info */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              📍 Geographic Location & Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Latitude</span>
                  <span className="text-emerald-400 font-semibold">{location.latitude}° N</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Longitude</span>
                  <span className="text-emerald-400 font-semibold">{location.longitude}° E</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Monitoring Zone</span>
                  <span className={`font-semibold ${location.inMonitoredArea ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {location.inMonitoredArea ? '✓ Active Zone' : '⚠ Outside Zone'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Data Freshness</span>
                  <span className="text-cyan-400 font-semibold text-xs">LATEST RECORD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              ⚡ Environmental Risk Assessment
            </h3>
            <div className="space-y-4">
              {/* Risk Score Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Estimated Risk Score</span>
                  <span className="text-lg font-bold text-red-400">{location.riskScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      location.riskScore > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      location.riskScore > 65 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                      location.riskScore > 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                    style={{ width: `${location.riskScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Low Risk</span>
                  <span>Critical Risk</span>
                </div>
              </div>

              {/* Risk Interpretation */}
              <div className="bg-slate-700/50 rounded p-4 text-sm">
                <div className="font-semibold text-slate-300 mb-2">Assessment Summary:</div>
                {location.riskScore > 80 && (
                  <div className="text-red-300">
                    🚨 <strong>CRITICAL RISK:</strong> This location shows severe environmental degradation requiring immediate intervention.
                    Multiple environmental indicators are in critical ranges.
                  </div>
                )}
                {location.riskScore > 65 && location.riskScore <= 80 && (
                  <div className="text-orange-300">
                    ⚠️ <strong>HIGH RISK:</strong> Significant environmental concerns detected. Enhanced monitoring and potential
                    mitigation measures recommended for this area.
                  </div>
                )}
                {location.riskScore > 40 && location.riskScore <= 65 && (
                  <div className="text-yellow-300">
                    ⚡ <strong>MODERATE RISK:</strong> Environmental conditions require attention. Regular monitoring advised
                    to prevent potential degradation.
                  </div>
                )}
                {location.riskScore <= 40 && (
                  <div className="text-green-300">
                    ✓ <strong>LOW RISK:</strong> Environmental conditions are within acceptable ranges. Area shows good
                    ecological health indicators.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Environmental Metrics */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              🌱 Detailed Environmental Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Vegetation Index */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Vegetation Health (NDVI)</span>
                  <span className={`font-bold ${getVegetationStatus(location.vegetation).color}`}>
                    {getVegetationStatus(location.vegetation).icon}
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-400 mb-1">{location.vegetation}%</div>
                <div className={`text-sm font-semibold ${getVegetationStatus(location.vegetation).color}`}>
                  {getVegetationStatus(location.vegetation).status} Vegetation
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Normalized Difference Vegetation Index
                </div>
              </div>

              {/* Soil Moisture */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Soil Moisture Content</span>
                  <span className={`font-bold ${getSoilMoistureStatus(location.soilMoisture).color}`}>
                    {getSoilMoistureStatus(location.soilMoisture).icon}
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-1">{location.soilMoisture}%</div>
                <div className={`text-sm font-semibold ${getSoilMoistureStatus(location.soilMoisture).color}`}>
                  {getSoilMoistureStatus(location.soilMoisture).status} Conditions
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Volumetric Water Content
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Details */}
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Analysis Details
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>NDVI Index:</span>
                <span className="text-emerald-400 font-semibold">{location.vegetation}%</span>
              </div>
              <div className="flex justify-between">
                <span>Soil Moisture:</span>
                <span className="text-blue-400 font-semibold">{location.soilMoisture}%</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Risk Score:</span>
                <span className="text-red-400 font-semibold">{location.riskScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Risk Level:</span>
                <span className={`font-semibold ${
                  location.riskLevel === 'critical' ? 'text-red-400' :
                  location.riskLevel === 'high' ? 'text-orange-400' :
                  location.riskLevel === 'medium' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {location.riskLevel?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-slate-700/50 border border-slate-600 rounded text-xs text-slate-400">
              <strong>ℹ️ Calculation:</strong> Score is derived from clicked map overlay colors (risk raster + NDVI color sample), not distance heuristics.
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-slate-600"
            >
              {showDetails ? 'Hide Details' : 'Show Technical Details'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-slate-700"
            >
              Close Report
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Add to Watch List
            </button>
          </div>

          {/* Technical Details (Collapsible) */}
          {showDetails && (
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600 mt-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Technical Analysis Details</h4>
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div>Raw NDVI Value: {location.vegetation}</div>
                <div>Soil Moisture Reading: {location.soilMoisture}% VWC</div>
                <div>Risk Algorithm: Distance-weighted proximity analysis</div>
                <div>Coordinate System: WGS84 (EPSG:4326)</div>
                <div>Data Timestamp: {formatDateTime(location.timestamp)}</div>
                <div>Processing Time: {new Date().toISOString()}</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">
              Environmental Risk Assessment Report • Generated: {formatDateTime(location.lastUpdated)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Greenora v1
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
