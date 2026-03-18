import { useState } from "react";
import "./App.css";

const FESTIVAL_DATE = new Date("2026-07-24T18:00:00");

const ARTISTS = [
  { id: 1, name: "Travis Scott", stage: "Rage Stage", day: "Friday", genre: "Hip-Hop" },
  { id: 2, name: "Kendrick Lamar", stage: "Loud Stage", day: "Saturday", genre: "Hip-Hop" },
  { id: 3, name: "Future", stage: "Loud Stage", day: "Friday", genre: "Trap" },
  { id: 4, name: "21 Savage", stage: "Rage Stage", day: "Sunday", genre: "Trap" },
  { id: 5, name: "Playboi Carti", stage: "Loud Stage", day: "Saturday", genre: "Rap" },
  { id: 6, name: "Lil Baby", stage: "Rage Stage", day: "Friday", genre: "Trap" },
  { id: 7, name: "Gunna", stage: "Loud Stage", day: "Sunday", genre: "Trap" },
  { id: 8, name: "Metro Boomin", stage: "Rage Stage", day: "Saturday", genre: "Producer" },
  { id: 9, name: "Don Toliver", stage: "Loud Stage", day: "Friday", genre: "R&B/Rap" },
  { id: 10, name: "Rod Wave", stage: "Loud Stage", day: "Sunday", genre: "Melodic Rap" },
  { id: 11, name: "Polo G", stage: "Rage Stage", day: "Saturday", genre: "Drill" },
  { id: 12, name: "Lil Durk", stage: "Rage Stage", day: "Sunday", genre: "Drill" },
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

function Navbar({ active, setActive }) {
  const links = ["Home", "Lineup", "Venue"];
  return (
    <nav className="navbar">
      <div className="nav-logo">ROLLING<span>LOUD</span></div>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l}
            className={`nav-link ${active === l ? "active" : ""}`}
            onClick={() => setActive(l)}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
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
        <div className="countdown-row">
          <CountdownUnit value={days} label="Days" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={hours} label="Hrs" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={minutes} label="Min" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={seconds} label="Sec" />
        </div>
        <div className="hero-actions">
          <a
            className="btn-primary"
            href="https://www.rollingloud.com/miami"
            target="_blank"
            rel="noreferrer"
          >
            Get Tickets
          </a>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon">📅</div>
          <h3>Dates</h3>
          <p>July 24–26, 2026<br />Gates open at 2 PM daily</p>
        </div>
        <div className="info-card">
          <div className="info-icon">📍</div>
          <h3>Venue</h3>
          <p>Hard Rock Stadium<br />Miami Gardens, FL</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🎤</div>
          <h3>Lineup</h3>
          <p>100+ Artists<br />3 Stages · 3 Days</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🎟</div>
          <h3>Tickets</h3>
          <p>GA · VIP · Platinum<br />Payment plans available</p>
        </div>
      </div>
    </div>
  );
}

function LineupPage({ bookmarks, setBookmarks }) {
  const [dayFilter, setDayFilter] = useState("All");
  const days = ["All", "Friday", "Saturday", "Sunday"];

  const filtered =
    dayFilter === "All" ? ARTISTS : ARTISTS.filter((a) => a.day === dayFilter);

  const toggle = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="lineup-page">
      <div className="section-header">
        <h2>Artist Lineup</h2>
        <p>Rolling Loud Miami 2026 · Hard Rock Stadium</p>
      </div>

      {bookmarks.length > 0 && (
        <div className="bookmark-banner">
          ★ {bookmarks.length} artist{bookmarks.length > 1 ? "s" : ""} bookmarked
        </div>
      )}

      <div className="day-filters">
        {days.map((d) => (
          <button
            key={d}
            className={`filter-btn ${dayFilter === d ? "active" : ""}`}
            onClick={() => setDayFilter(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="artist-grid">
        {filtered.map((artist) => {
          const saved = bookmarks.includes(artist.id);
          return (
            <div key={artist.id} className={`artist-card ${saved ? "bookmarked" : ""}`}>
              <div className="artist-initials">
                {artist.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div className="artist-info">
                <h3 className="artist-name">{artist.name}</h3>
                <span className="artist-meta">{artist.stage} · {artist.day}</span>
                <span className="artist-genre">{artist.genre}</span>
              </div>
              <button
                className={`bookmark-btn ${saved ? "saved" : ""}`}
                onClick={() => toggle(artist.id)}
                aria-label={saved ? "Remove bookmark" : "Bookmark artist"}
              >
                {saved ? "★" : "☆"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VenuePage() {
  return (
    <div className="venue-page">
      <div className="section-header">
        <h2>Travel & Venue</h2>
        <p>Everything you need to know before you arrive</p>
      </div>

      <div className="venue-hero">
        <div className="venue-name-block">
          <span className="venue-tag">Official Venue</span>
          <h3>Hard Rock Stadium</h3>
          <p>347 Don Shula Dr, Miami Gardens, FL 33056</p>
        </div>
      </div>

      <div className="travel-grid">
        <div className="travel-card">
          <h4>✈ Flying In</h4>
          <p>
            Miami International Airport (MIA) is 8 miles from the venue. Fort Lauderdale–Hollywood
            International (FLL) is 25 miles north. Both airports have direct rideshare and shuttle access.
          </p>
        </div>
        <div className="travel-card">
          <h4>🚗 Driving</h4>
          <p>
            Take I-95 or Florida's Turnpike to exit 2B (NW 199th St). Paid parking is available
            on-site. Arrive early — lots fill up fast. Carpooling strongly encouraged.
          </p>
        </div>
        <div className="travel-card">
          <h4>🚌 Shuttle</h4>
          <p>
            Official Rolling Loud shuttles run from Downtown Miami, Brickell, and Aventura.
            Shuttle passes can be added when purchasing your festival ticket.
          </p>
        </div>
        <div className="travel-card">
          <h4>🏨 Hotels</h4>
          <p>
            Partner hotels include the Miami Marriott Biscayne Bay and the InterContinental Miami.
            Use code <strong>RL2026</strong> for a 15% festival discount.
          </p>
        </div>
      </div>

      <div className="venue-tips">
        <h4>Festival Tips</h4>
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
  const [active, setActive] = useState("Home");
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main className="main">
        {active === "Home" && <HomePage />}
        {active === "Lineup" && (
          <LineupPage bookmarks={bookmarks} setBookmarks={setBookmarks} />
        )}
        {active === "Venue" && <VenuePage />}
      </main>
      <footer className="footer">
      <p>© 2026 Rolling Loud · All Rights Reserved</p>
      </footer>
    </div>
  );
}