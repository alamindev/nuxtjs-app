<template>
  <div>
    <b-modal id="delete-category" ref="modal" hide-footer hide-header>
      <form
        ref="form"
        @submit.prevent="SubmitDeleteCateogory('delete-category')"
      >
        <div class="row">
          <div class="col-lg-12">
            <div class="prems__delete">
              <h3>{{ $t('menu.delete_category.title') }}</h3>
              <p>
                {{ $t('menu.delete_category.heading_one') }}
                <b v-if="edit_delete_data">{{ edit_delete_data }}</b>
                {{ $t('menu.delete_category.heading_two') }}
              </p>
            </div>
          </div>
        </div>
        <div class="prems_border_top pt-1 d-flex justify-content-end">
          <b-button
            class="prems_btn_cancel"
            variant="prems_btn_cancels"
            @click="ModalHide('delete-category')"
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
      </form>
    </b-modal>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select'
import lodash from 'lodash'
import axios from 'axios'
export default {
  components: {
    ModelSelect
  },
  props: ['allCates','getCategory'],
  data() {
    return {
      success: false,
      delete_id: '',
      edit_delete_data: ''
    }
  },

  // all methods start
  methods: {
    /*
    modal hide method
    return id
    */
    ModalHide: function(id) {
      this.$bvModal.hide(id)
    },
    /**
     * Delete Main Category
     * return @void
     */
    deleteCate(id, modal_id) {
      this.delete_id = id
      this.$bvModal.show(modal_id)
      this.showCateNameModalBox(id)
    },
    /**
     * Fetch and show data in deleteItem Modal box
     * return @void
     * func: showItemNameModalBox
     */
    showCateNameModalBox(id) {
      this.edit_delete_data = {}
      const item = this.allCates.filter(i => i.id === id)
      if (item && item.length > 0) {
        this.edit_delete_data = item[0].value
      }
    },

    /**
     * Submit Delete main category
     * return Id
     */
    async SubmitDeleteCateogory(id) {
      this.success = true
      axios
        .delete(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/category?id=' +
            `${this.delete_id}`
        )
        .then(async res => {
          if (res.status === 200) {
            this.success = false
            this.$bvModal.hide(id) 
            await this.getCategory('delete-id')   
            this.$toast
              .success(this.$t('menu.delete_category.delete_msg'))
              .goAway(5000)
          }
        })
    }
  }
}
</script>
