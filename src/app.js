const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

//This function creates an li element containing the HTML for the RSVP
function createLI (text) {
    //creates li element
    const li = document.createElement('li');
    li.textContent = text;

    //creates the confirmed label
    const label = document.createElement('label');
    label.textContent = 'Confirmed';

    //creates the confirmed checkbox and appends it to the label
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);

    //appends the label to the li
    li.appendChild(label);

    //creates the remove button and appends it to the li
    const button = document.createElement('button');
    button.textContent = 'Remove';
    li.appendChild(button);

    //returns the newly created list
    return li;
}

//This triggers when the form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();         //prevents form from refreshing browser

    const text = input.value;
    input.value = '';
    const li = createLI(text);  //calls the createLI function to create a new RSVP
    ul.appendChild(li);
});

//triggers when the checkbox is changed to update CSS
ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

//Triggers when button is clicked to remove RSVP
ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
    }
});