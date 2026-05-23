import React, { useState, useEffect, useRef } from 'react';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';
import hotelImage  from '../../assets/hotel4.jpg';
import hotelImage2 from '../../assets/hotel2.jpg';
import hotelImage3 from '../../assets/hotel3.jpg';
import hotelImage4 from '../../assets/infinitypool.jpg';
import hotelImage5 from '../../assets/finedining.jpg';
import hotelImage6 from '../../assets/royalsuites.jpg';
import hotelImage7 from '../../assets/secretgarden.jpg';
import hotelImage8 from '../../assets/lobby.jpg';

/* ================================================================
   SLIDES DATA
================================================================ */
const SLIDES = [
  {
    img: hotelImage,
    eyebrow: '✦ Phegon Hotel · Est. 2010 · 5-Star Luxury',
    title: <>Where Comfort<br />Meets <em>Elegance</em></>,
    cta1: { label: 'Explore Rooms',    href: '/rooms' },
    cta2: { label: 'Find My Booking',  href: '/find-booking' },
  },
  {
    img: hotelImage2,
    eyebrow: '✦ Award-Winning Retreat',
    title: <>Restore.<br /><em>Renew.</em> Indulge.</>,
    cta1: { label: 'View Spa',          href: '/rooms' },
    cta2: { label: 'Book a Treatment',  href: '/find-booking' },
  },
  {
    img: hotelImage3,
    eyebrow: '✦ Michelin Recognised',
    title: <>A Feast for<br />Every <em>Sense</em></>,
    cta1: { label: 'Reserve a Table',  href: '/rooms' },
    cta2: { label: 'View Menu',         href: '/find-booking' },
  },
];

const AUTOPLAY_MS = 5000;

