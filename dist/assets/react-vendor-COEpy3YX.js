function ke(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const o in n)if(o!=="default"&&!(o in e)){const a=Object.getOwnPropertyDescriptor(n,o);a&&Object.defineProperty(e,o,a.get?a:{enumerable:!0,get:()=>n[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var ur=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Be(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function cr(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var me={exports:{}},p={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J=Symbol.for("react.transitional.element"),De=Symbol.for("react.portal"),He=Symbol.for("react.fragment"),We=Symbol.for("react.strict_mode"),Fe=Symbol.for("react.profiler"),Ye=Symbol.for("react.consumer"),ze=Symbol.for("react.context"),Ke=Symbol.for("react.forward_ref"),Ge=Symbol.for("react.suspense"),Ve=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),ne=Symbol.iterator;function qe(e){return e===null||typeof e!="object"?null:(e=ne&&e[ne]||e["@@iterator"],typeof e=="function"?e:null)}var ye={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ee=Object.assign,_e={};function A(e,t,r){this.props=e,this.context=t,this.refs=_e,this.updater=r||ye}A.prototype.isReactComponent={};A.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};A.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Re(){}Re.prototype=A.prototype;function X(e,t,r){this.props=e,this.context=t,this.refs=_e,this.updater=r||ye}var Q=X.prototype=new Re;Q.constructor=X;Ee(Q,A.prototype);Q.isPureReactComponent=!0;var oe=Array.isArray,y={H:null,A:null,T:null,S:null},Ce=Object.prototype.hasOwnProperty;function Z(e,t,r,n,o,a){return r=a.ref,{$$typeof:J,type:e,key:t,ref:r!==void 0?r:null,props:a}}function Je(e,t){return Z(e.type,t,void 0,void 0,void 0,e.props)}function ee(e){return typeof e=="object"&&e!==null&&e.$$typeof===J}function Xe(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var ie=/\/+/g;function z(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Xe(""+e.key):t.toString(36)}function ae(){}function Qe(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(ae,ae):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function j(e,t,r,n,o){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"bigint":case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case J:case De:i=!0;break;case ge:return i=e._init,j(i(e._payload),t,r,n,o)}}if(i)return o=o(e),i=n===""?"."+z(e,0):n,oe(o)?(r="",i!=null&&(r=i.replace(ie,"$&/")+"/"),j(o,t,r,"",function(c){return c})):o!=null&&(ee(o)&&(o=Je(o,r+(o.key==null||e&&e.key===o.key?"":(""+o.key).replace(ie,"$&/")+"/")+i)),t.push(o)),1;i=0;var s=n===""?".":n+":";if(oe(e))for(var l=0;l<e.length;l++)n=e[l],a=s+z(n,l),i+=j(n,t,r,a,o);else if(l=qe(e),typeof l=="function")for(e=l.call(e),l=0;!(n=e.next()).done;)n=n.value,a=s+z(n,l++),i+=j(n,t,r,a,o);else if(a==="object"){if(typeof e.then=="function")return j(Qe(e),t,r,n,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return i}function D(e,t,r){if(e==null)return e;var n=[],o=0;return j(e,n,"","",function(a){return t.call(r,a,o++)}),n}function Ze(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var le=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function et(){}p.Children={map:D,forEach:function(e,t,r){D(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return D(e,function(){t++}),t},toArray:function(e){return D(e,function(t){return t})||[]},only:function(e){if(!ee(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};p.Component=A;p.Fragment=He;p.Profiler=Fe;p.PureComponent=X;p.StrictMode=We;p.Suspense=Ge;p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=y;p.act=function(){throw Error("act(...) is not supported in production builds of React.")};p.cache=function(e){return function(){return e.apply(null,arguments)}};p.cloneElement=function(e,t,r){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var n=Ee({},e.props),o=e.key,a=void 0;if(t!=null)for(i in t.ref!==void 0&&(a=void 0),t.key!==void 0&&(o=""+t.key),t)!Ce.call(t,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&t.ref===void 0||(n[i]=t[i]);var i=arguments.length-2;if(i===1)n.children=r;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];n.children=s}return Z(e.type,o,void 0,void 0,a,n)};p.createContext=function(e){return e={$$typeof:ze,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Ye,_context:e},e};p.createElement=function(e,t,r){var n,o={},a=null;if(t!=null)for(n in t.key!==void 0&&(a=""+t.key),t)Ce.call(t,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(o[n]=t[n]);var i=arguments.length-2;if(i===1)o.children=r;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(n in i=e.defaultProps,i)o[n]===void 0&&(o[n]=i[n]);return Z(e,a,void 0,void 0,null,o)};p.createRef=function(){return{current:null}};p.forwardRef=function(e){return{$$typeof:Ke,render:e}};p.isValidElement=ee;p.lazy=function(e){return{$$typeof:ge,_payload:{_status:-1,_result:e},_init:Ze}};p.memo=function(e,t){return{$$typeof:Ve,type:e,compare:t===void 0?null:t}};p.startTransition=function(e){var t=y.T,r={};y.T=r;try{var n=e(),o=y.S;o!==null&&o(r,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(et,le)}catch(a){le(a)}finally{y.T=t}};p.unstable_useCacheRefresh=function(){return y.H.useCacheRefresh()};p.use=function(e){return y.H.use(e)};p.useActionState=function(e,t,r){return y.H.useActionState(e,t,r)};p.useCallback=function(e,t){return y.H.useCallback(e,t)};p.useContext=function(e){return y.H.useContext(e)};p.useDebugValue=function(){};p.useDeferredValue=function(e,t){return y.H.useDeferredValue(e,t)};p.useEffect=function(e,t){return y.H.useEffect(e,t)};p.useId=function(){return y.H.useId()};p.useImperativeHandle=function(e,t,r){return y.H.useImperativeHandle(e,t,r)};p.useInsertionEffect=function(e,t){return y.H.useInsertionEffect(e,t)};p.useLayoutEffect=function(e,t){return y.H.useLayoutEffect(e,t)};p.useMemo=function(e,t){return y.H.useMemo(e,t)};p.useOptimistic=function(e,t){return y.H.useOptimistic(e,t)};p.useReducer=function(e,t,r){return y.H.useReducer(e,t,r)};p.useRef=function(e){return y.H.useRef(e)};p.useState=function(e){return y.H.useState(e)};p.useSyncExternalStore=function(e,t,r){return y.H.useSyncExternalStore(e,t,r)};p.useTransition=function(){return y.H.useTransition()};p.version="19.0.0";me.exports=p;var u=me.exports;const tt=Be(u),rt=ke({__proto__:null,default:tt},[u]);var Se={exports:{}},P={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nt=u;function Oe(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function x(){}var O={d:{f:x,r:function(){throw Error(Oe(522))},D:x,C:x,L:x,m:x,X:x,S:x,M:x},p:0,findDOMNode:null},ot=Symbol.for("react.portal");function it(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ot,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}var $=nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function W(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}P.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O;P.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Oe(299));return it(e,t,null,r)};P.flushSync=function(e){var t=$.T,r=O.p;try{if($.T=null,O.p=2,e)return e()}finally{$.T=t,O.p=r,O.d.f()}};P.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,O.d.C(e,t))};P.prefetchDNS=function(e){typeof e=="string"&&O.d.D(e)};P.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var r=t.as,n=W(r,t.crossOrigin),o=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;r==="style"?O.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:n,integrity:o,fetchPriority:a}):r==="script"&&O.d.X(e,{crossOrigin:n,integrity:o,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};P.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var r=W(t.as,t.crossOrigin);O.d.M(e,{crossOrigin:r,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&O.d.M(e)};P.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var r=t.as,n=W(r,t.crossOrigin);O.d.L(e,r,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};P.preloadModule=function(e,t){if(typeof e=="string")if(t){var r=W(t.as,t.crossOrigin);O.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:r,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else O.d.m(e)};P.requestFormReset=function(e){O.d.r(e)};P.unstable_batchedUpdates=function(e,t){return e(t)};P.useFormState=function(e,t,r){return $.H.useFormState(e,t,r)};P.useFormStatus=function(){return $.H.useHostTransitionStatus()};P.version="19.0.0";function Pe(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pe)}catch(e){console.error(e)}}Pe(),Se.exports=P;var fr=Se.exports;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function M(){return M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},M.apply(this,arguments)}var T;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(T||(T={}));const se="popstate";function at(e){e===void 0&&(e={});function t(n,o){let{pathname:a,search:i,hash:s}=n.location;return G("",{pathname:a,search:i,hash:s},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:H(o)}return st(t,r,null,e)}function _(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function we(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function lt(){return Math.random().toString(36).substr(2,8)}function ue(e,t){return{usr:e.state,key:e.key,idx:t}}function G(e,t,r,n){return r===void 0&&(r=null),M({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?I(t):t,{state:r,key:t&&t.key||n||lt()})}function H(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function I(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function st(e,t,r,n){n===void 0&&(n={});let{window:o=document.defaultView,v5Compat:a=!1}=n,i=o.history,s=T.Pop,l=null,c=d();c==null&&(c=0,i.replaceState(M({},i.state,{idx:c}),""));function d(){return(i.state||{idx:null}).idx}function f(){s=T.Pop;let h=d(),v=h==null?null:h-c;c=h,l&&l({action:s,location:g.location,delta:v})}function m(h,v){s=T.Push;let S=G(g.location,h,v);c=d()+1;let C=ue(S,c),w=g.createHref(S);try{i.pushState(C,"",w)}catch(U){if(U instanceof DOMException&&U.name==="DataCloneError")throw U;o.location.assign(w)}a&&l&&l({action:s,location:g.location,delta:1})}function R(h,v){s=T.Replace;let S=G(g.location,h,v);c=d();let C=ue(S,c),w=g.createHref(S);i.replaceState(C,"",w),a&&l&&l({action:s,location:g.location,delta:0})}function E(h){let v=o.location.origin!=="null"?o.location.origin:o.location.href,S=typeof h=="string"?h:H(h);return S=S.replace(/ $/,"%20"),_(v,"No window.location.(origin|href) available to create URL for href: "+S),new URL(S,v)}let g={get action(){return s},get location(){return e(o,i)},listen(h){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(se,f),l=h,()=>{o.removeEventListener(se,f),l=null}},createHref(h){return t(o,h)},createURL:E,encodeLocation(h){let v=E(h);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:m,replace:R,go(h){return i.go(h)}};return g}var ce;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ce||(ce={}));function ut(e,t,r){return r===void 0&&(r="/"),ct(e,t,r)}function ct(e,t,r,n){let o=typeof t=="string"?I(t):t,a=te(o.pathname||"/",r);if(a==null)return null;let i=xe(e);ft(i);let s=null;for(let l=0;s==null&&l<i.length;++l){let c=St(a);s=_t(i[l],c)}return s}function xe(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let o=(a,i,s)=>{let l={relativePath:s===void 0?a.path||"":s,caseSensitive:a.caseSensitive===!0,childrenIndex:i,route:a};l.relativePath.startsWith("/")&&(_(l.relativePath.startsWith(n),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(n.length));let c=b([n,l.relativePath]),d=r.concat(l);a.children&&a.children.length>0&&(_(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),xe(a.children,t,d,c)),!(a.path==null&&!a.index)&&t.push({path:c,score:yt(c,a.index),routesMeta:d})};return e.forEach((a,i)=>{var s;if(a.path===""||!((s=a.path)!=null&&s.includes("?")))o(a,i);else for(let l of Te(a.path))o(a,i,l)}),t}function Te(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),a=r.replace(/\?$/,"");if(n.length===0)return o?[a,""]:[a];let i=Te(n.join("/")),s=[];return s.push(...i.map(l=>l===""?a:[a,l].join("/"))),o&&s.push(...i),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function ft(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Et(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const dt=/^:[\w-]+$/,pt=3,ht=2,vt=1,mt=10,gt=-2,fe=e=>e==="*";function yt(e,t){let r=e.split("/"),n=r.length;return r.some(fe)&&(n+=gt),t&&(n+=ht),r.filter(o=>!fe(o)).reduce((o,a)=>o+(dt.test(a)?pt:a===""?vt:mt),n)}function Et(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function _t(e,t,r){let{routesMeta:n}=e,o={},a="/",i=[];for(let s=0;s<n.length;++s){let l=n[s],c=s===n.length-1,d=a==="/"?t:t.slice(a.length)||"/",f=Rt({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),m=l.route;if(!f)return null;Object.assign(o,f.params),i.push({params:o,pathname:b([a,f.pathname]),pathnameBase:xt(b([a,f.pathnameBase])),route:m}),f.pathnameBase!=="/"&&(a=b([a,f.pathnameBase]))}return i}function Rt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Ct(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let a=o[0],i=a.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:n.reduce((c,d,f)=>{let{paramName:m,isOptional:R}=d;if(m==="*"){let g=s[f]||"";i=a.slice(0,a.length-g.length).replace(/(.)\/+$/,"$1")}const E=s[f];return R&&!E?c[m]=void 0:c[m]=(E||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:i,pattern:e}}function Ct(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),we(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,l)=>(n.push({paramName:s,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function St(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return we(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function te(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ot(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?I(e):e;return{pathname:r?r.startsWith("/")?r:Pt(r,t):t,search:Tt(n),hash:bt(o)}}function Pt(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function K(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function wt(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function be(e,t){let r=wt(e);return t?r.map((n,o)=>o===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Le(e,t,r,n){n===void 0&&(n=!1);let o;typeof e=="string"?o=I(e):(o=M({},e),_(!o.pathname||!o.pathname.includes("?"),K("?","pathname","search",o)),_(!o.pathname||!o.pathname.includes("#"),K("#","pathname","hash",o)),_(!o.search||!o.search.includes("#"),K("#","search","hash",o)));let a=e===""||o.pathname==="",i=a?"/":o.pathname,s;if(i==null)s=r;else{let f=t.length-1;if(!n&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),f-=1;o.pathname=m.join("/")}s=f>=0?t[f]:"/"}let l=Ot(o,s),c=i&&i!=="/"&&i.endsWith("/"),d=(a||i===".")&&r.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}const b=e=>e.join("/").replace(/\/\/+/g,"/"),xt=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Tt=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,bt=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Lt(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Ne=["post","put","patch","delete"];new Set(Ne);const Nt=["get",...Ne];new Set(Nt);/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},k.apply(this,arguments)}const re=u.createContext(null),Ut=u.createContext(null),N=u.createContext(null),F=u.createContext(null),L=u.createContext({outlet:null,matches:[],isDataRoute:!1}),Ue=u.createContext(null);function jt(e,t){let{relative:r}=t===void 0?{}:t;B()||_(!1);let{basename:n,navigator:o}=u.useContext(N),{hash:a,pathname:i,search:s}=Ae(e,{relative:r}),l=i;return n!=="/"&&(l=i==="/"?n:b([n,i])),o.createHref({pathname:l,search:s,hash:a})}function B(){return u.useContext(F)!=null}function Y(){return B()||_(!1),u.useContext(F).location}function je(e){u.useContext(N).static||u.useLayoutEffect(e)}function At(){let{isDataRoute:e}=u.useContext(L);return e?qt():It()}function It(){B()||_(!1);let e=u.useContext(re),{basename:t,future:r,navigator:n}=u.useContext(N),{matches:o}=u.useContext(L),{pathname:a}=Y(),i=JSON.stringify(be(o,r.v7_relativeSplatPath)),s=u.useRef(!1);return je(()=>{s.current=!0}),u.useCallback(function(c,d){if(d===void 0&&(d={}),!s.current)return;if(typeof c=="number"){n.go(c);return}let f=Le(c,JSON.parse(i),a,d.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:b([t,f.pathname])),(d.replace?n.replace:n.push)(f,d.state,d)},[t,n,i,a,e])}const $t=u.createContext(null);function Mt(e){let t=u.useContext(L).outlet;return t&&u.createElement($t.Provider,{value:e},t)}function Ae(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=u.useContext(N),{matches:o}=u.useContext(L),{pathname:a}=Y(),i=JSON.stringify(be(o,n.v7_relativeSplatPath));return u.useMemo(()=>Le(e,JSON.parse(i),a,r==="path"),[e,i,a,r])}function kt(e,t){return Bt(e,t)}function Bt(e,t,r,n){B()||_(!1);let{navigator:o,static:a}=u.useContext(N),{matches:i}=u.useContext(L),s=i[i.length-1],l=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let d=Y(),f;if(t){var m;let v=typeof t=="string"?I(t):t;c==="/"||(m=v.pathname)!=null&&m.startsWith(c)||_(!1),f=v}else f=d;let R=f.pathname||"/",E=R;if(c!=="/"){let v=c.replace(/^\//,"").split("/");E="/"+R.replace(/^\//,"").split("/").slice(v.length).join("/")}let g=ut(e,{pathname:E}),h=Yt(g&&g.map(v=>Object.assign({},v,{params:Object.assign({},l,v.params),pathname:b([c,o.encodeLocation?o.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?c:b([c,o.encodeLocation?o.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),i,r,n);return t&&h?u.createElement(F.Provider,{value:{location:k({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:T.Pop}},h):h}function Dt(){let e=Vt(),t=Lt(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),r?u.createElement("pre",{style:o},r):null,null)}const Ht=u.createElement(Dt,null);class Wt extends u.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?u.createElement(L.Provider,{value:this.props.routeContext},u.createElement(Ue.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Ft(e){let{routeContext:t,match:r,children:n}=e,o=u.useContext(re);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),u.createElement(L.Provider,{value:t},n)}function Yt(e,t,r,n){var o;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var a;if(!r)return null;if(r.errors)e=r.matches;else if((a=n)!=null&&a.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,s=(o=r)==null?void 0:o.errors;if(s!=null){let d=i.findIndex(f=>f.route.id&&(s==null?void 0:s[f.route.id])!==void 0);d>=0||_(!1),i=i.slice(0,Math.min(i.length,d+1))}let l=!1,c=-1;if(r&&n&&n.v7_partialHydration)for(let d=0;d<i.length;d++){let f=i[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=d),f.route.id){let{loaderData:m,errors:R}=r,E=f.route.loader&&m[f.route.id]===void 0&&(!R||R[f.route.id]===void 0);if(f.route.lazy||E){l=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];break}}}return i.reduceRight((d,f,m)=>{let R,E=!1,g=null,h=null;r&&(R=s&&f.route.id?s[f.route.id]:void 0,g=f.route.errorElement||Ht,l&&(c<0&&m===0?(Jt("route-fallback"),E=!0,h=null):c===m&&(E=!0,h=f.route.hydrateFallbackElement||null)));let v=t.concat(i.slice(0,m+1)),S=()=>{let C;return R?C=g:E?C=h:f.route.Component?C=u.createElement(f.route.Component,null):f.route.element?C=f.route.element:C=d,u.createElement(Ft,{match:f,routeContext:{outlet:d,matches:v,isDataRoute:r!=null},children:C})};return r&&(f.route.ErrorBoundary||f.route.errorElement||m===0)?u.createElement(Wt,{location:r.location,revalidation:r.revalidation,component:g,error:R,children:S(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):S()},null)}var Ie=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ie||{}),$e=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}($e||{});function zt(e){let t=u.useContext(re);return t||_(!1),t}function Kt(e){let t=u.useContext(Ut);return t||_(!1),t}function Gt(e){let t=u.useContext(L);return t||_(!1),t}function Me(e){let t=Gt(),r=t.matches[t.matches.length-1];return r.route.id||_(!1),r.route.id}function Vt(){var e;let t=u.useContext(Ue),r=Kt(),n=Me();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function qt(){let{router:e}=zt(Ie.UseNavigateStable),t=Me($e.UseNavigateStable),r=u.useRef(!1);return je(()=>{r.current=!0}),u.useCallback(function(o,a){a===void 0&&(a={}),r.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,k({fromRouteId:t},a)))},[e,t])}const de={};function Jt(e,t,r){de[e]||(de[e]=!0)}function Xt(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function dr(e){return Mt(e.context)}function Qt(e){_(!1)}function Zt(e){let{basename:t="/",children:r=null,location:n,navigationType:o=T.Pop,navigator:a,static:i=!1,future:s}=e;B()&&_(!1);let l=t.replace(/^\/*/,"/"),c=u.useMemo(()=>({basename:l,navigator:a,static:i,future:k({v7_relativeSplatPath:!1},s)}),[l,s,a,i]);typeof n=="string"&&(n=I(n));let{pathname:d="/",search:f="",hash:m="",state:R=null,key:E="default"}=n,g=u.useMemo(()=>{let h=te(d,l);return h==null?null:{location:{pathname:h,search:f,hash:m,state:R,key:E},navigationType:o}},[l,d,f,m,R,E,o]);return g==null?null:u.createElement(N.Provider,{value:c},u.createElement(F.Provider,{children:r,value:g}))}function pr(e){let{children:t,location:r}=e;return kt(V(t),r)}new Promise(()=>{});function V(e,t){t===void 0&&(t=[]);let r=[];return u.Children.forEach(e,(n,o)=>{if(!u.isValidElement(n))return;let a=[...t,o];if(n.type===u.Fragment){r.push.apply(r,V(n.props.children,a));return}n.type!==Qt&&_(!1),!n.props.index||!n.props.children||_(!1);let i={id:n.props.id||a.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(i.children=V(n.props.children,a)),r.push(i)}),r}/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},q.apply(this,arguments)}function er(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function tr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function rr(e,t){return e.button===0&&(!t||t==="_self")&&!tr(e)}const nr=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],or="6";try{window.__reactRouterVersion=or}catch{}const ir="startTransition",pe=rt[ir];function hr(e){let{basename:t,children:r,future:n,window:o}=e,a=u.useRef();a.current==null&&(a.current=at({window:o,v5Compat:!0}));let i=a.current,[s,l]=u.useState({action:i.action,location:i.location}),{v7_startTransition:c}=n||{},d=u.useCallback(f=>{c&&pe?pe(()=>l(f)):l(f)},[l,c]);return u.useLayoutEffect(()=>i.listen(d),[i,d]),u.useEffect(()=>Xt(n),[n]),u.createElement(Zt,{basename:t,children:r,location:s.location,navigationType:s.action,navigator:i,future:n})}const ar=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",lr=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vr=u.forwardRef(function(t,r){let{onClick:n,relative:o,reloadDocument:a,replace:i,state:s,target:l,to:c,preventScrollReset:d,viewTransition:f}=t,m=er(t,nr),{basename:R}=u.useContext(N),E,g=!1;if(typeof c=="string"&&lr.test(c)&&(E=c,ar))try{let C=new URL(window.location.href),w=c.startsWith("//")?new URL(C.protocol+c):new URL(c),U=te(w.pathname,R);w.origin===C.origin&&U!=null?c=U+w.search+w.hash:g=!0}catch{}let h=jt(c,{relative:o}),v=sr(c,{replace:i,state:s,target:l,preventScrollReset:d,relative:o,viewTransition:f});function S(C){n&&n(C),C.defaultPrevented||v(C)}return u.createElement("a",q({},m,{href:E||h,onClick:g||a?n:S,ref:r,target:l}))});var he;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(he||(he={}));var ve;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(ve||(ve={}));function sr(e,t){let{target:r,replace:n,state:o,preventScrollReset:a,relative:i,viewTransition:s}=t===void 0?{}:t,l=At(),c=Y(),d=Ae(e,{relative:i});return u.useCallback(f=>{if(rr(f,r)){f.preventDefault();let m=n!==void 0?n:H(c)===H(d);l(e,{replace:m,state:o,preventScrollReset:a,relative:i,viewTransition:s})}},[c,l,d,n,o,r,e,a,i,s])}export{hr as B,vr as L,dr as O,tt as R,fr as a,cr as b,ur as c,pr as d,Qt as e,Be as g,u as r,Y as u};
