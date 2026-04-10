import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DoWqUyn8.mjs';
import { manifest } from './manifest_DQqn7i7i.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/create-order.astro.mjs');
const _page2 = () => import('./pages/api/improve.astro.mjs');
const _page3 = () => import('./pages/app.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/create-order.ts", _page1],
    ["src/pages/api/improve.ts", _page2],
    ["src/pages/app.astro", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bdb99b89-702e-46c8-89d7-dac4f32c1672",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
