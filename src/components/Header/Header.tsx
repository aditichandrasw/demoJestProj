import "../../pages/Home/Home.css"

const Header = () => {
  return (
    <div>
      <header className="dashboard-header">
        <div className="logo">Auth Practice</div>
        <nav className="nav-buttons">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
