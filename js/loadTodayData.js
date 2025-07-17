function loadTodayData() {
    const today = new Date().toISOString().slice(0, 10);
    let storage = {};
    
    try {
    storage = JSON.parse(localStorage.getItem("daily_tracker") || "{}");
    } catch (e) {
    console.error("Error parsing localStorage:", e);
    return;
    }
    
    const todayData = storage[today];

    if (todayData) {
    console.log("Loading today's data:", todayData);
    
    // Populate form fields
    Object.keys(todayData).forEach(key => {
        if (key !== "todo_list") {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === "checkbox") {
            input.checked = todayData[key];
            // Update meditation status indicators
            if (key === "meditate_morning") {
                updateMeditationStatus(input, 'morning_status');
            } else if (key === "meditate_evening") {
                updateMeditationStatus(input, 'evening_status');
            }
            } else if (input.type === "radio") {
            const radio = document.querySelector(`input[name="${key}"][value="${todayData[key]}"]`);
            if (radio) radio.checked = true;
            } else {
            input.value = todayData[key];
            }
        }
        }
    });

    // Populate todo list
    if (todayData.todo_list && Array.isArray(todayData.todo_list)) {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = ""; // Clear existing items
        currentTasks = [...todayData.todo_list]; // Copy to current tasks
        
        todayData.todo_list.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center">
            <label><input type="checkbox" /> ${task}</label>
            <div class="task-actions">
                <button type="button" onclick="editTask(this)" style="padding: 4px 8px; margin-right: 4px;">✏️</button>
                <button type="button" onclick="deleteTask(this)" style="padding: 4px 8px;">🗑️</button>
            </div>
            </div>`;
        todoList.appendChild(li);
        });
    }
    }
}