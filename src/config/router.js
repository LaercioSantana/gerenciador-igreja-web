import Home from '../spa/Home'
import Login from '../spa/login/Login'
import NotFound from '../spa/NotFound'
import Main from '../spa/Main'
import Calendar from '../spa/Calendar'
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
    path: '/main',
    component: Main,
    redirect: '/main/calendar',
    children: [
        {
          path: 'calendar',
          component: Calendar
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
