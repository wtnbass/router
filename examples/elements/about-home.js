class AboutHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h2>About - Home</h2>
    `;
  }
}

customElements.define("example-about-home", AboutHome);
