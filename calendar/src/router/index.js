import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../views/Notes.vue'
import Calendar from "@/views/Calendar";
import Tasks from "@/views/Tasks";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
