<template>
  <div :class="['main-navbar', 'bg-white', stickyTop ? 'sticky-top' : '']">
    <d-navbar type="light" class="align-items-stretch flex-md-nowrap p-0">      
      <navbar-nav />
      <navbar-toggle />
    </d-navbar>
  </div>
</template>

<script>
import NavbarNav from './NavbarNav.vue';
import NavbarToggle from './NavbarToggle.vue';

export default {
  components: {
    NavbarNav,
    NavbarToggle,
  },
  props: {
    /**
       * Whether the main navbar should be sticky, or not.
       */
    stickyTop: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
.main-navbar {
  .dropdown-menu {
    display: block;
  }
}
</style>
