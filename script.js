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
            bottleApp.displayResults(jsonRes);
        })

    }
    
    
    // create a method to (displayResults)
    bottleApp.displayResults = (dataFromApi) => {
        // take data from API and iterate through it with forEach
        dataFromApi.forEach((datum) => {
        //     for each object in API will need to create an <li> 
        const liEl = document.createElement('li');
        //     create a <h2> for restaurant name
        const h2 = document.createElement('h2');
        // const restaurant = h2.classList.add('restaurantName');
        //     create a <img> for photo 
        const imgEl = document.createElement('img');
        //     create a <p> for restaurant phone number
        const pPhone = document.createElement('p');
        //     create a <p> for restaurant distance
        const pDistance = document.createElement('p');
        //     create a <p> for restaurant address
        const pAddress = document.createElement('p');
        
        console.log(datum);
        
    })  
    
}

// bottleApp.displayResults();
//     add content for img src and alt attributes
//          divide the value distance by 1000 to get km 
//     append h2 to li
//     append img to li
//     append <p> tag - address to li
//     append <p> tag - distance to li
//     append <p> tags - phone number to li
//     append li to ul


    // create a method (userLocation) to update the variable (userAddress) based on the users input
    // user address value passed into (getRestaurants) method of location parameter
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
    
    
    
    

// create init method to kick off the setup of the application
bottleApp.init = () => {
    //         call getLocation
    bottleApp.userLocation();   
}
// call init
bottleApp.init();