/* ================================================================
   HERO
================================================================ */
const Hero = () => {
  const [cur, setCur]         = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef              = useRef(null);
  const total                 = SLIDES.length;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur(c => (c + 1) % total);
      setAnimKey(k => k + 1);
    }, AUTOPLAY_MS);
  };

  const goTo = n => {
    const next = ((n % total) + total) % total;
    setCur(next);
    setAnimKey(k => k + 1);
    startTimer();
  };

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  const s = SLIDES[cur];

  return (
    <header className="header-banner" style={{ userSelect: 'none' }}>
      <style>{`
        @keyframes heroItemReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressRun {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .carousel-arrow {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(240,235,226,0.07);
          border: 1px solid rgba(240,235,226,0.15);
          color: rgba(240,235,226,0.65);
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-size: 20px; line-height: 1;
          transition: all 0.22s; flex-shrink: 0; padding: 0;
        }
        .carousel-arrow:hover { background: var(--terra); border-color: var(--terra); color: #fff; }
        .carousel-dot {
          height: 2px; border-radius: 2px;
          background: rgba(240,235,226,0.20);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          flex-shrink: 0;
        }
        .carousel-dot.active { background: var(--terra); }
        .carousel-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          background: var(--terra); z-index: 10;
          animation: progressRun ${AUTOPLAY_MS}ms linear both;
          border-radius: 0 2px 2px 0;
        }
        .gallery-tile:hover .gallery-tile-img { transform: scale(1.06); }
        .gallery-tile::after {
          content: ''; position: absolute; inset: 0; border-radius: 14px;
          border: 1.5px solid transparent;
          transition: border-color 0.3s; pointer-events: none;
        }
        .gallery-tile:hover::after { border-color: var(--terra); }
        .photo-strip-tile:hover .photo-strip-img { transform: scale(1.06); }
        @keyframes fadeUpAnim {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {SLIDES.map((slide, i) => (
        <img key={i} src={slide.img} alt="" className="header-image"
          style={{
            opacity: i === cur ? 1 : 0,
            transform: i === cur ? 'scale(1)' : 'scale(1.06)',
            transition: 'opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 8s cubic-bezier(0.4,0,0.2,1)',
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.30) saturate(0.75)',
          }}
        />
      ))}

      <div className="overlay" />

      <div style={{
        position: 'absolute', top: 28, right: 52,
        fontFamily: "'Playfair Display', serif",
        fontSize: 13, color: 'rgba(240,235,226,0.30)',
        zIndex: 10, letterSpacing: '0.08em',
      }}>
        <span style={{ color: 'var(--terra)' }}>{String(cur + 1).padStart(2, '0')}</span>
        {' / '}{String(total).padStart(2, '0')}
      </div>

      <div className="overlay-content" key={animKey}>
        <p className="hero-eyebrow" style={{ animation: 'heroItemReveal 0.65s 0.10s cubic-bezier(0,0,0.2,1) both' }}>
          {s.eyebrow}
        </p>
        <h1 style={{ animation: 'heroItemReveal 0.75s 0.25s cubic-bezier(0,0,0.2,1) both' }}>
          {s.title}
        </h1>
        <h3 style={{ animation: 'heroItemReveal 0.70s 0.40s cubic-bezier(0,0,0.2,1) both' }}>
          {s.sub}
        </h3>
        <div className="hero-actions" style={{ animation: 'heroItemReveal 0.70s 0.55s cubic-bezier(0,0,0.2,1) both' }}>
          <a href={s.cta1.href} className="hero-btn-primary">{s.cta1.label}</a>
          <a href={s.cta2.href} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: 'rgba(240,235,226,0.80)',
            border: '1.5px solid rgba(240,235,226,0.22)',
            padding: '15px 36px', borderRadius: 999,
            fontSize: 13, fontWeight: 500,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {s.cta2.label}
          </a>
        </div>
      </div>

      <div className="hero-badge">
        {[
          { num: '200+', lbl: 'Rooms & Suites' },
          { num: '15k',  lbl: 'Happy Guests' },
          { num: '4.9★', lbl: 'Guest Rating' },
        ].map(({ num, lbl }) => (
          <div className="hero-stat" key={lbl}>
            <span className="num">{num}</span>
            <span className="lbl">{lbl}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 44, left: 52, display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
        <button className="carousel-arrow" onClick={() => goTo(cur - 1)} aria-label="Previous">‹</button>
        {SLIDES.map((_, i) => (
          <div key={i}
            className={`carousel-dot${i === cur ? ' active' : ''}`}
            style={{ width: i === cur ? 32 : 16 }}
            onClick={() => goTo(i)}
          />
        ))}
        <button className="carousel-arrow" onClick={() => goTo(cur + 1)} aria-label="Next">›</button>
      </div>

      <div className="carousel-progress" key={`p-${animKey}`} />
    </header>
  );
};

/* ================================================================
   TESTIMONIALS CAROUSEL
================================================================ */
const TESTIMONIALS = [
  {
    quote: "From the moment we arrived, every detail felt considered. The service was impeccable, the rooms breathtaking. Phegon has set a new standard for what luxury truly means.",
    author: "Sarah M.",
    role: "Verified Guest",
    stay: "Presidential Suite",
  },
  {
    quote: "The infinity pool at sunset is something I will never forget. The staff remembered my name from day one. This is what hospitality at its finest looks like.",
    author: "James R.",
    role: "Verified Guest",
    stay: "Deluxe King Room",
  },
  {
    quote: "We celebrated our anniversary here and Phegon made it utterly magical. The fine dining experience alone is worth the journey. We will be back every year.",
    author: "Amara & Daniel K.",
    role: "Verified Guests",
    stay: "Honeymoon Suite",
  },
];

const TestimonialsCarousel = () => {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
  };

  const goTo = i => { setActive(i); startTimer(); };

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  const t = TESTIMONIALS[active];

  return (
    <div style={{ background: 'var(--ink)', padding: '100px 64px', textAlign: 'center' }}>

      {/* Decorative quote mark */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 120, lineHeight: 0.6,
        color: 'var(--terra)', opacity: 0.25,
        marginBottom: 40, userSelect: 'none',
      }}>"</div>

      {/* Quote */}
      <blockquote key={`q-${active}`} style={{
        maxWidth: 720, margin: '0 auto 36px',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(20px, 2.5vw, 28px)',
        fontStyle: 'italic', fontWeight: 400,
        color: 'rgba(250,247,242,0.92)', lineHeight: 1.6,
        animation: 'fadeUpAnim 0.5s cubic-bezier(0,0,0.2,1) both',
      }}>
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <div key={`a-${active}`} style={{
        animation: 'fadeUpAnim 0.5s 0.1s cubic-bezier(0,0,0.2,1) both',
        marginBottom: 52,
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, color: '#faf7f2', marginBottom: 6,
        }}>— {t.author}</p>
        <p style={{
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--terra)', fontWeight: 600, margin: 0,
        }}>
          {t.role} · {t.stay} · ★★★★★
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === active ? 32 : 8, height: 8,
            borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer',
            background: i === active ? 'var(--terra)' : 'rgba(250,247,242,0.2)',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          }} />
        ))}
      </div>
    </div>
  );
};

/* ================================================================
   HOME PAGE
================================================================ */
const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  return (
    <div className="home">

      <Hero />

      <RoomSearch handleSearchResult={setRoomSearchResults} />

      {roomSearchResults.length > 0 && (
        <div className="home-section">
          <span className="section-label">Availability Results</span>
          <h2 className="section-title">Rooms <em>Available</em> for Your Stay</h2>
          <RoomResult roomSearchResults={roomSearchResults} />
          <a className="view-rooms-home" href="/rooms">View All Rooms →</a>
        </div>
      )}

      {/* Feature strip */}
      <div className="features-strip">
        {[
          { icon: '🏊', title: 'Pool & Spa',    desc: 'Unwind in our heated infinity pool and award-winning spa retreat.' },
          { icon: '🍽️', title: 'Fine Dining',   desc: 'Michelin-recognised chefs craft each dish with locally-sourced ingredients.' },
          { icon: '🤝', title: 'Concierge',      desc: 'Round-the-clock personal concierge for every need, great or small.' },
          { icon: '📍', title: 'Prime Location', desc: "Perfectly situated steps from the city's finest attractions." },
        ].map(({ icon, title, desc }) => (
          <div className="feature-item" key={title}>
            <div className="feature-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      {/* ── GALLERY GRID ── */}
      <div style={{ padding: '100px 0 0', background: 'var(--bg)' }}>
        <div className="home-section" style={{ paddingTop: 0, paddingBottom: 0, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Life at Phegon</span>
            <h2 className="home-services">
              Curated <span className="phegon-color">Experiences</span>
            </h2>
          </div>
        </div>

        <section style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: 12,
        }}>
          {[
            { img: hotelImage4, label: 'Infinity Pool',  desc: 'Float above the skyline',      span: 'rowSpan2' },
            { img: hotelImage5, label: 'Fine Dining',    desc: 'Michelin-inspired cuisine',     span: null },
            { img: hotelImage6, label: 'Royal Suites',   desc: 'Unmatched luxury within',       span: null },
            { img: hotelImage7, label: 'Secret Garden',  desc: 'Serenity in every corner',      span: null },
            { img: hotelImage8, label: 'Grand Lobby',    desc: 'A first impression forever',    span: null },
          ].map(({ img, label, desc, span }) => (
            <div key={label} className="gallery-tile" style={{
              position: 'relative', borderRadius: 14, overflow: 'hidden',
              gridRow: span === 'rowSpan2' ? 'span 2' : undefined,
              cursor: 'pointer',
              minHeight: span === 'rowSpan2' ? 480 : 230,
            }}>
              <img src={img} alt={label} className="gallery-tile-img" style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(28,25,23,0.82) 0%, rgba(28,25,23,0.1) 55%, transparent 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: span === 'rowSpan2' ? '28px 32px' : '20px 24px',
              }}>
                <p style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--terra)', marginBottom: 6, fontWeight: 600,
                }}>{desc}</p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: span === 'rowSpan2' ? 28 : 20,
                  fontWeight: 400, color: '#faf7f2', margin: 0, lineHeight: 1.2,
                }}>{label}</h3>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ── ABOUT SECTION ── */}
      <div style={{
        marginTop: 100,
        background: 'var(--cream-2)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '100px 64px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'center',
        }}>

          {/* Left — stacked image collage */}
          <div style={{ position: 'relative', height: 520 }}>
            <img src={hotelImage} alt="Phegon Hotel exterior" style={{
              position: 'absolute', top: 0, left: 0,
              width: '72%', height: '75%',
              objectFit: 'cover', borderRadius: 16,
              boxShadow: '0 20px 60px rgba(28,25,23,0.18)',
            }} />
            <img src={hotelImage5} alt="Fine dining" style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '54%', height: '52%',
              objectFit: 'cover', borderRadius: 16,
              boxShadow: '0 20px 60px rgba(28,25,23,0.18)',
              border: '4px solid var(--cream-2)',
            }} />
            {/* Floating years badge */}
            <div style={{
              position: 'absolute', top: '46%', left: '58%',
              background: 'var(--terra)', color: '#fff',
              borderRadius: 999, padding: '14px 22px', textAlign: 'center',
              boxShadow: '0 8px 32px rgba(196,98,45,0.35)', zIndex: 3,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28, fontWeight: 400, display: 'block', lineHeight: 1,
              }}>15+</span>
              <span style={{
                fontSize: 10, letterSpacing: '0.14em',
                textTransform: 'uppercase', fontWeight: 600, opacity: 0.9,
              }}>Years of<br />Excellence</span>
            </div>
          </div>

          {/* Right — story text */}
          <div>
            <span className="section-label">Our Story</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 3.5vw, 50px)', fontWeight: 400,
              color: 'var(--ink)', lineHeight: 1.15, marginBottom: 24,
              letterSpacing: '-0.01em',
            }}>
              A Legacy Built on{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>Genuine Hospitality</em>
            </h2>
            <p style={{ color: 'var(--ink-3)', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Founded in 2010, Phegon Hotel was born from a single belief — that true luxury is
              not about opulence alone, but about feeling genuinely cared for. Nestled in the
              heart of the city, we have welcomed guests from over 80 countries through our doors.
            </p>
            <p style={{ color: 'var(--ink-3)', fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Every detail — from the hand-selected linens to the locally sourced breakfast menu —
              is chosen with intention. Our team of 200+ hospitality professionals work tirelessly
              to ensure that every stay becomes a cherished memory.
            </p>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: 36, marginBottom: 40 }}>
              {[
                { num: '200+', lbl: 'Rooms & Suites' },
                { num: '80+',  lbl: 'Countries Welcomed' },
                { num: '4.9★', lbl: 'Average Rating' },
              ].map(({ num, lbl }) => (
                <div key={lbl}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 30, color: 'var(--terra)',
                    display: 'block', lineHeight: 1, marginBottom: 4,
                  }}>{num}</span>
                  <span style={{
                    fontSize: 11, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600,
                  }}>{lbl}</span>
                </div>
              ))}
            </div>

            <a href="/rooms" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--terra)', color: '#fff',
              padding: '15px 36px', borderRadius: 999,
              fontSize: 13, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(196,98,45,0.25)',
              transition: 'all 0.22s',
            }}>
              Explore Our Rooms ›
            </a>
          </div>
        </div>
      </div>

      {/* ── PHOTO STRIP ── */}
      <div style={{ background: 'var(--bg)', paddingTop: 0 }}>
        <div style={{
          display: 'flex', gap: 8,
          maxWidth: 1200, margin: '0 auto', padding: '0 64px',
        }}>
          {[
            { img: hotelImage4, caption: 'Infinity Pool' },
            { img: hotelImage6, caption: 'Royal Suite' },
            { img: hotelImage7, caption: 'Secret Garden' },
            { img: hotelImage8, caption: 'Grand Lobby' },
          ].map(({ img, caption }) => (
            <div key={caption} className="photo-strip-tile" style={{
              flex: 1, position: 'relative',
              height: 260, borderRadius: '16px 16px 0 0',
              overflow: 'hidden', cursor: 'pointer',
            }}>
              <img src={img} alt={caption} className="photo-strip-img" style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(28,25,23,0.72) 0%, transparent 55%)',
              }} />
              <span style={{
                position: 'absolute', bottom: 16, left: 20,
                fontFamily: "'Playfair Display', serif",
                fontSize: 16, color: '#faf7f2', fontWeight: 400,
              }}>{caption}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <TestimonialsCarousel />

    </div>
  );
};

export default HomePage;