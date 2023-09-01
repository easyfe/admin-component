import{_ as he,a2 as Ce,I as be,H as we,L as ye,a3 as Se,a4 as ze,Q as Ve,a5 as $e,a6 as V,V as Be,a7 as Le,a8 as ee,a9 as Ie,aa as Re,ab as ke}from"./index-498d0e82.7cf1e778.js";import{t as xe}from"./index-e81bdb59.209edfea.js";import{d as le,a7 as He,f as d,i as m,w as A,k as Ne,A as D,o as b,c as $,n as P,D as Te,t as j,z as U,C as B,y as G,v as Me,B as Q,r as Fe,U as ae,x as Ee}from"./framework.b469e8f1.js";const Oe=["border-width","box-sizing","font-family","font-weight","font-size","font-variant","letter-spacing","line-height","padding-top","padding-bottom","padding-left","padding-right","text-indent","text-rendering","text-transform","white-space","overflow-wrap","width"],Ae=e=>{const l={};return Oe.forEach(v=>{l[v]=e.getPropertyValue(v)}),l},De=le({name:"Textarea",components:{ResizeObserver:Ce,IconHover:be,IconClose:we},inheritAttrs:!1,props:{modelValue:String,defaultValue:{type:String,default:""},placeholder:String,disabled:{type:Boolean,default:!1},error:{type:Boolean,default:!1},maxLength:{type:[Number,Object],default:0},showWordLimit:{type:Boolean,default:!1},allowClear:{type:Boolean,default:!1},autoSize:{type:[Boolean,Object],default:!1},wordLength:{type:Function},wordSlice:{type:Function}},emits:{"update:modelValue":e=>!0,input:(e,l)=>!0,change:(e,l)=>!0,clear:e=>!0,focus:e=>!0,blur:e=>!0},setup(e,{emit:l,attrs:v}){const{disabled:h,error:p,modelValue:c}=He(e),f=ye("textarea"),{mergedDisabled:g,mergedError:L,eventHandlers:o}=Se({disabled:h,error:p}),u=d(),q=d(),w=d(),J=d(),I=d(e.defaultValue),i=m(()=>{var a;return(a=c.value)!=null?a:I.value}),[te,oe]=ze(u);A(c,a=>{(Ve(a)||$e(a))&&(I.value="")});const y=m(()=>V(e.maxLength)&&!!e.maxLength.errorOnly),s=m(()=>V(e.maxLength)?e.maxLength.length:e.maxLength),S=a=>{var t;return Be(e.wordLength)?e.wordLength(a):(t=a.length)!=null?t:0},K=m(()=>S(i.value)),ne=m(()=>L.value||!!(s.value&&y.value&&K.value>s.value)),C=d(!1),R=d(!1),re=m(()=>e.allowClear&&!g.value&&i.value),k=d(!1),X=d(""),x=()=>{te(),ae(()=>{u.value&&i.value!==u.value.value&&(u.value.value=i.value,oe())})},z=(a,t=!0)=>{var n,r;s.value&&!y.value&&S(a)>s.value&&(a=(r=(n=e.wordSlice)==null?void 0:n.call(e,a,s.value))!=null?r:a.slice(0,s.value)),I.value=a,t&&l("update:modelValue",a),x()};let H=i.value;const Y=(a,t)=>{var n,r;a!==H&&(H=a,l("change",a,t),(r=(n=o.value)==null?void 0:n.onChange)==null||r.call(n,t))},ue=a=>{var t,n;R.value=!0,H=i.value,l("focus",a),(n=(t=o.value)==null?void 0:t.onFocus)==null||n.call(t,a)},se=a=>{var t,n;R.value=!1,l("blur",a),(n=(t=o.value)==null?void 0:t.onBlur)==null||n.call(t,a),Y(i.value,a)},ie=a=>{var t,n;const{value:r}=a.target;if(a.type==="compositionend"){if(k.value=!1,X.value="",s.value&&!y.value&&i.value.length>=s.value&&S(r)>s.value){x();return}l("input",r,a),z(r),(n=(t=o.value)==null?void 0:t.onInput)==null||n.call(t,a)}else k.value=!0},de=a=>{var t,n;const{value:r}=a.target;if(k.value)X.value=r;else{if(s.value&&!y.value&&i.value.length>=s.value&&S(r)>s.value&&a.inputType==="insertText"){x();return}l("input",r,a),z(r),(n=(t=o.value)==null?void 0:t.onInput)==null||n.call(t,a)}},ve=a=>{z(""),Y("",a),l("clear",a)};A(c,a=>{a!==i.value&&z(a??"",!1)});const fe=a=>Le(v,ee),me=a=>Ie(v,ee),ce=m(()=>[`${f}-wrapper`,{[`${f}-focus`]:R.value,[`${f}-disabled`]:g.value,[`${f}-error`]:ne.value,[`${f}-scroll`]:C.value}]);let Z;const N=d(0),T=d(0),M=m(()=>!V(e.autoSize)||!e.autoSize.minRows?0:e.autoSize.minRows*N.value+T.value),F=m(()=>!V(e.autoSize)||!e.autoSize.maxRows?0:e.autoSize.maxRows*N.value+T.value),E=()=>{const a=Ae(Z);N.value=Number.parseInt(a["line-height"]||0,10),T.value=Number.parseInt(a["border-width"]||0,10)*2+Number.parseInt(a["padding-top"]||0,10)+Number.parseInt(a["padding-bottom"]||0,10),J.value=a,ae(()=>{var t;const n=(t=w.value)==null?void 0:t.offsetHeight;let r=n??0,_="hidden";M.value&&r<M.value&&(r=M.value),F.value&&r>F.value&&(r=F.value,_="auto"),q.value={height:`${r}px`,resize:"none",overflow:_}})};Ne(()=>{u.value&&(Z=window.getComputedStyle(u.value),e.autoSize&&E()),O()});const ge=()=>{e.autoSize&&w.value&&E(),O()},pe=a=>{u.value&&a.target!==u.value&&(a.preventDefault(),u.value.focus())},O=()=>{u.value&&(u.value.scrollHeight>u.value.offsetHeight?C.value||(C.value=!0):C.value&&(C.value=!1))};return A(i,()=>{e.autoSize&&w.value&&E(),O()}),{prefixCls:f,wrapperCls:ce,textareaRef:u,textareaStyle:q,mirrorRef:w,mirrorStyle:J,computedValue:i,showClearBtn:re,valueLength:K,computedMaxLength:s,mergedDisabled:g,getWrapperAttrs:fe,getTextareaAttrs:me,handleInput:de,handleFocus:ue,handleBlur:se,handleComposition:ie,handleClear:ve,handleResize:ge,handleMousedown:pe}},methods:{focus(){var e;(e=this.$refs.textareaRef)==null||e.focus()},blur(){var e;(e=this.$refs.textareaRef)==null||e.blur()}}}),Pe=["disabled","value","placeholder"];function je(e,l,v,h,p,c){const f=D("resize-observer"),g=D("icon-close"),L=D("icon-hover");return b(),$("div",Q(e.getWrapperAttrs(e.$attrs),{class:e.wrapperCls,onMousedown:l[7]||(l[7]=(...o)=>e.handleMousedown&&e.handleMousedown(...o))}),[e.autoSize?(b(),$("div",{key:0,ref:"mirrorRef",class:P(`${e.prefixCls}-mirror`),style:Te(e.mirrorStyle)},j(`${e.computedValue}
`),7)):U("v-if",!0),B(f,{onResize:e.handleResize},{default:G(()=>[Me("textarea",Q({ref:"textareaRef"},e.getTextareaAttrs(e.$attrs),{disabled:e.mergedDisabled,class:e.prefixCls,style:e.textareaStyle,value:e.computedValue,placeholder:e.placeholder,onInput:l[0]||(l[0]=(...o)=>e.handleInput&&e.handleInput(...o)),onFocus:l[1]||(l[1]=(...o)=>e.handleFocus&&e.handleFocus(...o)),onBlur:l[2]||(l[2]=(...o)=>e.handleBlur&&e.handleBlur(...o)),onCompositionstart:l[3]||(l[3]=(...o)=>e.handleComposition&&e.handleComposition(...o)),onCompositionupdate:l[4]||(l[4]=(...o)=>e.handleComposition&&e.handleComposition(...o)),onCompositionend:l[5]||(l[5]=(...o)=>e.handleComposition&&e.handleComposition(...o))}),null,16,Pe)]),_:1},8,["onResize"]),Fe(e.$slots,"suffix"),e.computedMaxLength&&e.showWordLimit?(b(),$("div",{key:1,class:P(`${e.prefixCls}-word-limit`)},j(e.valueLength)+"/"+j(e.computedMaxLength),3)):U("v-if",!0),e.showClearBtn?(b(),$("div",{key:2,class:P(`${e.prefixCls}-clear-btn`),onClick:l[6]||(l[6]=(...o)=>e.handleClear&&e.handleClear(...o))},[B(L,null,{default:G(()=>[B(g)]),_:1})],2)):U("v-if",!0)],16)}var W=he(De,[["render",je]]);const Ue=Object.assign(W,{install:(e,l)=>{Re(e,l);const v=ke(l);e.component(v+W.name,W)}});const qe=le({name:"Textarea",__name:"index",props:{modelValue:{type:String,default:""}},emits:["update:modelValue"],setup(e,{emit:l}){const v=e,h=m({get:()=>v.modelValue,set:p=>{l("update:modelValue",p)}});return(p,c)=>{const f=Ue;return b(),Ee(xe,null,{default:G(()=>[B(f,Q({modelValue:h.value,"onUpdate:modelValue":c[0]||(c[0]=g=>h.value=g),modelModifiers:{trim:!0}},p.$attrs),null,16,["modelValue"])]),_:1})}}});export{qe as default};
