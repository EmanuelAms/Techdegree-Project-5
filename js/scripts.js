/*
// API usage
*/

/*
Fetch 12 random users from an API on the "randomuser.me" website.
Store these 12 users in an object with the json method.
Fill the "Users" array with the 12 user objects.
Display those 12 users on the page with the "displayUsers" function.
Show an Error message if the API request fails.
*/

let Users = [] ;

const galleryDiv = document.querySelector('.gallery');

const APIurl = 'https://randomuser.me/api/?results=12' ;

fetch(APIurl)
.then(response => response.json())
.then(data => Users = data.results)
.then(data => displayUsers())
.catch(error => Error('The request has failed. Try again !'));


/*
// User directory
*/

/*
Create a function "displayUsers" to dynamically add HTML code to the index.html file.
Insert HTML code in the "galleryDiv" div, so as to display 12 user "cards".
For every object of the "Users" array, a new "card" div is written.
Each "card" div contains the Employee's image, First and Last Name, Email, City and State.
Add an event listener to respond to clicks on the 12 user "cards".
Clicking on a user card calls the "displayModal" function which displays the pop up window.
The clicked User is determined by the "i" identifier in the id attribute of the "card" div. 
*/

function displayUsers () {

    for (let i = 0 ; i < Users.length ; i ++) {

        const cardDiv = document.createElement('div') ;
        cardDiv.className = 'card' ;
        cardDiv.id = i ;

        const cardImgContainerDiv = document.createElement('div') ;
        cardImgContainerDiv.className = 'card-img-container' ;

        const cardImg = document.createElement('img') ;
        cardImg.className = 'card-img' ;
        cardImg.src = Users[i].picture.large ;
        cardImg.alt = 'profile picture' ;

        const cardInfoContainerDiv = document.createElement('div') ;
        cardInfoContainerDiv.className = 'card-info-container' ;

        const cardNameCap = document.createElement('h3') ;
        cardNameCap.id = 'name' ;
        cardNameCap.class = 'card-name cap' ;
        cardNameCap.innerText = Users[i].name.first + ' ' + Users[i].name.last ;

        const cardText = document.createElement('p') ;
        cardText.innerText = Users[i].email ;

        const cardTextCap = document.createElement('p') ;
        cardTextCap.innerText = Users[i].location.city + ', ' + Users[i].location.state ;

        galleryDiv.appendChild(cardDiv) ;
        cardDiv.appendChild(cardImgContainerDiv) ;
        cardDiv.appendChild(cardInfoContainerDiv) ;
        cardImgContainerDiv.appendChild(cardImg) ;
        cardInfoContainerDiv.appendChild(cardNameCap) ;
        cardInfoContainerDiv.appendChild(cardText) ;
        cardInfoContainerDiv.appendChild(cardTextCap) ;

    };

    galleryDiv.addEventListener('click', e => {

        displayModal (Users[e.target.closest('.card').id]) ;

    });
        
};

/*
// Modal Window
*/

/*
Create a function "RegexBirthday" to convert the date format into a MM/DD/YYYY format.
Create a function "RegexCellphone" to convert the phone number format into a (XXX) XXX-XXXX format.
@param/return {string} - birthday/cellphoneString : the string picked up from the clicked User's properties, to be returned in converted form.
*/

function RegexBirthday (birthdayString) {

    return birthdayString = birthdayString.substring(0, 10).replace(/\D+/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$2/$3/$1')

};

function RegexCellphone (cellphoneString) {

    cellphoneString = cellphoneString.replace(/\D+/g, '');

    if (cellphoneString.length !== 10) {

        return cellphoneString = 'Invalid phone number';

    }
    
    else {

        return cellphoneString = cellphoneString.replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')

    }

};

/*
Create a function "displayModal" to display the pop up window of the clicked user card on the gallery.
Replace the clicked User's cellphone and birthday with the new converted formats.
Dynamically add HTML code to the index.html file, after the end of the "gallery" div.
Insert a new "modal-container" div, containing the Employee's image, First Name, Email, City, Cell number, Detailed Adress, and Birthday.
The closing "modal-close-btn" button with the "X" icon can be clicked to close the pop up, by hiding the HTML code.
@param {object} - clickedUser : the clicked User object in the Users array.
*/

function displayModal (clickedUser) {

    clickedUserCellphone = RegexCellphone(clickedUser.cell) ;
    clickedUserBirthday = RegexBirthday(clickedUser.dob.date) ;

    const modalContainerDiv = document.createElement('div') ;
    modalContainerDiv.className = 'modal-container' ;

    const modalDiv = document.createElement('div') ;
    modalDiv.className = 'modal' ;

    const button = document.createElement('button') ;
    button.type = 'button' ;
    button.id = 'modal-close-btn' ;
    button.className = 'modal-close-btn' ;

    const strong = document.createElement('strong') ;
    strong.innerText = 'X' ;

    const modalInfoContainerDiv = document.createElement('div') ;
    modalInfoContainerDiv.className = 'modal-info-container' ;
    
    const modalImg = document.createElement('img') ;
    modalImg.className = 'modal-img' ;
    modalImg.src = clickedUser.picture.large ;
    modalImg. alt = 'profile picture' ;

    const modalNameCap = document.createElement('h3') ;
    modalNameCap.id = 'name' ;
    modalNameCap.class = 'modal-name cap' ;
    modalNameCap.innerText = clickedUser.name.first + ' ' + clickedUser.name.last ;

    const modalText1 = document.createElement('p') ;
    modalText1.className = 'modal-text' ;
    modalText1.innerText = clickedUser.email ;

    const modalTextCap = document.createElement('p') ;
    modalTextCap.className = 'modal-text cap' ;
    modalTextCap.innerText = clickedUser.location.city ;

    const horizontalRule = document.createElement('hr') ;

    const modalText2 = document.createElement('p') ;
    modalText2.className = '' ;
    modalText2.innerText = clickedUserCellphone ;

    const modalText3 = document.createElement('p') ;
    modalText3.className = '' ;
    modalText3.innerText = clickedUser.location.street.number + ', ' + clickedUser.location.city + ', ' + clickedUser.location.state + ' ' + clickedUser.location.postcode ;

    const modalText4 = document.createElement('p') ;
    modalText4.className = '' ;
    modalText4.innerText = 'Birthday: ' + clickedUserBirthday ;

    galleryDiv.insertAdjacentElement('afterend', modalContainerDiv) ;
    modalContainerDiv.appendChild(modalDiv) ;
    modalDiv.appendChild(button) ;
    button.appendChild(strong) ;
    modalDiv.appendChild(modalInfoContainerDiv) ;
    modalInfoContainerDiv.appendChild(modalImg) ;
    modalInfoContainerDiv.appendChild(modalNameCap) ;
    modalInfoContainerDiv.appendChild(modalText1) ;
    modalInfoContainerDiv.appendChild(modalTextCap) ;
    modalInfoContainerDiv.appendChild(horizontalRule) ;
    modalInfoContainerDiv.appendChild(modalText2) ;
    modalInfoContainerDiv.appendChild(modalText3) ;
    modalInfoContainerDiv.appendChild(modalText4) ;

    button.addEventListener('click', e => modalContainerDiv.style.visibility = 'hidden');
    
};