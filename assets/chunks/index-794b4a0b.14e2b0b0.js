import{ax as d}from"./index-0c1a04c6.07b6402b.js";import{e as r}from"./index-e7c7dd0d.79b53889.js";import{d as n,m as p,o as c,A as i,B as V,G as f,E as x}from"./framework.f10db147.js";const k=n({name:"Select",__name:"index",props:{modelValue:{default:[]}},emits:["update:modelValue"],setup(l,{emit:o}){const m=l,a=p({get:()=>m.modelValue,set:e=>{o("update:modelValue",e)}});return(e,t)=>{const u=d;return c(),i(r,null,{default:V(()=>[f(u,x({modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=s=>a.value=s)},e.$attrs),null,16,["modelValue"])]),_:1})}}});export{k as default};