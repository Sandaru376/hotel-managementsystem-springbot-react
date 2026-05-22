import React, { useState } from 'react';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';
import hotelImage from '../../assets/hotel.jpg';;

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  return (
    <div className="home">

      {/* ── HERO ── */}
      <header className="header-banner">
       <img src={hotelImage} alt="Hotel" className="header-image" />
        <div className="overlay" />
        <div className="overlay-content">
          <p className="hero-eyebrow">✦ Est. 2010 &nbsp;·&nbsp; 5-Star Luxury &nbsp;·&nbsp; Award-Winning</p>
          <h1>Where Comfort<br />Meets <em>Elegance</em></h1>
          <h3>An intimate retreat crafted for travellers who expect the extraordinary</h3>
          <div className="hero-actions">
            <a href="/rooms" className="hero-btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--terra)', color: '#fff', padding: '15px 36px',
              borderRadius: 999, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(196,98,45,0.3)',
              transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)'
            }}>
              Explore Rooms
            </a>
            <a href="/find-booking" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: 'rgba(250,247,242,0.9)',
              border: '1.5px solid rgba(250,247,242,0.35)',
              padding: '15px 36px', borderRadius: 999, fontSize: 13,
              fontWeight: 500, letterSpacing: '0.06em',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)'
            }}>
              Find My Booking
            </a>
          </div>
        </div>
        <div className="hero-badge">
          <div className="hero-stat">
            <span className="num">200+</span>
            <span className="lbl">Rooms &amp; Suites</span>
          </div>
          <div className="hero-stat">
            <span className="num">15k</span>
            <span className="lbl">Happy Guests</span>
          </div>
          <div className="hero-stat">
            <span className="num">4.9★</span>
            <span className="lbl">Guest Rating</span>
          </div>
        </div>
      </header>

      {/* ── SEARCH ── */}
      <RoomSearch handleSearchResult={handleSearchResult} />

      {/* ── SEARCH RESULTS ── */}
      {roomSearchResults.length > 0 && (
        <div className="home-section">
          <span className="section-label">Availability Results</span>
          <h2 className="section-title">Rooms <em>Available</em> for Your Stay</h2>
          <RoomResult roomSearchResults={roomSearchResults} />
          <a className="view-rooms-home" href="/rooms">View All Rooms →</a>
        </div>
      )}

      {/* ── FEATURE STRIP ── */}
      <div className="features-strip">
        <div className="feature-item">
          <div className="feature-icon">🏊</div>
          <h4>Pool &amp; Spa</h4>
          <p>Unwind in our heated infinity pool and award-winning spa retreat.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🍽️</div>
          <h4>Fine Dining</h4>
          <p>Michelin-recognised chefs craft each dish with locally-sourced ingredients.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🤝</div>
          <h4>Concierge</h4>
          <p>Round-the-clock personal concierge for every need, great or small.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📍</div>
          <h4>Prime Location</h4>
          <p>Perfectly situated steps from the city's finest attractions.</p>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div style={{ padding: '100px 0 0', background: 'var(--cream)' }}>
        <div className="home-section" style={{ paddingTop: 0, paddingBottom: 0, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">What We Offer</span>
            <h2 className="home-services">
              The <em style={{ fontStyle: 'italic' }}>Phegon</em>{' '}
              <span className="phegon-color">Experience</span>
            </h2>
          </div>
        </div>
        <section className="service-section" style={{ maxWidth: 1200, margin: '0 auto 0', padding: '0 64px' }}>
          {[
            { img: './assets/images/ac.png', title: 'Climate Control', desc: 'Each room features individually controlled air conditioning and heating for your perfect comfort.' },
            { img: './assets/images/mini-bar.png', title: 'Curated Mini Bar', desc: 'A thoughtfully stocked selection of fine beverages and artisan snacks — complimentary.' },
            { img: './assets/images/parking.png', title: 'Valet Parking', desc: 'Complimentary on-site parking with optional valet service available at your convenience.' },
            { img: './assets/images/wifi.png', title: 'High-Speed WiFi', desc: 'Seamless, high-speed internet throughout all rooms and public spaces at no extra charge.' },
          ].map(({ img, title, desc }) => (
            <div className="service-card" key={title}>
              <img src={img} alt={title} />
              <div className="service-details">
                <h3 className="service-title">{title}</h3>
                <p className="service-description">{desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ── TESTIMONIAL ── */}
      <div style={{ marginTop: 100 }} className="testimonial-section">
        <blockquote>
          "From the moment we arrived, every detail felt considered. The service was impeccable,
          the rooms breathtaking. Phegon has set a new standard for what luxury truly means."
        </blockquote>
        <p className="testimonial-author">— Sarah M., Verified Guest &nbsp;★★★★★</p>
      </div>

    </div>
  );
};

export default HomePage;