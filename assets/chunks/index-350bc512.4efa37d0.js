import{aj as xt,ar as st,aZ as he,a_ as Ut,J as Yt,a2 as Gt,X as pe,a1 as $e,aL as Wt,aa as Oe,_ as Ve,at as Xt,a$ as qt,L as Be,aT as Jt,ae as xe,a5 as $t,a6 as Et,b0 as Zt,aS as Qt,a0 as Ze,aX as ea,ai as ta,aW as aa,aU as na,aV as la,O as oa,ak as ra}from"./index-298d85ae.774a179e.js";import{U as sa}from"./index-b15b00e4.bd9b2eb3.js";import{R as Dt,d as ve,a4 as te,aw as we,j as O,U as ua,f as ia,m,a1 as Q,D as q,o as E,c as X,C as B,z as Pe,F as Te,L as Qe,n as H,G as ee,a5 as Pt,B as le,r as x,A as F,af as Ue,E as _,a as da,t as ca,T as pa,l as Fe,S as va,ac as fa,w as ut,H as ya,I as ha,ax as ga,i as ba}from"./framework.e8766f7a.js";import{R as Ot}from"./render-function.3f73711f.js";import{I as ma}from"./index.d5cc3e5d.js";const Tt=Symbol("TreeInjectionKey");function Sa(e){const t=[];function a(n){n&&n.forEach(l=>{t.push(l),a(l.children)})}return a(e),t}function ka(e){const t=new Map;return e.forEach(a=>{t.set(a.key,a)}),t}function Ye(e){return e.selectable&&!e.disabled}function it(e){return!e.isLeaf&&e.children}function Ca(e){return xt(e.isLeaf)?e.isLeaf:!e.children}function Ge(e){return Set.prototype.add.bind(e)}function We(e){return Set.prototype.delete.bind(e)}function ke(e){return e.disabled||e.disableCheckbox?!1:!!e.checkable}function et(e){var t;const a=[];return(t=e.children)==null||t.forEach(n=>{ke(n)&&a.push(n.key,...et(n))}),a}function Vt(e){var t;const{node:a,checkedKeySet:n,indeterminateKeySet:l}=e;let u=a.parent;for(;u;){if(ke(u)){const r=u.key,c=((t=u.children)==null?void 0:t.filter(ke))||[];let o=0;const i=c.length;c.some(({key:d})=>{if(n.has(d))o+=1;else if(l.has(d))return o+=.5,!0;return!1}),o&&o!==i?l.add(r):l.delete(r),o&&o===i?n.add(r):n.delete(r)}u=u.parent}}function Xe(e){const{node:t,checked:a,checkedKeys:n,indeterminateKeys:l,checkStrictly:u=!1}=e,{key:r}=t,c=new Set(n),o=new Set(l);if(a?c.add(r):c.delete(r),o.delete(r),!u){const i=et(t);a?i.forEach(Ge(c)):i.forEach(We(c)),i.forEach(We(o)),Vt({node:t,checkedKeySet:c,indeterminateKeySet:o})}return[[...c],[...o]]}function Na(e){const{initCheckedKeys:t,key2TreeNode:a,checkStrictly:n,onlyCheckLeaf:l}=e,u=new Set,r=new Set,c=new Set;return n?t.forEach(Ge(u)):t.forEach(o=>{var i;const d=a.get(o);if(!d||r.has(o)||l&&((i=d.children)!=null&&i.length))return;const h=et(d);h.forEach(Ge(r)),h.forEach(We(c)),u.add(o),c.delete(o),Vt({node:d,checkedKeySet:u,indeterminateKeySet:c})}),[[...u,...r],[...c]]}function _e(){return Dt(Tt)||{}}var Ka=ve({name:"TreeNodeSwitcher",components:{IconLoading:st,RenderFunction:Ot},props:{prefixCls:String,loading:Boolean,showLine:Boolean,treeNodeData:{type:Object},icons:{type:Object},nodeStatus:{type:Object}},emits:["click"],setup(e,{slots:t,emit:a}){const{icons:n,nodeStatus:l,treeNodeData:u}=te(e),r=_e(),c=he(t,"switcher-icon"),o=he(t,"loading-icon");return{getSwitcherIcon:()=>{var i,d,h;const S=(d=(i=n==null?void 0:n.value)==null?void 0:i.switcherIcon)!=null?d:c.value;return S?S(l.value):(h=r.switcherIcon)==null?void 0:h.call(r,u.value,l.value)},getLoadingIcon:()=>{var i,d,h;const S=(d=(i=n==null?void 0:n.value)==null?void 0:i.loadingIcon)!=null?d:o.value;return S?S(l.value):(h=r.loadingIcon)==null?void 0:h.call(r,u.value,l.value)},onClick(i){a("click",i)}}},render(){var e,t,a;const{prefixCls:n,getSwitcherIcon:l,getLoadingIcon:u,onClick:r,nodeStatus:c={},loading:o,showLine:i}=this,{expanded:d,isLeaf:h}=c;if(o)return(e=u())!=null?e:we(st);let S=null,N=!1;if(h)i&&(S=(a=l())!=null?a:we(ma));else{const D=i?we("span",{class:`${n}-${d?"minus":"plus"}-icon`}):we(Ut);S=(t=l())!=null?t:D,N=!i}if(!S)return null;const g=we("span",{class:`${n}-switcher-icon`,onClick:r},S);return N?we(Yt,{class:`${n}-icon-hover`},()=>g):g}}),wa=Object.defineProperty,$a=Object.defineProperties,Ea=Object.getOwnPropertyDescriptors,dt=Object.getOwnPropertySymbols,Da=Object.prototype.hasOwnProperty,Pa=Object.prototype.propertyIsEnumerable,ct=(e,t,a)=>t in e?wa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,qe=(e,t)=>{for(var a in t||(t={}))Da.call(t,a)&&ct(e,a,t[a]);if(dt)for(var a of dt(t))Pa.call(t,a)&&ct(e,a,t[a]);return e},pt=(e,t)=>$a(e,Ea(t));const Bt=(()=>{let e=0;return()=>(e+=1,`__arco_tree${e}`)})();function Oa(e,t){return!!(pe(e)?t:e)}function Ta(e,t){const a=qe({},e);return t&&Object.keys(t).forEach(l=>{const u=t[l];u!==l&&(a[l]=e[u],delete a[u])}),a}function vt({subEnable:e,superEnable:t,isLeaf:a,treeNodeData:n,level:l}){return pe(e)?$e(t)?t(n,{isLeaf:a,level:l}):t??!1:e}function Va(e){var t,a;const{treeNodeData:n,parentNode:l,isTail:u=!0,treeProps:r}=e,{fieldNames:c}=r||{},o=Ta(n,c),i=r.loadMore?!!o.isLeaf:!((t=o.children)!=null&&t.length),d=l?l.level+1:0,h=pt(qe({},Gt(o,["children"])),{key:(a=o.key)!=null?a:Bt(),selectable:vt({subEnable:o.selectable,superEnable:r==null?void 0:r.selectable,isLeaf:i,level:d,treeNodeData:n}),disabled:!!o.disabled,disableCheckbox:!!o.disableCheckbox,checkable:vt({subEnable:o.checkable,superEnable:r==null?void 0:r.checkable,isLeaf:i,level:d,treeNodeData:n}),isLeaf:i,isTail:u,blockNode:!!(r!=null&&r.blockNode),showLine:!!(r!=null&&r.showLine),level:d,lineless:l?[...l.lineless,l.isTail]:[],draggable:Oa(o.draggable,r==null?void 0:r.draggable)});return pt(qe({},h),{treeNodeProps:h,treeNodeData:n,parent:l,parentKey:l==null?void 0:l.key,pathParentKeys:l?[...l.pathParentKeys,l.key]:[]})}function Ba(e,t){function a(n,l){if(!n)return;const{fieldNames:u}=t,r=[];return n.forEach((c,o)=>{const i=Va({treeNodeData:c,treeProps:t,parentNode:l,isTail:o===n.length-1});i.children=a(c[(u==null?void 0:u.children)||"children"],i),r.push(i)}),r}return a(e)}function It(){const e=ia(),t=()=>{var n;return(n=e==null?void 0:e.vnode.key)!=null?n:Bt()},a=O(t());return ua(()=>{a.value=t()}),a}function Ia(e){const{key:t,refTitle:a}=te(e),n=_e(),l=O(!1),u=O(!1),r=O(!1),c=O(0),o=Wt(i=>{if(!a.value)return;const d=a.value.getBoundingClientRect(),h=window.pageYOffset+d.top,{pageY:S}=i,N=d.height/4,g=S-h;c.value=g<N?-1:g<d.height-N?0:1,r.value=n.allowDrop?n.allowDrop(t.value,c.value):!0});return{isDragOver:l,isDragging:u,isAllowDrop:r,dropPosition:c,setDragStatus(i,d){switch(i){case"dragStart":u.value=!0,c.value=0,n.onDragStart&&n.onDragStart(t.value,d);break;case"dragEnd":u.value=!1,l.value=!1,c.value=0,o.cancel(),n.onDragEnd&&n.onDragEnd(t.value,d);break;case"dragOver":l.value=!0,o(d),n.onDragOver&&n.onDragOver(t.value,d);break;case"dragLeave":l.value=!1,c.value=0,o.cancel(),n.onDragLeave&&n.onDragLeave(t.value,d);break;case"drop":n.onDrop&&n.onDrop(t.value,c.value,d),l.value=!1,c.value=0,o.cancel();break}}}}function La(e){return Oe(e)?e:[e]}const Fa=ve({name:"BaseTreeNode",components:{NodeSwitcher:Ka,Checkbox:Xt,RenderFunction:Ot,IconDragDotVertical:qt},props:{title:{type:String},selectable:{type:Boolean},disabled:{type:Boolean},disableCheckbox:{type:Boolean},checkable:{type:Boolean},draggable:{type:Boolean},isLeaf:{type:Boolean},icon:{type:Function},switcherIcon:{type:Function},loadingIcon:{type:Function},dragIcon:{type:Function},isTail:{type:Boolean},blockNode:{type:Boolean},showLine:{type:Boolean},level:{type:Number,default:0},lineless:{type:Array,default:()=>[]}},setup(e){const t=It(),a=Be("tree-node"),n=_e(),l=m(()=>{var p;return(p=n.key2TreeNode)==null?void 0:p.get(t.value)}),u=m(()=>l.value.treeNodeData),r=m(()=>l.value.children),c=m(()=>{var p;const k=(p=n.treeProps)==null?void 0:p.actionOnNodeClick;return k?La(k):[]}),{isLeaf:o,isTail:i,selectable:d,disabled:h,disableCheckbox:S,draggable:N}=te(e),g=m(()=>{var p;return[`${a}`,{[`${a}-selected`]:z.value,[`${a}-is-leaf`]:o.value,[`${a}-is-tail`]:i.value,[`${a}-expanded`]:I.value,[`${a}-disabled-selectable`]:!d.value&&!((p=n.treeProps)!=null&&p.disableSelectActionOnly),[`${a}-disabled`]:h.value}]}),D=O(),{isDragOver:$,isDragging:T,isAllowDrop:j,dropPosition:U,setDragStatus:w}=Ia(Q({key:t,refTitle:D})),V=m(()=>[`${a}-title`,{[`${a}-title-draggable`]:N.value,[`${a}-title-gap-top`]:$.value&&j.value&&U.value<0,[`${a}-title-gap-bottom`]:$.value&&j.value&&U.value>0,[`${a}-title-highlight`]:!T.value&&$.value&&j.value&&U.value===0,[`${a}-title-dragging`]:T.value,[`${a}-title-block`]:l.value.blockNode}]),A=m(()=>{var p,k;return(k=(p=n.checkedKeys)==null?void 0:p.includes)==null?void 0:k.call(p,t.value)}),Y=m(()=>{var p,k;return(k=(p=n.indeterminateKeys)==null?void 0:p.includes)==null?void 0:k.call(p,t.value)}),z=m(()=>{var p,k;return(k=(p=n.selectedKeys)==null?void 0:p.includes)==null?void 0:k.call(p,t.value)}),I=m(()=>{var p,k;return(k=(p=n.expandedKeys)==null?void 0:p.includes)==null?void 0:k.call(p,t.value)}),oe=m(()=>{var p,k;return(k=(p=n.loadingKeys)==null?void 0:p.includes)==null?void 0:k.call(p,t.value)}),re=m(()=>n.dragIcon),fe=m(()=>n.nodeIcon);function G(p){var k,R;o.value||(!((k=r.value)!=null&&k.length)&&$e(n.onLoadMore)?n.onLoadMore(t.value):(R=n==null?void 0:n.onExpand)==null||R.call(n,!I.value,t.value,p))}const M=Q({loading:oe,checked:A,selected:z,indeterminate:Y,expanded:I,isLeaf:o}),W=m(()=>n.nodeTitle?()=>{var p;return(p=n.nodeTitle)==null?void 0:p.call(n,u.value,M)}:void 0),ae=m(()=>n.nodeExtra?()=>{var p;return(p=n.nodeExtra)==null?void 0:p.call(n,u.value,M)}:void 0);return{nodekey:t,refTitle:D,prefixCls:a,classNames:g,titleClassNames:V,indeterminate:Y,checked:A,expanded:I,selected:z,treeTitle:W,treeNodeData:u,loading:oe,treeDragIcon:re,treeNodeIcon:fe,extra:ae,nodeStatus:M,onCheckboxChange(p,k){var R;S.value||h.value||(R=n.onCheck)==null||R.call(n,p,t.value,k)},onTitleClick(p){var k;c.value.includes("expand")&&G(p),!(!d.value||h.value)&&((k=n.onSelect)==null||k.call(n,t.value,p))},onSwitcherClick:G,onDragStart(p){var k;if(N.value){p.stopPropagation(),w("dragStart",p);try{(k=p.dataTransfer)==null||k.setData("text/plain","")}catch{}}},onDragEnd(p){N.value&&(p.stopPropagation(),w("dragEnd",p))},onDragOver(p){N&&(p.stopPropagation(),p.preventDefault(),w("dragOver",p))},onDragLeave(p){N.value&&(p.stopPropagation(),w("dragLeave",p))},onDrop(p){!N.value||!j.value||(p.stopPropagation(),p.preventDefault(),w("drop",p))}}}}),_a=["data-level","data-key"],ja=["draggable"];function Aa(e,t,a,n,l,u){const r=q("NodeSwitcher"),c=q("Checkbox"),o=q("RenderFunction"),i=q("IconDragDotVertical");return E(),X("div",{class:H(e.classNames),"data-level":e.level,"data-key":e.nodekey},[B(" 缩进 "),Pe("span",{class:H(`${e.prefixCls}-indent`)},[(E(!0),X(Te,null,Qe(e.level,d=>(E(),X("span",{key:d,class:H([`${e.prefixCls}-indent-block`,{[`${e.prefixCls}-indent-block-lineless`]:e.lineless[d-1]}])},null,2))),128))],2),B(" switcher "),Pe("span",{class:H([`${e.prefixCls}-switcher`,{[`${e.prefixCls}-switcher-expanded`]:e.expanded}])},[ee(r,{"prefix-cls":e.prefixCls,loading:e.loading,"show-line":e.showLine,"tree-node-data":e.treeNodeData,icons:{switcherIcon:e.switcherIcon,loadingIcon:e.loadingIcon},"node-status":e.nodeStatus,onClick:e.onSwitcherClick},Pt({_:2},[e.$slots["switcher-icon"]?{name:"switcher-icon",fn:le(()=>[B(" @slot 定制 switcher 图标，会覆盖 Tree 的配置 "),x(e.$slots,"switcher-icon")])}:void 0,e.$slots["loading-icon"]?{name:"loading-icon",fn:le(()=>[B(" @slot 定制 loading 图标，会覆盖 Tree 的配置 "),x(e.$slots,"loading-icon")])}:void 0]),1032,["prefix-cls","loading","show-line","tree-node-data","icons","node-status","onClick"])],2),B(" checkbox "),e.checkable?(E(),F(c,{key:0,disabled:e.disableCheckbox||e.disabled,"model-value":e.checked,indeterminate:e.indeterminate,"uninject-group-context":"",onChange:e.onCheckboxChange},null,8,["disabled","model-value","indeterminate","onChange"])):B("v-if",!0),B(" 内容 "),Pe("span",{ref:"refTitle",class:H(e.titleClassNames),draggable:e.draggable,onDragstart:t[0]||(t[0]=(...d)=>e.onDragStart&&e.onDragStart(...d)),onDragend:t[1]||(t[1]=(...d)=>e.onDragEnd&&e.onDragEnd(...d)),onDragover:t[2]||(t[2]=(...d)=>e.onDragOver&&e.onDragOver(...d)),onDragleave:t[3]||(t[3]=(...d)=>e.onDragLeave&&e.onDragLeave(...d)),onDrop:t[4]||(t[4]=(...d)=>e.onDrop&&e.onDrop(...d)),onClick:t[5]||(t[5]=(...d)=>e.onTitleClick&&e.onTitleClick(...d))},[e.$slots.icon||e.icon||e.treeNodeIcon?(E(),X("span",{key:0,class:H([`${e.prefixCls}-icon`,`${e.prefixCls}-custom-icon`])},[B(" 节点图标 "),e.$slots.icon?x(e.$slots,"icon",Ue(_({key:0},e.nodeStatus))):e.icon?(E(),F(o,_({key:1,"render-func":e.icon},e.nodeStatus),null,16,["render-func"])):e.treeNodeIcon?(E(),F(o,_({key:2,"render-func":e.treeNodeIcon,node:e.treeNodeData},e.nodeStatus),null,16,["render-func","node"])):B("v-if",!0)],2)):B("v-if",!0),Pe("span",{class:H(`${e.prefixCls}-title-text`)},[e.treeTitle?(E(),F(o,{key:0,"render-func":e.treeTitle},null,8,["render-func"])):(E(),X(Te,{key:1},[B(" 标题，treeTitle 优先级高于节点的 title "),x(e.$slots,"title",{title:e.title},()=>[da(ca(e.title),1)])],2112)),e.draggable?(E(),X("span",{key:2,class:H([`${e.prefixCls}-icon`,`${e.prefixCls}-drag-icon`])},[B(" 拖拽图标 "),e.$slots["drag-icon"]?x(e.$slots,"drag-icon",Ue(_({key:0},e.nodeStatus))):e.dragIcon?(E(),F(o,_({key:1,"render-func":e.dragIcon},e.nodeStatus),null,16,["render-func"])):e.treeDragIcon?(E(),F(o,_({key:2,"render-func":e.treeDragIcon,node:e.treeNodeData},e.nodeStatus),null,16,["render-func","node"])):(E(),F(i,{key:3}))],2)):B("v-if",!0)],2)],42,ja),B(" 额外 "),e.extra?(E(),F(o,{key:1,"render-func":e.extra},null,8,["render-func"])):B("v-if",!0)],10,_a)}var Je=Ve(Fa,[["render",Aa]]);const Ma=ve({name:"ExpandTransition",props:{expanded:Boolean},emits:["end"],setup(e,{emit:t}){return{onBeforeEnter(a){a.style.height=e.expanded?"0":`${a.scrollHeight}px`},onEnter(a){a.style.height=e.expanded?`${a.scrollHeight}px`:"0"},onAfterEnter(a){a.style.height=e.expanded?"":"0",t("end")},onBeforeLeave(a){a.style.display="none"}}}});function Ra(e,t,a,n,l,u){return E(),F(pa,{onBeforeEnter:e.onBeforeEnter,onEnter:e.onEnter,onAfterEnter:e.onAfterEnter,onBeforeLeave:e.onBeforeLeave},{default:le(()=>[x(e.$slots,"default")]),_:3},8,["onBeforeEnter","onEnter","onAfterEnter","onBeforeLeave"])}var za=Ve(Ma,[["render",Ra]]);const Ha=ve({name:"TransitionNodeList",components:{ExpandTransition:za,BaseTreeNode:Je},props:{nodeKey:{type:[String,Number],required:!0}},setup(e){const a=[`${Be("tree")}-node-list`],n=_e(),{nodeKey:l}=te(e),u=m(()=>{var o,i;return(i=(o=n.expandedKeys)==null?void 0:o.includes)==null?void 0:i.call(o,l.value)}),r=m(()=>{var o;const i=new Set(n.expandedKeys||[]),d=(o=n.flattenTreeData)==null?void 0:o.filter(h=>{var S,N;return(S=h.pathParentKeys)!=null&&S.includes(l.value)?!n.filterTreeNode||((N=n.filterTreeNode)==null?void 0:N.call(n,h.treeNodeData)):!1});return d==null?void 0:d.filter(h=>{var S;if(u.value)return(S=h.pathParentKeys)==null?void 0:S.every(g=>i.has(g));const N=h.pathParentKeys.indexOf(l.value);return h.pathParentKeys.slice(N+1).every(g=>i.has(g))})}),c=m(()=>{var o,i;return((o=n.currentExpandKeys)==null?void 0:o.includes(l.value))&&((i=r.value)==null?void 0:i.length)});return{classNames:a,visibleNodeList:r,show:c,expanded:u,onTransitionEnd(){var o;(o=n.onExpandEnd)==null||o.call(n,l.value)}}}});function xa(e,t,a,n,l,u){const r=q("BaseTreeNode"),c=q("ExpandTransition");return E(),F(c,{expanded:e.expanded,onEnd:e.onTransitionEnd},{default:le(()=>[e.show?(E(),X("div",{key:0,class:H(e.classNames)},[(E(!0),X(Te,null,Qe(e.visibleNodeList,o=>(E(),F(r,_({key:o.key},o.treeNodeProps),null,16))),128))],2)):B("v-if",!0)]),_:1},8,["expanded","onEnd"])}var Ua=Ve(Ha,[["render",xa]]),Ya=Object.defineProperty,ft=Object.getOwnPropertySymbols,Ga=Object.prototype.hasOwnProperty,Wa=Object.prototype.propertyIsEnumerable,yt=(e,t,a)=>t in e?Ya(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Xa=(e,t)=>{for(var a in t||(t={}))Ga.call(t,a)&&yt(e,a,t[a]);if(ft)for(var a of ft(t))Wa.call(t,a)&&yt(e,a,t[a]);return e},qa=ve({name:"TreeNode",inheritAttrs:!1,props:Xa({},Je.props),setup(e,{slots:t,attrs:a}){const n=It();return()=>ee(Te,null,[ee(Je,_(e,a,{key:n.value}),t),ee(Ua,{key:n.value,nodeKey:n.value},null)])}});function Ja(e){const{defaultCheckedKeys:t,checkedKeys:a,key2TreeNode:n,checkStrictly:l,halfCheckedKeys:u,onlyCheckLeaf:r}=te(e),c=O(!1),o=O([]),i=O([]),d=O(),h=O(),S=g=>Na({initCheckedKeys:g,key2TreeNode:n.value,checkStrictly:l.value,onlyCheckLeaf:r.value}),N=g=>{const D=S(g);[o.value,i.value]=D};return N(a.value||(t==null?void 0:t.value)||[]),Fe(()=>{a.value?[d.value,h.value]=S(a.value):c.value&&(d.value=void 0,h.value=void 0,o.value=[],i.value=[]),c.value||(c.value=!0)}),{checkedKeys:m(()=>d.value||o.value),indeterminateKeys:m(()=>l.value&&u.value?u.value:h.value||i.value),setCheckedState(g,D,$=!1){return $?N(g):(o.value=g,i.value=D),[o.value,i.value]}}}function Lt(e){const{treeData:t,fieldNames:a,selectable:n,showLine:l,blockNode:u,checkable:r,loadMore:c,draggable:o}=te(e),i=O([]);Fe(()=>{var S,N;i.value=Ba(t.value||[],{selectable:(S=n==null?void 0:n.value)!=null?S:!1,showLine:!!(l!=null&&l.value),blockNode:!!(u!=null&&u.value),checkable:(N=r==null?void 0:r.value)!=null?N:!1,fieldNames:a==null?void 0:a.value,loadMore:!!(c!=null&&c.value),draggable:!!(o!=null&&o.value)})});const d=m(()=>Sa(i.value)),h=m(()=>ka(d.value));return{treeData:i,flattenTreeData:d,key2TreeNode:h}}const Za=ve({name:"Tree",components:{VirtualList:Jt,TreeNode:qa},props:{size:{type:String,default:"medium"},blockNode:{type:Boolean},defaultExpandAll:{type:Boolean,default:!0},multiple:{type:Boolean},checkable:{type:[Boolean,String,Function],default:!1},selectable:{type:[Boolean,Function],default:!0},checkStrictly:{type:Boolean},checkedStrategy:{type:String,default:"all"},defaultSelectedKeys:{type:Array},selectedKeys:{type:Array},defaultCheckedKeys:{type:Array},checkedKeys:{type:Array},defaultExpandedKeys:{type:Array},expandedKeys:{type:Array},data:{type:Array,default:()=>[]},fieldNames:{type:Object},showLine:{type:Boolean},loadMore:{type:Function},draggable:{type:Boolean},allowDrop:{type:Function},filterTreeNode:{type:Function},searchValue:{type:String,default:""},virtualListProps:{type:Object},defaultExpandSelected:{type:Boolean},defaultExpandChecked:{type:Boolean},autoExpandParent:{type:Boolean,default:!0},halfCheckedKeys:{type:Array},onlyCheckLeaf:{type:Boolean,default:!1},animation:{type:Boolean,default:!0},actionOnNodeClick:{type:String},disableSelectActionOnly:{type:Boolean,default:!1}},emits:{select:(e,t)=>!0,"update:selectedKeys":e=>!0,check:(e,t)=>!0,"update:checkedKeys":e=>!0,"update:halfCheckedKeys":e=>!0,expand:(e,t)=>!0,"update:expandedKeys":e=>!0,dragStart:(e,t)=>!0,dragEnd:(e,t)=>!0,dragOver:(e,t)=>!0,dragLeave:(e,t)=>!0,drop:e=>!0},setup(e,{emit:t,slots:a}){const{data:n,showLine:l,multiple:u,loadMore:r,checkStrictly:c,checkedKeys:o,defaultCheckedKeys:i,selectedKeys:d,defaultSelectedKeys:h,expandedKeys:S,defaultExpandedKeys:N,checkedStrategy:g,selectable:D,checkable:$,blockNode:T,fieldNames:j,size:U,defaultExpandAll:w,filterTreeNode:V,draggable:A,allowDrop:Y,defaultExpandSelected:z,defaultExpandChecked:I,autoExpandParent:oe,halfCheckedKeys:re,onlyCheckLeaf:fe,animation:G}=te(e),M=Be("tree"),W=m(()=>[`${M}`,{[`${M}-checkable`]:$.value,[`${M}-show-line`]:l.value},`${M}-size-${U.value}`]),ae=he(a,"switcher-icon"),p=he(a,"loading-icon"),k=he(a,"drag-icon"),R=he(a,"icon"),ne=he(a,"title"),je=he(a,"extra"),{treeData:Ae,flattenTreeData:Ee,key2TreeNode:P}=Lt(Q({treeData:n,selectable:D,showLine:l,blockNode:T,checkable:$,fieldNames:j,loadMore:r,draggable:A})),{checkedKeys:ye,indeterminateKeys:se,setCheckedState:Ce}=Ja(Q({defaultCheckedKeys:i,checkedKeys:o,checkStrictly:c,key2TreeNode:P,halfCheckedKeys:re,onlyCheckLeaf:fe})),[J,ge]=xe((h==null?void 0:h.value)||[],Q({value:d})),ue=O([]),ie=O();function Me(){if(N!=null&&N.value){const s=new Set([]);return N.value.forEach(v=>{if(s.has(v))return;const f=P.value.get(v);f&&[...oe.value?f.pathParentKeys:[],v].forEach(y=>s.add(y))}),[...s]}if(w.value)return Ee.value.filter(s=>s.children&&s.children.length).map(s=>s.key);if(z.value||I.value){const s=new Set([]),v=f=>{f.forEach(y=>{const b=P.value.get(y);b&&(b.pathParentKeys||[]).forEach(K=>s.add(K))})};return z.value&&v(J.value),I.value&&v(ye.value),[...s]}return[]}const[de,De]=xe(Me(),Q({value:S})),ce=O([]),Re=m(()=>{const s=new Set(de.value),v=new Set(ce.value);return Ee.value.filter(f=>{var y;if(!(!V||!V.value||(V==null?void 0:V.value(f.treeNodeData))))return!1;const K=pe(f.parentKey),Se=(y=f.pathParentKeys)==null?void 0:y.every(Ke=>s.has(Ke)&&!v.has(Ke));return K||Se})});function be(s,v=g.value){let f=[...s];return v==="parent"?f=s.filter(y=>{const b=P.value.get(y);return b&&!(!pe(b.parentKey)&&s.includes(b.parentKey))}):v==="child"&&(f=s.filter(y=>{var b,K;return!((K=(b=P.value.get(y))==null?void 0:b.children)!=null&&K.length)})),f}function me(s){return s.map(v=>{var f;return((f=P.value.get(v))==null?void 0:f.treeNodeData)||void 0}).filter(Boolean)}function Ie(s){const{targetKey:v,targetChecked:f,newCheckedKeys:y,newIndeterminateKeys:b,event:K}=s,Se=v?P.value.get(v):void 0,Ke=be(y);t("update:checkedKeys",Ke),t("update:halfCheckedKeys",b),t("check",Ke,{checked:f,node:Se==null?void 0:Se.treeNodeData,checkedNodes:me(Ke),halfCheckedKeys:b,halfCheckedNodes:me(b),e:K})}function C(s){const{targetKey:v,targetSelected:f,newSelectedKeys:y,event:b}=s,K=v?P.value.get(v):void 0;t("update:selectedKeys",y),t("select",y,{selected:f,node:K==null?void 0:K.treeNodeData,selectedNodes:me(y),e:b})}function L(s){const{targetKey:v,targetExpanded:f,newExpandedKeys:y,event:b}=s,K=v?P.value.get(v):void 0;t("expand",y,{expanded:f,node:K==null?void 0:K.treeNodeData,expandedNodes:me(y),e:b}),t("update:expandedKeys",y)}function Z(s){const[v,f]=Ce(s,[],!0);Ie({newCheckedKeys:v,newIndeterminateKeys:f})}function Ne(s){let v=s;!u.value&&s.length>1&&(v=[s[0]]),ge(v),C({newSelectedKeys:v})}function Le(s){ce.value=[],De(s),L({newExpandedKeys:s})}function At(s,v,f){if(!s.length)return;let y=[...ye.value],b=[...se.value];s.forEach(K=>{const Se=P.value.get(K);Se&&([y,b]=Xe({node:Se,checked:v,checkedKeys:[...y],indeterminateKeys:[...b],checkStrictly:c.value}))}),Ce(y,b),Ie({targetKey:f,targetChecked:pe(f)?void 0:v,newCheckedKeys:y,newIndeterminateKeys:b})}function Mt(s,v,f){if(!s.length)return;let y;if(u.value){const b=new Set(J.value);s.forEach(K=>{v?b.add(K):b.delete(K)}),y=[...b]}else y=v?[s[0]]:[];ge(y),C({targetKey:f,targetSelected:pe(f)?void 0:v,newSelectedKeys:y})}function Rt(s,v,f){const y=new Set(de.value);s.forEach(K=>{v?y.add(K):y.delete(K),ot(K)});const b=[...y];De(b),L({targetKey:f,targetExpanded:pe(f)?void 0:v,newExpandedKeys:b})}function nt(s,v,f){const y=P.value.get(v);if(!y)return;const[b,K]=Xe({node:y,checked:s,checkedKeys:ye.value,indeterminateKeys:se.value,checkStrictly:c.value});Ce(b,K),Ie({targetKey:v,targetChecked:s,newCheckedKeys:b,newIndeterminateKeys:K,event:f})}function zt(s,v){if(!P.value.get(s))return;let y,b;if(u.value){const K=new Set(J.value);b=!K.has(s),b?K.add(s):K.delete(s),y=[...K]}else b=!0,y=[s];ge(y),C({targetKey:s,targetSelected:b,newSelectedKeys:y,event:v})}function lt(s,v,f){if(ce.value.includes(v)||!P.value.get(v))return;const b=new Set(de.value);s?b.add(v):b.delete(v);const K=[...b];De(K),G.value&&ce.value.push(v),L({targetKey:v,targetExpanded:s,newExpandedKeys:K,event:f})}function ot(s){const v=ce.value.indexOf(s);ce.value.splice(v,1)}const Ht=m(()=>r!=null&&r.value?async s=>{if(!$e(r.value))return;const v=P.value.get(s);if(!v)return;const{treeNodeData:f}=v;ue.value=[...new Set([...ue.value,s])];try{await r.value(f),ue.value=ue.value.filter(y=>y!==s),lt(!0,s),ye.value.includes(s)&&nt(!0,s)}catch(y){ue.value=ue.value.filter(b=>b!==s),console.error("[tree]load data error: ",y)}}:void 0),rt=Q({treeProps:e,switcherIcon:ae,loadingIcon:p,dragIcon:k,nodeIcon:R,nodeTitle:ne,nodeExtra:je,treeData:Ae,flattenTreeData:Ee,key2TreeNode:P,checkedKeys:ye,indeterminateKeys:se,selectedKeys:J,expandedKeys:de,loadingKeys:ue,currentExpandKeys:ce,onLoadMore:Ht,filterTreeNode:V,onCheck:nt,onSelect:zt,onExpand:lt,onExpandEnd:ot,allowDrop(s,v){const f=P.value.get(s);return f&&$e(Y.value)?!!Y.value({dropNode:f.treeNodeData,dropPosition:v}):!0},onDragStart(s,v){const f=P.value.get(s);ie.value=f,f&&t("dragStart",v,f.treeNodeData)},onDragEnd(s,v){const f=P.value.get(s);ie.value=void 0,f&&t("dragEnd",v,f.treeNodeData)},onDragOver(s,v){const f=P.value.get(s);f&&t("dragOver",v,f.treeNodeData)},onDragLeave(s,v){const f=P.value.get(s);f&&t("dragLeave",v,f.treeNodeData)},onDrop(s,v,f){const y=P.value.get(s);ie.value&&y&&!(y.key===ie.value.key||y.pathParentKeys.includes(ie.value.key||""))&&t("drop",{e:f,dragNode:ie.value.treeNodeData,dropNode:y.treeNodeData,dropPosition:v})}});return va(Tt,rt),{classNames:W,visibleTreeNodeList:Re,treeContext:rt,virtualListRef:O(),computedSelectedKeys:J,computedExpandedKeys:de,computedCheckedKeys:ye,computedIndeterminateKeys:se,getPublicCheckedKeys:be,getNodes:me,internalCheckNodes:At,internalSetCheckedKeys:Z,internalSelectNodes:Mt,internalSetSelectedKeys:Ne,internalExpandNodes:Rt,internalSetExpandedKeys:Le}},methods:{toggleCheck(e,t){const{key2TreeNode:a,onCheck:n,checkedKeys:l}=this.treeContext,u=!l.includes(e),r=a.get(e);r&&ke(r)&&n(u,e,t)},scrollIntoView(e){this.virtualListRef&&this.virtualListRef.scrollTo(e)},getSelectedNodes(){return this.getNodes(this.computedSelectedKeys)},getCheckedNodes(e={}){const{checkedStrategy:t,includeHalfChecked:a}=e,n=this.getPublicCheckedKeys(this.computedCheckedKeys,t);return[...this.getNodes(n),...a?this.getHalfCheckedNodes():[]]},getHalfCheckedNodes(){return this.getNodes(this.computedIndeterminateKeys)},getExpandedNodes(){return this.getNodes(this.computedExpandedKeys)},checkAll(e=!0){const{key2TreeNode:t}=this.treeContext,a=e?[...t.keys()].filter(n=>{const l=t.get(n);return l&&ke(l)}):[];this.internalSetCheckedKeys(a)},checkNode(e,t=!0,a=!1){const{checkStrictly:n,treeContext:l}=this,{key2TreeNode:u}=l,r=Oe(e),c=(r?e:[e]).filter(o=>{const i=u.get(o);return i&&ke(i)&&(n||!a||Ca(i))});this.internalCheckNodes(c,t,r?void 0:e)},selectAll(e=!0){const{key2TreeNode:t}=this.treeContext,a=e?[...t.keys()].filter(n=>{const l=t.get(n);return l&&Ye(l)}):[];this.internalSetSelectedKeys(a)},selectNode(e,t=!0){const{key2TreeNode:a}=this.treeContext,n=Oe(e),l=(n?e:[e]).filter(u=>{const r=a.get(u);return r&&Ye(r)});this.internalSelectNodes(l,t,n?void 0:e)},expandAll(e=!0){const{key2TreeNode:t}=this.treeContext,a=e?[...t.keys()].filter(n=>{const l=t.get(n);return l&&it(l)}):[];this.internalSetExpandedKeys(a)},expandNode(e,t=!0){const{key2TreeNode:a}=this.treeContext,n=Oe(e),l=(n?e:[e]).filter(u=>{const r=a.get(u);return r&&it(r)});this.internalExpandNodes(l,t,n?void 0:e)}}});function Qa(e,t,a,n,l,u){const r=q("TreeNode"),c=q("VirtualList");return E(),X("div",{class:H(e.classNames)},[e.virtualListProps?(E(),F(c,_({key:0,ref:"virtualListRef"},e.virtualListProps,{data:e.visibleTreeNodeList}),{item:le(({item:o})=>[ee(r,_({key:`${e.searchValue}-${o.key}`},o.treeNodeProps),null,16)]),_:1},16,["data"])):(E(!0),X(Te,{key:1},Qe(e.visibleTreeNodeList,o=>(E(),F(r,_({key:o.key},o.treeNodeProps),null,16))),128))],2)}var ze=Ve(Za,[["render",Qa]]);const ht=Object.assign(ze,{install:(e,t)=>{$t(e,t);const a=Et(t);e.component(a+ze.name,ze)}});var en=Object.defineProperty,tn=Object.defineProperties,an=Object.getOwnPropertyDescriptors,gt=Object.getOwnPropertySymbols,nn=Object.prototype.hasOwnProperty,ln=Object.prototype.propertyIsEnumerable,bt=(e,t,a)=>t in e?en(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,on=(e,t)=>{for(var a in t||(t={}))nn.call(t,a)&&bt(e,a,t[a]);if(gt)for(var a of gt(t))ln.call(t,a)&&bt(e,a,t[a]);return e},rn=(e,t)=>tn(e,an(t));function sn(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!fa(e)}var un=ve({name:"TreeSelectPanel",components:{Tree:ht},props:{treeProps:{type:Object,default:()=>({})},selectedKeys:{type:Array},showCheckable:{type:Boolean},treeSlots:{type:Object,default:()=>({})},scrollbar:{type:[Boolean,Object],default:!0}},emits:["change"],setup(e,{emit:t}){const{showCheckable:a,selectedKeys:n,treeProps:l,scrollbar:u}=te(e),{displayScrollbar:r,scrollbarProps:c}=Zt(u),o=Be("tree-select"),i=O(),d=m(()=>rn(on({},l.value),{disableSelectActionOnly:!0,checkedKeys:a.value?n.value:[],selectedKeys:a.value?[]:n.value})),h=(g,D)=>{var $,T;a.value?(T=($=i.value)==null?void 0:$.toggleCheck)==null||T.call($,g[0],D):t("change",g)},S=g=>{t("change",g)},N=()=>ee(ht,_({ref:i},d.value,{onSelect:h,onCheck:S}),e.treeSlots);return()=>{if(r.value){let g;return ee(Qt,_({class:`${o}-tree-wrapper`},c.value),sn(g=N())?g:{default:()=>[g]})}return ee("div",{class:`${o}-tree-wrapper`},[N()])}}}),dn=Object.defineProperty,cn=Object.defineProperties,pn=Object.getOwnPropertyDescriptors,mt=Object.getOwnPropertySymbols,vn=Object.prototype.hasOwnProperty,fn=Object.prototype.propertyIsEnumerable,St=(e,t,a)=>t in e?dn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,kt=(e,t)=>{for(var a in t||(t={}))vn.call(t,a)&&St(e,a,t[a]);if(mt)for(var a of mt(t))fn.call(t,a)&&St(e,a,t[a]);return e},yn=(e,t)=>cn(e,pn(t));function tt(e){return Ze(e)}function Ft(e){return e!=null&&e!==""}function at(e){return tt(e)?e.value:e}function hn(e){return tt(e)?e.label:void 0}function Ct(e){const t=at(e);return Ft(t)}function Nt(e){return e.map(at).filter(Ft)}function gn(e){var t;const{defaultValue:a,modelValue:n,key2TreeNode:l,multiple:u,treeCheckable:r,fallbackOption:c,fieldNames:o}=te(e);function i(w){const V=(Oe(w)?w:[w]).filter(Ct);return u!=null&&u.value||r!=null&&r.value?V:V.slice(0,1)}function d(w,V){const A=[],Y=w?w.filter(Ct):[];if(Y.length){const z=new Map;V==null||V.forEach(I=>{z.set(I.value,I)}),Y.forEach(I=>{var oe,re,fe,G,M;const W=at(I),ae=z.get(W),p=l.value.get(W);let k=null;const R=((oe=o==null?void 0:o.value)==null?void 0:oe.title)||"title";if(!p){const ne=$e(c==null?void 0:c.value)?c==null?void 0:c.value(W):c==null?void 0:c.value;if(ne===!1)return;Ze(ne)&&(k=ne)}A.push(yn(kt(kt({},tt(I)?I:{}),ae||{}),{value:W,label:(M=(G=(fe=(re=hn(I))!=null?re:p==null?void 0:p.title)!=null?fe:ae==null?void 0:ae.label)!=null?G:k==null?void 0:k[R])!=null?M:W}))})}return A}const h=O(),S=O();Fe(()=>{var w;const V=(n==null?void 0:n.value)!==void 0,A=i((w=n==null?void 0:n.value)!=null?w:[]),Y=Nt(A);S.value=V?d(Y,d(A)):void 0,h.value=V?Y:void 0});const N=i((t=a==null?void 0:a.value)!=null?t:[]),g=Nt(N),D=d(g,d(N)),$=O(g||[]),T=O(D);ut($,()=>{T.value=d($.value,D)}),ut([h,S],([w,V])=>{$.value=w||[],T.value=V||[]});const j=m(()=>{var w;return(w=h.value)!=null?w:$.value}),U=m(()=>{var w;return(w=S.value)!=null?w:T.value});return{selectedKeys:j,selectedValue:U,setLocalSelectedKeys(w){$.value=w},localSelectedKeys:$,localSelectedValue:T}}function bn(e){const{searchValue:t,flattenTreeData:a,filterMethod:n,disableFilter:l,fieldNames:u}=te(e),r=m(()=>{var g;return((g=u.value)==null?void 0:g.key)||"key"}),c=(g,D)=>{const $=D[r.value];return!pe($)&&String($).indexOf(g)>-1},o=m(()=>(n==null?void 0:n.value)||c),i=O(),d=m(()=>!!t.value),h=m(()=>!(l!=null&&l.value)&&d.value&&i.value&&i.value.size===0),S=m(()=>l!=null&&l.value?void 0:g=>{var D,$;if(!d.value)return!0;const T=g[r.value];return($=(D=i.value)==null?void 0:D.has(T||""))!=null?$:!1}),N=ea((g,D)=>{const $=g.filter(j=>o.value(D,j.treeNodeData)),T=new Set;$.forEach(j=>{T.add(j.key),j.pathParentKeys.forEach(U=>{T.add(U)})}),i.value=T},100);return Fe(()=>{l!=null&&l.value?i.value=void 0:N(a.value,t.value)}),{isEmptyFilterResult:h,filterTreeNode:S}}function mn(e,t){const a=`${t}-slot-`;return Object.keys(e).reduce((l,u)=>{if(u.startsWith(a)){const r=u.slice(a.length);r&&(l[r]=e[u])}return l},{})}var Sn=Object.defineProperty,kn=Object.defineProperties,Cn=Object.getOwnPropertyDescriptors,Kt=Object.getOwnPropertySymbols,Nn=Object.prototype.hasOwnProperty,Kn=Object.prototype.propertyIsEnumerable,wt=(e,t,a)=>t in e?Sn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,_t=(e,t)=>{for(var a in t||(t={}))Nn.call(t,a)&&wt(e,a,t[a]);if(Kt)for(var a of Kt(t))Kn.call(t,a)&&wt(e,a,t[a]);return e},jt=(e,t)=>kn(e,Cn(t));const wn=ve({name:"TreeSelect",components:{Trigger:ta,SelectView:aa,Panel:un,Empty:na,Spin:la},inheritAttrs:!1,props:{disabled:{type:Boolean},loading:{type:Boolean},error:{type:Boolean},size:{type:String},border:{type:Boolean,default:!0},allowSearch:{type:[Boolean,Object],default:e=>!!e.multiple},allowClear:{type:Boolean},placeholder:{type:String},maxTagCount:{type:Number},multiple:{type:Boolean},defaultValue:{type:[String,Number,Array,Object]},modelValue:{type:[String,Number,Array,Object]},fieldNames:{type:Object},data:{type:Array,default:()=>[]},labelInValue:{type:Boolean},treeCheckable:{type:Boolean},treeCheckStrictly:{type:Boolean},treeCheckedStrategy:{type:String,default:"all"},treeProps:{type:Object},triggerProps:{type:Object},popupVisible:{type:Boolean,default:void 0},defaultPopupVisible:{type:Boolean},dropdownStyle:{type:Object},dropdownClassName:{type:[String,Array]},filterTreeNode:{type:Function},loadMore:{type:Function},disableFilter:{type:Boolean},popupContainer:{type:[String,Object]},fallbackOption:{type:[Boolean,Function],default:!0},selectable:{type:[Boolean,String,Function],default:!0},scrollbar:{type:[Boolean,Object],default:!0},showHeaderOnEmpty:{type:Boolean,default:!1},showFooterOnEmpty:{type:Boolean,default:!1},inputValue:{type:String},defaultInputValue:{type:String,default:""}},emits:{change:e=>!0,"update:modelValue":e=>!0,"update:inputValue":e=>!0,"popup-visible-change":e=>!0,"update:popupVisible":e=>!0,search:e=>!0,clear:()=>!0,inputValueChange:e=>!0},setup(e,{emit:t,slots:a}){var n,l,u;const{defaultValue:r,modelValue:c,multiple:o,popupVisible:i,defaultPopupVisible:d,treeCheckable:h,treeCheckStrictly:S,data:N,fieldNames:g,disabled:D,labelInValue:$,filterTreeNode:T,disableFilter:j,dropdownStyle:U,treeProps:w,fallbackOption:V,selectable:A,dropdownClassName:Y}=te(e),{mergedDisabled:z,eventHandlers:I}=oa({disabled:D}),oe=Be("tree-select"),re=Dt(ra,void 0),fe=(u=(l=re==null?void 0:(n=re.slots).empty)==null?void 0:l.call(n,{component:"tree-select"}))==null?void 0:u[0],G=m(()=>o.value||h.value),M=(C,L)=>{var Z;return A.value==="leaf"?L.isLeaf:$e(A.value)?A.value(C,L):(Z=A.value)!=null?Z:!1},W=m(()=>h.value?M:!1),ae=m(()=>Ze(e.allowSearch)&&!!e.allowSearch.retainInputValue),{flattenTreeData:p,key2TreeNode:k}=Lt(Q({treeData:N,fieldNames:g,selectable:M,checkable:W})),{selectedKeys:R,selectedValue:ne,setLocalSelectedKeys:je,localSelectedKeys:Ae,localSelectedValue:Ee}=gn(Q({defaultValue:r,modelValue:c,key2TreeNode:k,multiple:o,treeCheckable:h,treeCheckStrictly:S,fallbackOption:V,fieldNames:g}));function P(C){return h.value?ke(C):Ye(C)}const ye=m(()=>pe(ne.value)?[]:G.value&&!z.value?ne.value.map(C=>{const L=k.value.get(C.value);return jt(_t({},C),{closable:!L||P(L)})}):ne.value),se=C=>{je(C),ba(()=>{var L,Z;const Ne=($.value?Ee.value:Ae.value)||[],Le=G.value?Ne:Ne[0];t("update:modelValue",Le),t("change",Le),(Z=(L=I.value)==null?void 0:L.onChange)==null||Z.call(L)})},Ce=O(e.defaultInputValue),J=m(()=>{var C;return(C=e.inputValue)!=null?C:Ce.value}),ge=C=>{Ce.value=C,t("update:inputValue",C),t("inputValueChange",C)},ue=C=>{C!==J.value&&(de(!0),ge(C),e.allowSearch&&t("search",C))},[ie,Me]=xe(d.value,Q({value:i})),de=C=>{C!==ie.value&&(Me(C),t("popup-visible-change",C),t("update:popupVisible",C)),C||be.value&&be.value.blur&&be.value.blur()},{isEmptyFilterResult:De,filterTreeNode:ce}=bn(Q({searchValue:J,flattenTreeData:p,filterMethod:T,disableFilter:j,fieldNames:g})),Re=m(()=>!p.value.length||De.value),be=O(),me=m(()=>{var C;return[(U==null?void 0:U.value)||{},(C=w==null?void 0:w.value)!=null&&C.virtualListProps?{"max-height":"unset"}:{}]});return{refSelectView:be,prefixCls:oe,TreeSelectEmpty:fe,selectedValue:ne,selectedKeys:R,mergedDisabled:z,searchValue:J,panelVisible:ie,isEmpty:Re,computedFilterTreeNode:ce,isMultiple:G,selectViewValue:ye,computedDropdownStyle:me,onSearchValueChange:ue,onSelectChange(C){se(C),!ae.value&&J.value&&ge(""),G.value||de(!1)},onVisibleChange:de,onInnerClear(){se([]),t("clear")},pickSubCompSlots:mn,isSelectable:M,isCheckable:W,onBlur:()=>{!ae.value&&J.value&&ge("")},onItemRemove(C){if(z.value)return;const L=k.value.get(C);if(h.value&&L){if(P(L)){const[Z]=Xe({node:L,checked:!1,checkedKeys:R.value,indeterminateKeys:[],checkStrictly:S.value});se(Z)}}else{const Z=R.value.filter(Ne=>Ne!==C);se(Z)}}}}});function $n(e,t,a,n,l,u){const r=q("SelectView"),c=q("Spin"),o=q("Panel"),i=q("Trigger");return E(),F(i,_({class:`${e.prefixCls}-trigger`,"auto-fit-popup-min-width":"",trigger:"click",position:"bl","popup-offset":4,"animation-name":"slide-dynamic-origin","prevent-focus":!0},e.triggerProps,{disabled:e.mergedDisabled,"popup-visible":e.panelVisible,"popup-container":e.popupContainer,"click-to-close":!e.allowSearch,"auto-fit-transform-origin":"",onPopupVisibleChange:e.onVisibleChange}),{content:le(()=>[Pe("div",{class:H([`${e.prefixCls}-popup`,{[`${e.prefixCls}-has-header`]:!!e.$slots.header,[`${e.prefixCls}-has-footer`]:!!e.$slots.footer},e.dropdownClassName]),style:ya(e.computedDropdownStyle)},[e.$slots.header&&(!e.isEmpty||e.showHeaderOnEmpty)?(E(),X("div",{key:0,class:H(`${e.prefixCls}-header`)},[x(e.$slots,"header")],2)):B("v-if",!0),e.loading?x(e.$slots,"loader",{key:1},()=>[ee(c)]):e.isEmpty?x(e.$slots,"empty",{key:2},()=>[(E(),F(ha(e.TreeSelectEmpty?e.TreeSelectEmpty:"Empty")))]):(E(),F(o,{key:3,"selected-keys":e.selectedKeys,"show-checkable":e.treeCheckable,scrollbar:e.scrollbar,"tree-props":jt(_t({actionOnNodeClick:e.selectable==="leaf"?"expand":void 0,blockNode:!0},e.treeProps),{data:e.data,checkStrictly:e.treeCheckStrictly,checkedStrategy:e.treeCheckedStrategy,fieldNames:e.fieldNames,multiple:e.multiple,loadMore:e.loadMore,filterTreeNode:e.computedFilterTreeNode,size:e.size,checkable:e.isCheckable,selectable:e.isSelectable,searchValue:e.searchValue}),"tree-slots":e.pickSubCompSlots(e.$slots,"tree"),onChange:e.onSelectChange},null,8,["selected-keys","show-checkable","scrollbar","tree-props","tree-slots","onChange"])),e.$slots.footer&&(!e.isEmpty||e.showFooterOnEmpty)?(E(),X("div",{key:4,class:H(`${e.prefixCls}-footer`)},[x(e.$slots,"footer")],2)):B("v-if",!0)],6)]),default:le(()=>[x(e.$slots,"trigger",{},()=>[ee(r,_({ref:"refSelectView","model-value":e.selectViewValue,"input-value":e.searchValue,"allow-search":!!e.allowSearch,"allow-clear":e.allowClear,loading:e.loading,size:e.size,"max-tag-count":e.maxTagCount,disabled:e.mergedDisabled,opened:e.panelVisible,error:e.error,bordered:e.border,placeholder:e.placeholder,multiple:e.isMultiple},e.$attrs,{onInputValueChange:e.onSearchValueChange,onClear:e.onInnerClear,onRemove:e.onItemRemove,onBlur:e.onBlur}),Pt({_:2},[e.$slots.prefix?{name:"prefix",fn:le(()=>[x(e.$slots,"prefix")])}:void 0,e.$slots.label?{name:"label",fn:le(d=>[x(e.$slots,"label",Ue(ga(d)))])}:void 0]),1040,["model-value","input-value","allow-search","allow-clear","loading","size","max-tag-count","disabled","opened","error","bordered","placeholder","multiple","onInputValueChange","onClear","onRemove","onBlur"])])]),_:3},16,["class","disabled","popup-visible","popup-container","click-to-close","onPopupVisibleChange"])}var He=Ve(wn,[["render",$n]]);const En=Object.assign(He,{install:(e,t)=>{$t(e,t);const a=Et(t);e.component(a+He.name,He)}}),Bn=ve({name:"Select",__name:"index",props:{modelValue:{default:""}},emits:["update:modelValue"],setup(e,{emit:t}){const a=e,n=m({get:()=>a.modelValue,set:l=>{t("update:modelValue",l)}});return(l,u)=>{const r=En;return E(),F(sa,null,{default:le(()=>[ee(r,_({modelValue:n.value,"onUpdate:modelValue":u[0]||(u[0]=c=>n.value=c)},l.$attrs),null,16,["modelValue"])]),_:1})}}});export{Bn as default};
