import styles from '../Styles/navigation.module.css'

const Navigation = () =>{
    return(
        <nav className={styles.wrapper}>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <ul className={styles.aboutLinks}>
                    <li>
                        Features
                    </li>
                    <li>
                        Pricing
                    </li>
                    <li>
                       Resources
                    </li>
                </ul>
            <ul className={styles.logIn}>
                <li>
                    <button>
                        Login
                    </button>
                </li>
                <li>
                    <button>
                        Sing Up
                    </button>
                </li>
            </ul>
            </div>
        </nav>
    )
}
export default Navigation