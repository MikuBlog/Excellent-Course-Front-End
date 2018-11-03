import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({

    state: {
        //存放用户名
        userName:"",
        //存放用户session_id
        userId:"",
        //存放用户权值
        userRole:"",
        //存放后台管理页面标题
        manageTitle:"",
        //记录当前位置
        position:""
    },

    mutations: {

        //设置用户名字
        setUserName(state,name) {

            state.userName = name

        },

        //设置用户权限ID
        setUserId(state,id) {

            state.userId = id

        },

        //设置用户权值
        setRole(state,role) {

            state.userRole = role

        },

        //设置后台管理页面标题
        setManageTitle(state,title) {

            state.manageTitle = title

        },

        //设置当前位置
        setPosition(state,position) {

            state.position = position

        }

    }

})

export default store