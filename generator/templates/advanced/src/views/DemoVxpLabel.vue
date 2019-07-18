<template>
  <Page>
    <CustomActionBar @itemTap="showDrawerPanel" />
    <SideLayout ref="sideLayout">
      <StackLayout>
        <VxpLabel text="This is VxpLabel Demo" />
      </StackLayout>
    </SideLayout>
  </Page>
</template>
<script>
import SideLayout from "@/components/SideLayout";
import CustomActionBar from "@/components/CustomActionBar";

export default {
  name: "DemoVxpLabel",
  components: { CustomActionBar, SideLayout },
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
