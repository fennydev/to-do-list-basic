document.addEventListener("DOMContentLoaded", loadTasks); // Load tasks on page load

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let categorySelect = document.getElementById("categorySelect");
    let dueDateInput = document.getElementById("dueDate");

    let taskText = taskInput.value.trim();
    let category = categorySelect.value;
    let dueDate = dueDateInput.value; // Store the due date

    if (taskText === "") return;

    let task = { text: taskText, category: category, dueDate: dueDate, completed: false };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTasks();
    taskInput.value = "";
    dueDateInput.value = "";
}

function removeTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1); // Remove task from array
    saveTasks(tasks);
    renderTasks();
}

function toggleComplete(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    getTasks().forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text} <small>(${task.category})</small>
                ${task.dueDate ? `<br><small>Due: ${task.dueDate}</small>` : ""}
            </span>
            <button onclick="removeTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}



function loadTasks() {
    renderTasks(); // Load tasks on refresh
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

function checkDueDates() {
    let tasks = getTasks();
    let today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    tasks.forEach((task) => {
        if (task.dueDate === today && !task.completed) {
            alert(`Reminder: "${task.text}" is due today!`);
        }
    });
}

setInterval(checkDueDates, 60000); // Check every 1 minute
