import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_BY5bc-G0.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BCIQ7WKw.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/","cacheDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/.astro/","outDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/","srcDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/","publicDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/public/","buildClientDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/client/","buildServerDir":"file:///C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/download","isIndex":false,"type":"page","pattern":"^\\/download\\/?$","segments":[[{"content":"download","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/download.astro","pathname":"/download","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/generate/[uuid]","isIndex":false,"type":"page","pattern":"^\\/generate\\/([^/]+?)\\/?$","segments":[[{"content":"generate","dynamic":false,"spread":false}],[{"content":"uuid","dynamic":true,"spread":false}]],"params":["uuid"],"component":"src/pages/generate/[uuid].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/generate","isIndex":false,"type":"page","pattern":"^\\/generate\\/?$","segments":[[{"content":"generate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/generate.astro","pathname":"/generate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/konsultan-video","isIndex":false,"type":"page","pattern":"^\\/konsultan-video\\/?$","segments":[[{"content":"konsultan-video","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/konsultan-video.astro","pathname":"/konsultan-video","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/pembayaran","isIndex":false,"type":"page","pattern":"^\\/pembayaran\\/?$","segments":[[{"content":"pembayaran","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pembayaran.astro","pathname":"/pembayaran","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/riwayat-video","isIndex":false,"type":"page","pattern":"^\\/riwayat-video\\/?$","segments":[[{"content":"riwayat-video","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/riwayat-video.astro","pathname":"/riwayat-video","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/transaksi/[invoice]","isIndex":false,"type":"page","pattern":"^\\/transaksi\\/([^/]+?)\\/?$","segments":[[{"content":"transaksi","dynamic":false,"spread":false}],[{"content":"invoice","dynamic":true,"spread":false}]],"params":["invoice"],"component":"src/pages/transaksi/[invoice].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/download.DlLVE9lO.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate/[uuid].astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/konsultan-video.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/pembayaran.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/riwayat-video.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/transaksi/[invoice].astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/download.astro",{"propagation":"none","containsHead":true}],["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/generate.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/download@_@astro":"pages/download.astro.mjs","\u0000@astro-page:src/pages/generate/[uuid]@_@astro":"pages/generate/_uuid_.astro.mjs","\u0000@astro-page:src/pages/generate@_@astro":"pages/generate.astro.mjs","\u0000@astro-page:src/pages/konsultan-video@_@astro":"pages/konsultan-video.astro.mjs","\u0000@astro-page:src/pages/pembayaran@_@astro":"pages/pembayaran.astro.mjs","\u0000@astro-page:src/pages/riwayat-video@_@astro":"pages/riwayat-video.astro.mjs","\u0000@astro-page:src/pages/transaksi/[invoice]@_@astro":"pages/transaksi/_invoice_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C-Gs1sIG.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_p-L5vucX.mjs","C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","@/components/GenerateVideo":"_astro/GenerateVideo.CTaEkDMb.js","@/components/VideoHistory":"_astro/VideoHistory.D6QnTqeU.js","@/components/AIAssistantBubble":"_astro/AIAssistantBubble.snmzMPGC.js","@/components/GenerateVideoPage":"_astro/GenerateVideoPage.B21hhr7G.js","@/components/VideoConsultant":"_astro/VideoConsultant.Dg_SheXr.js","@/components/TransactionDetail":"_astro/TransactionDetail.H8g-MSgE.js","@/components/PaymentPage":"_astro/PaymentPage.B4lIH3N_.js","@/components/VideoDownload":"_astro/VideoDownload.CMVcMzyK.js","@/components/VideoGallery":"_astro/VideoGallery.DFTG3uQ9.js","@astrojs/react/client.js":"_astro/client.DVxemvf8.js","@/components/NavbarWithModal":"_astro/NavbarWithModal.Cv9owZ2S.js","@/components/NavbarWithModal.tsx":"_astro/NavbarWithModal.Dy8O0Shl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts",""]],"assets":["/_astro/download.DlLVE9lO.css","/favicon.svg","/logo.svg","/_astro/AIAssistantBubble.snmzMPGC.js","/_astro/api.BgGK7ZEH.js","/_astro/arrow-left.BkpbGPXl.js","/_astro/badge.DE2H0mDD.js","/_astro/calendar.nuBBCmxz.js","/_astro/card.BkPeL54w.js","/_astro/circle-check-big.D_AmXthT.js","/_astro/client.DVxemvf8.js","/_astro/clock.C2OUqiaQ.js","/_astro/coins.BuqF-eRp.js","/_astro/createLucideIcon.BWUjMJ0t.js","/_astro/credit-card.DczNfIjS.js","/_astro/download.BNLMLlBi.js","/_astro/eye.BlDuAj9Y.js","/_astro/file-text.BreevVoY.js","/_astro/film.DA_pNcpv.js","/_astro/GenerateVideo.CTaEkDMb.js","/_astro/GenerateVideoPage.B21hhr7G.js","/_astro/index.RH_Wq4ov.js","/_astro/input.CFClzvO6.js","/_astro/list.DXz9N-XO.js","/_astro/loader-circle.whxegmsq.js","/_astro/mail.yCrk0dSX.js","/_astro/message-circle.CeNnqhzY.js","/_astro/NavbarWithModal.Cv9owZ2S.js","/_astro/NavbarWithModal.Dy8O0Shl.js","/_astro/PaymentPage.B4lIH3N_.js","/_astro/play.CmT1PXqT.js","/_astro/refresh-cw.CBIVstNO.js","/_astro/send.CaZnCtOi.js","/_astro/settings.KLqNsyPO.js","/_astro/sparkles.DUVF_Rgm.js","/_astro/TransactionDetail.H8g-MSgE.js","/_astro/user.CBsbP5--.js","/_astro/video.CTT0PdyH.js","/_astro/VideoConsultant.Dg_SheXr.js","/_astro/VideoDownload.CMVcMzyK.js","/_astro/VideoGallery.DFTG3uQ9.js","/_astro/VideoHistory.D6QnTqeU.js","/_astro/videoSetupStorage.Fc38nvc3.js","/_astro/x.DC3K5u7y.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"amqUrQMQ+zsCQ1jDv/jiR3Plgz2jSm2CRqjsnyp0jBk=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\Mrian07\\Documents\\BACKUP-E\\KERJA\\vidio-generator\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
