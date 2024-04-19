import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/error404.module.css"

export default function Error404(){
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Page Not Found!</h1>
                <div className={styles.links}>
                    <span>Go:</span>
                    <Link to="/" className={styles.active}>Home</Link>
                    <Link onClick={() => navigate(-1)}>back</Link>
                </div>
            </div>  
        </div>  
    )
}