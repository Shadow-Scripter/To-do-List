document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus(); // Set focus back to input after adding task
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
    
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.classList.add('task-content');
        taskItem.appendChild(taskContent);
    
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('task-date');
        taskItem.appendChild(dateInput);
    
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-btn'; // Adding a class for styling
        completeButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent task item from being toggled when complete button is clicked
            taskItem.classList.toggle('completed');
            taskItem.classList.toggle('completed-green'); // Add or remove a class to change color to green
        });
        
    
        const editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.classList.add('edit-btn');
        editButton.className = 'edit-btn'; // Adding a class for styling
        // Event listener for editing task
        editButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent task item from being toggled when edit button is clicked
            const taskContent = taskItem.querySelector('.task-content');
            const newTaskText = prompt('Edit task:', taskContent.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskContent.textContent = newTaskText.trim();
            }
        });
        taskItem.appendChild(editButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        // Event listener for deleting task
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent task item from being toggled when delete button is clicked
            taskItem.remove();
        });
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    
        updateCompleteButton();
    
        function updateCompleteButton() {
            if (taskItem.classList.contains('completed')) {
                completeButton.textContent = 'Mark Incomplete';
            } else {
                completeButton.textContent = 'Complete';
            }
        }
    }
    

    function sortTasksByDate() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const dateA = new Date(a.querySelector('.task-date').value);
            const dateB = new Date(b.querySelector('.task-date').value);
            return dateA - dateB;
        });
        taskList.innerHTML = ''; // Clear the current task list
        tasks.forEach(task => taskList.appendChild(task)); // Append sorted tasks
    }
    

    // Restore tasks from localStorage on page load
    document.addEventListener('DOMContentLoaded', function() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(taskText => addTask(taskText));
        }
    });

    // Handle marking tasks as complete/incomplete
    taskList.addEventListener('click', function(event) {
        const clickedItem = event.target.closest('.task-item');
        if (clickedItem) {
            clickedItem.classList.toggle('completed');
        }
    });

    // Smoothly scroll to bottom when adding a new task
    function scrollToBottom() {
        taskList.scrollTop = taskList.scrollHeight;
    }

    taskList.addEventListener('DOMNodeInserted', scrollToBottom);

    // Input box appears with cursor by default and after adding or deleting a task
    taskInput.focus();

    // Scroll the screen when there are too many tasks
    taskList.style.maxHeight = '200px'; 
    taskList.style.overflowY = 'auto';

});
