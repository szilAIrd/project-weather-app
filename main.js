

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

        
        // Append elements to body
        mainContent.appendChild(inputLocation)
        body.appendChild(mainContent)

}}


let weatherPage = new DOM()

weatherPage.initPage()

// Functions
const apiKey=''

async function getData(){
    let response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=',{mode: 'cors'})
    let data = await response.json()
    console.log(response)
    console.log(data)
}

getData()