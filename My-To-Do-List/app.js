
document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("new-task");
    const taskText = input.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      input.value = "";
    }
  });

  function addTask(text) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <div>
        <button onclick="toggleComplete(this)">✔️</button>
        <button onclick="removeTask(this)">🗑️</button>
      </div>
    `;
    document.getElementById("task-list").appendChild(li);
    saveTasks();
  }

  function toggleComplete(btn) {
    btn.parentElement.parentElement.classList.toggle("completed");
    saveTasks();
  }
  
  function removeTask(btn) {
    btn.parentElement.parentElement.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(task => {
      addTask(task.text);
      if (task.completed) {
        const lastTask = document.querySelector("#task-list li:last-child");
        lastTask.classList.add("completed");
      }
    });
  }
  
  window.onload = loadTasks;
  