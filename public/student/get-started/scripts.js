// Back button functionality
document.querySelector(".back-arrow").addEventListener("click", function () {
  console.log("Back button clicked");
  window.history.back();
});

// Form validation and submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1]
      .value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Check if all required fields are filled
    const requiredFields = this.querySelectorAll("[required]");
    let allFilled = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        allFilled = false;
      }
    });

    if (!allFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    // Success
    alert("Registration successful!");
    window.location.href = "/create-account";
  });

// Login link functionality
function goToLogin() {
  console.log("Redirecting to login page");
  window.location.href = "/login";
}

// Real-time password confirmation validation
const passwordInputs = document.querySelectorAll('input[type="password"]');
const helpText = document.querySelector(".help-text");

passwordInputs[1].addEventListener("input", function () {
  const password = passwordInputs[0].value;
  const confirmPassword = this.value;

  if (confirmPassword && password !== confirmPassword) {
    helpText.style.color = "#dc3545";
    helpText.textContent = "Passwords do not match";
  } else {
    helpText.style.color = "#666";
    helpText.textContent = "Confirm password must be same with password";
  }
});
