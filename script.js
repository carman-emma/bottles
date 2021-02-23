// create an app object
const bottleApp = {};

//Initialize data from API

bottleApp.apiUrl = 'https://api.yelp.com/v3/businesses/search';
bottleApp.apiKey = 'Bearer JZYgjDAWC3xGXOVGoquhJgKezVKcCSmnyM5CP-5t0TwLcAjVQGNuGwolK6fnWp2s0wvBtkyAYM-ijdEBQ5eTiynp-dgC3lfLQ6fHFPxuwfYf76n6JBXwX-CSw8S_X3Yx'

bottleApp.getRestaurants = (userAddress) => {
    const url = new URL('http://proxy.hackeryou.com');
    url.search = new URLSearchParams({
        reqUrl: bottleApp.apiUrl,
        'params[key]': bottleApp.apiKey,
        'params[term]': 'cocktails wine',
        'params[location]': userAddress + ' Toronto',
        'params[sort_by]': 'distance',
        'params[limit]': 6,
        'proxyHeaders[Authorization]': bottleApp.apiKey, 
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
    liEl.classList.add('slide-image');
    //     create a <h2> for restaurant name
    const h2 = document.createElement('h2');

    const pPhone = document.createElement('p');
    pPhone.classList.add('phone'); 

    const pDistance = document.createElement('p');
    pDistance.classList.add('distance');
        
    const pAddress = document.createElement('p');

    const yelpLink = document.createElement('a');
    yelpLink.classList.add('yelp-link');
    yelpLink.href = datum.url

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

bottleApp.carousel = () => {
    const slider = document.querySelector('.slider');
    const innerSlider = document.querySelector('.slider-inner');

    let pressed = false;
    let startX;
    let x;

    slider.addEventListener('mousedown', (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider.offsetLeft;
        slider.style.cursor = 'grabbing';
    })

    slider.addEventListener('mouseenter', () => {
        slider.style.cursor = 'grab';
    })

    slider.addEventListener('mouseup', () => {
        slider.style.cursor = 'grab';
    })

    window.addEventListener('mouseup', () => {
        pressed = false;
    })

    slider.addEventListener('mousemove', (e) => {
        if (!pressed) return;
        e.preventDefault();

        x = e.offsetX 
        innerSlider.style.left = `${x - startX}px`;
        checkBoundary();
    })

    function checkBoundary () {
        let outer = slider.getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();
        console.log('outer:', outer);
        console.log('inner:', inner);
        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = '0px';
        } else if (inner.right < outer.right) {
            innerSlider.style.left = `-${inner.width - outer.width}px`;
        }
        
    }

}


bottleApp.staffPicks = [
    tommyWine = {
        name: `Tommy's Wine Bar`,
        phone: '+1 416-530-1430',
        address: '1977 Dundas St West',
        url: 'https://www.instagram.com/tommyswinebarto/?hl=en'
    },
    oldTown = {
        name: 'Oldtown Bodega',
        phone: '',
        address: '402 King St East',
        url: 'https://www.instagram.com/oldtownbodega/?hl=en'
    },
    grapeGlass = {
        name: 'Grape Glass',
        phone: '+1 416-546-2151',
        address: '1247 Dundas St West',
        url: 'https://www.grapewitches.com/grape-glass'
    },
    donnas = {
        name: `Donna's`,
        phone: '+1 416-536-1414',
        address: '827 Lansdowne Ave',
        url: 'https://donnas.ca/'
    },
    paradiseGrapevine = {
        name: 'Paradise Grapevine',
        phone: '+1 416-536-7178',
        address: '841 Bloor St West',
        url: 'https://www.paradisegrapevine.com/'
    },
    bernhardts = {
        name: `Bernhardt's`,
        phone: `+1 416-530-0008`,
        address: '202 Dovercourt Rd',
        url: 'http://www.bernhardtstoronto.com'
    }
]

bottleApp.showSecrets = () => {
    const bottle = document.querySelector('img');
    bottle.addEventListener('mouseover', (e) => {
        bottle.src = './assets/bottle-02.png';
    })

    bottle.addEventListener('mouseout', (e) => {
        bottle.src = './assets/bottle-01.png';
    })
}


// create init method to kick off the setup of the application
bottleApp.init = () => {
    //         call getLocation
    bottleApp.showSecrets();
    bottleApp.userLocation();  
    bottleApp.carousel();
}
// call init
bottleApp.init();