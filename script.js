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
            const { businesses } = jsonRes
            bottleApp.displayResults(businesses);
        })
    }
    
    // create a method (userLocation) to update the variable (userAddress) based on the users input
    // user address value passed into (getRestaurants) method of location parameter
    bottleApp.userLocation = () => {
        //     Query input text
        const form = document.querySelector('form');
        //     Create an event listener on submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const ulEl = document.querySelector('ul');
            ulEl.innerHTML = '';
            const inputEl = document.querySelector('input');
            //     Store user input value 
            const userInput = inputEl.value;
            //     Set input to an empty string
            inputEl.value = '';
            bottleApp.getRestaurants(userInput);
        }) 
    }
    
    // create a method to (displayResults)
    bottleApp.displayResults = (dataFromApi) => {
        const ulEl = document.querySelector('ul');
        // take data from API and iterate through it with forEach
        dataFromApi.forEach((datum) => {
        //     for each object in API will need to create an <li> 
        const liEl = document.createElement('li');
        //     create a <h2> for restaurant name
        const h2 = document.createElement('h2');

        const pPhone = document.createElement('p');
        pPhone.classList.add('phone'); 

        const pDistance = document.createElement('p');
        pDistance.classList.add('distance');
        
        const pAddress = document.createElement('p');

        const yelpLink = document.createElement('a');
        yelpLink.classList.add('yelp-link');
        yelpLink.href(datum.url);

        h2.textContent = datum.name;
        pPhone.innerHTML = `<a href='tel:${datum.phone}'>${datum.display_phone}</a>`;
        pDistance.textContent = (datum.distance / 1000).toFixed(0) + ` meters away!`;
        pAddress.innerHTML =  `<address>${datum.location.address1}</address>`;
        yelpLink.innerHTML = `<i class="fas fa-external-link-alt"></i>`;
        
        ulEl.appendChild(liEl);
        liEl.appendChild(h2)
            .appendChild(pDistance)
            .appendChild(pPhone)
            .appendChild(pAddress)
            .appendChild(yelpLink);
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


// create init method to kick off the setup of the application
bottleApp.init = () => {
    //         call getLocation
    bottleApp.userLocation();   
}
// call init
bottleApp.init();