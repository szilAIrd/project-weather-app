// @param {number} tempC - Temperature in Celsius.
// @returns {string} RGB string like 'rgb(255,0,0)'

// DOM stuff

class DOM {
    constructor(){

    }

    initPage(){
        const body = document.body
        //  Side bar
        let sidebar = document.createElement('div')
        sidebar.id = 'sidebar'
        body.appendChild(sidebar)

        // Add main content
        let mainContent = document.createElement('div')
        mainContent.id = 'main-content'
        mainContent.style.width = '100%'
        mainContent.style.height = '100%'


        // Add side bar for navigation an 
        
        
        let inputLocation = document.createElement('input')
        inputLocation.placeholder = 'Location...'
        inputLocation.style.position = 'absolute'
        inputLocation.style.top = '50%'
        inputLocation.style.left = '50%'
        inputLocation.style.borderRadius = '24px'
        inputLocation.style.backgroundColor = 'rgb(211, 211, 211)'
        inputLocation.id = 'location'

        // ATTEMPT to replace the event listener async function below
        // async function triggerForecast(e){
        //     if (e.key === 'Enter') {
        //         let inputLocation = document.getElementById('location')
        //         let forecastData =  await getData(inputLocation.value)

        //         // let promise = getData(inputLocation.value)
        //         // promise.then(data => {let forecastData = data})

        //         let todaysForecast = await forecastData.days[0]
        //         renderDailyForecast(todaysForecast)
                
                // }

        // }

        inputLocation.addEventListener('keydown', (e)=>{

          if (e.key === 'Enter') {
            let inputLocation = document.getElementById('location')
            // let forecastData = await getData(inputLocation.value)
            let location = inputLocation.value
            
            let response = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=`,{mode: 'cors'})
            response.then((response) => {
              // response.json()
              // console.log('This is from fetch', response.json())
              console.log('fos')
              return response.json()
            })
          //  ).then((response) =>{
          //     return response.days   
          //  })
           .then((response) => {
            let i = 0
            while(i<7){
              this.renderDailyForecast(response.days[i])
              i++
            }
              
            inputLocation.hidden=true
           })

            // let todaysForecast = await forecastData.days[0]
            // this.renderDailyForecast(todaysForecast)
          }
          })
      
        //  Menu button
        let menuBtn = document.createElement('div')
        menuBtn.textContent = 'Main page' 
        menuBtn.id = 'menu-button'
        menuBtn.addEventListener('click', ()=>{
          this.clearContent()
          this.initPage()
        })
        sidebar.appendChild(menuBtn)

        // Append elements to body
        mainContent.appendChild(inputLocation)
        body.appendChild(mainContent)
  
        }

    clearContent(){
        let body = document.body
        // let mainContent = document.getElementById('main-content')
        body.replaceChildren()
    }

    renderDailyForecast(forecast){
        
        let mainContent = document.getElementById('main-content')
        
        let forecastElement = document.createElement('div')

        const foreCastDate = document.createElement('div')
        foreCastDate.className = 'forecast-date'
        foreCastDate.textContent = forecast.datetime;


        const foreCastDateTempMax = document.createElement('div')
        foreCastDateTempMax.textContent = `Max temp: ${forecast.tempmax}`
        foreCastDateTempMax.className  = 'temp-max'
        

        const foreCastDateTempMin = document.createElement('div')
        foreCastDateTempMin.textContent = `Min temp: ${forecast.tempmin}`
        foreCastDateTempMin.className  = 'temp-min'



        
       function temperatureToRGB(tempC) {
         // Define temperature range for mapping
         const minTemp = 60; // Very cold
         const maxTemp = 100;  // Very hot
       
         // Clamp temperature between min and max
         const t = Math.max(minTemp, Math.min(maxTemp, tempC));
       
         // Normalize temperature to [0, 1]
         const ratio = (t - minTemp) / (maxTemp - minTemp);
       
         // Interpolate colors:
         // Blue (0, 0, 255) at cold end
         // Red (255, 0, 0) at hot end
         const r = Math.round(255 * ratio);
         const g = 0;
         const b = Math.round(255 * (1 - ratio));
       
         return `rgb(${r},${g},${b})`;
        }

        forecastElement.style.backgroundColor = temperatureToRGB(forecast.tempmax)
        // forecastElement.textContent = forecast.tempmax
        forecastElement.className = 'forecast-element'
        
        // Append children
        forecastElement.appendChild(foreCastDateTempMax)
        forecastElement.appendChild(foreCastDateTempMin)
        forecastElement.appendChild(foreCastDate)



        // this.clearMainContent()
        mainContent.appendChild(forecastElement)




    }
}


let weatherPage = new DOM()

weatherPage.initPage()

// Functions
const apiKey=''

async function getData(location){
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=`,{mode: 'cors'})
    let data = await response.json()
    
    console.log(response)
    console.log(data)
    return data
}

// function getData(){
//     fetch
// }


// let p = new Promise (
    
//     (resolve, reject)=>{
//         setTimeout(()=>{
//             let response = 
//         // console.log(response)
//         },10)       
//         resolve()
//         // if (response ==  )

        
//     }
// )

// console.log(p)

let response = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Budapest?key=`,{mode: 'cors'})
.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // returns a Promise with parsed JSON
  })
  .then(data => {
    console.log("Here’s your joke:");
    console.log(data.days);
  })
  .catch(error => {
    // console.error("Failed to fetch joke:", error);
  });;

//   console.log(response)

