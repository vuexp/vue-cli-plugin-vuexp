<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <VxpButton text="About2" @tap="goToAboutPage" row="0" />

      <VxpImage src="~/assets/logo.png" row="1" class="logo" stretch="aspectFit" />

      <HelloWorld :msg="msg" row="2" />
    </SideLayout>
  </Page>
</template>
<%_ if (!usingTS) { _%>
<%# -------------------- Is Not Using TypeScript  -------------------- -%>
<script>
import HelloWorld from 'components/HelloWorld';

const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      navbarTitle: `Home.vue`,
      msg: `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`
    };
  },
  methods: {
    goToAboutPage() {
      this.$router.push('/about');
    },
    showDrawerPanel(){
      this.$refs.sideLayout.showDrawerPanel();
    },
  }
};
</script>
<%_ } else { _%>
<%# -------------------- Is Using TypeScript  -------------------- -%>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from 'components/HelloWorld.vue';

const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

@Component({
  name: 'home',
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private navbarTitle: string = `Home.vue`;
  private msg: string = `Mode=${VUE_APP_MODE} and Platform=${VUE_APP_PLATFORM}`;

  public goToAboutPage() {
    this.$router.push('/about');
  }
}
</script>
<%_ } _%>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<%_ if (rootOptions.cssPreprocessor) { _%>
<%_   if (rootOptions.cssPreprocessor == 'sass' || rootOptions.cssPreprocessor == 'scss'  || rootOptions.cssPreprocessor == 'dart-sass' ) { _%>
<%#   -------------------- IS Using sass, scss OR dart-sass -------------------- -%>
<style scoped lang="scss">
@import '~vuexp/src/assets/styles/helpers';
@import '~styles/style-one';
@import '~styles/style-two';

.logo {
  height: unit(100, 40);
  margin: auto;
  margin-top: unit(40);
}
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'stylus') { _%>
<%#   -------------------- IS Using stylus -------------------- -%>
<style scoped lang="stylus">
@import '~styles/style-one';
@import '~styles/style-two';

.logo
  width: 30%
  margin: auto
  margin-top: 40px

</style>
<%_   } else if (rootOptions.cssPreprocessor == 'less') { _%>
<%#   -------------------- IS Using Less -------------------- -%>
<style scoped lang="less">
@import '~styles/style-one';
@import '~styles/style-two';

.logo {
  width: 30%;
  margin: auto;
  margin-top: 40px;
}
</style>
<%_   } _%>
<%_ } else { _%>
<%# -------------------- IS Using standard CSS -------------------- -%>
<style scoped>
@import '~styles/style-one';
@import '~styles/style-two';

.logo {
  width: 30%;
  margin: auto;
  margin-top: 40px;
}
</style>
<%_ } _%>
