<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <VxpImage src="~/assets/icon.png" />
      </StackLayout>
    </SideLayout>
  </Page>
</template>
<script>
export default {
  name: "DemoVxpImage",
  props: {},
  data() {
    return {};
  },
  methods: {
    showDrawerPanel() {
      this.$refs.sideLayout.showDrawerPanel();
    }
  }
};
</script>
<style scoped lang="scss"></style>
