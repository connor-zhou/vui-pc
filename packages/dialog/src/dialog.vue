<template>
  <div>
    <transition
      name="dialog-fade"
    >
      <div v-show="visible" class="vui-dialog-back-fixed">
        <div class="vui-dialog__wrapper"
             style="z-index: 2001;"
             @click.self="handleWrapperClick">
          <div class="vui-dialog-parent">
            <div
              style="z-index: 2001;"
              role="dialog"
              aria-modal="true"
              :aria-label="title || 'dialog'"
              class="vui-dialog"
              :class="[{ 'is-fullscreen': fullscreen, 'vui-dialog--center': center }, customClass]"
              ref="dialog"
              :style="style">
              <div class="vui-dialog__header">
                <slot name="title">
                  <span class="vui-dialog__title">{{ title }}</span>
                </slot>
                <div
                  class="vui-dialog__headerbtn vui-dialog-close"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleClose">
                </div>
              </div>
              <div class="vui-dialog__body">
                <slot></slot>
              </div>
              <div class="vui-dialog__footer" v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="vui-modal" v-show="visible" style="z-index: 2000;" ></div>
  </div>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';
  import {checkNumber} from '../../../src/funs/check-fun';

  export default {
    name: 'VuiDialog',
    props: {
      hideBg: {
        type: Boolean,
        default: false
      },
      visible: {},
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: ''
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },
      time: Number
    },
    mixins: [Emitter],
    data: function() {
      return {
        closed: false,
        showTime: ''
      };
    },
    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
          this.setTimeClose();
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
        }
        if (!val) this.broadcast('VuiUpload', 'clearData', true);
      },
      time() {
        this.setTimeClose();
      }

    },
    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          style.marginTop = this.top;
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        if (this.hideBg) {
          this.handleClose();
        }
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
          clearTimeout(this.showTime);
        }
      },
      updatePopper() {
        this.broadcast('VuiDropdown', 'updatePopper');
        this.broadcast('VuiDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      },
      setTimeClose() {
        if (checkNumber(this.time) && this.time >= 0) {
          let that = this;
          this.showTime = setTimeout(function() {
            that.hide();
          }, this.time);
        }
      }
    },

    mounted() {
      if (this.visible) {
        // this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };

</script>



