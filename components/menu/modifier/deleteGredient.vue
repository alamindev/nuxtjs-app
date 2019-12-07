<template>
  <div>
    <b-modal
      v-if="delete_id"
      id="delete-gredient"
      size="lg"
      ref="modal"
      hide-footer
      hide-header
    >
      <form ref="form" @submit.prevent="deleteIngredientData">
        <div class="row">
          <div class="col-lg-12">
            <div class="prems__delete">
              <h3>{{ $t('menu.delete_ingredient.title') }}</h3>
              <p>
                {{ $t('menu.delete_ingredient.heading_one') }}
                <b v-if="delete_data">{{ delete_data }}</b>
                {{ $t('menu.delete_ingredient.heading_two') }}
              </p>
            </div>
            <div class="prems_border_top pt-1 d-flex justify-content-end">
              <b-button
                class="prems_btn_cancel"
                variant="prems_btn_cancels"
                @click="$bvModal.hide('delete-gredient')"
                >{{ $t('menu.modal.cancel') }}</b-button
              >
              <b-button
                type="submit"
                class="prems_btn_success prems_btn_denger"
                variant=" prems_btn_success prems_btn_denger"
              >
                <span v-if="!success">{{ $t('menu.modal.delete') }}</span>
                <span v-if="success">{{ $t('menu.modal.delete') }}...</span>
              </b-button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'
import { ModelSelect } from 'vue-search-select'
export default {
  components: {
    ModelSelect
  },
  props: ['ingredients', 'parentingredients'],
  data() {
    return {
      success: false,
      delete_id: '',
      delete_data: {}
    }
  },
  methods: {
    /**
     * Remove
     * return @void
     */
    deleteIngredent: function(id, ingredients) {
      this.$bvModal.show('delete-gredient')
      this.delete_id = id
      this.delete_data = {}
      const gredient = ingredients.filter(i => i.id === id)
      this.delete_data = gredient[0].value
    },
    deleteIngredientData() {
      this.success = true
      axios
        .delete(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/ingredient?id=' +
            `${this.delete_id}`
        )
        .then(res => { 
          let i = this.ingredients.map(item => item.id).indexOf(this.delete_id)  
          this.ingredients.splice(i, 1) 
          let parentIndex = this.parentingredients.map(item => item.id).indexOf(this.delete_id)  
          this.parentingredients.splice(parentIndex, 1) 
          this.success = false
          this.$bvModal.hide('delete-gredient')
          this.$toast
            .success(this.$t('menu.modifiers_modal.delete_gredient_msg'))
            .goAway(5000)
        })
        .catch(errors => {
          console.log(errors)
        })
    }
  }
}
</script>
