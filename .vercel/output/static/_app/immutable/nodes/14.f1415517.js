import{s as h,f as c,g as f,h as z,d,z as g,j as m,k as p,i as v,A as b,S as w,v as _,w as S}from"../chunks/scheduler.3b07f987.js";import{S as k,i as y}from"../chunks/index.c72e2f07.js";import{a as B,g as P}from"../chunks/navigation.c51359bf.js";import{p as q}from"../chunks/stores.2d407fbe.js";function N(s){let a,t,i,n,o,l,u;return{c(){a=c("button"),t=c("img"),this.h()},l(e){a=f(e,"BUTTON",{class:!0});var r=z(a);t=f(r,"IMG",{src:!0,alt:!0,class:!0,style:!0}),r.forEach(d),this.h()},h(){g(t.src,i=s[2])||m(t,"src",i),m(t,"alt","cover"),m(t,"class",n="mx-auto "+(s[1]?"md:w-11/12":"")),p(t,"view-transition-name","testing-"+s[0].id),m(a,"class",o=s[1]?"cursor-zoom-out":"cursor-zoom-in")},m(e,r){v(e,a,r),b(a,t),l||(u=w(a,"click",s[3]),l=!0)},p(e,[r]){r&4&&!g(t.src,i=e[2])&&m(t,"src",i),r&2&&n!==(n="mx-auto "+(e[1]?"md:w-11/12":""))&&m(t,"class",n),r&1&&p(t,"view-transition-name","testing-"+e[0].id),r&2&&o!==(o=e[1]?"cursor-zoom-out":"cursor-zoom-in")&&m(a,"class",o)},i:_,o:_,d(e){e&&d(a),l=!1,u()}}}function T(s,a,t){let i,n;S(s,q,e=>t(4,n=e));let{data:o}=a,l=!!n.url.searchParams.get("zoom");B(()=>{t(1,l=!!n.url.searchParams.get("zoom"))});function u(){let e=`/story/${o.id}/cover${l?"":"?zoom=true"}`;P(e,{noScroll:!0,replaceState:!0})}return s.$$set=e=>{"data"in e&&t(0,o=e.data)},s.$$.update=()=>{s.$$.dirty&1&&t(2,i=o.imageUrl)},[o,l,i,u]}class E extends k{constructor(a){super(),y(this,a,T,N,h,{data:0})}}export{E as component};
