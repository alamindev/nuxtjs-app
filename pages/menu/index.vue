<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mt-2 rounded-0 prems__custom_card">
          <div class="card-header bg-white">
            <h2 class="prems__menu_craft m-0 p-0 pl-2">{{$t('menu.menu_craft')}}</h2>
          </div>
          <div class="card-body prems__custom_card_body p-0"> 
            <SideBar />   
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script> 
import SideBar from '../../components/menu/Sidebar' 
export default { 
  components: { 
    SideBar, 
  },
  data() {
    return {}
  }
}
</script>

 
