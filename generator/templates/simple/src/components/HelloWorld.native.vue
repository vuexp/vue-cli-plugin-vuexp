<template>
  <GridLayout rows="auto, auto">
    <VxpLabel class="message" :text="msg" row="0" horizontalAlignment="center"/> 
  </GridLayout>
</template>
<%_ if (!usingTS) { _%>
<%# -------------------- Is Not Using TypeScript  -------------------- -%>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>
<%_ } else { _%>
<%# -------------------- Is Using TypeScript  -------------------- -%>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'HelloWorld'
})
export default class HelloWorld extends Vue {
  @Prop(String)
  private msg!: string;
}
</script>
<%_ } _%>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped lang="scss">
  @import "~vuexp/src/assets/styles/helpers";
  .message {
    color: #42b983;
  }

  image {
    margin-top: unit(20);
  }
</style> 
