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
  @import '~vuexp/src/assets/styles/helpers'; 

  .logo {
    height: unit(100, 40);
    margin: auto;
    margin-top: unit(40);
  }
</style> 
