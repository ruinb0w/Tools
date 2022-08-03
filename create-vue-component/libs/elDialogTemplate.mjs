import { kebabize } from "./libs.mjs";

export function createElDialogTemplate(options) {
  const { component_name, file_name } = options;
  setJS(component_name, file_name);
  setHook(component_name, file_name);
  setVue(component_name, file_name);
  setScss(component_name, file_name);
}

function setJS(component_name, file_name) {
  const js_boilerplate = `import {computed} from "vue";
import {useMain} from "./hook";

export default{
  name: "${component_name}",
  components:{},
  props: {modelValue: Boolean},
  setup(props, {emit}){
    const main = useMain(props, emit);

    return {
      ...main
    }
  }
}`;

  $`echo  ${js_boilerplate} > ${file_name}.js`;
}

function setVue(component_name, file_name) {
  const vue_boilderplate = `<template>
  <el-dialog custom-class="${kebabize(component_name)}" v-model="show_dialog">
  </el-dialog>
</template>

<script src="./${component_name}.js"></script>
<style lang="scss" src="./${component_name}.scss" scoped></style>`;

  $`echo  ${vue_boilderplate} > ${file_name}.vue`;
}

function setScss(component_name, file_name) {
  const scss_boilerplate = `.${kebabize(component_name)}{}`;

  $`echo  ${scss_boilerplate} > ${file_name}.scss`;
}

function setHook(component_name) {
  const hook_boilerplate = `import {reactive} from "vue"

export function useMain(props, emit){
  const state = reactive({
    show_dialog : computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    })
  });

  return {state}
}
  `;

  $`echo  ${hook_boilerplate} > ${component_name}/hook.js`;
}
