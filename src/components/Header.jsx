import React from 'react'

export default function Header() {
  return (
    <header className="bg-black/95 border-b border-emerald-950/80 shadow-2xl backdrop-blur-sm">
      <div className="px-6 py-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 min-w-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
                <span className="text-white font-bold text-xl">🌍</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-700/60"></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white tracking-tight truncate">
                Greenora
                <span className="ml-2 text-emerald-300 font-mono text-sm bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-700/40">
                  v1
                </span>
              </h1>
              <p className="text-sm text-emerald-200/80 flex items-center gap-2 truncate">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Real-time monitoring & analytics platform
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-3 rounded-lg border border-emerald-900/60 bg-emerald-950/30 px-4 py-3 md:px-4 md:py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-300">System Online</span>
            </div>
            <div className="w-px h-4 bg-emerald-800"></div>
            <div className="text-right">
              <p className="text-xs text-emerald-200/60">Last Updated</p>
              <p className="text-sm font-semibold text-emerald-100">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
