import '../index.css';

const Form = (props) => {
    const { getUserInput, cityWeather } = props
    console.log('weather data in form component? ', cityWeather)

    const data = cityWeather.map((day, index) => {
        return (
            <div key={index} className="dayCard">
                <h1>Day: {index}</h1>
                <h2>Min: {day.temp.min}°C</h2>
                <h2>Max: {day.temp.max}°C</h2>
            </div>
        )
    })

    return (
        <>
        <h1>Let's check out the weather forecast for your next destination!</h1>
        <form onSubmit={getUserInput}>
            <label>
                Enter City:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
            {data}
        </form>
        </>
    )
}

export default Form