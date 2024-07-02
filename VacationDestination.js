
document.addEventListener('DOMContentLoaded', ()=> {
    const destinationForm = document.getElementById('destinationForm')
    const destinationInput = document.getElementById('destinationName')
    const locationInput = document.getElementById('location')
    const photoInput = document.getElementById('photo')
    const descriptionInput = document.getElementById('description')
    const wishlist = document.getElementById('wishlist')

let formSubmit = (event) => {
    event.preventDefault();
    let destinationName = destinationInput.value
    let location = locationInput.value
    let photo = photoInput.value
    let description = descriptionInput.value
    if(!destinationName || !location || !photo || !description ){
        return;
    }
    renderWishList( destinationName, location, photo, description)
    destinationInput.value= '';
    locationInput.value = '';
    photoInput.value = '';
    descriptionInput.value = '';
}

let renderWishList = (destinationName, location, photo, description) =>{
let card = document.createElement('div');
card.classList.add('wishlist')

let deleteButton = document.createElement('Button')
deleteButton.textContent = "Delete";
deleteButton.classList.add('delete-button');
deleteButton.addEventListener('click', ()  => { 
    card.remove();
});

let editButton = document.createElement('Button')
editButton.textContent = "Edit";
editButton.classList.add('edit-button')
editButton.addEventListener('click', () => {
    let newDestinationName = prompt('Edit Destination Name:', destinationName);
    let newLocation = prompt('Edit Location', location);
    let newPhoto = prompt('Edit Photo', photo);
    let newDescription = prompt('Edit Description', description);

    if (newDestinationName) destinationName = newDestinationName;
    if (newLocation) location = newLocation;
    if (newPhoto) photo = newPhoto;
    if (newDescription) description = newDescription; 

    card.querySelector('h3').textContent = destinationName;
    card.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Location:</strong> ${location}`;
    card.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Description:</strong> ${description}`;
    card.querySelector('img').src = photo;
    card.querySelector('img').alt = `Photo of ${destinationName}`;

})
card.innerHTML =
`   <h3>${destinationName}</h3>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Description:</strong> ${description}</p>
    <img src="${photo}" alt="Photo of ${destinationName}" style="max-width: 200px;">
`;

let buttonContainer = document.createElement('div')
buttonContainer.classList.add('button-container')
buttonContainer.appendChild(deleteButton)
buttonContainer.appendChild(editButton)

card.appendChild(buttonContainer)
wishlist.appendChild(card);
};

    destinationForm.addEventListener('submit',formSubmit)
})


