<template>
  <div fluid class="main-content-container menu-editor">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Employee</h3>
      </d-col>
    </d-row>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
$break-small: 350px;

.menu-editor {
  max-width: 1300px;
  min-width: 250px;
  margin-left: 30px;
  margin-bottom: 100px;
  @media screen and (max-width: $break-small) {
    margin-left: 0px;
    padding: 15px;
  }
}
</style>



