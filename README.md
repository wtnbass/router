# slot-router

web components router using slot

## Installation

```bash
npm install slot-router
```

## Example

See [examples](examples)

## Usage

### `slot-router`

Display the Children of `<slot-router>` path matches.

```html
<script src="./node_modules/slot-router/slot-router.js"></script>
<slot-router>
  <example-home path="/"></example-home>
  <example-about path="/about">
    <!-- nested -->
    <example-about-home path="/"></example-about-home>
    <example-about-1 path="/1"></example-about-1>
    <example-about-2 path="/2"></example-about-2>
    <!-- asterisk -->
    <example-about-fallback path="/*"></example-about-fallback>
  </example-about>
  <example-contact path="/contact"></example-contact>
  <!-- path params -->
  <user-page path="/users/:userId"></user-page>
  <!-- fallback -->
  <example-404 not-found></example-404>
</slot-router>
```

#### Redirect

Override `redirect` method

```javascript
import { Router } from "slot-router";

class AuthRouter extends Router {
  redirect(path) {
    return localStrage.getItem("login") ? "/login" : path;
  }
}
```

### `navigate`

#### Make your link component

```javascript
import { navigate } from "slot-router";

class MyLink extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const link = shadow.appendChild(document.createElement("a"));
    link.addEventListener("click", () => navigate(this.to));
  }
  get to() {
    return this.getAttirubute("to");
  }
}

customElements.define("my-link", MyLink);
```

You can use it in html like:

```html
<my-link to="/awesome">Awesome</my-link>
```

#### With `pwa-heplers`

```javascript
import { installRouter } from "pwa-helpers/router";
import { navigate } from "slot-router";

installRouter(location => navigate(location.pathname));
```

## LICENSE

See [LICENSE](LICENSE)
