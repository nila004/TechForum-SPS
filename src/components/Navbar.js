import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">EventHub</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/eventlist">EventsPage</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
