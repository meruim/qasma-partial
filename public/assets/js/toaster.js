class MyToast extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
        <style>
          :host {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem;
            z-index: 1055;
            pointer-events: none; /* so clicks pass through when hidden */
          }
          .toast {
            pointer-events: auto;
            min-width: 250px;
          }
        </style>
  
        <div
          id="toast"
          class="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          >
          <div class="d-flex">
            <div class="toast-body"><slot>Accepted successfully!</slot></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
          </div>
        </div>
      `;

    this._toast = shadow.getElementById("toast");
    this._closeBtn = this._toast.querySelector("button");

    this._closeBtn.addEventListener("click", () => this.hide());

    // Bootstrap toast instance
    this._bsToast = null;
  }

  connectedCallback() {
    // Load Bootstrap's JS if needed (optional, if you already have it in page)
    if (!window.bootstrap) {
      console.warn("Bootstrap JS is not loaded, toast may not work properly.");
    } else {
      this._bsToast = new bootstrap.Toast(this._toast, {
        autohide: true,
        delay: 3000,
      });
    }
  }

  show() {
    if (this._bsToast) {
      this._bsToast.show();
    } else {
      this._toast.style.display = "block";
      setTimeout(() => this.hide(), 3000);
    }
  }

  hide() {
    if (this._bsToast) {
      this._bsToast.hide();
    } else {
      this._toast.style.display = "none";
    }
  }
}

customElements.define("my-toast", MyToast);
