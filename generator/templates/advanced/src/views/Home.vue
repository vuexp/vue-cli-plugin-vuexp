<template>
  <Page>
    <!-- <ActionBar :title="navbarTitle" /> -->

    <VxpSideDrawer ref="drawer" class="sidedrawer-doc-container">
      <FlexboxLayout
        flexDirection="column"
        slot="drawerContent"
        class="sidedrawer-doc-container__drawer"
      >
        <FlexboxLayout class="sidedrawer-doc-container__drawer__title">
          <VxpLabel text="Navigation Menu"></VxpLabel>
        </FlexboxLayout>
        <StackLayout>
          <VxpLabel text="Home" class="sidedrawer-doc-container__drawer__VxpLabel"></VxpLabel>
          <VxpLabel text="Social" class="sidedrawer-doc-container__drawer__VxpLabel"></VxpLabel>
          <VxpLabel text="Promotions" class="sidedrawer-doc-container__drawer__VxpLabel"></VxpLabel>
          <VxpLabel text="Starred" class="sidedrawer-doc-container__drawer__VxpLabel"></VxpLabel>
          <VxpLabel text="Drafts" class="sidedrawer-doc-container__drawer__VxpLabel"></VxpLabel>
        </StackLayout>
        <VxpButton @tap="closeDrawer" primary text="CLOSE DRAWER"></VxpButton>
      </FlexboxLayout>
      <StackLayout slot="mainContent">
        <VxpLabel :textWrap="true" class="sidedrawer-doc-container__text" text="Main Content Area" />
        <VxpButton @tap="showDrawer" primary text="SHOW DRAWER"></VxpButton>
      </StackLayout>
    </VxpSideDrawer>

    <GridLayout rows="auto, auto, auto, auto">
      <!-- copy-webpack-plugin copies asset from src/assets to project output/build directory /assets -->
      <VxpButton text="About2" @tap="goToAboutPage" row="0" />

      <VxpImage src="~/assets/logo.png" row="1" class="logo" stretch="aspectFit" />
      <VxpButton text="Toggle Drawer" row="2" @tap="showDrawer" />

      <HelloWorld :msg="msg" row="2" />
    </GridLayout>
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
    showDrawer(){
      this.$refs.drawer.showDrawer();
    },
    closeDrawer(){
      this.$refs.drawer.closeDrawer();
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
