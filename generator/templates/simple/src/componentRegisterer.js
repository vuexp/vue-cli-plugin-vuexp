import Page from "vuexp/src/core/components/Page/Page";
import GridLayout from "vuexp/src/layouts/GridLayout";
import ActionBar from "vuexp/src/core/components/ActionBar/ActionBar";
import VxpImage from "vuexp/src/components/VxpImage";
import VxpLabel from "vuexp/src/components/VxpLabel";
import VxpButton from "vuexp/src/components/VxpButton";

export default function registerComponents(Vue) {
  Vue.component("GridLayout", GridLayout);
  Vue.component("ActionBar", ActionBar);
  Vue.component("VxpButton", VxpButton);
  Vue.component("VxpImage", VxpImage);
  Vue.component("VxpLabel", VxpLabel);
  Vue.component("Page", Page);
}
