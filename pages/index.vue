<template>
  <div class="d-table auth-form mx-auto my-auto col-md-5 col-lg-3">
    <div class="card" style="margin-top:20vh">
      <div class="card-body">
        <!---->
        <!---->
        <img
          src="@/assets/images/shards-dashboards-logo.svg"
          alt="Shards Dashboards - Login Template"
          class="auth-form__logo d-table mx-auto my-auto mb-3"
        >
        <h5 class="auth-form__title text-center mb-4">Access Your Account</h5>
        <form class>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              id="exampleInputEmail1"
              type="email"
              placeholder="Enter email"
              class="form-control"
              v-model="formEmail"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              id="exampleInputPassword1"
              type="password"
              placeholder="Password"
              class="form-control"
              v-model="formPassword"
            >
          </div>
          <div class="form-group mb-3 d-table mx-auto">
            <label class="custom-control custom-checkbox">
              <input
                type="checkbox"
                autocomplete="off"
                id="dr-checkbox-abc4cec9-3bc6-40d9-9941-aafd99762668"
                true-value="orange"
                class="custom-control-input"
                value="orange"
              >
              <label
                for="dr-checkbox-abc4cec9-3bc6-40d9-9941-aafd99762668"
                aria-hidden="true"
                class="custom-control-label"
              ></label>
              <span class="custom-control-description">Remember me.</span>
            </label>
          </div>

          <nuxt-link
            type="submit"
            class="btn btn-pill btn-accent d-table mx-auto"
            v-on:click.native="emailLogin"
            to="/overview"
          >Access Account</nuxt-link>
        </form>
      </div>
      <div class="container border-top card-footer">
        <nuxt-link class="d-table mx-auto" to="reset-password">Forgot your password?</nuxt-link>
        <!-- <ul class="auth-form__social-icons d-table mx-auto">
                <li>
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                </li>
        </ul>-->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  layout: 'login',
  data() {
    return {
      formEmail: '',
      formPassword: '',
    }
  },
  methods: {
    emailLogin() {
      this.$store
        .dispatch('signInWithEmail', {
          email: this.formEmail,
          password: this.formPassword
        })
        .then(() => {
          // this.formEmail = ''
          // this.formPassword = ''
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>

