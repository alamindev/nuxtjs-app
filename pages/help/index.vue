<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Help</span>
        <h3 class="page-title">Frequently Asked Questions</h3>
      </d-col>
    </d-row>

    <div style="max-width: 1100px">
      <!-- ACCORDION 1 -->
      <d-card class="mb-1 card-accordion">
        <div v-d-toggle.accordion1 class="px-3 py-3" role="tab" style="display:flex">
          <div
            block-level
            theme
            href="#"
            style="color:#0b2031;margin-left:10px;flex-grow:1;font-weight:400;font-size:16px"
          >1. A quelle fréquence faites-vous les virements ?</div>
          <svg class="arrow" viewBox="0 0 24 24" style>
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
          </svg>
          <span></span>
        </div>
        <d-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
          <d-card-body>
            <p
              class="card-text"
            >Nullam augue tortor, viverra id gravida fermentum, posuere a libero. Curabitur at arcu tortor. Donec cursus blandit leo consequat convallis.</p>
          </d-card-body>
        </d-collapse>
      </d-card>
      <!-- ACCORDION 2 -->
      <d-card class="mb-1 card-accordion">
        <div v-d-toggle.accordion2 class="px-3 py-3" role="tab" style="display:flex">
          <div
            block-level
            theme
            href="#"
            style="color:#0b2031;margin-left:10px;flex-grow:1;font-weight:400;font-size:16px"
          >2. J'ai changé mon menu mais ne je ne vois pas les changements.</div>
          <svg class="arrow" viewBox="0 0 24 24" style>
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
          </svg>
        </div>
        <d-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <d-card-body>
            <p
              class="card-text"
            >Nullam augue tortor, viverra id gravida fermentum, posuere a libero. Curabitur at arcu tortor. Donec cursus blandit leo consequat convallis.</p>
          </d-card-body>
        </d-collapse>
      </d-card>
    </div>
  </d-container>
</template>

<script type="text/javascript">

</script>

<style scoped>
/*! CSS Used from: Embedded */
/*! CSS Used from: Embedded */
.arrow {
  fill: #1a73e8;
  height: 1.25rem;
  margin-top: 5px;
}
.accordion-homepage .parent h2 .up {
  display: none;
}

.card-accordion:hover {
  cursor: pointer;
}
</style>