import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Badge, Button, Card, Accordion, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const FESTIVAL_DATE = new Date("2026-07-24T18:00:00");

const ARTISTS = [
  { id: 1, name: "Travis Scott", stage: "Rage Stage", day: "Friday", genre: "Hip-Hop", time: "10:00 PM" },
  { id: 2, name: "Kendrick Lamar", stage: "Loud Stage", day: "Saturday", genre: "Hip-Hop", time: "10:00 PM" },
  { id: 3, name: "Future", stage: "Loud Stage", day: "Friday", genre: "Trap", time: "8:00 PM" },
  { id: 4, name: "21 Savage", stage: "Rage Stage", day: "Sunday", genre: "Trap", time: "10:00 PM" },
  { id: 5, name: "Playboi Carti", stage: "Loud Stage", day: "Saturday", genre: "Rap", time: "8:00 PM" },
  { id: 6, name: "Lil Baby", stage: "Rage Stage", day: "Friday", genre: "Trap", time: "6:30 PM" },
  { id: 7, name: "Gunna", stage: "Loud Stage", day: "Sunday", genre: "Trap", time: "8:00 PM" },
  { id: 8, name: "Metro Boomin", stage: "Rage Stage", day: "Saturday", genre: "Producer", time: "6:30 PM" },
  { id: 9, name: "Don Toliver", stage: "Loud Stage", day: "Friday", genre: "R&B/Rap", time: "5:00 PM" },
  { id: 10, name: "Rod Wave", stage: "Loud Stage", day: "Sunday", genre: "Melodic Rap", time: "6:30 PM" },
  { id: 11, name: "Polo G", stage: "Rage Stage", day: "Saturday", genre: "Drill", time: "5:00 PM" },
  { id: 12, name: "Lil Durk", stage: "Rage Stage", day: "Sunday", genre: "Drill", time: "5:00 PM" },
  { id: 13, name: "NBA YoungBoy", stage: "Loud Stage", day: "Friday", genre: "Rap", time: "3:30 PM" },
  { id: 14, name: "Lil Uzi Vert", stage: "Rage Stage", day: "Saturday", genre: "Rap", time: "3:30 PM" },
  { id: 15, name: "Offset", stage: "Loud Stage", day: "Sunday", genre: "Trap", time: "3:30 PM" },
  { id: 16, name: "Cardi B", stage: "Loud Stage", day: "Saturday", genre: "Hip-Hop", time: "5:00 PM" },
  { id: 17, name: "Megan Thee Stallion", stage: "Rage Stage", day: "Sunday", genre: "Hip-Hop", time: "6:30 PM" },
  { id: 18, name: "Jack Harlow", stage: "Loud Stage", day: "Friday", genre: "Rap", time: "2:00 PM" },
  { id: 19, name: "Latto", stage: "Rage Stage", day: "Friday", genre: "Rap", time: "2:00 PM" },
  { id: 20, name: "Flo Milli", stage: "Loud Stage", day: "Saturday", genre: "Rap", time: "2:00 PM" },
  { id: 21, name: "Sexyy Red", stage: "Rage Stage", day: "Saturday", genre: "Rap", time: "2:00 PM" },
  { id: 22, name: "GloRilla", stage: "Loud Stage", day: "Sunday", genre: "Rap", time: "2:00 PM" },
  { id: 23, name: "Destroy Lonely", stage: "Rage Stage", day: "Sunday", genre: "Rap", time: "3:30 PM" },
  { id: 24, name: "Ken Carson", stage: "Rage Stage", day: "Friday", genre: "Rap", time: "3:30 PM" },
];

const TICKET_TIERS = [
  {
    id: 1, name: "General Admission", price: "$299", tag: "GA",
    perks: ["3-day festival access", "Access to all 3 stages", "Free water stations", "General parking available"],
  },
  {
    id: 2, name: "VIP", price: "$599", tag: "VIP", featured: true,
    perks: ["Everything in GA", "Dedicated VIP entrance", "VIP viewing areas", "Exclusive VIP lounge access", "Complimentary drinks"],
  },
  {
    id: 3, name: "Platinum", price: "$1,199", tag: "Platinum",
    perks: ["Everything in VIP", "Front-of-stage access", "Meet & greet opportunities", "Premium parking pass", "Exclusive merch package"],
  },
];

