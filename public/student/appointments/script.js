// DOM Elements
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarClose = document.getElementById("sidebarClose");
const mainContent = document.getElementById("mainContent");
const fabBtn = document.getElementById("fabBtn");

// Sidebar Functions
function openSidebar() {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("sidebar-open");
}

// Event Listeners
hamburgerBtn.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close sidebar when clicking on menu items
document.querySelectorAll(".sidebar-menu-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    closeSidebar();

    // Get the menu item text
    const menuText = link.textContent.trim();
    console.log(`Navigating to: ${menuText}`);

    // You can add navigation logic here
    // For example: window.location.href = link.getAttribute('href');
  });
});

// Floating Action Button
fabBtn.addEventListener("click", () => {
  console.log("Creating new appointment");
  // Add new appointment logic here
});

// Show History Button
document.querySelector(".show-history button").addEventListener("click", () => {
  console.log("Showing appointment history");
  // Add history view logic here
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Close sidebar with Escape key
  if (e.key === "Escape" && sidebar.classList.contains("active")) {
    closeSidebar();
  }
});

// Touch/swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 100;
  const swipeDistance = touchEndX - touchStartX;

  // Swipe right to open sidebar (from left edge)
  if (
    swipeDistance > swipeThreshold &&
    touchStartX < 50 &&
    !sidebar.classList.contains("active")
  ) {
    openSidebar();
  }

  // Swipe left to close sidebar
  if (swipeDistance < -swipeThreshold && sidebar.classList.contains("active")) {
    closeSidebar();
  }
}

// Notification button
document.querySelector(".notification").addEventListener("click", () => {
  window.location.href = "/student/notification ";
});

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  console.log("JRMSU-KC QASMA App initialized");

  // You can add initialization logic here
  // For example: load user data, check authentication, etc.
});

// Function to show success notification
function showSuccessNotification() {
  var notification = document.getElementById("notification");
  notification.style.display = "block";

  // Hide the notification after 2 seconds
  setTimeout(function () {
    notification.style.display = "none";
  }, 2000); // 2000ms = 2 seconds
}

// Example usage of the notification when a success action is completed
document.getElementById("fabBtn").addEventListener("click", function () {
  // Simulating a success action
  showSuccessNotification();
});

document
  .getElementById("confirmLogoutBtn")
  .addEventListener("click", function () {
    const logoutModalEl = document.getElementById("logoutModal");
    const modalInstance = bootstrap.Modal.getInstance(logoutModalEl);
    modalInstance.hide();

    const toastElement = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastElement);
    document.querySelector(".toast-body").textContent =
      "Your new message here!";

    toast.show();

    // Wait 1 second, then redirect
    setTimeout(() => {
      toast.hide();
      window.location.href = "/student/login"; // <-- Replace with your redirect path
    }, 1000);
  });

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior

  const logoutModal = new bootstrap.Modal(
    document.getElementById("logoutModal")
  );
  logoutModal.show();
});

document
  .getElementById("qrCodeContainer")
  .addEventListener("click", function () {
    document.getElementById("qrLink").click();
  });

document.querySelectorAll(".btn-reschedule").forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "/student/edit-appointment";
  });
});

document.querySelectorAll(".btn-cancel").forEach(function (button) {
  button.addEventListener("click", function () {
    var appointmentModal = new bootstrap.Modal(
      document.getElementById("deleteAppointmentModal")
    );
    appointmentModal.show();
  });
});

// Trigger the modal when clicking the FAB
document.getElementById("fabBtn").addEventListener("click", function () {
  var appointmentModal = new bootstrap.Modal(
    document.getElementById("appointmentCategoryModal")
  );
  appointmentModal.show();
});

// Event Listener for category options
document
  .getElementById("counselingOption")
  .addEventListener("click", function () {
    window.location.href = "/student/new-appointment";
  });

document.getElementById("testingOption").addEventListener("click", function () {
  window.location.href = "/student/new-appointment";
});
