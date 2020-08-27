/**
 *  HELPER FUNCTIONS
 */

const addNewItem = () => {
    // Add new Item to the list
    let todo = document.querySelector('input').value;
    todo = todo.split('').map((el,index) => index === 0 ? el.toUpperCase() : el ).join('');
        
    id = id + 1;

    let newItem = {
        id,
        content: todo
    }
    items.push(newItem);

    renderItem(newItem.id,newItem.content);

    // Clear the input field
    document.querySelector('input').value = '';
    document.querySelector('input').focus();
}

const renderItem = (id,todo) => {
    const markup = `
        <div class="item clearfix" data-id="${id}">
            <div class="content">${todo}</div>
            <div class="deleteButton"><i class="icon-cancel-circled-outline"></i></div>
        </div>
    `;
    document.querySelector('.main .container').insertAdjacentHTML('beforeend',markup);
};



/**
 *  INIT
 */

let items = [];
let id;

if (window.localStorage.getItem('localItems')) {
    id = parseInt(window.localStorage.getItem('actualID'));
    items = JSON.parse(window.localStorage.getItem('localItems'));
    
    // Render local items
    items.forEach(el => {
        renderItem(el.id, el.content);
    });

} else {
    id = -1;
}


/**
 *  ADD NEWS ITEMS
 */

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 && document.querySelector('input').value !== '') {
        addNewItem();
        
        // Save changes to localStorage
        window.localStorage.setItem('localItems',JSON.stringify(items));
        window.localStorage.setItem('actualID',id.toString());
    }
});

document.querySelector('.add').addEventListener('click', () => {
    if (document.querySelector('input').value !== '') {
        addNewItem();    
        
        // Save changes to localStorage
        window.localStorage.setItem('localItems',JSON.stringify(items));
        window.localStorage.setItem('actualID',id.toString());
    }
});



/**
 *  DELETE ITEMS
 */

document.querySelector('.main .container').addEventListener('click',(e) => {
    if (e.target.matches('.deleteButton, .deleteButton *')) {
        let tobeDeleted = e.target.closest('.item');
        let index = items.findIndex(el => el.id === tobeDeleted.dataset.id);
        items.splice(index,1);
        tobeDeleted.parentNode.removeChild(tobeDeleted);

        // Save changes to localStorage
        window.localStorage.setItem('localItems',JSON.stringify(items));
        if(items.length === 0) {
            window.localStorage.clear();
            id = -1;
        }
    }
});

document.querySelector('.deleteAll').addEventListener('click', () => {
    if (items.length !== 0) {
        document.querySelector('.main .container').innerHTML = '';
        localStorage.clear();
        id = -1;
        items = [];
    }
});



