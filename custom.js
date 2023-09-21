
const loadFoods = async(searchValue) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayFoods(data.meals);
}

// Display Foods 
const displayFoods = foods => {
    // console.log(foods);
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerText = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('col-md-6');
        foodDiv.innerHTML = `
            <div class="single-food-info border d-flex align-items-center">
                <div class="food-pic">
                    <img src="${food.strMealThumb}" alt="">
                </div>
                <div class="food-info px-3">
                    <h4>${food.strMeal}</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, eaque.</p>
                    <!-- Button trigger modal -->
                    <button id="view-details-btn" onclick="loadSingleFood(${food.idMeal})" type="button" class="pop-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        View Details
                    </button>
                </div>
            </div>
        `;
        // Append Child Div
        foodContainer.appendChild(foodDiv);
    });
}

// Search foods 
const searchFoods = document.getElementById('search-btn');
searchFoods.addEventListener('click', function(){
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadFoods(searchText);
});

// Load details in popup box
const loadSingleFood = (foodId) => {
    const singleFoodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(singleFoodUrl)
    .then(res => res.json())
    .then(data => displaySingleFood(data.meals));
}

// Show single food in popup
const displaySingleFood = (singleFoodPopUp) => {
    console.log(singleFoodPopUp[0].idMeal);
    const singleFoodTitle = singleFoodPopUp[0].strMeal
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = singleFoodTitle;

    const singleFoodPic = singleFoodPopUp[0].strMealThumb;
    const singleFoodCat = singleFoodPopUp[0].strCategory;
    const singleFoodArea = singleFoodPopUp[0].strArea;
    const singleFoodIns = singleFoodPopUp[0].strInstructions;
    const singleFoodVideo = singleFoodPopUp[0].strYoutube;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${singleFoodPic}" />
        <p><strong>Category: </strong>${singleFoodCat}</p>
        <p><strong>Area: </strong>${singleFoodArea}</p>
        <p><strong>Instruction: </strong>${singleFoodIns}</p>
        <span><strong>Watch On Youtube</strong></span>
        <p><a href="${singleFoodVideo}" target="_blank"><i class="fa fa-youtube-play" style="font-size:48px;color:red"></i></a></p>
    `;
    // const modalContainer = document.getElementById('modal-container');
    // singleFoodPopUp.forEach(singleFood => {
    //     const modalDiv = document.createElement('div');
    //     modalDiv.classList.add('modal-content');
    //     modalDiv.innerHTML = `
    //         <div class="modal-header">
    //             <h1 class="modal-title fs-5" id="exampleModalLabel">${singleFood.strMeal}</h1>
    //             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div class="modal-body">
    //             <img src="${singleFood.strMealThumb}" />
    //         </div>
    //         <div class="modal-footer">
    //             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         </div>
    //     `;
    //     modalContainer.appendChild(modalDiv);
    // });
}




// Load Foods
loadFoods('a');