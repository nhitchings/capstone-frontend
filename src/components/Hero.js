import './Hero.css';
import useSmoothScroll from '../hooks/useSmoothScroll';

function Hero () {
  
  const handleClick = useSmoothScroll();
  return (
    <section id="hero-section" className="hero">
        <div className="content container"> 
            <div className="hero-text">
            <p>Now Serving Chicago</p>
            <h1>Little Lemon</h1>
            <p>Classic Greek flavors with a modern twist</p>
            <button onClick={handleClick('reserve-table')}>Reserve Table</button>
            </div>
        </div>
    </section>
  );
}

export default Hero;