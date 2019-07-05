import GridLayout from "vuexp/src/layouts/GridLayout";
import ActionBar from "vuexp/src/core/components/ActionBar/ActionBar";
import VxpImage from "vuexp/src/components/VxpImage";
import Label from "vuexp/src/core/components/Label/Label";
import Button from "vuexp/src/core/components/Button/Button";
import Page from "vuexp/src/core/components/Page/Page";

export default function registerComponents(Vue) {
  Vue.component("GridLayout", GridLayout);
  Vue.component("ActionBar", ActionBar);
  Vue.component("Button", Button);
  Vue.component("VxpImage", VxpImage);
  Vue.component("Label", Label);
  Vue.component("Page", Page);
}
