//selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const searchButton = document.querySelector('.todo-search-button');


//Event 
document.addEventListener('DOMContentLoaded',getTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletecheck);
filterOption.addEventListener('click',filterTodo);
searchButton.addEventListener('click',searchTodo);

//Function

function addTodo(event){
    
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodo(todoInput.value);
    
    const completebutton = document.createElement('button');
    completebutton.innerHTML = '<i class="fas fa-check"></i>';
    completebutton.classList.add('complete-btn');
    todoDiv.appendChild(completebutton);

    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add('trash-btn');
    todoDiv.appendChild(trashbutton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";

   
}
 function deletecheck(e){
     const item = e.target;

     if(item.classList[0]=== "trash-btn"){
        const todo = item.parentElement;
        todo.remove();
        removeLocalStorage(todo);

     }

     if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
     }
 }

function filterTodo(e){
    const todos = todoList.childNodes;
    
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
 
                }else{
                todo.style.display = 'none';
                }
                break;
        
            case "uncompleted":
                if(!(todo.classList.contains('completed'))){
                    todo.style.display = 'flex';
    
                }else{
                    todo.style.display = 'none';
                }
            break;
            
     }
     });
    

}

function searchTodo(e1){
    e1.preventDefault();
    const todos = todoList.childNodes;
    const input = todoInput.value;
    todos.forEach(function(todo){
        todovalue = todo.children[0].innerText;
        if(todovalue.includes(input)){
            todo.style.display = 'flex';
        }
        else{
            todo.style.display = 'none';
        }
    });
    
}


function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    
    const completebutton = document.createElement('button');
    completebutton.innerHTML = '<i class="fas fa-check"></i>';
    completebutton.classList.add('complete-btn');
    todoDiv.appendChild(completebutton);

    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add('trash-btn');
    todoDiv.appendChild(trashbutton);

    todoList.appendChild(todoDiv);
    });

}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));

}

