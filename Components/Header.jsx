import styles from '../Styles/header.module.css'

const Header = () =>{
    return(
        <header className={styles.wrapper}>
            <div className={styles.statement}>
                <h1>More than just shorter links</h1>
                <p>Build your brand's recognitions and get detailed <br /> insights on how your links are performing</p>
                <button>Get Started</button>
            </div>
            <div className={styles.heroDiv}>
                <img src="../public/images/illustration-working.svg" alt="a man working at their computer." />
            </div>
        </header>
    )
}
export default Header