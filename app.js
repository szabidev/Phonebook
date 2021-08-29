// Get all the elements to interact with the DOM
let form = document.querySelector('.form');
let inputMessage = document.getElementById('inputMessage');
let table = document.querySelector('.book-table');
let tableBody = document.createElement('tbody');
let nameInput = document.getElementById('name');
let numberInput = document.getElementById('number');
let submitBtn = document.querySelector('.btn');
let editBtn = document.querySelector('.edit-btn');
let deleteBtn = document.querySelector('.delete-btn');


// Function to manipulate elements
function addNumber() {
    if (nameInput.value != '' && numberInput.value != '') {
        let newRow = document.createElement('tr');
        let firstCol = document.createElement('td');
        let secondCol = document.createElement('td');
        let thirdCol = document.createElement('td');
        let fourthCol = document.createElement('td');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        firstCol.innerHTML = nameInput.value;
        secondCol.innerHTML = numberInput.value;
        editBtn.className = 'edit-btn';
        deleteBtn.className = 'delete-btn';
        editBtn.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';
        table.appendChild(tableBody);
        tableBody.appendChild(newRow);
        newRow.appendChild(firstCol)
        newRow.appendChild(secondCol)
        newRow.appendChild(thirdCol);
        newRow.appendChild(fourthCol);
        thirdCol.appendChild(editBtn);
        fourthCol.appendChild(deleteBtn);
        nameInput.value = '';
        numberInput.value = '';
        inputMessage.style.visibility = 'visible';
        inputMessage.innerHTML = 'Contact Added Successfully';
        inputMessage.classList.add('message');
        inputMessage.classList.remove('error-message');
    } else {
        inputMessage.style.visibility = 'visible';
        inputMessage.innerHTML = 'Please fill out all required fields';
        inputMessage.classList.remove('message');
        inputMessage.classList.add('error-message');
    }
}

function deleteBook(e) {
    if (e.target && e.target.className == 'delete-btn') {
        // the table row with the 4 td elements
        // console.log(e.target.parentNode.parentNode);
        const td = e.target.parentNode.parentNode;
        if (td) {
            tableBody.removeChild(td);
        }
    }
}

function editBook(e) {
    if (e.target && e.target.className == 'edit-btn') {
        const td = e.target.parentNode.parentNode;
        // console.log(td);
        let editName = td.getElementsByTagName('td')[0];
        let editNumber = td.getElementsByTagName('td')[1];
        nameInput.value = editName.innerHTML;
        // console.log(editName.innerHTML)
        editName.innerHTML = nameInput.value;
        numberInput.value = editNumber.innerHTML;
        console.log(nameInput)
        console.log(nameInput.value)

    }
}

// Event listeners
submitBtn.addEventListener('click', addNumber);

numberInput.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.keyCode == 13) {
        // console.log('you hit enter');
        addNumber();
    }
});

nameInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        // console.log('you hit enter');
        addNumber();
    }
});

table.addEventListener('click', editBook);

table.addEventListener('click', deleteBook);