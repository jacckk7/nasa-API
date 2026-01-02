import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const linkClass = (path:string) =>
    `
      px-3 py-2 rounded-lg transition
      ${
        location.pathname === path
          ? "bg-bg-elevated text-primary"
          : "text-text-secondary hover:text-text-primary"
      }
    `;

  return (
    <header className="bg-bg-secondary border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-text-primary">
          🌌 Space App
        </Link>

        <nav>
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/image" className={linkClass("/image")}>
            APOD
          </Link>
        </nav>
      </div>
    </header>
  );
}