(function(){"use strict";function l(t,e,{sortAsInt:r,sortAsDate:o}={}){const n=e.split(".").reduce((s,i)=>s==null?void 0:s[i],t);return o?new Date(n??0).getTime():r?Number(n)||0:String(n??"").toLowerCase()}function c(t,e,r,o){if(o)return r?+t-+e:+e-+t;const n=t.toString().localeCompare(e.toString(),void 0,{sensitivity:"base"});return r?n:-n}function f(t,e,r){var u,a;if(r==="date")return{sortAsDate:!0};if(r==="int")return{sortAsInt:!0};if(r==="string")return{};const o=(u=t[0])==null?void 0:u[e],n=(a=t[t.length-1])==null?void 0:a[e],s=!isNaN(Number(o))&&!isNaN(Number(n)),i=!isNaN(new Date(o).getTime())&&!isNaN(new Date(n).getTime());return{sortAsInt:s,sortAsDate:i}}function g(t,e,r,o,n,s){if(!(t!=null&&t.length))return[];const{sortAsInt:i,sortAsDate:u}=f(t,e,o);return[...t].sort((a,d)=>{const N=l(a,e,{sortAsInt:i,sortAsDate:u}),D=l(d,e,{sortAsInt:i,sortAsDate:u});return c(N,D,r,i||u||!1)})}globalThis.onmessage=function(t){const{data:e,sortByField:r,isSortedAsc:o,sortType:n}=t.data,s=g(e,r,o,n);globalThis.postMessage(s)}})();
