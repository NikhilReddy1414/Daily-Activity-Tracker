document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dailyForm");

  // Auto-save on any field change
  form.addEventListener("change", autoSaveFormData);
  form.addEventListener("input", autoSaveFormData);

  // Manual save with confirmation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    autoSaveFormData(); // Optional: force save on submit again
    alert("✅ Your daily entry has been saved!");
  });

  function autoSaveFormData() {
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input?.type === "checkbox") {
        data[key] = input.checked;
      } else {
        data[key] = value;
      }
    });

    form.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
      data[radio.name] = radio.value;
    });

    if (typeof currentTasks !== "undefined") {
      data["todo_list"] = currentTasks;
    }

    const today = new Date().toISOString().slice(0, 10);
    saveDataToLocalStorage(today, data);

    console.log("💾 Auto-saved form data for", today);
  }
});
