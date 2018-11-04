import { Router } from "../node_modules/slot-router/slot-router.js";

class AuthRouter extends Router {
  redirect(path) {
    return !localStorage.getItem("login") ? "/login" : path;
  }
}

customElements.define("auth-router", AuthRouter);
