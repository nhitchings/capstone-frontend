import './Header.css';
import { useRef, useEffect } from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

function Header() {

    const handleClick = useSmoothScroll();

    const headerRef = useRef(null);

    useEffect(() => {
        let lastScrollTop = 0;
        const header = headerRef.current;
        const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <header ref={headerRef} className="bg-dark text-white text-center p-3">
            <div className="container content">
                <img className="logo" src="/lemon-logo.png" alt="Little Lemon" />
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul>
                        <li><a onClick={handleClick('hero')}>Home</a></li>
                        <li><a onClick={handleClick('menu')}>Menu</a></li>
                        <li><a onClick={handleClick('footer')}>Contact</a></li>
                    </ul>
                    <button type="button" onClick={handleClick('reserve-table')}>
                        <span>Reserve Table</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;