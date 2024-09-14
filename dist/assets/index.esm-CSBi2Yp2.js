import{A as m}from"./index-C1Md3IU_.js";var ce=e=>e.type==="checkbox",ie=e=>e instanceof Date,B=e=>e==null;const tt=e=>typeof e=="object";var S=e=>!B(e)&&!Array.isArray(e)&&tt(e)&&!ie(e),rt=e=>S(e)&&e.target?ce(e.target)?e.target.checked:e.target.value:e,xt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,st=(e,s)=>e.has(xt(s)),mt=e=>{const s=e.constructor&&e.constructor.prototype;return S(s)&&s.hasOwnProperty("isPrototypeOf")},Te=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function M(e){let s;const t=Array.isArray(e);if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Te&&(e instanceof Blob||e instanceof FileList))&&(t||S(e)))if(s=t?[]:{},!t&&!mt(e))s=e;else for(const u in e)e.hasOwnProperty(u)&&(s[u]=M(e[u]));else return e;return s}var Ae=e=>Array.isArray(e)?e.filter(Boolean):[],w=e=>e===void 0,f=(e,s,t)=>{if(!s||!S(e))return t;const u=Ae(s.split(/[,[\].]+?/)).reduce((n,l)=>B(n)?n:n[l],e);return w(u)||u===e?w(e[s])?t:e[s]:u},p=e=>typeof e=="boolean",Le=e=>/^\w*$/.test(e),it=e=>Ae(e.replace(/["|']|\]/g,"").split(/\.|\[/)),x=(e,s,t)=>{let u=-1;const n=Le(s)?[s]:it(s),l=n.length,y=l-1;for(;++u<l;){const h=n[u];let D=t;if(u!==y){const E=e[h];D=S(E)||Array.isArray(E)?E:isNaN(+n[u+1])?{}:[]}if(h==="__proto__")return;e[h]=D,e=e[h]}return e};const ve={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},H={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Dt=m.createContext(null),Oe=()=>m.useContext(Dt);var ut=(e,s,t,u=!0)=>{const n={defaultValues:s._defaultValues};for(const l in e)Object.defineProperty(n,l,{get:()=>{const y=l;return s._proxyFormState[y]!==H.all&&(s._proxyFormState[y]=!u||H.all),t&&(t[y]=!0),e[y]}});return n},N=e=>S(e)&&!Object.keys(e).length,at=(e,s,t,u)=>{t(e);const{name:n,...l}=e;return N(l)||Object.keys(l).length>=Object.keys(s).length||Object.keys(l).find(y=>s[y]===(!u||H.all))},oe=e=>Array.isArray(e)?e:[e],lt=(e,s,t)=>!e||!s||e===s||oe(e).some(u=>u&&(t?u===s:u.startsWith(s)||s.startsWith(u)));function Ue(e){const s=m.useRef(e);s.current=e,m.useEffect(()=>{const t=!e.disabled&&s.current.subject&&s.current.subject.subscribe({next:s.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function wt(e){const s=Oe(),{control:t=s.control,disabled:u,name:n,exact:l}=e||{},[y,h]=m.useState(t._formState),D=m.useRef(!0),E=m.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),_=m.useRef(n);return _.current=n,Ue({disabled:u,next:v=>D.current&&lt(_.current,v.name,l)&&at(v,E.current,t._updateFormState)&&h({...t._formState,...v}),subject:t._subjects.state}),m.useEffect(()=>(D.current=!0,E.current.isValid&&t._updateValid(!0),()=>{D.current=!1}),[t]),ut(y,t,E.current,!1)}var $=e=>typeof e=="string",nt=(e,s,t,u,n)=>$(e)?(u&&s.watch.add(e),f(t,e,n)):Array.isArray(e)?e.map(l=>(u&&s.watch.add(l),f(t,l))):(u&&(s.watchAll=!0),t);function St(e){const s=Oe(),{control:t=s.control,name:u,defaultValue:n,disabled:l,exact:y}=e||{},h=m.useRef(u);h.current=u,Ue({disabled:l,subject:t._subjects.values,next:_=>{lt(h.current,_.name,y)&&E(M(nt(h.current,t._names,_.values||t._formValues,!1,n)))}});const[D,E]=m.useState(t._getWatch(u,n));return m.useEffect(()=>t._removeUnmounted()),D}function Et(e){const s=Oe(),{name:t,disabled:u,control:n=s.control,shouldUnregister:l}=e,y=st(n._names.array,t),h=St({control:n,name:t,defaultValue:f(n._formValues,t,f(n._defaultValues,t,e.defaultValue)),exact:!0}),D=wt({control:n,name:t,exact:!0}),E=m.useRef(n.register(t,{...e.rules,value:h,...p(e.disabled)?{disabled:e.disabled}:{}}));return m.useEffect(()=>{const _=n._options.shouldUnregister||l,v=(q,j)=>{const U=f(n._fields,q);U&&U._f&&(U._f.mount=j)};if(v(t,!0),_){const q=M(f(n._options.defaultValues,t));x(n._defaultValues,t,q),w(f(n._formValues,t))&&x(n._formValues,t,q)}return()=>{(y?_&&!n._state.action:_)?n.unregister(t):v(t,!1)}},[t,n,y,l]),m.useEffect(()=>{f(n._fields,t)&&n._updateDisabledField({disabled:u,fields:n._fields,name:t,value:f(n._fields,t)._f.value})},[u,t,n]),{field:{name:t,value:h,...p(u)||D.disabled?{disabled:D.disabled||u}:{},onChange:m.useCallback(_=>E.current.onChange({target:{value:rt(_),name:t},type:ve.CHANGE}),[t]),onBlur:m.useCallback(()=>E.current.onBlur({target:{value:f(n._formValues,t),name:t},type:ve.BLUR}),[t,n]),ref:m.useCallback(_=>{const v=f(n._fields,t);v&&_&&(v._f.ref={focus:()=>_.focus(),select:()=>_.select(),setCustomValidity:q=>_.setCustomValidity(q),reportValidity:()=>_.reportValidity()})},[n._fields,t])},formState:D,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!f(D.errors,t)},isDirty:{enumerable:!0,get:()=>!!f(D.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!f(D.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!f(D.validatingFields,t)},error:{enumerable:!0,get:()=>f(D.errors,t)}})}}const jt=e=>e.render(Et(e));var kt=(e,s,t,u,n)=>s?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[u]:n||!0}}:{},Ke=e=>({isOnSubmit:!e||e===H.onSubmit,isOnBlur:e===H.onBlur,isOnChange:e===H.onChange,isOnAll:e===H.all,isOnTouch:e===H.onTouched}),Ge=(e,s,t)=>!t&&(s.watchAll||s.watch.has(e)||[...s.watch].some(u=>e.startsWith(u)&&/^\.\w+/.test(e.slice(u.length))));const fe=(e,s,t,u)=>{for(const n of t||Object.keys(e)){const l=f(e,n);if(l){const{_f:y,...h}=l;if(y){if(y.refs&&y.refs[0]&&s(y.refs[0],n)&&!u)return!0;if(y.ref&&s(y.ref,y.name)&&!u)return!0;if(fe(h,s))break}else if(S(h)&&fe(h,s))break}}};var Ct=(e,s,t)=>{const u=oe(f(e,t));return x(u,"root",s[t]),x(e,t,u),e},Re=e=>e.type==="file",J=e=>typeof e=="function",_e=e=>{if(!Te)return!1;const s=e?e.ownerDocument:0;return e instanceof(s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement)},he=e=>$(e),Be=e=>e.type==="radio",be=e=>e instanceof RegExp;const Ye={value:!1,isValid:!1},ze={value:!0,isValid:!0};var ot=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!w(e[0].attributes.value)?w(e[0].value)||e[0].value===""?ze:{value:e[0].value,isValid:!0}:ze:Ye}return Ye};const Je={isValid:!1,value:null};var ft=e=>Array.isArray(e)?e.reduce((s,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:s,Je):Je;function Qe(e,s,t="validate"){if(he(e)||Array.isArray(e)&&e.every(he)||p(e)&&!e)return{type:t,message:he(e)?e:"",ref:s}}var se=e=>S(e)&&!be(e)?e:{value:e,message:""},Xe=async(e,s,t,u,n)=>{const{ref:l,refs:y,required:h,maxLength:D,minLength:E,min:_,max:v,pattern:q,validate:j,name:U,valueAsNumber:xe,mount:K,disabled:Q}=e._f,V=f(s,U);if(!K||Q)return{};const G=y?y[0]:l,Y=b=>{u&&G.reportValidity&&(G.setCustomValidity(p(b)?"":b||""),G.reportValidity())},k={},te=Be(l),de=ce(l),Z=te||de,re=(xe||Re(l))&&w(l.value)&&w(V)||_e(l)&&l.value===""||V===""||Array.isArray(V)&&!V.length,P=kt.bind(null,U,t,k),ye=(b,F,C,R=z.maxLength,W=z.minLength)=>{const I=b?F:C;k[U]={type:b?R:W,message:I,ref:l,...P(b?R:W,I)}};if(n?!Array.isArray(V)||!V.length:h&&(!Z&&(re||B(V))||p(V)&&!V||de&&!ot(y).isValid||te&&!ft(y).isValid)){const{value:b,message:F}=he(h)?{value:!!h,message:h}:se(h);if(b&&(k[U]={type:z.required,message:F,ref:G,...P(z.required,F)},!t))return Y(F),k}if(!re&&(!B(_)||!B(v))){let b,F;const C=se(v),R=se(_);if(!B(V)&&!isNaN(V)){const W=l.valueAsNumber||V&&+V;B(C.value)||(b=W>C.value),B(R.value)||(F=W<R.value)}else{const W=l.valueAsDate||new Date(V),I=le=>new Date(new Date().toDateString()+" "+le),ue=l.type=="time",ae=l.type=="week";$(C.value)&&V&&(b=ue?I(V)>I(C.value):ae?V>C.value:W>new Date(C.value)),$(R.value)&&V&&(F=ue?I(V)<I(R.value):ae?V<R.value:W<new Date(R.value))}if((b||F)&&(ye(!!b,C.message,R.message,z.max,z.min),!t))return Y(k[U].message),k}if((D||E)&&!re&&($(V)||n&&Array.isArray(V))){const b=se(D),F=se(E),C=!B(b.value)&&V.length>+b.value,R=!B(F.value)&&V.length<+F.value;if((C||R)&&(ye(C,b.message,F.message),!t))return Y(k[U].message),k}if(q&&!re&&$(V)){const{value:b,message:F}=se(q);if(be(b)&&!V.match(b)&&(k[U]={type:z.pattern,message:F,ref:l,...P(z.pattern,F)},!t))return Y(F),k}if(j){if(J(j)){const b=await j(V,s),F=Qe(b,G);if(F&&(k[U]={...F,...P(z.validate,F.message)},!t))return Y(F.message),k}else if(S(j)){let b={};for(const F in j){if(!N(b)&&!t)break;const C=Qe(await j[F](V,s),G,F);C&&(b={...C,...P(F,C.message)},Y(C.message),t&&(k[U]=b))}if(!N(b)&&(k[U]={ref:G,...b},!t))return k}}return Y(!0),k};function Tt(e,s){const t=s.slice(0,-1).length;let u=0;for(;u<t;)e=w(e)?u++:e[s[u++]];return e}function Lt(e){for(const s in e)if(e.hasOwnProperty(s)&&!w(e[s]))return!1;return!0}function T(e,s){const t=Array.isArray(s)?s:Le(s)?[s]:it(s),u=t.length===1?e:Tt(e,t),n=t.length-1,l=t[n];return u&&delete u[l],n!==0&&(S(u)&&N(u)||Array.isArray(u)&&Lt(u))&&T(e,t.slice(0,-1)),e}var Ee=()=>{let e=[];return{get observers(){return e},next:n=>{for(const l of e)l.next&&l.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(l=>l!==n)}}),unsubscribe:()=>{e=[]}}},Ve=e=>B(e)||!tt(e);function X(e,s){if(Ve(e)||Ve(s))return e===s;if(ie(e)&&ie(s))return e.getTime()===s.getTime();const t=Object.keys(e),u=Object.keys(s);if(t.length!==u.length)return!1;for(const n of t){const l=e[n];if(!u.includes(n))return!1;if(n!=="ref"){const y=s[n];if(ie(l)&&ie(y)||S(l)&&S(y)||Array.isArray(l)&&Array.isArray(y)?!X(l,y):l!==y)return!1}}return!0}var ct=e=>e.type==="select-multiple",Ot=e=>Be(e)||ce(e),ke=e=>_e(e)&&e.isConnected,dt=e=>{for(const s in e)if(J(e[s]))return!0;return!1};function Fe(e,s={}){const t=Array.isArray(e);if(S(e)||t)for(const u in e)Array.isArray(e[u])||S(e[u])&&!dt(e[u])?(s[u]=Array.isArray(e[u])?[]:{},Fe(e[u],s[u])):B(e[u])||(s[u]=!0);return s}function yt(e,s,t){const u=Array.isArray(e);if(S(e)||u)for(const n in e)Array.isArray(e[n])||S(e[n])&&!dt(e[n])?w(s)||Ve(t[n])?t[n]=Array.isArray(e[n])?Fe(e[n],[]):{...Fe(e[n])}:yt(e[n],B(s)?{}:s[n],t[n]):t[n]=!X(e[n],s[n]);return t}var ge=(e,s)=>yt(e,s,Fe(s)),gt=(e,{valueAsNumber:s,valueAsDate:t,setValueAs:u})=>w(e)?e:s?e===""?NaN:e&&+e:t&&$(e)?new Date(e):u?u(e):e;function Ce(e){const s=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):s.disabled))return Re(s)?s.files:Be(s)?ft(e.refs).value:ct(s)?[...s.selectedOptions].map(({value:t})=>t):ce(s)?ot(e.refs).value:gt(w(s.value)?e.ref.value:s.value,e)}var Ut=(e,s,t,u)=>{const n={};for(const l of e){const y=f(s,l);y&&x(n,l,y._f)}return{criteriaMode:t,names:[...e],fields:n,shouldUseNativeValidation:u}},ne=e=>w(e)?e:be(e)?e.source:S(e)?be(e.value)?e.value.source:e.value:e;const Ze="AsyncFunction";var Rt=e=>(!e||!e.validate)&&!!(J(e.validate)&&e.validate.constructor.name===Ze||S(e.validate)&&Object.values(e.validate).find(s=>s.constructor.name===Ze)),Bt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function et(e,s,t){const u=f(e,t);if(u||Le(t))return{error:u,name:t};const n=t.split(".");for(;n.length;){const l=n.join("."),y=f(s,l),h=f(e,l);if(y&&!Array.isArray(y)&&t!==l)return{name:t};if(h&&h.type)return{name:l,error:h};n.pop()}return{name:t}}var Mt=(e,s,t,u,n)=>n.isOnAll?!1:!t&&n.isOnTouch?!(s||e):(t?u.isOnBlur:n.isOnBlur)?!e:(t?u.isOnChange:n.isOnChange)?e:!0,Nt=(e,s)=>!Ae(f(e,s)).length&&T(e,s);const Pt={mode:H.onSubmit,reValidateMode:H.onChange,shouldFocusError:!0};function It(e={}){let s={...Pt,...e},t={submitCount:0,isDirty:!1,isLoading:J(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:s.errors||{},disabled:s.disabled||!1},u={},n=S(s.defaultValues)||S(s.values)?M(s.defaultValues||s.values)||{}:{},l=s.shouldUnregister?{}:M(n),y={action:!1,mount:!1,watch:!1},h={mount:new Set,unMount:new Set,array:new Set,watch:new Set},D,E=0;const _={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={values:Ee(),array:Ee(),state:Ee()},q=Ke(s.mode),j=Ke(s.reValidateMode),U=s.criteriaMode===H.all,xe=r=>i=>{clearTimeout(E),E=setTimeout(r,i)},K=async r=>{if(_.isValid||r){const i=s.resolver?N((await Z()).errors):await P(u,!0);i!==t.isValid&&v.state.next({isValid:i})}},Q=(r,i)=>{(_.isValidating||_.validatingFields)&&((r||Array.from(h.mount)).forEach(a=>{a&&(i?x(t.validatingFields,a,i):T(t.validatingFields,a))}),v.state.next({validatingFields:t.validatingFields,isValidating:!N(t.validatingFields)}))},V=(r,i=[],a,d,c=!0,o=!0)=>{if(d&&a){if(y.action=!0,o&&Array.isArray(f(u,r))){const g=a(f(u,r),d.argA,d.argB);c&&x(u,r,g)}if(o&&Array.isArray(f(t.errors,r))){const g=a(f(t.errors,r),d.argA,d.argB);c&&x(t.errors,r,g),Nt(t.errors,r)}if(_.touchedFields&&o&&Array.isArray(f(t.touchedFields,r))){const g=a(f(t.touchedFields,r),d.argA,d.argB);c&&x(t.touchedFields,r,g)}_.dirtyFields&&(t.dirtyFields=ge(n,l)),v.state.next({name:r,isDirty:b(r,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else x(l,r,i)},G=(r,i)=>{x(t.errors,r,i),v.state.next({errors:t.errors})},Y=r=>{t.errors=r,v.state.next({errors:t.errors,isValid:!1})},k=(r,i,a,d)=>{const c=f(u,r);if(c){const o=f(l,r,w(a)?f(n,r):a);w(o)||d&&d.defaultChecked||i?x(l,r,i?o:Ce(c._f)):R(r,o),y.mount&&K()}},te=(r,i,a,d,c)=>{let o=!1,g=!1;const A={name:r},L=!!(f(u,r)&&f(u,r)._f&&f(u,r)._f.disabled);if(!a||d){_.isDirty&&(g=t.isDirty,t.isDirty=A.isDirty=b(),o=g!==A.isDirty);const O=L||X(f(n,r),i);g=!!(!L&&f(t.dirtyFields,r)),O||L?T(t.dirtyFields,r):x(t.dirtyFields,r,!0),A.dirtyFields=t.dirtyFields,o=o||_.dirtyFields&&g!==!O}if(a){const O=f(t.touchedFields,r);O||(x(t.touchedFields,r,a),A.touchedFields=t.touchedFields,o=o||_.touchedFields&&O!==a)}return o&&c&&v.state.next(A),o?A:{}},de=(r,i,a,d)=>{const c=f(t.errors,r),o=_.isValid&&p(i)&&t.isValid!==i;if(e.delayError&&a?(D=xe(()=>G(r,a)),D(e.delayError)):(clearTimeout(E),D=null,a?x(t.errors,r,a):T(t.errors,r)),(a?!X(c,a):c)||!N(d)||o){const g={...d,...o&&p(i)?{isValid:i}:{},errors:t.errors,name:r};t={...t,...g},v.state.next(g)}},Z=async r=>{Q(r,!0);const i=await s.resolver(l,s.context,Ut(r||h.mount,u,s.criteriaMode,s.shouldUseNativeValidation));return Q(r),i},re=async r=>{const{errors:i}=await Z(r);if(r)for(const a of r){const d=f(i,a);d?x(t.errors,a,d):T(t.errors,a)}else t.errors=i;return i},P=async(r,i,a={valid:!0})=>{for(const d in r){const c=r[d];if(c){const{_f:o,...g}=c;if(o){const A=h.array.has(o.name),L=c._f&&Rt(c._f);L&&_.validatingFields&&Q([d],!0);const O=await Xe(c,l,U,s.shouldUseNativeValidation&&!i,A);if(L&&_.validatingFields&&Q([d]),O[o.name]&&(a.valid=!1,i))break;!i&&(f(O,o.name)?A?Ct(t.errors,O,o.name):x(t.errors,o.name,O[o.name]):T(t.errors,o.name))}!N(g)&&await P(g,i,a)}}return a.valid},ye=()=>{for(const r of h.unMount){const i=f(u,r);i&&(i._f.refs?i._f.refs.every(a=>!ke(a)):!ke(i._f.ref))&&me(r)}h.unMount=new Set},b=(r,i)=>(r&&i&&x(l,r,i),!X(Me(),n)),F=(r,i,a)=>nt(r,h,{...y.mount?l:w(i)?n:$(r)?{[r]:i}:i},a,i),C=r=>Ae(f(y.mount?l:n,r,e.shouldUnregister?f(n,r,[]):[])),R=(r,i,a={})=>{const d=f(u,r);let c=i;if(d){const o=d._f;o&&(!o.disabled&&x(l,r,gt(i,o)),c=_e(o.ref)&&B(i)?"":i,ct(o.ref)?[...o.ref.options].forEach(g=>g.selected=c.includes(g.value)):o.refs?ce(o.ref)?o.refs.length>1?o.refs.forEach(g=>(!g.defaultChecked||!g.disabled)&&(g.checked=Array.isArray(c)?!!c.find(A=>A===g.value):c===g.value)):o.refs[0]&&(o.refs[0].checked=!!c):o.refs.forEach(g=>g.checked=g.value===c):Re(o.ref)?o.ref.value="":(o.ref.value=c,o.ref.type||v.values.next({name:r,values:{...l}})))}(a.shouldDirty||a.shouldTouch)&&te(r,c,a.shouldTouch,a.shouldDirty,!0),a.shouldValidate&&le(r)},W=(r,i,a)=>{for(const d in i){const c=i[d],o=`${r}.${d}`,g=f(u,o);(h.array.has(r)||!Ve(c)||g&&!g._f)&&!ie(c)?W(o,c,a):R(o,c,a)}},I=(r,i,a={})=>{const d=f(u,r),c=h.array.has(r),o=M(i);x(l,r,o),c?(v.array.next({name:r,values:{...l}}),(_.isDirty||_.dirtyFields)&&a.shouldDirty&&v.state.next({name:r,dirtyFields:ge(n,l),isDirty:b(r,o)})):d&&!d._f&&!B(o)?W(r,o,a):R(r,o,a),Ge(r,h)&&v.state.next({...t}),v.values.next({name:y.mount?r:void 0,values:{...l}})},ue=async r=>{y.mount=!0;const i=r.target;let a=i.name,d=!0;const c=f(u,a),o=()=>i.type?Ce(c._f):rt(r),g=A=>{d=Number.isNaN(A)||X(A,f(l,a,A))};if(c){let A,L;const O=o(),ee=r.type===ve.BLUR||r.type===ve.FOCUS_OUT,Vt=!Bt(c._f)&&!s.resolver&&!f(t.errors,a)&&!c._f.deps||Mt(ee,f(t.touchedFields,a),t.isSubmitted,j,q),we=Ge(a,h,ee);x(l,a,O),ee?(c._f.onBlur&&c._f.onBlur(r),D&&D(0)):c._f.onChange&&c._f.onChange(r);const Se=te(a,O,ee,!1),Ft=!N(Se)||we;if(!ee&&v.values.next({name:a,type:r.type,values:{...l}}),Vt)return _.isValid&&(e.mode==="onBlur"?ee&&K():K()),Ft&&v.state.next({name:a,...we?{}:Se});if(!ee&&we&&v.state.next({...t}),s.resolver){const{errors:je}=await Z([a]);if(g(O),d){const At=et(t.errors,u,a),$e=et(je,u,At.name||a);A=$e.error,a=$e.name,L=N(je)}}else Q([a],!0),A=(await Xe(c,l,U,s.shouldUseNativeValidation))[a],Q([a]),g(O),d&&(A?L=!1:_.isValid&&(L=await P(u,!0)));d&&(c._f.deps&&le(c._f.deps),de(a,L,A,Se))}},ae=(r,i)=>{if(f(t.errors,i)&&r.focus)return r.focus(),1},le=async(r,i={})=>{let a,d;const c=oe(r);if(s.resolver){const o=await re(w(r)?r:c);a=N(o),d=r?!c.some(g=>f(o,g)):a}else r?(d=(await Promise.all(c.map(async o=>{const g=f(u,o);return await P(g&&g._f?{[o]:g}:g)}))).every(Boolean),!(!d&&!t.isValid)&&K()):d=a=await P(u);return v.state.next({...!$(r)||_.isValid&&a!==t.isValid?{}:{name:r},...s.resolver||!r?{isValid:a}:{},errors:t.errors}),i.shouldFocus&&!d&&fe(u,ae,r?c:h.mount),d},Me=r=>{const i={...y.mount?l:n};return w(r)?i:$(r)?f(i,r):r.map(a=>f(i,a))},Ne=(r,i)=>({invalid:!!f((i||t).errors,r),isDirty:!!f((i||t).dirtyFields,r),error:f((i||t).errors,r),isValidating:!!f(t.validatingFields,r),isTouched:!!f((i||t).touchedFields,r)}),ht=r=>{r&&oe(r).forEach(i=>T(t.errors,i)),v.state.next({errors:r?t.errors:{}})},Pe=(r,i,a)=>{const d=(f(u,r,{_f:{}})._f||{}).ref,c=f(t.errors,r)||{},{ref:o,message:g,type:A,...L}=c;x(t.errors,r,{...L,...i,ref:d}),v.state.next({name:r,errors:t.errors,isValid:!1}),a&&a.shouldFocus&&d&&d.focus&&d.focus()},vt=(r,i)=>J(r)?v.values.subscribe({next:a=>r(F(void 0,i),a)}):F(r,i,!0),me=(r,i={})=>{for(const a of r?oe(r):h.mount)h.mount.delete(a),h.array.delete(a),i.keepValue||(T(u,a),T(l,a)),!i.keepError&&T(t.errors,a),!i.keepDirty&&T(t.dirtyFields,a),!i.keepTouched&&T(t.touchedFields,a),!i.keepIsValidating&&T(t.validatingFields,a),!s.shouldUnregister&&!i.keepDefaultValue&&T(n,a);v.values.next({values:{...l}}),v.state.next({...t,...i.keepDirty?{isDirty:b()}:{}}),!i.keepIsValid&&K()},Ie=({disabled:r,name:i,field:a,fields:d,value:c})=>{if(p(r)&&y.mount||r){const o=r?void 0:w(c)?Ce(a?a._f:f(d,i)._f):c;x(l,i,o),te(i,o,!1,!1,!0)}},De=(r,i={})=>{let a=f(u,r);const d=p(i.disabled)||p(e.disabled);return x(u,r,{...a||{},_f:{...a&&a._f?a._f:{ref:{name:r}},name:r,mount:!0,...i}}),h.mount.add(r),a?Ie({field:a,disabled:p(i.disabled)?i.disabled:e.disabled,name:r,value:i.value}):k(r,!0,i.value),{...d?{disabled:i.disabled||e.disabled}:{},...s.progressive?{required:!!i.required,min:ne(i.min),max:ne(i.max),minLength:ne(i.minLength),maxLength:ne(i.maxLength),pattern:ne(i.pattern)}:{},name:r,onChange:ue,onBlur:ue,ref:c=>{if(c){De(r,i),a=f(u,r);const o=w(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,g=Ot(o),A=a._f.refs||[];if(g?A.find(L=>L===o):o===a._f.ref)return;x(u,r,{_f:{...a._f,...g?{refs:[...A.filter(ke),o,...Array.isArray(f(n,r))?[{}]:[]],ref:{type:o.type,name:r}}:{ref:o}}}),k(r,!1,void 0,o)}else a=f(u,r,{}),a._f&&(a._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(st(h.array,r)&&y.action)&&h.unMount.add(r)}}},pe=()=>s.shouldFocusError&&fe(u,ae,h.mount),_t=r=>{p(r)&&(v.state.next({disabled:r}),fe(u,(i,a)=>{const d=f(u,a);d&&(i.disabled=d._f.disabled||r,Array.isArray(d._f.refs)&&d._f.refs.forEach(c=>{c.disabled=d._f.disabled||r}))},0,!1))},qe=(r,i)=>async a=>{let d;a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let c=M(l);if(v.state.next({isSubmitting:!0}),s.resolver){const{errors:o,values:g}=await Z();t.errors=o,c=g}else await P(u);if(T(t.errors,"root"),N(t.errors)){v.state.next({errors:{}});try{await r(c,a)}catch(o){d=o}}else i&&await i({...t.errors},a),pe(),setTimeout(pe);if(v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:N(t.errors)&&!d,submitCount:t.submitCount+1,errors:t.errors}),d)throw d},bt=(r,i={})=>{f(u,r)&&(w(i.defaultValue)?I(r,M(f(n,r))):(I(r,i.defaultValue),x(n,r,M(i.defaultValue))),i.keepTouched||T(t.touchedFields,r),i.keepDirty||(T(t.dirtyFields,r),t.isDirty=i.defaultValue?b(r,M(f(n,r))):b()),i.keepError||(T(t.errors,r),_.isValid&&K()),v.state.next({...t}))},We=(r,i={})=>{const a=r?M(r):n,d=M(a),c=N(r),o=c?n:d;if(i.keepDefaultValues||(n=a),!i.keepValues){if(i.keepDirtyValues)for(const g of h.mount)f(t.dirtyFields,g)?x(o,g,f(l,g)):I(g,f(o,g));else{if(Te&&w(r))for(const g of h.mount){const A=f(u,g);if(A&&A._f){const L=Array.isArray(A._f.refs)?A._f.refs[0]:A._f.ref;if(_e(L)){const O=L.closest("form");if(O){O.reset();break}}}}u={}}l=e.shouldUnregister?i.keepDefaultValues?M(n):{}:M(o),v.array.next({values:{...o}}),v.values.next({values:{...o}})}h={mount:i.keepDirtyValues?h.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},y.mount=!_.isValid||!!i.keepIsValid||!!i.keepDirtyValues,y.watch=!!e.shouldUnregister,v.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:c?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!X(r,n)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:c?{}:i.keepDirtyValues?i.keepDefaultValues&&l?ge(n,l):t.dirtyFields:i.keepDefaultValues&&r?ge(n,r):i.keepDirty?t.dirtyFields:{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},He=(r,i)=>We(J(r)?r(l):r,i);return{control:{register:De,unregister:me,getFieldState:Ne,handleSubmit:qe,setError:Pe,_executeSchema:Z,_getWatch:F,_getDirty:b,_updateValid:K,_removeUnmounted:ye,_updateFieldArray:V,_updateDisabledField:Ie,_getFieldArray:C,_reset:We,_resetDefaultValues:()=>J(s.defaultValues)&&s.defaultValues().then(r=>{He(r,s.resetOptions),v.state.next({isLoading:!1})}),_updateFormState:r=>{t={...t,...r}},_disableForm:_t,_subjects:v,_proxyFormState:_,_setErrors:Y,get _fields(){return u},get _formValues(){return l},get _state(){return y},set _state(r){y=r},get _defaultValues(){return n},get _names(){return h},set _names(r){h=r},get _formState(){return t},set _formState(r){t=r},get _options(){return s},set _options(r){s={...s,...r}}},trigger:le,register:De,handleSubmit:qe,watch:vt,setValue:I,getValues:Me,reset:He,resetField:bt,clearErrors:ht,unregister:me,setError:Pe,setFocus:(r,i={})=>{const a=f(u,r),d=a&&a._f;if(d){const c=d.refs?d.refs[0]:d.ref;c.focus&&(c.focus(),i.shouldSelect&&c.select())}},getFieldState:Ne}}function $t(e={}){const s=m.useRef(),t=m.useRef(),[u,n]=m.useState({isDirty:!1,isValidating:!1,isLoading:J(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:J(e.defaultValues)?void 0:e.defaultValues});s.current||(s.current={...It(e),formState:u});const l=s.current.control;return l._options=e,Ue({subject:l._subjects.state,next:y=>{at(y,l._proxyFormState,l._updateFormState,!0)&&n({...l._formState})}}),m.useEffect(()=>l._disableForm(e.disabled),[l,e.disabled]),m.useEffect(()=>{if(l._proxyFormState.isDirty){const y=l._getDirty();y!==u.isDirty&&l._subjects.state.next({isDirty:y})}},[l,u.isDirty]),m.useEffect(()=>{e.values&&!X(e.values,t.current)?(l._reset(e.values,l._options.resetOptions),t.current=e.values,n(y=>({...y}))):l._resetDefaultValues()},[e.values,l]),m.useEffect(()=>{e.errors&&l._setErrors(e.errors)},[e.errors,l]),m.useEffect(()=>{l._state.mount||(l._updateValid(),l._state.mount=!0),l._state.watch&&(l._state.watch=!1,l._subjects.state.next({...l._formState})),l._removeUnmounted()}),m.useEffect(()=>{e.shouldUnregister&&l._subjects.values.next({values:l._getWatch()})},[e.shouldUnregister,l]),s.current.formState=ut(u,l),s.current}export{jt as C,$t as u};
