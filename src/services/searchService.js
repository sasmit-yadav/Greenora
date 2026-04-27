// Search service for environmental monitoring zones
export const searchService = {
  // Mock data for environmental monitoring zones (Delhi NCR region based on map bounds)
  zones: [
    {
      id: 'zone-001',
      name: 'Delhi Industrial District',
      type: 'Industrial Zone',
      coordinates: '28.7041° N, 77.1025° E',
      riskLevel: 'high',
      description: 'Heavy industrial area with multiple pollution sources',
      bounds: [[28.65, 77.05], [28.75, 77.15]]
    },
    {
      id: 'zone-002',
      name: 'Noida Residential Complex',
      type: 'Residential Zone',
      coordinates: '28.5355° N, 77.3910° E',
      riskLevel: 'medium',
      description: 'Urban residential area with moderate environmental concerns',
      bounds: [[28.50, 77.35], [28.55, 77.42]]
    },
    {
      id: 'zone-003',
      name: 'Yamuna River Green Belt',
      type: 'Green Space',
      coordinates: '28.6139° N, 77.2090° E',
      riskLevel: 'low',
      description: 'Protected river corridor with vegetation coverage',
      bounds: [[28.60, 77.18], [28.65, 77.25]]
    },
    {
      id: 'zone-004',
      name: 'Gurgaon Industrial Estate',
      type: 'Industrial Zone',
      coordinates: '28.4595° N, 77.0266° E',
      riskLevel: 'critical',
      description: 'Major industrial complex with high pollution risk',
      bounds: [[28.42, 76.98], [28.48, 77.08]]
    },
    {
      id: 'zone-005',
      name: 'Connaught Place Commercial',
      type: 'Commercial Zone',
      coordinates: '28.6315° N, 77.2167° E',
      riskLevel: 'medium',
      description: 'High-density commercial area with traffic pollution',
      bounds: [[28.62, 77.20], [28.64, 77.23]]
    },
    {
      id: 'zone-006',
      name: 'Faridabad Residential Sector',
      type: 'Residential Zone',
      coordinates: '28.4089° N, 77.3178° E',
      riskLevel: 'low',
      description: 'Planned residential area with good air quality',
      bounds: [[28.38, 77.28], [28.42, 77.35]]
    },
    {
      id: 'zone-007',
      name: 'Ghaziabad Industrial Area',
      type: 'Industrial Zone',
      coordinates: '28.6692° N, 77.4538° E',
      riskLevel: 'high',
      description: 'Manufacturing district with air quality concerns',
      bounds: [[28.64, 77.42], [28.68, 77.48]]
    },
    {
      id: 'zone-008',
      name: 'Okhla Bird Sanctuary',
      type: 'Green Space',
      coordinates: '28.5417° N, 77.2994° E',
      riskLevel: 'low',
      description: 'Protected wetland area with high biodiversity',
      bounds: [[28.52, 77.28], [28.56, 77.32]]
    },
    {
      id: 'zone-009',
      name: 'Lajpat Nagar Market',
      type: 'Commercial Zone',
      coordinates: '28.5783° N, 77.2400° E',
      riskLevel: 'medium',
      description: 'Busy commercial area with moderate environmental impact',
      bounds: [[28.57, 77.22], [28.58, 77.25]]
    },
    {
      id: 'zone-010',
      name: 'Karol Bagh Residential',
      type: 'Residential Zone',
      coordinates: '28.6517° N, 77.1889° E',
      riskLevel: 'high',
      description: 'Dense residential area with traffic congestion',
      bounds: [[28.64, 77.17], [28.66, 77.20]]
    }
  ],

  // Search function with comprehensive filtering
  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 150))

    const lowercaseQuery = query.toLowerCase().trim()
    
    // If query is empty, return all zones
    if (lowercaseQuery === '') {
      return this.zones.slice(0, 10)
    }
    
    // Score-based search for better relevance
    const scored = this.zones.map(zone => {
      let score = 0
      
      if (zone.name.toLowerCase().includes(lowercaseQuery)) score += 100
      if (zone.type.toLowerCase().includes(lowercaseQuery)) score += 80
      if (zone.description.toLowerCase().includes(lowercaseQuery)) score += 60
      if (zone.coordinates.toLowerCase().includes(lowercaseQuery)) score += 70
      if (zone.riskLevel.toLowerCase().includes(lowercaseQuery)) score += 90
      
      // Boost based on risk level if mentioned
      if (lowercaseQuery === 'critical' && zone.riskLevel === 'critical') score += 50
      if (lowercaseQuery === 'high' && zone.riskLevel === 'high') score += 50
      if (lowercaseQuery === 'medium' && zone.riskLevel === 'medium') score += 50
      if (lowercaseQuery === 'low' && zone.riskLevel === 'low') score += 50
      
      return { ...zone, score }
    })
    
    // Filter by score > 0 and sort
    return scored
      .filter(z => z.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, ...zone }) => zone)
  },

  // Get zone by ID
  getZoneById(id) {
    return this.zones.find(zone => zone.id === id)
  },

  // Get all zones
  getAllZones() {
    return this.zones
  },

  // Get zones by risk level
  getZonesByRiskLevel(riskLevel) {
    return this.zones.filter(zone => zone.riskLevel === riskLevel)
  }
}