import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import LocationPopup from './LocationPopup'
import { dataService } from '../services/dataService'

const MapContainer = forwardRef(({ activeLayerIds }, ref) => {
  const iframeRef = useRef(null)
  const [location, setLocation] = useState(null)

  // Expose iframe ref to parent component
  useImperativeHandle(ref, () => ({
    postMessage: (message, targetOrigin) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(message, targetOrigin)
      }
    }
  }))

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // Send layer visibility to iframe
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'UPDATE_LAYERS',
            payload: { activeLayerIds }
          },
          '*'
        )
      } catch (error) {
        console.log('Map layer update sent')
      }
    }
  }, [activeLayerIds])

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'LOCATION_CLICKED') {
        const { latitude, longitude } = event.data.payload;
        // Analyze the clicked location using dataService
        const locationData = dataService.analyzeLocation(
          parseFloat(latitude),
          parseFloat(longitude),
          event.data.payload
        );
        setLocation({
          ...locationData,
          timestamp: event.data.payload.timestamp,
          lastUpdated: new Date().toISOString()
        });
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="relative w-full min-h-[55vh] h-full bg-black overflow-hidden rounded-lg border border-emerald-950/70">
      {/* Map iframe */}
      <iframe
        ref={iframeRef}
        src="/map_new/index.html"
        className="w-full h-full border-0"
        title="Greenora Map"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* Attribution Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-xs text-emerald-200/45 pointer-events-none">
        <p>Map data © OpenStreetMap contributors, Imagery © QGIS2Web</p>
      </div>

      {/* Mini Legend Strips */}
      <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-black/75 border border-emerald-900/70 rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg space-y-2 max-w-[90vw]">
          <div className="text-[10px] uppercase tracking-wider text-emerald-200/70 font-semibold">
            Risk Legend
          </div>
          <div className="flex items-center gap-2">
            <div className="w-40 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 via-orange-500 to-red-600"></div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-100/80">
              <span>Low</span>
              <span className="text-emerald-300/50">•</span>
              <span>High</span>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-emerald-200/70 font-semibold">
            Heat (Inferno)
          </div>
          <div className="flex items-center gap-2">
            <div className="w-40 h-2 rounded-full bg-gradient-to-r from-[#160b39] via-[#6a00a8] via-[#b12a90] via-[#e16462] to-[#fca636]"></div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-100/80">
              <span>Cool</span>
              <span className="text-emerald-300/50">•</span>
              <span>Hot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Popup */}
      <LocationPopup location={location} onClose={() => setLocation(null)} />
    </div>
  )
})

MapContainer.displayName = 'MapContainer'

export default MapContainer
