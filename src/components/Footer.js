import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

function Footer () {
  return (
    <footer>
        <div className="content container">
            <section>
                <img src="/lemon-logo.png" alt="Little Lemon" className="logo" />
                <div>
                    <h3>Contact Us</h3>
                    <ul>
                        <li>123 Main St</li>
                        <li>Anytown, USA 12345</li>
                        <li>(123) 456-7890</li>
                    </ul>
                </div>
                    <ul className="social-links">
                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} size="2x" color="#fcbe1e" /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faTwitter} size="2x" color="#fcbe1e" /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} size="2x"  color="#fcbe1e" /></a></li>
                    </ul>
            </section>
            <section>
                <hr />
                <p><em>Little Lemon</em> is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally-sourced menu with daily specials.</p>
                <p><span className="pacifico-regular">Little Lemon</span> •{new Date().getFullYear()}</p>
            </section>
        </div>
    </footer>
  )
}

export default Footer;