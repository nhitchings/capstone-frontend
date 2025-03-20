import './Hero.css';

function Hero () {
  return (
    <section id="hero-section" className="hero">
        <div className="content container"> 
            <div className="hero-text">
            <p>Now Serving Chicago</p>
            <h1>Little Lemon</h1>
            <p>Classic Greek flavors with a modern twist</p>
            <button>Reserve Table</button>
            </div>
        </div>
    </section>
  );
}

export default Hero;