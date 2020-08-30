document.addEventListener('DOMContentLoaded', () => {
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


    //Filters confirmed invitees when the checkbox is checked by evaluating which invitees have responded
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

        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLI(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }

        //creates span with user's form content and appends it to the li
        appendToLI('span', 'textContent', text);
        //creates the confirmed label and checkbox, appends it to li and returns the label
        appendToLI('label', 'textContent', 'Confirmed')
            .appendChild(createElement('input', 'type', 'checkbox'));
        //creates the edit button and appends it to the li
        appendToLI('button', 'textContent', 'Edit');
        //creates the remove button and appends it to the li
        appendToLI('button', 'textContent', 'Remove');
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
            const action = button.textContent;
            const nameActions = {
                Remove: () =>{ul.removeChild(li);},
                Edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = span.textContent;
    
                    //displays text input to allow user to edit and removes span
                    li.insertBefore(input, span);
                    li.removeChild(span);
    
                    button.textContent = 'Save';
                },
                Save: () => {
                    const span = document.createElement('span');
                    const input = li.firstElementChild;
                    span.textContent = input.value;
    
                    //displays the edited text in the span and hides the text input
                    li.insertBefore(span, input);
                    li.removeChild(input);
    
                    button.textContent = 'Edit'
                }
            };

            //select and run action in button's name
            nameActions[action]();
        }
    });
});
