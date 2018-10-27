class Home extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h1>Home</h1>
    `;
  }
}

customElements.define("example-home", Home);
