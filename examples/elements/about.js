class About extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <h1>About</h1>
      <ul>
        <li><a href="/about/">About - Home</a></li>
        <li><a href="/about/1">About - 1</a></li>
        <li><a href="/about/2">About - 2</a></li>
      </ul>
      <slot name="route"></slot>
    `;
  }
}

customElements.define("example-about", About);
