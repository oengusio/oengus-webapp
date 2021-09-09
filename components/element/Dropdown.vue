<template>
  <div :class="dropdownActive">
    <!-- Trigger -->
    <a v-if="isNavbar" class="navbar-link" @click="toggleActive">
      <slot name="trigger" />
    </a>
    <div v-else class="dropdown-trigger">
      <button class="button is-primary" @click="toggleActive">
        <div>
          <slot name="trigger" />
        </div>
        <FontAwesomeIcon :icon="[ 'fas', 'angle-down' ]" class="icon is-small" />
      </button>
    </div>
    <!-- Options -->
    <div v-if="isNavbar" class="navbar-dropdown" :class="{ 'is-right': isRight }">
      <slot name="options" />
    </div>
    <div v-else class="dropdown-menu">
      <div class="dropdown-content">
        <slot name="options" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    /** 'DROPDOWN' or 'NAVBAR' indicating type, not case sensitive, optional defaults to 'DROPDOWN' */
    type: {
      type: String,
      default: 'DROPDOWN',
    },
    isRight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      isNavbar: /^navbar$/i.test(this.type),
      clickOutsideStatic: undefined as (() => void) | undefined,
    };
  },
  computed: {
    dropdownActive(): Array<string> {
      return [
        this.isNavbar ? 'navbar-item has-dropdown' : 'dropdown',
        this.isActive ? 'is-active' : '',
        this.isRight ? 'is-right' : '',
      ];
    },
  },
  mounted(): void {
    this.clickOutsideStatic = this.clickOutside.bind(this);
  },
  destroyed(): void {
    this.clickOutside();
  },
  methods: {
    toggleActive(): void {
      this.isActive = !this.isActive;
      if (this.isActive) {
        setTimeout(() => document.addEventListener('click', this.clickOutsideStatic!), 0);
      } else {
        this.clickOutside();
      }
    },
    clickOutside(): void {
      this.isActive = false;
      document.removeEventListener('click', this.clickOutsideStatic!);
    },
  },
});
</script>

<style lang="scss" scoped>
  // Some SASS variables to help make selecting the navbar and generic dropdown elements together easier
  $dropdowns: '.has-dropdown, .dropdown';
  $dropdown-menus: '.navbar-dropdown, .dropdown-menu';

  #{$dropdowns} {
    #{$dropdown-menus} {
      display: none;
    }

    &.is-active {
      #{$dropdown-menus} {
        display: block;
      }
    }
  }
</style>
