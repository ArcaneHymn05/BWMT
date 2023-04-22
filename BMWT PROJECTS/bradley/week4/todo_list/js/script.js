// Empty script file to start with

//After the user has entered a list description, 
//the user will click on the Add task button
//that list description should be added to the list as a list item, and should be preceded by a checkbox

//Step 1 -- Grab an element from the DOM and assign it to a variable

let addbutton = document.getElementById('add-task');
let newTaskInput = document.getElementById('task-input');
let todoListContainer = document.getElementById('todo-list');
let templateElement = document.getElementById('list-item-template');
let template = templateElement.innerHTML;

//Step 2 -- Write a function to handle the event

function onAddTaskClicked(event){

    //Retrieve value of the task input and assign to a variable
    let taskName = newTaskInput.value;
    newTaskInput.value = "";

    //update the taskname in the template for the li text/placeholder
    if(taskName !=""){
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        
        //append the taskHTML to my ul
        todoListContainer.insertAdjacentHTML('afterbegin',taskHTML);
        saveTask(taskName, false);
    }
}

function onTodoListContainerClicked(event){

    let targetElement = event.target;
    while(!targetElement.classList.contains("task")){
        targetElement = targetElement.parentElement;
    }

    let checkbox = targetElement.querySelector(".checkbox");
    if (checkbox.checked){
        //task should be striked through
        targetElement.classList.add("completed")
    } else {
        //checkbox should be normal
        targetElement.classList.remove("completed")
    }

    let taskNameElement = targetElement.querySelector(".task-name")
    let taskName = taskNameElement.innerText;
    saveTask(taskName, checkbox.checked);
}

let showActiveButton = document.getElementById("show-active")
function showActiveTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "none";
        }
        else{
            tasks[i].style.display = "block";
        }
    }
}

let showCompletedButton = document.getElementById("show-completed")
function showCompletedTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "block";
        }
        else{
            tasks[i].style.display = "none";
        }
    }
}

let showAllButton = document.getElementById("show-all")
function showAllTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "block";
        }
        else{
            tasks[i].style.display = "block";
        }
    }
}

//Save task to local storage
function saveTask(name, isCompleted){
    localStorage.setItem(name, isCompleted)
}

//function to read from localstorage and render
function renderTasks(){
    for(let i=0; i<localStorage.length; i++){
        let taskName = localStorage.key(i);
        let isCompleted = localStorage.getItem(taskName) == "true";

        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if (!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin',taskHTML);
        }
    }
}


//Step 3 -- Connect the variable and function via the event listener, so that an 'event' triggers the update of the DOM

addbutton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodoListContainerClicked);

showActiveButton.addEventListener('click', showActiveTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);
showAllButton.addEventListener('click',showAllTasks);

renderTasks();