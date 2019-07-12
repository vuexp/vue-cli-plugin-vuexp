<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <VxpButton text="About2" @tap="goToAboutPage" row="0" />

      <VxpImage src="~/assets/logo.png" row="1" class="logo" />

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
@import '~styles/style-one';
@import '~styles/style-two';
 .sidedrawer-doc-container {
    height: 340px;

    &__drawer {
      background-color: #282b30;
      color: #ffffff;
      padding: 20px;
      width: 200px;
      height: 100%;

      &__title {
        text-align: center;
        font-weight: bold;
        color: #ebebeb;
      }

      &__VxpLabel {
        line-height: 36px;
        border-bottom: solid 1px red;
        height:30px;
      }
    }

    &__text {
      text-align: center;
      margin-bottom: 20px;
    }
  }

.logo {
  width: 30%;
  margin: auto;
  margin-top: 4em;
}
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'stylus') { _%>
<%#   -------------------- IS Using stylus -------------------- -%>
<style scoped lang="stylus">
@import '~styles/style-one';
@import '~styles/style-two';

.logo {
  width: 30%;
  margin: auto;
  margin-top: 4em;
}
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'less') { _%>
<%#   -------------------- IS Using Less -------------------- -%>
<style scoped lang="less">
@import '~styles/style-one';
@import '~styles/style-two';

.logo {
  width: 30%;
  margin: auto;
  margin-top: 4em;
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
  margin-top: 4em;
}
</style>
<%_ } _%>
