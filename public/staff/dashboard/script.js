function goBack() {
  window.history.back();
}

function editTitle() {
  const titleButton = document.getElementById("titleButton");
  const titleInput = document.getElementById("titleInput");

  // Hide button, show input
  titleButton.style.display = "none";
  titleInput.style.display = "block";
  titleInput.focus();
  titleInput.select();
}

function saveTitle() {
  const titleButton = document.getElementById("titleButton");
  const titleInput = document.getElementById("titleInput");

  // Update button text with new value
  titleButton.textContent = titleInput.value || "Dashboard";

  // Show button, hide input
  titleButton.style.display = "block";
  titleInput.style.display = "none";

  // Optional: Save to localStorage or send to server
  localStorage.setItem("dashboardTitle", titleInput.value);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    saveTitle();
  } else if (event.key === "Escape") {
    // Cancel editing
    const titleButton = document.getElementById("titleButton");
    const titleInput = document.getElementById("titleInput");

    titleInput.value = titleButton.textContent;
    titleButton.style.display = "block";
    titleInput.style.display = "none";
  }
}

// Load saved title on page load
window.addEventListener("load", function () {
  const savedTitle = localStorage.getItem("dashboardTitle");
  if (savedTitle) {
    document.getElementById("titleButton").textContent = savedTitle;
    document.getElementById("titleInput").value = savedTitle;
  }
});
