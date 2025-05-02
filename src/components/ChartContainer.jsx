// components/ui/ChartContainer.js
import React from "react"

export function ChartContainer({ config, className = "", children }) {
  const styleVars = Object.entries(config).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value.color
    return acc
  }, {})

  return (
    <div
      className={`bg-white rounded-xl min-w-full shadow-md border border-gray-100 ${className}`}
      style={styleVars}
    >
      {children}
    </div>
  )
}
