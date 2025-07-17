let currentTasks = [];

function addTask() {
  const input = document.getElementById("newTask");
  const taskText = input.value.trim();
  if (!taskText) return;

  currentTasks.push(taskText);
  renderTask(taskText);
  input.value = '';
}

function renderTask(taskText) {
  const list = document.getElementById("todoList");
  const li = document.createElement("li");
  li.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <label><input type="checkbox" /> ${taskText}</label>
      <div class="task-actions">
        <button type="button" onclick="editTask(this)">✏️</button>
        <button type="button" onclick="deleteTask(this)">🗑️</button>
      </div>
    </div>`;
  list.appendChild(li);
}

function deleteTask(button) {
  const li = button.closest("li");
  const taskText = li.querySelector("label").textContent.trim();
  li.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; background: #ffe6e6; padding: 5px;">
      <span>Delete this task?</span>
      <div>
        <button onclick="confirmDelete(this)">Yes</button>
        <button onclick="cancelDelete(this, '${taskText.replace(/'/g, "\\'")}')">No</button>
      </div>
    </div>`;
}

function confirmDelete(button) {
  const li = button.closest("li");
  const taskText = li.querySelector("span").textContent.replace("Delete this task?", "").trim();
  currentTasks = currentTasks.filter(task => task !== taskText);
  li.remove();
}

function cancelDelete(button, taskText) {
  const li = button.closest("li");
  li.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <label><input type="checkbox" /> ${taskText}</label>
      <div class="task-actions">
        <button type="button" onclick="editTask(this)">✏️</button>
        <button type="button" onclick="deleteTask(this)">🗑️</button>
      </div>
    </div>`;
}

function editTask(button) {
  const li = button.closest("li");
  const label = li.querySelector("label");
  const currentText = label.textContent.trim();

  li.innerHTML = `
    <div style="display: flex; gap: 10px; align-items: center; background: #f0f0f0; padding: 5px;">
      <input type="text" value="${currentText}" />
      <div>
        <button onclick="saveEdit(this)">Save</button>
        <button onclick="cancelEdit(this, '${currentText.replace(/'/g, "\\'")}')">Cancel</button>
      </div>
    </div>`;
}

function saveEdit(button) {
  const li = button.closest("li");
  const input = li.querySelector("input[type='text']");
  const newText = input.value.trim();
  const oldText = input.getAttribute("value");

  if (newText !== "") {
    const index = currentTasks.indexOf(oldText);
    if (index !== -1) currentTasks[index] = newText;
    renderEditedTask(li, newText);
  }
}

function renderEditedTask(li, text) {
  li.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <label><input type="checkbox" /> ${text}</label>
      <div class="task-actions">
        <button type="button" onclick="editTask(this)">✏️</button>
        <button type="button" onclick="deleteTask(this)">🗑️</button>
      </div>
    </div>`;
}

function cancelEdit(button, taskText) {
  const li = button.closest("li");
  renderEditedTask(li, taskText);
}
