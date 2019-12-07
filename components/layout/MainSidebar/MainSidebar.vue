<template>
  <aside
    :class="['main-sidebar', 'col-12', 'col-md-3', 'col-lg-2', 'px-0', sidebarVisible ? 'open' : '']"
  >
    <div class="main-navbar">
      <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap p-0">
        <!-- border-bottom -->
        <a class="navbar-brand w-100 mr-0" href style="line-height: 25px;">
          <div class="d-table m-auto">
            <img
              id="main-logo"
              class="d-inline-block align-top mr-1"
              style="max-width: 25px;"
              src="@/assets/images/shards-dashboards-logo.svg"
              alt="Shards Dashboard"
            />
            <span v-if="!hideLogoText" class="d-none d-md-inline ml-1" style="font-size:25px;">Prems</span>
          </div>
        </a>
        <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none" @click="handleToggleSidebar()">
          <i class="material-icons">&#xE5C4;</i>
        </a>
      </nav>
    </div>

    <!-- Dashboard Pages -->
    <div
      class="nav-wrapper"
      style="margin-top:30px;  display: flex;
        flex-direction: column;"
    >
      <h6 class="main-sidebar__nav-title">Dashboard</h6>
      <d-nav class="flex-column">
        <li v-for="(item, navItemIdx) in items" :key="navItemIdx" class="nav-item dropdown">
          <nuxt-link
            :class="['nav-link', item.items && item.items.length ? 'dropdown-toggle' : '']"
            :to="localePath(item.to)"
            v-d-toggle="`snc-${navItemIdx}`"
          >
            <div class="item-icon-wrapper" v-if="item.htmlBefore" v-html="item.htmlBefore" />
            <span v-if="item.title" style="font-size:16px">{{ item.title }}</span>
            <div class="item-icon-wrapper" v-if="item.htmlAfter" v-html="item.htmlAfter" />
          </nuxt-link>
        </li>
      </d-nav>

      <p style="flex-grow:1"></p>
      <div style="width:100px;margin:0 auto;margin-bottom:50px">
        <nuxt-link to="help">
          <d-button outline>
            <span>HELP</span>
            <i class="material-icons">help_outline</i>
          </d-button>
        </nuxt-link>

        <!-- LANGUAGE SWITCHER -->

        <!-- TEMPORARY -->

        <ul class="nav-item dropdown">
          <d-button outline v-d-toggle.lang-switcher>
            <span class="d-none d-md-inline-block">{{currentLocale}}</span>
          </d-button>

          <d-collapse id="lang-switcher" class>
            <d-dropdown-item
              v-for="locale in availableLocales"
              :key="locale.code"
              v-d-toggle.lang-switcher
            >
              <nuxt-link :to="switchLocalePath(locale.code)">{{locale.name}}</nuxt-link>
            </d-dropdown-item>
          </d-collapse>
        </ul>

        <!-- TEMPORARY -->
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'main-sidebar',
  props: {
    /**
     * Whether to hide the logo text, or not.
     */
    hideLogoText: {
      type: Boolean,
      default: false
    },
    /**
     * The menu items.
     */
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    sidebarVisible() {
      return this.$store.state.sidebarVisible
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    handleToggleSidebar() {
      // this.sidebarVisible = !this.sidebarVisible
      this.$store.commit('SIDEBAR_TOGGLE')
    }
  }
}
</script>

<style lang="scss">
.main-sidebar {
  .item-icon-wrapper {
    display: inline-block;
  }
  .dropdown-menu {
    display: block;
  }
}
</style>
