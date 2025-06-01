class MyLoader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <style>
          .loading-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(128, 128, 128, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .spinner {
            width: 60px; height: 60px;
            border: 6px solid #ccc;
            border-top-color: #333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      `;
  }
}

customElements.define("my-loader", MyLoader);
