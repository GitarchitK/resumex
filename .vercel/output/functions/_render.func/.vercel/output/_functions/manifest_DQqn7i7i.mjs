import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_AeyI4Wgh.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_CakDOFDz.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/archi/Desktop/Nav%20Roll%20Projects/Resume%20X/resumefix-ai/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-order","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-order\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-order.ts","pathname":"/api/create-order","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/improve","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/improve\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"improve","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/improve.ts","pathname":"/api/improve","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CewmZEIN.js"}],"styles":[{"type":"external","src":"/_astro/app.CIrm3rTy.css"}],"routeData":{"route":"/app","isIndex":false,"type":"page","pattern":"^\\/app\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app.astro","pathname":"/app","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CveBTQp8.js"}],"styles":[{"type":"external","src":"/_astro/app.CIrm3rTy.css"},{"type":"inline","content":".hero-section-label[data-astro-cid-nlow4r3u]{margin-bottom:.25rem;font-size:.75rem;line-height:1rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.hero-bad-text[data-astro-cid-nlow4r3u]{font-size:.75rem;line-height:1rem;line-height:1.625;--tw-text-opacity: 1;color:rgb(248 113 113 / var(--tw-text-opacity, 1));text-decoration-line:line-through;text-decoration-color:#fca5a5}.hero-good-text[data-astro-cid-nlow4r3u]{font-size:.75rem;line-height:1rem;line-height:1.625;--tw-text-opacity: 1;color:rgb(4 120 87 / var(--tw-text-opacity, 1))}.hero-issue-tag[data-astro-cid-nlow4r3u]{border-radius:.25rem;--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1));padding:.125rem .375rem;font-size:.75rem;line-height:1rem;font-weight:500;--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.hero-fix-tag[data-astro-cid-nlow4r3u]{border-radius:.25rem;--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1));padding:.125rem .375rem;font-size:.75rem;line-height:1rem;font-weight:500;--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.bad-line[data-astro-cid-fztqauyw]{text-decoration:line-through;color:#f87171;text-decoration-color:#fca5a5}.good-line[data-astro-cid-fztqauyw]{color:#065f46}.issue-tag[data-astro-cid-fztqauyw]{border-radius:.25rem;--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1));padding:.125rem .375rem;font-size:.75rem;line-height:1rem;font-weight:500;--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.fix-tag[data-astro-cid-fztqauyw]{border-radius:.25rem;background-color:#10b9811a;padding:.125rem .375rem;font-size:.75rem;line-height:1rem;font-weight:500;--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.added-tag[data-astro-cid-fztqauyw]{border-radius:.25rem;--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1));padding:.125rem .375rem;font-size:.75rem;line-height:1rem;font-weight:500;--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.ats-bar[data-astro-cid-ryk2f472]{animation:growBar 1.5s ease-out forwards;transform-origin:left}@keyframes growBar{0%{width:0%}to{width:82%}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/archi/Desktop/Nav Roll Projects/Resume X/resumefix-ai/src/pages/app.astro",{"propagation":"none","containsHead":true}],["C:/Users/archi/Desktop/Nav Roll Projects/Resume X/resumefix-ai/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/create-order@_@ts":"pages/api/create-order.astro.mjs","\u0000@astro-page:src/pages/api/improve@_@ts":"pages/api/improve.astro.mjs","\u0000@astro-page:src/pages/app@_@astro":"pages/app.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/archi/Desktop/Nav Roll Projects/Resume X/resumefix-ai/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DQqn7i7i.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CewmZEIN.js","/astro/hoisted.js?q=1":"_astro/hoisted.CveBTQp8.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/app.CIrm3rTy.css","/favicon.svg","/_astro/hoisted.CewmZEIN.js","/_astro/hoisted.CveBTQp8.js","/_astro/Navbar.astro_astro_type_script_index_0_lang.ndujPdMQ.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"SUnWVmseOyhRWDsavKnZCOhJNyjbFdGnj9yRVL8+HFk=","experimentalEnvGetSecretEnabled":false});

export { manifest };
