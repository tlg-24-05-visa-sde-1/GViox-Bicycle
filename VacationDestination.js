import fetchPhoto from "./fetchPhoto.js";

const wishlist = document.getElementById('wishlist');
let wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];

let renderWishList = (destinationName, location, photo, description) => {
    let card = document.createElement('div');
    card.classList.add('wishlist');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => { 
        const index = wishlistItem.findIndex(item => item.destinationName === destinationName);
        if (index !== -1) {
            wishlistItem.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlistItem));
        }
        card.remove();
    });
    
    let editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', async () => {
        let newDestinationName = prompt('Edit Destination Name:', destinationName);
        let newLocation = prompt('Edit Location', location);
        let newDescription = prompt('Edit Description', description);
    
        if (newDestinationName) destinationName = newDestinationName;
        if (newLocation) location = newLocation;
        if (newDescription) description = newDescription; 

        fetchPhoto(newDestinationName || destinationName).then(newPhoto => {
            card.querySelector('h3').textContent = destinationName;
            card.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Location:</strong> ${location}`;
            card.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Description:</strong> ${description}`;
            card.querySelector('img').src = newPhoto || default_photo_url; // Use default photo URL if newPhoto is null
            card.querySelector('img').alt = `Photo of ${destinationName}`;
        
            const index = wishlistItem.findIndex(item => item.destinationName === destinationName);
            if (index !== -1) {
                wishlistItem[index] = { destinationName, location, photo: newPhoto || default_photo_url, description };
                localStorage.setItem('wishlist', JSON.stringify(wishlistItem));
            }
        });
    });
    
    card.innerHTML =
    `   <h3>${destinationName}</h3>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
        <img src="${photo || default_photo_url}" alt="Photo of ${destinationName}" style="max-width: 200px;">
    `;
    
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);  
    card.appendChild(buttonContainer); 
    wishlist.appendChild(card);
};

document.addEventListener('DOMContentLoaded', () => {
    const destinationForm = document.getElementById('destinationForm');
    const destinationInput = document.getElementById('destinationName');
    const locationInput = document.getElementById('location');
    const descriptionInput = document.getElementById('description');
    
    wishlist.innerHTML = '';

    wishlistItem.forEach(item => {
        renderWishList(item.destinationName, item.location, item.photo, item.description);
    });

    let formSubmit = (event) => {
        event.preventDefault();
        let destinationName = destinationInput.value;
        let location = locationInput.value;
        let description = descriptionInput.value;
      
        if (!destinationName || !location || !description) {
          return alert("Please fill in all fields to generate a destination on your wishlist");
        }
      
        fetchPhoto(destinationName).then(photo => {
          fetch('/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destinationName, location, photo, description })
          })
          .then(response => response.json())
          .then(data => {
            renderWishList(destinationName, location, photo, description);
            destinationInput.value = '';
            locationInput.value = '';
            descriptionInput.value = '';
          })
          .catch(error => console.error('Error adding destination:', error));
        });
      };
      

    destinationForm.addEventListener('submit', formSubmit);
});