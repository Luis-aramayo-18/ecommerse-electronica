const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link navbar-brand" href="/">
              Tecno Store
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
