export default function DevilceNotAllowed({setContinuo}) {
    return (
        <div style={{padding: "10px"}}>
            <h2>Error: 403</h2>
            <h3>Small Screens not allowed</h3>
            <p>Please access the website using a device with a screen width greater than 600px.</p>
            <button onClick={() => setContinuo(true)}>Continuo Anyway?</button>
        </div>
    )
}