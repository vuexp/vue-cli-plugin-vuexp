<template>
  <Page>
    <ActionBar :title="navbarTitle"/>
    <GridLayout rows="auto, auto, auto, auto">
      <!-- copy-webpack-plugin copies asset from src/assets to project output/build directory /assets -->
      <VxpButton text="About" @tap="goToAboutPage" row="0"/>

      <VxpImage src="~/assets/logo.png" row="1" class="logo" stretch="aspectFit"/>
      <HelloWorld :msg="msg" row="2"/>
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
    }
  }
};
</script>
<%_ } else { _%>
<%# -------------------- Is Using TypeScript  -------------------- -%>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from 'components/HelloWorld';

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
<style scoped lang="scss"> 
  .logo {
    width: 30%;
    margin: auto;
    margin-top: 4em;
  }
</style> 
