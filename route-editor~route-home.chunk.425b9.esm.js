(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"H/LE":function(t,e,r){"use strict";function o(t,e=17,r=400){const o=t.replace(/(?![^\n]{1,20}$)([^\n]{1,20})\s/g,"$1\n").split("\n");return{lines:o,width:Math.max(...o.map((t=>function(t,e=17,r=400){return n.font=`${r} ${e}px Roboto, sans-serif `,n.measureText(t).width}(t,e,r))))}}r.d(e,"a",(function(){return o}));const n=document.createElement("canvas").getContext("2d")},QRet:function(t,e,r){"use strict";function o(t,e){_.options.__h&&_.options.__h(p,t,x||e),x=0;var r=p.__H||(p.__H={__:[],__h:[]});return t>=r.__.length&&r.__.push({}),r.__[t]}function n(t){return x=1,function(t,e,r){var n=o(b++,2);return n.t=t,n.__c||(n.__=[r?r(e):g(void 0,e),function(t){var e=n.t(n.__[0],t);n.__[0]!==e&&(n.__=[e,n.__[1]],n.__c.setState({}))}],n.__c=p),n.__}(g,t)}function i(t,e){var r=o(b++,3);!_.options.__s&&u(r.__H,e)&&(r.__=t,r.__H=e,p.__H.__h.push(r))}function c(t){return x=5,s((function(){return{current:t}}),[])}function s(t,e){var r=o(b++,7);return u(r.__H,e)&&(r.__=t(),r.__H=e,r.__h=t),r.__}function l(t){var e=p.context[t.__c],r=o(b++,9);return r.c=t,e?(null==r.__&&(r.__=!0,e.sub(p)),e.props.value):t.__}function a(){for(var t;t=v.shift();)if(t.__P)try{t.__H.__h.forEach(h),t.__H.__h.forEach(f),t.__H.__h=[]}catch(e){t.__H.__h=[],_.options.__e(e,t.__v)}}function h(t){var e=p,r=t.__c;"function"==typeof r&&(t.__c=void 0,r()),p=e}function f(t){var e=p;t.__c=t.__(),p=e}function u(t,e){return!t||t.length!==e.length||e.some((function(e,r){return e!==t[r]}))}function g(t,e){return"function"==typeof e?e(t):e}r.d(e,"d",(function(){return n})),r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return c})),r.d(e,"a",(function(){return l}));var b,p,d,_=r("hosL"),x=0,v=[],w=_.options.__b,m=_.options.__r,y=_.options.diffed,k=_.options.__c,O=_.options.unmount;_.options.__b=function(t){p=null,w&&w(t)},_.options.__r=function(t){m&&m(t),b=0;var e=(p=t.__c).__H;e&&(e.__h.forEach(h),e.__h.forEach(f),e.__h=[])},_.options.diffed=function(t){y&&y(t);var e=t.__c;e&&e.__H&&e.__H.__h.length&&(1!==v.push(e)&&d===_.options.requestAnimationFrame||((d=_.options.requestAnimationFrame)||function(t){var e,r=function(){clearTimeout(o),j&&cancelAnimationFrame(e),setTimeout(t)},o=setTimeout(r,100);j&&(e=requestAnimationFrame(r))})(a)),p=null},_.options.__c=function(t,e){e.some((function(t){try{t.__h.forEach(h),t.__h=t.__h.filter((function(t){return!t.__||f(t)}))}catch(r){e.some((function(t){t.__h&&(t.__h=[])})),e=[],_.options.__e(r,t.__v)}})),k&&k(t,e)},_.options.unmount=function(t){O&&O(t);var e,r=t.__c;r&&r.__H&&(r.__H.__.forEach((function(t){try{h(t)}catch(t){e=t}})),e&&_.options.__e(e,r.__v))};var j="function"==typeof requestAnimationFrame},lHvK:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function n(t){0===t.cs?(t.el=t,t.er=t,t.msel=t.mser=0):(t.el=t.c[0].el,t.msel=t.c[0].msel,t.er=t.c[t.cs-1].er,t.mser=t.c[t.cs-1].mser)}function i(t){return t.y+t.h}function c(t,e,r){for(;null!==r&&t>=r.lowY;)r=r.next;return new k(t,e,r)}function s(t,e,r,o){t.c[e].mod+=o,t.c[e].msel+=o,t.c[e].mser+=o,function(t,e,r,o){if(r!==e-1){const n=e-r;t.c[r+1].shift+=o/n,t.c[e].shift-=o/n,t.c[e].change-=o-o/n}}(t,e,r,o)}function l(t){return 0===t.cs?t.tl:t.c[0]}function a(t){return 0===t.cs?t.tr:t.c[t.cs-1]}function h(t,e,r){let o=t.c[e-1],n=o.mod,c=t.c[e],h=c.mod;for(;null!==o&&null!==c;){i(o)>r.lowY&&(r=r.next);const f=n+o.prelim+o.w-(h+c.prelim);f>0&&(h+=f,s(t,e,r.index,f));const u=i(o),g=i(c);u<=g&&(o=a(o),null!==o&&(n+=o.mod)),u>=g&&(c=l(c),null!==c&&(h+=c.mod))}null===o&&null!==c?function(t,e,r,o){const n=t.c[0].el;n.tl=r;const i=o-r.mod-t.c[0].msel;n.mod+=i,n.prelim-=i,t.c[0].el=t.c[e].el,t.c[0].msel=t.c[e].msel}(t,e,c,h):null!==o&&null===c&&function(t,e,r,o){const n=t.c[e].er;n.tr=r;const i=o-r.mod-t.c[e].mser;n.mod+=i,n.prelim-=i,t.c[e].er=t.c[e-1].er,t.c[e].mser=t.c[e-1].mser}(t,e,o,n)}function f(t){if(0===t.cs)return void n(t);f(t.c[0]);let e=c(i(t.c[0].el),0,null);for(let r=1;r<t.cs;r++){f(t.c[r]);const o=i(t.c[r].er);h(t,r,e),e=c(o,r,e)}!function(t){t.prelim=(t.c[0].prelim+t.c[0].mod+t.c[t.cs-1].mod+t.c[t.cs-1].prelim+t.c[t.cs-1].w)/2-t.w/2}(t),n(t)}function u(t,e){t.x=t.prelim+(e+=t.mod),function(t){let e=0,r=0;for(let o=0;o<t.cs;o++)e+=t.c[o].shift,r+=e+t.c[o].change,t.c[o].mod+=r}(t);for(let r=0;r<t.cs;r++)u(t.c[r],e)}function g(t){f(t),u(t,0)}function b(){return b=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},b.apply(this,arguments)}function p(){return p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},p.apply(this,arguments)}function d(t,e){if(null==t)return{};var r,o,n=function(t,e){if(null==t)return{};var r,o,n={},i=Object.keys(t);for(o=0;o<i.length;o++)e.indexOf(r=i[o])>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)e.indexOf(r=i[o])>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function _(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?_(Object(r),!0).forEach((function(e){v(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function v(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var w=r("hosL"),m=r("H/LE");class y{constructor(t,e,r,n,i=!1){this.w=t,this.h=e,this.y=r,this.children=n,this.ignore=i,o(this,"c",void 0),o(this,"cs",void 0),o(this,"x",0),o(this,"prelim",0),o(this,"mod",0),o(this,"shift",0),o(this,"change",0),o(this,"tl",null),o(this,"tr",null),o(this,"el",null),o(this,"er",null),o(this,"msel",0),o(this,"mser",0),this.c=n.filter((t=>!t.ignore)),this.cs=this.c.length}}y||(y={});class k{constructor(t,e,r){this.lowY=t,this.index=e,this.next=r}}var O=new class{constructor(t){this.bb=t}layout(t){const e=this.convert(t);return g(e),this.assignCoordinates(e,t),t}convert(t,e=16){const r=t.children.filter((t=>"note"===t.type)),o=Object(m.a)(t.text,17,600),n=Math.max(...r.map((t=>Object(m.a)(t.text).width+20)),o.width+78,Object(m.a)("New item...",17,600).width+78)+34,i=19*(r.length+(o.lines.length||1))+24;b(t,{width:n,height:i});const{width:c,height:s}=this.bb.addBoundingBox(n,i);return new y(c,s,e,t.children.map((t=>this.convert(t,e+s))),"note"===t.type)}assignCoordinates(t,e){b(e,this.bb.removeBoundingBox(t.x,t.y));const r=e.children;for(let e=0;e<r.length;e++)this.assignCoordinates(t.children[e],r[e])}}(new class{constructor(t,e){this.gap=t,this.bottomPadding=e,this.gap=t,this.bottomPadding=e}addBoundingBox(t,e){return{width:t+this.gap,height:e+this.bottomPadding}}removeBoundingBox(t,e){return{x:t+this.gap/2,y:e}}}(80,80)),j=r("KpmI"),P=r("QRet");const F=["onClose"],H=[];for(let t=0,e=0;e<3;e++){H[e]=[];for(let r=0;r<3;r++)H[e][r]=[++t,++t,++t,++t]}var C=t=>{let{onClose:e}=t,r=d(t,F);const[o,n]=Object(P.d)(0),i=Object(P.c)(null);return Object(P.b)((()=>{const t=i.current.children,e=new IntersectionObserver((e=>{const r=e.find((t=>t.isIntersecting));if(r)for(let e=0;;e++)if(t[e]===r.target){n(e);break}}),{root:i.current,rootMargin:"0px",threshold:.75});for(let r=0;r<t.length;r++)e.observe(t[r]);return()=>{e.disconnect()}})),Object(w.h)("div",p({class:"color-picker"},r),Object(w.h)("h4",null,"Color Picker",Object(w.h)("span",{class:"material-icons-round",style:"float: right;"},Object(w.h)("span",{onClick:()=>{o&&i.current.children[o-1].scrollIntoView({behavior:"smooth"})},style:{opacity:o?1:.5}},"arrow_back_ios"),Object(w.h)("span",{onClick:()=>{o<H.length&&i.current.children[o+1].scrollIntoView({behavior:"smooth"})},style:{opacity:o<2?1:.5}},"arrow_forward_ios"))),Object(w.h)("div",{class:"swipe-view",ref:i},H.map(((t,r)=>Object(w.h)("section",{key:r,onClick:t=>{t.target instanceof HTMLTableCellElement&&e(t.target.className)}},Object(w.h)("table",null,t.map(((t,e)=>Object(w.h)("tr",{key:e},t.map(((t,e)=>Object(w.h)("td",{key:e,class:`color-${t}`}))))))))))),Object(w.h)("nav",null,H.map(((t,e)=>Object(w.h)("button",{style:{opacity:e===o?1:.5},title:`Page ${e+1}`,onClick:()=>{i.current.children[e].scrollIntoView({behavior:"smooth"})},key:e})))),Object(w.h)("h5",null,Object(w.h)("span",{onClick:()=>e(),style:"cursor: pointer;"},"Close")))};const E=(t,e)=>{const[r,o]=e.children.reduce(E,t);return[Math.max(r,e.x+e.width),Math.max(o,e.y+e.height)]};e.a=({zoom:t=1,tree:e,readonly:r})=>{const[o,n]=Object(P.d)(null),i=Object(P.a)(j.a),c=(t,e,s)=>{const l=t.children.filter((t=>"note"===t.type)),a=t.children.filter((t=>"note"!==t.type)),{lines:h}=Object(m.a)(t.text);return Object(w.h)("g",{class:t.type,key:e},a.map((e=>{const r=[[t.x+t.width/2,t.y+t.height-4],[t.x+t.width/2,t.y+t.height+20],[e.x+e.width/2,e.y-32],[e.x+e.width/2,e.y-12],[e.x+e.width/2+8,e.y-20],[e.x+e.width/2,e.y-12],[e.x+e.width/2-8,e.y-20]],o=r.map((t=>t.map((t=>t.toString(16))).join("_"))).join("-");return Object(w.h)(w.Fragment,{key:o},Object(w.h)("linearGradient",{id:o,x1:"0%",y1:"0%",x2:"0%",y2:"100%"},Object(w.h)("stop",{offset:"0%",class:t.type}),Object(w.h)("stop",{offset:"100%",class:e.type})),Object(w.h)("polyline",{points:r.join(" "),stroke:`url(#${o})`,fill:"none","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"}))})),Object(w.h)("g",{class:"item"},Object(w.h)("rect",{height:t.height,width:t.width,x:t.x,y:t.y,rx:6}),r?Object(w.h)("text",{x:t.x+12,y:t.y+12},t.text):Object(w.h)(w.Fragment,null,Object(w.h)("foreignObject",{width:t.width-24,x:t.x+12,y:t.y+12,height:19*h.length,overflow:"visible"},Object(w.h)("textarea",{value:h.join("\n"),placeholder:"New item...",onInput:e=>{i.change(((r,o)=>o===t?x(x({},t),{},{text:e.currentTarget.value}):"width"!==r&&"height"!==r&&"x"!==r&&"y"!==r?o:void 0))}})),Object(w.h)("text",{fill:"#FFF",role:"hidden",stroke:"none",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging"},"invert_colors"),Object(w.h)("text",{"fill-opacity":"0.5",role:"button",stroke:"none",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging",onClick:()=>n(o===t?null:t)},"invert_colors"),Object(w.h)("text",{fill:"#FFF",stroke:"none",role:"hidden",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging",dx:34},"add"),Object(w.h)("text",{"fill-opacity":"0.5",stroke:"none",role:"button",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging",dx:34,onClick:e=>{null==e||e.preventDefault(),i.change(((e,r)=>{if("width"!==e&&"height"!==e&&"x"!==e&&"y"!==e)return r===t?x(x({},t),{},{children:[...t.children,{text:"",type:`color-${Math.floor(36*Math.random())+1}`,children:[]}]}):r}))}},"add"),Object(w.h)("text",{fill:"#FFF",stroke:"none",role:"hidden",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging",dx:68},"delete_forever"),Object(w.h)("text",{"fill-opacity":"0.5",stroke:"none",role:"button",x:t.x+t.width-102,y:t.y+14,class:"material-icons-round","text-anchor":"start","dominant-baseline":"hanging",dx:68,onClick:()=>{i.change(((e,r)=>{if("width"!==e&&"height"!==e&&"x"!==e&&"y"!==e)return r.children&&r.children.includes(t)?x(x({},r),{},{children:s.filter((e=>e!==t))}):r}))}},"delete_forever")),l.map(((e,o)=>Object(w.h)(w.Fragment,{key:o},r?Object(w.h)("text",{x:t.x+32,y:t.y+24+19*(o+1)},e.text):Object(w.h)("foreignObject",{x:t.x+32,y:t.y+24+19*(o+1),width:t.width-32,height:19,style:"transform: translateY(-0.25em);"},Object(w.h)("textarea",{value:e.text,onInput:t=>i.change(((r,o)=>{if("width"!==r&&"height"!==r&&"x"!==r&&"y"!==r)return o===e?x(x({},e),{},{text:t.currentTarget.value}):o})),placeholder:"New item..."})),Object(w.h)("circle",{fill:"#FFF",stroke:"none",r:3,cx:t.x+20,cy:t.y+48+19*o}))))),a.map(c))},s=O.layout(e),[l,a]=E([0,0],s);return r?Object(w.h)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"tree",viewBox:`0 0 ${l+92} ${a+92}`},c(s,0,[s]),"standalone"===r&&Object(w.h)("style",null,"div.wrapper{margin:auto}svg.tree *{stop-color:inherit}svg.tree .color-1{fill:#4f6ba2;stroke:rgba(79,107,162,.4);stop-color:rgba(79,107,162,.6);stroke-width:12px}svg.tree .color-2{fill:#4f7aa2;stroke:rgba(79,122,162,.4);stop-color:rgba(79,122,162,.6);stroke-width:12px}svg.tree .color-3{fill:#4f84a2;stroke:rgba(79,132,162,.4);stop-color:rgba(79,132,162,.6);stroke-width:12px}svg.tree .color-4{fill:#4f93a2;stroke:rgba(79,147,162,.4);stop-color:rgba(79,147,162,.6);stroke-width:12px}svg.tree .color-5{fill:#4f9da2;stroke:rgba(79,157,162,.4);stop-color:rgba(79,157,162,.6);stroke-width:12px}svg.tree .color-6{fill:#4fa25c;stroke:rgba(79,162,92,.4);stop-color:rgba(79,162,92,.6);stroke-width:12px}svg.tree .color-7{fill:#4fa270;stroke:rgba(79,162,112,.4);stop-color:rgba(79,162,112,.6);stroke-width:12px}svg.tree .color-8{fill:#4fa27a;stroke:rgba(79,162,122,.4);stop-color:rgba(79,162,122,.6);stroke-width:12px}svg.tree .color-9{fill:#4fa28e;stroke:rgba(79,162,142,.4);stop-color:rgba(79,162,142,.6);stroke-width:12px}svg.tree .color-10{fill:#4fa29d;stroke:rgba(79,162,157,.4);stop-color:rgba(79,162,157,.6);stroke-width:12px}svg.tree .color-11{fill:#51a24f;stroke:rgba(81,162,79,.4);stop-color:rgba(81,162,79,.6);stroke-width:12px}svg.tree .color-12{fill:#696cb6;stroke:rgba(105,108,182,.4);stop-color:rgba(105,108,182,.6);stroke-width:12px}svg.tree .color-13{fill:#6c7ebd;stroke:rgba(108,126,189,.4);stop-color:rgba(108,126,189,.6);stroke-width:12px}svg.tree .color-14{fill:#6fa24f;stroke:rgba(111,162,79,.4);stop-color:rgba(111,162,79,.6);stroke-width:12px}svg.tree .color-15{fill:#7469b6;stroke:rgba(116,105,182,.4);stop-color:rgba(116,105,182,.6);stroke-width:12px}svg.tree .color-16{fill:#7d4fa2;stroke:rgba(125,79,162,.4);stop-color:rgba(125,79,162,.6);stroke-width:12px}svg.tree .color-17{fill:#8269b6;stroke:rgba(130,105,182,.4);stop-color:rgba(130,105,182,.6);stroke-width:12px}svg.tree .color-18{fill:#82a24f;stroke:rgba(130,162,79,.4);stop-color:rgba(130,162,79,.6);stroke-width:12px}svg.tree .color-19{fill:#8c4fa2;stroke:rgba(140,79,162,.4);stop-color:rgba(140,79,162,.6);stroke-width:12px}svg.tree .color-20{fill:#9b4fa2;stroke:rgba(155,79,162,.4);stop-color:rgba(155,79,162,.6);stroke-width:12px}svg.tree .color-21{fill:#9ba24f;stroke:rgba(155,162,79,.4);stop-color:rgba(155,162,79,.6);stroke-width:12px}svg.tree .color-22{fill:#a24f4f;stroke:rgba(162,79,79,.4);stop-color:rgba(162,79,79,.6);stroke-width:12px}svg.tree .color-23{fill:#a24f6d;stroke:rgba(162,79,109,.4);stop-color:rgba(162,79,109,.6);stroke-width:12px}svg.tree .color-24{fill:#a24f7c;stroke:rgba(162,79,124,.4);stop-color:rgba(162,79,124,.6);stroke-width:12px}svg.tree .color-25{fill:#a24f8b;stroke:rgba(162,79,139,.4);stop-color:rgba(162,79,139,.6);stroke-width:12px}svg.tree .color-26{fill:#a24f9a;stroke:rgba(162,79,154,.4);stop-color:rgba(162,79,154,.6);stroke-width:12px}svg.tree .color-27{fill:#a2544f;stroke:rgba(162,84,79,.4);stop-color:rgba(162,84,79,.6);stroke-width:12px}svg.tree .color-28{fill:#a25e4f;stroke:rgba(162,94,79,.4);stop-color:rgba(162,94,79,.6);stroke-width:12px}svg.tree .color-29{fill:#a2634f;stroke:rgba(162,99,79,.4);stop-color:rgba(162,99,79,.6);stroke-width:12px}svg.tree .color-30{fill:#a26d4f;stroke:rgba(162,109,79,.4);stop-color:rgba(162,109,79,.6);stroke-width:12px}svg.tree .color-31{fill:#a2724f;stroke:rgba(162,114,79,.4);stop-color:rgba(162,114,79,.6);stroke-width:12px}svg.tree .color-32{fill:#a2814f;stroke:rgba(162,129,79,.4);stop-color:rgba(162,129,79,.6);stroke-width:12px}svg.tree .color-33{fill:#a2904f;stroke:rgba(162,144,79,.4);stop-color:rgba(162,144,79,.6);stroke-width:12px}svg.tree .color-34{fill:#a29a4f;stroke:rgba(162,154,79,.4);stop-color:rgba(162,154,79,.6);stroke-width:12px}svg.tree .color-35{fill:#ac5454;stroke:rgba(172,84,84,.4);stop-color:rgba(172,84,84,.6);stroke-width:12px}svg.tree .color-36{fill:#ac545f;stroke:rgba(172,84,95,.4);stop-color:rgba(172,84,95,.6);stroke-width:12px}svg.tree .color-37{fill:#c3b424;stroke:rgba(195,180,36,.4);stop-color:rgba(195,180,36,.6);stroke-width:12px}svg.tree .heading{fill:#5e4fa2;stop-color:rgba(94,79,162,.6)}svg.tree text{dominant-baseline:hanging;fill:#fff;stroke:none}svg.tree foreignObject>textarea{all:unset;width:100%;height:100%;font-weight:600;font-family:inherit;display:inline;color:#fff}:not(.thumbnail) svg.tree{overflow:visible}svg.tree .material-icons-round{user-select:none}svg.tree [role=button]{cursor:pointer}")):Object(w.h)("div",{style:{width:(l+318)*t,height:(a+321)*t},class:"wrapper"},Object(w.h)("svg",{class:"tree",viewBox:`0 0 ${(l+318)/t} ${(a+321)/t}`,width:l+318,height:a+321},c(s,0,[s]),o&&Object(w.h)("foreignObject",{x:o.x+o.width,y:o.y,width:1,height:1,overflow:"visible"},Object(w.h)(C,{onClose:t=>{t&&i.change(((e,r)=>r===o?x(x({},r),{},{type:t}):"width"!==e&&"height"!==e&&"x"!==e&&"y"!==e?r:void 0)),n(null)}}))))}},z75s:function(t,e,r){"use strict";function o(){return o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},o.apply(this,arguments)}function n(t,e){if(null==t)return{};var r,o,n=function(t,e){if(null==t)return{};var r,o,n={},i=Object.keys(t);for(o=0;o<i.length;o++)e.indexOf(r=i[o])>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)e.indexOf(r=i[o])>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var i=r("hosL");const c=["name","color","style"],s=t=>{let{name:e,color:r,style:s=""}=t,l=n(t,c);return Object(i.h)("span",o({style:{color:r},class:"material-icons"+(s&&"-"+s)},l),e)};s||(s={}),e.a=s}}]);
//# sourceMappingURL=route-editor~route-home.chunk.425b9.esm.js.map