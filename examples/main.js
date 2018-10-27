const simple = (name, render) =>
  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = render();
      }
    }
  );

simple("example-home", () => `<h1>Home</h1>`);
simple(
  "example-about",
  () => `
  <h1>About</h1>
  <ul>
    <li><router-link to="/about/">About - Home</router-link></li>
    <li><router-link to="/about/1">About - 1</router-link></li>
    <li><router-link to="/about/2">About - 2</router-link></li>
  </ul>
  <slot name="route"></slot>
  `
);
simple("example-about-home", () => `<h2>About - Home</h2>`);
simple("example-about-1", () => `<h2>About - 1</h2>`);
simple("example-about-2", () => `<h2>About - 2</h2>`);
simple("example-about-fallback", () => `<h2>About - 404</h2>`);
simple("example-contact", () => `<h1>Contact</h1>`);
simple("example-404", () => `<h1>Not Found</h1>`);

customElements.define(
  "example-user",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.update = () => {
        this.shadowRoot.innerHTML = `<h1>${this.userId}</h1>`;
      };

      let userId;
      Object.defineProperty(this, "userId", {
        get() {
          return userId;
        },
        set(value) {
          userId = value;
          this.update();
        }
      });
      this.update();
    }
  }
);
