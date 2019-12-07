<template>
  <d-card class="card-small mb-4">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form>
              <d-form-row>
                <!-- First Name -->
                <d-col md="4" class="form-group">
                  <label>First Name</label>
                  <d-form-input disabled :value="firstname" />
                </d-col>

                <!-- Last Name -->
                <d-col md="4" class="form-group">
                  <label>Last Name</label>
                  <d-form-input disabled :value="lastname" />
                </d-col>

                <!-- Email -->
                <d-col md="4" class="form-group">
                  <label>Email</label>
                  <d-form-input disabled :value="email" />
                </d-col>
              </d-form-row>

              <!-- Business address -->
              <div class="form-group">
                <label>Business Adress</label>
                <d-form-input disabled :value="adress" />
              </div>

              <d-form-row>
                <!-- City -->
                <d-col md="6" class="form-group">
                  <label>City</label>
                  <d-form-input disabled :value="city" />
                </d-col>

                <!-- State -->
                <d-col md="4" class="form-group">
                  <label>State</label>
                  <d-form-input disabled :value="state" />
                </d-col>

                <!-- Zip Code -->
                <d-col md="2" class="form-group">
                  <label>Zip</label>
                  <d-form-input disabled :value="zip" />
                </d-col>
              </d-form-row>

              <d-button
                type="submit"
                class="btn"
                style="background-color: orangered"
              >DEACTIVATE ACCOUNT</d-button>
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </d-card>
</template>

<script>
export default {
  name: 'account-details',
  props: {
    /**
     * The component title.
     */
    title: {
      type: String,
      default: 'Account Details'
    }
  },
  data() {
    return {
      firstname: 'Azerty',
      lastname: 'Ytreza',
      email: 'azerty@test.com',
      adress: 'Avenue des Azerty 9',
      city: 'Azercity',
      state: 'Azerstate',
      zip: '2020'
    }
  }
}
</script>
