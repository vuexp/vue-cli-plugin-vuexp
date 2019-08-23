---
extend: '@vue/cli-service/generator/router/template/src/router.js'
replace:
  - !!js/regexp /import Vue from 'vue'/
  - !!js/regexp /import Router from 'vue-router'/
  - !!js/regexp /Vue.use\(Router\)/
  - !!js/regexp /export default new Router\(\{/
  - !!js/regexp /import Home from '\./views/Home.vue'/
  - !!js/regexp /\(\) => import(.*)\.\/views\/About\.vue'\)/
  - !!js/regexp /(\{[^{}]+)(component:\s?Home)([^{}]+\})/
  - !!js/regexp /(\s+)\/\/ (.*)/
  - !!js/regexp /(\s+)\/\/ (.*)/
  - !!js/regexp /\}\)/
---

<%# REPLACE %>
import Vue from './vue';
<%# END_REPLACE %>

<%# REPLACE %>
import Router from 'vuexp-router';
<%# END_REPLACE %>

<%# REPLACE %>
Vue.use(Router);
<%# END_REPLACE %>

<%# REPLACE %>
export const options = {
<%# END_REPLACE %>

<%# REPLACE %>
import Home from '~/views/Home';
import About from '~/views/About';
import DemoVxpLabel from "~/views/DemoVxpLabel";
import DemoVxpButton from "~/views/DemoVxpButton";
import DemoVxpLink from "~/views/DemoVxpLink";
import DemoVxpCheckbox from "~/views/DemoVxpCheckbox";
import DemoVxpDropDown from "~/views/DemoVxpDropDown";
import DemoVxpImage from "~/views/DemoVxpImage";
import DemoVxpTextField from "~/views/DemoVxpTextField";
<%# END_REPLACE %>

<%# REPLACE %>
About,
<%# END_REPLACE %>

<%# REPLACE %>
{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/vxpbutton",
      name: "vxpbutton",
      component: DemoVxpButton
    },
    {
      path: "/vxplink",
      name: "vxplink",
      component: DemoVxpLink
    },
    {
      path: "/vxpcheckbox",
      name: "vxpcheckbox",
      component: DemoVxpCheckbox
    },
    {
      path: "/vxpdropdown",
      name: "vxpdropdown",
      component: DemoVxpDropDown
    },
    {
      path: "/vxpimage",
      name: "vxpimage",
      component: DemoVxpImage
    },
    {
      path: "/vxplabel",
      name: "vxplabel",
      component: DemoVxpLabel
    },
    {
      path: "/vxptextfield",
      name: "vxptextfield",
      component: DemoVxpTextField
    }
<%# END_REPLACE %>

<%# REPLACE %>
<%# END_REPLACE %>

<%# REPLACE %>
<%# END_REPLACE %>

<%# REPLACE %>
};
export default new Router(options);
<%# END_REPLACE %>
