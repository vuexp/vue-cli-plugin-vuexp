<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <VxpButton @tap="onTap" text="Native Button"></VxpButton>
        <VxpButton
          @tap="onTap"
          text="Custom Styled"
          class="x-button x-button--blue"
        ></VxpButton>
        <VxpButton
          @tap="onTap"
          text="Custom Styled"
          class="x-button x-button--red"
        ></VxpButton>
        <VxpButton
          @tap="onTap"
          text="Custom Styled"
          class="x-button x-button--blue x-button--flat"
        ></VxpButton>
      </StackLayout>
    </SideLayout>
  </Page>
</template>

<script>
export default {
  name: "DemoVxpButton",
  methods: {
    onTap() {
      alert("Tapped");
    },
    showDrawerPanel() {
      this.$refs.sideLayout.showDrawerPanel();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~vuexp/src/assets/styles/helpers";

.x-button {
  height: unit(40);
  width: unit(100%);
  margin: unit(10) unit(0);

  &--blue {
    background-color: dodgerblue;
    color: #ffffff;
  }

  &--red {
    background-color: darkred;
    color: #ffffff;
  }

  &--flat {
    border-radius: 0;
  }
}
</style>
