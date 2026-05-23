import React, { useEffect, useRef } from 'react';

const FooterComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (!mapRef.current || mapRef.current._leaflet_id) return;

      const L   = window.L;
      const lat = 6.9271;
      const lng = 79.8612;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // ── Warm/light tile layer to match the cream theme ──
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            width: 14px; height: 14px;
            background: #c4622d;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 0 0 4px rgba(196,98,45,0.25);
          "></div>`,
        iconSize:   [14, 14],
        iconAnchor: [7,  7],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
          <strong style="font-family:'Playfair Display',serif;font-size:14px;color:#1c1917;">
            Phegon Hotel
          </strong><br>
          <span style="font-size:12px;color:#7a6f67;">5-Star Luxury · Colombo</span>
        `)
        .openPopup();

      L.control.zoom({ position: 'bottomright' }).addTo(map);
    };
    document.head.appendChild(script);

    return () => { document.head.removeChild(link); };
  }, []);

  const colHeadStyle = {
    fontSize: 10, letterSpacing: '0.22em',
    textTransform: 'uppercase', fontWeight: 600,
    color: 'var(--terra)', marginBottom: 20,
  };

  const linkStyle = {
    fontSize: 14,
    color: 'var(--ink-3)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    display: 'block',
  };

  const hoverIn  = e => e.currentTarget.style.color = 'var(--terra)';
  const hoverOut = e => e.currentTarget.style.color = 'var(--ink-3)';

  return (
    <footer style={{
      background:  'var(--cream-2)',
      borderTop:   '1px solid var(--line)',
      fontFamily:  "'Instrument Sans', sans-serif",
    }}>

      {/* ── MAP BAND ── */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: 280,
          background: 'var(--cream-3)',
          borderBottom: '1px solid var(--line)',
        }}
      />

      {/* ── DIVIDER WITH BRAND MARK ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '36px 64px 0',
        gap: 20,
      }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 28px',
          border: '1px solid var(--line)',
          borderRadius: 999,
          background: 'var(--white)',
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15, fontWeight: 500,
            color: 'var(--ink)', letterSpacing: '0.06em',
          }}>Hotel</span>
          <span style={{ color: 'var(--terra)', fontSize: 11 }}>★★★★★</span>
        </div>
        <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '56px 64px 48px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 48,
        borderBottom: '1px solid var(--line)',
      }}>

        {/* Brand column */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24, fontWeight: 400,
            color: 'var(--ink)',
            letterSpacing: '0.02em',
            marginBottom: 14,
          }}>A sanctuary of refined comfort.</p>

          <p style={{
            fontSize: 14, lineHeight: 1.8,
            color: 'var(--ink-3)',
            maxWidth: 290, marginBottom: 24,
          }}>
            Est. 2010 · Nestled in the heart of the city, where every
            detail is chosen with intention and every stay becomes a
            cherished memory.
          </p>

          {/* Rating pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'var(--terra-pale)',
            border: '1px solid var(--terra-mid)',
            borderRadius: 999,
            padding: '8px 18px',
            marginBottom: 28,
          }}>
            <span style={{ color: 'var(--terra)', fontSize: 13 }}>★★★★★</span>
            <span style={{
              fontSize: 12, color: 'var(--ink-3)',
              letterSpacing: '0.06em', fontWeight: 500,
            }}>
              5-Star · 4.9 Guest Rating
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { label: 'Facebook',  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label}
                style={{
                  width: 36, height: 36, borderRadius: 999,
                  border: '1.5px solid var(--line-strong)',
                  background: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.22s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--terra)';
                  e.currentTarget.style.background  = 'var(--terra-pale)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--line-strong)';
                  e.currentTarget.style.background  = 'var(--white)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--ink-3)">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Explore column */}
        <div>
          <p style={colHeadStyle}>Explore</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Rooms & Suites', 'Spa & Wellness', 'Fine Dining', 'Events & Weddings', 'Gallery'].map(item => (
              <li key={item}>
                <a href="#" style={linkStyle}
                  onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Guest Services column */}
        <div>
          <p style={colHeadStyle}>Guest Services</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Make a Booking', 'Find My Booking', 'Cancellation Policy', 'Loyalty Program', 'Gift Cards'].map(item => (
              <li key={item}>
                <a href="#" style={linkStyle}
                  onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <p style={colHeadStyle}>Contact Us</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Address */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 15, marginTop: 1 }}>📍</span>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>
                42 Harbour View Lane<br />Colombo 03, Sri Lanka
              </p>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>📞</span>
              <a href="tel:+94112345678" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                +94 11 234 5678
              </a>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>✉️</span>
              <a href="mailto:reservations@phegon.com" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                reservations@phegon.com
              </a>
            </div>

            {/* Hours card */}
            <div style={{
              marginTop: 4,
              background: 'var(--white)',
              border: '1.5px solid var(--line)',
              borderRadius: 10, padding: '14px 18px',
            }}>
              <p style={{
                fontSize: 10, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--terra)',
                fontWeight: 600, marginBottom: 8,
              }}>Reception Hours</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: 0, lineHeight: 1.75 }}>
                Open 24 hours · 7 days a week<br />
                Concierge: 07:00 – 23:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '22px 64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: 0 }}>
          © {new Date().getFullYear()}{' '}
          <span style={{ color: 'var(--terra)' }}>Hotel</span>
          {' '}· All Rights Reserved · Luxury stays, unforgettable memories
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(item => (
            <a key={item} href="#" style={{
              fontSize: 12, color: 'var(--ink-4)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--terra)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-4)'}
            >{item}</a>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default FooterComponent;