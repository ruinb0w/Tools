import { kebabize } from "./libs.mjs";

export function createNormalTemplate(options) {
  const { component_name, file_name } = options;
  setJS(component_name, file_name);
  setHook(component_name, file_name);
  setVue(component_name, file_name);
  setScss(component_name, file_name);
}

function setJS(component_name, file_name) {
  const js_boilerplate = `import {useMain} from "./hook"

export default{
  name: "${component_name}",
  components:{},
  setup(){
    const main = useMain();

    return {...main}
  }
}`;

  $`echo  ${js_boilerplate} > ${file_name}.js`;
}

function setHook(component_name) {
  const hook_boilerplate = `import {reactive} from "vue"

export function useMain(){
    const state = reactive({});

    return {state}
  }
  `;

  $`echo  ${hook_boilerplate} > ${component_name}/hook.js`;
}

function setVue(component_name, file_name) {
  const vue_boilderplate = `<template>
  <div class="${kebabize(component_name)}"></div>
</template>

<script src="./${component_name}.js"></script>
<style lang="scss" src="./${component_name}.scss" scoped></style>`;

  $`echo  ${vue_boilderplate} > ${file_name}.vue`;
}

function setScss(component_name, file_name) {
  const scss_boilerplate = `.${kebabize(component_name)}{}`;

  $`echo  ${scss_boilerplate} > ${file_name}.scss`;
}
