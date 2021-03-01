// app object
const bottleApp = {};

//API data 
bottleApp.apiUrl = 'https://api.yelp.com/v3/businesses/search';
bottleApp.apiKey = 'Bearer JZYgjDAWC3xGXOVGoquhJgKezVKcCSmnyM5CP-5t0TwLcAjVQGNuGwolK6fnWp2s0wvBtkyAYM-ijdEBQ5eTiynp-dgC3lfLQ6fHFPxuwfYf76n6JBXwX-CSw8S_X3Yx'

//API call with queries 
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
            bottleApp.slider();
        })
        .catch((err) => {
            alert(`Sorry we can't find bottles right now. Please try again later!`);
        })
}

// get userLocation from form on submit
bottleApp.userLocation = () => {

    const form = document.querySelector('form');
    const resetButton = document.querySelector('#reset');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        resetButton.style.display = 'block';

        const ulEl = document.querySelector('ul');
        ulEl.innerHTML = '';

        const inputEl = document.querySelector('input');
    
        const userInput = inputEl.value;

        if(userInput.trim()) {
            inputEl.value = '';
            bottleApp.getRestaurants(userInput);
        };

        const about = document.querySelector('.about')
        about.style.visibility = 'hidden';

        const mobileButtonBack = document.querySelector('.mobile-back')

        const mobileButtonNext = document.querySelector('.mobile-next')

        function mobileButton () {
            const media = window.matchMedia('(max-width: 480px)'); 
            if (media.matches) {
                mobileButtonBack.style.visibility = 'visible';
                mobileButtonNext.style.visibility = 'visible';
            } else {
                mobileButtonBack.style.visibility = 'hidden';
                mobileButtonNext.style.visibility = 'hidden';
            }
        }
        mobileButton();
    }) 

    resetButton.addEventListener('click', () => {
        location.reload();
    })
}


// display API results on the page with query from userLocation
bottleApp.displayResults = (dataFromApi) => {
    const ulEl = document.querySelector('ul');

    dataFromApi.forEach((datum, index) => {
        
        const liEl = document.createElement('li');

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
        pDistance.textContent = (datum.distance / 1000).toFixed(0) + ` m away!`;
        pAddress.innerHTML =  `<address>${datum.location.address1}</address>`;
        yelpLink.innerHTML = `<i class="fas fa-external-link-alt"></i>`;

        ulEl.appendChild(liEl);
        liEl.append(h2, pDistance, pPhone, pAddress, yelpLink);
        
        if (index === 0) {
            liEl.setAttribute('class', 'current');
        } else if (index === 1) {
            liEl.setAttribute('class', 'next');
        } else if (index === 5) {
            liEl.setAttribute('class', 'prev');
        } 
    })  
}

// slider to display Results
bottleApp.slider = () => {
    const slider = document.querySelector('.slider');
    let prev;
    let current;
    let next;

    const slideContainer = document.querySelector('.slider-inner');
    const prevButton = document.querySelector('.go-back');
    const nextButton = document.querySelector('.go-next');

    function startSlider () {
        current = document.querySelector('.slider-inner').firstElementChild;
        prev = current.previousElementSibling || slideContainer.lastElementChild;
        next = current.nextElementSibling || slideContainer.firstElementChild;
    }

    function addClasses () {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function move (direction) {
        const classesToRemove = ['prev', 'current', 'next'];
        [ prev, current, next ].forEach((el) => {
            el.classList.remove(...classesToRemove);
        });

        if (direction === 'back') {
            [ prev, current, next ] = [ prev.previousElementSibling || slideContainer.lastElementChild, prev, current ]
        } else {
            [ prev, current, next ] = [ current, next, next.nextElementSibling || slideContainer.firstElementChild ];
        }

    addClasses();   

    
}

prevButton.addEventListener('click', () => move('back'));
nextButton.addEventListener('click', move);

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        move('back');
    } else if (e.key === 'ArrowRight') {
        move();
    }
})
    startSlider();
}

// secret pick bottle shop objects
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
        url: 'https://www.instagram.com/grapewitches/?hl=en'
    },
    donnas = {
        name: `Donna's`,
        phone: '+1 416-536-1414',
        address: '827 Lansdowne Ave',
        url: 'https://www.instagram.com/donnas.to/?hl=en'
    },
    paradiseGrapevine = {
        name: 'Paradise Grapevine',
        phone: '+1 416-536-7178',
        address: '841 Bloor St West',
        url: 'https://www.instagram.com/paradisegrapevine/?hl=en'
    },
    bernhardts = {
        name: `Bernhardt's`,
        phone: `+1 416-530-0008`,
        address: '202 Dovercourt Rd',
        url: 'https://www.instagram.com/bernhardtstoronto/?hl=en'
    }
]

// reveal secrets on command
bottleApp.secrets = () => {
    const bottle = document.querySelector('.secret-image');
    
    bottle.addEventListener('mouseover', fillBottle);
    bottle.addEventListener('mouseout', emptyBottle);

    function handleOpen() {

            secretMenu.classList.toggle('show-secrets');
            
            if (bottle.src === './assets/bottles-logo-empty.png') {
                bottle.src = './assets/bottles-logo-full.png';
                bottle.setTabIndex(1);
                
            }  else if (bottle.src === './assets/bottles-logo-full.png') {
                bottle.src = './assets/bottles-logo-empty.png';
                
                fillBottle();
                emptyBottle();
            }
        }

    bottle.addEventListener('focusin', fillBottle);
    bottle.addEventListener('focusout', emptyBottle);
    bottle.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleOpen();
        }
    });
    
    bottle.addEventListener('click', handleOpen);

    function fillBottle() {
        bottle.src = './assets/bottles-logo-full.png';
        bottle.classList.add('animate__animated', 'animate__swing');
    }

    function emptyBottle() {

        if (secretMenu.classList.contains('show-secrets')) {
            return;
        }
            bottle.src = './assets/bottles-logo-empty.png';
            bottle.classList.remove('animate__animated', 'animate__swing');
    }

    const secretMenu = document.querySelector('.secret-menu')

    for (let key of bottleApp.staffPicks) {

        const shopName = key.name;
        const address = key.address;
        const phoneNum = key.phone;
        const link = key.url;

        const listEl = document.createElement('li');

        listEl.innerHTML += `
            <h2>${shopName}</h2>
            <div>
            <p>${address}</p>
            <a href="tel:${phoneNum}">${phoneNum}</a>
            </div>
            <a href="${link}>"><i class="fab fa-instagram"></i></a>`;

        document.querySelector('.shops').appendChild(listEl);
    }
}

// functions to kick off the setup of the application
bottleApp.init = () => {
    bottleApp.secrets();
    bottleApp.userLocation();  
}

// call init
bottleApp.init();