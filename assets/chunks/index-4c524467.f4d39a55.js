import"./index-af7a4902.0c500fb7.js";import{e as c}from"./index-b9c14449.bcd46106.js";import{M as v}from"./index.210f9a70.js";import{U as x}from"./index.cdbfe858.js";import{d as B,m as i,o as g,A as y,B as z,G as A,E as S}from"./framework.f10db147.js";import"./index.363ab847.js";import"./use-merge-state.6249bcd1.js";import"./render-function.9edc4e68.js";const h=B({name:"Upload",__name:"index",props:{modelValue:{default:()=>""},maxSize:{default:0}},emits:["update:modelValue"],setup(s,{emit:n}){const u=s,a=i({get:()=>u.modelValue,set:e=>{n("update:modelValue",e)}}),o=i(()=>a.value?Array.isArray(a.value)?a.value.map(e=>({uid:e,name:e,status:"done",url:e})):[{uid:a.value,name:a.value,status:"done",url:a.value}]:[]);function m(e){return e<1024?e+" B":e<1048576?(e/1024).toFixed(2)+" KB":e<1073741824?(e/1048576).toFixed(2)+" MB":(e/1073741824).toFixed(2)+" GB"}function d(e){return new Promise((l,r)=>{if(u.maxSize&&e.size>u.maxSize*1024){const t=m(u.maxSize*1024);v.error(`文件大小不能超过${t}`),r(!1)}l(!0)})}function p(e){return new Promise(l=>{const r=o.value.findIndex(t=>t.url===e.url);r>-1&&(o.value.splice(r,1),a.value=o.value.map(t=>t.url)),l(!0)})}function f(e){e.url&&(Array.isArray(a.value)?a.value.push(e.url):a.value=e.url)}return(e,l)=>{const r=x;return g(),y(c,null,{default:z(()=>[A(r,S({"list-type":"picture-card","image-preview":!0,"default-file-list":o.value,accept:"image/*","on-before-upload":d,"on-before-remove":p},e.$attrs,{onSuccess:f}),null,16,["default-file-list"])]),_:1})}}});export{h as default};