const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);


filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;

    if (isChecked) {
        for ( let i = 0; i < lis.length; i++ ) {
            let li = lis[i];
            if ( li.className === 'responded' ) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for ( let i = 0; i < lis.length; i++ ) {
            let li = lis[i];
            li.style.display = '';
        }
    }
});

//This function creates an li element containing the HTML for the RSVP
function createLI (text) {
    //creates li element
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    //creates the confirmed label
    const label = document.createElement('label');
    label.textContent = 'Confirmed';

    //creates the confirmed checkbox and appends it to the label
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);

    //appends the label to the li
    li.appendChild(label);

    //creates the edit button and appends it to the li
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    li.appendChild(editButton);

    //creates the remove button and appends it to the li
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    li.appendChild(removeButton);

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
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;

        //checks which button is clicked
        if (button.textContent === 'Remove') {
            ul.removeChild(li);
        } else if (button.textContent === 'Edit'){
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;

            //displays text input to allow user to edit and removes span
            li.insertBefore(input, span);
            li.removeChild(span);

            button.textContent = 'Save';
        } else if (button.textContent === 'Save') {
            const span = document.createElement('span');
            const input = li.firstElementChild;
            span.textContent = input.value;

            //displays the edited text in the span and hides the text input
            li.insertBefore(span, input);
            li.removeChild(input);

            button.textContent = 'Edit'
        }
    }
});

