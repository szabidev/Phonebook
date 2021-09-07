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
let hiddenInput = document.querySelector('#hidden');
// for the edit book function, second click action
let clickCount = 0;
let dynamicRowIndex;


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
        firstCol.className = 'list-name';
        secondCol.className = 'list-number';
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
            inputMessage.style.visibility = 'visible';
            inputMessage.innerHTML = 'Contact Deleted Successfully';
            inputMessage.classList.add('deleted');
            inputMessage.classList.remove('edited');
            inputMessage.classList.remove('message');
            inputMessage.classList.remove('error-message');
        }
    }
}


function editBook(e) {
    if (e.target && e.target.className == 'edit-btn') {
        e.target.innerHTML = 'Save';
        clickCount++;
        const td = e.target.parentNode.parentNode;
        dynamicRowIndex = td.rowIndex;
        console.log(dynamicRowIndex);
        // console.log(td);
        let editName = td.getElementsByTagName('td')[0];
        let editNumber = td.getElementsByTagName('td')[1];
        if (clickCount > 1) {
            // change HTML back to edit
            e.target.innerHTML = 'Edit';
            // set clickCount back to 0
            inputMessage.style.visibility = 'visible';
            inputMessage.innerHTML = 'Contact Edited Successfully';
            inputMessage.classList.add('edited');
            inputMessage.classList.remove('message');
            inputMessage.classList.remove('error-message');
            clickCount = 0;
        }
        // save the values from the input in the same table row
        let tmp = nameInput.value;
        // console.log(tmp, nameInput.value);
        nameInput.value = editName.innerHTML;
        // console.log(nameInput.value, editName.innerHtml);
        editName.innerHTML = tmp;
        // console.log(editName.innerHTML, tmp);
        let tmp2 = numberInput.value;
        numberInput.value = editNumber.innerHTML;
        editNumber.innerHTML = tmp2;
        // console.log(td.rowIndex)
        hiddenInput.value = dynamicRowIndex;
        // console.log(hiddenInput.value)
    }
};

const enterEditing = (e) => {
    if (e.keyCode == 13) {
        if (hiddenInput.value != '') {
            let dynamicRow = document.getElementsByTagName('tr')[dynamicRowIndex];
            let firstElem = dynamicRow.childNodes[0];
            let secondElem = dynamicRow.childNodes[1];
            let thirdElem = dynamicRow.childNodes[2];
            // console.log(firstElem);
            // console.log(secondElem);
            firstElem.innerHTML = nameInput.value;
            secondElem.innerHTML = numberInput.value;
            numberInput.value = '';
            nameInput.value = '';
            hiddenInput.value = '';
            thirdElem.childNodes[0].innerHTML = 'Edit';
            // console.log(hiddenInput.innerHTML);
            inputMessage.style.visibility = 'visible';
            inputMessage.innerHTML = 'Contact Edited Successfully';
            inputMessage.classList.add('edited');
            inputMessage.classList.remove('message');
            inputMessage.classList.remove('error-message');
            clickCount = 0;
        } else {
            addNumber();
        }
    }
}

// Event listeners
submitBtn.addEventListener('click', addNumber);
table.addEventListener('click', editBook);
table.addEventListener('click', deleteBook);
nameInput.addEventListener('keydown', enterEditing);
numberInput.addEventListener('keydown', enterEditing);