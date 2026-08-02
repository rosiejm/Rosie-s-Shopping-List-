const storageKey = "rosies-kitchen-week-2";
const notesKey = "rosies-kitchen-notes";
const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const notes = document.getElementById("notes");

function loadState() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

  checkboxes.forEach(box => {
    box.checked = Boolean(saved[box.dataset.id]);
    box.closest(".item").classList.toggle("done", box.checked);
  });

  notes.value = localStorage.getItem(notesKey) || "";
  updateProgress();
}

function saveState() {
  const state = {};

  checkboxes.forEach(box => {
    state[box.dataset.id] = box.checked;
    box.closest(".item").classList.toggle("done", box.checked);
  });

  localStorage.setItem(storageKey, JSON.stringify(state));
  updateProgress();
}

function updateProgress() {
  const total = checkboxes.length;
  const checked = checkboxes.filter(box => box.checked).length;
  const percent = total ? Math.round((checked / total) * 100) : 0;

  progressText.textContent = `${checked} of ${total} items ticked`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

checkboxes.forEach(box => {
  box.addEventListener("change", saveState);
});

notes.addEventListener("input", () => {
  localStorage.setItem(notesKey, notes.value);
});

document.getElementById("clearTicked").addEventListener("click", () => {
  checkboxes.filter(box => box.checked).forEach(box => {
    box.checked = false;
  });
  saveState();
});

document.getElementById("resetAll").addEventListener("click", () => {
  if (confirm("Reset the full shopping list and notes?")) {
    checkboxes.forEach(box => box.checked = false);
    notes.value = "";
    localStorage.removeItem(storageKey);
    localStorage.removeItem(notesKey);
    saveState();
  }
});

loadState();
