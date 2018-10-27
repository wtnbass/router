class NotFound extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h1>Not Found</h1>
    `;
  }
}

customElements.define("example-404", NotFound);
