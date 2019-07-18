<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <VxpTextField
          v-model="textFieldInput"
          hint="This is placeholder"
          @returnPress="textFieldreturnPress"
          @textChange="textFieldtextChange"
        />

        <VxpLabel text="Styled VxpTextField:" />

        <VxpTextField
          v-model="textFieldInput2"
          hint="This is placeholder"
          @returnPress="textFieldreturnPress"
          @textChange="textFieldtextChange"
          class="x-textfield"
        />

        <VxpTextField
          v-model="password"
          hint="Password"
          @returnPress="textFieldreturnPress"
          @textChange="textFieldtextChange"
          :secure="true"
          class="x-textfield"
        />
      </StackLayout>
    </SideLayout>
  </Page>
</template>

<script>
export default {
  name: "DemoVxpTextField",
  data() {
    return {
      textFieldInput: "Some Text",
      textFieldInput2: "",
      password: "123456"
    };
  },
  methods: {
    textFieldreturnPress() {
      console.log("textFieldreturnPress");
    },
    textFieldtextChange() {
      console.log("textFieldtextChange");
    },
    showDrawerPanel() {
      this.$refs.sideLayout.showDrawerPanel();
    }
  }
};
</script>

<style lang="scss">
@import "~vuexp/src/assets/styles/helpers";
// TODO vuexp class naming bug, should be fix
.x-textfield {
  margin: unit(10) unit(0);
  border-width: unit(1);
  border-style: solid;
  border-color: #999999;
  padding: unit(8) unit(4);
}
.x-textfield .vxp-textfield {
  font-size: unit(15);
  @if $PLATFORM == "web" {
    border: none;
  }
}
</style>
