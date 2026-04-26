# Urban Environmental Risk Dashboard

A production-ready, senior-level React dashboard for real-time monitoring of urban environmental risks, vegetation health, and thermal intensity.

## 🎯 Features

### Dashboard Components
- **Professional Header** - Branding with real-time status indicators
- **Advanced Sidebar** - Multi-panel layout with collapsible sections
  - Key metrics with live updates
  - Real-time alerts and events
  - Layer controls for map visualization
  - Interactive color legend
  - System status information

### Map Integration
- **Leaflet-based Map** - Full GIS visualization with:
  - Risk Map overlay (environmental risk zones)
  - NDVI normalized vegetation index
  - Temperature intensity mapping
  - Zoom controls and layer management
  - Real-time zoom level display

### Real-Time Features
- **Live Data Service** - Simulated real-time stats updates every 5 seconds
- **Dynamic Statistics**
  - High Risk Area % with trend analysis
  - Average NDVI (vegetation health)
  - Heat Intensity Index with thermal data
  - Population at risk estimates
  
### Advanced Controls
- **Layer Toggle** - Show/hide map layers dynamically
- **Alert System** - Real-time alerts with severity levels (Critical/Warning/Info)
- **Interactive Legend** - Comprehensive color-coded reference for all data layers
- **Map Legend Display** - Overlay with real-time zoom information

### UI/UX Excellence
- Dark theme with professional color scheme
- Smooth animations and transitions
- Responsive layout (1536+ width optimized)
- Gradient backgrounds and glassmorphism effects
- Hover states and interactive feedback
- Clean typography and spacing

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard container
│   │   ├── Header.jsx             # Top navigation bar
│   │   ├── Sidebar.jsx            # Left panel with controls
│   │   ├── MapContainer.jsx       # Map iframe wrapper
│   │   ├── StatCard.jsx           # Reusable metric card
│   │   ├── LayerControl.jsx       # Layer toggle switches
│   │   ├── AlertsPanel.jsx        # Alert display panel
│   │   └── Legend.jsx             # Color legend reference
│   ├── services/
│   │   └── dataService.js         # Real-time data management
│   ├── App.jsx                    # App root
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind + custom styles
├── public/
│   └── map-viewer.html            # Map iframe page
├── map/                           # Original GIS map files
│   ├── index.html                 # Legacy map
│   ├── css/                       # Leaflet & styling
│   ├── js/                        # Leaflet libraries
│   └── data/                      # GIS overlays
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

The dashboard will:
1. ✅ Load the React app with header and layout
2. ✅ Display real-time metrics with updates every 5s
3. ✅ Render the full GIS map in the right panel
4. ✅ Allow toggling map layers from the sidebar
5. ✅ Show alerts and environmental data

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Update Real-Time Data
Edit `src/services/dataService.js`:
- Modify `stats` object for different metrics
- Add/remove layers in the `layers` array
- Customize alert items

### Change Colors & Theme
Edit `src/index.css` and use Tailwind classes:
- Color variants: red, green, orange, blue
- Dark theme base colors: slate-50 through slate-950

### Modify Statistics
All metrics are in `src/components/Sidebar.jsx`:
```jsx
<StatCard
  title="High Risk Area"
  value={stats.highRiskArea}
  unit="%"
  icon="🚨"
  color="red"
  trend={2.1}
  description="Critical environmental zones"
/>
```

## 📊 Data Flow

1. **dataService.js** - Central data source
2. **Sidebar.jsx** - Fetches and displays stats with real-time subscription
3. **MapContainer.jsx** - Manages layer visibility
4. **map-viewer.html** - Receives layer updates via postMessage

## 🔧 Technical Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Leaflet** - GIS mapping library
- **PostCSS** - CSS processing

## 📈 Performance

- ✅ Fast hot module reloading
- ✅ Optimized component rendering
- ✅ Lazy iframe loading
- ✅ Efficient state management
- ✅ Minimal bundle size

## 🎯 Production Readiness

This dashboard includes:
- ✅ Component composition best practices
- ✅ Proper state management patterns
- ✅ Error boundaries (ready to add)
- ✅ Responsive design consideration
- ✅ Real-time data subscription pattern
- ✅ Clean code architecture
- ✅ Modular and scalable structure

## 🔮 Future Enhancements

- Integration with real API endpoints
- Chart library (Chart.js/Recharts) for analytics
- Export reports functionality
- User authentication & authorization
- Notification system
- Mobile responsive layout
- Dark/light theme toggle
- Advanced filtering & search

## 📝 License

Open Source - Urban Environmental Monitoring

---

**Built with ❤️ for environmental monitoring and urban planning**
