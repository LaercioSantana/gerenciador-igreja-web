import Home from '../spa/Home'
import Login from '../spa/login/Login'
import Signup from '../spa/Signup'
import NotFound from '../spa/NotFound'
import Main from '../spa/Main'
import Calendar from '../spa/Calendar'
import AddEvent from '../spa/AddEvent'
/* eslint-disable import/prefer-default-export */
export const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/main',
    component: Main,
    redirect: '/main/calendar',
    children: [
        {
          path: 'calendar',
          component: Calendar
        },
        {
          path: 'add-event',
          component: AddEvent
        }
      ]
  },
  {
    path: '*',
    component: NotFound
  }
]

export const VueRouterObject = {
  routes,
  mode: 'history',
  saveScrollPosition: true
}

export default VueRouter => new VueRouter(VueRouterObject)
