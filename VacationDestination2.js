document.addEventListener('DOMContentLoaded', () => {

// these variables are necessary for the execution of our code.
const destinationInput = document.getElementById('destinationName');
const descriptionInput = document.getElementById('description');
const locationInput = document.getElementById('location');
const photoInput = document.getElementById('photo');
const destinationForm = document.getElementById('destinationForm');
const wishlist = document.getElementById('wishlist');


//formSubmit is the function that allows the input on the form shown in the HTML to be returned and rendered out as a WishList Item.
const formSubmit = (event) => {
    event.preventDefault();
let destination = destinationInput.value;
let location = locationInput.value;
let photo = photoInput.value;
let description = descriptionInput.value;
if (!destination | !location | !photo | !description) // this if statement will return an alert asking to have each field hold a value to then list an destination
    return alert("please fill in all fields to generate a destination on your wishlist"); 
}

renderWishList(destination, location, photo, description)
// this resets the input fields to blank after the form returns a new wishlist item
destinationInput = '';
locationInput = '';
photoInput = '';
descriptionInput = '';


// this is how we take the rendered information from the form and return it as a card. We accept the parameters necessary for a wishlist item to return those values to be displayed. 
let renderWishList = (destination, location, photo, description)
let card = document.createElement('section')
card.classList.add('wishlist')

// this is the edit button to be displayed on a card. This button needs an Event Listener when clicked
let editButton = document.createElement('button')
editButton.textContent("Edit")
card.classList.add('wishlist')
editButton.addEventListener('click', () => {

// for edit, you want to prompt the user to make a change one at a time. 
    let newDestinationName = prompt('Edit Destination Name:', destinationName);
    let newLocation = prompt('Edit Location', location);
    let newPhoto = prompt('Edit Photo', photo);
    let newDescription = prompt('Edit Description', description);

    if (newDestinationName) destinationName = newDestinationName;
    if (newLocation) location = newLocation;
    if (newPhoto) photo = newPhoto;
    if (newDescription) description = newDescription; 

    // since the element has been created, use querySelector to identify which element you want to change. 
    card.querySelector('h3').textContent = destinationName;
    card.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Location:</strong> ${location}`;
    card.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Description:</strong> ${description}`;
    card.querySelector('img').src = photo;
    card.querySelector('img').alt = `Photo of ${destinationName}`;

});

// this is the delete button to be listed on each card. This button needs an Event Listener when clicked
let deleteButton = document.createElement('button')
deleteButton.textContent("Delete")
card.classList.add('wishlist')
deleteButton.addEventListener('click', () => {
        card.remove();
});

// you want the renderedWishList Item to be displayed on webpage by nesting the Inputs into it's own HTML. 
//To get the specific values in there, you will use Interpolation. Using backticks, money sign, and curly brackets, your input value can be interpolated into a string `${}`
card.innerHTML = `
    <h3>${destinationName}</h3>
    <p><strong>Location: </strong> ${location}</p>
    <img src="${photo}" alt="Photo of ${destinationName}" style="max-width: 200px;">
    <p><strong>Description:</strong> ${description}</p>

    `
card.appendChild(deleteButton);
card.appendChild(editButton);
wishlist.appendChild(card);

destinationForm.addEventListener('submit', formSubmit)

})
