import React from 'react'

export default function StatCard({ title, value, unit, icon, color, trend, description }) {
  const colorClasses = {
    red: 'from-red-500/10 via-red-500/5 to-red-600/10 border-red-500/30 hover:border-red-500/60 hover:shadow-red-500/10',
    green: 'from-green-500/10 via-green-500/5 to-green-600/10 border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/10',
    orange: 'from-orange-500/10 via-orange-500/5 to-orange-600/10 border-orange-500/30 hover:border-orange-500/60 hover:shadow-orange-500/10',
    blue: 'from-blue-500/10 via-blue-500/5 to-blue-600/10 border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-500/10',
  }

  const textColorClasses = {
    red: 'text-red-400',
    green: 'text-green-400',
    orange: 'text-orange-400',
    blue: 'text-blue-400',
  }

  const bgColorClasses = {
    red: 'bg-red-500/20',
    green: 'bg-green-500/20',
    orange: 'bg-orange-500/20',
    blue: 'bg-blue-500/20',
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-5 border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform rotate-12 scale-150"></div>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${bgColorClasses[color]} animate-pulse`}></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {title}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className={`text-4xl font-black ${textColorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
              {typeof value === 'number' ? value.toFixed(1) : value}
            </p>
            <p className={`text-lg font-semibold ${textColorClasses[color]} opacity-80`}>{unit}</p>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${bgColorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
            trend > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}>
            <span>{trend > 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
          <span className="text-xs text-slate-500">vs last week</span>
        </div>
      )}

      <p className="text-xs text-slate-500 leading-relaxed relative z-10 group-hover:text-slate-400 transition-colors duration-300">
        {description}
      </p>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
