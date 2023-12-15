import{J as O,an as U,O as A,am as J,P as R,W,X,$ as q,a3 as K,a4 as M}from"./index-96a527ce.22694137.js";import{e as Q}from"./index-c1793516.a978750d.js";import{d as D,a4 as Y,j as T,m as g,w as Z,D as x,o as C,c as p,z as v,n as f,A as L,F as N,r as s,C as P,a as y,t as V,H as _,B as ee,G as le,E as ae}from"./framework.f10db147.js";const ne=D({name:"Switch",components:{IconLoading:U},props:{modelValue:{type:[String,Number,Boolean],default:void 0},defaultChecked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},type:{type:String,default:"circle"},size:{type:String},checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},checkedColor:{type:String},uncheckedColor:{type:String},beforeChange:{type:Function},checkedText:{type:String},uncheckedText:{type:String}},emits:{"update:modelValue":e=>!0,change:(e,l)=>!0,focus:e=>!0,blur:e=>!0},setup(e,{emit:l}){const{disabled:c,size:i,modelValue:d}=Y(e),o=A("switch"),{mergedSize:r}=J(i),{mergedDisabled:t,mergedSize:z,eventHandlers:b}=R({disabled:c,size:r}),h=T(e.defaultChecked?e.checkedValue:e.uncheckedValue),k=g(()=>{var a;return((a=e.modelValue)!=null?a:h.value)===e.checkedValue}),$=T(e.loading),S=g(()=>$.value||e.loading),F=(a,n)=>{var u,m;h.value=a?e.checkedValue:e.uncheckedValue,l("update:modelValue",h.value),l("change",h.value,n),(m=(u=b.value)==null?void 0:u.onChange)==null||m.call(u,n)},j=async a=>{if(S.value||t.value)return;const n=!k.value,u=n?e.checkedValue:e.uncheckedValue,m=e.beforeChange;if(q(m)){$.value=!0;try{const w=await m(u);(w??!0)&&F(n,a)}finally{$.value=!1}}else F(n,a)},E=a=>{var n,u;l("focus",a),(u=(n=b.value)==null?void 0:n.onFocus)==null||u.call(n,a)},G=a=>{var n,u;l("blur",a),(u=(n=b.value)==null?void 0:n.onBlur)==null||u.call(n,a)};Z(d,a=>{(W(a)||X(a))&&(h.value=e.uncheckedValue)});const H=g(()=>[o,`${o}-type-${e.type}`,{[`${o}-small`]:z.value==="small"||z.value==="mini",[`${o}-checked`]:k.value,[`${o}-disabled`]:t.value,[`${o}-loading`]:S.value,[`${o}-custom-color`]:e.type==="line"&&(e.checkedColor||e.uncheckedColor)}]),I=g(()=>{if(k.value&&e.checkedColor)return e.type==="line"?{"--custom-color":e.checkedColor}:{backgroundColor:e.checkedColor};if(!k.value&&e.uncheckedColor)return e.type==="line"?{"--custom-color":e.uncheckedColor}:{backgroundColor:e.uncheckedColor}});return{prefixCls:o,cls:H,mergedDisabled:t,buttonStyle:I,computedCheck:k,computedLoading:S,handleClick:j,handleFocus:E,handleBlur:G}}}),oe=["aria-checked","disabled"];function te(e,l,c,i,d,o){const r=x("icon-loading");return C(),p("button",{type:"button",role:"switch","aria-checked":e.computedCheck,class:f(e.cls),style:_(e.buttonStyle),disabled:e.mergedDisabled,onClick:l[0]||(l[0]=(...t)=>e.handleClick&&e.handleClick(...t)),onFocus:l[1]||(l[1]=(...t)=>e.handleFocus&&e.handleFocus(...t)),onBlur:l[2]||(l[2]=(...t)=>e.handleBlur&&e.handleBlur(...t))},[v("span",{class:f(`${e.prefixCls}-handle`)},[v("span",{class:f(`${e.prefixCls}-handle-icon`)},[e.computedLoading?(C(),L(r,{key:0})):(C(),p(N,{key:1},[e.computedCheck?s(e.$slots,"checked-icon",{key:0}):s(e.$slots,"unchecked-icon",{key:1})],2112))],2)],2),P("  prettier-ignore  "),e.type!=="line"&&e.size!=="small"&&(e.$slots.checked||e.checkedText||e.$slots.unchecked||e.uncheckedText)?(C(),p(N,{key:0},[v("span",{class:f(`${e.prefixCls}-text-holder`)},[e.computedCheck?s(e.$slots,"checked",{key:0},()=>[y(V(e.checkedText),1)]):s(e.$slots,"unchecked",{key:1},()=>[y(V(e.uncheckedText),1)])],2),v("span",{class:f(`${e.prefixCls}-text`)},[e.computedCheck?s(e.$slots,"checked",{key:0},()=>[y(V(e.checkedText),1)]):s(e.$slots,"unchecked",{key:1},()=>[y(V(e.uncheckedText),1)])],2)],64)):P("v-if",!0)],46,oe)}var B=O(ne,[["render",te]]);const ue=Object.assign(B,{install:(e,l)=>{K(e,l);const c=M(l);e.component(c+B.name,B)}}),ie=D({name:"Switch",__name:"index",props:{modelValue:{default:!1}},emits:["update:modelValue"],setup(e,{emit:l}){const c=e,i=g({get:()=>c.modelValue,set:d=>{l("update:modelValue",d)}});return(d,o)=>{const r=ue;return C(),L(Q,null,{default:ee(()=>[le(r,ae({modelValue:i.value,"onUpdate:modelValue":o[0]||(o[0]=t=>i.value=t)},d.$attrs),null,16,["modelValue"])]),_:1})}}});export{ie as default};
