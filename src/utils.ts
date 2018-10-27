const paramRegexp = /:(.+)/;

export const pathSegment = (path: string) => path.split("/").filter(seg => seg);

export const extractParams = (routeSeg: string[], pathSeg: string[]) => {
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

export const areExactEqual = (routeSeg: string[], pathSeg: string[]) =>
  routeSeg.length === pathSeg.length &&
  routeSeg.every((r, i) => r === pathSeg[i]);

export const areParamsEqual = (routeSeg: string[], pathSeg: string[]) =>
  routeSeg.length === pathSeg.length &&
  routeSeg.every((r, i) => r === pathSeg[i] || paramRegexp.test(r));

export const areAnyEqual = (routeSeg: string[], pathSeg: string[]) =>
  routeSeg.length === pathSeg.length &&
  routeSeg.every((r, i) => r === pathSeg[i] || r === "*");

export const navigate = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(
    new CustomEvent("router-state-pushed", {
      bubbles: true,
      composed: true
    })
  );
};
