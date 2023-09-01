<template>
    <div>
        <rich-text :content="content"></rich-text>
    </div>
</template>
<script langt="ts" setup>
import { RichText } from "@easyfe/admin-component";
const content = ref(`
<h1 style="color: #ff0000;">欢迎来到我们的网站！</h1>
<p>我们是一家致力于提供高品质产品和优质服务的公司。</p>
<p>以下是我们的产品特点：</p>
<ul>
  <li>高性能：我们的产品经过精心设计，具有卓越的性能表现。</li>
  <li>创新设计：我们不断追求创新，为客户带来独特的产品体验。</li>
  <li>可靠性：我们的产品经过严格测试，确保稳定可靠。</li>
  <li>用户友好：我们注重用户体验，提供简洁易用的界面和操作方式。</li>
</ul>
<img src="https://s1.ax1x.com/2023/06/08/pCkKBGR.jpg" alt="产品展示" style="width: 400px; height: auto;">
<p>无论您是个人用户还是企业用户，我们都将竭诚为您提供最好的解决方案。</p>
<p>如果您有任何问题或需求，请随时联系我们，我们将尽快回复您。</p>
<p>感谢您的支持和信任！</p>
`);
</script>
