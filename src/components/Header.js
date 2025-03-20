import './Header.css';

function Header() {
  return (
    <header className="bg-dark text-white text-center p-3">
        <div className="container content">
            <img className="logo" src="/lemon-logo.png" alt="Little Lemon" />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">Reserve Table</span>
                </button>
            </nav>
        </div>
  </header>
  );
}

export default Header;