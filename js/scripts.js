/*
// API usage
*/

/*
Fetch 12 random users from an API on the "randomuser.me" website.
Store these 12 users in an object with the json method.
Fill the "Employees" array with the 12 user objects.
Display those 12 users on the page with the "showEmployees" function.
*/

let Employees = [] ;

const APIurl = 'https://randomuser.me/api/?results=12' ;

fetch(APIurl)
    .then(response => response.json())
    .then(data => Employees = data.results)
    .then(data => showEmployees(Employees));


/*
// User directory
*/

/*
Create a function "showEmployees" to dynamically add HTML code to the index.html file.
Insert HTML code in the "gallery" div, so as to display 12 user "cards".
For every user object of the "Employees" array, a new "card" div is written.
Each "card" div contains the Employee's image, First and Last Name, Email, City and State.
*/

const galleryDiv = document.querySelector('#gallery') ;

function showEmployees (Employees) {
    let galleryMarkup = "" ;

    Employees.forEach(Employee => {
        galleryMarkup += 
        `<div class="card">
               <div class="card-img-container">
                   <img class="card-img" src="${Employee.picture.large}" alt="profile picture">
               </div>
               <div class="card-info-container">
                   <h3 id="name" class="card-name cap"> ${Employee.name.first} ${Employee.name.last} </h3>
                   <p class="card-text"> ${Employee.email} </p>
                   <p class="card-text cap"> ${Employee.location.city}, ${Employee.location.state} </p>
               </div>
        </div>`
    })

    galleryDiv.insertAdjacentHTML('beforeend', galleryMarkup) ;
};


/*
// Modal Window
*/

/*
Add an event listener to respond to clicks on the 12 user "cards".
Clicking on a user card calls the "showClickedEmployee" function, which determines which users has been called,
and then calls this user's "modal window", a pop up window with further details.
Clicking on a user updates the "clickedEmployeeMail" variable, with the user's email.
This happens regardless of where the mouse clicks, in the user "card".
*/

let clickedEmployeeMail ;

galleryDiv.addEventListener('click', (e) => {
    if (e.target.className === 'card'){
        clickedEmployeeMail = e.target.children[1].children[1].innerText ;
        showClickedEmployee ();
    }
    else if (e.target.parentElement.className === 'card'){
        clickedEmployeeMail = e.target.parentElement.children[1].children[1].innerText ;
        showClickedEmployee ();
    }
    else if (e.target.parentElement.parentElement.className === 'card'){
        clickedEmployeeMail = e.target.parentElement.parentElement.children[1].children[1].innerText ;
        showClickedEmployee ();
    }
});

/*
Create a function "showClickedEmployee" to determine which is the "clickedEmployee", using the email of the employee as matching reference.
It then calls for the "showModal" function which displays the pop up window.
*/

let clickedEmployee ;

function showClickedEmployee () {
    for (let i = 0 ; i < Employees.length ; i++) {
        if (Employees[i].email === clickedEmployeeMail) {
            clickedEmployee = Employees[i] ;
            showModal(clickedEmployee);
        }
     }
};

/*
Create a function "convertDob" to convert the date format of the users objects with a MM/DD/YYYY format.
*/

function convertDob (date) {
    return date = date.substring(0,10).replace(/\D/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$2/$3/$1')
};

/*
Create a function "showModal" to display the pop up window of the clicked user card on the gallery.
Dynamically add HTML code to the index.html file, right after the "gallery" div.
Insert a new "modal-container" div, containing the Emloyee's image, First Name, Email, City, Cell number, Detailed Adress, and Birthday.
The closing "modal-close-btn" button with the "X" icon can be clicked to close the pop up, by removing the HTML code.
*/

function showModal (clickedEmployee) {  

     let modalMarkup = 
           `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${clickedEmployee.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap"> ${clickedEmployee.name.first} </h3>
                        <p class="modal-text"> ${clickedEmployee.email} </p>
                        <p class="modal-text cap"> ${clickedEmployee.location.city} </p>
                        <hr>
                        <p class="modal-text">${clickedEmployee.phone}</p>
                        <p class="modal-text">${clickedEmployee.location.street.number} ${clickedEmployee.location.street.name}, ${clickedEmployee.location.city}, ${clickedEmployee.location.state} ${clickedEmployee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${convertDob(clickedEmployee.dob.date)}</p>
                    </div>
                </div>
            </div>`

    galleryDiv.insertAdjacentHTML('afterend', modalMarkup) ;

    const modalDiv = document.querySelector('.modal-container') ;
    
    modalDiv.addEventListener('click', (e) => {
        if (e.target.className === 'modal-close-btn' || e.target.textContent === 'X'){
            modalDiv.remove() ;
        }
    });
};