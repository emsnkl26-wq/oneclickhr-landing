import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

// Rendered at the edge rather than prerendered: @vercel/og's Node build
// resolves its WASM asset via fileURLToPath, which fails on project paths
// containing spaces. The edge runtime sidesteps that and costs nothing here.
export const runtime = 'edge'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The default static card, used wherever a page-specific title is absent. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#0F172A',
        padding: '72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -180,
          left: 260,
          width: 820,
          height: 400,
          borderRadius: 9999,
          background: 'rgba(255,106,0,0.18)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            background: '#FF6A00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          ✓
        </div>
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: '#fff' }}>
          <span>Oneclick</span>
          <span style={{ color: '#FF8A3D' }}>HR</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 44,
          fontSize: 74,
          lineHeight: 1.06,
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: '#fff',
          maxWidth: 940,
        }}
      >
        HR Management in One Click
      </div>
      <div style={{ marginTop: 28, fontSize: 30, color: '#94A3B8', maxWidth: 860 }}>
        Attendance, leave, payroll, work authorization and tasks in one calm place.
      </div>
    </div>,
    size,
  )
}
