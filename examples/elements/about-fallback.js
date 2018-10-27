class AboutFallback extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h2>About - 404</h2>
    `;
  }
}

customElements.define("example-about-fallback", AboutFallback);
