import React, { useState, useRef } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import MapContainer from './MapContainer'

export default function Dashboard() {
  const [activeLayerIds, setActiveLayerIds] = useState(['risk-map'])
  const mapRef = useRef(null)

  const handleLayerToggle = (layerId) => {
    setActiveLayerIds(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    )
  }

  const handleLocationSelect = (location) => {
    // Send message to map iframe to zoom to selected location
    if (mapRef.current) {
      const message = {
        type: 'zoomToLocation',
        location: {
          name: location.name,
          bounds: location.bounds,
          coordinates: location.coordinates
        }
      }
      mapRef.current.postMessage(message, '*')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Header */}
      <Header onLocationSelect={handleLocationSelect} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row bg-gradient-to-br from-black via-emerald-950/20 to-black">
        {/* Sidebar */}
        <Sidebar onLayerToggle={handleLayerToggle} activeLayerIds={activeLayerIds} onLocationSelect={handleLocationSelect} />

        {/* Map Area */}
        <main className="flex-1 overflow-hidden">
          <MapContainer
            ref={mapRef}
            activeLayerIds={activeLayerIds}
          />
        </main>
      </div>
    </div>
  )
}
