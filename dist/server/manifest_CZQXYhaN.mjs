import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_DLHOh8jC.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CZEVsUZb.mjs';
import 'es-module-lexer';

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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/","cacheDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/.astro/","outDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/","srcDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/","publicDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/public/","buildClientDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/client/","buildServerDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/buat-karakter-kustom","isIndex":false,"type":"page","pattern":"^\\/buat-karakter-kustom\\/?$","segments":[[{"content":"buat-karakter-kustom","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/buat-karakter-kustom.astro","pathname":"/buat-karakter-kustom","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/download","isIndex":false,"type":"page","pattern":"^\\/download\\/?$","segments":[[{"content":"download","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/download.astro","pathname":"/download","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/generate","isIndex":false,"type":"page","pattern":"^\\/generate\\/?$","segments":[[{"content":"generate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/generate.astro","pathname":"/generate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/pembayaran","isIndex":false,"type":"page","pattern":"^\\/pembayaran\\/?$","segments":[[{"content":"pembayaran","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pembayaran.astro","pathname":"/pembayaran","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/transaksi/[invoice]","isIndex":false,"type":"page","pattern":"^\\/transaksi\\/([^/]+?)\\/?$","segments":[[{"content":"transaksi","dynamic":false,"spread":false}],[{"content":"invoice","dynamic":true,"spread":false}]],"params":["invoice"],"component":"src/pages/transaksi/[invoice].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.CGm6LU2Q.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/buat-karakter-kustom.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/download.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/buat-karakter-kustom@_@astro":"pages/buat-karakter-kustom.astro.mjs","\u0000@astro-page:src/pages/download@_@astro":"pages/download.astro.mjs","\u0000@astro-page:src/pages/generate@_@astro":"pages/generate.astro.mjs","\u0000@astro-page:src/pages/pembayaran@_@astro":"pages/pembayaran.astro.mjs","\u0000@astro-page:src/pages/transaksi/[invoice]@_@astro":"pages/transaksi/_invoice_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CZQXYhaN.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BRgxa2eE.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","@/components/GenerateVideo":"_astro/GenerateVideo.BdRKJflS.js","@/components/CustomCharacterForm":"_astro/CustomCharacterForm.DYcGQjDU.js","@/components/VideoGallery":"_astro/VideoGallery.Bdy3sV4M.js","@/components/TransactionDetail":"_astro/TransactionDetail.Dnk_JpRY.js","@/components/PaymentPage":"_astro/PaymentPage.DkMkqJGC.js","@/components/NavbarWithModal":"_astro/NavbarWithModal.BYt8c6rY.js","@/components/VideoDownload":"_astro/VideoDownload.BCbj8bGm.js","@astrojs/react/client.js":"_astro/client.CYfJMTzd.js","@/components/SetupPage":"_astro/SetupPage.BEJstGMx.js","@/components/Navbar":"_astro/Navbar.C0gCThK_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts",""]],"assets":["/_astro/download.CGm6LU2Q.css","/favicon.svg","/_astro/api.a2yr6dSM.js","/_astro/arrow-left.CPws6s8x.js","/_astro/badge.Qd5udzr1.js","/_astro/card.CwskAJbJ.js","/_astro/check.DRUMQLy0.js","/_astro/circle-check-big.btNzbIIr.js","/_astro/circle-x.CtdoWOcc.js","/_astro/client.CYfJMTzd.js","/_astro/clock.ih07b0yA.js","/_astro/createLucideIcon.C9qM8KNi.js","/_astro/credit-card.DBZyheI9.js","/_astro/CustomCharacterForm.DYcGQjDU.js","/_astro/download.BOBObm7a.js","/_astro/eye.s3Nkw_SD.js","/_astro/file-text.Cekuo9B6.js","/_astro/GenerateVideo.BdRKJflS.js","/_astro/index.BvNfZMHe.js","/_astro/index.CY-HDqYb.js","/_astro/input.DQP1lckO.js","/_astro/mail.C1wlOqJB.js","/_astro/Navbar.C0gCThK_.js","/_astro/Navbar.DHJm-gRS.js","/_astro/NavbarWithModal.BYt8c6rY.js","/_astro/PaymentPage.DkMkqJGC.js","/_astro/play.vIkBtBUm.js","/_astro/refresh-cw.XVD5AAyh.js","/_astro/select.Bxlt13Ro.js","/_astro/settings.B1k9k4J7.js","/_astro/SetupPage.BEJstGMx.js","/_astro/TransactionDetail.Dnk_JpRY.js","/_astro/user.DwRibW2I.js","/_astro/video.C0_GaG-H.js","/_astro/VideoDownload.BCbj8bGm.js","/_astro/VideoGallery.Bdy3sV4M.js","/_astro/videoSetupStorage.Fc38nvc3.js","/_astro/x.Bdr1dCcl.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"3Need/G8x4zd8KZOtMxZ7vcDhuo7W2SfyttPc3wBcg4=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\Mrian07\\Documents\\BACKUP-E\\KERJA\\vidio-generator\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
