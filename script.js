// create an app object
const bottleApp = {};

//Initialize data from API

bottleApp.apiUrl = 'https://api.yelp.com/v3/businesses/search';
bottleApp.apiKey = 'Bearer JZYgjDAWC3xGXOVGoquhJgKezVKcCSmnyM5CP-5t0TwLcAjVQGNuGwolK6fnWp2s0wvBtkyAYM-ijdEBQ5eTiynp-dgC3lfLQ6fHFPxuwfYf76n6JBXwX-CSw8S_X3Yx'

bottleApp.headers = new Headers();
bottleApp.headers.append('Authorization', bottleApp.apiKey);
bottleApp.requestOptions = {
    method: 'GET',
    headers: bottleApp.headers,
    redirect: 'follow'
};

bottleApp.getRestaurants = () => {
    const url = new URL(bottleApp.apiUrl);
    url.search = new URLSearchParams({
        term: 'cocktails wine',
        location: 'toronto'
    })

    fetch(url, bottleApp.requestOptions)
    .then((res) => {
        console.log(res);
    })
    
    
    
}

bottleApp.getRestaurants();

// apiKey :  Bearer JZYgjDAWC3xGXOVGoquhJgKezVKcCSmnyM5CP-5t0TwLcAjVQGNuGwolK6fnWp2s0wvBtkyAYM-ijdEBQ5eTiynp-dgC3lfLQ6fHFPxuwfYf76n6JBXwX-CSw8S_X3Yx
// apiURL: https://api.yelp.com/v3/businesses/search
// parameters:
// Location: user enters location(userLocation)
// Term: cocktails
// Limit: 6


// create method getLocation(userLocation) to access api data  
//     Query input text
//     Create an event listener on submit
//     Store user input value 
//     Set input to an empty string


    
// create a method (getUserLocation) to update the variable (userLocation) based on the users input
//      user address value passed into GET function of location parameter

// create a method to (displayResults)
//     take data from API
//     iterate through it with forEach
//     for each object in API will need to create an <li> 
//     create a <h2> for restaurant name
//     create a <img> for photo 
//     add content for img src and alt attributes
//     append h2 to li
//     append img to li
//     append li to ul

// create init method to kick off the setup of the application
//         call getLocation
//         call display

// call init