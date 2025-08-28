import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    `navbar-link${isActive ? " active" : ""}`;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span role="img" aria-label="rainbow">
            🌈
          </span>
          <span className="brand-name">Rainbow Planner</span>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/enquiries" className={linkClass}>
              Enquiries
            </NavLink>
          </li>
          <li>
            <NavLink to="/members" className={linkClass}>
              Members
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
