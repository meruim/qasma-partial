// Populate day options
document.addEventListener("DOMContentLoaded", function () {
  const daySelect = document.querySelectorAll(".date-row select")[1];
  daySelect.innerHTML = '<option value="">Day</option>';
  for (let i = 1; i <= 31; i++) {
    const day = i.toString().padStart(2, "0");
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    if (day === "02") option.selected = true;
    daySelect.appendChild(option);
  }

  // Populate year options
  const yearSelect = document.querySelectorAll(".date-row select")[2];
  yearSelect.innerHTML = '<option value="">Year</option>';
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year === 2003) option.selected = true;
    yearSelect.appendChild(option);
  }
});

// Back button functionality
document.querySelector(".back-arrow").addEventListener("click", function () {
  console.log("Back button clicked");
  window.history.back();
});

// Form validation and submission

//=====================================================
document
  .getElementById("createAccountForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = this.querySelectorAll("[required]");
    let allFilled = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        allFilled = false;
        field.style.borderColor = "#dc3545";
      } else {
        field.style.borderColor = "transparent";
      }
    });

    if (!allFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailField = this.querySelector('input[type="email"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value)) {
      alert("Please enter a valid email address.");
      emailField.focus();
      return;
    }

    // Validate contact number
    const contactField = this.querySelector('input[type="tel"]');
    const phonePattern = /^[\d\s\-\+$$$$]+$/;
    if (!phonePattern.test(contactField.value)) {
      alert("Please enter a valid contact number.");
      contactField.focus();
      return;
    }

    // Success
    if (!document.querySelector("my-loader")) {
      const loader = document.createElement("my-loader");
      document.body.appendChild(loader);
      const toast = document.createElement("my-toast");

      // Remove loader after 3 seconds
      setTimeout(() => {
        loader.remove();

        toast.innerHTML = "Account created. Last Step for verfication...";

        document.body.appendChild(toast);

        // Show the toast
        toast.show();
        setTimeout(() => {
          toast.remove();
          window.location.href = "/student/otp-verification";
        }, 1000);
      }, 500);
    }
  });

//=====================================================

// Terms of Service link
function showTerms() {
  alert("Terms of Service would be displayed here.");
  console.log("Terms of Service clicked");
}

// Real-time validation feedback
document
  .querySelectorAll("input[required], select[required]")
  .forEach((field) => {
    field.addEventListener("blur", function () {
      if (this.value.trim()) {
        this.style.borderColor = "transparent";
      } else {
        this.style.borderColor = "#dc3545";
      }
    });
  });
