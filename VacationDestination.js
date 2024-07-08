const wishlist = document.getElementById('wishlist')

/* Retrieve the Data from Local Storage from 'wishlist'
 * JSON.stringify takes a JS object and stores in into a JSON string for local storage
 * JSON.parse takes the JSON string retrieved from local storage and returns it back as a JS object
 * we need || [] to ensure if (localStorage.getItem('wishlist')) is 'null' or if parsing fails, wishlist is assigned as an empty array.
 * This way, wishlistItem is always defined and is an array, even if no data exist in local storage. 
 */

 let wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];

// fetch photo function
// fetch request will fetch the api key and url

const fetchPhoto = async (query) => {
    const apiKey = 'dXog8yhrjZjHYHkL05cIXutVPljh5pxYYAzAuWK0nxk';
    const url = `https://api.unsplash.com/photos/random?query=${query}`
    try {
        const response = await fetch(url, {
            headers: {
            Authorization: `Client-ID ${apiKey}` 
            }
        });
        const data = await response.json();
        if (data && data.urls && data.urls.small) {
            return data.urls.small; // Return the random photo URL
        } else {
            throw new Error('No photos found');
        }
    } catch (error) {
        console.error('Error fetching photo:', error);
        return 'default_photo_url'; // Fallback photo URL
    }
};

// renders a wishlist item. pass in the parameters needs to make wishlist appear.
let renderWishList = (destinationName, location, photo, description) =>{
    let card = document.createElement('div');
    card.classList.add('wishlist')
    
    // created the delete button
    let deleteButton = document.createElement('Button')
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', ()  => { 
        card.remove(); // removes the card from the wishlist
        // remove the item from local storage
        wishlistItem = wishlistItem.filter(item => item.destinationName !== destinationName);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItem))
    });
    
    // created the edit button with the configuration for it
    let editButton = document.createElement('Button')
    editButton.textContent = "Edit";
    editButton.classList.add('edit-button')
    editButton.addEventListener('click', async () => {
        let newDestinationName = prompt('Edit Destination Name:', destinationName);
        let newLocation = prompt('Edit Location', location);
     //   let newPhoto = prompt('Edit Photo', photo);
        let newDescription = prompt('Edit Description', description);
    
        if (newDestinationName) destinationName = newDestinationName;
        if (newLocation) location = newLocation;
     //   if (newPhoto) photo = newPhoto;
        if (newDescription) description = newDescription; 

        let newPhoto = await fetchPhoto(newDestinationName || destinationName);
    
            // updates the card's content with the new values. 
        card.querySelector('h3').textContent = destinationName;
        card.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Location:</strong> ${location}`;
        card.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Description:</strong> ${description}`;
        card.querySelector('img').src = newPhoto;
        card.querySelector('img').alt = `Photo of ${destinationName}`;
    
            // updates the item in local storage
        const index = wishlistItem.findIndex(item => item.destinationName === destinationName)
        if (index !== -1) {
            wishlistItem[index] = {destinationName, location, photo: newPhoto, description}
            localStorage.setItem('wishlist', JSON.stringify(wishlistItem))
        }
    });
    
    // sets the card's inner HTML with the Items details
    card.innerHTML =
    `   <h3>${destinationName}</h3>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
        <img src="${photo}" alt="Photo of ${destinationName}" style="max-width: 200px;">
    `;
    
    // created a container for buttons on card to live in. 
    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')
    
    // append the edit and delete button to the button container
    buttonContainer.appendChild(deleteButton)
    buttonContainer.appendChild(editButton)
    
    // append the buttonContainer to the card
    card.appendChild(buttonContainer)
    
    // append the card to the wishlist container
    wishlist.appendChild(card);
    };


    
// waiting for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', ()=> {
    const destinationForm = document.getElementById('destinationForm')
    const destinationInput = document.getElementById('destinationName')
    const locationInput = document.getElementById('location')
    // const photoInput = document.getElementById('photo')
    const descriptionInput = document.getElementById('description')

    wishlist.innerHTML= '';
    /*
     *   When retrieving data from localStorage, it comes as a string.
     *   You need to convert this string back into its original format using JSON.parse.
     *   Local Storage only supports strings,
    */

    // loads wishlist items from local storage, otherwise use an empty array
    let wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || []; // JSON.parse Converts a JSON String back into a JS object or an Array
    wishlistItem.forEach(item => {
        // renders each item from local storage
        renderWishList(item.destinationName, item.location, item.photo, item.description)
    });

    // handles form submission
let formSubmit = async (event) => {
    event.preventDefault(); // prevents the default form submission
    let destinationName = destinationInput.value
    let location = locationInput.value
    // let photo = photoInput.value
    let description = descriptionInput.value

    // checks if all fields are filled
    // fetch photo is going to edit the form. we need to fetch the URL instead of user input
    if(!destinationName || !location || !description ){
        return alert("please fill in all fields to generate a destination on your wishlist"); // returns an alert message if fields are empty
    }
    let photo = await fetchPhoto(destinationName);

    //render the new wish list item
    renderWishList(destinationName, location, photo, description);

    // saves the newly rendered item to local storage
    wishlistItem.push({destinationName, location, photo, description});
    localStorage.setItem('wishlist', JSON.stringify(wishlistItem)) // stores the JSON String into localStorage
    // JSON.stringify Converts a JS object or Array into a JSON string

    // TO-DO: change/ remove the clear photo 
    // this clears the input fields
    destinationInput.value= '';
    locationInput.value = '';
    // photoInput.value = '';
    descriptionInput.value = '';
}

    // Event listener to the form for handling the submissions
    destinationForm.addEventListener('submit',formSubmit)
})


