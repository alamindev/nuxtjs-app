<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Error -->
    
    <div class="error">
      <div class="error__content">
        <!-- <h2>500</h2> -->
        <h3>Something went wrong!</h3>
        <p>There was a problem on our end. Please try again later.</p>
        <nuxt-link to="/overview">
          <d-button pill nuxt>&larr; Go Back</d-button>
        </nuxt-link>
      </div>
    </div>
  </d-container>
</template>
