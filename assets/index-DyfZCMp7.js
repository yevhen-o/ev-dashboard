import{c as u,p,n as g,m as x,r as E,j as f,L as d,g as h,C as j,D as w}from"./index-C4DZi6qX.js";const m=t=>new Intl.DateTimeFormat("en-GB",{hour:"numeric",minute:"numeric",second:"numeric",timeZone:"Australia/Sydney"}).format(new Date(t));function N(){const t=u.c(12),{setLastSeen:s}=p(),{t:r}=g(),a=x(T);let i,n;t[0]!==s?(i=()=>{s()},n=[s],t[0]=s,t[1]=i,t[2]=n):(i=t[1],n=t[2]),E.useEffect(i,n);let e;t[3]!==r?(e=r("notificationPageTitle"),t[3]=r,t[4]=e):e=t[4];let o;t[5]!==e?(o=f.jsx("h1",{children:e}),t[5]=e,t[6]=o):o=t[6];let c;t[7]!==a?(c=a.map(D),t[7]=a,t[8]=c):c=t[8];let l;return t[9]!==o||t[10]!==c?(l=f.jsxs(f.Fragment,{children:[o,c]}),t[9]=o,t[10]=c,t[11]=l):l=t[11],l}function D(t){const{isCritical:s,isWarning:r,message:a,win:i,from:n,to:e}=t;return f.jsxs(d,{to:j(w.HOME,{search:i}),className:h("notification",{"notification--warning":r,"notification--critical":s}),children:[n&&m(n)," ",e&&`to ${m(e)}`," EV win [",i,"] -- ",a]},`${i}__${a}`)}function T(t){return t.notifications.notifications}export{N as default};
