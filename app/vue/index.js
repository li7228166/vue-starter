import Vue from 'vue'
import 'animate.css'
import '../style/common.less'

import App from './App'

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
});