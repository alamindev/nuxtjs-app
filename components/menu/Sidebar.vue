<template>
  <div class="row m-0 p-0">
    <div class="col-lg-4 m-0 p-0 prems__border_right">
      <perfect-scrollbar>
        <div class="prems__main_menu">
          <ul class="prems__menu m-0 list-unstyled">
            <li
              class="prems__item_category"
              v-for="category in categories"
              :key="category.id"
            >
              <div
                class="prems__menu_title prems__border_bottom d-flex"
                v-on:click.stop="ToggleCategory(category.id)"
               v-bind:class="{'hightlight': category.highlight}"
              >
                <span class="prems__menu_icon">
                  <i class="material-icons" v-if="category.active"
                    >keyboard_arrow_down</i
                  >
                  <i class="material-icons" v-if="!category.active"
                    >keyboard_arrow_up</i
                  >
                </span>
                <div class="w-100 d-flex justify-content-between">
                  <span class="prems__title">{{ category.value }}</span>
                  <span
                    class="prems__menu_icon prems_manage_category"
                    v-on:click.stop="ToggleManageCategory(category.id)"
                  >
                    <i class="material-icons">create</i>
                  </span>
                  <div
                    class="prems__manage_main"
                    v-bind:class="{
                      prems__manage_active: category.manage_active
                    }"
                  >
                    <ul class="prems__manage_main_ul list-unstyled m-0 p-0">
                      <li
                        class="prems__manage_li"
                        @click.stop="editCategory(category.id, 'edit-category')"
                      >
                        <div class="prems__manage_icon_title">
                          <div class="prems_icon">
                            <i class="material-icons">create</i>
                          </div>
                          <div class="prems_title">
                            {{ $t('menu.sidebar.manage.edit') }}
                          </div>
                        </div>
                      </li>
                      <li
                        class="prems__manage_li"
                        @click.stop="
                          deleteCategory(category.id, 'delete-category')
                        "
                      >
                        <div class="prems__manage_icon_title">
                          <div class="prems_icon">
                            <i class="material-icons">restore_from_trash</i>
                          </div>
                          <div class="prems_title">
                            {{ $t('menu.sidebar.manage.delete') }}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul
                class="prems__sub_category list-unstyled p-0 m-0"
                v-bind:class="{ prems__active: category.active }"
              >
                <li
                  class="prems__sub_category_item prems__border_bottom"
                  v-for="item in categoryItems(category.id)"
                  :key="item.id"
                >
                  <div
                    class="prems__sub_title_manage"
                    v-bind:class="{ prems_sub_item_active: item.item_active }"
                    @click.stop="viewSubCate(item.id, item)"
                  >
                    <div class="prems__sub_title">{{ item.value }}</div>
                    <div class="prems__sub_manage">
                      <span
                        class="prems__sub_icon_main"
                        v-on:click.stop="ToggleManageItem(item.id)"
                      >
                        <i class="material-icons">create</i>
                      </span>
                      <div
                        class="prems__manage_main"
                        v-bind:class="{
                          prems__item_active: item.manage_item_active
                        }"
                      >
                        <ul class="prems__manage_main_ul list-unstyled m-0 p-0">
                          <li
                            class="prems__manage_li"
                            @click.stop="
                              showDeleteModal(
                                item.id,
                                'delete-item',
                                category.id
                              )
                            "
                          >
                            <div class="prems__manage_icon_title">
                              <div class="prems_icon">
                                <i class="material-icons">restore_from_trash</i>
                              </div>
                              <div class="prems_title">
                                {{ $t('menu.sidebar.manage.delete') }}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="prems__sub_category_item prems__border_bottom">
                  <div
                    class="prems__sub_title_manage prems_no_hover"
                    @click.stop="AddSubItem(category.id)"
                  >
                    <div class="prems__add_item text-uppercase">
                      {{ $t('menu.sidebar.add_item') }}
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </perfect-scrollbar>
      <div
        class="prems__add_category"
        @click="AddCategoryModal('add-category')"
      >
        <div class="prems__add_item text-uppercase">
          {{ $t('menu.category_model.add_category') }}
        </div>
      </div>
      <AddCategory
        v-if="add_category"
        :getCategory="getCategory"
        ref="addCategoryRef"
        :allCates.sync="categories"
      />
      <editCategory
        :getCategory="getCategory"
        ref="editCategoryRef"
        :allCates.sync="categories"
        @CategoryUpdateSync="CategoryUpdateSync"
      />
      <deleteCategory
        :getCategory="getCategory"
        ref="deleteCategoryRef"
        :allCates.sync="categories"
        @CategoryDeleteSync="CategoryDeleteSync"
      />
      <deleteItem :items.sync="items" ref="deleteItemRef" />
    </div>
    <div class="col-lg-8 m-0 p-0">
      <Modifiers ref="mainModifiers" :allItems.sync="items" :categories.sync="categories" />
    </div>
  </div>
