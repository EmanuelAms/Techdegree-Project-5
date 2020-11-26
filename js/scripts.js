let Employees = [] ;
let clickedEmployee ;

const APIurl = 'https://randomuser.me/api/?results=12' ;

fetch(APIurl)
.then(response => response.json())
.then(data => Employees = data.results)
.then(data => showEmployees(Employees))
.then(data => showModal(clickedEmployee)) ;




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



function showClickedEmployee () {
for (let i = 0 ; i < Employees.length ; i++) {
    if (Employees[i].email === clickedEmployeeMail) {
        let clickedEmployee = Employees[i] ;
        showModal(clickedEmployee);
  }
 }

} ;

function convertDob (date) {
    return date = date.substring(0,10).replace(/\D/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$2/$3/$1');
}

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