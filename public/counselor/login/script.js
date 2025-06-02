document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const studentIdInput = document.getElementById("studentId");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.querySelector(".login-btn");
  const loginText = document.querySelector(".login-text");
  const loadingSpinner = document.querySelector(".loading");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const roleSelection = document.getElementById("roleSelection");
  const createAccountBtn = document.getElementById("createAccountBtn");

  // Login form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = studentIdInput.value.trim();
    const password = passwordInput.value.trim();

    if (!studentId || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Show loading state
    loginText.style.display = "none";
    loadingSpinner.classList.add("show");
    loginBtn.disabled = true;
    const toastElement = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Simulate login process
    setTimeout(() => {
      // Reset button state
      loginText.style.display = "inline";
      loadingSpinner.classList.remove("show");
      loginBtn.disabled = false;
      toast.hide();
      window.location.href = "/counselor/appointments";
    }, 2000);
  });

  // Forgot password link
  forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Forgot Password not implemented!");
  });

  roleSelection.addEventListener("click", function (e) {
    e.preventDefault();
    if (!document.querySelector("my-loader")) {
      const loader = document.createElement("my-loader");
      document.body.appendChild(loader);
      setTimeout(() => {
        loader.remove();
        window.location.href = "/";
      }, 500);
    }
  });

  // Create account button
  createAccountBtn.addEventListener("click", function () {
    window.location.href = "/student/get-started";
  });

  // Input validation and formatting
  studentIdInput.addEventListener("input", function () {
    // Remove any non-alphanumeric characters for student ID
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, "");
  });

  // Add focus effects
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#32A616";
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.style.borderColor = "#b8b8b8";
      }
    });
  });

  // Keyboard navigation
  studentIdInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      loginForm.dispatchEvent(new Event("submit"));
    }
  });
});
