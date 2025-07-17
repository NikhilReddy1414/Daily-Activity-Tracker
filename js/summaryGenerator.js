function generateDailySummary() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateKey = yesterday.toISOString().slice(0, 10);
  const data = loadDataFromLocalStorage(dateKey);

  const container = document.getElementById("summaryContent");
  if (!data) {
    container.innerHTML = "<i>No data from yesterday.</i>";
    return;
  }

  const missed = [];
  const badHabits = [];
  const wins = [];
  const todos = data["todo_list"] || [];

  if (!data["meditate_morning"]) missed.push("Morning Meditation");
  if (!data["meditate_evening"]) missed.push("Evening Meditation");
  if (data["ate_sugar"]) badHabits.push("Ate Sugar");
  if (data["ate_junk"]) badHabits.push("Ate Junk Food");
  if (data["goals_accomplished"] === "no") badHabits.push("Missed Goals");

  if (data["bad_things_today"]) {
    badHabits.push(...data["bad_things_today"].split("\n").filter(t => t.trim()));
  }

  if (data["good_things_today"]) {
    wins.push(...data["good_things_today"].split("\n").filter(t => t.trim()));
  }

  let html = "";
  if (missed.length) html += `<p>❌ <b>Missed:</b> ${missed.join(', ')}</p>`;
  if (todos.length) html += `<p>📋 <b>To-Do Today:</b><ul>${todos.map(t => `<li>${t}</li>`).join("")}</ul></p>`;
  if (badHabits.length) html += `<p>⚠️ <b>Areas to Improve:</b><ul>${badHabits.map(t => `<li>${t}</li>`).join("")}</ul></p>`;
  if (wins.length) html += `<p>✅ <b>Wins:</b><ul>${wins.map(t => `<li>${t}</li>`).join("")}</ul></p>`;

  container.innerHTML = html || "<i>No key takeaways from yesterday.</i>";
}
