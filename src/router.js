import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Will catch all naviagation that don't match with this array content
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page'} }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          .catch((error) => {
            // Redirect to the 404 if the event don't exist
            if(error.response && error.response.status == 404) {
              // -> We will use the prop resource to specify the kind of 404 we have
              next({ name: '404', params: { resource: 'event' } });
            } else {
              next({ name: 'network-issue' });
            }
          })
      }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done();
});

export default router;
