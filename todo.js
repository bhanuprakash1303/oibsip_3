//Local variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


// Load all event listners
LoadEventListners();

function LoadEventListners() {
    document.addEventListener('DOMContentLoaded', loadTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', remove);
    clrBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        // create a li element and add it to ul
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-remove"> </i> ';
        li.appendChild(a);
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add task!')
    }
    // create a li element and add it to ul
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const a = document.createElement('a');
    a.className = 'delete-item secondary-content';
    a.innerHTML = '<i class="fa fa-remove"> </i> ';
    li.appendChild(a);
    taskList.appendChild(li);
    // add tasks to localstorage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
};

function storeTaskInLocalStorage(taskValue) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function remove(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Do you want to Delete?')) {
            e.target.parentElement.parentElement.remove();
            //Remove From localStorage as well
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
};

function removeFromLS(liTask) {
    console.log(liTask.textContent);
    let alltasks;
    if (localStorage.getItem('tasks') === null) {
        alltasks = [];
    } else {
        alltasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let taskArray = Array.from(alltasks);

    alltasks.forEach(function(ts, index) {
        console.log(ts);
        if (liTask.textContent === ts) {
            console.log('matched!');
            alltasks.splice(index, 1);
        }
    });
    console.log(alltasks);
    localStorage.setItem('tasks', JSON.stringify(alltasks));
}

function clearTasks(e) {
    const tasks = Array.from(taskList.children);
    tasks.forEach(function(task) {
        task.remove();
    });
    localStorage.removeItem('tasks');
}

function filterTasks(e) {
    const inputTxt = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(inputTxt) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}