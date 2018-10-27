class About1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h2>About - 1</h2>
    `;
  }
}

customElements.define("example-about-1", About1);
