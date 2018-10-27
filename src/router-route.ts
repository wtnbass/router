import {
  areAnyEqual,
  areExactEqual,
  areParamsEqual,
  extractParams,
  pathSegment
} from "./utils";

export const createRouteMap = (
  routeNode: NodeListOf<Element>,
  baseURL: string | null
) => {
  const map = new Map<string, Set<Element>>();
  for (let node of Array.from(routeNode)) {
    let pathSeg = [];
    const routes = [];
    if (baseURL) {
      pathSeg.push(baseURL);
    }
    while (node && !(node instanceof RouterRoute)) {
      const path = node.getAttribute("path");
      if (path) {
        pathSeg = pathSegment(path).concat(pathSeg);
        routes.push(node);
      }
      node = node.parentNode as Element;
    }
    const key = pathSeg.join("/");
    const iter = map.get(key) || [];
    map.set(key, new Set([...iter, ...routes]));
  }

  const routeMap = new Map<string[], Element[]>();
  for (const [path, routes] of map) {
    routeMap.set(pathSegment(path), Array.from(routes));
  }
  return routeMap;
};

export class RouterRoute extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <slot name="route"></slot>
    `;

    window.addEventListener("router-state-pushed", this.navigate);
    window.addEventListener("popstate", this.navigate);
    this.navigate();
  }

  protected redirect(path: string): string {
    return path;
  }

  private navigate = () => {
    this.clearRoute();
    this.setRoute(this.resolve());
    this.dispatchEvent(new CustomEvent("router-updated"));
  };

  private clearRoute = () => {
    Array.from(this.querySelectorAll("[slot=route]")).forEach(node =>
      node.removeAttribute("slot")
    );
  };

  private setRoute = (node: Element | Element[] | null) => {
    if (Array.isArray(node)) {
      node.forEach(this.setRoute);
    } else if (node) {
      node.setAttribute("slot", "route");
    }
  };

  private resolve(): Element | Element[] | null {
    const path = this.redirect(location.pathname);
    if (path !== location.pathname) {
      history.replaceState({}, "", path);
    }

    const pathSeg = pathSegment(path);
    const routeMap = createRouteMap(
      this.querySelectorAll("[path]"),
      this.getAttribute("baseURL")
    );

    // Exact
    for (const [routeSeg, routes] of routeMap) {
      if (areExactEqual(routeSeg, pathSeg)) {
        return routes;
      }
    }

    // PathParams
    for (const [routeSeg, routes] of routeMap) {
      if (areParamsEqual(routeSeg, pathSeg)) {
        return routes.map(node =>
          Object.assign(node, extractParams(routeSeg, pathSeg))
        );
      }
    }

    // Astarisk
    for (const [routeSeg, routes] of routeMap) {
      if (areAnyEqual(routeSeg, pathSeg)) {
        return routes;
      }
    }

    // NotFound
    return this.querySelector("[not-found]");
  }
}

window.customElements.define("router-route", RouterRoute);
