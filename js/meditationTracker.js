function updateMeditationStatus(checkbox, statusId) {
  const statusElement = document.getElementById(statusId);
  statusElement.textContent = checkbox.checked ? "✅" : "❌";
}
