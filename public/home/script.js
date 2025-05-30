function selectRole(role) {
  // Add loading state
  const clickedButton = event.target;
  const originalText = clickedButton.innerHTML;

  clickedButton.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
  clickedButton.disabled = true;

  // Simulate navigation delay
  setTimeout(() => {
    switch (role) {
      case "student":
        window.location.href = "/student/login";
        break;
      case "staff":
        window.location.href = "/staff/login";
        break;
      case "counselor":
        alert("Redirecting to Counselor Login...");
        // window.location.href = '/counselor-login';
        break;
    }

    // Reset button state
    clickedButton.innerHTML = originalText;
    clickedButton.disabled = false;
  }, 1500);
}

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  const buttons = document.querySelectorAll(".role-btn");
  const currentFocus = document.activeElement;
  const currentIndex = Array.from(buttons).indexOf(currentFocus);

  if (e.key === "ArrowDown" && currentIndex < buttons.length - 1) {
    e.preventDefault();
    buttons[currentIndex + 1].focus();
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    e.preventDefault();
    buttons[currentIndex - 1].focus();
  } else if (e.key === "Enter" && currentFocus.classList.contains("role-btn")) {
    currentFocus.click();
  }
});

// Auto-focus first button for accessibility
window.addEventListener("load", function () {
  document.querySelector(".role-btn").focus();
});
