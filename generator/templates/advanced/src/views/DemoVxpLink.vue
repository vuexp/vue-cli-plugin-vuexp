<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <VxpLink text="Click me.." @tap="onTap"></VxpLink>
        <VxpLink text="External Link" externalUrl="https://vuexp.com"></VxpLink>
        <VxpLink
          text="Click me.. (Styled)"
          @tap="onTap"
          class="x-link"
        ></VxpLink>
      </StackLayout>
    </SideLayout>
  </Page>
</template>

<script>
export default {
  name: "DemoVxpLink",
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
.x-link {
  color: dodgerblue;
}
</style>
