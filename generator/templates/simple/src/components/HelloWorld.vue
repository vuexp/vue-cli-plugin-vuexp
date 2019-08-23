<template>
  <div>
    <div class="message">{{msg}}</div> 
  </div>
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
    display: block;
    margin: auto;
    margin-top: 4em;
    text-align: center;
  }
  img {
    height: unit(75);
    display: block;
    margin: auto;
    margin-top: 4em;
  }
</style> 
