import Image from 'next/image';
import classes from './hero.module.css';


function Hero () {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/Plitvice-Lakes-National-Park-Croatia.jpg"
                    alt='some shit'
                    width={300}
                    height={300}
                />
            </div>
            <h1>Suuuuup!!</h1>
            <p>Something Something</p>
        </section>
    );
}

export default Hero;