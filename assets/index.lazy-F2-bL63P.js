import{o as st,r as de,f as He,j as G,g as Ze,t as Pt,B as Qt,L as qe}from"./index-BEAinwMk.js";var _=function(){return _=Object.assign||function(e){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},_.apply(this,arguments)};function bt(t,e,r){if(r||arguments.length===2)for(var n=0,s=e.length,o;n<s;n++)(o||!(n in e))&&(o||(o=Array.prototype.slice.call(e,0,n)),o[n]=e[n]);return t.concat(o||Array.prototype.slice.call(e))}var v="-ms-",nt="-moz-",d="-webkit-",le="comm",xt="rule",Wt="decl",Ke="@import",he="@keyframes",Ue="@layer",ge=Math.abs,Yt=String.fromCharCode,Dt=Object.assign;function Je(t,e){return I(t,0)^45?(((e<<2^I(t,0))<<2^I(t,1))<<2^I(t,2))<<2^I(t,3):0}function me(t){return t.trim()}function T(t,e){return(t=e.exec(t))?t[0]:t}function u(t,e,r){return t.replace(e,r)}function ht(t,e,r){return t.indexOf(e,r)}function I(t,e){return t.charCodeAt(e)|0}function Z(t,e,r){return t.slice(e,r)}function N(t){return t.length}function ye(t){return t.length}function rt(t,e){return e.push(t),t}function Qe(t,e){return t.map(e).join("")}function Vt(t,e){return t.filter(function(r){return!T(r,e)})}var Ct=1,q=1,ve=0,P=0,A=0,Q="";function kt(t,e,r,n,s,o,i,a){return{value:t,root:e,parent:r,type:n,props:s,children:o,line:Ct,column:q,length:i,return:"",siblings:a}}function F(t,e){return Dt(kt("",null,null,"",null,null,0,t.siblings),t,{length:-t.length},e)}function Y(t){for(;t.root;)t=F(t.root,{children:[t]});rt(t,t.siblings)}function Ve(){return A}function Xe(){return A=P>0?I(Q,--P):0,q--,A===10&&(q=1,Ct--),A}function j(){return A=P<ve?I(Q,P++):0,q++,A===10&&(q=1,Ct++),A}function M(){return I(Q,P)}function gt(){return P}function At(t,e){return Z(Q,t,e)}function zt(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function tr(t){return Ct=q=1,ve=N(Q=t),P=0,[]}function er(t){return Q="",t}function jt(t){return me(At(P-1,Ft(t===91?t+2:t===40?t+1:t)))}function rr(t){for(;(A=M())&&A<33;)j();return zt(t)>2||zt(A)>3?"":" "}function nr(t,e){for(;--e&&j()&&!(A<48||A>102||A>57&&A<65||A>70&&A<97););return At(t,gt()+(e<6&&M()==32&&j()==32))}function Ft(t){for(;j();)switch(A){case t:return P;case 34:case 39:t!==34&&t!==39&&Ft(A);break;case 40:t===41&&Ft(t);break;case 92:j();break}return P}function sr(t,e){for(;j()&&t+A!==57;)if(t+A===84&&M()===47)break;return"/*"+At(e,P-1)+"*"+Yt(t===47?t:j())}function or(t){for(;!zt(M());)j();return At(t,P)}function ir(t){return er(mt("",null,null,null,[""],t=tr(t),0,[0],t))}function mt(t,e,r,n,s,o,i,a,c){for(var f=0,l=0,g=i,m=0,h=0,w=0,C=1,R=1,k=1,S=0,b="",x=s,E=o,y=n,p=b;R;)switch(w=S,S=j()){case 40:if(w!=108&&I(p,g-1)==58){ht(p+=u(jt(S),"&","&\f"),"&\f",ge(f?a[f-1]:0))!=-1&&(k=-1);break}case 34:case 39:case 91:p+=jt(S);break;case 9:case 10:case 13:case 32:p+=rr(w);break;case 92:p+=nr(gt()-1,7);continue;case 47:switch(M()){case 42:case 47:rt(ar(sr(j(),gt()),e,r,c),c);break;default:p+="/"}break;case 123*C:a[f++]=N(p)*k;case 125*C:case 59:case 0:switch(S){case 0:case 125:R=0;case 59+l:k==-1&&(p=u(p,/\f/g,"")),h>0&&N(p)-g&&rt(h>32?te(p+";",n,r,g-1,c):te(u(p," ","")+";",n,r,g-2,c),c);break;case 59:p+=";";default:if(rt(y=Xt(p,e,r,f,l,s,a,b,x=[],E=[],g,o),o),S===123)if(l===0)mt(p,e,y,y,x,o,g,a,E);else switch(m===99&&I(p,3)===110?100:m){case 100:case 108:case 109:case 115:mt(t,y,y,n&&rt(Xt(t,y,y,0,0,s,a,b,s,x=[],g,E),E),s,E,g,a,n?x:E);break;default:mt(p,y,y,y,[""],E,0,a,E)}}f=l=h=0,C=k=1,b=p="",g=i;break;case 58:g=1+N(p),h=w;default:if(C<1){if(S==123)--C;else if(S==125&&C++==0&&Xe()==125)continue}switch(p+=Yt(S),S*C){case 38:k=l>0?1:(p+="\f",-1);break;case 44:a[f++]=(N(p)-1)*k,k=1;break;case 64:M()===45&&(p+=jt(j())),m=M(),l=g=N(b=p+=or(gt())),S++;break;case 45:w===45&&N(p)==2&&(C=0)}}return o}function Xt(t,e,r,n,s,o,i,a,c,f,l,g){for(var m=s-1,h=s===0?o:[""],w=ye(h),C=0,R=0,k=0;C<n;++C)for(var S=0,b=Z(t,m+1,m=ge(R=i[C])),x=t;S<w;++S)(x=me(R>0?h[S]+" "+b:u(b,/&\f/g,h[S])))&&(c[k++]=x);return kt(t,e,r,s===0?xt:a,c,f,l,g)}function ar(t,e,r,n){return kt(t,e,r,le,Yt(Ve()),Z(t,2,-2),0,n)}function te(t,e,r,n,s){return kt(t,e,r,Wt,Z(t,0,n),Z(t,n+1,-1),n,s)}function be(t,e,r){switch(Je(t,e)){case 5103:return d+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return d+t+t;case 4789:return nt+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return d+t+nt+t+v+t+t;case 5936:switch(I(t,e+11)){case 114:return d+t+v+u(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return d+t+v+u(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return d+t+v+u(t,/[svh]\w+-[tblr]{2}/,"lr")+t}case 6828:case 4268:case 2903:return d+t+v+t+t;case 6165:return d+t+v+"flex-"+t+t;case 5187:return d+t+u(t,/(\w+).+(:[^]+)/,d+"box-$1$2"+v+"flex-$1$2")+t;case 5443:return d+t+v+"flex-item-"+u(t,/flex-|-self/g,"")+(T(t,/flex-|baseline/)?"":v+"grid-row-"+u(t,/flex-|-self/g,""))+t;case 4675:return d+t+v+"flex-line-pack"+u(t,/align-content|flex-|-self/g,"")+t;case 5548:return d+t+v+u(t,"shrink","negative")+t;case 5292:return d+t+v+u(t,"basis","preferred-size")+t;case 6060:return d+"box-"+u(t,"-grow","")+d+t+v+u(t,"grow","positive")+t;case 4554:return d+u(t,/([^-])(transform)/g,"$1"+d+"$2")+t;case 6187:return u(u(u(t,/(zoom-|grab)/,d+"$1"),/(image-set)/,d+"$1"),t,"")+t;case 5495:case 3959:return u(t,/(image-set\([^]*)/,d+"$1$`$1");case 4968:return u(u(t,/(.+:)(flex-)?(.*)/,d+"box-pack:$3"+v+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+d+t+t;case 4200:if(!T(t,/flex-|baseline/))return v+"grid-column-align"+Z(t,e)+t;break;case 2592:case 3360:return v+u(t,"template-","")+t;case 4384:case 3616:return r&&r.some(function(n,s){return e=s,T(n.props,/grid-\w+-end/)})?~ht(t+(r=r[e].value),"span",0)?t:v+u(t,"-start","")+t+v+"grid-row-span:"+(~ht(r,"span",0)?T(r,/\d+/):+T(r,/\d+/)-+T(t,/\d+/))+";":v+u(t,"-start","")+t;case 4896:case 4128:return r&&r.some(function(n){return T(n.props,/grid-\w+-start/)})?t:v+u(u(t,"-end","-span"),"span ","")+t;case 4095:case 3583:case 4068:case 2532:return u(t,/(.+)-inline(.+)/,d+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(N(t)-1-e>6)switch(I(t,e+1)){case 109:if(I(t,e+4)!==45)break;case 102:return u(t,/(.+:)(.+)-([^]+)/,"$1"+d+"$2-$3$1"+nt+(I(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~ht(t,"stretch",0)?be(u(t,"stretch","fill-available"),e,r)+t:t}break;case 5152:case 5920:return u(t,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,s,o,i,a,c,f){return v+s+":"+o+f+(i?v+s+"-span:"+(a?c:+c-+o)+f:"")+t});case 4949:if(I(t,e+6)===121)return u(t,":",":"+d)+t;break;case 6444:switch(I(t,I(t,14)===45?18:11)){case 120:return u(t,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+d+(I(t,14)===45?"inline-":"")+"box$3$1"+d+"$2$3$1"+v+"$2box$3")+t;case 100:return u(t,":",":"+v)+t}break;case 5719:case 2647:case 2135:case 3927:case 2391:return u(t,"scroll-","scroll-snap-")+t}return t}function wt(t,e){for(var r="",n=0;n<t.length;n++)r+=e(t[n],n,t,e)||"";return r}function cr(t,e,r,n){switch(t.type){case Ue:if(t.children.length)break;case Ke:case Wt:return t.return=t.return||t.value;case le:return"";case he:return t.return=t.value+"{"+wt(t.children,n)+"}";case xt:if(!N(t.value=t.props.join(",")))return""}return N(r=wt(t.children,n))?t.return=t.value+"{"+r+"}":""}function ur(t){var e=ye(t);return function(r,n,s,o){for(var i="",a=0;a<e;a++)i+=t[a](r,n,s,o)||"";return i}}function pr(t){return function(e){e.root||(e=e.return)&&t(e)}}function fr(t,e,r,n){if(t.length>-1&&!t.return)switch(t.type){case Wt:t.return=be(t.value,t.length,r);return;case he:return wt([F(t,{value:u(t.value,"@","@"+d)})],n);case xt:if(t.length)return Qe(r=t.props,function(s){switch(T(s,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Y(F(t,{props:[u(s,/:(read-\w+)/,":"+nt+"$1")]})),Y(F(t,{props:[s]})),Dt(t,{props:Vt(r,n)});break;case"::placeholder":Y(F(t,{props:[u(s,/:(plac\w+)/,":"+d+"input-$1")]})),Y(F(t,{props:[u(s,/:(plac\w+)/,":"+nt+"$1")]})),Y(F(t,{props:[u(s,/:(plac\w+)/,v+"input-$1")]})),Y(F(t,{props:[s]})),Dt(t,{props:Vt(r,n)});break}return""})}}var dr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},$={},K=typeof process<"u"&&$!==void 0&&($.REACT_APP_SC_ATTR||$.SC_ATTR)||"data-styled",we="active",Se="data-styled-version",Et="6.1.11",Ht=`/*!sc*/
`,Zt=typeof window<"u"&&"HTMLElement"in window,lr=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&$!==void 0&&$.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&$.REACT_APP_SC_DISABLE_SPEEDY!==""?$.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&$.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&$!==void 0&&$.SC_DISABLE_SPEEDY!==void 0&&$.SC_DISABLE_SPEEDY!==""&&$.SC_DISABLE_SPEEDY!=="false"&&$.SC_DISABLE_SPEEDY),It=Object.freeze([]),U=Object.freeze({});function hr(t,e,r){return r===void 0&&(r=U),t.theme!==r.theme&&t.theme||e||r.theme}var xe=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),gr=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,mr=/(^-|-$)/g;function ee(t){return t.replace(gr,"-").replace(mr,"")}var yr=/(a)(d)/gi,dt=52,re=function(t){return String.fromCharCode(t+(t>25?39:97))};function Lt(t){var e,r="";for(e=Math.abs(t);e>dt;e=e/dt|0)r=re(e%dt)+r;return(re(e%dt)+r).replace(yr,"$1-$2")}var Nt,Ce=5381,H=function(t,e){for(var r=e.length;r;)t=33*t^e.charCodeAt(--r);return t},ke=function(t){return H(Ce,t)};function vr(t){return Lt(ke(t)>>>0)}function br(t){return t.displayName||t.name||"Component"}function Ot(t){return typeof t=="string"&&!0}var Ae=typeof Symbol=="function"&&Symbol.for,Ee=Ae?Symbol.for("react.memo"):60115,wr=Ae?Symbol.for("react.forward_ref"):60112,Sr={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},xr={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ie={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Cr=((Nt={})[wr]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Nt[Ee]=Ie,Nt);function ne(t){return("type"in(e=t)&&e.type.$$typeof)===Ee?Ie:"$$typeof"in t?Cr[t.$$typeof]:Sr;var e}var kr=Object.defineProperty,Ar=Object.getOwnPropertyNames,se=Object.getOwnPropertySymbols,Er=Object.getOwnPropertyDescriptor,Ir=Object.getPrototypeOf,oe=Object.prototype;function _e(t,e,r){if(typeof e!="string"){if(oe){var n=Ir(e);n&&n!==oe&&_e(t,n,r)}var s=Ar(e);se&&(s=s.concat(se(e)));for(var o=ne(t),i=ne(e),a=0;a<s.length;++a){var c=s[a];if(!(c in xr||r&&r[c]||i&&c in i||o&&c in o)){var f=Er(e,c);try{kr(t,c,f)}catch{}}}}return t}function J(t){return typeof t=="function"}function qt(t){return typeof t=="object"&&"styledComponentId"in t}function B(t,e){return t&&e?"".concat(t," ").concat(e):t||e||""}function ie(t,e){if(t.length===0)return"";for(var r=t[0],n=1;n<t.length;n++)r+=t[n];return r}function ot(t){return t!==null&&typeof t=="object"&&t.constructor.name===Object.name&&!("props"in t&&t.$$typeof)}function Gt(t,e,r){if(r===void 0&&(r=!1),!r&&!ot(t)&&!Array.isArray(t))return e;if(Array.isArray(e))for(var n=0;n<e.length;n++)t[n]=Gt(t[n],e[n]);else if(ot(e))for(var n in e)t[n]=Gt(t[n],e[n]);return t}function Kt(t,e){Object.defineProperty(t,"toString",{value:e})}function it(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(e.length>0?" Args: ".concat(e.join(", ")):""))}var _r=function(){function t(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return t.prototype.indexOfGroup=function(e){for(var r=0,n=0;n<e;n++)r+=this.groupSizes[n];return r},t.prototype.insertRules=function(e,r){if(e>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,o=s;e>=o;)if((o<<=1)<0)throw it(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var i=s;i<o;i++)this.groupSizes[i]=0}for(var a=this.indexOfGroup(e+1),c=(i=0,r.length);i<c;i++)this.tag.insertRule(a,r[i])&&(this.groupSizes[e]++,a++)},t.prototype.clearGroup=function(e){if(e<this.length){var r=this.groupSizes[e],n=this.indexOfGroup(e),s=n+r;this.groupSizes[e]=0;for(var o=n;o<s;o++)this.tag.deleteRule(n)}},t.prototype.getGroup=function(e){var r="";if(e>=this.length||this.groupSizes[e]===0)return r;for(var n=this.groupSizes[e],s=this.indexOfGroup(e),o=s+n,i=s;i<o;i++)r+="".concat(this.tag.getRule(i)).concat(Ht);return r},t}(),yt=new Map,St=new Map,vt=1,lt=function(t){if(yt.has(t))return yt.get(t);for(;St.has(vt);)vt++;var e=vt++;return yt.set(t,e),St.set(e,t),e},Rr=function(t,e){vt=e+1,yt.set(t,e),St.set(e,t)},$r="style[".concat(K,"][").concat(Se,'="').concat(Et,'"]'),Pr=new RegExp("^".concat(K,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),jr=function(t,e,r){for(var n,s=r.split(","),o=0,i=s.length;o<i;o++)(n=s[o])&&t.registerName(e,n)},Nr=function(t,e){for(var r,n=((r=e.textContent)!==null&&r!==void 0?r:"").split(Ht),s=[],o=0,i=n.length;o<i;o++){var a=n[o].trim();if(a){var c=a.match(Pr);if(c){var f=0|parseInt(c[1],10),l=c[2];f!==0&&(Rr(l,f),jr(t,l,c[3]),t.getTag().insertRules(f,s)),s.length=0}else s.push(a)}}};function Or(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Re=function(t){var e=document.head,r=t||e,n=document.createElement("style"),s=function(a){var c=Array.from(a.querySelectorAll("style[".concat(K,"]")));return c[c.length-1]}(r),o=s!==void 0?s.nextSibling:null;n.setAttribute(K,we),n.setAttribute(Se,Et);var i=Or();return i&&n.setAttribute("nonce",i),r.insertBefore(n,o),n},Tr=function(){function t(e){this.element=Re(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,s=0,o=n.length;s<o;s++){var i=n[s];if(i.ownerNode===r)return i}throw it(17)}(this.element),this.length=0}return t.prototype.insertRule=function(e,r){try{return this.sheet.insertRule(r,e),this.length++,!0}catch{return!1}},t.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.prototype.getRule=function(e){var r=this.sheet.cssRules[e];return r&&r.cssText?r.cssText:""},t}(),Dr=function(){function t(e){this.element=Re(e),this.nodes=this.element.childNodes,this.length=0}return t.prototype.insertRule=function(e,r){if(e<=this.length&&e>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},t.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},t}(),zr=function(){function t(e){this.rules=[],this.length=0}return t.prototype.insertRule=function(e,r){return e<=this.length&&(this.rules.splice(e,0,r),this.length++,!0)},t.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},t}(),ae=Zt,Fr={isServer:!Zt,useCSSOMInjection:!lr},$e=function(){function t(e,r,n){e===void 0&&(e=U),r===void 0&&(r={});var s=this;this.options=_(_({},Fr),e),this.gs=r,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Zt&&ae&&(ae=!1,function(o){for(var i=document.querySelectorAll($r),a=0,c=i.length;a<c;a++){var f=i[a];f&&f.getAttribute(K)!==we&&(Nr(o,f),f.parentNode&&f.parentNode.removeChild(f))}}(this)),Kt(this,function(){return function(o){for(var i=o.getTag(),a=i.length,c="",f=function(g){var m=function(k){return St.get(k)}(g);if(m===void 0)return"continue";var h=o.names.get(m),w=i.getGroup(g);if(h===void 0||w.length===0)return"continue";var C="".concat(K,".g").concat(g,'[id="').concat(m,'"]'),R="";h!==void 0&&h.forEach(function(k){k.length>0&&(R+="".concat(k,","))}),c+="".concat(w).concat(C,'{content:"').concat(R,'"}').concat(Ht)},l=0;l<a;l++)f(l);return c}(s)})}return t.registerId=function(e){return lt(e)},t.prototype.reconstructWithOptions=function(e,r){return r===void 0&&(r=!0),new t(_(_({},this.options),e),this.gs,r&&this.names||void 0)},t.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.prototype.getTag=function(){return this.tag||(this.tag=(e=function(r){var n=r.useCSSOMInjection,s=r.target;return r.isServer?new zr(s):n?new Tr(s):new Dr(s)}(this.options),new _r(e)));var e},t.prototype.hasNameForId=function(e,r){return this.names.has(e)&&this.names.get(e).has(r)},t.prototype.registerName=function(e,r){if(lt(e),this.names.has(e))this.names.get(e).add(r);else{var n=new Set;n.add(r),this.names.set(e,n)}},t.prototype.insertRules=function(e,r,n){this.registerName(e,r),this.getTag().insertRules(lt(e),n)},t.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.prototype.clearRules=function(e){this.getTag().clearGroup(lt(e)),this.clearNames(e)},t.prototype.clearTag=function(){this.tag=void 0},t}(),Lr=/&/g,Gr=/^\s*\/\/.*$/gm;function Pe(t,e){return t.map(function(r){return r.type==="rule"&&(r.value="".concat(e," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(e," ")),r.props=r.props.map(function(n){return"".concat(e," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Pe(r.children,e)),r})}function Br(t){var e,r,n,s=U,o=s.options,i=o===void 0?U:o,a=s.plugins,c=a===void 0?It:a,f=function(m,h,w){return w.startsWith(r)&&w.endsWith(r)&&w.replaceAll(r,"").length>0?".".concat(e):m},l=c.slice();l.push(function(m){m.type===xt&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(Lr,r).replace(n,f))}),i.prefix&&l.push(fr),l.push(cr);var g=function(m,h,w,C){h===void 0&&(h=""),w===void 0&&(w=""),C===void 0&&(C="&"),e=C,r=h,n=new RegExp("\\".concat(r,"\\b"),"g");var R=m.replace(Gr,""),k=ir(w||h?"".concat(w," ").concat(h," { ").concat(R," }"):R);i.namespace&&(k=Pe(k,i.namespace));var S=[];return wt(k,ur(l.concat(pr(function(b){return S.push(b)})))),S};return g.hash=c.length?c.reduce(function(m,h){return h.name||it(15),H(m,h.name)},Ce).toString():"",g}var Mr=new $e,Bt=Br(),je=st.createContext({shouldForwardProp:void 0,styleSheet:Mr,stylis:Bt});je.Consumer;st.createContext(void 0);function ce(){return de.useContext(je)}var Wr=function(){function t(e,r){var n=this;this.inject=function(s,o){o===void 0&&(o=Bt);var i=n.name+o.hash;s.hasNameForId(n.id,i)||s.insertRules(n.id,i,o(n.rules,i,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=r,Kt(this,function(){throw it(12,String(n.name))})}return t.prototype.getName=function(e){return e===void 0&&(e=Bt),this.name+e.hash},t}(),Yr=function(t){return t>="A"&&t<="Z"};function ue(t){for(var e="",r=0;r<t.length;r++){var n=t[r];if(r===1&&n==="-"&&t[0]==="-")return t;Yr(n)?e+="-"+n.toLowerCase():e+=n}return e.startsWith("ms-")?"-"+e:e}var Ne=function(t){return t==null||t===!1||t===""},Oe=function(t){var e,r,n=[];for(var s in t){var o=t[s];t.hasOwnProperty(s)&&!Ne(o)&&(Array.isArray(o)&&o.isCss||J(o)?n.push("".concat(ue(s),":"),o,";"):ot(o)?n.push.apply(n,bt(bt(["".concat(s," {")],Oe(o),!1),["}"],!1)):n.push("".concat(ue(s),": ").concat((e=s,(r=o)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||e in dr||e.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function W(t,e,r,n){if(Ne(t))return[];if(qt(t))return[".".concat(t.styledComponentId)];if(J(t)){if(!J(o=t)||o.prototype&&o.prototype.isReactComponent||!e)return[t];var s=t(e);return W(s,e,r,n)}var o;return t instanceof Wr?r?(t.inject(r,n),[t.getName(n)]):[t]:ot(t)?Oe(t):Array.isArray(t)?Array.prototype.concat.apply(It,t.map(function(i){return W(i,e,r,n)})):[t.toString()]}function Hr(t){for(var e=0;e<t.length;e+=1){var r=t[e];if(J(r)&&!qt(r))return!1}return!0}var Zr=ke(Et),qr=function(){function t(e,r,n){this.rules=e,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Hr(e),this.componentId=r,this.baseHash=H(Zr,r),this.baseStyle=n,$e.registerId(r)}return t.prototype.generateAndInjectStyles=function(e,r,n){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))s=B(s,this.staticRulesId);else{var o=ie(W(this.rules,e,r,n)),i=Lt(H(this.baseHash,o)>>>0);if(!r.hasNameForId(this.componentId,i)){var a=n(o,".".concat(i),void 0,this.componentId);r.insertRules(this.componentId,i,a)}s=B(s,i),this.staticRulesId=i}else{for(var c=H(this.baseHash,n.hash),f="",l=0;l<this.rules.length;l++){var g=this.rules[l];if(typeof g=="string")f+=g;else if(g){var m=ie(W(g,e,r,n));c=H(c,m+l),f+=m}}if(f){var h=Lt(c>>>0);r.hasNameForId(this.componentId,h)||r.insertRules(this.componentId,h,n(f,".".concat(h),void 0,this.componentId)),s=B(s,h)}}return s},t}(),Te=st.createContext(void 0);Te.Consumer;var Tt={};function Kr(t,e,r){var n=qt(t),s=t,o=!Ot(t),i=e.attrs,a=i===void 0?It:i,c=e.componentId,f=c===void 0?function(x,E){var y=typeof x!="string"?"sc":ee(x);Tt[y]=(Tt[y]||0)+1;var p="".concat(y,"-").concat(vr(Et+y+Tt[y]));return E?"".concat(E,"-").concat(p):p}(e.displayName,e.parentComponentId):c,l=e.displayName,g=l===void 0?function(x){return Ot(x)?"styled.".concat(x):"Styled(".concat(br(x),")")}(t):l,m=e.displayName&&e.componentId?"".concat(ee(e.displayName),"-").concat(e.componentId):e.componentId||f,h=n&&s.attrs?s.attrs.concat(a).filter(Boolean):a,w=e.shouldForwardProp;if(n&&s.shouldForwardProp){var C=s.shouldForwardProp;if(e.shouldForwardProp){var R=e.shouldForwardProp;w=function(x,E){return C(x,E)&&R(x,E)}}else w=C}var k=new qr(r,m,n?s.componentStyle:void 0);function S(x,E){return function(y,p,V){var at=y.attrs,Fe=y.componentStyle,Le=y.defaultProps,Ge=y.foldedComponentIds,Be=y.styledComponentId,Me=y.target,We=st.useContext(Te),Ye=ce(),_t=y.shouldForwardProp||Ye.shouldForwardProp,Ut=hr(p,We,Le)||U,O=function(ut,tt,pt){for(var et,L=_(_({},tt),{className:void 0,theme:pt}),$t=0;$t<ut.length;$t+=1){var ft=J(et=ut[$t])?et(L):et;for(var z in ft)L[z]=z==="className"?B(L[z],ft[z]):z==="style"?_(_({},L[z]),ft[z]):ft[z]}return tt.className&&(L.className=B(L.className,tt.className)),L}(at,p,Ut),ct=O.as||Me,X={};for(var D in O)O[D]===void 0||D[0]==="$"||D==="as"||D==="theme"&&O.theme===Ut||(D==="forwardedAs"?X.as=O.forwardedAs:_t&&!_t(D,ct)||(X[D]=O[D]));var Jt=function(ut,tt){var pt=ce(),et=ut.generateAndInjectStyles(tt,pt.styleSheet,pt.stylis);return et}(Fe,O),Rt=B(Ge,Be);return Jt&&(Rt+=" "+Jt),O.className&&(Rt+=" "+O.className),X[Ot(ct)&&!xe.has(ct)?"class":"className"]=Rt,X.ref=V,de.createElement(ct,X)}(b,x,E)}S.displayName=g;var b=st.forwardRef(S);return b.attrs=h,b.componentStyle=k,b.displayName=g,b.shouldForwardProp=w,b.foldedComponentIds=n?B(s.foldedComponentIds,s.styledComponentId):"",b.styledComponentId=m,b.target=n?s.target:t,Object.defineProperty(b,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(x){this._foldedDefaultProps=n?function(E){for(var y=[],p=1;p<arguments.length;p++)y[p-1]=arguments[p];for(var V=0,at=y;V<at.length;V++)Gt(E,at[V],!0);return E}({},s.defaultProps,x):x}}),Kt(b,function(){return".".concat(b.styledComponentId)}),o&&_e(b,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),b}function pe(t,e){for(var r=[t[0]],n=0,s=e.length;n<s;n+=1)r.push(e[n],t[n+1]);return r}var fe=function(t){return Object.assign(t,{isCss:!0})};function Ur(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(J(t)||ot(t))return fe(W(pe(It,bt([t],e,!0))));var n=t;return e.length===0&&n.length===1&&typeof n[0]=="string"?W(n):fe(W(pe(n,e)))}function Mt(t,e,r){if(r===void 0&&(r=U),!e)throw it(1,e);var n=function(s){for(var o=[],i=1;i<arguments.length;i++)o[i-1]=arguments[i];return t(e,r,Ur.apply(void 0,bt([s],o,!1)))};return n.attrs=function(s){return Mt(t,e,_(_({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)}))},n.withConfig=function(s){return Mt(t,e,_(_({},r),s))},n}var De=function(t){return Mt(Kr,t)},ze=De;xe.forEach(function(t){ze[t]=De(t)});const Jr="nzcom-client",Qr="0.1.7",Vr="module",Xr={dev:"vite",build:"tsc -b && vite build",lint:"eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",preview:"vite preview",test:"jest $npm_config_dir"},tn={"@tanstack/react-router":"^1.43.12",luxon:"^3.5.0",primeflex:"^3.3.1",primeicons:"^7.0.0",primereact:"^10.6.6",react:"^18.3.1","react-dom":"^18.3.1","use-indexed-db-state":"^1.0.1"},en={"@happy-dom/jest-environment":"^14.12.3","@tanstack/router-devtools":"^1.43.12","@tanstack/router-plugin":"^1.43.12","@testing-library/jest-dom":"^6.4.6","@testing-library/react":"^16.0.0","@types/jest":"^29.5.12","@types/luxon":"^3.4.2","@types/react":"^18.3.3","@types/react-dom":"^18.3.0","@typescript-eslint/eslint-plugin":"^7.13.1","@typescript-eslint/parser":"^7.13.1","@vitejs/plugin-react-swc":"^3.5.0",eslint:"^8.57.0","eslint-plugin-react-hooks":"^4.6.2","eslint-plugin-react-refresh":"^0.4.7","gh-pages":"^6.1.1","happy-dom":"^14.12.3",install:"^0.13.0",jest:"^29.7.0","jest-environment-jsdom":"^29.7.0",npm:"^10.8.1","react-select-event":"^5.5.1","styled-components":"^6.1.11","ts-jest":"^29.1.5","ts-node":"^10.9.2",typescript:"^5.5.4",vite:"^5.3.1"},rn={name:Jr,private:!0,version:Qr,type:Vr,scripts:Xr,dependencies:tn,devDependencies:en},nn=ze.div`
            .p-card-title {
                font-size: 1.2rem
            }
        `,sn=He("/")({component:()=>{const e=sn.useRouteContext().lang,r=()=>G.jsx(qe,{to:"/about",children:G.jsx("img",{src:"/nztransp2407.png",alt:"NZ",title:`Copyright © 2024, Nikit Zykov, version ${rn.version}`,style:{maxWidth:"70vh",maxHeight:"50vh"}})});return G.jsx("div",{className:"flex flex-grow-1 align-items-center justify-content-center overflow-y-scroll",children:G.jsx(nn,{children:G.jsxs(Ze,{title:Pt("Nikit Zykov",e),header:r,"data-testid":"nameDisplay",children:[G.jsx(Qt,{"data-testid":"linkToMail",icon:"pi pi-envelope",tooltip:Pt("E-mail address",e),text:!0,onClick:()=>window.open("mailto:nikit@zykov.com","_blank"),children:" nikit@zykov.com"}),G.jsx(Qt,{"data-testid":"linkToTG",icon:"pi pi-telegram",tooltip:Pt("Telegram",e),text:!0,onClick:()=>window.open("https://t.me/nz_cvds","_blank"),children:" nz_cvds"})]})})})}});export{sn as Route};