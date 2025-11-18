'use client'
import { useEffect, useRef } from 'react'

export default function SalesChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find max value for scaling
    const maxRevenue = Math.max(...data.map(item => item.revenue))

    // Draw chart
    ctx.beginPath()
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 3

    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = canvas.height - padding - (item.revenue / maxRevenue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points and labels
    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = canvas.height - padding - (item.revenue / maxRevenue) * chartHeight

      // Point
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = '#f59e0b'
      ctx.fill()

      // Month label
      ctx.fillStyle = '#6b7280'
      ctx.font = '12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(
        new Date(2024, item._id - 1).toLocaleString('default', { month: 'short' }),
        x,
        canvas.height - padding + 20
      )

      // Revenue label
      ctx.fillStyle = '#374151'
      ctx.font = '10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(
        `$${(item.revenue / 1000).toFixed(1)}k`,
        x,
        y - 10
      )
    })

  }, [data])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Sales Overview</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-64"
        />
      </div>
    </div>
  )
}