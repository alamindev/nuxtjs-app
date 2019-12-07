// import Vue from 'vue'
// import { Button, Select } from 'element-ui'
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'

// // configure la langue
// locale.use(lang)

// // importe les composants
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)

import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
