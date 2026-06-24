export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #000000',
        padding: '80px clamp(20px, 4vw, 60px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Office Info */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '80px',
        }}
      >
        <OfficeColumn
          city="Indonesia HQ"
          cityEn="BALI"
          address="Jl. Sunset Road No 777, Bali 80361"
          detail="+62 812-3753-5508"
        />
        <OfficeColumn
          city="Indonesia Commercial"
          cityEn="JAKARTA"
          address="Menara Cakrawala 12th Floor 5A, Jl MH Thamrin Kav 9"
          detail="+62 877-860-10290"
        />
        <OfficeColumn
          city="Japan HQ"
          cityEn="FUKUOKA"
          address="2-chome-6-11 Daimyo, Chuo Ward, Fukuoka 810-0041"
          detail="+81 90-8348-8068"
        />
        <div>
          <p style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            color: '#000000',
            marginBottom: '20px',
          }}>
            WEB
          </p>
          <p style={{ fontSize: '14px', color: '#666666', lineHeight: 2 }}>
            fjällgroup.com
            <br />
            greenshift.id
            <br />
            fjallgreentech.com
          </p>
        </div>
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
          paddingBottom: '0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(80px, 18vw, 320px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: '#000000',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
          }}
        >
          FJÄLL
        </span>
      </div>
    </footer>
  )
}

function OfficeColumn({
  city,
  cityEn,
  address,
  detail,
}: {
  city: string
  cityEn: string
  address: string
  detail: string
}) {
  return (
    <div>
      <p style={{
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        color: '#000000',
        marginBottom: '20px',
      }}>
        {cityEn}
      </p>
      <p style={{ fontSize: '16px', fontWeight: 500, color: '#000000', marginBottom: '8px' }}>
        {city}
      </p>
      <p style={{
        fontSize: '14px',
        color: '#666666',
        lineHeight: 1.6,
        marginBottom: '12px',
        maxWidth: '260px',
      }}>
        {address}
      </p>
      <p style={{
        fontSize: '13px',
        color: '#5E9E8C',
        letterSpacing: '0.05em',
      }}>
        {detail}
      </p>
    </div>
  )
}
