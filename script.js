// create an app object
const bottleApp = {};

//Initialize data from API

bottleApp.apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
bottleApp.apiKey = 'Bearer JZYgjDAWC3xGXOVGoquhJgKezVKcCSmnyM5CP-5t0TwLcAjVQGNuGwolK6fnWp2s0wvBtkyAYM-ijdEBQ5eTiynp-dgC3lfLQ6fHFPxuwfYf76n6JBXwX-CSw8S_X3Yx'

bottleApp.headers = new Headers();
bottleApp.headers.append('Authorization', bottleApp.apiKey);
bottleApp.requestOptions = {
    method: 'GET',
    headers: bottleApp.headers,
    redirect: 'follow'
};

bottleApp.getRestaurants = (userAddress) => {
    const url = new URL(bottleApp.apiUrl);
    url.search = new URLSearchParams({
        term: 'cocktails wine',
        location: userAddress,
        sort_by: 'distance',
        limit: 6,
    })

    fetch(url, bottleApp.requestOptions)
        .then((res) => {
            return res.json();
        })
        .then((jsonRes) => {
            console.log(jsonRes);
        })

    }
    
    
    // create method getLocation(userLocation) to access api data  
    bottleApp.userLocation = () => {
        //     Query input text
        const form = document.querySelector('form');
        //     Create an event listener on submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEl = document.querySelector('input');
            //     Store user input value 
            const userInput = inputEl.value;
            //     Set input to an empty string
            inputEl.value = '';

            bottleApp.getRestaurants(userInput);
        }) 
    }
    
    bottleApp.userLocation();

    
// create a method (getUserLocation) to update the variable (userLocation) based on the users input
//      user address value passed into GET function of location parameter

// create a method to (displayResults)
//     take data from API
//     iterate through it with forEach
//     for each object in API will need to create an <li> 
//     create a <h2> for restaurant name
//     create a <img> for photo 
//     add content for img src and alt attributes
//     create a <p> for restaurant phone number
//     create a <p> for restaurant address
//     create a <p> for restaurant distance
//          divide the value distance by 1000 to get km 
//     append h2 to li
//     append img to li
//     append <p> tag - distance to li
//     append <p> tag - address to li
//     append <p> tags - phone number to li
//     append li to ul

// create init method to kick off the setup of the application
//         call getLocation
//         call display

// call init