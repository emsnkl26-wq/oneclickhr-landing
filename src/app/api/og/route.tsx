import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const BRAND = '#FF6A00'
const CHARCOAL = '#0F172A'

/**
 * Branded 1200x630 OG card. Rendered at the edge so every page gets a real
 * preview image without shipping a raster asset per route. System sans is used
 * deliberately: fetching a font file per render would add latency for no
 * visible gain at this size.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('title')?.slice(0, 120)
  const title = raw && raw.trim().length > 0 ? raw : 'HR Management in One Click'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: CHARCOAL,
        padding: '72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: 300,
          width: 800,
          height: 400,
          borderRadius: 9999,
          background: 'rgba(255,106,0,0.18)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: BRAND,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          ✓
        </div>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#fff' }}>
          <span>Oneclick</span>
          <span style={{ color: '#FF8A3D' }}>HR</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: title.length > 60 ? 58 : 72,
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#fff',
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36 }}>
          <div style={{ width: 48, height: 4, borderRadius: 999, background: BRAND }} />
          <div style={{ fontSize: 26, color: '#94A3B8' }}>oneclickhr.app</div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
