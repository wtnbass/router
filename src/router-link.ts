import { navigate } from "./utils";

export class RouterLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <a href="${this.to}"><slot></slot></a>
    `;

    this.addEventListener("click", (e: Event) => {
      e.preventDefault();
      if (this.to) {
        navigate(this.to);
      }
    });
  }

  get to() {
    return this.getAttribute("to");
  }
}

window.customElements.define("router-link", RouterLink);
