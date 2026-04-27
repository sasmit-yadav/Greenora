// Simulated real-time data service
export const dataService = {
  stats: {
    highRiskArea: 23.4,
    averageNDVI: 0.62,
    affectedPopulation: 127500,
    monitored_area_sqkm: 8420,
    last_update: new Date()
  },

  layers: [
    {
      id: 'risk-map',
      name: 'Risk Map',
      description: 'Environmental risk overlay',
      color: '#f97316',
      opacity: 0.58,
      visible: true,
      category: 'risk'
    },
    {
      id: 'ndvi-map',
      name: 'NDVI - Vegetation',
      description: 'Normalized Difference Vegetation Index overlay',
      color: '#22c55e',
      opacity: 0.58,
      visible: false,
      category: 'vegetation'
    },
    {
      id: 'heat-map',
      name: 'Heat Map',
      description: 'Surface heat intensity overlay',
      color: '#ef4444',
      opacity: 0.58,
      visible: false,
      category: 'heat'
    }
  ],

  alerts: [],

  // Simulate real-time updates
  subscribeToUpdates(callback) {
    const interval = setInterval(() => {
      this.stats.highRiskArea += (Math.random() - 0.5) * 0.5;
      this.stats.averageNDVI += (Math.random() - 0.5) * 0.02;
      this.stats.last_update = new Date();
      callback(this.stats);
    }, 5000);

    return () => clearInterval(interval);
  },

  // Analyze location from clicked overlay colors only.
  analyzeLocation(lat, lng, observed = {}) {
    const riskBounds = {
      north: 29.924235257384026,
      south: 27.79739697396028,
      east: 79.11242664351686,
      west: 76.7404589542527
    };

    const isInBounds = lat >= riskBounds.south && lat <= riskBounds.north &&
                       lng >= riskBounds.west && lng <= riskBounds.east;

    let riskLevel = 'low';
    let riskScore = typeof observed.riskOverlayScore === 'number' ? observed.riskOverlayScore : 0;
    let vegetation = typeof observed.ndviGreennessScore === 'number' ? observed.ndviGreennessScore : 50;
    let soilMoisture = 20 + (vegetation * 0.7);

    if (isInBounds) {
      riskScore = Math.max(0, Math.min(100, riskScore));
      vegetation = Math.max(0, Math.min(100, vegetation));
      soilMoisture = Math.max(0, Math.min(100, soilMoisture));
    }

    if (riskScore > 80) riskLevel = 'critical';
    else if (riskScore > 65) riskLevel = 'high';
    else if (riskScore > 40) riskLevel = 'medium';
    else riskLevel = 'low';

    return {
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
      riskLevel,
      riskScore: Number(riskScore.toFixed(1)),
      inMonitoredArea: isInBounds,
      vegetation: vegetation.toFixed(1),
      soilMoisture: soilMoisture.toFixed(1)
    };
  }
};
