import{K as w,L as I,N as b,O as h}from"./index-ba2bcb3f.d19171b1.js";import{U as x}from"./index-176aefe7.e94bdfa5.js";import{d as U,m as _,j as g,w as B,o as u,A as n,B as r,E as s,a6 as C,a as p,t as m}from"./framework.d95c8bae.js";const N=U({name:"Input",__name:"index",props:{modelValue:{default:""},debounce:{default:void 0}},emits:["update:modelValue"],setup(c,{emit:i}){const l=c,a=_({get:()=>l.modelValue,set:e=>{i("update:modelValue",e)}}),d=g("");B(()=>l.modelValue,e=>{d.value=e},{immediate:!0});function f(e){if(l.debounce){V(e);return}a.value=e}const V=w(e=>{a.value=e},l.debounce);function v(){a.value=""}return(e,t)=>{const $=I,y=b,k=h;return u(),n(x,null,{default:r(()=>[e.$attrs.formType==="password"?(u(),n($,s({key:0,modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=o=>a.value=o)},e.$attrs),null,16,["modelValue"])):e.$attrs.formType==="search"?(u(),n(y,s({key:1,modelValue:a.value,"onUpdate:modelValue":t[1]||(t[1]=o=>a.value=o)},e.$attrs),null,16,["modelValue"])):(u(),n(k,s({key:2,modelValue:d.value,"onUpdate:modelValue":t[2]||(t[2]=o=>d.value=o)},e.$attrs,{onInput:f,onClear:v}),C({_:2},[e.$attrs.prepend?{name:"prepend",fn:r(()=>[p(m(e.$attrs.prepend),1)]),key:"0"}:void 0,e.$attrs.append?{name:"append",fn:r(()=>[p(m(e.$attrs.append),1)]),key:"1"}:void 0]),1040,["modelValue"]))]),_:1})}}});export{N as default};