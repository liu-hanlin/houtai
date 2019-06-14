import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index.vue'
import login from '../components/pages/login.vue'
import manage from '../components/pages/manage.vue'
import user from '../components/pages/user.vue'
import notice from '../components/pages/notice.vue'
import device from '../components/pages/device.vue'
import create from '../components/pages/create.vue'
import Public from '../components/pages/public.vue'
import createuser from '../components/pages/createuser.vue'
import createnotice from '../components/pages/createnotice.vue'
import createdevice from '../components/pages/createdevice.vue'
 
import welcome from '../components/pages/welcome.vue'
Vue.use(Router)

export default new Router({
  routes: [
   {
     path:'/index',
     component:index,
     children:[
       {
       path:'',
       component:welcome
       },
       {
         path:'manage',
         component:Public,
         children:[
           {
             path:"create/:id",
             component:create
           },
           {
             path:'',
             component:manage
           }
         ]
       },
       {
       path:'user',
       component:Public,
       children:[
         {
           path:'createuser/:id',
           component:createuser
         },
         {
         path:"",
         component:user
         }
       ]
       },
       {
         path:'notice',
         component:Public,
         children:[
           {
             path:'',
             component:notice,
           },
            {
              path:'createnotice/:id',
              component:createnotice
            }
         ]
       },
       {
         path:'device',
         component:Public,
         children:[
           {
             path:'',
             component:device
           },
           {
             path:'createdevice/:id',
             component:createdevice
           }
         ]
       }
     ]
   },
   {
   path:'/login',
   component:login
   },
   
   {
   path:'*',
   redirect:'login'
   }
  ]
})
