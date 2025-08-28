import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-md font-medium transition-colors ${
      location.pathname === path
        ? "bg-[var(--rainbows-red)] text-white"
        : "text-[var(--rainbows-dark-blue)] hover:bg-[var(--rainbows-light-blue)]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌈</span>
          <span className="text-xl font-bold text-[var(--rainbows-red)]">
            Rainbow Planner
          </span>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/enquiries" className={linkClasses("/enquiries")}>
            Enquiries
          </Link>
          <Link to="/members" className={linkClasses("/members")}>
            Members
          </Link>
        </div>
      </div>
    </nav>
  );
}
