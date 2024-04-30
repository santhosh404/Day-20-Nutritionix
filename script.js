const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const nutrientDetailContainer = document.getElementById('nutrient-details-container');
const nutrientDetailRow = document.getElementById('nutrient-details-row');


//Adding click event listener to searchButton

searchButton.addEventListener('click', () => {

    // Alerting the user when the input field is empty
    if (!searchInput.value || searchInput.value === "") {
        alert("Input can't be empty");
    }

    else {

        nutrientDetailRow.innerHTML = "";
        //Fetching the food details from nutrionix api
        fetchData(`natural/nutrients`, { method: "POST", body: JSON.stringify({ "query": searchInput.value }) })
            .then(response => {
                response.foods.forEach(r => {

                    //Creating the card element for displaying the foods
                    // const outerDiv = createElement('div', { classNames: 'd-flex justify-content-center align-items-center' });
                    const cardDiv = createElement('div', { classNames: 'card' });
                    const cardBodyDiv = createElement('div', { classNames: 'card-body' });
                    const imageDiv = createElement('div', { classNames: 'h-25' });
                    const image = createElement('img', {
                        // Set image attributes
                        src: r.photo.thumb,
                    });
                    const hr = createElement('hr', {});
                    const cardContentDiv = createElement('div', {
                        classNames: 'card-content d-flex flex-column align-items-center justify-content-center'
                    });
                    const heading = createElement('h1', { innerHtml: r.food_name });
                    const servingUnit = createElement('p', { innerHtml: `<b>Serving unit</b>: ${r.serving_unit}` });
                    const servingQuantity = createElement('p', { innerHtml: `<b>Serving Quantity</b>: ${r.serving_qty}` });
                    const button = createElement('button', {
                        classNames: 'btn btn-design',
                        innerHtml: 'Know More'
                    });
                    

                    imageDiv.appendChild(image);
                    cardBodyDiv.appendChild(imageDiv);
                    cardBodyDiv.appendChild(hr);
                    cardContentDiv.appendChild(heading);
                    cardContentDiv.appendChild(servingUnit);
                    cardContentDiv.appendChild(servingQuantity);
                    cardContentDiv.appendChild(button);
                    cardBodyDiv.appendChild(cardContentDiv);
                    cardDiv.appendChild(cardBodyDiv);
                    // outerDiv.appendChild(cardDiv);
                    nutrientDetailRow.appendChild(cardDiv)

                    button.addEventListener('click', (e) => {
                        const foodName = e.target.parentNode.firstChild.innerText;
                        localStorage.setItem('foodName', foodName);
                        window.location.href = '/pages/nutrient-details/nutrient-details.html';
                    })
                })
               

                //Navigate to nutrient-details-container
                nutrientDetailContainer.classList.add('show-nutrient-container')
                window.location.href = '#nutrient-details-container'
            })
            .catch(err => alert(err))
    }
})



//Creating the customized function for API calls
const fetchData = async (endPoint, option) => {

    const API_BASE_URL = "https://trackapi.nutritionix.com/v2";
    const options = {
        ...option,
        headers: {
            "Content-Type": "application/json",
            "x-app-id": "627e4a3e",
            "x-app-key": "a2a71cac01aa9c4f184786ccb9d56a60"
        }
    }


    return fetch(`${API_BASE_URL}/${endPoint}`, options)
        .then(response => {
            if(response.status === 404) {
                return response.json().then(jsonResponse => {
                    return Promise.reject(jsonResponse.message);
                })
            }
            return response.json();

        })
       
        .catch(err => Promise.reject(err))

}



//Function to create element using DOM
function createElement(elementName, args) {

    const element = document.createElement(elementName);

    if (args.id) {
        element.id = args.id;
    }
    if (args.classNames) {
        args.classNames.split(' ').forEach(c => {
            element.classList.add(c);
        })
    }

    if (args.innerHtml) {
        element.innerHTML = args.innerHtml;
    }

    if(args.src) {
        element.src = args.src;
    }

    return element;

}

document.addEventListener('DOMContentLoaded', () => {
    nutrientDetailRow.innerText = "No contents available."
})
