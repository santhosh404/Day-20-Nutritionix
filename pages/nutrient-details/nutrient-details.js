//Importing elements
const headerTitle = document.getElementById('header-title');
const servingQuantity = document.getElementById('serving-quantity');
const servingUnit = document.getElementById('serving-unit');
const servingWeight = document.getElementById('serving-weight');
const calorie = document.getElementById('calorie');
const fat = document.getElementById('fat');
const saturatedFat = document.getElementById('saturated-fat');
const cholestrol = document.getElementById('cholestrol');
const sodium = document.getElementById('sodium');
const carbohydrate = document.getElementById('carbohydrate');
const sugar = document.getElementById('sugar');
const protiens = document.getElementById('protiens');





//API base url
const API_BASE_URL = "https://trackapi.nutritionix.com/v2";


//Calling the nutrition details 
document.addEventListener('DOMContentLoaded', () => {

    const foodName = localStorage.getItem('foodName');

    fetch(`${API_BASE_URL}/natural/nutrients`, {
        method: "POST",
        body: JSON.stringify({query: foodName}),
        headers: {
            "Content-Type": "application/json",
            "x-app-id": "627e4a3e",
            "x-app-key": "a2a71cac01aa9c4f184786ccb9d56a60"
        }
    })

    .then(response => {
        if(response.status === 404) {
            return response.json().then(jsonResponse => {
                throw new Error(jsonResponse.message);
            })
        }
        headerTitle.innerHTML = `Nutrient Details for <span style="color:#ffd43b"> ${foodName} </span>`;
        return response.json();
    }) 

    .then(data => {
       
        //Setting the nutrient details into DOM.
        servingQuantity.innerText = data.foods[0].serving_qty;
        servingUnit.innerText = data.foods[0].serving_unit;
        servingWeight.innerText = `${data.foods[0].serving_weight_grams} gm`;
        calorie.innerText = data.foods[0].nf_calories;
        fat.innerText = data.foods[0].nf_total_fat;
        saturatedFat.innerText = data.foods[0].nf_saturated_fat;
        sodium.innerText = data.foods[0].nf_sodium;
        cholestrol.innerText = data.foods[0].nf_cholesterol;
        carbohydrate.innerText = data.foods[0].nf_total_carbohydrate;
        sugar.innerText = data.foods[0].nf_sugars;
        protiens.innerText = data.foods[0].nf_protein;
    })
   
    .catch(err => alert(err.message))
    
})