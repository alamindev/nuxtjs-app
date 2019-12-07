<template>
  <div>
    <b-modal
      v-if="delete_id"
      id="delete-modifier"
      size="lg"
      ref="modal"
      hide-footer
      hide-header
    >
      <form ref="form" @submit.prevent="SubmitDeleteModifier">
        <div class="row">
          <div class="col-lg-12">
            <div class="prems__delete">
              <h3>{{ $t('menu.delete_modifier.title') }}</h3>
              <p>
                {{ $t('menu.delete_modifier.heading_one') }}
                <b v-if="delete_data">{{ delete_data }}</b>
                {{ $t('menu.delete_modifier.heading_two') }}
              </p>
            </div>
            <div class="prems_border_top pt-1 d-flex justify-content-end">
              <b-button
                class="prems_btn_cancel"
                variant="prems_btn_cancels"
                @click="$bvModal.hide('delete-modifier')"
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
  props: ['getModifiers', 'get_modifier', 'options'],
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
    deleteModifier: function(id) {
      this.$bvModal.show('delete-modifier')
      this.delete_id = id
      this.delete_data = {}
      const modifier = this.options.filter(i => i.value === id)
      this.delete_data = modifier[0].text
    },
    SubmitDeleteModifier() {
      this.success = true
      axios
        .delete(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/modifier?id=' +
            `${this.delete_id}`
        )
        .then(res => { 
          _.remove(this.get_modifier, {
            id: this.delete_id
          })
          this.$toast.success(this.$t('menu.modifiers.delete_msg')).goAway(5000)
          this.getModifiers()
          this.success = false
          this.$bvModal.hide('delete-modifier')
          this.$bvModal.hide('edit-modifiers-group')
        })
        .catch(errors => {
          console.log(errors)
        })
    }
  }
}
</script>
