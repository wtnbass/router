import { Router } from "../node_modules/@wtnbass/slot-router/slot-router.esm.js";

class AuthRouter extends Router {
  redirect(path) {
    return !localStorage.getItem("login") ? "/login" : path;
  }
}

customElements.define("auth-router", AuthRouter);
