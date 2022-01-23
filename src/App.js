import './App.css';
import React, { useEffect, useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form';
import axios from 'axios'
import { resApiUrl, openWeatherUrl } from './api/apiConfig';
let API_KEY = '44aed732ed95d8fae8198507ed48262c'

const App = () => {
  // This will be the state that holds the city name
  const [userInput, setUserInput] = useState('')
  // This will be the state that holds the forecast
  const [forecastArr, setForecastArr] = useState([])
  // This is the function that get's the user input from the Form component
  const getUserInput = (e) => {
    e.preventDefault()
    // console.log('This is the event from clicking form.', e.target[0].value)
    //set userInput as user entered city
    setUserInput(e.target[0].value)
    console.log('User Input after setting its state: ', userInput)
  }
  
useEffect(() => {
  getResCities()
}, [userInput])  

const getResCities = (res) => {
    return axios({
        method: 'GET',
        url: `${resApiUrl}?q=${userInput}`
    })
    .then(res => {
        console.log('This is my user selected city data', res.data)
        let results = res.data
        let cityResults = results.filter(obj => {
          return obj.result_type === "city" && obj.city_slug === userInput.toLowerCase()
        })
        console.log('the city:', cityResults[0])
        return cityResults
    })
    .then((res) => {
      let long = res[0]["long"]
      let lat = res[0]["lat"]
      return axios({
        method: 'GET',
        url: `${openWeatherUrl}lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
      })
      .then((res) => {
        setForecastArr(res.data.daily)
        console.log('City Weather API: ', res.data.daily)
      })      
    })
    .catch(error => console.log(error))
}


  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Form getUserInput={getUserInput} cityWeather={forecastArr}/>} ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
