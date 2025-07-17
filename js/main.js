window.onload = function () {
  console.log("App initializing...");
  generateDailySummary();
  loadTodayData(); // reuse your `loadTodayData` function in here or modularize it
};
