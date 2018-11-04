const paramRegexp = /:(.+)/;

const pathSegment = (path: string) => path.split("/").filter(seg => seg);

const extractParams = (routeSeg: string[], pathSeg: string[]) => {
  const params: { [name: string]: string } = {};
  for (let i = 0, len = routeSeg.length; i < len; i++) {
    const seg = routeSeg[i];
    if (!paramRegexp.test(seg)) {
      continue;
    }
    const [, name] = paramRegexp.exec(seg)!;
    params[name] = pathSeg[i];
  }
  return params;
};

const areEqual = (condition: (seg: string) => boolean) => (
  routeSeg: string[],
  pathSeg: string[]
) =>
  routeSeg.length === pathSeg.length &&
  routeSeg.every((r, i) => r === pathSeg[i] || condition(r));

const areExactEqual = areEqual(() => false);

const areParamsEqual = areEqual(r => paramRegexp.test(r));

const areAnyEqual = areEqual(r => r === "*");

export function match(
  pathname: string,
  parentNode: Element,
  routeNode: NodeListOf<Element>,
  baseURL: string | null
): Element[] | null {
  const map = new Map<string, Set<Element>>();
  for (let node of Array.from(routeNode)) {
    let seg = [];
    const routes = [];
    if (baseURL) {
      seg.push(baseURL);
    }
    while (node && node !== parentNode) {
      const path = node.getAttribute("path");
      if (path) {
        seg = pathSegment(path).concat(seg);
        routes.push(node);
      }
      node = node.parentNode as Element;
    }
    const key = seg.join("/");
    const iter = map.get(key) || [];
    map.set(key, new Set([...iter, ...routes]));
  }

  let exact: Element[] | undefined;
  let params: Element[] | undefined;
  let aster: Element[] | undefined;

  const pathSeg = pathSegment(pathname);
  for (const [path, routeSet] of map) {
    const [routeSeg, routes] = [pathSegment(path), Array.from(routeSet)];
    // Exact
    if (!exact && areExactEqual(routeSeg, pathSeg)) {
      exact = routes;
    }
    // PathParams
    if (!params && areParamsEqual(routeSeg, pathSeg)) {
      params = routes.map(node =>
        Object.assign(node, extractParams(routeSeg, pathSeg))
      );
    }
    // Aster
    if (!aster && areAnyEqual(routeSeg, pathSeg)) {
      aster = routes;
    }
  }
  return exact || params || aster || null;
}
