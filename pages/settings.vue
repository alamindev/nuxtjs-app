<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Settings</span>
        <h3 class="page-title">
          <p>{{ $t('homepage.subtitle') }}</p>
        </h3>
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row>
      <d-col lg="4">
        <upl-business-details />
      </d-col>
      <d-col lg="8">
        <upl-account-details />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import BusinessDetails from '@/components/settings/BusinessDetails.vue'
import AccountDetails from '@/components/settings/AccountDetails.vue'

export default {
  name: 'settings',
  components: {
    uplBusinessDetails: BusinessDetails,
    uplAccountDetails: AccountDetails
  }
}
</script>

