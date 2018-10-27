import { navigate } from "../node_modules/@wtnbass/slot-router/slot-router.esm.js";
import { installRouter } from "../node_modules/pwa-helpers/router.js";

import "./auth-router.js";
import "./logout.js";

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <header>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/users/Alice">Alice</a></li>
        <li><a href="/users/Bob">Bob</a></li>
        <li><example-logout></example-logout></li>
      </ul>
      </header>
      <hr />
      <main>
        <auth-router>
          <example-login path="/login"></example-login>
          <example-home path="/"></example-home>
          <example-about path="/about">
          <example-about-home path="/"></example-about-home>
          <example-about-1 path="/1"></example-about-1>
          <example-about-2 path="/2"></example-about-2>
          <example-about-fallback path="/*"></example-about-fallback>
          </example-about>
          <example-contact path="/contact"></example-contact>
          <example-user path="/users/:userId"></example-user>
          <example-404 not-found></example-404>
        </auth-router>
      </main>
    `;
  }

  connectedCallback() {
    installRouter(location => {
      navigate(location.pathname, false);
    });

    const router = this.shadowRoot.querySelector("auth-router");
    router.addEventListener("router-updated", this.loadModules);
    this.loadModules();
  }

  loadModules() {
    const seg = location.pathname.slice(1).split("/");
    if (seg[0] === "login") {
      import("./login.js");
    } else if (seg[0] === "") {
      import("./home.js");
    } else if (seg[0] === "about") {
      import("./about.js");
      if (seg[1] === "1") {
        import("./about-1.js");
      } else if (seg[1] === "1") {
        import("./about-2.js");
      } else {
        import("./about-fallback.js");
      }
    } else if (seg[0] === "contact") {
      import("./contact.js");
    } else if (seg[0] === "users") {
      import("./user.js");
    } else {
      import("./404.js");
    }
  }
}

customElements.define("example-app", App);
