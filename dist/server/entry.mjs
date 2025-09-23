import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Bula4o2I.mjs';
import { manifest } from './manifest_BuATp8nQ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/buat-karakter-kustom.astro.mjs');
const _page2 = () => import('./pages/download.astro.mjs');
const _page3 = () => import('./pages/generate.astro.mjs');
const _page4 = () => import('./pages/pembayaran.astro.mjs');
const _page5 = () => import('./pages/transaksi/_invoice_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/buat-karakter-kustom.astro", _page1],
    ["src/pages/download.astro", _page2],
    ["src/pages/generate.astro", _page3],
    ["src/pages/pembayaran.astro", _page4],
    ["src/pages/transaksi/[invoice].astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/client/",
    "server": "file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
