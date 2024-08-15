import "./Banner.css"

const Banner = () => {
    return (
        <section className="banner">
            <article>
                <div>
                    <h2>The Best Platform for Car Rental</h2>
                    <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
                    <a className="btn-main" href="#">Rental Car</a>
                </div>
                <img src="./img/bestPlatform.png" alt="car" />
            </article>
            <article>
                <div>
                    <h2>Easy way to rent a car at a low price</h2>
                    <p>Providing cheap car rental services and safe and comfortable facilities.</p>
                    <a className="btn-alt" href="#">Rental Car</a>
                </div>
                <img src="./img/easyCar.png" alt="car" />
            </article>
        </section>
    );
}

export default Banner;