function useCountdown() {
  const [now, setNow] = useState(new Date());
  useState(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  });
  const diff = FESTIVAL_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink to="/" className="nav-logo" style={{ textDecoration: "none" }} aria-label="Rolling Loud Home">
        ROLLING<span>LOUD</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Home</NavLink>
        <NavLink to="/lineup" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Lineup</NavLink>
        <NavLink to="/schedule" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Schedule</NavLink>
        <NavLink to="/tickets" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Tickets</NavLink>
        <NavLink to="/venue" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Venue</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Rolling Loud · All Rights Reserved</p>
    </footer>
  );
}


function CountdownUnit({ value, label }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-number">{String(value).padStart(2, "0")}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}


function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "duplicate"
  const [signedUpEmails, setSignedUpEmails] = useState([]);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
        setEmail("");
        setName("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;
    if (signedUpEmails.includes(email.toLowerCase())) {
      setStatus("duplicate");
    } else {
      setSignedUpEmails((prev) => [...prev, email.toLowerCase()]);
      setStatus("success");
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <h2>Stay in the Loop</h2>
          <p>Get lineup updates, presale access, and festival news straight to your inbox.</p>
        </div>
        {status === "success" && (
          <Alert variant="success" className="newsletter-success" role="alert">
            🎉 You're on the list! Check your inbox for updates.
          </Alert>
        )}
        {status === "duplicate" && (
          <Alert variant="warning" className="newsletter-success" role="alert">
            ⚠️ That email is already signed up!
          </Alert>
        )}
        {!status && (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-field">
              <label htmlFor="newsletter-name" className="visually-hidden">Your name</label>
              <Form.Control
                id="newsletter-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="newsletter-input"
                required
              />
            </div>
            <div className="newsletter-field">
              <label htmlFor="newsletter-email" className="visually-hidden">Your email</label>
              <Form.Control
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
            </div>
            <Button type="submit" className="newsletter-btn">
              Notify Me
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrap">
      <label htmlFor="artist-search" className="visually-hidden">Search artists</label>
      <Form.Control
        id="artist-search"
        type="text"
        placeholder="Search artists..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}


function ArtistCard({ artist, saved, onToggle }) {
  return (
    <div className={`artist-card ${saved ? "bookmarked" : ""}`}>
      <div className="artist-initials" aria-hidden="true">
        {artist.name.split(" ").map((w) => w[0]).join("")}
      </div>
      <div className="artist-info">
        <h3 className="artist-name">{artist.name}</h3>
        <span className="artist-meta">{artist.stage} · {artist.day} · {artist.time}</span>
        <Badge bg="secondary" className="artist-genre">{artist.genre}</Badge>
      </div>
      <button
        className={`bookmark-btn ${saved ? "saved" : ""}`}
        onClick={() => onToggle(artist.id)}
        aria-label={saved ? `Remove ${artist.name} from favorites` : `Add ${artist.name} to favorites`}
      >
        {saved ? "★" : "☆"}
      </button>
    </div>
  );
}

function HomePage() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-badge">Miami · July 24–26, 2026</div>
        <h1 className="hero-title">
          ROLLING<br />
          <span className="hero-title-accent">LOUD</span><br />
          2026
        </h1>
        <p className="hero-sub">
          The world's largest hip-hop music festival returns to Hard Rock Stadium.
          Three days. Hundreds of artists. One unforgettable weekend.
        </p>
        <div className="countdown-row" aria-label="Countdown to festival">
          <CountdownUnit value={days} label="Days" />
          <div className="countdown-sep" aria-hidden="true">:</div>
          <CountdownUnit value={hours} label="Hrs" />
          <div className="countdown-sep" aria-hidden="true">:</div>
          <CountdownUnit value={minutes} label="Min" />
          <div className="countdown-sep" aria-hidden="true">:</div>
          <CountdownUnit value={seconds} label="Sec" />
        </div>
        <div className="hero-actions">
          <a className="btn-primary" href="https://www.rollingloud.com/miami" target="_blank" rel="noreferrer">
            Get Tickets
          </a>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon" aria-hidden="true">📅</div>
          <h2>Dates</h2>
          <p>July 24–26, 2026<br />Gates open at 2 PM daily</p>
        </div>
        <div className="info-card">
          <div className="info-icon" aria-hidden="true">📍</div>
          <h2>Venue</h2>
          <p>Hard Rock Stadium<br />Miami Gardens, FL</p>
        </div>
        <div className="info-card">
          <div className="info-icon" aria-hidden="true">🎤</div>
          <h2>Lineup</h2>
          <p>100+ Artists<br />3 Stages · 3 Days</p>
        </div>
        <div className="info-card">
          <div className="info-icon" aria-hidden="true">🎟</div>
          <h2>Tickets</h2>
          <p>GA · VIP · Platinum<br />Payment plans available</p>
        </div>
      </div>

      <NewsletterSignup />
    </div>
  );
}


function LineupPage({ bookmarks, setBookmarks }) {
  const [dayFilter, setDayFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Friday", "Saturday", "Sunday", "Favorites"];

  const filtered = ARTISTS
    .filter((a) => {
      if (dayFilter === "Favorites") return bookmarks.includes(a.id);
      if (dayFilter === "All") return true;
      return a.day === dayFilter;
    })
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="lineup-page">
      <div className="section-header">
        <h1>Artist Lineup</h1>
        <p>Rolling Loud Miami 2026 · Hard Rock Stadium · {ARTISTS.length} Artists</p>
      </div>

     

      <div className="lineup-controls">
        <div className="day-filters">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={dayFilter === f ? (f === "Favorites" ? "warning" : "danger") : "outline-light"}
              className="filter-btn"
              onClick={() => setDayFilter(f)}
            >
              {f === "Favorites" ? `★ ${f}` : f}
            </Button>
          ))}
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {dayFilter === "Favorites" && bookmarks.length === 0 ? (
        <div className="no-results" role="status">
          No favorites yet — star an artist to save them here.
        </div>
      ) : filtered.length === 0 ? (
        <div className="no-results" role="status">No artists found for "{search}"</div>
      ) : (
        <div className="artist-grid">
          {filtered.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              saved={bookmarks.includes(artist.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function SchedulePage() {
  const [activeDay, setActiveDay] = useState("Friday");
  const days = ["Friday", "Saturday", "Sunday"];
  const dates = { Friday: "July 24", Saturday: "July 25", Sunday: "July 26" };
  const stages = ["Loud Stage", "Rage Stage"];
  const times = ["2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM", "8:00 PM", "10:00 PM"];

  return (
    <div className="schedule-page">
      <div className="section-header">
        <h1>Schedule</h1>
        <p>Rolling Loud Miami 2026 · Stage Times</p>
      </div>

      <div className="day-filters" style={{ padding: "1.5rem 2rem" }}>
        {days.map((d) => (
          <Button
            key={d}
            size="sm"
            variant={activeDay === d ? "danger" : "outline-light"}
            className="filter-btn"
            onClick={() => setActiveDay(d)}
            aria-pressed={activeDay === d}
          >
            {d} · {dates[d]}
          </Button>
        ))}
      </div>

      <div className="schedule-grid">
        {stages.map((stage) => (
          <div key={stage} className="schedule-column">
            <div className="schedule-stage-header">{stage}</div>
            {times.map((time) => {
              const artist = ARTISTS.find(
                (a) => a.day === activeDay && a.stage === stage && a.time === time
              );
              return (
                <div key={time} className={`schedule-slot ${artist ? "has-artist" : ""}`}>
                  <span className="slot-time">{time}</span>
                  {artist ? (
                    <span className="slot-artist">{artist.name}</span>
                  ) : (
                    <span className="slot-empty" aria-hidden="true">—</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TicketsPage() {
  return (
    <div className="tickets-page">
      <div className="section-header">
        <h1>Tickets</h1>
        <p>Rolling Loud Miami 2026 · July 24–26</p>
      </div>

      <div className="ticket-grid">
        {TICKET_TIERS.map((tier) => (
          <Card key={tier.id} className={`ticket-card ${tier.featured ? "ticket-featured" : ""}`}>
            <Card.Body>
              {tier.featured && (
                <Badge bg="danger" className="featured-badge">Most Popular</Badge>
              )}
              <div className="ticket-tag">{tier.tag}</div>
              <Card.Title as="h2" className="ticket-name">{tier.name}</Card.Title>
              <div className="ticket-price">{tier.price}</div>
              <p className="ticket-per">per person · 3-day pass</p>
              <ul className="ticket-perks">
                {tier.perks.map((perk, i) => (
                  <li key={i}>✓ {perk}</li>
                ))}
              </ul>
              <a
                href="https://www.rollingloud.com/miami"
                target="_blank"
                rel="noreferrer"
                className={`ticket-btn ${tier.featured ? "ticket-btn-featured" : ""}`}
              >
                Buy {tier.tag}
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="faq-section">
        <div className="section-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
          <h2>FAQ</h2>
          <p>Common questions about tickets</p>
        </div>
        <Accordion className="faq-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Are tickets refundable?</Accordion.Header>
            <Accordion.Body>All ticket sales are final. However, tickets can be transferred to another person through the official Rolling Loud app.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Is there a payment plan available?</Accordion.Header>
            <Accordion.Body>Yes! Payment plans are available for all ticket tiers. You can split your purchase into monthly installments at checkout.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What's the minimum age to attend?</Accordion.Header>
            <Accordion.Body>Rolling Loud Miami 2026 is an 18+ event. Valid government-issued ID is required at entry.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>When will tickets be delivered?</Accordion.Header>
            <Accordion.Body>Tickets are delivered digitally via the Rolling Loud app. You'll receive your QR code at least 48 hours before the event.</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}


function VenuePage() {
  return (
    <div className="venue-page">
      <div className="section-header">
        <h1>Travel & Venue</h1>
        <p>Everything you need to know before you arrive</p>
      </div>

      <div className="venue-hero">
        <div className="venue-name-block">
          <span className="venue-tag">Official Venue</span>
          <h2>Hard Rock Stadium</h2>
          <p>347 Don Shula Dr, Miami Gardens, FL 33056</p>
        </div>
      </div>

      <div className="travel-grid">
        <div className="travel-card">
          <h3>✈ Flying In</h3>
          <p>Miami International Airport (MIA) is 8 miles from the venue. Fort Lauderdale–Hollywood International (FLL) is 25 miles north. Both airports have direct rideshare and shuttle access.</p>
        </div>
        <div className="travel-card">
          <h3>🚗 Driving</h3>
          <p>Take I-95 or Florida's Turnpike to exit 2B (NW 199th St). Paid parking is available on-site. Arrive early — lots fill up fast. Carpooling strongly encouraged.</p>
        </div>
        <div className="travel-card">
          <h3>🚌 Shuttle</h3>
          <p>Official Rolling Loud shuttles run from Downtown Miami, Brickell, and Aventura. Shuttle passes can be added when purchasing your festival ticket.</p>
        </div>
        <div className="travel-card">
          <h3>🏨 Hotels</h3>
          <p>Partner hotels include the Miami Marriott Biscayne Bay and the InterContinental Miami. Use code <strong>RL2026</strong> for a 15% festival discount.</p>
        </div>
      </div>

      <div className="venue-tips">
        <h3>Festival Tips</h3>
        <ul>
          <li>No outside food, drinks, or professional cameras</li>
          <li>Clear bags only (12" × 6" × 12" max)</li>
          <li>Stay hydrated — free water stations throughout the grounds</li>
          <li>Download the Rolling Loud app for real-time stage schedules</li>
          <li>Medical staff on-site 24/7 across all three days</li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <BrowserRouter basename="/p13">
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lineup" element={<LineupPage bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/venue" element={<VenuePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}