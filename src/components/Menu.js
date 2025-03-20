import './Menu.css';

function Menu() {
    return (
        <section id="menu-section" className="menu container">
            <h1>Our Menu</h1>
            <div className="menu-content">
                <div className="">
                    <h2>Farm to Table</h2>
                    <img src="food-table.png" className="img-fluid" alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, quae.</p>
                </div>
                <div className="">
                    <h2>Traditional Greek Flavors</h2>
                    <img src="flavor.png" className="img-fluid" alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, quae.</p>
                </div>
                <div className="">
                    <h2>Modern Twist</h2>
                    <img src="modern-twist.png" className="img-fluid" alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, quae.</p>
                </div>
            </div>
        </section>
    );
}

export default Menu;