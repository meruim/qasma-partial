// DOM Elements
const registrationForm = document.getElementById("registrationForm");
const backBtn = document.getElementById("backBtn");
const createBtn = document.querySelector(".btn-create");
const termsLink = document.getElementById("termsLink");

// Form inputs
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const suffix = document.getElementById("suffix");
const middleInitial = document.getElementById("middleInitial");
const gender = document.getElementById("gender");
const birthMonth = document.getElementById("birthMonth");
const birthDay = document.getElementById("birthDay");
const birthYear = document.getElementById("birthYear");
const address = document.getElementById("address");
const contactNumber = document.getElementById("contactNumber");
const email = document.getElementById("email");
const facebook = document.getElementById("facebook");

// Initialize date dropdowns
function initializeDateDropdowns() {
  // Populate days (1-31)
  birthDay.innerHTML = '<option value="">Day</option>';
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2, "0");
    option.textContent = i.toString().padStart(2, "0");
    if (i === 2) option.selected = true; // Default to 02
    birthDay.appendChild(option);
  }

  // Populate years (1950 to current year)
  const currentYear = new Date().getFullYear();
  birthYear.innerHTML = '<option value="">Year</option>';
  for (let i = currentYear; i >= 1950; i--) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = i.toString();
    if (i === 2003) option.selected = true; // Default to 2003
    birthYear.appendChild(option);
  }

  // Set default month to December
  birthMonth.value = "12";
}

// Form validation
function validateForm() {
  let isValid = true;
  clearErrors();

  // Required fields validation
  const requiredFields = [
    { field: firstName, name: "First Name" },
    { field: lastName, name: "Last Name" },
    { field: gender, name: "Gender" },
    { field: birthMonth, name: "Birth Month" },
    { field: birthDay, name: "Birth Day" },
    { field: birthYear, name: "Birth Year" },
    { field: address, name: "Address" },
    { field: contactNumber, name: "Contact Number" },
    { field: email, name: "Email" },
  ];

  requiredFields.forEach(({ field, name }) => {
    if (!field.value.trim()) {
      showError(field, `${name} is required`);
      isValid = false;
    }
  });

  // Email validation
  if (email.value.trim() && !isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Contact number validation
  if (
    contactNumber.value.trim() &&
    !isValidPhoneNumber(contactNumber.value.trim())
  ) {
    showError(contactNumber, "Please enter a valid contact number");
    isValid = false;
  }

  // Name validation (no numbers)
  if (firstName.value.trim() && /\d/.test(firstName.value.trim())) {
    showError(firstName, "First name should not contain numbers");
    isValid = false;
  }

  if (lastName.value.trim() && /\d/.test(lastName.value.trim())) {
    showError(lastName, "Last name should not contain numbers");
    isValid = false;
  }

  // Date validation
  if (birthMonth.value && birthDay.value && birthYear.value) {
    const birthDate = new Date(
      birthYear.value,
      birthMonth.value - 1,
      birthDay.value
    );
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 13) {
      showError(birthYear, "You must be at least 13 years old");
      isValid = false;
    }
  }

  return isValid;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation
function isValidPhoneNumber(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-$$$$]{10,}$/;
  return phoneRegex.test(phone);
}

// Show error message
function showError(input, message) {
  input.classList.add("error");

  // Remove existing error message
  const existingError = input.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

// Clear all errors
function clearErrors() {
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("error", "success");
    const errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  });
}

// Show success state
function showSuccess(input) {
  input.classList.remove("error");
  input.classList.add("success");
}

// Set loading state
function setLoadingState(isLoading) {
  if (isLoading) {
    createBtn.classList.add("loading");
    createBtn.disabled = true;
    createBtn.textContent = "Creating Account...";
  } else {
    createBtn.classList.remove("loading");
    createBtn.disabled = false;
    createBtn.textContent = "Create";
  }
}

// Simulate registration API call
async function simulateRegistration(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate email already exists
      if (formData.email === "test@example.com") {
        reject({ success: false, message: "Email already exists" });
      } else {
        resolve({ success: true, message: "Account created successfully" });
      }
    }, 2000);
  });
}

// Handle form submission
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Collect form data
  const formData = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    suffix: suffix.value.trim(),
    middleInitial: middleInitial.value.trim(),
    gender: gender.value,
    birthDate: `${birthYear.value}-${birthMonth.value}-${birthDay.value}`,
    address: address.value.trim(),
    contactNumber: contactNumber.value.trim(),
    email: email.value.trim(),
    facebook: facebook.value.trim(),
  };

  setLoadingState(true);

  try {
    const response = await simulateRegistration(formData);

    // Show success states
    document.querySelectorAll(".form-control").forEach((input) => {
      if (input.value.trim()) {
        showSuccess(input);
      }
    });

    setTimeout(() => {
      window.location.href = "/appointments ";
      setLoadingState(false);
    }, 1000);
  } catch (error) {
    setLoadingState(false);
    if (error.message === "Email already exists") {
      showError(email, error.message);
    } else {
      alert("Registration failed. Please try again.");
    }
  }
});

// Back button handler
backBtn.addEventListener("click", () => {
  // In a real app, you would navigate back:
  window.history.back();
});

// Terms link handler
termsLink.addEventListener("click", (e) => {
  e.preventDefault();
  alert(
    "Terms of Service would be displayed here.\n\nThis would typically open:\n- A modal with terms\n- A new page with legal text\n- A PDF document"
  );
});

// Real-time validation
const inputs = [firstName, lastName, email, contactNumber];
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      clearErrors();
    }
  });
});

// Middle initial restriction
middleInitial.addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
});

// Contact number formatting
contactNumber.addEventListener("input", (e) => {
  // Remove non-numeric characters except + and -
  e.target.value = e.target.value.replace(/[^\d\+\-\s$$$$]/g, "");
});

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  console.log("JRMSU Registration System initialized");
  initializeDateDropdowns();
  firstName.focus();
});
