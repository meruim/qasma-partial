function handleReschedule() {
  const selectedTime = document.querySelector(".datetime-select").value;
  const reason = document.querySelector(".reason-textarea").value;

  if (!reason.trim()) {
    alert("Please provide a reason for rescheduling.");
    return;
  }

  alert(`Appointment rescheduled to: ${selectedTime}\nReason: ${reason}`);
  hideModal();
}

//HANDLE MODAL

function showModal() {
  document.getElementById("modalOverlay").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideModal() {
  document.getElementById("modalOverlay").style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) {
    hideModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
  }
});

// Sidebar toggle functionality
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

// Status tabs functionality
const statusTabs = document.querySelectorAll(".status-tab");
const appointmentCard = document.querySelector(".appointment-card");

statusTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    statusTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    const status = this.textContent.trim().toLowerCase();
    updateAppointmentContent(status);
  });
});

function updateAppointmentContent(status) {
  let badge = "";
  let appointmentHTML = "";

  if (status === "pending") {
    badge = '<span class="pending-badge">PENDING</span>';
    appointmentHTML = `
  <div class="appointment-header">
    <div class="appointment-date">
      December 25, 2024<br />10:30 am
    </div>
    ${badge}
  </div>

  <div class="appointment-details">
    <h6>Appointment Category: Counselling</h6>
    <p>Counselling session for student mental health support</p>
    <p><strong>Appointment Type:</strong> Personal Life</p>
    <p><strong>Name:</strong> Gemma Tuliogan Gwapa</p>
  </div>

  <div class="action-buttons">
    <button class="btn-accept">Accept</button>
    <button class="btn-reschedule">Reschedule</button>
    <button class="btn-cancel">Cancel</button>
  </div>
`;
  } else if (status === "approved") {
    badge =
      '<span class="approved-badge" style="color: green;">APPROVED</span>';
    appointmentHTML = `
  <div class="appointment-header">
    <div class="appointment-date">
      December 20, 2024<br />9:00 am
    </div>
    ${badge}
  </div>

  <div class="appointment-details">
    <h6>Appointment Category: Academic</h6>
    <p>Consultation for academic progress and planning</p>
    <p><strong>Appointment Type:</strong> Academic Advising</p>
    <p><strong>Name:</strong> John Doe</p>
  </div>

  <div class="action-buttons">
    <button class="btn-reschedule">Reschedule</button>
    <button class="btn-cancel">Cancel</button>
  </div>
`;
  } else if (status === "cancelled") {
    badge =
      '<span class="cancelled-badge" style="color: red;">CANCELLED</span>';
    appointmentHTML = `
  <div class="appointment-header">
    <div class="appointment-date">
      December 18, 2024<br />2:00 pm
    </div>
    ${badge}
  </div>

  <div class="appointment-details">
    <h6>Appointment Category: Financial Aid</h6>
    <p>Assistance with scholarship requirements</p>
    <p><strong>Appointment Type:</strong> Financial Support</p>
    <p><strong>Name:</strong> Jane Smith</p>
  </div>
`;
  }

  appointmentCard.innerHTML = appointmentHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-reschedule")) {
      showModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-accept")) {
      const toastElement = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();

      // Simulate login process
      setTimeout(() => {
        toast.hide();
      }, 2000);
    }
  });
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
  e.preventDefault();

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
      window.location.href = "/staff/login";
    }, 1000);
  };

  // Show modal
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteAppointmentModal")
  );
  deleteModal.show();
});

document
  .querySelector(".dashboard-link")
  .addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "/staff/dashboard";
  });

document
  .querySelector(".notification-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    window.location.href = "/staff/notification";
  });
