function saveDataToLocalStorage(dateKey, data) {
  let existingData = {};
  try {
    existingData = JSON.parse(localStorage.getItem("daily_tracker") || "{}");
  } catch (e) {
    console.error("Storage parse error:", e);
  }
  existingData[dateKey] = data;
  localStorage.setItem("daily_tracker", JSON.stringify(existingData));
}

function loadDataFromLocalStorage(dateKey) {
  try {
    const data = JSON.parse(localStorage.getItem("daily_tracker") || "{}");
    return data[dateKey] || null;
  } catch (e) {
    console.error("Storage parse error:", e);
    return null;
  }
}
