const addtask = document.getElementById("addtask");
const tb = document.getElementById("tb");
const Tasklist = document.getElementById("Tasklist");
const count = document.getElementById("count");

let tasks = [];

tb.addEventListener("click", function () {
    let text = addtask.value.trim();
    if (text === "") {
        alert("You have entered an empty task!!")
        return;
        }

    tasks.push({ text: text, completed: false });
    addtask.value = "";
    showTasks();
});

function showTasks() {
    Tasklist.innerHTML = "";

    for (let i=0;i<tasks.length;i++) {
        let task=tasks[i];

        let li=document.createElement("li");

        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=task.completed;

        let span=document.createElement("span");
        span.textContent=task.text;

        checkbox.addEventListener("change", function () {
            task.completed=checkbox.checked;
            span.style.textDecoration=task.completed ? "line-through" : "none";
            li.style.backgroundColor=task.completed ? "#b6f2b6" : "";
            updateCounts();
        });

        if (task.completed) {
            span.style.textDecoration="line-through";
            li.style.backgroundColor="#b6f2b6";
        }

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.addEventListener("click", function () {
            let index = tasks.indexOf(task);
            tasks.splice(index, 1);
            showTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        Tasklist.appendChild(li);
    }

    updateCounts();
}

function updateCounts() {
    let completedCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completedCount++;
        }
    }

    count.textContent = "Total Tasks: " + tasks.length +
        " | Completed Tasks: " + completedCount +
        " | Remaining Tasks: " + (tasks.length - completedCount);
}