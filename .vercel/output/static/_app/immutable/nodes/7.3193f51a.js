import{s as se,f as p,a as E,l as A,g as v,h as $,c as T,d as _,m as F,D as xe,j as h,i as J,A as d,S as W,n as De,p as Ne,v as ne,z as ge,B as Ee,o as Te,U as pe}from"../chunks/scheduler.3b07f987.js";import{S as oe,i as ie,b as O,d as V,m as U,g as Ie,t as N,c as ke,a as k,e as B}from"../chunks/index.c72e2f07.js";import{T as je,e as ve}from"../chunks/Title.49fc599e.js";import{g as ye,a as Se}from"../chunks/navigation.c51359bf.js";import{u as Ce,c as Je,r as Oe}from"../chunks/journal.b7415717.js";import"../chunks/singletons.fa76c5dc.js";import{C as Ve}from"../chunks/CldImage.d1cd99bf.js";import{I as Ue,B as Be}from"../chunks/BottomActions.a1fe9458.js";import{C as Me}from"../chunks/create.64ec9803.js";function Pe(i){let e,l;return e=new Ue({props:{message:"No image"}}),{c(){O(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,s){U(e,t,s),l=!0},p:ne,i(t){l||(k(e.$$.fragment,t),l=!0)},o(t){N(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Ae(i){let e,l,t,s;return{c(){e=p("img"),this.h()},l(r){e=v(r,"IMG",{src:!0,alt:!0}),this.h()},h(){var r,c;ge(e.src,l=(c=(r=i[0])==null?void 0:r.image)==null?void 0:c.url)||h(e,"src",l),h(e,"alt","cover")},m(r,c){J(r,e,c),t||(s=W(e,"error",i[3]),t=!0)},p(r,c){var n,o;c&1&&!ge(e.src,l=(o=(n=r[0])==null?void 0:n.image)==null?void 0:o.url)&&h(e,"src",l)},i:ne,o:ne,d(r){r&&_(e),t=!1,s()}}}function Fe(i){let e,l;return e=new Ve({props:{src:i[0].finalImageUrl,width:400,height:600}}),{c(){O(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,s){U(e,t,s),l=!0},p(t,s){const r={};s&1&&(r.src=t[0].finalImageUrl),e.$set(r)},i(t){l||(k(e.$$.fragment,t),l=!0)},o(t){N(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function $e(i){var r;let e,l,t=Intl.DateTimeFormat("en-au",{dateStyle:"long"}).format(new Date((r=i[0])==null?void 0:r.created))+"",s;return{c(){e=p("p"),l=A("Created: "),s=A(t)},l(c){e=v(c,"P",{});var n=$(e);l=F(n,"Created: "),s=F(n,t),n.forEach(_)},m(c,n){J(c,e,n),d(e,l),d(e,s)},p(c,n){var o;n&1&&t!==(t=Intl.DateTimeFormat("en-au",{dateStyle:"long"}).format(new Date((o=c[0])==null?void 0:o.created))+"")&&De(s,t)},d(c){c&&_(e)}}}function qe(i){var me,he;let e,l,t,s,r,c,n,o,a,m,f,u,w,M,q=Intl.DateTimeFormat("en-au",{dateStyle:"long"}).format(new Date((me=i[0])==null?void 0:me.lastUpdated))+"",G,X,Z,j,y,ee,H,te,S,ce="Delete",le,z,P,ae,ue;t=new je({props:{title:i[0].story.title||i[0].name||"No Title Yet",fontSize:"text-xl md:text-2xl"}});const fe=[Fe,Ae,Pe],C=[];function de(g,D){var I,x;return g[0].finalImageUrl?0:(x=(I=g[0])==null?void 0:I.image)!=null&&x.url?1:2}o=de(i),a=C[o]=fe[o](i);let b=((he=i[0])==null?void 0:he.created)&&$e(i);return{c(){e=p("div"),l=p("div"),O(t.$$.fragment),s=E(),r=p("div"),c=p("div"),n=p("div"),a.c(),m=E(),f=p("div"),u=p("div"),w=p("p"),M=A("Last updated: "),G=A(q),X=E(),b&&b.c(),Z=E(),j=p("div"),y=p("a"),ee=A("Continue"),te=E(),S=p("button"),S.textContent=ce,le=E(),z=p("div"),this.h()},l(g){e=v(g,"DIV",{class:!0});var D=$(e);l=v(D,"DIV",{class:!0});var I=$(l);V(t.$$.fragment,I),s=T(I),r=v(I,"DIV",{class:!0});var x=$(r);c=v(x,"DIV",{class:!0});var L=$(c);n=v(L,"DIV",{class:!0});var Y=$(n);a.l(Y),Y.forEach(_),L.forEach(_),m=T(x),f=v(x,"DIV",{class:!0});var K=$(f);u=v(K,"DIV",{class:!0});var Q=$(u);w=v(Q,"P",{});var re=$(w);M=F(re,"Last updated: "),G=F(re,q),re.forEach(_),X=T(Q),b&&b.l(Q),Q.forEach(_),Z=T(K),j=v(K,"DIV",{class:!0});var R=$(j);y=v(R,"A",{href:!0,class:!0});var _e=$(y);ee=F(_e,"Continue"),_e.forEach(_),te=T(R),S=v(R,"BUTTON",{class:!0,"data-svelte-h":!0}),xe(S)!=="svelte-1fbs9x7"&&(S.textContent=ce),R.forEach(_),K.forEach(_),x.forEach(_),le=T(I),z=v(I,"DIV",{class:!0}),$(z).forEach(_),I.forEach(_),D.forEach(_),this.h()},h(){h(n,"class","mask mask-squircle w-24 h-24"),h(c,"class","avatar"),h(u,"class","md:text-lg opacity-50"),h(y,"href",H="/journal/"+i[0].id),h(y,"class","btn btn-secondary btn-sm"),h(S,"class","btn btn-error btn-outline btn-sm"),h(j,"class","flex gap-3"),h(f,"class","grid gap-3"),h(r,"class","flex items-center gap-3 mt-auto"),h(z,"class","card-actions justify-end"),h(l,"class","h-full card-body flex flex-col"),h(e,"class","card card-compact card-side bg-secondary-content shadow-xl duration-300")},m(g,D){J(g,e,D),d(e,l),U(t,l,null),d(l,s),d(l,r),d(r,c),d(c,n),C[o].m(n,null),d(r,m),d(r,f),d(f,u),d(u,w),d(w,M),d(w,G),d(u,X),b&&b.m(u,null),d(f,Z),d(f,j),d(j,y),d(y,ee),d(j,te),d(j,S),d(l,le),d(l,z),i[5](e),P=!0,ae||(ue=W(S,"click",i[4]),ae=!0)},p(g,[D]){var L,Y;const I={};D&1&&(I.title=g[0].story.title||g[0].name||"No Title Yet"),t.$set(I);let x=o;o=de(g),o===x?C[o].p(g,D):(Ie(),N(C[x],1,1,()=>{C[x]=null}),ke(),a=C[o],a?a.p(g,D):(a=C[o]=fe[o](g),a.c()),k(a,1),a.m(n,null)),(!P||D&1)&&q!==(q=Intl.DateTimeFormat("en-au",{dateStyle:"long"}).format(new Date((L=g[0])==null?void 0:L.lastUpdated))+"")&&De(G,q),(Y=g[0])!=null&&Y.created?b?b.p(g,D):(b=$e(g),b.c(),b.m(u,null)):b&&(b.d(1),b=null),(!P||D&1&&H!==(H="/journal/"+g[0].id))&&h(y,"href",H)},i(g){P||(k(t.$$.fragment,g),k(a),P=!0)},o(g){N(t.$$.fragment,g),N(a),P=!1},d(g){g&&_(e),B(t),C[o].d(),b&&b.d(),i[5](null),ae=!1,ue()}}}function ze(i,e,l){let{journal:t}=e,{handleDelete:s}=e,r;const c=()=>{Ce({image:{...t.image,url:""}}),l(0,t.image.url="",t)},n=()=>{s(t.id)};function o(a){Ne[a?"unshift":"push"](()=>{r=a,l(2,r)})}return i.$$set=a=>{"journal"in a&&l(0,t=a.journal),"handleDelete"in a&&l(1,s=a.handleDelete)},[t,s,r,c,n,o]}class Le extends oe{constructor(e){super(),ie(this,e,ze,qe,se,{journal:0,handleDelete:1})}}function Ye(i){let e,l,t,s,r,c,n,o,a,m;return t=new Me({props:{class:"text-xl"}}),{c(){e=p("button"),l=p("div"),O(t.$$.fragment),s=E(),r=p("span"),c=A("New Journal"),this.h()},l(f){e=v(f,"BUTTON",{class:!0});var u=$(e);l=v(u,"DIV",{class:!0});var w=$(l);V(t.$$.fragment,w),s=T(w),r=v(w,"SPAN",{class:!0});var M=$(r);c=F(M,"New Journal"),M.forEach(_),w.forEach(_),u.forEach(_),this.h()},h(){h(r,"class",n="text-xs sm:text-sm "+(i[0]?"hidden md:flex":"")),h(l,"class","flex flex-col md:flex-row gap-1 items-center justify-center"),h(e,"class","btn btn-ghost join-item h-full")},m(f,u){J(f,e,u),d(e,l),U(t,l,null),d(l,s),d(l,r),d(r,c),o=!0,a||(m=W(e,"click",i[1]),a=!0)},p(f,[u]){(!o||u&1&&n!==(n="text-xs sm:text-sm "+(f[0]?"hidden md:flex":"")))&&h(r,"class",n)},i(f){o||(k(t.$$.fragment,f),o=!0)},o(f){N(t.$$.fragment,f),o=!1},d(f){f&&_(e),B(t),a=!1,m()}}}function Ge(i,e,l){let{hideTextOnMobile:t=!1}=e;function s(){const r=Je();ye(`/journal/${r.id}`)}return i.$$set=r=>{"hideTextOnMobile"in r&&l(0,t=r.hideTextOnMobile)},[t,s]}class He extends oe{constructor(e){super(),ie(this,e,Ge,Ye,se,{hideTextOnMobile:0,handleNewStory:1})}get handleNewStory(){return this.$$.ctx[1]}}function be(i,e,l){const t=i.slice();return t[4]=e[l],t[6]=l,t}function we(i){let e,l;return e=new Le({props:{journal:i[4],handleDelete:i[2]}}),{c(){O(e.$$.fragment)},l(t){V(e.$$.fragment,t)},m(t,s){U(e,t,s),l=!0},p(t,s){const r={};s&1&&(r.journal=t[4]),e.$set(r)},i(t){l||(k(e.$$.fragment,t),l=!0)},o(t){N(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Ke(i){let e,l,t,s,r,c,n;return s=new He({props:{hideTextOnMobile:!0}}),{c(){e=p("div"),l=p("input"),t=E(),O(s.$$.fragment),this.h()},l(o){e=v(o,"DIV",{class:!0});var a=$(e);l=v(a,"INPUT",{type:!0,class:!0,placeholder:!0}),t=T(a),V(s.$$.fragment,a),a.forEach(_),this.h()},h(){h(l,"type","text"),h(l,"class","input join-item flex-1 md:flex-none w-60 md:w-fit"),h(l,"placeholder","New Journal Name"),h(e,"class","bg-base-200 flex")},m(o,a){J(o,e,a),d(e,l),pe(l,i[1]),d(e,t),U(s,e,null),r=!0,c||(n=W(l,"input",i[3]),c=!0)},p(o,a){a&2&&l.value!==o[1]&&pe(l,o[1])},i(o){r||(k(s.$$.fragment,o),r=!0)},o(o){N(s.$$.fragment,o),r=!1},d(o){o&&_(e),B(s),c=!1,n()}}}function Qe(i){let e,l,t,s,r,c=ve([...i[0]]),n=[];for(let a=0;a<c.length;a+=1)n[a]=we(be(i,c,a));const o=a=>N(n[a],1,1,()=>{n[a]=null});return s=new Be({props:{$$slots:{default:[Ke]},$$scope:{ctx:i}}}),{c(){e=p("section"),l=p("section");for(let a=0;a<n.length;a+=1)n[a].c();t=E(),O(s.$$.fragment),this.h()},l(a){e=v(a,"SECTION",{class:!0});var m=$(e);l=v(m,"SECTION",{class:!0});var f=$(l);for(let u=0;u<n.length;u+=1)n[u].l(f);f.forEach(_),m.forEach(_),t=T(a),V(s.$$.fragment,a),this.h()},h(){h(l,"class","grid auto-rows-max sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-0"),h(e,"class","m-2 md:mx-4")},m(a,m){J(a,e,m),d(e,l);for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(l,null);J(a,t,m),U(s,a,m),r=!0},p(a,[m]){if(m&5){c=ve([...a[0]]);let u;for(u=0;u<c.length;u+=1){const w=be(a,c,u);n[u]?(n[u].p(w,m),k(n[u],1)):(n[u]=we(w),n[u].c(),k(n[u],1),n[u].m(l,null))}for(Ie(),u=c.length;u<n.length;u+=1)o(u);ke()}const f={};m&130&&(f.$$scope={dirty:m,ctx:a}),s.$set(f)},i(a){if(!r){for(let m=0;m<c.length;m+=1)k(n[m]);k(s.$$.fragment,a),r=!0}},o(a){n=n.filter(Boolean);for(let m=0;m<n.length;m+=1)N(n[m]);N(s.$$.fragment,a),r=!1},d(a){a&&(_(e),_(t)),Ee(n,a),B(s,a)}}}function Re(i,e,l){let t=[];Te(()=>{l(0,t=JSON.parse((localStorage==null?void 0:localStorage.getItem("journals"))||"[]"))}),Se(()=>{l(0,t=JSON.parse((localStorage==null?void 0:localStorage.getItem("journals"))||"[]"))});async function s(n){Oe(n),l(0,t=t.filter(o=>o.id!=n))}let r="";function c(){r=this.value,l(1,r)}return[t,r,s,c]}class st extends oe{constructor(e){super(),ie(this,e,Re,Qe,se,{})}}export{st as component};
