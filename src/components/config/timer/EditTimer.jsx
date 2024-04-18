import React from 'react'
import styles from "../../../styles/config.timer.module.css"

export default function EditTimer() {
  return (
    <div>
      <h2>Edit timer</h2>
      <br />
      <div className={styles.field}>
        <h5>Seconds</h5>
        <input type="number" className={styles.twoDigits} />
        <button className={styles.editBtn}>Edit</button>
      </div>
    </div>
  )
}
