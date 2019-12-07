<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img
          class="user-avatar rounded-circle mr-2"
          src="@/assets/images/avatars/4.jpg"
          alt="User Avatar"
        />
        <span class="d-none d-md-inline-block">Business Name</span>
      </a>

      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item v-d-toggle.user-actions style="display:flex">
          <nuxt-link block class="d-md-inline-block" to="settings" style="flex-grow:1">
            <i class="material-icons" to="settings">&#xE8B8;</i>
            My settings
          </nuxt-link>
        </d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item v-d-toggle.user-actions class="text-danger" v-on:click.native="logOut">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>


<style>
.nav-link:hover {
  cursor: pointer;
}
</style>
