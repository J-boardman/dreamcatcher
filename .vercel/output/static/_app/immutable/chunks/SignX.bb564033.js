import{s as L,o as F,e as R,i as h,d as m,O as D,x as T,y as I,a as N,c as O,f as V,g as X,h as q,r as H,u as M}from"./scheduler.3b07f987.js";import{S as P,i as b,a as c,g as j,t as f,c as z,b as d,d as g,m as _,e as p}from"./index.c72e2f07.js";import{g as w}from"./navigation.c51359bf.js";import"./index.b07aa697.js";import{S as B,c as G}from"./SignedOut.b4665ed0.js";import{C as J,S as K}from"./SignedIn.0348b39f.js";function Q(o,t,s){let{to:e="/"}=t;return F(()=>{w(e)}),o.$$set=n=>{"to"in n&&s(0,e=n.to)},[e]}class W extends P{constructor(t){super(),b(this,t,Q,null,L,{to:0})}}function A(o){let t,s;return t=new J({props:{$$slots:{default:[v,({clerk:e})=>({10:e}),({clerk:e})=>e?1024:0]},$$scope:{ctx:o}}}),{c(){d(t.$$.fragment)},l(e){g(t.$$.fragment,e)},m(e,n){_(t,e,n),s=!0},p(e,n){const r={};n&3127&&(r.$$scope={dirty:n,ctx:e}),t.$set(r)},i(e){s||(c(t.$$.fragment,e),s=!0)},o(e){f(t.$$.fragment,e),s=!1},d(e){p(t,e)}}}function Y(o){let t,s;return t=new W({props:{to:o[4]}}),{c(){d(t.$$.fragment)},l(e){g(t.$$.fragment,e)},m(e,n){_(t,e,n),s=!0},p(e,n){const r={};n&16&&(r.to=e[4]),t.$set(r)},i(e){s||(c(t.$$.fragment,e),s=!0)},o(e){f(t.$$.fragment,e),s=!1},d(e){p(t,e)}}}function Z(o){let t,s,e,n;return{c(){t=V("div")},l(r){t=X(r,"DIV",{}),q(t).forEach(m)},m(r,a){h(r,t,a),e||(n=H(s=G.call(null,t,{clerk:o[10],componentType:o[1],props:{...o[5],redirectUrl:o[2],[o[0]]:null}})),e=!0)},p(r,a){s&&M(s.update)&&a&1063&&s.update.call(null,{clerk:r[10],componentType:r[1],props:{...r[5],redirectUrl:r[2],[r[0]]:null}})},d(r){r&&m(t),e=!1,n()}}}function v(o){let t,s,e,n;return t=new K({props:{$$slots:{default:[Y]},$$scope:{ctx:o}}}),e=new B({props:{$$slots:{default:[Z]},$$scope:{ctx:o}}}),{c(){d(t.$$.fragment),s=N(),d(e.$$.fragment)},l(r){g(t.$$.fragment,r),s=O(r),g(e.$$.fragment,r)},m(r,a){_(t,r,a),h(r,s,a),_(e,r,a),n=!0},p(r,a){const u={};a&2064&&(u.$$scope={dirty:a,ctx:r}),t.$set(u);const i={};a&3111&&(i.$$scope={dirty:a,ctx:r}),e.$set(i)},i(r){n||(c(t.$$.fragment,r),c(e.$$.fragment,r),n=!0)},o(r){f(t.$$.fragment,r),f(e.$$.fragment,r),n=!1},d(r){r&&m(s),p(t,r),p(e,r)}}}function x(o){let t,s,e=o[3]&&A(o);return{c(){e&&e.c(),t=R()},l(n){e&&e.l(n),t=R()},m(n,r){e&&e.m(n,r),h(n,t,r),s=!0},p(n,[r]){n[3]?e?(e.p(n,r),r&8&&c(e,1)):(e=A(n),e.c(),c(e,1),e.m(t.parentNode,t)):e&&(j(),f(e,1,1,()=>{e=null}),z())},i(n){s||(c(e),s=!0)},o(n){f(e),s=!1},d(n){n&&m(t),e&&e.d(n)}}}const ee=5e3,$="redirectAfterAuth",U="redirectUrl",C="clerk-sveltekit:user";function te(o,t,s){let e,n,{x:r="in"}=t,a="SignIn",u=n,i=!1,S,k=!1;function y(l){const E=()=>{k||(k=!0,document.removeEventListener(C,E),clearTimeout(S),w(l))};document.addEventListener(C,E)}return D(()=>{const l=new URL(window.location.toString());s(4,n=l.searchParams.get(U)??n),i||(l.searchParams.get(U)??t.redirectUrl,l.searchParams.has($)?(y(l.searchParams.get($)??"/"),S=setTimeout(()=>s(3,i=!0),ee)):s(3,i=!0),l.searchParams.delete(U),l.searchParams.set($,n),s(2,u=l.toString()))}),o.$$set=l=>{s(5,t=T(T({},t),I(l))),"x"in l&&s(6,r=l.x)},o.$$.update=()=>{o.$$.dirty&64&&s(0,e=r==="in"?"afterSignInUrl":"afterSignUpUrl"),o.$$.dirty&64&&s(1,a=r==="in"?"SignIn":"SignUp"),s(4,n=t.redirectUrl||t[e]||"/")},t=I(t),[e,a,u,i,n,t,r]}class ie extends P{constructor(t){super(),b(this,t,te,x,L,{x:6})}}export{ie as S};
