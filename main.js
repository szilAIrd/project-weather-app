

// DOM stuff

class DOM {
    constructor(){

    }

    initPage(){
        const body = document.body
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
        inputLocation.addEventListener('keydown',async (e)=>{
            if (e.key === 'Enter') {
            let inputLocation = document.getElementById('location')
            let forecastData = await getData(inputLocation.value)
            let todaysForecast = forecastData.days[0]
            this.renderDailyForecast(todaysForecast)
            
            }
            })
        // Append elements to body
        mainContent.appendChild(inputLocation)
        body.appendChild(mainContent)
    }
    
    clearMainContent(){
        let mainContent = document.getElementById('main-content')
        mainContent.replaceChildren()
    }

    renderDailyForecast(forecast){
        
        let mainContent = document.getElementById('main-content')
        
        let forecastElement = document.createElement('div')
        forecastElement.textContent = forecast.tempmax
        forecastElement.className = 'forecast-element'

        this.clearMainContent()
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