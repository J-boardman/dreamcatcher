var z=Object.defineProperty;var F=(t,e,n)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(F(t,typeof e!="symbol"?e+"":e,n),n);function H(){}function R(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t()}function ot(){return Object.create(null)}function J(t){t.forEach(W)}function K(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function A(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function k(t){return t.split(",").map(e=>e.trim().split(" ").filter(Boolean))}function at(t,e){const n=k(t.srcset),i=k(e||"");return i.length===n.length&&i.every(([s,c],r)=>c===n[r][1]&&(A(n[r][0],s)||A(s,n[r][0])))}function ft(t){return Object.keys(t).length===0}function P(t,...e){if(t==null){for(const i of e)i(void 0);return H}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t){let e;return P(t,n=>e=n)(),e}function ht(t,e,n){t.$$.on_destroy.push(P(e,n))}function dt(t,e,n,i){if(t){const s=S(t,e,n,i);return t[0](s)}}function S(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)c[o]=e.dirty[o]|s[o];return c}return e.dirty|s}return e.dirty}function pt(t,e,n,i,s,c){if(s){const r=S(e,n,i,c);t.p(r,s)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function bt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function xt(t,e,n){return t.set(n),e}function vt(t){return t&&K(t.destroy)?t.destroy:H}let g=!1;function wt(){g=!0}function Et(){g=!1}function Q(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&l.push(a)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,a=(s>0&&e[n[s]].claim_order<=u?s+1:Q(1,s,U=>e[n[U]].claim_order,u))-1;i[l]=n[a]+1;const N=a+1;n[N]=l,s=Math.max(N,s)}const c=[],r=[];let o=e.length-1;for(let l=n[s]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);c.reverse(),r.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<r.length;l++){for(;u<c.length&&r[l].claim_order>=c[u].claim_order;)u++;const a=u<c.length?c[u]:null;t.insertBefore(r[l],a)}}function X(t,e){if(g){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Y(t,e,n){t.insertBefore(e,n||null)}function Z(t,e,n){g&&!n?X(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function w(t){t.parentNode&&t.parentNode.removeChild(t)}function Tt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function C(t){return document.createElement(t)}function O(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function Nt(){return T(" ")}function At(){return T("")}function kt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function q(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function Lt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&$.indexOf(i)===-1?t[i]=e[i]:q(t,i,e[i])}function Mt(t,e){for(const n in e)q(t,n,e[n])}function jt(t){return t.dataset.svelteH}function Ht(t){return Array.from(t.childNodes)}function B(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,s=!1){B(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const l=n(o);return l===void 0?t.splice(r,1):t[r]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function G(t,e,n,i){return D(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||c.push(o.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Pt(t,e,n){return G(t,e,n,C)}function St(t,e,n){return G(t,e,n,O)}function tt(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>T(e),!0)}function Ct(t){return tt(t," ")}function L(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Ot(t,e){const n=L(t,"HTML_TAG_START",0),i=L(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new b(e);B(t);const s=t.splice(n,i-n+1);w(s[0]),w(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new b(e);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new b(e,c)}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Bt(t,e){t.value=e??""}function Dt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Gt(t,e,n){t.classList.toggle(e,!!n)}function et(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class nt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=O(n.nodeName):this.e=C(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Y(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(w)}}class b extends nt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Z(this.t,this.n[i],n)}}function It(t,e){return new t(e)}let y;function x(t){y=t}function _(){if(!y)throw new Error("Function called outside component initialization");return y}function Ut(t){_().$$.before_update.push(t)}function zt(t){_().$$.on_mount.push(t)}function Ft(t){_().$$.after_update.push(t)}function Rt(t){_().$$.on_destroy.push(t)}function Wt(){const t=_();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=et(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function Jt(t,e){return _().$$.context.set(t,e),e}function Kt(t){return _().$$.context.get(t)}const m=[],M=[];let d=[];const j=[],I=Promise.resolve();let E=!1;function it(){E||(E=!0,I.then(rt))}function Qt(){return it(),I}function st(t){d.push(t)}const v=new Set;let h=0;function rt(){if(h!==0)return;const t=y;do{try{for(;h<m.length;){const e=m[h];h++,x(e),lt(e.$$)}}catch(e){throw m.length=0,h=0,e}for(x(null),m.length=0,h=0;M.length;)M.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];v.has(n)||(v.add(n),n())}d.length=0}while(m.length);for(;j.length;)j.pop()();E=!1,v.clear(),x(t)}function lt(t){if(t.fragment!==null){t.update(),J(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(st)}}function Vt(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{P as $,X as A,Tt as B,at as C,jt as D,dt as E,pt as F,yt as G,mt as H,O as I,b as J,St as K,Ot as L,Mt as M,_t as N,Ut as O,Rt as P,Jt as Q,Lt as R,kt as S,bt as T,Bt as U,J as V,st as W,Gt as X,xt as Y,Kt as Z,Wt as _,Nt as a,ot as a0,rt as a1,ft as a2,Vt as a3,y as a4,x as a5,W as a6,m as a7,it as a8,wt as a9,Et as aa,Ft as b,Ct as c,w as d,At as e,C as f,Pt as g,Ht as h,Z as i,q as j,Dt as k,T as l,tt as m,qt as n,zt as o,M as p,It as q,vt as r,ut as s,Qt as t,K as u,H as v,ht as w,R as x,gt as y,A as z};
