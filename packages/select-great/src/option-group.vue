<template>
  <ul class="vui-select-group__wrap" v-show="visible">
    <li class="vui-select-group__title">{{ label }}</li>
    <li>
      <ul class="vui-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'vui-pc/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'VuiOptionGroup',

    componentName: 'VuiOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('VuiOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('VuiOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
