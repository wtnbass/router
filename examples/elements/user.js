class User extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.update = () => {
      this.shadowRoot.innerHTML = `<h1>${this.userId}</h1>`;
    };

    let userId = this.userId;
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
customElements.define("example-user", User);
