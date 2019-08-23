<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <StackLayout orientation="horizontal" class="checkbox-row">
          <VxpCheckbox :checked="true" />
          <VxpLabel text="Breakfast" />
        </StackLayout>
        <StackLayout orientation="horizontal" class="checkbox-row">
          <VxpCheckbox :disabled="true" />
          <VxpLabel text="Lunch (Disabled & Unchecked)" />
        </StackLayout>
        <StackLayout orientation="horizontal" class="checkbox-row">
          <VxpCheckbox :checked="true" :disabled="true" />
          <VxpLabel text="Dinner (Disabled & Checked)" />
        </StackLayout>
      </StackLayout>
    </SideLayout>
  </Page>
</template>

<script>
export default {
  name: "DemoVxpCheckbox",
  methods: {
    showDrawerPanel() {
      this.$refs.sideLayout.showDrawerPanel();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~vuexp/src/assets/styles/helpers";

.vxp-checkbox {
  margin-right: unit(10);
}

.checkbox-row {
  margin: unit(10);
}
</style>
