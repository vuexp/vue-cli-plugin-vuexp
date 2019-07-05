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
<%_ if (rootOptions.cssPreprocessor) { _%>
<%_   if (rootOptions.cssPreprocessor == 'sass' || rootOptions.cssPreprocessor == 'scss'  || rootOptions.cssPreprocessor == 'dart-sass' ) { _%>
<%#   -------------------- IS Using sass, scss OR dart-sass -------------------- -%>
<style lang="scss">
@import '~styles/style-one';
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'stylus') { _%>
<%#   -------------------- IS Using stylus -------------------- -%>
<style lang="stylus">
  @import '~styles/style-one';
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'less') { _%>
<%#   -------------------- IS Using Less -------------------- -%>
<style lang="less">
@import '~styles/style-one';
</style>
<%_   } _%>
<%_ } else { _%>
<%# -------------------- IS Using standard CSS -------------------- -%>
<style>
@import '~styles/style-one';
</style>
<%_ } _%>
