console.log("client side javascript file")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgerrloc = document.querySelector('#message-errloc')
const msgweather = document.querySelector('#message-weather')


weatherform.addEventListener('submit',(event) => {
    event.preventDefault()

    const searchvalue = search.value
    msgerrloc.textContent = 'Loading...'
    msgweather.textContent = ''
    fetch('/weather?address='+ searchvalue).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            msgerrloc.textContent = 'Please provide a valid location!'
            
        }
        else
        {
            msgerrloc.textContent = data.location
            msgweather.textContent = data.forecast
       }
    })
})

})