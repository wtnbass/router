import { match } from "./lib/match";

export const navigate = (path: string, push = true) => {
  if (push) {
    window.history.pushState({}, "", path);
  }
  window.dispatchEvent(
    new CustomEvent("router-state-pushed", {
      bubbles: true,
      composed: true
    })
  );
};

export class Router extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <slot name="route"></slot>
    `;
  }

  public connectedCallback() {
    window.addEventListener("router-state-pushed", this.handleNavigate);
    window.addEventListener("popstate", this.handleNavigate);
    this.navigate();
  }

  public disconnectedCallback() {
    window.removeEventListener("router-state-pushed", this.handleNavigate);
    window.removeEventListener("popstate", this.handleNavigate);
  }

  public navigate(pathname: string = location.pathname) {
    // Clean
    Array.from(this.querySelectorAll("[slot=route]")).forEach(node =>
      node.removeAttribute("slot")
    );

    // Redirect
    const path = this.redirect(pathname);
    if (path !== pathname) {
      history.replaceState({}, "", path);
    }

    const routes = match(
      path,
      this,
      this.querySelectorAll("[path]"),
      this.getAttribute("baseURL")
    ) || [this.querySelector("[not-found]")];

    routes.forEach(node => node && Object.assign(node, { slot: "route" }));

    this.dispatchEvent(new CustomEvent("router-updated"));
  }

  protected redirect(path: string): string {
    return path;
  }

  private handleNavigate = () => {
    this.navigate();
  };
}

window.customElements.define("slot-router", Router);