</template>

<script>
import Modifiers from '../../components/menu/Modifiers'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import axios from 'axios'
import AddCategory from './category/addCategory'
import editCategory from './category/editCategory'
import deleteCategory from './category/deleteCategory'
import deleteItem from './item/deleteItem'
import lodash from 'lodash'
export default {
  components: {
    AddCategory,
    editCategory,
    deleteCategory,
    deleteItem,
    Modifiers,
    PerfectScrollbar
  },
  data() {
    return {
      categories: [],
      items: [],
      add_category: false
    }
  },
  computed: {
    categoryItems: function() {
      return id => this.items.filter(i => i.category_id === id)
    }
  },
  methods: {
    ToggleManageCategory: function(category_id) {
      _.forEach(this.categories, category => {
        if (category.id === category_id) {
          category.manage_active = !category.manage_active
        } else {
          category.manage_active = false
        }
      })
      _.forEach(this.items, item => {
        item.manage_item_active = false
      })
    },
    ToggleManageItem: function(item_id) {
      _.forEach(this.items, item => {
        if (item.id === item_id) {
          item.manage_item_active = !item.manage_item_active
        } else {
          item.manage_item_active = false
        }
      })
    },
    closeItem: function() {
      for (let dd in this.items) {
        this.items[dd].manage_item_active = false
      }
    },
    ToggleCategory: function(category_id) {
      _.forEach(this.categories, category => {
        if (category.id === category_id) {
          category.active = !category.active
          category.manage_active = false
          category.highlight = false
        } else {
          category.active = false
          category.manage_active = false
          category.highlight = false
        }
      })
      _.forEach(this.items, item => {
        item.manage_item_active = false
        item.item_active = false
      })
      const getItem = _.filter(
        this.items,
        item => item.category_id === category_id
      )

      if (getItem && getItem.length > 0) {
        this.$refs.mainModifiers.getItemId(getItem[0].id)
        getItem[0].item_active = true
      }
    },
    closeCategory: function() {
      for (let dd in this.categories) {
        this.categories[dd].manage_active = false
      }
    },
    AddSubItem(category_id) {
      _.forEach(this.categories, category => {
        if (category.id === category_id) {
          category.highlight = true
        }
      })

      this.$refs.mainModifiers.addNewItem(category_id)
    },
    AddCategoryModal(category_id) {
      this.add_category = true
      setTimeout(() => {
        this.$refs.addCategoryRef.showModalCategory(category_id)
      }, 200)
    },
    viewSubCate(item_id, item) {
      _.forEach(this.items, function(val) {
        val.item_active = false
        if (item_id == val.id) {
          val.item_active = true 
        }
      })
      _.forEach(this.categories,(val)=> val.highlight = false)
      this.$refs.mainModifiers.getItemId(item_id)
      item.manage_item_active = false
      _.forEach(this.categories, category => (category.manage_active = false))
    },
    editCategory(id, modal_id) {
      this.$refs.editCategoryRef.editCate(id, modal_id)
    },
    deleteCategory(id, modal_id) {
      this.$refs.deleteCategoryRef.deleteCate(id, modal_id)
    },
    showDeleteModal(id, modal_id, cate_id) {
      this.$refs.deleteItemRef.ItemDeleteModal(id, modal_id, cate_id)
    },
    /*
     * Get Category data
     */

    async getCategory(deleteCate = null) {
      try {
        let datas = await this.$axios.$get(
          'https://business-dashboard-koa-rest-ap.herokuapp.com/category'
        )
        const data = _.map(datas, val => {
          return {
            id: val.id,
            value: val.value,
            active: false,
            manage_active: false,
            availability: val.availability,
            highlight: false
          }
        })
        data[0].active = true
        this.categories = data
        this.getItem(deleteCate)
      } catch (error) {
        console.log('something went wrong.')
      }
    },
    getItem(deleteCate) {
      try {
        let categories = JSON.parse(JSON.stringify(this.categories))
        categories.forEach(async val => {
          let subItems = await this.$axios.$get(
            'https://business-dashboard-koa-rest-ap.herokuapp.com/item?id=' +
              `${val.id}`
          )
          if (
            typeof subItems != 'undefined' &&
            subItems != null &&
            subItems.length != null &&
            subItems.length > 0
          ) {
            setTimeout(() => {
              let filter = _.find(this.items, ['item_active', true])
              let check = _.isEmpty(filter)
              if (!check) {
                this.$refs.mainModifiers.getItemId(filter.id)
              }
            }, 100)
            const subItem = _.map(subItems, (value, key) => {
              return {
                id: value.id,
                value: value.value,
                price: value.price,
                description: value.description,
                category_id: value.category_id,
                item_active: false,
                manage_item_active: false
              }
            })
            let arr = _.map(subItem, arr => {
              if (val.active === true && arr.category_id === val.id) {
                subItem[0].item_active = true
              }
              return arr
            })
            _.forEach(arr, item => {
              if (!this.items.find(({ id }) => id === item.id)) {
                this.items.push(item)
              }
            })

            if (deleteCate != null && deleteCate == 'delete-id') {
              _.forEach(this.items, item => {
                if (val.active === true && item.category_id === val.id) {
                  this.items[0].item_active = true
                }
              })
            }
          }
        })
      } catch (error) {
        console.log('something went wrong.')
      }
    },
    CategoryUpdateSync(category_id) {
      _.forEach(this.categories, category => {
        category.active = false
        if (category.id === category_id) {
          category.active = true
        }
      })
      _.forEach(this.items, item => {
        item.item_active = false
      })
      const getItem = _.filter(
        this.items,
        item => item.category_id === category_id
      )
      if (getItem && getItem.length > 0) {
        getItem[0].item_active = true
      }
    },
    CategoryDeleteSync(category_id) {
      _.forEach(this.categories, category => (category.active = false))
      _.forEach(this.items, item => (item.item_active = false))
      console.log(category_id)
    }
  },
  async created() {
    await this.getCategory()
    // for addevent lister
    var self = this
    window.addEventListener('click', function(e) {
      let targetClass = e.target.classList
      if (targetClass) {
        if (!targetClass.contains('prems__manage_active')) {
          self.closeCategory()
        }
      }
    })
    window.addEventListener('click', function(e) {
      let targetClass = e.target.classList
      if (targetClass) {
        if (!targetClass.contains('prems__manage_active')) {
          self.closeItem()
        }
      }
    })
  }
}
</script>

<style lang="scss">
.prems_no_hover:hover {
  background: transparent !important;
}
.modal-content {
  margin: 0 auto;
  border-radius: 2px !important;
  .modal-body {
    padding: 0 !important;
  }
}
.ps {
  height: 70vh;
}
</style>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
