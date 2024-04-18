import { Link } from "react-router-dom"
import styles from "../styles/error404.module.css"

export default function Error404(){
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Page Not Found!</h1>
                <Link to="/">Go back Home</Link>
            </div>  
        </div>  
    )
}