<template>
  <Page>
    <ActionBar :title="navbarTitle"/>
    <GridLayout rows="auto, auto">
      <VxpLabel text="This is an about page" :textWrap="true" horizontalAlignment="center" verticalAlignment="center" row="0" />
      <VxpButton text="Go Home" @tap="goToHomePage" row="1" />
    </GridLayout>
  </Page>
</template>
<%_ if (!usingTS) { _%>
<script>
export default {
  data() {
    return {
      navbarTitle: `About.vue`
    };
  },
  methods: {
    goToHomePage(){
      this.$router.push("/");
    }
  }
};
</script>
<%_ } else { _%>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'about'
})
export default class About extends Vue {
  private navbarTitle: string = `About.vue`;

  public goToHomePage() {
    this.$router.push('/');
  }
}
</script>
<%_ } _%>
<%_ if (!usingTS) { _%>
<%# -------------------- Is Not Using TypeScript  -------------------- -%>
<%# -------------------- Remove this line and Uncomment the next to use script tag - Prettier formatting bug removes all script tags if these are left in  -------------------- -%>
<%# -------------------- <script>
</script>  -------------------- -%>
<%_ } else { _%>
<%# -------------------- Is Using TypeScript  -------------------- -%>
<%# -------------------- Remove this line and Uncomment the next to use script tag - Prettier formatting bug removes all script tags if these are left in  -------------------- -%>
<%# -------------------- <script lang="ts">
</script>  -------------------- -%>
<%_ } _%>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<%_ if (rootOptions.cssPreprocessor) { _%>
<%_   if (rootOptions.cssPreprocessor == 'sass' || rootOptions.cssPreprocessor == 'scss'  || rootOptions.cssPreprocessor == 'dart-sass' ) { _%>
<%#   -------------------- IS Using sass, scss OR dart-sass -------------------- -%>
<style scoped lang="scss">
@import '~styles/style-two';
@import '~styles/style-one';
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'stylus') { _%>
<%#   -------------------- IS Using stylus -------------------- -%>
<style scoped lang="stylus">
  @import '~styles/style-two';
  @import '~styles/style-one';
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'less') { _%>
<%#   -------------------- IS Using Less -------------------- -%>
<style scoped lang="less">
@import '~styles/style-two';
@import '~styles/style-one';
</style>
<%_   } _%>
<%_ } else { _%>
<%# -------------------- IS Using standard CSS -------------------- -%>
<style scoped>
@import '~styles/style-two';
@import '~styles/style-one';
</style>
<%_ } _%>
