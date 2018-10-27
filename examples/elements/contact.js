class Contact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h1>Contact</h1>
    `;
  }
}

customElements.define("example-contact", Contact);
