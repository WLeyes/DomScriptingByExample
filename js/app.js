document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello from app.js');

  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);

  filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for(let i = 0; i <lis.length; i += 1) {
        let li = lis[i];
        if ( li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for(let i = 0; i <lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }
    }
  });

  function createLI(text) {
    function createElement(elementName, property, value){
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    function appendLI(elementName, property, value){
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li  = document.createElement('li');
    appendLI('span', 'textContent', text); 
    appendLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendLI('button', 'textContent', 'edit');
    appendLI('button', 'textContent', 'remove');
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  });

  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if(checked) {
      listItem.className = 'responded'
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      }
      // select and run action in button's name
      nameActions[action]();
    }
  });
});

// todo: validation, confirmation box toggle(target textNodes),
// notes text area, filter: hide confirmed checkbox when filtered, add unconfirmed filter
// local storage save state

// helpful links for todo list

// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
// https://stackoverflow.com/questions/17195868/what-is-a-text-node-its-uses-document-createtextnode/17196184#17196184
// https://developer.mozilla.org/en-US/docs/Web/API/Text

// https://teamtreehouse.com/library/using-local-storage-with-javascript
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage