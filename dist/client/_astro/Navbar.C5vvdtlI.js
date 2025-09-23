import{c as i,j as e,B as d}from"./createLucideIcon.C9qM8KNi.js";import{r as n}from"./index.CY-HDqYb.js";import{B as h}from"./badge.Qd5udzr1.js";import{S as x}from"./settings.B1k9k4J7.js";import{C as p}from"./credit-card.DBZyheI9.js";import{S as u}from"./sparkles.Bh5ZbUvE.js";import{D as g}from"./download.BOBObm7a.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],k=i("circle-check",f);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],v=i("history",b);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],j=i("menu",y);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],w=i("moon",N);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],T=i("sun",M);function _(){const[a,o]=n.useState("light");n.useEffect(()=>{const s=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches,c=s||(t?"dark":"light");o(c),r(c)},[]);const r=s=>{const t=document.documentElement;s==="dark"?t.classList.add("dark"):t.classList.remove("dark")},l=()=>{const s=a==="light"?"dark":"light";o(s),r(s),localStorage.setItem("theme",s)};return e.jsx(d,{variant:"ghost",size:"icon",onClick:l,className:"w-10 h-10","aria-label":"Toggle theme",children:a==="light"?e.jsx(w,{className:"h-5 w-5"}):e.jsx(T,{className:"h-5 w-5"})})}function V({currentStep:a=1,totalSteps:o=4,onVideoHistoryClick:r}){const l=()=>{r?.()},s=[{id:1,title:"Setup Video",icon:x,completed:a>1,active:a===1},{id:2,title:"Pembayaran",icon:p,completed:a>2,active:a===2},{id:3,title:"Generate Video",icon:u,completed:a>3,active:a===3},{id:4,title:"Download",icon:g,completed:a>4,active:a===4}];return e.jsx("nav",{className:"sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:e.jsx("div",{className:"container mx-auto px-8",children:e.jsxs("div",{className:"py-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(h,{className:"px-6 py-3 text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg",children:"VIDEO GENERATOR"})}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs(d,{variant:"outline",size:"sm",className:"flex items-center space-x-2 text-sm",onClick:l,children:[e.jsx(v,{className:"w-4 h-4"}),e.jsx("span",{className:"hidden sm:inline",children:"Riwayat Video"})]}),e.jsxs("div",{className:"text-sm text-muted-foreground font-medium",children:["Langkah ",a," dari ",o]}),e.jsx(_,{}),e.jsx(d,{variant:"ghost",size:"icon",className:"w-10 h-10 lg:hidden",children:e.jsx(j,{className:"h-5 w-5"})})]})]}),e.jsx("div",{className:"flex justify-center px-8",children:e.jsxs("div",{className:"flex items-start justify-between w-full max-w-2xl relative",children:[e.jsx("div",{className:"absolute top-6 left-0 right-0 h-0.5 bg-border",children:e.jsx("div",{className:"h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out",style:{width:`${(a-1)/(o-1)*100}%`}})}),s.map((t,c)=>{const m=t.icon;return e.jsxs("div",{className:"flex flex-col items-center relative z-10 min-w-0",children:[e.jsx("div",{className:`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 bg-background
                      ${t.completed?"bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white shadow-lg":t.active?"border-purple-600 text-purple-600 shadow-md ring-2 ring-purple-200 dark:ring-purple-800":"border-gray-300 text-gray-400 bg-gray-50 dark:border-gray-600 dark:text-gray-500 dark:bg-gray-800"}
                    `,children:t.completed?e.jsx(k,{className:"w-5 h-5"}):e.jsx(m,{className:`w-5 h-5 ${t.active?"animate-pulse":""}`})}),e.jsxs("div",{className:"mt-4 text-center max-w-24",children:[e.jsx("div",{className:`
                        text-sm font-medium transition-colors duration-300 leading-tight
                        ${t.completed?"text-purple-600 font-semibold":t.active?"text-foreground font-semibold":"text-muted-foreground"}
                      `,children:t.title}),t.active&&e.jsx("div",{className:"mt-2 w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto animate-pulse"})]})]},t.id)})]})})]})})})}export{v as H,V as N};
