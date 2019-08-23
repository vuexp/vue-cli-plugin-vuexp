---
extend: '@vue/cli-service/generator/template/src/main.js'
replace:
  - !!js/regexp /import Vue from 'vue'/
  - !!js/regexp /import App from './App.vue'/
  - !!js/regexp /Vue.config.productionTip = false/
  - !!js/regexp /h => h\(App\),/
  - !!js/regexp /}\)\.\$mount\('#app'\)/
---

<%# REPLACE %>
import Vue from 'vue';
import registerComponents from './componentRegisterer';
import VxpPlugin from "vuexp/src/core/plugins/index";
import AttributeMixin from "vuexp/src/mixins/AttributeMixin";
import GestureMixin from "vuexp/src/core/mixins/GestureMixin";

Vue.use(VxpPlugin);
Vue.mixin(AttributeMixin);
Vue.mixin(GestureMixin);

//import "./styles/advanced.scss";
<%# END_REPLACE %>

<%# REPLACE %>
import App from '~/App';
<%# END_REPLACE %>

<%# REPLACE %>
Vue.config.productionTip = false;
registerComponents(Vue);
<%# END_REPLACE %>

<%# REPLACE %>
(h) => h(App),
<%# END_REPLACE %>

<%# REPLACE %>
}).$mount('#app');
<%# END_REPLACE %>
