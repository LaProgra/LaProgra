(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const A of u)if(A.type==="childList")for(const m of A.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function t(u){const A={};return u.integrity&&(A.integrity=u.integrity),u.referrerPolicy&&(A.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?A.credentials="include":u.crossOrigin==="anonymous"?A.credentials="omit":A.credentials="same-origin",A}function s(u){if(u.ep)return;u.ep=!0;const A=t(u);fetch(u.href,A)}})();var Xs={exports:{}},si={},qs={exports:{}},oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var AA;function Pg(){if(AA)return oe;AA=1;var n=Symbol.for("react.element"),i=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),m=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),k=Symbol.iterator;function v(E){return E===null||typeof E!="object"?null:(E=k&&E[k]||E["@@iterator"],typeof E=="function"?E:null)}var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,N={};function w(E,D,ie){this.props=E,this.context=D,this.refs=N,this.updater=ie||B}w.prototype.isReactComponent={},w.prototype.setState=function(E,D){if(typeof E!="object"&&typeof E!="function"&&E!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,E,D,"setState")},w.prototype.forceUpdate=function(E){this.updater.enqueueForceUpdate(this,E,"forceUpdate")};function _(){}_.prototype=w.prototype;function G(E,D,ie){this.props=E,this.context=D,this.refs=N,this.updater=ie||B}var V=G.prototype=new _;V.constructor=G,R(V,w.prototype),V.isPureReactComponent=!0;var Q=Array.isArray,H=Object.prototype.hasOwnProperty,F={current:null},X={key:!0,ref:!0,__self:!0,__source:!0};function j(E,D,ie){var se,ce={},me=null,pe=null;if(D!=null)for(se in D.ref!==void 0&&(pe=D.ref),D.key!==void 0&&(me=""+D.key),D)H.call(D,se)&&!X.hasOwnProperty(se)&&(ce[se]=D[se]);var he=arguments.length-2;if(he===1)ce.children=ie;else if(1<he){for(var Ce=Array(he),or=0;or<he;or++)Ce[or]=arguments[or+2];ce.children=Ce}if(E&&E.defaultProps)for(se in he=E.defaultProps,he)ce[se]===void 0&&(ce[se]=he[se]);return{$$typeof:n,type:E,key:me,ref:pe,props:ce,_owner:F.current}}function le(E,D){return{$$typeof:n,type:E.type,key:D,ref:E.ref,props:E.props,_owner:E._owner}}function de(E){return typeof E=="object"&&E!==null&&E.$$typeof===n}function De(E){var D={"=":"=0",":":"=2"};return"$"+E.replace(/[=:]/g,function(ie){return D[ie]})}var tr=/\/+/g;function ze(E,D){return typeof E=="object"&&E!==null&&E.key!=null?De(""+E.key):D.toString(36)}function qe(E,D,ie,se,ce){var me=typeof E;(me==="undefined"||me==="boolean")&&(E=null);var pe=!1;if(E===null)pe=!0;else switch(me){case"string":case"number":pe=!0;break;case"object":switch(E.$$typeof){case n:case i:pe=!0}}if(pe)return pe=E,ce=ce(pe),E=se===""?"."+ze(pe,0):se,Q(ce)?(ie="",E!=null&&(ie=E.replace(tr,"$&/")+"/"),qe(ce,D,ie,"",function(or){return or})):ce!=null&&(de(ce)&&(ce=le(ce,ie+(!ce.key||pe&&pe.key===ce.key?"":(""+ce.key).replace(tr,"$&/")+"/")+E)),D.push(ce)),1;if(pe=0,se=se===""?".":se+":",Q(E))for(var he=0;he<E.length;he++){me=E[he];var Ce=se+ze(me,he);pe+=qe(me,D,ie,Ce,ce)}else if(Ce=v(E),typeof Ce=="function")for(E=Ce.call(E),he=0;!(me=E.next()).done;)me=me.value,Ce=se+ze(me,he++),pe+=qe(me,D,ie,Ce,ce);else if(me==="object")throw D=String(E),Error("Objects are not valid as a React child (found: "+(D==="[object Object]"?"object with keys {"+Object.keys(E).join(", ")+"}":D)+"). If you meant to render a collection of children, use an array instead.");return pe}function vr(E,D,ie){if(E==null)return E;var se=[],ce=0;return qe(E,se,"","",function(me){return D.call(ie,me,ce++)}),se}function Ze(E){if(E._status===-1){var D=E._result;D=D(),D.then(function(ie){(E._status===0||E._status===-1)&&(E._status=1,E._result=ie)},function(ie){(E._status===0||E._status===-1)&&(E._status=2,E._result=ie)}),E._status===-1&&(E._status=0,E._result=D)}if(E._status===1)return E._result.default;throw E._result}var te={current:null},O={transition:null},$={ReactCurrentDispatcher:te,ReactCurrentBatchConfig:O,ReactCurrentOwner:F};function W(){throw Error("act(...) is not supported in production builds of React.")}return oe.Children={map:vr,forEach:function(E,D,ie){vr(E,function(){D.apply(this,arguments)},ie)},count:function(E){var D=0;return vr(E,function(){D++}),D},toArray:function(E){return vr(E,function(D){return D})||[]},only:function(E){if(!de(E))throw Error("React.Children.only expected to receive a single React element child.");return E}},oe.Component=w,oe.Fragment=t,oe.Profiler=u,oe.PureComponent=G,oe.StrictMode=s,oe.Suspense=f,oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,oe.act=W,oe.cloneElement=function(E,D,ie){if(E==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+E+".");var se=R({},E.props),ce=E.key,me=E.ref,pe=E._owner;if(D!=null){if(D.ref!==void 0&&(me=D.ref,pe=F.current),D.key!==void 0&&(ce=""+D.key),E.type&&E.type.defaultProps)var he=E.type.defaultProps;for(Ce in D)H.call(D,Ce)&&!X.hasOwnProperty(Ce)&&(se[Ce]=D[Ce]===void 0&&he!==void 0?he[Ce]:D[Ce])}var Ce=arguments.length-2;if(Ce===1)se.children=ie;else if(1<Ce){he=Array(Ce);for(var or=0;or<Ce;or++)he[or]=arguments[or+2];se.children=he}return{$$typeof:n,type:E.type,key:ce,ref:me,props:se,_owner:pe}},oe.createContext=function(E){return E={$$typeof:m,_currentValue:E,_currentValue2:E,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},E.Provider={$$typeof:A,_context:E},E.Consumer=E},oe.createElement=j,oe.createFactory=function(E){var D=j.bind(null,E);return D.type=E,D},oe.createRef=function(){return{current:null}},oe.forwardRef=function(E){return{$$typeof:h,render:E}},oe.isValidElement=de,oe.lazy=function(E){return{$$typeof:y,_payload:{_status:-1,_result:E},_init:Ze}},oe.memo=function(E,D){return{$$typeof:p,type:E,compare:D===void 0?null:D}},oe.startTransition=function(E){var D=O.transition;O.transition={};try{E()}finally{O.transition=D}},oe.unstable_act=W,oe.useCallback=function(E,D){return te.current.useCallback(E,D)},oe.useContext=function(E){return te.current.useContext(E)},oe.useDebugValue=function(){},oe.useDeferredValue=function(E){return te.current.useDeferredValue(E)},oe.useEffect=function(E,D){return te.current.useEffect(E,D)},oe.useId=function(){return te.current.useId()},oe.useImperativeHandle=function(E,D,ie){return te.current.useImperativeHandle(E,D,ie)},oe.useInsertionEffect=function(E,D){return te.current.useInsertionEffect(E,D)},oe.useLayoutEffect=function(E,D){return te.current.useLayoutEffect(E,D)},oe.useMemo=function(E,D){return te.current.useMemo(E,D)},oe.useReducer=function(E,D,ie){return te.current.useReducer(E,D,ie)},oe.useRef=function(E){return te.current.useRef(E)},oe.useState=function(E){return te.current.useState(E)},oe.useSyncExternalStore=function(E,D,ie){return te.current.useSyncExternalStore(E,D,ie)},oe.useTransition=function(){return te.current.useTransition()},oe.version="18.3.1",oe}var dA;function Il(){return dA||(dA=1,qs.exports=Pg()),qs.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hA;function Eg(){if(hA)return si;hA=1;var n=Il(),i=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,A={key:!0,ref:!0,__self:!0,__source:!0};function m(h,f,p){var y,k={},v=null,B=null;p!==void 0&&(v=""+p),f.key!==void 0&&(v=""+f.key),f.ref!==void 0&&(B=f.ref);for(y in f)s.call(f,y)&&!A.hasOwnProperty(y)&&(k[y]=f[y]);if(h&&h.defaultProps)for(y in f=h.defaultProps,f)k[y]===void 0&&(k[y]=f[y]);return{$$typeof:i,type:h,key:v,ref:B,props:k,_owner:u.current}}return si.Fragment=t,si.jsx=m,si.jsxs=m,si}var fA;function Mg(){return fA||(fA=1,Xs.exports=Eg()),Xs.exports}var g=Mg(),I=Il(),Kt={},$s={exports:{}},ir={},el={exports:{}},rl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pA;function Tg(){return pA||(pA=1,(function(n){function i(O,$){var W=O.length;O.push($);e:for(;0<W;){var E=W-1>>>1,D=O[E];if(0<u(D,$))O[E]=$,O[W]=D,W=E;else break e}}function t(O){return O.length===0?null:O[0]}function s(O){if(O.length===0)return null;var $=O[0],W=O.pop();if(W!==$){O[0]=W;e:for(var E=0,D=O.length,ie=D>>>1;E<ie;){var se=2*(E+1)-1,ce=O[se],me=se+1,pe=O[me];if(0>u(ce,W))me<D&&0>u(pe,ce)?(O[E]=pe,O[me]=W,E=me):(O[E]=ce,O[se]=W,E=se);else if(me<D&&0>u(pe,W))O[E]=pe,O[me]=W,E=me;else break e}}return $}function u(O,$){var W=O.sortIndex-$.sortIndex;return W!==0?W:O.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var A=performance;n.unstable_now=function(){return A.now()}}else{var m=Date,h=m.now();n.unstable_now=function(){return m.now()-h}}var f=[],p=[],y=1,k=null,v=3,B=!1,R=!1,N=!1,w=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,G=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function V(O){for(var $=t(p);$!==null;){if($.callback===null)s(p);else if($.startTime<=O)s(p),$.sortIndex=$.expirationTime,i(f,$);else break;$=t(p)}}function Q(O){if(N=!1,V(O),!R)if(t(f)!==null)R=!0,Ze(H);else{var $=t(p);$!==null&&te(Q,$.startTime-O)}}function H(O,$){R=!1,N&&(N=!1,_(j),j=-1),B=!0;var W=v;try{for(V($),k=t(f);k!==null&&(!(k.expirationTime>$)||O&&!De());){var E=k.callback;if(typeof E=="function"){k.callback=null,v=k.priorityLevel;var D=E(k.expirationTime<=$);$=n.unstable_now(),typeof D=="function"?k.callback=D:k===t(f)&&s(f),V($)}else s(f);k=t(f)}if(k!==null)var ie=!0;else{var se=t(p);se!==null&&te(Q,se.startTime-$),ie=!1}return ie}finally{k=null,v=W,B=!1}}var F=!1,X=null,j=-1,le=5,de=-1;function De(){return!(n.unstable_now()-de<le)}function tr(){if(X!==null){var O=n.unstable_now();de=O;var $=!0;try{$=X(!0,O)}finally{$?ze():(F=!1,X=null)}}else F=!1}var ze;if(typeof G=="function")ze=function(){G(tr)};else if(typeof MessageChannel<"u"){var qe=new MessageChannel,vr=qe.port2;qe.port1.onmessage=tr,ze=function(){vr.postMessage(null)}}else ze=function(){w(tr,0)};function Ze(O){X=O,F||(F=!0,ze())}function te(O,$){j=w(function(){O(n.unstable_now())},$)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(O){O.callback=null},n.unstable_continueExecution=function(){R||B||(R=!0,Ze(H))},n.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):le=0<O?Math.floor(1e3/O):5},n.unstable_getCurrentPriorityLevel=function(){return v},n.unstable_getFirstCallbackNode=function(){return t(f)},n.unstable_next=function(O){switch(v){case 1:case 2:case 3:var $=3;break;default:$=v}var W=v;v=$;try{return O()}finally{v=W}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(O,$){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var W=v;v=O;try{return $()}finally{v=W}},n.unstable_scheduleCallback=function(O,$,W){var E=n.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?E+W:E):W=E,O){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=W+D,O={id:y++,callback:$,priorityLevel:O,startTime:W,expirationTime:D,sortIndex:-1},W>E?(O.sortIndex=W,i(p,O),t(f)===null&&O===t(p)&&(N?(_(j),j=-1):N=!0,te(Q,W-E))):(O.sortIndex=D,i(f,O),R||B||(R=!0,Ze(H))),O},n.unstable_shouldYield=De,n.unstable_wrapCallback=function(O){var $=v;return function(){var W=v;v=$;try{return O.apply(this,arguments)}finally{v=W}}}})(rl)),rl}var gA;function Bg(){return gA||(gA=1,el.exports=Tg()),el.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yA;function Lg(){if(yA)return ir;yA=1;var n=Il(),i=Bg();function t(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,a=1;a<arguments.length;a++)r+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,u={};function A(e,r){m(e,r),m(e+"Capture",r)}function m(e,r){for(u[e]=r,e=0;e<r.length;e++)s.add(r[e])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,y={},k={};function v(e){return f.call(k,e)?!0:f.call(y,e)?!1:p.test(e)?k[e]=!0:(y[e]=!0,!1)}function B(e,r,a,o){if(a!==null&&a.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return o?!1:a!==null?!a.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function R(e,r,a,o){if(r===null||typeof r>"u"||B(e,r,a,o))return!0;if(o)return!1;if(a!==null)switch(a.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function N(e,r,a,o,l,c,d){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=o,this.attributeNamespace=l,this.mustUseProperty=a,this.propertyName=e,this.type=r,this.sanitizeURL=c,this.removeEmptyString=d}var w={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){w[e]=new N(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var r=e[0];w[r]=new N(r,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){w[e]=new N(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){w[e]=new N(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){w[e]=new N(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){w[e]=new N(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){w[e]=new N(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){w[e]=new N(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){w[e]=new N(e,5,!1,e.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function G(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var r=e.replace(_,G);w[r]=new N(r,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var r=e.replace(_,G);w[r]=new N(r,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var r=e.replace(_,G);w[r]=new N(r,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){w[e]=new N(e,1,!1,e.toLowerCase(),null,!1,!1)}),w.xlinkHref=new N("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){w[e]=new N(e,1,!1,e.toLowerCase(),null,!0,!0)});function V(e,r,a,o){var l=w.hasOwnProperty(r)?w[r]:null;(l!==null?l.type!==0:o||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(R(r,a,l,o)&&(a=null),o||l===null?v(r)&&(a===null?e.removeAttribute(r):e.setAttribute(r,""+a)):l.mustUseProperty?e[l.propertyName]=a===null?l.type===3?!1:"":a:(r=l.attributeName,o=l.attributeNamespace,a===null?e.removeAttribute(r):(l=l.type,a=l===3||l===4&&a===!0?"":""+a,o?e.setAttributeNS(o,r,a):e.setAttribute(r,a))))}var Q=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,H=Symbol.for("react.element"),F=Symbol.for("react.portal"),X=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),le=Symbol.for("react.profiler"),de=Symbol.for("react.provider"),De=Symbol.for("react.context"),tr=Symbol.for("react.forward_ref"),ze=Symbol.for("react.suspense"),qe=Symbol.for("react.suspense_list"),vr=Symbol.for("react.memo"),Ze=Symbol.for("react.lazy"),te=Symbol.for("react.offscreen"),O=Symbol.iterator;function $(e){return e===null||typeof e!="object"?null:(e=O&&e[O]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,E;function D(e){if(E===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);E=r&&r[1]||""}return`
`+E+e}var ie=!1;function se(e,r){if(!e||ie)return"";ie=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(L){var o=L}Reflect.construct(e,[],r)}else{try{r.call()}catch(L){o=L}e.call(r.prototype)}else{try{throw Error()}catch(L){o=L}e()}}catch(L){if(L&&o&&typeof L.stack=="string"){for(var l=L.stack.split(`
`),c=o.stack.split(`
`),d=l.length-1,S=c.length-1;1<=d&&0<=S&&l[d]!==c[S];)S--;for(;1<=d&&0<=S;d--,S--)if(l[d]!==c[S]){if(d!==1||S!==1)do if(d--,S--,0>S||l[d]!==c[S]){var C=`
`+l[d].replace(" at new "," at ");return e.displayName&&C.includes("<anonymous>")&&(C=C.replace("<anonymous>",e.displayName)),C}while(1<=d&&0<=S);break}}}finally{ie=!1,Error.prepareStackTrace=a}return(e=e?e.displayName||e.name:"")?D(e):""}function ce(e){switch(e.tag){case 5:return D(e.type);case 16:return D("Lazy");case 13:return D("Suspense");case 19:return D("SuspenseList");case 0:case 2:case 15:return e=se(e.type,!1),e;case 11:return e=se(e.type.render,!1),e;case 1:return e=se(e.type,!0),e;default:return""}}function me(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case X:return"Fragment";case F:return"Portal";case le:return"Profiler";case j:return"StrictMode";case ze:return"Suspense";case qe:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case De:return(e.displayName||"Context")+".Consumer";case de:return(e._context.displayName||"Context")+".Provider";case tr:var r=e.render;return e=e.displayName,e||(e=r.displayName||r.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case vr:return r=e.displayName||null,r!==null?r:me(e.type)||"Memo";case Ze:r=e._payload,e=e._init;try{return me(e(r))}catch{}}return null}function pe(e){var r=e.type;switch(e.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=r.render,e=e.displayName||e.name||"",r.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return me(r);case 8:return r===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function he(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ce(e){var r=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function or(e){var r=Ce(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,r),o=""+e[r];if(!e.hasOwnProperty(r)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var l=a.get,c=a.set;return Object.defineProperty(e,r,{configurable:!0,get:function(){return l.call(this)},set:function(d){o=""+d,c.call(this,d)}}),Object.defineProperty(e,r,{enumerable:a.enumerable}),{getValue:function(){return o},setValue:function(d){o=""+d},stopTracking:function(){e._valueTracker=null,delete e[r]}}}}function Mi(e){e._valueTracker||(e._valueTracker=or(e))}function yu(e){if(!e)return!1;var r=e._valueTracker;if(!r)return!0;var a=r.getValue(),o="";return e&&(o=Ce(e)?e.checked?"true":"false":e.value),e=o,e!==a?(r.setValue(e),!0):!1}function Ti(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ao(e,r){var a=r.checked;return W({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??e._wrapperState.initialChecked})}function Su(e,r){var a=r.defaultValue==null?"":r.defaultValue,o=r.checked!=null?r.checked:r.defaultChecked;a=he(r.value!=null?r.value:a),e._wrapperState={initialChecked:o,initialValue:a,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function ku(e,r){r=r.checked,r!=null&&V(e,"checked",r,!1)}function io(e,r){ku(e,r);var a=he(r.value),o=r.type;if(a!=null)o==="number"?(a===0&&e.value===""||e.value!=a)&&(e.value=""+a):e.value!==""+a&&(e.value=""+a);else if(o==="submit"||o==="reset"){e.removeAttribute("value");return}r.hasOwnProperty("value")?to(e,r.type,a):r.hasOwnProperty("defaultValue")&&to(e,r.type,he(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(e.defaultChecked=!!r.defaultChecked)}function vu(e,r,a){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var o=r.type;if(!(o!=="submit"&&o!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+e._wrapperState.initialValue,a||r===e.value||(e.value=r),e.defaultValue=r}a=e.name,a!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,a!==""&&(e.name=a)}function to(e,r,a){(r!=="number"||Ti(e.ownerDocument)!==e)&&(a==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+a&&(e.defaultValue=""+a))}var Ca=Array.isArray;function On(e,r,a,o){if(e=e.options,r){r={};for(var l=0;l<a.length;l++)r["$"+a[l]]=!0;for(a=0;a<e.length;a++)l=r.hasOwnProperty("$"+e[a].value),e[a].selected!==l&&(e[a].selected=l),l&&o&&(e[a].defaultSelected=!0)}else{for(a=""+he(a),r=null,l=0;l<e.length;l++){if(e[l].value===a){e[l].selected=!0,o&&(e[l].defaultSelected=!0);return}r!==null||e[l].disabled||(r=e[l])}r!==null&&(r.selected=!0)}}function oo(e,r){if(r.dangerouslySetInnerHTML!=null)throw Error(t(91));return W({},r,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Cu(e,r){var a=r.value;if(a==null){if(a=r.children,r=r.defaultValue,a!=null){if(r!=null)throw Error(t(92));if(Ca(a)){if(1<a.length)throw Error(t(93));a=a[0]}r=a}r==null&&(r=""),a=r}e._wrapperState={initialValue:he(a)}}function Pu(e,r){var a=he(r.value),o=he(r.defaultValue);a!=null&&(a=""+a,a!==e.value&&(e.value=a),r.defaultValue==null&&e.defaultValue!==a&&(e.defaultValue=a)),o!=null&&(e.defaultValue=""+o)}function Eu(e){var r=e.textContent;r===e._wrapperState.initialValue&&r!==""&&r!==null&&(e.value=r)}function Mu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function so(e,r){return e==null||e==="http://www.w3.org/1999/xhtml"?Mu(r):e==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Bi,Tu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,a,o,l){MSApp.execUnsafeLocalFunction(function(){return e(r,a,o,l)})}:e})(function(e,r){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=r;else{for(Bi=Bi||document.createElement("div"),Bi.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Bi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;r.firstChild;)e.appendChild(r.firstChild)}});function Pa(e,r){if(r){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=r;return}}e.textContent=r}var Ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Bf=["Webkit","ms","Moz","O"];Object.keys(Ea).forEach(function(e){Bf.forEach(function(r){r=r+e.charAt(0).toUpperCase()+e.substring(1),Ea[r]=Ea[e]})});function Bu(e,r,a){return r==null||typeof r=="boolean"||r===""?"":a||typeof r!="number"||r===0||Ea.hasOwnProperty(e)&&Ea[e]?(""+r).trim():r+"px"}function Lu(e,r){e=e.style;for(var a in r)if(r.hasOwnProperty(a)){var o=a.indexOf("--")===0,l=Bu(a,r[a],o);a==="float"&&(a="cssFloat"),o?e.setProperty(a,l):e[a]=l}}var Lf=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function lo(e,r){if(r){if(Lf[e]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(t(137,e));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(t(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(t(61))}if(r.style!=null&&typeof r.style!="object")throw Error(t(62))}}function uo(e,r){if(e.indexOf("-")===-1)return typeof r.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var co=null;function mo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ao=null,Gn=null,Hn=null;function Nu(e){if(e=Wa(e)){if(typeof Ao!="function")throw Error(t(280));var r=e.stateNode;r&&(r=Qi(r),Ao(e.stateNode,e.type,r))}}function wu(e){Gn?Hn?Hn.push(e):Hn=[e]:Gn=e}function Ru(){if(Gn){var e=Gn,r=Hn;if(Hn=Gn=null,Nu(e),r)for(e=0;e<r.length;e++)Nu(r[e])}}function bu(e,r){return e(r)}function Du(){}var ho=!1;function xu(e,r,a){if(ho)return e(r,a);ho=!0;try{return bu(e,r,a)}finally{ho=!1,(Gn!==null||Hn!==null)&&(Du(),Ru())}}function Ma(e,r){var a=e.stateNode;if(a===null)return null;var o=Qi(a);if(o===null)return null;a=o[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(t(231,r,typeof a));return a}var fo=!1;if(h)try{var Ta={};Object.defineProperty(Ta,"passive",{get:function(){fo=!0}}),window.addEventListener("test",Ta,Ta),window.removeEventListener("test",Ta,Ta)}catch{fo=!1}function Nf(e,r,a,o,l,c,d,S,C){var L=Array.prototype.slice.call(arguments,3);try{r.apply(a,L)}catch(x){this.onError(x)}}var Ba=!1,Li=null,Ni=!1,po=null,wf={onError:function(e){Ba=!0,Li=e}};function Rf(e,r,a,o,l,c,d,S,C){Ba=!1,Li=null,Nf.apply(wf,arguments)}function bf(e,r,a,o,l,c,d,S,C){if(Rf.apply(this,arguments),Ba){if(Ba){var L=Li;Ba=!1,Li=null}else throw Error(t(198));Ni||(Ni=!0,po=L)}}function kn(e){var r=e,a=e;if(e.alternate)for(;r.return;)r=r.return;else{e=r;do r=e,(r.flags&4098)!==0&&(a=r.return),e=r.return;while(e)}return r.tag===3?a:null}function Ku(e){if(e.tag===13){var r=e.memoizedState;if(r===null&&(e=e.alternate,e!==null&&(r=e.memoizedState)),r!==null)return r.dehydrated}return null}function Iu(e){if(kn(e)!==e)throw Error(t(188))}function Df(e){var r=e.alternate;if(!r){if(r=kn(e),r===null)throw Error(t(188));return r!==e?null:e}for(var a=e,o=r;;){var l=a.return;if(l===null)break;var c=l.alternate;if(c===null){if(o=l.return,o!==null){a=o;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===a)return Iu(l),e;if(c===o)return Iu(l),r;c=c.sibling}throw Error(t(188))}if(a.return!==o.return)a=l,o=c;else{for(var d=!1,S=l.child;S;){if(S===a){d=!0,a=l,o=c;break}if(S===o){d=!0,o=l,a=c;break}S=S.sibling}if(!d){for(S=c.child;S;){if(S===a){d=!0,a=c,o=l;break}if(S===o){d=!0,o=c,a=l;break}S=S.sibling}if(!d)throw Error(t(189))}}if(a.alternate!==o)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?e:r}function _u(e){return e=Df(e),e!==null?Yu(e):null}function Yu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var r=Yu(e);if(r!==null)return r;e=e.sibling}return null}var Ou=i.unstable_scheduleCallback,Gu=i.unstable_cancelCallback,xf=i.unstable_shouldYield,Kf=i.unstable_requestPaint,Ne=i.unstable_now,If=i.unstable_getCurrentPriorityLevel,go=i.unstable_ImmediatePriority,Hu=i.unstable_UserBlockingPriority,wi=i.unstable_NormalPriority,_f=i.unstable_LowPriority,Vu=i.unstable_IdlePriority,Ri=null,Rr=null;function Yf(e){if(Rr&&typeof Rr.onCommitFiberRoot=="function")try{Rr.onCommitFiberRoot(Ri,e,void 0,(e.current.flags&128)===128)}catch{}}var Cr=Math.clz32?Math.clz32:Hf,Of=Math.log,Gf=Math.LN2;function Hf(e){return e>>>=0,e===0?32:31-(Of(e)/Gf|0)|0}var bi=64,Di=4194304;function La(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function xi(e,r){var a=e.pendingLanes;if(a===0)return 0;var o=0,l=e.suspendedLanes,c=e.pingedLanes,d=a&268435455;if(d!==0){var S=d&~l;S!==0?o=La(S):(c&=d,c!==0&&(o=La(c)))}else d=a&~l,d!==0?o=La(d):c!==0&&(o=La(c));if(o===0)return 0;if(r!==0&&r!==o&&(r&l)===0&&(l=o&-o,c=r&-r,l>=c||l===16&&(c&4194240)!==0))return r;if((o&4)!==0&&(o|=a&16),r=e.entangledLanes,r!==0)for(e=e.entanglements,r&=o;0<r;)a=31-Cr(r),l=1<<a,o|=e[a],r&=~l;return o}function Vf(e,r){switch(e){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ff(e,r){for(var a=e.suspendedLanes,o=e.pingedLanes,l=e.expirationTimes,c=e.pendingLanes;0<c;){var d=31-Cr(c),S=1<<d,C=l[d];C===-1?((S&a)===0||(S&o)!==0)&&(l[d]=Vf(S,r)):C<=r&&(e.expiredLanes|=S),c&=~S}}function yo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Fu(){var e=bi;return bi<<=1,(bi&4194240)===0&&(bi=64),e}function So(e){for(var r=[],a=0;31>a;a++)r.push(e);return r}function Na(e,r,a){e.pendingLanes|=r,r!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,r=31-Cr(r),e[r]=a}function Uf(e,r){var a=e.pendingLanes&~r;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=r,e.mutableReadLanes&=r,e.entangledLanes&=r,r=e.entanglements;var o=e.eventTimes;for(e=e.expirationTimes;0<a;){var l=31-Cr(a),c=1<<l;r[l]=0,o[l]=-1,e[l]=-1,a&=~c}}function ko(e,r){var a=e.entangledLanes|=r;for(e=e.entanglements;a;){var o=31-Cr(a),l=1<<o;l&r|e[o]&r&&(e[o]|=r),a&=~l}}var fe=0;function Uu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ju,vo,Wu,Ju,zu,Co=!1,Ki=[],Qr=null,Xr=null,qr=null,wa=new Map,Ra=new Map,$r=[],jf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zu(e,r){switch(e){case"focusin":case"focusout":Qr=null;break;case"dragenter":case"dragleave":Xr=null;break;case"mouseover":case"mouseout":qr=null;break;case"pointerover":case"pointerout":wa.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ra.delete(r.pointerId)}}function ba(e,r,a,o,l,c){return e===null||e.nativeEvent!==c?(e={blockedOn:r,domEventName:a,eventSystemFlags:o,nativeEvent:c,targetContainers:[l]},r!==null&&(r=Wa(r),r!==null&&vo(r)),e):(e.eventSystemFlags|=o,r=e.targetContainers,l!==null&&r.indexOf(l)===-1&&r.push(l),e)}function Wf(e,r,a,o,l){switch(r){case"focusin":return Qr=ba(Qr,e,r,a,o,l),!0;case"dragenter":return Xr=ba(Xr,e,r,a,o,l),!0;case"mouseover":return qr=ba(qr,e,r,a,o,l),!0;case"pointerover":var c=l.pointerId;return wa.set(c,ba(wa.get(c)||null,e,r,a,o,l)),!0;case"gotpointercapture":return c=l.pointerId,Ra.set(c,ba(Ra.get(c)||null,e,r,a,o,l)),!0}return!1}function Qu(e){var r=vn(e.target);if(r!==null){var a=kn(r);if(a!==null){if(r=a.tag,r===13){if(r=Ku(a),r!==null){e.blockedOn=r,zu(e.priority,function(){Wu(a)});return}}else if(r===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ii(e){if(e.blockedOn!==null)return!1;for(var r=e.targetContainers;0<r.length;){var a=Eo(e.domEventName,e.eventSystemFlags,r[0],e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);co=o,a.target.dispatchEvent(o),co=null}else return r=Wa(a),r!==null&&vo(r),e.blockedOn=a,!1;r.shift()}return!0}function Xu(e,r,a){Ii(e)&&a.delete(r)}function Jf(){Co=!1,Qr!==null&&Ii(Qr)&&(Qr=null),Xr!==null&&Ii(Xr)&&(Xr=null),qr!==null&&Ii(qr)&&(qr=null),wa.forEach(Xu),Ra.forEach(Xu)}function Da(e,r){e.blockedOn===r&&(e.blockedOn=null,Co||(Co=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,Jf)))}function xa(e){function r(l){return Da(l,e)}if(0<Ki.length){Da(Ki[0],e);for(var a=1;a<Ki.length;a++){var o=Ki[a];o.blockedOn===e&&(o.blockedOn=null)}}for(Qr!==null&&Da(Qr,e),Xr!==null&&Da(Xr,e),qr!==null&&Da(qr,e),wa.forEach(r),Ra.forEach(r),a=0;a<$r.length;a++)o=$r[a],o.blockedOn===e&&(o.blockedOn=null);for(;0<$r.length&&(a=$r[0],a.blockedOn===null);)Qu(a),a.blockedOn===null&&$r.shift()}var Vn=Q.ReactCurrentBatchConfig,_i=!0;function zf(e,r,a,o){var l=fe,c=Vn.transition;Vn.transition=null;try{fe=1,Po(e,r,a,o)}finally{fe=l,Vn.transition=c}}function Zf(e,r,a,o){var l=fe,c=Vn.transition;Vn.transition=null;try{fe=4,Po(e,r,a,o)}finally{fe=l,Vn.transition=c}}function Po(e,r,a,o){if(_i){var l=Eo(e,r,a,o);if(l===null)Ho(e,r,o,Yi,a),Zu(e,o);else if(Wf(l,e,r,a,o))o.stopPropagation();else if(Zu(e,o),r&4&&-1<jf.indexOf(e)){for(;l!==null;){var c=Wa(l);if(c!==null&&ju(c),c=Eo(e,r,a,o),c===null&&Ho(e,r,o,Yi,a),c===l)break;l=c}l!==null&&o.stopPropagation()}else Ho(e,r,o,null,a)}}var Yi=null;function Eo(e,r,a,o){if(Yi=null,e=mo(o),e=vn(e),e!==null)if(r=kn(e),r===null)e=null;else if(a=r.tag,a===13){if(e=Ku(r),e!==null)return e;e=null}else if(a===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;e=null}else r!==e&&(e=null);return Yi=e,null}function qu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(If()){case go:return 1;case Hu:return 4;case wi:case _f:return 16;case Vu:return 536870912;default:return 16}default:return 16}}var en=null,Mo=null,Oi=null;function $u(){if(Oi)return Oi;var e,r=Mo,a=r.length,o,l="value"in en?en.value:en.textContent,c=l.length;for(e=0;e<a&&r[e]===l[e];e++);var d=a-e;for(o=1;o<=d&&r[a-o]===l[c-o];o++);return Oi=l.slice(e,1<o?1-o:void 0)}function Gi(e){var r=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&r===13&&(e=13)):e=r,e===10&&(e=13),32<=e||e===13?e:0}function Hi(){return!0}function ec(){return!1}function sr(e){function r(a,o,l,c,d){this._reactName=a,this._targetInst=l,this.type=o,this.nativeEvent=c,this.target=d,this.currentTarget=null;for(var S in e)e.hasOwnProperty(S)&&(a=e[S],this[S]=a?a(c):c[S]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Hi:ec,this.isPropagationStopped=ec,this}return W(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Hi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Hi)},persist:function(){},isPersistent:Hi}),r}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},To=sr(Fn),Ka=W({},Fn,{view:0,detail:0}),Qf=sr(Ka),Bo,Lo,Ia,Vi=W({},Ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ia&&(Ia&&e.type==="mousemove"?(Bo=e.screenX-Ia.screenX,Lo=e.screenY-Ia.screenY):Lo=Bo=0,Ia=e),Bo)},movementY:function(e){return"movementY"in e?e.movementY:Lo}}),rc=sr(Vi),Xf=W({},Vi,{dataTransfer:0}),qf=sr(Xf),$f=W({},Ka,{relatedTarget:0}),No=sr($f),ep=W({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),rp=sr(ep),np=W({},Fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ap=sr(np),ip=W({},Fn,{data:0}),nc=sr(ip),tp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},op={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lp(e){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(e):(e=sp[e])?!!r[e]:!1}function wo(){return lp}var up=W({},Ka,{key:function(e){if(e.key){var r=tp[e.key]||e.key;if(r!=="Unidentified")return r}return e.type==="keypress"?(e=Gi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?op[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wo,charCode:function(e){return e.type==="keypress"?Gi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cp=sr(up),mp=W({},Vi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ac=sr(mp),Ap=W({},Ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wo}),dp=sr(Ap),hp=W({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),fp=sr(hp),pp=W({},Vi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gp=sr(pp),yp=[9,13,27,32],Ro=h&&"CompositionEvent"in window,_a=null;h&&"documentMode"in document&&(_a=document.documentMode);var Sp=h&&"TextEvent"in window&&!_a,ic=h&&(!Ro||_a&&8<_a&&11>=_a),tc=" ",oc=!1;function sc(e,r){switch(e){case"keyup":return yp.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Un=!1;function kp(e,r){switch(e){case"compositionend":return lc(r);case"keypress":return r.which!==32?null:(oc=!0,tc);case"textInput":return e=r.data,e===tc&&oc?null:e;default:return null}}function vp(e,r){if(Un)return e==="compositionend"||!Ro&&sc(e,r)?(e=$u(),Oi=Mo=en=null,Un=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return ic&&r.locale!=="ko"?null:r.data;default:return null}}var Cp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function uc(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r==="input"?!!Cp[e.type]:r==="textarea"}function cc(e,r,a,o){wu(o),r=Ji(r,"onChange"),0<r.length&&(a=new To("onChange","change",null,a,o),e.push({event:a,listeners:r}))}var Ya=null,Oa=null;function Pp(e){Lc(e,0)}function Fi(e){var r=Zn(e);if(yu(r))return e}function Ep(e,r){if(e==="change")return r}var mc=!1;if(h){var bo;if(h){var Do="oninput"in document;if(!Do){var Ac=document.createElement("div");Ac.setAttribute("oninput","return;"),Do=typeof Ac.oninput=="function"}bo=Do}else bo=!1;mc=bo&&(!document.documentMode||9<document.documentMode)}function dc(){Ya&&(Ya.detachEvent("onpropertychange",hc),Oa=Ya=null)}function hc(e){if(e.propertyName==="value"&&Fi(Oa)){var r=[];cc(r,Oa,e,mo(e)),xu(Pp,r)}}function Mp(e,r,a){e==="focusin"?(dc(),Ya=r,Oa=a,Ya.attachEvent("onpropertychange",hc)):e==="focusout"&&dc()}function Tp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fi(Oa)}function Bp(e,r){if(e==="click")return Fi(r)}function Lp(e,r){if(e==="input"||e==="change")return Fi(r)}function Np(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var Pr=typeof Object.is=="function"?Object.is:Np;function Ga(e,r){if(Pr(e,r))return!0;if(typeof e!="object"||e===null||typeof r!="object"||r===null)return!1;var a=Object.keys(e),o=Object.keys(r);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var l=a[o];if(!f.call(r,l)||!Pr(e[l],r[l]))return!1}return!0}function fc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function pc(e,r){var a=fc(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=r&&o>=r)return{node:a,offset:r-e};e=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=fc(a)}}function gc(e,r){return e&&r?e===r?!0:e&&e.nodeType===3?!1:r&&r.nodeType===3?gc(e,r.parentNode):"contains"in e?e.contains(r):e.compareDocumentPosition?!!(e.compareDocumentPosition(r)&16):!1:!1}function yc(){for(var e=window,r=Ti();r instanceof e.HTMLIFrameElement;){try{var a=typeof r.contentWindow.location.href=="string"}catch{a=!1}if(a)e=r.contentWindow;else break;r=Ti(e.document)}return r}function xo(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r&&(r==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||r==="textarea"||e.contentEditable==="true")}function wp(e){var r=yc(),a=e.focusedElem,o=e.selectionRange;if(r!==a&&a&&a.ownerDocument&&gc(a.ownerDocument.documentElement,a)){if(o!==null&&xo(a)){if(r=o.start,e=o.end,e===void 0&&(e=r),"selectionStart"in a)a.selectionStart=r,a.selectionEnd=Math.min(e,a.value.length);else if(e=(r=a.ownerDocument||document)&&r.defaultView||window,e.getSelection){e=e.getSelection();var l=a.textContent.length,c=Math.min(o.start,l);o=o.end===void 0?c:Math.min(o.end,l),!e.extend&&c>o&&(l=o,o=c,c=l),l=pc(a,c);var d=pc(a,o);l&&d&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==d.node||e.focusOffset!==d.offset)&&(r=r.createRange(),r.setStart(l.node,l.offset),e.removeAllRanges(),c>o?(e.addRange(r),e.extend(d.node,d.offset)):(r.setEnd(d.node,d.offset),e.addRange(r)))}}for(r=[],e=a;e=e.parentNode;)e.nodeType===1&&r.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<r.length;a++)e=r[a],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Rp=h&&"documentMode"in document&&11>=document.documentMode,jn=null,Ko=null,Ha=null,Io=!1;function Sc(e,r,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Io||jn==null||jn!==Ti(o)||(o=jn,"selectionStart"in o&&xo(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Ha&&Ga(Ha,o)||(Ha=o,o=Ji(Ko,"onSelect"),0<o.length&&(r=new To("onSelect","select",null,r,a),e.push({event:r,listeners:o}),r.target=jn)))}function Ui(e,r){var a={};return a[e.toLowerCase()]=r.toLowerCase(),a["Webkit"+e]="webkit"+r,a["Moz"+e]="moz"+r,a}var Wn={animationend:Ui("Animation","AnimationEnd"),animationiteration:Ui("Animation","AnimationIteration"),animationstart:Ui("Animation","AnimationStart"),transitionend:Ui("Transition","TransitionEnd")},_o={},kc={};h&&(kc=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function ji(e){if(_o[e])return _o[e];if(!Wn[e])return e;var r=Wn[e],a;for(a in r)if(r.hasOwnProperty(a)&&a in kc)return _o[e]=r[a];return e}var vc=ji("animationend"),Cc=ji("animationiteration"),Pc=ji("animationstart"),Ec=ji("transitionend"),Mc=new Map,Tc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rn(e,r){Mc.set(e,r),A(r,[e])}for(var Yo=0;Yo<Tc.length;Yo++){var Oo=Tc[Yo],bp=Oo.toLowerCase(),Dp=Oo[0].toUpperCase()+Oo.slice(1);rn(bp,"on"+Dp)}rn(vc,"onAnimationEnd"),rn(Cc,"onAnimationIteration"),rn(Pc,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(Ec,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),A("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),A("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),A("onBeforeInput",["compositionend","keypress","textInput","paste"]),A("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Va="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Va));function Bc(e,r,a){var o=e.type||"unknown-event";e.currentTarget=a,bf(o,r,void 0,e),e.currentTarget=null}function Lc(e,r){r=(r&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],l=o.event;o=o.listeners;e:{var c=void 0;if(r)for(var d=o.length-1;0<=d;d--){var S=o[d],C=S.instance,L=S.currentTarget;if(S=S.listener,C!==c&&l.isPropagationStopped())break e;Bc(l,S,L),c=C}else for(d=0;d<o.length;d++){if(S=o[d],C=S.instance,L=S.currentTarget,S=S.listener,C!==c&&l.isPropagationStopped())break e;Bc(l,S,L),c=C}}}if(Ni)throw e=po,Ni=!1,po=null,e}function ye(e,r){var a=r[Jo];a===void 0&&(a=r[Jo]=new Set);var o=e+"__bubble";a.has(o)||(Nc(r,e,2,!1),a.add(o))}function Go(e,r,a){var o=0;r&&(o|=4),Nc(a,e,o,r)}var Wi="_reactListening"+Math.random().toString(36).slice(2);function Fa(e){if(!e[Wi]){e[Wi]=!0,s.forEach(function(a){a!=="selectionchange"&&(xp.has(a)||Go(a,!1,e),Go(a,!0,e))});var r=e.nodeType===9?e:e.ownerDocument;r===null||r[Wi]||(r[Wi]=!0,Go("selectionchange",!1,r))}}function Nc(e,r,a,o){switch(qu(r)){case 1:var l=zf;break;case 4:l=Zf;break;default:l=Po}a=l.bind(null,r,a,e),l=void 0,!fo||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(l=!0),o?l!==void 0?e.addEventListener(r,a,{capture:!0,passive:l}):e.addEventListener(r,a,!0):l!==void 0?e.addEventListener(r,a,{passive:l}):e.addEventListener(r,a,!1)}function Ho(e,r,a,o,l){var c=o;if((r&1)===0&&(r&2)===0&&o!==null)e:for(;;){if(o===null)return;var d=o.tag;if(d===3||d===4){var S=o.stateNode.containerInfo;if(S===l||S.nodeType===8&&S.parentNode===l)break;if(d===4)for(d=o.return;d!==null;){var C=d.tag;if((C===3||C===4)&&(C=d.stateNode.containerInfo,C===l||C.nodeType===8&&C.parentNode===l))return;d=d.return}for(;S!==null;){if(d=vn(S),d===null)return;if(C=d.tag,C===5||C===6){o=c=d;continue e}S=S.parentNode}}o=o.return}xu(function(){var L=c,x=mo(a),K=[];e:{var b=Mc.get(e);if(b!==void 0){var U=To,z=e;switch(e){case"keypress":if(Gi(a)===0)break e;case"keydown":case"keyup":U=cp;break;case"focusin":z="focus",U=No;break;case"focusout":z="blur",U=No;break;case"beforeblur":case"afterblur":U=No;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=rc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=qf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=dp;break;case vc:case Cc:case Pc:U=rp;break;case Ec:U=fp;break;case"scroll":U=Qf;break;case"wheel":U=gp;break;case"copy":case"cut":case"paste":U=ap;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=ac}var Z=(r&4)!==0,we=!Z&&e==="scroll",M=Z?b!==null?b+"Capture":null:b;Z=[];for(var P=L,T;P!==null;){T=P;var Y=T.stateNode;if(T.tag===5&&Y!==null&&(T=Y,M!==null&&(Y=Ma(P,M),Y!=null&&Z.push(Ua(P,Y,T)))),we)break;P=P.return}0<Z.length&&(b=new U(b,z,null,a,x),K.push({event:b,listeners:Z}))}}if((r&7)===0){e:{if(b=e==="mouseover"||e==="pointerover",U=e==="mouseout"||e==="pointerout",b&&a!==co&&(z=a.relatedTarget||a.fromElement)&&(vn(z)||z[Yr]))break e;if((U||b)&&(b=x.window===x?x:(b=x.ownerDocument)?b.defaultView||b.parentWindow:window,U?(z=a.relatedTarget||a.toElement,U=L,z=z?vn(z):null,z!==null&&(we=kn(z),z!==we||z.tag!==5&&z.tag!==6)&&(z=null)):(U=null,z=L),U!==z)){if(Z=rc,Y="onMouseLeave",M="onMouseEnter",P="mouse",(e==="pointerout"||e==="pointerover")&&(Z=ac,Y="onPointerLeave",M="onPointerEnter",P="pointer"),we=U==null?b:Zn(U),T=z==null?b:Zn(z),b=new Z(Y,P+"leave",U,a,x),b.target=we,b.relatedTarget=T,Y=null,vn(x)===L&&(Z=new Z(M,P+"enter",z,a,x),Z.target=T,Z.relatedTarget=we,Y=Z),we=Y,U&&z)r:{for(Z=U,M=z,P=0,T=Z;T;T=Jn(T))P++;for(T=0,Y=M;Y;Y=Jn(Y))T++;for(;0<P-T;)Z=Jn(Z),P--;for(;0<T-P;)M=Jn(M),T--;for(;P--;){if(Z===M||M!==null&&Z===M.alternate)break r;Z=Jn(Z),M=Jn(M)}Z=null}else Z=null;U!==null&&wc(K,b,U,Z,!1),z!==null&&we!==null&&wc(K,we,z,Z,!0)}}e:{if(b=L?Zn(L):window,U=b.nodeName&&b.nodeName.toLowerCase(),U==="select"||U==="input"&&b.type==="file")var q=Ep;else if(uc(b))if(mc)q=Lp;else{q=Tp;var ee=Mp}else(U=b.nodeName)&&U.toLowerCase()==="input"&&(b.type==="checkbox"||b.type==="radio")&&(q=Bp);if(q&&(q=q(e,L))){cc(K,q,a,x);break e}ee&&ee(e,b,L),e==="focusout"&&(ee=b._wrapperState)&&ee.controlled&&b.type==="number"&&to(b,"number",b.value)}switch(ee=L?Zn(L):window,e){case"focusin":(uc(ee)||ee.contentEditable==="true")&&(jn=ee,Ko=L,Ha=null);break;case"focusout":Ha=Ko=jn=null;break;case"mousedown":Io=!0;break;case"contextmenu":case"mouseup":case"dragend":Io=!1,Sc(K,a,x);break;case"selectionchange":if(Rp)break;case"keydown":case"keyup":Sc(K,a,x)}var re;if(Ro)e:{switch(e){case"compositionstart":var ae="onCompositionStart";break e;case"compositionend":ae="onCompositionEnd";break e;case"compositionupdate":ae="onCompositionUpdate";break e}ae=void 0}else Un?sc(e,a)&&(ae="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ae="onCompositionStart");ae&&(ic&&a.locale!=="ko"&&(Un||ae!=="onCompositionStart"?ae==="onCompositionEnd"&&Un&&(re=$u()):(en=x,Mo="value"in en?en.value:en.textContent,Un=!0)),ee=Ji(L,ae),0<ee.length&&(ae=new nc(ae,e,null,a,x),K.push({event:ae,listeners:ee}),re?ae.data=re:(re=lc(a),re!==null&&(ae.data=re)))),(re=Sp?kp(e,a):vp(e,a))&&(L=Ji(L,"onBeforeInput"),0<L.length&&(x=new nc("onBeforeInput","beforeinput",null,a,x),K.push({event:x,listeners:L}),x.data=re))}Lc(K,r)})}function Ua(e,r,a){return{instance:e,listener:r,currentTarget:a}}function Ji(e,r){for(var a=r+"Capture",o=[];e!==null;){var l=e,c=l.stateNode;l.tag===5&&c!==null&&(l=c,c=Ma(e,a),c!=null&&o.unshift(Ua(e,c,l)),c=Ma(e,r),c!=null&&o.push(Ua(e,c,l))),e=e.return}return o}function Jn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wc(e,r,a,o,l){for(var c=r._reactName,d=[];a!==null&&a!==o;){var S=a,C=S.alternate,L=S.stateNode;if(C!==null&&C===o)break;S.tag===5&&L!==null&&(S=L,l?(C=Ma(a,c),C!=null&&d.unshift(Ua(a,C,S))):l||(C=Ma(a,c),C!=null&&d.push(Ua(a,C,S)))),a=a.return}d.length!==0&&e.push({event:r,listeners:d})}var Kp=/\r\n?/g,Ip=/\u0000|\uFFFD/g;function Rc(e){return(typeof e=="string"?e:""+e).replace(Kp,`
`).replace(Ip,"")}function zi(e,r,a){if(r=Rc(r),Rc(e)!==r&&a)throw Error(t(425))}function Zi(){}var Vo=null,Fo=null;function Uo(e,r){return e==="textarea"||e==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var jo=typeof setTimeout=="function"?setTimeout:void 0,_p=typeof clearTimeout=="function"?clearTimeout:void 0,bc=typeof Promise=="function"?Promise:void 0,Yp=typeof queueMicrotask=="function"?queueMicrotask:typeof bc<"u"?function(e){return bc.resolve(null).then(e).catch(Op)}:jo;function Op(e){setTimeout(function(){throw e})}function Wo(e,r){var a=r,o=0;do{var l=a.nextSibling;if(e.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(o===0){e.removeChild(l),xa(r);return}o--}else a!=="$"&&a!=="$?"&&a!=="$!"||o++;a=l}while(a);xa(r)}function nn(e){for(;e!=null;e=e.nextSibling){var r=e.nodeType;if(r===1||r===3)break;if(r===8){if(r=e.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return e}function Dc(e){e=e.previousSibling;for(var r=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(r===0)return e;r--}else a==="/$"&&r++}e=e.previousSibling}return null}var zn=Math.random().toString(36).slice(2),br="__reactFiber$"+zn,ja="__reactProps$"+zn,Yr="__reactContainer$"+zn,Jo="__reactEvents$"+zn,Gp="__reactListeners$"+zn,Hp="__reactHandles$"+zn;function vn(e){var r=e[br];if(r)return r;for(var a=e.parentNode;a;){if(r=a[Yr]||a[br]){if(a=r.alternate,r.child!==null||a!==null&&a.child!==null)for(e=Dc(e);e!==null;){if(a=e[br])return a;e=Dc(e)}return r}e=a,a=e.parentNode}return null}function Wa(e){return e=e[br]||e[Yr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(t(33))}function Qi(e){return e[ja]||null}var zo=[],Qn=-1;function an(e){return{current:e}}function Se(e){0>Qn||(e.current=zo[Qn],zo[Qn]=null,Qn--)}function ge(e,r){Qn++,zo[Qn]=e.current,e.current=r}var tn={},Ve=an(tn),$e=an(!1),Cn=tn;function Xn(e,r){var a=e.type.contextTypes;if(!a)return tn;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===r)return o.__reactInternalMemoizedMaskedChildContext;var l={},c;for(c in a)l[c]=r[c];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=l),l}function er(e){return e=e.childContextTypes,e!=null}function Xi(){Se($e),Se(Ve)}function xc(e,r,a){if(Ve.current!==tn)throw Error(t(168));ge(Ve,r),ge($e,a)}function Kc(e,r,a){var o=e.stateNode;if(r=r.childContextTypes,typeof o.getChildContext!="function")return a;o=o.getChildContext();for(var l in o)if(!(l in r))throw Error(t(108,pe(e)||"Unknown",l));return W({},a,o)}function qi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||tn,Cn=Ve.current,ge(Ve,e),ge($e,$e.current),!0}function Ic(e,r,a){var o=e.stateNode;if(!o)throw Error(t(169));a?(e=Kc(e,r,Cn),o.__reactInternalMemoizedMergedChildContext=e,Se($e),Se(Ve),ge(Ve,e)):Se($e),ge($e,a)}var Or=null,$i=!1,Zo=!1;function _c(e){Or===null?Or=[e]:Or.push(e)}function Vp(e){$i=!0,_c(e)}function on(){if(!Zo&&Or!==null){Zo=!0;var e=0,r=fe;try{var a=Or;for(fe=1;e<a.length;e++){var o=a[e];do o=o(!0);while(o!==null)}Or=null,$i=!1}catch(l){throw Or!==null&&(Or=Or.slice(e+1)),Ou(go,on),l}finally{fe=r,Zo=!1}}return null}var qn=[],$n=0,et=null,rt=0,dr=[],hr=0,Pn=null,Gr=1,Hr="";function En(e,r){qn[$n++]=rt,qn[$n++]=et,et=e,rt=r}function Yc(e,r,a){dr[hr++]=Gr,dr[hr++]=Hr,dr[hr++]=Pn,Pn=e;var o=Gr;e=Hr;var l=32-Cr(o)-1;o&=~(1<<l),a+=1;var c=32-Cr(r)+l;if(30<c){var d=l-l%5;c=(o&(1<<d)-1).toString(32),o>>=d,l-=d,Gr=1<<32-Cr(r)+l|a<<l|o,Hr=c+e}else Gr=1<<c|a<<l|o,Hr=e}function Qo(e){e.return!==null&&(En(e,1),Yc(e,1,0))}function Xo(e){for(;e===et;)et=qn[--$n],qn[$n]=null,rt=qn[--$n],qn[$n]=null;for(;e===Pn;)Pn=dr[--hr],dr[hr]=null,Hr=dr[--hr],dr[hr]=null,Gr=dr[--hr],dr[hr]=null}var lr=null,ur=null,Pe=!1,Er=null;function Oc(e,r){var a=yr(5,null,null,0);a.elementType="DELETED",a.stateNode=r,a.return=e,r=e.deletions,r===null?(e.deletions=[a],e.flags|=16):r.push(a)}function Gc(e,r){switch(e.tag){case 5:var a=e.type;return r=r.nodeType!==1||a.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(e.stateNode=r,lr=e,ur=nn(r.firstChild),!0):!1;case 6:return r=e.pendingProps===""||r.nodeType!==3?null:r,r!==null?(e.stateNode=r,lr=e,ur=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(a=Pn!==null?{id:Gr,overflow:Hr}:null,e.memoizedState={dehydrated:r,treeContext:a,retryLane:1073741824},a=yr(18,null,null,0),a.stateNode=r,a.return=e,e.child=a,lr=e,ur=null,!0):!1;default:return!1}}function qo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function $o(e){if(Pe){var r=ur;if(r){var a=r;if(!Gc(e,r)){if(qo(e))throw Error(t(418));r=nn(a.nextSibling);var o=lr;r&&Gc(e,r)?Oc(o,a):(e.flags=e.flags&-4097|2,Pe=!1,lr=e)}}else{if(qo(e))throw Error(t(418));e.flags=e.flags&-4097|2,Pe=!1,lr=e}}}function Hc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;lr=e}function nt(e){if(e!==lr)return!1;if(!Pe)return Hc(e),Pe=!0,!1;var r;if((r=e.tag!==3)&&!(r=e.tag!==5)&&(r=e.type,r=r!=="head"&&r!=="body"&&!Uo(e.type,e.memoizedProps)),r&&(r=ur)){if(qo(e))throw Vc(),Error(t(418));for(;r;)Oc(e,r),r=nn(r.nextSibling)}if(Hc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(t(317));e:{for(e=e.nextSibling,r=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"){if(r===0){ur=nn(e.nextSibling);break e}r--}else a!=="$"&&a!=="$!"&&a!=="$?"||r++}e=e.nextSibling}ur=null}}else ur=lr?nn(e.stateNode.nextSibling):null;return!0}function Vc(){for(var e=ur;e;)e=nn(e.nextSibling)}function ea(){ur=lr=null,Pe=!1}function es(e){Er===null?Er=[e]:Er.push(e)}var Fp=Q.ReactCurrentBatchConfig;function Ja(e,r,a){if(e=a.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var o=a.stateNode}if(!o)throw Error(t(147,e));var l=o,c=""+e;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===c?r.ref:(r=function(d){var S=l.refs;d===null?delete S[c]:S[c]=d},r._stringRef=c,r)}if(typeof e!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,e))}return e}function at(e,r){throw e=Object.prototype.toString.call(r),Error(t(31,e==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":e))}function Fc(e){var r=e._init;return r(e._payload)}function Uc(e){function r(M,P){if(e){var T=M.deletions;T===null?(M.deletions=[P],M.flags|=16):T.push(P)}}function a(M,P){if(!e)return null;for(;P!==null;)r(M,P),P=P.sibling;return null}function o(M,P){for(M=new Map;P!==null;)P.key!==null?M.set(P.key,P):M.set(P.index,P),P=P.sibling;return M}function l(M,P){return M=hn(M,P),M.index=0,M.sibling=null,M}function c(M,P,T){return M.index=T,e?(T=M.alternate,T!==null?(T=T.index,T<P?(M.flags|=2,P):T):(M.flags|=2,P)):(M.flags|=1048576,P)}function d(M){return e&&M.alternate===null&&(M.flags|=2),M}function S(M,P,T,Y){return P===null||P.tag!==6?(P=js(T,M.mode,Y),P.return=M,P):(P=l(P,T),P.return=M,P)}function C(M,P,T,Y){var q=T.type;return q===X?x(M,P,T.props.children,Y,T.key):P!==null&&(P.elementType===q||typeof q=="object"&&q!==null&&q.$$typeof===Ze&&Fc(q)===P.type)?(Y=l(P,T.props),Y.ref=Ja(M,P,T),Y.return=M,Y):(Y=Bt(T.type,T.key,T.props,null,M.mode,Y),Y.ref=Ja(M,P,T),Y.return=M,Y)}function L(M,P,T,Y){return P===null||P.tag!==4||P.stateNode.containerInfo!==T.containerInfo||P.stateNode.implementation!==T.implementation?(P=Ws(T,M.mode,Y),P.return=M,P):(P=l(P,T.children||[]),P.return=M,P)}function x(M,P,T,Y,q){return P===null||P.tag!==7?(P=bn(T,M.mode,Y,q),P.return=M,P):(P=l(P,T),P.return=M,P)}function K(M,P,T){if(typeof P=="string"&&P!==""||typeof P=="number")return P=js(""+P,M.mode,T),P.return=M,P;if(typeof P=="object"&&P!==null){switch(P.$$typeof){case H:return T=Bt(P.type,P.key,P.props,null,M.mode,T),T.ref=Ja(M,null,P),T.return=M,T;case F:return P=Ws(P,M.mode,T),P.return=M,P;case Ze:var Y=P._init;return K(M,Y(P._payload),T)}if(Ca(P)||$(P))return P=bn(P,M.mode,T,null),P.return=M,P;at(M,P)}return null}function b(M,P,T,Y){var q=P!==null?P.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return q!==null?null:S(M,P,""+T,Y);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case H:return T.key===q?C(M,P,T,Y):null;case F:return T.key===q?L(M,P,T,Y):null;case Ze:return q=T._init,b(M,P,q(T._payload),Y)}if(Ca(T)||$(T))return q!==null?null:x(M,P,T,Y,null);at(M,T)}return null}function U(M,P,T,Y,q){if(typeof Y=="string"&&Y!==""||typeof Y=="number")return M=M.get(T)||null,S(P,M,""+Y,q);if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case H:return M=M.get(Y.key===null?T:Y.key)||null,C(P,M,Y,q);case F:return M=M.get(Y.key===null?T:Y.key)||null,L(P,M,Y,q);case Ze:var ee=Y._init;return U(M,P,T,ee(Y._payload),q)}if(Ca(Y)||$(Y))return M=M.get(T)||null,x(P,M,Y,q,null);at(P,Y)}return null}function z(M,P,T,Y){for(var q=null,ee=null,re=P,ae=P=0,Ye=null;re!==null&&ae<T.length;ae++){re.index>ae?(Ye=re,re=null):Ye=re.sibling;var Ae=b(M,re,T[ae],Y);if(Ae===null){re===null&&(re=Ye);break}e&&re&&Ae.alternate===null&&r(M,re),P=c(Ae,P,ae),ee===null?q=Ae:ee.sibling=Ae,ee=Ae,re=Ye}if(ae===T.length)return a(M,re),Pe&&En(M,ae),q;if(re===null){for(;ae<T.length;ae++)re=K(M,T[ae],Y),re!==null&&(P=c(re,P,ae),ee===null?q=re:ee.sibling=re,ee=re);return Pe&&En(M,ae),q}for(re=o(M,re);ae<T.length;ae++)Ye=U(re,M,ae,T[ae],Y),Ye!==null&&(e&&Ye.alternate!==null&&re.delete(Ye.key===null?ae:Ye.key),P=c(Ye,P,ae),ee===null?q=Ye:ee.sibling=Ye,ee=Ye);return e&&re.forEach(function(fn){return r(M,fn)}),Pe&&En(M,ae),q}function Z(M,P,T,Y){var q=$(T);if(typeof q!="function")throw Error(t(150));if(T=q.call(T),T==null)throw Error(t(151));for(var ee=q=null,re=P,ae=P=0,Ye=null,Ae=T.next();re!==null&&!Ae.done;ae++,Ae=T.next()){re.index>ae?(Ye=re,re=null):Ye=re.sibling;var fn=b(M,re,Ae.value,Y);if(fn===null){re===null&&(re=Ye);break}e&&re&&fn.alternate===null&&r(M,re),P=c(fn,P,ae),ee===null?q=fn:ee.sibling=fn,ee=fn,re=Ye}if(Ae.done)return a(M,re),Pe&&En(M,ae),q;if(re===null){for(;!Ae.done;ae++,Ae=T.next())Ae=K(M,Ae.value,Y),Ae!==null&&(P=c(Ae,P,ae),ee===null?q=Ae:ee.sibling=Ae,ee=Ae);return Pe&&En(M,ae),q}for(re=o(M,re);!Ae.done;ae++,Ae=T.next())Ae=U(re,M,ae,Ae.value,Y),Ae!==null&&(e&&Ae.alternate!==null&&re.delete(Ae.key===null?ae:Ae.key),P=c(Ae,P,ae),ee===null?q=Ae:ee.sibling=Ae,ee=Ae);return e&&re.forEach(function(Cg){return r(M,Cg)}),Pe&&En(M,ae),q}function we(M,P,T,Y){if(typeof T=="object"&&T!==null&&T.type===X&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case H:e:{for(var q=T.key,ee=P;ee!==null;){if(ee.key===q){if(q=T.type,q===X){if(ee.tag===7){a(M,ee.sibling),P=l(ee,T.props.children),P.return=M,M=P;break e}}else if(ee.elementType===q||typeof q=="object"&&q!==null&&q.$$typeof===Ze&&Fc(q)===ee.type){a(M,ee.sibling),P=l(ee,T.props),P.ref=Ja(M,ee,T),P.return=M,M=P;break e}a(M,ee);break}else r(M,ee);ee=ee.sibling}T.type===X?(P=bn(T.props.children,M.mode,Y,T.key),P.return=M,M=P):(Y=Bt(T.type,T.key,T.props,null,M.mode,Y),Y.ref=Ja(M,P,T),Y.return=M,M=Y)}return d(M);case F:e:{for(ee=T.key;P!==null;){if(P.key===ee)if(P.tag===4&&P.stateNode.containerInfo===T.containerInfo&&P.stateNode.implementation===T.implementation){a(M,P.sibling),P=l(P,T.children||[]),P.return=M,M=P;break e}else{a(M,P);break}else r(M,P);P=P.sibling}P=Ws(T,M.mode,Y),P.return=M,M=P}return d(M);case Ze:return ee=T._init,we(M,P,ee(T._payload),Y)}if(Ca(T))return z(M,P,T,Y);if($(T))return Z(M,P,T,Y);at(M,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,P!==null&&P.tag===6?(a(M,P.sibling),P=l(P,T),P.return=M,M=P):(a(M,P),P=js(T,M.mode,Y),P.return=M,M=P),d(M)):a(M,P)}return we}var ra=Uc(!0),jc=Uc(!1),it=an(null),tt=null,na=null,rs=null;function ns(){rs=na=tt=null}function as(e){var r=it.current;Se(it),e._currentValue=r}function is(e,r,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&r)!==r?(e.childLanes|=r,o!==null&&(o.childLanes|=r)):o!==null&&(o.childLanes&r)!==r&&(o.childLanes|=r),e===a)break;e=e.return}}function aa(e,r){tt=e,rs=na=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&r)!==0&&(rr=!0),e.firstContext=null)}function fr(e){var r=e._currentValue;if(rs!==e)if(e={context:e,memoizedValue:r,next:null},na===null){if(tt===null)throw Error(t(308));na=e,tt.dependencies={lanes:0,firstContext:e}}else na=na.next=e;return r}var Mn=null;function ts(e){Mn===null?Mn=[e]:Mn.push(e)}function Wc(e,r,a,o){var l=r.interleaved;return l===null?(a.next=a,ts(r)):(a.next=l.next,l.next=a),r.interleaved=a,Vr(e,o)}function Vr(e,r){e.lanes|=r;var a=e.alternate;for(a!==null&&(a.lanes|=r),a=e,e=e.return;e!==null;)e.childLanes|=r,a=e.alternate,a!==null&&(a.childLanes|=r),a=e,e=e.return;return a.tag===3?a.stateNode:null}var sn=!1;function os(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Jc(e,r){e=e.updateQueue,r.updateQueue===e&&(r.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Fr(e,r){return{eventTime:e,lane:r,tag:0,payload:null,callback:null,next:null}}function ln(e,r,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(ue&2)!==0){var l=o.pending;return l===null?r.next=r:(r.next=l.next,l.next=r),o.pending=r,Vr(e,a)}return l=o.interleaved,l===null?(r.next=r,ts(o)):(r.next=l.next,l.next=r),o.interleaved=r,Vr(e,a)}function ot(e,r,a){if(r=r.updateQueue,r!==null&&(r=r.shared,(a&4194240)!==0)){var o=r.lanes;o&=e.pendingLanes,a|=o,r.lanes=a,ko(e,a)}}function zc(e,r){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var l=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var d={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};c===null?l=c=d:c=c.next=d,a=a.next}while(a!==null);c===null?l=c=r:c=c.next=r}else l=c=r;a={baseState:o.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:o.shared,effects:o.effects},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=r:e.next=r,a.lastBaseUpdate=r}function st(e,r,a,o){var l=e.updateQueue;sn=!1;var c=l.firstBaseUpdate,d=l.lastBaseUpdate,S=l.shared.pending;if(S!==null){l.shared.pending=null;var C=S,L=C.next;C.next=null,d===null?c=L:d.next=L,d=C;var x=e.alternate;x!==null&&(x=x.updateQueue,S=x.lastBaseUpdate,S!==d&&(S===null?x.firstBaseUpdate=L:S.next=L,x.lastBaseUpdate=C))}if(c!==null){var K=l.baseState;d=0,x=L=C=null,S=c;do{var b=S.lane,U=S.eventTime;if((o&b)===b){x!==null&&(x=x.next={eventTime:U,lane:0,tag:S.tag,payload:S.payload,callback:S.callback,next:null});e:{var z=e,Z=S;switch(b=r,U=a,Z.tag){case 1:if(z=Z.payload,typeof z=="function"){K=z.call(U,K,b);break e}K=z;break e;case 3:z.flags=z.flags&-65537|128;case 0:if(z=Z.payload,b=typeof z=="function"?z.call(U,K,b):z,b==null)break e;K=W({},K,b);break e;case 2:sn=!0}}S.callback!==null&&S.lane!==0&&(e.flags|=64,b=l.effects,b===null?l.effects=[S]:b.push(S))}else U={eventTime:U,lane:b,tag:S.tag,payload:S.payload,callback:S.callback,next:null},x===null?(L=x=U,C=K):x=x.next=U,d|=b;if(S=S.next,S===null){if(S=l.shared.pending,S===null)break;b=S,S=b.next,b.next=null,l.lastBaseUpdate=b,l.shared.pending=null}}while(!0);if(x===null&&(C=K),l.baseState=C,l.firstBaseUpdate=L,l.lastBaseUpdate=x,r=l.shared.interleaved,r!==null){l=r;do d|=l.lane,l=l.next;while(l!==r)}else c===null&&(l.shared.lanes=0);Ln|=d,e.lanes=d,e.memoizedState=K}}function Zc(e,r,a){if(e=r.effects,r.effects=null,e!==null)for(r=0;r<e.length;r++){var o=e[r],l=o.callback;if(l!==null){if(o.callback=null,o=a,typeof l!="function")throw Error(t(191,l));l.call(o)}}}var za={},Dr=an(za),Za=an(za),Qa=an(za);function Tn(e){if(e===za)throw Error(t(174));return e}function ss(e,r){switch(ge(Qa,r),ge(Za,e),ge(Dr,za),e=r.nodeType,e){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:so(null,"");break;default:e=e===8?r.parentNode:r,r=e.namespaceURI||null,e=e.tagName,r=so(r,e)}Se(Dr),ge(Dr,r)}function ia(){Se(Dr),Se(Za),Se(Qa)}function Qc(e){Tn(Qa.current);var r=Tn(Dr.current),a=so(r,e.type);r!==a&&(ge(Za,e),ge(Dr,a))}function ls(e){Za.current===e&&(Se(Dr),Se(Za))}var Ee=an(0);function lt(e){for(var r=e;r!==null;){if(r.tag===13){var a=r.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var us=[];function cs(){for(var e=0;e<us.length;e++)us[e]._workInProgressVersionPrimary=null;us.length=0}var ut=Q.ReactCurrentDispatcher,ms=Q.ReactCurrentBatchConfig,Bn=0,Me=null,xe=null,Ie=null,ct=!1,Xa=!1,qa=0,Up=0;function Fe(){throw Error(t(321))}function As(e,r){if(r===null)return!1;for(var a=0;a<r.length&&a<e.length;a++)if(!Pr(e[a],r[a]))return!1;return!0}function ds(e,r,a,o,l,c){if(Bn=c,Me=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,ut.current=e===null||e.memoizedState===null?zp:Zp,e=a(o,l),Xa){c=0;do{if(Xa=!1,qa=0,25<=c)throw Error(t(301));c+=1,Ie=xe=null,r.updateQueue=null,ut.current=Qp,e=a(o,l)}while(Xa)}if(ut.current=dt,r=xe!==null&&xe.next!==null,Bn=0,Ie=xe=Me=null,ct=!1,r)throw Error(t(300));return e}function hs(){var e=qa!==0;return qa=0,e}function xr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ie===null?Me.memoizedState=Ie=e:Ie=Ie.next=e,Ie}function pr(){if(xe===null){var e=Me.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var r=Ie===null?Me.memoizedState:Ie.next;if(r!==null)Ie=r,xe=e;else{if(e===null)throw Error(t(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},Ie===null?Me.memoizedState=Ie=e:Ie=Ie.next=e}return Ie}function $a(e,r){return typeof r=="function"?r(e):r}function fs(e){var r=pr(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=e;var o=xe,l=o.baseQueue,c=a.pending;if(c!==null){if(l!==null){var d=l.next;l.next=c.next,c.next=d}o.baseQueue=l=c,a.pending=null}if(l!==null){c=l.next,o=o.baseState;var S=d=null,C=null,L=c;do{var x=L.lane;if((Bn&x)===x)C!==null&&(C=C.next={lane:0,action:L.action,hasEagerState:L.hasEagerState,eagerState:L.eagerState,next:null}),o=L.hasEagerState?L.eagerState:e(o,L.action);else{var K={lane:x,action:L.action,hasEagerState:L.hasEagerState,eagerState:L.eagerState,next:null};C===null?(S=C=K,d=o):C=C.next=K,Me.lanes|=x,Ln|=x}L=L.next}while(L!==null&&L!==c);C===null?d=o:C.next=S,Pr(o,r.memoizedState)||(rr=!0),r.memoizedState=o,r.baseState=d,r.baseQueue=C,a.lastRenderedState=o}if(e=a.interleaved,e!==null){l=e;do c=l.lane,Me.lanes|=c,Ln|=c,l=l.next;while(l!==e)}else l===null&&(a.lanes=0);return[r.memoizedState,a.dispatch]}function ps(e){var r=pr(),a=r.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=e;var o=a.dispatch,l=a.pending,c=r.memoizedState;if(l!==null){a.pending=null;var d=l=l.next;do c=e(c,d.action),d=d.next;while(d!==l);Pr(c,r.memoizedState)||(rr=!0),r.memoizedState=c,r.baseQueue===null&&(r.baseState=c),a.lastRenderedState=c}return[c,o]}function Xc(){}function qc(e,r){var a=Me,o=pr(),l=r(),c=!Pr(o.memoizedState,l);if(c&&(o.memoizedState=l,rr=!0),o=o.queue,gs(rm.bind(null,a,o,e),[e]),o.getSnapshot!==r||c||Ie!==null&&Ie.memoizedState.tag&1){if(a.flags|=2048,ei(9,em.bind(null,a,o,l,r),void 0,null),_e===null)throw Error(t(349));(Bn&30)!==0||$c(a,r,l)}return l}function $c(e,r,a){e.flags|=16384,e={getSnapshot:r,value:a},r=Me.updateQueue,r===null?(r={lastEffect:null,stores:null},Me.updateQueue=r,r.stores=[e]):(a=r.stores,a===null?r.stores=[e]:a.push(e))}function em(e,r,a,o){r.value=a,r.getSnapshot=o,nm(r)&&am(e)}function rm(e,r,a){return a(function(){nm(r)&&am(e)})}function nm(e){var r=e.getSnapshot;e=e.value;try{var a=r();return!Pr(e,a)}catch{return!0}}function am(e){var r=Vr(e,1);r!==null&&Lr(r,e,1,-1)}function im(e){var r=xr();return typeof e=="function"&&(e=e()),r.memoizedState=r.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$a,lastRenderedState:e},r.queue=e,e=e.dispatch=Jp.bind(null,Me,e),[r.memoizedState,e]}function ei(e,r,a,o){return e={tag:e,create:r,destroy:a,deps:o,next:null},r=Me.updateQueue,r===null?(r={lastEffect:null,stores:null},Me.updateQueue=r,r.lastEffect=e.next=e):(a=r.lastEffect,a===null?r.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,r.lastEffect=e)),e}function tm(){return pr().memoizedState}function mt(e,r,a,o){var l=xr();Me.flags|=e,l.memoizedState=ei(1|r,a,void 0,o===void 0?null:o)}function At(e,r,a,o){var l=pr();o=o===void 0?null:o;var c=void 0;if(xe!==null){var d=xe.memoizedState;if(c=d.destroy,o!==null&&As(o,d.deps)){l.memoizedState=ei(r,a,c,o);return}}Me.flags|=e,l.memoizedState=ei(1|r,a,c,o)}function om(e,r){return mt(8390656,8,e,r)}function gs(e,r){return At(2048,8,e,r)}function sm(e,r){return At(4,2,e,r)}function lm(e,r){return At(4,4,e,r)}function um(e,r){if(typeof r=="function")return e=e(),r(e),function(){r(null)};if(r!=null)return e=e(),r.current=e,function(){r.current=null}}function cm(e,r,a){return a=a!=null?a.concat([e]):null,At(4,4,um.bind(null,r,e),a)}function ys(){}function mm(e,r){var a=pr();r=r===void 0?null:r;var o=a.memoizedState;return o!==null&&r!==null&&As(r,o[1])?o[0]:(a.memoizedState=[e,r],e)}function Am(e,r){var a=pr();r=r===void 0?null:r;var o=a.memoizedState;return o!==null&&r!==null&&As(r,o[1])?o[0]:(e=e(),a.memoizedState=[e,r],e)}function dm(e,r,a){return(Bn&21)===0?(e.baseState&&(e.baseState=!1,rr=!0),e.memoizedState=a):(Pr(a,r)||(a=Fu(),Me.lanes|=a,Ln|=a,e.baseState=!0),r)}function jp(e,r){var a=fe;fe=a!==0&&4>a?a:4,e(!0);var o=ms.transition;ms.transition={};try{e(!1),r()}finally{fe=a,ms.transition=o}}function hm(){return pr().memoizedState}function Wp(e,r,a){var o=An(e);if(a={lane:o,action:a,hasEagerState:!1,eagerState:null,next:null},fm(e))pm(r,a);else if(a=Wc(e,r,a,o),a!==null){var l=Xe();Lr(a,e,o,l),gm(a,r,o)}}function Jp(e,r,a){var o=An(e),l={lane:o,action:a,hasEagerState:!1,eagerState:null,next:null};if(fm(e))pm(r,l);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=r.lastRenderedReducer,c!==null))try{var d=r.lastRenderedState,S=c(d,a);if(l.hasEagerState=!0,l.eagerState=S,Pr(S,d)){var C=r.interleaved;C===null?(l.next=l,ts(r)):(l.next=C.next,C.next=l),r.interleaved=l;return}}catch{}finally{}a=Wc(e,r,l,o),a!==null&&(l=Xe(),Lr(a,e,o,l),gm(a,r,o))}}function fm(e){var r=e.alternate;return e===Me||r!==null&&r===Me}function pm(e,r){Xa=ct=!0;var a=e.pending;a===null?r.next=r:(r.next=a.next,a.next=r),e.pending=r}function gm(e,r,a){if((a&4194240)!==0){var o=r.lanes;o&=e.pendingLanes,a|=o,r.lanes=a,ko(e,a)}}var dt={readContext:fr,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useInsertionEffect:Fe,useLayoutEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useMutableSource:Fe,useSyncExternalStore:Fe,useId:Fe,unstable_isNewReconciler:!1},zp={readContext:fr,useCallback:function(e,r){return xr().memoizedState=[e,r===void 0?null:r],e},useContext:fr,useEffect:om,useImperativeHandle:function(e,r,a){return a=a!=null?a.concat([e]):null,mt(4194308,4,um.bind(null,r,e),a)},useLayoutEffect:function(e,r){return mt(4194308,4,e,r)},useInsertionEffect:function(e,r){return mt(4,2,e,r)},useMemo:function(e,r){var a=xr();return r=r===void 0?null:r,e=e(),a.memoizedState=[e,r],e},useReducer:function(e,r,a){var o=xr();return r=a!==void 0?a(r):r,o.memoizedState=o.baseState=r,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},o.queue=e,e=e.dispatch=Wp.bind(null,Me,e),[o.memoizedState,e]},useRef:function(e){var r=xr();return e={current:e},r.memoizedState=e},useState:im,useDebugValue:ys,useDeferredValue:function(e){return xr().memoizedState=e},useTransition:function(){var e=im(!1),r=e[0];return e=jp.bind(null,e[1]),xr().memoizedState=e,[r,e]},useMutableSource:function(){},useSyncExternalStore:function(e,r,a){var o=Me,l=xr();if(Pe){if(a===void 0)throw Error(t(407));a=a()}else{if(a=r(),_e===null)throw Error(t(349));(Bn&30)!==0||$c(o,r,a)}l.memoizedState=a;var c={value:a,getSnapshot:r};return l.queue=c,om(rm.bind(null,o,c,e),[e]),o.flags|=2048,ei(9,em.bind(null,o,c,a,r),void 0,null),a},useId:function(){var e=xr(),r=_e.identifierPrefix;if(Pe){var a=Hr,o=Gr;a=(o&~(1<<32-Cr(o)-1)).toString(32)+a,r=":"+r+"R"+a,a=qa++,0<a&&(r+="H"+a.toString(32)),r+=":"}else a=Up++,r=":"+r+"r"+a.toString(32)+":";return e.memoizedState=r},unstable_isNewReconciler:!1},Zp={readContext:fr,useCallback:mm,useContext:fr,useEffect:gs,useImperativeHandle:cm,useInsertionEffect:sm,useLayoutEffect:lm,useMemo:Am,useReducer:fs,useRef:tm,useState:function(){return fs($a)},useDebugValue:ys,useDeferredValue:function(e){var r=pr();return dm(r,xe.memoizedState,e)},useTransition:function(){var e=fs($a)[0],r=pr().memoizedState;return[e,r]},useMutableSource:Xc,useSyncExternalStore:qc,useId:hm,unstable_isNewReconciler:!1},Qp={readContext:fr,useCallback:mm,useContext:fr,useEffect:gs,useImperativeHandle:cm,useInsertionEffect:sm,useLayoutEffect:lm,useMemo:Am,useReducer:ps,useRef:tm,useState:function(){return ps($a)},useDebugValue:ys,useDeferredValue:function(e){var r=pr();return xe===null?r.memoizedState=e:dm(r,xe.memoizedState,e)},useTransition:function(){var e=ps($a)[0],r=pr().memoizedState;return[e,r]},useMutableSource:Xc,useSyncExternalStore:qc,useId:hm,unstable_isNewReconciler:!1};function Mr(e,r){if(e&&e.defaultProps){r=W({},r),e=e.defaultProps;for(var a in e)r[a]===void 0&&(r[a]=e[a]);return r}return r}function Ss(e,r,a,o){r=e.memoizedState,a=a(o,r),a=a==null?r:W({},r,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ht={isMounted:function(e){return(e=e._reactInternals)?kn(e)===e:!1},enqueueSetState:function(e,r,a){e=e._reactInternals;var o=Xe(),l=An(e),c=Fr(o,l);c.payload=r,a!=null&&(c.callback=a),r=ln(e,c,l),r!==null&&(Lr(r,e,l,o),ot(r,e,l))},enqueueReplaceState:function(e,r,a){e=e._reactInternals;var o=Xe(),l=An(e),c=Fr(o,l);c.tag=1,c.payload=r,a!=null&&(c.callback=a),r=ln(e,c,l),r!==null&&(Lr(r,e,l,o),ot(r,e,l))},enqueueForceUpdate:function(e,r){e=e._reactInternals;var a=Xe(),o=An(e),l=Fr(a,o);l.tag=2,r!=null&&(l.callback=r),r=ln(e,l,o),r!==null&&(Lr(r,e,o,a),ot(r,e,o))}};function ym(e,r,a,o,l,c,d){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,c,d):r.prototype&&r.prototype.isPureReactComponent?!Ga(a,o)||!Ga(l,c):!0}function Sm(e,r,a){var o=!1,l=tn,c=r.contextType;return typeof c=="object"&&c!==null?c=fr(c):(l=er(r)?Cn:Ve.current,o=r.contextTypes,c=(o=o!=null)?Xn(e,l):tn),r=new r(a,c),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=ht,e.stateNode=r,r._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=c),r}function km(e,r,a,o){e=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(a,o),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(a,o),r.state!==e&&ht.enqueueReplaceState(r,r.state,null)}function ks(e,r,a,o){var l=e.stateNode;l.props=a,l.state=e.memoizedState,l.refs={},os(e);var c=r.contextType;typeof c=="object"&&c!==null?l.context=fr(c):(c=er(r)?Cn:Ve.current,l.context=Xn(e,c)),l.state=e.memoizedState,c=r.getDerivedStateFromProps,typeof c=="function"&&(Ss(e,r,c,a),l.state=e.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(r=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),r!==l.state&&ht.enqueueReplaceState(l,l.state,null),st(e,a,l,o),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function ta(e,r){try{var a="",o=r;do a+=ce(o),o=o.return;while(o);var l=a}catch(c){l=`
Error generating stack: `+c.message+`
`+c.stack}return{value:e,source:r,stack:l,digest:null}}function vs(e,r,a){return{value:e,source:null,stack:a??null,digest:r??null}}function Cs(e,r){try{console.error(r.value)}catch(a){setTimeout(function(){throw a})}}var Xp=typeof WeakMap=="function"?WeakMap:Map;function vm(e,r,a){a=Fr(-1,a),a.tag=3,a.payload={element:null};var o=r.value;return a.callback=function(){vt||(vt=!0,_s=o),Cs(e,r)},a}function Cm(e,r,a){a=Fr(-1,a),a.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var l=r.value;a.payload=function(){return o(l)},a.callback=function(){Cs(e,r)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(a.callback=function(){Cs(e,r),typeof o!="function"&&(cn===null?cn=new Set([this]):cn.add(this));var d=r.stack;this.componentDidCatch(r.value,{componentStack:d!==null?d:""})}),a}function Pm(e,r,a){var o=e.pingCache;if(o===null){o=e.pingCache=new Xp;var l=new Set;o.set(r,l)}else l=o.get(r),l===void 0&&(l=new Set,o.set(r,l));l.has(a)||(l.add(a),e=mg.bind(null,e,r,a),r.then(e,e))}function Em(e){do{var r;if((r=e.tag===13)&&(r=e.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return e;e=e.return}while(e!==null);return null}function Mm(e,r,a,o,l){return(e.mode&1)===0?(e===r?e.flags|=65536:(e.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(r=Fr(-1,1),r.tag=2,ln(a,r,1))),a.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var qp=Q.ReactCurrentOwner,rr=!1;function Qe(e,r,a,o){r.child=e===null?jc(r,null,a,o):ra(r,e.child,a,o)}function Tm(e,r,a,o,l){a=a.render;var c=r.ref;return aa(r,l),o=ds(e,r,a,o,c,l),a=hs(),e!==null&&!rr?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~l,Ur(e,r,l)):(Pe&&a&&Qo(r),r.flags|=1,Qe(e,r,o,l),r.child)}function Bm(e,r,a,o,l){if(e===null){var c=a.type;return typeof c=="function"&&!Us(c)&&c.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(r.tag=15,r.type=c,Lm(e,r,c,o,l)):(e=Bt(a.type,null,o,r,r.mode,l),e.ref=r.ref,e.return=r,r.child=e)}if(c=e.child,(e.lanes&l)===0){var d=c.memoizedProps;if(a=a.compare,a=a!==null?a:Ga,a(d,o)&&e.ref===r.ref)return Ur(e,r,l)}return r.flags|=1,e=hn(c,o),e.ref=r.ref,e.return=r,r.child=e}function Lm(e,r,a,o,l){if(e!==null){var c=e.memoizedProps;if(Ga(c,o)&&e.ref===r.ref)if(rr=!1,r.pendingProps=o=c,(e.lanes&l)!==0)(e.flags&131072)!==0&&(rr=!0);else return r.lanes=e.lanes,Ur(e,r,l)}return Ps(e,r,a,o,l)}function Nm(e,r,a){var o=r.pendingProps,l=o.children,c=e!==null?e.memoizedState:null;if(o.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},ge(sa,cr),cr|=a;else{if((a&1073741824)===0)return e=c!==null?c.baseLanes|a:a,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:e,cachePool:null,transitions:null},r.updateQueue=null,ge(sa,cr),cr|=e,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=c!==null?c.baseLanes:a,ge(sa,cr),cr|=o}else c!==null?(o=c.baseLanes|a,r.memoizedState=null):o=a,ge(sa,cr),cr|=o;return Qe(e,r,l,a),r.child}function wm(e,r){var a=r.ref;(e===null&&a!==null||e!==null&&e.ref!==a)&&(r.flags|=512,r.flags|=2097152)}function Ps(e,r,a,o,l){var c=er(a)?Cn:Ve.current;return c=Xn(r,c),aa(r,l),a=ds(e,r,a,o,c,l),o=hs(),e!==null&&!rr?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~l,Ur(e,r,l)):(Pe&&o&&Qo(r),r.flags|=1,Qe(e,r,a,l),r.child)}function Rm(e,r,a,o,l){if(er(a)){var c=!0;qi(r)}else c=!1;if(aa(r,l),r.stateNode===null)pt(e,r),Sm(r,a,o),ks(r,a,o,l),o=!0;else if(e===null){var d=r.stateNode,S=r.memoizedProps;d.props=S;var C=d.context,L=a.contextType;typeof L=="object"&&L!==null?L=fr(L):(L=er(a)?Cn:Ve.current,L=Xn(r,L));var x=a.getDerivedStateFromProps,K=typeof x=="function"||typeof d.getSnapshotBeforeUpdate=="function";K||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==o||C!==L)&&km(r,d,o,L),sn=!1;var b=r.memoizedState;d.state=b,st(r,o,d,l),C=r.memoizedState,S!==o||b!==C||$e.current||sn?(typeof x=="function"&&(Ss(r,a,x,o),C=r.memoizedState),(S=sn||ym(r,a,S,o,b,C,L))?(K||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(r.flags|=4194308)):(typeof d.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=o,r.memoizedState=C),d.props=o,d.state=C,d.context=L,o=S):(typeof d.componentDidMount=="function"&&(r.flags|=4194308),o=!1)}else{d=r.stateNode,Jc(e,r),S=r.memoizedProps,L=r.type===r.elementType?S:Mr(r.type,S),d.props=L,K=r.pendingProps,b=d.context,C=a.contextType,typeof C=="object"&&C!==null?C=fr(C):(C=er(a)?Cn:Ve.current,C=Xn(r,C));var U=a.getDerivedStateFromProps;(x=typeof U=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==K||b!==C)&&km(r,d,o,C),sn=!1,b=r.memoizedState,d.state=b,st(r,o,d,l);var z=r.memoizedState;S!==K||b!==z||$e.current||sn?(typeof U=="function"&&(Ss(r,a,U,o),z=r.memoizedState),(L=sn||ym(r,a,L,o,b,z,C)||!1)?(x||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,z,C),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,z,C)),typeof d.componentDidUpdate=="function"&&(r.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&b===e.memoizedState||(r.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&b===e.memoizedState||(r.flags|=1024),r.memoizedProps=o,r.memoizedState=z),d.props=o,d.state=z,d.context=C,o=L):(typeof d.componentDidUpdate!="function"||S===e.memoizedProps&&b===e.memoizedState||(r.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&b===e.memoizedState||(r.flags|=1024),o=!1)}return Es(e,r,a,o,c,l)}function Es(e,r,a,o,l,c){wm(e,r);var d=(r.flags&128)!==0;if(!o&&!d)return l&&Ic(r,a,!1),Ur(e,r,c);o=r.stateNode,qp.current=r;var S=d&&typeof a.getDerivedStateFromError!="function"?null:o.render();return r.flags|=1,e!==null&&d?(r.child=ra(r,e.child,null,c),r.child=ra(r,null,S,c)):Qe(e,r,S,c),r.memoizedState=o.state,l&&Ic(r,a,!0),r.child}function bm(e){var r=e.stateNode;r.pendingContext?xc(e,r.pendingContext,r.pendingContext!==r.context):r.context&&xc(e,r.context,!1),ss(e,r.containerInfo)}function Dm(e,r,a,o,l){return ea(),es(l),r.flags|=256,Qe(e,r,a,o),r.child}var Ms={dehydrated:null,treeContext:null,retryLane:0};function Ts(e){return{baseLanes:e,cachePool:null,transitions:null}}function xm(e,r,a){var o=r.pendingProps,l=Ee.current,c=!1,d=(r.flags&128)!==0,S;if((S=d)||(S=e!==null&&e.memoizedState===null?!1:(l&2)!==0),S?(c=!0,r.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),ge(Ee,l&1),e===null)return $o(r),e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((r.mode&1)===0?r.lanes=1:e.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(d=o.children,e=o.fallback,c?(o=r.mode,c=r.child,d={mode:"hidden",children:d},(o&1)===0&&c!==null?(c.childLanes=0,c.pendingProps=d):c=Lt(d,o,0,null),e=bn(e,o,a,null),c.return=r,e.return=r,c.sibling=e,r.child=c,r.child.memoizedState=Ts(a),r.memoizedState=Ms,e):Bs(r,d));if(l=e.memoizedState,l!==null&&(S=l.dehydrated,S!==null))return $p(e,r,d,o,S,l,a);if(c){c=o.fallback,d=r.mode,l=e.child,S=l.sibling;var C={mode:"hidden",children:o.children};return(d&1)===0&&r.child!==l?(o=r.child,o.childLanes=0,o.pendingProps=C,r.deletions=null):(o=hn(l,C),o.subtreeFlags=l.subtreeFlags&14680064),S!==null?c=hn(S,c):(c=bn(c,d,a,null),c.flags|=2),c.return=r,o.return=r,o.sibling=c,r.child=o,o=c,c=r.child,d=e.child.memoizedState,d=d===null?Ts(a):{baseLanes:d.baseLanes|a,cachePool:null,transitions:d.transitions},c.memoizedState=d,c.childLanes=e.childLanes&~a,r.memoizedState=Ms,o}return c=e.child,e=c.sibling,o=hn(c,{mode:"visible",children:o.children}),(r.mode&1)===0&&(o.lanes=a),o.return=r,o.sibling=null,e!==null&&(a=r.deletions,a===null?(r.deletions=[e],r.flags|=16):a.push(e)),r.child=o,r.memoizedState=null,o}function Bs(e,r){return r=Lt({mode:"visible",children:r},e.mode,0,null),r.return=e,e.child=r}function ft(e,r,a,o){return o!==null&&es(o),ra(r,e.child,null,a),e=Bs(r,r.pendingProps.children),e.flags|=2,r.memoizedState=null,e}function $p(e,r,a,o,l,c,d){if(a)return r.flags&256?(r.flags&=-257,o=vs(Error(t(422))),ft(e,r,d,o)):r.memoizedState!==null?(r.child=e.child,r.flags|=128,null):(c=o.fallback,l=r.mode,o=Lt({mode:"visible",children:o.children},l,0,null),c=bn(c,l,d,null),c.flags|=2,o.return=r,c.return=r,o.sibling=c,r.child=o,(r.mode&1)!==0&&ra(r,e.child,null,d),r.child.memoizedState=Ts(d),r.memoizedState=Ms,c);if((r.mode&1)===0)return ft(e,r,d,null);if(l.data==="$!"){if(o=l.nextSibling&&l.nextSibling.dataset,o)var S=o.dgst;return o=S,c=Error(t(419)),o=vs(c,o,void 0),ft(e,r,d,o)}if(S=(d&e.childLanes)!==0,rr||S){if(o=_e,o!==null){switch(d&-d){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(o.suspendedLanes|d))!==0?0:l,l!==0&&l!==c.retryLane&&(c.retryLane=l,Vr(e,l),Lr(o,e,l,-1))}return Fs(),o=vs(Error(t(421))),ft(e,r,d,o)}return l.data==="$?"?(r.flags|=128,r.child=e.child,r=Ag.bind(null,e),l._reactRetry=r,null):(e=c.treeContext,ur=nn(l.nextSibling),lr=r,Pe=!0,Er=null,e!==null&&(dr[hr++]=Gr,dr[hr++]=Hr,dr[hr++]=Pn,Gr=e.id,Hr=e.overflow,Pn=r),r=Bs(r,o.children),r.flags|=4096,r)}function Km(e,r,a){e.lanes|=r;var o=e.alternate;o!==null&&(o.lanes|=r),is(e.return,r,a)}function Ls(e,r,a,o,l){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:l}:(c.isBackwards=r,c.rendering=null,c.renderingStartTime=0,c.last=o,c.tail=a,c.tailMode=l)}function Im(e,r,a){var o=r.pendingProps,l=o.revealOrder,c=o.tail;if(Qe(e,r,o.children,a),o=Ee.current,(o&2)!==0)o=o&1|2,r.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=r.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Km(e,a,r);else if(e.tag===19)Km(e,a,r);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break e;for(;e.sibling===null;){if(e.return===null||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}if(ge(Ee,o),(r.mode&1)===0)r.memoizedState=null;else switch(l){case"forwards":for(a=r.child,l=null;a!==null;)e=a.alternate,e!==null&&lt(e)===null&&(l=a),a=a.sibling;a=l,a===null?(l=r.child,r.child=null):(l=a.sibling,a.sibling=null),Ls(r,!1,l,a,c);break;case"backwards":for(a=null,l=r.child,r.child=null;l!==null;){if(e=l.alternate,e!==null&&lt(e)===null){r.child=l;break}e=l.sibling,l.sibling=a,a=l,l=e}Ls(r,!0,a,null,c);break;case"together":Ls(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function pt(e,r){(r.mode&1)===0&&e!==null&&(e.alternate=null,r.alternate=null,r.flags|=2)}function Ur(e,r,a){if(e!==null&&(r.dependencies=e.dependencies),Ln|=r.lanes,(a&r.childLanes)===0)return null;if(e!==null&&r.child!==e.child)throw Error(t(153));if(r.child!==null){for(e=r.child,a=hn(e,e.pendingProps),r.child=a,a.return=r;e.sibling!==null;)e=e.sibling,a=a.sibling=hn(e,e.pendingProps),a.return=r;a.sibling=null}return r.child}function eg(e,r,a){switch(r.tag){case 3:bm(r),ea();break;case 5:Qc(r);break;case 1:er(r.type)&&qi(r);break;case 4:ss(r,r.stateNode.containerInfo);break;case 10:var o=r.type._context,l=r.memoizedProps.value;ge(it,o._currentValue),o._currentValue=l;break;case 13:if(o=r.memoizedState,o!==null)return o.dehydrated!==null?(ge(Ee,Ee.current&1),r.flags|=128,null):(a&r.child.childLanes)!==0?xm(e,r,a):(ge(Ee,Ee.current&1),e=Ur(e,r,a),e!==null?e.sibling:null);ge(Ee,Ee.current&1);break;case 19:if(o=(a&r.childLanes)!==0,(e.flags&128)!==0){if(o)return Im(e,r,a);r.flags|=128}if(l=r.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),ge(Ee,Ee.current),o)break;return null;case 22:case 23:return r.lanes=0,Nm(e,r,a)}return Ur(e,r,a)}var _m,Ns,Ym,Om;_m=function(e,r){for(var a=r.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===r)break;for(;a.sibling===null;){if(a.return===null||a.return===r)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Ns=function(){},Ym=function(e,r,a,o){var l=e.memoizedProps;if(l!==o){e=r.stateNode,Tn(Dr.current);var c=null;switch(a){case"input":l=ao(e,l),o=ao(e,o),c=[];break;case"select":l=W({},l,{value:void 0}),o=W({},o,{value:void 0}),c=[];break;case"textarea":l=oo(e,l),o=oo(e,o),c=[];break;default:typeof l.onClick!="function"&&typeof o.onClick=="function"&&(e.onclick=Zi)}lo(a,o);var d;a=null;for(L in l)if(!o.hasOwnProperty(L)&&l.hasOwnProperty(L)&&l[L]!=null)if(L==="style"){var S=l[L];for(d in S)S.hasOwnProperty(d)&&(a||(a={}),a[d]="")}else L!=="dangerouslySetInnerHTML"&&L!=="children"&&L!=="suppressContentEditableWarning"&&L!=="suppressHydrationWarning"&&L!=="autoFocus"&&(u.hasOwnProperty(L)?c||(c=[]):(c=c||[]).push(L,null));for(L in o){var C=o[L];if(S=l!=null?l[L]:void 0,o.hasOwnProperty(L)&&C!==S&&(C!=null||S!=null))if(L==="style")if(S){for(d in S)!S.hasOwnProperty(d)||C&&C.hasOwnProperty(d)||(a||(a={}),a[d]="");for(d in C)C.hasOwnProperty(d)&&S[d]!==C[d]&&(a||(a={}),a[d]=C[d])}else a||(c||(c=[]),c.push(L,a)),a=C;else L==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,S=S?S.__html:void 0,C!=null&&S!==C&&(c=c||[]).push(L,C)):L==="children"?typeof C!="string"&&typeof C!="number"||(c=c||[]).push(L,""+C):L!=="suppressContentEditableWarning"&&L!=="suppressHydrationWarning"&&(u.hasOwnProperty(L)?(C!=null&&L==="onScroll"&&ye("scroll",e),c||S===C||(c=[])):(c=c||[]).push(L,C))}a&&(c=c||[]).push("style",a);var L=c;(r.updateQueue=L)&&(r.flags|=4)}},Om=function(e,r,a,o){a!==o&&(r.flags|=4)};function ri(e,r){if(!Pe)switch(e.tailMode){case"hidden":r=e.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?r||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ue(e){var r=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(r)for(var l=e.child;l!==null;)a|=l.lanes|l.childLanes,o|=l.subtreeFlags&14680064,o|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)a|=l.lanes|l.childLanes,o|=l.subtreeFlags,o|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=o,e.childLanes=a,r}function rg(e,r,a){var o=r.pendingProps;switch(Xo(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(r),null;case 1:return er(r.type)&&Xi(),Ue(r),null;case 3:return o=r.stateNode,ia(),Se($e),Se(Ve),cs(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(nt(r)?r.flags|=4:e===null||e.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,Er!==null&&(Gs(Er),Er=null))),Ns(e,r),Ue(r),null;case 5:ls(r);var l=Tn(Qa.current);if(a=r.type,e!==null&&r.stateNode!=null)Ym(e,r,a,o,l),e.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!o){if(r.stateNode===null)throw Error(t(166));return Ue(r),null}if(e=Tn(Dr.current),nt(r)){o=r.stateNode,a=r.type;var c=r.memoizedProps;switch(o[br]=r,o[ja]=c,e=(r.mode&1)!==0,a){case"dialog":ye("cancel",o),ye("close",o);break;case"iframe":case"object":case"embed":ye("load",o);break;case"video":case"audio":for(l=0;l<Va.length;l++)ye(Va[l],o);break;case"source":ye("error",o);break;case"img":case"image":case"link":ye("error",o),ye("load",o);break;case"details":ye("toggle",o);break;case"input":Su(o,c),ye("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!c.multiple},ye("invalid",o);break;case"textarea":Cu(o,c),ye("invalid",o)}lo(a,c),l=null;for(var d in c)if(c.hasOwnProperty(d)){var S=c[d];d==="children"?typeof S=="string"?o.textContent!==S&&(c.suppressHydrationWarning!==!0&&zi(o.textContent,S,e),l=["children",S]):typeof S=="number"&&o.textContent!==""+S&&(c.suppressHydrationWarning!==!0&&zi(o.textContent,S,e),l=["children",""+S]):u.hasOwnProperty(d)&&S!=null&&d==="onScroll"&&ye("scroll",o)}switch(a){case"input":Mi(o),vu(o,c,!0);break;case"textarea":Mi(o),Eu(o);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(o.onclick=Zi)}o=l,r.updateQueue=o,o!==null&&(r.flags|=4)}else{d=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Mu(a)),e==="http://www.w3.org/1999/xhtml"?a==="script"?(e=d.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof o.is=="string"?e=d.createElement(a,{is:o.is}):(e=d.createElement(a),a==="select"&&(d=e,o.multiple?d.multiple=!0:o.size&&(d.size=o.size))):e=d.createElementNS(e,a),e[br]=r,e[ja]=o,_m(e,r,!1,!1),r.stateNode=e;e:{switch(d=uo(a,o),a){case"dialog":ye("cancel",e),ye("close",e),l=o;break;case"iframe":case"object":case"embed":ye("load",e),l=o;break;case"video":case"audio":for(l=0;l<Va.length;l++)ye(Va[l],e);l=o;break;case"source":ye("error",e),l=o;break;case"img":case"image":case"link":ye("error",e),ye("load",e),l=o;break;case"details":ye("toggle",e),l=o;break;case"input":Su(e,o),l=ao(e,o),ye("invalid",e);break;case"option":l=o;break;case"select":e._wrapperState={wasMultiple:!!o.multiple},l=W({},o,{value:void 0}),ye("invalid",e);break;case"textarea":Cu(e,o),l=oo(e,o),ye("invalid",e);break;default:l=o}lo(a,l),S=l;for(c in S)if(S.hasOwnProperty(c)){var C=S[c];c==="style"?Lu(e,C):c==="dangerouslySetInnerHTML"?(C=C?C.__html:void 0,C!=null&&Tu(e,C)):c==="children"?typeof C=="string"?(a!=="textarea"||C!=="")&&Pa(e,C):typeof C=="number"&&Pa(e,""+C):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(u.hasOwnProperty(c)?C!=null&&c==="onScroll"&&ye("scroll",e):C!=null&&V(e,c,C,d))}switch(a){case"input":Mi(e),vu(e,o,!1);break;case"textarea":Mi(e),Eu(e);break;case"option":o.value!=null&&e.setAttribute("value",""+he(o.value));break;case"select":e.multiple=!!o.multiple,c=o.value,c!=null?On(e,!!o.multiple,c,!1):o.defaultValue!=null&&On(e,!!o.multiple,o.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Zi)}switch(a){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Ue(r),null;case 6:if(e&&r.stateNode!=null)Om(e,r,e.memoizedProps,o);else{if(typeof o!="string"&&r.stateNode===null)throw Error(t(166));if(a=Tn(Qa.current),Tn(Dr.current),nt(r)){if(o=r.stateNode,a=r.memoizedProps,o[br]=r,(c=o.nodeValue!==a)&&(e=lr,e!==null))switch(e.tag){case 3:zi(o.nodeValue,a,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&zi(o.nodeValue,a,(e.mode&1)!==0)}c&&(r.flags|=4)}else o=(a.nodeType===9?a:a.ownerDocument).createTextNode(o),o[br]=r,r.stateNode=o}return Ue(r),null;case 13:if(Se(Ee),o=r.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Pe&&ur!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Vc(),ea(),r.flags|=98560,c=!1;else if(c=nt(r),o!==null&&o.dehydrated!==null){if(e===null){if(!c)throw Error(t(318));if(c=r.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(t(317));c[br]=r}else ea(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Ue(r),c=!1}else Er!==null&&(Gs(Er),Er=null),c=!0;if(!c)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=a,r):(o=o!==null,o!==(e!==null&&e.memoizedState!==null)&&o&&(r.child.flags|=8192,(r.mode&1)!==0&&(e===null||(Ee.current&1)!==0?Ke===0&&(Ke=3):Fs())),r.updateQueue!==null&&(r.flags|=4),Ue(r),null);case 4:return ia(),Ns(e,r),e===null&&Fa(r.stateNode.containerInfo),Ue(r),null;case 10:return as(r.type._context),Ue(r),null;case 17:return er(r.type)&&Xi(),Ue(r),null;case 19:if(Se(Ee),c=r.memoizedState,c===null)return Ue(r),null;if(o=(r.flags&128)!==0,d=c.rendering,d===null)if(o)ri(c,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=r.child;e!==null;){if(d=lt(e),d!==null){for(r.flags|=128,ri(c,!1),o=d.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),r.subtreeFlags=0,o=a,a=r.child;a!==null;)c=a,e=o,c.flags&=14680066,d=c.alternate,d===null?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=d.childLanes,c.lanes=d.lanes,c.child=d.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=d.memoizedProps,c.memoizedState=d.memoizedState,c.updateQueue=d.updateQueue,c.type=d.type,e=d.dependencies,c.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),a=a.sibling;return ge(Ee,Ee.current&1|2),r.child}e=e.sibling}c.tail!==null&&Ne()>la&&(r.flags|=128,o=!0,ri(c,!1),r.lanes=4194304)}else{if(!o)if(e=lt(d),e!==null){if(r.flags|=128,o=!0,a=e.updateQueue,a!==null&&(r.updateQueue=a,r.flags|=4),ri(c,!0),c.tail===null&&c.tailMode==="hidden"&&!d.alternate&&!Pe)return Ue(r),null}else 2*Ne()-c.renderingStartTime>la&&a!==1073741824&&(r.flags|=128,o=!0,ri(c,!1),r.lanes=4194304);c.isBackwards?(d.sibling=r.child,r.child=d):(a=c.last,a!==null?a.sibling=d:r.child=d,c.last=d)}return c.tail!==null?(r=c.tail,c.rendering=r,c.tail=r.sibling,c.renderingStartTime=Ne(),r.sibling=null,a=Ee.current,ge(Ee,o?a&1|2:a&1),r):(Ue(r),null);case 22:case 23:return Vs(),o=r.memoizedState!==null,e!==null&&e.memoizedState!==null!==o&&(r.flags|=8192),o&&(r.mode&1)!==0?(cr&1073741824)!==0&&(Ue(r),r.subtreeFlags&6&&(r.flags|=8192)):Ue(r),null;case 24:return null;case 25:return null}throw Error(t(156,r.tag))}function ng(e,r){switch(Xo(r),r.tag){case 1:return er(r.type)&&Xi(),e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 3:return ia(),Se($e),Se(Ve),cs(),e=r.flags,(e&65536)!==0&&(e&128)===0?(r.flags=e&-65537|128,r):null;case 5:return ls(r),null;case 13:if(Se(Ee),e=r.memoizedState,e!==null&&e.dehydrated!==null){if(r.alternate===null)throw Error(t(340));ea()}return e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 19:return Se(Ee),null;case 4:return ia(),null;case 10:return as(r.type._context),null;case 22:case 23:return Vs(),null;case 24:return null;default:return null}}var gt=!1,je=!1,ag=typeof WeakSet=="function"?WeakSet:Set,J=null;function oa(e,r){var a=e.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(o){Be(e,r,o)}else a.current=null}function ws(e,r,a){try{a()}catch(o){Be(e,r,o)}}var Gm=!1;function ig(e,r){if(Vo=_i,e=yc(),xo(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var l=o.anchorOffset,c=o.focusNode;o=o.focusOffset;try{a.nodeType,c.nodeType}catch{a=null;break e}var d=0,S=-1,C=-1,L=0,x=0,K=e,b=null;r:for(;;){for(var U;K!==a||l!==0&&K.nodeType!==3||(S=d+l),K!==c||o!==0&&K.nodeType!==3||(C=d+o),K.nodeType===3&&(d+=K.nodeValue.length),(U=K.firstChild)!==null;)b=K,K=U;for(;;){if(K===e)break r;if(b===a&&++L===l&&(S=d),b===c&&++x===o&&(C=d),(U=K.nextSibling)!==null)break;K=b,b=K.parentNode}K=U}a=S===-1||C===-1?null:{start:S,end:C}}else a=null}a=a||{start:0,end:0}}else a=null;for(Fo={focusedElem:e,selectionRange:a},_i=!1,J=r;J!==null;)if(r=J,e=r.child,(r.subtreeFlags&1028)!==0&&e!==null)e.return=r,J=e;else for(;J!==null;){r=J;try{var z=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(z!==null){var Z=z.memoizedProps,we=z.memoizedState,M=r.stateNode,P=M.getSnapshotBeforeUpdate(r.elementType===r.type?Z:Mr(r.type,Z),we);M.__reactInternalSnapshotBeforeUpdate=P}break;case 3:var T=r.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Y){Be(r,r.return,Y)}if(e=r.sibling,e!==null){e.return=r.return,J=e;break}J=r.return}return z=Gm,Gm=!1,z}function ni(e,r,a){var o=r.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var l=o=o.next;do{if((l.tag&e)===e){var c=l.destroy;l.destroy=void 0,c!==void 0&&ws(r,a,c)}l=l.next}while(l!==o)}}function yt(e,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.create;a.destroy=o()}a=a.next}while(a!==r)}}function Rs(e){var r=e.ref;if(r!==null){var a=e.stateNode;switch(e.tag){case 5:e=a;break;default:e=a}typeof r=="function"?r(e):r.current=e}}function Hm(e){var r=e.alternate;r!==null&&(e.alternate=null,Hm(r)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(r=e.stateNode,r!==null&&(delete r[br],delete r[ja],delete r[Jo],delete r[Gp],delete r[Hp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vm(e){return e.tag===5||e.tag===3||e.tag===4}function Fm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bs(e,r,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,r?a.nodeType===8?a.parentNode.insertBefore(e,r):a.insertBefore(e,r):(a.nodeType===8?(r=a.parentNode,r.insertBefore(e,a)):(r=a,r.appendChild(e)),a=a._reactRootContainer,a!=null||r.onclick!==null||(r.onclick=Zi));else if(o!==4&&(e=e.child,e!==null))for(bs(e,r,a),e=e.sibling;e!==null;)bs(e,r,a),e=e.sibling}function Ds(e,r,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,r?a.insertBefore(e,r):a.appendChild(e);else if(o!==4&&(e=e.child,e!==null))for(Ds(e,r,a),e=e.sibling;e!==null;)Ds(e,r,a),e=e.sibling}var Oe=null,Tr=!1;function un(e,r,a){for(a=a.child;a!==null;)Um(e,r,a),a=a.sibling}function Um(e,r,a){if(Rr&&typeof Rr.onCommitFiberUnmount=="function")try{Rr.onCommitFiberUnmount(Ri,a)}catch{}switch(a.tag){case 5:je||oa(a,r);case 6:var o=Oe,l=Tr;Oe=null,un(e,r,a),Oe=o,Tr=l,Oe!==null&&(Tr?(e=Oe,a=a.stateNode,e.nodeType===8?e.parentNode.removeChild(a):e.removeChild(a)):Oe.removeChild(a.stateNode));break;case 18:Oe!==null&&(Tr?(e=Oe,a=a.stateNode,e.nodeType===8?Wo(e.parentNode,a):e.nodeType===1&&Wo(e,a),xa(e)):Wo(Oe,a.stateNode));break;case 4:o=Oe,l=Tr,Oe=a.stateNode.containerInfo,Tr=!0,un(e,r,a),Oe=o,Tr=l;break;case 0:case 11:case 14:case 15:if(!je&&(o=a.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){l=o=o.next;do{var c=l,d=c.destroy;c=c.tag,d!==void 0&&((c&2)!==0||(c&4)!==0)&&ws(a,r,d),l=l.next}while(l!==o)}un(e,r,a);break;case 1:if(!je&&(oa(a,r),o=a.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=a.memoizedProps,o.state=a.memoizedState,o.componentWillUnmount()}catch(S){Be(a,r,S)}un(e,r,a);break;case 21:un(e,r,a);break;case 22:a.mode&1?(je=(o=je)||a.memoizedState!==null,un(e,r,a),je=o):un(e,r,a);break;default:un(e,r,a)}}function jm(e){var r=e.updateQueue;if(r!==null){e.updateQueue=null;var a=e.stateNode;a===null&&(a=e.stateNode=new ag),r.forEach(function(o){var l=dg.bind(null,e,o);a.has(o)||(a.add(o),o.then(l,l))})}}function Br(e,r){var a=r.deletions;if(a!==null)for(var o=0;o<a.length;o++){var l=a[o];try{var c=e,d=r,S=d;e:for(;S!==null;){switch(S.tag){case 5:Oe=S.stateNode,Tr=!1;break e;case 3:Oe=S.stateNode.containerInfo,Tr=!0;break e;case 4:Oe=S.stateNode.containerInfo,Tr=!0;break e}S=S.return}if(Oe===null)throw Error(t(160));Um(c,d,l),Oe=null,Tr=!1;var C=l.alternate;C!==null&&(C.return=null),l.return=null}catch(L){Be(l,r,L)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)Wm(r,e),r=r.sibling}function Wm(e,r){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Br(r,e),Kr(e),o&4){try{ni(3,e,e.return),yt(3,e)}catch(Z){Be(e,e.return,Z)}try{ni(5,e,e.return)}catch(Z){Be(e,e.return,Z)}}break;case 1:Br(r,e),Kr(e),o&512&&a!==null&&oa(a,a.return);break;case 5:if(Br(r,e),Kr(e),o&512&&a!==null&&oa(a,a.return),e.flags&32){var l=e.stateNode;try{Pa(l,"")}catch(Z){Be(e,e.return,Z)}}if(o&4&&(l=e.stateNode,l!=null)){var c=e.memoizedProps,d=a!==null?a.memoizedProps:c,S=e.type,C=e.updateQueue;if(e.updateQueue=null,C!==null)try{S==="input"&&c.type==="radio"&&c.name!=null&&ku(l,c),uo(S,d);var L=uo(S,c);for(d=0;d<C.length;d+=2){var x=C[d],K=C[d+1];x==="style"?Lu(l,K):x==="dangerouslySetInnerHTML"?Tu(l,K):x==="children"?Pa(l,K):V(l,x,K,L)}switch(S){case"input":io(l,c);break;case"textarea":Pu(l,c);break;case"select":var b=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!c.multiple;var U=c.value;U!=null?On(l,!!c.multiple,U,!1):b!==!!c.multiple&&(c.defaultValue!=null?On(l,!!c.multiple,c.defaultValue,!0):On(l,!!c.multiple,c.multiple?[]:"",!1))}l[ja]=c}catch(Z){Be(e,e.return,Z)}}break;case 6:if(Br(r,e),Kr(e),o&4){if(e.stateNode===null)throw Error(t(162));l=e.stateNode,c=e.memoizedProps;try{l.nodeValue=c}catch(Z){Be(e,e.return,Z)}}break;case 3:if(Br(r,e),Kr(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{xa(r.containerInfo)}catch(Z){Be(e,e.return,Z)}break;case 4:Br(r,e),Kr(e);break;case 13:Br(r,e),Kr(e),l=e.child,l.flags&8192&&(c=l.memoizedState!==null,l.stateNode.isHidden=c,!c||l.alternate!==null&&l.alternate.memoizedState!==null||(Is=Ne())),o&4&&jm(e);break;case 22:if(x=a!==null&&a.memoizedState!==null,e.mode&1?(je=(L=je)||x,Br(r,e),je=L):Br(r,e),Kr(e),o&8192){if(L=e.memoizedState!==null,(e.stateNode.isHidden=L)&&!x&&(e.mode&1)!==0)for(J=e,x=e.child;x!==null;){for(K=J=x;J!==null;){switch(b=J,U=b.child,b.tag){case 0:case 11:case 14:case 15:ni(4,b,b.return);break;case 1:oa(b,b.return);var z=b.stateNode;if(typeof z.componentWillUnmount=="function"){o=b,a=b.return;try{r=o,z.props=r.memoizedProps,z.state=r.memoizedState,z.componentWillUnmount()}catch(Z){Be(o,a,Z)}}break;case 5:oa(b,b.return);break;case 22:if(b.memoizedState!==null){Zm(K);continue}}U!==null?(U.return=b,J=U):Zm(K)}x=x.sibling}e:for(x=null,K=e;;){if(K.tag===5){if(x===null){x=K;try{l=K.stateNode,L?(c=l.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(S=K.stateNode,C=K.memoizedProps.style,d=C!=null&&C.hasOwnProperty("display")?C.display:null,S.style.display=Bu("display",d))}catch(Z){Be(e,e.return,Z)}}}else if(K.tag===6){if(x===null)try{K.stateNode.nodeValue=L?"":K.memoizedProps}catch(Z){Be(e,e.return,Z)}}else if((K.tag!==22&&K.tag!==23||K.memoizedState===null||K===e)&&K.child!==null){K.child.return=K,K=K.child;continue}if(K===e)break e;for(;K.sibling===null;){if(K.return===null||K.return===e)break e;x===K&&(x=null),K=K.return}x===K&&(x=null),K.sibling.return=K.return,K=K.sibling}}break;case 19:Br(r,e),Kr(e),o&4&&jm(e);break;case 21:break;default:Br(r,e),Kr(e)}}function Kr(e){var r=e.flags;if(r&2){try{e:{for(var a=e.return;a!==null;){if(Vm(a)){var o=a;break e}a=a.return}throw Error(t(160))}switch(o.tag){case 5:var l=o.stateNode;o.flags&32&&(Pa(l,""),o.flags&=-33);var c=Fm(e);Ds(e,c,l);break;case 3:case 4:var d=o.stateNode.containerInfo,S=Fm(e);bs(e,S,d);break;default:throw Error(t(161))}}catch(C){Be(e,e.return,C)}e.flags&=-3}r&4096&&(e.flags&=-4097)}function tg(e,r,a){J=e,Jm(e)}function Jm(e,r,a){for(var o=(e.mode&1)!==0;J!==null;){var l=J,c=l.child;if(l.tag===22&&o){var d=l.memoizedState!==null||gt;if(!d){var S=l.alternate,C=S!==null&&S.memoizedState!==null||je;S=gt;var L=je;if(gt=d,(je=C)&&!L)for(J=l;J!==null;)d=J,C=d.child,d.tag===22&&d.memoizedState!==null?Qm(l):C!==null?(C.return=d,J=C):Qm(l);for(;c!==null;)J=c,Jm(c),c=c.sibling;J=l,gt=S,je=L}zm(e)}else(l.subtreeFlags&8772)!==0&&c!==null?(c.return=l,J=c):zm(e)}}function zm(e){for(;J!==null;){var r=J;if((r.flags&8772)!==0){var a=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:je||yt(5,r);break;case 1:var o=r.stateNode;if(r.flags&4&&!je)if(a===null)o.componentDidMount();else{var l=r.elementType===r.type?a.memoizedProps:Mr(r.type,a.memoizedProps);o.componentDidUpdate(l,a.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var c=r.updateQueue;c!==null&&Zc(r,c,o);break;case 3:var d=r.updateQueue;if(d!==null){if(a=null,r.child!==null)switch(r.child.tag){case 5:a=r.child.stateNode;break;case 1:a=r.child.stateNode}Zc(r,d,a)}break;case 5:var S=r.stateNode;if(a===null&&r.flags&4){a=S;var C=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":C.autoFocus&&a.focus();break;case"img":C.src&&(a.src=C.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var L=r.alternate;if(L!==null){var x=L.memoizedState;if(x!==null){var K=x.dehydrated;K!==null&&xa(K)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}je||r.flags&512&&Rs(r)}catch(b){Be(r,r.return,b)}}if(r===e){J=null;break}if(a=r.sibling,a!==null){a.return=r.return,J=a;break}J=r.return}}function Zm(e){for(;J!==null;){var r=J;if(r===e){J=null;break}var a=r.sibling;if(a!==null){a.return=r.return,J=a;break}J=r.return}}function Qm(e){for(;J!==null;){var r=J;try{switch(r.tag){case 0:case 11:case 15:var a=r.return;try{yt(4,r)}catch(C){Be(r,a,C)}break;case 1:var o=r.stateNode;if(typeof o.componentDidMount=="function"){var l=r.return;try{o.componentDidMount()}catch(C){Be(r,l,C)}}var c=r.return;try{Rs(r)}catch(C){Be(r,c,C)}break;case 5:var d=r.return;try{Rs(r)}catch(C){Be(r,d,C)}}}catch(C){Be(r,r.return,C)}if(r===e){J=null;break}var S=r.sibling;if(S!==null){S.return=r.return,J=S;break}J=r.return}}var og=Math.ceil,St=Q.ReactCurrentDispatcher,xs=Q.ReactCurrentOwner,gr=Q.ReactCurrentBatchConfig,ue=0,_e=null,be=null,Ge=0,cr=0,sa=an(0),Ke=0,ai=null,Ln=0,kt=0,Ks=0,ii=null,nr=null,Is=0,la=1/0,jr=null,vt=!1,_s=null,cn=null,Ct=!1,mn=null,Pt=0,ti=0,Ys=null,Et=-1,Mt=0;function Xe(){return(ue&6)!==0?Ne():Et!==-1?Et:Et=Ne()}function An(e){return(e.mode&1)===0?1:(ue&2)!==0&&Ge!==0?Ge&-Ge:Fp.transition!==null?(Mt===0&&(Mt=Fu()),Mt):(e=fe,e!==0||(e=window.event,e=e===void 0?16:qu(e.type)),e)}function Lr(e,r,a,o){if(50<ti)throw ti=0,Ys=null,Error(t(185));Na(e,a,o),((ue&2)===0||e!==_e)&&(e===_e&&((ue&2)===0&&(kt|=a),Ke===4&&dn(e,Ge)),ar(e,o),a===1&&ue===0&&(r.mode&1)===0&&(la=Ne()+500,$i&&on()))}function ar(e,r){var a=e.callbackNode;Ff(e,r);var o=xi(e,e===_e?Ge:0);if(o===0)a!==null&&Gu(a),e.callbackNode=null,e.callbackPriority=0;else if(r=o&-o,e.callbackPriority!==r){if(a!=null&&Gu(a),r===1)e.tag===0?Vp(qm.bind(null,e)):_c(qm.bind(null,e)),Yp(function(){(ue&6)===0&&on()}),a=null;else{switch(Uu(o)){case 1:a=go;break;case 4:a=Hu;break;case 16:a=wi;break;case 536870912:a=Vu;break;default:a=wi}a=oA(a,Xm.bind(null,e))}e.callbackPriority=r,e.callbackNode=a}}function Xm(e,r){if(Et=-1,Mt=0,(ue&6)!==0)throw Error(t(327));var a=e.callbackNode;if(ua()&&e.callbackNode!==a)return null;var o=xi(e,e===_e?Ge:0);if(o===0)return null;if((o&30)!==0||(o&e.expiredLanes)!==0||r)r=Tt(e,o);else{r=o;var l=ue;ue|=2;var c=eA();(_e!==e||Ge!==r)&&(jr=null,la=Ne()+500,wn(e,r));do try{ug();break}catch(S){$m(e,S)}while(!0);ns(),St.current=c,ue=l,be!==null?r=0:(_e=null,Ge=0,r=Ke)}if(r!==0){if(r===2&&(l=yo(e),l!==0&&(o=l,r=Os(e,l))),r===1)throw a=ai,wn(e,0),dn(e,o),ar(e,Ne()),a;if(r===6)dn(e,o);else{if(l=e.current.alternate,(o&30)===0&&!sg(l)&&(r=Tt(e,o),r===2&&(c=yo(e),c!==0&&(o=c,r=Os(e,c))),r===1))throw a=ai,wn(e,0),dn(e,o),ar(e,Ne()),a;switch(e.finishedWork=l,e.finishedLanes=o,r){case 0:case 1:throw Error(t(345));case 2:Rn(e,nr,jr);break;case 3:if(dn(e,o),(o&130023424)===o&&(r=Is+500-Ne(),10<r)){if(xi(e,0)!==0)break;if(l=e.suspendedLanes,(l&o)!==o){Xe(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=jo(Rn.bind(null,e,nr,jr),r);break}Rn(e,nr,jr);break;case 4:if(dn(e,o),(o&4194240)===o)break;for(r=e.eventTimes,l=-1;0<o;){var d=31-Cr(o);c=1<<d,d=r[d],d>l&&(l=d),o&=~c}if(o=l,o=Ne()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*og(o/1960))-o,10<o){e.timeoutHandle=jo(Rn.bind(null,e,nr,jr),o);break}Rn(e,nr,jr);break;case 5:Rn(e,nr,jr);break;default:throw Error(t(329))}}}return ar(e,Ne()),e.callbackNode===a?Xm.bind(null,e):null}function Os(e,r){var a=ii;return e.current.memoizedState.isDehydrated&&(wn(e,r).flags|=256),e=Tt(e,r),e!==2&&(r=nr,nr=a,r!==null&&Gs(r)),e}function Gs(e){nr===null?nr=e:nr.push.apply(nr,e)}function sg(e){for(var r=e;;){if(r.flags&16384){var a=r.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var o=0;o<a.length;o++){var l=a[o],c=l.getSnapshot;l=l.value;try{if(!Pr(c(),l))return!1}catch{return!1}}}if(a=r.child,r.subtreeFlags&16384&&a!==null)a.return=r,r=a;else{if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function dn(e,r){for(r&=~Ks,r&=~kt,e.suspendedLanes|=r,e.pingedLanes&=~r,e=e.expirationTimes;0<r;){var a=31-Cr(r),o=1<<a;e[a]=-1,r&=~o}}function qm(e){if((ue&6)!==0)throw Error(t(327));ua();var r=xi(e,0);if((r&1)===0)return ar(e,Ne()),null;var a=Tt(e,r);if(e.tag!==0&&a===2){var o=yo(e);o!==0&&(r=o,a=Os(e,o))}if(a===1)throw a=ai,wn(e,0),dn(e,r),ar(e,Ne()),a;if(a===6)throw Error(t(345));return e.finishedWork=e.current.alternate,e.finishedLanes=r,Rn(e,nr,jr),ar(e,Ne()),null}function Hs(e,r){var a=ue;ue|=1;try{return e(r)}finally{ue=a,ue===0&&(la=Ne()+500,$i&&on())}}function Nn(e){mn!==null&&mn.tag===0&&(ue&6)===0&&ua();var r=ue;ue|=1;var a=gr.transition,o=fe;try{if(gr.transition=null,fe=1,e)return e()}finally{fe=o,gr.transition=a,ue=r,(ue&6)===0&&on()}}function Vs(){cr=sa.current,Se(sa)}function wn(e,r){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;if(a!==-1&&(e.timeoutHandle=-1,_p(a)),be!==null)for(a=be.return;a!==null;){var o=a;switch(Xo(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&Xi();break;case 3:ia(),Se($e),Se(Ve),cs();break;case 5:ls(o);break;case 4:ia();break;case 13:Se(Ee);break;case 19:Se(Ee);break;case 10:as(o.type._context);break;case 22:case 23:Vs()}a=a.return}if(_e=e,be=e=hn(e.current,null),Ge=cr=r,Ke=0,ai=null,Ks=kt=Ln=0,nr=ii=null,Mn!==null){for(r=0;r<Mn.length;r++)if(a=Mn[r],o=a.interleaved,o!==null){a.interleaved=null;var l=o.next,c=a.pending;if(c!==null){var d=c.next;c.next=l,o.next=d}a.pending=o}Mn=null}return e}function $m(e,r){do{var a=be;try{if(ns(),ut.current=dt,ct){for(var o=Me.memoizedState;o!==null;){var l=o.queue;l!==null&&(l.pending=null),o=o.next}ct=!1}if(Bn=0,Ie=xe=Me=null,Xa=!1,qa=0,xs.current=null,a===null||a.return===null){Ke=1,ai=r,be=null;break}e:{var c=e,d=a.return,S=a,C=r;if(r=Ge,S.flags|=32768,C!==null&&typeof C=="object"&&typeof C.then=="function"){var L=C,x=S,K=x.tag;if((x.mode&1)===0&&(K===0||K===11||K===15)){var b=x.alternate;b?(x.updateQueue=b.updateQueue,x.memoizedState=b.memoizedState,x.lanes=b.lanes):(x.updateQueue=null,x.memoizedState=null)}var U=Em(d);if(U!==null){U.flags&=-257,Mm(U,d,S,c,r),U.mode&1&&Pm(c,L,r),r=U,C=L;var z=r.updateQueue;if(z===null){var Z=new Set;Z.add(C),r.updateQueue=Z}else z.add(C);break e}else{if((r&1)===0){Pm(c,L,r),Fs();break e}C=Error(t(426))}}else if(Pe&&S.mode&1){var we=Em(d);if(we!==null){(we.flags&65536)===0&&(we.flags|=256),Mm(we,d,S,c,r),es(ta(C,S));break e}}c=C=ta(C,S),Ke!==4&&(Ke=2),ii===null?ii=[c]:ii.push(c),c=d;do{switch(c.tag){case 3:c.flags|=65536,r&=-r,c.lanes|=r;var M=vm(c,C,r);zc(c,M);break e;case 1:S=C;var P=c.type,T=c.stateNode;if((c.flags&128)===0&&(typeof P.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(cn===null||!cn.has(T)))){c.flags|=65536,r&=-r,c.lanes|=r;var Y=Cm(c,S,r);zc(c,Y);break e}}c=c.return}while(c!==null)}nA(a)}catch(q){r=q,be===a&&a!==null&&(be=a=a.return);continue}break}while(!0)}function eA(){var e=St.current;return St.current=dt,e===null?dt:e}function Fs(){(Ke===0||Ke===3||Ke===2)&&(Ke=4),_e===null||(Ln&268435455)===0&&(kt&268435455)===0||dn(_e,Ge)}function Tt(e,r){var a=ue;ue|=2;var o=eA();(_e!==e||Ge!==r)&&(jr=null,wn(e,r));do try{lg();break}catch(l){$m(e,l)}while(!0);if(ns(),ue=a,St.current=o,be!==null)throw Error(t(261));return _e=null,Ge=0,Ke}function lg(){for(;be!==null;)rA(be)}function ug(){for(;be!==null&&!xf();)rA(be)}function rA(e){var r=tA(e.alternate,e,cr);e.memoizedProps=e.pendingProps,r===null?nA(e):be=r,xs.current=null}function nA(e){var r=e;do{var a=r.alternate;if(e=r.return,(r.flags&32768)===0){if(a=rg(a,r,cr),a!==null){be=a;return}}else{if(a=ng(a,r),a!==null){a.flags&=32767,be=a;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ke=6,be=null;return}}if(r=r.sibling,r!==null){be=r;return}be=r=e}while(r!==null);Ke===0&&(Ke=5)}function Rn(e,r,a){var o=fe,l=gr.transition;try{gr.transition=null,fe=1,cg(e,r,a,o)}finally{gr.transition=l,fe=o}return null}function cg(e,r,a,o){do ua();while(mn!==null);if((ue&6)!==0)throw Error(t(327));a=e.finishedWork;var l=e.finishedLanes;if(a===null)return null;if(e.finishedWork=null,e.finishedLanes=0,a===e.current)throw Error(t(177));e.callbackNode=null,e.callbackPriority=0;var c=a.lanes|a.childLanes;if(Uf(e,c),e===_e&&(be=_e=null,Ge=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Ct||(Ct=!0,oA(wi,function(){return ua(),null})),c=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||c){c=gr.transition,gr.transition=null;var d=fe;fe=1;var S=ue;ue|=4,xs.current=null,ig(e,a),Wm(a,e),wp(Fo),_i=!!Vo,Fo=Vo=null,e.current=a,tg(a),Kf(),ue=S,fe=d,gr.transition=c}else e.current=a;if(Ct&&(Ct=!1,mn=e,Pt=l),c=e.pendingLanes,c===0&&(cn=null),Yf(a.stateNode),ar(e,Ne()),r!==null)for(o=e.onRecoverableError,a=0;a<r.length;a++)l=r[a],o(l.value,{componentStack:l.stack,digest:l.digest});if(vt)throw vt=!1,e=_s,_s=null,e;return(Pt&1)!==0&&e.tag!==0&&ua(),c=e.pendingLanes,(c&1)!==0?e===Ys?ti++:(ti=0,Ys=e):ti=0,on(),null}function ua(){if(mn!==null){var e=Uu(Pt),r=gr.transition,a=fe;try{if(gr.transition=null,fe=16>e?16:e,mn===null)var o=!1;else{if(e=mn,mn=null,Pt=0,(ue&6)!==0)throw Error(t(331));var l=ue;for(ue|=4,J=e.current;J!==null;){var c=J,d=c.child;if((J.flags&16)!==0){var S=c.deletions;if(S!==null){for(var C=0;C<S.length;C++){var L=S[C];for(J=L;J!==null;){var x=J;switch(x.tag){case 0:case 11:case 15:ni(8,x,c)}var K=x.child;if(K!==null)K.return=x,J=K;else for(;J!==null;){x=J;var b=x.sibling,U=x.return;if(Hm(x),x===L){J=null;break}if(b!==null){b.return=U,J=b;break}J=U}}}var z=c.alternate;if(z!==null){var Z=z.child;if(Z!==null){z.child=null;do{var we=Z.sibling;Z.sibling=null,Z=we}while(Z!==null)}}J=c}}if((c.subtreeFlags&2064)!==0&&d!==null)d.return=c,J=d;else e:for(;J!==null;){if(c=J,(c.flags&2048)!==0)switch(c.tag){case 0:case 11:case 15:ni(9,c,c.return)}var M=c.sibling;if(M!==null){M.return=c.return,J=M;break e}J=c.return}}var P=e.current;for(J=P;J!==null;){d=J;var T=d.child;if((d.subtreeFlags&2064)!==0&&T!==null)T.return=d,J=T;else e:for(d=P;J!==null;){if(S=J,(S.flags&2048)!==0)try{switch(S.tag){case 0:case 11:case 15:yt(9,S)}}catch(q){Be(S,S.return,q)}if(S===d){J=null;break e}var Y=S.sibling;if(Y!==null){Y.return=S.return,J=Y;break e}J=S.return}}if(ue=l,on(),Rr&&typeof Rr.onPostCommitFiberRoot=="function")try{Rr.onPostCommitFiberRoot(Ri,e)}catch{}o=!0}return o}finally{fe=a,gr.transition=r}}return!1}function aA(e,r,a){r=ta(a,r),r=vm(e,r,1),e=ln(e,r,1),r=Xe(),e!==null&&(Na(e,1,r),ar(e,r))}function Be(e,r,a){if(e.tag===3)aA(e,e,a);else for(;r!==null;){if(r.tag===3){aA(r,e,a);break}else if(r.tag===1){var o=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(cn===null||!cn.has(o))){e=ta(a,e),e=Cm(r,e,1),r=ln(r,e,1),e=Xe(),r!==null&&(Na(r,1,e),ar(r,e));break}}r=r.return}}function mg(e,r,a){var o=e.pingCache;o!==null&&o.delete(r),r=Xe(),e.pingedLanes|=e.suspendedLanes&a,_e===e&&(Ge&a)===a&&(Ke===4||Ke===3&&(Ge&130023424)===Ge&&500>Ne()-Is?wn(e,0):Ks|=a),ar(e,r)}function iA(e,r){r===0&&((e.mode&1)===0?r=1:(r=Di,Di<<=1,(Di&130023424)===0&&(Di=4194304)));var a=Xe();e=Vr(e,r),e!==null&&(Na(e,r,a),ar(e,a))}function Ag(e){var r=e.memoizedState,a=0;r!==null&&(a=r.retryLane),iA(e,a)}function dg(e,r){var a=0;switch(e.tag){case 13:var o=e.stateNode,l=e.memoizedState;l!==null&&(a=l.retryLane);break;case 19:o=e.stateNode;break;default:throw Error(t(314))}o!==null&&o.delete(r),iA(e,a)}var tA;tA=function(e,r,a){if(e!==null)if(e.memoizedProps!==r.pendingProps||$e.current)rr=!0;else{if((e.lanes&a)===0&&(r.flags&128)===0)return rr=!1,eg(e,r,a);rr=(e.flags&131072)!==0}else rr=!1,Pe&&(r.flags&1048576)!==0&&Yc(r,rt,r.index);switch(r.lanes=0,r.tag){case 2:var o=r.type;pt(e,r),e=r.pendingProps;var l=Xn(r,Ve.current);aa(r,a),l=ds(null,r,o,e,l,a);var c=hs();return r.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,er(o)?(c=!0,qi(r)):c=!1,r.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,os(r),l.updater=ht,r.stateNode=l,l._reactInternals=r,ks(r,o,e,a),r=Es(null,r,o,!0,c,a)):(r.tag=0,Pe&&c&&Qo(r),Qe(null,r,l,a),r=r.child),r;case 16:o=r.elementType;e:{switch(pt(e,r),e=r.pendingProps,l=o._init,o=l(o._payload),r.type=o,l=r.tag=fg(o),e=Mr(o,e),l){case 0:r=Ps(null,r,o,e,a);break e;case 1:r=Rm(null,r,o,e,a);break e;case 11:r=Tm(null,r,o,e,a);break e;case 14:r=Bm(null,r,o,Mr(o.type,e),a);break e}throw Error(t(306,o,""))}return r;case 0:return o=r.type,l=r.pendingProps,l=r.elementType===o?l:Mr(o,l),Ps(e,r,o,l,a);case 1:return o=r.type,l=r.pendingProps,l=r.elementType===o?l:Mr(o,l),Rm(e,r,o,l,a);case 3:e:{if(bm(r),e===null)throw Error(t(387));o=r.pendingProps,c=r.memoizedState,l=c.element,Jc(e,r),st(r,o,null,a);var d=r.memoizedState;if(o=d.element,c.isDehydrated)if(c={element:o,isDehydrated:!1,cache:d.cache,pendingSuspenseBoundaries:d.pendingSuspenseBoundaries,transitions:d.transitions},r.updateQueue.baseState=c,r.memoizedState=c,r.flags&256){l=ta(Error(t(423)),r),r=Dm(e,r,o,a,l);break e}else if(o!==l){l=ta(Error(t(424)),r),r=Dm(e,r,o,a,l);break e}else for(ur=nn(r.stateNode.containerInfo.firstChild),lr=r,Pe=!0,Er=null,a=jc(r,null,o,a),r.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ea(),o===l){r=Ur(e,r,a);break e}Qe(e,r,o,a)}r=r.child}return r;case 5:return Qc(r),e===null&&$o(r),o=r.type,l=r.pendingProps,c=e!==null?e.memoizedProps:null,d=l.children,Uo(o,l)?d=null:c!==null&&Uo(o,c)&&(r.flags|=32),wm(e,r),Qe(e,r,d,a),r.child;case 6:return e===null&&$o(r),null;case 13:return xm(e,r,a);case 4:return ss(r,r.stateNode.containerInfo),o=r.pendingProps,e===null?r.child=ra(r,null,o,a):Qe(e,r,o,a),r.child;case 11:return o=r.type,l=r.pendingProps,l=r.elementType===o?l:Mr(o,l),Tm(e,r,o,l,a);case 7:return Qe(e,r,r.pendingProps,a),r.child;case 8:return Qe(e,r,r.pendingProps.children,a),r.child;case 12:return Qe(e,r,r.pendingProps.children,a),r.child;case 10:e:{if(o=r.type._context,l=r.pendingProps,c=r.memoizedProps,d=l.value,ge(it,o._currentValue),o._currentValue=d,c!==null)if(Pr(c.value,d)){if(c.children===l.children&&!$e.current){r=Ur(e,r,a);break e}}else for(c=r.child,c!==null&&(c.return=r);c!==null;){var S=c.dependencies;if(S!==null){d=c.child;for(var C=S.firstContext;C!==null;){if(C.context===o){if(c.tag===1){C=Fr(-1,a&-a),C.tag=2;var L=c.updateQueue;if(L!==null){L=L.shared;var x=L.pending;x===null?C.next=C:(C.next=x.next,x.next=C),L.pending=C}}c.lanes|=a,C=c.alternate,C!==null&&(C.lanes|=a),is(c.return,a,r),S.lanes|=a;break}C=C.next}}else if(c.tag===10)d=c.type===r.type?null:c.child;else if(c.tag===18){if(d=c.return,d===null)throw Error(t(341));d.lanes|=a,S=d.alternate,S!==null&&(S.lanes|=a),is(d,a,r),d=c.sibling}else d=c.child;if(d!==null)d.return=c;else for(d=c;d!==null;){if(d===r){d=null;break}if(c=d.sibling,c!==null){c.return=d.return,d=c;break}d=d.return}c=d}Qe(e,r,l.children,a),r=r.child}return r;case 9:return l=r.type,o=r.pendingProps.children,aa(r,a),l=fr(l),o=o(l),r.flags|=1,Qe(e,r,o,a),r.child;case 14:return o=r.type,l=Mr(o,r.pendingProps),l=Mr(o.type,l),Bm(e,r,o,l,a);case 15:return Lm(e,r,r.type,r.pendingProps,a);case 17:return o=r.type,l=r.pendingProps,l=r.elementType===o?l:Mr(o,l),pt(e,r),r.tag=1,er(o)?(e=!0,qi(r)):e=!1,aa(r,a),Sm(r,o,l),ks(r,o,l,a),Es(null,r,o,!0,e,a);case 19:return Im(e,r,a);case 22:return Nm(e,r,a)}throw Error(t(156,r.tag))};function oA(e,r){return Ou(e,r)}function hg(e,r,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yr(e,r,a,o){return new hg(e,r,a,o)}function Us(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fg(e){if(typeof e=="function")return Us(e)?1:0;if(e!=null){if(e=e.$$typeof,e===tr)return 11;if(e===vr)return 14}return 2}function hn(e,r){var a=e.alternate;return a===null?(a=yr(e.tag,r,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=r,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&14680064,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,r=e.dependencies,a.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a}function Bt(e,r,a,o,l,c){var d=2;if(o=e,typeof e=="function")Us(e)&&(d=1);else if(typeof e=="string")d=5;else e:switch(e){case X:return bn(a.children,l,c,r);case j:d=8,l|=8;break;case le:return e=yr(12,a,r,l|2),e.elementType=le,e.lanes=c,e;case ze:return e=yr(13,a,r,l),e.elementType=ze,e.lanes=c,e;case qe:return e=yr(19,a,r,l),e.elementType=qe,e.lanes=c,e;case te:return Lt(a,l,c,r);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case de:d=10;break e;case De:d=9;break e;case tr:d=11;break e;case vr:d=14;break e;case Ze:d=16,o=null;break e}throw Error(t(130,e==null?e:typeof e,""))}return r=yr(d,a,r,l),r.elementType=e,r.type=o,r.lanes=c,r}function bn(e,r,a,o){return e=yr(7,e,o,r),e.lanes=a,e}function Lt(e,r,a,o){return e=yr(22,e,o,r),e.elementType=te,e.lanes=a,e.stateNode={isHidden:!1},e}function js(e,r,a){return e=yr(6,e,null,r),e.lanes=a,e}function Ws(e,r,a){return r=yr(4,e.children!==null?e.children:[],e.key,r),r.lanes=a,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function pg(e,r,a,o,l){this.tag=r,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=So(0),this.expirationTimes=So(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=So(0),this.identifierPrefix=o,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Js(e,r,a,o,l,c,d,S,C){return e=new pg(e,r,a,S,C),r===1?(r=1,c===!0&&(r|=8)):r=0,c=yr(3,null,null,r),e.current=c,c.stateNode=e,c.memoizedState={element:o,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},os(c),e}function gg(e,r,a){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:F,key:o==null?null:""+o,children:e,containerInfo:r,implementation:a}}function sA(e){if(!e)return tn;e=e._reactInternals;e:{if(kn(e)!==e||e.tag!==1)throw Error(t(170));var r=e;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(er(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(t(171))}if(e.tag===1){var a=e.type;if(er(a))return Kc(e,a,r)}return r}function lA(e,r,a,o,l,c,d,S,C){return e=Js(a,o,!0,e,l,c,d,S,C),e.context=sA(null),a=e.current,o=Xe(),l=An(a),c=Fr(o,l),c.callback=r??null,ln(a,c,l),e.current.lanes=l,Na(e,l,o),ar(e,o),e}function Nt(e,r,a,o){var l=r.current,c=Xe(),d=An(l);return a=sA(a),r.context===null?r.context=a:r.pendingContext=a,r=Fr(c,d),r.payload={element:e},o=o===void 0?null:o,o!==null&&(r.callback=o),e=ln(l,r,d),e!==null&&(Lr(e,l,d,c),ot(e,l,d)),d}function wt(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uA(e,r){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<r?a:r}}function zs(e,r){uA(e,r),(e=e.alternate)&&uA(e,r)}function yg(){return null}var cA=typeof reportError=="function"?reportError:function(e){console.error(e)};function Zs(e){this._internalRoot=e}Rt.prototype.render=Zs.prototype.render=function(e){var r=this._internalRoot;if(r===null)throw Error(t(409));Nt(e,r,null,null)},Rt.prototype.unmount=Zs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var r=e.containerInfo;Nn(function(){Nt(null,e,null,null)}),r[Yr]=null}};function Rt(e){this._internalRoot=e}Rt.prototype.unstable_scheduleHydration=function(e){if(e){var r=Ju();e={blockedOn:null,target:e,priority:r};for(var a=0;a<$r.length&&r!==0&&r<$r[a].priority;a++);$r.splice(a,0,e),a===0&&Qu(e)}};function Qs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function bt(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function mA(){}function Sg(e,r,a,o,l){if(l){if(typeof o=="function"){var c=o;o=function(){var L=wt(d);c.call(L)}}var d=lA(r,o,e,0,null,!1,!1,"",mA);return e._reactRootContainer=d,e[Yr]=d.current,Fa(e.nodeType===8?e.parentNode:e),Nn(),d}for(;l=e.lastChild;)e.removeChild(l);if(typeof o=="function"){var S=o;o=function(){var L=wt(C);S.call(L)}}var C=Js(e,0,!1,null,null,!1,!1,"",mA);return e._reactRootContainer=C,e[Yr]=C.current,Fa(e.nodeType===8?e.parentNode:e),Nn(function(){Nt(r,C,a,o)}),C}function Dt(e,r,a,o,l){var c=a._reactRootContainer;if(c){var d=c;if(typeof l=="function"){var S=l;l=function(){var C=wt(d);S.call(C)}}Nt(r,d,e,l)}else d=Sg(a,r,e,l,o);return wt(d)}ju=function(e){switch(e.tag){case 3:var r=e.stateNode;if(r.current.memoizedState.isDehydrated){var a=La(r.pendingLanes);a!==0&&(ko(r,a|1),ar(r,Ne()),(ue&6)===0&&(la=Ne()+500,on()))}break;case 13:Nn(function(){var o=Vr(e,1);if(o!==null){var l=Xe();Lr(o,e,1,l)}}),zs(e,1)}},vo=function(e){if(e.tag===13){var r=Vr(e,134217728);if(r!==null){var a=Xe();Lr(r,e,134217728,a)}zs(e,134217728)}},Wu=function(e){if(e.tag===13){var r=An(e),a=Vr(e,r);if(a!==null){var o=Xe();Lr(a,e,r,o)}zs(e,r)}},Ju=function(){return fe},zu=function(e,r){var a=fe;try{return fe=e,r()}finally{fe=a}},Ao=function(e,r,a){switch(r){case"input":if(io(e,a),r=a.name,a.type==="radio"&&r!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<a.length;r++){var o=a[r];if(o!==e&&o.form===e.form){var l=Qi(o);if(!l)throw Error(t(90));yu(o),io(o,l)}}}break;case"textarea":Pu(e,a);break;case"select":r=a.value,r!=null&&On(e,!!a.multiple,r,!1)}},bu=Hs,Du=Nn;var kg={usingClientEntryPoint:!1,Events:[Wa,Zn,Qi,wu,Ru,Hs]},oi={findFiberByHostInstance:vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vg={bundleType:oi.bundleType,version:oi.version,rendererPackageName:oi.rendererPackageName,rendererConfig:oi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Q.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=_u(e),e===null?null:e.stateNode},findFiberByHostInstance:oi.findFiberByHostInstance||yg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xt=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xt.isDisabled&&xt.supportsFiber)try{Ri=xt.inject(vg),Rr=xt}catch{}}return ir.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kg,ir.createPortal=function(e,r){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qs(r))throw Error(t(200));return gg(e,r,null,a)},ir.createRoot=function(e,r){if(!Qs(e))throw Error(t(299));var a=!1,o="",l=cA;return r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),r=Js(e,1,!1,null,null,a,!1,o,l),e[Yr]=r.current,Fa(e.nodeType===8?e.parentNode:e),new Zs(r)},ir.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var r=e._reactInternals;if(r===void 0)throw typeof e.render=="function"?Error(t(188)):(e=Object.keys(e).join(","),Error(t(268,e)));return e=_u(r),e=e===null?null:e.stateNode,e},ir.flushSync=function(e){return Nn(e)},ir.hydrate=function(e,r,a){if(!bt(r))throw Error(t(200));return Dt(null,e,r,!0,a)},ir.hydrateRoot=function(e,r,a){if(!Qs(e))throw Error(t(405));var o=a!=null&&a.hydratedSources||null,l=!1,c="",d=cA;if(a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onRecoverableError!==void 0&&(d=a.onRecoverableError)),r=lA(r,null,e,1,a??null,l,!1,c,d),e[Yr]=r.current,Fa(e),o)for(e=0;e<o.length;e++)a=o[e],l=a._getVersion,l=l(a._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[a,l]:r.mutableSourceEagerHydrationData.push(a,l);return new Rt(r)},ir.render=function(e,r,a){if(!bt(r))throw Error(t(200));return Dt(null,e,r,!1,a)},ir.unmountComponentAtNode=function(e){if(!bt(e))throw Error(t(40));return e._reactRootContainer?(Nn(function(){Dt(null,null,e,!1,function(){e._reactRootContainer=null,e[Yr]=null})}),!0):!1},ir.unstable_batchedUpdates=Hs,ir.unstable_renderSubtreeIntoContainer=function(e,r,a,o){if(!bt(a))throw Error(t(200));if(e==null||e._reactInternals===void 0)throw Error(t(38));return Dt(e,r,a,!1,o)},ir.version="18.3.1-next-f1338f8080-20240426",ir}var SA;function Ng(){if(SA)return $s.exports;SA=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(i){console.error(i)}}return n(),$s.exports=Lg(),$s.exports}var kA;function wg(){if(kA)return Kt;kA=1;var n=Ng();return Kt.createRoot=n.createRoot,Kt.hydrateRoot=n.hydrateRoot,Kt}var Rg=wg();const bg=`IATA,City,Timezone\r
GKA,Goroka,Pacific/Port_Moresby\r
MAG,Madang,Pacific/Port_Moresby\r
HGU,Mount Hagen,Pacific/Port_Moresby\r
LAE,Nadzab,Pacific/Port_Moresby\r
POM,Port Moresby,Pacific/Port_Moresby\r
WWK,Wewak,Pacific/Port_Moresby\r
UAK,Narssarssuaq,America/Nuuk\r
GOH,Godthaab,America/Nuuk\r
SFJ,Sondrestrom,America/Nuuk\r
THU,Thule,America/Thule\r
AEY,Akureyri,Atlantic/Reykjavik\r
EGS,Egilsstadir,Atlantic/Reykjavik\r
HFN,Hofn,Atlantic/Reykjavik\r
HZK,Husavik,Atlantic/Reykjavik\r
IFJ,Isafjordur,Atlantic/Reykjavik\r
KEF,Keflavik,Atlantic/Reykjavik\r
PFJ,Patreksfjordur,Atlantic/Reykjavik\r
RKV,Reykjavik,Atlantic/Reykjavik\r
SIJ,Siglufjordur,Atlantic/Reykjavik\r
VEY,Vestmannaeyjar,Atlantic/Reykjavik\r
YAM,Sault Sainte Marie,America/Toronto\r
YAY,St. Anthony,America/St_Johns\r
YAZ,Tofino,America/Vancouver\r
YBB,Pelly Bay,America/Cambridge_Bay\r
YBC,Baie Comeau,America/Toronto\r
YBG,Bagotville,America/Toronto\r
YBK,Baker Lake,America/Rankin_Inlet\r
YBL,Campbell River,America/Vancouver\r
YBR,Brandon,America/Winnipeg\r
YCB,Cambridge Bay,America/Cambridge_Bay\r
YCD,Nanaimo,America/Vancouver\r
YCG,Castlegar,America/Vancouver\r
YCH,Chatham,America/Moncton\r
YCL,Charlo,America/Moncton\r
YCO,Coppermine,America/Cambridge_Bay\r
YCT,Coronation,America/Edmonton\r
YCW,Chilliwack,America/Vancouver\r
YCY,Clyde River,America/Iqaluit\r
YZS,Coral Harbour,America/Atikokan\r
YDA,Dawson,America/Dawson\r
YDB,Burwash,America/Dawson\r
YDF,Deer Lake,America/St_Johns\r
YDL,Dease Lake,America/Vancouver\r
YDN,Dauphin,America/Winnipeg\r
YDQ,Dawson Creek,America/Dawson_Creek\r
YEG,Edmonton,America/Edmonton\r
YEK,Eskimo Point,America/Rankin_Inlet\r
YEN,Estevan,America/Regina\r
YET,Edson,America/Edmonton\r
YEU,Eureka,America/Atikokan\r
YEV,Inuvik,America/Inuvik\r
YFB,Iqaluit,America/Iqaluit\r
YFC,Fredericton,America/Moncton\r
YFE,Forestville,America/Toronto\r
YFO,Flin Flon,America/Winnipeg\r
YFR,Fort Resolution,America/Edmonton\r
YFS,Fort Simpson,America/Inuvik\r
YGK,Kingston,America/Toronto\r
YGL,La Grande Riviere,America/Toronto\r
YGP,Gaspe,America/Toronto\r
YGQ,Geraldton,America/Toronto\r
YGR,Iles De La Madeleine,America/Halifax\r
YHB,Hudson Bay,America/Regina\r
YHD,Dryden,America/Winnipeg\r
YHI,Holman Island,America/Edmonton\r
YHK,Gjoa Haven,America/Cambridge_Bay\r
YHM,Hamilton,America/Toronto\r
YHU,Montreal,America/Toronto\r
YHY,Hay River,America/Edmonton\r
YHZ,Halifax,America/Halifax\r
YIB,Atikokan,America/Atikokan\r
YIO,Pond Inlet,America/Iqaluit\r
YJN,St. Jean,America/Toronto\r
YJT,Stephenville,America/St_Johns\r
YKA,Kamloops,America/Vancouver\r
YKF,Waterloo,America/Toronto\r
YKL,Schefferville,America/Toronto\r
YKY,Kindersley,America/Swift_Current\r
YKZ,Toronto,America/Toronto\r
YLD,Chapleau,America/Toronto\r
YLJ,Meadow Lake,America/Swift_Current\r
YLL,Lloydminster,America/Edmonton\r
YLT,Alert,America/Iqaluit\r
YLW,Kelowna,America/Vancouver\r
YMA,Mayo,America/Whitehorse\r
YMJ,Moose Jaw,America/Regina\r
YMM,Fort Mcmurray,America/Edmonton\r
YMO,Moosonee,America/Toronto\r
YMW,Maniwaki,America/Toronto\r
YMX,Montreal,America/Toronto\r
YNA,Natashquan,America/Blanc-Sablon\r
YND,Gatineau,America/Toronto\r
YNM,Matagami,America/Toronto\r
YOC,Old Crow,America/Dawson\r
YOD,Cold Lake,America/Edmonton\r
YOJ,High Level,America/Edmonton\r
YOW,Ottawa,America/Toronto\r
YPA,Prince Albert,America/Regina\r
YPE,Peace River,America/Edmonton\r
YPG,Portage-la-prairie,America/Winnipeg\r
YPL,Pickle Lake,America/Atikokan\r
YPN,Port Menier,America/Toronto\r
YPQ,Peterborough,America/Toronto\r
YPR,Prince Pupert,America/Vancouver\r
YPY,Fort Chipewyan,America/Edmonton\r
YQA,Muskoka,America/Toronto\r
YQB,Quebec,America/Toronto\r
YQF,Red Deer Industrial,America/Edmonton\r
YQG,Windsor,America/Toronto\r
YQH,Watson Lake,America/Whitehorse\r
YQK,Kenora,America/Winnipeg\r
YQL,Lethbridge,America/Edmonton\r
YQM,Moncton,America/Moncton\r
YQQ,Comox,America/Vancouver\r
YQR,Regina,America/Regina\r
YQT,Thunder Bay,America/Toronto\r
YQU,Grande Prairie,America/Edmonton\r
YQV,Yorkton,America/Regina\r
YQW,North Battleford,America/Swift_Current\r
YQX,Gander,America/St_Johns\r
YQY,Sydney,America/Glace_Bay\r
YQZ,Quesnel,America/Vancouver\r
YRB,Resolute,America/Resolute\r
YRI,Riviere Du Loup,America/Toronto\r
YRJ,Roberval,America/Toronto\r
YRM,Rocky Mountain House,America/Edmonton\r
YRT,Rankin Inlet,America/Rankin_Inlet\r
YSB,Sudbury,America/Toronto\r
YSC,Sherbrooke,America/Toronto\r
YSJ,St. John,America/Moncton\r
YSM,Fort Smith,America/Edmonton\r
YSR,Nanisivik,America/Iqaluit\r
YSU,Summerside,America/Halifax\r
YSY,Sachs Harbour,America/Inuvik\r
YTE,Cape Dorset,America/Iqaluit\r
YTH,Thompson,America/Winnipeg\r
YTR,Trenton,America/Toronto\r
YTS,Timmins,America/Toronto\r
YTZ,Toronto,America/Toronto\r
YUB,Tuktoyaktuk,America/Inuvik\r
YUL,Montreal,America/Toronto\r
YUT,Repulse Bay,America/Rankin_Inlet\r
YUX,Hall Beach,America/Iqaluit\r
YUY,Rouyn,America/Toronto\r
YVC,La Ronge,America/Regina\r
YVG,Vermillion,America/Edmonton\r
YVM,Broughton Island,America/Iqaluit\r
YVO,Val D'or,America/Toronto\r
YVP,Quujjuaq,America/Toronto\r
YVQ,Norman Wells,America/Inuvik\r
YVR,Vancouver,America/Vancouver\r
YVT,Buffalo Narrows,America/Regina\r
YVV,Wiarton,America/Toronto\r
YWA,Petawawa,America/Toronto\r
YWG,Winnipeg,America/Winnipeg\r
YWK,Wabush,America/Goose_Bay\r
YWL,Williams Lake,America/Vancouver\r
YWY,Wrigley,America/Inuvik\r
YXC,Cranbrook,America/Edmonton\r
YXD,Edmonton,America/Edmonton\r
YXE,Saskatoon,America/Regina\r
YXH,Medicine Hat,America/Edmonton\r
YXJ,Fort Saint John,America/Dawson_Creek\r
YXL,Sioux Lookout,America/Winnipeg\r
YXP,Pangnirtung,America/Iqaluit\r
YXR,Earlton,America/Toronto\r
YXS,Prince George,America/Vancouver\r
YXT,Terrace,America/Vancouver\r
YXU,London,America/Toronto\r
YXX,Abbotsford,America/Vancouver\r
YXY,Whitehorse,America/Whitehorse\r
YYB,North Bay,America/Toronto\r
YYC,Calgary,America/Edmonton\r
YYD,Smithers,America/Vancouver\r
YYE,Fort Nelson,America/Fort_Nelson\r
YYF,Penticton,America/Vancouver\r
YYG,Charlottetown,America/Halifax\r
YYH,Spence Bay,America/Cambridge_Bay\r
YYJ,Victoria,America/Vancouver\r
YYL,Lynn Lake,America/Winnipeg\r
YYN,Swift Current,America/Swift_Current\r
YYQ,Churchill,America/Winnipeg\r
YYR,Goose Bay,America/Goose_Bay\r
YYT,St. John's,America/St_Johns\r
YYU,Kapuskasing,America/Toronto\r
YYW,Armstrong,America/Toronto\r
YYY,Mont Joli,America/Toronto\r
YYZ,Toronto,America/Toronto\r
YZD,Toronto,America/Toronto\r
YZE,Gore Bay,America/Toronto\r
YZF,Yellowknife,America/Edmonton\r
YZH,Slave Lake,America/Edmonton\r
YZP,Sandspit,America/Vancouver\r
YZR,Sarnia,America/Toronto\r
YZT,Port Hardy,America/Vancouver\r
YZU,Whitecourt,America/Edmonton\r
YZV,Sept-iles,America/Toronto\r
YZW,Teslin,America/Whitehorse\r
YZX,Greenwood,America/Halifax\r
ZFA,Faro,America/Whitehorse\r
ZFM,Fort Mcpherson,America/Inuvik\r
QLD,Blida,Africa/Algiers\r
BUJ,Bou Saada,Africa/Algiers\r
BJA,Bejaja,Africa/Algiers\r
ALG,Algier,Africa/Algiers\r
DJG,Djanet,Africa/Algiers\r
VVZ,Illizi,Africa/Algiers\r
TMR,Tamanrasset,Africa/Algiers\r
GJL,Jijel,Africa/Algiers\r
MZW,Mecheria,Africa/Algiers\r
AAE,Annaba,Africa/Algiers\r
CZL,Constantine,Africa/Algiers\r
TEE,Tebessa,Africa/Algiers\r
HRM,Tilrempt,Africa/Algiers\r
TID,Tiaret,Africa/Algiers\r
TIN,Tindouf,Africa/Algiers\r
CFK,Ech-cheliff,Africa/Algiers\r
TAF,Oran,Africa/Algiers\r
TLM,Tlemcen,Africa/Algiers\r
ORN,Oran,Africa/Algiers\r
BFW,Sidi Bel Abbes,Africa/Algiers\r
MUW,Ghriss,Africa/Algiers\r
AZR,Adrar,Africa/Algiers\r
BSK,Biskra,Africa/Algiers\r
ELG,El Golea,Africa/Algiers\r
GHA,Ghardaia,Africa/Algiers\r
HME,Hassi Messaoud,Africa/Algiers\r
INZ,In Salah,Africa/Algiers\r
TGR,Touggourt,Africa/Algiers\r
LOO,Laghouat,Africa/Algiers\r
TMX,Timimoun,Africa/Algiers\r
OGX,Ouargla,Africa/Algiers\r
IAM,Zarzaitine,Africa/Algiers\r
COO,Cotonou,Africa/Porto-Novo\r
OUA,Ouagadougou,Africa/Ouagadougou\r
BOY,Bobo-dioulasso,Africa/Ouagadougou\r
ACC,Accra,Africa/Accra\r
TML,Tamale,Africa/Accra\r
NYI,Sunyani,Africa/Accra\r
TKD,Takoradi,Africa/Accra\r
ABJ,Abidjan,Africa/Abidjan\r
BYK,Bouake,Africa/Abidjan\r
DJO,Daloa,Africa/Abidjan\r
HGO,Korhogo,Africa/Abidjan\r
MJC,Man,Africa/Abidjan\r
SPY,San Pedro,Africa/Abidjan\r
ASK,Yamoussoukro,Africa/Abidjan\r
ABV,Abuja,Africa/Lagos\r
AKR,Akure,Africa/Lagos\r
BNI,Benin,Africa/Lagos\r
CBQ,Calabar,Africa/Lagos\r
ENU,Enugu,Africa/Lagos\r
IBA,Ibadan,Africa/Lagos\r
ILR,Ilorin,Africa/Lagos\r
JOS,Jos,Africa/Lagos\r
KAD,Kaduna,Africa/Lagos\r
KAN,Kano,Africa/Lagos\r
MIU,Maiduguri,Africa/Lagos\r
MDI,Makurdi,Africa/Lagos\r
LOS,Lagos,Africa/Lagos\r
MXJ,Minna,Africa/Lagos\r
PHC,Port Hartcourt,Africa/Lagos\r
SKO,Sokoto,Africa/Lagos\r
YOL,Yola,Africa/Lagos\r
ZAR,Zaria,Africa/Lagos\r
MFQ,Maradi,Africa/Niamey\r
NIM,Niamey,Africa/Niamey\r
THZ,Tahoua,Africa/Niamey\r
AJY,Agadez,Africa/Niamey\r
ZND,Zinder,Africa/Niamey\r
MIR,Monastir,Africa/Tunis\r
TUN,Tunis,Africa/Tunis\r
GAF,Gafsa,Africa/Tunis\r
GAE,Gabes,Africa/Tunis\r
DJE,Djerba,Africa/Tunis\r
EBM,El Borma,Africa/Tunis\r
SFA,Sfax,Africa/Tunis\r
TOE,Tozeur,Africa/Tunis\r
LRL,Niatougou,Africa/Lome\r
LFW,Lome,Africa/Lome\r
ANR,Antwerp,Europe/Brussels\r
BRU,Brussels,Europe/Brussels\r
CRL,Charleroi,Europe/Brussels\r
KJK,Kortrijk-vevelgem,Europe/Brussels\r
LGG,Liege,Europe/Brussels\r
OST,Ostend,Europe/Brussels\r
OBL,Zoersel,Europe/Brussels\r
AOC,Altenburg,Europe/Berlin\r
IES,Riesa,Europe/Berlin\r
REB,Rechlin-laerz,Europe/Berlin\r
QXH,Schoenhagen,Europe/Berlin\r
BBH,Barth,Europe/Berlin\r
ZMG,Magdeburg,Europe/Berlin\r
CBU,Cottbus,Europe/Berlin\r
BER,Berlin,Europe/Berlin\r
DRS,Dresden,Europe/Berlin\r
ERF,Erfurt,Europe/Berlin\r
FRA,Frankfurt,Europe/Berlin\r
FMO,Munster,Europe/Berlin\r
HAM,Hamburg,Europe/Berlin\r
THF,Berlin,Europe/Berlin\r
CGN,Cologne,Europe/Berlin\r
DUS,Duesseldorf,Europe/Berlin\r
MUC,Munich,Europe/Berlin\r
NUE,Nuernberg,Europe/Berlin\r
LEJ,Leipzig,Europe/Berlin\r
SCN,Saarbruecken,Europe/Berlin\r
STR,Stuttgart,Europe/Berlin\r
TXL,Berlin,Europe/Berlin\r
HAJ,Hannover,Europe/Berlin\r
BRE,Bremen,Europe/Berlin\r
QEF,Egelsbach,Europe/Berlin\r
HHN,Hahn,Europe/Berlin\r
MHG,Mannheim,Europe/Berlin\r
EIB,Eisenach,Europe/Berlin\r
SGE,Siegerland,Europe/Berlin\r
XFW,Hamburg,Europe/Berlin\r
KEL,Kiel,Europe/Berlin\r
LBC,Luebeck,Europe/Berlin\r
ESS,Essen,Europe/Berlin\r
BFE,Bielefeld,Europe/Berlin\r
MGL,Moenchengladbach,Europe/Berlin\r
PAD,Paderborn,Europe/Berlin\r
DTM,Dortmund,Europe/Berlin\r
AGB,Augsburg,Europe/Berlin\r
OBF,Oberpfaffenhofen,Europe/Berlin\r
RBM,Straubing,Europe/Berlin\r
FDH,Friedrichshafen,Europe/Berlin\r
SZW,Parchim,Europe/Berlin\r
BYU,Bayreuth,Europe/Berlin\r
URD,Burg Feuerstein,Europe/Berlin\r
HOQ,Hof,Europe/Berlin\r
ZQW,Zweibruecken,Europe/Berlin\r
ZQL,Donaueschingen,Europe/Berlin\r
BWE,Braunschweig,Europe/Berlin\r
KSF,Kassel,Europe/Berlin\r
BRV,Bremerhaven,Europe/Berlin\r
EME,Emden,Europe/Berlin\r
WVN,Wilhelmshaven,Europe/Berlin\r
BMK,Borkum,Europe/Berlin\r
NRD,Norderney,Europe/Berlin\r
FLF,Flensburg,Europe/Berlin\r
GWT,Westerland,Europe/Berlin\r
KDL,Kardla,Europe/Tallinn\r
URE,Kuressaare,Europe/Tallinn\r
EPU,Parnu,Europe/Tallinn\r
TLL,Tallinn-ulemiste International,Europe/Tallinn\r
TAY,Tartu,Europe/Tallinn\r
ENF,Enontekio,Europe/Helsinki\r
KEV,Halli,Europe/Helsinki\r
HEM,Helsinki,Europe/Helsinki\r
HEL,Helsinki,Europe/Helsinki\r
HYV,Hyvinkaa,Europe/Helsinki\r
KTQ,Kitee,Europe/Helsinki\r
IVL,Ivalo,Europe/Helsinki\r
JOE,Joensuu,Europe/Helsinki\r
JYV,Jyvaskyla,Europe/Helsinki\r
KAU,Kauhava,Europe/Helsinki\r
KEM,Kemi,Europe/Helsinki\r
KAJ,Kajaani,Europe/Helsinki\r
KHJ,Kauhajoki,Europe/Helsinki\r
KOK,Kruunupyy,Europe/Helsinki\r
KAO,Kuusamo,Europe/Helsinki\r
KTT,Kittila,Europe/Helsinki\r
KUO,Kuopio,Europe/Helsinki\r
QLF,Vesivehmaa,Europe/Helsinki\r
LPP,Lappeenranta,Europe/Helsinki\r
MHQ,Mariehamn,Europe/Mariehamn\r
MIK,Mikkeli,Europe/Helsinki\r
OUL,Oulu,Europe/Helsinki\r
POR,Pori,Europe/Helsinki\r
RVN,Rovaniemi,Europe/Helsinki\r
SVL,Savonlinna,Europe/Helsinki\r
SOT,Sodankyla,Europe/Helsinki\r
TMP,Tampere,Europe/Helsinki\r
TKU,Turku,Europe/Helsinki\r
UTI,Utti,Europe/Helsinki\r
VAA,Vaasa,Europe/Helsinki\r
VRK,Varkaus,Europe/Helsinki\r
YLI,Ylivieska-raudaskyla,Europe/Helsinki\r
BFS,Belfast,Europe/London\r
ENK,Enniskillen,Europe/London\r
BHD,Belfast,Europe/London\r
LDY,Londonderry,Europe/London\r
BHX,Birmingham,Europe/London\r
CVT,Coventry,Europe/London\r
GLO,Golouchestershire,Europe/London\r
GBA,Pailton,Europe/London\r
MAN,Manchester,Europe/London\r
NQY,Newquai,Europe/London\r
LYE,Lyneham,Europe/London\r
YEO,Yeovilton,Europe/London\r
HAW,Haverfordwest,Europe/London\r
CWL,Cardiff,Europe/London\r
SWS,Swansea,Europe/London\r
BRS,Bristol,Europe/London\r
LPL,Liverpool,Europe/London\r
LTN,London,Europe/London\r
PLH,Plymouth,Europe/London\r
BOH,Bournemouth,Europe/London\r
SOU,Southampton,Europe/London\r
QLA,Lasham,Europe/London\r
ACI,Alderney,Europe/Guernsey\r
GCI,Guernsey,Europe/Guernsey\r
JER,Jersey,Europe/Jersey\r
ESH,Shoreham By Sea,Europe/London\r
BQH,Biggin Hill,Europe/London\r
LGW,London,Europe/London\r
LCY,London,Europe/London\r
FAB,Farnborough,Europe/London\r
BBS,Blackbushe,Europe/London\r
LHR,London,Europe/London\r
SEN,Southend,Europe/London\r
LYX,Lydd,Europe/London\r
MSE,Manston,Europe/London\r
CAX,Carlisle,Europe/London\r
BLK,Blackpool,Europe/London\r
HUY,Humberside,Europe/London\r
BWF,Barrow Island,Europe/London\r
LBA,Leeds,Europe/London\r
WRT,Warton,Europe/London\r
CEG,Hawarden,Europe/London\r
IOM,Isle Of Man,Europe/Isle_of_Man\r
NCL,Newcastle,Europe/London\r
MME,Teesside,Europe/London\r
EMA,East Midlands,Europe/London\r
KOI,Kirkwall,Europe/London\r
LSI,Sumburgh,Europe/London\r
WIC,Wick,Europe/London\r
ABZ,Aberdeen,Europe/London\r
INV,Inverness,Europe/London\r
GLA,Glasgow,Europe/London\r
EDI,Edinburgh,Europe/London\r
ILY,Islay,Europe/London\r
PIK,Prestwick,Europe/London\r
BEB,Benbecula,Europe/London\r
SCS,Scatsta,Europe/London\r
DND,Dundee,Europe/London\r
SYY,Stornoway,Europe/London\r
TRE,Tiree,Europe/London\r
ADX,Leuchars,Europe/London\r
LMO,Lossiemouth,Europe/London\r
CBG,Cambridge,Europe/London\r
NWI,Norwich,Europe/London\r
STN,London,Europe/London\r
EXT,Exeter,Europe/London\r
FZO,Bristol,Europe/London\r
OXF,Oxford,Europe/London\r
BEX,Benson,Europe/London\r
LKZ,Lakenheath,Europe/London\r
MHZ,Mildenhall,Europe/London\r
QUY,Wyton,Europe/London\r
FFD,Fairford,Europe/London\r
BZZ,Brize Norton,Europe/London\r
ODH,Odiham,Europe/London\r
NHT,Northolt,Europe/London\r
QCY,Coningsby,Europe/London\r
BEQ,Honington,Europe/London\r
SQZ,Scampton,Europe/London\r
HRT,Linton-on-ouse,Europe/London\r
WTN,Waddington,Europe/London\r
KNF,Marham,Europe/London\r
MPN,Mount Pleasant,Atlantic/Stanley\r
AMS,Amsterdam,Europe/Amsterdam\r
MST,Maastricht,Europe/Amsterdam\r
EIN,Eindhoven,Europe/Amsterdam\r
GRQ,Groningen,Europe/Amsterdam\r
GLZ,Gilze-rijen,Europe/Amsterdam\r
DHR,De Kooy,Europe/Amsterdam\r
LEY,Lelystad,Europe/Amsterdam\r
LWR,Leeuwarden,Europe/Amsterdam\r
RTM,Rotterdam,Europe/Amsterdam\r
UTC,Soesterberg,Europe/Amsterdam\r
ENS,Enschede,Europe/Amsterdam\r
LID,Valkenburg,Europe/Amsterdam\r
WOE,Woensdrecht,Europe/Amsterdam\r
ORK,Cork,Europe/Dublin\r
GWY,Galway,Europe/Dublin\r
DUB,Dublin,Europe/Dublin\r
NOC,Connaught,Europe/Dublin\r
KIR,Kerry,Europe/Dublin\r
SNN,Shannon,Europe/Dublin\r
SXL,Sligo,Europe/Dublin\r
WAT,Waterford,Europe/Dublin\r
AAR,Aarhus,Europe/Copenhagen\r
BLL,Billund,Europe/Copenhagen\r
CPH,Copenhagen,Europe/Copenhagen\r
EBJ,Esbjerg,Europe/Copenhagen\r
KRP,Karup,Europe/Copenhagen\r
BYR,Laeso,Europe/Copenhagen\r
MRW,Maribo,Europe/Copenhagen\r
ODE,Odense,Europe/Copenhagen\r
RKE,Copenhagen,Europe/Copenhagen\r
RNN,Ronne,Europe/Copenhagen\r
SGD,Soenderborg,Europe/Copenhagen\r
SKS,Skrydstrup,Europe/Copenhagen\r
SQW,Skive,Europe/Copenhagen\r
TED,Thisted,Europe/Copenhagen\r
FAE,Vagar,Atlantic/Faroe\r
STA,Stauning,Europe/Copenhagen\r
AAL,Aalborg,Europe/Copenhagen\r
LUX,Luxemburg,Europe/Luxembourg\r
AES,Alesund,Europe/Oslo\r
ANX,Andoya,Europe/Oslo\r
ALF,Alta,Europe/Oslo\r
BNN,Bronnoysund,Europe/Oslo\r
BOO,Bodo,Europe/Oslo\r
BGO,Bergen,Europe/Oslo\r
BJF,Batsfjord,Europe/Oslo\r
KRS,Kristiansand,Europe/Oslo\r
DLD,Geilo,Europe/Oslo\r
BDU,Bardufoss,Europe/Oslo\r
EVE,Harstad/Narvik,Europe/Oslo\r
VDB,Fagernes,Europe/Oslo\r
FRO,Floro,Europe/Oslo\r
OSL,Oslo,Europe/Oslo\r
HAU,Haugesund,Europe/Oslo\r
HAA,Hasvik,Europe/Oslo\r
KSU,Kristiansund,Europe/Oslo\r
KKN,Kirkenes,Europe/Oslo\r
FAN,Farsund,Europe/Oslo\r
MOL,Molde,Europe/Oslo\r
MJF,Mosjoen,Europe/Oslo\r
LKL,Lakselv,Europe/Oslo\r
NTB,Notodden,Europe/Oslo\r
OLA,Orland,Europe/Oslo\r
RRS,Roros,Europe/Oslo\r
RYG,Rygge,Europe/Oslo\r
LYR,Svalbard,Arctic/Longyearbyen\r
SKE,Skien,Europe/Oslo\r
SRP,Stord,Europe/Oslo\r
SSJ,Sandnessjoen,Europe/Oslo\r
TOS,Tromso,Europe/Oslo\r
TRF,Sandefjord,Europe/Oslo\r
TRD,Trondheim,Europe/Oslo\r
SVG,Stavanger,Europe/Oslo\r
GDN,Gdansk,Europe/Warsaw\r
KRK,Krakow,Europe/Warsaw\r
KTW,Katowice,Europe/Warsaw\r
POZ,Poznan,Europe/Warsaw\r
RZE,Rzeszow,Europe/Warsaw\r
SZZ,Szczecin,Europe/Warsaw\r
OSP,Slupsk,Europe/Warsaw\r
WAW,Warsaw,Europe/Warsaw\r
WRO,Wroclaw,Europe/Warsaw\r
IEG,Zielona Gora,Europe/Warsaw\r
RNB,Ronneby,Europe/Stockholm\r
GOT,Gothenborg,Europe/Stockholm\r
JKG,Joenkoeping,Europe/Stockholm\r
LDK,Lidkoping,Europe/Stockholm\r
GSE,Gothenborg,Europe/Stockholm\r
KVB,Skovde,Europe/Stockholm\r
THN,Trollhattan,Europe/Stockholm\r
KSK,Karlskoga,Europe/Stockholm\r
MXX,Mora,Europe/Stockholm\r
NYO,Stockholm,Europe/Stockholm\r
KID,Kristianstad,Europe/Stockholm\r
OSK,Oskarshamn,Europe/Stockholm\r
KLR,Kalkmar,Europe/Stockholm\r
MMX,Malmoe,Europe/Stockholm\r
HAD,Halmstad,Europe/Stockholm\r
VXO,Vaxjo,Europe/Stockholm\r
EVG,Sveg,Europe/Stockholm\r
GEV,Gallivare,Europe/Stockholm\r
HUV,Hudiksvall,Europe/Stockholm\r
KRF,Kramfors,Europe/Stockholm\r
LYC,Lycksele,Europe/Stockholm\r
SDL,Sundsvall,Europe/Stockholm\r
OER,Ornskoldsvik,Europe/Stockholm\r
KRN,Kiruna,Europe/Stockholm\r
SFT,Skelleftea,Europe/Stockholm\r
UME,Umea,Europe/Stockholm\r
VHM,Vilhelmina,Europe/Stockholm\r
AJR,Arvidsjaur,Europe/Stockholm\r
ORB,Orebro,Europe/Stockholm\r
VST,Vasteras,Europe/Stockholm\r
LLA,Lulea,Europe/Stockholm\r
ARN,Stockholm,Europe/Stockholm\r
BMA,Stockholm,Europe/Stockholm\r
BLE,Borlange,Europe/Stockholm\r
HLF,Hultsfred,Europe/Stockholm\r
GVX,Gavle,Europe/Stockholm\r
LPI,Linkoeping,Europe/Stockholm\r
NRK,Norrkoeping,Europe/Stockholm\r
EKT,Eskilstuna,Europe/Stockholm\r
VBY,Visby,Europe/Stockholm\r
SPM,Spangdahlem,Europe/Berlin\r
RMS,Ramstein,Europe/Berlin\r
GHF,Giebelstadt,Europe/Berlin\r
ZCN,Celle,Europe/Berlin\r
FRZ,Fritzlar,Europe/Berlin\r
ZNF,Hanau,Europe/Berlin\r
KZG,Kitzingen,Europe/Berlin\r
FCN,Nordholz,Europe/Berlin\r
GKE,Geilenkirchen,Europe/Berlin\r
RLG,Laage,Europe/Berlin\r
WBG,Schleswig,Europe/Berlin\r
WIE,Wiesbaden,Europe/Berlin\r
FEL,Fuerstenfeldbruck,Europe/Berlin\r
IGS,Ingolstadt,Europe/Berlin\r
GUT,Guetersloh,Europe/Berlin\r
ALJ,Alexander Bay,Africa/Johannesburg\r
AGZ,Aggeneys,Africa/Johannesburg\r
BIY,Bisho,Africa/Johannesburg\r
BFN,Bloemfontein,Africa/Johannesburg\r
CPT,Cape Town,Africa/Johannesburg\r
DUR,Durban,Africa/Johannesburg\r
ELS,East London,Africa/Johannesburg\r
FCB,Ficksburg,Africa/Johannesburg\r
GCJ,Johannesburg,Africa/Johannesburg\r
GRJ,George,Africa/Johannesburg\r
HRS,Harrismith,Africa/Johannesburg\r
HDS,Hoedspruit,Africa/Johannesburg\r
JNB,Johannesburg,Africa/Johannesburg\r
KXE,Klerksdorp,Africa/Johannesburg\r
KIM,Kimberley,Africa/Johannesburg\r
KMH,Kuruman,Africa/Johannesburg\r
KLZ,Kleinsee,Africa/Johannesburg\r
HLA,Johannesburg,Africa/Johannesburg\r
SDB,Langebaanweg,Africa/Johannesburg\r
LAY,Ladysmith,Africa/Johannesburg\r
MGH,Margate,Africa/Johannesburg\r
LLE,Malalane,Africa/Johannesburg\r
MZQ,Mkuze,Africa/Johannesburg\r
NCS,Newcastle,Africa/Johannesburg\r
OVG,Overberg,Africa/Johannesburg\r
OUH,Oudtshoorn,Africa/Johannesburg\r
PLZ,Port Elizabeth,Africa/Johannesburg\r
PBZ,Plettenberg Bay,Africa/Johannesburg\r
PHW,Phalaborwa,Africa/Johannesburg\r
JOH,Port Saint Johns,Africa/Johannesburg\r
PZB,Pietermaritzburg,Africa/Johannesburg\r
NTY,Pilanesberg,Africa/Johannesburg\r
PTG,Potgietersrus,Africa/Johannesburg\r
PCF,Potchefstroom,Africa/Johannesburg\r
UTW,Queenstown,Africa/Johannesburg\r
RCB,Richard's Bay,Africa/Johannesburg\r
ROD,Robertson,Africa/Johannesburg\r
SBU,Springbok,Africa/Johannesburg\r
ZEC,Secunda,Africa/Johannesburg\r
SIS,Sishen,Africa/Johannesburg\r
SZK,Skukuza,Africa/Johannesburg\r
LTA,Tzaneen,Africa/Johannesburg\r
ULD,Ulundi,Africa/Johannesburg\r
UTN,Upington,Africa/Johannesburg\r
UTT,Umtata,Africa/Johannesburg\r
VRU,Vryburg,Africa/Johannesburg\r
VIR,Durban,Africa/Johannesburg\r
VRE,Vredendal,Africa/Johannesburg\r
PRY,Pretoria,Africa/Johannesburg\r
WKF,Waterkloof,Africa/Johannesburg\r
FRW,Francistown,Africa/Gaborone\r
JWA,Jwaneng,Africa/Gaborone\r
BBK,Kasane,Africa/Gaborone\r
MUB,Maun,Africa/Gaborone\r
GBE,Gaberone,Africa/Gaborone\r
PKW,Selebi-phikwe,Africa/Gaborone\r
BZV,Brazzaville,Africa/Brazzaville\r
FTX,Owando,Africa/Brazzaville\r
OUE,Ouesso,Africa/Brazzaville\r
PNR,Pointe-noire,Africa/Brazzaville\r
MTS,Manzini,Africa/Mbabane\r
BGF,Bangui,Africa/Bangui\r
BBT,Berberati,Africa/Bangui\r
BSG,Bata,Africa/Malabo\r
SSG,Malabo,Africa/Malabo\r
ASI,Wide Awake,Atlantic/St_Helena\r
MRU,Plaisance,Indian/Mauritius\r
RRG,Rodriguez Island,Indian/Mauritius\r
NKW,Diego Garcia Island,Indian/Chagos\r
TKC,Tiko,Africa/Douala\r
DLA,Douala,Africa/Douala\r
MVR,Maroua,Africa/Douala\r
FOM,Foumban,Africa/Douala\r
NGE,N'gaoundere,Africa/Douala\r
GOU,Garoua,Africa/Douala\r
BFX,Bafoussam,Africa/Douala\r
BPC,Bamenda,Africa/Douala\r
YAO,Yaounde,Africa/Douala\r
CGJ,Kasompe,Africa/Lusaka\r
LVI,Livingstone,Africa/Lusaka\r
LUN,Lusaka,Africa/Lusaka\r
MFU,Mfuwe,Africa/Lusaka\r
MNR,Mongu,Africa/Lusaka\r
NLA,Ndola,Africa/Lusaka\r
KIW,Southdowns,Africa/Lusaka\r
HAH,Moroni,Indian/Comoro\r
NWA,Moheli,Indian/Comoro\r
AJN,Anjouan,Indian/Comoro\r
DZA,Dzaoudzi,Indian/Mayotte\r
RUN,St.-denis,Indian/Reunion\r
ZSE,St.-pierre,Indian/Reunion\r
TNR,Antananarivo,Indian/Antananarivo\r
ZVA,Miandrivazo,Indian/Antananarivo\r
SMS,Sainte Marie,Indian/Antananarivo\r
TMM,Toamasina,Indian/Antananarivo\r
MOQ,Morondava,Indian/Antananarivo\r
DIE,Antsiranana,Indian/Antananarivo\r
WMR,Mananara,Indian/Antananarivo\r
ZWA,Andapa,Indian/Antananarivo\r
AMB,Ambilobe,Indian/Antananarivo\r
ANM,Antalaha,Indian/Antananarivo\r
HVA,Analalava,Indian/Antananarivo\r
MJN,Mahajanga,Indian/Antananarivo\r
NOS,Nosy-be,Indian/Antananarivo\r
BPY,Besalampy,Indian/Antananarivo\r
WMN,Maroantsetra,Indian/Antananarivo\r
SVB,Sambava,Indian/Antananarivo\r
VOH,Vohemar,Indian/Antananarivo\r
WAI,Antsohihy,Indian/Antananarivo\r
IVA,Ampampamena,Indian/Antananarivo\r
FTU,Tolagnaro,Indian/Antananarivo\r
WFI,Fianarantsoa,Indian/Antananarivo\r
RVA,Farafangana,Indian/Antananarivo\r
WVK,Manakara,Indian/Antananarivo\r
MNJ,Mananjary,Indian/Antananarivo\r
MXM,Morombe,Indian/Antananarivo\r
TLE,Toliara,Indian/Antananarivo\r
SSY,M'banza-congo,Africa/Luanda\r
BUG,Benguela,Africa/Luanda\r
CAB,Cabinda,Africa/Luanda\r
NOV,Huambo,Africa/Luanda\r
SVP,Kuito,Africa/Luanda\r
LAD,Luanda,Africa/Luanda\r
MEG,Malanje,Africa/Luanda\r
SPP,Menongue,Africa/Luanda\r
GXG,Negage,Africa/Luanda\r
PBN,Porto Amboim,Africa/Luanda\r
VHC,Saurimo,Africa/Luanda\r
SZA,Soyo,Africa/Luanda\r
SDD,Lubango,Africa/Luanda\r
LUO,Luena,Africa/Luanda\r
UGO,Uige,Africa/Luanda\r
XGN,Xangongo,Africa/Luanda\r
OYE,Oyem,Africa/Libreville\r
OKN,Okondja,Africa/Libreville\r
LBQ,Lambarene,Africa/Libreville\r
BMM,Bitam,Africa/Libreville\r
POG,Port Gentil,Africa/Libreville\r
OMB,Omboue Hospial,Africa/Libreville\r
MKU,Makokou,Africa/Libreville\r
LBV,Libreville,Africa/Libreville\r
MVB,Franceville,Africa/Libreville\r
PCP,Principe,Africa/Sao_Tome\r
TMS,Sao Tome,Africa/Sao_Tome\r
BEW,Beira,Africa/Maputo\r
INH,Inhambane,Africa/Maputo\r
VXC,Lichinga,Africa/Maputo\r
LFB,Lumbo,Africa/Maputo\r
MPM,Maputo,Africa/Maputo\r
MUD,Mueda,Africa/Maputo\r
MZB,Mocimboa Da Praia,Africa/Maputo\r
MNC,Nacala,Africa/Maputo\r
APL,Nampula,Africa/Maputo\r
POL,Pemba,Africa/Maputo\r
UEL,Quelimane,Africa/Maputo\r
TET,Tete,Africa/Maputo\r
VNX,Vilankulu,Africa/Maputo\r
DES,Desroches,Indian/Mahe\r
SEZ,Mahe,Indian/Mahe\r
PRI,Praslin,Indian/Mahe\r
AEH,Abeche,Africa/Ndjamena\r
MQQ,Moundou,Africa/Ndjamena\r
NDJ,N'djamena,Africa/Ndjamena\r
FYT,Faya-largeau,Africa/Ndjamena\r
BUQ,Bulawayo,Africa/Harare\r
BFO,Chiredzi,Africa/Harare\r
VFA,Victoria Falls,Africa/Harare\r
HRE,Harare,Africa/Harare\r
KAB,Kariba,Africa/Harare\r
UTA,Mutare,Africa/Harare\r
MVZ,Masvingo,Africa/Harare\r
GWE,Gwert,Africa/Harare\r
HWN,Hwange National Park,Africa/Harare\r
BLZ,Blantyre,Africa/Blantyre\r
KGJ,Karonga,Africa/Blantyre\r
KBQ,Kasungu,Africa/Blantyre\r
LLW,Lilongwe,Africa/Blantyre\r
ZZU,Mzuzu,Africa/Blantyre\r
MSU,Maseru,Africa/Maseru\r
FIH,Kinshasa,Africa/Kinshasa\r
NLO,Kinshasa,Africa/Kinshasa\r
MNB,Muanda,Africa/Kinshasa\r
FDU,Bandoundu,Africa/Kinshasa\r
KKW,Kikwit,Africa/Kinshasa\r
MDK,Mbandaka,Africa/Kinshasa\r
BDT,Gbadolite,Africa/Kinshasa\r
GMA,Gemena,Africa/Kinshasa\r
KLI,Kotakoli,Africa/Kinshasa\r
LIQ,Lisala,Africa/Kinshasa\r
FKI,Kisangani,Africa/Lubumbashi\r
IRP,Isiro,Africa/Lubumbashi\r
BUX,Bunia,Africa/Lubumbashi\r
BZU,Buta Zega,Africa/Lubumbashi\r
BKY,Bukavu/kavumu,Africa/Lubumbashi\r
GOM,Goma,Africa/Lubumbashi\r
KND,Kindu,Africa/Lubumbashi\r
FBM,Lubumashi,Africa/Lubumbashi\r
KWZ,Kolwezi,Africa/Lubumbashi\r
FMI,Kalemie,Africa/Lubumbashi\r
KMN,Kamina Base,Africa/Lubumbashi\r
KGA,Kananga,Africa/Lubumbashi\r
MJM,Mbuji-mayi,Africa/Lubumbashi\r
BKO,Bamako,Africa/Bamako\r
GAQ,Gao,Africa/Bamako\r
KYS,Kayes,Africa/Bamako\r
MZI,Mopti,Africa/Bamako\r
TOM,Tombouctou,Africa/Bamako\r
BJL,Banjul,Africa/Banjul\r
FUE,Fuerteventura,Atlantic/Canary\r
VDE,Hierro,Atlantic/Canary\r
SPC,Santa Cruz De La Palma,Atlantic/Canary\r
LPA,Gran Canaria,Atlantic/Canary\r
ACE,Arrecife,Atlantic/Canary\r
TFS,Tenerife,Atlantic/Canary\r
TFN,Tenerife,Atlantic/Canary\r
MLN,Melilla,Africa/Ceuta\r
FNA,Freetown,Africa/Freetown\r
MLW,Monrovia,Africa/Monrovia\r
ROB,Monrovia,Africa/Monrovia\r
AGA,Agadir,Africa/Casablanca\r
TTA,Tan Tan,Africa/Casablanca\r
FEZ,Fes,Africa/Casablanca\r
ERH,Er-rachidia,Africa/Casablanca\r
MEK,Meknes,Africa/Casablanca\r
OUD,Oujda,Africa/Casablanca\r
GMD,Ben Slimane,Africa/Casablanca\r
RBA,Rabat,Africa/Casablanca\r
CMN,Casablanca,Africa/Casablanca\r
RAK,Marrakech,Africa/Casablanca\r
NNA,Kentira,Africa/Casablanca\r
OZZ,Ouarzazate,Africa/Casablanca\r
AHU,Al Hociema,Africa/Casablanca\r
TTU,Tetouan,Africa/Casablanca\r
TNG,Tanger,Africa/Casablanca\r
ZIG,Ziguinchor,Africa/Dakar\r
CSK,Cap Skiring,Africa/Dakar\r
KLC,Kaolack,Africa/Dakar\r
DKR,Dakar,Africa/Dakar\r
XLS,St. Louis,Africa/Dakar\r
BXE,Bakel,Africa/Dakar\r
KGG,Kedougou,Africa/Dakar\r
TUD,Tambacounda,Africa/Dakar\r
AEO,Aioun El Atrouss,Africa/Nouakchott\r
TIY,Tidjikja,Africa/Nouakchott\r
KFA,Kiffa,Africa/Nouakchott\r
EMN,Nema,Africa/Nouakchott\r
KED,Kaedi,Africa/Nouakchott\r
NKC,Nouakschott,Africa/Nouakchott\r
SEY,Selibabi,Africa/Nouakchott\r
ATR,Atar,Africa/Nouakchott\r
NDB,Nouadhibou,Africa/Nouakchott\r
FIG,Fira,Africa/Conakry\r
FAA,Faranah,Africa/Conakry\r
LEK,Labe,Africa/Conakry\r
SID,Amilcar Cabral,Atlantic/Cape_Verde\r
BVC,Boa Vista,Atlantic/Cape_Verde\r
MMO,Maio,Atlantic/Cape_Verde\r
SNE,Sao Nocolau Island,Atlantic/Cape_Verde\r
VXE,Sao Vicente Island,Atlantic/Cape_Verde\r
ADD,Addis Ababa,Africa/Addis_Ababa\r
AMH,Arba Minch,Africa/Addis_Ababa\r
AXU,Axum,Africa/Addis_Ababa\r
BJR,Bahar Dar,Africa/Addis_Ababa\r
DIR,Dire Dawa,Africa/Addis_Ababa\r
GMB,Gambella,Africa/Addis_Ababa\r
GDQ,Gondar,Africa/Addis_Ababa\r
JIM,Jimma,Africa/Addis_Ababa\r
LLI,Lalibella,Africa/Addis_Ababa\r
MQX,Makale,Africa/Addis_Ababa\r
ASO,Asosa,Africa/Addis_Ababa\r
BJM,Bujumbura,Africa/Bujumbura\r
HGA,Hargeisa,Africa/Mogadishu\r
BBO,Berbera,Africa/Mogadishu\r
KMU,Kismayu,Africa/Mogadishu\r
ALY,Alexandria,Africa/Cairo\r
ABS,Abu Simbel,Africa/Cairo\r
CAI,Cairo,Africa/Cairo\r
CWE,Cairo,Africa/Cairo\r
HRG,Hurghada,Africa/Cairo\r
EGH,El Gorah,Africa/Cairo\r
LXR,Luxor,Africa/Cairo\r
MUH,Mersa-matruh,Africa/Cairo\r
PSD,Port Said,Africa/Cairo\r
SKV,St. Catherine,Africa/Cairo\r
ASW,Aswan,Africa/Cairo\r
ELT,El-tor,Africa/Cairo\r
EDL,Eldoret,Africa/Nairobi\r
GGM,Kakamega,Africa/Nairobi\r
KIS,Kisumu,Africa/Nairobi\r
KTL,Kitale,Africa/Nairobi\r
LOK,Lodwar,Africa/Nairobi\r
LAU,Lamu,Africa/Nairobi\r
MBA,Mombasa,Africa/Nairobi\r
WIL,Nairobi,Africa/Nairobi\r
WJR,Wajir,Africa/Nairobi\r
GHT,Ghat,Africa/Tripoli\r
AKF,Kufra,Africa/Tripoli\r
BEN,Benghazi,Africa/Tripoli\r
SEB,Sebha,Africa/Tripoli\r
TIP,Tripoli,Africa/Tripoli\r
LMQ,Marsa Brega,Africa/Tripoli\r
HUQ,Hon,Africa/Tripoli\r
LTD,Ghadames,Africa/Tripoli\r
GYI,Gisenyi,Africa/Kigali\r
KGL,Kigali,Africa/Kigali\r
KME,Kamembe,Africa/Kigali\r
DOG,Dongola,Africa/Khartoum\r
RSS,Damazin,Africa/Khartoum\r
ELF,El Fasher,Africa/Khartoum\r
KSL,Kassala,Africa/Khartoum\r
KDX,Kadugli,Africa/Khartoum\r
EBD,El Obeid,Africa/Khartoum\r
JUB,Juba,Africa/Juba\r
MAK,Malakal,Africa/Juba\r
KRT,Khartoum,Africa/Khartoum\r
ARK,Arusha,Africa/Dar_es_Salaam\r
DAR,Dar Es Salaam,Africa/Dar_es_Salaam\r
DOD,Dodoma,Africa/Dar_es_Salaam\r
IRI,Iringa,Africa/Dar_es_Salaam\r
JRO,Kilimanjaro,Africa/Dar_es_Salaam\r
LKY,Lake Manyara,Africa/Dar_es_Salaam\r
MYW,Mtwara,Africa/Dar_es_Salaam\r
MWZ,Mwanza,Africa/Dar_es_Salaam\r
PMA,Pemba,Africa/Dar_es_Salaam\r
TGT,Tanga,Africa/Dar_es_Salaam\r
ZNZ,Zanzibar,Africa/Dar_es_Salaam\r
EBB,Entebbe,Africa/Kampala\r
SRT,Soroti,Africa/Kampala\r
TIA,Tirana,Europe/Tirane\r
BOJ,Bourgas,Europe/Sofia\r
GOZ,Gorna Orechovica,Europe/Sofia\r
PDV,Plovdiv,Europe/Sofia\r
SOF,Sofia,Europe/Sofia\r
SZR,Stara Zagora,Europe/Sofia\r
VAR,Varna,Europe/Sofia\r
LCA,Larnaca,Asia/Nicosia\r
PFO,Paphos,Asia/Nicosia\r
AKT,Akrotiri,Asia/Nicosia\r
DBV,Dubrovnik,Europe/Zagreb\r
OSI,Osijek,Europe/Zagreb\r
PUY,Pula,Europe/Zagreb\r
RJK,Rijeka,Europe/Zagreb\r
SPU,Split,Europe/Zagreb\r
ZAG,Zagreb,Europe/Zagreb\r
ZAD,Zadar,Europe/Zagreb\r
ABC,Albacete,Europe/Madrid\r
ALC,Alicante,Europe/Madrid\r
LEI,Almeria,Europe/Madrid\r
OVD,Aviles,Europe/Madrid\r
ODB,Cordoba,Europe/Madrid\r
BIO,Bilbao,Europe/Madrid\r
BCN,Barcelona,Europe/Madrid\r
BJZ,Badajoz,Europe/Madrid\r
LCG,La Coruna,Europe/Madrid\r
GRO,Gerona,Europe/Madrid\r
GRX,Granada,Europe/Madrid\r
IBZ,Ibiza,Europe/Madrid\r
XRY,Jerez,Europe/Madrid\r
MJV,Murcia,Europe/Madrid\r
MAD,Madrid,Europe/Madrid\r
AGP,Malaga,Europe/Madrid\r
MAH,Menorca,Europe/Madrid\r
OZP,Sevilla,Europe/Madrid\r
PNA,Pamplona,Europe/Madrid\r
REU,Reus,Europe/Madrid\r
ROZ,Rota,Europe/Madrid\r
SLM,Salamanca,Europe/Madrid\r
EAS,San Sebastian,Europe/Madrid\r
SCQ,Santiago,Europe/Madrid\r
LEU,Seo De Urgel,Europe/Madrid\r
TOJ,Madrid,Europe/Madrid\r
VLC,Valencia,Europe/Madrid\r
VLL,Valladolid,Europe/Madrid\r
VIT,Vitoria,Europe/Madrid\r
VGO,Vigo,Europe/Madrid\r
SDR,Santander,Europe/Madrid\r
ZAZ,Zaragoza,Europe/Madrid\r
SVQ,Sevilla,Europe/Madrid\r
CQF,Calais,Europe/Paris\r
BYF,Albert,Europe/Paris\r
LTQ,Le Tourquet,Europe/Paris\r
XVS,Valenciennes,Europe/Paris\r
AGF,Agen,Europe/Paris\r
BOD,Bordeaux,Europe/Paris\r
EGC,Bergerac,Europe/Paris\r
CNG,Cognac,Europe/Paris\r
PIS,Poitiers,Europe/Paris\r
MCU,Montlucon-gueret,Europe/Paris\r
LIG,Limoges,Europe/Paris\r
NIT,Niort,Europe/Paris\r
TLS,Toulouse,Europe/Paris\r
PUF,Pau,Europe/Paris\r
LDE,Tarbes,Europe/Paris\r
ANG,Angouleme,Europe/Paris\r
BVE,Brive,Europe/Paris\r
PGX,Perigueux,Europe/Paris\r
BIQ,Biarritz-bayonne,Europe/Paris\r
ZAO,Cahors,Europe/Paris\r
LBI,Albi,Europe/Paris\r
DCM,Castres,Europe/Paris\r
RDZ,Rodez,Europe/Paris\r
RYN,Royan,Europe/Paris\r
XMW,Montauban,Europe/Paris\r
RCO,Rochefort,Europe/Paris\r
CMR,Colmar,Europe/Paris\r
DLE,Dole,Europe/Paris\r
OBS,Aubenas-vals-lanas,Europe/Paris\r
LPY,Le Puy,Europe/Paris\r
ETZ,Metz,Europe/Paris\r
BIA,Bastia,Europe/Paris\r
CLY,Calvi,Europe/Paris\r
FSC,Figari,Europe/Paris\r
AJA,Ajaccio,Europe/Paris\r
PRP,Propriano,Europe/Paris\r
SOZ,Solenzara,Europe/Paris\r
AUF,Auxerre,Europe/Paris\r
CMF,Chambery,Europe/Paris\r
CFE,Clermont-Ferrand,Europe/Paris\r
BOU,Bourges,Europe/Paris\r
QNJ,Annemasse,Europe/Paris\r
LYS,Lyon,Europe/Paris\r
SYT,St.-yan,Europe/Paris\r
RNE,Roanne,Europe/Paris\r
NCY,Annecy,Europe/Paris\r
GNB,Grenoble,Europe/Paris\r
VAF,Valence,Europe/Paris\r
VHY,Vichy,Europe/Paris\r
AUR,Aurillac,Europe/Paris\r
CHR,Chateauroux,Europe/Paris\r
LYN,Lyon,Europe/Paris\r
CEQ,Cannes,Europe/Paris\r
EBU,St-Etienne,Europe/Paris\r
CCF,Carcassonne,Europe/Paris\r
MRS,Marseille,Europe/Paris\r
NCE,Nice,Europe/Paris\r
XOG,Orange,Europe/Paris\r
PGF,Perpignan,Europe/Paris\r
CTT,Le Castellet,Europe/Paris\r
MPL,Montpellier,Europe/Paris\r
BZR,Beziers,Europe/Paris\r
AVN,Avignon,Europe/Paris\r
MEN,Mende,Europe/Paris\r
BVA,Beauvais,Europe/Paris\r
EVX,Evreux,Europe/Paris\r
LEH,Le Havre,Europe/Paris\r
XAB,Abbeville,Europe/Paris\r
ORE,Orleans,Europe/Paris\r
XCR,Chalons,Europe/Paris\r
URO,Rouen,Europe/Paris\r
TUF,Tours,Europe/Paris\r
CET,Cholet,Europe/Paris\r
LVA,Laval,Europe/Paris\r
LBG,Paris,Europe/Paris\r
CSF,Creil,Europe/Paris\r
CDG,Paris,Europe/Paris\r
TNF,Toussous-le-noble,Europe/Paris\r
ORY,Paris,Europe/Paris\r
POX,Pontoise,Europe/Paris\r
VIY,Villacoublay,Europe/Paris\r
NVS,Nevers,Europe/Paris\r
XME,Maubeuge,Europe/Paris\r
LIL,Lille,Europe/Paris\r
HZB,Merville,Europe/Paris\r
XCZ,Charleville,Europe/Paris\r
BES,Brest,Europe/Paris\r
CER,Cherbourg,Europe/Paris\r
DNR,Dinard,Europe/Paris\r
LBY,La Baule,Europe/Paris\r
GFR,Granville,Europe/Paris\r
DOL,Deauville,Europe/Paris\r
LRT,Lorient,Europe/Paris\r
EDM,La Roche-sur-yon,Europe/Paris\r
LDV,Landivisiau,Europe/Paris\r
CFR,Caen,Europe/Paris\r
LME,Le Mans,Europe/Paris\r
RNS,Rennes,Europe/Paris\r
LAI,Lannion,Europe/Paris\r
UIP,Quimper,Europe/Paris\r
NTE,Nantes,Europe/Paris\r
SBK,St.-brieuc Armor,Europe/Paris\r
MXN,Morlaix,Europe/Paris\r
VNE,Vannes,Europe/Paris\r
SNR,St.-nazaire,Europe/Paris\r
BSL,Mulhouse,Europe/Paris\r
DIJ,Dijon,Europe/Paris\r
MZM,Metz,Europe/Paris\r
EPL,Epinal,Europe/Paris\r
ENC,Nancy,Europe/Paris\r
RHE,Reims,Europe/Paris\r
SXB,Strasbourg,Europe/Paris\r
TLN,Hyeres,Europe/Paris\r
FNI,Nimes,Europe/Paris\r
MQC,Miquelon,America/Miquelon\r
FSP,St.-pierre,America/Miquelon\r
PYR,Andravida,Europe/Athens\r
AGQ,Agrinion,Europe/Athens\r
AXD,Alexandroupolis,Europe/Athens\r
VOL,Nea Anghialos,Europe/Athens\r
JKH,Chios,Europe/Athens\r
IOA,Ioannina,Europe/Athens\r
HER,Heraklion,Europe/Athens\r
KSO,Kastoria,Europe/Athens\r
KIT,Kithira,Europe/Athens\r
EFL,Keffallinia,Europe/Athens\r
KLX,Kalamata,Europe/Athens\r
KGS,Kos,Europe/Athens\r
AOK,Karpathos,Europe/Athens\r
CFU,Kerkyra/corfu,Europe/Athens\r
KSJ,Kasos,Europe/Athens\r
KVA,Kavala,Europe/Athens\r
KZI,Kozani,Europe/Athens\r
LRS,Leros,Europe/Athens\r
LXS,Limnos,Europe/Athens\r
LRA,Larissa,Europe/Athens\r
JMK,Mykonos,Europe/Athens\r
MJT,Mytilini,Europe/Athens\r
PVK,Preveza,Europe/Athens\r
RHO,Rhodos,Europe/Athens\r
GPA,Patras,Europe/Athens\r
CHQ,Chania,Europe/Athens\r
JSI,Skiathos,Europe/Athens\r
SMI,Samos,Europe/Athens\r
SPJ,Sparti,Europe/Athens\r
JTR,Thira,Europe/Athens\r
JSH,Sitia,Europe/Athens\r
SKU,Skiros,Europe/Athens\r
SKG,Thessaloniki,Europe/Athens\r
ZTH,Zakynthos,Europe/Athens\r
BUD,Budapest,Europe/Budapest\r
DEB,Debrecen,Europe/Budapest\r
CRV,Crotone,Europe/Rome\r
BRI,Bari,Europe/Rome\r
FOG,Foggia,Europe/Rome\r
TAR,Grottaglie,Europe/Rome\r
LCC,Lecce,Europe/Rome\r
PSR,Pescara,Europe/Rome\r
BDS,Brindisi,Europe/Rome\r
SUF,Lamezia,Europe/Rome\r
CTA,Catania,Europe/Rome\r
LMP,Lampedusa,Europe/Rome\r
PNL,Pantelleria,Europe/Rome\r
PMO,Palermo,Europe/Rome\r
REG,Reggio Calabria,Europe/Rome\r
TPS,Trapani,Europe/Rome\r
NSY,Sigonella,Europe/Rome\r
AHO,Alghero,Europe/Rome\r
DCI,Decimomannu,Europe/Rome\r
CAG,Cagliari,Europe/Rome\r
OLB,Olbia,Europe/Rome\r
TTB,Tortoli,Europe/Rome\r
MXP,Milano,Europe/Rome\r
BGY,Bergamo,Europe/Rome\r
TRN,Torino,Europe/Rome\r
ALL,Albenga,Europe/Rome\r
GOA,Genoa,Europe/Rome\r
LIN,Milan,Europe/Rome\r
PMF,Parma,Europe/Rome\r
CUF,Cuneo,Europe/Rome\r
AVB,Aviano,Europe/Rome\r
BZO,Bolzano,Europe/Rome\r
BLQ,Bologna,Europe/Rome\r
TSF,Treviso,Europe/Rome\r
FRL,Forli,Europe/Rome\r
VBS,Brescia,Europe/Rome\r
TRS,Ronchi De Legionari,Europe/Rome\r
RMI,Rimini,Europe/Rome\r
VIC,Vicenza,Europe/Rome\r
QPA,Padova,Europe/Rome\r
VRN,Villafranca,Europe/Rome\r
VCE,Venice,Europe/Rome\r
SAY,Siena,Europe/Rome\r
CIA,Rome,Europe/Rome\r
FCO,Rome,Europe/Rome\r
EBA,Marina Di Campo,Europe/Rome\r
QLT,Latina,Europe/Rome\r
NAP,Naples,Europe/Rome\r
PSA,Pisa,Europe/Rome\r
FLR,Florence,Europe/Rome\r
GRS,Grosseto,Europe/Rome\r
PEG,Perugia,Europe/Rome\r
LJU,Ljubljana,Europe/Ljubljana\r
MBX,Maribor,Europe/Ljubljana\r
POW,Portoroz,Europe/Ljubljana\r
UHE,Kunovice,Europe/Prague\r
KLV,Karlovy Vary,Europe/Prague\r
OSR,Ostrava,Europe/Prague\r
PED,Pardubice,Europe/Prague\r
PRV,Prerov,Europe/Prague\r
PRG,Prague,Europe/Prague\r
BRQ,Brno,Europe/Prague\r
VOD,Vodochody,Europe/Prague\r
TLV,Tel-aviv,Asia/Jerusalem\r
BEV,Beer-sheba,Asia/Jerusalem\r
ETH,Elat,Asia/Jerusalem\r
EIY,Eyn-yahav,Asia/Jerusalem\r
HFA,Haifa,Asia/Jerusalem\r
RPN,Rosh Pina,Asia/Jerusalem\r
MTZ,Metzada,Asia/Jerusalem\r
VTM,Nevatim,Asia/Jerusalem\r
VDA,Ovda,Asia/Jerusalem\r
MIP,Ramon,Asia/Jerusalem\r
SDV,Tel-aviv,Asia/Jerusalem\r
MLA,Malta,Europe/Malta\r
GRZ,Graz,Europe/Vienna\r
INN,Innsbruck,Europe/Vienna\r
LNZ,Linz,Europe/Vienna\r
SZG,Salzburg,Europe/Vienna\r
VIE,Vienna,Europe/Vienna\r
AVR,Alverca,Europe/Lisbon\r
SMA,Santa Maria (island),Atlantic/Azores\r
BGC,Braganca,Europe/Lisbon\r
BYJ,Beja (madeira),Europe/Lisbon\r
BGZ,Braga,Europe/Lisbon\r
CAT,Cascais,Europe/Lisbon\r
FLW,Flores,Atlantic/Azores\r
FAO,Faro,Europe/Lisbon\r
GRW,Graciosa Island,Atlantic/Azores\r
HOR,Horta,Atlantic/Azores\r
TER,Lajes (terceira Island),Atlantic/Azores\r
QLR,Monte Real,Europe/Lisbon\r
PDL,Ponta Delgada,Atlantic/Azores\r
PIX,Pico,Atlantic/Azores\r
PRM,Portimao,Europe/Lisbon\r
OPO,Porto,Europe/Lisbon\r
PXO,Porto Santo,Atlantic/Madeira\r
LIS,Lisbon,Europe/Lisbon\r
SJZ,Sao Jorge Island,Atlantic/Azores\r
VRL,Vila Real,Europe/Lisbon\r
VSE,Viseu,Europe/Lisbon\r
OMO,Mostar,Europe/Sarajevo\r
SJJ,Sarajevo,Europe/Sarajevo\r
ARW,Arad,Europe/Bucharest\r
BCM,Bacau,Europe/Bucharest\r
BAY,Baia Mare,Europe/Bucharest\r
BBU,Bucharest,Europe/Bucharest\r
CND,Constanta,Europe/Bucharest\r
CLJ,Cluj-napoca,Europe/Bucharest\r
CSB,Caransebes,Europe/Bucharest\r
CRA,Craiova,Europe/Bucharest\r
IAS,Iasi,Europe/Bucharest\r
OMR,Oradea,Europe/Bucharest\r
OTP,Bucharest,Europe/Bucharest\r
SBZ,Sibiu,Europe/Bucharest\r
SUJ,Satu Mare,Europe/Bucharest\r
SCV,Suceava,Europe/Bucharest\r
TCE,Tulcea,Europe/Bucharest\r
TGM,Tirgu Mures,Europe/Bucharest\r
TSR,Timisoara,Europe/Bucharest\r
GVA,Geneva,Europe/Zurich\r
SIR,Sion,Europe/Zurich\r
EML,Emmen,Europe/Zurich\r
LUG,Lugano,Europe/Zurich\r
BRN,Bern,Europe/Zurich\r
ZHI,Grenchen,Europe/Zurich\r
ZRH,Zurich,Europe/Zurich\r
ACH,Altenrhein,Europe/Zurich\r
SMV,Samedan,Europe/Zurich\r
ESB,Ankara,Europe/Istanbul\r
ANK,Ankara,Europe/Istanbul\r
ADA,Adana,Europe/Istanbul\r
UAB,Adana,Europe/Istanbul\r
AFY,Afyon,Europe/Istanbul\r
AYT,Antalya,Europe/Istanbul\r
GZT,Gaziantep,Europe/Istanbul\r
KYA,Konya,Europe/Istanbul\r
MZH,Merzifon,Europe/Istanbul\r
VAS,Sivas,Europe/Istanbul\r
MLX,Malatya,Europe/Istanbul\r
ASR,Kayseri,Europe/Istanbul\r
TJK,Tokat,Europe/Istanbul\r
DNZ,Denizli,Europe/Istanbul\r
ISL,Istanbul,Europe/Istanbul\r
BZI,Balikesir,Europe/Istanbul\r
BDM,Bandirma,Europe/Istanbul\r
ESK,Eskisehir,Europe/Istanbul\r
ADB,Izmir,Europe/Istanbul\r
IGL,Izmir,Europe/Istanbul\r
KCO,Topel,Europe/Istanbul\r
DLM,Dalaman,Europe/Istanbul\r
BXN,Bodrum,Europe/Istanbul\r
EZS,Elazig,Europe/Istanbul\r
DIY,Diyabakir,Europe/Istanbul\r
ERC,Erzincan,Europe/Istanbul\r
ERZ,Erzurum,Europe/Istanbul\r
TZX,Trabzon,Europe/Istanbul\r
VAN,Van,Europe/Istanbul\r
BAL,Batman,Europe/Istanbul\r
SXZ,Siirt,Europe/Istanbul\r
BZY,Saltsy,Europe/Chisinau\r
KIV,Chisinau,Europe/Chisinau\r
OHD,Ohrid,Europe/Skopje\r
SKP,Skopje,Europe/Skopje\r
GIB,Gibraltar,Europe/Gibraltar\r
BEG,Belgrade,Europe/Belgrade\r
INI,Nis,Europe/Belgrade\r
TGD,Podgorica,Europe/Podgorica\r
PRN,Pristina,Europe/Belgrade\r
TIV,Tivat,Europe/Podgorica\r
BTS,Bratislava,Europe/Bratislava\r
KSC,Kosice,Europe/Bratislava\r
PZY,Piestany,Europe/Bratislava\r
SLD,Sliac,Europe/Bratislava\r
TAT,Poprad,Europe/Bratislava\r
NCA,North Caicos,America/Grand_Turk\r
PLS,Providenciales,America/Grand_Turk\r
XSC,South Caicos,America/Grand_Turk\r
BRX,Barahona,America/Santo_Domingo\r
CBJ,Cabo Rojo,America/Santo_Domingo\r
LRM,La Romana,America/Santo_Domingo\r
PUJ,Punta Cana,America/Santo_Domingo\r
POP,Puerto Plata,America/Santo_Domingo\r
SDQ,Santo Domingo,America/Santo_Domingo\r
STI,Santiago,America/Santo_Domingo\r
CBV,Coban,America/Guatemala\r
GUA,Guatemala City,America/Guatemala\r
RER,Retalhuleu,America/Guatemala\r
GSJ,San Jose,America/Guatemala\r
LCE,La Ceiba,America/Tegucigalpa\r
SAP,San Pedro Sula,America/Tegucigalpa\r
GJA,Guanaja,America/Tegucigalpa\r
RTB,Roatan,America/Tegucigalpa\r
TEA,Tela,America/Tegucigalpa\r
TGU,Tegucigalpa,America/Tegucigalpa\r
TJI,Trujillo,America/Tegucigalpa\r
OCJ,Ocho Rios,America/Jamaica\r
KIN,Kingston,America/Jamaica\r
MBJ,Montego Bay,America/Jamaica\r
POT,Port Antonio,America/Jamaica\r
KTP,Kingston,America/Jamaica\r
ACA,Acapulco,America/Mexico_City\r
NTR,Monterrey,America/Monterrey\r
AGU,Aguascalientes,America/Mexico_City\r
HUX,Huatulco,America/Mexico_City\r
CVJ,Cuernavaca,America/Mexico_City\r
ACN,Ciudad Acuna,America/Matamoros\r
CME,Ciudad Del Carmen,America/Merida\r
NCG,Nuevo Casas Grandes,America/Chihuahua\r
CUL,Culiacan,America/Mazatlan\r
CTM,Chetumal,America/Cancun\r
CEN,Ciudad Obregon,America/Hermosillo\r
CPE,Campeche,America/Merida\r
CJS,Ciudad Juarez,America/Ciudad_Juarez\r
CUU,Chihuahua,America/Chihuahua\r
CVM,Ciudad Victoria,America/Monterrey\r
CZM,Cozumel,America/Cancun\r
DGO,Durango,America/Monterrey\r
TPQ,Tepic,America/Mazatlan\r
ESE,Ensenada,America/Tijuana\r
GDL,Guadalajara,America/Mexico_City\r
GYM,Guaymas,America/Hermosillo\r
TCN,Tehuacan,America/Mexico_City\r
HMO,Hermosillo,America/Hermosillo\r
CLQ,Colima,America/Mexico_City\r
ISJ,Isla Mujeres,America/Cancun\r
SLW,Saltillo,America/Monterrey\r
IZT,Iztepec,America/Mexico_City\r
LZC,Lazard Cardenas,America/Mexico_City\r
LMM,Los Mochis,America/Mazatlan\r
BJX,Del Bajio,America/Mexico_City\r
LAP,La Paz,America/Mazatlan\r
LTO,Loreto,America/Mazatlan\r
MAM,Matamoros,America/Matamoros\r
MID,Merida,America/Merida\r
MXL,Mexicali,America/Tijuana\r
MLM,Morelia,America/Mexico_City\r
MTT,Minatitlan,America/Mexico_City\r
LOV,Monclova,America/Monterrey\r
MEX,Mexico City,America/Mexico_City\r
MTY,Monterrey,America/Monterrey\r
MZT,Mazatlan,America/Mazatlan\r
NOG,Nogales,America/Hermosillo\r
NLD,Nuevo Laredo,America/Matamoros\r
OAX,Oaxaca,America/Mexico_City\r
PAZ,Poza Rico,America/Mexico_City\r
PBC,Puebla,America/Mexico_City\r
PPE,Punta Penasco,America/Hermosillo\r
PDS,Piedras Negras,America/Matamoros\r
UPN,Uruapan,America/Mexico_City\r
PVR,Puerto Vallarta,America/Mexico_City\r
PXM,Puerto Escondido,America/Mexico_City\r
QRO,Queretaro,America/Mexico_City\r
REX,Reynosa,America/Matamoros\r
SJD,San Jose Del Cabo,America/Mazatlan\r
SFH,San Filipe,America/Tijuana\r
SLP,San Luis Potosi,America/Mexico_City\r
TRC,Torreon,America/Monterrey\r
TGZ,Tuxtla Gutierrez,America/Mexico_City\r
TIJ,Tijuana,America/Tijuana\r
TAM,Tampico,America/Monterrey\r
TSL,Tamuin,America/Mexico_City\r
TLC,Toluca,America/Mexico_City\r
TAP,Tapachula,America/Mexico_City\r
CUN,Cancun,America/Cancun\r
VSA,Villahermosa,America/Mexico_City\r
VER,Vera Cruz,America/Mexico_City\r
ZCL,Zacatecas,America/Mexico_City\r
ZIH,Zihuatanejo,America/Mexico_City\r
ZMM,Zamora,America/Mexico_City\r
ZLO,Manzanillo,America/Mexico_City\r
BEF,Bluefields,America/Managua\r
MGA,Managua,America/Managua\r
PUZ,Puerto Cabezas,America/Managua\r
BOC,Bocas Del Toro,America/Panama\r
CHX,Changuinola,America/Panama\r
DAV,David,America/Panama\r
BLB,Howard,America/Panama\r
PAC,Panama,America/Panama\r
SYP,Santiago,America/Panama\r
PTY,Panama City,America/Panama\r
BAI,Buenos Aires,America/Costa_Rica\r
OTR,Coto 47,America/Costa_Rica\r
JAP,Chacarita,America/Costa_Rica\r
GLF,Golfito,America/Costa_Rica\r
GPL,Guapiles,America/Costa_Rica\r
LIR,Liberia,America/Costa_Rica\r
LSL,Los Chiles,America/Costa_Rica\r
LIO,Limon,America/Costa_Rica\r
NOB,Nosara Beach,America/Costa_Rica\r
SJO,San Jose,America/Costa_Rica\r
PMZ,Palmar Sur,America/Costa_Rica\r
XQP,Quepos,America/Costa_Rica\r
TOO,San Vito De Jaba,America/Costa_Rica\r
SAL,San Salvador,America/El_Salvador\r
CYA,Cayes,America/Port-au-Prince\r
CAP,Cap Haitien,America/Port-au-Prince\r
JAK,Jacmel,America/Port-au-Prince\r
PAP,Port-au-prince,America/Port-au-Prince\r
BCA,Baracoa Playa,America/Havana\r
BYM,Bayamo,America/Havana\r
AVI,Ciego De Avila,America/Havana\r
CCC,Cunagua,America/Havana\r
CFG,Cienfuegos,America/Havana\r
CYO,Cayo Largo del Sur,America/Havana\r
CMW,Camaguey,America/Havana\r
SCU,Santiago De Cuba,America/Havana\r
NBW,Guantanamo,America/New_York\r
GAO,Guantanamo,America/Havana\r
HAV,Havana,America/Havana\r
HOG,Holguin,America/Havana\r
LCL,La Coloma,America/Havana\r
MOA,Moa,America/Havana\r
MZO,Manzanillo,America/Havana\r
GER,Nueva Gerona,America/Havana\r
UPB,Baracoa Playa,America/Havana\r
QPD,Pinar Del Rio Norte,America/Havana\r
SNU,Santa Clara,America/Havana\r
SZJ,Siguanea,America/Havana\r
USS,Sancti Spiritus,America/Havana\r
VRA,Varadero,America/Havana\r
VTU,Las Tunas,America/Havana\r
CYB,Cayman Brac,America/Cayman\r
GCM,Georgetown,America/Cayman\r
MAY,Clarence Bain,America/Nassau\r
ASD,Andros Town,America/Nassau\r
MHH,Marsh Harbor,America/Nassau\r
SAQ,San Andros,America/Nassau\r
AXP,Spring Point,America/Nassau\r
TCB,Treasure Cay,America/Nassau\r
CCZ,Chub Cay,America/Nassau\r
GHC,Bullocks Harbour,America/Nassau\r
BIM,Alice Town,America/Nassau\r
GGT,Great Exuma,America/Nassau\r
ELH,North Eleuthera,America/Nassau\r
GHB,Governor's Harbor,America/Nassau\r
NMC,Norman's Cay,America/Nassau\r
RSD,Rock Sound,America/Nassau\r
TYM,Staniel Cay,America/Nassau\r
FPO,Freeport,America/Nassau\r
IGA,Matthew Town,America/Nassau\r
LGI,Dead Man's Cay,America/Nassau\r
SML,Stella Maris,America/Nassau\r
MYG,Mayaguana,America/Nassau\r
NAS,Nassau,America/Nassau\r
DCT,Duncan Town,America/Nassau\r
RCY,Port Nelson,America/Nassau\r
ZSA,Cockburn Town,America/Nassau\r
BZE,Belize City,America/Belize\r
AIT,Aitutaki,Pacific/Rarotonga\r
RAR,Avarua,Pacific/Rarotonga\r
NAN,Nandi,Pacific/Fiji\r
SUV,Nausori,Pacific/Fiji\r
TBU,Tongatapu,Pacific/Tongatapu\r
VAV,Vava'u,Pacific/Tongatapu\r
TRW,Tarawa,Pacific/Tarawa\r
TBF,Tabiteuea North,Pacific/Tarawa\r
WLS,Wallis,Pacific/Wallis\r
APW,Faleolo,Pacific/Apia\r
PPG,Pago Pago,Pacific/Pago_Pago\r
RUR,Rurutu,Pacific/Tahiti\r
TUB,Tubuai,Pacific/Tahiti\r
AAA,Anaa,Pacific/Tahiti\r
FGU,Fangatau,Pacific/Tahiti\r
TIH,Tikehau,Pacific/Tahiti\r
REA,Reao,Pacific/Tahiti\r
FAV,Fakarava,Pacific/Tahiti\r
XMH,Manihi,Pacific/Tahiti\r
GMR,Totegegie,Pacific/Gambier\r
KKR,Kaukura Atoll,Pacific/Tahiti\r
MKP,Makemo,Pacific/Tahiti\r
PKP,Puka Puka,Pacific/Tahiti\r
TKP,Takapoto,Pacific/Tahiti\r
AXR,Arutua,Pacific/Tahiti\r
MVT,Mataiva,Pacific/Tahiti\r
TKX,Takaroa,Pacific/Tahiti\r
NHV,Nuku Hiva,Pacific/Marquesas\r
BOB,Bora Bora,Pacific/Tahiti\r
RGI,Rangiroa,Pacific/Tahiti\r
HUH,Huahine Island,Pacific/Tahiti\r
MOZ,Moorea,Pacific/Tahiti\r
HOI,Hao Island,Pacific/Tahiti\r
MAU,Maupiti,Pacific/Tahiti\r
RFP,Raiatea Island,Pacific/Tahiti\r
VLI,Port-vila,Pacific/Efate\r
KNQ,Kone,Pacific/Noumea\r
KOC,Koumac,Pacific/Noumea\r
LIF,Lifou,Pacific/Noumea\r
GEA,Noumea,Pacific/Noumea\r
MEE,Mare,Pacific/Noumea\r
TOU,Touho,Pacific/Noumea\r
UVE,Ouvea,Pacific/Noumea\r
NOU,Noumea,Pacific/Noumea\r
AKL,Auckland,Pacific/Auckland\r
TUO,Taupo,Pacific/Auckland\r
AMZ,Ardmore,Pacific/Auckland\r
CHC,Christchurch,Pacific/Auckland\r
CHT,Chatham Island,Pacific/Chatham\r
DUD,Dunedin,Pacific/Auckland\r
GIS,Gisborne,Pacific/Auckland\r
GTN,Glentanner,Pacific/Auckland\r
HKK,Hokitika,Pacific/Auckland\r
HLZ,Hamilton,Pacific/Auckland\r
KKE,Kerikeri,Pacific/Auckland\r
KAT,Kaitaia,Pacific/Auckland\r
ALR,Alexandra,Pacific/Auckland\r
MON,Mount Cook,Pacific/Auckland\r
TEU,Manapouri,Pacific/Auckland\r
MRO,Masterton,Pacific/Auckland\r
NPL,New Plymouth,Pacific/Auckland\r
NSN,Nelson,Pacific/Auckland\r
IVC,Invercargill,Pacific/Auckland\r
OHA,Ohakea,Pacific/Auckland\r
OAM,Oamaru,Pacific/Auckland\r
PMR,Palmerston North,Pacific/Auckland\r
PPQ,Paraparaumu,Pacific/Auckland\r
ZQN,Queenstown International,Pacific/Auckland\r
ROT,Rotorua,Pacific/Auckland\r
TRG,Tauranga,Pacific/Auckland\r
TIU,Timaru,Pacific/Auckland\r
TWZ,Pukaki,Pacific/Auckland\r
BHE,Woodbourne,Pacific/Auckland\r
WKA,Wanaka,Pacific/Auckland\r
WHK,Whakatane,Pacific/Auckland\r
WLG,Wellington,Pacific/Auckland\r
WIR,Wairoa,Pacific/Auckland\r
WRE,Whangarei,Pacific/Auckland\r
WSZ,Westport,Pacific/Auckland\r
WAG,Wanganui,Pacific/Auckland\r
HEA,Herat,Asia/Kabul\r
JAA,Jalalabad,Asia/Kabul\r
KBL,Kabul,Asia/Kabul\r
KDH,Kandahar,Asia/Kabul\r
MMZ,Maimama,Asia/Kabul\r
MZR,Mazar-i-sharif,Asia/Kabul\r
OAH,Shindand,Asia/Kabul\r
UND,Kunduz,Asia/Kabul\r
BAH,Bahrain,Asia/Bahrain\r
AHB,Abha,Asia/Riyadh\r
HOF,Al-ahsa,Asia/Riyadh\r
ABT,El-baha,Asia/Riyadh\r
BHH,Bisha,Asia/Riyadh\r
DMM,Dammam,Asia/Riyadh\r
DHA,Dhahran,Asia/Riyadh\r
GIZ,Gizan,Asia/Riyadh\r
ELQ,Gassim,Asia/Riyadh\r
URY,Guriat,Asia/Riyadh\r
HAS,Hail,Asia/Riyadh\r
QJB,Jubail,Asia/Riyadh\r
JED,Jeddah,Asia/Riyadh\r
KMC,King Khalid Mil.city,Asia/Riyadh\r
MED,Madinah,Asia/Riyadh\r
EAM,Nejran,Asia/Riyadh\r
AQI,Hafr Al-batin,Asia/Riyadh\r
RAH,Rafha,Asia/Riyadh\r
RUH,Riyadh,Asia/Riyadh\r
RAE,Arar,Asia/Riyadh\r
SHW,Sharurah,Asia/Riyadh\r
SLF,Sulayel,Asia/Riyadh\r
TUU,Tabuk,Asia/Riyadh\r
TIF,Taif,Asia/Riyadh\r
TUI,Turaif,Asia/Riyadh\r
EJH,Wejh,Asia/Riyadh\r
YNB,Yenbo,Asia/Riyadh\r
ABD,Abadan,Asia/Tehran\r
DEF,Dezful,Asia/Tehran\r
AKW,Aghajari,Asia/Tehran\r
GCH,Gachsaran,Asia/Tehran\r
OMI,Omidyeh,Asia/Tehran\r
MRX,Bandar Mahshahr,Asia/Tehran\r
AWZ,Ahwaz,Asia/Tehran\r
AEU,Abumusa I.,Asia/Tehran\r
BUZ,Bushehr,Asia/Tehran\r
KIH,Kish Island,Asia/Tehran\r
BDH,Bandar Lengeh,Asia/Tehran\r
KHK,Khark Island,Asia/Tehran\r
SXI,Siri Island,Asia/Tehran\r
LVP,Lavan Island,Asia/Tehran\r
KSH,Bakhtaran,Asia/Tehran\r
SDG,Sanandaj,Asia/Tehran\r
IFH,Daran,Asia/Tehran\r
KKS,Kashan,Asia/Tehran\r
IFN,Esfahan,Asia/Tehran\r
RAS,Rasht,Asia/Tehran\r
AJK,Arak,Asia/Tehran\r
THR,Teheran,Asia/Tehran\r
GZW,Ghazvin,Asia/Tehran\r
BND,Bandar Abbas,Asia/Tehran\r
JYR,Jiroft,Asia/Tehran\r
KER,Kerman,Asia/Tehran\r
HDR,Bandar Abbas,Asia/Tehran\r
SYJ,Sirjan,Asia/Tehran\r
XBJ,Birjand,Asia/Tehran\r
CKT,Sarakhs,Asia/Tehran\r
RUD,Emam Shahr,Asia/Tehran\r
TCX,Tabas,Asia/Tehran\r
KLM,Kalaleh,Asia/Tehran\r
RZR,Ramsar,Asia/Tehran\r
FAZ,Fasa,Asia/Tehran\r
JAR,Jahrom,Asia/Tehran\r
LFM,Lamerd,Asia/Tehran\r
SYZ,Shiraz,Asia/Tehran\r
KHY,Khoy,Asia/Tehran\r
TBZ,Tabriz,Asia/Tehran\r
JWN,Zanjan,Asia/Tehran\r
AZD,Yazd,Asia/Tehran\r
ACZ,Zabol,Asia/Tehran\r
ZBR,Chah Bahar,Asia/Tehran\r
ZAH,Zahedan,Asia/Tehran\r
IHR,Iran Shahr,Asia/Tehran\r
AMM,Amman,Asia/Amman\r
ADJ,Amman,Asia/Amman\r
AQJ,Aqaba,Asia/Amman\r
OMF,Mafraq,Asia/Amman\r
KWI,Kuwait,Asia/Kuwait\r
BEY,Beirut,Asia/Beirut\r
KYE,Kleiat,Asia/Beirut\r
AUH,Abu Dhabi,Asia/Dubai\r
AZI,Abu Dhabi,Asia/Dubai\r
DHF,Abu Dhabi,Asia/Dubai\r
DXB,Dubai,Asia/Dubai\r
FJR,Fujeirah,Asia/Dubai\r
RKT,Ras Al Khaimah,Asia/Dubai\r
SHJ,Sharjah,Asia/Dubai\r
KHS,Khasab,Asia/Muscat\r
MSH,Masirah,Asia/Muscat\r
MCT,Muscat,Asia/Muscat\r
SLL,Salalah,Asia/Muscat\r
TTH,Thumrait,Asia/Muscat\r
BHW,Bhagtanwala,Asia/Karachi\r
LYP,Faisalabad,Asia/Karachi\r
GWD,Gwadar,Asia/Karachi\r
GIL,Gilgit,Asia/Karachi\r
JAG,Jacobsbad,Asia/Karachi\r
KHI,Karachi,Asia/Karachi\r
LHE,Lahore,Asia/Karachi\r
XJM,Mangla,Asia/Karachi\r
MFG,Muzaffarabad,Asia/Karachi\r
MWD,Mianwali,Asia/Karachi\r
MJD,Moenjodaro,Asia/Karachi\r
MUX,Multan,Asia/Karachi\r
WNS,Nawabshah,Asia/Karachi\r
PJG,Panjgur,Asia/Karachi\r
PSI,Pasni,Asia/Karachi\r
PEW,Peshawar,Asia/Karachi\r
UET,Quetta,Asia/Karachi\r
RYK,Rahim Yar Khan,Asia/Karachi\r
RAZ,Rawala Kot,Asia/Karachi\r
SKZ,Sukkur,Asia/Karachi\r
SDT,Saidu Sharif,Asia/Karachi\r
SUL,Sui,Asia/Karachi\r
BDN,Talhar,Asia/Karachi\r
WAF,Wana,Asia/Karachi\r
PZH,Zhob,Asia/Karachi\r
BSR,Basrah,Asia/Baghdad\r
ALP,Aleppo,Asia/Damascus\r
DAM,Damascus,Asia/Damascus\r
DEZ,Deire Zor,Asia/Damascus\r
LTK,Latakia,Asia/Damascus\r
PMS,Palmyra,Asia/Damascus\r
DIA,Doha,Asia/Qatar\r
CIS,Canton Island,Pacific/Kanton\r
ROP,Rota,Pacific/Saipan\r
SPN,Saipan,Pacific/Saipan\r
UAM,Andersen,Pacific/Guam\r
GUM,Agana,Pacific/Guam\r
TIQ,West Tinian,Pacific/Saipan\r
MAJ,Majuro,Pacific/Majuro\r
KWA,Kwajalein,Pacific/Kwajalein\r
CXI,Kiritimati,Pacific/Kiritimati\r
MDY,Midway,Pacific/Midway\r
TKK,Chuuk,Pacific/Chuuk\r
PNI,Pohnpei,Pacific/Pohnpei\r
ROR,Babelthuap,Pacific/Palau\r
KSA,Kosrae,Pacific/Kosrae\r
YAP,Yap,Pacific/Chuuk\r
KNH,Kinmen,Asia/Taipei\r
TTT,Fengnin,Asia/Taipei\r
GNI,Green Island,Asia/Taipei\r
KHH,Kaohsiung,Asia/Taipei\r
CYI,Chiayi,Asia/Taipei\r
KYD,Lanyu,Asia/Taipei\r
RMQ,Taichung,Asia/Taipei\r
TNN,Tainan,Asia/Taipei\r
HSZ,Hsinchu,Asia/Taipei\r
MZG,Makung,Asia/Taipei\r
PIF,Pingtung,Asia/Taipei\r
TSA,Taipei,Asia/Taipei\r
TPE,Taipei,Asia/Taipei\r
WOT,Wang An,Asia/Taipei\r
HUN,Hualien,Asia/Taipei\r
NRT,Tokyo,Asia/Tokyo\r
MMJ,Matsumoto,Asia/Tokyo\r
IBR,Ibaraki,Asia/Tokyo\r
MUS,Minami Tori Shima,Asia/Tokyo\r
IWO,Iwojima,Asia/Tokyo\r
SHM,Nanki-shirahama,Asia/Tokyo\r
OBO,Obihiro,Asia/Tokyo\r
CTS,Sapporo,Asia/Tokyo\r
HKD,Hakodate,Asia/Tokyo\r
MMB,Memanbetsu,Asia/Tokyo\r
SHB,Nakashibetsu,Asia/Tokyo\r
WKJ,Wakkanai,Asia/Tokyo\r
IKI,Iki,Asia/Tokyo\r
UBJ,Yamaguchi,Asia/Tokyo\r
TSJ,Tsushima,Asia/Tokyo\r
MBE,Monbetsu,Asia/Tokyo\r
AKJ,Asahikawa,Asia/Tokyo\r
OIR,Okushiri,Asia/Tokyo\r
RIS,Rishiri Island,Asia/Tokyo\r
KUM,Yakushima,Asia/Tokyo\r
FUJ,Fukue,Asia/Tokyo\r
FUK,Fukuoka,Asia/Tokyo\r
TNE,Tanegashima,Asia/Tokyo\r
KOJ,Kagoshima,Asia/Tokyo\r
KMI,Miyazaki,Asia/Tokyo\r
OIT,Oita,Asia/Tokyo\r
KKJ,Kitakyushu,Asia/Tokyo\r
KMJ,Kumamoto,Asia/Tokyo\r
NGS,Nagasaki,Asia/Tokyo\r
ASJ,Amami,Asia/Tokyo\r
OKE,Okierabu,Asia/Tokyo\r
TKN,Tokunoshima,Asia/Tokyo\r
FKJ,Fukui,Asia/Tokyo\r
QGU,Gifu,Asia/Tokyo\r
KMQ,Kanazawa,Asia/Tokyo\r
OKI,Oki Island,Asia/Tokyo\r
TOY,Toyama,Asia/Tokyo\r
HIJ,Hiroshima,Asia/Tokyo\r
OKJ,Okayama,Asia/Tokyo\r
IZO,Izumo,Asia/Tokyo\r
YGJ,Miho,Asia/Tokyo\r
KCZ,Kochi,Asia/Tokyo\r
MYJ,Matsuyama,Asia/Tokyo\r
ITM,Osaka,Asia/Tokyo\r
TTJ,Tottori,Asia/Tokyo\r
TKS,Tokushima,Asia/Tokyo\r
TAK,Takamatsu,Asia/Tokyo\r
AOJ,Aomori,Asia/Tokyo\r
GAJ,Yamagata,Asia/Tokyo\r
SDS,Sado,Asia/Tokyo\r
HHE,Hachinoe,Asia/Tokyo\r
HNA,Hanamaki,Asia/Tokyo\r
AXT,Akita,Asia/Tokyo\r
MSJ,Misawa,Asia/Tokyo\r
SDJ,Sendai,Asia/Tokyo\r
NJA,Atsugi,Asia/Tokyo\r
HAC,Hachijojima,Asia/Tokyo\r
OIM,Oshima,Asia/Tokyo\r
HND,Tokyo,Asia/Tokyo\r
OKO,Yokota,Asia/Tokyo\r
KWJ,Kwangju,Asia/Seoul\r
CHN,Jhunju,Asia/Seoul\r
RSU,Yeosu,Asia/Seoul\r
KAG,Kangnung,Asia/Seoul\r
CJU,Cheju,Asia/Seoul\r
CHF,Chinhae,Asia/Seoul\r
PUS,Busan,Asia/Seoul\r
USN,Ulsan,Asia/Seoul\r
SSN,Seoul East,Asia/Seoul\r
OSN,Osan,Asia/Seoul\r
GMP,Seoul,Asia/Seoul\r
SWU,Suwon,Asia/Seoul\r
KPO,Pohang,Asia/Seoul\r
TAE,Taegu,Asia/Seoul\r
YEC,Yechon,Asia/Seoul\r
OKA,Okinawa,Asia/Tokyo\r
DNA,Kadena,Asia/Tokyo\r
ISG,Ishigaki,Asia/Tokyo\r
UEO,Kumejima,Asia/Tokyo\r
MMD,Minami Daito,Asia/Tokyo\r
MMY,Miyako,Asia/Tokyo\r
KTD,Kitadaito,Asia/Tokyo\r
SHI,Shimojishima,Asia/Tokyo\r
TRA,Tarama,Asia/Tokyo\r
RNJ,Yoron,Asia/Tokyo\r
OGN,Yonaguni Jima,Asia/Tokyo\r
MNL,Manila,Asia/Manila\r
CBO,Cotabato,Asia/Manila\r
PAG,Pagadian,Asia/Manila\r
GES,Romblon,Asia/Manila\r
ZAM,Zamboanga,Asia/Manila\r
BAG,Baguio,Asia/Manila\r
DTE,Daet,Asia/Manila\r
SJI,San Jose,Asia/Manila\r
MBO,Mamburao,Asia/Manila\r
BQA,Baler,Asia/Manila\r
TAC,Tacloban,Asia/Manila\r
BCD,Bacolod,Asia/Manila\r
DGT,Dumaguete,Asia/Manila\r
MPH,Caticlan,Asia/Manila\r
ILO,Iloilo,Asia/Manila\r
KLO,Kalibo,Asia/Manila\r
PPS,Puerto Princesa,Asia/Manila\r
EUQ,San Jose,Asia/Manila\r
COC,Concordia,America/Argentina/Cordoba\r
GHU,Gualeguaychu,America/Argentina/Cordoba\r
JNI,Junin,America/Argentina/Buenos_Aires\r
PRA,Parana,America/Argentina/Cordoba\r
ROS,Rosario,America/Argentina/Cordoba\r
SFN,Santa Fe,America/Argentina/Cordoba\r
AEP,Buenos Aires,America/Argentina/Buenos_Aires\r
COR,Cordoba,America/Argentina/Cordoba\r
FDO,San Fernando,America/Argentina/Buenos_Aires\r
LPG,La Plata,America/Argentina/Buenos_Aires\r
EPA,El Palomar,America/Argentina/Buenos_Aires\r
HOS,Chosmadal,America/Argentina/Salta\r
GNR,Fuerte Gral Roca,America/Argentina/Salta\r
MDZ,Mendoza,America/Argentina/Mendoza\r
LGS,Malargue,America/Argentina/Mendoza\r
AFA,San Rafael,America/Argentina/Mendoza\r
CTC,Catamarca,America/Argentina/Catamarca\r
SDE,Santiago Del Estero,America/Argentina/Cordoba\r
IRJ,La Rioja,America/Argentina/La_Rioja\r
TUC,Tucuman,America/Argentina/Tucuman\r
UAQ,San Juan,America/Argentina/San_Juan\r
RCU,Rio Cuarto,America/Argentina/Cordoba\r
VDR,Villa Dolores,America/Argentina/Cordoba\r
VME,Villa Reynolds,America/Argentina/San_Luis\r
LUQ,San Luis,America/Argentina/San_Luis\r
CNQ,Corrientes,America/Argentina/Cordoba\r
RES,Resistencia,America/Argentina/Cordoba\r
FMA,Formosa,America/Argentina/Cordoba\r
IGR,Iguazu Falls,America/Argentina/Cordoba\r
AOL,Paso De Los Libres,America/Argentina/Cordoba\r
MCS,Monte Caseros,America/Argentina/Cordoba\r
PSS,Posadas,America/Argentina/Cordoba\r
PRQ,Presidencia R.s.pena,America/Argentina/Cordoba\r
SLA,Salta,America/Argentina/Salta\r
JUJ,Jujuy,America/Argentina/Jujuy\r
ORA,Oran,America/Argentina/Salta\r
ELO,El Dorado,America/Argentina/Cordoba\r
OYA,Goya,America/Argentina/Cordoba\r
RCQ,Reconquista,America/Argentina/Cordoba\r
UZU,Curuzu Cuatia,America/Argentina/Cordoba\r
EHL,El Bolson,America/Argentina/Salta\r
CRD,Comodoro Rivadavia,America/Argentina/Catamarca\r
EQS,Esquel,America/Argentina/Catamarca\r
REL,Trelew,America/Argentina/Catamarca\r
VDM,Viedma,America/Argentina/Salta\r
PMY,Puerto Madryn,America/Argentina/Catamarca\r
PUD,Puerto Deseado,America/Argentina/Rio_Gallegos\r
RGA,Rio Grande,America/Argentina/Ushuaia\r
RGL,Rio Gallegos,America/Argentina/Rio_Gallegos\r
USH,Ushuaia,America/Argentina/Ushuaia\r
ULA,San Julian,America/Argentina/Rio_Gallegos\r
PMQ,Perito Moreno,America/Argentina/Rio_Gallegos\r
RZA,Santa Cruz,America/Argentina/Rio_Gallegos\r
BHI,Bahia Blanca,America/Argentina/Buenos_Aires\r
CSZ,Colonel Suarez,America/Argentina/Buenos_Aires\r
OVR,Olavarria,America/Argentina/Buenos_Aires\r
GPO,General Pico,America/Argentina/Salta\r
OYO,Tres Arroyos,America/Argentina/Buenos_Aires\r
MDQ,Mar Del Plata,America/Argentina/Buenos_Aires\r
NQN,Neuquen,America/Argentina/Salta\r
PEH,Pehuajo,America/Argentina/Buenos_Aires\r
RSA,Santa Rosa,America/Argentina/Salta\r
BRC,San Carlos De Bariloche,America/Argentina/Salta\r
TDL,Tandil,America/Argentina/Buenos_Aires\r
VLG,Villa Gesell,America/Argentina/Buenos_Aires\r
CUT,Cutralco,America/Argentina/Salta\r
CPC,San Martin Des Andes,America/Argentina/Salta\r
CDJ,Conceicao Do Araguaia,America/Belem\r
AQA,Araracuara,America/Sao_Paulo\r
AJU,Aracaju,America/Maceio\r
AFL,Alta Floresta,America/Cuiaba\r
ARU,Aracatuba,America/Sao_Paulo\r
BEL,Belem,America/Belem\r
BGX,Bage,America/Sao_Paulo\r
PLU,Belo Horizonte,America/Sao_Paulo\r
BFH,Curitiba,America/Sao_Paulo\r
BSB,Brasilia,America/Sao_Paulo\r
BAU,Bauru,America/Sao_Paulo\r
BVB,Boa Vista,America/Boa_Vista\r
BPG,Barra Do Garcas,America/Cuiaba\r
CAC,Cascavel,America/Sao_Paulo\r
CNF,Belo Horizonte,America/Sao_Paulo\r
CGR,Campo Grande,America/Campo_Grande\r
XAP,Chapeco,America/Sao_Paulo\r
CLN,Carolina,America/Fortaleza\r
CCM,Criciuma,America/Sao_Paulo\r
CAW,Campos,America/Sao_Paulo\r
CMG,Corumba,America/Campo_Grande\r
CWB,Curitiba,America/Sao_Paulo\r
CRQ,Caravelas,America/Bahia\r
CXJ,Caxias Do Sul,America/Sao_Paulo\r
CGB,Cuiaba,America/Cuiaba\r
CZS,Cruzeiro do Sul,America/Rio_Branco\r
PPB,President Prudente,America/Sao_Paulo\r
MAO,Manaus,America/Manaus\r
JCR,Jacare-acanga,America/Santarem\r
IGU,Foz Do Iguacu,America/Sao_Paulo\r
FLN,Florianopolis,America/Sao_Paulo\r
FEN,Fernando Do Noronha,America/Noronha\r
FOR,Fortaleza,America/Fortaleza\r
GIG,Rio De Janeiro,America/Sao_Paulo\r
GJM,Guajara-mirim,America/Porto_Velho\r
GYN,Goiania,America/Sao_Paulo\r
GRU,Sao Paulo,America/Sao_Paulo\r
GUJ,Guaratingueta,America/Sao_Paulo\r
ATM,Altamira,America/Santarem\r
ITA,Itaituba,America/Manaus\r
ITB,Itaituba,America/Santarem\r
IOS,Ilheus,America/Bahia\r
IPN,Ipatinga,America/Sao_Paulo\r
ITR,Itumbiara,America/Sao_Paulo\r
IMP,Imperatriz,America/Fortaleza\r
JDF,Juiz De Fora,America/Sao_Paulo\r
JPA,Joao Pessoa,America/Fortaleza\r
JOI,Joinville,America/Sao_Paulo\r
CPV,Campina Grande,America/Fortaleza\r
VCP,Campinas,America/Sao_Paulo\r
LAJ,Lajes,America/Sao_Paulo\r
LIP,Lins,America/Sao_Paulo\r
LDB,Londrina,America/Sao_Paulo\r
LAZ,Bom Jesus Da Lapa,America/Bahia\r
MAB,Maraba,America/Belem\r
MEU,Almeirim,America/Santarem\r
MGF,Maringa,America/Sao_Paulo\r
MOC,Montes Claros,America/Sao_Paulo\r
PLL,Manaus,America/Manaus\r
MCZ,Maceio,America/Maceio\r
MCP,Macapa,America/Belem\r
MVF,Mocord,America/Fortaleza\r
MNX,Manicore,America/Manaus\r
NVT,Navegantes,America/Sao_Paulo\r
GEL,Santo Angelo,America/Sao_Paulo\r
NAT,Natal,America/Fortaleza\r
OYK,Oioiapoque,America/Belem\r
POA,Porto Alegre,America/Sao_Paulo\r
PHB,Parnaiba,America/Fortaleza\r
POO,Pocos De Caldas,America/Sao_Paulo\r
PFB,Passo Fundo,America/Sao_Paulo\r
PET,Pelotas,America/Sao_Paulo\r
PNZ,Petrolina,America/Recife\r
PNB,Porto Nacional,America/Araguaina\r
PMG,Ponta Pora,America/Campo_Grande\r
PVH,Porto Velho,America/Porto_Velho\r
RBR,Rio Branco,America/Rio_Branco\r
REC,Recife,America/Recife\r
SDU,Rio De Janeiro,America/Sao_Paulo\r
RAO,Ribeirao Preto,America/Sao_Paulo\r
SNZ,Rio De Janeiro,America/Sao_Paulo\r
SJK,Sao Jose Dos Campos,America/Sao_Paulo\r
SLZ,Sao Luis,America/Fortaleza\r
CGH,Sao Paulo,America/Sao_Paulo\r
SJP,Sao Jose Do Rio Preto,America/Sao_Paulo\r
SSZ,Santos,America/Sao_Paulo\r
SSA,Salvador,America/Bahia\r
TMT,Oriximina,America/Santarem\r
THE,Teresina,America/Fortaleza\r
TFF,Tefe,America/Manaus\r
TRQ,Tarauaca,America/Rio_Branco\r
TEC,Telemaco Borba,America/Sao_Paulo\r
TBT,Tabatinga,America/Manaus\r
TUR,Tucurui,America/Belem\r
SJL,Sao Gabriel,America/Manaus\r
PAV,Paulo Alfonso,America/Bahia\r
URG,Uruguaiana,America/Sao_Paulo\r
UDI,Uberlandia,America/Sao_Paulo\r
UBA,Uberaba,America/Sao_Paulo\r
VAG,Varginha,America/Sao_Paulo\r
BVH,Vilhena,America/Porto_Velho\r
VIX,Vitoria,America/Sao_Paulo\r
QPS,Piracununga,America/Sao_Paulo\r
ARI,Arica,America/Santiago\r
BBA,Balmaceda,America/Coyhaique\r
CCH,Chile Chico,America/Coyhaique\r
CJC,Calama,America/Santiago\r
YAI,Chillan,America/Santiago\r
PUQ,Punta Arenas,America/Punta_Arenas\r
GXQ,Coyhaique,America/Coyhaique\r
IQQ,Iquique,America/Santiago\r
SCL,Santiago,America/Santiago\r
ANF,Antofagasta,America/Santiago\r
WPR,Porvenir,America/Punta_Arenas\r
FFU,Futaleufu,America/Santiago\r
LSQ,Los Angeles,America/Santiago\r
WPU,Puerto Williams,America/Punta_Arenas\r
CCP,Concepcion,America/Santiago\r
IPC,Easter Island,Pacific/Easter\r
ZOS,Osorno,America/Santiago\r
VLR,Vallenar,America/Santiago\r
QRC,Rancagua,America/Santiago\r
TNM,Isla Rey Jorge,America/Punta_Arenas\r
LSC,La Serena,America/Santiago\r
PZS,Temuco,America/Santiago\r
PMC,Puerto Montt,America/Santiago\r
WCH,Chaiten,America/Santiago\r
ZAL,Valdivia,America/Santiago\r
ATF,Ambato,America/Guayaquil\r
OCC,Coca,America/Guayaquil\r
CUE,Cuenca,America/Guayaquil\r
GPS,Galapagos,Pacific/Galapagos\r
GYE,Guayaquil,America/Guayaquil\r
LTX,Latacunga,America/Guayaquil\r
MRR,Macara,America/Guayaquil\r
XMS,Macas,America/Guayaquil\r
MCH,Machala,America/Guayaquil\r
MEC,Manta,America/Guayaquil\r
PVO,Portoviejo,America/Guayaquil\r
UIO,Quito,America/Guayaquil\r
ETR,Santa Rosa,America/Guayaquil\r
SNC,Salinas,America/Guayaquil\r
TPC,Tarapoa,America/Guayaquil\r
TUA,Tulcan,America/Guayaquil\r
ASU,Asuncion,America/Asuncion\r
AYO,Ayolas,America/Asuncion\r
CIO,Conception,America/Asuncion\r
ESG,Mariscal Estigarribia,America/Asuncion\r
PIL,Pilar,America/Asuncion\r
AXM,Armenia,America/Bogota\r
PUU,Puerto Asis,America/Bogota\r
ELB,El Banco,America/Bogota\r
BGA,Bucaramanga,America/Bogota\r
BOG,Bogota,America/Bogota\r
BAQ,Barranquilla,America/Bogota\r
BSC,Bahia Solano,America/Bogota\r
BUN,Buenaventura,America/Bogota\r
CUC,Cucuta,America/Bogota\r
CTG,Cartagena,America/Bogota\r
CLO,Cali,America/Bogota\r
TCO,Tumaco,America/Bogota\r
CZU,Corozal,America/Bogota\r
EJA,Barrancabermeja,America/Bogota\r
FLA,Florencia,America/Bogota\r
GIR,Girardot,America/Bogota\r
GPI,Guapi,America/Bogota\r
IBE,Ibague,America/Bogota\r
IPI,Ipiales,America/Bogota\r
APO,Carepa,America/Bogota\r
MCJ,La Mina,America/Bogota\r
LET,Leticia,America/Bogota\r
EOH,Medellin,America/Bogota\r
MGN,Magangue,America/Bogota\r
MTR,Monteria,America/Bogota\r
MVP,Mitu,America/Bogota\r
MZL,Manizales,America/Bogota\r
NVA,Neiva,America/Bogota\r
OCV,Ocana,America/Bogota\r
OTU,Otu,America/Bogota\r
PCR,Puerto Carreno,America/Bogota\r
PEI,Pereira,America/Bogota\r
PTX,Pitalito,America/Bogota\r
PPN,Popayan,America/Bogota\r
PSO,Pasto,America/Bogota\r
PVA,Providencia,America/Bogota\r
MQU,Mariquita,America/Bogota\r
MDE,Rio Negro,America/Bogota\r
RCH,Rio Hacha,America/Bogota\r
SJE,San Jose Del Guaviare,America/Bogota\r
SMR,Santa Marta,America/Bogota\r
ADZ,San Andres Island,America/Bogota\r
SVI,San Vincente De Caguan,America/Bogota\r
TME,Tame,America/Bogota\r
AUC,Arauca,America/Bogota\r
UIB,Quibdo,America/Bogota\r
ULQ,Tulua,America/Bogota\r
VUP,Valledupar,America/Bogota\r
VVC,Villavicencio,America/Bogota\r
BJO,Bermejo,America/La_Paz\r
CBB,Cochabamba,America/La_Paz\r
CCA,Chapacura,America/La_Paz\r
CIJ,Cobija,America/La_Paz\r
LPB,La Paz,America/La_Paz\r
ORU,Oruro,America/La_Paz\r
POI,Potosi,America/La_Paz\r
PSZ,Puerto Suarez,America/La_Paz\r
SBL,Santa Ana,America/La_Paz\r
SRE,Sucre,America/La_Paz\r
TJA,Tarija,America/La_Paz\r
TDD,Trinidad,America/La_Paz\r
VLM,Villa Montes,America/La_Paz\r
VVI,Santa Cruz,America/La_Paz\r
BYC,Yacuiba,America/La_Paz\r
PBM,Zandery,America/Paramaribo\r
CAY,Cayenne,America/Cayenne\r
OYP,St.-georges Oyapock,America/Cayenne\r
AOP,Andoas,America/Lima\r
IBP,Iberia,America/Lima\r
PCL,Pucallpa,America/Lima\r
CHM,Chimbote,America/Lima\r
CIX,Chiclayo,America/Lima\r
AYP,Ayacucho,America/Lima\r
ANS,Andahuaylas,America/Lima\r
ATA,Anta,America/Lima\r
LIM,Lima,America/Lima\r
JJI,Juanjui,America/Lima\r
JAU,Jauja,America/Lima\r
JUL,Juliaca,America/Lima\r
ILQ,Ilo,America/Lima\r
TBP,Tumbes,America/Lima\r
YMS,Yurimaguas,America/Lima\r
CHH,Chachapoyas,America/Lima\r
IQT,Iquitos,America/Lima\r
AQP,Arequipa,America/Lima\r
TRU,Trujillo,America/Lima\r
PIO,Pisco,America/Lima\r
TPP,Tarapoto,America/Lima\r
TCQ,Tacna,America/Lima\r
PEM,Puerto Maldonado,America/Lima\r
PIU,Piura,America/Lima\r
TYL,Talara,America/Lima\r
CUZ,Cuzco,America/Lima\r
DZO,Durazno,America/Montevideo\r
MVD,Montevideo,America/Montevideo\r
STY,Salto,America/Montevideo\r
AGV,Acarigua,America/Caracas\r
AAO,Anaco,America/Caracas\r
BLA,Barcelona,America/Caracas\r
BNS,Barinas,America/Caracas\r
BRM,Barquisimeto,America/Caracas\r
CBL,Ciudad Bolivar,America/Caracas\r
CXA,Caicara De Orinoco,America/Caracas\r
CLZ,Calabozo,America/Caracas\r
CAJ,Canaima,America/Caracas\r
VCR,Carora,America/Caracas\r
CUP,Carupano,America/Caracas\r
CZE,Coro,America/Caracas\r
CUM,Cumana,America/Caracas\r
EOR,El Dorado,America/Caracas\r
EOZ,Elorza,America/Caracas\r
GDO,Guasdualito,America/Caracas\r
GUI,Guiria,America/Caracas\r
GUQ,Guanare,America/Caracas\r
HGE,Higuerote,America/Caracas\r
ICC,Isla De Coche,America/Caracas\r
LSP,Paraguana,America/Caracas\r
LFR,La Fria,America/Caracas\r
MAR,Maracaibo,America/Caracas\r
MRD,Merida,America/Caracas\r
PMV,Porlamar,America/Caracas\r
CCS,Caracas,America/Caracas\r
MUN,Maturin,America/Caracas\r
PYH,Puerto Ayacucho,America/Caracas\r
PBL,Puerto Cabello,America/Caracas\r
SCI,San Cristobal,America/Caracas\r
PZO,Guayana,America/Caracas\r
PTM,Palmarito,America/Caracas\r
SVZ,San Antonio,America/Caracas\r
SBB,Santa Barbara,America/Caracas\r
SNV,Santa Ana De Uairen,America/Caracas\r
STD,Santo Domingo,America/Caracas\r
SNF,San Felipe,America/Caracas\r
SFD,San Fernando De Apure,America/Caracas\r
SOM,San Tome,America/Caracas\r
STB,Santa Barbara,America/Caracas\r
TUV,Tucupita,America/Caracas\r
TMO,Tumeremo,America/Caracas\r
VLN,Valencia,America/Caracas\r
VLV,Valera,America/Caracas\r
VDP,Valle De La Pascua,America/Caracas\r
LTM,Lethem,America/Guyana\r
ANU,Antigua,America/Antigua\r
BGI,Bridgetown,America/Barbados\r
DCF,Canefield,America/Dominica\r
DOM,Dominica,America/Dominica\r
FDF,Fort-de-france,America/Martinique\r
SFG,St. Martin,America/Marigot\r
PTP,Pointe-a-pitre,America/Guadeloupe\r
GND,Point Salines,America/Grenada\r
STT,St. Thomas,America/St_Thomas\r
STX,St. Croix Island,America/St_Thomas\r
BQN,Aguadilla,America/Puerto_Rico\r
FAJ,Fajardo,America/Puerto_Rico\r
SIG,San Juan,America/Puerto_Rico\r
MAZ,Mayaguez,America/Puerto_Rico\r
PSE,Ponce,America/Puerto_Rico\r
SJU,San Juan,America/Puerto_Rico\r
SKB,Basse Terre,America/St_Kitts\r
SLU,Castries,America/St_Lucia\r
UVF,Hewandorra,America/St_Lucia\r
AUA,Oranjestad,America/Aruba\r
BON,Kralendijk,America/Kralendijk\r
CUR,Willemstad,America/Curacao\r
EUX,Oranjestad,America/Kralendijk\r
SXM,Philipsburg,America/Lower_Princes\r
AXA,The Valley,America/Anguilla\r
TAB,Scarborough,America/Port_of_Spain\r
POS,Port-of-spain,America/Port_of_Spain\r
EIS,Tortola,America/Tortola\r
CIW,Canouan Island,America/St_Vincent\r
MQS,Mustique,America/St_Vincent\r
SVD,Kingstown,America/St_Vincent\r
ALA,Alma-ata,Asia/Almaty\r
BXH,Balkhash,Asia/Almaty\r
TSE,Tselinograd,Asia/Almaty\r
DMB,Dzhambul,Asia/Almaty\r
FRU,Bishkek,Asia/Bishkek\r
OSS,Osh,Asia/Bishkek\r
CIT,Chimkent,Asia/Almaty\r
URA,Uralsk,Asia/Oral\r
PWQ,Pavlodar,Asia/Almaty\r
PLX,Semiplatinsk,Asia/Almaty\r
AKX,Aktyubinsk,Asia/Aqtobe\r
GYD,Baku,Asia/Baku\r
YKS,Yakutsk,Asia/Yakutsk\r
MJZ,Mirnyj,Asia/Yakutsk\r
BQS,Blagoveschensk,Asia/Yakutsk\r
KHV,Khabarovsk,Asia/Vladivostok\r
PVS,Provideniya Bay,Asia/Anadyr\r
GDX,Magadan,Asia/Magadan\r
PWE,Pevek,Asia/Anadyr\r
PKC,Petropavlovsk,Asia/Kamchatka\r
UUS,Yuzhno-sakhalinsk,Asia/Sakhalin\r
VVO,Vladivostok,Asia/Vladivostok\r
HTA,Chita,Asia/Chita\r
BTK,Bratsk,Asia/Irkutsk\r
IKT,Irkutsk,Asia/Irkutsk\r
UUD,Ulan-ude,Asia/Irkutsk\r
KBP,Kiev,Europe/Kyiv\r
DOK,Donetsk,Europe/Kyiv\r
DNK,Dnepropetrovsk,Europe/Kyiv\r
SIP,Simferopol,Europe/Simferopol\r
IEV,Kiev,Europe/Kyiv\r
LWO,Lvov,Europe/Kyiv\r
ODS,Odessa,Europe/Kyiv\r
LED,St. Petersburg,Europe/Moscow\r
MMK,Murmansk,Europe/Moscow\r
GME,Gomel,Europe/Minsk\r
VTB,Vitebsk,Europe/Minsk\r
KGD,Kaliningrad,Europe/Kaliningrad\r
MHP,Minsk,Europe/Minsk\r
MSQ,Minsk 2,Europe/Minsk\r
ABA,Abakan,Asia/Krasnoyarsk\r
BAX,Barnaul,Asia/Barnaul\r
KEJ,Kemorovo,Asia/Novokuznetsk\r
OMS,Omsk,Asia/Omsk\r
KRR,Krasnodar,Europe/Moscow\r
MCX,Makhachkala,Europe/Moscow\r
MRV,Mineralnye Vody,Europe/Moscow\r
STW,Stavropol,Europe/Moscow\r
ROV,Rostov,Europe/Moscow\r
AER,Sochi,Europe/Moscow\r
ASF,Astrakhan,Europe/Astrakhan\r
VOG,Volgograd,Europe/Volgograd\r
CEK,Chelyabinsk,Asia/Yekaterinburg\r
MQF,Magnetiogorsk,Asia/Yekaterinburg\r
NJC,Nizhnevartovsk,Asia/Yekaterinburg\r
PEE,Perm,Asia/Yekaterinburg\r
SGC,Surgut,Asia/Yekaterinburg\r
SVX,Yekaterinburg,Asia/Yekaterinburg\r
ASB,Ashkhabad,Asia/Ashgabat\r
KRW,Krasnovodsk,Asia/Ashgabat\r
CRZ,Chardzhou,Asia/Ashgabat\r
DYU,Dushanbe,Asia/Dushanbe\r
BHK,Bukhara,Asia/Samarkand\r
SKD,Samarkand,Asia/Samarkand\r
TAS,Tashkent,Asia/Tashkent\r
BZK,Bryansk,Europe/Moscow\r
SVO,Moscow,Europe/Moscow\r
KLD,Tver,Europe/Moscow\r
VOZ,Voronezh,Europe/Moscow\r
VKO,Moscow,Europe/Moscow\r
SCW,Syktyvkar,Europe/Moscow\r
KZN,Kazan,Europe/Moscow\r
REN,Orenburg,Asia/Yekaterinburg\r
UFA,Ufa,Asia/Yekaterinburg\r
KUF,Samara,Europe/Samara\r
AMD,Ahmedabad,Asia/Kolkata\r
AKD,Akola,Asia/Kolkata\r
IXU,Aurangabad,Asia/Kolkata\r
BOM,Mumbai,Asia/Kolkata\r
PAB,Bilaspur,Asia/Kolkata\r
BHJ,Bhuj,Asia/Kolkata\r
IXG,Belgaum,Asia/Kolkata\r
BDQ,Baroda,Asia/Kolkata\r
BHO,Bhopal,Asia/Kolkata\r
BHU,Bhaunagar,Asia/Kolkata\r
NMB,Daman,Asia/Kolkata\r
GUX,Guna,Asia/Kolkata\r
GOI,Goa,Asia/Kolkata\r
IDR,Indore,Asia/Kolkata\r
JLR,Jabalpur,Asia/Kolkata\r
JGA,Jamnagar,Asia/Kolkata\r
IXY,Kandla,Asia/Kolkata\r
HJR,Khajuraho,Asia/Kolkata\r
KLH,Kolhapur,Asia/Kolkata\r
IXK,Keshod,Asia/Kolkata\r
NAG,Nagpur,Asia/Kolkata\r
ISK,Nasik Road,Asia/Kolkata\r
PNQ,Pune,Asia/Kolkata\r
PBD,Porbandar,Asia/Kolkata\r
RAJ,Rajkot,Asia/Kolkata\r
RPR,Raipur,Asia/Kolkata\r
SSE,Sholapur,Asia/Kolkata\r
STV,Surat,Asia/Kolkata\r
UDR,Udaipur,Asia/Kolkata\r
CMB,Colombo,Asia/Colombo\r
ACJ,Anuradhapura,Asia/Colombo\r
BTC,Batticaloa,Asia/Colombo\r
RML,Colombo,Asia/Colombo\r
ADP,Galoya,Asia/Colombo\r
JAF,Jaffna,Asia/Colombo\r
TRR,Trinciomalee,Asia/Colombo\r
KZC,Kompong Chnang,Asia/Phnom_Penh\r
PNH,Phnom-penh,Asia/Phnom_Penh\r
REP,Siem-reap,Asia/Phnom_Penh\r
TNX,Stung Treng,Asia/Phnom_Penh\r
IXV,Along,Asia/Kolkata\r
IXA,Agartala,Asia/Kolkata\r
AJL,Aizwal,Asia/Kolkata\r
IXB,Baghdogra,Asia/Kolkata\r
BBI,Bhubaneswar,Asia/Kolkata\r
CCU,Kolkata,Asia/Kolkata\r
COH,Cooch-behar,Asia/Kolkata\r
DBD,Dhanbad,Asia/Kolkata\r
GAY,Gaya,Asia/Kolkata\r
IMF,Imphal,Asia/Kolkata\r
IXW,Jamshedpur,Asia/Kolkata\r
JRH,Jorhat,Asia/Kolkata\r
IXH,Kailashahar,Asia/Kolkata\r
IXS,Silchar,Asia/Kolkata\r
IXI,Lilabari,Asia/Kolkata\r
DIB,Mohanbari,Asia/Kolkata\r
MZU,Mazuffarpur,Asia/Kolkata\r
PAT,Patina,Asia/Kolkata\r
IXR,Ranchi,Asia/Kolkata\r
RRK,Rourkela,Asia/Kolkata\r
VTZ,Vishakhapatnam,Asia/Kolkata\r
ZER,Zero,Asia/Kolkata\r
CXB,Cox's Bazar,Asia/Dhaka\r
CGP,Chittagong,Asia/Dhaka\r
IRD,Ishurdi,Asia/Dhaka\r
JSR,Jessore,Asia/Dhaka\r
RJH,Rajshahi,Asia/Dhaka\r
SPD,Saidpur,Asia/Dhaka\r
ZYL,Sylhet Osmani,Asia/Dhaka\r
DAC,Dhaka,Asia/Dhaka\r
HKG,Hong Kong,Asia/Hong_Kong\r
AGR,Agra,Asia/Kolkata\r
IXD,Allahabad,Asia/Kolkata\r
ATQ,Amritsar,Asia/Kolkata\r
BKB,Bikaner,Asia/Kolkata\r
VNS,Varanasi,Asia/Kolkata\r
KUU,Kulu,Asia/Kolkata\r
BUP,Bhatinda,Asia/Kolkata\r
BEK,Bareilly,Asia/Kolkata\r
IXC,Chandigarh,Asia/Kolkata\r
KNU,Kanpur,Asia/Kolkata\r
DED,Dehra Dun,Asia/Kolkata\r
DEL,Delhi,Asia/Kolkata\r
GWL,Gwalior,Asia/Kolkata\r
HSS,Hissar,Asia/Kolkata\r
JDH,Jodhpur,Asia/Kolkata\r
JAI,Jaipur,Asia/Kolkata\r
JSA,Jaisalmer,Asia/Kolkata\r
IXJ,Jammu,Asia/Kolkata\r
KTU,Kota,Asia/Kolkata\r
LUH,Ludhiaha,Asia/Kolkata\r
IXL,Leh,Asia/Kolkata\r
LKO,Lucknow,Asia/Kolkata\r
IXP,Pathankot,Asia/Kolkata\r
PGH,Nainital,Asia/Kolkata\r
SXR,Srinagar,Asia/Kolkata\r
TNI,Satna,Asia/Kolkata\r
LPQ,Luang Prabang,Asia/Vientiane\r
PKZ,Pakse,Asia/Vientiane\r
ZVK,Savannakhet,Asia/Vientiane\r
NEU,Sam Neua,Asia/Vientiane\r
VTE,Vientiane,Asia/Vientiane\r
MFM,Macau,Asia/Macau\r
BWA,Bhairawa,Asia/Kathmandu\r
JKR,Janakpur,Asia/Kathmandu\r
KTM,Kathmandu,Asia/Kathmandu\r
PKR,Pokhara,Asia/Kathmandu\r
SIF,Simara,Asia/Kathmandu\r
BIR,Biratnagar,Asia/Kathmandu\r
AGX,Agatti Island,Asia/Kolkata\r
BLR,Bangalore,Asia/Kolkata\r
BEP,Bellary,Asia/Kolkata\r
VGA,Vijayawada,Asia/Kolkata\r
CJB,Coimbatore,Asia/Kolkata\r
COK,Kochi,Asia/Kolkata\r
CCJ,Calicut,Asia/Kolkata\r
CDP,Cuddapah,Asia/Kolkata\r
CBD,Carnicobar,Asia/Kolkata\r
BPM,Hyderabad,Asia/Kolkata\r
IXM,Madurai,Asia/Kolkata\r
IXE,Mangalore,Asia/Kolkata\r
MAA,Madras,Asia/Kolkata\r
IXZ,Port Blair,Asia/Kolkata\r
PNY,Pendicherry,Asia/Kolkata\r
RJA,Rajahmundry,Asia/Kolkata\r
SXV,Salem,Asia/Kolkata\r
TJV,Tanjore,Asia/Kolkata\r
TIR,Tirupeti,Asia/Kolkata\r
TRZ,Tiruchirappalli,Asia/Kolkata\r
TRV,Trivandrum,Asia/Kolkata\r
PBH,Thimphu,Asia/Thimphu\r
MLE,Male,Indian/Maldives\r
DMK,Bangkok,Asia/Bangkok\r
KDT,Nakhon Pathom,Asia/Bangkok\r
UTP,Pattaya,Asia/Bangkok\r
LPT,Lampang,Asia/Bangkok\r
PRH,Phrae,Asia/Bangkok\r
HHQ,Prachuap Khiri Khan,Asia/Bangkok\r
TKH,Nakhon Sawan,Asia/Bangkok\r
PHS,Phitsanulok,Asia/Bangkok\r
NAW,Narathiwat,Asia/Bangkok\r
KBV,Krabi,Asia/Bangkok\r
SGZ,Songkhla,Asia/Bangkok\r
PAN,Pattani,Asia/Bangkok\r
USM,Ko Samui,Asia/Bangkok\r
HKT,Phuket,Asia/Bangkok\r
UNN,Ranong,Asia/Bangkok\r
HDY,Hat Yai,Asia/Bangkok\r
TST,Trang,Asia/Bangkok\r
UTH,Udon Thani,Asia/Bangkok\r
SNO,Sakon Nakhon,Asia/Bangkok\r
PXR,Surin,Asia/Bangkok\r
LOE,Loei,Asia/Bangkok\r
DAD,Danang,Asia/Ho_Chi_Minh\r
HAN,Hanoi,Asia/Bangkok\r
NHA,Nhatrang,Asia/Ho_Chi_Minh\r
HUI,Hue,Asia/Ho_Chi_Minh\r
PQC,Phuquoc,Asia/Ho_Chi_Minh\r
SGN,Ho Chi Minh City,Asia/Ho_Chi_Minh\r
VBA,Ann,Asia/Yangon\r
NYU,Bagan,Asia/Yangon\r
HEH,Heho,Asia/Yangon\r
HOX,Hommalin,Asia/Yangon\r
KET,Kengtung,Asia/Yangon\r
KYP,Kyaukpyu,Asia/Yangon\r
LSH,Lashio,Asia/Yangon\r
MDL,Mandalay,Asia/Yangon\r
MGZ,Myeik,Asia/Yangon\r
MYT,Myitkyina,Asia/Yangon\r
MOE,Momeik,Asia/Yangon\r
MOG,Mong Hsat,Asia/Yangon\r
NMS,Namsang,Asia/Yangon\r
PAA,Hpa-an,Asia/Yangon\r
PBU,Putao,Asia/Yangon\r
PRU,Pyay,Asia/Yangon\r
AKY,Sittwe,Asia/Yangon\r
SNW,Thandwe,Asia/Yangon\r
THL,Tachilek,Asia/Yangon\r
RGN,Yangon,Asia/Yangon\r
UPG,Ujung Pandang,Asia/Makassar\r
BIK,Biak,Asia/Jayapura\r
NBX,Nabire,Asia/Jayapura\r
TIM,Timika,Asia/Jayapura\r
DJJ,Jayapura,Asia/Jayapura\r
WMX,Wamena,Asia/Jayapura\r
MKQ,Merauke,Asia/Jayapura\r
GTO,Gorontalo,Asia/Makassar\r
PLW,Palu,Asia/Makassar\r
MDC,Manado,Asia/Makassar\r
PSJ,Poso,Asia/Makassar\r
OTI,Morotai Island,Asia/Jayapura\r
TTE,Ternate,Asia/Jayapura\r
LUW,Luwuk,Asia/Makassar\r
AMQ,Ambon,Asia/Jayapura\r
FKQ,Fak Fak,Asia/Jayapura\r
KNG,Kaimana,Asia/Jayapura\r
BXB,Babo,Asia/Jayapura\r
MKW,Manokwari,Asia/Jayapura\r
SOQ,Sorong,Asia/Jayapura\r
BTU,Bintulu,Asia/Kuching\r
KCH,Kuching,Asia/Kuching\r
LMN,Limbang,Asia/Kuching\r
MUR,Marudi,Asia/Kuching\r
MYY,Miri,Asia/Kuching\r
SBW,Sibu,Asia/Kuching\r
LDU,Lahad Datu,Asia/Kuching\r
BKI,Kota Kinabalu,Asia/Kuching\r
LBU,Labuan,Asia/Kuching\r
TWU,Tawau,Asia/Kuching\r
BWN,Bandar Seri Begawan,Asia/Brunei\r
PKU,Pekanbaru,Asia/Jakarta\r
DUM,Dumai,Asia/Jakarta\r
CGK,Jakarta,Asia/Jakarta\r
GNS,Gunung Sitoli,Asia/Jakarta\r
AEG,Padang Sidempuan,Asia/Jakarta\r
PDG,Padang,Asia/Jakarta\r
MES,Medan,Asia/Jakarta\r
FLZ,Sibolga,Asia/Jakarta\r
NPO,Nangapinoh,Asia/Pontianak\r
KTG,Ketapang,Asia/Pontianak\r
PNK,Pontianak,Asia/Pontianak\r
DJB,Jambi,Asia/Jakarta\r
BKS,Bengkulu,Asia/Jakarta\r
PLM,Palembang,Asia/Jakarta\r
RGT,Rengat,Asia/Jakarta\r
LSX,Lhok Sukon,Asia/Jakarta\r
BTJ,Banda Aceh,Asia/Jakarta\r
AOR,Alor Setar,Asia/Kuala_Lumpur\r
BWH,Butterworth,Asia/Kuala_Lumpur\r
KBR,Kota Bahru,Asia/Kuala_Lumpur\r
KUA,Kuantan,Asia/Kuala_Lumpur\r
KTE,Kerteh,Asia/Kuala_Lumpur\r
IPH,Ipoh,Asia/Kuala_Lumpur\r
JHB,Johor Bahru,Asia/Kuala_Lumpur\r
KUL,Kuala Lumpur,Asia/Kuala_Lumpur\r
LGK,Langkawi,Asia/Kuala_Lumpur\r
MKZ,Malacca,Asia/Kuala_Lumpur\r
TGG,Kuala Terengganu,Asia/Kuala_Lumpur\r
PEN,Penang,Asia/Kuala_Lumpur\r
UAI,Suai,Asia/Dili\r
DIL,Dili,Asia/Dili\r
BCH,Baucau,Asia/Dili\r
QPG,Paya Lebar,Asia/Singapore\r
TGA,Tengah,Asia/Singapore\r
XSP,Singapore,Asia/Singapore\r
SIN,Singapore,Asia/Singapore\r
ACF,Brisbane,Australia/Brisbane\r
ABM,Amberley,Australia/Brisbane\r
ASP,Alice Springs,Australia/Darwin\r
BNE,Brisbane,Australia/Brisbane\r
OOL,Coolangatta,Australia/Brisbane\r
CNS,Cairns,Australia/Brisbane\r
CTL,Charlieville,Australia/Brisbane\r
ISA,Mount Isa,Australia/Brisbane\r
MCY,Maroochydore,Australia/Brisbane\r
MKY,Mackay,Australia/Brisbane\r
PPP,Prosserpine,Australia/Brisbane\r
ROK,Rockhampton,Australia/Brisbane\r
TSV,Townsville,Australia/Brisbane\r
WEI,Weipa,Australia/Brisbane\r
AVV,Avalon,Australia/Melbourne\r
ABX,Albury,Australia/Sydney\r
MEB,Melbourne,Australia/Melbourne\r
HBA,Hobart,Australia/Hobart\r
LST,Launceston,Australia/Hobart\r
MBW,Melbourne,Australia/Melbourne\r
MEL,Melbourne,Australia/Melbourne\r
ADL,Adelaide,Australia/Adelaide\r
JAD,Perth,Australia/Perth\r
KTA,Karratha,Australia/Perth\r
KGI,Kalgoorlie,Australia/Perth\r
KNX,Kununurra,Australia/Perth\r
LEA,Learmonth,Australia/Perth\r
PHE,Port Hedland,Australia/Perth\r
PER,Perth,Australia/Perth\r
UMR,Woomera,Australia/Adelaide\r
XCH,Christmas Island,Indian/Christmas\r
BWU,Sydney,Australia/Sydney\r
CBR,Canberra,Australia/Sydney\r
CFS,Coff's Harbour,Australia/Sydney\r
CDU,Camden,Australia/Sydney\r
DBO,Dubbo,Australia/Sydney\r
NLK,Norfolk Island,Pacific/Norfolk\r
XRH,Richmond,Australia/Sydney\r
SYD,Sydney,Australia/Sydney\r
TMW,Tamworth,Australia/Sydney\r
WGA,Wagga Wagga,Australia/Sydney\r
PEK,Beijing,Asia/Shanghai\r
HLD,Hailar,Asia/Shanghai\r
TSN,Tianjin,Asia/Shanghai\r
TYN,Taiyuan,Asia/Shanghai\r
CAN,Guangzhou,Asia/Shanghai\r
CSX,Changcha,Asia/Shanghai\r
KWL,Guilin,Asia/Shanghai\r
NNG,Nanning,Asia/Shanghai\r
SZX,Shenzhen,Asia/Shanghai\r
CGO,Zhengzhou,Asia/Shanghai\r
WUH,Wuhan,Asia/Shanghai\r
FNJ,Pyongyang,Asia/Pyongyang\r
LHW,Lanzhou,Asia/Shanghai\r
XIY,Xi'an,Asia/Shanghai\r
ULN,Ulan Bator,Asia/Ulaanbaatar\r
JHG,Jinghonggasa,Asia/Shanghai\r
KMG,Kunming,Asia/Shanghai\r
XMN,Xiamen,Asia/Shanghai\r
KHN,Nanchang,Asia/Shanghai\r
FOC,Fuzhou,Asia/Shanghai\r
HGH,Hangzhou,Asia/Shanghai\r
NGB,Ninbo,Asia/Shanghai\r
NKG,Nanjing,Asia/Shanghai\r
HFE,Hefei,Asia/Shanghai\r
TAO,Qingdao,Asia/Shanghai\r
SHA,Shanghai,Asia/Shanghai\r
YNT,Yantai,Asia/Shanghai\r
CKG,Chongqing,Asia/Shanghai\r
KWE,Guiyang,Asia/Shanghai\r
CTU,Chengdu,Asia/Shanghai\r
XIC,Xichang,Asia/Shanghai\r
KHG,Kashi,Asia/Urumqi\r
HTN,Hotan,Asia/Urumqi\r
URC,Urumqi,Asia/Urumqi\r
HRB,Harbin,Asia/Shanghai\r
MDG,Mudanjiang,Asia/Shanghai\r
DLC,Dalian,Asia/Shanghai\r
PVG,Shanghai,Asia/Shanghai\r
TOD,Tioman,Asia/Kuala_Lumpur\r
SZB,Kuala Lumpur,Asia/Kuala_Lumpur\r
NTQ,Wajima,Asia/Tokyo\r
HBE,Alexandria,Africa/Cairo\r
BTI,Barter Island,America/Anchorage\r
LUR,Cape Lisburne,America/Nome\r
PIZ,Point Lay,America/Nome\r
ITO,Hilo,Pacific/Honolulu\r
ORL,Orlando,America/New_York\r
BTT,Bettles,America/Anchorage\r
UTO,Indian Mountains,America/Anchorage\r
FYU,Fort Yukon,America/Anchorage\r
SVW,Sparrevohn,America/Anchorage\r
FRN,Fort Richardson,America/Anchorage\r
TLJ,Tatalina,America/Anchorage\r
CZF,Cape Romanzof,America/Nome\r
BED,Bedford,America/New_York\r
SNP,St. Paul Island,America/Nome\r
EHM,Cape Newenham,America/Nome\r
STG,Point Barrow,America/Nome\r
ILI,Iliamna,America/Anchorage\r
PTU,Port Moller,America/Anchorage\r
BMX,Big Mountain,America/Anchorage\r
OSC,Oscoda,America/Detroit\r
OAR,Fort Ord,America/Los_Angeles\r
MHR,Sacramento,America/Los_Angeles\r
BYS,Fort Irwin,America/Los_Angeles\r
FSM,Fort Smith,America/Chicago\r
MRI,Anchorage,America/Anchorage\r
GNT,Grants,America/Denver\r
PNC,Ponca City,America/Chicago\r
SVN,Hunter Aaf,America/New_York\r
GFK,Grand Forks,America/Chicago\r
PBF,Pine Bluff,America/Chicago\r
NSE,Milton,America/Chicago\r
HNM,Hana,Pacific/Honolulu\r
PRC,Prescott,America/Phoenix\r
TTN,Trenton,America/New_York\r
BOS,Boston,America/New_York\r
SUU,Fairfield,America/Los_Angeles\r
RME,Rome,America/New_York\r
ENV,Wendover,America/Denver\r
BFM,Mobile,America/Chicago\r
OAK,Oakland,America/Los_Angeles\r
OMA,Omaha,America/Chicago\r
OGG,Kahului,Pacific/Honolulu\r
ICT,Wichita,America/Chicago\r
MCI,Kansas City,America/Chicago\r
MSN,Madison,America/Chicago\r
DLG,Dillingham,America/Anchorage\r
HRO,Harrison,America/Chicago\r
PHX,Phoenix,America/Phoenix\r
BGR,Bangor,America/New_York\r
FXE,Fort Lauderdale,America/New_York\r
GGG,Longview,America/Chicago\r
AND,Andersen,America/New_York\r
GEG,Spokane,America/Los_Angeles\r
HWO,Hollywood,America/New_York\r
SFO,San Francisco,America/Los_Angeles\r
CTB,Cutbank,America/Denver\r
ARA,Louisiana,America/Chicago\r
GNV,Gainesville,America/New_York\r
MEM,Memphis,America/Chicago\r
DUG,Douglas,America/Phoenix\r
BIG,Delta Junction,America/Anchorage\r
CNW,Waco,America/Chicago\r
ANN,Annette Island,America/Metlakatla\r
CAR,Caribou,America/New_York\r
LRF,Jacksonville,America/Chicago\r
HUA,Redstone,America/Chicago\r
POB,Fort Bragg,America/New_York\r
DHT,Dalhart,America/Chicago\r
DLF,Del Rio,America/Chicago\r
LAX,Los Angeles,America/Los_Angeles\r
ANB,Anniston,America/Chicago\r
CLE,Cleveland,America/New_York\r
DOV,Dover,America/New_York\r
CVG,Cincinnati,America/New_York\r
FME,Fort Meade,America/New_York\r
HON,Huron,America/Chicago\r
JNU,Juneau,America/Juneau\r
LFT,Lafayette,America/Chicago\r
EWR,Newark,America/New_York\r
BOI,Boise,America/Boise\r
INS,Indian Springs,America/Los_Angeles\r
GCK,Garden City,America/Chicago\r
MOT,Minot,America/Chicago\r
HHI,Wahiawa,Pacific/Honolulu\r
MXF,Montgomery,America/Chicago\r
DAL,Dallas,America/Chicago\r
FCS,Fort Carson,America/Denver\r
HLN,Helena,America/Denver\r
NKX,Miramar,America/Los_Angeles\r
LUF,Phoenix,America/Phoenix\r
HHR,Hawthorne,America/Los_Angeles\r
HUL,Houlton,America/New_York\r
END,Enid,America/Chicago\r
NTD,Point Mugu,America/Los_Angeles\r
EDW,Edwards Afb,America/Los_Angeles\r
LCH,Lake Charles,America/Chicago\r
KOA,Kona,Pacific/Honolulu\r
MYR,Myrtle Beach,America/New_York\r
NLC,Lemoore,America/Los_Angeles\r
ACK,Nantucket,America/New_York\r
FAF,Fort Eustis,America/New_York\r
HOP,Hopkinsville,America/Chicago\r
DCA,Washington,America/New_York\r
NHK,Patuxent River,America/New_York\r
PSX,Palacios,America/Chicago\r
BYH,Blytheville,America/Chicago\r
ACY,Atlantic City,America/New_York\r
TIK,Oklahoma City,America/Chicago\r
ECG,Elizabeth City,America/New_York\r
PUB,Pueblo,America/Denver\r
PQI,Presque Isle,America/New_York\r
GRF,Fort Lewis,America/Los_Angeles\r
ADQ,Kodiak,America/Anchorage\r
UPP,Opolu,Pacific/Honolulu\r
FLL,Fort Lauderdale,America/New_York\r
INL,International Falls,America/Chicago\r
SLC,Salt Lake City,America/Denver\r
CDS,Childress,America/Chicago\r
BIX,Biloxi,America/Chicago\r
LSF,Fort Benning,America/New_York\r
NQI,Kingsville,America/Chicago\r
FRI,Fort Riley,America/Chicago\r
MDT,Harrisburg,America/New_York\r
LNK,Lincoln,America/Chicago\r
LAN,Lansing,America/Detroit\r
MUE,Kamuela,Pacific/Honolulu\r
MSS,Massena,America/New_York\r
HKY,Hickory,America/New_York\r
SPG,St. Petersburg,America/New_York\r
FMY,Fort Myers,America/New_York\r
IAH,Houston,America/Chicago\r
ADW,Camp Springs,America/New_York\r
INT,Winston-salem,America/New_York\r
VCV,Victorville,America/Los_Angeles\r
CEW,Crestview,America/Chicago\r
PHN,Port Huron,America/Detroit\r
BFL,Bakersfield,America/Los_Angeles\r
ELP,El Paso,America/Denver\r
HRL,Harlingen,America/Chicago\r
CAE,Columbia,America/New_York\r
DMA,Tucson,America/Phoenix\r
NPA,Pensacola,America/Chicago\r
PNS,Pensacola,America/Chicago\r
RDR,Red River,America/Chicago\r
HOU,Houston,America/Chicago\r
BFK,Buckley,America/Denver\r
ORT,Northway,America/Anchorage\r
PAQ,Palmer,America/Anchorage\r
PIT,Pittsburgh,America/New_York\r
BRW,Barrow,America/Anchorage\r
EFD,Houston,America/Chicago\r
NUW,Whidbey Island,America/Los_Angeles\r
ALI,Alice,America/Chicago\r
VAD,Valdosta,America/New_York\r
MIA,Miami,America/New_York\r
SEA,Seattle,America/Los_Angeles\r
CHA,Chattanooga,America/New_York\r
BDR,Stratford,America/New_York\r
JAN,Jackson,America/Chicago\r
GLS,Galveston,America/Chicago\r
LGB,Long Beach,America/Los_Angeles\r
HDH,Dillingham,Pacific/Honolulu\r
IPT,Williamsport,America/New_York\r
IND,Indianapolis,America/Indiana/Indianapolis\r
SZL,Knobnoster,America/Chicago\r
AKC,Akron,America/New_York\r
GWO,Greenwood,America/Chicago\r
HPN,White Plains,America/New_York\r
FOK,West Hampton Beach,America/New_York\r
JBR,Jonesboro,America/Chicago\r
XSD,Tonopah,America/Los_Angeles\r
LNA,West Palm Beach,America/New_York\r
NZY,San Diego,America/Los_Angeles\r
BIF,El Paso,America/Denver\r
YUM,Yuma,America/Phoenix\r
CNM,Carlsbad,America/Denver\r
DLH,Duluth,America/Chicago\r
BET,Bethel,America/Anchorage\r
LOU,Louisville,America/Kentucky/Louisville\r
FHU,Fort Huachuca,America/Phoenix\r
LIH,Lihue,Pacific/Honolulu\r
HUF,Terre Haute,America/Indiana/Indianapolis\r
HVR,Havre,America/Denver\r
MWH,Grant County Airport,America/Los_Angeles\r
MPV,Montpelier,America/New_York\r
RIC,Richmond,America/New_York\r
SHV,Shreveport,America/Chicago\r
CDV,Cordova,America/Anchorage\r
ORF,Norfolk,America/New_York\r
BPT,Beaumont,America/Chicago\r
SAV,Savannah,America/New_York\r
HIF,Ogden,America/Denver\r
OME,Nome,America/Nome\r
PIE,St. Petersburg,America/New_York\r
MNM,Macon,America/Menominee\r
CXO,Conroe,America/Chicago\r
SCC,Deadhorse,America/Anchorage\r
SAT,San Antonio,America/Chicago\r
ROC,Rochester,America/New_York\r
COF,Coco Beach,America/New_York\r
TEB,Teterboro,America/New_York\r
RCA,Rapid City,America/Denver\r
RDU,Raleigh-durham,America/New_York\r
DAY,Dayton,America/New_York\r
ENA,Kenai,America/Anchorage\r
MLC,Mcalester,America/Chicago\r
IAG,Niagara Falls,America/New_York\r
CFD,Bryan,America/Chicago\r
LIY,Wright,America/New_York\r
PHF,Newport News,America/New_York\r
ESF,Alexandria,America/Chicago\r
LTS,Altus,America/Chicago\r
TUS,Tucson,America/Phoenix\r
MIB,Minot,America/Chicago\r
BAB,Marysville,America/Los_Angeles\r
IKK,Kankakee,America/Chicago\r
GSB,Goldsboro,America/New_York\r
PVD,Providence,America/New_York\r
SBY,Salisbury,America/New_York\r
BUR,Burbank,America/Los_Angeles\r
DTW,Detroit,America/Detroit\r
TPA,Tampa,America/New_York\r
PMB,Pembina,America/Chicago\r
POE,Fort Polk,America/Chicago\r
EIL,Fairbanks,America/Anchorage\r
HIB,Hibbing,America/Chicago\r
LFK,Lufkin,America/Chicago\r
MAF,Midland,America/Chicago\r
GRB,Green Bay,America/Chicago\r
ADM,Ardmore,America/Chicago\r
WRI,Wrightstown,America/New_York\r
AGS,Bush Field,America/New_York\r
ISN,Williston,America/Chicago\r
LIT,Little Rock,America/Chicago\r
SWF,Newburgh,America/New_York\r
BDE,Baudette,America/Chicago\r
SAC,Sacramento,America/Los_Angeles\r
HOM,Homer,America/Anchorage\r
TBN,Fort Leonardwood,America/Chicago\r
MGE,Marietta,America/New_York\r
SKA,Spokane,America/Los_Angeles\r
HTL,Houghton Lake,America/Detroit\r
PAM,Panama City,America/Chicago\r
DFW,Dallas-Fort Worth,America/Chicago\r
MLB,Melbourne,America/New_York\r
TCM,Tacoma,America/Los_Angeles\r
AUS,Austin,America/Chicago\r
LCK,Columbus,America/New_York\r
MQT,Gwinn,America/Detroit\r
TYS,Knoxville,America/New_York\r
HLR,Fort Hood,America/Chicago\r
STL,St. Louis,America/Chicago\r
MIV,Millville,America/New_York\r
SPS,Wichita Falls,America/Chicago\r
LUK,Cincinnati,America/New_York\r
ATL,Atlanta,America/New_York\r
MER,Merced,America/Los_Angeles\r
MCC,Sacramento,America/Los_Angeles\r
GRR,Grand Rapids,America/Detroit\r
INK,Wink,America/Chicago\r
FAT,Fresno,America/Los_Angeles\r
VRB,Vero Beach,America/New_York\r
IPL,Imperial,America/Los_Angeles\r
BNA,Nashville,America/Chicago\r
LRD,Laredo,America/Chicago\r
EDF,Anchorage,America/Anchorage\r
OTZ,Kotzebue,America/Nome\r
AOO,Altoona,America/New_York\r
DYS,Abilene,America/Chicago\r
ELD,El Dorado,America/Chicago\r
LGA,New York,America/New_York\r
TLH,Tallahassee,America/New_York\r
DPA,West Chicago,America/Chicago\r
ACT,Waco,America/Chicago\r
AUG,Augusta,America/New_York\r
NIP,Jacksonville,America/New_York\r
MKL,Jackson,America/Chicago\r
MKK,Molokai,Pacific/Honolulu\r
FTK,Fort Knox,America/New_York\r
SJT,San Angelo,America/Chicago\r
CXL,Calexico,America/Los_Angeles\r
CIC,Chico,America/Los_Angeles\r
BTV,Burlington,America/New_York\r
JAX,Jacksonville,America/New_York\r
DRO,Durango,America/Denver\r
IAD,Washington,America/New_York\r
CLL,College Station,America/Chicago\r
SFF,Spokane,America/Los_Angeles\r
MKE,Milwaukee,America/Chicago\r
ABI,Abilene,America/Chicago\r
COU,Columbia,America/Chicago\r
PDX,Portland,America/Los_Angeles\r
TNT,Miami,America/New_York\r
PBI,West Palm Beach,America/New_York\r
FTW,Fort Worth,America/Chicago\r
OGS,Ogdensburg,America/New_York\r
FMH,Falmouth,America/New_York\r
BFI,Seattle,America/Los_Angeles\r
SKF,San Antonio,America/Chicago\r
HNL,Honolulu,Pacific/Honolulu\r
DSM,Des Moines,America/Chicago\r
EWN,New Bern,America/New_York\r
SAN,San Diego,America/Los_Angeles\r
MLU,Monroe,America/Chicago\r
SSC,Sumter,America/New_York\r
ONT,Ontario,America/Los_Angeles\r
GVT,Greenvile,America/Chicago\r
ROW,Roswell,America/Denver\r
DET,Detroit,America/Detroit\r
BRO,Brownsville,America/Chicago\r
DHN,Dothan,America/Chicago\r
WWD,Wildwood,America/New_York\r
NFL,Fallon,America/Los_Angeles\r
MTC,Mount Clemens,America/Detroit\r
FMN,Farmington,America/Denver\r
CRP,Corpus Christi,America/Chicago\r
SYR,Syracuse,America/New_York\r
NQX,Key West,America/New_York\r
MDW,Chicago,America/Chicago\r
SJC,San Jose,America/Los_Angeles\r
HOB,Hobbs,America/Denver\r
PNE,Philadelphia,America/New_York\r
DEN,Denver,America/Denver\r
PHL,Philadelphia,America/New_York\r
SUX,Sioux City,America/Chicago\r
MCN,Macon,America/New_York\r
TCS,Truth Or Consequences,America/Denver\r
PMD,Palmdale,America/Los_Angeles\r
RND,San Antonio,America/Chicago\r
NJK,El Centro,America/Los_Angeles\r
CMH,Columbus,America/New_York\r
FYV,Fayetteville,America/Chicago\r
FSI,Fort Sill,America/Chicago\r
FFO,Dayton,America/New_York\r
GAL,Galena,America/Anchorage\r
MWL,Mineral Wells,America/Chicago\r
IAB,Wichita,America/Chicago\r
NBG,New Orleans,America/Chicago\r
BFT,Beaufort,America/New_York\r
TXK,Texarkana,America/Chicago\r
PBG,Plattsburgh,America/New_York\r
APG,Aberdeen,America/New_York\r
TCC,Tucumcari,America/Denver\r
ANC,Anchorage,America/Anchorage\r
GRK,Killeen,America/Chicago\r
BLI,Bellingham,America/Los_Angeles\r
NQA,Millington,America/Chicago\r
EKN,Elkins,America/New_York\r
HFD,Hartford,America/New_York\r
SFZ,Smithfield,America/New_York\r
MOB,Mobile,America/Chicago\r
NUQ,Mountain View,America/Los_Angeles\r
SAF,Santa Fe,America/Denver\r
BKH,Barking Sands,Pacific/Honolulu\r
DRI,Deridder,America/Chicago\r
BSF,Bradshaw Field,Pacific/Honolulu\r
OLS,Nogales,America/Phoenix\r
MCF,Tampa,America/New_York\r
BLV,Belleville,America/Chicago\r
OPF,Miami,America/New_York\r
DRT,Del Rio,America/Chicago\r
RSW,Fort Myers,America/New_York\r
AKN,King Salmon,America/Anchorage\r
MUI,Muir,America/New_York\r
JHM,Lahania-kapalua,Pacific/Honolulu\r
JFK,New York,America/New_York\r
HST,Homestead,America/New_York\r
RAL,Riverside,America/Los_Angeles\r
FLV,Fort Leavenworth,America/Chicago\r
WAL,Wallops Island,America/New_York\r
HMN,Alamogordo,America/Denver\r
NXX,Willow Grove,America/New_York\r
CYS,Cheyenne,America/Denver\r
SCK,Stockton,America/Los_Angeles\r
CHS,Charleston,America/New_York\r
RNO,Reno,America/Los_Angeles\r
KTN,Ketchikan,America/Sitka\r
YIP,Detroit,America/Detroit\r
VBG,Lompoc,America/Los_Angeles\r
BHM,Birmingham,America/Chicago\r
NEL,Lakehurst,America/New_York\r
SYA,Shemya,America/Adak\r
LSV,Las Vegas,America/Los_Angeles\r
RIV,Riverside,America/Los_Angeles\r
MOD,Modesto,America/Los_Angeles\r
SMF,Sacramento,America/Los_Angeles\r
UGN,Chicago,America/Chicago\r
COS,Colorado Springs,America/Denver\r
BUF,Buffalo,America/New_York\r
SKY,Sandusky,America/New_York\r
PAE,Everett,America/Los_Angeles\r
MUO,Mountain Home,America/Boise\r
CDC,Cedar City,America/Denver\r
BDL,Windsor Locks,America/New_York\r
MFE,Mcallen,America/Chicago\r
NGU,Norfolk,America/New_York\r
CEF,Chicopee Falls,America/New_York\r
LBB,Lubbock,America/Chicago\r
ORD,Chicago,America/Chicago\r
BCT,Boca Raton,America/New_York\r
FAI,Fairbanks,America/Anchorage\r
CVS,Clovis,America/Denver\r
NGF,Kaneohe Bay,Pacific/Honolulu\r
OFF,Omaha,America/Chicago\r
GKN,Gulkana,America/Anchorage\r
ART,Watertown,America/New_York\r
PSP,Palm Springs,America/Los_Angeles\r
AMA,Amarillo,America/Chicago\r
FOD,Fort Dodge,America/Chicago\r
BAD,Shreveport,America/Chicago\r
FOE,Topeka,America/Chicago\r
COT,Cotulla,America/Chicago\r
ILM,Wilmington,America/New_York\r
BTR,Baton Rouge,America/Chicago\r
TYR,Tyler,America/Chicago\r
BWI,Baltimore,America/New_York\r
HBR,Hobart,America/Chicago\r
LNY,Lanai,Pacific/Honolulu\r
AEX,Alexandria,America/Chicago\r
WSD,White Sands,America/Denver\r
CDB,Cold Bay,America/Nome\r
TUL,Tulsa,America/Chicago\r
SIT,Sitka,America/Sitka\r
ISP,Islip,America/New_York\r
MSP,Minneapolis,America/Chicago\r
ILG,Wilmington,America/New_York\r
DUT,Unalaska,America/Nome\r
MSY,New Orleans,America/Chicago\r
PWM,Portland,America/New_York\r
OKC,Oklahoma City,America/Chicago\r
ALB,Albany,America/New_York\r
VDZ,Valdez,America/Anchorage\r
LFI,Hampton,America/New_York\r
SNA,Santa Ana,America/Los_Angeles\r
CBM,Colombus,America/Chicago\r
TMB,Kendall-tamiami,America/New_York\r
NTU,Oceana,America/New_York\r
GUS,Peru,America/Indiana/Indianapolis\r
CPR,Casper,America/Denver\r
VPS,Valparaiso,America/Chicago\r
SEM,Selma,America/Chicago\r
EYW,Key West,America/New_York\r
CLT,Charlotte,America/New_York\r
LAS,Las Vegas,America/Los_Angeles\r
MCO,Orlando,America/New_York\r
FLO,Florence,America/New_York\r
GTF,Great Falls,America/Denver\r
YNG,Youngstown,America/New_York\r
FBK,Fort Wainwright,America/Anchorage\r
WRB,Macon,America/New_York\r
BKK,Bangkok,Asia/Bangkok\r
NAH,Naha,Asia/Makassar\r
MXB,Masamba,Asia/Makassar\r
SQR,Soroako,Asia/Makassar\r
TTR,Makale,Asia/Makassar\r
KDI,Kendari,Asia/Makassar\r
SBG,Sabang,Asia/Jakarta\r
TSY,Tasikmalaya,Asia/Jakarta\r
MLG,Malang,Asia/Jakarta\r
BDO,Bandung,Asia/Jakarta\r
CBN,Cirebon,Asia/Jakarta\r
JOG,Yogyakarta,Asia/Jakarta\r
CXP,Cilacap,Asia/Jakarta\r
PCB,Jakarta,Asia/Jakarta\r
SRG,Semarang,Asia/Jakarta\r
BTH,Batam,Asia/Jakarta\r
TJQ,Tanjung Pandan,Asia/Jakarta\r
PGK,Pangkal Pinang,Asia/Jakarta\r
TNJ,Tanjung Pinang,Asia/Jakarta\r
SIQ,Singkep,Asia/Jakarta\r
BDJ,Banjarmasin,Asia/Makassar\r
BTW,Batu Licin,Asia/Makassar\r
PKN,Pangkalan Bun,Asia/Pontianak\r
PKY,Palangkaraya,Asia/Pontianak\r
MOF,Maumere,Asia/Makassar\r
ENE,Ende,Asia/Makassar\r
RTG,Ruteng,Asia/Makassar\r
KOE,Kupang,Asia/Makassar\r
LBJ,Labuhan Bajo,Asia/Makassar\r
BPN,Balikpapan,Asia/Makassar\r
TRK,Taraken,Asia/Makassar\r
SRI,Samarinda,Asia/Makassar\r
TSX,Tanjung Santan,Asia/Makassar\r
AMI,Mataram,Asia/Makassar\r
BMU,Bima,Asia/Makassar\r
WGP,Waingapu,Asia/Makassar\r
SUB,Surabaya,Asia/Jakarta\r
SOC,Solo City,Asia/Jakarta\r
ICN,Seoul,Asia/Seoul\r
CNX,Chiang Mai,Asia/Bangkok\r
CEI,Chiang Rai,Asia/Bangkok\r
NST,Nakhon Si Thammarat,Asia/Bangkok\r
NAK,Nakhon Ratchasima,Asia/Bangkok\r
KOP,Nakhon Phanom,Asia/Bangkok\r
UBP,Ubon Ratchathani,Asia/Bangkok\r
KKC,Khon Kaen,Asia/Bangkok\r
THS,Sukhothai,Asia/Bangkok\r
DPS,Denpasar,Asia/Makassar\r
ATH,Athens,Europe/Athens\r
NGO,Nagoya,Asia/Tokyo\r
UKB,Kobe,Asia/Tokyo\r
PUW,Pullman,America/Los_Angeles\r
LWS,Lewiston,America/Los_Angeles\r
ELM,Elmira,America/New_York\r
ITH,Ithaca,America/New_York\r
MRY,Monterey,America/Los_Angeles\r
SBA,Santa Barbara,America/Los_Angeles\r
DAB,Daytona Beach,America/New_York\r
LPX,Liepaja,Europe/Riga\r
RIX,Riga,Europe/Riga\r
SQQ,Siauliai,Europe/Vilnius\r
HLJ,Barysiai,Europe/Vilnius\r
KUN,Kaunas,Europe/Vilnius\r
PLQ,Palanga,Europe/Vilnius\r
VNO,Vilnius,Europe/Vilnius\r
PNV,Panevezys,Europe/Vilnius\r
EVN,Yerevan,Asia/Yerevan\r
LWN,Gyumri,Asia/Yerevan\r
ASA,Assab,Africa/Asmara\r
ASM,Asmara,Africa/Asmara\r
MSW,Massawa,Africa/Asmara\r
GZA,Gaza,Asia/Gaza\r
BUS,Batumi,Asia/Tbilisi\r
KUT,Kutaisi,Asia/Tbilisi\r
TBS,Tbilisi,Asia/Tbilisi\r
RIY,Mukalla,Asia/Aden\r
TAI,Taiz,Asia/Aden\r
HOD,Hodeidah,Asia/Aden\r
ADE,Aden,Asia/Aden\r
AXK,Ataq,Asia/Aden\r
AAY,Al Ghaidah Intl,Asia/Aden\r
SAH,Sanaa,Asia/Aden\r
BHN,Beihan,Asia/Aden\r
SCT,Socotra,Asia/Aden\r
FMM,Memmingen,Europe/Berlin\r
NAV,Nevsehir,Europe/Istanbul\r
EZE,Buenos Aires,America/Argentina/Buenos_Aires\r
EBL,Erbil,Asia/Baghdad\r
EMD,Emerald,Australia/Brisbane\r
HEW,Athens,Europe/Athens\r
KIX,Osaka,Asia/Tokyo\r
JRB,New York,America/New_York\r
TAG,Tagbilaran,Asia/Manila\r
JAV,Ilulissat,America/Nuuk\r
JCH,Qasigiannguit,America/Nuuk\r
JEG,Aasiaat,America/Nuuk\r
PMI,Palma de Mallorca,Europe/Madrid\r
DRW,Darwin,Australia/Darwin\r
URT,Surat Thani,Asia/Bangkok\r
TKA,Talkeetna,America/Anchorage\r
GZM,Gozo,Europe/Malta\r
HVN,New Haven,America/New_York\r
AVL,Asheville,America/New_York\r
GSO,Greensboro,America/New_York\r
FSD,Sioux Falls,America/Chicago\r
AYQ,Uluru,Australia/Darwin\r
MHT,Manchester NH,America/New_York\r
APF,Naples,America/New_York\r
RDN,Redang,Asia/Kuala_Lumpur\r
SDF,Louisville,America/Kentucky/Louisville\r
CHO,Charlottesville VA,America/New_York\r
ROA,Roanoke VA,America/New_York\r
LEX,Lexington KY,America/New_York\r
EVV,Evansville,America/Chicago\r
ABQ,Albuquerque,America/Denver\r
BZN,Bozeman,America/Denver\r
BIL,Billings,America/Denver\r
BTM,Butte,America/Denver\r
TVC,Traverse City,America/Detroit\r
FRS,Flores,America/Guatemala\r
BHB,Bar Harbor,America/New_York\r
RKD,Rockland,America/New_York\r
JAC,Jacksn Hole,America/Denver\r
RFD,Rockford,America/Chicago\r
DME,Moscow,Europe/Moscow\r
SYX,Sanya,Asia/Shanghai\r
MFN,Milford Sound,Pacific/Auckland\r
LJG,Lijiang,Asia/Shanghai\r
GSP,Greenville,America/New_York\r
BMI,Bloomington,America/Chicago\r
GPT,Gulfport,America/Chicago\r
AZO,Kalamazoo,America/Detroit\r
TOL,Toledo,America/New_York\r
FWA,Fort Wayne,America/Indiana/Indianapolis\r
DEC,Decatur,America/Chicago\r
CID,Cedar Rapids,America/Chicago\r
LSE,La Crosse,America/Chicago\r
CWA,Wassau,America/Chicago\r
PIA,Peoria,America/Chicago\r
ATW,Appleton,America/Chicago\r
RST,Rochester,America/Chicago\r
CMI,Champaign,America/Chicago\r
MHK,Manhattan,America/Chicago\r
KGC,Kingscote,Australia/Adelaide\r
HVB,Hervey Bay,Australia/Brisbane\r
DLU,Dali,Asia/Shanghai\r
MZV,Mulu,Asia/Kuching\r
SSH,Sharm El Sheikh,Africa/Cairo\r
FKL,Franklin,America/New_York\r
NBO,Nairobi,Africa/Nairobi\r
SEU,Seronera,Africa/Dar_es_Salaam\r
FTE,El Calafate,America/Argentina/Rio_Gallegos\r
ARM,Armidale,Australia/Sydney\r
GJT,Grand Junction,America/Denver\r
SGU,Saint George,America/Denver\r
DWH,Houston,America/Chicago\r
SRQ,Sarasota,America/New_York\r
BDA,Bermuda,Atlantic/Bermuda\r
VNY,Van Nuys,America/Los_Angeles\r
MLI,Moline,America/Chicago\r
PFN,Panama City,America/Chicago\r
HIR,Honiara,Pacific/Guadalcanal\r
PPT,Papeete,Pacific/Tahiti\r
INU,Nauru,Pacific/Nauru\r
FUN,Funafuti,Pacific/Funafuti\r
OVB,Novosibirsk,Asia/Novosibirsk\r
XKH,Phon Savan,Asia/Vientiane\r
BIS,Bismarck,America/Chicago\r
TEX,Telluride,America/Denver\r
HGN,Mae Hong Son,Asia/Bangkok\r
RAP,Rapid City,America/Denver\r
CLD,Carlsbad,America/Los_Angeles\r
FNT,Flint,America/Detroit\r
DVO,Davao,Asia/Manila\r
FNC,Funchal,Atlantic/Madeira\r
STM,Santarem,America/Santarem\r
KOS,Sihanoukville,Asia/Phnom_Penh\r
YOA,Ekati,America/Edmonton\r
NPE,NAPIER,Pacific/Auckland\r
LEV,Levuka,Pacific/Fiji\r
LXA,Lhasa,Asia/Shanghai\r
RDD,Redding,America/Los_Angeles\r
EUG,Eugene,America/Los_Angeles\r
IDA,Idaho Falls,America/Boise\r
MFR,Medford,America/Los_Angeles\r
KBZ,Kaikoura,Pacific/Auckland\r
RDM,Redmond-Bend,America/Los_Angeles\r
PCN,Picton,Pacific/Auckland\r
WDH,Windhoek,Africa/Windhoek\r
YWH,Victoria,America/Vancouver\r
TNA,Jinan,Asia/Shanghai\r
CZX,Changzhou,Asia/Shanghai\r
YBP,Yibin,Asia/Shanghai\r
TJM,Tyumen,Asia/Yekaterinburg\r
CAK,Akron,America/New_York\r
HSV,Huntsville,America/Chicago\r
PKB,PARKERSBURG,America/New_York\r
MGM,MONTGOMERY,America/Chicago\r
TRI,BRISTOL,America/New_York\r
PAH,PADUCAH,America/Chicago\r
JIB,Djibouti,Africa/Djibouti\r
HAK,Haikou,Asia/Shanghai\r
MFA,Mafia Island,Africa/Dar_es_Salaam\r
PGA,Page,America/Phoenix\r
UII,Utila,America/Tegucigalpa\r
FCA,Kalispell,America/Denver\r
MBS,Saginaw,America/Detroit\r
BGM,Binghamton,America/New_York\r
BGW,Baghdad,Asia/Baghdad\r
NNT,Nan,Asia/Bangkok\r
ROI,Roi Et,Asia/Bangkok\r
BFV,Buri Ram,Asia/Bangkok\r
TDX,Trat,Asia/Bangkok\r
BLH,Blythe,America/Los_Angeles\r
IQA,Al Asad,Asia/Baghdad\r
TQD,Al Taqaddum,Asia/Baghdad\r
XQC,Al Bakr,Asia/Baghdad\r
CRK,Angeles City,Asia/Manila\r
SDK,Sandakan,Asia/Kuching\r
LXG,Luang Namtha,Asia/Vientiane\r
ODY,Muang Xay,Asia/Vientiane\r
SHE,Shenyang,Asia/Shanghai\r
DOY,Dongying,Asia/Shanghai\r
MNI,Geralds,America/Montserrat\r
PSG,Petersburg,America/Sitka\r
LYA,Luoyang,Asia/Shanghai\r
XUZ,Xuzhou,Asia/Shanghai\r
MWQ,Magwe,Asia/Yangon\r
KHM,Khamti,Asia/Yangon\r
DLI,Dalat,Asia/Ho_Chi_Minh\r
VDH,Dong Hoi,Asia/Bangkok\r
VKG,Rach Gia,Asia/Ho_Chi_Minh\r
CAH,Ca Mau,Asia/Ho_Chi_Minh\r
VCL,Chu Lai,Asia/Ho_Chi_Minh\r
TBB,Tuy Hoa,Asia/Ho_Chi_Minh\r
PYY,Pai,Asia/Bangkok\r
BWK,Brac,Europe/Zagreb\r
NSI,Yaounde,Africa/Douala\r
CKY,Conakry,Africa/Conakry\r
AAH,Aachen,Europe/Berlin\r
FKB,Karlsruhe/Baden-Baden,Europe/Berlin\r
SFB,Sanford,America/New_York\r
JST,Johnstown,America/New_York\r
LUA,Lukla,Asia/Kathmandu\r
BHP,Bhojpur,Asia/Kathmandu\r
LDN,Lamidanda,Asia/Kathmandu\r
JMO,Jomsom,Asia/Kathmandu\r
NGX,Manang,Asia/Kathmandu\r
PPL,Phaplu,Asia/Kathmandu\r
RUM,Rumjatar,Asia/Kathmandu\r
DNP,Dang,Asia/Kathmandu\r
RUK,Rukumkot,Asia/Kathmandu\r
JUM,Jumla,Asia/Kathmandu\r
TPJ,Taplejung,Asia/Kathmandu\r
TMI,Tumling Tar,Asia/Kathmandu\r
SKH,Surkhet,Asia/Kathmandu\r
IMK,Simikot,Asia/Kathmandu\r
DOP,Dolpa,Asia/Kathmandu\r
BJH,Bajhang,Asia/Kathmandu\r
DHI,Dhangarhi,Asia/Kathmandu\r
MWX,Muan,Asia/Seoul\r
JTY,Astypalaia,Europe/Athens\r
JIK,Ikaria,Europe/Athens\r
JKL,Kalymnos,Europe/Athens\r
MLO,Milos,Europe/Athens\r
JNX,Cyclades Islands,Europe/Athens\r
PAS,Paros,Europe/Athens\r
KZS,Kastelorizo,Europe/Athens\r
RMF,Marsa Alam,Africa/Cairo\r
NRN,Weeze,Europe/Berlin\r
USU,Busuanga,Asia/Manila\r
BXU,Butuan,Asia/Manila\r
DPL,Dipolog,Asia/Manila\r
LAO,Laoag,Asia/Manila\r
LGP,Legazpi,Asia/Manila\r
OZC,Ozamis,Asia/Manila\r
CEB,Cebu,Asia/Manila\r
NOD,Norden,Europe/Berlin\r
JUI,Juist,Europe/Berlin\r
BPS,Porto Seguro,America/Bahia\r
QIG,Iguatu,America/Fortaleza\r
PMW,Palmas,America/Araguaina\r
CLV,Caldas Novas,America/Sao_Paulo\r
MSO,Missoula,America/Denver\r
BKQ,Blackall,Australia/Brisbane\r
BDB,Bundaberg,Australia/Brisbane\r
GCN,Grand Canyon,America/Phoenix\r
SGR,Sugar Land,America/Chicago\r
APA,Denver,America/Denver\r
CVN,Clovis,America/Denver\r
FST,Fort Stockton,America/Chicago\r
LVS,Las Vegas,America/Denver\r
IWS,Houston,America/Chicago\r
LRU,Las Cruces,America/Denver\r
BKD,Breckenridge,America/Chicago\r
TPL,Temple,America/Chicago\r
OZA,Ozona,America/Chicago\r
KDM,Kaadedhdhoo,Indian/Maldives\r
LAK,Aklavik,America/Inuvik\r
YWJ,Deline,America/Inuvik\r
ZFN,Tulita,America/Inuvik\r
YGH,Fort Good Hope,America/Inuvik\r
TAH,Tanna,Pacific/Efate\r
YPC,Paulatuk,America/Inuvik\r
SRZ,Santa Cruz,America/La_Paz\r
SAB,Saba,America/Kralendijk\r
EGE,Vail,America/Denver\r
SKN,Stokmarknes,Europe/Oslo\r
CGF,Richmond Heights,America/New_York\r
MFD,Mansfield,America/New_York\r
CSG,Columbus,America/New_York\r
LAW,Lawton,America/Chicago\r
FNL,Fort Collins,America/Denver\r
FLG,Flagstaff,America/Phoenix\r
TVL,South Lake Tahoe,America/Los_Angeles\r
TWF,Twin Falls,America/Boise\r
MVY,Vineyard Haven MA,America/New_York\r
CON,Concord NH,America/New_York\r
GON,Groton CT,America/New_York\r
STC,Saint Cloud,America/Chicago\r
BPE,Bagan,Asia/Shanghai\r
GTR,Columbus Mississippi,America/Chicago\r
GOJ,Nizhniy Novgorod,Europe/Moscow\r
HQM,Hoquiam,America/Los_Angeles\r
ERI,Erie,America/New_York\r
HYA,Barnstable,America/New_York\r
SPR,San Pedro,America/Belize\r
SDX,Sedona,America/Phoenix\r
MGW,Morgantown,America/New_York\r
CRW,Charleston,America/New_York\r
AVP,Scranton,America/New_York\r
BJI,Bemidji,America/Chicago\r
THG,Biloela,Australia/Brisbane\r
FGI,Apia,Pacific/Apia\r
BNK,Ballina Byron Bay,Australia/Sydney\r
FAR,Fargo,America/Chicago\r
MKC,Kansas City,America/Chicago\r
RBE,Ratanakiri,Asia/Phnom_Penh\r
GCC,Gillette,America/Denver\r
TOF,Tomsk,Asia/Tomsk\r
NZJ,Santa Ana,America/Los_Angeles\r
PHY,Phetchabun,Asia/Bangkok\r
CJM,Chumphon,Asia/Bangkok\r
JZH,Jiuzhaigou,Asia/Shanghai\r
SWA,Shantou,Asia/Shanghai\r
GEO,Georgetown,America/Guyana\r
AGT,Ciudad del Este,America/Asuncion\r
OGL,Georgetown,America/Guyana\r
KAI,Kaieteur,America/Guyana\r
DNH,Dunhuang,Asia/Shanghai\r
AOI,Ancona,Europe/Rome\r
TCP,Taba,Africa/Cairo\r
LYB,Little Cayman,America/Cayman\r
BJV,Bodrum,Europe/Istanbul\r
TBJ,Tabarka,Africa/Tunis\r
SAW,Istanbul,Europe/Istanbul\r
SCE,State College Pennsylvania,America/New_York\r
BME,Broome,Australia/Perth\r
NTL,Newcastle,Australia/Sydney\r
KLU,Klagenfurt,Europe/Vienna\r
HFT,Hammerfest,Europe/Oslo\r
HVG,Honningsvag,Europe/Oslo\r
MEH,Mehamn,Europe/Oslo\r
VDS,Vads,Europe/Oslo\r
IKA,Tehran,Asia/Tehran\r
MHD,Mashhad,Asia/Tehran\r
UIK,Ust Ilimsk,Asia/Irkutsk\r
MEI,Meridian,America/Chicago\r
SPI,Springfield,America/Chicago\r
CEZ,Cortez,America/Denver\r
HDN,Hayden,America/Denver\r
GUP,Gallup,America/Denver\r
LBL,Liberal,America/Chicago\r
LAA,Lamar,America/Denver\r
GLD,Goodland,America/Denver\r
COD,Cody,America/Denver\r
HOV,Orsta-Volda,Europe/Oslo\r
ISC,ST MARY\\'S,Europe/London\r
SGF,Springfield,America/Chicago\r
NVK,Narvik,Europe/Oslo\r
BVG,Berlevag,Europe/Oslo\r
FBU,Oslo,Europe/Oslo\r
NSK,Norilsk,Asia/Krasnoyarsk\r
AAQ,Anapa,Europe/Moscow\r
JLN,Joplin,America/Chicago\r
ABE,Allentown,America/New_York\r
XNA,Bentonville,America/Chicago\r
GUW,Atyrau,Asia/Atyrau\r
KZO,Kzyl-Orda,Asia/Qyzylorda\r
SBN,South Bend,America/Indiana/Indianapolis\r
BKA,Moscow,Europe/Moscow\r
ARH,Arkhangelsk,Europe/Moscow\r
RTW,Saratov,Europe/Saratov\r
NUX,Novy Urengoy,Asia/Yekaterinburg\r
NOJ,Noyabrsk,Asia/Yekaterinburg\r
SCO,Aktau,Asia/Aqtau\r
UCT,Ukhta,Europe/Moscow\r
USK,Usinsk,Europe/Moscow\r
PEX,Pechora,Europe/Moscow\r
NNM,Naryan-Mar,Europe/Moscow\r
PKV,Pskov,Europe/Moscow\r
KGP,Kogalym,Asia/Yekaterinburg\r
KJA,Krasnoyarsk,Asia/Krasnoyarsk\r
KGF,Karaganda,Asia/Almaty\r
URJ,Uraj,Asia/Yekaterinburg\r
IWA,Ivanovo,Europe/Moscow\r
CGQ,Changchun,Asia/Shanghai\r
KIJ,Niigata,Asia/Tokyo\r
JON,Johnston Island,Pacific/Honolulu\r
SMD,Fort Wayne IN,America/Indiana/Indianapolis\r
ACV,Arcata CA,America/Los_Angeles\r
OAJ,Jacksonville NC,America/New_York\r
TCL,Tuscaloosa AL,America/Chicago\r
DBQ,Dubuque IA,America/Chicago\r
HHP,Hong Kong,Asia/Hong_Kong\r
ATD,Atoifi,Pacific/Guadalcanal\r
AKS,Auki,Pacific/Guadalcanal\r
BAS,Ballalae,Pacific/Guadalcanal\r
FRE,Fera Island,Pacific/Guadalcanal\r
MBU,Mbambanakira,Pacific/Guadalcanal\r
IRA,Kirakira,Pacific/Guadalcanal\r
SCZ,Santa Cruz/Graciosa Bay/Luova,Pacific/Guadalcanal\r
MUA,Munda,Pacific/Guadalcanal\r
GZO,Gizo,Pacific/Guadalcanal\r
MNY,Stirling Island,Pacific/Guadalcanal\r
RNL,Rennell Island,Pacific/Guadalcanal\r
RUS,Marau,Pacific/Guadalcanal\r
VAO,Suavanao,Pacific/Guadalcanal\r
KGE,Kagau Island,Pacific/Guadalcanal\r
RBV,Ramata,Pacific/Guadalcanal\r
BUA,Buka Island,Pacific/Bougainville\r
CMU,Kundiawa,Pacific/Port_Moresby\r
DAU,Daru,Pacific/Port_Moresby\r
GUR,Gurney,Pacific/Port_Moresby\r
PNP,Girua,Pacific/Port_Moresby\r
HKN,Hoskins,Pacific/Port_Moresby\r
UNG,Kiunga,Pacific/Port_Moresby\r
KRI,Kikori,Pacific/Port_Moresby\r
KMA,Kerema,Pacific/Port_Moresby\r
KVG,Kavieng,Pacific/Port_Moresby\r
MDU,Mendi,Pacific/Port_Moresby\r
MAS,Momote,Pacific/Port_Moresby\r
MXH,Moro,Pacific/Port_Moresby\r
MIS,Misima Island,Pacific/Port_Moresby\r
TIZ,Tari,Pacific/Port_Moresby\r
TBG,Tabubil,Pacific/Port_Moresby\r
RAB,Tokua,Pacific/Port_Moresby\r
VAI,Vanimo,Pacific/Port_Moresby\r
WBM,Wapenamanda,Pacific/Port_Moresby\r
LLU,Alluitsup Paa,America/Nuuk\r
CNP,Neerlerit Inaat,America/Scoresbysund\r
JFR,Paamiut,America/Nuuk\r
JGO,Qeqertarsuaq Airport,America/Nuuk\r
JJU,Qaqortoq,America/Nuuk\r
JSU,Maniitsoq,America/Nuuk\r
JNN,Nanortalik,America/Nuuk\r
JNS,Narsaq,America/Nuuk\r
NAQ,Qaanaaq,America/Thule\r
JHS,Sisimiut,America/Nuuk\r
JUV,Upernavik,America/Nuuk\r
JQA,Uummannaq,America/Nuuk\r
GRY,Grmsey,Atlantic/Reykjavik\r
THO,Thorshofn,Atlantic/Reykjavik\r
VPN,Vopnafjrur,Atlantic/Reykjavik\r
YWS,Whistler,America/Vancouver\r
YAA,Anahim Lake,America/Vancouver\r
YWM,Williams Harbour,America/St_Johns\r
YFX,St. Lewis,America/St_Johns\r
YHA,Port Hope Simpson,America/St_Johns\r
YRG,Rigolet,America/Goose_Bay\r
YCK,Colville Lake,America/Inuvik\r
YLE,What,America/Edmonton\r
SUR,Summer Beaver,America/Toronto\r
YAX,Angling Lake,America/Winnipeg\r
WNN,Wunnumin Lake,America/Winnipeg\r
YNO,North Spirit Lake,America/Winnipeg\r
XBE,Bearskin Lake,America/Winnipeg\r
KIF,Kingfisher Lake,America/Winnipeg\r
YOG,Ogoki Post,America/Toronto\r
YHP,Poplar Hill,America/Winnipeg\r
YKU,Chisasibi,America/Toronto\r
ZTB,Tte--la-Baleine,America/Blanc-Sablon\r
ZLT,La Tabatire,America/Blanc-Sablon\r
YAC,Cat Lake,America/Winnipeg\r
YAG,Fort Frances,America/Winnipeg\r
XKS,Kasabonika,America/Winnipeg\r
YKG,Kangirsuk,America/Toronto\r
YAT,Attawapiskat,America/Toronto\r
YBE,Uranium City,America/Regina\r
YBX,Lourdes-De-Blanc-Sablon,America/Blanc-Sablon\r
YRF,Cartwright,America/Goose_Bay\r
YCS,Chesterfield Inlet,America/Rankin_Inlet\r
YDP,Nain,America/Goose_Bay\r
YER,Fort Severn,America/Toronto\r
YFA,Fort Albany,America/Toronto\r
YFH,Fort Hope,America/Toronto\r
YMN,Makkovik,America/Goose_Bay\r
YGB,Texada,America/Vancouver\r
YGO,Gods Lake Narrows,America/Winnipeg\r
YGT,Igloolik,America/Iqaluit\r
YGW,Kuujjuarapik,America/Toronto\r
YGX,Gillam,America/Winnipeg\r
YGZ,Grise Fiord,America/Iqaluit\r
YQC,Quaqtaq,America/Toronto\r
CXH,Vancouver,America/Vancouver\r
YNS,Nemiscau,America/Toronto\r
YHO,Hopedale,America/Goose_Bay\r
YHR,Chevery,America/Blanc-Sablon\r
YIK,Ivujivik,America/Toronto\r
YIV,Island Lake,America/Winnipeg\r
AKV,Akulivik,America/Toronto\r
YKQ,Waskaganish,America/Toronto\r
YPJ,Aupaluk,America/Toronto\r
YLC,Kimmirut,America/Iqaluit\r
YLH,Lansdowne House,America/Toronto\r
XGR,Kangiqsualujjuaq,America/Toronto\r
YMH,Mary's Harbour,America/St_Johns\r
YMT,Chibougamau,America/Toronto\r
YUD,Umiujaq,America/Toronto\r
YNC,Wemindji,America/Toronto\r
YNE,Norway House,America/Winnipeg\r
YNL,Points North Landing,America/Regina\r
YOH,Oxford House,America/Winnipeg\r
YPH,Inukjuak,America/Toronto\r
YPM,Pikangikum,America/Winnipeg\r
YPO,Peawanuck,America/Toronto\r
YPW,Powell River,America/Vancouver\r
YQD,The Pas,America/Winnipeg\r
YQN,Nakina,America/Toronto\r
YRA,Gamti,America/Edmonton\r
YRL,Red Lake,America/Winnipeg\r
YSF,Stony Rapids,America/Regina\r
YSK,Sanikiluaq,America/Iqaluit\r
YST,St. Theresa Point,America/Winnipeg\r
YTL,Big Trout Lake,America/Winnipeg\r
YVZ,Deer Lake,America/Winnipeg\r
YWP,Webequie,America/Toronto\r
YXN,Whale Cove,America/Rankin_Inlet\r
YZG,Salluit,America/Toronto\r
ZAC,York Landing,America/Winnipeg\r
ILF,Ilford,America/Winnipeg\r
ZBF,Bathurst,America/Moncton\r
ZEM,Eastmain River,America/Toronto\r
ZFD,Fond-Du-Lac,America/Regina\r
ZGI,Gods River,America/Winnipeg\r
ZJN,Swan River,America/Winnipeg\r
ZKE,Kashechewan,America/Toronto\r
MSA,Muskrat Dam,America/Winnipeg\r
ZMT,Masset,America/Vancouver\r
ZPB,Sachigo Lake,America/Winnipeg\r
ZRJ,Round Lake,America/Winnipeg\r
ZSJ,Sandy Lake,America/Winnipeg\r
ZTM,Shamattawa,America/Winnipeg\r
ZUM,Churchill Falls,America/Goose_Bay\r
ZWL,Wollaston Lake,America/Regina\r
BLJ,Batna,Africa/Algiers\r
CBH,Bchar,Africa/Algiers\r
BMW,Bordj Badji Mokhtar,Africa/Algiers\r
ELU,Guemar,Africa/Algiers\r
KMS,Kumasi,Africa/Accra\r
HDF,Heringsdorf,Europe/Berlin\r
HEI,Bsum,Europe/Berlin\r
HGL,Helgoland,Europe/Berlin\r
SJY,Seinjoki / Ilmajoki,Europe/Helsinki\r
NQT,Nottingham,Europe/London\r
DSA,"Doncaster, Sheffield",Europe/London\r
CAL,Campbeltown,Europe/London\r
EOI,Eday,Europe/London\r
FIE,Fair Isle,Europe/London\r
NRL,North Ronaldsay,Europe/London\r
PPW,Papa Westray,Europe/London\r
SOY,Stronsay,Europe/London\r
NDY,Sanday,Europe/London\r
LWK,Lerwick,Europe/London\r
WRY,Westray,Europe/London\r
LEQ,Land's End,Europe/London\r
PZE,Penzance,Europe/London\r
VLY,Angelsey,Europe/London\r
BRR,Barra,Europe/London\r
CFN,Dongloe,Europe/Dublin\r
CNL,Sindal,Europe/Copenhagen\r
LKN,Leknes,Europe/Oslo\r
OSY,Namsos,Europe/Oslo\r
MQN,Mo i Rana,Europe/Oslo\r
RVK,Rrvik,Europe/Oslo\r
RET,Rst,Europe/Oslo\r
SDN,Sandane,Europe/Oslo\r
SOG,Sogndal,Europe/Oslo\r
SVJ,Svolvr,Europe/Oslo\r
SOJ,Sorkjosen,Europe/Oslo\r
VAW,Vard,Europe/Oslo\r
VRY,Vry,Europe/Oslo\r
BZG,Bydgoszcz,Europe/Warsaw\r
LCJ,Lodz,Europe/Warsaw\r
OSD,stersund,Europe/Stockholm\r
HFS,Hagfors,Europe/Stockholm\r
KSD,Karlstad,Europe/Stockholm\r
TYF,Torsby,Europe/Stockholm\r
AGH,ngelholm,Europe/Stockholm\r
SQO,Mohed,Europe/Stockholm\r
HMV,Hemavan,Europe/Stockholm\r
VNT,Ventspils,Europe/Riga\r
QRA,Johannesburg,Africa/Johannesburg\r
MQP,Mpumalanga,Africa/Johannesburg\r
AAM,Malamala,Africa/Johannesburg\r
MBD,Mafeking,Africa/Johannesburg\r
GNZ,Ghanzi,Africa/Gaborone\r
ORP,Orapa,Africa/Gaborone\r
SWX,Shakawe,Africa/Gaborone\r
TLD,Tuli Lodge,Africa/Gaborone\r
DIS,Loubomo,Africa/Brazzaville\r
CIP,Chipata,Africa/Lusaka\r
YVA,Moroni,Indian/Comoro\r
WAQ,Antsalova,Indian/Antananarivo\r
JVA,Ankavandra,Indian/Antananarivo\r
BMD,Belo sur Tsiribihina,Indian/Antananarivo\r
MXT,Maintirano,Indian/Antananarivo\r
TVA,Morafenobe,Indian/Antananarivo\r
WTA,Tambohorano,Indian/Antananarivo\r
WTS,Tsiroanomandidy,Indian/Antananarivo\r
WAM,Ambatondrazaka,Indian/Antananarivo\r
WPB,Port Berg,Indian/Antananarivo\r
DWB,Soalala,Indian/Antananarivo\r
WMP,Mampikony,Indian/Antananarivo\r
WMA,Mandritsara,Indian/Antananarivo\r
MJA,Manja,Indian/Antananarivo\r
CBT,Catumbela,Africa/Luanda\r
DUE,Dundo,Africa/Luanda\r
VPE,Ondjiva,Africa/Luanda\r
MSZ,Mocamedes,Africa/Luanda\r
KOU,Koulamoutou,Africa/Libreville\r
MJL,Mouila,Africa/Libreville\r
TCH,Tchibanga,Africa/Libreville\r
VPY,Chimoio,Africa/Maputo\r
SRH,Sarh,Africa/Ndjamena\r
CMK,Club Makokola,Africa/Blantyre\r
LUD,Luderitz,Africa/Windhoek\r
OND,Ondangwa,Africa/Windhoek\r
OMD,Oranjemund,Africa/Windhoek\r
SWP,Swakopmund,Africa/Windhoek\r
ERS,Windhoek,Africa/Windhoek\r
BOA,Boma,Africa/Kinshasa\r
MAT,Matadi,Africa/Kinshasa\r
INO,Inongo,Africa/Kinshasa\r
NIO,Nioki,Africa/Kinshasa\r
KRZ,Kiri,Africa/Kinshasa\r
BSU,Basankusu,Africa/Kinshasa\r
TSH,Tshikapa,Africa/Lubumbashi\r
LJA,Lodja,Africa/Lubumbashi\r
PFR,Ilebo,Africa/Lubumbashi\r
OUK,Outer Skerries,Europe/London\r
GMZ,La Gomera,Atlantic/Canary\r
BTE,Bonthe,Africa/Freetown\r
KBS,Bo,Africa/Freetown\r
KEN,Kenema,Africa/Freetown\r
OXB,Bissau,Africa/Bissau\r
SMW,Smara,Africa/El_Aaiun\r
VIL,Dakhla,Africa/El_Aaiun\r
ESU,Essadouira,Africa/Casablanca\r
EUN,El Aain,Africa/El_Aaiun\r
NDR,El Aroui,Africa/Casablanca\r
RAI,"Praia, Santiago Island",Atlantic/Cape_Verde\r
SFL,"Sao Filipe, Fogo Island",Atlantic/Cape_Verde\r
BCO,Baco,Africa/Addis_Ababa\r
BEI,Beica,Africa/Addis_Ababa\r
DSE,Dessie,Africa/Addis_Ababa\r
DEM,Dembidollo,Africa/Addis_Ababa\r
GDE,Gode,Africa/Addis_Ababa\r
GOR,Gore,Africa/Addis_Ababa\r
ABK,Kabri Dehar,Africa/Addis_Ababa\r
MTF,Mizan Teferi,Africa/Addis_Ababa\r
TIE,Tippi,Africa/Addis_Ababa\r
ALU,Alula,Africa/Mogadishu\r
BSA,Bosaso,Africa/Mogadishu\r
MGQ,Mogadishu,Africa/Mogadishu\r
GLK,Galcaio,Africa/Mogadishu\r
BUO,Burao,Africa/Mogadishu\r
AAC,El Arish,Africa/Cairo\r
ATZ,Asyut,Africa/Cairo\r
ASV,Amboseli National Park,Africa/Nairobi\r
LKG,Lokichoggio,Africa/Nairobi\r
MYD,Malindi,Africa/Nairobi\r
NYK,Nanyuki,Africa/Nairobi\r
SRX,Sirt,Africa/Tripoli\r
TOB,Tobruk,Africa/Tripoli\r
MJI,Tripoli,Africa/Tripoli\r
LAQ,Al Bayda',Africa/Tripoli\r
ATB,Atbara,Africa/Khartoum\r
UYL,Nyala,Africa/Khartoum\r
PZU,Port Sudan,Africa/Khartoum\r
BKZ,Bukoba,Africa/Dar_es_Salaam\r
TKQ,Kigoma,Africa/Dar_es_Salaam\r
LDI,Lindi,Africa/Dar_es_Salaam\r
MUZ,Musoma,Africa/Dar_es_Salaam\r
SHY,Shinyanga,Africa/Dar_es_Salaam\r
TBO,Tabora,Africa/Dar_es_Salaam\r
RUA,Arua,Africa/Kampala\r
ULU,Gulu,Africa/Kampala\r
DIU,Diu,Asia/Kolkata\r
ABR,Aberdeen,America/Chicago\r
ABY,Albany,America/New_York\r
AHN,Athens,America/New_York\r
ALM,Alamogordo,America/Denver\r
ALO,Waterloo,America/Chicago\r
ALW,Walla Walla,America/Los_Angeles\r
APN,Alpena,America/Detroit\r
ATY,Watertown,America/Chicago\r
BFD,Bradford,America/New_York\r
BFF,Scottsbluff,America/Denver\r
BKW,Beckley,America/New_York\r
BQK,Brunswick,America/New_York\r
BRL,Burlington,America/Chicago\r
CEC,Crescent City,America/Los_Angeles\r
CGI,Cape Girardeau,America/Chicago\r
CIU,Sault Ste Marie,America/Detroit\r
CKB,Clarksburg,America/New_York\r
CLM,Port Angeles,America/Los_Angeles\r
CMX,Hancock,America/Detroit\r
DDC,Dodge City,America/Chicago\r
DUJ,Du Bois,America/New_York\r
EAU,Eau Claire,America/Chicago\r
EKO,Elko,America/Los_Angeles\r
EWB,New Bedford,America/New_York\r
FAY,Fayetteville,America/New_York\r
GGW,Glasgow,America/Denver\r
GRI,Grand Island,America/Chicago\r
HOT,Hot Springs,America/Chicago\r
HTS,Huntington,America/New_York\r
KIO,Kili Island,Pacific/Majuro\r
IRK,Kirksville,America/Chicago\r
JMS,Jamestown,America/Chicago\r
LAR,Laramie,America/Denver\r
LBE,Latrobe,America/New_York\r
LBF,North Platte,America/Chicago\r
LEB,Lebanon,America/New_York\r
LMT,Klamath Falls,America/Los_Angeles\r
LNS,Lancaster,America/New_York\r
LWT,Lewistown,America/Denver\r
LYH,Lynchburg,America/New_York\r
MKG,Muskegon,America/Detroit\r
MLS,Miles City,America/Denver\r
MSL,Muscle Shoals,America/Chicago\r
OTH,North Bend,America/Los_Angeles\r
OWB,Owensboro,America/Chicago\r
PIB,Hattiesburg/Laurel,America/Chicago\r
PIH,Pocatello,America/Boise\r
PIR,Pierre,America/Chicago\r
PLN,Pellston,America/Detroit\r
PSM,Portsmouth,America/New_York\r
RDG,Reading,America/New_York\r
RHI,Rhinelander,America/Chicago\r
RKS,Rock Springs,America/Denver\r
RUT,Rutland,America/New_York\r
SBP,San Luis Obispo,America/Los_Angeles\r
SHR,Sheridan,America/Denver\r
SLK,Saranac Lake,America/New_York\r
SLN,Salina,America/Chicago\r
SMX,Santa Maria,America/Los_Angeles\r
TUP,Tupelo,America/Chicago\r
UIN,Quincy,America/Chicago\r
VCT,Victoria,America/Chicago\r
VLD,Valdosta,America/New_York\r
WRL,Worland,America/Denver\r
YKM,Yakima,America/Los_Angeles\r
ECN,Nicosia,Asia/Famagusta\r
RJL,Logroo-Agoncillo,Europe/Madrid\r
IDY,le d'Yeu,Europe/Paris\r
ANE,Angers/Marc,Europe/Paris\r
LTT,La Mle,Europe/Paris\r
JSY,Syros Island,Europe/Athens\r
PEV,Pcs-Pogny,Europe/Budapest\r
SOB,Srmellk,Europe/Budapest\r
AOT,Aosta,Europe/Rome\r
QSR,Salerno,Europe/Rome\r
CVU,Corvo,Atlantic/Azores\r
BNX,Banja Luka,Europe/Sarajevo\r
USQ,Usak,Europe/Istanbul\r
KSY,Kars,Europe/Istanbul\r
SFQ,Sanliurfa,Europe/Istanbul\r
KCM,Kahramanmaras,Europe/Istanbul\r
AJI,Agri,Europe/Istanbul\r
ADF,Adiyaman,Europe/Istanbul\r
ISE,Isparta,Europe/Istanbul\r
EDO,Balikesir Korfez,Europe/Istanbul\r
SZF,Samsun,Europe/Istanbul\r
ILZ,ilina,Europe/Bratislava\r
GDT,Cockburn Town,America/Grand_Turk\r
MDS,Middle Caicos,America/Grand_Turk\r
SLX,Salt Cay,America/Grand_Turk\r
AZS,Samana,America/Santo_Domingo\r
JBQ,La Isabela,America/Santo_Domingo\r
PBR,Puerto Barrios,America/Guatemala\r
AAZ,Quezaltenango,America/Guatemala\r
UTK,Utirik Island,Pacific/Majuro\r
AHS,Ahuas,America/Tegucigalpa\r
PEU,Puerto Lempira,America/Tegucigalpa\r
MIJ,Mili Island,Pacific/Majuro\r
CYW,Celaya,America/Mexico_City\r
CUA,Ciudad Constitucin,America/Mazatlan\r
GUB,Guerrero Negro,America/Tijuana\r
JAL,Jalapa,America/Mexico_City\r
CTD,Chitr,America/Panama\r
ONX,Coln,America/Panama\r
JQE,Jaqu,America/Panama\r
PLP,La Palma,America/Panama\r
TTQ,Roxana,America/Costa_Rica\r
BCL,Pococi,America/Costa_Rica\r
PBP,Nandayure,America/Costa_Rica\r
PJM,Puerto Jimenez,America/Costa_Rica\r
SYQ,San Jose,America/Costa_Rica\r
JEE,Jeremie,America/Port-au-Prince\r
PAX,Port-de-Paix,America/Port-au-Prince\r
TND,Trinidad,America/Havana\r
COX,Andros,America/Nassau\r
ATC,Arthur's Town,America/Nassau\r
TBI,Cat Island,America/Nassau\r
CRI,Colonel Hill,America/Nassau\r
PID,Nassau,America/Nassau\r
AIU,Atiu Island,Pacific/Rarotonga\r
MGS,Mangaia Island,Pacific/Rarotonga\r
MHX,Manihiki Island,Pacific/Rarotonga\r
MUK,Mauke Island,Pacific/Rarotonga\r
MOI,Mitiaro Island,Pacific/Rarotonga\r
PYE,Penrhyn Island,Pacific/Rarotonga\r
ICI,Cicia,Pacific/Fiji\r
PTF,Malolo Lailai Island,Pacific/Fiji\r
KDV,Vunisea,Pacific/Fiji\r
MNF,Mana Island,Pacific/Fiji\r
MFJ,Moala,Pacific/Fiji\r
NGI,Ngau,Pacific/Fiji\r
LKB,Lakeba Island,Pacific/Fiji\r
LBS,Lambasa,Pacific/Fiji\r
TVU,Matei,Pacific/Fiji\r
KXF,Koro Island,Pacific/Fiji\r
RTA,Rotuma,Pacific/Fiji\r
SVU,Savusavu,Pacific/Fiji\r
EUA,Eua Island,Pacific/Tongatapu\r
HPA,Lifuka,Pacific/Tongatapu\r
NFO,"Angaha, Niuafo'ou Island",Pacific/Tongatapu\r
NTT,Niuatoputapu,Pacific/Tongatapu\r
VBV,Vanua Balavu,Pacific/Fiji\r
IUE,Alofi,Pacific/Niue\r
FUT,Futuna Island,Pacific/Wallis\r
MXS,Savaii Island,Pacific/Apia\r
APK,Apataki,Pacific/Tahiti\r
AHE,Ahe,Pacific/Tahiti\r
AUQ,Hiva-oa,Pacific/Marquesas\r
UAP,Ua Pou,Pacific/Marquesas\r
UAH,Ua Huka,Pacific/Marquesas\r
MTV,Ablow,Pacific/Efate\r
SLH,Sola,Pacific/Efate\r
TOH,Loh/Linua,Pacific/Efate\r
EAE,Sangafa,Pacific/Efate\r
CCV,Craig Cove,Pacific/Efate\r
LOD,Longana,Pacific/Efate\r
SSR,Pentecost Island,Pacific/Efate\r
PBJ,Paama Island,Pacific/Efate\r
LPM,Lamap,Pacific/Efate\r
LNB,Lamen Bay,Pacific/Efate\r
MWF,Maewo Island,Pacific/Efate\r
LNE,Lonorore,Pacific/Efate\r
NUS,Norsup,Pacific/Efate\r
ZGU,Gaua Island,Pacific/Efate\r
RCL,Redcliffe,Pacific/Efate\r
SON,Santo,Pacific/Efate\r
TGH,Tongoa Island,Pacific/Efate\r
ULB,Ambryn Island,Pacific/Efate\r
VLS,Valesdir,Pacific/Efate\r
SWJ,Malekula Island,Pacific/Efate\r
OLJ,Olpoi,Pacific/Efate\r
AUY,Anelghowhat,Pacific/Efate\r
AWD,Aniwa,Pacific/Efate\r
DLY,Dillon's Bay,Pacific/Efate\r
FTA,Futuna Island,Pacific/Efate\r
IPA,Ipota,Pacific/Efate\r
TGJ,Tiga,Pacific/Noumea\r
BMY,Waala,Pacific/Noumea\r
ILP,le des Pins,Pacific/Noumea\r
FBD,Faizabad,Asia/Kabul\r
AJF,Al-Jawf,Asia/Riyadh\r
WAE,Wadi-al-dawasir,Asia/Riyadh\r
KHD,Khorram Abad,Asia/Tehran\r
BXR,Bam,Asia/Tehran\r
RJN,Rafsanjan,Asia/Tehran\r
BJB,Bojnourd,Asia/Tehran\r
AFZ,Sabzevar,Asia/Tehran\r
NSH,Noshahr,Asia/Tehran\r
SRY,Dasht-e-naz,Asia/Tehran\r
LRR,Lar,Asia/Tehran\r
ADU,Ardabil,Asia/Tehran\r
OMH,Uromiyeh,Asia/Tehran\r
AAN,Al Ain,Asia/Dubai\r
BNP,Bannu,Asia/Karachi\r
BHV,Bahawalpur,Asia/Karachi\r
CJL,Chitral,Asia/Karachi\r
DBA,Dalbandin,Asia/Karachi\r
DEA,Dera Ghazi Khan,Asia/Karachi\r
DSK,Dera Ismael Khan,Asia/Karachi\r
JIW,Jiwani,Asia/Karachi\r
HDD,Hyderabad,Asia/Karachi\r
KDD,Khuzdar,Asia/Karachi\r
ORW,Ormara Raik,Asia/Karachi\r
PAJ,Parachinar,Asia/Karachi\r
KDU,Skardu,Asia/Karachi\r
SYW,Sehwan Sharif,Asia/Karachi\r
TUK,Turbat,Asia/Karachi\r
ISU,Sulaymaniyah,Asia/Baghdad\r
KAC,Kamishly,Asia/Damascus\r
GXF,Sayun Intl,Asia/Aden\r
ADK,Adak Island,America/Adak\r
GST,Gustavus,America/Juneau\r
SGY,Skagway,America/Juneau\r
HCR,Holy Cross,America/Anchorage\r
HNS,Haines,America/Juneau\r
KLG,Kalskag,America/Anchorage\r
MCG,Mcgrath,America/Anchorage\r
MOU,Mountain Village,America/Nome\r
ANI,Aniak,America/Anchorage\r
VAK,Chevak,America/Nome\r
WRG,Wrangell,America/Sitka\r
OPU,Balimo,Pacific/Port_Moresby\r
VMU,Baimuru,Pacific/Port_Moresby\r
LUP,Molokai,Pacific/Honolulu\r
ENT,Eniwetok Atoll,Pacific/Majuro\r
LZN,Matsu Islands,Asia/Taipei\r
HCN,Hengchun,Asia/Taipei\r
MFK,Matsu Islands,Asia/Taipei\r
KUH,Kushiro,Asia/Tokyo\r
OKD,Sapporo,Asia/Tokyo\r
HSG,Saga,Asia/Tokyo\r
NKM,Nagoya,Asia/Tokyo\r
IWJ,Iwami,Asia/Tokyo\r
FKS,Fukushima,Asia/Tokyo\r
ONJ,Odate Noshiro,Asia/Tokyo\r
SYO,Shonai,Asia/Tokyo\r
MYE,Miyakejima,Asia/Tokyo\r
KUV,Kunsan,Asia/Seoul\r
MPK,Mokpo,Asia/Seoul\r
WJU,Wonju,Asia/Seoul\r
YNY,Sokcho / Gangneung,Asia/Seoul\r
HIN,Sacheon,Asia/Seoul\r
CJJ,Chongju,Asia/Seoul\r
SFS,Olongapo City,Asia/Manila\r
CYU,Cuyo,Asia/Manila\r
CGM,Camiguin,Asia/Manila\r
JOL,Jolo,Asia/Manila\r
TWT,Sanga Sanga,Asia/Manila\r
SUG,Sangley Point,Asia/Manila\r
TDG,Tandag,Asia/Manila\r
WNP,Naga,Asia/Manila\r
BSO,Basco,Asia/Manila\r
SFE,San Fernando,Asia/Manila\r
TUG,Tuguegarao,Asia/Manila\r
VRC,Virac,Asia/Manila\r
CYP,Calbayog City,Asia/Manila\r
CRM,Catarman,Asia/Manila\r
MBT,Masbate,Asia/Manila\r
RXS,Roxas City,Asia/Manila\r
TTG,Tartagal,America/Argentina/Salta\r
LHS,Las Heras,America/Argentina/Rio_Gallegos\r
OES,San Antonio Oeste,America/Argentina/Salta\r
ING,El Calafate,America/Argentina/Rio_Gallegos\r
GGS,Gobernador Gregores,America/Argentina/Rio_Gallegos\r
SST,Santa Teresita,America/Argentina/Buenos_Aires\r
NEC,Necochea,America/Argentina/Buenos_Aires\r
JDO,Juazeiro Do Norte,America/Fortaleza\r
LEC,Lenis,America/Bahia\r
MEA,Maca,America/Sao_Paulo\r
MII,Marlia,America/Sao_Paulo\r
VDC,Vitria Da Conquista,America/Bahia\r
RIA,Santa Maria,America/Sao_Paulo\r
TOW,Toledo,America/Sao_Paulo\r
ESR,El Salvador,America/Santiago\r
ZPC,Pucon,America/Santiago\r
SOD,Sorocaba,America/Sao_Paulo\r
SCY,San Cristbal,Pacific/Galapagos\r
LOH,La Toma (Catamayo),America/Guayaquil\r
ESM,Esmeraldas,America/Guayaquil\r
PSY,Stanley,Atlantic/Stanley\r
CRC,Cartago,America/Bogota\r
LQM,Puerto Leguzamo,America/Bogota\r
LPD,La Pedrera,America/Bogota\r
NQU,Nuqu,America/Bogota\r
PDA,Puerto Inrida,America/Bogota\r
EYP,Yopal,America/Bogota\r
GYA,Guayaramern,America/La_Paz\r
PUR,Puerto Rico/Manuripi,America/La_Paz\r
RIB,Riberalta,America/La_Paz\r
REY,Reyes,America/La_Paz\r
SRJ,San Borja,America/La_Paz\r
ORG,Paramaribo,America/Paramaribo\r
MVS,Mucuri,America/Bahia\r
CJA,Cajamarca,America/Lima\r
HUU,Hunuco,America/Lima\r
NZC,Nazca,America/Lima\r
SRA,Santa Rosa,America/Sao_Paulo\r
MYC,Maracay,America/Caracas\r
VIG,El Viga,America/Caracas\r
JPR,Ji-Paran,America/Porto_Velho\r
BBQ,Codrington,America/Antigua\r
DSD,Grande Anse,America/Guadeloupe\r
BBR,Basse Terre,America/Guadeloupe\r
SFC,St-Franois,America/Guadeloupe\r
GBJ,Grand Bourg,America/Guadeloupe\r
NEV,Charlestown,America/St_Kitts\r
VIJ,Spanish Town,America/Tortola\r
BQU,Bequia,America/St_Vincent\r
UNI,Union Island,America/St_Vincent\r
KOV,Kokshetau,Asia/Almaty\r
PPK,Petropavlosk,Asia/Almaty\r
DZN,Zhezkazgan,Asia/Almaty\r
UKK,Ust Kamenogorsk,Asia/Almaty\r
KSN,Kostanay,Asia/Qostanay\r
KVD,Ganja,Asia/Baku\r
NAJ,Nakhchivan,Asia/Baku\r
NER,Neryungri,Asia/Yakutsk\r
PYJ,Yakutia,Asia/Yakutsk\r
CKH,Chokurdah,Asia/Srednekolymsk\r
CYX,Cherskiy,Asia/Srednekolymsk\r
IKS,Tiksi,Asia/Yakutsk\r
KXK,Komsomolsk-on-Amur,Asia/Vladivostok\r
DYR,Anadyr,Asia/Anadyr\r
OHO,Okhotsk,Asia/Vladivostok\r
UJE,Ujae Atoll,Pacific/Majuro\r
MPW,Mariupol International,Europe/Kyiv\r
VSG,Lugansk,Europe/Kyiv\r
OZH,Zaporozhye,Europe/Kyiv\r
KWG,Krivoy Rog,Europe/Kyiv\r
HRK,Kharkov,Europe/Kyiv\r
IFO,Ivano-Frankivsk,Europe/Kyiv\r
CWC,Chernovtsk,Europe/Kyiv\r
RWN,Rivne,Europe/Kyiv\r
UDJ,Uzhgorod,Europe/Kyiv\r
CSH,Solovetsky Islands,Europe/Moscow\r
CEE,Cherepovets,Europe/Moscow\r
AMV,Amderma,Europe/Moscow\r
KSZ,Kotlas,Europe/Moscow\r
PES,Petrozavodsk,Europe/Moscow\r
GNA,Hrodna,Europe/Minsk\r
MVQ,Mogilev,Europe/Minsk\r
EIE,Yeniseysk,Asia/Krasnoyarsk\r
KYZ,Kyzyl,Asia/Krasnoyarsk\r
NOZ,Novokuznetsk,Asia/Novokuznetsk\r
HTG,Khatanga,Asia/Krasnoyarsk\r
IAA,Igarka,Asia/Krasnoyarsk\r
NAL,Nalchik,Europe/Moscow\r
OGZ,Beslan,Europe/Moscow\r
ESL,Elista,Europe/Moscow\r
WKK,Aleknagik,America/Anchorage\r
BLF,Bluefield,America/New_York\r
GLH,Greenville,America/Chicago\r
PSC,Pasco,America/Los_Angeles\r
KQA,Akutan,America/Nome\r
LPS,Lopez,America/Los_Angeles\r
SLY,Salekhard,Asia/Yekaterinburg\r
HMA,Khanty-Mansiysk,Asia/Yekaterinburg\r
NYA,Nyagan,Asia/Yekaterinburg\r
OVS,Sovetskiy,Asia/Yekaterinburg\r
IJK,Izhevsk,Europe/Samara\r
KVX,Kirov,Europe/Kirov\r
NYM,Nadym,Asia/Yekaterinburg\r
RAT,Raduzhnyi,Asia/Yekaterinburg\r
NFG,Nefteyugansk,Asia/Yekaterinburg\r
KRO,Kurgan,Asia/Yekaterinburg\r
LBD,Khudzhand,Asia/Dushanbe\r
AZN,Andizhan,Asia/Tashkent\r
FEG,Fergana,Asia/Tashkent\r
NMA,Namangan,Asia/Tashkent\r
NCU,Nukus,Asia/Samarkand\r
UGC,Urgench,Asia/Samarkand\r
KSQ,Khanabad,Asia/Samarkand\r
TMJ,Termez,Asia/Samarkand\r
RYB,Rybinsk,Europe/Moscow\r
EGO,Belgorod,Europe/Moscow\r
URS,Kursk,Europe/Moscow\r
LPK,Lipetsk,Europe/Moscow\r
VKT,Vorkuta,Europe/Moscow\r
UUA,Bugulma,Europe/Moscow\r
JOK,Yoshkar-Ola,Europe/Moscow\r
CSY,Cheboksary,Europe/Moscow\r
ULY,Ulyanovsk,Europe/Ulyanovsk\r
OSW,Orsk,Asia/Yekaterinburg\r
PEZ,Penza,Europe/Moscow\r
SKX,Saransk,Europe/Moscow\r
BWO,Balakovo,Europe/Saratov\r
HBX,Hubli,Asia/Kolkata\r
KCT,Koggala,Asia/Colombo\r
WRZ,Wirawila,Asia/Colombo\r
BBM,Battambang,Asia/Phnom_Penh\r
SHL,Shillong,Asia/Kolkata\r
GAU,Guwahati,Asia/Kolkata\r
DMU,Dimapur,Asia/Kolkata\r
TEZ,Tezpur,Asia/Kolkata\r
BZL,Barisal,Asia/Dhaka\r
HOE,Huay Xai,Asia/Vientiane\r
BHR,Bharatpur,Asia/Kathmandu\r
BDP,Chandragarhi,Asia/Kathmandu\r
MEY,Meghauli,Asia/Kathmandu\r
KEP,Nepalgunj,Asia/Kathmandu\r
GAN,Gan Island,Indian/Maldives\r
HAQ,Haa Dhaalu Atoll,Indian/Maldives\r
KDO,Laamu Atoll,Indian/Maldives\r
MAQ,Tak,Asia/Bangkok\r
BMV,Buonmethuot,Asia/Ho_Chi_Minh\r
HPH,Haiphong,Asia/Bangkok\r
CXR,Nha Trang,Asia/Ho_Chi_Minh\r
VCS,Conson,Asia/Ho_Chi_Minh\r
VCA,Can Tho,Asia/Ho_Chi_Minh\r
DIN,Dienbienphu,Asia/Bangkok\r
UIH,Phucat,Asia/Ho_Chi_Minh\r
PXU,Pleiku,Asia/Ho_Chi_Minh\r
VII,Vinh,Asia/Bangkok\r
BMO,Banmaw,Asia/Yangon\r
TVY,Dawei,Asia/Yangon\r
KAW,Kawthoung,Asia/Yangon\r
LIW,Loikaw,Asia/Yangon\r
MNU,Mawlamyine,Asia/Yangon\r
BSX,Pathein,Asia/Yangon\r
PKK,Pakhokku,Asia/Yangon\r
SWQ,Sumbawa Island,Asia/Makassar\r
TMC,Waikabubak-Sumba Island,Asia/Makassar\r
BUI,Bokondini-Papua Island,Asia/Jayapura\r
SEH,Senggeh-Papua Island,Asia/Jayapura\r
TJS,Tanjung Selor-Borneo Island,Asia/Makassar\r
DTD,Datadawai-Borneo Island,Asia/Makassar\r
BEJ,Tanjung Redep-Borneo Island,Asia/Makassar\r
TJG,Tanjung-Borneo Island,Asia/Makassar\r
SMQ,Sampit-Borneo Island,Asia/Pontianak\r
LUV,Langgur-Kei Islands,Asia/Jayapura\r
ARD,Alor Island,Asia/Makassar\r
BLG,Belaga,Asia/Kuching\r
LGL,Long Datih,Asia/Kuching\r
ODN,Long Seridan,Asia/Kuching\r
MKM,Mukah,Asia/Kuching\r
BKM,Bakalalan,Asia/Kuching\r
LWY,Lawas,Asia/Kuching\r
BBN,Bario,Asia/Kuching\r
TMG,Tomanggong,Asia/Kuching\r
KUD,Kudat,Asia/Kuching\r
TKG,Bandar Lampung-Sumatra Island,Asia/Jakarta\r
HLP,Jakarta,Asia/Jakarta\r
NTX,Ranai-Natuna Besar Island,Asia/Jakarta\r
PSU,Putussibau-Borneo Island,Asia/Pontianak\r
SQG,Sintang-Borneo Island,Asia/Pontianak\r
PDO,Talang Gudang-Sumatra Island,Asia/Jakarta\r
LSW,Lhok Seumawe-Sumatra Island,Asia/Jakarta\r
PKG,Pangkor Island,Asia/Kuala_Lumpur\r
LBW,Long Bawan-Borneo Island,Asia/Makassar\r
NNX,Nunukan-Nunukan Island,Asia/Makassar\r
LPU,Long Apung-Borneo Island,Asia/Makassar\r
ALH,Albany,Australia/Perth\r
GYL,Argyle,Australia/Perth\r
AUU,Aurukun,Australia/Brisbane\r
BCI,Barcaldine,Australia/Brisbane\r
BDD,Badu Island,Australia/Brisbane\r
BVI,Birdsville,Australia/Brisbane\r
BHQ,Broken Hill,Australia/Broken_Hill\r
HTI,Hamilton Island,Australia/Lindeman\r
BEU,Bedourie,Australia/Brisbane\r
BRK,Bourke,Australia/Sydney\r
BUC,Burketown,Australia/Brisbane\r
GIC,Boigu,Australia/Brisbane\r
OKY,Oakey,Australia/Brisbane\r
BQL,Boulia,Australia/Brisbane\r
BHS,Bathurst,Australia/Sydney\r
BLT,Blackwater,Australia/Brisbane\r
CVQ,Carnarvon,Australia/Perth\r
CAZ,Cobar,Australia/Sydney\r
CPD,Coober Pedy,Australia/Adelaide\r
CNC,Coconut Island,Australia/Brisbane\r
CNJ,Cloncurry,Australia/Brisbane\r
CED,Ceduna,Australia/Adelaide\r
CTN,Cooktown,Australia/Brisbane\r
CMA,Cunnamulla,Australia/Brisbane\r
CNB,Coonamble,Australia/Sydney\r
CUQ,Coen,Australia/Brisbane\r
OOM,Cooma,Australia/Sydney\r
DMD,Doomadgee,Australia/Brisbane\r
NLF,Darnley Island,Australia/Brisbane\r
DPO,Devonport,Australia/Hobart\r
ELC,Elcho Island,Australia/Darwin\r
EPR,Esperance,Australia/Perth\r
FLS,Flinders Island,Australia/Hobart\r
GET,Geraldton,Australia/Perth\r
GLT,Gladstone,Australia/Brisbane\r
GTE,Groote Eylandt,Australia/Darwin\r
GFF,Griffith,Australia/Sydney\r
HID,Horn Island,Australia/Brisbane\r
HOK,Hooker Creek,Australia/Darwin\r
MHU,Mount Hotham,Australia/Melbourne\r
HGD,Hughenden,Australia/Brisbane\r
JCK,Julia Creek,Australia/Brisbane\r
KAX,Kalbarri,Australia/Perth\r
KNS,King Island,Australia/Hobart\r
KFG,Kalkgurung,Australia/Darwin\r
KRB,Karumba,Australia/Brisbane\r
KWM,Kowanyama,Australia/Brisbane\r
KUG,Kubin,Australia/Brisbane\r
LNO,Leonora,Australia/Perth\r
LEL,Lake Evella,Australia/Darwin\r
LDH,Lord Howe Island,Australia/Lord_Howe\r
IRG,Lockhart River,Australia/Brisbane\r
LSY,Lismore,Australia/Sydney\r
LHG,Lightning Ridge,Australia/Sydney\r
LRE,Longreach,Australia/Brisbane\r
LER,Leinster,Australia/Perth\r
LVO,Laverton,Australia/Perth\r
UBB,Mabuiag Island,Australia/Brisbane\r
MKR,Meekatharra,Australia/Perth\r
MIM,Merimbula,Australia/Sydney\r
MGT,Milingimbi,Australia/Darwin\r
MNG,Maningrida,Australia/Darwin\r
MCV,McArthur River Mine,Australia/Darwin\r
MQL,Mildura,Australia/Melbourne\r
MMG,Mount Magnet,Australia/Perth\r
MRZ,Moree,Australia/Sydney\r
MOV,Moranbah,Australia/Brisbane\r
MYA,Moruya,Australia/Sydney\r
MGB,Mount Gambier,Australia/Adelaide\r
ONG,Mornington Island,Australia/Brisbane\r
MYI,Murray Island,Australia/Brisbane\r
MBH,Maryborough,Australia/Brisbane\r
NRA,Narrandera,Australia/Sydney\r
NAA,Narrabri,Australia/Sydney\r
NTN,Normanton,Australia/Brisbane\r
ZNE,Newman,Australia/Perth\r
OLP,Olympic Dam,Australia/Adelaide\r
PUG,Argyle,Australia/Adelaide\r
PMK,Palm Island,Australia/Brisbane\r
PBO,Paraburdoo,Australia/Perth\r
CCK,Cocos Keeling Island,Indian/Cocos\r
GOV,Gove,Australia/Darwin\r
PKE,Parkes,Australia/Sydney\r
PLO,Port Lincoln,Australia/Adelaide\r
EDR,Pormpuraaw,Australia/Brisbane\r
PQQ,Port Macquarie,Australia/Sydney\r
PTJ,Portland,Australia/Melbourne\r
ULP,Quilpie,Australia/Brisbane\r
RAM,Ramingining,Australia/Darwin\r
RMA,Roma,Australia/Brisbane\r
SGO,St George,Australia/Brisbane\r
MJK,Shark Bay,Australia/Perth\r
SBR,Saibai Island,Australia/Brisbane\r
SRN,Strahan,Australia/Hobart\r
XTG,Thargomindah,Australia/Brisbane\r
TCA,Tennant Creek,Australia/Darwin\r
VCD,Victoria River Downs,Australia/Darwin\r
SYU,Sue Islet,Australia/Brisbane\r
WNR,Windorah,Australia/Brisbane\r
WYA,Whyalla,Australia/Adelaide\r
WUN,Wiluna,Australia/Perth\r
WOL,Wollongong,Australia/Sydney\r
WIN,Winton,Australia/Brisbane\r
BWT,Burnie,Australia/Hobart\r
OKR,Yorke Island,Australia/Brisbane\r
XMY,Yam Island,Australia/Brisbane\r
NAY,Beijing,Asia/Shanghai\r
CIF,Chifeng,Asia/Shanghai\r
CIH,Changzhi,Asia/Shanghai\r
DAT,Datong,Asia/Shanghai\r
HET,Hohhot,Asia/Shanghai\r
BAV,Baotou,Asia/Shanghai\r
SJW,Shijiazhuang,Asia/Shanghai\r
TGO,Tongliao,Asia/Shanghai\r
HLH,Ulanhot,Asia/Shanghai\r
XIL,Xilinhot,Asia/Shanghai\r
BHY,Beihai,Asia/Shanghai\r
CGD,Changde,Asia/Shanghai\r
DYG,Dayong,Asia/Shanghai\r
MXZ,Meixian,Asia/Shanghai\r
ZUH,Zhuhai,Asia/Shanghai\r
LZH,Liuzhou,Asia/Shanghai\r
ZHA,Zhanjiang,Asia/Shanghai\r
ENH,Enshi,Asia/Shanghai\r
NNY,Nanyang,Asia/Shanghai\r
XFN,Xiangfan,Asia/Shanghai\r
YIH,Yichang,Asia/Shanghai\r
AKA,Ankang,Asia/Shanghai\r
GOQ,Golmud,Asia/Shanghai\r
HZG,Hanzhong,Asia/Shanghai\r
IQN,Qingyang,Asia/Shanghai\r
XNN,Xining,Asia/Shanghai\r
ENY,Yan'an,Asia/Shanghai\r
UYN,Yulin,Asia/Shanghai\r
AVK,Arvaikheer,Asia/Ulaanbaatar\r
LTI,Altai,Asia/Ulaanbaatar\r
BYN,Bayankhongor,Asia/Ulaanbaatar\r
DLZ,Dalanzadgad,Asia/Ulaanbaatar\r
HVD,Khovd,Asia/Hovd\r
MXV,Muren,Asia/Ulaanbaatar\r
DIG,Shangri-La,Asia/Shanghai\r
LUM,Luxi,Asia/Shanghai\r
SYM,Simao,Asia/Shanghai\r
ZAT,Zhaotong,Asia/Shanghai\r
KOW,Ganzhou,Asia/Shanghai\r
JDZ,Jingdezhen,Asia/Shanghai\r
JIU,Jiujiang,Asia/Shanghai\r
JUZ,Quzhou,Asia/Shanghai\r
LYG,Lianyungang,Asia/Shanghai\r
HYN,Huangyan,Asia/Shanghai\r
LYI,Linyi,Asia/Shanghai\r
JJN,Quanzhou,Asia/Shanghai\r
TXN,Huangshan,Asia/Shanghai\r
WEF,Weifang,Asia/Shanghai\r
WEH,Weihai,Asia/Shanghai\r
WUX,Wuxi,Asia/Shanghai\r
WUS,Wuyishan,Asia/Shanghai\r
WNZ,Wenzhou,Asia/Shanghai\r
YNZ,Yancheng,Asia/Shanghai\r
YIW,Yiwu,Asia/Shanghai\r
HSN,Zhoushan,Asia/Shanghai\r
BPX,Bangda,Asia/Shanghai\r
DAX,Dazhou,Asia/Shanghai\r
GYS,Guangyuan,Asia/Shanghai\r
LZO,Luzhou,Asia/Shanghai\r
MIG,Mianyang,Asia/Shanghai\r
NAO,Nanchong,Asia/Shanghai\r
LZY,Nyingchi,Asia/Shanghai\r
WXN,Wanxian,Asia/Shanghai\r
AKU,Aksu,Asia/Urumqi\r
IQM,Qiemo,Asia/Urumqi\r
KCA,Kuqa,Asia/Urumqi\r
KRL,Korla,Asia/Urumqi\r
KRY,Karamay,Asia/Urumqi\r
YIN,Yining,Asia/Urumqi\r
HEK,Heihe,Asia/Shanghai\r
JMU,Jiamusi,Asia/Shanghai\r
JNZ,Jinzhou,Asia/Shanghai\r
NDG,Qiqihar,Asia/Shanghai\r
YNJ,Yanji,Asia/Shanghai\r
WKL,Waikoloa Village,Pacific/Honolulu\r
WME,Mount Keith,Australia/Perth\r
LRV,Los Roques,America/Caracas\r
IOR,Inis Mor,Europe/Dublin\r
NNR,Indreabhan,Europe/Dublin\r
GTI,Ruegen,Europe/Berlin\r
EZV,Berezovo,Asia/Yekaterinburg\r
ORH,Worcester,America/New_York\r
AQG,Anqing,Asia/Shanghai\r
SHP,Qinhuangdao,Asia/Shanghai\r
YCU,Yuncheng,Asia/Shanghai\r
JGN,Jiayuguan,Asia/Shanghai\r
DDG,Dandong,Asia/Shanghai\r
DSN,Dongsheng,Asia/Shanghai\r
PZI,Panzhihua,Asia/Shanghai\r
PWT,Bremerton,America/Los_Angeles\r
SPW,Spencer,America/Chicago\r
JEF,Jefferson City,America/Chicago\r
UNT,Unst,Europe/London\r
PVC,Provincetown,America/New_York\r
SBH,Gustavia,America/St_Barthelemy\r
KMW,Kostroma,Europe/Moscow\r
SUI,Sukhumi,Asia/Tbilisi\r
TBW,Tambow,Europe/Moscow\r
OBN,North Connel,Europe/London\r
ERM,Erechim,America/Sao_Paulo\r
CVF,Courcheval,Europe/Paris\r
FUL,Fullerton,America/Los_Angeles\r
USA,Concord,America/New_York\r
NVI,Navoi,Asia/Samarkand\r
QSF,Setif,Africa/Algiers\r
LRH,La Rochelle,Europe/Paris\r
SUN,Hailey,America/Boise\r
MCW,Mason City,America/Chicago\r
AZA,Mesa,America/Phoenix\r
XAU,Saul,America/Cayenne\r
AKP,Anaktuvuk Pass,America/Anchorage\r
ANV,Anvik,America/Anchorage\r
ATK,Atqasuk,America/Anchorage\r
GAM,Gambell,America/Nome\r
HPB,Hooper Bay,America/Nome\r
KAL,Kaltag,America/Anchorage\r
KSM,St Mary's,America/Nome\r
KVL,Kivalina,America/Nome\r
MYU,Mekoryuk,America/Nome\r
RBY,Ruby,America/Anchorage\r
SHH,Shishmaref,America/Nome\r
SVA,Savoonga,America/Nome\r
WTK,Noatak,America/Nome\r
OMC,Ormoc City,Asia/Manila\r
YPX,Puvirnituq,America/Toronto\r
YTQ,Tasiujaq,America/Toronto\r
ARC,Arctic Village,America/Anchorage\r
QOW,Imo,Africa/Lagos\r
FON,La Fortuna/San Carlos,America/Costa_Rica\r
TMU,Nicoya,America/Costa_Rica\r
CYZ,Cauayan,Asia/Manila\r
KVK,Apatity,Europe/Moscow\r
GVR,Governador Valadares,America/Sao_Paulo\r
KPC,Port Clarence,America/Nome\r
PJA,Pajala,Europe/Stockholm\r
QBC,Bella Coola,America/Vancouver\r
HGR,Hagerstown,America/New_York\r
ACR,Araracuara,America/Bogota\r
GOP,Gorakhpur,Asia/Kolkata\r
SDP,Sand Point,America/Anchorage\r
HMI,Hami,Asia/Urumqi\r
WUZ,Wuzhou,Asia/Shanghai\r
TBH,Romblon,Asia/Manila\r
ACP,Maragheh,Asia/Tehran\r
GBT,Gorgan,Asia/Tehran\r
IIL,Ilam,Asia/Tehran\r
PFQ,Parsabad,Asia/Tehran\r
TCG,Tacheng,Asia/Urumqi\r
MQM,Mardin,Europe/Istanbul\r
AFS,Zarafshan,Asia/Samarkand\r
DRG,Deering,America/Nome\r
LEN,Leon,Europe/Madrid\r
RGS,Burgos,Europe/Madrid\r
EGM,Sege,Pacific/Guadalcanal\r
CQD,Shahre Kord,Asia/Tehran\r
DHM,Kangra,Asia/Kolkata\r
NDC,Nanded,Asia/Kolkata\r
SLV,Shimla,Asia/Kolkata\r
IGG,Igiugig,America/Anchorage\r
KNW,New Stuyahok,America/Anchorage\r
KVC,King Cove,America/Nome\r
PTH,Port Heiden,America/Anchorage\r
TOG,Togiak Village,America/Anchorage\r
EGN,Geneina,Africa/Khartoum\r
LKH,Long Akah,Asia/Kuching\r
WLH,Walaha,Pacific/Efate\r
CHG,Chaoyang,Asia/Shanghai\r
UAS,Samburu South,Africa/Nairobi\r
BHG,Brus Laguna,America/Tegucigalpa\r
YVB,Bonaventure,America/Toronto\r
SKT,Sialkot,Asia/Karachi\r
PDP,Punta del Este,America/Montevideo\r
WVB,Walvis Bay,Africa/Windhoek\r
MPA,Mpacha,Africa/Windhoek\r
AOE,Eskissehir,Europe/Istanbul\r
CKZ,Canakkale,Europe/Istanbul\r
MSR,Mus,Europe/Istanbul\r
NOP,Sinop,Europe/Istanbul\r
TEQ,orlu,Europe/Istanbul\r
YEI,Yenisehir,Europe/Istanbul\r
LSS,Les Saintes,America/Guadeloupe\r
KMV,Kalemyo,Asia/Yangon\r
VQS,Vieques Island,America/Puerto_Rico\r
YIF,St-Augustin,America/Blanc-Sablon\r
HDM,Hamadan,Asia/Tehran\r
MRQ,Gasan,Asia/Manila\r
GFN,Grafton,Australia/Sydney\r
OAG,Orange,Australia/Sydney\r
TRO,Taree,Australia/Sydney\r
COQ,Choibalsan,Asia/Ulaanbaatar\r
HOH,Hohenems,Europe/Vienna\r
ESC,Escanaba,America/Detroit\r
YAK,Yakutat,America/Yakutat\r
GUL,Goulburn,Australia/Sydney\r
CES,Cessnock,Australia/Sydney\r
NSO,Scone,Australia/Sydney\r
DGE,Mudgee,Australia/Sydney\r
MTL,Maitland,Australia/Sydney\r
CPX,Culebra Island,America/Puerto_Rico\r
MWA,Marion,America/Chicago\r
OCN,Fraser Island,America/Los_Angeles\r
KIK,Kirkuk,Asia/Baghdad\r
XJD,Doha,Asia/Qatar\r
GBZ,Claris,Pacific/Auckland\r
IMT,Iron Mountain,America/Menominee\r
AET,Allakaket,America/Anchorage\r
MGC,Michigan City,America/Chicago\r
SWD,Seward,America/Anchorage\r
GRM,Grand Marais,America/Chicago\r
AUW,Wausau,America/Chicago\r
MYP,Mary,Asia/Ashgabat\r
MVA,Myvatn,Atlantic/Reykjavik\r
QSA,Sabadell,Europe/Madrid\r
WSY,Airlie Beach,Australia/Brisbane\r
MIE,Muncie,America/Indiana/Indianapolis\r
LAF,Lafayette,America/Indiana/Indianapolis\r
VGT,Las Vegas,America/Los_Angeles\r
ENW,Kenosha,America/Chicago\r
MTJ,Montrose CO,America/Denver\r
RIW,Riverton WY,America/Denver\r
PDT,Pendleton,America/Los_Angeles\r
LYM,Lympne,Europe/London\r
PKH,Porto Heli,Europe/Athens\r
KTR,Katherine,Australia/Darwin\r
NOA,Nowra,Australia/Sydney\r
UCK,Lutsk,Europe/Kyiv\r
CEJ,Chernigov,Europe/Kyiv\r
BQT,Brest,Europe/Minsk\r
OSH,Oshkosh,America/Chicago\r
AGE,Wangerooge,Europe/Berlin\r
BXG,Bendigo,Australia/Melbourne\r
EAT,Wenatchee,America/Los_Angeles\r
ARE,Arecibo,America/Puerto_Rico\r
RIN,Ringi Cove,Pacific/Guadalcanal\r
KCK,Kirensk,Asia/Irkutsk\r
UKX,Ust-Kut,Asia/Irkutsk\r
RMT,Rimatara,Pacific/Tahiti\r
QLS,Lausanne,Europe/Zurich\r
ZJI,Locarno,Europe/Zurich\r
QNC,Neuchatel,Europe/Zurich\r
TGK,Taganrog,Europe/Moscow\r
GDZ,Gelendzhik,Europe/Moscow\r
ZIA,Ramenskoe,Europe/Moscow\r
IAR,Yaroslavl,Europe/Moscow\r
OHE,Mohe County,Asia/Shanghai\r
JNG,Jining,Asia/Shanghai\r
DRK,Puntarenas,America/Costa_Rica\r
AAT,Altay,Asia/Urumqi\r
TZL,Null,Europe/Sarajevo\r
FWH,Dallas,America/Chicago\r
NYT,Naypyidaw,Asia/Yangon\r
VBP,Bokepyin,Asia/Yangon\r
NZH,Manzhouli,Asia/Shanghai\r
WUA,Wuhai,Asia/Shanghai\r
GYY,Gary,America/Chicago\r
BRD,Brainerd,America/Chicago\r
LWB,Lewisburg,America/New_York\r
PGV,Greenville,America/New_York\r
CYF,Chefornak,America/Nome\r
OXR,Oxnard,America/Los_Angeles\r
BKG,Branson,America/Chicago\r
TEN,Tongren,Asia/Shanghai\r
JGS,Jian,Asia/Shanghai\r
NIU,Niau,Pacific/Tahiti\r
SCH,Scotia NY,America/New_York\r
NBC,Nizhnekamsk,Europe/Moscow\r
QRW,Osubi,Africa/Lagos\r
IAO,Siargao,Asia/Manila\r
LGO,Langeoog,Europe/Berlin\r
NLP,Nelspruit,Africa/Johannesburg\r
CKC,Cherkassy,Europe/Kyiv\r
UST,St. Augustine Airport,America/New_York\r
NLV,Nikolayev,Europe/Kyiv\r
RHP,Ramechhap,Asia/Kathmandu\r
STS,Santa Rosa,America/Los_Angeles\r
ISM,Kissimmee,America/New_York\r
LCQ,Lake City,America/New_York\r
LGU,Logan,America/Denver\r
BMC,Brigham City,America/Denver\r
ASE,Aspen,America/Denver\r
ULV,Ulyanovsk,Europe/Ulyanovsk\r
ERV,Kerrville,America/Chicago\r
GED,Georgetown,America/New_York\r
ZSW,Prince Rupert,America/Vancouver\r
GBD,Great Bend,America/Chicago\r
HYS,Hays,America/Chicago\r
SUS,Null,America/Chicago\r
LYU,Ely,America/Chicago\r
GPZ,Grand Rapids MN,America/Chicago\r
TVF,Thief River Falls,America/Chicago\r
EGV,Eagle River,America/Chicago\r
ARV,Minocqua - Woodruff,America/Chicago\r
YBV,Berens River,America/Winnipeg\r
AVX,Catalina Island,America/Los_Angeles\r
MHV,Mojave,America/Los_Angeles\r
ZIN,Interlaken,Europe/Zurich\r
INQ,Inisheer,Europe/Dublin\r
SWT,Strezhevoy,Asia/Tomsk\r
HUT,Hutchinson,America/Chicago\r
OAI,Kabul,Asia/Kabul\r
AKH,Al Kharj,Asia/Riyadh\r
STJ,Rosecrans,America/Chicago\r
VOK,Camp Douglas,America/Chicago\r
GUC,Gunnison,America/Denver\r
SIA,Xi\\'AN,Asia/Shanghai\r
TOA,Torrance,America/Los_Angeles\r
MBL,Manistee,America/Detroit\r
PGD,Punta Gorda,America/New_York\r
WFK,Frenchville,America/New_York\r
JHW,Jamestown,America/New_York\r
YTM,Mont-Tremblant,America/Toronto\r
SME,Somerset,America/New_York\r
SHD,Weyers Cave,America/New_York\r
DVL,Devils Lake,America/Chicago\r
DIK,Dickinson,America/Denver\r
SDY,Sidney,America/Denver\r
CDR,Chadron,America/Denver\r
AIA,Alliance,America/Denver\r
MCK,McCook,America/Chicago\r
MTH,Marathon,America/New_York\r
GDV,Glendive,America/Denver\r
OLF,Wolf Point,America/Denver\r
WYS,West Yellowstone,America/Denver\r
ALS,Alamosa,America/Denver\r
CNY,Moab,America/Denver\r
ELY,Ely,America/Los_Angeles\r
VEL,Vernal,America/Denver\r
RUI,Ruidoso,America/Denver\r
SOW,Show Low,America/Phoenix\r
MYL,McCall,America/Boise\r
SMN,Salmon,America/Boise\r
MMH,Mammoth Lakes,America/Los_Angeles\r
FRD,Friday Harbor,America/Los_Angeles\r
ESD,Eastsound,America/Los_Angeles\r
AST,Astoria,America/Los_Angeles\r
ONP,Newport,America/Los_Angeles\r
EMK,Emmonak,America/Nome\r
UNK,Unalakleet,America/Anchorage\r
UUK,Kuparuk,America/Anchorage\r
SHX,Shageluk,America/Anchorage\r
CHU,Chuathbaluk,America/Anchorage\r
NUI,Nuiqsut,America/Anchorage\r
EEK,Eek,America/Nome\r
KUK,Kasigluk,America/Nome\r
KWT,Kwethluk,America/Anchorage\r
KWK,Kwigillingok,America/Nome\r
MLL,Marshall,America/Nome\r
RSH,Russian Mission,America/Anchorage\r
KGK,Koliganek,America/Anchorage\r
KMO,Manokotak,America/Anchorage\r
CIK,Chalkyitsik,America/Anchorage\r
EAA,Eagle,America/Anchorage\r
HUS,Hughes,America/Anchorage\r
HSL,Huslia,America/Anchorage\r
NUL,Nulato,America/Anchorage\r
VEE,Venetie,America/Anchorage\r
WBQ,Beaver,America/Anchorage\r
CEM,Central,America/Anchorage\r
SHG,Shungnak,America/Anchorage\r
IYK,Inyokern,America/Los_Angeles\r
VIS,Visalia,America/Los_Angeles\r
MCE,Merced,America/Los_Angeles\r
CYR,Colonia,America/Montevideo\r
CPQ,Campinas,America/Sao_Paulo\r
GYR,Goodyear,America/Phoenix\r
TWB,Toowoomba,Australia/Brisbane\r
BBL,Ballera,Australia/Brisbane\r
AYK,Arkalyk,Asia/Qostanay\r
AGN,Angoon,America/Juneau\r
ELV,Elfin Cove,America/Juneau\r
FNR,Funter Bay,America/Juneau\r
HNH,Hoonah,America/Juneau\r
MTM,Metakatla,America/Metlakatla\r
HYG,Hydaburg,America/Sitka\r
EGX,Egegik,America/Anchorage\r
KPV,Perryville,America/Anchorage\r
PIP,Pilot Point,America/Anchorage\r
WSN,South Naknek,America/Anchorage\r
AKK,Akhiok,America/Anchorage\r
KYK,Karluk,America/Anchorage\r
KLN,Larsen Bay,America/Anchorage\r
ABL,Ambler,America/Anchorage\r
BKC,Buckland,America/Anchorage\r
IAN,Kiana,America/Anchorage\r
OBU,Kobuk,America/Anchorage\r
ORV,Noorvik,America/Anchorage\r
WLK,Selawik,America/Anchorage\r
KTS,Brevig Mission,America/Nome\r
ELI,Elim,America/Nome\r
GLV,Golovin,America/Nome\r
TLA,Teller,America/Nome\r
WAA,Wales,America/Nome\r
WMO,White Mountain,America/Nome\r
KKA,Koyuk,America/Anchorage\r
SMK,St. Michael,America/Nome\r
SKK,Shaktoolik,America/Anchorage\r
TNC,Tin City,America/Nome\r
AKB,Atka,America/Adak\r
IKO,Nikolski,America/Nome\r
CYT,Yakataga,America/Anchorage\r
AUK,Alakanuk,America/Nome\r
KPN,Kipnuk,America/Nome\r
KFP,False Pass,America/Nome\r
NLG,Nelson Lagoon,America/Anchorage\r
PML,Cold Bay,America/Anchorage\r
KLW,Klawock,America/Sitka\r
KWN,Quinhagak,America/Anchorage\r
KOT,Kotlik,America/Nome\r
KYU,Koyukuk,America/Anchorage\r
SCM,Scammon Bay,America/Nome\r
NNL,Nondalton,America/Anchorage\r
KKH,Kongiganak,America/Nome\r
NIB,Nikolai,America/Anchorage\r
AKI,Akiak,America/Anchorage\r
AIN,Wainwright,America/Anchorage\r
APZ,ZAPALA,America/Argentina/Salta\r
RDS,Rincon de los Sauces,America/Argentina/Salta\r
PNT,Puerto Natales,America/Punta_Arenas\r
SGV,Sierra Grande,America/Argentina/Salta\r
IGB,Ingeniero Jacobacci,America/Argentina/Salta\r
NCN,Chenega,America/Anchorage\r
TKJ,Tok,America/Anchorage\r
IRC,Circle,America/Anchorage\r
SLQ,Sleetmute,America/Anchorage\r
LMA,Lake Minchumina,America/Anchorage\r
MLY,Manley Hot Springs,America/Anchorage\r
YNP,Natuashish,America/Goose_Bay\r
YSO,Postville,America/Goose_Bay\r
YWB,Kangiqsujuaq,America/Toronto\r
YTF,Alma,America/Toronto\r
YGV,Havre-Saint-Pierre,America/Toronto\r
YXK,Rimouski,America/Toronto\r
XTL,Tadoule Lake,America/Winnipeg\r
XLB,Lac Brochet,America/Winnipeg\r
XSI,South Indian Lake,America/Winnipeg\r
YBT,Brochet,America/Winnipeg\r
ZGR,Little Grand Rapids,America/Winnipeg\r
YCR,Cross Lake,America/Winnipeg\r
YRS,Red Sucker Lake,America/Winnipeg\r
YOP,Rainbow Lake,America/Edmonton\r
YBY,Bonnyville,America/Edmonton\r
ZNA,Nanaimo,America/Vancouver\r
YGG,Ganges,America/Vancouver\r
YDT,Boundary Bay,America/Vancouver\r
YLY,Langley Township,America/Vancouver\r
YFJ,Wekweeti,America/Edmonton\r
RNI,Corn Island,America/Managua\r
BZA,Bonanza,America/Managua\r
RFS,Rosita,America/Managua\r
SIU,Siuna,America/Managua\r
WSP,Waspam,America/Managua\r
NCR,San Carlos,America/Managua\r
PLD,Carrillo,America/Costa_Rica\r
COZ,Constanza,America/Santo_Domingo\r
NEG,Negril,America/Jamaica\r
NRR,Ceiba,America/Puerto_Rico\r
SPB,Charlotte Amalie,America/St_Thomas\r
ARR,Alto Rio Senguer,America/Argentina/Catamarca\r
JSM,Jose de San Martin,America/Argentina/Catamarca\r
UYU,Uyuni,America/La_Paz\r
RBQ,Rerrenabaque,America/La_Paz\r
ABF,Abaiang Atoll,Pacific/Tarawa\r
ABN,Albina,America/Paramaribo\r
DRJ,Drietabbetje,America/Paramaribo\r
MOJ,Moengo,America/Paramaribo\r
ICK,Nieuw Nickerie,America/Paramaribo\r
OEM,Paloemeu,America/Paramaribo\r
SMZ,Stoelmans Eiland,America/Paramaribo\r
TOT,Totness,America/Paramaribo\r
AGI,Wageningen,America/Paramaribo\r
ORJ,Orinduik,America/Guyana\r
NAI,Annai,America/Guyana\r
IMB,Imbaimadai,America/Guyana\r
KAR,Kamarang,America/Guyana\r
USI,Mabaruma,America/Guyana\r
MHA,Mahdia,America/Guyana\r
PJC,Pedro Juan Caballero,America/Asuncion\r
ACD,Acandi,America/Bogota\r
RVE,Saravena,America/Bogota\r
BQJ,Batagay,Asia/Vladivostok\r
VGZ,Villa Garzon,America/Bogota\r
EBG,El Bagre,America/Bogota\r
CAQ,Caucasia,America/Bogota\r
COG,Condoto,America/Bogota\r
TLU,Tolu,America/Bogota\r
CFB,Cabo Frio,America/Sao_Paulo\r
OPS,Sinop,America/Cuiaba\r
GRP,Gurupi,America/Araguaina\r
CMP,Santana do Araguaia,America/Belem\r
BVS,Breves,America/Belem\r
SFK,Soure,America/Belem\r
PIN,Parintins,America/Manaus\r
BRA,Barreiras,America/Bahia\r
STZ,Santa Terezinha,America/Cuiaba\r
MQH,Minacu,America/Sao_Paulo\r
AUX,Araguaina,America/Araguaina\r
NVP,Novo Aripuana,America/Manaus\r
FRC,Franca,America/Sao_Paulo\r
DOU,Dourados,America/Campo_Grande\r
LBR,Labrea,America/Manaus\r
ROO,Rondonopolis,America/Cuiaba\r
GPB,Guarapuava,America/Sao_Paulo\r
JCB,Joacaba,America/Sao_Paulo\r
RVD,Rio Verde,America/Sao_Paulo\r
AAX,Araxa,America/Sao_Paulo\r
MBZ,Maues,America/Manaus\r
RBB,Borba,America/Manaus\r
CIZ,Coari,America/Manaus\r
BAZ,Barcelos,America/Manaus\r
DMT,Diamantino,America/Cuiaba\r
GNM,Guanambi,America/Bahia\r
QDJ,Djelfa,Africa/Algiers\r
NZA,Nzagi,Africa/Luanda\r
LBZ,Lucapa,Africa/Luanda\r
KNP,Kapanda,Africa/Luanda\r
AMC,Am Timan,Africa/Ndjamena\r
GSQ,Sharq Al-Owainat,Africa/Cairo\r
MRB,Martinsburg,America/New_York\r
AWA,Awasa,Africa/Addis_Ababa\r
JIJ,Jijiga,Africa/Addis_Ababa\r
MKS,Mekane Selam,Africa/Addis_Ababa\r
DBM,Debre Marqos,Africa/Addis_Ababa\r
DBT,Debre Tabor,Africa/Addis_Ababa\r
QHR,Debre Zeyit,Africa/Addis_Ababa\r
GOB,Goba,Africa/Addis_Ababa\r
MYB,Mayumba,Africa/Libreville\r
MRE,Masai Mara,Africa/Nairobi\r
JJM,Meru National Park,Africa/Nairobi\r
RBX,Rumbek,Africa/Juba\r
CPA,Greenville,Africa/Monrovia\r
IHC,Inhaca,Africa/Maputo\r
MAX,Matam,Africa/Dakar\r
BDI,Bird Island,Indian/Mahe\r
WHF,Wadi Halfa,Africa/Khartoum\r
NBE,Enfidha,Africa/Tunis\r
HTY,Hatay,Europe/Istanbul\r
RVV,Raivavae,Pacific/Tahiti\r
FUO,Foshan,Asia/Shanghai\r
HUZ,Huizhou,Asia/Shanghai\r
ILD,Lleida,Europe/Madrid\r
BIU,Bildudalur,Atlantic/Reykjavik\r
GJR,Gjogur,Atlantic/Reykjavik\r
SAK,Saudarkrokur,Atlantic/Reykjavik\r
IIA,Inishmaan,Europe/Dublin\r
ULG,Olgii,Asia/Hovd\r
KQT,Kurgan Tyube,Asia/Dushanbe\r
VGD,Vologda,Europe/Moscow\r
ONK,Olenyok,Asia/Yakutsk\r
SYS,Saskylakh,Asia/Yakutsk\r
LDG,Arkhangelsk,Europe/Moscow\r
HSK,Huesca,Europe/Madrid\r
CQM,Ciudad Real,Europe/Madrid\r
NJF,Najaf,Asia/Baghdad\r
CSA,Colonsay,Europe/London\r
RKH,Rock Hill,America/New_York\r
AGC,Pittsburgh,America/New_York\r
VQQ,Jacksonville,America/New_York\r
FTY,Atlanta,America/New_York\r
TII,Tarin Kowt,Asia/Kabul\r
ZAJ,Zaranj,Asia/Kabul\r
CCN,Chaghcharan,Asia/Kabul\r
FUG,Fuyang,Asia/Shanghai\r
LCX,Longyan,Asia/Shanghai\r
BSD,Baoshan,Asia/Shanghai\r
ACX,Xingyi,Asia/Shanghai\r
HZH,Liping,Asia/Shanghai\r
OSU,Columbus,America/New_York\r
ADS,Addison,America/Chicago\r
DSI,Destin,America/Chicago\r
KHE,Kherson,Europe/Kyiv\r
SZS,Stewart Island,Pacific/Auckland\r
HJJ,Zhijiang,Asia/Shanghai\r
YQI,Yarmouth,America/Halifax\r
ISO,Kinston,America/New_York\r
FFA,Kill Devil Hills,America/New_York\r
LNJ,Lincang,Asia/Shanghai\r
CKS,Parauapebas,America/Belem\r
MWK,Anambas Islands,Asia/Jakarta\r
PGU,Khalije Fars,Asia/Tehran\r
YES,Yasuj,Asia/Tehran\r
OSM,Mosul,Asia/Baghdad\r
TJH,Toyooka,Asia/Tokyo\r
AXJ,Amakusa,Asia/Tokyo\r
KKX,Kikai,Asia/Tokyo\r
AGJ,Aguni,Asia/Tokyo\r
ULZ,Uliastai,Asia/Ulaanbaatar\r
UGA,Bulgan,Asia/Ulaanbaatar\r
ULO,Ulaangom,Asia/Hovd\r
LBX,Lubang,Asia/Manila\r
TJU,Kulyab,Asia/Dushanbe\r
CMJ,Cimei,Asia/Taipei\r
TAZ,Dasoguz,Asia/Ashgabat\r
BWB,Barrow Island,Australia/Perth\r
DRB,Derby,Australia/Perth\r
WGE,Walgett,Australia/Sydney\r
BRT,Bathurst Island,Australia/Darwin\r
DKI,Dunk Island,Australia/Brisbane\r
LZR,Lizard Island,Australia/Brisbane\r
HLT,Hamilton,Australia/Melbourne\r
HCQ,Halls Creek,Australia/Perth\r
FIZ,Fitzroy Crossing,Australia/Perth\r
RVT,Ravensthorpe,Australia/Perth\r
PVU,Provo,America/Denver\r
SBS,Steamboat Springs,America/Denver\r
DTA,Delta,America/Denver\r
PUC,Price,America/Denver\r
LAM,Los Alamos,America/Denver\r
HII,Lake Havasu City,America/Phoenix\r
INW,Winslow,America/Phoenix\r
DGL,Douglas,America/Phoenix\r
MZK,Marakei,Pacific/Tarawa\r
AEA,Abemama,Pacific/Tarawa\r
AAK,Buariki,Pacific/Tarawa\r
KUC,Kuria,Pacific/Tarawa\r
AIS,Arorae,Pacific/Tarawa\r
TMN,Tamana,Pacific/Tarawa\r
BEZ,Beru Island,Pacific/Tarawa\r
NIG,Nikunau,Pacific/Tarawa\r
BBG,Butaritari,Pacific/Tarawa\r
MTK,Makin,Pacific/Tarawa\r
MNK,Maiana,Pacific/Tarawa\r
NON,Nonouti,Pacific/Tarawa\r
TSU,Tabiteuea,Pacific/Tarawa\r
WTZ,Whitianga,Pacific/Auckland\r
KTF,Takaka,Pacific/Auckland\r
AFT,Afutara,Pacific/Guadalcanal\r
RNA,Ulawa,Pacific/Guadalcanal\r
CHY,Choiseul Bay,Pacific/Guadalcanal\r
NNB,Santa Ana,Pacific/Guadalcanal\r
XYA,Yandina,Pacific/Guadalcanal\r
BPF,Batuna,Pacific/Guadalcanal\r
BOW,Bartow,America/New_York\r
FTI,Fiti\\'uta,Pacific/Pago_Pago\r
LVK,Livermore,America/Los_Angeles\r
RMY,Mariposa,America/Los_Angeles\r
GFY,Grootfontein,Africa/Windhoek\r
NDU,Rundu,Africa/Windhoek\r
TRM,Palm Springs,America/Los_Angeles\r
SMO,Santa Monica,America/Los_Angeles\r
UDD,Palm Springs,America/Los_Angeles\r
SCF,Scottsdale,America/Phoenix\r
OLM,Olympia,America/Los_Angeles\r
RIL,Rifle,America/Denver\r
SAA,SARATOGA,America/Denver\r
PDK,Atlanta,America/New_York\r
BMG,Bloomington,America/Indiana/Indianapolis\r
SUA,Stuart,America/New_York\r
MMU,Morristown,America/New_York\r
APC,Napa,America/Los_Angeles\r
SDM,San Diego,America/Los_Angeles\r
VNC,Venice,America/New_York\r
PHK,Pahokee,America/New_York\r
ECP,Panama City,America/Chicago\r
SBD,San Bernardino,America/Los_Angeles\r
VAL,Valenca,America/Bahia\r
CAU,Caruaru,America/Recife\r
AWK,Wake island,Pacific/Wake\r
QNV,Nova Iguacu,America/Sao_Paulo\r
SQL,San Carlos,America/Los_Angeles\r
RWI,Rocky Mount,America/New_York\r
SXQ,Soldotna,America/Anchorage\r
SEE,El Cajon,America/Los_Angeles\r
PHA,Phan Rang,Asia/Ho_Chi_Minh\r
SQH,Son-La,Asia/Bangkok\r
TKF,Truckee,America/Los_Angeles\r
FRJ,Frejus,Europe/Paris\r
GEX,Geelong,Australia/Melbourne\r
LVM,Livingston-Montana,America/Denver\r
GMV,Monument Valley,America/Denver\r
JRA,New York,America/New_York\r
LAL,Lakeland,America/New_York\r
SYH,Syangboche,Asia/Kathmandu\r
RBK,Murrieta-Temecula,America/Los_Angeles\r
FNU,Oristano,Europe/Rome\r
MYQ,Mysore,Asia/Kolkata\r
MGY,Dayton,America/New_York\r
FDY,Findley,America/New_York\r
PEA,Penneshaw,Australia/Adelaide\r
EMP,Kempten,America/Chicago\r
HYC,Wycombe,Europe/London\r
BBP,Bembridge,Europe/London\r
SPF,Spearfish-South Dakota,America/Denver\r
QYD,Gdynia,Europe/Warsaw\r
OLV,Olive Branch,America/Chicago\r
KNA,Vina del Mar,America/Santiago\r
ONQ,Zonguldak,Europe/Istanbul\r
BJC,Broomfield-CO,America/Denver\r
SLE,Salem,America/Los_Angeles\r
UTM,Tunica,America/Chicago\r
ZKB,Kasaba Bay,Africa/Lusaka\r
LND,Lindau,America/Denver\r
MWC,Milwaukee,America/Chicago\r
JVL,Janesville,America/Chicago\r
LZU,Lawrenceville,America/New_York\r
BWG,Bowling Green,America/Chicago\r
RVS,Tulsa,America/Chicago\r
NHD,Minhad AB,Asia/Dubai\r
KGO,Kirovograd,Europe/Kyiv\r
DBB,Dabaa City,Africa/Cairo\r
BCE,Bryce Canyon,America/Denver\r
CKL,Shchyolkovo,Europe/Moscow\r
TCZ,Tengchong,Asia/Shanghai\r
UKS,Sevastopol,Europe/Simferopol\r
OAZ,Camp Bastion,Asia/Kabul\r
JCI,Olathe,America/Chicago\r
ESN,Easton,America/New_York\r
HMR,Hamar,Europe/Oslo\r
MYV,Yuba City,America/Los_Angeles\r
DUC,Duncan,America/Chicago\r
UVA,Uvalde,America/Chicago\r
LOT,Lockport,America/Chicago\r
CCR,Concord,America/Los_Angeles\r
OCA,Ocean Reef Club Airport,America/New_York\r
YUS,Yushu,Asia/Shanghai\r
HIA,Huai An,Asia/Shanghai\r
YOO,Oshawa,America/Toronto\r
LHA,Lahr,Europe/Berlin\r
NYW,Monywa,Asia/Yangon\r
ATO,Athens,America/New_York\r
SGH,Springfield,America/New_York\r
HEX,Santo Domingo,America/Santo_Domingo\r
CDA,Cooinda,Australia/Darwin\r
JAB,Jabiru,Australia/Darwin\r
HGS,Freetown,Africa/Freetown\r
TOP,Topeka,America/Chicago\r
MQY,Smyrna,America/Chicago\r
UOS,Sewanee,America/Chicago\r
NGQ,Shiquanhe,Asia/Shanghai\r
CSO,Cochstedt,Europe/Berlin\r
PWK,Chicago-Wheeling,America/Chicago\r
KLS,Kelso,America/Los_Angeles\r
ZTA,Tureia,Pacific/Tahiti\r
PUE,Puerto Obaldia,America/Panama\r
KHC,Kerch,Europe/Simferopol\r
UKA,Ukunda,Africa/Nairobi\r
ILN,Wilmington,America/New_York\r
AVW,Tucson,America/Phoenix\r
CGZ,Casa Grande,America/Phoenix\r
BXK,Buckeye,America/Phoenix\r
MMI,Athens,America/New_York\r
STK,Sterling,America/Denver\r
RWL,Rawlins,America/Denver\r
CDW,Caldwell,America/New_York\r
AIZ,Kaiser Lake Ozark,America/Chicago\r
TVI,Thomasville,America/New_York\r
HSH,Henderson,America/Los_Angeles\r
GML,Kiev,Europe/Kyiv\r
TMA,Tifton,America/New_York\r
RDO,RADOM,Europe/Warsaw\r
DVT,Phoenix ,America/Phoenix\r
YRV,Revelstoke,America/Vancouver\r
FRG,Farmingdale,America/New_York\r
ZHY,Zhongwei,Asia/Shanghai\r
MCL,McKinley Park,America/Anchorage\r
PPC,Prospect Creek,America/Anchorage\r
KHW,Khwai River,Africa/Gaborone\r
TXG,Taichung,Asia/Taipei\r
HLG,Wheeling,America/New_York\r
XYE,Ye,Asia/Yangon\r
DWC,Dubai,Asia/Dubai\r
RKP,Rockport,America/Chicago\r
MVV,Verdun,Europe/Paris\r
MFX,Ajaccio,Europe/Paris\r
AEB,Baise,Asia/Shanghai\r
OKF,Okaukuejo,Africa/Windhoek\r
OKU,Mokuti Lodge,Africa/Windhoek\r
KOQ,Koethen,Europe/Berlin\r
PSH,Sankt Peter-Ording,Europe/Berlin\r
TTD,Troutdale,America/Los_Angeles\r
HIO,Hillsboro,America/Los_Angeles\r
KHT,Khost,Asia/Kabul\r
NMT,Naypyidaw,Asia/Yangon\r
BNO,Burns,America/Los_Angeles\r
PRZ,Prineville,America/Los_Angeles\r
RBL,Red Bluff,America/Los_Angeles\r
NOT,Novato,America/Los_Angeles\r
LKV,Lakeview,America/Los_Angeles\r
OTK,Tillamook,America/Los_Angeles\r
ONO,Ontario,America/Boise\r
DLS,The Dalles,America/Los_Angeles\r
GAI,Gaithersburg,America/New_York\r
OAS,Sharona,Asia/Kabul\r
YTA,Pembroke,America/Toronto\r
TSB,Tsumeb,Africa/Windhoek\r
YSD,Suffield,America/Edmonton\r
BNU,BLUMENAU,America/Sao_Paulo\r
YCC,Cornwall,America/Toronto\r
IZA,Juiz de Fora,America/Sao_Paulo\r
MVL,Morrisville,America/New_York\r
RBD,Dallas,America/Chicago\r
BXY,Baikonur,Asia/Qyzylorda\r
WST,Washington County,America/New_York\r
BID,Block Island,America/New_York\r
NME,Nightmute,America/Nome\r
OOK,Toksook Bay,America/Nome\r
OBY,Ittoqqortoormiit,America/Scoresbysund\r
VIN,Vinnitsa,Europe/Kyiv\r
BGE,Bainbridge,America/New_York\r
ZGS,La Romaine,America/Blanc-Sablon\r
ZKG,Kegaska,America/Blanc-Sablon\r
YBI,Black Tickle,America/St_Johns\r
WHP,Los Angeles,America/Los_Angeles\r
MAE,Madera,America/Los_Angeles\r
YZZ,Trail,America/Vancouver\r
YAB,Arctic Bay,America/Rankin_Inlet\r
GSI,Grand-Santi,America/Cayenne\r
MPY,Maripasoula,America/Cayenne\r
LDX,Saint-Laurent-du-Maroni,America/Cayenne\r
KJI,Burqin,Asia/Urumqi\r
CPB,Capurgana,America/Bogota\r
HMB,Sohag,Africa/Cairo\r
RVY,Rivera,America/Montevideo\r
POJ,Patos de Minas,America/Sao_Paulo\r
JTC,Bauru,America/Sao_Paulo\r
OIA,Ourilandia do Norte,America/Belem\r
RDC,Redencao,America/Belem\r
SXX,Sao Felix do Xingu,America/Belem\r
BYO,Bointo,America/Campo_Grande\r
SXO,Sao Felix do Araguaia,America/Cuiaba\r
CFC,Cacador,America/Sao_Paulo\r
CAF,Carauari,America/Manaus\r
ERN,Eirunepe,America/Eirunepe\r
CCI,Concordia,America/Sao_Paulo\r
FBE,Francisco Beltrao,America/Sao_Paulo\r
CFO,Confresa,America/Cuiaba\r
AAF,Apalachicola,America/New_York\r
UMU,Umuarama,America/Sao_Paulo\r
DTI,Diamantina,America/Sao_Paulo\r
FBA,Fonte Boa,America/Manaus\r
OLC,Sao Paulo de Olivenca,America/Manaus\r
HUW,Humaita,America/Manaus\r
IRZ,Santa Isabel do Rio Negro,America/Manaus\r
ORX,Oriximina,America/Santarem\r
UNA,Una,America/Bahia\r
TEF,Telfer,Australia/Perth\r
GZP,Alanya,Europe/Istanbul\r
OAA,Shank,Asia/Kabul\r
FPR,Fort Pierce,America/New_York\r
PYM,Plymouth,America/New_York\r
NCO,North Kingstown,America/New_York\r
OWD,Norwood,America/New_York\r
BAF,Westfield,America/New_York\r
MGJ,Montgomery,America/New_York\r
HAR,Harrisburg,America/New_York\r
DXR,Danbury,America/New_York\r
ASH,Nashua,America/New_York\r
LWM,Lawrence,America/New_York\r
OXC,Oxford,America/New_York\r
RMG,Rome,America/New_York\r
GAD,Gadsden,America/Chicago\r
WDR,Winder,America/New_York\r
DNN,Dalton,America/New_York\r
LGC,LaGrange,America/New_York\r
PIM,Pine Mountain,America/New_York\r
GVL,Gainesville,America/New_York\r
PHD,New Philadelpha,America/New_York\r
HHH,Hilton Head Island,America/New_York\r
DNL,Augusta,America/New_York\r
MRN,Morganton,America/New_York\r
PVL,Pikeville,America/New_York\r
TOC,Toccoa,America/New_York\r
PLV,Poltava,Europe/Kyiv\r
WUU,Wau,Africa/Juba\r
HUE,Humera,Africa/Addis_Ababa\r
OYL,Moyale,Africa/Nairobi\r
OZG,Zagora,Africa/Casablanca\r
WYE,Yengema,Africa/Freetown\r
GBK,Gbangbatok,Africa/Freetown\r
THX,Turukhansk,Asia/Krasnoyarsk\r
TGP,Bor,Asia/Krasnoyarsk\r
AFW,Fort Worth,America/Chicago\r
RMK,Renmark,Australia/Adelaide\r
LGH,Leigh Creek,Australia/Adelaide\r
RTS,Rottnest Island,Australia/Perth\r
FOS,Forrest,Australia/Perth\r
KEW,Keewaywin,America/Winnipeg\r
YSP,Marathon,America/Toronto\r
YHF,Hearst,America/Toronto\r
YHN,Hornepayne,America/Toronto\r
YKX,Kirkland Lake,America/Toronto\r
YMG,Manitouwadge,America/Toronto\r
YXZ,Wawa,America/Toronto\r
YEM,Manitowaning,America/Toronto\r
LWC,Lawrence,America/Chicago\r
PPM,Pompano Beach,America/New_York\r
XMC,Mallacoota,Australia/Melbourne\r
ULH,Al-Ula,Asia/Riyadh\r
YUE,Yuendumu ,Australia/Darwin\r
LOP,Praya,Asia/Makassar\r
ZMH,108 Mile Ranch,America/Vancouver\r
HDG,Handan,Asia/Shanghai\r
LOZ,London,America/New_York\r
FBG,Fredericksburg,America/New_York\r
WMI,Warsaw,Europe/Warsaw\r
JXA,Jixi,Asia/Shanghai\r
JDG,Seogwipo,Asia/Seoul\r
YGM,Gimli,America/Winnipeg\r
EYK,Beloyarsky,Asia/Yekaterinburg\r
RAC,Racine,America/Chicago\r
RZP,Taytay,Asia/Manila\r
RKZ,Shigatse,Asia/Shanghai\r
TIW,Tacoma,America/Los_Angeles\r
GUF,Gulf Shores,America/Chicago\r
IBB,Isabela,Pacific/Galapagos\r
HMJ,Khmeinitskiy,Europe/Kyiv\r
HIW,Hiroshima,Asia/Tokyo\r
KYI,Yalata,Australia/Adelaide\r
HZL,Hazleton,America/New_York\r
CBE,Cumberland,America/New_York\r
WYN,Wyndham,Australia/Perth\r
YBO,Bob Quinn Lake,America/Vancouver\r
KLF,Kaluga,Europe/Moscow\r
LNR,Lone Rock,America/Chicago\r
JOT,Joliet,America/Chicago\r
VYS,Peru,America/Chicago\r
JXN,Jackson,America/Detroit\r
BBX,Philadelphia,America/New_York\r
OBE,Okeechobee,America/New_York\r
SEF,Sebring,America/New_York\r
AVO,Avon Park,America/New_York\r
GIF,Winter Haven,America/New_York\r
ZPH,Zephyrhills,America/New_York\r
OCF,Ocala,America/New_York\r
AIK,Aiken,America/New_York\r
CDN,Camden,America/New_York\r
LBT,Lumberton,America/New_York\r
SOP,Pinehurst-Southern Pines,America/New_York\r
SVH,Statesville,America/New_York\r
LHV,Lock Haven,America/New_York\r
BKL,Cleveland,America/New_York\r
DKK,Dunkirk,America/New_York\r
LLY,Mount Holly,America/New_York\r
LDJ,Linden,America/New_York\r
ANQ,Angola,America/Indiana/Indianapolis\r
CLW,Clearwater,America/New_York\r
CGX,Chicago,America/Chicago\r
CRE,North Myrtle Beach,America/New_York\r
BXO,Buochs,Europe/Zurich\r
WBW,Wilkes-Barre,America/New_York\r
LNN,Willoughby,America/New_York\r
UMD,Uummannaq,America/Nuuk\r
RLK,Bayannur,Asia/Shanghai\r
FFT,Frankfort,America/New_York\r
LEW,Lewiston,America/New_York\r
MRK,Marco Island Airport,America/New_York\r
DRE,Drummond Island,America/Detroit\r
GDW,Gladwin,America/Detroit\r
MFI,Marshfield,America/Chicago\r
ISW,Wisconsin Rapids,America/Chicago\r
CWI,Clinton,America/Chicago\r
BVY,Beverly,America/New_York\r
OSF,Moscow,Europe/Moscow\r
YRQ,Trois Rivieres,America/Toronto\r
POF,Poplar Bluff,America/Chicago\r
EOK,Keokuk,America/Chicago\r
PSL,Perth,Europe/London\r
STP,St. Paul,America/Chicago\r
SOO,Soderhamn,Europe/Stockholm\r
VNA,Saravane,Asia/Vientiane\r
DKS,Dikson,Asia/Krasnoyarsk\r
BYT,Bantry,Europe/Dublin\r
ADY,Alldays,Africa/Johannesburg\r
HAO,Hamilton,America/New_York\r
GAS,Garissa,Africa/Nairobi\r
HOA,Hola,Africa/Nairobi\r
KEY,Kericho,Africa/Nairobi\r
ILU,Kilaguni,Africa/Nairobi\r
ATJ,Antsirabe,Indian/Antananarivo\r
OVA,Bekily,Indian/Antananarivo\r
UTS,Ust-Tsylma,Europe/Moscow\r
RGK,Gorno-Altaysk,Asia/Barnaul\r
FLD,Fond du Lac,America/Chicago\r
STE,Stevens Point,America/Chicago\r
MQJ,Honuu,Asia/Srednekolymsk\r
PEF,Peenemunde,Europe/Berlin\r
CJN,Nusawiru,Asia/Jakarta\r
GQQ,Galion,America/New_York\r
TPN,Tiputini,America/Guayaquil\r
PTZ,Pastaza,America/Guayaquil\r
CKV,Clarksville,America/Chicago\r
LPC,Lompoc,America/Los_Angeles\r
CTH,Coatesville,America/New_York\r
BST,Lashkar Gah,Asia/Kabul\r
LLK,Lankaran,Asia/Baku\r
GBB,Qabala,Asia/Baku\r
ZTU,Zaqatala,Asia/Baku\r
LKP,Lake Placid,America/New_York\r
KDY,Khandyga,Asia/Khandyga\r
GYG,Yakutsk,Asia/Yakutsk\r
JIQ,Qianjiang,Asia/Shanghai\r
AOH,Lima,America/New_York\r
DSO,Hamhung,Asia/Pyongyang\r
SSI,Brunswick,America/New_York\r
BFP,Beaver Falls,America/New_York\r
GGE,Georgetown,America/New_York\r
HDI,Cleveland,America/New_York\r
RNT,Renton,America/Los_Angeles\r
POC,La Verne,America/Los_Angeles\r
CTY,Cross City,America/New_York\r
CEU,Clemson,America/New_York\r
BEC,Wichita,America/Chicago\r
QFO,Duxford,Europe/London\r
SNY,Sidney,America/Denver\r
GKL,Great Keppel Island,Australia/Brisbane\r
RPB,Roper Bar,Australia/Darwin\r
IFL,Innisfail,Australia/Brisbane\r
JRF,Kapolei,Pacific/Honolulu\r
BIN,Bamyan,Asia/Kabul\r
NBS,Baishan,Asia/Shanghai\r
RGO,Chongjin,Asia/Pyongyang\r
MOO,Moomba,Australia/Adelaide\r
LUZ,Lublin,Europe/Warsaw\r
ECA,East Tawas,America/Detroit\r
VAM,Maamigili,Indian/Maldives\r
LLF,Yongzhou,Asia/Shanghai\r
LSZ,Mali Losinj,Europe/Zagreb\r
ONS,Onslow,Australia/Perth\r
TDR,Theodore,Australia/Brisbane\r
WBU,Boulder,America/Denver\r
BBJ,Birburg,Europe/Berlin\r
PAO,Palo Alto,America/Los_Angeles\r
USR,Ust-Nera,Asia/Ust-Nera\r
MSC,Mesa,America/Phoenix\r
YTY,Yangzhou,Asia/Shanghai\r
PTK,Pontiac,America/Detroit\r
KSI,Kissidougou,Africa/Conakry\r
EEN,Keene,America/New_York\r
THQ,Tianshui,Asia/Shanghai\r
VRO,Kawama,America/Havana\r
GKK,Kooddoo,Indian/Maldives\r
RCS,Rochester,Europe/London\r
RHD,Rio Hondo,America/Argentina/Cordoba\r
KMP,Keetmanshoop,Africa/Windhoek\r
KGT,Kangding,Asia/Shanghai\r
VUS,Veliky Ustyug,Europe/Moscow\r
IOW,Iowa City,America/Chicago\r
TLQ,Turpan,Asia/Urumqi\r
ANP,Annapolis,America/New_York\r
FXO,Cuamba,Africa/Maputo\r
ODO,Bodaibo,Asia/Irkutsk\r
ZTR,Zhytomyr,Europe/Kyiv\r
HRI,Mattala,Asia/Colombo\r
PEQ,Pecos,America/Chicago\r
HBG,Hattiesburg,America/Chicago\r
QCJ,Botucatu,America/Sao_Paulo\r
QSC,Sao Carlos,America/Sao_Paulo\r
YKN,Yankton,America/Chicago\r
XSB,Sir Bani Yas Island,Asia/Dubai\r
ZBM,Bromont,America/Toronto\r
KTI,Kratie,Asia/Phnom_Penh\r
GYU,Guyuan,Asia/Shanghai\r
CNI,Changhai,Asia/Shanghai\r
KRH,Redhill,Europe/London\r
JGD,Jiagedaqi District,Asia/Shanghai\r
CCL,Chinchilla,Australia/Brisbane\r
HWD,Hayward,America/Los_Angeles\r
MZP,Motueka,Pacific/Auckland\r
JHQ,Shute Harbour,Australia/Brisbane\r
ARB,Ann Arbor,America/Detroit\r
SHT,Shepparton,Australia/Melbourne\r
TEM,Temora,Australia/Sydney\r
GAH,Gayndah,Australia/Brisbane\r
WIO,Wilcannia,Australia/Sydney\r
BFJ,Bijie,Asia/Shanghai\r
ULK,Lensk,Asia/Yakutsk\r
KVR,Kavalerovo,Asia/Vladivostok\r
IGD,Igdir,Europe/Istanbul\r
GNY,Sanliurfa,Europe/Istanbul\r
KZR,Kutahya,Europe/Istanbul\r
VLU,Velikiye Luki,Europe/Moscow\r
BEO,Lake Macquarie,Australia/Sydney\r
BMP,Brampton Island,Australia/Brisbane\r
NGZ,Alameda,America/Los_Angeles\r
YCN,Cochrane,America/Toronto\r
BJP,Braganca Paulista,America/Sao_Paulo\r
BQB,Brusselton,Australia/Perth\r
SEK,Srednekolymsk,Asia/Srednekolymsk\r
IVR,Inverell,Australia/Sydney\r
GLI,Glen Innes,Australia/Sydney\r
IMM,Immokalee ,America/New_York\r
TQQ,Sulawesi Tenggara,Asia/Makassar\r
YIC,Yichun,Asia/Shanghai\r
PTB,Petersburg,America/New_York\r
SBM,Sheboygan,America/Chicago\r
KFE,Cloudbreak,Australia/Perth\r
BJU,Bajura,Asia/Kathmandu\r
MZJ,Marana,America/Phoenix\r
SAD,Safford,America/Phoenix\r
SLJ,Solomon,Australia/Perth\r
KJP,Kerama,Asia/Tokyo\r
EKB,Ekibastuz,Asia/Almaty\r
SIK,Sikeston,America/Chicago\r
TTI,Tetiaroa,Pacific/Tahiti\r
GFL,Queensbury,America/New_York\r
MTN,Baltimore,America/New_York\r
FRY,Fryeburg,America/New_York\r
NEW,New Orleans,America/Chicago\r
COE,Coeur d'Alene,America/Los_Angeles\r
BMT,Beaumont,America/Chicago\r
DNV,Danville,America/Chicago\r
COJ,Coonabarabran,Australia/Sydney\r
TIX,Titusville,America/New_York\r
BZH,Bumi Hills,Africa/Harare\r
UAR,Bouarfa,Africa/Casablanca\r
NYE,NYERI,Africa/Nairobi\r
AAP,Houston,America/Chicago\r
FCM,Eden Prairie,America/Chicago\r
LIX,Likoma Island,Africa/Blantyre\r
OJC,Olathe,America/Chicago\r
GIU,Sigiriya,Asia/Colombo\r
EUM,Neumuenster,Europe/Berlin\r
TKT,Tak,Asia/Bangkok\r
YLK,Barrie-Orillia,America/Toronto\r
YCM,Saint Catherines,America/Toronto\r
YPD,Parry Sound,America/Toronto\r
MNZ,Manassas,America/New_York\r
LJN,Angleton,America/Chicago\r
BGG,Bingol,Europe/Istanbul\r
KFS,Kastamonu,Europe/Istanbul\r
LLV,Lvliang,Asia/Shanghai\r
DCY,Daocheng,Asia/Shanghai\r
GXH,Xiahe city,Asia/Shanghai\r
CIY,Comiso,Europe/Rome\r
KVM,Markovo,Asia/Anadyr\r
ZKP,Zyryanka,Asia/Srednekolymsk\r
UMS,Ust-Maya,Asia/Khandyga\r
ADH,Aldan,Asia/Yakutsk\r
OLZ,Olekminsk,Asia/Yakutsk\r
NLT,Xinyuan,Asia/Urumqi\r
PTA,Port alsworth,America/Anchorage\r
BOR,Belfort,Europe/Paris\r
OBC,Obock,Africa/Djibouti\r
TDJ,Tadjoura,Africa/Djibouti\r
AQB,Santa Cruz des Quiche,America/Guatemala\r
NOR,Nordfjordur,Atlantic/Reykjavik\r
BTZ,Bursa,Europe/Istanbul\r
WAR,Waris-Papua Island,Asia/Jayapura\r
EWK,Newton,America/Chicago\r
BSJ,Bairnsdale,Australia/Melbourne\r
TZR,Columbus,Europe/Budapest\r
FBR,Fort Bridger,America/Denver\r
CLS,Chehalis,America/Los_Angeles\r
EVW,Evanston,America/Denver\r
EUF,Eufala,America/Chicago\r
MEO,Manteo,America/New_York\r
AUO,Auburn,America/Chicago\r
DBN,Dublin,America/New_York\r
PUK,Pukarua,Pacific/Tahiti\r
CVO,Corvallis,America/Los_Angeles\r
PXH,Prominent Hill,Australia/Adelaide\r
CWT,Chatsworth,Australia/Sydney\r
OGD,Ogden,America/Denver\r
AKO,Akron,America/Denver\r
SHN,Shelton,America/Los_Angeles\r
WNA,Napakiak,America/Anchorage\r
PKA,Napaskiak,America/Anchorage\r
YBW,Bedwell Harbour,America/Vancouver\r
WSO,Washabo,America/Paramaribo\r
WKR,Walker's Cay,America/Nassau\r
GFO,Bartica,America/Guyana\r
DYL,Doylestown,America/New_York\r
TGI,Tingo Maria,America/Lima\r
TJL,Tres Lagoas,America/Campo_Grande\r
YZY,Zhangye,Asia/Shanghai\r
OAL,Cacoal,America/Porto_Velho\r
OCW,Washington,America/New_York\r
MHC,Castro,America/Santiago\r
SWO,Stillwater,America/Chicago\r
OKM,Okmulgee,America/Chicago\r
CUH,Cushing,America/Chicago\r
CSM,Clinton,America/Chicago\r
WLD,Winfield,America/Chicago\r
PWA,Oklahoma City,America/Chicago\r
DTN,Shreveport,America/Chicago\r
SEP,Stephenville,America/Chicago\r
ADT,Ada,America/Chicago\r
IRB,Iraan,America/Chicago\r
YEL,ELLIOT LAKE,America/Toronto\r
IKB,North Wilkesboro,America/New_York\r
DAN,Danville,America/New_York\r
ERG,Yerbogachen,Asia/Irkutsk\r
HCW,Cheraw,America/New_York\r
BEM,Beni Mellal,Africa/Casablanca\r
NKT,Cizre,Europe/Istanbul\r
SUY,Suntar,Asia/Yakutsk\r
OUZ,Zouerat,Africa/Nouakchott\r
ABB,Asaba,Africa/Lagos\r
QUO,Uyo,Africa/Lagos\r
KAA,Kasama,Africa/Lusaka\r
SGX,Songea,Africa/Dar_es_Salaam\r
JUH,Chizhou,Asia/Shanghai\r
AOG,Anshan,Asia/Shanghai\r
DQA,Daqing,Asia/Shanghai\r
ZYI,Zunyi,Asia/Shanghai\r
LDS,Yinchun,Asia/Shanghai\r
AVA,Anshun,Asia/Shanghai\r
KSS,Sikasso,Africa/Bamako\r
WTB,Toowoomba,Australia/Brisbane\r
TNH,Tonghua,Asia/Shanghai\r
SZV,Suzhou,Asia/Shanghai\r
LII,Mulia,Asia/Jayapura\r
NTI,Bintuni,Asia/Jayapura\r
WSR,Wasior,Asia/Jayapura\r
DTB,Siborong-Borong,Asia/Jakarta\r
MEQ,Nagan Raya,Asia/Jakarta\r
BUW,Bau-Bau,Asia/Makassar\r
KAZ,Kao,Asia/Jayapura\r
MNA,Melonguane,Asia/Makassar\r
SGQ,Sanggata,Asia/Makassar\r
BUU,Muara Bungo,Asia/Jakarta\r
ILA,Illaga,Asia/Jayapura\r
OKL,Oksibil,Asia/Jayapura\r
KOX,Kokonau,Asia/Jayapura\r
CMQ,Clermont,Australia/Brisbane\r
WMB,Warrnambool,Australia/Melbourne\r
RCM,Richmond,Australia/Brisbane\r
DCN,Derby,Australia/Perth\r
KNO,Medan,Asia/Jakarta\r
AMN,Kamloops,America/Detroit\r
HMY,Seosan,Asia/Seoul\r
EMT,El Monte,America/Los_Angeles\r
FAH,Farah,Asia/Kabul\r
IXT,Pasighat,Asia/Kolkata\r
KRQ,Kramatorsk,Europe/Kyiv\r
QKX,Kautokeino,Europe/Oslo\r
SSF,Stinson,America/Chicago\r
JAS,Jasper,America/Chicago\r
MRF,Marfa,America/Chicago\r
ALE,Alpine,America/Chicago\r
BQE,Bubaque,Africa/Bissau\r
CZA,Chichen Itza,America/Merida\r
BUY,Bunbury,Australia/Perth\r
CCB,Upland,America/Los_Angeles\r
EKI,Elkhart,America/Indiana/Indianapolis\r
CUB,Columbia,America/New_York\r
GDC,Greenville,America/New_York\r
HVS,Hartsville,America/New_York\r
SZT,San Cristobal de las Casas,America/Mexico_City\r
DU9,Dunnville,America/Toronto\r
RIH,Rio Hato,America/Panama\r
LEE,Leesburg,America/New_York\r
PPY,Pouso Alegre,America/Sao_Paulo\r
DIQ,Divinopolis,America/Sao_Paulo\r
EIK,Eysk,Europe/Moscow\r
ERD,Berdyansk,Europe/Kyiv\r
BWX,Banyuwangi,Asia/Jakarta\r
ERL,Erenhot,Asia/Shanghai\r
CNO,Chino,America/Los_Angeles\r
HTR,Taketomi,Asia/Tokyo\r
BWW,Cayo Santa Maria,America/Havana\r
PRB,Paso Robles,America/Los_Angeles\r
PKX,Beijing,Asia/Shanghai\r
HAF,Half Moon Bay,America/Los_Angeles\r
HCJ,Hechi,Asia/Shanghai\r
WJF,Lancaster,America/Los_Angeles\r
CJF,Coondewanna,Australia/Perth\r
GUZ,Guarapari,America/Sao_Paulo\r
UBT,Ubatuba,America/Sao_Paulo\r
BOX,Borroloola,Australia/Darwin\r
QUG,Goodwood,Europe/London\r
TNW,Tena,America/Guayaquil\r
FYJ,Fuyuan,Asia/Shanghai\r
PZL,Phinda,Africa/Johannesburg\r
LPF,Liupanshui,Asia/Shanghai\r
KJH,Kaili,Asia/Shanghai\r
HPG,Shennongjia,Asia/Shanghai\r
ZQZ,Zhangjiakou,Asia/Shanghai\r
YIE,Arxan,Asia/Shanghai\r
HNY,Hengyang,Asia/Shanghai\r
AHJ,Ngawa,Asia/Shanghai\r
WOS,Wonsan,Asia/Pyongyang\r
IGT,Magas,Europe/Moscow\r
ASN,Talladega,America/Chicago\r
GMU,Greenville,America/New_York\r
NGD,Anegada,America/Tortola\r
TOI,Troy,America/Chicago\r
ETS,Enterprise,America/Chicago\r
EFG,Efogi,Pacific/Port_Moresby\r
KGW,Kagi,Pacific/Port_Moresby\r
NDN,Nadunumu,Pacific/Port_Moresby\r
BNM,Bodinumu,Pacific/Port_Moresby\r
ALX,Alexander City,America/Chicago\r
PKT,Wadeye,Australia/Darwin\r
GPN,Pirlangimpi,Australia/Darwin\r
DOH,Doha,Asia/Qatar\r
HZP,Wood Buffalo,America/Edmonton\r
HDE,Holdredge,America/Chicago\r
PTT,Pratt,America/Chicago\r
LXN,Lexington,America/Chicago\r
CBF,Council Bluffs,America/Chicago\r
OKK,Kokomo,America/Indiana/Indianapolis\r
GBG,Galesburg,America/Chicago\r
GUY,Guymon,America/Chicago\r
IDP,Independence,America/Chicago\r
BBC,Bay City,America/Chicago\r
PRX,Paris,America/Chicago\r
CFV,Coffeyville,America/Chicago\r
GXY,Greeley,America/Denver\r
OEL,Oakley,Europe/Moscow\r
FET,Fremont,America/Chicago\r
LGD,La Grande,America/Los_Angeles\r
SZY,Szczytno-Szymany,Europe/Warsaw\r
MPO,Mount Pocono,America/New_York\r
UKT,Quakertown,America/New_York\r
YBA,Banff,America/Edmonton\r
BNG,Banning,America/Los_Angeles\r
OFK,Norfolk  Nebraska,America/Chicago\r
TFL,Teofilo Otoni,America/Sao_Paulo\r
TPF,Tampa,America/New_York\r
BZC,Buzios,America/Sao_Paulo\r
ITP,Itaperuna,America/Sao_Paulo\r
REZ,Resende,America/Sao_Paulo\r
KBN,Kabinda,Africa/Lubumbashi\r
IKL,Ikela,Africa/Kinshasa\r
AIR,Aripuana,America/Cuiaba\r
JRN,Juruena,America/Cuiaba\r
JIA,Juina,America/Cuiaba\r
VLP,Vila Rica,America/Cuiaba\r
JUA,Juara,America/Cuiaba\r
CCX,Caceres,America/Cuiaba\r
TGQ,Tangara da Serra,America/Cuiaba\r
CQA,Canarana,America/Cuiaba\r
MTG,Vila Bela da Santissima Trindade ,America/Cuiaba\r
BMB,Bumba,Africa/Kinshasa\r
APQ,Arapiraca,America/Maceio\r
FLB,Floriano,America/Fortaleza\r
PCS,Picos,America/Fortaleza\r
BNC,Beni,Africa/Lubumbashi\r
BNB,Boende,Africa/Kinshasa\r
MTP,Montauk,America/New_York\r
VPZ,Valparaiso IN,America/Chicago\r
DRV,DHARAVANDHOO,Indian/Maldives\r
SXK,Saumlaki,Asia/Jayapura\r
MLZ,Melo,America/Montevideo\r
PDU,Paysandu,America/Montevideo\r
ATI,Artigas ,America/Montevideo\r
HSM,Horsham,Australia/Melbourne\r
SWH,Swan Hill,Australia/Melbourne\r
TTL,Turtle Island,Pacific/Fiji\r
KWB,Karimunjawa,Asia/Jakarta\r
KOO,Kongolo,Africa/Lubumbashi\r
AOU,Attopeu,Asia/Vientiane\r
SQX,Sao Miguel do Oeste,America/Sao_Paulo\r
LDM,Ludington,America/Detroit\r
RHV,San Jose,America/Los_Angeles\r
OHS,Sohar,Asia/Muscat\r
KCF,Kadanwari,Asia/Karachi\r
RZS,Sindh,Asia/Karachi\r
TMF,Thimarafushi,Indian/Maldives\r
IFU,Ifuru,Indian/Maldives\r
KZF,Kieta,Pacific/Port_Moresby\r
OGU,Ordu-Giresun,Europe/Istanbul\r
YKO,Hakkari,Europe/Istanbul\r
BUT,Jakar,Asia/Thimphu\r
TLI,Toli-Toli,Asia/Makassar\r
TQL,Tarko-Sale,Asia/Yekaterinburg\r
JIC,Jinchuan,Asia/Shanghai\r
BPL,Bole,Asia/Urumqi\r
FYN,Fuyun,Asia/Urumqi\r
ACS,Achinsk,Asia/Krasnoyarsk\r
LFQ,LINFEN,Asia/Shanghai\r
YJP,Hinton,America/Edmonton\r
WVI,Watsonville,America/Los_Angeles\r
GLU,Gelephu,Asia/Thimphu\r
HLI,Hollister,America/Los_Angeles\r
DLK,Dulkaninna,Australia/Adelaide\r
YBS,Musselwhite Mine,America/Winnipeg\r
RIZ,Rizhao,Asia/Shanghai\r
SQJ,Sanming,Asia/Shanghai\r
XTO,Taroom,Australia/Brisbane\r
YSE,Squamish,America/Vancouver\r
YAH,La Grande-4,America/Toronto\r
YAL,Alert Bay,America/Vancouver\r
YCE,Centralia,America/Toronto\r
YCQ,Chetwynd,America/Dawson_Creek\r
XRR,Ross River,America/Whitehorse\r
YDO,Dolbeau-St-Flicien,America/Toronto\r
YEY,Amos,America/Toronto\r
YHE,Hope,America/Vancouver\r
YHT,Haines Junction,America/Whitehorse\r
YDG,Digby,America/Halifax\r
YJF,Fort Liard,America/Inuvik\r
YKJ,Key Lake,America/Regina\r
YLR,Leaf Rapids,America/Winnipeg\r
YME,Matane,America/Toronto\r
YML,Charlevoix,America/Toronto\r
YOS,Owen Sound,America/Toronto\r
YPS,Port Hawkesbury,America/Glace_Bay\r
YQS,St Thomas,America/Toronto\r
YRO,Ottawa,America/Toronto\r
YSH,Smiths Falls,America/Toronto\r
YSL,St Leonard,America/Moncton\r
YVE,Vernon,America/Vancouver\r
YXQ,Beaver Creek,America/Dawson\r
YSN,Salmon Arm,America/Vancouver\r
KES,Kelsey,America/Winnipeg\r
XPK,Pukatawagan,America/Winnipeg\r
ZGF,Grand Forks,America/Vancouver\r
ZJG,Jenpeg,America/Winnipeg\r
YTD,Thicket Portage,America/Winnipeg\r
PIW,Pikwitonei,America/Winnipeg\r
XPP,Poplar River,America/Winnipeg\r
WPC,Pincher Creek,America/Edmonton\r
ZST,Stewart,America/Vancouver\r
ZUC,Ignace,America/Winnipeg\r
FNB,Neubrandenburg,Europe/Berlin\r
FSS,Kinloss,Europe/London\r
BXP,Biaa Podlaska,Europe/Warsaw\r
DGP,Daugavpils,Europe/Riga\r
LMR,Lime Acres,Africa/Johannesburg\r
SXN,Sowa,Africa/Gaborone\r
NDD,Sumbe,Africa/Luanda\r
MAI,Mangochi,Africa/Blantyre\r
ADI,Arandis,Africa/Windhoek\r
MWE,Merowe,Africa/Khartoum\r
ALN,Alton/St Louis,America/Chicago\r
AXN,Alexandria,America/Chicago\r
CLU,Columbus,America/Indiana/Indianapolis\r
BBD,Brady,America/Chicago\r
BIH,Bishop,America/Los_Angeles\r
BKE,Baker City,America/Los_Angeles\r
BPI,Big Piney,America/Denver\r
WMH,Mountain Home,America/Chicago\r
BTL,Battle Creek,America/Detroit\r
BYI,Burley,America/Boise\r
CCY,Charles City,America/Chicago\r
CNU,Chanute,America/Chicago\r
CRG,Jacksonville,America/New_York\r
CSV,Crossville,America/Chicago\r
DAA,Fort Belvoir,America/New_York\r
DAG,Daggett,America/Los_Angeles\r
DMN,Deming,America/Denver\r
DRA,Mercury,America/Los_Angeles\r
EED,Needles,America/Los_Angeles\r
EGI,Crestview,America/Chicago\r
EKA,Eureka,America/Los_Angeles\r
HYR,Hayward,America/Chicago\r
JCT,Junction,America/Chicago\r
LOL,Lovelock,America/Los_Angeles\r
MBG,Mobridge,America/Chicago\r
MCB,Mc Comb,America/Chicago\r
MDH,Carbondale/Murphysboro,America/Chicago\r
MMT,Eastover,America/New_York\r
NHZ,Brunswick,America/New_York\r
NRB,Mayport,America/New_York\r
OGB,Orangeburg,America/New_York\r
OTM,Ottumwa,America/Chicago\r
OZR,Fort Rucker/Ozark,America/Chicago\r
PWY,Pinedale,America/Denver\r
POU,Poughkeepsie,America/New_York\r
RSL,Russell,America/Chicago\r
RWF,Redwood Falls,America/Chicago\r
SNS,Salinas,America/Los_Angeles\r
TPH,Tonopah,America/Los_Angeles\r
UKI,Ukiah,America/Los_Angeles\r
UOX,Oxford,America/Chicago\r
HTV,Huntsville,America/Chicago\r
VTN,Valentine,America/Chicago\r
WMC,Winnemucca,America/Los_Angeles\r
WWR,Woodward,America/Chicago\r
ZZV,Zanesville,America/New_York\r
ECV,Madrid,Europe/Madrid\r
CDT,Castelln de la Plana,Europe/Madrid\r
TEV,Teruel,Europe/Madrid\r
QLP,Sarzana (SP),Europe/Rome\r
BJY,Batajnica,Europe/Belgrade\r
RUV,Rubelsanto,America/Guatemala\r
XPL,Comayagua,America/Tegucigalpa\r
UPL,Upala,America/Costa_Rica\r
QSN,San Nicols,America/Havana\r
SNJ,Pinar Del Rio,America/Havana\r
DWD,Dawadmi Domestic Airport,Asia/Riyadh\r
KMX,Khamis Mushait,Asia/Riyadh\r
XXN,Riyadh,Asia/Riyadh\r
KNR,Kangan,Asia/Tehran\r
PYK,Karaj,Asia/Tehran\r
XIJ,Ahmed Al Jaber AB,Asia/Kuwait\r
ATG,Kamra,Asia/Karachi\r
SGI,Sargodha,Asia/Karachi\r
RQW,Qayyarah,Asia/Baghdad\r
ENN,Nenana,America/Anchorage\r
WWA,Wasilla,America/Anchorage\r
IWK,Iwakuni,Asia/Tokyo\r
IEJ,Ie,Asia/Tokyo\r
AAV,Surallah,Asia/Manila\r
BPH,Bislig,Asia/Manila\r
MXI,Mexico City,Asia/Manila\r
BAT,Barretos,America/Sao_Paulo\r
QHP,Taubat,America/Sao_Paulo\r
TOQ,Tocopilla,America/Santiago\r
CNR,Chaaral,America/Santiago\r
TLX,Talca,America/Santiago\r
ZIC,Victoria,America/Santiago\r
TTC,Taltal,America/Santiago\r
API,Apiay,America/Bogota\r
CVE,Coveas,America/Bogota\r
PAL,La Dorada,America/Bogota\r
PZA,Paz De Ariporo,America/Bogota\r
TQS,Tres Esquinas,America/Bogota\r
RIJ,Rioja,America/Lima\r
JAE,Jaen,America/Lima\r
IKU,Tamchy,Asia/Bishkek\r
VYI,Vilyuisk,Asia/Yakutsk\r
BGN,Borovikovo,Asia/Srednekolymsk\r
GVN,Sovetskaya Gavan,Asia/Vladivostok\r
NLI,Nikolayevsk-na-Amure Airport,Asia/Vladivostok\r
VLK,Volgograd,Europe/Moscow\r
INA,Inta,Europe/Moscow\r
ZIX,Zhigansk,Asia/Yakutsk\r
RTC,Raipur,Asia/Kolkata\r
HIM,Polonnaruwa Town,Asia/Colombo\r
RDP,Durgapur,Asia/Kolkata\r
PUT,Puttaparthi,Asia/Kolkata\r
LNX,Smolensk,Europe/Moscow\r
ABH,Alpha,Australia/Brisbane\r
ARY,Albury,Australia/Melbourne\r
BLN,Ballarat,Australia/Melbourne\r
BZD,Bathurst,Australia/Sydney\r
BWQ,Bowen,Australia/Sydney\r
CVC,Currie,Australia/Adelaide\r
CWW,Camwood,Australia/Sydney\r
CYG,Cyclone,Australia/Melbourne\r
CMD,Commander,Australia/Sydney\r
DRN,Dirranbandi,Australia/Brisbane\r
DNQ,Deniliquin,Australia/Sydney\r
DYA,Dyarrah,Australia/Brisbane\r
ECH,East Kimberley,Australia/Melbourne\r
FRB,Forbes,Australia/Sydney\r
GUH,Guichen,Australia/Sydney\r
HXX,Horsham,Australia/Sydney\r
HTU,Victoria,Australia/Melbourne\r
KRA,Karumba,Australia/Melbourne\r
KPS,Kempsey,Australia/Sydney\r
KGY,King George Island,Australia/Brisbane\r
TGN,Morwell,Australia/Melbourne\r
MRG,Marlborough,Australia/Brisbane\r
RPM,Roper River,Australia/Darwin\r
QRM,New South Wales,Australia/Sydney\r
PPI,Penrith,Australia/Adelaide\r
SIO,Smithton,Australia/Hobart\r
SNB,Milikapiti,Australia/Darwin\r
SWC,Stawell,Australia/Melbourne\r
TYB,Tyler,Australia/Sydney\r
TUM,Tumut,Australia/Sydney\r
WGT,Westport,Australia/Melbourne\r
WKB,Warracknabeal,Australia/Melbourne\r
QRR,Warren,Australia/Sydney\r
SXE,Sale,Australia/Melbourne\r
WWY,West Wyalong,Australia/Sydney\r
NGA,Young,Australia/Sydney\r
LHK,Guanghua,Asia/Shanghai\r
WDS,Shiyan,Asia/Shanghai\r
HTT,Mengnai,Asia/Shanghai\r
UUN,Ratchakrut,Asia/Ulaanbaatar\r
BFU,Bengbu,Asia/Shanghai\r
RUG,Rugao,Asia/Shanghai\r
WHU,Wuhu,Asia/Shanghai\r
SXJ,Shanshan,Asia/Urumqi\r
YKH,Yingkou,Asia/Shanghai\r
BQG,Bogorodskoe,Asia/Vladivostok\r
HYD,Hyderabad,Asia/Kolkata\r
PKO,Parakou,Africa/Porto-Novo\r
KDC,Kandi,Africa/Porto-Novo\r
HMG,Hermannsburg,Australia/Darwin\r
BIB,Baidoa,Africa/Mogadishu\r
KCS,Petermann,Australia/Darwin\r
BMR,Baltrum,Europe/Berlin\r
MVW,Skagit,America/Los_Angeles\r
GOO,Goondiwindi,Australia/Brisbane\r
APT,Jasper,America/Chicago\r
DCU,Decatur,America/Chicago\r
GLW,Glasgow,America/Chicago\r
DKV,Docker River,Australia/Darwin\r
RNZ,Rensselaer,America/Chicago\r
SBT,Sabetta,Asia/Yekaterinburg\r
AXF,Alxa Left Banner,Asia/Shanghai\r
NIS,Simberi Island,Pacific/Port_Moresby\r
BUL,Bulolo,Pacific/Port_Moresby\r
TBR,Statesboro,America/New_York\r
AMT,Amata,Australia/Adelaide\r
EDD,Erldunda,Australia/Darwin\r
FIK,Finke,Australia/Darwin\r
JJG,Jaguaruna,America/Sao_Paulo\r
WKI,Hwange,Africa/Harare\r
KLJ,Klaipeda,Europe/Vilnius\r
ETB,WEST BEND,America/Chicago\r
GLR,GAYLORD,America/Detroit\r
AID,ANDERSON,America/Indiana/Indianapolis\r
QND,Novi Sad,Europe/Belgrade\r
GUU,Grundarfjordur,Atlantic/Reykjavik\r
PCD,Prairie du Chien,America/Chicago\r
OTJ,Otjiwarongo,Africa/Windhoek\r
TSM,Taos,America/Denver\r
RTN,Raton,America/Denver\r
PPA,Pampa,America/Chicago\r
FLP,Flippin,America/Chicago\r
BGD,Borger,America/Chicago\r
HLE,Longwood,Atlantic/St_Helena\r
BNJ,Sankt-Augustin,Europe/Berlin\r
NGK,Nogliki,Asia/Sakhalin\r
SQA,Santa Ynez,America/Los_Angeles\r
HXD,Haixi,Asia/Shanghai\r
BAR,Qionghai,Asia/Shanghai\r
ZBO,Bowen,Australia/Brisbane\r
UCB,Wulanchabu,Asia/Shanghai\r
KEO,Odienne,Africa/Abidjan\r
GII,Siguiri,Africa/Conakry\r
NZE,Nzerekore,Africa/Conakry\r
OCM,Brockman,Australia/Perth\r
WGN,Shaoyang,Asia/Shanghai\r
TXF,Teixeira de Freitas,America/Bahia\r
SPA,Spartangurg,America/New_York\r
BJW,Bajawa,Asia/Makassar\r
NBN,San Antonio de Pale,Africa/Malabo\r
OLL,Oyo,Africa/Brazzaville\r
PPF,Parsons,America/Chicago\r
PCQ,Phongsaly,Asia/Vientiane\r
AYS,Waycross,America/New_York\r
DSS,Diass,Africa/Dakar\r
PMH,Portsmouth,America/New_York\r
NAC,Naracoorte,Australia/Adelaide\r
PGZ,Ponta Grossa,America/Sao_Paulo\r
PQM,Palenque,America/Mexico_City\r
CUD,Caloundra,Australia/Brisbane\r
CLP,Clarks Point,America/Anchorage\r
JOJ,Doris Lake,America/Cambridge_Bay\r
ECI,Tola,America/Managua\r
QGQ,Attu,America/Nuuk\r
QPW,Kangaatsiaq,America/Nuuk\r
QJE,Kitsissuarsuit,America/Nuuk\r
XIQ,Ilimanaq,America/Nuuk\r
QQT,Qeqertaq,America/Nuuk\r
QJI,Ikamiut,America/Nuuk\r
QFG,Eqalugaarsuit,America/Nuuk\r
QRY,Ikerasaarsuk,America/Nuuk\r
NPR,Novo Progresso,America/Santarem\r
SMT,Sorriso,America/Cuiaba\r
ENO,Encarnacion,America/Asuncion\r
UZR,Urzhar,Asia/Almaty\r
NYR,Nyurba,Asia/Yakutsk\r
SUK,Batagay-Alyta,Asia/Yakutsk\r
UKG,Ust-Kuyga,Asia/Vladivostok\r
VHV,Verkhnevilyuysk,Asia/Yakutsk\r
DEE,Yuzhno-Kurilsk,Asia/Magadan\r
EKS,Shakhtyorsk,Asia/Sakhalin\r
TLK,Talakan,Asia/Yakutsk\r
RDB,Red Dog,America/Nome\r
ION,Impfondo,Africa/Brazzaville\r
EBH,El Bayadh,Africa/Algiers\r
ZIS,Zintan,Africa/Tripoli\r
MYZ,Monkey Bay,Africa/Blantyre\r
BCU,Bauchi,Africa/Lagos\r
GMO,Gombe,Africa/Lagos\r
KDA,Kolda,Africa/Dakar\r
SHO,Manzini,Africa/Mbabane\r
KIY,Kilwa Masoko,Africa/Dar_es_Salaam\r
QSI,Moshi,Africa/Dar_es_Salaam\r
MNS,Mansa,Africa/Lusaka\r
GZI,Ghazni,Asia/Kabul\r
DBC,Baicheng,Asia/Shanghai\r
LNL,Longnan,Asia/Shanghai\r
SQD,Shangrao,Asia/Shanghai\r
YSQ,Songyuan,Asia/Shanghai\r
JSJ,Jiansanjiang,Asia/Shanghai\r
WMT,Zunyi,Asia/Shanghai\r
LLB,Libo,Asia/Shanghai\r
CDE,Chengde,Asia/Shanghai\r
DTU,Wudalianchi,Asia/Shanghai\r
EJN,Ejin Banner,Asia/Shanghai\r
RHT,Alxa Right Banner,Asia/Shanghai\r
HUO,Holingol,Asia/Shanghai\r
GMQ,Golog,Asia/Shanghai\r
QSZ,Yarkant,Asia/Urumqi\r
TEI,Tezu,Asia/Kolkata\r
CWJ,Cangyuan,Asia/Shanghai\r
JMJ,Lancang Lahu,Asia/Shanghai\r
NLH,Ninglang,Asia/Shanghai\r
PBQ,Pimenta Bueno,America/Porto_Velho\r
WUT,Xinzhou,Asia/Shanghai\r
NZL,Zhalantun,Asia/Shanghai\r
AIP,Adampur,Asia/Kolkata\r
VDY,Toranagallu,Asia/Kolkata\r
SAG,Shirdi,Asia/Kolkata\r
PYB,Jeypore,Asia/Kolkata\r
SUP,Sumenep,Asia/Jakarta\r
RKO,Sipora,Asia/Jakarta\r
PPR,Pasir Pangaraian,Asia/Jakarta\r
TJB,Tanjung Balai Karimun,Asia/Jakarta\r
KRC,Kerinci Regency,Asia/Jakarta\r
NRE,Buru Island,Asia/Jayapura\r
NAM,Namlea,Asia/Jayapura\r
DOB,Dobo,Asia/Jayapura\r
SQN,Sanana,Asia/Jayapura\r
AYW,Ayawasi,Asia/Jayapura\r
BYQ,Bunyu,Asia/Makassar\r
UOL,Buol,Asia/Makassar\r
RAQ,Raha,Asia/Makassar\r
JSK,Jask,Asia/Tehran\r
ZBY,Sainyabuli,Asia/Vientiane\r
BGL,Baglung,Asia/Kathmandu\r
RJB,Rajbiraj,Asia/Kathmandu\r
DQM,Duqm,Asia/Muscat\r
CKI,Croker Island,Australia/Darwin\r
BYP,Barimunya,Australia/Perth\r
LUC,Laucala,Pacific/Fiji\r
YAS,Yasawa Island,Pacific/Fiji\r
WIK,Waiheke Island,Pacific/Auckland\r
DEX,Dekai,Asia/Jayapura\r
NAU,Napuka,Pacific/Tahiti\r
FAC,Faaite,Pacific/Tahiti\r
NUK,Nukutavake,Pacific/Tahiti\r
VHZ,Vahitahi,Pacific/Tahiti\r
HHZ,Hikueru,Pacific/Tahiti\r
RRR,Raroia,Pacific/Tahiti\r
KHZ,Kauehi,Pacific/Tahiti\r
TKV,Tatakoto,Pacific/Tahiti\r
TDS,Sasereme,Pacific/Port_Moresby\r
TMH,Boven Digoel,Asia/Jayapura\r
NKB,Noonkanbah,Australia/Perth\r
AEI,Algeciras,Europe/Madrid\r
KSE,Kasese,Africa/Kampala\r
NCJ,Sunchales,America/Argentina/Cordoba\r
IST,Istanbul,Europe/Istanbul\r
SOV,Seldovia,America/Anchorage\r
YSG,Lutselk'e,America/Edmonton\r
DWA,Dwangwa,Africa/Blantyre\r
HGI,Higleig,Africa/Juba\r
KQH,Ajmer,Asia/Kolkata\r
CNN,Kannur,Asia/Kolkata\r
ZCO,Temuco,America/Santiago\r
ASS,Arathusa,Africa/Johannesburg\r
VDI,Vidalia,America/New_York\r
ISB,Islamabad,Asia/Karachi\r
MHE,Mitchell,America/Chicago\r
GIT,Geita,Africa/Dar_es_Salaam\r
GID,Gitega,Africa/Bujumbura\r
RMU,Murcia,Europe/Madrid\r
CQS,COSTA MARQUES,America/Porto_Velho\r
ZXT,Baku,Asia/Baku\r
JAM,Yambol,Europe/Sofia\r
YUA,Yuanmou,Asia/Shanghai\r
XEN,Huludao,Asia/Shanghai\r
GEC,Geitkale,Asia/Famagusta\r
MBI,Mbeya,Africa/Dar_es_Salaam\r
UGU,Sugapa-Papua Island,Asia/Jayapura\r
ETM,Eilat,Asia/Jerusalem\r
MNH,Al Masna'ah,Asia/Muscat\r
CGY,Cagayan de Oro City,Asia/Manila\r
CPO,Copiapo,America/Santiago\r
`;function Vd(n){const i=[];let t=[],s="",u=!1;for(let A=0;A<n.length;A+=1){const m=n[A];m==='"'&&n[A+1]==='"'&&u?(s+='"',A+=1):m==='"'?u=!u:m===","&&!u?(t.push(s.trim()),s=""):(m===`
`||m==="\r")&&!u?(m==="\r"&&n[A+1]===`
`&&(A+=1),t.push(s.trim()),t.some(Boolean)&&i.push(t),t=[],s=""):s+=m}return t.push(s.trim()),t.some(Boolean)&&i.push(t),i}function Dg(n){const i=Vd(n),t=new Map;return i.slice(1).forEach(s=>{const u=(s[0]||"").trim().toUpperCase(),A=(s[1]||"").trim();u&&A&&t.set(u,A)}),t}const xg=Dg(bg);function fa(n){return xg.get(n.trim().toUpperCase())||""}function Kg(n){const i=n.match(/^(?:(\d{4})[-/]((?:0?[1-9])|(?:1[0-2]))[-/](\d{1,2})|(\d{1,2})[-/]((?:0?[1-9])|(?:1[0-2]))[-/](\d{4}))/);return i?{year:Number(i[1]||i[6]),month:Number(i[2]||i[5]),day:Number(i[3]||i[4])}:null}function Ig(n){const i=n.search(/-|:/);return i===-1?{label:(n||"ACT").slice(0,8).toUpperCase(),description:n||"ACT"}:{label:n.slice(0,i).trim().toUpperCase(),description:n.slice(i+1)}}function _g(n){const i=Vd(n);if(i.length<2)return{events:{},period:null};const t={};let s=null,u="";return i.slice(1).forEach(A=>{const m=(A[0]||"").trim(),h=(A[1]||"").trim(),f=(A[2]||"").trim();(A[3]||"").trim();const p=(A[4]||"").trim(),y=Kg(h);if(!y)return;const k=m.match(/([A-Z]{2,3})(\d{3,4})\s+([A-Z]{3})\d{4}-([A-Z]{3})\d{4}/i),v=f&&p?`${f}–${p}`:f||p||"Todo el día",B=Ig(m),R=k?`${k[3].toUpperCase()}-${k[4].toUpperCase()}`:B.label,N=k?`${k[1].toUpperCase()}${k[2]}`:"",w=m.toLowerCase(),_=w.includes("libre")||w.includes("rest")?"rest":w.includes("reserva")||w.includes("reserve")?"reserve":w.includes("form")||w.includes("train")||w.includes("alumno")?"training":"duty";w.includes("firma")&&(u=f);const G=k?`${fa(k[3])||k[3].toUpperCase()}–${fa(k[4])||k[4].toUpperCase()}`:"",V=k?G:B.description;w.includes("firma")||(t[y.day]||(t[y.day]=[]),t[y.day].push({label:R,desc:V,flightNumber:N,situated:N.startsWith("VS"),firmaTime:u,time:v,type:_,month:y.month,year:y.year}),u=""),s||(s={month:y.month,year:y.year})}),{events:t,period:s}}const Yg={Iberia:_g};function Og(n,i){const t=Yg[i];if(!t)throw new Error(`No hay un importador disponible para ${i}.`);return t(n)}const fl={duty:{light:"bg-blue-50 border-blue-200 text-blue-900",dark:"bg-blue-950/70 border-blue-800 text-blue-100",dot:"bg-blue-500"},rest:{light:"bg-emerald-50 border-emerald-200 text-emerald-900",dark:"bg-emerald-950/70 border-emerald-800 text-emerald-100",dot:"bg-emerald-500"},training:{light:"bg-violet-50 border-violet-200 text-violet-900",dark:"bg-violet-950/70 border-violet-800 text-violet-100",dot:"bg-violet-500"},reserve:{light:"bg-amber-50 border-amber-200 text-amber-900",dark:"bg-amber-950/70 border-amber-800 text-amber-100",dot:"bg-amber-500"}},Gg={1:[{label:"S5",desc:"ALUMNO",time:"07:30–15:10",type:"training"}],2:[{label:"S5",desc:"ALUMNO",time:"07:30–15:10",type:"training"}],4:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],5:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],7:[{label:"T5",desc:"ALUMNO",time:"12:40–19:55",type:"training"}],9:[{label:"RES",desc:"RESERVA",time:"06:00–14:00",type:"reserve"}],10:[{label:"S5",desc:"ALUMNO",time:"07:30–15:10",type:"training"}],12:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],13:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],15:[{label:"S5",desc:"ALUMNO",time:"07:30–15:10",type:"training"},{label:"REF",desc:"REFRESCO",time:"17:00–18:30",type:"duty"}],17:[{label:"RES",desc:"RESERVA",time:"14:00–22:00",type:"reserve"}],19:[{label:"T5",desc:"ALUMNO",time:"12:40–19:55",type:"training"}],21:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],22:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}],24:[{label:"S5",desc:"ALUMNO",time:"07:30–15:10",type:"training"}],26:[{label:"T5",desc:"ALUMNO",time:"12:40–19:55",type:"training"}],28:[{label:"RES",desc:"RESERVA",time:"06:00–14:00",type:"reserve"}],30:[{label:"X",desc:"DÍA LIBRE",time:"00:00–23:59",type:"rest"}]},_l=I.createContext({});function Yl(n){const i=I.useRef(null);return i.current===null&&(i.current=n()),i.current}const Qt=I.createContext(null),Ol=I.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});class Hg extends I.Component{getSnapshotBeforeUpdate(i){const t=this.props.childRef.current;if(t&&i.isPresent&&!this.props.isPresent){const s=this.props.sizeRef.current;s.height=t.offsetHeight||0,s.width=t.offsetWidth||0,s.top=t.offsetTop,s.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function Vg({children:n,isPresent:i}){const t=I.useId(),s=I.useRef(null),u=I.useRef({width:0,height:0,top:0,left:0}),{nonce:A}=I.useContext(Ol);return I.useInsertionEffect(()=>{const{width:m,height:h,top:f,left:p}=u.current;if(i||!s.current||!m||!h)return;s.current.dataset.motionPopId=t;const y=document.createElement("style");return A&&(y.nonce=A),document.head.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${t}"] {
            position: absolute !important;
            width: ${m}px !important;
            height: ${h}px !important;
            top: ${f}px !important;
            left: ${p}px !important;
          }
        `),()=>{document.head.removeChild(y)}},[i]),g.jsx(Hg,{isPresent:i,childRef:s,sizeRef:u,children:I.cloneElement(n,{ref:s})})}const Fg=({children:n,initial:i,isPresent:t,onExitComplete:s,custom:u,presenceAffectsLayout:A,mode:m})=>{const h=Yl(Ug),f=I.useId(),p=I.useCallback(k=>{h.set(k,!0);for(const v of h.values())if(!v)return;s&&s()},[h,s]),y=I.useMemo(()=>({id:f,initial:i,isPresent:t,custom:u,onExitComplete:p,register:k=>(h.set(k,!1),()=>h.delete(k))}),A?[Math.random(),p]:[t,p]);return I.useMemo(()=>{h.forEach((k,v)=>h.set(v,!1))},[t]),I.useEffect(()=>{!t&&!h.size&&s&&s()},[t]),m==="popLayout"&&(n=g.jsx(Vg,{isPresent:t,children:n})),g.jsx(Qt.Provider,{value:y,children:n})};function Ug(){return new Map}function Fd(n=!0){const i=I.useContext(Qt);if(i===null)return[!0,null];const{isPresent:t,onExitComplete:s,register:u}=i,A=I.useId();I.useEffect(()=>{n&&u(A)},[n]);const m=I.useCallback(()=>n&&s&&s(A),[A,s,n]);return!t&&s?[!1,m]:[!0]}const It=n=>n.key||"";function vA(n){const i=[];return I.Children.forEach(n,t=>{I.isValidElement(t)&&i.push(t)}),i}const Gl=typeof window<"u",Ud=Gl?I.useLayoutEffect:I.useEffect,jd=({children:n,custom:i,initial:t=!0,onExitComplete:s,presenceAffectsLayout:u=!0,mode:A="sync",propagate:m=!1})=>{const[h,f]=Fd(m),p=I.useMemo(()=>vA(n),[n]),y=m&&!h?[]:p.map(It),k=I.useRef(!0),v=I.useRef(p),B=Yl(()=>new Map),[R,N]=I.useState(p),[w,_]=I.useState(p);Ud(()=>{k.current=!1,v.current=p;for(let Q=0;Q<w.length;Q++){const H=It(w[Q]);y.includes(H)?B.delete(H):B.get(H)!==!0&&B.set(H,!1)}},[w,y.length,y.join("-")]);const G=[];if(p!==R){let Q=[...p];for(let H=0;H<w.length;H++){const F=w[H],X=It(F);y.includes(X)||(Q.splice(H,0,F),G.push(F))}A==="wait"&&G.length&&(Q=G),_(vA(Q)),N(p);return}const{forceRender:V}=I.useContext(_l);return g.jsx(g.Fragment,{children:w.map(Q=>{const H=It(Q),F=m&&!h?!1:p===w||y.includes(H),X=()=>{if(B.has(H))B.set(H,!0);else return;let j=!0;B.forEach(le=>{le||(j=!1)}),j&&(V==null||V(),_(v.current),m&&(f==null||f()),s&&s())};return g.jsx(Fg,{isPresent:F,initial:!k.current||t?void 0:!1,custom:F?void 0:i,presenceAffectsLayout:u,mode:A,onExitComplete:F?void 0:X,children:Q},H)})})},mr=n=>n;let Wd=mr;function Hl(n){let i;return()=>(i===void 0&&(i=n()),i)}const pa=(n,i,t)=>{const s=i-n;return s===0?1:(t-n)/s},Jr=n=>n*1e3,zr=n=>n/1e3,jg={useManualTiming:!1};function Wg(n){let i=new Set,t=new Set,s=!1,u=!1;const A=new WeakSet;let m={delta:0,timestamp:0,isProcessing:!1};function h(p){A.has(p)&&(f.schedule(p),n()),p(m)}const f={schedule:(p,y=!1,k=!1)=>{const B=k&&s?i:t;return y&&A.add(p),B.has(p)||B.add(p),p},cancel:p=>{t.delete(p),A.delete(p)},process:p=>{if(m=p,s){u=!0;return}s=!0,[i,t]=[t,i],i.forEach(h),i.clear(),s=!1,u&&(u=!1,f.process(p))}};return f}const _t=["read","resolveKeyframes","update","preRender","render","postRender"],Jg=40;function Jd(n,i){let t=!1,s=!0;const u={delta:0,timestamp:0,isProcessing:!1},A=()=>t=!0,m=_t.reduce((_,G)=>(_[G]=Wg(A),_),{}),{read:h,resolveKeyframes:f,update:p,preRender:y,render:k,postRender:v}=m,B=()=>{const _=performance.now();t=!1,u.delta=s?1e3/60:Math.max(Math.min(_-u.timestamp,Jg),1),u.timestamp=_,u.isProcessing=!0,h.process(u),f.process(u),p.process(u),y.process(u),k.process(u),v.process(u),u.isProcessing=!1,t&&i&&(s=!1,n(B))},R=()=>{t=!0,s=!0,u.isProcessing||n(B)};return{schedule:_t.reduce((_,G)=>{const V=m[G];return _[G]=(Q,H=!1,F=!1)=>(t||R(),V.schedule(Q,H,F)),_},{}),cancel:_=>{for(let G=0;G<_t.length;G++)m[_t[G]].cancel(_)},state:u,steps:m}}const{schedule:ke,cancel:gn,state:He,steps:nl}=Jd(typeof requestAnimationFrame<"u"?requestAnimationFrame:mr,!0),zd=I.createContext({strict:!1}),CA={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ga={};for(const n in CA)ga[n]={isEnabled:i=>CA[n].some(t=>!!i[t])};function zg(n){for(const i in n)ga[i]={...ga[i],...n[i]}}const Zg=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Ft(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||Zg.has(n)}let Zd=n=>!Ft(n);function Qg(n){n&&(Zd=i=>i.startsWith("on")?!Ft(i):n(i))}try{Qg(require("@emotion/is-prop-valid").default)}catch{}function Xg(n,i,t){const s={};for(const u in n)u==="values"&&typeof n.values=="object"||(Zd(u)||t===!0&&Ft(u)||!i&&!Ft(u)||n.draggable&&u.startsWith("onDrag"))&&(s[u]=n[u]);return s}function qg(n){if(typeof Proxy>"u")return n;const i=new Map,t=(...s)=>n(...s);return new Proxy(t,{get:(s,u)=>u==="create"?n:(i.has(u)||i.set(u,n(u)),i.get(u))})}const Xt=I.createContext({});function pi(n){return typeof n=="string"||Array.isArray(n)}function qt(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}const Vl=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Fl=["initial",...Vl];function $t(n){return qt(n.animate)||Fl.some(i=>pi(n[i]))}function Qd(n){return!!($t(n)||n.variants)}function $g(n,i){if($t(n)){const{initial:t,animate:s}=n;return{initial:t===!1||pi(t)?t:void 0,animate:pi(s)?s:void 0}}return n.inherit!==!1?i:{}}function ey(n){const{initial:i,animate:t}=$g(n,I.useContext(Xt));return I.useMemo(()=>({initial:i,animate:t}),[PA(i),PA(t)])}function PA(n){return Array.isArray(n)?n.join(" "):n}const ry=Symbol.for("motionComponentSymbol");function ca(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function ny(n,i,t){return I.useCallback(s=>{s&&n.onMount&&n.onMount(s),i&&(s?i.mount(s):i.unmount()),t&&(typeof t=="function"?t(s):ca(t)&&(t.current=s))},[i])}const Ul=n=>n.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),ay="framerAppearId",Xd="data-"+Ul(ay),{schedule:jl}=Jd(queueMicrotask,!1),qd=I.createContext({});function iy(n,i,t,s,u){var A,m;const{visualElement:h}=I.useContext(Xt),f=I.useContext(zd),p=I.useContext(Qt),y=I.useContext(Ol).reducedMotion,k=I.useRef(null);s=s||f.renderer,!k.current&&s&&(k.current=s(n,{visualState:i,parent:h,props:t,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:y}));const v=k.current,B=I.useContext(qd);v&&!v.projection&&u&&(v.type==="html"||v.type==="svg")&&ty(k.current,t,u,B);const R=I.useRef(!1);I.useInsertionEffect(()=>{v&&R.current&&v.update(t,p)});const N=t[Xd],w=I.useRef(!!N&&!(!((A=window.MotionHandoffIsComplete)===null||A===void 0)&&A.call(window,N))&&((m=window.MotionHasOptimisedAnimation)===null||m===void 0?void 0:m.call(window,N)));return Ud(()=>{v&&(R.current=!0,window.MotionIsMounted=!0,v.updateFeatures(),jl.render(v.render),w.current&&v.animationState&&v.animationState.animateChanges())}),I.useEffect(()=>{v&&(!w.current&&v.animationState&&v.animationState.animateChanges(),w.current&&(queueMicrotask(()=>{var _;(_=window.MotionHandoffMarkAsComplete)===null||_===void 0||_.call(window,N)}),w.current=!1))}),v}function ty(n,i,t,s){const{layoutId:u,layout:A,drag:m,dragConstraints:h,layoutScroll:f,layoutRoot:p}=i;n.projection=new t(n.latestValues,i["data-framer-portal-id"]?void 0:$d(n.parent)),n.projection.setOptions({layoutId:u,layout:A,alwaysMeasureLayout:!!m||h&&ca(h),visualElement:n,animationType:typeof A=="string"?A:"both",initialPromotionConfig:s,layoutScroll:f,layoutRoot:p})}function $d(n){if(n)return n.options.allowProjection!==!1?n.projection:$d(n.parent)}function oy({preloadedFeatures:n,createVisualElement:i,useRender:t,useVisualState:s,Component:u}){var A,m;n&&zg(n);function h(p,y){let k;const v={...I.useContext(Ol),...p,layoutId:sy(p)},{isStatic:B}=v,R=ey(p),N=s(p,B);if(!B&&Gl){ly();const w=uy(v);k=w.MeasureLayout,R.visualElement=iy(u,N,v,i,w.ProjectionNode)}return g.jsxs(Xt.Provider,{value:R,children:[k&&R.visualElement?g.jsx(k,{visualElement:R.visualElement,...v}):null,t(u,p,ny(N,R.visualElement,y),N,B,R.visualElement)]})}h.displayName=`motion.${typeof u=="string"?u:`create(${(m=(A=u.displayName)!==null&&A!==void 0?A:u.name)!==null&&m!==void 0?m:""})`}`;const f=I.forwardRef(h);return f[ry]=u,f}function sy({layoutId:n}){const i=I.useContext(_l).id;return i&&n!==void 0?i+"-"+n:n}function ly(n,i){I.useContext(zd).strict}function uy(n){const{drag:i,layout:t}=ga;if(!i&&!t)return{};const s={...i,...t};return{MeasureLayout:i!=null&&i.isEnabled(n)||t!=null&&t.isEnabled(n)?s.MeasureLayout:void 0,ProjectionNode:s.ProjectionNode}}const cy=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Wl(n){return typeof n!="string"||n.includes("-")?!1:!!(cy.indexOf(n)>-1||/[A-Z]/u.test(n))}function EA(n){const i=[{},{}];return n==null||n.values.forEach((t,s)=>{i[0][s]=t.get(),i[1][s]=t.getVelocity()}),i}function Jl(n,i,t,s){if(typeof i=="function"){const[u,A]=EA(s);i=i(t!==void 0?t:n.custom,u,A)}if(typeof i=="string"&&(i=n.variants&&n.variants[i]),typeof i=="function"){const[u,A]=EA(s);i=i(t!==void 0?t:n.custom,u,A)}return i}const pl=n=>Array.isArray(n),my=n=>!!(n&&typeof n=="object"&&n.mix&&n.toValue),Ay=n=>pl(n)?n[n.length-1]||0:n,Je=n=>!!(n&&n.getVelocity);function Gt(n){const i=Je(n)?n.get():n;return my(i)?i.toValue():i}function dy({scrapeMotionValuesFromProps:n,createRenderState:i,onUpdate:t},s,u,A){const m={latestValues:hy(s,u,A,n),renderState:i()};return t&&(m.onMount=h=>t({props:s,current:h,...m}),m.onUpdate=h=>t(h)),m}const eh=n=>(i,t)=>{const s=I.useContext(Xt),u=I.useContext(Qt),A=()=>dy(n,i,s,u);return t?A():Yl(A)};function hy(n,i,t,s){const u={},A=s(n,{});for(const v in A)u[v]=Gt(A[v]);let{initial:m,animate:h}=n;const f=$t(n),p=Qd(n);i&&p&&!f&&n.inherit!==!1&&(m===void 0&&(m=i.initial),h===void 0&&(h=i.animate));let y=t?t.initial===!1:!1;y=y||m===!1;const k=y?h:m;if(k&&typeof k!="boolean"&&!qt(k)){const v=Array.isArray(k)?k:[k];for(let B=0;B<v.length;B++){const R=Jl(n,v[B]);if(R){const{transitionEnd:N,transition:w,..._}=R;for(const G in _){let V=_[G];if(Array.isArray(V)){const Q=y?V.length-1:0;V=V[Q]}V!==null&&(u[G]=V)}for(const G in N)u[G]=N[G]}}}return u}const ka=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Yn=new Set(ka),rh=n=>i=>typeof i=="string"&&i.startsWith(n),nh=rh("--"),fy=rh("var(--"),zl=n=>fy(n)?py.test(n.split("/*")[0].trim()):!1,py=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,ah=(n,i)=>i&&typeof n=="number"?i.transform(n):n,Zr=(n,i,t)=>t>i?i:t<n?n:t,va={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},gi={...va,transform:n=>Zr(0,1,n)},Yt={...va,default:1},vi=n=>({test:i=>typeof i=="string"&&i.endsWith(n)&&i.split(" ").length===1,parse:parseFloat,transform:i=>`${i}${n}`}),pn=vi("deg"),Ir=vi("%"),ne=vi("px"),gy=vi("vh"),yy=vi("vw"),MA={...Ir,parse:n=>Ir.parse(n)/100,transform:n=>Ir.transform(n*100)},Sy={borderWidth:ne,borderTopWidth:ne,borderRightWidth:ne,borderBottomWidth:ne,borderLeftWidth:ne,borderRadius:ne,radius:ne,borderTopLeftRadius:ne,borderTopRightRadius:ne,borderBottomRightRadius:ne,borderBottomLeftRadius:ne,width:ne,maxWidth:ne,height:ne,maxHeight:ne,top:ne,right:ne,bottom:ne,left:ne,padding:ne,paddingTop:ne,paddingRight:ne,paddingBottom:ne,paddingLeft:ne,margin:ne,marginTop:ne,marginRight:ne,marginBottom:ne,marginLeft:ne,backgroundPositionX:ne,backgroundPositionY:ne},ky={rotate:pn,rotateX:pn,rotateY:pn,rotateZ:pn,scale:Yt,scaleX:Yt,scaleY:Yt,scaleZ:Yt,skew:pn,skewX:pn,skewY:pn,distance:ne,translateX:ne,translateY:ne,translateZ:ne,x:ne,y:ne,z:ne,perspective:ne,transformPerspective:ne,opacity:gi,originX:MA,originY:MA,originZ:ne},TA={...va,transform:Math.round},Zl={...Sy,...ky,zIndex:TA,size:ne,fillOpacity:gi,strokeOpacity:gi,numOctaves:TA},vy={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Cy=ka.length;function Py(n,i,t){let s="",u=!0;for(let A=0;A<Cy;A++){const m=ka[A],h=n[m];if(h===void 0)continue;let f=!0;if(typeof h=="number"?f=h===(m.startsWith("scale")?1:0):f=parseFloat(h)===0,!f||t){const p=ah(h,Zl[m]);if(!f){u=!1;const y=vy[m]||m;s+=`${y}(${p}) `}t&&(i[m]=p)}}return s=s.trim(),t?s=t(i,u?"":s):u&&(s="none"),s}function Ql(n,i,t){const{style:s,vars:u,transformOrigin:A}=n;let m=!1,h=!1;for(const f in i){const p=i[f];if(Yn.has(f)){m=!0;continue}else if(nh(f)){u[f]=p;continue}else{const y=ah(p,Zl[f]);f.startsWith("origin")?(h=!0,A[f]=y):s[f]=y}}if(i.transform||(m||t?s.transform=Py(i,n.transform,t):s.transform&&(s.transform="none")),h){const{originX:f="50%",originY:p="50%",originZ:y=0}=A;s.transformOrigin=`${f} ${p} ${y}`}}const Ey={offset:"stroke-dashoffset",array:"stroke-dasharray"},My={offset:"strokeDashoffset",array:"strokeDasharray"};function Ty(n,i,t=1,s=0,u=!0){n.pathLength=1;const A=u?Ey:My;n[A.offset]=ne.transform(-s);const m=ne.transform(i),h=ne.transform(t);n[A.array]=`${m} ${h}`}function BA(n,i,t){return typeof n=="string"?n:ne.transform(i+t*n)}function By(n,i,t){const s=BA(i,n.x,n.width),u=BA(t,n.y,n.height);return`${s} ${u}`}function Xl(n,{attrX:i,attrY:t,attrScale:s,originX:u,originY:A,pathLength:m,pathSpacing:h=1,pathOffset:f=0,...p},y,k){if(Ql(n,p,k),y){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:v,style:B,dimensions:R}=n;v.transform&&(R&&(B.transform=v.transform),delete v.transform),R&&(u!==void 0||A!==void 0||B.transform)&&(B.transformOrigin=By(R,u!==void 0?u:.5,A!==void 0?A:.5)),i!==void 0&&(v.x=i),t!==void 0&&(v.y=t),s!==void 0&&(v.scale=s),m!==void 0&&Ty(v,m,h,f,!1)}const ql=()=>({style:{},transform:{},transformOrigin:{},vars:{}}),ih=()=>({...ql(),attrs:{}}),$l=n=>typeof n=="string"&&n.toLowerCase()==="svg";function th(n,{style:i,vars:t},s,u){Object.assign(n.style,i,u&&u.getProjectionStyles(s));for(const A in t)n.style.setProperty(A,t[A])}const oh=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function sh(n,i,t,s){th(n,i,void 0,s);for(const u in i.attrs)n.setAttribute(oh.has(u)?u:Ul(u),i.attrs[u])}const Ut={};function Ly(n){Object.assign(Ut,n)}function lh(n,{layout:i,layoutId:t}){return Yn.has(n)||n.startsWith("origin")||(i||t!==void 0)&&(!!Ut[n]||n==="opacity")}function eu(n,i,t){var s;const{style:u}=n,A={};for(const m in u)(Je(u[m])||i.style&&Je(i.style[m])||lh(m,n)||((s=t==null?void 0:t.getValue(m))===null||s===void 0?void 0:s.liveStyle)!==void 0)&&(A[m]=u[m]);return A}function uh(n,i,t){const s=eu(n,i,t);for(const u in n)if(Je(n[u])||Je(i[u])){const A=ka.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;s[A]=n[u]}return s}function Ny(n,i){try{i.dimensions=typeof n.getBBox=="function"?n.getBBox():n.getBoundingClientRect()}catch{i.dimensions={x:0,y:0,width:0,height:0}}}const LA=["x","y","width","height","cx","cy","r"],wy={useVisualState:eh({scrapeMotionValuesFromProps:uh,createRenderState:ih,onUpdate:({props:n,prevProps:i,current:t,renderState:s,latestValues:u})=>{if(!t)return;let A=!!n.drag;if(!A){for(const h in u)if(Yn.has(h)){A=!0;break}}if(!A)return;let m=!i;if(i)for(let h=0;h<LA.length;h++){const f=LA[h];n[f]!==i[f]&&(m=!0)}m&&ke.read(()=>{Ny(t,s),ke.render(()=>{Xl(s,u,$l(t.tagName),n.transformTemplate),sh(t,s)})})}})},Ry={useVisualState:eh({scrapeMotionValuesFromProps:eu,createRenderState:ql})};function ch(n,i,t){for(const s in i)!Je(i[s])&&!lh(s,t)&&(n[s]=i[s])}function by({transformTemplate:n},i){return I.useMemo(()=>{const t=ql();return Ql(t,i,n),Object.assign({},t.vars,t.style)},[i])}function Dy(n,i){const t=n.style||{},s={};return ch(s,t,n),Object.assign(s,by(n,i)),s}function xy(n,i){const t={},s=Dy(n,i);return n.drag&&n.dragListener!==!1&&(t.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(t.tabIndex=0),t.style=s,t}function Ky(n,i,t,s){const u=I.useMemo(()=>{const A=ih();return Xl(A,i,$l(s),n.transformTemplate),{...A.attrs,style:{...A.style}}},[i]);if(n.style){const A={};ch(A,n.style,n),u.style={...A,...u.style}}return u}function Iy(n=!1){return(t,s,u,{latestValues:A},m)=>{const f=(Wl(t)?Ky:xy)(s,A,m,t),p=Xg(s,typeof t=="string",n),y=t!==I.Fragment?{...p,...f,ref:u}:{},{children:k}=s,v=I.useMemo(()=>Je(k)?k.get():k,[k]);return I.createElement(t,{...y,children:v})}}function _y(n,i){return function(s,{forwardMotionProps:u}={forwardMotionProps:!1}){const m={...Wl(s)?wy:Ry,preloadedFeatures:n,useRender:Iy(u),createVisualElement:i,Component:s};return oy(m)}}function mh(n,i){if(!Array.isArray(i))return!1;const t=i.length;if(t!==n.length)return!1;for(let s=0;s<t;s++)if(i[s]!==n[s])return!1;return!0}function eo(n,i,t){const s=n.getProps();return Jl(s,i,t!==void 0?t:s.custom,n)}const Yy=Hl(()=>window.ScrollTimeline!==void 0);class Oy{constructor(i){this.stop=()=>this.runAll("stop"),this.animations=i.filter(Boolean)}get finished(){return Promise.all(this.animations.map(i=>"finished"in i?i.finished:i))}getAll(i){return this.animations[0][i]}setAll(i,t){for(let s=0;s<this.animations.length;s++)this.animations[s][i]=t}attachTimeline(i,t){const s=this.animations.map(u=>{if(Yy()&&u.attachTimeline)return u.attachTimeline(i);if(typeof t=="function")return t(u)});return()=>{s.forEach((u,A)=>{u&&u(),this.animations[A].stop()})}}get time(){return this.getAll("time")}set time(i){this.setAll("time",i)}get speed(){return this.getAll("speed")}set speed(i){this.setAll("speed",i)}get startTime(){return this.getAll("startTime")}get duration(){let i=0;for(let t=0;t<this.animations.length;t++)i=Math.max(i,this.animations[t].duration);return i}runAll(i){this.animations.forEach(t=>t[i]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}class Gy extends Oy{then(i,t){return Promise.all(this.animations).then(i).catch(t)}}function ru(n,i){return n?n[i]||n.default||n:void 0}const gl=2e4;function Ah(n){let i=0;const t=50;let s=n.next(i);for(;!s.done&&i<gl;)i+=t,s=n.next(i);return i>=gl?1/0:i}function nu(n){return typeof n=="function"}function NA(n,i){n.timeline=i,n.onfinish=null}const au=n=>Array.isArray(n)&&typeof n[0]=="number",Hy={linearEasing:void 0};function Vy(n,i){const t=Hl(n);return()=>{var s;return(s=Hy[i])!==null&&s!==void 0?s:t()}}const jt=Vy(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),dh=(n,i,t=10)=>{let s="";const u=Math.max(Math.round(i/t),2);for(let A=0;A<u;A++)s+=n(pa(0,u-1,A))+", ";return`linear(${s.substring(0,s.length-2)})`};function hh(n){return!!(typeof n=="function"&&jt()||!n||typeof n=="string"&&(n in yl||jt())||au(n)||Array.isArray(n)&&n.every(hh))}const ui=([n,i,t,s])=>`cubic-bezier(${n}, ${i}, ${t}, ${s})`,yl={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:ui([0,.65,.55,1]),circOut:ui([.55,0,1,.45]),backIn:ui([.31,.01,.66,-.59]),backOut:ui([.33,1.53,.69,.99])};function fh(n,i){if(n)return typeof n=="function"&&jt()?dh(n,i):au(n)?ui(n):Array.isArray(n)?n.map(t=>fh(t,i)||yl.easeOut):yl[n]}const Nr={x:!1,y:!1};function ph(){return Nr.x||Nr.y}function Fy(n,i,t){var s;if(n instanceof Element)return[n];if(typeof n=="string"){let u=document;const A=(s=void 0)!==null&&s!==void 0?s:u.querySelectorAll(n);return A?Array.from(A):[]}return Array.from(n)}function gh(n,i){const t=Fy(n),s=new AbortController,u={passive:!0,...i,signal:s.signal};return[t,u,()=>s.abort()]}function wA(n){return i=>{i.pointerType==="touch"||ph()||n(i)}}function Uy(n,i,t={}){const[s,u,A]=gh(n,t),m=wA(h=>{const{target:f}=h,p=i(h);if(typeof p!="function"||!f)return;const y=wA(k=>{p(k),f.removeEventListener("pointerleave",y)});f.addEventListener("pointerleave",y,u)});return s.forEach(h=>{h.addEventListener("pointerenter",m,u)}),A}const yh=(n,i)=>i?n===i?!0:yh(n,i.parentElement):!1,iu=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,jy=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Wy(n){return jy.has(n.tagName)||n.tabIndex!==-1}const ci=new WeakSet;function RA(n){return i=>{i.key==="Enter"&&n(i)}}function al(n,i){n.dispatchEvent(new PointerEvent("pointer"+i,{isPrimary:!0,bubbles:!0}))}const Jy=(n,i)=>{const t=n.currentTarget;if(!t)return;const s=RA(()=>{if(ci.has(t))return;al(t,"down");const u=RA(()=>{al(t,"up")}),A=()=>al(t,"cancel");t.addEventListener("keyup",u,i),t.addEventListener("blur",A,i)});t.addEventListener("keydown",s,i),t.addEventListener("blur",()=>t.removeEventListener("keydown",s),i)};function bA(n){return iu(n)&&!ph()}function zy(n,i,t={}){const[s,u,A]=gh(n,t),m=h=>{const f=h.currentTarget;if(!bA(h)||ci.has(f))return;ci.add(f);const p=i(h),y=(B,R)=>{window.removeEventListener("pointerup",k),window.removeEventListener("pointercancel",v),!(!bA(B)||!ci.has(f))&&(ci.delete(f),typeof p=="function"&&p(B,{success:R}))},k=B=>{y(B,t.useGlobalTarget||yh(f,B.target))},v=B=>{y(B,!1)};window.addEventListener("pointerup",k,u),window.addEventListener("pointercancel",v,u)};return s.forEach(h=>{!Wy(h)&&h.getAttribute("tabindex")===null&&(h.tabIndex=0),(t.useGlobalTarget?window:h).addEventListener("pointerdown",m,u),h.addEventListener("focus",p=>Jy(p,u),u)}),A}function Zy(n){return n==="x"||n==="y"?Nr[n]?null:(Nr[n]=!0,()=>{Nr[n]=!1}):Nr.x||Nr.y?null:(Nr.x=Nr.y=!0,()=>{Nr.x=Nr.y=!1})}const Sh=new Set(["width","height","top","left","right","bottom",...ka]);let Ht;function Qy(){Ht=void 0}const _r={now:()=>(Ht===void 0&&_r.set(He.isProcessing||jg.useManualTiming?He.timestamp:performance.now()),Ht),set:n=>{Ht=n,queueMicrotask(Qy)}};function tu(n,i){n.indexOf(i)===-1&&n.push(i)}function ou(n,i){const t=n.indexOf(i);t>-1&&n.splice(t,1)}class su{constructor(){this.subscriptions=[]}add(i){return tu(this.subscriptions,i),()=>ou(this.subscriptions,i)}notify(i,t,s){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](i,t,s);else for(let A=0;A<u;A++){const m=this.subscriptions[A];m&&m(i,t,s)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function kh(n,i){return i?n*(1e3/i):0}const DA=30,Xy=n=>!isNaN(parseFloat(n));class qy{constructor(i,t={}){this.version="11.18.2",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(s,u=!0)=>{const A=_r.now();this.updatedAt!==A&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(s),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),u&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(i),this.owner=t.owner}setCurrent(i){this.current=i,this.updatedAt=_r.now(),this.canTrackVelocity===null&&i!==void 0&&(this.canTrackVelocity=Xy(this.current))}setPrevFrameValue(i=this.current){this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt}onChange(i){return this.on("change",i)}on(i,t){this.events[i]||(this.events[i]=new su);const s=this.events[i].add(t);return i==="change"?()=>{s(),ke.read(()=>{this.events.change.getSize()||this.stop()})}:s}clearListeners(){for(const i in this.events)this.events[i].clear()}attach(i,t){this.passiveEffect=i,this.stopPassiveEffect=t}set(i,t=!0){!t||!this.passiveEffect?this.updateAndNotify(i,t):this.passiveEffect(i,this.updateAndNotify)}setWithVelocity(i,t,s){this.set(t),this.prev=void 0,this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt-s}jump(i,t=!0){this.updateAndNotify(i),this.prev=i,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const i=_r.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||i-this.updatedAt>DA)return 0;const t=Math.min(this.updatedAt-this.prevUpdatedAt,DA);return kh(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(i){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=i(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function yi(n,i){return new qy(n,i)}function $y(n,i,t){n.hasValue(i)?n.getValue(i).set(t):n.addValue(i,yi(t))}function eS(n,i){const t=eo(n,i);let{transitionEnd:s={},transition:u={},...A}=t||{};A={...A,...s};for(const m in A){const h=Ay(A[m]);$y(n,m,h)}}function rS(n){return!!(Je(n)&&n.add)}function Sl(n,i){const t=n.getValue("willChange");if(rS(t))return t.add(i)}function vh(n){return n.props[Xd]}const Ch=(n,i,t)=>(((1-3*t+3*i)*n+(3*t-6*i))*n+3*i)*n,nS=1e-7,aS=12;function iS(n,i,t,s,u){let A,m,h=0;do m=i+(t-i)/2,A=Ch(m,s,u)-n,A>0?t=m:i=m;while(Math.abs(A)>nS&&++h<aS);return m}function Ci(n,i,t,s){if(n===i&&t===s)return mr;const u=A=>iS(A,0,1,n,t);return A=>A===0||A===1?A:Ch(u(A),i,s)}const Ph=n=>i=>i<=.5?n(2*i)/2:(2-n(2*(1-i)))/2,Eh=n=>i=>1-n(1-i),Mh=Ci(.33,1.53,.69,.99),lu=Eh(Mh),Th=Ph(lu),Bh=n=>(n*=2)<1?.5*lu(n):.5*(2-Math.pow(2,-10*(n-1))),uu=n=>1-Math.sin(Math.acos(n)),Lh=Eh(uu),Nh=Ph(uu),wh=n=>/^0[^.\s]+$/u.test(n);function tS(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||wh(n):!0}const Ai=n=>Math.round(n*1e5)/1e5,cu=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function oS(n){return n==null}const sS=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,mu=(n,i)=>t=>!!(typeof t=="string"&&sS.test(t)&&t.startsWith(n)||i&&!oS(t)&&Object.prototype.hasOwnProperty.call(t,i)),Rh=(n,i,t)=>s=>{if(typeof s!="string")return s;const[u,A,m,h]=s.match(cu);return{[n]:parseFloat(u),[i]:parseFloat(A),[t]:parseFloat(m),alpha:h!==void 0?parseFloat(h):1}},lS=n=>Zr(0,255,n),il={...va,transform:n=>Math.round(lS(n))},In={test:mu("rgb","red"),parse:Rh("red","green","blue"),transform:({red:n,green:i,blue:t,alpha:s=1})=>"rgba("+il.transform(n)+", "+il.transform(i)+", "+il.transform(t)+", "+Ai(gi.transform(s))+")"};function uS(n){let i="",t="",s="",u="";return n.length>5?(i=n.substring(1,3),t=n.substring(3,5),s=n.substring(5,7),u=n.substring(7,9)):(i=n.substring(1,2),t=n.substring(2,3),s=n.substring(3,4),u=n.substring(4,5),i+=i,t+=t,s+=s,u+=u),{red:parseInt(i,16),green:parseInt(t,16),blue:parseInt(s,16),alpha:u?parseInt(u,16)/255:1}}const kl={test:mu("#"),parse:uS,transform:In.transform},ma={test:mu("hsl","hue"),parse:Rh("hue","saturation","lightness"),transform:({hue:n,saturation:i,lightness:t,alpha:s=1})=>"hsla("+Math.round(n)+", "+Ir.transform(Ai(i))+", "+Ir.transform(Ai(t))+", "+Ai(gi.transform(s))+")"},We={test:n=>In.test(n)||kl.test(n)||ma.test(n),parse:n=>In.test(n)?In.parse(n):ma.test(n)?ma.parse(n):kl.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?In.transform(n):ma.transform(n)},cS=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function mS(n){var i,t;return isNaN(n)&&typeof n=="string"&&(((i=n.match(cu))===null||i===void 0?void 0:i.length)||0)+(((t=n.match(cS))===null||t===void 0?void 0:t.length)||0)>0}const bh="number",Dh="color",AS="var",dS="var(",xA="${}",hS=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Si(n){const i=n.toString(),t=[],s={color:[],number:[],var:[]},u=[];let A=0;const h=i.replace(hS,f=>(We.test(f)?(s.color.push(A),u.push(Dh),t.push(We.parse(f))):f.startsWith(dS)?(s.var.push(A),u.push(AS),t.push(f)):(s.number.push(A),u.push(bh),t.push(parseFloat(f))),++A,xA)).split(xA);return{values:t,split:h,indexes:s,types:u}}function xh(n){return Si(n).values}function Kh(n){const{split:i,types:t}=Si(n),s=i.length;return u=>{let A="";for(let m=0;m<s;m++)if(A+=i[m],u[m]!==void 0){const h=t[m];h===bh?A+=Ai(u[m]):h===Dh?A+=We.transform(u[m]):A+=u[m]}return A}}const fS=n=>typeof n=="number"?0:n;function pS(n){const i=xh(n);return Kh(n)(i.map(fS))}const yn={test:mS,parse:xh,createTransformer:Kh,getAnimatableNone:pS},gS=new Set(["brightness","contrast","saturate","opacity"]);function yS(n){const[i,t]=n.slice(0,-1).split("(");if(i==="drop-shadow")return n;const[s]=t.match(cu)||[];if(!s)return n;const u=t.replace(s,"");let A=gS.has(i)?1:0;return s!==t&&(A*=100),i+"("+A+u+")"}const SS=/\b([a-z-]*)\(.*?\)/gu,vl={...yn,getAnimatableNone:n=>{const i=n.match(SS);return i?i.map(yS).join(" "):n}},kS={...Zl,color:We,backgroundColor:We,outlineColor:We,fill:We,stroke:We,borderColor:We,borderTopColor:We,borderRightColor:We,borderBottomColor:We,borderLeftColor:We,filter:vl,WebkitFilter:vl},Au=n=>kS[n];function Ih(n,i){let t=Au(n);return t!==vl&&(t=yn),t.getAnimatableNone?t.getAnimatableNone(i):void 0}const vS=new Set(["auto","none","0"]);function CS(n,i,t){let s=0,u;for(;s<n.length&&!u;){const A=n[s];typeof A=="string"&&!vS.has(A)&&Si(A).values.length&&(u=n[s]),s++}if(u&&t)for(const A of i)n[A]=Ih(t,u)}const KA=n=>n===va||n===ne,IA=(n,i)=>parseFloat(n.split(", ")[i]),_A=(n,i)=>(t,{transform:s})=>{if(s==="none"||!s)return 0;const u=s.match(/^matrix3d\((.+)\)$/u);if(u)return IA(u[1],i);{const A=s.match(/^matrix\((.+)\)$/u);return A?IA(A[1],n):0}},PS=new Set(["x","y","z"]),ES=ka.filter(n=>!PS.has(n));function MS(n){const i=[];return ES.forEach(t=>{const s=n.getValue(t);s!==void 0&&(i.push([t,s.get()]),s.set(t.startsWith("scale")?1:0))}),i}const ya={width:({x:n},{paddingLeft:i="0",paddingRight:t="0"})=>n.max-n.min-parseFloat(i)-parseFloat(t),height:({y:n},{paddingTop:i="0",paddingBottom:t="0"})=>n.max-n.min-parseFloat(i)-parseFloat(t),top:(n,{top:i})=>parseFloat(i),left:(n,{left:i})=>parseFloat(i),bottom:({y:n},{top:i})=>parseFloat(i)+(n.max-n.min),right:({x:n},{left:i})=>parseFloat(i)+(n.max-n.min),x:_A(4,13),y:_A(5,14)};ya.translateX=ya.x;ya.translateY=ya.y;const _n=new Set;let Cl=!1,Pl=!1;function _h(){if(Pl){const n=Array.from(_n).filter(s=>s.needsMeasurement),i=new Set(n.map(s=>s.element)),t=new Map;i.forEach(s=>{const u=MS(s);u.length&&(t.set(s,u),s.render())}),n.forEach(s=>s.measureInitialState()),i.forEach(s=>{s.render();const u=t.get(s);u&&u.forEach(([A,m])=>{var h;(h=s.getValue(A))===null||h===void 0||h.set(m)})}),n.forEach(s=>s.measureEndState()),n.forEach(s=>{s.suspendedScrollY!==void 0&&window.scrollTo(0,s.suspendedScrollY)})}Pl=!1,Cl=!1,_n.forEach(n=>n.complete()),_n.clear()}function Yh(){_n.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Pl=!0)})}function TS(){Yh(),_h()}class du{constructor(i,t,s,u,A,m=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...i],this.onComplete=t,this.name=s,this.motionValue=u,this.element=A,this.isAsync=m}scheduleResolve(){this.isScheduled=!0,this.isAsync?(_n.add(this),Cl||(Cl=!0,ke.read(Yh),ke.resolveKeyframes(_h))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:i,name:t,element:s,motionValue:u}=this;for(let A=0;A<i.length;A++)if(i[A]===null)if(A===0){const m=u==null?void 0:u.get(),h=i[i.length-1];if(m!==void 0)i[0]=m;else if(s&&t){const f=s.readValue(t,h);f!=null&&(i[0]=f)}i[0]===void 0&&(i[0]=h),u&&m===void 0&&u.set(i[0])}else i[A]=i[A-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),_n.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,_n.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}const Oh=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),BS=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function LS(n){const i=BS.exec(n);if(!i)return[,];const[,t,s,u]=i;return[`--${t??s}`,u]}function Gh(n,i,t=1){const[s,u]=LS(n);if(!s)return;const A=window.getComputedStyle(i).getPropertyValue(s);if(A){const m=A.trim();return Oh(m)?parseFloat(m):m}return zl(u)?Gh(u,i,t+1):u}const Hh=n=>i=>i.test(n),NS={test:n=>n==="auto",parse:n=>n},Vh=[va,ne,Ir,pn,yy,gy,NS],YA=n=>Vh.find(Hh(n));class Fh extends du{constructor(i,t,s,u,A){super(i,t,s,u,A,!0)}readKeyframes(){const{unresolvedKeyframes:i,element:t,name:s}=this;if(!t||!t.current)return;super.readKeyframes();for(let f=0;f<i.length;f++){let p=i[f];if(typeof p=="string"&&(p=p.trim(),zl(p))){const y=Gh(p,t.current);y!==void 0&&(i[f]=y),f===i.length-1&&(this.finalKeyframe=p)}}if(this.resolveNoneKeyframes(),!Sh.has(s)||i.length!==2)return;const[u,A]=i,m=YA(u),h=YA(A);if(m!==h)if(KA(m)&&KA(h))for(let f=0;f<i.length;f++){const p=i[f];typeof p=="string"&&(i[f]=parseFloat(p))}else this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:i,name:t}=this,s=[];for(let u=0;u<i.length;u++)tS(i[u])&&s.push(u);s.length&&CS(i,s,t)}measureInitialState(){const{element:i,unresolvedKeyframes:t,name:s}=this;if(!i||!i.current)return;s==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=ya[s](i.measureViewportBox(),window.getComputedStyle(i.current)),t[0]=this.measuredOrigin;const u=t[t.length-1];u!==void 0&&i.getValue(s,u).jump(u,!1)}measureEndState(){var i;const{element:t,name:s,unresolvedKeyframes:u}=this;if(!t||!t.current)return;const A=t.getValue(s);A&&A.jump(this.measuredOrigin,!1);const m=u.length-1,h=u[m];u[m]=ya[s](t.measureViewportBox(),window.getComputedStyle(t.current)),h!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=h),!((i=this.removedTransforms)===null||i===void 0)&&i.length&&this.removedTransforms.forEach(([f,p])=>{t.getValue(f).set(p)}),this.resolveNoneKeyframes()}}const OA=(n,i)=>i==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(yn.test(n)||n==="0")&&!n.startsWith("url("));function wS(n){const i=n[0];if(n.length===1)return!0;for(let t=0;t<n.length;t++)if(n[t]!==i)return!0}function RS(n,i,t,s){const u=n[0];if(u===null)return!1;if(i==="display"||i==="visibility")return!0;const A=n[n.length-1],m=OA(u,i),h=OA(A,i);return!m||!h?!1:wS(n)||(t==="spring"||nu(t))&&s}const bS=n=>n!==null;function ro(n,{repeat:i,repeatType:t="loop"},s){const u=n.filter(bS),A=i&&t!=="loop"&&i%2===1?0:u.length-1;return!A||s===void 0?u[A]:s}const DS=40;class Uh{constructor({autoplay:i=!0,delay:t=0,type:s="keyframes",repeat:u=0,repeatDelay:A=0,repeatType:m="loop",...h}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=_r.now(),this.options={autoplay:i,delay:t,type:s,repeat:u,repeatDelay:A,repeatType:m,...h},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>DS?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&TS(),this._resolved}onKeyframesResolved(i,t){this.resolvedAt=_r.now(),this.hasAttemptedResolve=!0;const{name:s,type:u,velocity:A,delay:m,onComplete:h,onUpdate:f,isGenerator:p}=this.options;if(!p&&!RS(i,s,u,A))if(m)this.options.duration=0;else{f&&f(ro(i,this.options,t)),h&&h(),this.resolveFinishedPromise();return}const y=this.initPlayback(i,t);y!==!1&&(this._resolved={keyframes:i,finalKeyframe:t,...y},this.onPostResolved())}onPostResolved(){}then(i,t){return this.currentFinishedPromise.then(i,t)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(i=>{this.resolveFinishedPromise=i})}}const Te=(n,i,t)=>n+(i-n)*t;function tl(n,i,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(i-n)*6*t:t<1/2?i:t<2/3?n+(i-n)*(2/3-t)*6:n}function xS({hue:n,saturation:i,lightness:t,alpha:s}){n/=360,i/=100,t/=100;let u=0,A=0,m=0;if(!i)u=A=m=t;else{const h=t<.5?t*(1+i):t+i-t*i,f=2*t-h;u=tl(f,h,n+1/3),A=tl(f,h,n),m=tl(f,h,n-1/3)}return{red:Math.round(u*255),green:Math.round(A*255),blue:Math.round(m*255),alpha:s}}function Wt(n,i){return t=>t>0?i:n}const ol=(n,i,t)=>{const s=n*n,u=t*(i*i-s)+s;return u<0?0:Math.sqrt(u)},KS=[kl,In,ma],IS=n=>KS.find(i=>i.test(n));function GA(n){const i=IS(n);if(!i)return!1;let t=i.parse(n);return i===ma&&(t=xS(t)),t}const HA=(n,i)=>{const t=GA(n),s=GA(i);if(!t||!s)return Wt(n,i);const u={...t};return A=>(u.red=ol(t.red,s.red,A),u.green=ol(t.green,s.green,A),u.blue=ol(t.blue,s.blue,A),u.alpha=Te(t.alpha,s.alpha,A),In.transform(u))},_S=(n,i)=>t=>i(n(t)),Pi=(...n)=>n.reduce(_S),El=new Set(["none","hidden"]);function YS(n,i){return El.has(n)?t=>t<=0?n:i:t=>t>=1?i:n}function OS(n,i){return t=>Te(n,i,t)}function hu(n){return typeof n=="number"?OS:typeof n=="string"?zl(n)?Wt:We.test(n)?HA:VS:Array.isArray(n)?jh:typeof n=="object"?We.test(n)?HA:GS:Wt}function jh(n,i){const t=[...n],s=t.length,u=n.map((A,m)=>hu(A)(A,i[m]));return A=>{for(let m=0;m<s;m++)t[m]=u[m](A);return t}}function GS(n,i){const t={...n,...i},s={};for(const u in t)n[u]!==void 0&&i[u]!==void 0&&(s[u]=hu(n[u])(n[u],i[u]));return u=>{for(const A in s)t[A]=s[A](u);return t}}function HS(n,i){var t;const s=[],u={color:0,var:0,number:0};for(let A=0;A<i.values.length;A++){const m=i.types[A],h=n.indexes[m][u[m]],f=(t=n.values[h])!==null&&t!==void 0?t:0;s[A]=f,u[m]++}return s}const VS=(n,i)=>{const t=yn.createTransformer(i),s=Si(n),u=Si(i);return s.indexes.var.length===u.indexes.var.length&&s.indexes.color.length===u.indexes.color.length&&s.indexes.number.length>=u.indexes.number.length?El.has(n)&&!u.values.length||El.has(i)&&!s.values.length?YS(n,i):Pi(jh(HS(s,u),u.values),t):Wt(n,i)};function Wh(n,i,t){return typeof n=="number"&&typeof i=="number"&&typeof t=="number"?Te(n,i,t):hu(n)(n,i)}const FS=5;function Jh(n,i,t){const s=Math.max(i-FS,0);return kh(t-n(s),i-s)}const Le={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},sl=.001;function US({duration:n=Le.duration,bounce:i=Le.bounce,velocity:t=Le.velocity,mass:s=Le.mass}){let u,A,m=1-i;m=Zr(Le.minDamping,Le.maxDamping,m),n=Zr(Le.minDuration,Le.maxDuration,zr(n)),m<1?(u=p=>{const y=p*m,k=y*n,v=y-t,B=Ml(p,m),R=Math.exp(-k);return sl-v/B*R},A=p=>{const k=p*m*n,v=k*t+t,B=Math.pow(m,2)*Math.pow(p,2)*n,R=Math.exp(-k),N=Ml(Math.pow(p,2),m);return(-u(p)+sl>0?-1:1)*((v-B)*R)/N}):(u=p=>{const y=Math.exp(-p*n),k=(p-t)*n+1;return-sl+y*k},A=p=>{const y=Math.exp(-p*n),k=(t-p)*(n*n);return y*k});const h=5/n,f=WS(u,A,h);if(n=Jr(n),isNaN(f))return{stiffness:Le.stiffness,damping:Le.damping,duration:n};{const p=Math.pow(f,2)*s;return{stiffness:p,damping:m*2*Math.sqrt(s*p),duration:n}}}const jS=12;function WS(n,i,t){let s=t;for(let u=1;u<jS;u++)s=s-n(s)/i(s);return s}function Ml(n,i){return n*Math.sqrt(1-i*i)}const JS=["duration","bounce"],zS=["stiffness","damping","mass"];function VA(n,i){return i.some(t=>n[t]!==void 0)}function ZS(n){let i={velocity:Le.velocity,stiffness:Le.stiffness,damping:Le.damping,mass:Le.mass,isResolvedFromDuration:!1,...n};if(!VA(n,zS)&&VA(n,JS))if(n.visualDuration){const t=n.visualDuration,s=2*Math.PI/(t*1.2),u=s*s,A=2*Zr(.05,1,1-(n.bounce||0))*Math.sqrt(u);i={...i,mass:Le.mass,stiffness:u,damping:A}}else{const t=US(n);i={...i,...t,mass:Le.mass},i.isResolvedFromDuration=!0}return i}function zh(n=Le.visualDuration,i=Le.bounce){const t=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:i}:n;let{restSpeed:s,restDelta:u}=t;const A=t.keyframes[0],m=t.keyframes[t.keyframes.length-1],h={done:!1,value:A},{stiffness:f,damping:p,mass:y,duration:k,velocity:v,isResolvedFromDuration:B}=ZS({...t,velocity:-zr(t.velocity||0)}),R=v||0,N=p/(2*Math.sqrt(f*y)),w=m-A,_=zr(Math.sqrt(f/y)),G=Math.abs(w)<5;s||(s=G?Le.restSpeed.granular:Le.restSpeed.default),u||(u=G?Le.restDelta.granular:Le.restDelta.default);let V;if(N<1){const H=Ml(_,N);V=F=>{const X=Math.exp(-N*_*F);return m-X*((R+N*_*w)/H*Math.sin(H*F)+w*Math.cos(H*F))}}else if(N===1)V=H=>m-Math.exp(-_*H)*(w+(R+_*w)*H);else{const H=_*Math.sqrt(N*N-1);V=F=>{const X=Math.exp(-N*_*F),j=Math.min(H*F,300);return m-X*((R+N*_*w)*Math.sinh(j)+H*w*Math.cosh(j))/H}}const Q={calculatedDuration:B&&k||null,next:H=>{const F=V(H);if(B)h.done=H>=k;else{let X=0;N<1&&(X=H===0?Jr(R):Jh(V,H,F));const j=Math.abs(X)<=s,le=Math.abs(m-F)<=u;h.done=j&&le}return h.value=h.done?m:F,h},toString:()=>{const H=Math.min(Ah(Q),gl),F=dh(X=>Q.next(H*X).value,H,30);return H+"ms "+F}};return Q}function FA({keyframes:n,velocity:i=0,power:t=.8,timeConstant:s=325,bounceDamping:u=10,bounceStiffness:A=500,modifyTarget:m,min:h,max:f,restDelta:p=.5,restSpeed:y}){const k=n[0],v={done:!1,value:k},B=j=>h!==void 0&&j<h||f!==void 0&&j>f,R=j=>h===void 0?f:f===void 0||Math.abs(h-j)<Math.abs(f-j)?h:f;let N=t*i;const w=k+N,_=m===void 0?w:m(w);_!==w&&(N=_-k);const G=j=>-N*Math.exp(-j/s),V=j=>_+G(j),Q=j=>{const le=G(j),de=V(j);v.done=Math.abs(le)<=p,v.value=v.done?_:de};let H,F;const X=j=>{B(v.value)&&(H=j,F=zh({keyframes:[v.value,R(v.value)],velocity:Jh(V,j,v.value),damping:u,stiffness:A,restDelta:p,restSpeed:y}))};return X(0),{calculatedDuration:null,next:j=>{let le=!1;return!F&&H===void 0&&(le=!0,Q(j),X(j)),H!==void 0&&j>=H?F.next(j-H):(!le&&Q(j),v)}}}const QS=Ci(.42,0,1,1),XS=Ci(0,0,.58,1),Zh=Ci(.42,0,.58,1),qS=n=>Array.isArray(n)&&typeof n[0]!="number",$S={linear:mr,easeIn:QS,easeInOut:Zh,easeOut:XS,circIn:uu,circInOut:Nh,circOut:Lh,backIn:lu,backInOut:Th,backOut:Mh,anticipate:Bh},UA=n=>{if(au(n)){Wd(n.length===4);const[i,t,s,u]=n;return Ci(i,t,s,u)}else if(typeof n=="string")return $S[n];return n};function ek(n,i,t){const s=[],u=t||Wh,A=n.length-1;for(let m=0;m<A;m++){let h=u(n[m],n[m+1]);if(i){const f=Array.isArray(i)?i[m]||mr:i;h=Pi(f,h)}s.push(h)}return s}function rk(n,i,{clamp:t=!0,ease:s,mixer:u}={}){const A=n.length;if(Wd(A===i.length),A===1)return()=>i[0];if(A===2&&i[0]===i[1])return()=>i[1];const m=n[0]===n[1];n[0]>n[A-1]&&(n=[...n].reverse(),i=[...i].reverse());const h=ek(i,s,u),f=h.length,p=y=>{if(m&&y<n[0])return i[0];let k=0;if(f>1)for(;k<n.length-2&&!(y<n[k+1]);k++);const v=pa(n[k],n[k+1],y);return h[k](v)};return t?y=>p(Zr(n[0],n[A-1],y)):p}function nk(n,i){const t=n[n.length-1];for(let s=1;s<=i;s++){const u=pa(0,i,s);n.push(Te(t,1,u))}}function ak(n){const i=[0];return nk(i,n.length-1),i}function ik(n,i){return n.map(t=>t*i)}function tk(n,i){return n.map(()=>i||Zh).splice(0,n.length-1)}function Jt({duration:n=300,keyframes:i,times:t,ease:s="easeInOut"}){const u=qS(s)?s.map(UA):UA(s),A={done:!1,value:i[0]},m=ik(t&&t.length===i.length?t:ak(i),n),h=rk(m,i,{ease:Array.isArray(u)?u:tk(i,u)});return{calculatedDuration:n,next:f=>(A.value=h(f),A.done=f>=n,A)}}const ok=n=>{const i=({timestamp:t})=>n(t);return{start:()=>ke.update(i,!0),stop:()=>gn(i),now:()=>He.isProcessing?He.timestamp:_r.now()}},sk={decay:FA,inertia:FA,tween:Jt,keyframes:Jt,spring:zh},lk=n=>n/100;class fu extends Uh{constructor(i){super(i),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();const{onStop:f}=this.options;f&&f()};const{name:t,motionValue:s,element:u,keyframes:A}=this.options,m=(u==null?void 0:u.KeyframeResolver)||du,h=(f,p)=>this.onKeyframesResolved(f,p);this.resolver=new m(A,h,t,s,u),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(i){const{type:t="keyframes",repeat:s=0,repeatDelay:u=0,repeatType:A,velocity:m=0}=this.options,h=nu(t)?t:sk[t]||Jt;let f,p;h!==Jt&&typeof i[0]!="number"&&(f=Pi(lk,Wh(i[0],i[1])),i=[0,100]);const y=h({...this.options,keyframes:i});A==="mirror"&&(p=h({...this.options,keyframes:[...i].reverse(),velocity:-m})),y.calculatedDuration===null&&(y.calculatedDuration=Ah(y));const{calculatedDuration:k}=y,v=k+u,B=v*(s+1)-u;return{generator:y,mirroredGenerator:p,mapPercentToKeyframes:f,calculatedDuration:k,resolvedDuration:v,totalDuration:B}}onPostResolved(){const{autoplay:i=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!i?this.pause():this.state=this.pendingPlayState}tick(i,t=!1){const{resolved:s}=this;if(!s){const{keyframes:j}=this.options;return{done:!0,value:j[j.length-1]}}const{finalKeyframe:u,generator:A,mirroredGenerator:m,mapPercentToKeyframes:h,keyframes:f,calculatedDuration:p,totalDuration:y,resolvedDuration:k}=s;if(this.startTime===null)return A.next(0);const{delay:v,repeat:B,repeatType:R,repeatDelay:N,onUpdate:w}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,i):this.speed<0&&(this.startTime=Math.min(i-y/this.speed,this.startTime)),t?this.currentTime=i:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(i-this.startTime)*this.speed;const _=this.currentTime-v*(this.speed>=0?1:-1),G=this.speed>=0?_<0:_>y;this.currentTime=Math.max(_,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=y);let V=this.currentTime,Q=A;if(B){const j=Math.min(this.currentTime,y)/k;let le=Math.floor(j),de=j%1;!de&&j>=1&&(de=1),de===1&&le--,le=Math.min(le,B+1),!!(le%2)&&(R==="reverse"?(de=1-de,N&&(de-=N/k)):R==="mirror"&&(Q=m)),V=Zr(0,1,de)*k}const H=G?{done:!1,value:f[0]}:Q.next(V);h&&(H.value=h(H.value));let{done:F}=H;!G&&p!==null&&(F=this.speed>=0?this.currentTime>=y:this.currentTime<=0);const X=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&F);return X&&u!==void 0&&(H.value=ro(f,this.options,u)),w&&w(H.value),X&&this.finish(),H}get duration(){const{resolved:i}=this;return i?zr(i.calculatedDuration):0}get time(){return zr(this.currentTime)}set time(i){i=Jr(i),this.currentTime=i,this.holdTime!==null||this.speed===0?this.holdTime=i:this.driver&&(this.startTime=this.driver.now()-i/this.speed)}get speed(){return this.playbackSpeed}set speed(i){const t=this.playbackSpeed!==i;this.playbackSpeed=i,t&&(this.time=zr(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;const{driver:i=ok,onPlay:t,startTime:s}=this.options;this.driver||(this.driver=i(A=>this.tick(A))),t&&t();const u=this.driver.now();this.holdTime!==null?this.startTime=u-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=u):this.startTime=s??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var i;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(i=this.currentTime)!==null&&i!==void 0?i:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:i}=this.options;i&&i()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(i){return this.startTime=0,this.tick(i,!0)}}const uk=new Set(["opacity","clipPath","filter","transform"]);function ck(n,i,t,{delay:s=0,duration:u=300,repeat:A=0,repeatType:m="loop",ease:h="easeInOut",times:f}={}){const p={[i]:t};f&&(p.offset=f);const y=fh(h,u);return Array.isArray(y)&&(p.easing=y),n.animate(p,{delay:s,duration:u,easing:Array.isArray(y)?"linear":y,fill:"both",iterations:A+1,direction:m==="reverse"?"alternate":"normal"})}const mk=Hl(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),zt=10,Ak=2e4;function dk(n){return nu(n.type)||n.type==="spring"||!hh(n.ease)}function hk(n,i){const t=new fu({...i,keyframes:n,repeat:0,delay:0,isGenerator:!0});let s={done:!1,value:n[0]};const u=[];let A=0;for(;!s.done&&A<Ak;)s=t.sample(A),u.push(s.value),A+=zt;return{times:void 0,keyframes:u,duration:A-zt,ease:"linear"}}const Qh={anticipate:Bh,backInOut:Th,circInOut:Nh};function fk(n){return n in Qh}class jA extends Uh{constructor(i){super(i);const{name:t,motionValue:s,element:u,keyframes:A}=this.options;this.resolver=new Fh(A,(m,h)=>this.onKeyframesResolved(m,h),t,s,u),this.resolver.scheduleResolve()}initPlayback(i,t){let{duration:s=300,times:u,ease:A,type:m,motionValue:h,name:f,startTime:p}=this.options;if(!h.owner||!h.owner.current)return!1;if(typeof A=="string"&&jt()&&fk(A)&&(A=Qh[A]),dk(this.options)){const{onComplete:k,onUpdate:v,motionValue:B,element:R,...N}=this.options,w=hk(i,N);i=w.keyframes,i.length===1&&(i[1]=i[0]),s=w.duration,u=w.times,A=w.ease,m="keyframes"}const y=ck(h.owner.current,f,i,{...this.options,duration:s,times:u,ease:A});return y.startTime=p??this.calcStartTime(),this.pendingTimeline?(NA(y,this.pendingTimeline),this.pendingTimeline=void 0):y.onfinish=()=>{const{onComplete:k}=this.options;h.set(ro(i,this.options,t)),k&&k(),this.cancel(),this.resolveFinishedPromise()},{animation:y,duration:s,times:u,type:m,ease:A,keyframes:i}}get duration(){const{resolved:i}=this;if(!i)return 0;const{duration:t}=i;return zr(t)}get time(){const{resolved:i}=this;if(!i)return 0;const{animation:t}=i;return zr(t.currentTime||0)}set time(i){const{resolved:t}=this;if(!t)return;const{animation:s}=t;s.currentTime=Jr(i)}get speed(){const{resolved:i}=this;if(!i)return 1;const{animation:t}=i;return t.playbackRate}set speed(i){const{resolved:t}=this;if(!t)return;const{animation:s}=t;s.playbackRate=i}get state(){const{resolved:i}=this;if(!i)return"idle";const{animation:t}=i;return t.playState}get startTime(){const{resolved:i}=this;if(!i)return null;const{animation:t}=i;return t.startTime}attachTimeline(i){if(!this._resolved)this.pendingTimeline=i;else{const{resolved:t}=this;if(!t)return mr;const{animation:s}=t;NA(s,i)}return mr}play(){if(this.isStopped)return;const{resolved:i}=this;if(!i)return;const{animation:t}=i;t.playState==="finished"&&this.updateFinishedPromise(),t.play()}pause(){const{resolved:i}=this;if(!i)return;const{animation:t}=i;t.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:i}=this;if(!i)return;const{animation:t,keyframes:s,duration:u,type:A,ease:m,times:h}=i;if(t.playState==="idle"||t.playState==="finished")return;if(this.time){const{motionValue:p,onUpdate:y,onComplete:k,element:v,...B}=this.options,R=new fu({...B,keyframes:s,duration:u,type:A,ease:m,times:h,isGenerator:!0}),N=Jr(this.time);p.setWithVelocity(R.sample(N-zt).value,R.sample(N).value,zt)}const{onStop:f}=this.options;f&&f(),this.cancel()}complete(){const{resolved:i}=this;i&&i.animation.finish()}cancel(){const{resolved:i}=this;i&&i.animation.cancel()}static supports(i){const{motionValue:t,name:s,repeatDelay:u,repeatType:A,damping:m,type:h}=i;if(!t||!t.owner||!(t.owner.current instanceof HTMLElement))return!1;const{onUpdate:f,transformTemplate:p}=t.owner.getProps();return mk()&&s&&uk.has(s)&&!f&&!p&&!u&&A!=="mirror"&&m!==0&&h!=="inertia"}}const pk={type:"spring",stiffness:500,damping:25,restSpeed:10},gk=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),yk={type:"keyframes",duration:.8},Sk={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},kk=(n,{keyframes:i})=>i.length>2?yk:Yn.has(n)?n.startsWith("scale")?gk(i[1]):pk:Sk;function vk({when:n,delay:i,delayChildren:t,staggerChildren:s,staggerDirection:u,repeat:A,repeatType:m,repeatDelay:h,from:f,elapsed:p,...y}){return!!Object.keys(y).length}const pu=(n,i,t,s={},u,A)=>m=>{const h=ru(s,n)||{},f=h.delay||s.delay||0;let{elapsed:p=0}=s;p=p-Jr(f);let y={keyframes:Array.isArray(t)?t:[null,t],ease:"easeOut",velocity:i.getVelocity(),...h,delay:-p,onUpdate:v=>{i.set(v),h.onUpdate&&h.onUpdate(v)},onComplete:()=>{m(),h.onComplete&&h.onComplete()},name:n,motionValue:i,element:A?void 0:u};vk(h)||(y={...y,...kk(n,y)}),y.duration&&(y.duration=Jr(y.duration)),y.repeatDelay&&(y.repeatDelay=Jr(y.repeatDelay)),y.from!==void 0&&(y.keyframes[0]=y.from);let k=!1;if((y.type===!1||y.duration===0&&!y.repeatDelay)&&(y.duration=0,y.delay===0&&(k=!0)),k&&!A&&i.get()!==void 0){const v=ro(y.keyframes,h);if(v!==void 0)return ke.update(()=>{y.onUpdate(v),y.onComplete()}),new Gy([])}return!A&&jA.supports(y)?new jA(y):new fu(y)};function Ck({protectedKeys:n,needsAnimating:i},t){const s=n.hasOwnProperty(t)&&i[t]!==!0;return i[t]=!1,s}function Xh(n,i,{delay:t=0,transitionOverride:s,type:u}={}){var A;let{transition:m=n.getDefaultTransition(),transitionEnd:h,...f}=i;s&&(m=s);const p=[],y=u&&n.animationState&&n.animationState.getState()[u];for(const k in f){const v=n.getValue(k,(A=n.latestValues[k])!==null&&A!==void 0?A:null),B=f[k];if(B===void 0||y&&Ck(y,k))continue;const R={delay:t,...ru(m||{},k)};let N=!1;if(window.MotionHandoffAnimation){const _=vh(n);if(_){const G=window.MotionHandoffAnimation(_,k,ke);G!==null&&(R.startTime=G,N=!0)}}Sl(n,k),v.start(pu(k,v,B,n.shouldReduceMotion&&Sh.has(k)?{type:!1}:R,n,N));const w=v.animation;w&&p.push(w)}return h&&Promise.all(p).then(()=>{ke.update(()=>{h&&eS(n,h)})}),p}function Tl(n,i,t={}){var s;const u=eo(n,i,t.type==="exit"?(s=n.presenceContext)===null||s===void 0?void 0:s.custom:void 0);let{transition:A=n.getDefaultTransition()||{}}=u||{};t.transitionOverride&&(A=t.transitionOverride);const m=u?()=>Promise.all(Xh(n,u,t)):()=>Promise.resolve(),h=n.variantChildren&&n.variantChildren.size?(p=0)=>{const{delayChildren:y=0,staggerChildren:k,staggerDirection:v}=A;return Pk(n,i,y+p,k,v,t)}:()=>Promise.resolve(),{when:f}=A;if(f){const[p,y]=f==="beforeChildren"?[m,h]:[h,m];return p().then(()=>y())}else return Promise.all([m(),h(t.delay)])}function Pk(n,i,t=0,s=0,u=1,A){const m=[],h=(n.variantChildren.size-1)*s,f=u===1?(p=0)=>p*s:(p=0)=>h-p*s;return Array.from(n.variantChildren).sort(Ek).forEach((p,y)=>{p.notify("AnimationStart",i),m.push(Tl(p,i,{...A,delay:t+f(y)}).then(()=>p.notify("AnimationComplete",i)))}),Promise.all(m)}function Ek(n,i){return n.sortNodePosition(i)}function Mk(n,i,t={}){n.notify("AnimationStart",i);let s;if(Array.isArray(i)){const u=i.map(A=>Tl(n,A,t));s=Promise.all(u)}else if(typeof i=="string")s=Tl(n,i,t);else{const u=typeof i=="function"?eo(n,i,t.custom):i;s=Promise.all(Xh(n,u,t))}return s.then(()=>{n.notify("AnimationComplete",i)})}const Tk=Fl.length;function qh(n){if(!n)return;if(!n.isControllingVariants){const t=n.parent?qh(n.parent)||{}:{};return n.props.initial!==void 0&&(t.initial=n.props.initial),t}const i={};for(let t=0;t<Tk;t++){const s=Fl[t],u=n.props[s];(pi(u)||u===!1)&&(i[s]=u)}return i}const Bk=[...Vl].reverse(),Lk=Vl.length;function Nk(n){return i=>Promise.all(i.map(({animation:t,options:s})=>Mk(n,t,s)))}function wk(n){let i=Nk(n),t=WA(),s=!0;const u=f=>(p,y)=>{var k;const v=eo(n,y,f==="exit"?(k=n.presenceContext)===null||k===void 0?void 0:k.custom:void 0);if(v){const{transition:B,transitionEnd:R,...N}=v;p={...p,...N,...R}}return p};function A(f){i=f(n)}function m(f){const{props:p}=n,y=qh(n.parent)||{},k=[],v=new Set;let B={},R=1/0;for(let w=0;w<Lk;w++){const _=Bk[w],G=t[_],V=p[_]!==void 0?p[_]:y[_],Q=pi(V),H=_===f?G.isActive:null;H===!1&&(R=w);let F=V===y[_]&&V!==p[_]&&Q;if(F&&s&&n.manuallyAnimateOnMount&&(F=!1),G.protectedKeys={...B},!G.isActive&&H===null||!V&&!G.prevProp||qt(V)||typeof V=="boolean")continue;const X=Rk(G.prevProp,V);let j=X||_===f&&G.isActive&&!F&&Q||w>R&&Q,le=!1;const de=Array.isArray(V)?V:[V];let De=de.reduce(u(_),{});H===!1&&(De={});const{prevResolvedValues:tr={}}=G,ze={...tr,...De},qe=te=>{j=!0,v.has(te)&&(le=!0,v.delete(te)),G.needsAnimating[te]=!0;const O=n.getValue(te);O&&(O.liveStyle=!1)};for(const te in ze){const O=De[te],$=tr[te];if(B.hasOwnProperty(te))continue;let W=!1;pl(O)&&pl($)?W=!mh(O,$):W=O!==$,W?O!=null?qe(te):v.add(te):O!==void 0&&v.has(te)?qe(te):G.protectedKeys[te]=!0}G.prevProp=V,G.prevResolvedValues=De,G.isActive&&(B={...B,...De}),s&&n.blockInitialAnimation&&(j=!1),j&&(!(F&&X)||le)&&k.push(...de.map(te=>({animation:te,options:{type:_}})))}if(v.size){const w={};v.forEach(_=>{const G=n.getBaseTarget(_),V=n.getValue(_);V&&(V.liveStyle=!0),w[_]=G??null}),k.push({animation:w})}let N=!!k.length;return s&&(p.initial===!1||p.initial===p.animate)&&!n.manuallyAnimateOnMount&&(N=!1),s=!1,N?i(k):Promise.resolve()}function h(f,p){var y;if(t[f].isActive===p)return Promise.resolve();(y=n.variantChildren)===null||y===void 0||y.forEach(v=>{var B;return(B=v.animationState)===null||B===void 0?void 0:B.setActive(f,p)}),t[f].isActive=p;const k=m(f);for(const v in t)t[v].protectedKeys={};return k}return{animateChanges:m,setActive:h,setAnimateFunction:A,getState:()=>t,reset:()=>{t=WA(),s=!0}}}function Rk(n,i){return typeof i=="string"?i!==n:Array.isArray(i)?!mh(i,n):!1}function Dn(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function WA(){return{animate:Dn(!0),whileInView:Dn(),whileHover:Dn(),whileTap:Dn(),whileDrag:Dn(),whileFocus:Dn(),exit:Dn()}}class Sn{constructor(i){this.isMounted=!1,this.node=i}update(){}}class bk extends Sn{constructor(i){super(i),i.animationState||(i.animationState=wk(i))}updateAnimationControlsSubscription(){const{animate:i}=this.node.getProps();qt(i)&&(this.unmountControls=i.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:i}=this.node.getProps(),{animate:t}=this.node.prevProps||{};i!==t&&this.updateAnimationControlsSubscription()}unmount(){var i;this.node.animationState.reset(),(i=this.unmountControls)===null||i===void 0||i.call(this)}}let Dk=0;class xk extends Sn{constructor(){super(...arguments),this.id=Dk++}update(){if(!this.node.presenceContext)return;const{isPresent:i,onExitComplete:t}=this.node.presenceContext,{isPresent:s}=this.node.prevPresenceContext||{};if(!this.node.animationState||i===s)return;const u=this.node.animationState.setActive("exit",!i);t&&!i&&u.then(()=>t(this.id))}mount(){const{register:i}=this.node.presenceContext||{};i&&(this.unmount=i(this.id))}unmount(){}}const Kk={animation:{Feature:bk},exit:{Feature:xk}};function ki(n,i,t,s={passive:!0}){return n.addEventListener(i,t,s),()=>n.removeEventListener(i,t)}function Ei(n){return{point:{x:n.pageX,y:n.pageY}}}const Ik=n=>i=>iu(i)&&n(i,Ei(i));function di(n,i,t,s){return ki(n,i,Ik(t),s)}const JA=(n,i)=>Math.abs(n-i);function _k(n,i){const t=JA(n.x,i.x),s=JA(n.y,i.y);return Math.sqrt(t**2+s**2)}class $h{constructor(i,t,{transformPagePoint:s,contextWindow:u,dragSnapToOrigin:A=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const k=ul(this.lastMoveEventInfo,this.history),v=this.startEvent!==null,B=_k(k.offset,{x:0,y:0})>=3;if(!v&&!B)return;const{point:R}=k,{timestamp:N}=He;this.history.push({...R,timestamp:N});const{onStart:w,onMove:_}=this.handlers;v||(w&&w(this.lastMoveEvent,k),this.startEvent=this.lastMoveEvent),_&&_(this.lastMoveEvent,k)},this.handlePointerMove=(k,v)=>{this.lastMoveEvent=k,this.lastMoveEventInfo=ll(v,this.transformPagePoint),ke.update(this.updatePoint,!0)},this.handlePointerUp=(k,v)=>{this.end();const{onEnd:B,onSessionEnd:R,resumeAnimation:N}=this.handlers;if(this.dragSnapToOrigin&&N&&N(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const w=ul(k.type==="pointercancel"?this.lastMoveEventInfo:ll(v,this.transformPagePoint),this.history);this.startEvent&&B&&B(k,w),R&&R(k,w)},!iu(i))return;this.dragSnapToOrigin=A,this.handlers=t,this.transformPagePoint=s,this.contextWindow=u||window;const m=Ei(i),h=ll(m,this.transformPagePoint),{point:f}=h,{timestamp:p}=He;this.history=[{...f,timestamp:p}];const{onSessionStart:y}=t;y&&y(i,ul(h,this.history)),this.removeListeners=Pi(di(this.contextWindow,"pointermove",this.handlePointerMove),di(this.contextWindow,"pointerup",this.handlePointerUp),di(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(i){this.handlers=i}end(){this.removeListeners&&this.removeListeners(),gn(this.updatePoint)}}function ll(n,i){return i?{point:i(n.point)}:n}function zA(n,i){return{x:n.x-i.x,y:n.y-i.y}}function ul({point:n},i){return{point:n,delta:zA(n,ef(i)),offset:zA(n,Yk(i)),velocity:Ok(i,.1)}}function Yk(n){return n[0]}function ef(n){return n[n.length-1]}function Ok(n,i){if(n.length<2)return{x:0,y:0};let t=n.length-1,s=null;const u=ef(n);for(;t>=0&&(s=n[t],!(u.timestamp-s.timestamp>Jr(i)));)t--;if(!s)return{x:0,y:0};const A=zr(u.timestamp-s.timestamp);if(A===0)return{x:0,y:0};const m={x:(u.x-s.x)/A,y:(u.y-s.y)/A};return m.x===1/0&&(m.x=0),m.y===1/0&&(m.y=0),m}const rf=1e-4,Gk=1-rf,Hk=1+rf,nf=.01,Vk=0-nf,Fk=0+nf;function Ar(n){return n.max-n.min}function Uk(n,i,t){return Math.abs(n-i)<=t}function ZA(n,i,t,s=.5){n.origin=s,n.originPoint=Te(i.min,i.max,n.origin),n.scale=Ar(t)/Ar(i),n.translate=Te(t.min,t.max,n.origin)-n.originPoint,(n.scale>=Gk&&n.scale<=Hk||isNaN(n.scale))&&(n.scale=1),(n.translate>=Vk&&n.translate<=Fk||isNaN(n.translate))&&(n.translate=0)}function hi(n,i,t,s){ZA(n.x,i.x,t.x,s?s.originX:void 0),ZA(n.y,i.y,t.y,s?s.originY:void 0)}function QA(n,i,t){n.min=t.min+i.min,n.max=n.min+Ar(i)}function jk(n,i,t){QA(n.x,i.x,t.x),QA(n.y,i.y,t.y)}function XA(n,i,t){n.min=i.min-t.min,n.max=n.min+Ar(i)}function fi(n,i,t){XA(n.x,i.x,t.x),XA(n.y,i.y,t.y)}function Wk(n,{min:i,max:t},s){return i!==void 0&&n<i?n=s?Te(i,n,s.min):Math.max(n,i):t!==void 0&&n>t&&(n=s?Te(t,n,s.max):Math.min(n,t)),n}function qA(n,i,t){return{min:i!==void 0?n.min+i:void 0,max:t!==void 0?n.max+t-(n.max-n.min):void 0}}function Jk(n,{top:i,left:t,bottom:s,right:u}){return{x:qA(n.x,t,u),y:qA(n.y,i,s)}}function $A(n,i){let t=i.min-n.min,s=i.max-n.max;return i.max-i.min<n.max-n.min&&([t,s]=[s,t]),{min:t,max:s}}function zk(n,i){return{x:$A(n.x,i.x),y:$A(n.y,i.y)}}function Zk(n,i){let t=.5;const s=Ar(n),u=Ar(i);return u>s?t=pa(i.min,i.max-s,n.min):s>u&&(t=pa(n.min,n.max-u,i.min)),Zr(0,1,t)}function Qk(n,i){const t={};return i.min!==void 0&&(t.min=i.min-n.min),i.max!==void 0&&(t.max=i.max-n.min),t}const Bl=.35;function Xk(n=Bl){return n===!1?n=0:n===!0&&(n=Bl),{x:ed(n,"left","right"),y:ed(n,"top","bottom")}}function ed(n,i,t){return{min:rd(n,i),max:rd(n,t)}}function rd(n,i){return typeof n=="number"?n:n[i]||0}const nd=()=>({translate:0,scale:1,origin:0,originPoint:0}),Aa=()=>({x:nd(),y:nd()}),ad=()=>({min:0,max:0}),Re=()=>({x:ad(),y:ad()});function kr(n){return[n("x"),n("y")]}function af({top:n,left:i,right:t,bottom:s}){return{x:{min:i,max:t},y:{min:n,max:s}}}function qk({x:n,y:i}){return{top:i.min,right:n.max,bottom:i.max,left:n.min}}function $k(n,i){if(!i)return n;const t=i({x:n.left,y:n.top}),s=i({x:n.right,y:n.bottom});return{top:t.y,left:t.x,bottom:s.y,right:s.x}}function cl(n){return n===void 0||n===1}function Ll({scale:n,scaleX:i,scaleY:t}){return!cl(n)||!cl(i)||!cl(t)}function xn(n){return Ll(n)||tf(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function tf(n){return id(n.x)||id(n.y)}function id(n){return n&&n!=="0%"}function Zt(n,i,t){const s=n-t,u=i*s;return t+u}function td(n,i,t,s,u){return u!==void 0&&(n=Zt(n,u,s)),Zt(n,t,s)+i}function Nl(n,i=0,t=1,s,u){n.min=td(n.min,i,t,s,u),n.max=td(n.max,i,t,s,u)}function of(n,{x:i,y:t}){Nl(n.x,i.translate,i.scale,i.originPoint),Nl(n.y,t.translate,t.scale,t.originPoint)}const od=.999999999999,sd=1.0000000000001;function ev(n,i,t,s=!1){const u=t.length;if(!u)return;i.x=i.y=1;let A,m;for(let h=0;h<u;h++){A=t[h],m=A.projectionDelta;const{visualElement:f}=A.options;f&&f.props.style&&f.props.style.display==="contents"||(s&&A.options.layoutScroll&&A.scroll&&A!==A.root&&ha(n,{x:-A.scroll.offset.x,y:-A.scroll.offset.y}),m&&(i.x*=m.x.scale,i.y*=m.y.scale,of(n,m)),s&&xn(A.latestValues)&&ha(n,A.latestValues))}i.x<sd&&i.x>od&&(i.x=1),i.y<sd&&i.y>od&&(i.y=1)}function da(n,i){n.min=n.min+i,n.max=n.max+i}function ld(n,i,t,s,u=.5){const A=Te(n.min,n.max,u);Nl(n,i,t,A,s)}function ha(n,i){ld(n.x,i.x,i.scaleX,i.scale,i.originX),ld(n.y,i.y,i.scaleY,i.scale,i.originY)}function sf(n,i){return af($k(n.getBoundingClientRect(),i))}function rv(n,i,t){const s=sf(n,t),{scroll:u}=i;return u&&(da(s.x,u.offset.x),da(s.y,u.offset.y)),s}const lf=({current:n})=>n?n.ownerDocument.defaultView:null,nv=new WeakMap;class av{constructor(i){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Re(),this.visualElement=i}start(i,{snapToCursor:t=!1}={}){const{presenceContext:s}=this.visualElement;if(s&&s.isPresent===!1)return;const u=y=>{const{dragSnapToOrigin:k}=this.getProps();k?this.pauseAnimation():this.stopAnimation(),t&&this.snapToCursor(Ei(y).point)},A=(y,k)=>{const{drag:v,dragPropagation:B,onDragStart:R}=this.getProps();if(v&&!B&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Zy(v),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),kr(w=>{let _=this.getAxisMotionValue(w).get()||0;if(Ir.test(_)){const{projection:G}=this.visualElement;if(G&&G.layout){const V=G.layout.layoutBox[w];V&&(_=Ar(V)*(parseFloat(_)/100))}}this.originPoint[w]=_}),R&&ke.postRender(()=>R(y,k)),Sl(this.visualElement,"transform");const{animationState:N}=this.visualElement;N&&N.setActive("whileDrag",!0)},m=(y,k)=>{const{dragPropagation:v,dragDirectionLock:B,onDirectionLock:R,onDrag:N}=this.getProps();if(!v&&!this.openDragLock)return;const{offset:w}=k;if(B&&this.currentDirection===null){this.currentDirection=iv(w),this.currentDirection!==null&&R&&R(this.currentDirection);return}this.updateAxis("x",k.point,w),this.updateAxis("y",k.point,w),this.visualElement.render(),N&&N(y,k)},h=(y,k)=>this.stop(y,k),f=()=>kr(y=>{var k;return this.getAnimationState(y)==="paused"&&((k=this.getAxisMotionValue(y).animation)===null||k===void 0?void 0:k.play())}),{dragSnapToOrigin:p}=this.getProps();this.panSession=new $h(i,{onSessionStart:u,onStart:A,onMove:m,onSessionEnd:h,resumeAnimation:f},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:p,contextWindow:lf(this.visualElement)})}stop(i,t){const s=this.isDragging;if(this.cancel(),!s)return;const{velocity:u}=t;this.startAnimation(u);const{onDragEnd:A}=this.getProps();A&&ke.postRender(()=>A(i,t))}cancel(){this.isDragging=!1;const{projection:i,animationState:t}=this.visualElement;i&&(i.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:s}=this.getProps();!s&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t&&t.setActive("whileDrag",!1)}updateAxis(i,t,s){const{drag:u}=this.getProps();if(!s||!Ot(i,u,this.currentDirection))return;const A=this.getAxisMotionValue(i);let m=this.originPoint[i]+s[i];this.constraints&&this.constraints[i]&&(m=Wk(m,this.constraints[i],this.elastic[i])),A.set(m)}resolveConstraints(){var i;const{dragConstraints:t,dragElastic:s}=this.getProps(),u=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(i=this.visualElement.projection)===null||i===void 0?void 0:i.layout,A=this.constraints;t&&ca(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&u?this.constraints=Jk(u.layoutBox,t):this.constraints=!1,this.elastic=Xk(s),A!==this.constraints&&u&&this.constraints&&!this.hasMutatedConstraints&&kr(m=>{this.constraints!==!1&&this.getAxisMotionValue(m)&&(this.constraints[m]=Qk(u.layoutBox[m],this.constraints[m]))})}resolveRefConstraints(){const{dragConstraints:i,onMeasureDragConstraints:t}=this.getProps();if(!i||!ca(i))return!1;const s=i.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;const A=rv(s,u.root,this.visualElement.getTransformPagePoint());let m=zk(u.layout.layoutBox,A);if(t){const h=t(qk(m));this.hasMutatedConstraints=!!h,h&&(m=af(h))}return m}startAnimation(i){const{drag:t,dragMomentum:s,dragElastic:u,dragTransition:A,dragSnapToOrigin:m,onDragTransitionEnd:h}=this.getProps(),f=this.constraints||{},p=kr(y=>{if(!Ot(y,t,this.currentDirection))return;let k=f&&f[y]||{};m&&(k={min:0,max:0});const v=u?200:1e6,B=u?40:1e7,R={type:"inertia",velocity:s?i[y]:0,bounceStiffness:v,bounceDamping:B,timeConstant:750,restDelta:1,restSpeed:10,...A,...k};return this.startAxisValueAnimation(y,R)});return Promise.all(p).then(h)}startAxisValueAnimation(i,t){const s=this.getAxisMotionValue(i);return Sl(this.visualElement,i),s.start(pu(i,s,0,t,this.visualElement,!1))}stopAnimation(){kr(i=>this.getAxisMotionValue(i).stop())}pauseAnimation(){kr(i=>{var t;return(t=this.getAxisMotionValue(i).animation)===null||t===void 0?void 0:t.pause()})}getAnimationState(i){var t;return(t=this.getAxisMotionValue(i).animation)===null||t===void 0?void 0:t.state}getAxisMotionValue(i){const t=`_drag${i.toUpperCase()}`,s=this.visualElement.getProps(),u=s[t];return u||this.visualElement.getValue(i,(s.initial?s.initial[i]:void 0)||0)}snapToCursor(i){kr(t=>{const{drag:s}=this.getProps();if(!Ot(t,s,this.currentDirection))return;const{projection:u}=this.visualElement,A=this.getAxisMotionValue(t);if(u&&u.layout){const{min:m,max:h}=u.layout.layoutBox[t];A.set(i[t]-Te(m,h,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:i,dragConstraints:t}=this.getProps(),{projection:s}=this.visualElement;if(!ca(t)||!s||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};kr(m=>{const h=this.getAxisMotionValue(m);if(h&&this.constraints!==!1){const f=h.get();u[m]=Zk({min:f,max:f},this.constraints[m])}});const{transformTemplate:A}=this.visualElement.getProps();this.visualElement.current.style.transform=A?A({},""):"none",s.root&&s.root.updateScroll(),s.updateLayout(),this.resolveConstraints(),kr(m=>{if(!Ot(m,i,null))return;const h=this.getAxisMotionValue(m),{min:f,max:p}=this.constraints[m];h.set(Te(f,p,u[m]))})}addListeners(){if(!this.visualElement.current)return;nv.set(this.visualElement,this);const i=this.visualElement.current,t=di(i,"pointerdown",f=>{const{drag:p,dragListener:y=!0}=this.getProps();p&&y&&this.start(f)}),s=()=>{const{dragConstraints:f}=this.getProps();ca(f)&&f.current&&(this.constraints=this.resolveRefConstraints())},{projection:u}=this.visualElement,A=u.addEventListener("measure",s);u&&!u.layout&&(u.root&&u.root.updateScroll(),u.updateLayout()),ke.read(s);const m=ki(window,"resize",()=>this.scalePositionWithinConstraints()),h=u.addEventListener("didUpdate",(({delta:f,hasLayoutChanged:p})=>{this.isDragging&&p&&(kr(y=>{const k=this.getAxisMotionValue(y);k&&(this.originPoint[y]+=f[y].translate,k.set(k.get()+f[y].translate))}),this.visualElement.render())}));return()=>{m(),t(),A(),h&&h()}}getProps(){const i=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:s=!1,dragPropagation:u=!1,dragConstraints:A=!1,dragElastic:m=Bl,dragMomentum:h=!0}=i;return{...i,drag:t,dragDirectionLock:s,dragPropagation:u,dragConstraints:A,dragElastic:m,dragMomentum:h}}}function Ot(n,i,t){return(i===!0||i===n)&&(t===null||t===n)}function iv(n,i=10){let t=null;return Math.abs(n.y)>i?t="y":Math.abs(n.x)>i&&(t="x"),t}class tv extends Sn{constructor(i){super(i),this.removeGroupControls=mr,this.removeListeners=mr,this.controls=new av(i)}mount(){const{dragControls:i}=this.node.getProps();i&&(this.removeGroupControls=i.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||mr}unmount(){this.removeGroupControls(),this.removeListeners()}}const ud=n=>(i,t)=>{n&&ke.postRender(()=>n(i,t))};class ov extends Sn{constructor(){super(...arguments),this.removePointerDownListener=mr}onPointerDown(i){this.session=new $h(i,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:lf(this.node)})}createPanHandlers(){const{onPanSessionStart:i,onPanStart:t,onPan:s,onPanEnd:u}=this.node.getProps();return{onSessionStart:ud(i),onStart:ud(t),onMove:s,onEnd:(A,m)=>{delete this.session,u&&ke.postRender(()=>u(A,m))}}}mount(){this.removePointerDownListener=di(this.node.current,"pointerdown",i=>this.onPointerDown(i))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const Vt={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function cd(n,i){return i.max===i.min?0:n/(i.max-i.min)*100}const li={correct:(n,i)=>{if(!i.target)return n;if(typeof n=="string")if(ne.test(n))n=parseFloat(n);else return n;const t=cd(n,i.target.x),s=cd(n,i.target.y);return`${t}% ${s}%`}},sv={correct:(n,{treeScale:i,projectionDelta:t})=>{const s=n,u=yn.parse(n);if(u.length>5)return s;const A=yn.createTransformer(n),m=typeof u[0]!="number"?1:0,h=t.x.scale*i.x,f=t.y.scale*i.y;u[0+m]/=h,u[1+m]/=f;const p=Te(h,f,.5);return typeof u[2+m]=="number"&&(u[2+m]/=p),typeof u[3+m]=="number"&&(u[3+m]/=p),A(u)}};class lv extends I.Component{componentDidMount(){const{visualElement:i,layoutGroup:t,switchLayoutGroup:s,layoutId:u}=this.props,{projection:A}=i;Ly(uv),A&&(t.group&&t.group.add(A),s&&s.register&&u&&s.register(A),A.root.didUpdate(),A.addEventListener("animationComplete",()=>{this.safeToRemove()}),A.setOptions({...A.options,onExitComplete:()=>this.safeToRemove()})),Vt.hasEverUpdated=!0}getSnapshotBeforeUpdate(i){const{layoutDependency:t,visualElement:s,drag:u,isPresent:A}=this.props,m=s.projection;return m&&(m.isPresent=A,u||i.layoutDependency!==t||t===void 0?m.willUpdate():this.safeToRemove(),i.isPresent!==A&&(A?m.promote():m.relegate()||ke.postRender(()=>{const h=m.getStack();(!h||!h.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:i}=this.props.visualElement;i&&(i.root.didUpdate(),jl.postRender(()=>{!i.currentAnimation&&i.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:i,layoutGroup:t,switchLayoutGroup:s}=this.props,{projection:u}=i;u&&(u.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(u),s&&s.deregister&&s.deregister(u))}safeToRemove(){const{safeToRemove:i}=this.props;i&&i()}render(){return null}}function uf(n){const[i,t]=Fd(),s=I.useContext(_l);return g.jsx(lv,{...n,layoutGroup:s,switchLayoutGroup:I.useContext(qd),isPresent:i,safeToRemove:t})}const uv={borderRadius:{...li,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:li,borderTopRightRadius:li,borderBottomLeftRadius:li,borderBottomRightRadius:li,boxShadow:sv};function cv(n,i,t){const s=Je(n)?n:yi(n);return s.start(pu("",s,i,t)),s.animation}function mv(n){return n instanceof SVGElement&&n.tagName!=="svg"}const Av=(n,i)=>n.depth-i.depth;class dv{constructor(){this.children=[],this.isDirty=!1}add(i){tu(this.children,i),this.isDirty=!0}remove(i){ou(this.children,i),this.isDirty=!0}forEach(i){this.isDirty&&this.children.sort(Av),this.isDirty=!1,this.children.forEach(i)}}function hv(n,i){const t=_r.now(),s=({timestamp:u})=>{const A=u-t;A>=i&&(gn(s),n(A-i))};return ke.read(s,!0),()=>gn(s)}const cf=["TopLeft","TopRight","BottomLeft","BottomRight"],fv=cf.length,md=n=>typeof n=="string"?parseFloat(n):n,Ad=n=>typeof n=="number"||ne.test(n);function pv(n,i,t,s,u,A){u?(n.opacity=Te(0,t.opacity!==void 0?t.opacity:1,gv(s)),n.opacityExit=Te(i.opacity!==void 0?i.opacity:1,0,yv(s))):A&&(n.opacity=Te(i.opacity!==void 0?i.opacity:1,t.opacity!==void 0?t.opacity:1,s));for(let m=0;m<fv;m++){const h=`border${cf[m]}Radius`;let f=dd(i,h),p=dd(t,h);if(f===void 0&&p===void 0)continue;f||(f=0),p||(p=0),f===0||p===0||Ad(f)===Ad(p)?(n[h]=Math.max(Te(md(f),md(p),s),0),(Ir.test(p)||Ir.test(f))&&(n[h]+="%")):n[h]=p}(i.rotate||t.rotate)&&(n.rotate=Te(i.rotate||0,t.rotate||0,s))}function dd(n,i){return n[i]!==void 0?n[i]:n.borderRadius}const gv=mf(0,.5,Lh),yv=mf(.5,.95,mr);function mf(n,i,t){return s=>s<n?0:s>i?1:t(pa(n,i,s))}function hd(n,i){n.min=i.min,n.max=i.max}function Sr(n,i){hd(n.x,i.x),hd(n.y,i.y)}function fd(n,i){n.translate=i.translate,n.scale=i.scale,n.originPoint=i.originPoint,n.origin=i.origin}function pd(n,i,t,s,u){return n-=i,n=Zt(n,1/t,s),u!==void 0&&(n=Zt(n,1/u,s)),n}function Sv(n,i=0,t=1,s=.5,u,A=n,m=n){if(Ir.test(i)&&(i=parseFloat(i),i=Te(m.min,m.max,i/100)-m.min),typeof i!="number")return;let h=Te(A.min,A.max,s);n===A&&(h-=i),n.min=pd(n.min,i,t,h,u),n.max=pd(n.max,i,t,h,u)}function gd(n,i,[t,s,u],A,m){Sv(n,i[t],i[s],i[u],i.scale,A,m)}const kv=["x","scaleX","originX"],vv=["y","scaleY","originY"];function yd(n,i,t,s){gd(n.x,i,kv,t?t.x:void 0,s?s.x:void 0),gd(n.y,i,vv,t?t.y:void 0,s?s.y:void 0)}function Sd(n){return n.translate===0&&n.scale===1}function Af(n){return Sd(n.x)&&Sd(n.y)}function kd(n,i){return n.min===i.min&&n.max===i.max}function Cv(n,i){return kd(n.x,i.x)&&kd(n.y,i.y)}function vd(n,i){return Math.round(n.min)===Math.round(i.min)&&Math.round(n.max)===Math.round(i.max)}function df(n,i){return vd(n.x,i.x)&&vd(n.y,i.y)}function Cd(n){return Ar(n.x)/Ar(n.y)}function Pd(n,i){return n.translate===i.translate&&n.scale===i.scale&&n.originPoint===i.originPoint}class Pv{constructor(){this.members=[]}add(i){tu(this.members,i),i.scheduleRender()}remove(i){if(ou(this.members,i),i===this.prevLead&&(this.prevLead=void 0),i===this.lead){const t=this.members[this.members.length-1];t&&this.promote(t)}}relegate(i){const t=this.members.findIndex(u=>i===u);if(t===0)return!1;let s;for(let u=t;u>=0;u--){const A=this.members[u];if(A.isPresent!==!1){s=A;break}}return s?(this.promote(s),!0):!1}promote(i,t){const s=this.lead;if(i!==s&&(this.prevLead=s,this.lead=i,i.show(),s)){s.instance&&s.scheduleRender(),i.scheduleRender(),i.resumeFrom=s,t&&(i.resumeFrom.preserveOpacity=!0),s.snapshot&&(i.snapshot=s.snapshot,i.snapshot.latestValues=s.animationValues||s.latestValues),i.root&&i.root.isUpdating&&(i.isLayoutDirty=!0);const{crossfade:u}=i.options;u===!1&&s.hide()}}exitAnimationComplete(){this.members.forEach(i=>{const{options:t,resumingFrom:s}=i;t.onExitComplete&&t.onExitComplete(),s&&s.options.onExitComplete&&s.options.onExitComplete()})}scheduleRender(){this.members.forEach(i=>{i.instance&&i.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Ev(n,i,t){let s="";const u=n.x.translate/i.x,A=n.y.translate/i.y,m=(t==null?void 0:t.z)||0;if((u||A||m)&&(s=`translate3d(${u}px, ${A}px, ${m}px) `),(i.x!==1||i.y!==1)&&(s+=`scale(${1/i.x}, ${1/i.y}) `),t){const{transformPerspective:p,rotate:y,rotateX:k,rotateY:v,skewX:B,skewY:R}=t;p&&(s=`perspective(${p}px) ${s}`),y&&(s+=`rotate(${y}deg) `),k&&(s+=`rotateX(${k}deg) `),v&&(s+=`rotateY(${v}deg) `),B&&(s+=`skewX(${B}deg) `),R&&(s+=`skewY(${R}deg) `)}const h=n.x.scale*i.x,f=n.y.scale*i.y;return(h!==1||f!==1)&&(s+=`scale(${h}, ${f})`),s||"none"}const Kn={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0},mi=typeof window<"u"&&window.MotionDebug!==void 0,ml=["","X","Y","Z"],Mv={visibility:"hidden"},Ed=1e3;let Tv=0;function Al(n,i,t,s){const{latestValues:u}=i;u[n]&&(t[n]=u[n],i.setStaticValue(n,0),s&&(s[n]=0))}function hf(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:i}=n.options;if(!i)return;const t=vh(i);if(window.MotionHasOptimisedAnimation(t,"transform")){const{layout:u,layoutId:A}=n.options;window.MotionCancelOptimisedAnimation(t,"transform",ke,!(u||A))}const{parent:s}=n;s&&!s.hasCheckedOptimisedAppear&&hf(s)}function ff({attachResizeListener:n,defaultParent:i,measureScroll:t,checkIsScrollRoot:s,resetTransform:u}){return class{constructor(m={},h=i==null?void 0:i()){this.id=Tv++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,mi&&(Kn.totalNodes=Kn.resolvedTargetDeltas=Kn.recalculatedProjection=0),this.nodes.forEach(Nv),this.nodes.forEach(xv),this.nodes.forEach(Kv),this.nodes.forEach(wv),mi&&window.MotionDebug.record(Kn)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=m,this.root=h?h.root||h:this,this.path=h?[...h.path,h]:[],this.parent=h,this.depth=h?h.depth+1:0;for(let f=0;f<this.path.length;f++)this.path[f].shouldResetTransform=!0;this.root===this&&(this.nodes=new dv)}addEventListener(m,h){return this.eventHandlers.has(m)||this.eventHandlers.set(m,new su),this.eventHandlers.get(m).add(h)}notifyListeners(m,...h){const f=this.eventHandlers.get(m);f&&f.notify(...h)}hasListeners(m){return this.eventHandlers.has(m)}mount(m,h=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=mv(m),this.instance=m;const{layoutId:f,layout:p,visualElement:y}=this.options;if(y&&!y.current&&y.mount(m),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),h&&(p||f)&&(this.isLayoutDirty=!0),n){let k;const v=()=>this.root.updateBlockedByResize=!1;n(m,()=>{this.root.updateBlockedByResize=!0,k&&k(),k=hv(v,250),Vt.hasAnimatedSinceResize&&(Vt.hasAnimatedSinceResize=!1,this.nodes.forEach(Td))})}f&&this.root.registerSharedNode(f,this),this.options.animate!==!1&&y&&(f||p)&&this.addEventListener("didUpdate",({delta:k,hasLayoutChanged:v,hasRelativeTargetChanged:B,layout:R})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const N=this.options.transition||y.getDefaultTransition()||Gv,{onLayoutAnimationStart:w,onLayoutAnimationComplete:_}=y.getProps(),G=!this.targetLayout||!df(this.targetLayout,R)||B,V=!v&&B;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||V||v&&(G||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(k,V);const Q={...ru(N,"layout"),onPlay:w,onComplete:_};(y.shouldReduceMotion||this.options.layoutRoot)&&(Q.delay=0,Q.type=!1),this.startAnimation(Q)}else v||Td(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=R})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const m=this.getStack();m&&m.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,gn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Iv),this.animationId++)}getTransformTemplate(){const{visualElement:m}=this.options;return m&&m.getProps().transformTemplate}willUpdate(m=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&hf(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let y=0;y<this.path.length;y++){const k=this.path[y];k.shouldResetTransform=!0,k.updateScroll("snapshot"),k.options.layoutRoot&&k.willUpdate(!1)}const{layoutId:h,layout:f}=this.options;if(h===void 0&&!f)return;const p=this.getTransformTemplate();this.prevTransformTemplateValue=p?p(this.latestValues,""):void 0,this.updateSnapshot(),m&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Md);return}this.isUpdating||this.nodes.forEach(bv),this.isUpdating=!1,this.nodes.forEach(Dv),this.nodes.forEach(Bv),this.nodes.forEach(Lv),this.clearAllSnapshots();const h=_r.now();He.delta=Zr(0,1e3/60,h-He.timestamp),He.timestamp=h,He.isProcessing=!0,nl.update.process(He),nl.preRender.process(He),nl.render.process(He),He.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,jl.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Rv),this.sharedNodes.forEach(_v)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,ke.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){ke.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let f=0;f<this.path.length;f++)this.path[f].updateScroll();const m=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Re(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:h}=this.options;h&&h.notify("LayoutMeasure",this.layout.layoutBox,m?m.layoutBox:void 0)}updateScroll(m="measure"){let h=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===m&&(h=!1),h){const f=s(this.instance);this.scroll={animationId:this.root.animationId,phase:m,isRoot:f,offset:t(this.instance),wasRoot:this.scroll?this.scroll.isRoot:f}}}resetTransform(){if(!u)return;const m=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,h=this.projectionDelta&&!Af(this.projectionDelta),f=this.getTransformTemplate(),p=f?f(this.latestValues,""):void 0,y=p!==this.prevTransformTemplateValue;m&&(h||xn(this.latestValues)||y)&&(u(this.instance,p),this.shouldResetTransform=!1,this.scheduleRender())}measure(m=!0){const h=this.measurePageBox();let f=this.removeElementScroll(h);return m&&(f=this.removeTransform(f)),Hv(f),{animationId:this.root.animationId,measuredBox:h,layoutBox:f,latestValues:{},source:this.id}}measurePageBox(){var m;const{visualElement:h}=this.options;if(!h)return Re();const f=h.measureViewportBox();if(!(((m=this.scroll)===null||m===void 0?void 0:m.wasRoot)||this.path.some(Vv))){const{scroll:y}=this.root;y&&(da(f.x,y.offset.x),da(f.y,y.offset.y))}return f}removeElementScroll(m){var h;const f=Re();if(Sr(f,m),!((h=this.scroll)===null||h===void 0)&&h.wasRoot)return f;for(let p=0;p<this.path.length;p++){const y=this.path[p],{scroll:k,options:v}=y;y!==this.root&&k&&v.layoutScroll&&(k.wasRoot&&Sr(f,m),da(f.x,k.offset.x),da(f.y,k.offset.y))}return f}applyTransform(m,h=!1){const f=Re();Sr(f,m);for(let p=0;p<this.path.length;p++){const y=this.path[p];!h&&y.options.layoutScroll&&y.scroll&&y!==y.root&&ha(f,{x:-y.scroll.offset.x,y:-y.scroll.offset.y}),xn(y.latestValues)&&ha(f,y.latestValues)}return xn(this.latestValues)&&ha(f,this.latestValues),f}removeTransform(m){const h=Re();Sr(h,m);for(let f=0;f<this.path.length;f++){const p=this.path[f];if(!p.instance||!xn(p.latestValues))continue;Ll(p.latestValues)&&p.updateSnapshot();const y=Re(),k=p.measurePageBox();Sr(y,k),yd(h,p.latestValues,p.snapshot?p.snapshot.layoutBox:void 0,y)}return xn(this.latestValues)&&yd(h,this.latestValues),h}setTargetDelta(m){this.targetDelta=m,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(m){this.options={...this.options,...m,crossfade:m.crossfade!==void 0?m.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==He.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(m=!1){var h;const f=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=f.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=f.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=f.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==f;if(!(m||p&&this.isSharedProjectionDirty||this.isProjectionDirty||!((h=this.parent)===null||h===void 0)&&h.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:k,layoutId:v}=this.options;if(!(!this.layout||!(k||v))){if(this.resolvedRelativeTargetAt=He.timestamp,!this.targetDelta&&!this.relativeTarget){const B=this.getClosestProjectingParent();B&&B.layout&&this.animationProgress!==1?(this.relativeParent=B,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Re(),this.relativeTargetOrigin=Re(),fi(this.relativeTargetOrigin,this.layout.layoutBox,B.layout.layoutBox),Sr(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=Re(),this.targetWithTransforms=Re()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),jk(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Sr(this.target,this.layout.layoutBox),of(this.target,this.targetDelta)):Sr(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const B=this.getClosestProjectingParent();B&&!!B.resumingFrom==!!this.resumingFrom&&!B.options.layoutScroll&&B.target&&this.animationProgress!==1?(this.relativeParent=B,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Re(),this.relativeTargetOrigin=Re(),fi(this.relativeTargetOrigin,this.target,B.target),Sr(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}mi&&Kn.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||Ll(this.parent.latestValues)||tf(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var m;const h=this.getLead(),f=!!this.resumingFrom||this!==h;let p=!0;if((this.isProjectionDirty||!((m=this.parent)===null||m===void 0)&&m.isProjectionDirty)&&(p=!1),f&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===He.timestamp&&(p=!1),p)return;const{layout:y,layoutId:k}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(y||k))return;Sr(this.layoutCorrected,this.layout.layoutBox);const v=this.treeScale.x,B=this.treeScale.y;ev(this.layoutCorrected,this.treeScale,this.path,f),h.layout&&!h.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(h.target=h.layout.layoutBox,h.targetWithTransforms=Re());const{target:R}=h;if(!R){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(fd(this.prevProjectionDelta.x,this.projectionDelta.x),fd(this.prevProjectionDelta.y,this.projectionDelta.y)),hi(this.projectionDelta,this.layoutCorrected,R,this.latestValues),(this.treeScale.x!==v||this.treeScale.y!==B||!Pd(this.projectionDelta.x,this.prevProjectionDelta.x)||!Pd(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",R)),mi&&Kn.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(m=!0){var h;if((h=this.options.visualElement)===null||h===void 0||h.scheduleRender(),m){const f=this.getStack();f&&f.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Aa(),this.projectionDelta=Aa(),this.projectionDeltaWithTransform=Aa()}setAnimationOrigin(m,h=!1){const f=this.snapshot,p=f?f.latestValues:{},y={...this.latestValues},k=Aa();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!h;const v=Re(),B=f?f.source:void 0,R=this.layout?this.layout.source:void 0,N=B!==R,w=this.getStack(),_=!w||w.members.length<=1,G=!!(N&&!_&&this.options.crossfade===!0&&!this.path.some(Ov));this.animationProgress=0;let V;this.mixTargetDelta=Q=>{const H=Q/1e3;Bd(k.x,m.x,H),Bd(k.y,m.y,H),this.setTargetDelta(k),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(fi(v,this.layout.layoutBox,this.relativeParent.layout.layoutBox),Yv(this.relativeTarget,this.relativeTargetOrigin,v,H),V&&Cv(this.relativeTarget,V)&&(this.isProjectionDirty=!1),V||(V=Re()),Sr(V,this.relativeTarget)),N&&(this.animationValues=y,pv(y,p,this.latestValues,H,G,_)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=H},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(m){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(gn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=ke.update(()=>{Vt.hasAnimatedSinceResize=!0,this.currentAnimation=cv(0,Ed,{...m,onUpdate:h=>{this.mixTargetDelta(h),m.onUpdate&&m.onUpdate(h)},onComplete:()=>{m.onComplete&&m.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const m=this.getStack();m&&m.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Ed),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const m=this.getLead();let{targetWithTransforms:h,target:f,layout:p,latestValues:y}=m;if(!(!h||!f||!p)){if(this!==m&&this.layout&&p&&pf(this.options.animationType,this.layout.layoutBox,p.layoutBox)){f=this.target||Re();const k=Ar(this.layout.layoutBox.x);f.x.min=m.target.x.min,f.x.max=f.x.min+k;const v=Ar(this.layout.layoutBox.y);f.y.min=m.target.y.min,f.y.max=f.y.min+v}Sr(h,f),ha(h,y),hi(this.projectionDeltaWithTransform,this.layoutCorrected,h,y)}}registerSharedNode(m,h){this.sharedNodes.has(m)||this.sharedNodes.set(m,new Pv),this.sharedNodes.get(m).add(h);const p=h.options.initialPromotionConfig;h.promote({transition:p?p.transition:void 0,preserveFollowOpacity:p&&p.shouldPreserveFollowOpacity?p.shouldPreserveFollowOpacity(h):void 0})}isLead(){const m=this.getStack();return m?m.lead===this:!0}getLead(){var m;const{layoutId:h}=this.options;return h?((m=this.getStack())===null||m===void 0?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:h}=this.options;return h?(m=this.getStack())===null||m===void 0?void 0:m.prevLead:void 0}getStack(){const{layoutId:m}=this.options;if(m)return this.root.sharedNodes.get(m)}promote({needsReset:m,transition:h,preserveFollowOpacity:f}={}){const p=this.getStack();p&&p.promote(this,f),m&&(this.projectionDelta=void 0,this.needsReset=!0),h&&this.setOptions({transition:h})}relegate(){const m=this.getStack();return m?m.relegate(this):!1}resetSkewAndRotation(){const{visualElement:m}=this.options;if(!m)return;let h=!1;const{latestValues:f}=m;if((f.z||f.rotate||f.rotateX||f.rotateY||f.rotateZ||f.skewX||f.skewY)&&(h=!0),!h)return;const p={};f.z&&Al("z",m,p,this.animationValues);for(let y=0;y<ml.length;y++)Al(`rotate${ml[y]}`,m,p,this.animationValues),Al(`skew${ml[y]}`,m,p,this.animationValues);m.render();for(const y in p)m.setStaticValue(y,p[y]),this.animationValues&&(this.animationValues[y]=p[y]);m.scheduleRender()}getProjectionStyles(m){var h,f;if(!this.instance||this.isSVG)return;if(!this.isVisible)return Mv;const p={visibility:""},y=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,p.opacity="",p.pointerEvents=Gt(m==null?void 0:m.pointerEvents)||"",p.transform=y?y(this.latestValues,""):"none",p;const k=this.getLead();if(!this.projectionDelta||!this.layout||!k.target){const N={};return this.options.layoutId&&(N.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,N.pointerEvents=Gt(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!xn(this.latestValues)&&(N.transform=y?y({},""):"none",this.hasProjected=!1),N}const v=k.animationValues||k.latestValues;this.applyTransformsToTarget(),p.transform=Ev(this.projectionDeltaWithTransform,this.treeScale,v),y&&(p.transform=y(v,p.transform));const{x:B,y:R}=this.projectionDelta;p.transformOrigin=`${B.origin*100}% ${R.origin*100}% 0`,k.animationValues?p.opacity=k===this?(f=(h=v.opacity)!==null&&h!==void 0?h:this.latestValues.opacity)!==null&&f!==void 0?f:1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:p.opacity=k===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const N in Ut){if(v[N]===void 0)continue;const{correct:w,applyTo:_}=Ut[N],G=p.transform==="none"?v[N]:w(v[N],k);if(_){const V=_.length;for(let Q=0;Q<V;Q++)p[_[Q]]=G}else p[N]=G}return this.options.layoutId&&(p.pointerEvents=k===this?Gt(m==null?void 0:m.pointerEvents)||"":"none"),p}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(m=>{var h;return(h=m.currentAnimation)===null||h===void 0?void 0:h.stop()}),this.root.nodes.forEach(Md),this.root.sharedNodes.clear()}}}function Bv(n){n.updateLayout()}function Lv(n){var i;const t=((i=n.resumeFrom)===null||i===void 0?void 0:i.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&t&&n.hasListeners("didUpdate")){const{layoutBox:s,measuredBox:u}=n.layout,{animationType:A}=n.options,m=t.source!==n.layout.source;A==="size"?kr(k=>{const v=m?t.measuredBox[k]:t.layoutBox[k],B=Ar(v);v.min=s[k].min,v.max=v.min+B}):pf(A,t.layoutBox,s)&&kr(k=>{const v=m?t.measuredBox[k]:t.layoutBox[k],B=Ar(s[k]);v.max=v.min+B,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[k].max=n.relativeTarget[k].min+B)});const h=Aa();hi(h,s,t.layoutBox);const f=Aa();m?hi(f,n.applyTransform(u,!0),t.measuredBox):hi(f,s,t.layoutBox);const p=!Af(h);let y=!1;if(!n.resumeFrom){const k=n.getClosestProjectingParent();if(k&&!k.resumeFrom){const{snapshot:v,layout:B}=k;if(v&&B){const R=Re();fi(R,t.layoutBox,v.layoutBox);const N=Re();fi(N,s,B.layoutBox),df(R,N)||(y=!0),k.options.layoutRoot&&(n.relativeTarget=N,n.relativeTargetOrigin=R,n.relativeParent=k)}}}n.notifyListeners("didUpdate",{layout:s,snapshot:t,delta:f,layoutDelta:h,hasLayoutChanged:p,hasRelativeTargetChanged:y})}else if(n.isLead()){const{onExitComplete:s}=n.options;s&&s()}n.options.transition=void 0}function Nv(n){mi&&Kn.totalNodes++,n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function wv(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function Rv(n){n.clearSnapshot()}function Md(n){n.clearMeasurements()}function bv(n){n.isLayoutDirty=!1}function Dv(n){const{visualElement:i}=n.options;i&&i.getProps().onBeforeLayoutMeasure&&i.notify("BeforeLayoutMeasure"),n.resetTransform()}function Td(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function xv(n){n.resolveTargetDelta()}function Kv(n){n.calcProjection()}function Iv(n){n.resetSkewAndRotation()}function _v(n){n.removeLeadSnapshot()}function Bd(n,i,t){n.translate=Te(i.translate,0,t),n.scale=Te(i.scale,1,t),n.origin=i.origin,n.originPoint=i.originPoint}function Ld(n,i,t,s){n.min=Te(i.min,t.min,s),n.max=Te(i.max,t.max,s)}function Yv(n,i,t,s){Ld(n.x,i.x,t.x,s),Ld(n.y,i.y,t.y,s)}function Ov(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const Gv={duration:.45,ease:[.4,0,.1,1]},Nd=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),wd=Nd("applewebkit/")&&!Nd("chrome/")?Math.round:mr;function Rd(n){n.min=wd(n.min),n.max=wd(n.max)}function Hv(n){Rd(n.x),Rd(n.y)}function pf(n,i,t){return n==="position"||n==="preserve-aspect"&&!Uk(Cd(i),Cd(t),.2)}function Vv(n){var i;return n!==n.root&&((i=n.scroll)===null||i===void 0?void 0:i.wasRoot)}const Fv=ff({attachResizeListener:(n,i)=>ki(n,"resize",i),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),dl={current:void 0},gf=ff({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!dl.current){const n=new Fv({});n.mount(window),n.setOptions({layoutScroll:!0}),dl.current=n}return dl.current},resetTransform:(n,i)=>{n.style.transform=i!==void 0?i:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Uv={pan:{Feature:ov},drag:{Feature:tv,ProjectionNode:gf,MeasureLayout:uf}};function bd(n,i,t){const{props:s}=n;n.animationState&&s.whileHover&&n.animationState.setActive("whileHover",t==="Start");const u="onHover"+t,A=s[u];A&&ke.postRender(()=>A(i,Ei(i)))}class jv extends Sn{mount(){const{current:i}=this.node;i&&(this.unmount=Uy(i,t=>(bd(this.node,t,"Start"),s=>bd(this.node,s,"End"))))}unmount(){}}class Wv extends Sn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let i=!1;try{i=this.node.current.matches(":focus-visible")}catch{i=!0}!i||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Pi(ki(this.node.current,"focus",()=>this.onFocus()),ki(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Dd(n,i,t){const{props:s}=n;n.animationState&&s.whileTap&&n.animationState.setActive("whileTap",t==="Start");const u="onTap"+(t==="End"?"":t),A=s[u];A&&ke.postRender(()=>A(i,Ei(i)))}class Jv extends Sn{mount(){const{current:i}=this.node;i&&(this.unmount=zy(i,t=>(Dd(this.node,t,"Start"),(s,{success:u})=>Dd(this.node,s,u?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const wl=new WeakMap,hl=new WeakMap,zv=n=>{const i=wl.get(n.target);i&&i(n)},Zv=n=>{n.forEach(zv)};function Qv({root:n,...i}){const t=n||document;hl.has(t)||hl.set(t,{});const s=hl.get(t),u=JSON.stringify(i);return s[u]||(s[u]=new IntersectionObserver(Zv,{root:n,...i})),s[u]}function Xv(n,i,t){const s=Qv(i);return wl.set(n,t),s.observe(n),()=>{wl.delete(n),s.unobserve(n)}}const qv={some:0,all:1};class $v extends Sn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:i={}}=this.node.getProps(),{root:t,margin:s,amount:u="some",once:A}=i,m={root:t?t.current:void 0,rootMargin:s,threshold:typeof u=="number"?u:qv[u]},h=f=>{const{isIntersecting:p}=f;if(this.isInView===p||(this.isInView=p,A&&!p&&this.hasEnteredView))return;p&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",p);const{onViewportEnter:y,onViewportLeave:k}=this.node.getProps(),v=p?y:k;v&&v(f)};return Xv(this.node.current,m,h)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:i,prevProps:t}=this.node;["amount","margin","root"].some(eC(i,t))&&this.startObserver()}unmount(){}}function eC({viewport:n={}},{viewport:i={}}={}){return t=>n[t]!==i[t]}const rC={inView:{Feature:$v},tap:{Feature:Jv},focus:{Feature:Wv},hover:{Feature:jv}},nC={layout:{ProjectionNode:gf,MeasureLayout:uf}},Rl={current:null},yf={current:!1};function aC(){if(yf.current=!0,!!Gl)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),i=()=>Rl.current=n.matches;n.addListener(i),i()}else Rl.current=!1}const iC=[...Vh,We,yn],tC=n=>iC.find(Hh(n)),xd=new WeakMap;function oC(n,i,t){for(const s in i){const u=i[s],A=t[s];if(Je(u))n.addValue(s,u);else if(Je(A))n.addValue(s,yi(u,{owner:n}));else if(A!==u)if(n.hasValue(s)){const m=n.getValue(s);m.liveStyle===!0?m.jump(u):m.hasAnimated||m.set(u)}else{const m=n.getStaticValue(s);n.addValue(s,yi(m!==void 0?m:u,{owner:n}))}}for(const s in t)i[s]===void 0&&n.removeValue(s);return i}const Kd=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class sC{scrapeMotionValuesFromProps(i,t,s){return{}}constructor({parent:i,props:t,presenceContext:s,reducedMotionConfig:u,blockInitialAnimation:A,visualState:m},h={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=du,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const B=_r.now();this.renderScheduledAt<B&&(this.renderScheduledAt=B,ke.render(this.render,!1,!0))};const{latestValues:f,renderState:p,onUpdate:y}=m;this.onUpdate=y,this.latestValues=f,this.baseTarget={...f},this.initialValues=t.initial?{...f}:{},this.renderState=p,this.parent=i,this.props=t,this.presenceContext=s,this.depth=i?i.depth+1:0,this.reducedMotionConfig=u,this.options=h,this.blockInitialAnimation=!!A,this.isControllingVariants=$t(t),this.isVariantNode=Qd(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(i&&i.current);const{willChange:k,...v}=this.scrapeMotionValuesFromProps(t,{},this);for(const B in v){const R=v[B];f[B]!==void 0&&Je(R)&&R.set(f[B],!1)}}mount(i){this.current=i,xd.set(i,this),this.projection&&!this.projection.instance&&this.projection.mount(i),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,s)=>this.bindToMotionValue(s,t)),yf.current||aC(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Rl.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){xd.delete(this.current),this.projection&&this.projection.unmount(),gn(this.notifyUpdate),gn(this.render),this.valueSubscriptions.forEach(i=>i()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const i in this.events)this.events[i].clear();for(const i in this.features){const t=this.features[i];t&&(t.unmount(),t.isMounted=!1)}this.current=null}bindToMotionValue(i,t){this.valueSubscriptions.has(i)&&this.valueSubscriptions.get(i)();const s=Yn.has(i),u=t.on("change",h=>{this.latestValues[i]=h,this.props.onUpdate&&ke.preRender(this.notifyUpdate),s&&this.projection&&(this.projection.isTransformDirty=!0)}),A=t.on("renderRequest",this.scheduleRender);let m;window.MotionCheckAppearSync&&(m=window.MotionCheckAppearSync(this,i,t)),this.valueSubscriptions.set(i,()=>{u(),A(),m&&m(),t.owner&&t.stop()})}sortNodePosition(i){return!this.current||!this.sortInstanceNodePosition||this.type!==i.type?0:this.sortInstanceNodePosition(this.current,i.current)}updateFeatures(){let i="animation";for(i in ga){const t=ga[i];if(!t)continue;const{isEnabled:s,Feature:u}=t;if(!this.features[i]&&u&&s(this.props)&&(this.features[i]=new u(this)),this.features[i]){const A=this.features[i];A.isMounted?A.update():(A.mount(),A.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Re()}getStaticValue(i){return this.latestValues[i]}setStaticValue(i,t){this.latestValues[i]=t}update(i,t){(i.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=i,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let s=0;s<Kd.length;s++){const u=Kd[s];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const A="on"+u,m=i[A];m&&(this.propEventSubscriptions[u]=this.on(u,m))}this.prevMotionValues=oC(this,this.scrapeMotionValuesFromProps(i,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(i){return this.props.variants?this.props.variants[i]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(i){const t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(i),()=>t.variantChildren.delete(i)}addValue(i,t){const s=this.values.get(i);t!==s&&(s&&this.removeValue(i),this.bindToMotionValue(i,t),this.values.set(i,t),this.latestValues[i]=t.get())}removeValue(i){this.values.delete(i);const t=this.valueSubscriptions.get(i);t&&(t(),this.valueSubscriptions.delete(i)),delete this.latestValues[i],this.removeValueFromRenderState(i,this.renderState)}hasValue(i){return this.values.has(i)}getValue(i,t){if(this.props.values&&this.props.values[i])return this.props.values[i];let s=this.values.get(i);return s===void 0&&t!==void 0&&(s=yi(t===null?void 0:t,{owner:this}),this.addValue(i,s)),s}readValue(i,t){var s;let u=this.latestValues[i]!==void 0||!this.current?this.latestValues[i]:(s=this.getBaseTargetFromProps(this.props,i))!==null&&s!==void 0?s:this.readValueFromInstance(this.current,i,this.options);return u!=null&&(typeof u=="string"&&(Oh(u)||wh(u))?u=parseFloat(u):!tC(u)&&yn.test(t)&&(u=Ih(i,t)),this.setBaseTarget(i,Je(u)?u.get():u)),Je(u)?u.get():u}setBaseTarget(i,t){this.baseTarget[i]=t}getBaseTarget(i){var t;const{initial:s}=this.props;let u;if(typeof s=="string"||typeof s=="object"){const m=Jl(this.props,s,(t=this.presenceContext)===null||t===void 0?void 0:t.custom);m&&(u=m[i])}if(s&&u!==void 0)return u;const A=this.getBaseTargetFromProps(this.props,i);return A!==void 0&&!Je(A)?A:this.initialValues[i]!==void 0&&u===void 0?void 0:this.baseTarget[i]}on(i,t){return this.events[i]||(this.events[i]=new su),this.events[i].add(t)}notify(i,...t){this.events[i]&&this.events[i].notify(...t)}}class Sf extends sC{constructor(){super(...arguments),this.KeyframeResolver=Fh}sortInstanceNodePosition(i,t){return i.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(i,t){return i.style?i.style[t]:void 0}removeValueFromRenderState(i,{vars:t,style:s}){delete t[i],delete s[i]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:i}=this.props;Je(i)&&(this.childSubscription=i.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}}function lC(n){return window.getComputedStyle(n)}class uC extends Sf{constructor(){super(...arguments),this.type="html",this.renderInstance=th}readValueFromInstance(i,t){if(Yn.has(t)){const s=Au(t);return s&&s.default||0}else{const s=lC(i),u=(nh(t)?s.getPropertyValue(t):s[t])||0;return typeof u=="string"?u.trim():u}}measureInstanceViewportBox(i,{transformPagePoint:t}){return sf(i,t)}build(i,t,s){Ql(i,t,s.transformTemplate)}scrapeMotionValuesFromProps(i,t,s){return eu(i,t,s)}}class cC extends Sf{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Re}getBaseTargetFromProps(i,t){return i[t]}readValueFromInstance(i,t){if(Yn.has(t)){const s=Au(t);return s&&s.default||0}return t=oh.has(t)?t:Ul(t),i.getAttribute(t)}scrapeMotionValuesFromProps(i,t,s){return uh(i,t,s)}build(i,t,s){Xl(i,t,this.isSVGTag,s.transformTemplate)}renderInstance(i,t,s,u){sh(i,t,s,u)}mount(i){this.isSVGTag=$l(i.tagName),super.mount(i)}}const mC=(n,i)=>Wl(n)?new cC(i):new uC(i,{allowProjection:n!==I.Fragment}),AC=_y({...Kk,...rC,...Uv,...nC},mC),Wr=qg(AC);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),kf=(...n)=>n.filter((i,t,s)=>!!i&&i.trim()!==""&&s.indexOf(i)===t).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var hC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fC=I.forwardRef(({color:n="currentColor",size:i=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:u="",children:A,iconNode:m,...h},f)=>I.createElement("svg",{ref:f,...hC,width:i,height:i,stroke:n,strokeWidth:s?Number(t)*24/Number(i):t,className:kf("lucide",u),...h},[...m.map(([p,y])=>I.createElement(p,y)),...Array.isArray(A)?A:[A]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=(n,i)=>{const t=I.forwardRef(({className:s,...u},A)=>I.createElement(fC,{ref:A,iconNode:i,className:kf(`lucide-${dC(n)}`,s),...u}));return t.displayName=`${n}`,t};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gu=ve("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=ve("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=ve("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=ve("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pC=ve("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gC=ve("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=ve("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yC=ve("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SC=ve("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=ve("CloudUpload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vC=ve("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=ve("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CC=ve("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=ve("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=ve("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dl=ve("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EC=ve("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=ve("Plane",[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=ve("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=ve("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=ve("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xl=ve("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kl=ve("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=ve("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Od=ve("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function no({compact:n=!1}){return g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"grid h-10 w-10 place-items-center rounded-[14px] bg-[#176BFF] text-white shadow-sm","aria-hidden":"true",children:g.jsx(Cf,{size:21,strokeWidth:2.2})}),!n&&g.jsx("span",{className:"text-[19px] font-semibold tracking-[-0.03em]",children:"LaProgra"})]})}function wr({children:n,onClick:i,variant:t="primary",disabled:s=!1,type:u="button",className:A="",ariaLabel:m}){const h={primary:"bg-[#176BFF] text-white hover:bg-[#0E57D8] focus-visible:ring-blue-500",secondary:"border border-black/10 bg-white/80 text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[.06] dark:text-white dark:hover:bg-white/[.1]",ghost:"text-slate-600 hover:bg-black/[.05] dark:text-slate-300 dark:hover:bg-white/[.07]",danger:"bg-red-600 text-white hover:bg-red-700"};return g.jsx("button",{type:u,onClick:i,disabled:s,"aria-label":m,className:`inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-semibold transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 ${h[t]} ${A}`,children:n})}function Sa({label:n,icon:i,error:t,hint:s,...u}){return g.jsxs("label",{className:"block",children:[g.jsx("span",{className:"mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200",children:n}),g.jsxs("div",{className:`flex min-h-12 items-center gap-3 rounded-[14px] border bg-white px-3.5 transition focus-within:ring-2 dark:bg-white/[.045] ${t?"border-red-400 focus-within:ring-red-200":"border-black/10 focus-within:border-blue-500 focus-within:ring-blue-100 dark:border-white/10 dark:focus-within:ring-blue-950"}`,children:[i&&g.jsx(i,{size:18,className:"shrink-0 text-slate-400","aria-hidden":"true"}),g.jsx("input",{className:"w-full bg-transparent py-3 text-[15px] text-slate-950 outline-none placeholder:text-slate-400 dark:text-white",...u})]}),t&&g.jsxs("span",{className:"mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600",children:[g.jsx(Pf,{size:13}),t]}),!t&&s&&g.jsx("span",{className:"mt-1.5 block text-xs text-slate-500 dark:text-slate-400",children:s})]})}function TC({onContinue:n,theme:i,setTheme:t}){const[s,u]=I.useState(!1),[A,m]=I.useState(""),[h,f]=I.useState(""),[p,y]=I.useState(!1),k=()=>{y(!0),!(!A||!h)&&(u(!0),setTimeout(()=>{u(!1),n()},700))};return g.jsxs("div",{className:"relative min-h-screen overflow-hidden bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white",children:[g.jsx("div",{className:"pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"}),g.jsxs("header",{className:"relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8",children:[g.jsx(no,{}),g.jsx("button",{onClick:()=>t(i==="dark"?"light":"dark"),className:"grid h-11 w-11 place-items-center rounded-full text-slate-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/10","aria-label":"Cambiar tema",children:i==="dark"?g.jsx(xl,{size:19}):g.jsx(Dl,{size:19})})]}),g.jsxs("main",{className:"relative mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl items-center px-5 pb-10 md:grid-cols-2 md:gap-16 md:px-8",children:[g.jsxs("section",{className:"hidden md:block",children:[g.jsxs("div",{className:"mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300",children:[g.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-blue-500"}),"Tu programación, más clara"]}),g.jsx("h1",{className:"max-w-lg text-5xl font-semibold leading-[1.02] tracking-[-0.05em]",children:"Tu calendario laboral y el de tu gente, en un solo lugar."}),g.jsx("p",{className:"mt-5 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400",children:"Importa tu programación, entiende cada actividad de un vistazo y encuentra coincidencias sin complicaciones."}),g.jsx("div",{className:"mt-10 grid max-w-md grid-cols-7 gap-2 opacity-90","aria-hidden":"true",children:[...Array(21)].map((v,B)=>g.jsx("div",{className:`h-12 rounded-xl ${B===9||B===10?"bg-emerald-400/80":B===4||B===16?"bg-violet-400/75":"bg-white shadow-sm dark:bg-white/10"}`},B))})]}),g.jsxs(Wr.section,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},className:"mx-auto w-full max-w-[430px]",children:[g.jsxs("div",{className:"mb-8 md:hidden",children:[g.jsxs("h1",{className:"text-[34px] font-semibold leading-tight tracking-[-0.045em]",children:["Bienvenido a",g.jsx("br",{}),"LaProgra."]}),g.jsx("p",{className:"mt-3 text-slate-600 dark:text-slate-400",children:"Tu programación, siempre a mano."})]}),g.jsxs("div",{className:"rounded-[26px] border border-black/[.06] bg-white/90 p-5 shadow-[0_18px_60px_rgba(20,23,28,.08)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#14171A]/90 md:p-7",children:[g.jsx("h2",{className:"text-2xl font-semibold tracking-[-0.035em]",children:"Iniciar sesión"}),g.jsx("p",{className:"mt-1.5 text-sm text-slate-500 dark:text-slate-400",children:"Accede para consultar tu calendario."}),g.jsxs("div",{className:"mt-6 space-y-4",children:[g.jsx(Sa,{label:"Correo electrónico",icon:PC,type:"email",placeholder:"tu@correo.com",value:A,onChange:v=>m(v.target.value),error:p&&!A?"Introduce tu correo":""}),g.jsx(Sa,{label:"Contraseña",icon:Ef,type:"password",placeholder:"••••••••",value:h,onChange:v=>f(v.target.value),error:p&&!h?"Introduce tu contraseña":""}),g.jsx("div",{className:"flex justify-end",children:g.jsx("button",{className:"text-sm font-semibold text-[#176BFF] hover:underline",children:"¿Has olvidado tu contraseña?"})}),g.jsx(wr,{onClick:k,className:"w-full",children:s?g.jsxs(g.Fragment,{children:[g.jsx("span",{className:"h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"}),"Accediendo…"]}):g.jsxs(g.Fragment,{children:["Continuar ",g.jsx(vf,{size:17})]})})]}),g.jsxs("div",{className:"my-5 flex items-center gap-3",children:[g.jsx("div",{className:"h-px flex-1 bg-black/10 dark:bg-white/10"}),g.jsx("span",{className:"text-xs text-slate-400",children:"o"}),g.jsx("div",{className:"h-px flex-1 bg-black/10 dark:bg-white/10"})]}),g.jsxs(wr,{variant:"secondary",onClick:n,className:"w-full",children:[g.jsx("span",{className:"grid h-5 w-5 place-items-center rounded-full bg-white text-[13px] font-bold text-blue-600 shadow-sm",children:"G"}),"Continuar con Google"]}),g.jsxs("p",{className:"mt-6 text-center text-sm text-slate-500 dark:text-slate-400",children:["¿Aún no tienes cuenta? ",g.jsx("button",{onClick:n,className:"font-semibold text-[#176BFF] hover:underline",children:"Crear cuenta"})]})]}),g.jsx("p",{className:"mt-5 text-center text-xs leading-relaxed text-slate-400",children:"Al continuar, aceptas las condiciones de uso y la política de privacidad."})]})]})]})}function BC({step:n}){return g.jsx("div",{className:"flex items-center gap-2","aria-label":`Paso ${n} de 3`,children:[1,2,3].map(i=>g.jsx("div",{className:`h-1.5 rounded-full transition-all ${i===n?"w-8 bg-[#176BFF]":i<n?"w-4 bg-blue-300 dark:bg-blue-700":"w-4 bg-slate-200 dark:bg-white/10"}`},i))})}function LC({onFinish:n,setProfile:i,setSchedule:t,setSchedulePeriod:s}){const[u,A]=I.useState(1),[m,h]=I.useState("Iberia"),[f,p]=I.useState("MAD"),[y,k]=I.useState(""),[v,B]=I.useState("idle"),[R,N]=I.useState(""),[w,_]=I.useState(0),[G,V]=I.useState(null),Q=I.useRef(null),H=X=>{var le;const j=(le=X.target.files)==null?void 0:le[0];j&&(B("loading"),N(""),j.text().then(de=>{const De=Og(de,m);t(De.events),s(De.period),V(De.period),_(Object.values(De.events).flat().length),setTimeout(()=>B("success"),1150)}).catch(de=>{console.error("No se pudo importar la programación",de),N(de instanceof Error?de.message:"No se pudo leer el archivo"),B("idle")}))},F=()=>{u<3?A(u+1):(i({airline:m,base:f,baseCity:fa(f),username:y||"pedro"}),n())};return g.jsxs("div",{className:"min-h-screen bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white",children:[g.jsxs("header",{className:"mx-auto flex max-w-4xl items-center justify-between px-5 py-5 md:px-8",children:[g.jsx(no,{}),g.jsxs("button",{className:"flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",children:[g.jsx(yC,{size:17}),g.jsx("span",{className:"hidden sm:inline",children:"Ayuda"})]})]}),g.jsxs("main",{className:"mx-auto flex max-w-2xl flex-col px-5 pb-12 pt-6 md:px-8 md:pt-14",children:[g.jsx(BC,{step:u}),g.jsxs(jd,{mode:"wait",children:[u===1&&g.jsxs(Wr.section,{initial:{opacity:0,x:22},animate:{opacity:1,x:0},exit:{opacity:0,x:-18},className:"mt-9",children:[g.jsx("p",{className:"text-sm font-semibold text-[#176BFF]",children:"Configura tu espacio"}),g.jsx("h1",{className:"mt-2 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]",children:"Empecemos por lo básico."}),g.jsx("p",{className:"mt-3 max-w-lg text-slate-600 dark:text-slate-400",children:"Estos datos ayudan a interpretar y organizar tu programación. Podrás cambiarlos más adelante."}),g.jsxs("div",{className:"mt-8 space-y-5 rounded-[24px] border border-black/[.06] bg-white p-5 shadow-sm dark:border-white/[.07] dark:bg-[#14171A] md:p-7",children:[g.jsxs("label",{className:"block",children:[g.jsx("span",{className:"mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200",children:"Aerolínea"}),g.jsxs("div",{className:"relative",children:[g.jsx(_d,{className:"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",size:18}),g.jsxs("select",{value:m,onChange:X=>h(X.target.value),className:"min-h-12 w-full appearance-none rounded-[14px] border border-black/10 bg-white pl-11 pr-10 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-white/[.045] dark:focus:ring-blue-950",children:[g.jsx("option",{children:"Iberia"}),g.jsx("option",{disabled:!0,children:"Más aerolíneas próximamente"})]})]})]}),g.jsx(Sa,{label:"Base",icon:bl,value:f,maxLength:3,onChange:X=>p(X.target.value.toUpperCase().replace(/[^A-Z]/g,"")),placeholder:"MAD",hint:"Código IATA de 3 letras"}),g.jsx(Sa,{label:"Nombre de usuario",icon:Kl,value:y,onChange:X=>k(X.target.value.replace(/\s/g,"").toLowerCase()),placeholder:"pedro",hint:"Será visible para tus amistades"})]})]},"step1"),u===2&&g.jsxs(Wr.section,{initial:{opacity:0,x:22},animate:{opacity:1,x:0},exit:{opacity:0,x:-18},className:"mt-9",children:[g.jsx("p",{className:"text-sm font-semibold text-[#176BFF]",children:"Primera importación"}),g.jsx("h1",{className:"mt-2 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]",children:"Trae tu programación."}),g.jsx("p",{className:"mt-3 max-w-lg text-slate-600 dark:text-slate-400",children:"Selecciona el archivo CSV recibido de Iberia. LaProgra interpretará las actividades reconocidas."}),g.jsx("input",{ref:Q,className:"hidden",type:"file",accept:".csv,text/csv",onChange:H}),g.jsxs("button",{onClick:()=>{var X;return(X=Q.current)==null?void 0:X.click()},className:`mt-8 flex min-h-[245px] w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed p-7 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${v==="success"?"border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20":"border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30 dark:border-white/15 dark:bg-[#14171A] dark:hover:border-blue-700"}`,children:[v==="idle"&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/60",children:g.jsx(kC,{size:26})}),g.jsx("h2",{className:"mt-5 text-lg font-semibold",children:"Selecciona o arrastra tu CSV"}),g.jsx("p",{className:"mt-2 text-sm text-slate-500 dark:text-slate-400",children:"Archivo de programación de Iberia · Máx. 10 MB"})]}),v==="loading"&&g.jsxs(g.Fragment,{children:[g.jsx("span",{className:"h-11 w-11 animate-spin rounded-full border-[3px] border-blue-100 border-t-[#176BFF] dark:border-blue-950 dark:border-t-blue-400"}),g.jsx("h2",{className:"mt-5 text-lg font-semibold",children:"Procesando programación…"}),g.jsx("p",{className:"mt-2 text-sm text-slate-500",children:"Descartando datos no necesarios"})]}),v==="success"&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white",children:g.jsx(Id,{size:27})}),g.jsx("h2",{className:"mt-5 text-lg font-semibold",children:"Programación preparada"}),g.jsxs("p",{className:"mt-2 text-sm text-slate-600 dark:text-slate-300",children:[w," ",w===1?"actividad reconocida":"actividades reconocidas",G&&` · ${new Intl.DateTimeFormat("es-ES",{month:"long",year:"numeric"}).format(new Date(G.year,G.month-1,1))}`]}),g.jsx("span",{className:"mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400",children:"Pulsa para sustituir el archivo"})]})]}),g.jsxs("div",{className:"mt-5 flex gap-3 rounded-[16px] bg-slate-100 p-4 text-sm text-slate-600 dark:bg-white/[.05] dark:text-slate-400",children:[g.jsx(Ef,{size:18,className:"mt-0.5 shrink-0"}),g.jsxs("p",{children:["La columna ",g.jsx("strong",{className:"text-slate-800 dark:text-slate-200",children:"Description"})," se descarta por completo durante la importación y no se conserva."]})]}),R&&g.jsx("p",{className:"mt-4 rounded-[14px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300",children:R})]},"step2"),u===3&&g.jsxs(Wr.section,{initial:{opacity:0,x:22},animate:{opacity:1,x:0},className:"mt-9",children:[g.jsx("div",{className:"grid h-16 w-16 place-items-center rounded-[22px] bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",children:g.jsx(Id,{size:30})}),g.jsx("h1",{className:"mt-6 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]",children:"Todo listo."}),g.jsx("p",{className:"mt-3 max-w-lg text-slate-600 dark:text-slate-400",children:"Tu calendario ya está preparado. Las horas se muestran en horario local de Madrid."}),g.jsx("div",{className:"mt-8 overflow-hidden rounded-[22px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]",children:[[_d,"Aerolínea",m],[bl,"Base",`${fa(f)||f||"MAD"} (${f||"MAD"})`],[Kl,"Usuario",`@${y||"pedro"}`],[vC,"Importación",v==="success"?`${w} ${w===1?"actividad":"actividades"}`:"Datos de demostración"]].map(([X,j,le],de)=>g.jsxs("div",{className:`flex items-center gap-4 px-5 py-4 ${de?"border-t border-black/[.06] dark:border-white/[.07]":""}`,children:[g.jsx(X,{size:18,className:"text-slate-400"}),g.jsx("span",{className:"flex-1 text-sm text-slate-500",children:j}),g.jsx("strong",{className:"text-sm font-semibold",children:le})]},j))})]},"step3")]}),g.jsxs("div",{className:"mt-9 flex items-center justify-between",children:[u>1?g.jsxs(wr,{variant:"ghost",onClick:()=>A(u-1),children:[g.jsx(gu,{size:17}),"Atrás"]}):g.jsx("span",{}),g.jsxs(wr,{onClick:F,disabled:u===1&&(!f||f.length!==3)||u===2&&v==="loading",children:[u===3?"Ver mi calendario":"Continuar",g.jsx(vf,{size:17})]})]})]})]})}function Gd({event:n,theme:i,onClick:t,compact:s=!1}){const u=fl[n.type];return g.jsxs("button",{onClick:t,className:`w-full overflow-hidden rounded-[8px] border px-1.5 py-1 text-center transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${i==="dark"?u.dark:u.light}`,children:[g.jsx("div",{className:"truncate text-[10px] font-extrabold leading-tight tracking-wide md:text-[11px]",children:n.label}),!s&&g.jsx("div",{className:"mt-0.5 truncate text-[9px] font-medium opacity-75 md:text-[10px]",children:n.time})]})}function Hd({active:n,setActive:i,desktop:t=!1}){const s=[["calendar",Cf,"Calendario"],["compare",Tf,"Comparar"],["settings",Mf,"Ajustes"]];return t?g.jsxs("aside",{className:"fixed inset-y-0 left-0 z-30 hidden w-[236px] flex-col border-r border-black/[.06] bg-white px-4 py-5 dark:border-white/[.07] dark:bg-[#101216] lg:flex",children:[g.jsx("div",{className:"px-2",children:g.jsx(no,{})}),g.jsx("nav",{className:"mt-10 space-y-1",children:s.map(([u,A,m])=>g.jsxs("button",{onClick:()=>i(u),className:`flex min-h-11 w-full items-center gap-3 rounded-[13px] px-3 text-sm font-semibold transition ${n===u?"bg-blue-50 text-[#176BFF] dark:bg-blue-950/50 dark:text-blue-300":"text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/[.06]"}`,children:[g.jsx(A,{size:19}),m]},u))}),g.jsxs("div",{className:"mt-auto rounded-[16px] bg-slate-50 p-3 dark:bg-white/[.04]",children:[g.jsx("p",{className:"text-xs font-semibold",children:"Horario"}),g.jsx("p",{className:"mt-1 text-xs text-slate-500",children:"Madrid Â· UTC+2"})]})]}):g.jsx("nav",{className:"fixed inset-x-0 bottom-0 z-40 border-t border-black/[.08] bg-white/90 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl dark:border-white/[.08] dark:bg-[#101216]/90 lg:hidden",children:g.jsx("div",{className:"mx-auto flex max-w-md justify-around",children:s.filter(([u])=>u==="compare").map(([u,A,m])=>g.jsxs("button",{onClick:()=>i(u),className:`flex min-h-13 min-w-20 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${n===u?"text-[#176BFF]":"text-slate-500 dark:text-slate-400"}`,children:[g.jsx(A,{size:21,strokeWidth:n===u?2.5:2}),m]},u))})})}function NC({theme:n,schedule:i,onOpenSettings:t,onLogout:s}){const[u,A]=I.useState("mes"),[m,h]=I.useState(null),[f,p]=I.useState(!1),[y,k]=I.useState(!1),v=i.events||i,B=i.period||{month:9,year:2026},R=new Date(B.year,B.month-1,1),N=new Intl.DateTimeFormat("es-ES",{month:"long",year:"numeric"}).format(R).replace(" de "," "),w=new Intl.DateTimeFormat("es-ES",{month:"short"}).format(R).replace(".","").toUpperCase(),_=(R.getDay()+6)%7,G=new Date(B.year,B.month,0).getDate(),V=Array.from({length:Math.ceil((_+G)/7)*7},(F,X)=>{const j=X-_+1;return j>0&&j<=G?j:null}),Q=["L","M","X","J","V","S","D"],H=["Lun","Mar","MiÃ©","Jue","Vie","SÃ¡b","Dom"];return g.jsxs("div",{className:"mx-auto max-w-[1500px] px-3 pb-24 pt-3 sm:px-5 lg:px-7 lg:pb-8 lg:pt-5",children:[g.jsxs("header",{className:"flex min-h-12 items-center justify-between gap-3",children:[g.jsx("div",{className:"lg:hidden",children:g.jsx(no,{compact:!0})}),g.jsxs("div",{className:"hidden lg:block",children:[g.jsx("h1",{className:"text-2xl font-semibold tracking-[-0.03em]",children:"Calendario"}),g.jsx("p",{className:"text-sm text-slate-500",children:"Tu programaciÃ³n de un vistazo"})]}),g.jsxs("div",{className:"flex items-center gap-1.5",children:[g.jsx("button",{onClick:()=>p(!f),className:"grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/[.07]","aria-label":"Buscar",children:g.jsx(Yd,{size:19})}),g.jsxs("div",{className:"relative ml-1",children:[g.jsx("button",{onClick:()=>k(!y),className:"grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white","aria-label":"Abrir menÃº de usuario","aria-expanded":y,children:"PL"}),y&&g.jsxs("div",{className:"absolute right-0 top-11 z-30 min-w-44 overflow-hidden rounded-[14px] border border-black/[.08] bg-white p-1 shadow-lg dark:border-white/[.1] dark:bg-[#181B20]",children:[g.jsxs("button",{onClick:()=>{k(!1),t()},className:"flex min-h-10 w-full items-center rounded-[10px] px-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[.08]",children:[g.jsx(Mf,{size:16,className:"mr-2"}),"Ajustes"]}),g.jsxs("button",{onClick:()=>{k(!1),s()},className:"flex min-h-10 w-full items-center rounded-[10px] px-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30",children:[g.jsx(CC,{size:16,className:"mr-2"}),"Cerrar sesión"]})]})]})]})]}),g.jsx(jd,{children:f&&g.jsx(Wr.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},className:"overflow-hidden",children:g.jsxs("div",{className:"mt-3 flex items-center gap-2 rounded-[14px] border border-black/10 bg-white px-3 dark:border-white/10 dark:bg-white/[.05]",children:[g.jsx(Yd,{size:17,className:"text-slate-400"}),g.jsx("input",{autoFocus:!0,className:"min-h-11 flex-1 bg-transparent text-sm outline-none",placeholder:"Buscar una actividadâ€¦"}),g.jsx("button",{onClick:()=>p(!1),"aria-label":"Cerrar búsqueda",children:g.jsx(Od,{size:17})})]})})}),g.jsxs("div",{className:"mt-5 flex flex-wrap items-end justify-between gap-3 sm:mt-7",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-0",children:[g.jsx("button",{className:"grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]","aria-label":"Mes anterior",children:g.jsx(pC,{size:19})}),g.jsx("h2",{className:"min-w-0 px-1 text-center text-xl font-semibold capitalize tracking-[-0.025em] sm:text-2xl",children:N}),g.jsx("button",{className:"grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/[.07]","aria-label":"Mes siguiente",children:g.jsx(gC,{size:19})})]}),g.jsx("p",{className:"ml-10 mt-0.5 text-xs text-slate-500",children:"Horario local de Madrid"})]}),g.jsx("div",{className:"flex rounded-[12px] bg-slate-200/70 p-1 dark:bg-white/[.07]",children:["mes","agenda"].map(F=>g.jsx("button",{onClick:()=>A(F),className:`min-h-8 rounded-[9px] px-3 text-xs font-semibold capitalize transition ${u===F?"bg-white text-slate-950 shadow-sm dark:bg-white/15 dark:text-white":"text-slate-500"}`,children:F},F))})]}),u==="mes"?g.jsxs(Wr.section,{initial:{opacity:0},animate:{opacity:1},className:"mt-4 overflow-hidden rounded-[18px] border border-black/[.07] bg-white shadow-sm dark:border-white/[.08] dark:bg-[#14171A] sm:rounded-[22px]",children:[g.jsx("div",{className:"grid grid-cols-7 border-b border-black/[.06] dark:border-white/[.07]",children:Q.map((F,X)=>g.jsxs("div",{className:`py-2.5 text-center text-[11px] font-semibold ${X>4?"text-slate-400":"text-slate-500"}`,children:[g.jsx("span",{className:"sm:hidden",children:F}),g.jsx("span",{className:"hidden sm:inline",children:H[X]})]},X))}),g.jsx("div",{className:"grid grid-cols-7",children:V.map((F,X)=>g.jsx("div",{className:`relative min-h-[82px] border-b border-r border-black/[.055] p-1 dark:border-white/[.06] sm:min-h-[116px] sm:p-1.5 lg:min-h-[132px] ${X%7===6?"border-r-0":""} ${X>=V.length-7?"border-b-0":""} ${F===3?"bg-blue-50/40 dark:bg-blue-950/10":""}`,children:F&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold sm:text-xs ${F===3?"bg-[#176BFF] text-white":"text-slate-600 dark:text-slate-300"}`,children:F}),g.jsx("div",{className:"space-y-1",children:(v[F]||[]).map((j,le)=>g.jsx(Gd,{event:j,theme:n,compact:!0,onClick:()=>h({...j,day:F})},le))})]})},X))})]}):g.jsx(Wr.section,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},className:"mt-4 space-y-2",children:Object.entries(v).map(([F,X])=>g.jsxs("div",{className:"flex gap-3 rounded-[16px] border border-black/[.06] bg-white p-3 dark:border-white/[.07] dark:bg-[#14171A]",children:[g.jsxs("div",{className:"w-10 shrink-0 text-center",children:[g.jsx("span",{className:"block text-[10px] font-semibold uppercase text-slate-400",children:w}),g.jsx("span",{className:"text-xl font-semibold",children:F})]}),g.jsx("div",{className:"flex-1 space-y-2",children:X.map((j,le)=>g.jsx(Gd,{event:j,theme:n,onClick:()=>h({...j,day:F})},le))})]},F))}),m&&g.jsxs(g.Fragment,{children:[g.jsx(Wr.button,{"aria-label":"Cerrar detalle",onClick:()=>h(null),initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"}),g.jsxs(Wr.aside,{initial:{y:"100%"},animate:{y:0},exit:{y:"100%"},transition:{type:"spring",damping:28,stiffness:300},className:"fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white p-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-2xl dark:bg-[#181B20] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px] sm:rounded-[24px]",children:[g.jsx("div",{className:"mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200 dark:bg-white/15 sm:hidden"}),g.jsxs("div",{className:"flex items-start justify-between",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex flex-wrap gap-2",children:[g.jsx("div",{className:`inline-flex rounded-lg px-2 py-1 text-xs font-bold ${n==="dark"?fl[m.type].dark:fl[m.type].light}`,children:m.flightNumber||m.label}),m.situated&&g.jsx("div",{className:"inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 dark:bg-white/[.1] dark:text-slate-200",children:"Situado"})]}),g.jsx("h3",{className:"mt-3 text-2xl font-semibold tracking-[-0.03em]",children:m.desc})]}),g.jsx("button",{onClick:()=>h(null),className:"grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-white/[.07]","aria-label":"Cerrar",children:g.jsx(Od,{size:18})})]}),g.jsxs("div",{className:"mt-6 space-y-4",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx(SC,{size:18,className:"text-slate-400"}),g.jsxs("div",{children:[g.jsx("p",{className:"text-xs text-slate-500",children:"Horario local de Madrid"}),g.jsx("p",{className:"text-sm font-semibold",children:m.time})]})]}),m.firmaTime&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx(EC,{size:18,className:"text-slate-400"}),g.jsxs("div",{children:[g.jsx("p",{className:"text-xs text-slate-500",children:"Firma"}),g.jsx("p",{className:"text-sm font-semibold",children:m.firmaTime})]})]})]})]})]})]})}function wC({onBack:n}){return g.jsxs("div",{className:"mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8",children:[g.jsx("button",{onClick:n,className:"mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]","aria-label":"Volver al calendario",children:g.jsx(gu,{size:20})}),g.jsx("h1",{className:"text-3xl font-semibold tracking-[-0.04em]",children:"Comparar"}),g.jsx("p",{className:"mt-2 text-slate-500",children:"Encuentra coincidencias con tus amistades."}),g.jsxs("div",{className:"mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 text-center dark:border-white/15 dark:bg-[#14171A]",children:[g.jsx("div",{className:"grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/50",children:g.jsx(Tf,{size:25})}),g.jsx("h2",{className:"mt-5 text-lg font-semibold",children:"Todavía no has añadido a ninguna amistad."}),g.jsx("p",{className:"mt-2 max-w-xs text-sm leading-relaxed text-slate-500",children:"Cuando conectes con alguien, podrás ver aquí vuestros días y actividades coincidentes."}),g.jsxs(wr,{className:"mt-6",children:[g.jsx(MC,{size:17}),"Añadir amistad"]})]})]})}function RC({theme:n,setTheme:i,profile:t,setProfile:s,onLogout:u,onBack:A}){const[m,h]=I.useState(!1),[f,p]=I.useState(!1),[y,k]=I.useState(t.username),[v,B]=I.useState(t.base),R=()=>{if(!y.trim()||v.trim().length!==3)return;const N=v.trim().toUpperCase();s({...t,username:y.trim().toLowerCase(),base:N,baseCity:fa(N)}),h(!1)};return g.jsxs("div",{className:"mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8",children:[g.jsx("button",{onClick:A,className:"mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]","aria-label":"Volver al calendario",children:g.jsx(gu,{size:20})}),g.jsx("h1",{className:"text-3xl font-semibold tracking-[-0.04em]",children:"Ajustes"}),g.jsx("p",{className:"mt-2 text-slate-500",children:"Personaliza tu experiencia en LaProgra."}),g.jsx("section",{className:"mt-8 overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]",children:m?g.jsxs("div",{className:"space-y-4 p-5",children:[g.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[g.jsx(Sa,{label:"Nombre de usuario",icon:Kl,value:y,onChange:N=>k(N.target.value.replace(/\s/g,"").toLowerCase())}),g.jsx(Sa,{label:"Base",icon:bl,value:v,maxLength:3,onChange:N=>B(N.target.value.toUpperCase().replace(/[^A-Z]/g,""))})]}),g.jsxs("div",{className:"flex justify-end gap-2",children:[g.jsx(wr,{variant:"ghost",onClick:()=>h(!1),children:"Cancelar"}),g.jsx(wr,{onClick:R,disabled:!y.trim()||v.length!==3,children:"Guardar"})]})]}):g.jsxs("div",{className:"flex items-center gap-4 p-5",children:[g.jsx("div",{className:"grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 font-bold text-white",children:"PL"}),g.jsxs("div",{className:"min-w-0 flex-1",children:[g.jsxs("p",{className:"truncate font-semibold",children:["@",t.username]}),g.jsxs("p",{className:"text-sm text-slate-500",children:[t.airline," Â· ",t.baseCity||t.base," (",t.base,")"]})]}),g.jsx(wr,{variant:"ghost",onClick:()=>h(!0),children:"Editar"})]})}),g.jsx("h2",{className:"mb-2 mt-7 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400",children:"Apariencia"}),g.jsx("section",{className:"overflow-hidden rounded-[20px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]",children:g.jsxs("div",{className:"flex items-center gap-4 p-5",children:[g.jsx("div",{className:"grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-white/[.07]",children:n==="dark"?g.jsx(Dl,{size:19}):g.jsx(xl,{size:19})}),g.jsxs("div",{className:"flex-1",children:[g.jsx("p",{className:"text-sm font-semibold",children:"Modo de color"}),g.jsx("p",{className:"text-xs text-slate-500",children:"Elige cómo se muestra la interfaz"})]}),g.jsx("div",{className:"flex rounded-[10px] bg-slate-100 p-1 dark:bg-white/[.06]",children:["light","dark"].map(N=>g.jsx("button",{onClick:()=>i(N),className:`grid h-8 w-9 place-items-center rounded-[7px] ${n===N?"bg-white shadow-sm dark:bg-white/15":"text-slate-400"}`,"aria-label":N==="light"?"Modo claro":"Modo oscuro",children:N==="light"?g.jsx(xl,{size:15}):g.jsx(Dl,{size:15})},N))})]})}),g.jsxs(wr,{variant:"ghost",onClick:()=>p(!0),className:"mt-8 w-full text-red-600 dark:text-red-400",children:[g.jsx(Pf,{size:17}),"Eliminar cuenta"]}),f&&g.jsxs(g.Fragment,{children:[g.jsx("button",{onClick:()=>p(!1),className:"fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]","aria-label":"Cerrar confirmación"}),g.jsxs("div",{role:"dialog","aria-modal":"true",className:"fixed inset-x-5 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-[22px] border border-black/[.08] bg-white p-6 shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]",children:[g.jsx("h2",{className:"text-xl font-semibold",children:"¿Estás seguro de eliminar tu cuenta en LaProgra?"}),g.jsxs("div",{className:"mt-6 flex justify-end gap-2",children:[g.jsx(wr,{variant:"ghost",onClick:()=>p(!1),children:"Cancelar"}),g.jsx(wr,{variant:"danger",onClick:()=>p(!1),children:"Aceptar"})]})]})]})]})}function bC(){const[n,i]=I.useState("login"),[t,s]=I.useState("light"),[u,A]=I.useState({airline:"Iberia",base:"MAD",baseCity:fa("MAD"),username:"pedro"}),[m,h]=I.useState(Gg),[f,p]=I.useState({month:9,year:2026}),[y,k]=I.useState("calendar"),v=()=>i("login");return g.jsxs("div",{className:t==="dark"?"dark":"",style:{fontFamily:"Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"},children:[g.jsx("style",{children:":root { color-scheme: light; } .dark { color-scheme: dark; } * { box-sizing: border-box; } button, input, select { font: inherit; } ::selection { background: rgba(23,107,255,.22); } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }"}),n==="login"&&g.jsx(TC,{onContinue:()=>i("onboarding"),theme:t,setTheme:s})," ",n==="onboarding"&&g.jsx(LC,{onFinish:()=>i("app"),setProfile:A,setSchedule:h,setSchedulePeriod:p})," ",n==="app"&&g.jsxs("div",{className:"min-h-screen bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white",children:[g.jsx(Hd,{active:y,setActive:k,desktop:!0}),g.jsxs("main",{className:"lg:pl-[236px]",children:[y==="calendar"&&g.jsx(NC,{theme:t,schedule:{events:m,period:f},onOpenSettings:()=>k("settings"),onLogout:v})," ",y==="compare"&&g.jsx(wC,{onBack:()=>k("calendar")})," ",y==="settings"&&g.jsx(RC,{theme:t,setTheme:s,profile:u,setProfile:A,onLogout:v,onBack:()=>k("calendar")})]}),g.jsx(Hd,{active:y,setActive:k})]})]})}Rg.createRoot(document.getElementById("root")).render(g.jsx(I.StrictMode,{children:g.jsx(bC,{})}));
