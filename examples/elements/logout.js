import { navigate } from "../node_modules/slot-router/slot-router.js";

class Logout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <button>Logout</button>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      localStorage.removeItem("login");
      navigate("/login");
    });
  }
}

customElements.define("example-logout", Logout);
