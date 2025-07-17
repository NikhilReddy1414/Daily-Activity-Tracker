document.getElementById("dailyForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};

  formData.forEach((value, key) => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input?.type === "checkbox") {
      data[key] = input.checked;
    } else {
      data[key] = value;
    }
  });

  document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
    data[radio.name] = radio.value;
  });

  data["todo_list"] = currentTasks;

  const today = new Date().toISOString().slice(0, 10);
  saveDataToLocalStorage(today, data);
  alert("✅ Your daily entry has been saved!");
});
