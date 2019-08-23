<template>
  <router-view></router-view>
</template>
<%_ if (!usingTS) { _%>
<%# -------------------- IS NOT Using TypeScript -------------------- -%>
<script>
export default {
  data() {
    return {
      navbarTitle: `App.vue`
    };
  }
};
</script>
<%_ } else { _%>
<%# -------------------- IS Using TypeScript -------------------- -%>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'home'
})
export default class App extends Vue {
  private navbarTitle: string = `App.vue`;
}
</script>
<%_ } _%>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style lang="scss"> 
</style> 
