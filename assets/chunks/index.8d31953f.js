import{_ as c,W as u,ab as d}from"./index-cf5aeaf9.451b2847.js";import{d as m,m as l,o as k,c as f,n as p,H as h,z as v}from"./framework.6f649eb3.js";const C=m({name:"IconFile",props:{size:{type:[Number,String]},strokeWidth:{type:Number,default:4},strokeLinecap:{type:String,default:"butt",validator:e=>["butt","round","square"].includes(e)},strokeLinejoin:{type:String,default:"miter",validator:e=>["arcs","bevel","miter","miter-clip","round"].includes(e)},rotate:Number,spin:Boolean},emits:{click:e=>!0},setup(e,{emit:t}){const n=u("icon"),o=l(()=>[n,`${n}-file`,{[`${n}-spin`]:e.spin}]),r=l(()=>{const i={};return e.size&&(i.fontSize=d(e.size)?`${e.size}px`:e.size),e.rotate&&(i.transform=`rotate(${e.rotate}deg)`),i});return{cls:o,innerStyle:r,onClick:i=>{t("click",i)}}}}),b=["stroke-width","stroke-linecap","stroke-linejoin"],g=v("path",{d:"M16 21h16m-16 8h10m11 13H11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h21l7 7v27a2 2 0 0 1-2 2Z"},null,-1),y=[g];function z(e,t,n,o,r,a){return k(),f("svg",{viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"currentColor",class:p(e.cls),style:h(e.innerStyle),"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin,onClick:t[0]||(t[0]=(...i)=>e.onClick&&e.onClick(...i))},y,14,b)}var s=c(C,[["render",z]]);const w=Object.assign(s,{install:(e,t)=>{var n;const o=(n=t==null?void 0:t.iconPrefix)!=null?n:"";e.component(o+s.name,s)}});export{w as I};