<template>
  <GridLayout rows="auto, auto">
    <VxpLabel class="message" :text="msg" row="0" horizontalAlignment="center"/>
    <!-- copy-webpack-plugin copies asset from src/assets to project output/build directory /assets -->
    <VxpImage src="~/assets/icon.png" row="1" class="x-image" width="50" stretch="aspectFit"/>
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
<%_ if (rootOptions.cssPreprocessor) { _%>
<%_   if (rootOptions.cssPreprocessor == 'sass' || rootOptions.cssPreprocessor == 'scss'  || rootOptions.cssPreprocessor == 'dart-sass' ) { _%>
<%#   -------------------- IS Using sass, scss OR dart-sass -------------------- -%>
<style scoped lang="scss">
.message {
  color: #42b983;
  margin-top: 80px;
}

.x-image {
  margin-top: 80px;
}
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'stylus') { _%>
<%#   -------------------- IS Using stylus -------------------- -%>
<style scoped lang="stylus">
  .message
    color #42b983
    margin-top: 80px

  .x-image
    margin-top 80px
</style>
<%_   } else if (rootOptions.cssPreprocessor == 'less') { _%>
<%#   -------------------- IS Using Less -------------------- -%>
<style scoped lang="less">
.message {
  color: #42b983;
  margin-top: 80px;
}

.x-image {
  margin-top: 80px;
}
</style>
<%_   } _%>
<%_ } else { _%>
<%# -------------------- IS Using standard CSS -------------------- -%>
<style scoped>
.message {
  color: #42b983;
  margin-top: 80px;
}

.x-image {
  margin-top: 80px;
}
</style>
<%_ } _%>
