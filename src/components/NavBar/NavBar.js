import "./NavBar.css";
import { UpholdLogo } from "../UpholdLogo/UpholdLogo";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <a href="/">Personal</a>
        <a href="/">Business</a>
        <a href="/">Partners</a>
      </div>
      <div className="logo-container">
        <UpholdLogo />
      </div>
      <div className="login-container">
        <button className="login-button">Log in</button>
      </div>
    </div>
  );
};

export default NavBar;
