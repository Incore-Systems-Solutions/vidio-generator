import{c as l,j as e,B as n,a as m}from"./createLucideIcon.DzqsC8J0.js";import{r as c}from"./index.CY-HDqYb.js";import{S as h}from"./settings.BfnKfkg1.js";import{C as x}from"./credit-card.CG7iAih-.js";import{S as g}from"./sparkles.BEqi696k.js";import{D as u}from"./download.Cws42hSb.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],f=l("circle-check",p);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],k=l("menu",b);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],j=l("moon",v);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],w=l("sun",y);function N(){const[t,i]=c.useState("light");c.useEffect(()=>{const s=localStorage.getItem("theme"),o=window.matchMedia("(prefers-color-scheme: dark)").matches,d=s||(o?"dark":"light");i(d),r(d)},[]);const r=s=>{const o=document.documentElement;s==="dark"?o.classList.add("dark"):o.classList.remove("dark")},a=()=>{const s=t==="light"?"dark":"light";i(s),r(s),localStorage.setItem("theme",s)};return e.jsx(n,{variant:"ghost",size:"icon",onClick:a,className:"w-10 h-10","aria-label":"Toggle theme",children:t==="light"?e.jsx(j,{className:"h-5 w-5"}):e.jsx(w,{className:"h-5 w-5"})})}function C({currentStep:t=1,totalSteps:i=4}){const r=[{id:1,title:"Setup Video",icon:h,completed:t>1,active:t===1},{id:2,title:"Pembayaran",icon:x,completed:t>2,active:t===2},{id:3,title:"Generate Video",icon:g,completed:t>3,active:t===3},{id:4,title:"Download",icon:u,completed:t>4,active:t===4}];return e.jsx("nav",{className:"sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",children:e.jsx("div",{className:"container mx-auto px-8",children:e.jsxs("div",{className:"py-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx(m,{className:"px-6 py-3 text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg",children:"VIDEO GENERATOR"})}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("div",{className:"text-sm text-muted-foreground font-medium",children:["Langkah ",t," dari ",i]}),e.jsx(N,{}),e.jsx(n,{variant:"ghost",size:"icon",className:"w-10 h-10 lg:hidden",children:e.jsx(k,{className:"h-5 w-5"})})]})]}),e.jsx("div",{className:"flex justify-center px-8",children:e.jsxs("div",{className:"flex items-start justify-between w-full max-w-2xl relative",children:[e.jsx("div",{className:"absolute top-6 left-0 right-0 h-0.5 bg-border",children:e.jsx("div",{className:"h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out",style:{width:`${(t-1)/(i-1)*100}%`}})}),r.map((a,s)=>{const o=a.icon;return e.jsxs("div",{className:"flex flex-col items-center relative z-10 min-w-0",children:[e.jsx("div",{className:`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 bg-background
                      ${a.completed?"bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white shadow-lg":a.active?"border-purple-600 text-purple-600 shadow-md ring-2 ring-purple-200 dark:ring-purple-800":"border-gray-300 text-gray-400 bg-gray-50 dark:border-gray-600 dark:text-gray-500 dark:bg-gray-800"}
                    `,children:a.completed?e.jsx(f,{className:"w-5 h-5"}):e.jsx(o,{className:`w-5 h-5 ${a.active?"animate-pulse":""}`})}),e.jsxs("div",{className:"mt-4 text-center max-w-24",children:[e.jsx("div",{className:`
                        text-sm font-medium transition-colors duration-300 leading-tight
                        ${a.completed?"text-purple-600 font-semibold":a.active?"text-foreground font-semibold":"text-muted-foreground"}
                      `,children:a.title}),a.active&&e.jsx("div",{className:"mt-2 w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto animate-pulse"})]})]},a.id)})]})})]})})})}export{C as Navbar};
