// Sidebar functionality
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

menuToggle.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Tab switching
function switchTab(tab) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => t.classList.remove("active"));

  if (tab === "current") {
    tabs[0].classList.add("active");
  } else {
    tabs[1].classList.add("active");
  }
}

// Countdown timer
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  let time = countdownElement.textContent.split(":");
  let minutes = parseInt(time[1]);
  let seconds = parseInt(time[2]);

  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  }

  countdownElement.textContent = `00:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// MISSING MODAL FUNCTIONS - ADD THESE:
function showModal() {
  document.getElementById("modalOverlay").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideModal() {
  document.getElementById("modalOverlay").style.display = "none";
  document.body.style.overflow = "auto";
}

function handleReschedule() {
  const selectedTime = document.querySelector(".datetime-select").value;
  const reason = document.querySelector(".reason-textarea").value;

  if (!reason.trim()) {
    alert("Please provide a reason for rescheduling.");
    return;
  }

  // Show success toast
  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);
  document.querySelector(".toast-body").textContent =
    "Appointment rescheduled successfully!";
  toast.show();

  hideModal();

  // Reset form
  document.querySelector(".reason-textarea").value = "";
}

function showDeleteModal() {
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteAppointmentModal")
  );
  deleteModal.show();
}

// Close modal when clicking outside
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) {
    hideModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-cancel")) {
      const modalEl = document.getElementById("deleteAppointmentModal");

      // Reset modal content for cancel
      const modalBody = modalEl.querySelector(".modal-body");
      modalBody.innerHTML = `
            <h6>Are you sure you want to cancel this appointment?</h6>
            <p>This action cannot be undone.</p>
          `;

      // Unbind previous onclick (if any)
      const yesBtn = document.getElementById("modalYes");
      const newYesBtn = yesBtn.cloneNode(true);
      yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

      newYesBtn.addEventListener("click", function () {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance.hide();

        const toastElement = document.getElementById("successToast");
        const toast = new bootstrap.Toast(toastElement);
        document.querySelector(".toast-body").textContent =
          "Appointment cancelled successfully!";
        toast.show();

        setTimeout(() => {
          toast.hide();
        }, 1000);
      });

      const appointmentModal = new bootstrap.Modal(modalEl);
      appointmentModal.show();
    }
  });
});

// Button functionality for verify
document.querySelector(".verify-btn").addEventListener("click", function () {
  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);
  document.querySelector(".toast-body").textContent =
    "Appointment verified successfully!";
  toast.show();
});

document.getElementById("modalYes").addEventListener("click", function () {
  const logoutModalEl = document.getElementById("deleteAppointmentModal");
  const modalInstance = bootstrap.Modal.getInstance(logoutModalEl);
  modalInstance.hide();

  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);
  document.querySelector(".toast-body").textContent =
    "Appointment cancelled successfully!";

  toast.show();

  // Wait 1 second, then redirect
  setTimeout(() => {
    toast.hide();
  }, 1000);
});

document.querySelector(".logout-link").addEventListener("click", function (e) {
  // Update modal content for logout
  document.querySelector("#deleteAppointmentModalLabel")?.remove(); // remove label if exists
  document.querySelector("#deleteAppointmentModal .modal-body h6").textContent =
    "Are you sure you want to log out?";
  document.querySelector("#deleteAppointmentModal .modal-body p").textContent =
    "You will be logged out of your account.";

  // Change Yes button behavior (you can replace this with your logout logic)
  const yesBtn = document.getElementById("modalYes");
  yesBtn.onclick = function () {
    const toastElement = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastElement);
    document.querySelector(".toast-body").textContent =
      "Logout successfully...";

    toast.show();

    // Wait 1 second, then redirect
    setTimeout(() => {
      toast.hide();
      window.location.href = "/counselor/login";
    }, 1000);
  };

  // Show modal
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteAppointmentModal")
  );
  deleteModal.show();
});

document
  .querySelector(".notification-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "/counselor/notification";
  });

document
  .querySelector(".dashboard-link")
  .addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "/counselor/dashboard";
  });
