window.__ModuleLoader__.load({id:"dsh-interior-studio",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var rf=Object.create;var no=Object.defineProperty;var of=Object.getOwnPropertyDescriptor;var af=Object.getOwnPropertyNames;var lf=Object.getPrototypeOf,cf=Object.prototype.hasOwnProperty;var hf=(i,e)=>{for(var t in e)no(i,t,{get:e[t],enumerable:!0})},xh=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of af(e))!cf.call(i,s)&&s!==t&&no(i,s,{get:()=>e[s],enumerable:!(n=of(e,s))||n.enumerable});return i};var nl=(i,e,t)=>(t=i!=null?rf(lf(i)):{},xh(e||!i||!i.__esModule?no(t,"default",{value:i,enumerable:!0}):t,i)),uf=i=>xh(no({},"__esModule",{value:!0}),i);var Dx={};hf(Dx,{apply:()=>Lx,inject:()=>Tx});module.exports=uf(Dx);var g=nl(require("react"),1);var Ti={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},iu=0,Hl=1,su=2;var Gl=1,ru=2,Xn=3,In=0,Qt=1,xn=2,hi=0,zi=1,Wl=2,Xl=3,ql=4,ou=5,Mi=100,au=101,lu=102,cu=103,hu=104,uu=200,du=201,fu=202,pu=203,Io=204,Ro=205,mu=206,gu=207,_u=208,xu=209,yu=210,vu=211,bu=212,Mu=213,Su=214,jo=0,$o=1,Zo=2,Vi=3,Ko=4,Jo=5,Qo=6,ea=7,Yl=0,wu=1,Tu=2,ui=0,Eu=1,Au=2,Cu=3,Iu=4,Ru=5,Pu=6,Lu=7,Rl="attached",Du="detached",jl=300,Zi=301,Ki=302,ta=303,na=304,Hr=306,Si=1e3,On=1001,ws=1002,kt=1003,ia=1004;var Ji=1005;var Zt=1006,zs=1007;var Dn=1008;var Nn=1009,$l=1010,Zl=1011,Vs=1012,sa=1013,Ai=1014,yn=1015,Hs=1016,ra=1017,oa=1018,Gs=1020,Kl=35902,Jl=35899,Ql=1021,ec=1022,fn=1023,Ts=1026,Ws=1027,aa=1028,la=1029,tc=1030,ca=1031;var ha=1033,Gr=33776,Wr=33777,Xr=33778,qr=33779,ua=35840,da=35841,fa=35842,pa=35843,ma=36196,ga=37492,_a=37496,xa=37808,ya=37809,va=37810,ba=37811,Ma=37812,Sa=37813,wa=37814,Ta=37815,Ea=37816,Aa=37817,Ca=37818,Ia=37819,Ra=37820,Pa=37821,La=36492,Da=36494,Na=36495,Ua=36283,Oa=36284,Fa=36285,Ba=36286;var Hi=2300,Gi=2301,Co=2302,Pl=2400,Ll=2401,Dl=2402,Nu=2500;var nc=0,Yr=1,Xs=2,Uu=3200,Ou=3201;var ic=0,Fu=1,di="",It="srgb",zt="srgb-linear",pr="linear",yt="srgb";var ki=7680;var Nl=519,Bu=512,ku=513,zu=514,sc=515,Vu=516,Hu=517,Gu=518,Wu=519,Po=35044;var rc="300 es",En=2e3,mr=2001;var Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yh=1234567,dr=Math.PI/180,Wi=180/Math.PI;function Cn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function oc(i,e){return(i%e+e)%e}function df(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ff(i,e,t){return i!==e?(t-i)/(e-i):0}function fr(i,e,t){return(1-t)*i+t*e}function pf(i,e,t,n){return fr(i,e,1-Math.exp(-t*n))}function mf(i,e=1){return e-Math.abs(oc(i,e*2)-e)}function gf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function _f(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function xf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function yf(i,e){return i+Math.random()*(e-i)}function vf(i){return i*(.5-Math.random())}function bf(i){i!==void 0&&(yh=i);let e=yh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mf(i){return i*dr}function Sf(i){return i*Wi}function wf(i){return(i&i-1)===0&&i!==0}function Tf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ef(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Af(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),_=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*_,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*_,a*l);break;case"ZYZ":i.set(c*_,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var jr={DEG2RAD:dr,RAD2DEG:Wi,generateUUID:Cn,clamp:rt,euclideanModulo:oc,mapLinear:df,inverseLerp:ff,lerp:fr,damp:pf,pingpong:mf,smoothstep:gf,smootherstep:_f,randInt:xf,randFloat:yf,randFloatSpread:vf,seededRandom:bf,degToRad:Mf,radToDeg:Sf,isPowerOfTwo:wf,ceilPowerOfTwo:Tf,floorPowerOfTwo:Ef,setQuaternionFromProperEuler:Af,normalize:xt,denormalize:Tn},Ge=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],_=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=x;return}if(u!==x||c!==f||l!==d||h!==_){let m=1-a,p=c*f+l*d+h*_+u*x,T=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){let A=Math.sqrt(w),C=Math.atan2(A,p*T);m=Math.sin(m*C)/A,a=Math.sin(a*C)/A}let y=a*T;if(c=c*m+f*y,l=l*m+d*y,h=h*m+_*y,u=u*m+x*y,m===1-a){let A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],_=r[o+3];return e[t]=a*_+h*u+c*d-l*f,e[t+1]=c*_+h*f+l*u-a*d,e[t+2]=l*_+h*d+a*f-c*u,e[t+3]=h*_-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"YXZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"ZXY":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"ZYX":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"YZX":this._x=f*h*u+l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u-f*d*_;break;case"XZY":this._x=f*h*u-l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return il.copy(this).projectOnVector(e),this.sub(il)}reflect(e){return this.sub(il.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},il=new O,vh=new Kt,Qe=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],_=n[8],x=s[0],m=s[3],p=s[6],T=s[1],w=s[4],y=s[7],A=s[2],C=s[5],E=s[8];return r[0]=o*x+a*T+c*A,r[3]=o*m+a*w+c*C,r[6]=o*p+a*y+c*E,r[1]=l*x+h*T+u*A,r[4]=l*m+h*w+u*C,r[7]=l*p+h*y+u*E,r[2]=f*x+d*T+_*A,r[5]=f*m+d*w+_*C,r[8]=f*p+d*y+_*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,_=t*u+n*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(sl.makeScale(e,t)),this}rotate(e){return this.premultiply(sl.makeRotation(-e)),this}translate(e,t){return this.premultiply(sl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},sl=new Qe;function ac(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xu(){let i=Es("canvas");return i.style.display="block",i}var bh={};function As(i){i in bh||(bh[i]=!0,console.warn(i))}function qu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Mh=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sh=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cf(){let i={enabled:!0,workingColorSpace:zt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===yt&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return As("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return As("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[zt]:{primaries:e,whitePoint:n,transfer:pr,toXYZ:Mh,fromXYZ:Sh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:Mh,fromXYZ:Sh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),i}var ht=Cf();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var cs,Lo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{cs===void 0&&(cs=Es("canvas")),cs.width=e.width,cs.height=e.height;let s=cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Es("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},If=0,Cs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(rl(s[o].image)):r.push(rl(s[o]))}else r=rl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function rl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Rf=0,ol=new O,Ft=class i extends Bn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=On,s=On,r=Zt,o=Dn,a=fn,c=Nn,l=i.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Cn(),this.name="",this.source=new Cs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ol).x}get height(){return this.source.getSize(ol).y}get depth(){return this.source.getSize(ol).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Si:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case ws:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Si:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case ws:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=jl;Ft.DEFAULT_ANISOTROPY=1;var dt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],_=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,y=(d+1)/2,A=(p+1)/2,C=(h+f)/4,E=(u+x)/4,L=(_+m)/4;return w>y&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=C/n,r=E/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=C/s,r=L/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=E/r,s=L/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-_)*(m-_)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(m-_)/T,this.y=(u-x)/T,this.z=(f-h)/T,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Do=class extends Bn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Ft(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},kn=class extends Do{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},gr=class extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var No=class extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Jt=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),io.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(e.matrixWorld),this.union(io)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),so.subVectors(this.max,sr),hs.subVectors(e.a,sr),us.subVectors(e.b,sr),ds.subVectors(e.c,sr),mi.subVectors(us,hs),gi.subVectors(ds,us),Ui.subVectors(hs,ds);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ui.z,Ui.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ui.z,0,-Ui.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ui.y,Ui.x,0];return!al(t,hs,us,ds,so)||(t=[1,0,0,0,1,0,0,0,1],!al(t,hs,us,ds,so))?!1:(ro.crossVectors(mi,gi),t=[ro.x,ro.y,ro.z],al(t,hs,us,ds,so))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new O,new O,new O,new O,new O,new O,new O,new O],Mn=new O,io=new Jt,hs=new O,us=new O,ds=new O,mi=new O,gi=new O,Ui=new O,sr=new O,so=new O,ro=new O,Oi=new O;function al(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Oi.fromArray(i,r);let a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Pf=new Jt,rr=new O,ll=new O,sn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);let t=rr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(rr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ll.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(ll)),this.expandByPoint(rr.copy(e.center).sub(ll))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ei=new O,cl=new O,oo=new O,_i=new O,hl=new O,ao=new O,ul=new O,zn=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){cl.copy(e).add(t).multiplyScalar(.5),oo.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(cl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(oo),a=_i.dot(this.direction),c=-_i.dot(oo),l=_i.lengthSq(),h=Math.abs(1-o*o),u,f,d,_;if(h>0)if(u=o*c-a,f=o*a-c,_=r*h,u>=0)if(f>=-_)if(f<=_){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-_?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=_?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(cl).addScaledVector(oo,f),d}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,s,r){hl.subVectors(t,e),ao.subVectors(n,e),ul.crossVectors(hl,ao);let o=this.direction.dot(ul),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_i.subVectors(this.origin,e);let c=a*this.direction.dot(ao.crossVectors(_i,ao));if(c<0)return null;let l=a*this.direction.dot(hl.cross(_i));if(l<0||c+l>o)return null;let h=-a*_i.dot(ul);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Je=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,f,d,_,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,d,_,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,f,d,_,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=_,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/fs.setFromMatrixColumn(e,0).length(),r=1/fs.setFromMatrixColumn(e,1).length(),o=1/fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,_=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+_*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=_+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,_=l*h,x=l*u;t[0]=f+x*a,t[4]=_*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-_,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,_=l*h,x=l*u;t[0]=f-x*a,t[4]=-o*u,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,d=o*u,_=a*h,x=a*u;t[0]=c*h,t[4]=_*l-d,t[8]=f*l+x,t[1]=c*u,t[5]=x*l+f,t[9]=d*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,_=a*c,x=a*l;t[0]=c*h,t[4]=x-f*u,t[8]=_*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+_,t[10]=f-x*u}else if(e.order==="XZY"){let f=o*c,d=o*l,_=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+x,t[5]=o*h,t[9]=d*u-_,t[2]=_*u-d,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lf,e,Df)}lookAt(e,t,n){let s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),xi.crossVectors(n,cn),xi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),xi.crossVectors(n,cn)),xi.normalize(),lo.crossVectors(cn,xi),s[0]=xi.x,s[4]=lo.x,s[8]=cn.x,s[1]=xi.y,s[5]=lo.y,s[9]=cn.y,s[2]=xi.z,s[6]=lo.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],_=n[2],x=n[6],m=n[10],p=n[14],T=n[3],w=n[7],y=n[11],A=n[15],C=s[0],E=s[4],L=s[8],S=s[12],b=s[1],D=s[5],z=s[9],W=s[13],Y=s[2],K=s[6],j=s[10],$=s[14],V=s[3],ie=s[7],re=s[11],ye=s[15];return r[0]=o*C+a*b+c*Y+l*V,r[4]=o*E+a*D+c*K+l*ie,r[8]=o*L+a*z+c*j+l*re,r[12]=o*S+a*W+c*$+l*ye,r[1]=h*C+u*b+f*Y+d*V,r[5]=h*E+u*D+f*K+d*ie,r[9]=h*L+u*z+f*j+d*re,r[13]=h*S+u*W+f*$+d*ye,r[2]=_*C+x*b+m*Y+p*V,r[6]=_*E+x*D+m*K+p*ie,r[10]=_*L+x*z+m*j+p*re,r[14]=_*S+x*W+m*$+p*ye,r[3]=T*C+w*b+y*Y+A*V,r[7]=T*E+w*D+y*K+A*ie,r[11]=T*L+w*z+y*j+A*re,r[15]=T*S+w*W+y*$+A*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],_=e[3],x=e[7],m=e[11],p=e[15];return _*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+t*c*d-t*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+t*l*u-t*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],_=e[12],x=e[13],m=e[14],p=e[15],T=u*m*l-x*f*l+x*c*d-a*m*d-u*c*p+a*f*p,w=_*f*l-h*m*l-_*c*d+o*m*d+h*c*p-o*f*p,y=h*x*l-_*u*l+_*a*d-o*x*d-h*a*p+o*u*p,A=_*u*c-h*x*c-_*a*f+o*x*f+h*a*m-o*u*m,C=t*T+n*w+s*y+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/C;return e[0]=T*E,e[1]=(x*f*r-u*m*r-x*s*d+n*m*d+u*s*p-n*f*p)*E,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*E,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*E,e[4]=w*E,e[5]=(h*m*r-_*f*r+_*s*d-t*m*d-h*s*p+t*f*p)*E,e[6]=(_*c*r-o*m*r-_*s*l+t*m*l+o*s*p-t*c*p)*E,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*d+t*c*d)*E,e[8]=y*E,e[9]=(_*u*r-h*x*r-_*n*d+t*x*d+h*n*p-t*u*p)*E,e[10]=(o*x*r-_*a*r+_*n*l-t*x*l-o*n*p+t*a*p)*E,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*d-t*a*d)*E,e[12]=A*E,e[13]=(h*x*s-_*u*s+_*n*f-t*x*f-h*n*m+t*u*m)*E,e[14]=(_*a*s-o*x*s-_*n*c+t*x*c+o*n*m-t*a*m)*E,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*E,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,_=r*u,x=o*h,m=o*u,p=a*u,T=c*l,w=c*h,y=c*u,A=n.x,C=n.y,E=n.z;return s[0]=(1-(x+p))*A,s[1]=(d+y)*A,s[2]=(_-w)*A,s[3]=0,s[4]=(d-y)*C,s[5]=(1-(f+p))*C,s[6]=(m+T)*C,s[7]=0,s[8]=(_+w)*E,s[9]=(m-T)*E,s[10]=(1-(f+x))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=fs.set(s[0],s[1],s[2]).length(),o=fs.set(s[4],s[5],s[6]).length(),a=fs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Sn.copy(this);let l=1/r,h=1/o,u=1/a;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,t.setFromRotationMatrix(Sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=En,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),_,x;if(c)_=r/(o-r),x=o*r/(o-r);else if(a===En)_=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===mr)_=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=En,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),_,x;if(c)_=1/(o-r),x=o/(o-r);else if(a===En)_=-2/(o-r),x=-(o+r)/(o-r);else if(a===mr)_=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fs=new O,Sn=new Je,Lf=new O(0,0,0),Df=new O(1,1,1),xi=new O,lo=new O,cn=new O,wh=new Je,Th=new Kt,Rn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Th.setFromEuler(this),this.setFromQuaternion(Th,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Rn.DEFAULT_ORDER="XYZ";var Is=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Nf=0,Eh=new O,ps=new Kt,ti=new Je,co=new O,or=new O,Uf=new O,Of=new Kt,Ah=new O(1,0,0),Ch=new O(0,1,0),Ih=new O(0,0,1),Rh={type:"added"},Ff={type:"removed"},ms={type:"childadded",child:null},dl={type:"childremoved",child:null},Tt=class i extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new Rn,n=new Kt,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Je},normalMatrix:{value:new Qe}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Is,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.multiply(ps),this}rotateOnWorldAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.premultiply(ps),this}rotateX(e){return this.rotateOnAxis(Ah,e)}rotateY(e){return this.rotateOnAxis(Ch,e)}rotateZ(e){return this.rotateOnAxis(Ih,e)}translateOnAxis(e,t){return Eh.copy(e).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ah,e)}translateY(e){return this.translateOnAxis(Ch,e)}translateZ(e){return this.translateOnAxis(Ih,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(or,co,this.up):ti.lookAt(co,or,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),ps.setFromRotationMatrix(ti),this.quaternion.premultiply(ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rh),ms.child=e,this.dispatchEvent(ms),ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ff),dl.child=e,this.dispatchEvent(dl),dl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rh),ms.child=e,this.dispatchEvent(ms),ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,Uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,Of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Tt.DEFAULT_UP=new O(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=new O,ni=new O,fl=new O,ii=new O,gs=new O,_s=new O,Ph=new O,pl=new O,ml=new O,gl=new O,_l=new dt,xl=new dt,yl=new dt,bi=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),ni.subVectors(n,t),fl.subVectors(e,t);let o=wn.dot(wn),a=wn.dot(ni),c=wn.dot(fl),l=ni.dot(ni),h=ni.dot(fl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,_=(o*h-a*c)*f;return r.set(1-d-_,_,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ii.x),c.addScaledVector(o,ii.y),c.addScaledVector(a,ii.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return _l.setScalar(0),xl.setScalar(0),yl.setScalar(0),_l.fromBufferAttribute(e,t),xl.fromBufferAttribute(e,n),yl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(_l,r.x),o.addScaledVector(xl,r.y),o.addScaledVector(yl,r.z),o}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),ni.subVectors(e,t),wn.cross(ni).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),wn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;gs.subVectors(s,n),_s.subVectors(r,n),pl.subVectors(e,n);let c=gs.dot(pl),l=_s.dot(pl);if(c<=0&&l<=0)return t.copy(n);ml.subVectors(e,s);let h=gs.dot(ml),u=_s.dot(ml);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(gs,o);gl.subVectors(e,r);let d=gs.dot(gl),_=_s.dot(gl);if(_>=0&&d<=_)return t.copy(r);let x=d*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(_s,a);let m=h*_-d*u;if(m<=0&&u-h>=0&&d-_>=0)return Ph.subVectors(r,s),a=(u-h)/(u-h+(d-_)),t.copy(s).addScaledVector(Ph,a);let p=1/(m+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(gs,o).addScaledVector(_s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},ho={h:0,s:0,l:0};function vl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ht.workingColorSpace){if(e=oc(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=vl(o,r,e+1/3),this.g=vl(o,r,e),this.b=vl(o,r,e-1/3)}return ht.colorSpaceToWorking(this,s),this}setStyle(e,t=It){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){let n=Yu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return ht.workingToColorSpace(Wt.copy(this),e),Math.round(rt(Wt.r*255,0,255))*65536+Math.round(rt(Wt.g*255,0,255))*256+Math.round(rt(Wt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(Wt.copy(this),t);let n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=It){ht.workingToColorSpace(Wt.copy(this),e);let t=Wt.r,n=Wt.g,s=Wt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(ho);let n=fr(yi.h,ho.h,t),s=fr(yi.s,ho.s,t),r=fr(yi.l,ho.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wt=new Ye;Ye.NAMES=Yu;var Bf=0,rn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=zi,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Ro,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Ro&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Pn=class extends rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Rt=new O,uo=new Ge,kf=0,Lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Po,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uo.fromBufferAttribute(this,t),uo.applyMatrix3(e),this.setXY(t,uo.x,uo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Po&&(e.usage=this.usage),e}};var _r=class extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var xr=class extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var un=class extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}},zf=0,gn=new Je,bl=new Tt,xs=new O,hn=new Jt,ar=new Jt,Ot=new O,dn=class i extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ac(e)?xr:_r)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return bl.lookAt(e),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new un(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(hn.min,ar.min),hn.expandByPoint(Ot),Ot.addVectors(hn.max,ar.max),hn.expandByPoint(Ot)):(hn.expandByPoint(ar.min),hn.expandByPoint(ar.max))}hn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ot.fromBufferAttribute(a,l),c&&(xs.fromBufferAttribute(e,l),Ot.add(xs)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new O,c[L]=new O;let l=new O,h=new O,u=new O,f=new Ge,d=new Ge,_=new Ge,x=new O,m=new O;function p(L,S,b){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,S),_.fromBufferAttribute(r,b),h.sub(l),u.sub(l),d.sub(f),_.sub(f);let D=1/(d.x*_.y-_.x*d.y);isFinite(D)&&(x.copy(h).multiplyScalar(_.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-_.x).multiplyScalar(D),a[L].add(x),a[S].add(x),a[b].add(x),c[L].add(m),c[S].add(m),c[b].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let L=0,S=T.length;L<S;++L){let b=T[L],D=b.start,z=b.count;for(let W=D,Y=D+z;W<Y;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}let w=new O,y=new O,A=new O,C=new O;function E(L){A.fromBufferAttribute(s,L),C.copy(A);let S=a[L];w.copy(S),w.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(C,S);let D=y.dot(c[L])<0?-1:1;o.setXYZW(L,w.x,w.y,w.z,D)}for(let L=0,S=T.length;L<S;++L){let b=T[L],D=b.start,z=b.count;for(let W=D,Y=D+z;W<Y;W+=3)E(e.getX(W+0)),E(e.getX(W+1)),E(e.getX(W+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let f=0,d=e.count;f<d;f+=3){let _=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,_=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let p=0;p<h;p++)f[_++]=l[d++]}return new Lt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lh=new Je,Fi=new zn,fo=new sn,Dh=new O,po=new O,mo=new O,go=new O,Ml=new O,_o=new O,Nh=new O,xo=new O,Vt=class extends Tt{constructor(e=new dn,t=new Pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){_o.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Ml.fromBufferAttribute(u,e),o?_o.addScaledVector(Ml,h):_o.addScaledVector(Ml.sub(t),h))}t.add(_o)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(fo.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(fo,Dh)===null||Fi.origin.distanceToSquared(Dh)>(e.far-e.near)**2))&&(Lh.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Lh),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){let m=f[_],p=o[m.materialIndex],T=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=T,A=w;y<A;y+=3){let C=a.getX(y),E=a.getX(y+1),L=a.getX(y+2);s=yo(this,p,e,n,l,h,u,C,E,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=_,p=x;m<p;m+=3){let T=a.getX(m),w=a.getX(m+1),y=a.getX(m+2);s=yo(this,o,e,n,l,h,u,T,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){let m=f[_],p=o[m.materialIndex],T=Math.max(m.start,d.start),w=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=T,A=w;y<A;y+=3){let C=y,E=y+1,L=y+2;s=yo(this,p,e,n,l,h,u,C,E,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=_,p=x;m<p;m+=3){let T=m,w=m+1,y=m+2;s=yo(this,o,e,n,l,h,u,T,w,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Vf(i,e,t,n,s,r,o,a){let c;if(e.side===Qt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===In,a),c===null)return null;xo.copy(a),xo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(xo);return l<t.near||l>t.far?null:{distance:l,point:xo.clone(),object:i}}function yo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,po),i.getVertexPosition(c,mo),i.getVertexPosition(l,go);let h=Vf(i,e,t,n,po,mo,go,Nh);if(h){let u=new O;bi.getBarycoord(Nh,po,mo,go,u),s&&(h.uv=bi.getInterpolatedAttribute(s,a,c,l,u,new Ge)),r&&(h.uv1=bi.getInterpolatedAttribute(r,a,c,l,u,new Ge)),o&&(h.normal=bi.getInterpolatedAttribute(o,a,c,l,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new O,materialIndex:0};bi.getNormal(po,mo,go,f.normal),h.face=f,h.barycoord=u}return h}var Rs=class i extends dn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new un(l,3)),this.setAttribute("normal",new un(h,3)),this.setAttribute("uv",new un(u,2));function _(x,m,p,T,w,y,A,C,E,L,S){let b=y/E,D=A/L,z=y/2,W=A/2,Y=C/2,K=E+1,j=L+1,$=0,V=0,ie=new O;for(let re=0;re<j;re++){let ye=re*D-W;for(let Le=0;Le<K;Le++){let tt=Le*b-z;ie[x]=tt*T,ie[m]=ye*w,ie[p]=Y,l.push(ie.x,ie.y,ie.z),ie[x]=0,ie[m]=0,ie[p]=C>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(Le/E),u.push(1-re/L),$+=1}}for(let re=0;re<L;re++)for(let ye=0;ye<E;ye++){let Le=f+ye+K*re,tt=f+ye+K*(re+1),ot=f+(ye+1)+K*(re+1),se=f+(ye+1)+K*re;c.push(Le,tt,se),c.push(tt,ot,se),V+=6}a.addGroup(d,V,S),d+=V,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Qi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Xt(i){let e={};for(let t=0;t<i.length;t++){let n=Qi(i[t]);for(let s in n)e[s]=n[s]}return e}function Hf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function lc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}var ju={clone:Qi,merge:Xt},Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ln=class extends rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=Hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},yr=class extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},vi=new O,Uh=new Ge,Oh=new Ge,Pt=class extends yr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Wi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wi*2*Math.atan(Math.tan(dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Uh,Oh),t.subVectors(Oh,Uh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(dr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ys=-90,vs=1,Uo=class extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pt(ys,vs,e,t);s.layers=this.layers,this.add(s);let r=new Pt(ys,vs,e,t);r.layers=this.layers,this.add(r);let o=new Pt(ys,vs,e,t);o.layers=this.layers,this.add(o);let a=new Pt(ys,vs,e,t);a.layers=this.layers,this.add(a);let c=new Pt(ys,vs,e,t);c.layers=this.layers,this.add(c);let l=new Pt(ys,vs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},vr=class extends Ft{constructor(e=[],t=Zi,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Oo=class extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rs(5,5,5),r=new Ln({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:hi});r.uniforms.tEquirect.value=t;let o=new Vt(s,r),a=t.minFilter;return t.minFilter===Dn&&(t.minFilter=Zt),new Uo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},An=class extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xf={type:"move"},Ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new An;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var br=class extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ls=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Po,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},$t=new O,Ds=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Fh=new O,Bh=new dt,kh=new dt,qf=new O,zh=new Je,vo=new O,Sl=new sn,Vh=new Je,wl=new zn,Mr=class extends Vt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Rl,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,vo),this.boundingBox.expandByPoint(vo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new sn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,vo),this.boundingSphere.expandByPoint(vo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sl.copy(this.boundingSphere),Sl.applyMatrix4(s),e.ray.intersectsSphere(Sl)!==!1&&(Vh.copy(s).invert(),wl.copy(e.ray).applyMatrix4(Vh),!(this.boundingBox!==null&&wl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,wl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Rl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Du?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Bh.fromBufferAttribute(s.attributes.skinIndex,e),kh.fromBufferAttribute(s.attributes.skinWeight,e),Fh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=kh.getComponent(r);if(o!==0){let a=Bh.getComponent(r);zh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(qf.copy(Fh).applyMatrix4(zh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ns=class extends Tt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Sr=class extends Ft{constructor(e=null,t=1,n=1,s,r,o,a,c,l=kt,h=kt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Hh=new Je,Yf=new Je,wr=class i{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Je;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Yf;Hh.multiplyMatrices(a,t[r]),Hh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Sr(t,e,e,fn,yn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ns),this.bones.push(o),this.boneInverses.push(new Je().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},wi=class extends Lt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},bs=new Je,Gh=new Je,bo=[],Wh=new Jt,jf=new Je,lr=new Vt,cr=new sn,Tr=class extends Vt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),Wh.copy(e.boundingBox).applyMatrix4(bs),this.boundingBox.union(Wh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),cr.copy(e.boundingSphere).applyMatrix4(bs),this.boundingSphere.union(cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(n),e.ray.intersectsSphere(cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,bs),Gh.multiplyMatrices(n,bs),lr.matrixWorld=Gh,lr.raycast(e,bo);for(let o=0,a=bo.length;o<a;o++){let c=bo[o];c.instanceId=r,c.object=this,t.push(c)}bo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Sr(new Float32Array(s*this.count),s,this.count,aa,yn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Tl=new O,$f=new O,Zf=new Qe,_n=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Tl.subVectors(n,t).cross($f.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Tl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zf.getNormalMatrix(e),s=this.coplanarPoint(Tl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new sn,Kf=new Ge(.5,.5),Mo=new O,Us=class{constructor(e=new _n,t=new _n,n=new _n,s=new _n,r=new _n,o=new _n){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],_=r[8],x=r[9],m=r[10],p=r[11],T=r[12],w=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-o,d-h,p-_,A-T).normalize(),s[1].setComponents(l+o,d+h,p+_,A+T).normalize(),s[2].setComponents(l+a,d+u,p+x,A+w).normalize(),s[3].setComponents(l-a,d-u,p-x,A-w).normalize(),n)s[4].setComponents(c,f,m,y).normalize(),s[5].setComponents(l-c,d-f,p-m,A-y).normalize();else if(s[4].setComponents(l-c,d-f,p-m,A-y).normalize(),t===En)s[5].setComponents(l+c,d+f,p+m,A+y).normalize();else if(t===mr)s[5].setComponents(c,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=Kf.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Mo.x=s.normal.x>0?e.max.x:e.min.x,Mo.y=s.normal.y>0?e.max.y:e.min.y,Mo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Os=class extends rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Fo=new O,Bo=new O,Xh=new Je,hr=new zn,So=new sn,El=new O,qh=new O,Xi=class extends Tt{constructor(e=new dn,t=new Os){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Fo.fromBufferAttribute(t,s-1),Bo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Fo.distanceTo(Bo);e.setAttribute("lineDistance",new un(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),So.radius+=r,e.ray.intersectsSphere(So)===!1)return;Xh.copy(s).invert(),hr.copy(e.ray).applyMatrix4(Xh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let x=d,m=_-1;x<m;x+=l){let p=h.getX(x),T=h.getX(x+1),w=wo(this,e,hr,c,p,T,x);w&&t.push(w)}if(this.isLineLoop){let x=h.getX(_-1),m=h.getX(d),p=wo(this,e,hr,c,x,m,_-1);p&&t.push(p)}}else{let d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let x=d,m=_-1;x<m;x+=l){let p=wo(this,e,hr,c,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=wo(this,e,hr,c,_-1,d,_-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function wo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Fo.fromBufferAttribute(a,s),Bo.fromBufferAttribute(a,r),t.distanceSqToSegment(Fo,Bo,El,qh)>n)return;El.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(El);if(!(l<e.near||l>e.far))return{distance:l,point:qh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Yh=new O,jh=new O,Er=class extends Xi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Yh.fromBufferAttribute(t,s),jh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yh.distanceTo(jh);e.setAttribute("lineDistance",new un(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ar=class extends Xi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Fs=class extends rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$h=new Je,Ul=new zn,To=new sn,Eo=new O,Cr=class extends Tt{constructor(e=new dn,t=new Fs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(s),To.radius+=r,e.ray.intersectsSphere(To)===!1)return;$h.copy(s).invert(),Ul.copy(e.ray).applyMatrix4($h);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let _=f,x=d;_<x;_++){let m=l.getX(_);Eo.fromBufferAttribute(u,m),Zh(Eo,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let _=f,x=d;_<x;_++)Eo.fromBufferAttribute(u,_),Zh(Eo,_,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Zh(i,e,t,n,s,r,o){let a=Ul.distanceSqToPoint(i);if(a<t){let c=new O;Ul.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ir=class extends Ft{constructor(e,t,n=Ai,s,r,o,a=kt,c=kt,l,h=Ts,u=1){if(h!==Ts&&h!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Rr=class extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Pr=class i extends dn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,d=[],_=[],x=[],m=[];for(let p=0;p<h;p++){let T=p*f-o;for(let w=0;w<l;w++){let y=w*u-r;_.push(y,-T,0),x.push(0,0,1),m.push(w/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<a;T++){let w=T+l*p,y=T+l*(p+1),A=T+1+l*(p+1),C=T+1+l*p;d.push(w,y,C),d.push(y,A,C)}this.setIndex(d),this.setAttribute("position",new un(_,3)),this.setAttribute("normal",new un(x,3)),this.setAttribute("uv",new un(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var qi=class extends rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},on=class extends qi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ko=class extends rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},zo=class extends rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Jf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Qf(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Kh(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function $u(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var oi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Vo=class extends oi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pl,endingEnd:Pl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ll:r=e,a=2*t-n;break;case Dl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ll:o=e,c=2*n-t;break;case Dl:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,_=(n-t)/(s-t),x=_*_,m=x*_,p=-f*m+2*f*x-f*_,T=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*_+1,w=(-1-d)*m+(1.5+d)*x+.5*_,y=d*m-d*x;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+T*o[l+A]+w*o[c+A]+y*o[u+A];return r}},Ho=class extends oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Go=class extends oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},an=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Hi:t=this.InterpolantFactoryMethodDiscrete;break;case Gi:t=this.InterpolantFactoryMethodLinear;break;case Co:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hi;case this.InterpolantFactoryMethodLinear:return Gi;case this.InterpolantFactoryMethodSmooth:return Co}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Jf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Co,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let _=0;_!==n;++_){let x=t[u+_];if(x!==t[f+_]||x!==t[d+_]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};an.prototype.ValueTypeName="";an.prototype.TimeBufferType=Float32Array;an.prototype.ValueBufferType=Float32Array;an.prototype.DefaultInterpolation=Gi;var ai=class extends an{constructor(e,t,n){super(e,t,n)}};ai.prototype.ValueTypeName="bool";ai.prototype.ValueBufferType=Array;ai.prototype.DefaultInterpolation=Hi;ai.prototype.InterpolantFactoryMethodLinear=void 0;ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Lr=class extends an{constructor(e,t,n,s){super(e,t,n,s)}};Lr.prototype.ValueTypeName="color";var Vn=class extends an{constructor(e,t,n,s){super(e,t,n,s)}};Vn.prototype.ValueTypeName="number";var Wo=class extends oi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Kt.slerpFlat(r,0,o,l-a,o,l,c);return r}},Hn=class extends an{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Wo(this.times,this.values,this.getValueSize(),e)}};Hn.prototype.ValueTypeName="quaternion";Hn.prototype.InterpolantFactoryMethodSmooth=void 0;var li=class extends an{constructor(e,t,n){super(e,t,n)}};li.prototype.ValueTypeName="string";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=Hi;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;var Gn=class extends an{constructor(e,t,n,s){super(e,t,n,s)}};Gn.prototype.ValueTypeName="vector";var Dr=class{constructor(e="",t=-1,n=[],s=Nu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(tp(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(an.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=Qf(c);c=Kh(c,1,h),l=Kh(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Vn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,_,x){if(d.length!==0){let m=[],p=[];$u(d,m,p,_),m.length!==0&&x.push(new u(f,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},_;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let x=0;x<f[_].morphTargets.length;x++)d[f[_].morphTargets[x]]=-1;for(let x in d){let m=[],p=[];for(let T=0;T!==f[_].morphTargets.length;++T){let w=f[_];m.push(w.time),p.push(w.morphTarget===x?1:0)}s.push(new Vn(".morphTargetInfluence["+x+"]",m,p))}c=d.length*o}else{let d=".bones["+t[u].name+"]";n(Gn,d+".position",f,"pos",s),n(Hn,d+".quaternion",f,"rot",s),n(Gn,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function ep(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vn;case"vector":case"vector2":case"vector3":case"vector4":return Gn;case"color":return Lr;case"quaternion":return Hn;case"bool":case"boolean":return ai;case"string":return li}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function tp(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ep(i.type);if(i.times===void 0){let t=[],n=[];$u(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Fn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Xo=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],_=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Zu=new Xo,Wn=class{constructor(e){this.manager=e!==void 0?e:Zu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wn.DEFAULT_MATERIAL_NAME="__DEFAULT";var si={},Ol=class extends Error{constructor(e,t){super(e),this.response=t}},Bs=class extends Wn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Fn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(si[e]!==void 0){si[e].push({onLoad:t,onProgress:n,onError:s});return}si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=si[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,_=d!==0,x=0,m=new ReadableStream({start(p){T();function T(){u.read().then(({done:w,value:y})=>{if(w)p.close();else{x+=y.byteLength;let A=new ProgressEvent("progress",{lengthComputable:_,loaded:x,total:d});for(let C=0,E=h.length;C<E;C++){let L=h[C];L.onProgress&&L.onProgress(A)}p.enqueue(y),T()}},w=>{p.error(w)})}}});return new Response(m)}else throw new Ol(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(_=>d.decode(_))}}}).then(l=>{Fn.add(`file:${e}`,l);let h=si[e];delete si[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),l;delete si[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ms=new WeakMap,qo=class extends Wn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Ms.get(o);u===void 0&&(u=[],Ms.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Es("img");function c(){h(),t&&t(this);let u=Ms.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}Ms.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Fn.remove(`image:${e}`);let f=Ms.get(this)||[];for(let d=0;d<f.length;d++){let _=f[d];_.onError&&_.onError(u)}Ms.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Fn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Nr=class extends Wn{constructor(e){super(e)}load(e,t,n,s){let r=new Ft,o=new qo(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Yi=class extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ur=class extends Yi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Al=new Je,Jh=new O,Qh=new O,Or=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Us,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Jh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jh),Qh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qh),t.updateMatrixWorld(),Al.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Al)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fl=class extends Or{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Wi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Fr=class extends Yi{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Fl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},eu=new Je,ur=new O,Cl=new O,Bl=class extends Or{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ge(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(e.matrixWorld),n.position.copy(ur),Cl.copy(n.position),Cl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Cl),n.updateMatrixWorld(),s.makeTranslation(-ur.x,-ur.y,-ur.z),eu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eu,n.coordinateSystem,n.reversedDepth)}},Br=class extends Yi{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Bl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ji=class extends yr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},kl=class extends Or{constructor(){super(new ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$i=class extends Yi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new kl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ci=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Il=new WeakMap,kr=class extends Wn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{if(Il.has(o)===!0)s&&s(Il.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Fn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Il.set(c,l),Fn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Fn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Yo=class extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var cc="\\[\\]\\.:\\/",np=new RegExp("["+cc+"]","g"),hc="[^"+cc+"]",ip="[^"+cc.replace("\\.","")+"]",sp=/((?:WC+[\/:])*)/.source.replace("WC",hc),rp=/(WCOD+)?/.source.replace("WCOD",ip),op=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc),ap=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc),lp=new RegExp("^"+sp+rp+op+ap+"$"),cp=["material","materials","bones","map"],zl=class{constructor(e,t,n){let s=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(np,"")}static parseTrackName(e){let t=lp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);cp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Mt.Composite=zl;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ux=new Float32Array(1);var tu=new Je,zr=class{constructor(e,t,n=0,s=1/0){this.ray=new zn(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Is,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tu),this}intersectObject(e,t=!0,n=[]){return Vl(e,this,n,t),n.sort(nu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Vl(e[s],this,n,t);return n.sort(nu),n}};function nu(i,e){return i.distance-e.distance}function Vl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Vl(r[o],e,t,!0)}}var ks=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Vr=class extends Bn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function uc(i,e,t,n){let s=hp(n);switch(t){case Ql:return i*e;case aa:return i*e/s.components*s.byteLength;case la:return i*e/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case ca:return i*e*2/s.components*s.byteLength;case ec:return i*e*3/s.components*s.byteLength;case fn:return i*e*4/s.components*s.byteLength;case ha:return i*e*4/s.components*s.byteLength;case Gr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xr:case qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case da:case pa:return Math.max(i,16)*Math.max(e,8)/4;case ua:case fa:return Math.max(i,8)*Math.max(e,8)/2;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case va:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ra:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case La:case Da:case Na:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ua:case Oa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Fa:case Ba:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hp(i){switch(i){case Nn:case $l:return{byteLength:1,components:1};case Vs:case Zl:case Hs:return{byteLength:2,components:1};case ra:case oa:return{byteLength:2,components:4};case Ai:case sa:case yn:return{byteLength:4,components:1};case Kl:case Jl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function vd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function dp(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<u.length;d++){let _=u[f],x=u[d];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,_=u.length;d<_;d++){let x=u[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var fp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_p=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ep=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ap=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,em=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,am=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,um=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_m=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ym=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Im=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Um=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,km=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ym=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$m=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Km=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,eg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ng=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ig=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,og=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ag=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_g=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ig=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Pg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ng=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:fp,alphahash_pars_fragment:pp,alphamap_fragment:mp,alphamap_pars_fragment:gp,alphatest_fragment:_p,alphatest_pars_fragment:xp,aomap_fragment:yp,aomap_pars_fragment:vp,batching_pars_vertex:bp,batching_vertex:Mp,begin_vertex:Sp,beginnormal_vertex:wp,bsdfs:Tp,iridescence_fragment:Ep,bumpmap_pars_fragment:Ap,clipping_planes_fragment:Cp,clipping_planes_pars_fragment:Ip,clipping_planes_pars_vertex:Rp,clipping_planes_vertex:Pp,color_fragment:Lp,color_pars_fragment:Dp,color_pars_vertex:Np,color_vertex:Up,common:Op,cube_uv_reflection_fragment:Fp,defaultnormal_vertex:Bp,displacementmap_pars_vertex:kp,displacementmap_vertex:zp,emissivemap_fragment:Vp,emissivemap_pars_fragment:Hp,colorspace_fragment:Gp,colorspace_pars_fragment:Wp,envmap_fragment:Xp,envmap_common_pars_fragment:qp,envmap_pars_fragment:Yp,envmap_pars_vertex:jp,envmap_physical_pars_fragment:rm,envmap_vertex:$p,fog_vertex:Zp,fog_pars_vertex:Kp,fog_fragment:Jp,fog_pars_fragment:Qp,gradientmap_pars_fragment:em,lightmap_pars_fragment:tm,lights_lambert_fragment:nm,lights_lambert_pars_fragment:im,lights_pars_begin:sm,lights_toon_fragment:om,lights_toon_pars_fragment:am,lights_phong_fragment:lm,lights_phong_pars_fragment:cm,lights_physical_fragment:hm,lights_physical_pars_fragment:um,lights_fragment_begin:dm,lights_fragment_maps:fm,lights_fragment_end:pm,logdepthbuf_fragment:mm,logdepthbuf_pars_fragment:gm,logdepthbuf_pars_vertex:_m,logdepthbuf_vertex:xm,map_fragment:ym,map_pars_fragment:vm,map_particle_fragment:bm,map_particle_pars_fragment:Mm,metalnessmap_fragment:Sm,metalnessmap_pars_fragment:wm,morphinstance_vertex:Tm,morphcolor_vertex:Em,morphnormal_vertex:Am,morphtarget_pars_vertex:Cm,morphtarget_vertex:Im,normal_fragment_begin:Rm,normal_fragment_maps:Pm,normal_pars_fragment:Lm,normal_pars_vertex:Dm,normal_vertex:Nm,normalmap_pars_fragment:Um,clearcoat_normal_fragment_begin:Om,clearcoat_normal_fragment_maps:Fm,clearcoat_pars_fragment:Bm,iridescence_pars_fragment:km,opaque_fragment:zm,packing:Vm,premultiplied_alpha_fragment:Hm,project_vertex:Gm,dithering_fragment:Wm,dithering_pars_fragment:Xm,roughnessmap_fragment:qm,roughnessmap_pars_fragment:Ym,shadowmap_pars_fragment:jm,shadowmap_pars_vertex:$m,shadowmap_vertex:Zm,shadowmask_pars_fragment:Km,skinbase_vertex:Jm,skinning_pars_vertex:Qm,skinning_vertex:eg,skinnormal_vertex:tg,specularmap_fragment:ng,specularmap_pars_fragment:ig,tonemapping_fragment:sg,tonemapping_pars_fragment:rg,transmission_fragment:og,transmission_pars_fragment:ag,uv_pars_fragment:lg,uv_pars_vertex:cg,uv_vertex:hg,worldpos_vertex:ug,background_vert:dg,background_frag:fg,backgroundCube_vert:pg,backgroundCube_frag:mg,cube_vert:gg,cube_frag:_g,depth_vert:xg,depth_frag:yg,distanceRGBA_vert:vg,distanceRGBA_frag:bg,equirect_vert:Mg,equirect_frag:Sg,linedashed_vert:wg,linedashed_frag:Tg,meshbasic_vert:Eg,meshbasic_frag:Ag,meshlambert_vert:Cg,meshlambert_frag:Ig,meshmatcap_vert:Rg,meshmatcap_frag:Pg,meshnormal_vert:Lg,meshnormal_frag:Dg,meshphong_vert:Ng,meshphong_frag:Ug,meshphysical_vert:Og,meshphysical_frag:Fg,meshtoon_vert:Bg,meshtoon_frag:kg,points_vert:zg,points_frag:Vg,shadow_vert:Hg,shadow_frag:Gg,sprite_vert:Wg,sprite_frag:Xg},we={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},qn={basic:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ye(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:Xt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:Xt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Ye(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:Xt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:Xt([we.points,we.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:Xt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:Xt([we.common,we.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:Xt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:Xt([we.sprite,we.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:Xt([we.common,we.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:Xt([we.lights,we.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};qn.physical={uniforms:Xt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var ka={r:0,b:0,g:0},es=new Rn,qg=new Je;function Yg(i,e,t,n,s,r,o){let a=new Ye(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function _(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?t:e).get(y)),y}function x(w){let y=!1,A=_(w);A===null?p(a,c):A&&A.isColor&&(p(A,1),y=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,y){let A=_(y);A&&(A.isCubeTexture||A.mapping===Hr)?(h===void 0&&(h=new Vt(new Rs(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:Qi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),es.copy(y.backgroundRotation),es.x*=-1,es.y*=-1,es.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qg.makeRotationFromEuler(es)),h.material.toneMapped=ht.getTransfer(A.colorSpace)!==yt,(u!==A||f!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Vt(new Pr(2,2),new Ln({name:"BackgroundMaterial",uniforms:Qi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ht.getTransfer(A.colorSpace)!==yt,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function p(w,y){w.getRGB(ka,lc(i)),n.buffers.color.setClear(ka.r,ka.g,ka.b,y,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,y=1){a.set(w),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,p(a,c)},render:x,addToRenderList:m,dispose:T}}function jg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(b,D,z,W,Y){let K=!1,j=u(W,z,D);r!==j&&(r=j,l(r.object)),K=d(b,W,z,Y),K&&_(b,W,z,Y),Y!==null&&e.update(Y,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,y(b,D,z,W),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,D,z){let W=z.wireframe===!0,Y=n[b.id];Y===void 0&&(Y={},n[b.id]=Y);let K=Y[D.id];K===void 0&&(K={},Y[D.id]=K);let j=K[W];return j===void 0&&(j=f(c()),K[W]=j),j}function f(b){let D=[],z=[],W=[];for(let Y=0;Y<t;Y++)D[Y]=0,z[Y]=0,W[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:W,object:b,attributes:{},index:null}}function d(b,D,z,W){let Y=r.attributes,K=D.attributes,j=0,$=z.getAttributes();for(let V in $)if($[V].location>=0){let re=Y[V],ye=K[V];if(ye===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(ye=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(ye=b.instanceColor)),re===void 0||re.attribute!==ye||ye&&re.data!==ye.data)return!0;j++}return r.attributesNum!==j||r.index!==W}function _(b,D,z,W){let Y={},K=D.attributes,j=0,$=z.getAttributes();for(let V in $)if($[V].location>=0){let re=K[V];re===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(re=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(re=b.instanceColor));let ye={};ye.attribute=re,re&&re.data&&(ye.data=re.data),Y[V]=ye,j++}r.attributes=Y,r.attributesNum=j,r.index=W}function x(){let b=r.newAttributes;for(let D=0,z=b.length;D<z;D++)b[D]=0}function m(b){p(b,0)}function p(b,D){let z=r.newAttributes,W=r.enabledAttributes,Y=r.attributeDivisors;z[b]=1,W[b]===0&&(i.enableVertexAttribArray(b),W[b]=1),Y[b]!==D&&(i.vertexAttribDivisor(b,D),Y[b]=D)}function T(){let b=r.newAttributes,D=r.enabledAttributes;for(let z=0,W=D.length;z<W;z++)D[z]!==b[z]&&(i.disableVertexAttribArray(z),D[z]=0)}function w(b,D,z,W,Y,K,j){j===!0?i.vertexAttribIPointer(b,D,z,Y,K):i.vertexAttribPointer(b,D,z,W,Y,K)}function y(b,D,z,W){x();let Y=W.attributes,K=z.getAttributes(),j=D.defaultAttributeValues;for(let $ in K){let V=K[$];if(V.location>=0){let ie=Y[$];if(ie===void 0&&($==="instanceMatrix"&&b.instanceMatrix&&(ie=b.instanceMatrix),$==="instanceColor"&&b.instanceColor&&(ie=b.instanceColor)),ie!==void 0){let re=ie.normalized,ye=ie.itemSize,Le=e.get(ie);if(Le===void 0)continue;let tt=Le.buffer,ot=Le.type,se=Le.bytesPerElement,U=ot===i.INT||ot===i.UNSIGNED_INT||ie.gpuType===sa;if(ie.isInterleavedBufferAttribute){let N=ie.data,X=N.stride,ee=ie.offset;if(N.isInstancedInterleavedBuffer){for(let ce=0;ce<V.locationSize;ce++)p(V.location+ce,N.meshPerAttribute);b.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ce=0;ce<V.locationSize;ce++)m(V.location+ce);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let ce=0;ce<V.locationSize;ce++)w(V.location+ce,ye/V.locationSize,ot,re,X*se,(ee+ye/V.locationSize*ce)*se,U)}else{if(ie.isInstancedBufferAttribute){for(let N=0;N<V.locationSize;N++)p(V.location+N,ie.meshPerAttribute);b.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let N=0;N<V.locationSize;N++)m(V.location+N);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let N=0;N<V.locationSize;N++)w(V.location+N,ye/V.locationSize,ot,re,ye*se,ye/V.locationSize*N*se,U)}}else if(j!==void 0){let re=j[$];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(V.location,re);break;case 3:i.vertexAttrib3fv(V.location,re);break;case 4:i.vertexAttrib4fv(V.location,re);break;default:i.vertexAttrib1fv(V.location,re)}}}}T()}function A(){L();for(let b in n){let D=n[b];for(let z in D){let W=D[z];for(let Y in W)h(W[Y].object),delete W[Y];delete D[z]}delete n[b]}}function C(b){if(n[b.id]===void 0)return;let D=n[b.id];for(let z in D){let W=D[z];for(let Y in W)h(W[Y].object),delete W[Y];delete D[z]}delete n[b.id]}function E(b){for(let D in n){let z=n[D];if(z[b.id]===void 0)continue;let W=z[b.id];for(let Y in W)h(W[Y].object),delete W[Y];delete z[b.id]}}function L(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function $g(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let _=0;_<u;_++)d+=h[_];t.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<l.length;_++)o(l[_],h[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let _=0;for(let x=0;x<u;x++)_+=h[x]*f[x];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Zg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==fn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let L=E===Hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Nn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==yn&&!L)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:A,maxSamples:C}}function Kg(i){let e=this,t=null,n=0,s=!1,r=!1,o=new _n,a=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let _=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):l();else{let T=r?0:n,w=T*4,y=p.clippingState||null;c.value=y,y=h(_,f,w,d);for(let A=0;A!==w;++A)y[A]=t[A];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,_){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,_!==!0||m===null){let p=d+x*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=d;w!==x;++w,y+=4)o.copy(u[w]).applyMatrix4(T,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Jg(i){let e=new WeakMap;function t(o,a){return a===ta?o.mapping=Zi:a===na&&(o.mapping=Ki),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ta||a===na)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Oo(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ys=4,Ku=[.125,.215,.35,.446,.526,.582],is=20,dc=new ji,Ju=new Ye,fc=null,pc=0,mc=0,gc=!1,ns=(1+Math.sqrt(5))/2,qs=1/ns,Qu=[new O(-ns,qs,0),new O(ns,qs,0),new O(-qs,0,ns),new O(qs,0,ns),new O(0,ns,-qs),new O(0,ns,qs),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Qg=new O,Ha=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Qg}=r;fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,za(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zi||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Hs,format:fn,colorSpace:zt,depthBuffer:!1},s=ed(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ed(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e0(r)),this._blurMaterial=t0(r,e,t)}return s}_compileMaterial(e){let t=new Vt(this._lodPlanes[0],e);this._renderer.compile(t,dc)}_sceneToCubeUV(e,t,n,s,r){let c=new Pt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Ju),u.toneMapping=ui,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let x=new Pn({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),m=new Vt(new Rs,x),p=!1,T=e.background;T?T.isColor&&(x.color.copy(T),e.background=null,p=!0):(x.color.copy(Ju),p=!0);for(let w=0;w<6;w++){let y=w%3;y===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):y===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));let A=this._cubeSize;za(s,y*A,w>2?A:0,A,A),u.setRenderTarget(s),p&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=T}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Zi||e.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=td());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Vt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;za(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,dc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Qu[(s-r-1)%Qu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Vt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*is-1),x=r/_,m=isFinite(r)?1+Math.floor(h*x):is;m>is&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${is}`);let p=[],T=0;for(let E=0;E<is;++E){let L=E/x,S=Math.exp(-L*L/2);p.push(S),E===0?T+=S:E<m&&(T+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=_,f.mipInt.value=w-n;let y=this._sizeLods[s],A=3*y*(s>w-Ys?s-w+Ys:0),C=4*(this._cubeSize-y);za(t,A,C,3*y,2*y),c.setRenderTarget(t),c.render(u,dc)}};function e0(i){let e=[],t=[],n=[],s=i,r=i-Ys+1+Ku.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Ys?c=Ku[o-i+Ys-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,_=6,x=3,m=2,p=1,T=new Float32Array(x*_*d),w=new Float32Array(m*_*d),y=new Float32Array(p*_*d);for(let C=0;C<d;C++){let E=C%3*2/3-1,L=C>2?0:-1,S=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];T.set(S,x*_*C),w.set(f,m*_*C);let b=[C,C,C,C,C,C];y.set(b,p*_*C)}let A=new dn;A.setAttribute("position",new Lt(T,x)),A.setAttribute("uv",new Lt(w,m)),A.setAttribute("faceIndex",new Lt(y,p)),e.push(A),s>Ys&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ed(i,e,t){let n=new kn(i,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function za(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function t0(i,e,t){let n=new Float32Array(is),s=new O(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function td(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function nd(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Ec(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function n0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ta||c===na,h=c===Zi||c===Ki;if(l||h){let u=e.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ha(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(t===null&&(t=new Ha(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function i0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function s0(i,e,t,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){let f=[],d=u.index,_=u.attributes.position,x=0;if(d!==null){let T=d.array;x=d.version;for(let w=0,y=T.length;w<y;w+=3){let A=T[w+0],C=T[w+1],E=T[w+2];f.push(A,C,C,E,E,A)}}else if(_!==void 0){let T=_.array;x=_.version;for(let w=0,y=T.length/3-1;w<y;w+=3){let A=w+0,C=w+1,E=w+2;f.push(A,C,C,E,E,A)}}else return;let m=new(ac(f)?xr:_r)(f,1);m.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function r0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),t.update(d,n,1)}function l(f,d,_){_!==0&&(i.drawElementsInstanced(n,d,r,f*o,_),t.update(d,n,_))}function h(f,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,n,1)}function u(f,d,_,x){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,_);let p=0;for(let T=0;T<_;T++)p+=d[T]*x[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function o0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function a0(i,e,t){let n=new WeakMap,s=new dt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],w=0;d===!0&&(w=1),_===!0&&(w=2),x===!0&&(w=3);let y=a.attributes.position.count*w,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let C=new Float32Array(y*A*4*u),E=new gr(C,y,A,u);E.type=yn,E.needsUpdate=!0;let L=w*4;for(let b=0;b<u;b++){let D=m[b],z=p[b],W=T[b],Y=y*A*4*b;for(let K=0;K<D.count;K++){let j=K*L;d===!0&&(s.fromBufferAttribute(D,K),C[Y+j+0]=s.x,C[Y+j+1]=s.y,C[Y+j+2]=s.z,C[Y+j+3]=0),_===!0&&(s.fromBufferAttribute(z,K),C[Y+j+4]=s.x,C[Y+j+5]=s.y,C[Y+j+6]=s.z,C[Y+j+7]=0),x===!0&&(s.fromBufferAttribute(W,K),C[Y+j+8]=s.x,C[Y+j+9]=s.y,C[Y+j+10]=s.z,C[Y+j+11]=W.itemSize===4?s.w:1)}}f={count:u,texture:E,size:new Ge(y,A)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let _=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function l0(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var bd=new Ft,id=new Ir(1,1),Md=new gr,Sd=new No,wd=new vr,sd=[],rd=[],od=new Float32Array(16),ad=new Float32Array(9),ld=new Float32Array(4);function $s(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=sd[s];if(r===void 0&&(r=new Float32Array(s),sd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Wa(i,e){let t=rd[e];t===void 0&&(t=new Int32Array(e),rd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function c0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function h0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function u0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function d0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function f0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;ld.set(n),i.uniformMatrix2fv(this.addr,!1,ld),Nt(t,n)}}function p0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;ad.set(n),i.uniformMatrix3fv(this.addr,!1,ad),Nt(t,n)}}function m0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;od.set(n),i.uniformMatrix4fv(this.addr,!1,od),Nt(t,n)}}function g0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function x0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function v0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function b0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function M0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function S0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function w0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(id.compareFunction=sc,r=id):r=bd,t.setTexture2D(e||r,s)}function T0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Sd,s)}function E0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||wd,s)}function A0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Md,s)}function C0(i){switch(i){case 5126:return c0;case 35664:return h0;case 35665:return u0;case 35666:return d0;case 35674:return f0;case 35675:return p0;case 35676:return m0;case 5124:case 35670:return g0;case 35667:case 35671:return _0;case 35668:case 35672:return x0;case 35669:case 35673:return y0;case 5125:return v0;case 36294:return b0;case 36295:return M0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return w0;case 35679:case 36299:case 36307:return T0;case 35680:case 36300:case 36308:case 36293:return E0;case 36289:case 36303:case 36311:case 36292:return A0}}function I0(i,e){i.uniform1fv(this.addr,e)}function R0(i,e){let t=$s(e,this.size,2);i.uniform2fv(this.addr,t)}function P0(i,e){let t=$s(e,this.size,3);i.uniform3fv(this.addr,t)}function L0(i,e){let t=$s(e,this.size,4);i.uniform4fv(this.addr,t)}function D0(i,e){let t=$s(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function N0(i,e){let t=$s(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function U0(i,e){let t=$s(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function O0(i,e){i.uniform1iv(this.addr,e)}function F0(i,e){i.uniform2iv(this.addr,e)}function B0(i,e){i.uniform3iv(this.addr,e)}function k0(i,e){i.uniform4iv(this.addr,e)}function z0(i,e){i.uniform1uiv(this.addr,e)}function V0(i,e){i.uniform2uiv(this.addr,e)}function H0(i,e){i.uniform3uiv(this.addr,e)}function G0(i,e){i.uniform4uiv(this.addr,e)}function W0(i,e,t){let n=this.cache,s=e.length,r=Wa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||bd,r[o])}function X0(i,e,t){let n=this.cache,s=e.length,r=Wa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Sd,r[o])}function q0(i,e,t){let n=this.cache,s=e.length,r=Wa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||wd,r[o])}function Y0(i,e,t){let n=this.cache,s=e.length,r=Wa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Md,r[o])}function j0(i){switch(i){case 5126:return I0;case 35664:return R0;case 35665:return P0;case 35666:return L0;case 35674:return D0;case 35675:return N0;case 35676:return U0;case 5124:case 35670:return O0;case 35667:case 35671:return F0;case 35668:case 35672:return B0;case 35669:case 35673:return k0;case 5125:return z0;case 36294:return V0;case 36295:return H0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return W0;case 35679:case 36299:case 36307:return X0;case 35680:case 36300:case 36308:case 36293:return q0;case 36289:case 36303:case 36311:case 36292:return Y0}}var xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=C0(t.type)}},yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=j0(t.type)}},vc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},_c=/(\w+)(\])?(\[|\.)?/g;function cd(i,e){i.seq.push(e),i.map[e.id]=e}function $0(i,e,t){let n=i.name,s=n.length;for(_c.lastIndex=0;;){let r=_c.exec(n),o=_c.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){cd(t,l===void 0?new xc(a,i,e):new yc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new vc(a),cd(t,u)),t=u}}}var js=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);$0(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function hd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Z0=37297,K0=0;function J0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var ud=new Qe;function Q0(i){ht._getMatrix(ud,ht.workingColorSpace,i);let e=`mat3( ${ud.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case pr:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function dd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+J0(i.getShaderSource(e),a)}else return r}function e_(i,e){let t=Q0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function t_(i,e){let t;switch(e){case Eu:t="Linear";break;case Au:t="Reinhard";break;case Cu:t="Cineon";break;case Iu:t="ACESFilmic";break;case Pu:t="AgX";break;case Lu:t="Neutral";break;case Ru:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Va=new O;function n_(){ht.getLuminanceCoefficients(Va);let i=Va.x.toFixed(4),e=Va.y.toFixed(4),t=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function s_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function r_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function $r(i){return i!==""}function fd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var o_=/^[ \t]*#include +<([\w\d./]+)>/gm;function bc(i){return i.replace(o_,l_)}var a_=new Map;function l_(i,e){let t=it[e];if(t===void 0){let n=a_.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bc(t)}var c_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(i){return i.replace(c_,h_)}function h_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function u_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ru?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function d_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zi:case Ki:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function f_(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ki&&(e="ENVMAP_MODE_REFRACTION"),e}function p_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yl:e="ENVMAP_BLENDING_MULTIPLY";break;case wu:e="ENVMAP_BLENDING_MIX";break;case Tu:e="ENVMAP_BLENDING_ADD";break}return e}function m_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function g_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=u_(t),l=d_(t),h=f_(t),u=p_(t),f=m_(t),d=i_(t),_=s_(r),x=s.createProgram(),m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter($r).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter($r).join(`
`),p.length>0&&(p+=`
`)):(m=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?it.tonemapping_pars_fragment:"",t.toneMapping!==ui?t_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,e_("linearToOutputTexel",t.outputColorSpace),n_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),o=bc(o),o=fd(o,t),o=pd(o,t),a=bc(a),a=fd(a,t),a=pd(a,t),o=md(o),a=md(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=T+m+o,y=T+p+a,A=hd(s,s.VERTEX_SHADER,w),C=hd(s,s.FRAGMENT_SHADER,y);s.attachShader(x,A),s.attachShader(x,C),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(D){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(x)||"",W=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(C)||"",K=z.trim(),j=W.trim(),$=Y.trim(),V=!0,ie=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,C);else{let re=dd(s,A,"vertex"),ye=dd(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+K+`
`+re+`
`+ye)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(j===""||$==="")&&(ie=!1);ie&&(D.diagnostics={runnable:V,programLog:K,vertexShader:{log:j,prefix:m},fragmentShader:{log:$,prefix:p}})}s.deleteShader(A),s.deleteShader(C),L=new js(s,x),S=r_(s,x)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(x,Z0)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=K0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=C,this}var __=0,Mc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sc(e),t.set(e,n)),n}},Sc=class{constructor(e){this.id=__++,this.code=e,this.usedTimes=0}};function x_(i,e,t,n,s,r,o){let a=new Is,c=new Mc,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,b,D,z,W){let Y=z.fog,K=W.geometry,j=S.isMeshStandardMaterial?z.environment:null,$=(S.isMeshStandardMaterial?t:e).get(S.envMap||j),V=$&&$.mapping===Hr?$.image.height:null,ie=_[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let re=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ye=re!==void 0?re.length:0,Le=0;K.morphAttributes.position!==void 0&&(Le=1),K.morphAttributes.normal!==void 0&&(Le=2),K.morphAttributes.color!==void 0&&(Le=3);let tt,ot,se,U;if(ie){let st=qn[ie];tt=st.vertexShader,ot=st.fragmentShader}else tt=S.vertexShader,ot=S.fragmentShader,c.update(S),se=c.getVertexShaderID(S),U=c.getFragmentShaderID(S);let N=i.getRenderTarget(),X=i.state.buffers.depth.getReversed(),ee=W.isInstancedMesh===!0,ce=W.isBatchedMesh===!0,Ne=!!S.map,nt=!!S.matcap,P=!!$,Xe=!!S.aoMap,ze=!!S.lightMap,ke=!!S.bumpMap,be=!!S.normalMap,qe=!!S.displacementMap,oe=!!S.emissiveMap,de=!!S.metalnessMap,lt=!!S.roughnessMap,ut=S.anisotropy>0,I=S.clearcoat>0,v=S.dispersion>0,H=S.iridescence>0,J=S.sheen>0,ae=S.transmission>0,Z=ut&&!!S.anisotropyMap,Fe=I&&!!S.clearcoatMap,_e=I&&!!S.clearcoatNormalMap,Ue=I&&!!S.clearcoatRoughnessMap,Ie=H&&!!S.iridescenceMap,fe=H&&!!S.iridescenceThicknessMap,Me=J&&!!S.sheenColorMap,He=J&&!!S.sheenRoughnessMap,pe=!!S.specularMap,Se=!!S.specularColorMap,Ke=!!S.specularIntensityMap,B=ae&&!!S.transmissionMap,me=ae&&!!S.thicknessMap,ve=!!S.gradientMap,Ae=!!S.alphaMap,he=S.alphaTest>0,Q=!!S.alphaHash,De=!!S.extensions,je=ui;S.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(je=i.toneMapping);let pt={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:tt,fragmentShader:ot,defines:S.defines,customVertexShaderID:se,customFragmentShaderID:U,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:ce,batchingColor:ce&&W._colorsTexture!==null,instancing:ee,instancingColor:ee&&W.instanceColor!==null,instancingMorph:ee&&W.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:N===null?i.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:zt,alphaToCoverage:!!S.alphaToCoverage,map:Ne,matcap:nt,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:V,aoMap:Xe,lightMap:ze,bumpMap:ke,normalMap:be,displacementMap:f&&qe,emissiveMap:oe,normalMapObjectSpace:be&&S.normalMapType===Fu,normalMapTangentSpace:be&&S.normalMapType===ic,metalnessMap:de,roughnessMap:lt,anisotropy:ut,anisotropyMap:Z,clearcoat:I,clearcoatMap:Fe,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ue,dispersion:v,iridescence:H,iridescenceMap:Ie,iridescenceThicknessMap:fe,sheen:J,sheenColorMap:Me,sheenRoughnessMap:He,specularMap:pe,specularColorMap:Se,specularIntensityMap:Ke,transmission:ae,transmissionMap:B,thicknessMap:me,gradientMap:ve,opaque:S.transparent===!1&&S.blending===zi&&S.alphaToCoverage===!1,alphaMap:Ae,alphaTest:he,alphaHash:Q,combine:S.combine,mapUv:Ne&&x(S.map.channel),aoMapUv:Xe&&x(S.aoMap.channel),lightMapUv:ze&&x(S.lightMap.channel),bumpMapUv:ke&&x(S.bumpMap.channel),normalMapUv:be&&x(S.normalMap.channel),displacementMapUv:qe&&x(S.displacementMap.channel),emissiveMapUv:oe&&x(S.emissiveMap.channel),metalnessMapUv:de&&x(S.metalnessMap.channel),roughnessMapUv:lt&&x(S.roughnessMap.channel),anisotropyMapUv:Z&&x(S.anisotropyMap.channel),clearcoatMapUv:Fe&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:_e&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:He&&x(S.sheenRoughnessMap.channel),specularMapUv:pe&&x(S.specularMap.channel),specularColorMapUv:Se&&x(S.specularColorMap.channel),specularIntensityMapUv:Ke&&x(S.specularIntensityMap.channel),transmissionMapUv:B&&x(S.transmissionMap.channel),thicknessMapUv:me&&x(S.thicknessMap.channel),alphaMapUv:Ae&&x(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(be||ut),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!K.attributes.uv&&(Ne||Ae),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:X,skinning:W.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,decodeVideoTexture:Ne&&S.map.isVideoTexture===!0&&ht.getTransfer(S.map.colorSpace)===yt,decodeVideoTextureEmissive:oe&&S.emissiveMap.isVideoTexture===!0&&ht.getTransfer(S.emissiveMap.colorSpace)===yt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xn,flipSided:S.side===Qt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return pt.vertexUv1s=l.has(1),pt.vertexUv2s=l.has(2),pt.vertexUv3s=l.has(3),l.clear(),pt}function p(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let D in S.defines)b.push(D),b.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(T(b,S),w(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function T(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function w(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let b=_[S.type],D;if(b){let z=qn[b];D=ju.clone(z.uniforms)}else D=S.uniforms;return D}function A(S,b){let D;for(let z=0,W=h.length;z<W;z++){let Y=h[z];if(Y.cacheKey===b){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new g_(i,b,S,r),h.push(D)),D}function C(S){if(--S.usedTimes===0){let b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function E(S){c.remove(S)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:A,releaseProgram:C,releaseShaderCache:E,programs:h,dispose:L}}function y_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function v_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function _d(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,d,_,x,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:_,renderOrder:u.renderOrder,z:x,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,f,d,_,x,m){let p=o(u,f,d,_,x,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(u,f,d,_,x,m){let p=o(u,f,d,_,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,f){t.length>1&&t.sort(u||v_),n.length>1&&n.sort(f||_d),s.length>1&&s.sort(f||_d)}function h(){for(let u=e,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function b_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new xd,i.set(n,[o])):s>=r.length?(o=new xd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function M_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ye};break;case"SpotLight":t={position:new O,direction:new O,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function S_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var w_=0;function T_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function E_(i){let e=new M_,t=S_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new Je,o=new Je;function a(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,_=0,x=0,m=0,p=0,T=0,w=0,y=0,A=0,C=0,E=0;l.sort(T_);for(let S=0,b=l.length;S<b;S++){let D=l[S],z=D.color,W=D.intensity,Y=D.distance,K=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=z.r*W,u+=z.g*W,f+=z.b*W;else if(D.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(D.sh.coefficients[j],W);E++}else if(D.isDirectionalLight){let j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let $=D.shadow,V=t.get(D);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=K,n.directionalShadowMatrix[d]=D.shadow.matrix,T++}n.directional[d]=j,d++}else if(D.isSpotLight){let j=e.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(z).multiplyScalar(W),j.distance=Y,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,n.spot[x]=j;let $=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,$.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[x]=$.matrix,D.castShadow){let V=t.get(D);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=K,y++}x++}else if(D.isRectAreaLight){let j=e.get(D);j.color.copy(z).multiplyScalar(W),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=j,m++}else if(D.isPointLight){let j=e.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity),j.distance=D.distance,j.decay=D.decay,D.castShadow){let $=D.shadow,V=t.get(D);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,V.shadowCameraNear=$.camera.near,V.shadowCameraFar=$.camera.far,n.pointShadow[_]=V,n.pointShadowMap[_]=K,n.pointShadowMatrix[_]=D.shadow.matrix,w++}n.point[_]=j,_++}else if(D.isHemisphereLight){let j=e.get(D);j.skyColor.copy(D.color).multiplyScalar(W),j.groundColor.copy(D.groundColor).multiplyScalar(W),n.hemi[p]=j,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let L=n.hash;(L.directionalLength!==d||L.pointLength!==_||L.spotLength!==x||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==T||L.numPointShadows!==w||L.numSpotShadows!==y||L.numSpotMaps!==A||L.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=y+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,L.directionalLength=d,L.pointLength=_,L.spotLength=x,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=T,L.numPointShadows=w,L.numSpotShadows=y,L.numSpotMaps=A,L.numLightProbes=E,n.version=w_++)}function c(l,h){let u=0,f=0,d=0,_=0,x=0,m=h.matrixWorldInverse;for(let p=0,T=l.length;p<T;p++){let w=l[p];if(w.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(w.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(w.isRectAreaLight){let y=n.rectArea[_];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(w.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function yd(i){let e=new E_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function A_(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new yd(i),e.set(s,[a])):r>=o.length?(a=new yd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var C_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,I_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function R_(i,e,t){let n=new Us,s=new Ge,r=new Ge,o=new dt,a=new ko({depthPacking:Ou}),c=new zo,l={},h=t.maxTextureSize,u={[In]:Qt,[Qt]:In,[xn]:xn},f=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:C_,fragmentShader:I_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let _=new dn;_.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Vt(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gl;let p=this.type;this.render=function(C,E,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let S=i.getRenderTarget(),b=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),z=i.state;z.setBlending(hi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let W=p!==Xn&&this.type===Xn,Y=p===Xn&&this.type!==Xn;for(let K=0,j=C.length;K<j;K++){let $=C[K],V=$.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let ie=V.getFrameExtents();if(s.multiply(ie),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,V.mapSize.y=r.y)),V.map===null||W===!0||Y===!0){let ye=this.type!==Xn?{minFilter:kt,magFilter:kt}:{};V.map!==null&&V.map.dispose(),V.map=new kn(s.x,s.y,ye),V.map.texture.name=$.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let re=V.getViewportCount();for(let ye=0;ye<re;ye++){let Le=V.getViewport(ye);o.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),z.viewport(o),V.updateMatrices($,ye),n=V.getFrustum(),y(E,L,V.camera,$,this.type)}V.isPointLightShadow!==!0&&this.type===Xn&&T(V,L),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,b,D)};function T(C,E){let L=e.update(x);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new kn(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(E,null,L,f,x,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(E,null,L,d,x,null)}function w(C,E,L,S){let b=null,D=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)b=D;else if(b=L.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let z=b.uuid,W=E.uuid,Y=l[z];Y===void 0&&(Y={},l[z]=Y);let K=Y[W];K===void 0&&(K=b.clone(),Y[W]=K,E.addEventListener("dispose",A)),b=K}if(b.visible=E.visible,b.wireframe=E.wireframe,S===Xn?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,L.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let z=i.properties.get(b);z.light=L}return b}function y(C,E,L,S,b){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===Xn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);let W=e.update(C),Y=C.material;if(Array.isArray(Y)){let K=W.groups;for(let j=0,$=K.length;j<$;j++){let V=K[j],ie=Y[V.materialIndex];if(ie&&ie.visible){let re=w(C,ie,S,b);C.onBeforeShadow(i,C,E,L,W,re,V),i.renderBufferDirect(L,null,W,re,C,V),C.onAfterShadow(i,C,E,L,W,re,V)}}}else if(Y.visible){let K=w(C,Y,S,b);C.onBeforeShadow(i,C,E,L,W,K,null),i.renderBufferDirect(L,null,W,K,C,null),C.onAfterShadow(i,C,E,L,W,K,null)}}let z=C.children;for(let W=0,Y=z.length;W<Y;W++)y(z[W],E,L,S,b)}function A(C){C.target.removeEventListener("dispose",A);for(let L in l){let S=l[L],b=C.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}var P_={[jo]:$o,[Zo]:Qo,[Ko]:ea,[Vi]:Jo,[$o]:jo,[Qo]:Zo,[ea]:Ko,[Jo]:Vi};function L_(i,e){function t(){let B=!1,me=new dt,ve=null,Ae=new dt(0,0,0,0);return{setMask:function(he){ve!==he&&!B&&(i.colorMask(he,he,he,he),ve=he)},setLocked:function(he){B=he},setClear:function(he,Q,De,je,pt){pt===!0&&(he*=je,Q*=je,De*=je),me.set(he,Q,De,je),Ae.equals(me)===!1&&(i.clearColor(he,Q,De,je),Ae.copy(me))},reset:function(){B=!1,ve=null,Ae.set(-1,0,0,0)}}}function n(){let B=!1,me=!1,ve=null,Ae=null,he=null;return{setReversed:function(Q){if(me!==Q){let De=e.get("EXT_clip_control");Q?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=Q;let je=he;he=null,this.setClear(je)}},getReversed:function(){return me},setTest:function(Q){Q?N(i.DEPTH_TEST):X(i.DEPTH_TEST)},setMask:function(Q){ve!==Q&&!B&&(i.depthMask(Q),ve=Q)},setFunc:function(Q){if(me&&(Q=P_[Q]),Ae!==Q){switch(Q){case jo:i.depthFunc(i.NEVER);break;case $o:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case Vi:i.depthFunc(i.LEQUAL);break;case Ko:i.depthFunc(i.EQUAL);break;case Jo:i.depthFunc(i.GEQUAL);break;case Qo:i.depthFunc(i.GREATER);break;case ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=Q}},setLocked:function(Q){B=Q},setClear:function(Q){he!==Q&&(me&&(Q=1-Q),i.clearDepth(Q),he=Q)},reset:function(){B=!1,ve=null,Ae=null,he=null,me=!1}}}function s(){let B=!1,me=null,ve=null,Ae=null,he=null,Q=null,De=null,je=null,pt=null;return{setTest:function(st){B||(st?N(i.STENCIL_TEST):X(i.STENCIL_TEST))},setMask:function(st){me!==st&&!B&&(i.stencilMask(st),me=st)},setFunc:function(st,mn,qt){(ve!==st||Ae!==mn||he!==qt)&&(i.stencilFunc(st,mn,qt),ve=st,Ae=mn,he=qt)},setOp:function(st,mn,qt){(Q!==st||De!==mn||je!==qt)&&(i.stencilOp(st,mn,qt),Q=st,De=mn,je=qt)},setLocked:function(st){B=st},setClear:function(st){pt!==st&&(i.clearStencil(st),pt=st)},reset:function(){B=!1,me=null,ve=null,Ae=null,he=null,Q=null,De=null,je=null,pt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],_=null,x=!1,m=null,p=null,T=null,w=null,y=null,A=null,C=null,E=new Ye(0,0,0),L=0,S=!1,b=null,D=null,z=null,W=null,Y=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,$=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),j=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),j=$>=2);let ie=null,re={},ye=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),tt=new dt().fromArray(ye),ot=new dt().fromArray(Le);function se(B,me,ve,Ae){let he=new Uint8Array(4),Q=i.createTexture();i.bindTexture(B,Q),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<ve;De++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(me,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(me+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return Q}let U={};U[i.TEXTURE_2D]=se(i.TEXTURE_2D,i.TEXTURE_2D,1),U[i.TEXTURE_CUBE_MAP]=se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[i.TEXTURE_2D_ARRAY]=se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),U[i.TEXTURE_3D]=se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),N(i.DEPTH_TEST),o.setFunc(Vi),ke(!1),be(Hl),N(i.CULL_FACE),Xe(hi);function N(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function X(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function ee(B,me){return u[B]!==me?(i.bindFramebuffer(B,me),u[B]=me,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=me),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=me),!0):!1}function ce(B,me){let ve=d,Ae=!1;if(B){ve=f.get(me),ve===void 0&&(ve=[],f.set(me,ve));let he=B.textures;if(ve.length!==he.length||ve[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,De=he.length;Q<De;Q++)ve[Q]=i.COLOR_ATTACHMENT0+Q;ve.length=he.length,Ae=!0}}else ve[0]!==i.BACK&&(ve[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(ve)}function Ne(B){return _!==B?(i.useProgram(B),_=B,!0):!1}let nt={[Mi]:i.FUNC_ADD,[au]:i.FUNC_SUBTRACT,[lu]:i.FUNC_REVERSE_SUBTRACT};nt[cu]=i.MIN,nt[hu]=i.MAX;let P={[uu]:i.ZERO,[du]:i.ONE,[fu]:i.SRC_COLOR,[Io]:i.SRC_ALPHA,[yu]:i.SRC_ALPHA_SATURATE,[_u]:i.DST_COLOR,[mu]:i.DST_ALPHA,[pu]:i.ONE_MINUS_SRC_COLOR,[Ro]:i.ONE_MINUS_SRC_ALPHA,[xu]:i.ONE_MINUS_DST_COLOR,[gu]:i.ONE_MINUS_DST_ALPHA,[vu]:i.CONSTANT_COLOR,[bu]:i.ONE_MINUS_CONSTANT_COLOR,[Mu]:i.CONSTANT_ALPHA,[Su]:i.ONE_MINUS_CONSTANT_ALPHA};function Xe(B,me,ve,Ae,he,Q,De,je,pt,st){if(B===hi){x===!0&&(X(i.BLEND),x=!1);return}if(x===!1&&(N(i.BLEND),x=!0),B!==ou){if(B!==m||st!==S){if((p!==Mi||y!==Mi)&&(i.blendEquation(i.FUNC_ADD),p=Mi,y=Mi),st)switch(B){case zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wl:i.blendFunc(i.ONE,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ql:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}T=null,w=null,A=null,C=null,E.set(0,0,0),L=0,m=B,S=st}return}he=he||me,Q=Q||ve,De=De||Ae,(me!==p||he!==y)&&(i.blendEquationSeparate(nt[me],nt[he]),p=me,y=he),(ve!==T||Ae!==w||Q!==A||De!==C)&&(i.blendFuncSeparate(P[ve],P[Ae],P[Q],P[De]),T=ve,w=Ae,A=Q,C=De),(je.equals(E)===!1||pt!==L)&&(i.blendColor(je.r,je.g,je.b,pt),E.copy(je),L=pt),m=B,S=!1}function ze(B,me){B.side===xn?X(i.CULL_FACE):N(i.CULL_FACE);let ve=B.side===Qt;me&&(ve=!ve),ke(ve),B.blending===zi&&B.transparent===!1?Xe(hi):Xe(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let Ae=B.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),oe(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?N(i.SAMPLE_ALPHA_TO_COVERAGE):X(i.SAMPLE_ALPHA_TO_COVERAGE)}function ke(B){b!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),b=B)}function be(B){B!==iu?(N(i.CULL_FACE),B!==D&&(B===Hl?i.cullFace(i.BACK):B===su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):X(i.CULL_FACE),D=B}function qe(B){B!==z&&(j&&i.lineWidth(B),z=B)}function oe(B,me,ve){B?(N(i.POLYGON_OFFSET_FILL),(W!==me||Y!==ve)&&(i.polygonOffset(me,ve),W=me,Y=ve)):X(i.POLYGON_OFFSET_FILL)}function de(B){B?N(i.SCISSOR_TEST):X(i.SCISSOR_TEST)}function lt(B){B===void 0&&(B=i.TEXTURE0+K-1),ie!==B&&(i.activeTexture(B),ie=B)}function ut(B,me,ve){ve===void 0&&(ie===null?ve=i.TEXTURE0+K-1:ve=ie);let Ae=re[ve];Ae===void 0&&(Ae={type:void 0,texture:void 0},re[ve]=Ae),(Ae.type!==B||Ae.texture!==me)&&(ie!==ve&&(i.activeTexture(ve),ie=ve),i.bindTexture(B,me||U[B]),Ae.type=B,Ae.texture=me)}function I(){let B=re[ie];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ae(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Fe(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _e(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ue(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ie(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function fe(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Me(B){tt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),tt.copy(B))}function He(B){ot.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),ot.copy(B))}function pe(B,me){let ve=l.get(me);ve===void 0&&(ve=new WeakMap,l.set(me,ve));let Ae=ve.get(B);Ae===void 0&&(Ae=i.getUniformBlockIndex(me,B.name),ve.set(B,Ae))}function Se(B,me){let Ae=l.get(me).get(B);c.get(me)!==Ae&&(i.uniformBlockBinding(me,Ae,B.__bindingPointIndex),c.set(me,Ae))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ie=null,re={},u={},f=new WeakMap,d=[],_=null,x=!1,m=null,p=null,T=null,w=null,y=null,A=null,C=null,E=new Ye(0,0,0),L=0,S=!1,b=null,D=null,z=null,W=null,Y=null,tt.set(0,0,i.canvas.width,i.canvas.height),ot.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:N,disable:X,bindFramebuffer:ee,drawBuffers:ce,useProgram:Ne,setBlending:Xe,setMaterial:ze,setFlipSided:ke,setCullFace:be,setLineWidth:qe,setPolygonOffset:oe,setScissorTest:de,activeTexture:lt,bindTexture:ut,unbindTexture:I,compressedTexImage2D:v,compressedTexImage3D:H,texImage2D:Ie,texImage3D:fe,updateUBOMapping:pe,uniformBlockBinding:Se,texStorage2D:_e,texStorage3D:Ue,texSubImage2D:J,texSubImage3D:ae,compressedTexSubImage2D:Z,compressedTexSubImage3D:Fe,scissor:Me,viewport:He,reset:Ke}}function D_(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ge,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,v){return d?new OffscreenCanvas(I,v):Es("canvas")}function x(I,v,H){let J=1,ae=ut(I);if((ae.width>H||ae.height>H)&&(J=H/Math.max(ae.width,ae.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let Z=Math.floor(J*ae.width),Fe=Math.floor(J*ae.height);u===void 0&&(u=_(Z,Fe));let _e=v?_(Z,Fe):u;return _e.width=Z,_e.height=Fe,_e.getContext("2d").drawImage(I,0,0,Z,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Z+"x"+Fe+")."),_e}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function T(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(I,v,H,J,ae=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Z=v;if(v===i.RED&&(H===i.FLOAT&&(Z=i.R32F),H===i.HALF_FLOAT&&(Z=i.R16F),H===i.UNSIGNED_BYTE&&(Z=i.R8)),v===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.R8UI),H===i.UNSIGNED_SHORT&&(Z=i.R16UI),H===i.UNSIGNED_INT&&(Z=i.R32UI),H===i.BYTE&&(Z=i.R8I),H===i.SHORT&&(Z=i.R16I),H===i.INT&&(Z=i.R32I)),v===i.RG&&(H===i.FLOAT&&(Z=i.RG32F),H===i.HALF_FLOAT&&(Z=i.RG16F),H===i.UNSIGNED_BYTE&&(Z=i.RG8)),v===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RG8UI),H===i.UNSIGNED_SHORT&&(Z=i.RG16UI),H===i.UNSIGNED_INT&&(Z=i.RG32UI),H===i.BYTE&&(Z=i.RG8I),H===i.SHORT&&(Z=i.RG16I),H===i.INT&&(Z=i.RG32I)),v===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),H===i.UNSIGNED_INT&&(Z=i.RGB32UI),H===i.BYTE&&(Z=i.RGB8I),H===i.SHORT&&(Z=i.RGB16I),H===i.INT&&(Z=i.RGB32I)),v===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),H===i.UNSIGNED_INT&&(Z=i.RGBA32UI),H===i.BYTE&&(Z=i.RGBA8I),H===i.SHORT&&(Z=i.RGBA16I),H===i.INT&&(Z=i.RGBA32I)),v===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),v===i.RGBA){let Fe=ae?pr:ht.getTransfer(J);H===i.FLOAT&&(Z=i.RGBA32F),H===i.HALF_FLOAT&&(Z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Z=Fe===yt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(I,v){let H;return I?v===null||v===Ai||v===Gs?H=i.DEPTH24_STENCIL8:v===yn?H=i.DEPTH32F_STENCIL8:v===Vs&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ai||v===Gs?H=i.DEPTH_COMPONENT24:v===yn?H=i.DEPTH_COMPONENT32F:v===Vs&&(H=i.DEPTH_COMPONENT16),H}function A(I,v){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==kt&&I.minFilter!==Zt?Math.log2(Math.max(v.width,v.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?v.mipmaps.length:1}function C(I){let v=I.target;v.removeEventListener("dispose",C),L(v),v.isVideoTexture&&h.delete(v)}function E(I){let v=I.target;v.removeEventListener("dispose",E),b(v)}function L(I){let v=n.get(I);if(v.__webglInit===void 0)return;let H=I.source,J=f.get(H);if(J){let ae=J[v.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&S(I),Object.keys(J).length===0&&f.delete(H)}n.remove(I)}function S(I){let v=n.get(I);i.deleteTexture(v.__webglTexture);let H=I.source,J=f.get(H);delete J[v.__cacheKey],o.memory.textures--}function b(I){let v=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let ae=0;ae<v.__webglFramebuffer[J].length;ae++)i.deleteFramebuffer(v.__webglFramebuffer[J][ae]);else i.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)i.deleteFramebuffer(v.__webglFramebuffer[J]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let H=I.textures;for(let J=0,ae=H.length;J<ae;J++){let Z=n.get(H[J]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(H[J])}n.remove(I)}let D=0;function z(){D=0}function W(){let I=D;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),D+=1,I}function Y(I){let v=[];return v.push(I.wrapS),v.push(I.wrapT),v.push(I.wrapR||0),v.push(I.magFilter),v.push(I.minFilter),v.push(I.anisotropy),v.push(I.internalFormat),v.push(I.format),v.push(I.type),v.push(I.generateMipmaps),v.push(I.premultiplyAlpha),v.push(I.flipY),v.push(I.unpackAlignment),v.push(I.colorSpace),v.join()}function K(I,v){let H=n.get(I);if(I.isVideoTexture&&de(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&H.__version!==I.version){let J=I.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{U(H,I,v);return}}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+v)}function j(I,v){let H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){U(H,I,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+v)}function $(I,v){let H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){U(H,I,v);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+v)}function V(I,v){let H=n.get(I);if(I.version>0&&H.__version!==I.version){N(H,I,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+v)}let ie={[Si]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[ws]:i.MIRRORED_REPEAT},re={[kt]:i.NEAREST,[ia]:i.NEAREST_MIPMAP_NEAREST,[Ji]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[zs]:i.LINEAR_MIPMAP_NEAREST,[Dn]:i.LINEAR_MIPMAP_LINEAR},ye={[Bu]:i.NEVER,[Wu]:i.ALWAYS,[ku]:i.LESS,[sc]:i.LEQUAL,[zu]:i.EQUAL,[Gu]:i.GEQUAL,[Vu]:i.GREATER,[Hu]:i.NOTEQUAL};function Le(I,v){if(v.type===yn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Zt||v.magFilter===zs||v.magFilter===Ji||v.magFilter===Dn||v.minFilter===Zt||v.minFilter===zs||v.minFilter===Ji||v.minFilter===Dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ie[v.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ie[v.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ie[v.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,re[v.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,re[v.minFilter]),v.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ye[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===kt||v.minFilter!==Ji&&v.minFilter!==Dn||v.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function tt(I,v){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,v.addEventListener("dispose",C));let J=v.source,ae=f.get(J);ae===void 0&&(ae={},f.set(J,ae));let Z=Y(v);if(Z!==I.__cacheKey){ae[Z]===void 0&&(ae[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ae[Z].usedTimes++;let Fe=ae[I.__cacheKey];Fe!==void 0&&(ae[I.__cacheKey].usedTimes--,Fe.usedTimes===0&&S(v)),I.__cacheKey=Z,I.__webglTexture=ae[Z].texture}return H}function ot(I,v,H){return Math.floor(Math.floor(I/H)/v)}function se(I,v,H,J){let Z=I.updateRanges;if(Z.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,H,J,v.data);else{Z.sort((fe,Me)=>fe.start-Me.start);let Fe=0;for(let fe=1;fe<Z.length;fe++){let Me=Z[Fe],He=Z[fe],pe=Me.start+Me.count,Se=ot(He.start,v.width,4),Ke=ot(Me.start,v.width,4);He.start<=pe+1&&Se===Ke&&ot(He.start+He.count-1,v.width,4)===Se?Me.count=Math.max(Me.count,He.start+He.count-Me.start):(++Fe,Z[Fe]=He)}Z.length=Fe+1;let _e=i.getParameter(i.UNPACK_ROW_LENGTH),Ue=i.getParameter(i.UNPACK_SKIP_PIXELS),Ie=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let fe=0,Me=Z.length;fe<Me;fe++){let He=Z[fe],pe=Math.floor(He.start/4),Se=Math.ceil(He.count/4),Ke=pe%v.width,B=Math.floor(pe/v.width),me=Se,ve=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,Ke,B,me,ve,H,J,v.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,_e),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ie)}}function U(I,v,H){let J=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=i.TEXTURE_3D);let ae=tt(I,v),Z=v.source;t.bindTexture(J,I.__webglTexture,i.TEXTURE0+H);let Fe=n.get(Z);if(Z.version!==Fe.__version||ae===!0){t.activeTexture(i.TEXTURE0+H);let _e=ht.getPrimaries(ht.workingColorSpace),Ue=v.colorSpace===di?null:ht.getPrimaries(v.colorSpace),Ie=v.colorSpace===di||_e===Ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let fe=x(v.image,!1,s.maxTextureSize);fe=lt(v,fe);let Me=r.convert(v.format,v.colorSpace),He=r.convert(v.type),pe=w(v.internalFormat,Me,He,v.colorSpace,v.isVideoTexture);Le(J,v);let Se,Ke=v.mipmaps,B=v.isVideoTexture!==!0,me=Fe.__version===void 0||ae===!0,ve=Z.dataReady,Ae=A(v,fe);if(v.isDepthTexture)pe=y(v.format===Ws,v.type),me&&(B?t.texStorage2D(i.TEXTURE_2D,1,pe,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,pe,fe.width,fe.height,0,Me,He,null));else if(v.isDataTexture)if(Ke.length>0){B&&me&&t.texStorage2D(i.TEXTURE_2D,Ae,pe,Ke[0].width,Ke[0].height);for(let he=0,Q=Ke.length;he<Q;he++)Se=Ke[he],B?ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,He,Se.data):t.texImage2D(i.TEXTURE_2D,he,pe,Se.width,Se.height,0,Me,He,Se.data);v.generateMipmaps=!1}else B?(me&&t.texStorage2D(i.TEXTURE_2D,Ae,pe,fe.width,fe.height),ve&&se(v,fe,Me,He)):t.texImage2D(i.TEXTURE_2D,0,pe,fe.width,fe.height,0,Me,He,fe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){B&&me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,pe,Ke[0].width,Ke[0].height,fe.depth);for(let he=0,Q=Ke.length;he<Q;he++)if(Se=Ke[he],v.format!==fn)if(Me!==null)if(B){if(ve)if(v.layerUpdates.size>0){let De=uc(Se.width,Se.height,v.format,v.type);for(let je of v.layerUpdates){let pt=Se.data.subarray(je*De/Se.data.BYTES_PER_ELEMENT,(je+1)*De/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,je,Se.width,Se.height,1,Me,pt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,fe.depth,Me,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,pe,Se.width,Se.height,fe.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?ve&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,fe.depth,Me,He,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,pe,Se.width,Se.height,fe.depth,0,Me,He,Se.data)}else{B&&me&&t.texStorage2D(i.TEXTURE_2D,Ae,pe,Ke[0].width,Ke[0].height);for(let he=0,Q=Ke.length;he<Q;he++)Se=Ke[he],v.format!==fn?Me!==null?B?ve&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,he,pe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,He,Se.data):t.texImage2D(i.TEXTURE_2D,he,pe,Se.width,Se.height,0,Me,He,Se.data)}else if(v.isDataArrayTexture)if(B){if(me&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,pe,fe.width,fe.height,fe.depth),ve)if(v.layerUpdates.size>0){let he=uc(fe.width,fe.height,v.format,v.type);for(let Q of v.layerUpdates){let De=fe.data.subarray(Q*he/fe.data.BYTES_PER_ELEMENT,(Q+1)*he/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,fe.width,fe.height,1,Me,He,De)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Me,He,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,fe.width,fe.height,fe.depth,0,Me,He,fe.data);else if(v.isData3DTexture)B?(me&&t.texStorage3D(i.TEXTURE_3D,Ae,pe,fe.width,fe.height,fe.depth),ve&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Me,He,fe.data)):t.texImage3D(i.TEXTURE_3D,0,pe,fe.width,fe.height,fe.depth,0,Me,He,fe.data);else if(v.isFramebufferTexture){if(me)if(B)t.texStorage2D(i.TEXTURE_2D,Ae,pe,fe.width,fe.height);else{let he=fe.width,Q=fe.height;for(let De=0;De<Ae;De++)t.texImage2D(i.TEXTURE_2D,De,pe,he,Q,0,Me,He,null),he>>=1,Q>>=1}}else if(Ke.length>0){if(B&&me){let he=ut(Ke[0]);t.texStorage2D(i.TEXTURE_2D,Ae,pe,he.width,he.height)}for(let he=0,Q=Ke.length;he<Q;he++)Se=Ke[he],B?ve&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,Me,He,Se):t.texImage2D(i.TEXTURE_2D,he,pe,Me,He,Se);v.generateMipmaps=!1}else if(B){if(me){let he=ut(fe);t.texStorage2D(i.TEXTURE_2D,Ae,pe,he.width,he.height)}ve&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Me,He,fe)}else t.texImage2D(i.TEXTURE_2D,0,pe,Me,He,fe);m(v)&&p(J),Fe.__version=Z.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function N(I,v,H){if(v.image.length!==6)return;let J=tt(I,v),ae=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+H);let Z=n.get(ae);if(ae.version!==Z.__version||J===!0){t.activeTexture(i.TEXTURE0+H);let Fe=ht.getPrimaries(ht.workingColorSpace),_e=v.colorSpace===di?null:ht.getPrimaries(v.colorSpace),Ue=v.colorSpace===di||Fe===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Ie=v.isCompressedTexture||v.image[0].isCompressedTexture,fe=v.image[0]&&v.image[0].isDataTexture,Me=[];for(let Q=0;Q<6;Q++)!Ie&&!fe?Me[Q]=x(v.image[Q],!0,s.maxCubemapSize):Me[Q]=fe?v.image[Q].image:v.image[Q],Me[Q]=lt(v,Me[Q]);let He=Me[0],pe=r.convert(v.format,v.colorSpace),Se=r.convert(v.type),Ke=w(v.internalFormat,pe,Se,v.colorSpace),B=v.isVideoTexture!==!0,me=Z.__version===void 0||J===!0,ve=ae.dataReady,Ae=A(v,He);Le(i.TEXTURE_CUBE_MAP,v);let he;if(Ie){B&&me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,He.width,He.height);for(let Q=0;Q<6;Q++){he=Me[Q].mipmaps;for(let De=0;De<he.length;De++){let je=he[De];v.format!==fn?pe!==null?B?ve&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De,0,0,je.width,je.height,pe,je.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De,Ke,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De,0,0,je.width,je.height,pe,Se,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De,Ke,je.width,je.height,0,pe,Se,je.data)}}}else{if(he=v.mipmaps,B&&me){he.length>0&&Ae++;let Q=ut(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ke,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(fe){B?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Me[Q].width,Me[Q].height,pe,Se,Me[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ke,Me[Q].width,Me[Q].height,0,pe,Se,Me[Q].data);for(let De=0;De<he.length;De++){let pt=he[De].image[Q].image;B?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De+1,0,0,pt.width,pt.height,pe,Se,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De+1,Ke,pt.width,pt.height,0,pe,Se,pt.data)}}else{B?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,pe,Se,Me[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ke,pe,Se,Me[Q]);for(let De=0;De<he.length;De++){let je=he[De];B?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De+1,0,0,pe,Se,je.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,De+1,Ke,pe,Se,je.image[Q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),Z.__version=ae.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function X(I,v,H,J,ae,Z){let Fe=r.convert(H.format,H.colorSpace),_e=r.convert(H.type),Ue=w(H.internalFormat,Fe,_e,H.colorSpace),Ie=n.get(v),fe=n.get(H);if(fe.__renderTarget=v,!Ie.__hasExternalTextures){let Me=Math.max(1,v.width>>Z),He=Math.max(1,v.height>>Z);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,Z,Ue,Me,He,v.depth,0,Fe,_e,null):t.texImage2D(ae,Z,Ue,Me,He,0,Fe,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),oe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,ae,fe.__webglTexture,0,qe(v)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,ae,fe.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(I,v,H){if(i.bindRenderbuffer(i.RENDERBUFFER,I),v.depthBuffer){let J=v.depthTexture,ae=J&&J.isDepthTexture?J.type:null,Z=y(v.stencilBuffer,ae),Fe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=qe(v);oe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,Z,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,Z,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Z,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Fe,i.RENDERBUFFER,I)}else{let J=v.textures;for(let ae=0;ae<J.length;ae++){let Z=J[ae],Fe=r.convert(Z.format,Z.colorSpace),_e=r.convert(Z.type),Ue=w(Z.internalFormat,Fe,_e,Z.colorSpace),Ie=qe(v);H&&oe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,Ue,v.width,v.height):oe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,Ue,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Ue,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(I,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=n.get(v.depthTexture);J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);let ae=J.__webglTexture,Z=qe(v);if(v.depthTexture.format===Ts)oe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(v.depthTexture.format===Ws)oe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Ne(I){let v=n.get(I),H=I.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==I.depthTexture){let J=I.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),J){let ae=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,J.removeEventListener("dispose",ae)};J.addEventListener("dispose",ae),v.__depthDisposeCallback=ae}v.__boundDepthTexture=J}if(I.depthTexture&&!v.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let J=I.texture.mipmaps;J&&J.length>0?ce(v.__webglFramebuffer[0],I):ce(v.__webglFramebuffer,I)}else if(H){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]===void 0)v.__webglDepthbuffer[J]=i.createRenderbuffer(),ee(v.__webglDepthbuffer[J],I,!1);else{let ae=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Z)}}else{let J=I.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ee(v.__webglDepthbuffer,I,!1);else{let ae=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,Z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(I,v,H){let J=n.get(I);v!==void 0&&X(J.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ne(I)}function P(I){let v=I.texture,H=n.get(I),J=n.get(v);I.addEventListener("dispose",E);let ae=I.textures,Z=I.isWebGLCubeRenderTarget===!0,Fe=ae.length>1;if(Fe||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=v.version,o.memory.textures++),Z){H.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer[_e]=[];for(let Ue=0;Ue<v.mipmaps.length;Ue++)H.__webglFramebuffer[_e][Ue]=i.createFramebuffer()}else H.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer=[];for(let _e=0;_e<v.mipmaps.length;_e++)H.__webglFramebuffer[_e]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Fe)for(let _e=0,Ue=ae.length;_e<Ue;_e++){let Ie=n.get(ae[_e]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&oe(I)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let _e=0;_e<ae.length;_e++){let Ue=ae[_e];H.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[_e]);let Ie=r.convert(Ue.format,Ue.colorSpace),fe=r.convert(Ue.type),Me=w(Ue.internalFormat,Ie,fe,Ue.colorSpace,I.isXRRenderTarget===!0),He=qe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Me,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,H.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ee(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Le(i.TEXTURE_CUBE_MAP,v);for(let _e=0;_e<6;_e++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ue=0;Ue<v.mipmaps.length;Ue++)X(H.__webglFramebuffer[_e][Ue],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ue);else X(H.__webglFramebuffer[_e],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let _e=0,Ue=ae.length;_e<Ue;_e++){let Ie=ae[_e],fe=n.get(Ie),Me=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Me=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,fe.__webglTexture),Le(Me,Ie),X(H.__webglFramebuffer,I,Ie,i.COLOR_ATTACHMENT0+_e,Me,0),m(Ie)&&p(Me)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(_e=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,J.__webglTexture),Le(_e,v),v.mipmaps&&v.mipmaps.length>0)for(let Ue=0;Ue<v.mipmaps.length;Ue++)X(H.__webglFramebuffer[Ue],I,v,i.COLOR_ATTACHMENT0,_e,Ue);else X(H.__webglFramebuffer,I,v,i.COLOR_ATTACHMENT0,_e,0);m(v)&&p(_e),t.unbindTexture()}I.depthBuffer&&Ne(I)}function Xe(I){let v=I.textures;for(let H=0,J=v.length;H<J;H++){let ae=v[H];if(m(ae)){let Z=T(I),Fe=n.get(ae).__webglTexture;t.bindTexture(Z,Fe),p(Z),t.unbindTexture()}}}let ze=[],ke=[];function be(I){if(I.samples>0){if(oe(I)===!1){let v=I.textures,H=I.width,J=I.height,ae=i.COLOR_BUFFER_BIT,Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Fe=n.get(I),_e=v.length>1;if(_e)for(let Ie=0;Ie<v.length;Ie++)t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);let Ue=I.texture.mipmaps;Ue&&Ue.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ie=0;Ie<v.length;Ie++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);let fe=n.get(v[Ie]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,fe,0)}i.blitFramebuffer(0,0,H,J,0,0,H,J,ae,i.NEAREST),c===!0&&(ze.length=0,ke.length=0,ze.push(i.COLOR_ATTACHMENT0+Ie),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ze.push(Z),ke.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let Ie=0;Ie<v.length;Ie++){t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ie]);let fe=n.get(v[Ie]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){let v=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function qe(I){return Math.min(s.maxSamples,I.samples)}function oe(I){let v=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function de(I){let v=o.render.frame;h.get(I)!==v&&(h.set(I,v),I.update())}function lt(I,v){let H=I.colorSpace,J=I.format,ae=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==zt&&H!==di&&(ht.getTransfer(H)===yt?(J!==fn||ae!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),v}function ut(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.setTexture2D=K,this.setTexture2DArray=j,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=nt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=X,this.useMultisampledRTT=oe}function N_(i,e){function t(n,s=di){let r,o=ht.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===oa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Kl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$l)return i.BYTE;if(n===Zl)return i.SHORT;if(n===Vs)return i.UNSIGNED_SHORT;if(n===sa)return i.INT;if(n===Ai)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Hs)return i.HALF_FLOAT;if(n===Ql)return i.ALPHA;if(n===ec)return i.RGB;if(n===fn)return i.RGBA;if(n===Ts)return i.DEPTH_COMPONENT;if(n===Ws)return i.DEPTH_STENCIL;if(n===aa)return i.RED;if(n===la)return i.RED_INTEGER;if(n===tc)return i.RG;if(n===ca)return i.RG_INTEGER;if(n===ha)return i.RGBA_INTEGER;if(n===Gr||n===Wr||n===Xr||n===qr)if(o===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===da||n===fa||n===pa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===_a)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return o===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_a)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xa||n===ya||n===va||n===ba||n===Ma||n===Sa||n===wa||n===Ta||n===Ea||n===Aa||n===Ca||n===Ia||n===Ra||n===Pa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xa)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ya)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===va)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ba)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ma)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Sa)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ta)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ea)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ia)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ra)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pa)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Da||n===Na)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return o===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ua||n===Oa||n===Fa||n===Ba)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ua)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var U_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Rr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:U_,fragmentShader:O_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vt(new Pr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tc=class extends Bn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,_=null,x=typeof XRWebGLBinding<"u",m=new wc,p={},T=t.getContextAttributes(),w=null,y=null,A=[],C=[],E=new Ge,L=null,S=new Pt;S.viewport=new dt;let b=new Pt;b.viewport=new dt;let D=[S,b],z=new Yo,W=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let N=A[U];return N===void 0&&(N=new Ps,A[U]=N),N.getTargetRaySpace()},this.getControllerGrip=function(U){let N=A[U];return N===void 0&&(N=new Ps,A[U]=N),N.getGripSpace()},this.getHand=function(U){let N=A[U];return N===void 0&&(N=new Ps,A[U]=N),N.getHandSpace()};function K(U){let N=C.indexOf(U.inputSource);if(N===-1)return;let X=A[N];X!==void 0&&(X.update(U.inputSource,U.frame,l||o),X.dispatchEvent({type:U.type,data:U.inputSource}))}function j(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",$);for(let U=0;U<A.length;U++){let N=C[U];N!==null&&(C[U]=null,A[U].disconnect(N))}W=null,Y=null,m.reset();for(let U in p)delete p[U];e.setRenderTarget(w),d=null,f=null,u=null,s=null,y=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(U){if(s=U,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",j),s.addEventListener("inputsourceschange",$),T.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let X=null,ee=null,ce=null;T.depth&&(ce=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=T.stencil?Ws:Ts,ee=T.stencil?Gs:Ai);let Ne={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ne),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new kn(f.textureWidth,f.textureHeight,{format:fn,type:Nn,depthTexture:new Ir(f.textureWidth,f.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let X={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,X),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new kn(d.framebufferWidth,d.framebufferHeight,{format:fn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),se.setContext(s),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(U){for(let N=0;N<U.removed.length;N++){let X=U.removed[N],ee=C.indexOf(X);ee>=0&&(C[ee]=null,A[ee].disconnect(X))}for(let N=0;N<U.added.length;N++){let X=U.added[N],ee=C.indexOf(X);if(ee===-1){for(let Ne=0;Ne<A.length;Ne++)if(Ne>=C.length){C.push(X),ee=Ne;break}else if(C[Ne]===null){C[Ne]=X,ee=Ne;break}if(ee===-1)break}let ce=A[ee];ce&&ce.connect(X)}}let V=new O,ie=new O;function re(U,N,X){V.setFromMatrixPosition(N.matrixWorld),ie.setFromMatrixPosition(X.matrixWorld);let ee=V.distanceTo(ie),ce=N.projectionMatrix.elements,Ne=X.projectionMatrix.elements,nt=ce[14]/(ce[10]-1),P=ce[14]/(ce[10]+1),Xe=(ce[9]+1)/ce[5],ze=(ce[9]-1)/ce[5],ke=(ce[8]-1)/ce[0],be=(Ne[8]+1)/Ne[0],qe=nt*ke,oe=nt*be,de=ee/(-ke+be),lt=de*-ke;if(N.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(lt),U.translateZ(de),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),ce[10]===-1)U.projectionMatrix.copy(N.projectionMatrix),U.projectionMatrixInverse.copy(N.projectionMatrixInverse);else{let ut=nt+de,I=P+de,v=qe-lt,H=oe+(ee-lt),J=Xe*P/I*ut,ae=ze*P/I*ut;U.projectionMatrix.makePerspective(v,H,J,ae,ut,I),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function ye(U,N){N===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(N.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(s===null)return;let N=U.near,X=U.far;m.texture!==null&&(m.depthNear>0&&(N=m.depthNear),m.depthFar>0&&(X=m.depthFar)),z.near=b.near=S.near=N,z.far=b.far=S.far=X,(W!==z.near||Y!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),W=z.near,Y=z.far),z.layers.mask=U.layers.mask|6,S.layers.mask=z.layers.mask&3,b.layers.mask=z.layers.mask&5;let ee=U.parent,ce=z.cameras;ye(z,ee);for(let Ne=0;Ne<ce.length;Ne++)ye(ce[Ne],ee);ce.length===2?re(z,S,b):z.projectionMatrix.copy(S.projectionMatrix),Le(U,z,ee)};function Le(U,N,X){X===null?U.matrix.copy(N.matrixWorld):(U.matrix.copy(X.matrixWorld),U.matrix.invert(),U.matrix.multiply(N.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(N.projectionMatrix),U.projectionMatrixInverse.copy(N.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Wi*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(U){c=U,f!==null&&(f.fixedFoveation=U),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=U)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(U){return p[U]};let tt=null;function ot(U,N){if(h=N.getViewerPose(l||o),_=N,h!==null){let X=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let ee=!1;X.length!==z.cameras.length&&(z.cameras.length=0,ee=!0);for(let P=0;P<X.length;P++){let Xe=X[P],ze=null;if(d!==null)ze=d.getViewport(Xe);else{let be=u.getViewSubImage(f,Xe);ze=be.viewport,P===0&&(e.setRenderTargetTextures(y,be.colorTexture,be.depthStencilTexture),e.setRenderTarget(y))}let ke=D[P];ke===void 0&&(ke=new Pt,ke.layers.enable(P),ke.viewport=new dt,D[P]=ke),ke.matrix.fromArray(Xe.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Xe.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(ze.x,ze.y,ze.width,ze.height),P===0&&(z.matrix.copy(ke.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ee===!0&&z.cameras.push(ke)}let ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let P=u.getDepthInformation(X[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(ce&&ce.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<X.length;P++){let Xe=X[P].camera;if(Xe){let ze=p[Xe];ze||(ze=new Rr,p[Xe]=ze);let ke=u.getCameraImage(Xe);ze.sourceTexture=ke}}}}for(let X=0;X<A.length;X++){let ee=C[X],ce=A[X];ee!==null&&ce!==void 0&&ce.update(ee,N,l||o)}tt&&tt(U,N),N.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:N}),_=null}let se=new vd;se.setAnimationLoop(ot),this.setAnimationLoop=function(U){tt=U},this.dispose=function(){}}},ts=new Rn,F_=new Je;function B_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,lc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,w,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,T,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let T=e.get(p),w=T.envMap,y=T.envMapRotation;w&&(m.envMap.value=w,ts.copy(y),ts.x*=-1,ts.y*=-1,ts.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),m.envMapRotation.value.setFromMatrix4(F_.makeRotationFromEuler(ts)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,T,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function k_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,w){let y=w.program;n.uniformBlockBinding(T,y)}function l(T,w){let y=s[T.id];y===void 0&&(_(T),y=h(T),s[T.id]=y,T.addEventListener("dispose",m));let A=w.program;n.updateUBOMapping(T,A);let C=e.render.frame;r[T.id]!==C&&(f(T),r[T.id]=C)}function h(T){let w=u();T.__bindingPointIndex=w;let y=i.createBuffer(),A=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,y),y}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){let w=s[T.id],y=T.uniforms,A=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let C=0,E=y.length;C<E;C++){let L=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,b=L.length;S<b;S++){let D=L[S];if(d(D,C,S,A)===!0){let z=D.__offset,W=Array.isArray(D.value)?D.value:[D.value],Y=0;for(let K=0;K<W.length;K++){let j=W[K],$=x(j);typeof j=="number"||typeof j=="boolean"?(D.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,z+Y,D.__data)):j.isMatrix3?(D.__data[0]=j.elements[0],D.__data[1]=j.elements[1],D.__data[2]=j.elements[2],D.__data[3]=0,D.__data[4]=j.elements[3],D.__data[5]=j.elements[4],D.__data[6]=j.elements[5],D.__data[7]=0,D.__data[8]=j.elements[6],D.__data[9]=j.elements[7],D.__data[10]=j.elements[8],D.__data[11]=0):(j.toArray(D.__data,Y),Y+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,w,y,A){let C=T.value,E=w+"_"+y;if(A[E]===void 0)return typeof C=="number"||typeof C=="boolean"?A[E]=C:A[E]=C.clone(),!0;{let L=A[E];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return A[E]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function _(T){let w=T.uniforms,y=0,A=16;for(let E=0,L=w.length;E<L;E++){let S=Array.isArray(w[E])?w[E]:[w[E]];for(let b=0,D=S.length;b<D;b++){let z=S[b],W=Array.isArray(z.value)?z.value:[z.value];for(let Y=0,K=W.length;Y<K;Y++){let j=W[Y],$=x(j),V=y%A,ie=V%$.boundary,re=V+ie;y+=ie,re!==0&&A-re<$.storage&&(y+=A-re),z.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=$.storage}}}let C=y%A;return C>0&&(y+=A-C),T.__size=y,T.__cache={},this}function x(T){let w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),w}function m(T){let w=T.target;w.removeEventListener("dispose",m);let y=o.indexOf(w.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(let T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Ga=class{constructor(e={}){let{canvas:t=Xu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let _=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,T=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,A=!1;this._outputColorSpace=It;let C=0,E=0,L=null,S=-1,b=null,D=new dt,z=new dt,W=null,Y=new Ye(0),K=0,j=t.width,$=t.height,V=1,ie=null,re=null,ye=new dt(0,0,j,$),Le=new dt(0,0,j,$),tt=!1,ot=new Us,se=!1,U=!1,N=new Je,X=new O,ee=new dt,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function nt(){return L===null?V:1}let P=n;function Xe(M,F){return t.getContext(M,F)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",he,!1),P===null){let F="webgl2";if(P=Xe(F,M),P===null)throw Xe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ze,ke,be,qe,oe,de,lt,ut,I,v,H,J,ae,Z,Fe,_e,Ue,Ie,fe,Me,He,pe,Se,Ke;function B(){ze=new i0(P),ze.init(),pe=new N_(P,ze),ke=new Zg(P,ze,e,pe),be=new L_(P,ze),ke.reversedDepthBuffer&&f&&be.buffers.depth.setReversed(!0),qe=new o0(P),oe=new y_,de=new D_(P,ze,be,oe,ke,pe,qe),lt=new Jg(y),ut=new n0(y),I=new dp(P),Se=new jg(P,I),v=new s0(P,I,qe,Se),H=new l0(P,v,I,qe),fe=new a0(P,ke,de),_e=new Kg(oe),J=new x_(y,lt,ut,ze,ke,Se,_e),ae=new B_(y,oe),Z=new b_,Fe=new A_(ze),Ie=new Yg(y,lt,ut,be,H,d,c),Ue=new R_(y,H,ke),Ke=new k_(P,qe,ke,be),Me=new $g(P,ze,qe),He=new r0(P,ze,qe),qe.programs=J.programs,y.capabilities=ke,y.extensions=ze,y.properties=oe,y.renderLists=Z,y.shadowMap=Ue,y.state=be,y.info=qe}B();let me=new Tc(y,P);this.xr=me,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let M=ze.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ze.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(j,$,!1))},this.getSize=function(M){return M.set(j,$)},this.setSize=function(M,F,G=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=M,$=F,t.width=Math.floor(M*V),t.height=Math.floor(F*V),G===!0&&(t.style.width=M+"px",t.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(j*V,$*V).floor()},this.setDrawingBufferSize=function(M,F,G){j=M,$=F,V=G,t.width=Math.floor(M*G),t.height=Math.floor(F*G),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(D)},this.getViewport=function(M){return M.copy(ye)},this.setViewport=function(M,F,G,q){M.isVector4?ye.set(M.x,M.y,M.z,M.w):ye.set(M,F,G,q),be.viewport(D.copy(ye).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(Le)},this.setScissor=function(M,F,G,q){M.isVector4?Le.set(M.x,M.y,M.z,M.w):Le.set(M,F,G,q),be.scissor(z.copy(Le).multiplyScalar(V).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(M){be.setScissorTest(tt=M)},this.setOpaqueSort=function(M){ie=M},this.setTransparentSort=function(M){re=M},this.getClearColor=function(M){return M.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,G=!0){let q=0;if(M){let k=!1;if(L!==null){let le=L.texture.format;k=le===ha||le===ca||le===la}if(k){let le=L.texture.type,ge=le===Nn||le===Ai||le===Vs||le===Gs||le===ra||le===oa,Re=Ie.getClearColor(),Ee=Ie.getClearAlpha(),Ce=Re.r,We=Re.g,Pe=Re.b;ge?(_[0]=Ce,_[1]=We,_[2]=Pe,_[3]=Ee,P.clearBufferuiv(P.COLOR,0,_)):(x[0]=Ce,x[1]=We,x[2]=Pe,x[3]=Ee,P.clearBufferiv(P.COLOR,0,x))}else q|=P.COLOR_BUFFER_BIT}F&&(q|=P.DEPTH_BUFFER_BIT),G&&(q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",he,!1),Ie.dispose(),Z.dispose(),Fe.dispose(),oe.dispose(),lt.dispose(),ut.dispose(),H.dispose(),Se.dispose(),Ke.dispose(),J.dispose(),me.dispose(),me.removeEventListener("sessionstart",qt),me.removeEventListener("sessionend",eo),$n.stop()};function ve(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let M=qe.autoReset,F=Ue.enabled,G=Ue.autoUpdate,q=Ue.needsUpdate,k=Ue.type;B(),qe.autoReset=M,Ue.enabled=F,Ue.autoUpdate=G,Ue.needsUpdate=q,Ue.type=k}function he(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Q(M){let F=M.target;F.removeEventListener("dispose",Q),De(F)}function De(M){je(M),oe.remove(M)}function je(M){let F=oe.get(M).programs;F!==void 0&&(F.forEach(function(G){J.releaseProgram(G)}),M.isShaderMaterial&&J.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,G,q,k,le){F===null&&(F=ce);let ge=k.isMesh&&k.matrixWorld.determinant()<0,Re=Zn(M,F,G,q,k);be.setMaterial(q,ge);let Ee=G.index,Ce=1;if(q.wireframe===!0){if(Ee=v.getWireframeAttribute(G),Ee===void 0)return;Ce=2}let We=G.drawRange,Pe=G.attributes.position,$e=We.start*Ce,mt=(We.start+We.count)*Ce;le!==null&&($e=Math.max($e,le.start*Ce),mt=Math.min(mt,(le.start+le.count)*Ce)),Ee!==null?($e=Math.max($e,0),mt=Math.min(mt,Ee.count)):Pe!=null&&($e=Math.max($e,0),mt=Math.min(mt,Pe.count));let St=mt-$e;if(St<0||St===1/0)return;Se.setup(k,q,Re,G,Ee);let bt,et=Me;if(Ee!==null&&(bt=I.get(Ee),et=He,et.setIndex(bt)),k.isMesh)q.wireframe===!0?(be.setLineWidth(q.wireframeLinewidth*nt()),et.setMode(P.LINES)):et.setMode(P.TRIANGLES);else if(k.isLine){let Oe=q.linewidth;Oe===void 0&&(Oe=1),be.setLineWidth(Oe*nt()),k.isLineSegments?et.setMode(P.LINES):k.isLineLoop?et.setMode(P.LINE_LOOP):et.setMode(P.LINE_STRIP)}else k.isPoints?et.setMode(P.POINTS):k.isSprite&&et.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)As("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))et.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Oe=k._multiDrawStarts,wt=k._multiDrawCounts,Be=k._multiDrawCount,gt=Ee?I.get(Ee).bytesPerElement:1,Kn=oe.get(q).currentProgram.getUniforms();for(let Et=0;Et<Be;Et++)Kn.setValue(P,"_gl_DrawID",Et),et.render(Oe[Et]/gt,wt[Et])}else if(k.isInstancedMesh)et.renderInstances($e,St,k.count);else if(G.isInstancedBufferGeometry){let Oe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,wt=Math.min(G.instanceCount,Oe);et.renderInstances($e,St,wt)}else et.render($e,St)};function pt(M,F,G){M.transparent===!0&&M.side===xn&&M.forceSinglePass===!1?(M.side=Qt,M.needsUpdate=!0,Li(M,F,G),M.side=In,M.needsUpdate=!0,Li(M,F,G),M.side=xn):Li(M,F,G)}this.compile=function(M,F,G=null){G===null&&(G=M),p=Fe.get(G),p.init(F),w.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),M!==G&&M.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let q=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let le=k.material;if(le)if(Array.isArray(le))for(let ge=0;ge<le.length;ge++){let Re=le[ge];pt(Re,G,k),q.add(Re)}else pt(le,G,k),q.add(le)}),p=w.pop(),q},this.compileAsync=function(M,F,G=null){let q=this.compile(M,F,G);return new Promise(k=>{function le(){if(q.forEach(function(ge){oe.get(ge).currentProgram.isReady()&&q.delete(ge)}),q.size===0){k(M);return}setTimeout(le,10)}ze.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let st=null;function mn(M){st&&st(M)}function qt(){$n.stop()}function eo(){$n.start()}let $n=new vd;$n.setAnimationLoop(mn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(M){st=M,me.setAnimationLoop(M),M===null?$n.stop():$n.start()},me.addEventListener("sessionstart",qt),me.addEventListener("sessionend",eo),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(F),F=me.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,F,L),p=Fe.get(M,w.length),p.init(F),w.push(p),N.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ot.setFromProjectionMatrix(N,En,F.reversedDepth),U=this.localClippingEnabled,se=_e.init(this.clippingPlanes,U),m=Z.get(M,T.length),m.init(),T.push(m),me.enabled===!0&&me.isPresenting===!0){let le=y.xr.getDepthSensingMesh();le!==null&&Qs(le,F,-1/0,y.sortObjects)}Qs(M,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ie,re),Ne=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,Ne&&Ie.addToRenderList(m,M),this.info.render.frame++,se===!0&&_e.beginShadows();let G=p.state.shadowsArray;Ue.render(G,M,F),se===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,k=m.transmissive;if(p.setupLights(),F.isArrayCamera){let le=F.cameras;if(k.length>0)for(let ge=0,Re=le.length;ge<Re;ge++){let Ee=le[ge];er(q,k,M,Ee)}Ne&&Ie.render(M);for(let ge=0,Re=le.length;ge<Re;ge++){let Ee=le[ge];Pi(m,M,Ee,Ee.viewport)}}else k.length>0&&er(q,k,M,F),Ne&&Ie.render(M),Pi(m,M,F);L!==null&&E===0&&(de.updateMultisampleRenderTarget(L),de.updateRenderTargetMipmap(L)),M.isScene===!0&&M.onAfterRender(y,M,F),Se.resetDefaultState(),S=-1,b=null,w.pop(),w.length>0?(p=w[w.length-1],se===!0&&_e.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Qs(M,F,G,q){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ot.intersectsSprite(M)){q&&ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(N);let ge=H.update(M),Re=M.material;Re.visible&&m.push(M,ge,Re,G,ee.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ot.intersectsObject(M))){let ge=H.update(M),Re=M.material;if(q&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ee.copy(M.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ee.copy(ge.boundingSphere.center)),ee.applyMatrix4(M.matrixWorld).applyMatrix4(N)),Array.isArray(Re)){let Ee=ge.groups;for(let Ce=0,We=Ee.length;Ce<We;Ce++){let Pe=Ee[Ce],$e=Re[Pe.materialIndex];$e&&$e.visible&&m.push(M,ge,$e,G,ee.z,Pe)}}else Re.visible&&m.push(M,ge,Re,G,ee.z,null)}}let le=M.children;for(let ge=0,Re=le.length;ge<Re;ge++)Qs(le[ge],F,G,q)}function Pi(M,F,G,q){let k=M.opaque,le=M.transmissive,ge=M.transparent;p.setupLightsView(G),se===!0&&_e.setGlobalState(y.clippingPlanes,G),q&&be.viewport(D.copy(q)),k.length>0&&bn(k,F,G),le.length>0&&bn(le,F,G),ge.length>0&&bn(ge,F,G),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function er(M,F,G,q){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new kn(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Hs:Nn,minFilter:Dn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace}));let le=p.state.transmissionRenderTarget[q.id],ge=q.viewport||D;le.setSize(ge.z*y.transmissionResolutionScale,ge.w*y.transmissionResolutionScale);let Re=y.getRenderTarget(),Ee=y.getActiveCubeFace(),Ce=y.getActiveMipmapLevel();y.setRenderTarget(le),y.getClearColor(Y),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Ne&&Ie.render(G);let We=y.toneMapping;y.toneMapping=ui;let Pe=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),se===!0&&_e.setGlobalState(y.clippingPlanes,q),bn(M,G,q),de.updateMultisampleRenderTarget(le),de.updateRenderTargetMipmap(le),ze.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let mt=0,St=F.length;mt<St;mt++){let bt=F[mt],et=bt.object,Oe=bt.geometry,wt=bt.material,Be=bt.group;if(wt.side===xn&&et.layers.test(q.layers)){let gt=wt.side;wt.side=Qt,wt.needsUpdate=!0,to(et,G,q,Oe,wt,Be),wt.side=gt,wt.needsUpdate=!0,$e=!0}}$e===!0&&(de.updateMultisampleRenderTarget(le),de.updateRenderTargetMipmap(le))}y.setRenderTarget(Re,Ee,Ce),y.setClearColor(Y,K),Pe!==void 0&&(q.viewport=Pe),y.toneMapping=We}function bn(M,F,G){let q=F.isScene===!0?F.overrideMaterial:null;for(let k=0,le=M.length;k<le;k++){let ge=M[k],Re=ge.object,Ee=ge.geometry,Ce=ge.group,We=ge.material;We.allowOverride===!0&&q!==null&&(We=q),Re.layers.test(G.layers)&&to(Re,F,G,Ee,We,Ce)}}function to(M,F,G,q,k,le){M.onBeforeRender(y,F,G,q,k,le),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(y,F,G,q,M,le),k.transparent===!0&&k.side===xn&&k.forceSinglePass===!1?(k.side=Qt,k.needsUpdate=!0,y.renderBufferDirect(G,F,q,k,M,le),k.side=In,k.needsUpdate=!0,y.renderBufferDirect(G,F,q,k,M,le),k.side=xn):y.renderBufferDirect(G,F,q,k,M,le),M.onAfterRender(y,F,G,q,k,le)}function Li(M,F,G){F.isScene!==!0&&(F=ce);let q=oe.get(M),k=p.state.lights,le=p.state.shadowsArray,ge=k.state.version,Re=J.getParameters(M,k.state,le,F,G),Ee=J.getProgramCacheKey(Re),Ce=q.programs;q.environment=M.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(M.isMeshStandardMaterial?ut:lt).get(M.envMap||q.environment),q.envMapRotation=q.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",Q),Ce=new Map,q.programs=Ce);let We=Ce.get(Ee);if(We!==void 0){if(q.currentProgram===We&&q.lightsStateVersion===ge)return ft(M,Re),We}else Re.uniforms=J.getUniforms(M),M.onBeforeCompile(Re,y),We=J.acquireProgram(Re,Ee),Ce.set(Ee,We),q.uniforms=Re.uniforms;let Pe=q.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=_e.uniform),ft(M,Re),q.needsLights=nr(M),q.lightsStateVersion=ge,q.needsLights&&(Pe.ambientLightColor.value=k.state.ambient,Pe.lightProbe.value=k.state.probe,Pe.directionalLights.value=k.state.directional,Pe.directionalLightShadows.value=k.state.directionalShadow,Pe.spotLights.value=k.state.spot,Pe.spotLightShadows.value=k.state.spotShadow,Pe.rectAreaLights.value=k.state.rectArea,Pe.ltc_1.value=k.state.rectAreaLTC1,Pe.ltc_2.value=k.state.rectAreaLTC2,Pe.pointLights.value=k.state.point,Pe.pointLightShadows.value=k.state.pointShadow,Pe.hemisphereLights.value=k.state.hemi,Pe.directionalShadowMap.value=k.state.directionalShadowMap,Pe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Pe.spotShadowMap.value=k.state.spotShadowMap,Pe.spotLightMatrix.value=k.state.spotLightMatrix,Pe.spotLightMap.value=k.state.spotLightMap,Pe.pointShadowMap.value=k.state.pointShadowMap,Pe.pointShadowMatrix.value=k.state.pointShadowMatrix),q.currentProgram=We,q.uniformsList=null,We}function tr(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=js.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function ft(M,F){let G=oe.get(M);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Zn(M,F,G,q,k){F.isScene!==!0&&(F=ce),de.resetTextureUnits();let le=F.fog,ge=q.isMeshStandardMaterial?F.environment:null,Re=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:zt,Ee=(q.isMeshStandardMaterial?ut:lt).get(q.envMap||ge),Ce=q.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,We=!!G.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Pe=!!G.morphAttributes.position,$e=!!G.morphAttributes.normal,mt=!!G.morphAttributes.color,St=ui;q.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(St=y.toneMapping);let bt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,et=bt!==void 0?bt.length:0,Oe=oe.get(q),wt=p.state.lights;if(se===!0&&(U===!0||M!==b)){let Bt=M===b&&q.id===S;_e.setState(q,M,Bt)}let Be=!1;q.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==wt.state.version||Oe.outputColorSpace!==Re||k.isBatchedMesh&&Oe.batching===!1||!k.isBatchedMesh&&Oe.batching===!0||k.isBatchedMesh&&Oe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Oe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Oe.instancing===!1||!k.isInstancedMesh&&Oe.instancing===!0||k.isSkinnedMesh&&Oe.skinning===!1||!k.isSkinnedMesh&&Oe.skinning===!0||k.isInstancedMesh&&Oe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Oe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Oe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Oe.instancingMorph===!1&&k.morphTexture!==null||Oe.envMap!==Ee||q.fog===!0&&Oe.fog!==le||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==_e.numPlanes||Oe.numIntersection!==_e.numIntersection)||Oe.vertexAlphas!==Ce||Oe.vertexTangents!==We||Oe.morphTargets!==Pe||Oe.morphNormals!==$e||Oe.morphColors!==mt||Oe.toneMapping!==St||Oe.morphTargetsCount!==et)&&(Be=!0):(Be=!0,Oe.__version=q.version);let gt=Oe.currentProgram;Be===!0&&(gt=Li(q,F,k));let Kn=!1,Et=!1,Jn=!1,_t=gt.getUniforms(),Yt=Oe.uniforms;if(be.useProgram(gt.program)&&(Kn=!0,Et=!0,Jn=!0),q.id!==S&&(S=q.id,Et=!0),Kn||b!==M){be.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),_t.setValue(P,"projectionMatrix",M.projectionMatrix),_t.setValue(P,"viewMatrix",M.matrixWorldInverse);let Ht=_t.map.cameraPosition;Ht!==void 0&&Ht.setValue(P,X.setFromMatrixPosition(M.matrixWorld)),ke.logarithmicDepthBuffer&&_t.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&_t.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,Et=!0,Jn=!0)}if(k.isSkinnedMesh){_t.setOptional(P,k,"bindMatrix"),_t.setOptional(P,k,"bindMatrixInverse");let Bt=k.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),_t.setValue(P,"boneTexture",Bt.boneTexture,de))}k.isBatchedMesh&&(_t.setOptional(P,k,"batchingTexture"),_t.setValue(P,"batchingTexture",k._matricesTexture,de),_t.setOptional(P,k,"batchingIdTexture"),_t.setValue(P,"batchingIdTexture",k._indirectTexture,de),_t.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&_t.setValue(P,"batchingColorTexture",k._colorsTexture,de));let nn=G.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&fe.update(k,G,gt),(Et||Oe.receiveShadow!==k.receiveShadow)&&(Oe.receiveShadow=k.receiveShadow,_t.setValue(P,"receiveShadow",k.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Yt.envMap.value=Ee,Yt.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(Yt.envMapIntensity.value=F.environmentIntensity),Et&&(_t.setValue(P,"toneMappingExposure",y.toneMappingExposure),Oe.needsLights&&ls(Yt,Jn),le&&q.fog===!0&&ae.refreshFogUniforms(Yt,le),ae.refreshMaterialUniforms(Yt,q,V,$,p.state.transmissionRenderTarget[M.id]),js.upload(P,tr(Oe),Yt,de)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(js.upload(P,tr(Oe),Yt,de),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&_t.setValue(P,"center",k.center),_t.setValue(P,"modelViewMatrix",k.modelViewMatrix),_t.setValue(P,"normalMatrix",k.normalMatrix),_t.setValue(P,"modelMatrix",k.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Bt=q.uniformsGroups;for(let Ht=0,ir=Bt.length;Ht<ir;Ht++){let Un=Bt[Ht];Ke.update(Un,gt),Ke.bind(Un,gt)}}return gt}function ls(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function nr(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(M,F,G){let q=oe.get(M);q.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),oe.get(M.texture).__webglTexture=F,oe.get(M.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:G,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){let G=oe.get(M);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};let pi=P.createFramebuffer();this.setRenderTarget=function(M,F=0,G=0){L=M,C=F,E=G;let q=!0,k=null,le=!1,ge=!1;if(M){let Ee=oe.get(M);if(Ee.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(P.FRAMEBUFFER,null),q=!1;else if(Ee.__webglFramebuffer===void 0)de.setupRenderTarget(M);else if(Ee.__hasExternalTextures)de.rebindTextures(M,oe.get(M.texture).__webglTexture,oe.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Pe=M.depthTexture;if(Ee.__boundDepthTexture!==Pe){if(Pe!==null&&oe.has(Pe)&&(M.width!==Pe.image.width||M.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(M)}}let Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ge=!0);let We=oe.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(We[F])?k=We[F][G]:k=We[F],le=!0):M.samples>0&&de.useMultisampledRTT(M)===!1?k=oe.get(M).__webglMultisampledFramebuffer:Array.isArray(We)?k=We[G]:k=We,D.copy(M.viewport),z.copy(M.scissor),W=M.scissorTest}else D.copy(ye).multiplyScalar(V).floor(),z.copy(Le).multiplyScalar(V).floor(),W=tt;if(G!==0&&(k=pi),be.bindFramebuffer(P.FRAMEBUFFER,k)&&q&&be.drawBuffers(M,k),be.viewport(D),be.scissor(z),be.setScissorTest(W),le){let Ee=oe.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ee.__webglTexture,G)}else if(ge){let Ee=F;for(let Ce=0;Ce<M.textures.length;Ce++){let We=oe.get(M.textures[Ce]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ce,We.__webglTexture,G,Ee)}}else if(M!==null&&G!==0){let Ee=oe.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ee.__webglTexture,G)}S=-1},this.readRenderTargetPixels=function(M,F,G,q,k,le,ge,Re=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=oe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){be.bindFramebuffer(P.FRAMEBUFFER,Ee);try{let Ce=M.textures[Re],We=Ce.format,Pe=Ce.type;if(!ke.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-q&&G>=0&&G<=M.height-k&&(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(F,G,q,k,pe.convert(We),pe.convert(Pe),le))}finally{let Ce=L!==null?oe.get(L).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(M,F,G,q,k,le,ge,Re=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=oe.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee)if(F>=0&&F<=M.width-q&&G>=0&&G<=M.height-k){be.bindFramebuffer(P.FRAMEBUFFER,Ee);let Ce=M.textures[Re],We=Ce.format,Pe=Ce.type;if(!ke.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $e=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,$e),P.bufferData(P.PIXEL_PACK_BUFFER,le.byteLength,P.STREAM_READ),M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(F,G,q,k,pe.convert(We),pe.convert(Pe),0);let mt=L!==null?oe.get(L).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,mt);let St=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await qu(P,St,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,$e),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,le),P.deleteBuffer($e),P.deleteSync(St),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,G=0){let q=Math.pow(2,-G),k=Math.floor(M.image.width*q),le=Math.floor(M.image.height*q),ge=F!==null?F.x:0,Re=F!==null?F.y:0;de.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,ge,Re,k,le),be.unbindTexture()};let ue=P.createFramebuffer(),Te=P.createFramebuffer();this.copyTextureToTexture=function(M,F,G=null,q=null,k=0,le=null){le===null&&(k!==0?(As("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=k,k=0):le=0);let ge,Re,Ee,Ce,We,Pe,$e,mt,St,bt=M.isCompressedTexture?M.mipmaps[le]:M.image;if(G!==null)ge=G.max.x-G.min.x,Re=G.max.y-G.min.y,Ee=G.isBox3?G.max.z-G.min.z:1,Ce=G.min.x,We=G.min.y,Pe=G.isBox3?G.min.z:0;else{let nn=Math.pow(2,-k);ge=Math.floor(bt.width*nn),Re=Math.floor(bt.height*nn),M.isDataArrayTexture?Ee=bt.depth:M.isData3DTexture?Ee=Math.floor(bt.depth*nn):Ee=1,Ce=0,We=0,Pe=0}q!==null?($e=q.x,mt=q.y,St=q.z):($e=0,mt=0,St=0);let et=pe.convert(F.format),Oe=pe.convert(F.type),wt;F.isData3DTexture?(de.setTexture3D(F,0),wt=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(de.setTexture2DArray(F,0),wt=P.TEXTURE_2D_ARRAY):(de.setTexture2D(F,0),wt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);let Be=P.getParameter(P.UNPACK_ROW_LENGTH),gt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Kn=P.getParameter(P.UNPACK_SKIP_PIXELS),Et=P.getParameter(P.UNPACK_SKIP_ROWS),Jn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,bt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,bt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ce),P.pixelStorei(P.UNPACK_SKIP_ROWS,We),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pe);let _t=M.isDataArrayTexture||M.isData3DTexture,Yt=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){let nn=oe.get(M),Bt=oe.get(F),Ht=oe.get(nn.__renderTarget),ir=oe.get(Bt.__renderTarget);be.bindFramebuffer(P.READ_FRAMEBUFFER,Ht.__webglFramebuffer),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,ir.__webglFramebuffer);for(let Un=0;Un<Ee;Un++)_t&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,oe.get(M).__webglTexture,k,Pe+Un),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,oe.get(F).__webglTexture,le,St+Un)),P.blitFramebuffer(Ce,We,ge,Re,$e,mt,ge,Re,P.DEPTH_BUFFER_BIT,P.NEAREST);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||oe.has(M)){let nn=oe.get(M),Bt=oe.get(F);be.bindFramebuffer(P.READ_FRAMEBUFFER,ue),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,Te);for(let Ht=0;Ht<Ee;Ht++)_t?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,nn.__webglTexture,k,Pe+Ht):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,nn.__webglTexture,k),Yt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,le,St+Ht):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,le),k!==0?P.blitFramebuffer(Ce,We,ge,Re,$e,mt,ge,Re,P.COLOR_BUFFER_BIT,P.NEAREST):Yt?P.copyTexSubImage3D(wt,le,$e,mt,St+Ht,Ce,We,ge,Re):P.copyTexSubImage2D(wt,le,$e,mt,Ce,We,ge,Re);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Yt?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(wt,le,$e,mt,St,ge,Re,Ee,et,Oe,bt.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(wt,le,$e,mt,St,ge,Re,Ee,et,bt.data):P.texSubImage3D(wt,le,$e,mt,St,ge,Re,Ee,et,Oe,bt):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,le,$e,mt,ge,Re,et,Oe,bt.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,le,$e,mt,bt.width,bt.height,et,bt.data):P.texSubImage2D(P.TEXTURE_2D,le,$e,mt,ge,Re,et,Oe,bt);P.pixelStorei(P.UNPACK_ROW_LENGTH,Be),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,gt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Kn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Et),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Jn),le===0&&F.generateMipmaps&&P.generateMipmap(wt),be.unbindTexture()},this.initRenderTarget=function(M){oe.get(M).__webglFramebuffer===void 0&&de.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?de.setTextureCube(M,0):M.isData3DTexture?de.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?de.setTexture2DArray(M,0):de.setTexture2D(M,0),be.unbindTexture()},this.resetState=function(){C=0,E=0,L=null,be.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}};var Td={type:"change"},Cc={type:"start"},Ad={type:"end"},Xa=new zn,Ed=new _n,V_=Math.cos(70*jr.DEG2RAD),Ut=new O,ln=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ac=1e-6,qa=class extends Vr{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ti.ROTATE,MIDDLE:Ti.DOLLY,RIGHT:Ti.PAN},this.touches={ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Kt,this._lastTargetPosition=new O,this._quat=new Kt().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ks,this._sphericalDelta=new ks,this._scale=1,this._panOffset=new O,this._rotateStart=new Ge,this._rotateEnd=new Ge,this._rotateDelta=new Ge,this._panStart=new Ge,this._panEnd=new Ge,this._panDelta=new Ge,this._dollyStart=new Ge,this._dollyEnd=new Ge,this._dollyDelta=new Ge,this._dollyDirection=new O,this._mouse=new Ge,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=G_.bind(this),this._onPointerDown=H_.bind(this),this._onPointerUp=W_.bind(this),this._onContextMenu=K_.bind(this),this._onMouseWheel=Y_.bind(this),this._onKeyDown=j_.bind(this),this._onTouchStart=$_.bind(this),this._onTouchMove=Z_.bind(this),this._onMouseDown=X_.bind(this),this._onMouseMove=q_.bind(this),this._interceptControlDown=J_.bind(this),this._interceptControlUp=Q_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Td),this.update(),this.state=vt.NONE}update(e=null){let t=this.object.position;Ut.copy(t).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ut.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Xa.origin.copy(this.object.position),Xa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xa.direction))<V_?this.object.lookAt(this.target):(Ed.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xa.intersectPlane(Ed,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ac||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ac||this._lastTargetPosition.distanceToSquared(this.target)>Ac?(this.dispatchEvent(Td),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ut.setFromMatrixColumn(t,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,t){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(t,1):(Ut.setFromMatrixColumn(t,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ut.copy(s).sub(this.target);let r=Ut.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ge,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function H_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function G_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function W_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ad),this.state=vt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function X_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=vt.DOLLY;break;case Ti.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}break;case Ti.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Cc)}function q_(i){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Y_(i){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(i.preventDefault(),this.dispatchEvent(Cc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ad))}function j_(i){this.enabled!==!1&&this._handleKeyDown(i)}function $_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=vt.TOUCH_ROTATE;break;case Ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case Ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=vt.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Cc)}function Z_(i){switch(this._trackPointer(i),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=vt.NONE}}function K_(i){this.enabled!==!1&&i.preventDefault()}function J_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Q_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ic(i,e){if(e===nc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Xs||e===Yr){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Xs)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Ya=class extends Wn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Oc(t)}),this.register(function(t){return new Fc(t)}),this.register(function(t){return new qc(t)}),this.register(function(t){return new Yc(t)}),this.register(function(t){return new jc(t)}),this.register(function(t){return new kc(t)}),this.register(function(t){return new zc(t)}),this.register(function(t){return new Vc(t)}),this.register(function(t){return new Hc(t)}),this.register(function(t){return new Uc(t)}),this.register(function(t){return new Gc(t)}),this.register(function(t){return new Bc(t)}),this.register(function(t){return new Xc(t)}),this.register(function(t){return new Wc(t)}),this.register(function(t){return new Dc(t)}),this.register(function(t){return new $c(t)}),this.register(function(t){return new Zc(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=ci.extractUrlBase(e);o=ci.resolveURL(l,this.path)}else o=ci.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Bs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ld){try{o[at.KHR_BINARY_GLTF]=new Kc(e)}catch(u){s&&s(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new sh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new Nc;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new Jc(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new Qc;break;case at.KHR_MESH_QUANTIZATION:o[u]=new eh;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function ex(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Dc=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ye(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],zt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $i(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Br(h),l.distance=u;break;case"spot":l=new Fr(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Yn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Nc=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return Pn}extendParams(e,t,n){let s=[];e.color=new Ye(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],zt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,It))}return Promise.all(s)}},Uc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Oc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ge(a,a)}return Promise.all(r)}},Fc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Bc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},kc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ye(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,It)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},zc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Vc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ye().setRGB(a[0],a[1],a[2],zt),Promise.all(r)}},Hc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Gc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ye().setRGB(a[0],a[1],a[2],zt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,It)),Promise.all(r)}},Wc=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Xc=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:on}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},qc=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Yc=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},jc=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},$c=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},Zc=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==vn.TRIANGLES&&l.mode!==vn.TRIANGLE_STRIP&&l.mode!==vn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let _ of u){let x=new Je,m=new O,p=new Kt,T=new O(1,1,1),w=new Tr(_.geometry,_.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,y),c.SCALE&&T.fromBufferAttribute(c.SCALE,y),w.setMatrixAt(y,x.compose(m,p,T));for(let y in c)if(y==="_COLOR_0"){let A=c[y];w.instanceColor=new wi(A.array,A.itemSize,A.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&_.geometry.setAttribute(y,c[y]);Tt.prototype.copy.call(w,_),this.parser.assignFinalMaterial(w),d.push(w)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Ld="glTF",Zr=12,Cd={JSON:1313821514,BIN:5130562},Kc=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Zr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ld)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Zr,r=new DataView(e,Zr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Cd.JSON){let l=new Uint8Array(e,Zr+o,a);this.content=n.decode(l)}else if(c===Cd.BIN){let l=Zr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Jc=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=nh[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=nh[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Zs[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let _ in d.attributes){let x=d.attributes[_],m=c[_];m!==void 0&&(x.normalized=m)}u(d)},a,l,zt,f)})})}},Qc=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},eh=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},ja=class extends oi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,_=e*l,x=_-l,m=-2*d+3*f,p=d-f,T=1-m,w=p-f+u;for(let y=0;y!==a;y++){let A=o[x+y+a],C=o[x+y+c]*h,E=o[_+y+a],L=o[_+y]*h;r[y]=T*A+w*C+m*E+p*L}return r}},tx=new Kt,th=class extends ja{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return tx.fromArray(r).normalize().toArray(r),r}},vn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Id={9728:kt,9729:Zt,9984:ia,9985:zs,9986:Ji,9987:Dn},Rd={33071:On,33648:ws,10497:Si},Rc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},nx={CUBICSPLINE:void 0,LINEAR:Gi,STEP:Hi},Pc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ix(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new qi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:In})),i.DefaultMaterial}function ss(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Yn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function sx(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function rx(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ox(i){let e,t=i.extensions&&i.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Lc(t.attributes):e=i.indices+":"+Lc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Lc(i.targets[n]);return e}function Lc(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function ih(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ax(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var lx=new Je,sh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ex,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Nr(this.options.manager):this.textureLoader=new kr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ss(r,a,s),Yn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(ci.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Rc[s.type],a=Zs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Lt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Rc[s.type],l=Zs[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,_=s.normalized===!0,x,m;if(d&&d!==u){let p=Math.floor(f/d),T="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,w=t.cache.get(T);w||(x=new l(a,p*d,s.count*d/h),w=new Ls(x,d/h),t.cache.add(T,w)),m=new Ds(w,c,f%d/h,_)}else a===null?x=new l(s.count*c):x=new l(a,f,s.count*c),m=new Lt(x,c,_);if(s.sparse!==void 0){let p=Rc.SCALAR,T=Zs[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,A=new T(o[1],w,s.sparse.count*p),C=new l(o[2],y,s.sparse.count*c);a!==null&&(m=new Lt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,L=A.length;E<L;E++){let S=A[E];if(m.setX(S,C[E*c]),c>=2&&m.setY(S,C[E*c+1]),c>=3&&m.setZ(S,C[E*c+2]),c>=4&&m.setW(S,C[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=Id[f.magFilter]||Zt,h.minFilter=Id[f.minFilter]||Dn,h.wrapS=Rd[f.wrapS]||Si,h.wrapT=Rd[f.wrapT]||Si,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==kt&&h.minFilter!==Zt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let _=f;t.isImageBitmapLoader===!0&&(_=function(x){let m=new Ft(x);m.needsUpdate=!0,f(m)}),t.load(ci.resolveURL(u,r.path),_,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Yn(u,o),u.userData.mimeType=o.mimeType||ax(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Fs,rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Os,rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return qi}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[at.KHR_MATERIALS_UNLIT]){let u=s[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ye(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],zt),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,It)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=xn);let h=r.alphaMode||Pc.OPAQUE;if(h===Pc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Pc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Pn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ge(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Pn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Pn){let u=r.emissiveFactor;a.emissive=new Ye().setRGB(u[0],u[1],u[2],zt)}return r.emissiveTexture!==void 0&&o!==Pn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,It)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Yn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ss(s,u,r),u})}createUniqueName(e){let t=Mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Pd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=ox(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[at.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Pd(new dn,l,t),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?ix(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,_=h.length;d<_;d++){let x=h[d],m=o[d],p,T=l[d];if(m.mode===vn.TRIANGLES||m.mode===vn.TRIANGLE_STRIP||m.mode===vn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Mr(x,T):new Vt(x,T),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===vn.TRIANGLE_STRIP?p.geometry=Ic(p.geometry,Yr):m.mode===vn.TRIANGLE_FAN&&(p.geometry=Ic(p.geometry,Xs));else if(m.mode===vn.LINES)p=new Er(x,T);else if(m.mode===vn.LINE_STRIP)p=new Xi(x,T);else if(m.mode===vn.LINE_LOOP)p=new Ar(x,T);else if(m.mode===vn.POINTS)p=new Cr(x,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&rx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Yn(p,r),m.extensions&&ss(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let d=0,_=u.length;d<_;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&ss(s,u[0],r),u[0];let f=new An;r.extensions&&ss(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,_=u.length;d<_;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Pt(jr.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new ji(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Yn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new Je;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new wr(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],_=s.samplers[d.sampler],x=d.target,m=x.node,p=s.parameters!==void 0?s.parameters[_.input]:_.input,T=s.parameters!==void 0?s.parameters[_.output]:_.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",T)),l.push(_),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],_=u[2],x=u[3],m=u[4],p=[];for(let w=0,y=f.length;w<y;w++){let A=f[w],C=d[w],E=_[w],L=x[w],S=m[w];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let b=n._createAnimationTracks(A,C,E,L,S);if(b)for(let D=0;D<b.length;D++)p.push(b[D])}let T=new Dr(r,void 0,p);return Yn(T,s),T})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,lx)});for(let d=0,_=u.length;d<_;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Ns:l.length>1?h=new An:l.length===1?h=l[0]:h=new Tt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Yn(h,r),r.extensions&&ss(n,h,r),r.matrix!==void 0){let u=new Je;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new An;n.name&&(r.name=s.createUniqueName(n.name)),Yn(r,n),n.extensions&&ss(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof rn||f instanceof Ft)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];Ci[r.path]===Ci.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Ci[r.path]){case Ci.weights:l=Vn;break;case Ci.rotation:l=Hn;break;case Ci.translation:case Ci.scale:l=Gn;break;default:n.itemSize===1?l=Vn:l=Gn;break}let h=s.interpolation!==void 0?nx[s.interpolation]:Gi,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let _=new l(c[f]+"."+Ci[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ih(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Hn?th:ja;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function cx(i,e,t){let n=e.attributes,s=new Jt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new O(c[0],c[1],c[2]),new O(l[0],l[1],l[2])),a.normalized){let h=ih(Zs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new O,c=new O;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,_=f.max;if(d!==void 0&&_!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(_[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(_[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(_[2]))),f.normalized){let x=ih(Zs[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new sn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Pd(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=nh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return ht.workingColorSpace!==zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`),Yn(i,e),cx(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?sx(i,e.targets,t):i})}var te=require("@deepseek-ai/dsh-client-ui-primitives");var Dd=`.is-studio {
  display:flex; flex-direction:column; height:100%; min-height:0; overflow:hidden; container-type:inline-size;
  color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base);
  font-family:inherit; font-size:13px; line-height:1.5;
}
.is-studio *, .is-dialog * { box-sizing:border-box; }
.is-topbar, .is-viewbar, .is-contextbar, .is-statusbar { display:flex; flex:none; align-items:center; justify-content:space-between; gap:8px; }
.is-topbar { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); min-height:54px; padding:12px 12px 8px; gap:8px 12px; }
.is-project-heading { display:flex; align-items:center; min-width:0; max-width:300px; gap:6px; flex:0 1 auto; }
.is-topbar-actions { grid-column:3; grid-row:1; justify-self:end; }
.is-project-heading > :first-child { min-width:0; max-width:100%; }
.is-project-trigger { font-size:14px!important; font-weight:500; padding-left:4px!important; }
.is-projects { height:100%; overflow:auto; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-primary); font:inherit; }
.is-projects * { box-sizing:border-box; }
.is-projects-content { max-width:1100px; margin:0 auto; padding:64px 48px 40px; }
.is-projects-heading { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-bottom:36px; }
.is-projects-heading h1 { margin:0; font-size:26px; line-height:1.4; font-weight:600; letter-spacing:-.6px; outline:none; }
.is-projects-heading p { margin:8px 0 0; font-size:14px; color:var(--dsw-alias-label-tertiary); }
.is-projects-toolbar { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
.is-projects-toolbar > .is-subtle { margin-left:auto; white-space:nowrap; font-size:12px; }
.is-project-search { display:flex; align-items:center; gap:8px; color:var(--dsw-alias-label-tertiary); width:300px; max-width:65%; border:1px solid var(--dsw-alias-border-l3); border-radius:10px; padding:8px 12px; }
.is-project-search:focus-within { border-color:var(--dsw-alias-label-secondary); }
.is-project-search input { min-width:0; width:100%; border:0; outline:none; background:transparent; color:var(--dsw-alias-label-primary); font:inherit; font-size:13px; }
.is-project-list { list-style:none; padding:0; margin:0; border-top:.5px solid var(--dsw-alias-border-l3); }
.is-project-list li { display:flex; align-items:center; gap:12px; border-bottom:.5px solid var(--dsw-alias-border-l3); padding:12px 0; }
.is-project-list li > :last-child { flex:none; }
button.is-project-open { display:flex; align-items:center; justify-content:flex-start; height:auto; min-width:0; flex:1; gap:16px; padding:10px 8px; text-align:left; }
.is-project-glyph { display:flex; align-items:center; justify-content:center; width:40px; height:40px; flex:none; background:var(--dsw-alias-bg-layer-1); border-radius:10px; color:var(--dsw-alias-label-secondary); }
.is-project-copy { display:flex; flex-direction:column; gap:5px; min-width:0; }
.is-project-copy strong { font-size:14px; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.is-project-copy > span { color:var(--dsw-alias-label-tertiary); font-size:12px; font-weight:400; }
.is-project-copy i { font-style:normal; margin:0 8px; }
.is-project-state { font-size:12px; color:var(--dsw-alias-label-tertiary); white-space:nowrap; }
.is-projects-empty { display:flex; align-items:center; flex-direction:column; padding:80px 16px; color:var(--dsw-alias-label-tertiary); text-align:center; }
.is-projects-empty h2 { color:var(--dsw-alias-label-primary); font-size:16px; font-weight:500; margin:16px 0 0; }
.is-projects-empty p { font-size:13px; margin:8px 0; }
.is-project-notice { font-size:13px; color:var(--dsw-alias-label-secondary); }
.is-danger-text { color:var(--dsw-alias-status-error-label,#d76f65)!important; }
@media(max-width:650px) { .is-projects-content { padding:32px 20px; }.is-projects-heading { gap:12px; margin-bottom:24px; }.is-projects-heading h1 { font-size:22px; }.is-projects-heading p { font-size:12px; }button.is-project-open { gap:10px; padding-left:0; }.is-project-list li { gap:6px; }.is-project-glyph { width:32px; height:32px; }.is-project-copy i { margin:0 5px; } }
.is-save-state { white-space:nowrap; font-size:11px; color:var(--dsw-alias-label-tertiary); }
.is-inline { display:flex; align-items:center; gap:4px; flex:none; }
.is-menu-root { display:inline-flex; max-width:100%; min-width:0; }
.is-menu-trigger { max-width:100%; gap:7px!important; }
.is-truncate { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
button.is-icon { width:28px; padding:0; flex:none; }
.is-design-entry { color:var(--dsw-alias-label-secondary)!important; }
.is-tab-title { display:inline-flex; align-items:center; gap:6px; }
.is-tab-title svg { color:var(--dsw-alias-label-tertiary); flex:none; }
.is-viewbar { grid-column:2; grid-row:1; padding:0; }
.is-stage { flex:1; min-height:180px; position:relative; overflow:hidden; margin:0 12px; border-radius:10px 10px 0 0; background:var(--dsw-alias-bg-layer-1); }
.is-viewport { position:absolute; inset:0; width:100%; height:100%; }
.is-viewport canvas { display:block; width:100%; height:100%; outline-offset:-3px; }
.is-viewport .is-error { position:absolute; z-index:1; top:12px; left:12px; right:12px; }
.is-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:8px; color:var(--dsw-alias-label-tertiary); }
.is-orbit-hint { position:absolute; bottom:14px; left:16px; color:var(--dsw-alias-label-tertiary); font-size:11px; pointer-events:none; }
.is-bottom-tools { display:flex; flex:none; align-items:center; flex-wrap:wrap; gap:6px 12px; margin:0 12px 12px; padding:8px; background:var(--dsw-alias-bg-layer-1); border-radius:0 0 10px 10px; }
.is-contextbar { flex:1 1 250px; min-width:0; justify-content:flex-start; padding:0; min-height:28px; }
.is-contextbar .is-subtle { font-size:12px; margin:0; }
.is-contextbar .is-material-trigger { margin-left:auto; }
.is-swatch { display:block; width:14px; height:14px; border-radius:4px; border:0.5px solid var(--dsw-alias-border-l3); }
.is-statusbar { min-height:28px; padding:0; margin-left:auto; justify-content:flex-end; gap:6px; }
.is-access-trigger { color:var(--dsw-alias-label-secondary)!important; padding-left:8px!important; padding-right:8px!important; }
.is-task-status { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--dsw-alias-label-secondary); }
.is-task-status svg { flex:none; }
.is-banner { flex:none; display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 12px; margin:0 12px 8px; font-size:12px; border-radius:8px; background:var(--dsw-alias-bg-layer-1); }
.is-error { padding:10px 12px; color:var(--dsw-alias-status-error-label,#d76f65); background:color-mix(in srgb,var(--dsw-alias-status-error-label,#d76f65) 9%,var(--dsw-alias-bg-base)); border-radius:8px; font-size:12px; overflow-wrap:anywhere; }
.is-empty { height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; gap:12px; padding:36px 24px; }
.is-empty > svg { color:var(--dsw-alias-label-tertiary); margin-bottom:4px; }
.is-empty h2 { font-size:19px; line-height:1.4; font-weight:500; letter-spacing:-.35px; margin:0; }
.is-empty p { font-size:13px; color:var(--dsw-alias-label-secondary); margin:0; }
.is-empty p span { margin:0 8px; }
.is-empty .is-inline { margin-top:12px; gap:8px; }
.is-canvas-status, .is-render-progress { position:absolute; z-index:1; top:16px; left:50%; transform:translateX(-50%); white-space:nowrap; display:flex; gap:8px; align-items:center; padding:6px 10px; background:var(--dsw-alias-bg-base); border:0.5px solid var(--dsw-alias-border-l3); border-radius:8px; font-size:12px; color:var(--dsw-alias-label-secondary); }
.is-result-view { height:100%; position:relative; display:flex; flex-direction:column; padding:16px; gap:12px; }
.is-result-view > img { width:100%; flex:1; min-height:0; object-fit:contain; border-radius:6px; }
.is-result-caption { display:flex; flex:none; align-items:center; justify-content:space-between; gap:8px; color:var(--dsw-alias-label-tertiary); font-size:12px; }
.is-result-thumbnails { display:flex; flex:none; gap:8px; overflow:auto; padding:3px; }
.is-result-thumbnails button { flex:none; display:flex; flex-direction:column; align-items:center; gap:4px; width:88px; padding:4px; border:1px solid transparent; border-radius:7px; background:transparent; color:var(--dsw-alias-label-secondary); font:inherit; font-size:11px; cursor:pointer; }
.is-result-thumbnails button[aria-pressed=true] { border-color:var(--dsw-alias-border-l2); background:var(--dsw-alias-bg-layer-2); color:var(--dsw-alias-label-primary); }
.is-result-thumbnails button:focus-visible { outline:2px solid var(--dsw-alias-button-primary-fill); outline-offset:1px; }
.is-result-thumbnails img { width:78px; height:54px; object-fit:cover; border-radius:4px; }
.is-model-view-switch { position:absolute; top:12px; left:12px; z-index:1; border-radius:7px; background:var(--dsw-alias-bg-base); }
.is-render-options fieldset { border:0; margin:0; padding:0; }.is-render-options legend { margin-bottom:10px; font-size:12px; color:var(--dsw-alias-label-secondary); }
.is-view-options { display:flex; gap:10px 16px; flex-wrap:wrap; }.is-form .is-view-options label { display:flex; flex-direction:row; align-items:center; gap:5px; }.is-view-options input { accent-color:var(--dsw-alias-button-primary-fill); }
.is-form label.is-quality-label { display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:16px; font-size:12px; }
.is-quality-label select { border:1px solid var(--dsw-alias-border-l3); border-radius:7px; padding:7px; background:var(--dsw-alias-bg-base); color:inherit; font:inherit; }
.is-plan-view { height:100%; min-height:0; display:flex; flex-direction:column; overflow:auto; padding:12px; gap:10px; }
.is-sheet-toolbar { display:flex; flex:none; align-items:center; justify-content:space-between; gap:12px; }
.is-drawing-viewer { display:flex; flex-direction:column; min-height:320px; flex:1; gap:8px; }
.is-drawing-controls { display:flex; align-items:center; gap:3px; }
.is-drawing-scale,.is-drawing-zoom { font-size:11px; color:var(--dsw-alias-label-secondary); white-space:nowrap; font-variant-numeric:tabular-nums; }
.is-drawing-scale { margin-right:10px; }.is-drawing-zoom { min-width:34px; text-align:center; }
.is-cad-canvas { flex:1; min-height:240px; position:relative; overflow:hidden; touch-action:none; user-select:none; cursor:grab; border-radius:8px; background:var(--dsw-alias-bg-base); }
.is-cad-canvas:active { cursor:grabbing; }.is-cad-canvas:focus-visible { outline:2px solid var(--dsw-alias-button-primary-fill); outline-offset:-2px; }
.is-cad-paper { position:absolute; transform:translate(-50%,-50%); background:white; box-shadow:0 2px 12px #0002; pointer-events:none; }
.is-cad-paper svg { display:block; width:100%; height:100%; }
.is-drawing-caption { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:4px 12px; color:var(--dsw-alias-label-tertiary); font-size:10px; }
.is-drawing-caption label { display:flex; align-items:center; gap:4px; }.is-drawing-caption input { margin:0; accent-color:var(--dsw-alias-button-primary-fill); }
@container(max-width:600px) { .is-drawing-scale { display:none; }.is-drawing-controls { gap:0; }.is-sheet-toolbar { gap:4px; }.is-drawing-caption > :first-child { display:none; } }
.is-plan { display:block; width:100%; min-height:160px; flex:1; color:var(--dsw-alias-label-secondary); }
.is-plan-summary { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.is-plan-summary strong { font-size:13px; font-weight:500; overflow-wrap:anywhere; }
.is-plan-summary p, .is-canvas-note { color:var(--dsw-alias-label-secondary); font-size:12px; margin:4px 0 0; }
.is-plan-summary p span { margin:0 8px; color:var(--dsw-alias-label-tertiary); }
.is-canvas-note { text-align:center; }
.is-dialog { width:min(460px,calc(100vw - 40px)); max-height:86vh; font-size:14px; line-height:1.55; }
.is-preview-dialog { width:min(680px,calc(100vw - 40px)); }
.is-preview-options { display:grid; grid-template-columns:minmax(0,2fr) minmax(0,1fr); gap:12px; }
.is-preview-options label { min-width:0; }
.is-preview-options select { width:100%; }
.is-draft-preview-result img { display:block; width:100%; aspect-ratio:16/9; border-radius:8px; }
.is-draft-preview-result p { margin:8px 0; }
.is-preview-download { display:inline-flex; align-items:center; color:var(--dsw-alias-label-primary); }
.is-dialog-content { overflow:auto; }
.is-form { display:flex; flex-direction:column; gap:16px; }
.is-form p { margin:0; }
.is-form label { display:flex; flex-direction:column; gap:7px; font-size:12px; }
.is-form input:not([type=checkbox]), .is-form select { width:100%; min-width:0; border:0.5px solid var(--dsw-alias-border-l3); border-radius:8px; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-primary); font:inherit; font-size:14px; line-height:22px; padding:8px 10px; }
.is-form input:focus-visible, .is-form select:focus-visible { outline:2px solid var(--dsw-alias-button-primary-fill); outline-offset:2px; }
.is-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.is-subtle { color:var(--dsw-alias-label-secondary); font-size:12px; }
.is-dialog-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:10px; }
.is-dimension-summary { display:flex; flex-direction:column; gap:6px; padding:12px 0; }
.is-dimension-summary > strong { font-size:30px; font-weight:500; letter-spacing:-1px; }
.is-dimension-summary small { font-size:14px; font-weight:400; margin-left:8px; }
.is-dimension-summary > span { color:var(--dsw-alias-label-secondary); font-size:13px; }
label.is-check { flex-direction:row; align-items:flex-start; gap:8px; font-size:12px; }
.is-check input { margin:3px 0 0; accent-color:var(--dsw-alias-button-primary-fill); flex:none; }
.is-setting-row { display:flex; justify-content:space-between; align-items:center; gap:20px; padding:4px 0 14px; border-bottom:0.5px solid var(--dsw-alias-border-l3); }
.is-setting-row strong { font-size:14px; font-weight:500; }.is-setting-row p { margin-top:4px; }
.is-dialog details { font-size:12px; }.is-dialog summary { cursor:pointer; color:var(--dsw-alias-label-secondary); }
.is-dialog details p, .is-dialog details .is-check { margin-top:12px; }
.is-dialog pre { white-space:pre-wrap; overflow-wrap:anywhere; max-height:220px; overflow:auto; }
.is-dialog ul { max-height:180px; overflow:auto; padding-left:18px; }
.is-history-item { border-bottom:0.5px solid var(--dsw-alias-border-l3); padding:4px 0; }
.is-history-item summary { padding:10px 0; font-size:13px; }
.is-history-item summary > span:first-of-type { color:var(--dsw-alias-label-primary); }
.is-history-item summary > span:last-child { float:right; }
.is-history-item small { margin-left:12px; font-size:12px; color:var(--dsw-alias-label-tertiary); }
.is-downloads { display:flex; flex-wrap:wrap; gap:6px; padding:4px 0 12px; }
.is-export-list { display:grid; gap:10px; }
.is-furniture-preview { display:flex; align-items:center; justify-content:center; min-height:150px; border-radius:8px; background:var(--dsw-alias-bg-layer-1); color:var(--dsw-alias-label-tertiary); }
.is-furniture-preview img { display:block; width:160px; height:160px; object-fit:contain; }
.is-spinning { animation:is-spin 1.2s linear infinite; }
@keyframes is-spin { to { transform:rotate(360deg); } }
@media (prefers-reduced-motion:reduce) { .is-spinning { animation:none; } }
@container (max-width:640px) { .is-topbar { grid-template-columns:minmax(0,1fr) auto; }.is-topbar-actions { grid-column:2; }.is-viewbar { grid-column:1 / -1; grid-row:2; justify-self:center; } }
@media (max-width:850px) { .is-save-state { display:none; }.is-project-heading > :first-child { max-width:100%; }.is-contextbar { gap:2px; }.is-contextbar .is-subtle { display:none; }.is-contextbar button { padding-left:7px; padding-right:7px; } }
`;var rh=i=>/\.(dxf|dwg)$/i.test(i.name);function Nd({document:i,window:e,getSession:t,intake:n,onError:s}){let r=o=>{let a=[...o.dataTransfer?.files??o.clipboardData?.files??o.target?.files??[]];if(!a.some(rh)||o.type==="change"&&o.target?.hasAttribute?.("data-interior-file"))return;o.preventDefault(),o.stopImmediatePropagation(),o.type==="drop"&&e.dispatchEvent(new Event("dragend"));let c=t();if(!c){s(new Error("\u8BF7\u5148\u9009\u62E9\u5DE5\u4F5C\u533A\u6216\u65B0\u5EFA\u804A\u5929\uFF0C\u518D\u5BFC\u5165 CAD\u3002\u6587\u4EF6\u6CA1\u6709\u4F5C\u4E3A\u666E\u901A\u9644\u4EF6\u6DFB\u52A0\u3002"));return}o.type==="change"&&(o.target.value=""),Promise.resolve().then(()=>n(c,a)).catch(s)};for(let o of["drop","paste","change"])i.addEventListener(o,r,!0);return()=>{for(let o of["drop","paste","change"])i.removeEventListener(o,r,!0)}}function oh(i,e,t,n){i.aspect=n,i.updateProjectionMatrix(),i.updateMatrixWorld(!0);let s=i.getWorldDirection(new O),r=new O().setFromMatrixColumn(i.matrixWorld,0).normalize(),o=new O().setFromMatrixColumn(i.matrixWorld,1).normalize(),a=Math.tan(i.fov*Math.PI/360)/i.zoom,c=i.near*2;for(let h of[t.min.x,t.max.x])for(let u of[t.min.y,t.max.y])for(let f of[t.min.z,t.max.z]){let d=new O(h,u,f).sub(e),_=d.dot(s);c=Math.max(c,Math.abs(d.dot(r))*1.15/(a*n)-_,Math.abs(d.dot(o))*1.15/a-_,i.near*2-_)}let l=e.clone().addScaledVector(s,-c);i.position.copy(i.parent?i.parent.worldToLocal(l):l),i.updateMatrixWorld(!0)}function Ud(i,e,t,n,s){let r={overview:[.8,2.2,1.1],front:[0,0,1],back:[0,0,-1],left:[-1,0,0],right:[1,0,0],top:[0,1,.001]};if(!Object.hasOwn(r,s))throw Error("\u672A\u77E5\u4E09\u7EF4\u89C6\u89D2");let o=t.getCenter(new O),a=Math.max(t.getSize(new O).length(),1),c=o.clone().addScaledVector(new O(...r[s]).normalize(),a);e.copy(o),i.up.set(0,1,0),i.position.copy(i.parent?i.parent.worldToLocal(c):c),i.lookAt(o),oh(i,e,t,n)}function $a(i){let e=new Set,t=new Set,n=new Set,s=new Set;i.traverse(r=>{r.geometry&&e.add(r.geometry);for(let o of r.material?Array.isArray(r.material)?r.material:[r.material]:[])t.add(o)});for(let r of t)for(let o of Object.values(r))o?.isTexture&&n.add(o);for(let r of n)r.image&&s.add(r.image),r.dispose();for(let r of s)r.close?.();for(let r of t)r.dispose();for(let r of e)r.dispose()}var Ks=i=>i.path??[i.a,i.b],Kr=i=>i.arc?i.arc.radius*i.arc.sweep:Ks(i).slice(1).reduce((e,t,n)=>e+Math.hypot(t[0]-Ks(i)[n][0],t[1]-Ks(i)[n][1]),0);function Ii(i,e){if(i.arc){let s=i.arc,r=s.start+e/s.radius;return[s.center[0]+s.radius*Math.cos(r),s.center[1]+s.radius*Math.sin(r)]}let t=Ks(i),n=0;for(let s=1;s<t.length;s++){let r=t[s-1],o=t[s],a=Math.hypot(o[0]-r[0],o[1]-r[1]);if(e<=n+a+1e-8){let c=Math.max(0,e-n)/a;return[r[0]+c*(o[0]-r[0]),r[1]+c*(o[1]-r[1])]}n+=a}return t.at(-1)}function ux(i,e,t){return(e[0]-i[0])*(t[1]-i[1])-(e[1]-i[1])*(t[0]-i[0])}function dx(i,e,t){return Math.abs(ux(e,t,i))<1e-8&&i[0]>=Math.min(e[0],t[0])-1e-8&&i[0]<=Math.max(e[0],t[0])+1e-8&&i[1]>=Math.min(e[1],t[1])-1e-8&&i[1]<=Math.max(e[1],t[1])+1e-8}function Za(i,e){let t=!1;for(let n=0,s=e.length-1;n<e.length;s=n++){let r=e[s],o=e[n];if(dx(i,r,o))return!0;r[1]>i[1]!=o[1]>i[1]&&i[0]<(o[0]-r[0])*(i[1]-r[1])/(o[1]-r[1])+r[0]&&(t=!t)}return t}var Od=1e-6;function fx(i,e,t=!1){let n=[...i];for(let s of t?[2,1,0]:[0,1,2]){let r=e[s]*(t?-1:1),o=Math.cos(r),a=Math.sin(r),c=(s+1)%3,l=(s+2)%3,[h,u]=[n[c],n[l]];n[c]=h*o-u*a,n[l]=h*a+u*o}return n}var px=(i,[e,t,n])=>i.plane==="xy"?[e,t,n]:i.plane==="xz"?[e,n,t]:[n,e,t],pn=(i,e)=>fx(px(i,e),i.rotationEuler).map((t,n)=>t+i.position[n]);function ah(i){return[i.outline,...i.holes].flatMap(e=>e.flatMap((t,n)=>{let s=e[(n+1)%e.length];return[[t.concat(0),s.concat(0)],[t.concat(i.depth),s.concat(i.depth)],[t.concat(0),t.concat(i.depth)]].map(r=>r.map(o=>pn(i,o)))}))}function lh(i){let[e,t,n]=i.size;return{plane:"xy",position:[i.position[0],i.position[1],i.position[2]-n/2],rotationEuler:[0,0,i.rotation??0],outline:[[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],holes:[],depth:n}}function ch(i){let e=Ks(i),t=Kr(i),n=[],s=0;for(let r=1;r<e.length;r++){let o=e[r-1],a=e[r],c=Math.hypot(a[0]-o[0],a[1]-o[1]),l=i.arc?t/(e.length-1):c,h=c/l,u=0,f=(_,x,m,p)=>{x-_>Od&&p-m>Od&&n.push({plane:"xy",outline:[[_,-i.thickness/2],[x,-i.thickness/2],[x,i.thickness/2],[_,i.thickness/2]],holes:[],depth:p-m,position:[...o,m],rotationEuler:[0,0,Math.atan2(a[1]-o[1],a[0]-o[0])]})},d=i.openings.flatMap(_=>_.wrap?[_,{..._,start:_.start-t}]:[_]).sort((_,x)=>_.start-x.start);for(let _ of d){let x=Math.max(0,(_.start-s)*h),m=Math.min(c,(_.start+_.width-s)*h);m<=x||(f(u,x,0,i.height),f(x,m,0,_.sill),f(x,m,_.top,i.height),u=Math.max(u,m))}f(u,c,0,i.height),s+=l}return n}function hh(i){let[e,t,n]=i.size;return{plane:"xy",position:i.position,rotationEuler:i.rotationEuler,outline:[[-e/2,-t/2],[e/2,-t/2],[e/2,t/2],[-e/2,t/2]],holes:[],depth:n}}var Fd=[{value:"plan",label:"CAD \u56FE\u7EB8"},{value:"model",label:"\u4E09\u7EF4\u5EFA\u6A21"},{value:"results",label:"\u6548\u679C\u56FE"}],rs={overview:"\u603B\u89C8",front:"\u6B63\u9762",back:"\u80CC\u9762",left:"\u5DE6\u4FA7",right:"\u53F3\u4FA7",top:"\u4FEF\u89C6"},Bd={overview:"\u659C\u89C6",front:"\u6B63\u89C6",top:"\u4FEF\u89C6"},kd=["overview","front","back","left","right","top"],mx={plan:"\u5E73\u9762\u56FE",front:"\u6B63\u7ACB\u9762",back:"\u540E\u7ACB\u9762",left:"\u5DE6\u7ACB\u9762",right:"\u53F3\u7ACB\u9762"},gx={section_x:"\u7EB5\u5411\u5256\u9762",section_y:"\u6A2A\u5411\u5256\u9762"},Ri={...mx,...gx};function Ka(i){if(!i||i.state!=="complete")return[];let e=i.detail;return Array.isArray(e.views)?e.views.filter(t=>/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(t.id)&&e.files?.[t.file]).map(t=>({...t,label:rs[t.id]??t.label??t.id})):e.files?.["render.png"]?[{id:"overview",label:"\u5386\u53F2\u5355\u89C6\u89D2",file:"render.png"}]:[]}function zd(i,e){let t=new Map;for(let n of i)if(n.revision===e)for(let s of Ka(n))t.set(s.id,{...s,taskId:n.id,revision:n.revision,cadVerified:n.detail.cadAudit?.passed===!0});return[...t.values()]}var xe=nl(require("react"),1),At=require("@deepseek-ai/dsh-client-ui-primitives");function Vd({manage:i,openProject:e,createProject:t,workspaces:n,defaultWorkspace:s}){let r=(0,xe.useSyncExternalStore)(se=>n.subscribe(se),()=>n.getSnapshot()),[o,a]=(0,xe.useState)(null),[c,l]=(0,xe.useState)(""),[h,u]=(0,xe.useState)(""),[f,d]=(0,xe.useState)(""),[_,x]=(0,xe.useState)(!1),[m,p]=(0,xe.useState)(null),[T,w]=(0,xe.useState)(null),[y,A]=(0,xe.useState)(""),[C,E]=(0,xe.useState)("interior"),[L,S]=(0,xe.useState)(""),b=(0,xe.useRef)(0),D=(0,xe.useRef)(!1),z=(0,xe.useRef)(null),W=(0,xe.useRef)(!1),Y=(0,xe.useRef)(null),K=(0,xe.useRef)(null),j=async()=>{let se=++b.current;z.current?.abort(),z.current=new AbortController;try{let U=await i("list",{},void 0,z.current.signal);D.current&&se===b.current&&(a(U.projects),l(""))}catch(U){D.current&&se===b.current&&U.name!=="AbortError"&&l(U.message)}};(0,xe.useEffect)(()=>{D.current=!0,j(),K.current?.focus();let se=setInterval(()=>{!W.current&&document.visibilityState==="visible"&&j()},3e3);return()=>{D.current=!1,++b.current,z.current?.abort(),clearInterval(se)}},[]);let $=(se,U)=>{Y.current=crypto.randomUUID(),p(null),l(""),A(se==="rename"?U.name:""),w({action:se,project:U}),se==="create"&&S(s()??"")},V=async(se,U)=>{if(!W.current){W.current=!0,x(!0),l(""),u("");try{await se(),D.current&&(w(null),u(U),await j())}catch(N){D.current&&(await j(),l(N.message))}finally{W.current=!1,D.current&&x(!1)}}},ie=se=>{se.preventDefault();let{action:U,project:N}=T;U==="create"?V(()=>t({name:y.trim(),kind:C,workspaceId:L},Y.current),"\u5DE5\u7A0B\u5DF2\u521B\u5EFA"):V(()=>i(U,{projectId:N.id,expectedRevision:N.revision,...U==="rename"?{name:y.trim(),expectedName:N.name}:{confirmName:y}},Y.current),U==="rename"?"\u540D\u79F0\u5DF2\u66F4\u65B0":"\u5DE5\u7A0B\u53CA\u672C\u5730\u6587\u4EF6\u5DF2\u5220\u9664")},re=(o??[]).filter(se=>se.name.toLocaleLowerCase().includes(f.trim().toLocaleLowerCase())),ye=T?.project,Le=ye&&o?.find(se=>se.id===ye.id),tt=ye&&(!Le||Le.name!==ye.name||Le.revision!==ye.revision),ot=_||!!Le?.activity||tt;return xe.default.createElement("section",{className:"is-projects","aria-label":"\u8BBE\u8BA1\u5DE5\u7A0B\u7BA1\u7406","data-design-projects":!0},xe.default.createElement("div",{className:"is-projects-content"},xe.default.createElement("header",{className:"is-projects-heading"},xe.default.createElement("div",null,xe.default.createElement("h1",{ref:K,tabIndex:-1},"\u8BBE\u8BA1\u5DE5\u7A0B"),xe.default.createElement("p",null,"\u6240\u6709\u672C\u5730\u8BBE\u8BA1\uFF0C\u96C6\u4E2D\u7BA1\u7406\u3002")),xe.default.createElement(At.Button,{variant:"primary",icon:xe.default.createElement(At.IconPlusOutlineRegular,null),disabled:_,onClick:()=>$("create")},"\u65B0\u5EFA\u5DE5\u7A0B")),xe.default.createElement("div",{className:"is-projects-toolbar"},xe.default.createElement("label",{className:"is-project-search"},xe.default.createElement(At.IconSearchOutlineRegular,{size:16}),xe.default.createElement("input",{type:"search","aria-label":"\u641C\u7D22\u5DE5\u7A0B",placeholder:"\u641C\u7D22\u5DE5\u7A0B",value:f,onChange:se=>d(se.target.value)})),xe.default.createElement("span",{className:"is-subtle"},o?`${o.length} \u4E2A\u5DE5\u7A0B`:"\u6B63\u5728\u52A0\u8F7D"),xe.default.createElement(At.Button,{size:"sm",title:"\u5237\u65B0\u5DE5\u7A0B","aria-label":"\u5237\u65B0\u5DE5\u7A0B",icon:xe.default.createElement(At.IconRefreshOutlineRegular,null),disabled:_,onClick:()=>{j()}})),c&&xe.default.createElement("div",{className:"is-error",role:"alert"},c,xe.default.createElement(At.Button,{size:"sm",onClick:()=>{j()}},"\u91CD\u8BD5")),h&&xe.default.createElement("p",{className:"is-project-notice",role:"status"},h),xe.default.createElement("ul",{className:"is-project-list","aria-label":"\u5DE5\u7A0B\u5217\u8868","aria-busy":o===null},re.map(se=>xe.default.createElement("li",{key:se.id,"data-project-id":se.id},xe.default.createElement(At.Button,{className:"is-project-open",disabled:_||se.deleted===1,onClick:()=>{V(()=>e(se),"")}},xe.default.createElement("span",{className:"is-project-glyph"},xe.default.createElement(At.IconFolderOpenOutlineRegular,{size:22})),xe.default.createElement("span",{className:"is-project-copy"},xe.default.createElement("strong",{title:se.name},se.name),xe.default.createElement("span",null,se.kind==="interior"?"\u5BA4\u5185\u7A7A\u95F4":"\u5C55\u53F0",xe.default.createElement("i",null,"\xB7"),se.revision?`v${se.revision}`:"\u5C1A\u65E0\u786E\u8BA4\u7248\u672C",xe.default.createElement("i",null,"\xB7"),new Date(se.created).toLocaleDateString("zh-CN")))),xe.default.createElement("span",{className:`is-project-state${se.deleted?" is-danger-text":""}`},se.deleted?"\u5F85\u6E05\u7406":se.activity?"\u4F7F\u7528\u4E2D":""),xe.default.createElement(At.Menu,{open:m===se.id,onClose:()=>p(null),portal:!0,align:"end",autoFocus:!0,items:[{id:"open",label:"\u6253\u5F00\u5DE5\u7A0B",disabled:se.deleted===1},{id:"rename",label:"\u91CD\u547D\u540D",disabled:!!se.activity||se.deleted===1},{type:"separator",id:"separator"},{id:"delete",label:se.deleted?"\u91CD\u8BD5\u5220\u9664":"\u5220\u9664\u5DE5\u7A0B",danger:!0,disabled:!!se.activity}],onSelect:U=>{p(null),U==="open"?V(()=>e(se),""):$(U,se)},anchor:xe.default.createElement(At.Button,{size:"sm","aria-label":`\u7BA1\u7406 ${se.name}`,title:"\u7BA1\u7406\u5DE5\u7A0B","aria-haspopup":"menu","aria-expanded":m===se.id,disabled:_,icon:xe.default.createElement(At.IconEllipsisOutlineRegular,null),onClick:()=>p(m===se.id?null:se.id)})})))),o&&!re.length&&xe.default.createElement("div",{className:"is-projects-empty"},xe.default.createElement(At.IconFolderOpenOutlineRegular,{size:32}),xe.default.createElement("h2",null,f?"\u6CA1\u6709\u627E\u5230\u5DE5\u7A0B":"\u5F00\u59CB\u4F60\u7684\u7B2C\u4E00\u4E2A\u8BBE\u8BA1"),xe.default.createElement("p",null,f?"\u8BD5\u8BD5\u5176\u4ED6\u540D\u79F0\u3002":"\u65B0\u5EFA\u5DE5\u7A0B\uFF0C\u6216\u5728\u804A\u5929\u91CC\u62D6\u5165 CAD \u56FE\u7EB8\u3002"))),xe.default.createElement(At.Modal,{open:T!==null,title:{create:"\u65B0\u5EFA\u5DE5\u7A0B",rename:"\u91CD\u547D\u540D\u5DE5\u7A0B",delete:"\u5220\u9664\u5DE5\u7A0B"}[T?.action]??"\u8BBE\u8BA1\u5DE5\u7A0B",closeLabel:"\u5173\u95ED\u5BF9\u8BDD\u6846",onClose:()=>{_||w(null)},className:"is-dialog",contentClassName:"is-dialog-content"},T&&xe.default.createElement("form",{className:"is-form",onSubmit:ie},T.action==="delete"?xe.default.createElement(xe.default.Fragment,null,xe.default.createElement("p",null,"\u5C06\u6C38\u4E45\u5220\u9664\u300C",ye.name,"\u300D\u53CA\u5176\u672C\u5730\u56FE\u7EB8\u3001\u6A21\u578B\u3001\u6548\u679C\u56FE\u548C\u5386\u53F2\u7248\u672C\uFF0C\u65E0\u6CD5\u64A4\u9500\u3002"),xe.default.createElement("p",{className:"is-subtle"},"\u5DF2\u6709\u804A\u5929\u6D88\u606F\u548C\u56FE\u7247\u4F1A\u4FDD\u7559\u3002"),xe.default.createElement("label",null,"\u8F93\u5165\u5DE5\u7A0B\u540D\u79F0\u786E\u8BA4",xe.default.createElement("input",{"data-modal-autofocus":!0,required:!0,autoComplete:"off",value:y,maxLength:100,onChange:se=>A(se.target.value)}))):xe.default.createElement("label",null,"\u5DE5\u7A0B\u540D\u79F0",xe.default.createElement("input",{"data-modal-autofocus":!0,required:!0,autoComplete:"off",maxLength:100,value:y,onChange:se=>A(se.target.value)})),T.action==="create"&&xe.default.createElement(xe.default.Fragment,null,xe.default.createElement("label",null,"\u8BBE\u8BA1\u7C7B\u578B",xe.default.createElement("select",{value:C,onChange:se=>E(se.target.value)},xe.default.createElement("option",{value:"interior"},"\u5BA4\u5185\u7A7A\u95F4"),xe.default.createElement("option",{value:"booth"},"\u5C55\u53F0"))),!!r.items.length&&xe.default.createElement("label",null,"\u804A\u5929\u5DE5\u4F5C\u533A",xe.default.createElement("select",{required:!0,value:L,onChange:se=>S(se.target.value)},r.items.map(se=>xe.default.createElement("option",{key:se.workspaceId,value:se.workspaceId},se.title||se.path)))),xe.default.createElement("p",{className:"is-subtle"},"\u5C06\u6253\u5F00\u65B0\u7684\u8BBE\u8BA1\u804A\u5929\u548C\u5EFA\u6A21\u9762\u677F\u3002")),tt&&xe.default.createElement("p",{className:"is-error"},"\u5DE5\u7A0B\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5173\u95ED\u7A97\u53E3\u540E\u91CD\u65B0\u64CD\u4F5C\u3002"),Le?.activity&&xe.default.createElement("p",{className:"is-subtle"},Le.activity,"\uFF0C\u5B8C\u6210\u540E\u53EF\u7EE7\u7EED\u64CD\u4F5C\u3002"),c&&xe.default.createElement("p",{className:"is-error",role:"alert"},c),xe.default.createElement("div",{className:"is-dialog-actions"},xe.default.createElement(At.Button,{disabled:_,onClick:()=>w(null)},"\u53D6\u6D88"),xe.default.createElement(At.Button,{type:"submit",variant:T.action==="delete"?"outline":"primary",className:T.action==="delete"?"is-danger-text":"",disabled:ot||!y.trim()||T.action==="delete"&&y!==ye.name},_?"\u5904\u7406\u4E2D\u2026":{create:"\u521B\u5EFA\u5DE5\u7A0B",rename:"\u4FDD\u5B58\u540D\u79F0",delete:ye?.deleted?"\u91CD\u8BD5\u5220\u9664":"\u6C38\u4E45\u5220\u9664"}[T.action])))))}var Ve=nl(require("react"),1),en=require("@deepseek-ai/dsh-client-ui-primitives");var Ct=1e-7,jn=(i,e)=>e==="plan"?[i[0],i[1],i[2]]:e==="front"?[i[0],i[2],-i[1]]:e==="back"?[-i[0],i[2],i[1]]:e==="left"?[-i[1],i[2],-i[0]]:[i[1],i[2],i[0]],fi=(i,e,t)=>i.map((n,s)=>n+(e[s]-n)*t),os=i=>i.reduce((e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[0]),Math.max(e[3],t[1])],[1/0,1/0,-1/0,-1/0]),Gd=(i,e)=>i[0]<=e[2]+Ct&&i[2]>=e[0]-Ct&&i[1]<=e[3]+Ct&&i[3]>=e[1]-Ct,Wd=i=>[...new Set(i.map(e=>Math.round(e*1e8)/1e8))].sort((e,t)=>e-t);function _x(i){let e=[i.outline,...i.holes];return[...[0,i.depth].map(n=>e.map(s=>s.map(r=>pn(i,[...r,n])))),...e.flatMap(n=>n.map((s,r)=>[[pn(i,[...s,0]),pn(i,[...n[(r+1)%n.length],0]),pn(i,[...n[(r+1)%n.length],i.depth]),pn(i,[...s,i.depth])]]))]}function xx(i,e){let t=[];for(let n of[i.outline,...i.holes])n.forEach((s,r)=>{let o=n[(r+n.length-1)%n.length],a=n[(r+1)%n.length],c=pn(i,[...s,0]),l=pn(i,[...a,0]),h=pn(i,[...s,i.depth]);t.push([c,l],[h,pn(i,[...a,i.depth])]);let u=[s[0]-o[0],s[1]-o[1]],f=[a[0]-s[0],a[1]-s[1]],d=(u[0]*f[0]+u[1]*f[1])/(Math.hypot(...u)*Math.hypot(...f))>Math.cos(Math.PI/15),_=(p,T,w)=>{let y=jn(p,e),A=jn(T,e),C=jn(w,e);return(A[0]-y[0])*(C[1]-y[1])-(A[1]-y[1])*(C[0]-y[0])},x=_(pn(i,[...o,0]),c,h),m=_(c,l,pn(i,[...a,i.depth]));(!d||x*m<0||Math.abs(x)<Ct!=Math.abs(m)<Ct)&&t.push([c,h])});return t}function Xd(i,e){let t=i.map(r=>r.map(o=>jn(o,e))),n=t[0],s=n[0];for(let r=1;r<n.length-1;r++){let o=n[r],a=n[r+1],c=(o[0]-s[0])*(a[1]-s[1])-(o[1]-s[1])*(a[0]-s[0]);if(Math.abs(c)<1e-10)continue;let l=((o[2]-s[2])*(a[1]-s[1])-(a[2]-s[2])*(o[1]-s[1]))/c,h=((o[0]-s[0])*(a[2]-s[2])-(a[0]-s[0])*(o[2]-s[2]))/c;return{rings:t,bounds:os(n),u:l,v:h,k:s[2]-l*s[0]-h*s[1],maxDepth:Math.max(...n.map(u=>u[2]))}}return null}var qd=(i,e)=>Za(i,e.rings[0])&&!e.rings.slice(1).some(t=>Za(i,t));function yx(i,e,t,n){let s=e[0]-i[0],r=e[1]-i[1],o=n[0]-t[0],a=n[1]-t[1],c=s*a-r*o;if(Math.abs(c)<1e-12)return null;let l=((t[0]-i[0])*a-(t[1]-i[1])*o)/c,h=((t[0]-i[0])*r-(t[1]-i[1])*s)/c;return l>Ct&&l<1-Ct&&h>=-Ct&&h<=1+Ct?l:null}function vx(i,e){let t=[];return i.forEach((n,s)=>{let r=i[(s+1)%i.length],o=n[2]<=e,a=r[2]<=e;o&&t.push(n),o!==a&&t.push(fi(n,r,(e-n[2])/(r[2]-n[2])))}),t}function bx(i,e){let t=[];for(let l of i){let h=["plan","front","right"].map(d=>({view:d,face:Xd(l,d)})).find(d=>d.face);if(!h)continue;let u=[];for(let d of l)d.forEach((_,x)=>{let m=d[(x+1)%d.length];_[2]<e!=m[2]<e&&u.push(fi(_,m,(e-_[2])/(m[2]-_[2])))});if(u.length<2)continue;let f=Math.abs(u[0][0]-u[1][0])>=Math.abs(u[0][1]-u[1][1])?0:1;u.sort((d,_)=>d[f]-_[f]);for(let d=1;d<u.length;d++)qd(jn(fi(u[d-1],u[d],.5),h.view),h.face)&&t.push([u[d-1].slice(0,2),u[d].slice(0,2)])}let n=l=>l.map(h=>Math.round(h*1e6)).join(","),s=new Map;for(let[l,h]of t)n(l)!==n(h)&&s.set([n(l),n(h)].sort().join(":"),[l,h]);let r=[...s.values()],o=new Map;r.forEach((l,h)=>l.forEach(u=>{let f=n(u);o.has(f)||o.set(f,[]),o.get(f).push(h)}));let a=new Set,c=[];for(let l=0;l<r.length;l++){if(a.has(l))continue;let h=[r[l][0]],u=n(h[0]),f=r[l][1];for(a.add(l);n(f)!==u;){h.push(f);let d=o.get(n(f))?.find(m=>!a.has(m));if(d===void 0)break;a.add(d);let[_,x]=r[d];f=n(_)===n(f)?x:_}n(f)===u&&h.length>=3&&c.push(h)}return c}function Mx(i,e,t){let s=(t[2]-t[0]||1)/28,r=(t[3]-t[1]||1)/28,o=new Map,a=u=>{let f=(d,_,x)=>Math.max(0,Math.min(27,Math.floor((d-_)/x)));return[f(u[0],t[0],s),f(u[1],t[1],r),f(u[2],t[0],s),f(u[3],t[1],r)]};e.forEach((u,f)=>{let[d,_,x,m]=a(u.bounds);for(let p=d;p<=x;p++)for(let T=_;T<=m;T++){let w=p*28+T;o.has(w)||o.set(w,[]),o.get(w).push(f)}});let c=[],l=0;for(let u of i){let f=os([u.a,u.b]),[d,_,x,m]=a(f),p=new Set,T=[];for(let y=d;y<=x;y++)for(let A=_;A<=m;A++)for(let C of o.get(y*28+A)??[])p.add(C);for(let y of p){let A=e[y];if(!Gd(f,A.bounds)||A.maxDepth<=Math.min(u.a[2],u.b[2])+Ct)continue;let C=D=>A.u*D[0]+A.v*D[1]+A.k-D[2],E=C(u.a),L=C(u.b);if(Math.max(E,L)<=Ct)continue;if(++l>3e6)throw new Error("\u56FE\u7EB8\u6D88\u9690\u8BA1\u7B97\u8D85\u8FC7\u9884\u7B97\uFF0C\u8BF7\u7F29\u5C0F\u6784\u4EF6\u6570\u91CF\u6216\u62C6\u5206\u5DE5\u7A0B");let S=[0,1];E*L<0&&S.push(E/(E-L));for(let D of A.rings)D.forEach((z,W)=>{let Y=yx(u.a,u.b,z,D[(W+1)%D.length]);Y!==null&&S.push(Y)});let b=Wd(S);for(let D=1;D<b.length;D++){let z=b[D-1],W=b[D],Y=fi(u.a,u.b,(z+W)/2);W-z>Ct&&C(Y)>Ct&&qd(Y,A)&&T.push([z,W])}}T.sort((y,A)=>y[0]-A[0]);let w=0;for(let[y,A]of T)y>w+Ct&&c.push({...u,a:fi(u.a,u.b,w),b:fi(u.a,u.b,y)}),w=Math.max(w,A);w<1-Ct&&c.push({...u,a:fi(u.a,u.b,w),b:u.b})}let h=new Set;return c.filter(u=>{let f=[u.a,u.b].map(d=>d.slice(0,2).map(_=>Math.round(_*1e6)).join(",")).sort().join(":");return h.has(f)?!1:(h.add(f),!0)})}function Sx(i,e,{cutHeight:t=1.2,overhead:n=!1}={}){if(!Object.hasOwn(Ri,e))throw Error("\u672A\u77E5\u56FE\u7EB8\u89C6\u56FE");let s=[],r=[],o=[],a=[],c=[],l=(d,_,x,m=x.type)=>{d=jn(d,e),_=jn(_,e),Math.hypot(d[0]-_[0],d[1]-_[1])>Ct&&s.push({a:d,b:_,id:x.id,kind:m})};for(let d of i.objects){if(d.type==="floor"){let p=d.polygon?[d.polygon,...d.holes??[]]:[[[0,0],[d.width,0],[d.width,d.depth],[0,d.depth]]];for(let T of p)T.forEach((w,y)=>l([...w,0],[...T[(y+1)%T.length],0],d));continue}let _=d.type==="solid"?[d]:d.type==="model"?[hh(d)]:d.type==="asset"?[lh(d)]:d.type==="wall"?ch(d):[],x=_.flatMap(p=>ah(p).flat()),m=x.map(p=>jn(p,e));if(x.length){c.push({id:d.id,label:d.label,key:d.origin?.key??d.id,assembly:d.assembly,type:d.type,shape:d.shape,...d.type==="model"?{approximation:"imported_model_envelope"}:{},frontDepth:Math.max(...m.map(p=>p[2])),bounds:os(m),worldBounds:[0,1].map(p=>[0,1,2].map(T=>Math[p?"max":"min"](...x.map(w=>w[T]))))});for(let p of _){let T=_x(p),w=xx(p,e);if(e==="plan"){let y=T.flat(2).map(E=>E[2]),A=Math.min(...y),C=Math.max(...y);if(A>=t-Ct){if(n)for(let[E,L]of w){let S=jn(E,e),b=jn(L,e);Math.hypot(S[0]-b[0],S[1]-b[1])>Ct&&a.push({a:S,b,id:d.id,kind:"overhead"})}continue}if(C>t+Ct){let E=bx(T,t+1e-8);E.length&&o.push({rings:E,id:d.id,kind:d.type}),T=T.map(L=>L.map(S=>vx(S,t)).filter(S=>S.length>=3)).filter(L=>L.length),E.length&&T.push(E.map(L=>L.map(S=>[...S,t]))),w=w.flatMap(([L,S])=>L[2]>t&&S[2]>t?[]:[L[2]<=t&&S[2]<=t?[L,S]:L[2]>t?[fi(L,S,(t-L[2])/(S[2]-L[2])),S]:[L,fi(L,S,(t-L[2])/(S[2]-L[2]))]]);for(let L of E)L.forEach((S,b)=>w.push([[...S,t],[...L[(b+1)%L.length],t]]))}}for(let[y,A]of w)l(y,A,d);if(d.shape!=="text")for(let y of T){let A=Xd(y,e);A&&r.push(A)}}}}let h=s.flatMap(d=>[d.a,d.b]),u=h.length?os(h):[0,0,i.bounds[0],e==="plan"?i.bounds[1]:i.parameters?.height??1],f=Mx(s,r,u);if(e==="plan")for(let d of i.objects.filter(_=>_.type==="wall"))for(let _ of d.openings){if(_.sill>=t||_.top<=t)continue;let x=Ii(d,_.start),m=Ii(d,_.start+_.width),p=[m[0]-x[0],m[1]-x[1]],T=Math.hypot(...p);if(_.kind==="door"){let w=Math.atan2(p[1],p[0]),y=(_.swing==="right"?-1:1)*Math.PI/2,A=Array.from({length:25},(C,E)=>[x[0]+T*Math.cos(w+y*E/24),x[1]+T*Math.sin(w+y*E/24)]);f.push({a:[...x,0],b:[...A.at(-1),0],kind:"door",id:d.id});for(let C=1;C<A.length;C++)f.push({a:[...A[C-1],0],b:[...A[C],0],kind:"door",id:d.id})}else if(_.kind==="window"){let w=d.arc?Math.max(8,Math.ceil(_.width/.03)):Math.max(1,Math.ceil(_.width/Kr(d)*((d.path?.length??2)-1)));for(let y of[-d.thickness/3,0,d.thickness/3]){let A;for(let C=0;C<=w;C++){let E=_.start+_.width*C/w,L=Ii(d,E),S;if(d.arc){let b=d.arc.start+E/d.arc.radius,D=d.arc.radius+y;S=[d.arc.center[0]+D*Math.cos(b),d.arc.center[1]+D*Math.sin(b),0]}else{let b=Ii(d,Math.max(0,E-.001)),D=Ii(d,Math.min(Kr(d),E+.001)),z=D[0]-b[0],W=D[1]-b[1],Y=Math.hypot(z,W);S=[L[0]-W/Y*y,L[1]+z/Y*y,0]}A&&f.push({a:A,b:S,kind:"window",id:d.id}),A=S}}}}return{view:e,extents:u,lines:f,overhead:a,cuts:o,objects:c,cutHeight:t,basis:"opaque_prism_faces_with_holes",catalogBasis:"envelopes"}}var Hd=i=>Math.abs(i)<5e-4?"0":String(Math.round(i*1e3)),Ja={wall:"#171b20",solid:"#293d44",model:"#293d44",asset:"#326b78",floor:"#a4a8aa",door:"#435e65",window:"#326b78",overhead:"#969da1",dimension:"#238165",extension:"#78a495",frame:"#454c52",note:"#666f76"},Yd=(i,e)=>e.startsWith("section_")||e!=="plan"&&i.objects.some(t=>t.type==="model"||t.type==="asset"||t.shape==="text");function jd(i,e,{name:t=i.design?.name??"\u8BBE\u8BA1\u5DE5\u7A0B",revision:n=0,draft:s=!1,overhead:r=!1,geometry:o}={}){let a=o??Sx(i,e,{overhead:r}),[c,l,h,u]=a.extents,f=Math.max(h-c,.001),d=Math.max(u-l,.001),x=[10,20,25,50,75,100,150,200,250,500,1e3,2e3,5e3,1e4].find(N=>f*1e3/N<=266&&d*1e3/N<=220)??Math.ceil(Math.max(f/266,d/220)*1e3),m=1e3/x,p=[158-f*m/2,126+d*m/2],T=([N,X])=>[p[0]+(N-c)*m,p[1]-(X-l)*m],w={width:420,height:297,name:t,view:e,label:Ri[e],scale:x,revision:n,draft:s,geometry:a,lines:[],paths:[],texts:[],dimensions:[],notes:[]},y=(N,X,ee="frame",ce={})=>w.lines.push({a:N,b:X,kind:ee,...ce}),A=(N,X,ee=2.6,ce="note",Ne={})=>w.texts.push({value:String(N),p:X,size:ee,kind:ce,...Ne}),C=(N,X,ee,ce,Ne="frame")=>{y([N,X],[N+ee,X],Ne),y([N+ee,X],[N+ee,X+ce],Ne),y([N+ee,X+ce],[N,X+ce],Ne),y([N,X+ce],[N,X],Ne)};C(6,6,408,285),C(10,10,400,277),y([310,10],[310,260]),y([10,260],[410,260]);for(let N of a.cuts)w.paths.push({rings:N.rings.map(X=>X.map(T)),kind:"cut",fill:N.kind==="wall"?"#9da8ae":"#c4cdd1",id:N.id});for(let N of[...a.lines,...a.overhead])y(T(N.a),T(N.b),N.kind,{id:N.id,dash:N.kind==="overhead"});let E=(N,X,ee,ce,Ne=!1)=>{let nt=T(N),P=T(X),Xe=ce==="y",ze=Xe?[ee,nt[1]]:[nt[0],ee],ke=Xe?[ee,P[1]]:[P[0],ee],be=Hd(Math.abs(X[Xe?1:0]-N[Xe?1:0]));if(be==="0")return;let qe=Xe?[ee-1.6,(nt[1]+P[1])/2]:[(nt[0]+P[0])/2,ee-1.6];y(nt,Xe?[ee+(ee<nt[0]?-1.5:1.5),nt[1]]:[nt[0],ee+(ee<nt[1]?-1.5:1.5)],"extension"),y(P,Xe?[ee+(ee<P[0]?-1.5:1.5),P[1]]:[P[0],ee+(ee<P[1]?-1.5:1.5)],"extension"),y(ze,ke,"dimension");for(let oe of[ze,ke])y([oe[0]-1.1,oe[1]+1.1],[oe[0]+1.1,oe[1]-1.1],"dimension");A(be,qe,Ne?3.5:3.2,"dimension",{anchor:"middle",rotation:Xe?-90:0,mask:!0}),w.dimensions.push({axis:ce,a:N,b:X,paperA:nt,paperB:P,offset:ee,textSize:Ne?3.5:3.2,value:Number(be),unit:"mm",basis:"projected_geometry"})},L=i.design?.review?.referenceExtents??[0,0,...i.bounds],S=e==="plan"?[[L[0],L[1]],[L[2],L[3]]]:[[c,l],[h,u]],[b,D]=S,z=T(b),W=T(D);E([b[0],b[1]],[D[0],b[1]],Math.max(z[1],W[1])+18,"x",!0),E([b[0],b[1]],[b[0],D[1]],Math.min(z[0],W[0])-18,"y",!0);let Y=(N,X)=>{let ee=N==="x"?0:1,ce=1-ee,Ne=ee?d:f,nt=S[0][ee],P=S[1][ee],Xe=[nt,P],ze=Math.max(...a.objects.map(de=>de.frontDepth)),ke=e==="plan"?a.cuts.flatMap(de=>de.rings.map(lt=>os(lt))):a.objects.filter(de=>de.type!=="asset"&&de.shape!=="text"&&de.frontDepth>=ze-.35&&(de.bounds[2]-de.bounds[0])*(de.bounds[3]-de.bounds[1])>=f*d*.008).map(de=>de.bounds);for(let de of ke)Math.min(Math.abs(de[ce]-X),Math.abs(de[ce+2]-X))<=Math.max(.35,(ce?d:f)*.045)&&Xe.push(de[ee],de[ee+2]);if(e==="plan")for(let de of i.objects.filter(lt=>lt.type==="wall"))for(let lt of de.openings){let ut=Ii(de,lt.start),I=Ii(de,lt.start+lt.width);Math.abs(ut[ce]-X)<.4&&Math.abs(I[ce]-X)<.4&&Xe.push(ut[ee],I[ee])}let be=Wd(Xe.filter(de=>de>=nt-Ct&&de<=P+Ct)),qe=Math.max(.22,Ne*.026,6.6/m),oe=[be[0]];for(let de of be.slice(1,-1))de-oe.at(-1)>=qe&&P-de>=qe&&oe.push(de);if(oe.push(P),!(oe.length<=2))for(let de=1;de<oe.length;de++){let lt=ee?[X,oe[de-1]]:[oe[de-1],X],ut=ee?[X,oe[de]]:[oe[de],X];E(lt,ut,ee?Math.min(z[0],W[0])-9:Math.max(z[1],W[1])+9,N)}};if(Y("x",b[1]),Y("y",b[0]),e!=="plan"){let N=T([c,0])[1];y([T([c,0])[0]-4,N],[T([h,0])[0]+4,N],"ground"),A("\xB10.000",[T([c,0])[0]+2,N-2],2.5,"note")}else if(i.kind==="interior")for(let N of i.objects.filter(X=>X.type==="floor"&&X.labelPoint)){let X=T(N.labelPoint),ee=i.design?.review?.rooms?.find(Ne=>Ne.id===N.id),ce=ee?.clear;A(N.label,X,3,"frame",{anchor:"middle",mask:!0}),Number.isFinite(ce?.area??N.area)&&A(`${ce?"\u51C0\u9762\u79EF":"\u8F6E\u5ED3\u9762\u79EF"} ${(ce?.area??N.area).toFixed(2)} m\xB2`,[X[0],X[1]+4.5],2.4,"note",{anchor:"middle",mask:!0})}let K=os(w.lines.filter(N=>N.kind!=="frame").flatMap(N=>[N.a,N.b]));w.focusBounds=[K[0]-8,K[1]-8,K[2]+8,K[3]+8];let j=new Map;for(let N of a.objects.filter(X=>X.type==="solid"||X.type==="model")){let X=N.assembly??N.key;j.has(X)||j.set(X,[]),j.get(X).push(N)}let $=[...j].map(([N,X])=>{let ee=[0,1].map(ce=>[0,1,2].map(Ne=>Math[ce?"max":"min"](...X.map(nt=>nt.worldBounds[ce][Ne]))));return{key:N,items:X,b:ee,dimensions:ee[1].map((ce,Ne)=>ce-ee[0][Ne])}}),V=new Map($.map((N,X)=>[N.key,`C${String(X+1).padStart(2,"0")}`]));A("\u6784\u4EF6\u7EC4\u5408\u7D22\u5F15",[316,20],3.4,"frame"),A("\u7EC4\u5408\u5916\u5305 \xB7 \u5BBD \xD7 \u6DF1 \xD7 \u9AD8\uFF08mm\uFF09",[316,27],2.2);let ie=15,re=[],ye=0;$.slice(0,ie).forEach((N,X)=>{let ee=35+X*11.5,ce=V.get(N.key);A(ce,[316,ee],2.7,"frame");let Ne=[...N.items].sort((be,qe)=>{let oe=de=>de.worldBounds[1].reduce((lt,ut,I)=>lt*(ut-de.worldBounds[0][I]),1);return oe(qe)-oe(be)})[0].label.replace(/[（(].*$/,""),nt=Array.from(Ne).slice(0,18).join("")+(N.items.length>1?` \u7B49${N.items.length}\u4EF6`:"");A(nt,[328,ee],2.4,"frame"),A(N.dimensions.map(Hd).join(" \xD7 "),[328,ee+4.2],2.3);let P=N.items.flatMap(be=>[[be.bounds[0],be.bounds[1]],[be.bounds[2],be.bounds[3]]]),Xe=os(P),ze=T([(Xe[0]+Xe[2])/2,(Xe[1]+Xe[3])/2]);if((Xe[2]-Xe[0])*(Xe[3]-Xe[1])>f*d*.65)return;if(a.lines.some(be=>N.items.some(qe=>qe.id===be.id))){let qe=[[0,0],...[5,10,15,20,25].flatMap(oe=>[[oe,0],[-oe,0],[0,oe],[0,-oe],[oe,oe],[-oe,oe],[oe,-oe],[-oe,-oe]])].map(([oe,de])=>[ze[0]+oe,ze[1]+de]).find(oe=>{let de=[oe[0]-4,oe[1]-3,oe[0]+4,oe[1]+2];return de[0]>=12&&de[1]>=12&&de[2]<=307&&de[3]<=257&&!re.some(lt=>Gd(de,lt))});qe?(re.push([qe[0]-4,qe[1]-3,qe[0]+4,qe[1]+2]),Math.hypot(qe[0]-ze[0],qe[1]-ze[1])>1&&y(ze,qe,"note"),A(ce,qe,2.6,"locator",{anchor:"middle",mask:!0})):ye++}});let Le=a.basis==="actual_mesh_feature_edges; sampled_orthographic_visibility",tt=[e==="plan"?`\u5E73\u9762\u5256\u5207\u6807\u9AD8 +${wx(a.cutHeight)} m`:e.startsWith("section_")?`${a.cutAxis?.toUpperCase()}=${a.cutAt?.toFixed(3)} m\u5256\u5207 \xB7 \u4FDD\u7559\u6B63\u5411\u4FA7`:Le?"\u5B9E\u9645\u7F51\u683C\u6B63\u6295\u5F71 \xB7 \u6D88\u9690\u91C7\u6837\u22645mm":"\u6B63\u6295\u5F71 \xB7 \u5DF2\u6309\u5B9E\u4F53\u8868\u9762\u6D88\u9690","\u5C3A\u5BF8\u6570\u503C\u4E3A\u6BEB\u7C73\uFF1B\u6807\u9AD8\u4E3A\u7C73\u3002","\u7EC4\u5408\u5916\u5305\u5305\u542B\u95F4\u9694\uFF0C\u4E0D\u662F\u5355\u4EF6\u4E0B\u6599\u5C3A\u5BF8\u3002",Le?"\u5F62\u4F53\u3001\u5B57\u5F62\u6765\u81EA\u7F51\u683C\uFF1B\u56FE\u50CF\u9970\u9762\u672A\u63CF\u7EBF\u3002":"\u76EE\u5F55\u53CA\u5BFC\u5165\u6A21\u578B\u4EE5\u5305\u7EDC\u8868\u793A\uFF0C\u6587\u5B57\u4EE5\u5916\u6846\u8868\u793A\u3002","\u672A\u5EFA\u6A21\u7684\u8282\u70B9\u548C\u5DE5\u827A\u4E0D\u5728\u81EA\u52A8\u6807\u6CE8\u8303\u56F4\u3002",...$.length>ie?[`\u7EC4\u5408\u7D22\u5F15 ${ie}/${$.length}\uFF0C\u5B8C\u6574\u53C2\u6570\u89C1\u5DE5\u7A0B\u3002`]:[],...ye?[`\u8FC7\u5BC6\u7D22\u5F15\u7701\u7565${ye}\u5904\uFF0C\u53C2\u7167\u7EC4\u5408\u8868\u3002`]:[]];tt.forEach((N,X)=>A(N,[316,222+X*5],2.2)),w.notes=tt;let ot=Array.from(t).reduce((N,X,ee)=>{let ce=Math.floor(ee/42);return N[ce]=(N[ce]??"")+X,N},[]).slice(0,2);A("DSH / \u8BBE\u8BA1\u56FE\u7EB8",[16,270],3.1,"frame"),ot.forEach((N,X)=>A(N,[16,277+X*4.3],2.8,"frame")),y([204,260],[204,287]),y([310,260],[310,287]),y([363,260],[363,287]),A(Ri[e],[210,272],4.2,"frame"),A(`\u6BD4\u4F8B 1:${x} \xB7 A3`,[210,282],2.6),A(s?"\u5F85\u786E\u8BA4\u8349\u6848":`\u573A\u666F\u7248\u672C v${n}`,[316,271],2.7,"frame"),A("\u5C3A\u5BF8\u6765\u6E90\uFF1A\u5F53\u524D\u6A21\u578B",[316,281],2.3),A(`A-${101+Object.keys(Ri).indexOf(e)}`,[370,272],4.4,"frame"),A("CAD / mm",[370,282],2.5);let se=Math.min(5,Math.max(.1,Math.floor(70/m)),Math.floor(f/2)||1),U=se*m/4;for(let N=0;N<4;N++)w.paths.push({rings:[[[316+N*U,207],[316+(N+1)*U,207],[316+(N+1)*U,209],[316+N*U,209]]],kind:"frame",fill:N%2?"#ffffff":"#20252a"});return A("0",[316,216],2.1),A(`${se} m`,[316+se*m,216],2.1,"note",{anchor:"end"}),w}var wx=i=>i.toFixed(3),uh=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[e]),dh=i=>({color:Ja[i]??Ja.frame,width:{wall:.5,solid:.3,model:.3,asset:.25,floor:.13,door:.22,window:.22,overhead:.13,extension:.12,dimension:.2,frame:.2,ground:.35,cut:.4}[i]??.2});function $d(i){let e=i.paths.map(r=>`<path d="${r.rings.map(o=>o.map((a,c)=>`${c?"L":"M"}${a.join(",")}`).join("")+"Z").join("")}" fill="${r.fill??"none"}" fill-rule="evenodd" stroke="${dh(r.kind).color}" stroke-width="${dh(r.kind).width}"/>`).join(""),t=new Map;for(let r of i.lines){let o=r.kind+!!r.dash;t.has(o)||t.set(o,[]),t.get(o).push(r)}let n=[...t.values()].map(r=>{let o=r[0],a=dh(o.kind);return`<path d="${r.map(c=>`M${c.a.join(",")}L${c.b.join(",")}`).join("")}" fill="none" stroke="${a.color}" stroke-width="${a.width}"${o.dash?' stroke-dasharray="2 1"':""}/>`}).join(""),s=i.texts.map(r=>`<text x="${r.p[0]}" y="${r.p[1]}" font-size="${r.size}" fill="${r.kind==="dimension"?"#20252a":r.kind==="locator"?"#234955":Ja[r.kind]??Ja.note}" text-anchor="${r.anchor??"start"}"${r.rotation?` transform="rotate(${r.rotation} ${r.p.join(" ")})"`:""}${r.mask?' stroke="white" stroke-width="1.4" stroke-linejoin="round" paint-order="stroke"':""}>${uh(r.value)}</text>`).join("");return`<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="297mm" viewBox="0 0 420 297" role="img" aria-label="${uh(i.label+"\uFF0C\u6BEB\u7C73\u6807\u6CE8\uFF0C\u6BD4\u4F8B1:"+i.scale)}"><title>${uh(i.name+" \xB7 "+i.label)}</title><rect width="420" height="297" fill="white"/><g font-family="Arial, PingFang SC, sans-serif" stroke-linecap="round" stroke-linejoin="round">${e}${n}${s}</g></svg>`}var Zd=(i,e,t)=>{let n=URL.createObjectURL(new Blob([i],{type:t})),s=document.createElement("a");s.href=n,s.download=e.replace(/[<>:"/\\|?*\x00-\x1f]/g,"-"),s.click(),setTimeout(()=>URL.revokeObjectURL(n),5e3)},fh={zoom:1,pan:[0,0]};function Kd({scene:i,geometryKey:e,view:t,selector:n,name:s,revision:r,draft:o,drawingId:a,api:c,sessionId:l}){let[h,u]=(0,Ve.useState)(!1),[f,d]=(0,Ve.useState)(fh),[_,x]=(0,Ve.useState)({width:1,height:1}),[m,p]=(0,Ve.useState)(!1),[T,w]=(0,Ve.useState)(!1),[y,A]=(0,Ve.useState)(""),[C,E]=(0,Ve.useState)(null),[L,S]=(0,Ve.useState)(0),b=(0,Ve.useRef)(null),D=(0,Ve.useRef)(null),z=(0,Ve.useRef)(null),[W,Y]=(0,Ve.useState)(""),[K,j]=(0,Ve.useState)("");(0,Ve.useEffect)(()=>{Y(""),j("")},[t,e]);let $=t.startsWith("section_"),V=Yd(i,t),ie=`${e}:${t}:${$?W:""}`;(0,Ve.useEffect)(()=>{if(!V){E(null);return}let U=new AbortController;return E({key:ie,loading:!0}),c(l,"drawing-sheet",{expectedRevision:r,view:t,...$&&W!==""?{cutAt:Number(W)}:{},...a?{drawingId:a}:{}},void 0,U.signal).then(N=>{U.signal.aborted||E({key:ie,sheet:N.sheet})}).catch(N=>{U.signal.aborted||E({key:ie,error:N.message})}),()=>U.abort()},[ie,V,l,r,a,c,L]);let re=(0,Ve.useMemo)(()=>{if(V&&(C?.key!==ie||C.loading))return{loading:!0};if(V&&C.error)return{error:C.error};try{let U=V?C.sheet:jd(i,t,{name:s,revision:r,draft:o,overhead:h});return{sheet:U,svg:$d(U)}}catch(U){return{error:U.message}}},[e,t,s,r,o,h,V,ie,C]),ye=Math.max(.01,Math.min((_.width-32)/420,(_.height-32)/297)),Le=()=>{let U=re.sheet?.focusBounds;if(!U)return fh;let N=Math.min((_.width-32)/(U[2]-U[0]),(_.height-32)/(U[3]-U[1])),X=Math.min(6,Math.max(.5,N/ye)),ee=ye*X;return{zoom:X,pan:[(210-(U[0]+U[2])/2)*ee,(148.5-(U[1]+U[3])/2)*ee]}};(0,Ve.useEffect)(()=>{d(Le()),A("")},[e,t,_.width,_.height,re.sheet]),(0,Ve.useEffect)(()=>{z.current?.abort(),z.current=null,w(!1)},[e,l]),(0,Ve.useEffect)(()=>{if(!b.current)return;let U=new ResizeObserver(([N])=>x({width:N.contentRect.width,height:N.contentRect.height}));return U.observe(b.current),()=>U.disconnect()},[re.error,re.loading]);let tt=(U,N=[0,0])=>d(X=>{let ee=Math.min(6,Math.max(.5,X.zoom*U)),ce=ee/X.zoom;return{zoom:ee,pan:N.map((Ne,nt)=>Ne-(Ne-X.pan[nt])*ce)}});(0,Ve.useEffect)(()=>{let U=b.current;if(!U)return;let N=X=>{X.preventDefault();let ee=U.getBoundingClientRect();tt(Math.exp(-X.deltaY*.0018),[X.clientX-ee.left-ee.width/2,X.clientY-ee.top-ee.height/2])};return U.addEventListener("wheel",N,{passive:!1}),()=>U.removeEventListener("wheel",N)},[re.error,re.loading]),(0,Ve.useEffect)(()=>()=>z.current?.abort(),[]);let ot=async U=>{if(p(!1),A(""),U==="svg"){Zd(re.svg,`${s}-${re.sheet.label}-v${r}.svg`,"image/svg+xml");return}let N=new AbortController;z.current=N,w(!0);try{let X=await c(l,"drawing-set",{expectedRevision:r,includeSections:!0,...a?{drawingId:a}:{}},void 0,N.signal);N.signal.throwIfAborted(),Zd(Uint8Array.from(atob(X.base64),ee=>ee.charCodeAt(0)),X.filename,"application/dxf")}catch(X){N.signal.aborted||A(X.message)}finally{z.current===N&&(N.signal.aborted||w(!1),z.current=null)}},se=ye*f.zoom;return Ve.default.createElement("div",{className:"is-drawing-viewer"},Ve.default.createElement("div",{className:"is-sheet-toolbar"},n,Ve.default.createElement("div",{className:"is-drawing-controls"},$&&Ve.default.createElement("label",null,"\u5256\u5207\u4F4D\u7F6E m",Ve.default.createElement("input",{"aria-label":"\u5256\u5207\u4F4D\u7F6E\uFF0C\u7C73",type:"number",min:"0.001",step:"0.1",style:{width:65},value:K,placeholder:String(i.bounds[t==="section_x"?0:1]/2),onChange:U=>j(U.target.value),onBlur:()=>Y(K),onKeyDown:U=>{U.key==="Enter"&&(U.preventDefault(),Y(K))}})),Ve.default.createElement("span",{className:"is-drawing-scale"},"mm \xB7 1:",re.sheet?.scale??"\u2014"),Ve.default.createElement(en.Button,{size:"sm","aria-label":"\u7F29\u5C0F\u56FE\u7EB8",title:"\u7F29\u5C0F",disabled:f.zoom<=.5,onClick:()=>tt(1/1.25)},"\u2212"),Ve.default.createElement("span",{className:"is-drawing-zoom","aria-label":"\u56FE\u7EB8\u7F29\u653E\u6BD4\u4F8B"},Math.round(f.zoom*100),"%"),Ve.default.createElement(en.Button,{size:"sm","aria-label":"\u653E\u5927\u56FE\u7EB8",title:"\u653E\u5927",disabled:f.zoom>=6,onClick:()=>tt(1.25),icon:Ve.default.createElement(en.IconPlusOutlineRegular,null)}),Ve.default.createElement(en.Button,{size:"sm","aria-label":"\u56FE\u7EB8\u9002\u5408\u7A97\u53E3",title:"\u9002\u5408\u56FE\u5F62 \xB7 0",onClick:()=>d(Le()),icon:Ve.default.createElement(en.IconFullscreenOutlineRegular,null)}),Ve.default.createElement(en.Button,{size:"sm","aria-label":"\u67E5\u770B\u6574\u5F20\u56FE\u7EB8",title:"\u67E5\u770B\u56FE\u6846\u3001\u56FE\u7B7E\u548C\u6784\u4EF6\u7D22\u5F15",onClick:()=>d(fh)},"\u6574\u9875"),Ve.default.createElement(en.Menu,{open:m,onClose:()=>p(!1),portal:!0,align:"end",autoFocus:!0,onSelect:U=>{ot(U)},items:[{id:"svg",label:"\u5F53\u524D\u56FE\u7EB8 \xB7 SVG",disabled:!!re.error||re.loading},{id:"dxf",label:T?"\u6B63\u5728\u5BFC\u51FA\u56FE\u518C\u2026":"\u5168\u5957\u56FE\u7EB8 \xB7 DXF",disabled:T||!!re.error||re.loading}],anchor:Ve.default.createElement(en.Button,{size:"sm","aria-label":"\u5BFC\u51FA\u56FE\u7EB8",title:"\u5BFC\u51FA\u56FE\u7EB8","aria-haspopup":"menu","aria-expanded":m,disabled:T,icon:Ve.default.createElement(en.IconDownloadOutlineRegular,null),onClick:()=>p(U=>!U)})}))),y&&Ve.default.createElement("p",{className:"is-error",role:"alert"},y),re.loading?Ve.default.createElement("p",{role:"status"},"\u6B63\u5728\u751F\u6210\u7ACB\u9762\u56FE\u2026"):re.error?Ve.default.createElement("p",{className:"is-error",role:"alert"},"\u56FE\u7EB8\u751F\u6210\u5931\u8D25\uFF1A",re.error," ",V&&Ve.default.createElement(en.Button,{size:"sm",onClick:()=>S(U=>U+1)},"\u91CD\u8BD5")):Ve.default.createElement("div",{className:"is-cad-canvas",ref:b,tabIndex:0,"aria-label":"CAD \u56FE\u7EB8\u753B\u5E03\uFF0C\u6EDA\u8F6E\u7F29\u653E\uFF0C\u62D6\u52A8\u5E73\u79FB\uFF0C\u6309 0 \u9002\u5408\u56FE\u5F62",onDoubleClick:()=>d(Le()),onKeyDown:U=>{if(U.key==="0")d(Le()),U.preventDefault();else if(["+","=","-"].includes(U.key))tt(U.key==="-"?1/1.25:1.25),U.preventDefault();else if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(U.key)){let N={ArrowLeft:[24,0],ArrowRight:[-24,0],ArrowUp:[0,24],ArrowDown:[0,-24]};d(X=>({...X,pan:X.pan.map((ee,ce)=>ee+N[U.key][ce])})),U.preventDefault()}},onPointerDown:U=>{U.button===0&&(D.current={x:U.clientX,y:U.clientY},U.currentTarget.setPointerCapture(U.pointerId))},onPointerMove:U=>{if(!D.current)return;let N=U.clientX-D.current.x,X=U.clientY-D.current.y;D.current={x:U.clientX,y:U.clientY},d(ee=>({...ee,pan:[ee.pan[0]+N,ee.pan[1]+X]}))},onPointerUp:()=>{D.current=null},onPointerCancel:()=>{D.current=null}},Ve.default.createElement("div",{className:"is-cad-paper",style:{width:420*se,height:297*se,left:`calc(50% + ${f.pan[0]}px)`,top:`calc(50% + ${f.pan[1]}px)`},dangerouslySetInnerHTML:{__html:re.svg}})),Ve.default.createElement("div",{className:"is-drawing-caption"},Ve.default.createElement("span",null,"\u6EDA\u8F6E\u7F29\u653E \xB7 \u62D6\u52A8\u5E73\u79FB \xB7 \u53CC\u51FB\u9002\u5408\u56FE\u5F62"),t==="plan"&&Ve.default.createElement("label",null,Ve.default.createElement("input",{type:"checkbox",checked:h,onChange:U=>u(U.target.checked)}),"\u663E\u793A\u4E0A\u65B9\u6784\u4EF6"),Ve.default.createElement("span",null,o?"\u5F85\u786E\u8BA4\u8349\u6848":`v${r}`," \xB7 A3 \u77E2\u91CF\u56FE\u7EB8")))}var Tx=["slots","locale","sidebarRight","sidebarRightTabs","connection","layout","sessions","workspaces","uiWorkspace"],Jr="dsh-interior-studio",ph="interior-studio-projects",as=new Set,Qr="",Qa=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0)),Jd=(i,e)=>({"plan.dxf":e?.detail.cadAudit?.passed?"CAD \u56FE\u7EB8\u56FE\u518C \xB7 DXF":"\u539F\u59CB\u53C2\u8003 CAD \xB7 DXF","scene.blend":"Blender \u5DE5\u7A0B","scene.glb":"\u4E09\u7EF4\u6A21\u578B \xB7 GLB","render.png":"\u6548\u679C\u56FE \xB7 PNG"})[i]??(rs[i.slice(7,-4)]?`${rs[i.slice(7,-4)]}\u6548\u679C\u56FE \xB7 PNG`:i);function Ex({bytes:i,selection:e,onSelect:t,cameraView:n}){let s=(0,g.useRef)(null),r=(0,g.useRef)(t),o=(0,g.useRef)(e),a=(0,g.useRef)(null),c=(0,g.useRef)(null),l=(0,g.useRef)(null),[h,u]=(0,g.useState)(""),[f,d]=(0,g.useState)(!1),_=(0,g.useRef)(n);return _.current=n,r.current=t,o.current=e,(0,g.useEffect)(()=>{if(d(!1),u(""),!i||!s.current)return;let x=!1,m,p,T,w,y,A=!c.current,C=s.current,E=new br,L=new Pt(45,1,.01,5e3);try{m=new Ga({antialias:!0,alpha:!0}),m.setClearColor(0,0),m.setPixelRatio(Math.min(devicePixelRatio,2)),m.outputColorSpace=It,m.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7F29\u653E\u7684\u4E09\u7EF4\u573A\u666F\uFF0C\u62D6\u52A8\u65CB\u8F6C\uFF0C\u70B9\u51FB\u9009\u62E9"),m.domElement.tabIndex=0,C.append(m.domElement),E.add(new Ur(16777215,7630435,2.8));let S=new $i(16777215,2.5);S.position.set(4,9,6),E.add(S);let b=()=>{x||m.render(E,L)},D=()=>{T?.traverse($=>{if(!$.isMesh)return;let V=$;for(;V&&!V.userData.studio_id;)V=V.parent;for(let ie of Array.isArray($.material)?$.material:[$.material])ie.emissive?.set(0),V?.userData.studio_id===o.current?.objectId&&(!o.current.surfaceId||ie.name.includes("__"+o.current.surfaceId+"__"))&&ie.emissive?.set("#182c5c")}),b()};a.current={highlight:D};let z=()=>{let $=Math.max(C.clientWidth,1),V=Math.max(C.clientHeight,1);(l.current?.w!==$||l.current?.h!==V)&&(A=!0),l.current={w:$,h:V},m.setSize($,V),L.aspect=$/V,L.updateProjectionMatrix(),A&&y&&p&&(oh(L,p.target,y,$/V),p.update(),A=!1),b()};w=new ResizeObserver(z),w.observe(C),new Ya().parse(Qa(i).buffer,"",$=>{if(x){$a($.scene);return}T=$.scene,E.add(T);let V=new Jt().setFromObject(T),ie=V.getCenter(new O);y=V;let re=V.getSize(new O).length();$.cameras[0]?L=$.cameras[0]:(L.position.copy(ie).add(new O(re,re,re)),L.lookAt(ie)),p=new qa(L,m.domElement),p.target.fromArray(L.userData.studio_target??ie.toArray());let ye=!!c.current;c.current&&(L.position.fromArray(c.current.position),p.target.fromArray(c.current.target)),p.enableDamping=!1,p.maxDistance=Math.max(20,re*4),p.minDistance=.3,p.addEventListener("change",()=>{c.current={position:L.position.toArray(),target:p.target.toArray()},b()}),a.current.showView=Le=>{Ud(L,p.target,y,Math.max(C.clientWidth,1)/Math.max(C.clientHeight,1),Le),p.update(),b()},p.listenToKeyEvents(m.domElement),p.update(),z(),D(),u(""),d(!0),!ye&&_.current&&a.current.showView(_.current.id)},$=>{x||u("\u4E09\u7EF4\u9884\u89C8\u52A0\u8F7D\u5931\u8D25\uFF1A"+$.message)});let Y,K=$=>{Y=$.button===0?[$.clientX,$.clientY]:null},j=$=>{let V=Y;if(Y=null,!T||!V||Math.hypot($.clientX-V[0],$.clientY-V[1])>5)return;let ie=m.domElement.getBoundingClientRect(),re=new zr;re.setFromCamera(new Ge(($.clientX-ie.left)/ie.width*2-1,-($.clientY-ie.top)/ie.height*2+1),L);let ye=re.intersectObject(T,!0).find(se=>{let U=se.object;for(;U&&!U.userData.studio_id;)U=U.parent;return!!U});if(!ye)return;let Le=ye.object;for(;!Le.userData.studio_id;)Le=Le.parent;let ot=(Array.isArray(ye.object.material)?ye.object.material[ye.face.materialIndex]:ye.object.material).name.match(/__(side-[ab])__/)?.[1];if(Le.userData.studio_type==="wall"&&!ot){u("\u8BF7\u70B9\u9009\u5899\u7684\u4E00\u4FA7\uFF0C\u6216\u5728\u5BF9\u8C61\u5217\u8868\u4E2D\u9009\u62E9 A/B \u9762");return}r.current(Le.userData.studio_id,ot)};return m.domElement.addEventListener("pointerdown",K),m.domElement.addEventListener("pointerup",j),()=>{x=!0,a.current=null,w?.disconnect(),p?.dispose(),$a(E),m.dispose(),m.forceContextLoss(),m.domElement.remove()}}catch(S){return u("\u6B64\u8BBE\u5907\u672A\u80FD\u521B\u5EFA WebGL \u753B\u5E03\uFF0C\u53EF\u7EE7\u7EED\u4F7F\u7528\u5BF9\u8C61\u5217\u8868\uFF1A"+S.message),()=>{x=!0,w?.disconnect(),p?.dispose(),T&&$a(T),m?.dispose(),m?.forceContextLoss(),m?.domElement.remove()}}},[i]),(0,g.useEffect)(()=>{a.current?.highlight()},[e?.token]),(0,g.useEffect)(()=>{a.current?.showView?.(n.id)},[n]),g.default.createElement("div",{className:"is-viewport",ref:s,"aria-busy":!f&&!h},h&&g.default.createElement("p",{className:"is-error",role:"alert"},h),!f&&!h&&g.default.createElement("p",{className:"is-placeholder"},g.default.createElement(te.IconLoadingOutlineRegular,{size:18}),"\u6B63\u5728\u51C6\u5907\u4E09\u7EF4\u573A\u666F"))}function mh({report:i,calibrationIndex:e,openingOverrides:t={},excludedRooms:n=[]}){let[s,r,o,a]=i.extents,c=o-s||1,l=a-r||1,h=Math.max(c,l)*.06,u=d=>d.map((_,x)=>`${x?"L":"M"}${_[0]},${_[1]}`).join(" "),f=new Set(i.openings.flatMap((d,_)=>t[_]==="ignore"&&i.walls[d.wallIndex]?.openingBridge?[d.wallIndex]:[]));return g.default.createElement("svg",{className:"is-plan",viewBox:`${-h} ${-h} ${c+h*2} ${l+h*2}`,role:"img","aria-label":i.generated?"\u5BF9\u8BDD\u751F\u6210\u7684 CAD \u65B9\u6848":"\u672C\u5730\u89E3\u6790\u7684\u5899\u4E2D\u5FC3\u7EBF\u4E0E\u95E8\u7A97\u5019\u9009"},g.default.createElement("g",{transform:`translate(${-s},${a}) scale(1,-1)`,fill:"none",strokeWidth:Math.max(c,l)*.006},(i.rooms??[]).map((d,_)=>{let x=i.review?.rooms.find(m=>m.id===d.id)?.clear;return!n.includes(_)&&!d.boundaryWalls.some(m=>f.has(m))&&g.default.createElement("g",{key:`room${_}`},g.default.createElement("path",{d:[d.polygon,...d.holes].map(m=>u(m)+"Z").join(" "),fill:"#6596d8",fillOpacity:".09",fillRule:"evenodd",stroke:"none"}),g.default.createElement("text",{transform:`translate(${d.labelPoint[0]},${d.labelPoint[1]}) scale(1,-1)`,textAnchor:"middle",fill:"currentColor",stroke:"none",fontSize:Math.max(c,l)*.026},d.label??_+1,x&&g.default.createElement("tspan",{x:"0",dy:"1.5em",fontSize:Math.max(c,l)*.02,opacity:".7"},x.width.toFixed(2)," \xD7 ",x.depth.toFixed(2)," m \u51C0")))}),g.default.createElement("path",{d:(i.references??[]).map(d=>`M${d.a[0]},${d.a[1]}L${d.b[0]},${d.b[1]}`).join(" "),stroke:"currentColor",opacity:".22",strokeWidth:Math.max(c,l)*.0015}),i.walls.map((d,_)=>!f.has(_)&&g.default.createElement("path",{key:`w${_}`,d:u(d.path??[d.a,d.b]),stroke:"currentColor"})),i.openings.map((d,_)=>t[_]!=="ignore"&&g.default.createElement("path",{key:`o${_}`,d:u(d.path??[d.a,d.b]),stroke:(t[_]??d.kind)==="door"?"#d68b30":(t[_]??d.kind)==="window"?"#4787a2":"#a68dcc",strokeWidth:Math.max(c,l)*.015})),i.openings.filter(d=>d.swingPath).map((d,_)=>g.default.createElement("path",{key:`swing${_}`,d:u(d.swingPath)+"Z",stroke:"#d68b30",strokeWidth:Math.max(c,l)*.002,fill:"#d68b30",fillOpacity:".06"})),i.walls[e]&&g.default.createElement("path",{d:u(i.walls[e].path??[i.walls[e].a,i.walls[e].b]),stroke:"#6596d8",strokeWidth:Math.max(c,l)*.012})))}function tn({label:i,value:e,onChange:t,min:n=0}){return g.default.createElement("label",null,i,g.default.createElement("input",{type:"number",step:"any",min:n,value:e,onChange:s=>t(s.target.value)}))}function Qd({review:i}){return i?g.default.createElement("div",{className:"is-form"},g.default.createElement("p",{className:"is-subtle"},"\u5C3A\u5BF8\u57FA\u51C6\uFF1A",{outside:"\u5916\u5899\u5916\u7F18",centerline:"\u5899\u4E2D\u5FC3\u7EBF",site:"\u573A\u5730",unspecified:"\u539F\u65B9\u6848\u672A\u6307\u5B9A\uFF0C\u8BF7\u6838\u5BF9"}[i.dimensionBasis]),i.rooms.map(e=>g.default.createElement("p",{key:e.id},g.default.createElement("strong",null,e.name),g.default.createElement("br",null),e.clear?g.default.createElement(g.default.Fragment,null,"\u51C0\u5BBD ",e.clear.width.toFixed(3)," m \xD7 \u51C0\u6DF1 ",e.clear.depth.toFixed(3)," m \xB7 \u51C0\u9762\u79EF ",e.clear.area.toFixed(2)," m\xB2"):g.default.createElement(g.default.Fragment,null,"\u8F6E\u5ED3\u9762\u79EF ",e.centerlineArea.toFixed(2)," m\xB2 \xB7 \u4E0D\u89C4\u5219\u7A7A\u95F4\u7684\u51C0\u5C3A\u5BF8\u9700\u53E6\u884C\u6838\u5BF9"))),i.issues.map((e,t)=>g.default.createElement("p",{className:"is-error",key:t},e.message)),i.circulation.status==="checked"&&g.default.createElement("p",{className:"is-subtle"},"\u6309 0.60 m \u51C0\u901A\u9053\u62BD\u67E5\uFF1A",i.circulation.roomsReachable,"/",i.circulation.roomsTotal," \u4E2A\u623F\u95F4\u53EF\u4ECE\u5165\u53E3\u5230\u8FBE\u3002\u6B64\u7ED3\u679C\u4E0D\u4EE3\u66FF\u65BD\u5DE5\u6838\u9A8C\u3002")):null}function ef({review:i}){return i?.items.length?g.default.createElement("div",{className:"is-form"},g.default.createElement("p",{className:"is-subtle"},"\u5DF2\u68C0\u67E5 ",i.checked," \u4EF6\u5BB6\u5177\u671D\u5411\u3002\u53C2\u8003\u6905\u5B50\u5BF9\u684C\u3001\u6C99\u53D1\u5BF9\u8336\u51E0\u3001\u5E8A\u5934\u9760\u5899\uFF1B\u7279\u6B8A\u6446\u6CD5\u9700\u53E6\u884C\u6838\u5BF9\u3002"),i.issues.map((e,t)=>g.default.createElement("p",{className:"is-error",key:t},e.message))):null}function Ax({review:i}){return i?.checked?g.default.createElement("div",{className:"is-form"},g.default.createElement("p",{className:"is-subtle"},i.status==="checked"?`\u5DF2\u6838\u5BF9 ${i.checked} \u4EF6\u53C2\u6570\u6784\u4EF6\u7684\u5C3A\u5BF8\u3001\u6807\u9AD8\u4E0E\u76F8\u4EA4\u5173\u7CFB\u3002`:"\u6784\u4EF6\u5E03\u5C40\u5DF2\u53D8\u5316\uFF0C\u9700\u8981\u91CD\u65B0\u6838\u5BF9\u3002","\u7EC4\u5408\u5185\u90E8\u7684\u6709\u610F\u76F8\u4EA4\u4ECD\u4FDD\u7559\u8BB0\u5F55\u3002"),i.issues.map((e,t)=>g.default.createElement("p",{className:"is-error",key:t},e.message))):null}function Js({label:i,items:e,onSelect:t,selectedId:n,icon:s,iconOnly:r=!1,className:o="",disabled:a=!1,align:c="start"}){let[l,h]=(0,g.useState)(!1);return g.default.createElement(te.Menu,{open:l,onClose:()=>h(!1),items:e,selectedId:n,onSelect:u=>{h(!1),t(u)},portal:!0,align:c,autoFocus:!0,className:"is-menu-root",anchor:g.default.createElement(te.Button,{size:"sm",className:`${r?"is-icon":"is-menu-trigger"} ${o}`,disabled:a,"aria-label":i,title:i,"aria-haspopup":"menu","aria-expanded":l,onClick:()=>h(u=>!u),icon:s},!r&&g.default.createElement(g.default.Fragment,null,g.default.createElement("span",{className:"is-truncate"},i),g.default.createElement(te.IconChevronDownOutlineRegular,{size:12})))})}function el(i,e){return i.type!=="wall"?i.label:{"back \u5899":"\u80CC\u5899","front \u5899":"\u524D\u5899","left \u5899":"\u5DE6\u4FA7\u5899","right \u5899":"\u53F3\u4FA7\u5899"}[i.label]??`\u5899\u9762 ${e.filter(n=>n.type==="wall").findIndex(n=>n.id===i.id)+1}`}function _h(i,e=[]){if(!i)return"\u672A\u4FDD\u7559";let t=s=>(s??[]).slice(0,4).map(r=>e.find(o=>o.id===r||o.origin?.key===r)?.label??r).join("\u3001")+((s?.length??0)>4?"\u2026":""),n=i.scope==="scene"?"\u5168\u573A":i.scope==="assembly"?`\u5B8C\u6574\u6784\u4EF6\u7EC4 ${i.assembly}`:`${i.keys?.length??0} \u4EF6\u6307\u5B9A\u5BF9\u8C61\uFF08${t(i.keys)}\uFF09`;return i.view?`${i.view} \xB7 ${i.framing==="detail"?"\u5C40\u90E8\u89C6\u56FE":"\u5B8C\u6574\u8303\u56F4\u5165\u955C"} \xB7 ${n} \xB7 \u5FC5\u89C1\uFF1A${t(i.visibleKeys)||"\u8303\u56F4\u5185\u53EF\u89C1\u8868\u9762"}`:i.anchorKeys?`${n} \u2192 ${t(i.anchorKeys)}${i.viaKeys?.length||i.viaAssemblies?.length?"\uFF0C\u7ECF "+[t(i.viaKeys),...i.viaAssemblies??[]].filter(Boolean).join("\u3001"):""}`:i.width!==void 0&&i.points?`${Math.round(i.width*1e3)} mm\u51C0\u5BBD \xB7 ${Math.round(i.height*1e3)} mm\u51C0\u9AD8`:i.expectedText!==void 0?i.property==="representation"?{image_surface:"\u5B9E\u9645\u56FE\u5F62\u9970\u9762",model:"\u7CBE\u7EC6\u6A21\u578B",text:"\u6587\u5B57\u6784\u4EF6",solid:"\u53C2\u6570\u5B9E\u4F53"}[i.expectedText]??i.expectedText:i.expectedText:i.expected!==void 0?`${{min:"\u2265",max:"\u2264",equal:"="}[i.operator??"equal"]} ${i.property==="count"?i.expected+" \u4EF6":Number((i.expected*1e3).toFixed(3))+" mm"} \xB7 ${n}${i.tolerance?" \xB7 \u516C\u5DEE "+Math.round(i.tolerance*1e3)+" mm":""}`:i.kind==="support"?"\u7AD6\u5411\u63A5\u89E6\u6838\u5BF9":"\u8868\u9762\u63A5\u89E6\u6838\u5BF9"}function gh({constraints:i,checks:e,objects:t,expanded:n=!1}){let s=[...i?.requirements??[],...i?.relations??[],...i?.routes??[],...i?.views??[],...i?.supports??[]],r=Array.isArray(e)?e:[...e?.requirements??[],...e?.relations??[],...e?.circulationReview?.routes??[],...e?.views??[],...e?.supports??[]];return g.default.createElement("details",{open:n||r.some(o=>["fail","blocked"].includes(o.status))},g.default.createElement("summary",null,"\u9879\u76EE\u8981\u6C42 \xB7 ",s.length," \u9879"),s.length?s.map(o=>g.default.createElement("p",{key:o.id},g.default.createElement("strong",null,o.source)," \xB7 ",_h(o,t)," \xB7 ",e?{pass:"\u5DF2\u6838\u5BF9",clear:"\u5DF2\u6838\u5BF9",fail:"\u9700\u4FEE\u6B63",blocked:"\u901A\u8DEF\u53D7\u963B",not_evaluated:"\u5C1A\u672A\u68C0\u67E5"}[r.find(a=>a.id===o.id)?.status]??"\u5C1A\u672A\u68C0\u67E5":"\u5F85\u6309\u6B64\u8981\u6C42\u8BBE\u8BA1",o.basis==="design_assumption"?" \xB7 \u6682\u62DF\u6761\u4EF6":"")):g.default.createElement("p",{className:"is-subtle"},"\u5C1A\u672A\u4FDD\u5B58\u56FA\u5B9A\u8981\u6C42\u3002\u53EF\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u660E\u603B\u9AD8\u3001\u51C0\u5BBD\u3001\u6570\u91CF\u53CA\u5FC5\u987B\u4FDD\u7559\u7684\u5185\u5BB9\uFF0C\u7531\u52A9\u624B\u6574\u7406\u540E\u6838\u5BF9\u3002"))}function Cx({detail:i}){let e={camera_inside_opaque_solid:"\u673A\u4F4D\u5728\u5B9E\u4F53\u5185\u90E8",subject_clipped_or_behind_camera:"\u4E3B\u4F53\u88AB\u88C1\u5207\u6216\u4F4D\u4E8E\u955C\u5934\u540E\u65B9",subject_occluded:"\u4E3B\u4F53\u88AB\u906E\u6321",missing_subject:"\u6307\u5B9A\u4E3B\u4F53\u7F3A\u5931",required_subject_invisible:"\u90E8\u5206\u6307\u5B9A\u4E3B\u4F53\u4E0D\u53EF\u89C1",required_focus_occluded:"\u6307\u5B9A\u7EC6\u8282\u4E0D\u53EF\u89C1",missing_fixed_scope:"\u56FA\u5B9A\u9A8C\u6536\u5BF9\u8C61\u7F3A\u5931",fixed_view_requirement_failed:"\u56FA\u5B9A\u89C6\u56FE\u8303\u56F4\u672A\u6EE1\u8DB3",fixed_view_requirement_unassessed:"\u56FA\u5B9A\u89C6\u56FE\u8303\u56F4\u5C1A\u672A\u5B8C\u6210\u68C0\u67E5"};return g.default.createElement(g.default.Fragment,null,i.preflight&&g.default.createElement("details",null,g.default.createElement("summary",null,"\u53D6\u666F\u68C0\u67E5 \xB7 ",i.preflight.status==="fail"?"\u9700\u4FEE\u6B63":"\u5DF2\u6267\u884C\uFF0C\u753B\u9762\u4ECD\u9700\u6838\u5BF9"),i.preflight.views?.map(t=>g.default.createElement("p",{key:t.id},t.id," \xB7 ",t.status==="fail"?(t.failures??[]).map(n=>e[n]??n).join("\u3001"):t.status==="pass"?"\u53D6\u666F\u8303\u56F4\u5DF2\u6838\u5BF9":"\u5C1A\u672A\u5B8C\u6210\u68C0\u67E5"))),i.meshContactReview&&g.default.createElement("details",null,g.default.createElement("summary",null,"\u5B9E\u9645\u7F51\u683C\u8FDE\u63A5\u68C0\u67E5"),g.default.createElement("p",{className:"is-subtle"},"\u68C0\u67E5\u58F0\u660E\u63A5\u89E6\u70B9\u3001\u7EC4\u5408\u5185\u63A5\u89E6\u4E0E\u8DE8\u7EC4\u5408\u81F3\u58F0\u660E\u57FA\u51C6\u7684\u8DEF\u5F84\uFF1B\u672A\u9A8C\u8BC1\u56FA\u5B9A\u65B9\u5F0F\u6216\u627F\u8F7D\u3002"),i.meshContactReview.declaredContacts?.map(t=>g.default.createElement("p",{key:t.id},t.id," \xB7 ",{pass:"\u58F0\u660E\u70B9\u5DF2\u6838\u5BF9",fail:"\u58F0\u660E\u63A5\u89E6\u672A\u6EE1\u8DB3",not_evaluated:"\u5C1A\u672A\u68C0\u67E5"}[t.status])),i.meshContactReview.declaredSupports?.map(t=>g.default.createElement("p",{key:t.id},t.source??t.id," \xB7 ",{pass:"\u81F3\u58F0\u660E\u57FA\u51C6\u7684\u63A5\u89E6\u8DEF\u5F84\u5DF2\u6838\u5BF9",fail:"\u5B58\u5728\u672A\u63A5\u901A\u7684\u90E8\u4EF6",not_evaluated:"\u8303\u56F4\u5C1A\u672A\u68C0\u67E5"}[t.status],t.graph?.unresolvedObjects?.length?` \xB7 ${t.graph.unresolvedObjects.length} \u4EF6\u9700\u6838\u5BF9`:"")),i.meshContactReview.coverage?.unassessedGroups?.length>0&&g.default.createElement("p",null,"\u6709 ",i.meshContactReview.coverage.unassessedGroups.length," \u4E2A\u7EC4\u5408\u5C1A\u672A\u68C0\u67E5\uFF1A",i.meshContactReview.coverage.unassessedGroups.slice(0,10).join("\u3001"),i.meshContactReview.coverage.unassessedGroups.length>10?"\u2026":""),i.meshContactReview.groups?.filter(t=>t.status!=="surface_path_observed").map(t=>g.default.createElement("p",{key:t.key},t.key," \xB7 \u8FDE\u63A5\u4ECD\u9700\u6838\u5BF9")),!!i.meshContactReview.duplicateGeometry?.length&&g.default.createElement("p",{className:"is-error"},"\u53D1\u73B0\u91CD\u590D\u5B9E\u4F53"),(i.meshContactReview.truncated||i.meshContactReview.duplicateScreenTruncated)&&g.default.createElement("p",null,"\u68C0\u67E5\u8FBE\u5230\u9884\u7B97\u4E0A\u9650\uFF0C\u90E8\u5206\u8303\u56F4\u5C1A\u672A\u68C0\u67E5\u3002")))}function Ix({api:i,sessionId:e,drawing:t}){let[n,s]=(0,g.useState)(""),[r,o]=(0,g.useState)("overview"),[a,c]=(0,g.useState)(null),[l,h]=(0,g.useState)(""),[u,f]=(0,g.useState)(!1),d=(0,g.useRef)(null);(0,g.useEffect)(()=>()=>{d.current?.abort(),d.current=null},[]);let _=t.scene.objects,x=new Map;for(let E of _)if(E.assembly){let L=x.get(E.assembly);L?L.count++:x.set(E.assembly,{label:el(E,_),count:1})}let m={...Bd,...Object.fromEntries((t.scene.presentation?.cameras??[]).map(E=>[E.key,E.label]))},p=()=>{c(null),h("")},T=async E=>{if(E.preventDefault(),d.current)return;let L=new AbortController;d.current=L,p(),f(!0);try{let S=n.startsWith("a:")?{assembly:n.slice(2)}:n.startsWith("o:")?{keys:[n.slice(2)]}:{},b=await i(e,"draft-preview",{expectedRevision:t.baseRevision,drawingId:t.drawingId,view:r,...S},void 0,L.signal);d.current===L&&!L.signal.aborted&&c(b)}catch(S){d.current===L&&!L.signal.aborted&&h(S.message)}finally{d.current===L&&(d.current=null,f(!1))}},w=a?"data:image/png;base64,"+a.base64:null,y=a?[...a.connections.supports,...a.connections.relations]:[],A=new Map(_.map(E=>[E.origin?.key??E.id,E.label])),C={pass:"\u5DF2\u6838\u5BF9",fail:"\u8FDE\u63A5\u9700\u4FEE\u6B63",not_evaluated:"\u5C1A\u672A\u6838\u5BF9"};return g.default.createElement("form",{className:"is-form",onSubmit:T},g.default.createElement("p",{className:"is-subtle"},"\u67E5\u770B\u8349\u6848\u7684\u5F62\u4F53\u548C\u8FDE\u63A5\u3002\u9884\u89C8\u53EA\u5728\u672C\u673A\u751F\u6210\uFF0C\u4E0D\u4FDD\u5B58\u4E3A\u6548\u679C\u56FE\u3002"),g.default.createElement("div",{className:"is-preview-options"},g.default.createElement("label",null,"\u8303\u56F4",g.default.createElement("select",{disabled:u,value:n,onChange:E=>{s(E.target.value),p()}},g.default.createElement("option",{value:""},"\u6574\u4E2A\u8349\u6848"),x.size>0&&g.default.createElement("optgroup",{label:"\u6784\u4EF6\u7EC4"},[...x].map(([E,L])=>g.default.createElement("option",{key:E,value:"a:"+E},L.label,L.count>1?`\u7B49 ${L.count} \u4EF6`:""))),g.default.createElement("optgroup",{label:"\u5355\u4E2A\u6784\u4EF6"},_.map(E=>g.default.createElement("option",{key:E.id,value:"o:"+E.id},el(E,_)))))),g.default.createElement("label",null,"\u89C6\u89D2",g.default.createElement("select",{disabled:u,value:r,onChange:E=>{o(E.target.value),p()}},Object.entries(m).map(([E,L])=>g.default.createElement("option",{key:E,value:E},L))))),u&&g.default.createElement("p",{role:"status"},"\u6B63\u5728\u751F\u6210\u9884\u89C8\u5E76\u6838\u5BF9\u8FDE\u63A5\u2026"),l&&g.default.createElement("p",{className:"is-error",role:"alert"},l),a&&g.default.createElement("div",{className:"is-draft-preview-result"},g.default.createElement("img",{src:w,alt:m[a.view]+" \xB7 CAD \u8349\u6848\u5F62\u4F53\u9884\u89C8"}),g.default.createElement("p",{className:"is-subtle"},"\u67E5\u770B ",a.selectedCount," \u4E2A\u5BF9\u8C61",a.contextCount?` \xB7 \u540C\u65F6\u663E\u793A ${a.contextCount} \u4E2A\u76F8\u5173\u6784\u4EF6`:"","\u3002\u6750\u8D28\u4E0E\u706F\u5149\u4EE5\u5B9E\u9645\u6548\u679C\u56FE\u4E3A\u51C6\u3002"),y.length?g.default.createElement("div",{"aria-label":"\u8349\u6848\u8FDE\u63A5\u68C0\u67E5"},g.default.createElement("p",null,"\u5DF2\u58F0\u660E\u8FDE\u63A5 \xB7 ",y.length," \u9879"),y.map(E=>g.default.createElement("p",{key:E.id,className:E.status==="fail"?"is-error":void 0},E.source," \xB7 ",C[E.status],E.unresolvedKeys?.length?`\uFF1A${E.unresolvedKeys.map(L=>A.get(L)??L).join("\u3001")}`:"")),g.default.createElement("p",{className:"is-subtle"},"\u8FD9\u91CC\u6838\u5BF9\u63A5\u89E6\u4F4D\u7F6E\u4E0E\u8FDE\u63A5\u8DEF\u5F84\u3002\u56FA\u5B9A\u65B9\u5F0F\u548C\u627F\u8F7D\u9700\u8981\u53E6\u884C\u6838\u5BF9\u3002")):g.default.createElement("p",null,"\u8FD9\u4E2A\u8303\u56F4\u8FD8\u6CA1\u6709\u58F0\u660E\u8981\u6838\u5BF9\u7684\u8FDE\u63A5\u3002\u53EF\u4EE5\u5728\u5BF9\u8BDD\u4E2D\u8BF4\u660E\u54EA\u4E9B\u90E8\u4EF6\u5E94\u5F53\u76F8\u8FDE\u3002")),g.default.createElement("div",{className:"is-dialog-actions"},w&&g.default.createElement("a",{className:"is-preview-download",href:w,download:"CAD\u8349\u6848\u9884\u89C8.png"},"\u4E0B\u8F7D\u9884\u89C8"),u?g.default.createElement(te.Button,{type:"button",onClick:()=>d.current?.abort()},"\u53D6\u6D88\u9884\u89C8"):g.default.createElement(te.Button,{type:"submit",variant:"primary"},a?"\u91CD\u65B0\u9884\u89C8":"\u751F\u6210\u9884\u89C8")))}function Rx({sessionId:i,api:e,importFiles:t,openProjects:n,useTabInfo:s}){let{tab:r}=s(),[o,a]=(0,g.useState)(null),[c,l]=(0,g.useState)(Qr),[h,u]=(0,g.useState)(!1),[f,d]=(0,g.useState)(""),[_,x]=(0,g.useState)(null),[m,p]=(0,g.useState)([]),[T,w]=(0,g.useState)("overview"),[y,A]=(0,g.useState)("plan"),[C,E]=(0,g.useState)(null),[L,S]=(0,g.useState)("plan"),[b,D]=(0,g.useState)({id:"overview"}),[z,W]=(0,g.useState)([...kd]),[Y,K]=(0,g.useState)("1080p"),[j,$]=(0,g.useState)("\u672A\u547D\u540D\u8BBE\u8BA1"),[V,ie]=(0,g.useState)("booth"),[re,ye]=(0,g.useState)("6"),[Le,tt]=(0,g.useState)("4"),[ot,se]=(0,g.useState)("2.8"),[U,N]=(0,g.useState)("0.12"),[X,ee]=(0,g.useState)(""),[ce,Ne]=(0,g.useState)(""),[nt,P]=(0,g.useState)(!1),[Xe,ze]=(0,g.useState)(!1),[ke,be]=(0,g.useState)(!1),[qe,oe]=(0,g.useState)("0"),[de,lt]=(0,g.useState)("centerlines"),[ut,I]=(0,g.useState)({wallLayers:[],doorLayers:[],windowLayers:[],openingLayers:[]}),[v,H]=(0,g.useState)(".6"),[J,ae]=(0,g.useState)("2.1"),[Z,Fe]=(0,g.useState)(".9"),[_e,Ue]=(0,g.useState)("2.1"),[Ie,fe]=(0,g.useState)({}),[Me,He]=(0,g.useState)([]),[pe,Se]=(0,g.useState)(null),[Ke,B]=(0,g.useState)(!1),[me,ve]=(0,g.useState)(!1),[Ae,he]=(0,g.useState)(!1),[Q,De]=(0,g.useState)(null),[je,pt]=(0,g.useState)(!1),[st,mn]=(0,g.useState)(null),[qt,eo]=(0,g.useState)(!1),[$n,Qs]=(0,g.useState)(0),[Pi,er]=(0,g.useState)(null),[bn,to]=(0,g.useState)("sofa"),[Li,tr]=(0,g.useState)(null),[ft,Zn]=(0,g.useState)({x:"",y:"",rotation:"0",width:"",depth:"",height:""}),ls=(0,g.useRef)(null),nr=(0,g.useRef)(""),pi=(0,g.useRef)(0),ue=o?.project,Te=o?.report,M=o?.scene?.objects??[],F=o?.proposal?.type==="drawing"&&!o.proposal.stale?o.proposal:null,G=o?.proposal?.type==="brief"?o.proposal:null,q=F?.scene??o?.scene,k=o?.tasks??[],le=o?.selection,ge=M.find(R=>R.id===le?.objectId),Re=le?.surfaceId??"side-a",Ee={...rs,...Object.fromEntries((o?.scene?.presentation?.cameras??[]).map(R=>[R.key,R.label]))},Ce=k.find(R=>["queued","running"].includes(R.state));(0,g.useEffect)(()=>{o?.recommendedViews&&W(o.recommendedViews)},[ue?.id,ue?.revision]);let We=["failed","interrupted"].includes(k[0]?.state)?k[0]:null,Pe=o?.workflow?.modelTask??k.find(R=>R.state==="complete"&&R.revision===ue?.revision&&R.detail.files?.["scene.glb"]),$e=!!o?.workflow?.modelReady&&!F,mt=k.find(R=>R.state==="complete"&&R.revision===ue?.revision&&Ka(R).length)??k.find(R=>Ka(R).length),St=o?.gallery??zd([...k].reverse(),mt?.revision),bt=St.map(R=>`${R.taskId}/${R.file}`).join("|"),et=m.find(R=>R.id===T)??m[0],Oe=Pe??k.find(R=>R.state==="complete"),wt=async()=>{let R=++pi.current,ne=await e(i,"snapshot",{});return R===pi.current&&a(ne),ne};(0,g.useEffect)(()=>{let R=new AbortController,ne=!0,Ze=()=>{let Ni=++pi.current;return e(i,"snapshot",{},void 0,R.signal).then(tl=>{ne&&Ni===pi.current&&(a(tl),d(""))}).catch(tl=>{ne&&Ni===pi.current&&d(tl.message)})};Ze();let ct=setInterval(()=>{r.visible&&Ze()},1500),jt=()=>{l(Qr),Ze()};return as.add(jt),()=>{ne=!1,++pi.current,clearInterval(ct),R.abort(),as.delete(jt)}},[i,r.visible]),(0,g.useEffect)(()=>{Te&&(ee(Te.settings?.unit??Te.unit??""),P(!1),ze(!1),Ne(""),be(!1),oe("0"),lt(Te.settings?.wallMode??"centerlines"),H(String(Te.settings?.maxWallThickness??.6)),I({wallLayers:Te.settings?.wallLayers??[],doorLayers:Te.settings?.doorLayers??[],windowLayers:Te.settings?.windowLayers??[],openingLayers:Te.settings?.openingLayers??[]}),fe({}),He([])),A("plan"),S("plan")},[Te?.id,ue?.id]),(0,g.useEffect)(()=>{E(null)},[ue?.id]),(0,g.useEffect)(()=>{if(C!=="furniture")return;let R=new AbortController,ne=!0;return tr(null),e(i,"catalog-preview",{asset:bn},void 0,R.signal).then(Ze=>{ne&&tr("data:image/png;base64,"+Ze.base64)}).catch(Ze=>{ne&&l(Ze.message)}),()=>{ne=!1,R.abort()}},[C,bn,i]),(0,g.useEffect)(()=>{nr.current="",x(null),p([]),D({id:"overview"})},[ue?.id]);let Be=async(R,ne,Ze)=>{u(!0),l("");try{let ct=await e(i,R,ne);return Ze&&await Ze(ct),await wt(),ct}catch(ct){l(ct.message)}finally{u(!1)}};(0,g.useEffect)(()=>{let R=!0;return Pe&&nr.current!==Pe.id&&e(i,"artifact",{taskId:Pe.id,file:"scene.glb"}).then(ne=>{R&&(x(ne.base64),nr.current=Pe.id)}).catch(ne=>{R&&l(ne.message)}),()=>{R=!1}},[Pe?.id,ue?.revision]),(0,g.useEffect)(()=>{let R=!0,ne=[],Ze=new AbortController;return p([]),Promise.all(St.map(async ct=>{let jt=await e(i,"artifact",{taskId:ct.taskId,file:ct.file},void 0,Ze.signal);if(!R||Ze.signal.aborted)return null;let Ni=URL.createObjectURL(new Blob([Qa(jt.base64)],{type:"image/png"}));return ne.push(Ni),{...ct,url:Ni}})).then(ct=>{R&&(p(ct.filter(Boolean)),w(jt=>ct.some(Ni=>Ni?.id===jt)?jt:ct[0]?.id??"overview"))}).catch(ct=>{Ze.abort(),ne.forEach(jt=>URL.revokeObjectURL(jt)),ne.length=0,R&&l(ct.message)}),()=>{R=!1,Ze.abort(),ne.forEach(ct=>URL.revokeObjectURL(ct))}},[i,ue?.id,bt]);let gt={expectedRevision:ue?.revision};(0,g.useEffect)(()=>{if(C!=="cleanup"||!ue)return;let R=new AbortController;return mn(null),e(i,"cleanup-preview",{expectedRevision:ue.revision,includeHistory:qt},void 0,R.signal).then(ne=>{R.signal.aborted||mn(ne)}).catch(ne=>{R.signal.aborted||l(ne.message)}),()=>R.abort()},[C,ue?.id,ue?.revision,qt,$n,Ce?.id]);let Kn=()=>{Se({...F,report:Te,expectedRevision:ue.revision}),B(!1),he(!1),ve(!1),E("drawing")},Et=R=>e(i,"build",{projectId:R.projectId,expectedRevision:R.revision},`preview:${R.projectId}:${R.revision}`),Jn=(R,ne="side-a")=>{if(!Pe)return;let Ze=M.find(ct=>ct.id===R)?.type==="wall";return Be("select",{...gt,objectId:R,...Ze?{surfaceId:ne}:{}})},_t=async(R,ne)=>{try{let Ze=await e(i,"artifact",{taskId:R.id,file:ne}),ct=URL.createObjectURL(new Blob([Qa(Ze.base64)])),jt=document.createElement("a");jt.href=ct,jt.download=`${ue.name}-v${R.revision}-${ne}`,jt.click(),setTimeout(()=>URL.revokeObjectURL(ct),5e3)}catch(Ze){l(Ze.message)}},Yt=async R=>{u(!0),l("");try{let ne=await e(i,"drawing-set",{expectedRevision:ue.revision,includeSections:!0,...R?{drawingId:R}:{}}),Ze=URL.createObjectURL(new Blob([Qa(ne.base64)],{type:"application/dxf"})),ct=document.createElement("a");ct.href=Ze,ct.download=ne.filename,ct.click(),setTimeout(()=>URL.revokeObjectURL(Ze),5e3)}catch(ne){l(ne.message)}finally{u(!1)}},nn=()=>Be("export-design",{...gt,format:"schedule"},R=>{let ne=URL.createObjectURL(new Blob([R.csv],{type:"text/csv;charset=utf-8"})),Ze=document.createElement("a");Ze.href=ne,Ze.download=R.filename,Ze.click(),setTimeout(()=>URL.revokeObjectURL(ne),5e3)}),Bt=(R,ne=z)=>Be("render",{...gt,quality:R,views:ne},()=>{E(null),A("results")}),Ht=R=>{R==="refresh"?Be("build",gt):R==="render"?(K("1080p"),A("results"),E("render-options")):R==="import"?ls.current.click():R==="furniture"?(Zn({x:"",y:"",rotation:"0"}),E("furniture")):E(R)},ir=()=>{Zn({objectId:ge.id,selectionToken:le.token,expectedRevision:ue.revision,x:String(ge.position[0]),y:String(ge.position[1]),rotation:String((ge.rotation??0)*180/Math.PI),width:String(ge.size[0]),depth:String(ge.size[1]),height:String(ge.size[2])}),E("furniture-edit")},Un=ge?.type==="wall"?ge.materials[Re]:ge?.material,tf=Fd.map(R=>({...R,disabled:R.value!=="plan"&&!ue?.revision})),nf={queued:"\u7B49\u5F85\u4E2D",running:"\u5904\u7406\u4E2D",complete:"\u5DF2\u751F\u6210",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",interrupted:"\u5DF2\u4E2D\u65AD",cleaning:"\u6E05\u7406\u5F85\u5B8C\u6210",removed:"\u6D3E\u751F\u6587\u4EF6\u5DF2\u6E05\u7406"},Di=ue&&!ue.revision,sf={cleanup:"\u6E05\u7406\u53EF\u518D\u751F\u6210\u6587\u4EF6",quality:"\u9879\u76EE\u8981\u6C42\u4E0E\u5BA1\u67E5",brief:"\u6838\u5BF9\u9879\u76EE\u9700\u6C42",new:"\u65B0\u5EFA\u8BBE\u8BA1",drawing:"\u786E\u8BA4 CAD \u8BBE\u8BA1\u65B9\u6848","draft-preview":"CAD \u8349\u6848\u9884\u89C8","render-options":"\u751F\u6210\u6548\u679C\u56FE",dimensions:"\u8BBE\u7F6E\u7A7A\u95F4\u5C3A\u5BF8",confirm:"\u786E\u8BA4\u8BBE\u8BA1\u65B9\u6848",cad:"\u786E\u8BA4\u6BD4\u4F8B\u4E0E\u7ED3\u6784",layers:"\u56FE\u5C42\u4E0E\u5899\u7EBF",furniture:"\u6DFB\u52A0\u5BB6\u5177","furniture-edit":"\u8C03\u6574\u5BB6\u5177",access:"\u6A21\u578B\u8BBF\u95EE",history:"\u7248\u672C\u4E0E\u4EFB\u52A1",export:"\u5BFC\u51FA\u5DE5\u7A0B",report:Te?.generated?"CAD \u65B9\u6848\u8BE6\u60C5":"\u56FE\u7EB8\u8BC6\u522B\u8BE6\u60C5"}[C];return g.default.createElement("section",{className:"is-studio","data-interior-studio":!0,"aria-label":"\u8BBE\u8BA1\u5DE5\u4F5C\u533A"},g.default.createElement("input",{ref:ls,"data-interior-file":!0,type:"file",accept:".dxf,.dwg",hidden:!0,onChange:async R=>{if(R.target.files?.length){u(!0),l("");try{await t(i,[...R.target.files]),await wt()}catch(ne){l(ne.message)}finally{u(!1),R.target.value=""}}}}),g.default.createElement("header",{className:"is-topbar"},g.default.createElement("div",{className:"is-project-heading"},g.default.createElement(te.Button,{size:"sm",className:"is-project-trigger",title:"\u7BA1\u7406\u8BBE\u8BA1\u5DE5\u7A0B","aria-label":"\u7BA1\u7406\u8BBE\u8BA1\u5DE5\u7A0B",disabled:h,onClick:n},g.default.createElement("span",{className:"is-truncate"},ue?.name??"\u8BBE\u8BA1\u5DE5\u7A0B")),ue&&g.default.createElement(te.Button,{size:"sm",className:"is-save-state",title:"\u67E5\u770B\u9879\u76EE\u8981\u6C42\u4E0E\u5BA1\u67E5\u72B6\u6001",onClick:()=>E("quality")},Di?"\u5F85\u786E\u8BA4":ue.readOnly?"\u53EA\u8BFB":"\u5DF2\u4FDD\u5B58"," \xB7 ",o.workflow?.quality?.overall==="needs_fix"?"\u9700\u4FEE\u6B63":"\u5F85\u5BA1\u67E5")),ue&&(!!ue.revision||Te)&&g.default.createElement("div",{className:"is-viewbar"},g.default.createElement(te.SegmentedControl,{id:`design-${i}`,label:"\u8BBE\u8BA1\u89C6\u56FE",options:tf,value:y,onChange:A})),g.default.createElement("div",{className:"is-inline is-topbar-actions"},!!ue?.revision&&g.default.createElement(g.default.Fragment,null,g.default.createElement(te.Button,{size:"sm",disabled:h||ue.readOnly||!ue.canUndo,onClick:()=>Be("undo",gt,Et)},"\u64A4\u9500"),g.default.createElement(te.Button,{size:"sm",disabled:h||ue.readOnly||!ue.canRedo,onClick:()=>Be("redo",gt,Et)},"\u6062\u590D")),g.default.createElement(te.Button,{size:"sm",onClick:()=>ls.current.click(),icon:g.default.createElement(te.IconFolderOpenOutlineRegular,null),disabled:h},"\u5BFC\u5165"),g.default.createElement(Js,{label:"\u66F4\u591A\u8BBE\u8BA1\u64CD\u4F5C",iconOnly:!0,align:"end",icon:g.default.createElement(te.IconEllipsisOutlineRegular,null),onSelect:Ht,disabled:h,items:[{id:"new",label:"\u65B0\u5EFA\u8BBE\u8BA1",icon:g.default.createElement(te.IconPlusOutlineRegular,null)},{id:"export",label:"\u5BFC\u51FA\u5DE5\u7A0B",icon:g.default.createElement(te.IconDownloadOutlineRegular,null),disabled:!Oe},{id:"furniture",label:"\u6DFB\u52A0\u5BB6\u5177",icon:g.default.createElement(te.IconPlusOutlineRegular,null),disabled:!ue?.revision||ue.readOnly},{id:"layers",label:"\u8C03\u6574\u56FE\u7EB8\u8BC6\u522B",icon:g.default.createElement(te.IconBrowseOutlineRegular,null),disabled:!Te||!!ue?.revision||ue.readOnly},{type:"separator",id:"more-separator"},{id:"access",label:"\u6A21\u578B\u8BBF\u95EE",icon:g.default.createElement(te.IconShieldOutlineRegular,null),disabled:!ue},{id:"history",label:"\u7248\u672C\u4E0E\u4EFB\u52A1",icon:g.default.createElement(te.IconClockOutlineRegular,null),disabled:!k.length},{id:"cleanup",label:"\u6E05\u7406\u53EF\u518D\u751F\u6210\u6587\u4EF6",icon:g.default.createElement(te.IconClockOutlineRegular,null),disabled:ue?.readOnly||!!Ce},{id:"refresh",label:"\u66F4\u65B0\u4E09\u7EF4",icon:g.default.createElement(te.IconRefreshOutlineRegular,null),disabled:!ue?.revision||h},{id:"render",label:"\u751F\u6210\u6548\u679C\u56FE",icon:g.default.createElement(te.IconSparkleRegular,null),disabled:!ue?.revision||h||!!Ce||!$e}]}))),(c||f)&&!C&&g.default.createElement("div",{className:"is-banner is-error",role:"alert"},c||f,g.default.createElement(te.Button,{size:"sm",onClick:()=>{l(""),d("")}},"\u6536\u8D77")),We&&g.default.createElement("div",{className:"is-banner is-error",role:"alert"},We.detail.render?"\u6548\u679C\u56FE\u751F\u6210\u672A\u5B8C\u6210":"\u4E09\u7EF4\u66F4\u65B0\u672A\u5B8C\u6210",g.default.createElement(te.Button,{size:"sm",onClick:()=>E("history")},"\u67E5\u770B\u539F\u56E0")),ue?.readOnly&&g.default.createElement("div",{className:"is-banner"},"\u6B64\u5DE5\u7A0B\u6B63\u5728\u53E6\u4E00\u804A\u5929\u4E2D\u7F16\u8F91",g.default.createElement(te.Button,{size:"sm",onClick:()=>Be("open",{projectId:ue.id,takeOver:!0})},"\u63A5\u7BA1\u7F16\u8F91")),o?.workflow?.requirementsChanged&&g.default.createElement("p",{className:"is-banner",role:"status"},"\u9700\u6C42\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5148\u5728\u5BF9\u8BDD\u4E2D\u4FEE\u6539\u5E76\u786E\u8BA4CAD\uFF0C\u518D\u751F\u6210\u4E09\u7EF4\u4E0E\u6548\u679C\u56FE\u3002"),g.default.createElement("main",{className:`is-stage ${y==="plan"?"is-stage-plan":""}`,id:`design-${i}-${y}-panel`,role:ue&&(ue.revision||Te)?"tabpanel":void 0,"aria-labelledby":ue&&(ue.revision||Te)?`design-${i}-${y}`:void 0},o?ue?y==="plan"&&(Te||q)?g.default.createElement("div",{className:"is-plan-view"},q?g.default.createElement(Kd,{scene:q,geometryKey:`${ue.id}:${ue.revision}:${F?.drawingId??""}`,name:ue.name,revision:ue.revision,draft:!!F,view:L,drawingId:F?.drawingId,api:e,sessionId:i,selector:g.default.createElement(Js,{label:Ri[L],selectedId:L,items:Object.entries(Ri).map(([R,ne])=>({id:R,label:ne})),onSelect:S})}):g.default.createElement(g.default.Fragment,null,g.default.createElement("div",{className:"is-sheet-toolbar"},g.default.createElement("span",{className:"is-subtle"},"\u5BFC\u5165\u56FE\u7EB8 \xB7 \u5E73\u9762\u8BC6\u522B")),g.default.createElement(mh,{report:Te,openingOverrides:o.scene?.cad?.openingOverrides,excludedRooms:o.scene?.cad?.excludedRooms})),Te&&g.default.createElement("div",{className:"is-plan-summary"},g.default.createElement("div",null,q?g.default.createElement("p",null,F?"\u5F85\u786E\u8BA4\u8349\u6848 \xB7 \u6838\u5BF9\u540E\u751F\u6210\u4E09\u7EF4":`\u5F53\u524D\u7248\u672C v${ue.revision} \xB7 \u5C3A\u5BF8\u6765\u81EA\u5F53\u524D\u51E0\u4F55`):g.default.createElement(g.default.Fragment,null,g.default.createElement("strong",null,Te.displayName),g.default.createElement("p",null,Te.walls.length," \u6BB5\u5899\u7EBF",g.default.createElement("span",null,"\xB7"),Te.openings.length," \u5904\u95E8\u7A97"))),g.default.createElement(te.Button,{size:"sm",onClick:()=>F?Kn():E(Di?"layers":"report")},F?"\u6838\u5BF9\u65B9\u6848":Te.generated?"\u65B9\u6848\u8BE6\u60C5":Di?"\u8C03\u6574\u8BC6\u522B":"\u8BC6\u522B\u8BE6\u60C5")),!!Te?.blocking.length&&g.default.createElement("p",{className:"is-error",role:"alert"},"\u8FD9\u4EFD\u56FE\u7EB8\u5305\u542B\u6682\u4E0D\u652F\u6301\u7684\u7ED3\u6784\uFF0C\u8BF7\u5148\u67E5\u770B\u8BC6\u522B\u8BE6\u60C5\u3002"),(Di||F)&&g.default.createElement("p",{className:"is-canvas-note"},F?"CAD \u8349\u6848\u5F85\u786E\u8BA4\u3002\u6838\u5BF9\u56FE\u7EB8\u540E\u5148\u751F\u6210\u4E09\u7EF4\u6A21\u578B\u3002":"\u6838\u5BF9\u6BD4\u4F8B\u4E0E\u9AD8\u5EA6\u540E\uFF0C\u5373\u53EF\u751F\u6210\u53EF\u7F16\u8F91\u7684\u4E09\u7EF4\u6A21\u578B\u3002")):Di?g.default.createElement("div",{className:"is-empty"},g.default.createElement(te.IconBrowseOutlineRegular,{size:32}),g.default.createElement("h2",null,G?"\u9700\u6C42\u5DF2\u6574\u7406":o.proposal?"\u65B9\u6848\u51C6\u5907\u597D\u4E86":"\u4ECE\u7A7A\u95F4\u5C3A\u5BF8\u5F00\u59CB"),G?g.default.createElement(g.default.Fragment,null,g.default.createElement("p",null,"\u5148\u6838\u5BF9\u539F\u59CB\u8981\u6C42\u4E0E\u6682\u62DF\u6761\u4EF6\uFF0C\u518D\u5F00\u59CBCAD\u8BBE\u8BA1\u3002"),g.default.createElement(te.Button,{variant:"primary",onClick:()=>{De(structuredClone(G)),pt(!1),E("brief")}},"\u6838\u5BF9\u9879\u76EE\u9700\u6C42")):o.proposal?g.default.createElement(g.default.Fragment,null,g.default.createElement("p",null,o.proposal.width," \xD7 ",o.proposal.depth," m",g.default.createElement("span",null,"\xB7"),"\u9AD8 ",o.proposal.height," m"),g.default.createElement("p",null,"\u786E\u8BA4\u65B9\u6848\u540E\u521B\u5EFA\u6A21\u578B\uFF0C\u5C55\u5177\u5E03\u5C40\u4ECD\u53EF\u4FEE\u6539\u3002"),g.default.createElement(te.Button,{variant:"primary",onClick:()=>E("confirm")},"\u67E5\u770B\u5E76\u786E\u8BA4")):g.default.createElement(g.default.Fragment,null,g.default.createElement("p",null,"\u5728\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u7A7A\u95F4\uFF0C\u6216\u76F4\u63A5\u8BBE\u7F6E\u65B9\u6848\u5C3A\u5BF8\u3002"),g.default.createElement(te.Button,{variant:"outline",onClick:()=>E("dimensions")},"\u8BBE\u7F6E\u5C3A\u5BF8"))):y==="results"?g.default.createElement("div",{className:"is-result-view"},Ce?.detail.render&&g.default.createElement("div",{className:"is-render-progress",role:"status"},g.default.createElement(te.IconLoadingOutlineRegular,{className:"is-spinning"}),"\u6B63\u5728\u751F\u6210 ",Ce.detail.requestedViews?.length??1," \u4E2A\u89C6\u89D2"),et?g.default.createElement(g.default.Fragment,null,g.default.createElement("img",{src:et.url,alt:`${et.label}\u6548\u679C\u56FE\uFF0C\u573A\u666F\u7248\u672C ${et.revision}`}),g.default.createElement("div",{className:"is-result-caption"},g.default.createElement("span",null,et.label," \xB7 \u751F\u6210\u4E8E v",et.revision," \xB7 ",et.current&&$e&&et.cadVerified?"\u9002\u7528\u4E8E\u5F53\u524D\u65B9\u6848 \xB7 \u753B\u9762\u5F85\u6838\u5BF9":"\u5386\u53F2\u53C2\u8003"," \xB7 ",m.findIndex(R=>R.id===et.id)+1,"/",m.length),g.default.createElement(te.Button,{size:"sm",icon:g.default.createElement(te.IconDownloadOutlineRegular,null),onClick:()=>_t({id:et.taskId,revision:et.revision},et.file)},"\u4E0B\u8F7D\u6B64\u89C6\u89D2")),g.default.createElement("div",{className:"is-result-thumbnails",role:"group","aria-label":"\u6548\u679C\u56FE\u89C6\u89D2"},m.map(R=>g.default.createElement("button",{type:"button",key:R.id,"aria-pressed":et.id===R.id,onClick:()=>w(R.id)},g.default.createElement("img",{src:R.url,alt:""}),g.default.createElement("span",null,R.label))))):g.default.createElement("div",{className:"is-empty"},g.default.createElement(te.IconSparkleRegular,{size:28}),g.default.createElement("h2",null,Ce?.detail.render?"\u6B63\u5728\u751F\u6210\u6548\u679C\u56FE":St.length?"\u6B63\u5728\u52A0\u8F7D\u6548\u679C\u56FE":"\u8FD8\u6CA1\u6709\u6548\u679C\u56FE"),g.default.createElement("p",null,Ce?.detail.render?"\u5B8C\u6210\u540E\u76F4\u63A5\u5728\u8FD9\u91CC\u67E5\u770B\u548C\u5207\u6362\u56FE\u96C6\u3002":"\u6838\u5BF9\u4E09\u7EF4\u6A21\u578B\u540E\uFF0C\u9009\u62E9\u89C6\u89D2\u5E76\u751F\u6210\u6548\u679C\u56FE\u3002"))):g.default.createElement(g.default.Fragment,null,g.default.createElement(Ex,{key:ue.id,bytes:_,selection:le,onSelect:Jn,cameraView:b}),g.default.createElement("div",{className:"is-model-view-switch"},g.default.createElement(Js,{label:rs[b.id],selectedId:b.id,disabled:!_,items:Object.entries(rs).map(([R,ne])=>({id:R,label:ne})),onSelect:R=>D({id:R})})),(!Pe||!$e)&&_&&g.default.createElement("div",{className:"is-canvas-status",role:"status"},Ce?g.default.createElement(g.default.Fragment,null,g.default.createElement(te.IconLoadingOutlineRegular,{className:"is-spinning"}),Ce.detail.phase??"\u6B63\u5728\u66F4\u65B0\u573A\u666F"):g.default.createElement(g.default.Fragment,null,F?"CAD \u8349\u6848\u5F85\u786E\u8BA4\uFF0C\u5F53\u524D\u9884\u89C8\u5C1A\u672A\u66F4\u65B0":"\u5F53\u524D\u9884\u89C8\u5F85\u5B8C\u6210 CAD \u4E0E\u4E09\u7EF4\u6821\u9A8C",g.default.createElement(te.Button,{size:"sm",disabled:!!F,onClick:()=>Be("build",gt)},"\u66F4\u65B0\u4E09\u7EF4"))),g.default.createElement("span",{className:"is-orbit-hint"},"\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E")):g.default.createElement("div",{className:"is-empty"},g.default.createElement(te.IconBrowseOutlineRegular,{size:32}),g.default.createElement("h2",null,"\u8BA9\u60F3\u6CD5\u6210\u4E3A\u7A7A\u95F4"),g.default.createElement("p",null,"\u5728\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u9700\u6C42\uFF0CDeepSeek \u4F1A\u5148\u7ED8\u5236 CAD \u65B9\u6848\u3002",g.default.createElement("br",null),"\u6838\u5BF9\u56FE\u7EB8\u4E0E\u4E09\u7EF4\u6A21\u578B\uFF0C\u518D\u6E32\u67D3\u51FA\u56FE\u3002"),g.default.createElement("div",{className:"is-inline"},g.default.createElement(te.Button,{variant:"outline",onClick:()=>E("new")},"\u65B0\u5EFA\u8BBE\u8BA1"),g.default.createElement(te.Button,{variant:"outline",onClick:()=>ls.current.click()},"\u5BFC\u5165\u73B0\u6709 CAD"))):g.default.createElement("div",{className:"is-empty"},g.default.createElement(te.IconLoadingOutlineRegular,{className:"is-spinning",size:24}),g.default.createElement("p",null,"\u6B63\u5728\u6253\u5F00\u8BBE\u8BA1"))),g.default.createElement("div",{className:"is-bottom-tools"},!!ue?.revision&&y==="model"&&g.default.createElement("div",{className:"is-contextbar"},g.default.createElement(te.Button,{size:"sm",className:"is-icon",icon:g.default.createElement(te.IconPlusOutlineRegular,null),title:"\u6DFB\u52A0\u5BB6\u5177","aria-label":"\u6DFB\u52A0\u5BB6\u5177",disabled:h||ue.readOnly,onClick:()=>{Zn({x:"",y:"",rotation:"0"}),E("furniture")}}),g.default.createElement(Js,{label:ge?el(ge,M):"\u9009\u62E9\u5BF9\u8C61",icon:g.default.createElement(te.IconBrowseOutlineRegular,null),disabled:h||ue.readOnly||!Pe,selectedId:ge?.id,items:M.map(R=>({id:R.id,label:el(R,M)})),onSelect:R=>Jn(R)}),ge?g.default.createElement(g.default.Fragment,null,ge.type==="wall"&&g.default.createElement(Js,{label:Re==="side-b"?"B \u9762":"A \u9762",selectedId:Re,disabled:h||ue.readOnly,items:[{id:"side-a",label:"A \u9762"},{id:"side-b",label:"B \u9762"}],onSelect:R=>Jn(ge.id,R)}),g.default.createElement(Js,{label:o.materials[Un]?.label??"\u66F4\u6362\u6750\u8D28",className:"is-material-trigger",disabled:h||ue.readOnly||!Pe,selectedId:Un,items:Object.entries(o.materials).map(([R,ne])=>({id:R,label:ne.label,icon:g.default.createElement("span",{className:"is-swatch",style:{backgroundColor:`rgb(${(ne.swatch??ne.color).map(Ze=>Math.round(Ze*255)).join(",")})`}})})),onSelect:R=>Be("edit",{...gt,selectionToken:le.token,action:"material",material:R},Et)})):g.default.createElement("p",{className:"is-subtle"},"\u70B9\u9009\u5BF9\u8C61\uFF0C\u518D\u7528\u5BF9\u8BDD\u4FEE\u6539"),ge?.type==="asset"&&g.default.createElement(te.Button,{size:"sm",disabled:h||ue.readOnly,onClick:ir},"\u8C03\u6574")),g.default.createElement("footer",{className:"is-statusbar"},g.default.createElement(te.Button,{size:"sm",className:"is-access-trigger",icon:g.default.createElement(te.IconShieldOutlineRegular,null),onClick:()=>E("access"),disabled:!ue},ue?.consent?"\u6458\u8981\u5DF2\u6388\u6743":ue?.modelRoute?"\u4EC5\u672C\u5730":"\u6A21\u578B\u8BBF\u95EE"),Ce?g.default.createElement("div",{className:"is-task-status",role:"status"},g.default.createElement(te.IconLoadingOutlineRegular,{className:"is-spinning"}),g.default.createElement("span",null,Ce.detail.phase??(Ce.detail.render?"\u6B63\u5728\u51FA\u56FE":"\u66F4\u65B0\u4E09\u7EF4\u4E2D")),g.default.createElement(te.Button,{size:"sm",onClick:()=>Be("cancel",{taskId:Ce.id})},"\u53D6\u6D88")):h?g.default.createElement("span",{className:"is-subtle",role:"status"},"\u5904\u7406\u4E2D"):G?g.default.createElement(te.Button,{variant:"toolbar",size:"sm",disabled:ue.readOnly,onClick:()=>{De(structuredClone(G)),pt(!1),E("brief")}},"\u6838\u5BF9\u9879\u76EE\u9700\u6C42"):F?g.default.createElement("div",{className:"is-inline"},g.default.createElement(te.Button,{size:"sm",onClick:()=>E("draft-preview")},"\u8349\u6848\u9884\u89C8"),g.default.createElement(te.Button,{variant:"toolbar",size:"sm",icon:g.default.createElement(te.IconSparkleRegular,null),disabled:ue.readOnly,onClick:Kn},"\u786E\u8BA4 CAD \u65B9\u6848")):ue?.revision>0?y==="plan"?g.default.createElement(te.Button,{size:"sm",onClick:()=>A("model")},"\u67E5\u770B\u4E09\u7EF4\u6A21\u578B"):y==="model"?g.default.createElement(te.Button,{variant:"toolbar",size:"sm",onClick:()=>$e?A("results"):Be("build",gt)},$e?"\u67E5\u770B\u6548\u679C\u56FE":"\u66F4\u65B0 CAD \u5E76\u751F\u6210\u4E09\u7EF4"):y==="results"?g.default.createElement(te.Button,{size:"sm",icon:g.default.createElement(te.IconSparkleRegular,null),onClick:()=>$e?E("render-options"):Be("build",gt)},$e?m.length?"\u91CD\u65B0\u751F\u6210":"\u751F\u6210\u6548\u679C\u56FE":"\u5148\u66F4\u65B0 CAD \u4E0E\u4E09\u7EF4"):null:Di?g.default.createElement(te.Button,{variant:"primary",size:"sm",disabled:h||ue.readOnly,onClick:()=>E(Te?Te.blocking.length?"layers":"cad":o.proposal?"confirm":"dimensions")},Te?Te.blocking.length?"\u68C0\u67E5\u56FE\u7EB8":"\u786E\u8BA4\u56FE\u7EB8":o.proposal?"\u786E\u8BA4\u65B9\u6848":"\u8BBE\u7F6E\u5C3A\u5BF8"):g.default.createElement("span",{className:"is-subtle"},"\u672C\u5730\u8BBE\u8BA1\u5DE5\u4F5C\u533A"))),g.default.createElement(te.Modal,{open:C!==null,onClose:()=>E(null),title:sf??"\u8BBE\u8BA1",closeLabel:"\u5173\u95ED\u5BF9\u8BDD\u6846",className:`is-dialog${C==="draft-preview"?" is-preview-dialog":""}`,contentClassName:"is-dialog-content"},(c||f)&&g.default.createElement("p",{className:"is-error",role:"alert"},c||f),C==="draft-preview"&&(F?g.default.createElement(Ix,{key:`${i}:${ue.id}:${F.drawingId}`,api:e,sessionId:i,drawing:F}):g.default.createElement("p",{role:"status"},"\u5F53\u524D\u6CA1\u6709\u5F85\u786E\u8BA4\u7684 CAD \u8349\u6848\u3002")),C==="brief"&&Q&&ue&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("confirm",{expectedRevision:Q.baseRevision,briefId:Q.briefId,acceptBrief:je},()=>E(null))}},g.default.createElement("p",null,"\u5148\u6838\u5BF9\u54EA\u4E9B\u6761\u4EF6\u4E0D\u80FD\u53D8\u3002\u786E\u8BA4\u540E\uFF0C\u56FE\u7EB8\u4F1A\u6309\u8FD9\u4EFD\u9700\u6C42\u5361\u9A8C\u6536\uFF1B\u8C03\u6574\u6570\u503C\u6216\u8303\u56F4\u4F1A\u5355\u72EC\u63D0\u793A\u3002"),g.default.createElement(gh,{constraints:Q.constraints,objects:M,expanded:!0}),!!Q.assumptions?.length&&g.default.createElement("div",null,g.default.createElement("strong",null,"\u6682\u62DF\u6761\u4EF6"),g.default.createElement("ul",null,Q.assumptions.map((R,ne)=>g.default.createElement("li",{key:ne},R)))),g.default.createElement("p",{className:"is-subtle"},"\u8FD9\u91CC\u53EA\u786E\u8BA4\u9700\u6C42\uFF0C\u6CA1\u6709\u786E\u8BA4CAD\u3001\u8FDE\u63A5\u6216\u6548\u679C\u56FE\u8D28\u91CF\u3002\u53D1\u73B0\u539F\u8BDD\u4E0E\u9A8C\u6536\u503C\u4E0D\u540C\uFF0C\u8BF7\u5728\u5BF9\u8BDD\u4E2D\u7EA0\u6B63\u540E\u91CD\u65B0\u6838\u5BF9\u3002"),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:je,onChange:R=>pt(R.target.checked)}),"\u539F\u8981\u6C42\u548C\u6682\u62DF\u6761\u4EF6\u5DF2\u533A\u5206\uFF0C\u6309\u6B64\u5F00\u59CB\u8BBE\u8BA1"),G?.briefId!==Q.briefId&&g.default.createElement("p",{role:"alert"},"\u9700\u6C42\u5361\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5173\u95ED\u540E\u91CD\u65B0\u67E5\u770B\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E(null)},"\u7A0D\u540E\u6838\u5BF9"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue.readOnly||!je||G?.briefId!==Q.briefId||ue.revision!==Q.baseRevision},"\u786E\u8BA4\u9700\u6C42"))),C==="cleanup"&&g.default.createElement("div",{className:"is-form"},g.default.createElement("p",null,"\u4FDD\u7559\u539F\u59CB\u56FE\u7EB8\u3001\u5168\u90E8\u53EF\u7F16\u8F91\u6E90\u7248\u672C\u3001\u5F15\u7528\u7D20\u6750\u3001\u5F53\u524D\u6A21\u578B\u548C\u56FE\u96C6\u53CA\u5176\u4F9D\u8D56\u3002"),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:qt,disabled:h,onChange:R=>{eo(R.target.checked),er(null)}}),"\u540C\u65F6\u6E05\u7406\u5176\u4ED6\u5386\u53F2\u6A21\u578B\u4E0E\u6548\u679C\u56FE"),g.default.createElement("p",{className:"is-subtle"},"\u9ED8\u8BA4\u53EA\u5904\u7406\u5DF2\u7ED3\u675F\u7684\u4E34\u65F6\u526F\u672C\u3002\u52FE\u9009\u540E\u4F1A\u5220\u9664\u672A\u4FDD\u7559\u7684\u5386\u53F2\u6D3E\u751F\u6587\u4EF6\uFF1B\u53EF\u4ECE\u6E90\u7248\u672C\u91CD\u65B0\u751F\u6210\uFF0C\u753B\u9762\u53EF\u80FD\u4E0E\u539F\u56FE\u4E0D\u540C\u3002"),st?g.default.createElement(g.default.Fragment,null,g.default.createElement("p",null,"\u672C\u6279 ",st.entries.length," \u4E2A\u76EE\u5F55 \xB7 \u7EA6 ",(st.bytes/1024/1024).toFixed(1)," MiB"),!!st.skipped.length&&g.default.createElement("p",{className:"is-subtle"},st.skipped.length," \u9879\u56E0\u5185\u5BB9\u672A\u77E5\u6216\u8EAB\u4EFD\u65E0\u6CD5\u6838\u5BF9\u800C\u4FDD\u7559\u3002"),st.truncated&&g.default.createElement("p",null,"\u672C\u6279\u5B8C\u6210\u540E\u53EF\u518D\u6B21\u9884\u89C8\u5269\u4F59\u5185\u5BB9\u3002")):g.default.createElement("p",{role:"status"},"\u6B63\u5728\u6838\u5BF9\u5F15\u7528\u4E0E\u6587\u4EF6\u8303\u56F4\u2026"),Pi&&g.default.createElement("p",{role:"status"},"\u5DF2\u6E05\u7406 ",Pi.removed.length," \u4E2A\u76EE\u5F55\uFF0C\u91CA\u653E ",(Pi.bytesRemoved/1024/1024).toFixed(1)," MiB\u3002",Pi.completed?"":"\u90E8\u5206\u672A\u5B8C\u6210\uFF0C\u53EF\u91CD\u65B0\u9884\u89C8\u540E\u91CD\u8BD5\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{disabled:h,onClick:()=>E(null)},"\u5173\u95ED"),g.default.createElement(te.Button,{disabled:h||!st?.entries.length||!!Ce,onClick:()=>Be("cleanup",{...gt,token:st.token,includeHistory:qt},R=>{er(R),Qs(ne=>ne+1)})},"\u6E05\u7406\u672C\u6279\u6587\u4EF6"))),C==="quality"&&g.default.createElement("div",{className:"is-form"},g.default.createElement("p",{className:"is-subtle"},"\u4EE5\u4E0B\u4E3A\u968F\u5F53\u524D\u65B9\u6848\u4FDD\u5B58\u7684\u9A8C\u6536\u8981\u6C42\uFF1B\u672A\u68C0\u67E5\u4E0D\u80FD\u8BA1\u4E3A\u901A\u8FC7\u3002\u53D6\u666F\u5DF2\u6838\u5BF9\u4ECD\u9700\u67E5\u770B\u5B9E\u9645\u753B\u9762\u3002"),g.default.createElement("p",{className:"is-subtle"},"\u5DF2\u4FDD\u5B58 ",o.workflow?.quality?.coverage?.required??0," \u9879\uFF1B\u672C\u6B21\u4E34\u65F6\u6838\u5BF9 ",Object.values(o.workflow?.quality?.coverage?.temporaryCounts??{}).reduce((R,ne)=>R+ne,0)," \u9879\uFF0C\u4E34\u65F6\u6838\u5BF9\u4E0D\u66FF\u4EE3\u56FA\u5B9A\u8981\u6C42\u3002"),g.default.createElement("p",null,o.workflow?.quality?.overall==="needs_fix"?"\u5B58\u5728\u9700\u8981\u4FEE\u6B63\u7684\u9879\u76EE":"\u751F\u6210\u5B8C\u6210\u4E0E\u8BBE\u8BA1\u9A8C\u6536\u5206\u522B\u8BB0\u5F55"),g.default.createElement("p",{className:"is-subtle"},"\u5DF2\u786E\u8BA4\u7684\u9879\u76EE\u8981\u6C42\u4F1A\u968F\u6BCF\u7248\u65B9\u6848\u4FDD\u7559\u5E76\u81EA\u52A8\u91CD\u67E5\u3002\u56FE\u50CF\u3001\u8FDE\u63A5\u548C\u672A\u77E5\u6761\u4EF6\u9700\u8981\u5404\u81EA\u6838\u5BF9\u3002"),Object.entries({requirements:"\u5C3A\u5BF8\u4E0E\u5FC5\u5907\u9879",circulation:"\u8FDE\u7EED\u901A\u8DEF",connections:"\u6307\u5B9A\u8FDE\u63A5",crossAssembly:"\u8DE8\u7EC4\u5408\u63A5\u89E6\u8303\u56F4",views:"\u56FA\u5B9A\u89C6\u56FE\u8303\u56F4",support:"\u5168\u573A\u627F\u6258\u63D0\u793A",visual:"\u753B\u9762\u8D28\u91CF"}).map(([R,ne])=>g.default.createElement("p",{key:R},ne," \xB7 ",{pass:"\u5DF2\u6838\u5BF9",fail:"\u9700\u4FEE\u6B63",not_evaluated:"\u5F85\u6838\u5BF9"}[o.workflow?.quality?.[R]?.status]??"\u5F85\u6838\u5BF9")),g.default.createElement(gh,{objects:o.scene?.objects,constraints:F?.summary?.constraints??o.scene?.design?.constraints,checks:F?.summary?.fixedChecks??o.workflow?.quality?.items}),g.default.createElement("details",null,g.default.createElement("summary",null,"\u672C\u7248\u81EA\u52A8\u68C0\u67E5\u8BB0\u5F55"),g.default.createElement("pre",null,JSON.stringify(o.workflow?.quality,null,2)))),C==="render-options"&&g.default.createElement("form",{className:"is-form is-render-options",onSubmit:R=>{R.preventDefault(),Bt(Y)}},g.default.createElement("p",{className:"is-subtle"},"\u9009\u62E9\u9700\u8981\u7684\u89C6\u89D2\uFF0C\u751F\u6210\u540E\u4F1A\u663E\u793A\u5728\u6548\u679C\u56FE\u56FE\u96C6\u4E2D\u3002"),!!o.galleryCoverage?.required.length&&g.default.createElement("p",null,"\u7EA6\u5B9A\u89C6\u89D2 ",o.galleryCoverage.available.length,"/",o.galleryCoverage.required.length," \u5DF2\u6709\u5F53\u524D\u7248\u672C\u56FE\u7247\u3002",o.galleryCoverage.missing.length?"\u5F85\u8865\uFF1A"+o.galleryCoverage.missing.map(R=>Ee[R]??R).join("\u3001"):"\u5168\u90E8\u89C6\u89D2\u5DF2\u6709\u56FE\u7247\uFF0C\u753B\u9762\u8D28\u91CF\u4ECD\u9700\u9010\u5F20\u6838\u5BF9\u3002"),g.default.createElement("fieldset",{disabled:h||!!Ce},g.default.createElement("legend",null,"\u89C6\u89D2 \xB7 \u6700\u591A12\u4E2A"),g.default.createElement("div",{className:"is-view-options"},Object.entries(Ee).map(([R,ne])=>g.default.createElement("label",{key:R},g.default.createElement("input",{type:"checkbox",checked:z.includes(R),onChange:Ze=>W(ct=>Ze.target.checked?[...ct,R]:ct.filter(jt=>jt!==R))}),ne)))),g.default.createElement("label",{className:"is-quality-label"},"\u56FE\u7247\u8D28\u91CF",g.default.createElement("select",{value:Y,disabled:h||!!Ce,onChange:R=>K(R.target.value)},g.default.createElement("option",{value:"1080p"},"1080P \xB7 1920\xD71080"),g.default.createElement("option",{value:"preview"},"\u5FEB\u901F\u9884\u89C8 \xB7 960\xD7720"))),!$e&&g.default.createElement("p",{className:"is-subtle"},"\u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u7248\u672C\u7684 CAD \u56FE\u7EB8\u4E0E\u4E09\u7EF4\u6A21\u578B\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E(null)},"\u53D6\u6D88"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||!!Ce||!$e||!z.length||z.length>12||!!F},"\u751F\u6210 ",z.length," \u4E2A\u89C6\u89D2"))),C==="drawing"&&pe&&ue&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("confirm",{expectedRevision:pe.expectedRevision,drawingId:pe.drawingId,acceptDrawing:Ke,acceptConstraintChanges:Ae},async ne=>{await Et(ne),me&&await e(i,"consent",{expectedRevision:ne.revision,allow:!0}),E(null),A("model")})}},g.default.createElement("div",{className:"is-dimension-summary"},g.default.createElement("strong",null,pe.summary.width," \xD7 ",pe.summary.depth,g.default.createElement("small",null,"m")),g.default.createElement("span",null,"\u5C42\u9AD8 ",pe.summary.height," m \xB7 ",pe.summary.rooms.length," \u4E2A\u7A7A\u95F4")),g.default.createElement(mh,{report:pe.report}),g.default.createElement(Qd,{review:pe.summary.measurements}),g.default.createElement(ef,{review:pe.summary.furnitureReview}),g.default.createElement(Ax,{review:pe.summary.componentReview}),g.default.createElement(gh,{objects:pe.scene?.objects??o.scene?.objects,constraints:pe.summary.constraints,checks:pe.summary.fixedChecks}),!!pe.summary.constraintChanges?.length&&g.default.createElement("div",null,g.default.createElement("p",{className:"is-error"},"\u5DF2\u6709\u9879\u76EE\u8981\u6C42\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u5355\u72EC\u6838\u5BF9\u3002"),pe.summary.constraintChanges.map(R=>g.default.createElement("p",{key:R.group+R.id},R.previous.source,"\uFF1A",_h(R.previous,o.scene?.objects)," \u2192 ",_h(R.proposed,pe.scene?.objects??o.scene?.objects))),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:Ae,onChange:R=>he(R.target.checked)}),"\u6211\u63A5\u53D7\u4EE5\u4E0A\u9879\u76EE\u8981\u6C42\u53D8\u66F4")),!!pe.summary.importedModels&&g.default.createElement("p",{className:"is-subtle"},"\u7CBE\u7EC6\u6A21\u578B\u4FDD\u7559\u539F\u6750\u8D28\uFF0CCAD \u4E2D\u663E\u793A\u5305\u7EDC\u8FD1\u4F3C\u3002\u66F2\u9762\u548C\u7EC6\u8282\u8BF7\u5728\u4E09\u7EF4\u4E2D\u6838\u5BF9\uFF1B\u5305\u7EDC\u4E0D\u4EE3\u8868\u5B9E\u4F53\u63A5\u89E6\u6216\u65BD\u5DE5\u8282\u70B9\u3002"),g.default.createElement("p",{className:"is-subtle"},"\u8FD9\u662F\u5BF9\u8BDD\u751F\u6210\u7684\u8BBE\u8BA1\u5EFA\u8BAE\u3002\u51C0\u5C3A\u5BF8\u7531\u51E0\u4F55\u8BA1\u7B97\u5E76\u6263\u9664\u5899\u539A\uFF1B\u4E0D\u89C4\u5219\u7A7A\u95F4\u5355\u72EC\u6807\u660E\u8F6E\u5ED3\u9762\u79EF\u3002"),!!pe.summary.assumptions.length&&g.default.createElement("ul",null,pe.summary.assumptions.map((R,ne)=>g.default.createElement("li",{key:ne},R))),g.default.createElement("details",null,g.default.createElement("summary",null,"\u8F6E\u5ED3\u9762\u79EF\u3001\u95E8\u7A97\u4E0E\u5BF9\u8C61"),pe.summary.rooms.map((R,ne)=>g.default.createElement("p",{key:ne},R.name," \xB7 \u8F6E\u5ED3\u9762\u79EF ",R.area.toFixed(2)," m\xB2")),g.default.createElement("p",null,pe.summary.doors," \u5904\u95E8 \xB7 ",pe.summary.windows," \u5904\u7A97 \xB7 ",pe.summary.furniture," \u4EF6\u76EE\u5F55\u7269\u4EF6 \xB7 ",pe.summary.components??0," \u4EF6\u53C2\u6570\u6784\u4EF6 \xB7 ",pe.summary.importedModels??0," \u4EF6\u7CBE\u7EC6\u6A21\u578B")),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:Ke,onChange:R=>B(R.target.checked)}),"\u6211\u5DF2\u6838\u5BF9\u5E03\u5C40\u548C\u5C3A\u5BF8\uFF0C\u786E\u8BA4\u751F\u6210\u4E09\u7EF4\u6A21\u578B"),!ue.consent&&ue.modelRoute&&g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:me,onChange:R=>ve(R.target.checked)}),"\u5141\u8BB8\u5F53\u524D\u6A21\u578B\u5728\u540E\u7EED\u5BF9\u8BDD\u4E2D\u8BFB\u53D6\u6B64\u65B9\u6848\u7684\u7ED3\u6784\u6458\u8981"),(F?.drawingId!==pe.drawingId||ue.revision!==pe.expectedRevision)&&g.default.createElement("p",{className:"is-error"},"\u65B9\u6848\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u5173\u95ED\u540E\u91CD\u65B0\u6838\u5BF9\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>Yt(pe.drawingId),disabled:h||F?.drawingId!==pe.drawingId},"\u4E0B\u8F7D CAD \u56FE\u518C"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue.readOnly||!Ke||pe.summary.constraintChanges?.length>0&&!Ae||F?.drawingId!==pe.drawingId||ue.revision!==pe.expectedRevision},"\u786E\u8BA4\u5E76\u751F\u6210\u4E09\u7EF4"))),C==="new"&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("create",{name:j,kind:V},()=>E(null))}},g.default.createElement("label",null,"\u5DE5\u7A0B\u540D\u79F0",g.default.createElement("input",{value:j,maxLength:100,required:!0,"data-modal-autofocus":!0,onChange:R=>$(R.target.value)})),g.default.createElement("label",null,"\u8BBE\u8BA1\u7C7B\u578B",g.default.createElement("select",{value:V,onChange:R=>ie(R.target.value)},g.default.createElement("option",{value:"booth"},"\u5C55\u53F0"),g.default.createElement("option",{value:"interior"},"\u5BA4\u5185\u7A7A\u95F4"))),g.default.createElement("p",{className:"is-subtle"},"\u4E5F\u53EF\u4EE5\u76F4\u63A5\u62D6\u5165 CAD\uFF0C\u5F00\u59CB\u4E00\u4E2A\u65B0\u5DE5\u7A0B\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E(null)},"\u53D6\u6D88"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h},"\u521B\u5EFA\u5DE5\u7A0B"))),C==="dimensions"&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("propose",{kind:ue.kind,width:+re,depth:+Le,height:+ot,thickness:+U},()=>E("confirm"))}},g.default.createElement("p",{className:"is-subtle"},"\u4EE5\u4E0B\u662F\u53EF\u4FEE\u6539\u7684\u65B9\u6848\u5EFA\u8BAE\uFF0C\u5355\u4F4D\u4E3A\u7C73\u3002"),g.default.createElement("div",{className:"is-grid"},g.default.createElement(tn,{label:"\u5BBD\u5EA6",value:re,onChange:ye}),g.default.createElement(tn,{label:"\u8FDB\u6DF1",value:Le,onChange:tt}),g.default.createElement(tn,{label:"\u9AD8\u5EA6",value:ot,onChange:se}),g.default.createElement(tn,{label:"\u5899\u539A",value:U,onChange:N})),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h},"\u67E5\u770B\u65B9\u6848"))),C==="confirm"&&o?.proposal&&g.default.createElement("div",{className:"is-form"},g.default.createElement("div",{className:"is-dimension-summary"},g.default.createElement("strong",null,o.proposal.width," \xD7 ",o.proposal.depth,g.default.createElement("small",null,"m")),g.default.createElement("span",null,"\u9AD8 ",o.proposal.height," m \xB7 \u5899\u539A ",o.proposal.thickness," m")),g.default.createElement("p",null,"\u5F00\u653E\u9762\uFF1A",o.proposal.openSides.map(R=>({front:"\u524D\u65B9",back:"\u540E\u65B9",left:"\u5DE6\u4FA7",right:"\u53F3\u4FA7"})[R]).join("\u3001")||"\u65E0","\u3002"),g.default.createElement("p",{className:"is-subtle"},"\u57FA\u7840\u5C55\u5177\u662F\u53EF\u4FEE\u6539\u7684\u5E03\u5C40\u5EFA\u8BAE\uFF0C\u5C4F\u5E55\u5360\u4F4D\u4E0D\u542B\u54C1\u724C\u7D20\u6750\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E("dimensions")},"\u8C03\u6574\u5C3A\u5BF8"),g.default.createElement(te.Button,{variant:"primary",disabled:h||ue.readOnly,onClick:()=>Be("confirm",gt,async R=>{await Et(R),E(null),A("model")})},"\u786E\u8BA4\u5E76\u5EFA\u6A21"))),C==="layers"&&Te&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("analyze",{importId:Te.id,...ut,wallMode:de,...X?{unit:X}:{},maxWallThickness:+v},()=>{E("cad"),A("plan")})}},g.default.createElement("p",{className:"is-subtle"},"\u9009\u62E9\u5B9E\u9645\u5899\u7EBF\u6240\u5728\u56FE\u5C42\u3002\u56FE\u4E0A\u753B\u51FA\u5899\u7684\u4E24\u4FA7\u8FB9\u7EBF\u65F6\uFF0C\u4F7F\u7528\u6210\u5BF9\u5899\u8FB9\u7EBF\uFF1B\u5E73\u884C\u7EBF\u914D\u5BF9\u7ED3\u679C\u4ECD\u9700\u6838\u5BF9\u3002"),g.default.createElement("label",null,"\u5899\u7EBF\u8868\u793A",g.default.createElement("select",{value:de,onChange:R=>lt(R.target.value)},g.default.createElement("option",{value:"centerlines"},"\u5899\u4E2D\u5FC3\u7EBF"),g.default.createElement("option",{value:"paired"},"\u6210\u5BF9\u5899\u8FB9\u7EBF"))),[["wallLayers","\u5899\u7EBF\u56FE\u5C42"],["doorLayers","\u95E8\u56FE\u5C42"],["windowLayers","\u7A97\u56FE\u5C42"],["openingLayers","\u5171\u7528\u95E8\u7A97\u56FE\u5C42\uFF08\u7C7B\u578B\u5F85\u786E\u8BA4\uFF09"]].map(([R,ne])=>g.default.createElement("label",{key:R},ne,g.default.createElement("select",{multiple:!0,size:Math.min(4,Math.max(2,Te.layers.length)),value:ut[R],onChange:Ze=>I({...ut,[R]:Array.from(Ze.target.selectedOptions,ct=>ct.value)})},Te.layers.map(Ze=>g.default.createElement("option",{key:Ze,value:Ze},Ze))))),g.default.createElement("div",{className:"is-grid"},g.default.createElement("label",null,"\u56FE\u7EB8\u5355\u4F4D",g.default.createElement("select",{required:!0,value:X,onChange:R=>ee(R.target.value)},g.default.createElement("option",{value:"",disabled:!0},"\u8BF7\u9009\u62E9\u5355\u4F4D"),["mm","cm","m","inch","foot"].map(R=>g.default.createElement("option",{key:R},R)))),de==="paired"&&g.default.createElement(tn,{label:"\u6700\u5927\u5899\u539A m",min:.04,value:v,onChange:H})),g.default.createElement("p",{className:"is-subtle"},"\u652F\u6301\u5706\u5F27\u53CA\u5E26\u5F27\u6BB5\u7684\u591A\u6BB5\u7EBF\u3002\u6210\u5BF9\u6A21\u5F0F\u8BC6\u522B\u5E73\u884C\u76F4\u7EBF\u548C\u540C\u5FC3\u5706\u5F27\uFF1B\u95E8\u7A97\u7B26\u53F7\u5FC5\u987B\u80FD\u4E0E\u5899\u4F53\u5BF9\u5E94\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E("report")},"\u8BC6\u522B\u8BE6\u60C5"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue.readOnly||!ut.wallLayers.length},"\u91CD\u65B0\u8BC6\u522B"))),C==="cad"&&Te&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("confirm",{...gt,importId:Te.id,unit:X,height:+ot,thickness:+U,calibrationIndex:+qe,...ce?{knownLength:+ce}:{},acceptCenterlines:nt,acceptPartial:ke,acceptScaleConflict:Xe,doorHeight:+J,windowSill:+Z,windowTop:+_e,openingOverrides:Ie,excludedRooms:Me},async ne=>{await Et(ne),E(null),A("model")})}},g.default.createElement("p",{className:"is-subtle"},"\u6838\u5BF9\u5DF2\u8BC6\u522B\u5899\u7EBF\u4E0E\u77E9\u5F62\u5730\u9762\u8303\u56F4\u3002\u5C42\u9AD8\u662F\u65B9\u6848\u5EFA\u8BAE\uFF1B\u6210\u5BF9\u5899\u7EBF\u7684\u539A\u5EA6\u7531\u8FB9\u7EBF\u95F4\u8DDD\u8BA1\u7B97\u3002"),g.default.createElement(mh,{report:Te,calibrationIndex:+qe,openingOverrides:Ie,excludedRooms:Me}),g.default.createElement("div",{className:"is-grid"},g.default.createElement("label",null,"\u56FE\u7EB8\u5355\u4F4D",g.default.createElement("select",{required:!0,value:X,onChange:R=>ee(R.target.value)},g.default.createElement("option",{value:"",disabled:!0},"\u8BF7\u9009\u62E9\u5355\u4F4D"),["mm","cm","m","inch","foot"].map(R=>g.default.createElement("option",{key:R},R)))),g.default.createElement("label",null,"\u6821\u51C6\u5899\u6BB5\uFF08\u84DD\u8272\uFF09",g.default.createElement("select",{value:qe,onChange:R=>oe(R.target.value)},Te.walls.map((R,ne)=>g.default.createElement("option",{key:ne,value:ne},"\u7B2C ",ne+1," \u6BB5")))),g.default.createElement(tn,{label:`\u8BE5\u6BB5\u5B9E\u9645\u957F\u5EA6 m${Te.unit===null?"\uFF08\u5FC5\u586B\uFF09":"\uFF08\u53EF\u9009\uFF09"}`,value:ce,onChange:Ne}),g.default.createElement(tn,{label:"\u5C42\u9AD8 m\uFF08\u5EFA\u8BAE\uFF09",value:ot,onChange:se}),Te.settings?.wallMode!=="paired"&&g.default.createElement(tn,{label:"\u5899\u539A m\uFF08\u5EFA\u8BAE\uFF09",value:U,onChange:N})),Te.walls[+qe]?.path&&g.default.createElement("p",{className:"is-subtle"},"\u84DD\u8272\u4E3A\u66F2\u5899\uFF0C\u8BF7\u586B\u5199\u6CBF\u5899\u8DEF\u5F84\u7684\u5B9E\u9645\u957F\u5EA6\uFF1B\u5706\u5F27\u4F7F\u7528\u5F27\u957F\u3002"),!!Te.openings.length&&g.default.createElement(g.default.Fragment,null,g.default.createElement("div",{className:"is-grid"},g.default.createElement(tn,{label:"\u95E8\u9AD8 m\uFF08\u5EFA\u8BAE\uFF09",value:J,onChange:ae}),g.default.createElement(tn,{label:"\u7A97\u53F0\u9AD8 m\uFF08\u5EFA\u8BAE\uFF09",value:Z,onChange:Fe}),g.default.createElement(tn,{label:"\u7A97\u9876\u9AD8 m\uFF08\u5EFA\u8BAE\uFF09",value:_e,onChange:Ue})),g.default.createElement("details",{open:Te.openings.some((R,ne)=>R.kind==="opening"&&!Ie[ne])},g.default.createElement("summary",null,"\u6838\u5BF9 ",Te.openings.length," \u5904\u95E8\u7A97"),Te.openings.map((R,ne)=>g.default.createElement("label",{key:ne},"\u6D1E\u53E3 ",ne+1,g.default.createElement("select",{required:!0,value:Ie[ne]??(R.kind==="opening"?"":R.kind),onChange:Ze=>fe({...Ie,[ne]:Ze.target.value})},g.default.createElement("option",{value:"",disabled:!0},"\u8BF7\u9009\u62E9\u7C7B\u578B"),g.default.createElement("option",{value:"door"},"\u95E8"),g.default.createElement("option",{value:"window"},"\u7A97"),g.default.createElement("option",{value:"ignore"},"\u4FDD\u7559\u4E3A\u53C2\u8003\uFF0C\u4E0D\u5EFA\u6D1E\u53E3")))))),g.default.createElement("details",null,g.default.createElement("summary",null,Te.rooms?.length??0," \u4E2A\u95ED\u5408\u623F\u95F4"),g.default.createElement("p",{className:"is-subtle"},"\u7F16\u53F7\u5BF9\u5E94\u56FE\u4E2D\u8F6E\u5ED3\u3002\u9762\u79EF\u6309\u5899\u4E2D\u5FC3\u7EBF\u56F4\u5408\uFF0C\u975E\u88C5\u4FEE\u51C0\u9762\u79EF\uFF1B\u53EF\u53D6\u6D88\u5EAD\u9662\u6216\u7A7A\u6D1E\u7684\u5730\u9762\u3002"),(Te.rooms??[]).map((R,ne)=>g.default.createElement("label",{className:"is-check",key:ne},g.default.createElement("input",{type:"checkbox",checked:!Me.includes(ne),onChange:Ze=>He(Ze.target.checked?Me.filter(ct=>ct!==ne):[...Me,ne])}),"\u751F\u6210\u623F\u95F4 ",ne+1," \u7684\u5730\u9762"))),!Te.rooms?.length&&Te.topologyVersion===1&&g.default.createElement("p",{className:"is-subtle"},"\u672A\u627E\u5230\u95ED\u5408\u623F\u95F4\uFF0C\u672C\u6B21\u4EC5\u751F\u6210\u5899\u4F53\u3002\u8BF7\u68C0\u67E5\u7F3A\u53E3\u6216\u56FE\u5C42\u540E\u91CD\u65B0\u8BC6\u522B\u3002"),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:nt,onChange:R=>P(R.target.checked)}),"\u6211\u5DF2\u6838\u5BF9\u5899\u4F53\u3001\u95E8\u7A97\u548C\u623F\u95F4\u8303\u56F4\uFF0C\u5E76\u786E\u8BA4\u4E0A\u8FF0\u9AD8\u5EA6"),Te.requiresPartialConfirmation&&g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:ke,onChange:R=>be(R.target.checked)}),"\u4EC5\u751F\u6210\u5DF2\u8BC6\u522B\u90E8\u5206\uFF1B\u672A\u914D\u5BF9\u5899\u7EBF\u53CA\u4E0D\u660E\u786E\u95E8\u7A97\u4FDD\u7559\u4E3A\u53C2\u8003"),Object.values(Ie).includes("ignore")&&g.default.createElement("p",{className:"is-subtle"},"\u5FFD\u7565\u8DE8\u5899\u4F53\u7F3A\u53E3\u7684\u95E8\u7A97\u65F6\uFF0C\u4F9D\u8D56\u8BE5\u5904\u95ED\u5408\u7684\u623F\u95F4\u5730\u9762\u4E5F\u4F1A\u7701\u7565\u3002"),!!Te.blocking.length&&g.default.createElement("p",{className:"is-error",role:"alert"},"\u56FE\u7EB8\u5B58\u5728\u963B\u65AD\u9879\uFF0C\u8BF7\u5148\u8C03\u6574\u8BC6\u522B\u6216\u67E5\u770B\u8BE6\u60C5\u3002"),g.default.createElement("details",null,g.default.createElement("summary",null,"\u6BD4\u4F8B\u51B2\u7A81\u5904\u7406"),g.default.createElement("label",{className:"is-check"},g.default.createElement("input",{type:"checkbox",checked:Xe,onChange:R=>ze(R.target.checked)}),"\u4E0E\u56FE\u7EB8\u5143\u6570\u636E\u51B2\u7A81\u65F6\uFF0C\u91C7\u7528\u672C\u6B21\u9009\u62E9\u7684\u5355\u4F4D\u4E0E\u6821\u51C6\u957F\u5EA6")),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{onClick:()=>E("layers")},"\u8C03\u6574\u8BC6\u522B"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue.readOnly||!nt||!X||!Te.unit&&!ce||Te.requiresPartialConfirmation&&!ke||Te.openings.some((R,ne)=>R.kind==="opening"&&!Ie[ne])||!!Te.blocking.length},"\u786E\u8BA4\u5E76\u5EFA\u6A21"))),C==="furniture"&&ue?.revision>0&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault(),Be("furnish",{...gt,asset:bn,rotation:+ft.rotation,...ft.x===""&&ft.y===""?{}:{x:+ft.x,y:+ft.y}},async ne=>{await Et(ne),E(null),A("model")})}},g.default.createElement("label",null,"\u5BB6\u5177",g.default.createElement("select",{value:bn,onChange:R=>to(R.target.value)},Object.entries(o.furniture??{}).map(([R,ne])=>g.default.createElement("option",{value:R,key:R},ne.label)))),g.default.createElement("div",{className:"is-furniture-preview"},Li?g.default.createElement("img",{src:Li,alt:o.furniture?.[bn]?.label}):g.default.createElement("span",{role:"status"},"\u6B63\u5728\u52A0\u8F7D\u9884\u89C8")),g.default.createElement("p",{className:"is-subtle"},"\u9ED8\u8BA4\u5C3A\u5BF8 ",o.furniture?.[bn]?.size.join(" \xD7 ")," m\uFF0C\u662F\u53EF\u8C03\u6574\u7684\u8BBE\u8BA1\u5EFA\u8BAE\u3002\u516C\u5F00\u6A21\u578B\u6765\u81EA Kenney\uFF0C\u8BB8\u53EF CC0\u3002"),g.default.createElement("div",{className:"is-grid"},g.default.createElement(tn,{label:"X \u4F4D\u7F6E m\uFF08\u53EF\u7559\u7A7A\uFF09",value:ft.x,onChange:R=>Zn({...ft,x:R})}),g.default.createElement(tn,{label:"Y \u4F4D\u7F6E m\uFF08\u53EF\u7559\u7A7A\uFF09",value:ft.y,onChange:R=>Zn({...ft,y:R})}),g.default.createElement(tn,{label:"\u89D2\u5EA6 \xB0",min:-360,value:ft.rotation,onChange:R=>Zn({...ft,rotation:R})})),g.default.createElement("p",{className:"is-subtle"},"\u4F4D\u7F6E\u540C\u65F6\u7559\u7A7A\u65F6\uFF0C\u81EA\u52A8\u5BFB\u627E\u7A7A\u4F4D\u3002\u6DFB\u52A0\u540E\u53EF\u70B9\u9009\u5BB6\u5177\uFF0C\u8C03\u6574\u5C3A\u5BF8\u3001\u65B9\u5411\u548C\u6750\u8D28\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue.readOnly},"\u6DFB\u52A0\u5230\u573A\u666F"))),C==="furniture-edit"&&g.default.createElement("form",{className:"is-form",onSubmit:R=>{R.preventDefault();let{selectionToken:ne,expectedRevision:Ze}=ft;Be("edit",{selectionToken:ne,expectedRevision:Ze,action:"transform",x:+ft.x,y:+ft.y,rotation:+ft.rotation,width:+ft.width,depth:+ft.depth,height:+ft.height},async ct=>{await Et(ct),E(null)})}},g.default.createElement("p",{className:"is-subtle"},"\u4EE5\u7C73\u4E3A\u5355\u4F4D\u8C03\u6574\u6240\u9009\u5BB6\u5177\u3002\u4FEE\u6539\u53EF\u64A4\u9500\uFF0C\u5176\u4ED6\u5BF9\u8C61\u4FDD\u6301\u539F\u6837\u3002"),g.default.createElement("div",{className:"is-grid"},[["x","X \u4F4D\u7F6E m"],["y","Y \u4F4D\u7F6E m"],["width","\u5BBD\u5EA6 m"],["depth","\u8FDB\u6DF1 m"],["height","\u9AD8\u5EA6 m"],["rotation","\u89D2\u5EA6 \xB0"]].map(([R,ne])=>g.default.createElement(tn,{key:R,label:ne,min:R==="rotation"?-360:0,value:ft[R],onChange:Ze=>Zn({...ft,[R]:Ze})}))),(ue?.revision!==ft.expectedRevision||le?.token!==ft.selectionToken)&&g.default.createElement("p",{className:"is-error",role:"alert"},"\u573A\u666F\u6216\u9009\u62E9\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5173\u95ED\u540E\u91CD\u65B0\u6253\u5F00\u8C03\u6574\u9762\u677F\u3002"),g.default.createElement("div",{className:"is-dialog-actions"},g.default.createElement(te.Button,{disabled:h||ue?.readOnly||ue?.revision!==ft.expectedRevision||le?.token!==ft.selectionToken,onClick:()=>Be("edit",{expectedRevision:ft.expectedRevision,selectionToken:ft.selectionToken,action:"remove"},async R=>{await Et(R),E(null)})},"\u79FB\u9664\u5BB6\u5177"),g.default.createElement(te.Button,{variant:"primary",type:"submit",disabled:h||ue?.readOnly||ue?.revision!==ft.expectedRevision||le?.token!==ft.selectionToken},"\u4FDD\u5B58\u8C03\u6574"))),C==="access"&&ue&&g.default.createElement("div",{className:"is-form"},g.default.createElement("div",{className:"is-setting-row"},g.default.createElement("div",null,g.default.createElement("strong",null,"\u5141\u8BB8\u6A21\u578B\u8BFB\u53D6\u8BBE\u8BA1\u6458\u8981"),g.default.createElement("p",{className:"is-subtle"},"\u5C3A\u5BF8\u3001\u5F53\u524D\u9009\u62E9\u53CA\u8BBE\u8BA1\u5EFA\u8BAE")),g.default.createElement(te.Switch,{label:"\u5141\u8BB8\u5F53\u524D\u6A21\u578B\u8BFB\u53D6\u8BBE\u8BA1\u6458\u8981",checked:ue.consent,disabled:h||ue.readOnly||!ue.modelRoute,onChange:R=>Be("consent",{...gt,allow:R})})),!ue.modelRoute&&g.default.createElement("p",{className:"is-subtle"},"\u5148\u5728\u804A\u5929\u4E2D\u53D1\u9001\u4E00\u6761\u4E0D\u542B\u56FE\u7EB8\u8D44\u6599\u7684\u6D88\u606F\uFF0C\u8FDE\u63A5\u6240\u9009\u6A21\u578B\u540E\u5373\u53EF\u8C03\u6574\u6388\u6743\u3002"),g.default.createElement("p",null,"CAD \u539F\u4EF6\u3001\u56FE\u4E2D\u6587\u5B57\u4E0E\u56FE\u7247\u59CB\u7EC8\u7559\u5728\u672C\u5730\u3002"),g.default.createElement("p",{className:"is-subtle"},"\u6388\u6743\u7ED1\u5B9A\u5F53\u524D\u804A\u5929\u6240\u9009\u6A21\u578B\u3002\u5173\u95ED\u540E\u505C\u6B62\u6DFB\u52A0\u6458\u8981\uFF1B\u5DF2\u7ECF\u53D1\u9001\u7684\u804A\u5929\u5386\u53F2\u65E0\u6CD5\u64A4\u56DE\uFF0C\u8BE5\u804A\u5929\u7684\u6A21\u578B\u8BF7\u6C42\u4F1A\u6682\u505C\uFF0C\u76F4\u5230\u91CD\u65B0\u6388\u6743\u3002\u672C\u5730\u7F16\u8F91\u53EF\u4EE5\u7EE7\u7EED\u3002"),g.default.createElement("details",null,g.default.createElement("summary",null,"\u5F00\u53D1\u7248\u652F\u6301\u8303\u56F4"),g.default.createElement("p",{className:"is-subtle"},"\u5F53\u524D\u805A\u7126\u672C\u673A macOS arm64\u3002DWG \u5546\u4E1A\u5BFC\u5165\u5C1A\u672A\u63D0\u4F9B\uFF0CWindows \u6682\u4E0D\u5F00\u53D1\u3002"))),C==="history"&&g.default.createElement("div",{className:"is-history"},k.map(R=>g.default.createElement("details",{key:R.id,className:"is-history-item"},g.default.createElement("summary",null,g.default.createElement("span",null,"\u7248\u672C ",R.revision,g.default.createElement("small",null,R.detail.render?"\u6548\u679C\u56FE":"\u4E09\u7EF4\u6A21\u578B")),g.default.createElement("span",{className:"is-subtle"},nf[R.state])),R.detail.message&&g.default.createElement("p",{className:"is-error"},R.detail.message),g.default.createElement(Cx,{detail:R.detail}),["queued","running"].includes(R.state)&&g.default.createElement(te.Button,{size:"sm",onClick:()=>Be("cancel",{taskId:R.id})},"\u53D6\u6D88\u4EFB\u52A1"),R.state==="complete"&&g.default.createElement("div",{className:"is-downloads"},Object.keys(R.detail.files).map(ne=>g.default.createElement(te.Button,{size:"sm",variant:"outline",key:ne,onClick:()=>_t(R,ne)},Jd(ne,R))),g.default.createElement(te.Button,{size:"sm",onClick:()=>_t(R,"scene.json")},"\u573A\u666F\u6570\u636E"))))),C==="export"&&Oe&&g.default.createElement("div",{className:"is-form"},g.default.createElement(te.Button,{variant:"outline",icon:g.default.createElement(te.IconDownloadOutlineRegular,null),disabled:h,onClick:()=>Yt()},"\u5F53\u524D\u7248\u672C\u56FE\u7EB8\u4E0E\u5256\u9762 \xB7 DXF"),g.default.createElement(te.Button,{variant:"outline",disabled:h,onClick:nn},"\u5F53\u524D\u8BBE\u8BA1\u6784\u4EF6\u6E05\u5355 \xB7 CSV"),g.default.createElement("p",{className:"is-subtle"},"\u4EE5\u4E0B\u6587\u4EF6\u5B9E\u9645\u751F\u6210\u4E8E\u7248\u672C ",Oe.revision,"\u3002\u51E0\u4F55\u76F8\u540C\u7684\u6A21\u578B\u53EF\u590D\u7528\u4E8E\u5F53\u524D\u65B9\u6848\uFF1B\u6750\u8D28\u4E0E\u51E0\u4F55\u6539\u53D8\u540E\u9700\u66F4\u65B0\u3002\u6E05\u5355\u662F\u8BBE\u8BA1\u5360\u7528\u5C3A\u5BF8\uFF0C\u672A\u66FF\u4EE3\u4E0B\u6599\u548C\u91C7\u8D2D\u89C4\u683C\u3002"),g.default.createElement("div",{className:"is-export-list"},Object.keys(Oe.detail.files).map(R=>g.default.createElement(te.Button,{key:R,variant:"outline",icon:g.default.createElement(te.IconDownloadOutlineRegular,null),onClick:()=>_t(Oe,R)},Jd(R,Oe))),g.default.createElement(te.Button,{variant:"outline",icon:g.default.createElement(te.IconDownloadOutlineRegular,null),onClick:()=>_t(Oe,"scene.json")},"\u6765\u6E90\u7248\u672C\u573A\u666F\u6570\u636E \xB7 JSON"))),C==="report"&&Te&&g.default.createElement("div",{className:"is-form"},g.default.createElement(Qd,{review:Te.review}),g.default.createElement(ef,{review:Te.furnitureReview}),g.default.createElement("p",null,Te.walls.length," \u6BB5\u5899\u7EBF\uFF0C",Te.openings.length," \u5904\u95E8\u7A97\uFF0C",Te.rooms?.length??0," \u4E2A\u95ED\u5408\u623F\u95F4\u3002"),g.default.createElement("p",{className:"is-subtle"},"\u652F\u6301\u5E73\u9762\u66F2\u7EBF\u3001\u6210\u5BF9\u76F4\u5899\u548C\u540C\u5FC3\u5706\u5F27\uFF0C\u95E8\u7A97\u5173\u8054\u5899\u4F53\u540E\u751F\u6210\u6D1E\u53E3\u3002\u5171\u7528\u56FE\u5C42\u7684\u672A\u77E5\u95E8\u7A97\u9700\u786E\u8BA4\u7C7B\u578B\uFF1B\u672A\u95ED\u5408\u533A\u57DF\u4E0D\u81EA\u52A8\u94FA\u8BBE\u5730\u9762\u3002"),Di&&g.default.createElement(te.Button,{onClick:()=>E("layers")},"\u8C03\u6574\u56FE\u5C42\u4E0E\u5899\u7EBF"),Te.blocking.map(R=>g.default.createElement("p",{className:"is-error",key:R},R)),g.default.createElement("details",null,g.default.createElement("summary",null,"\u5B9E\u4F53\u4E0E\u8BCA\u65AD\u4FE1\u606F"),g.default.createElement("pre",null,JSON.stringify({counts:Te.counts,pairing:Te.pairing,topology:Te.topology,unresolvedOpenings:Te.unresolvedOpenings,warnings:Te.warnings,paperSpaceEntitiesExcluded:Te.paperSpaceEntitiesExcluded},null,2)),g.default.createElement("ul",null,Te.entities.slice(0,100).map((R,ne)=>g.default.createElement("li",{key:ne},R.source.handle," \xB7 ",R.type," \xB7 ",R.source.layer," \xB7 ",R.disposition)))))))}function Px({screen:i,ready:e}){let t=(0,g.useSyncExternalStore)(n=>i.subscribe(n),()=>i.getSnapshot());return(0,g.useEffect)(()=>{let n=()=>e(t);return n(),as.add(n),()=>as.delete(n)},[t,e]),null}function Lx(i){let e=async(m,p,T)=>{if(!i.connection.isLoopback)throw new Error("\u5F53\u524D\u4EC5\u652F\u6301\u672C\u673A Host");let y=await(globalThis.__DSH_TRANSPORT__?.fetch??globalThis.fetch.bind(globalThis))(m,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(p),signal:T});if(!y.ok)throw new Error(`\u672C\u5730\u5DE5\u7A0B\u8FDE\u63A5\u5931\u8D25 (${y.status})`);let A=await y.json();if(!A.ok)throw new Error(A.error.message);return A.value},t=(m,p,T,w=crypto.randomUUID(),y)=>e("api/interior-studio",{sessionId:m,action:p,input:T,operationId:w},y),n=(m,p,T=crypto.randomUUID(),w)=>e("api/interior-studio/projects",{action:m,input:p,operationId:T},w),s=()=>i.layout.selectPanel(ph),r=i.sidebarRight.mounted.getSnapshot(),o,a;i.effect(()=>i.sidebarRight.mounted.subscribe(()=>{r=i.sidebarRight.mounted.getSnapshot()??r}));let c=m=>i.workspaces.list.getSnapshot().items.find(p=>p.sessionIds.includes(m))?.workspaceId,l=()=>c(r)??i.workspaces.list.getSnapshot().items[0]?.workspaceId,h=m=>{!m||o!==m||i.sidebarRight.mounted.getSnapshot()!==m||(o=void 0,i.sidebarRight.openTab("interior-studio"))},u=m=>{o=m,i.uiWorkspace.openSession(m),requestAnimationFrame(()=>{for(let p of as)p()})},f=async m=>{let p=i.layout.beginNavigation(),T=i.sessions.list.getSnapshot(),w=i.workspaces.list.getSnapshot().archivedSessionIds,y=[m.writer,...m.sessionIds].find(C=>T.byId[C]?.projectionValues?.agentPreset==="interior-studio"&&m.sessionIds.includes(C)&&!w.includes(C)),A=y??await i.sessions.create({agentPreset:"interior-studio",workspaceId:c(m.writer)??l()});y||await t(A,"open",{projectId:m.id}),p.aborted||u(A)},d=async(m,p)=>{let T=i.layout.beginNavigation();a?.operation!==p&&(a={operation:p});let w=a.session??=await i.sessions.create({agentPreset:"interior-studio",...m.workspaceId?{workspaceId:m.workspaceId}:{}});await t(w,"create",{name:m.name,kind:m.kind},p),T.aborted||u(w)};i.effect(()=>i.slots.inject("main",()=>i.slots.register({name:"main",key:ph,inject:()=>({manage:n,openProject:f,createProject:d,workspaces:i.workspaces.list,defaultWorkspace:l})},Vd))),i.effect(()=>i.slots.inject("sidebar.panellist",()=>i.slots.register({name:"sidebar.panellist",id:ph,order:20,label:()=>"\u8BBE\u8BA1\u5DE5\u7A0B"},({size:m})=>g.default.createElement(te.IconFolderOpenOutlineRegular,{size:m})))),i.effect(()=>i.slots.inject("shell.overlay",()=>i.slots.register({name:"shell.overlay",id:Jr+"-navigation",inject:()=>({screen:i.sidebarRight.mounted,ready:h})},Px)));let _=async(m,p)=>{if(!i.connection.isLoopback)throw new Error("\u5F53\u524D\u4EC5\u652F\u6301\u672C\u673A Host\uFF1BCAD \u672A\u53D1\u9001\u5230\u8FDC\u7A0B Host");if(p.length!==1||!rh(p[0]))throw new Error("\u8BF7\u4E00\u6B21\u5355\u72EC\u62D6\u5165\u4E00\u4EFD DWG/DXF\uFF0C\u5176\u4ED6\u6587\u4EF6\u672A\u6DFB\u52A0");let T=p[0];if(T.size>20*1024*1024)throw new Error("\u5F53\u524D CAD \u5927\u5C0F\u4E0A\u9650 20 MiB");i.sidebarRight.openTab("interior-studio");let w=await new Promise((A,C)=>{let E=new FileReader;E.onload=()=>A(E.result.split(",")[1]),E.onerror=()=>C(E.error),E.readAsDataURL(T)}),y=await t(m,"import",{name:T.name,base64:w});Qr="";for(let A of as)A();return y},x=()=>"\u8BBE\u8BA1";i.effect(()=>i.sidebarRightTabs.register({id:Jr,kind:"interior-studio",title:x,keepMounted:!0,guide:[{id:"open",order:25,title:x,icon:te.IconBrowseOutlineRegular,description:()=>"\u7528\u5BF9\u8BDD\u8BBE\u8BA1\u7A7A\u95F4\uFF0C\u5BFC\u5165\u56FE\u7EB8\u6216\u67E5\u770B\u4E09\u7EF4\u65B9\u6848"}]})),i.effect(()=>i.slots.inject("sidebar.right.pane.tab.title",()=>i.slots.register({name:"sidebar.right.pane.tab.title",key:Jr},()=>g.default.createElement("span",{className:"is-tab-title"},g.default.createElement(te.IconBrowseOutlineRegular,{size:14}),"\u8BBE\u8BA1")))),i.effect(()=>i.slots.inject("sidebar.right.pane.tab",()=>i.slots.register({name:"sidebar.right.pane.tab",key:Jr,inject:m=>({sessionId:m,api:t,importFiles:_,openProjects:s})},Rx))),i.effect(()=>i.slots.inject("conversation.session.header.utilities",()=>i.slots.register({name:"conversation.session.header.utilities",id:Jr},()=>g.default.createElement(te.Button,{size:"sm",className:"is-design-entry is-icon",title:"\u6253\u5F00\u8BBE\u8BA1\u9762\u677F","aria-label":"\u6253\u5F00\u8BBE\u8BA1\u9762\u677F",onClick:()=>i.sidebarRight.openTab("interior-studio"),icon:g.default.createElement(te.IconBrowseOutlineRegular,null)})))),i.effect(()=>{let m=document.createElement("style");m.textContent=Dd,m.dataset.interiorStudio="true",document.head.append(m);let p=Nd({document,window,getSession:()=>i.sidebarRight.mounted.getSnapshot(),intake:_,onError:T=>{Qr=T.message??String(T),i.sidebarRight.mounted.getSnapshot()?i.sidebarRight.openTab("interior-studio"):window.alert(Qr);for(let w of as)w()}});return()=>{m.remove(),p()}})}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
return module.exports;}});
