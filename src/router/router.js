import Main from '@/pages/Main';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('@/pages/Posts.vue'),
  },
  {
    path: '/store',
    name: 'PostsWithStore',
    component: () => import('@/pages/PostsWithStore.vue'),
  },
  {
    path: '/composition',
    name: 'PostsWithComposition',
    component: () => import('@/pages/PostsCompositionAPI.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import('@/pages/Post.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.afterEach((to, from, failure) => {
//   console.log('to: ', to);
//   console.log('from: ', from);

//   if (isNavigationFailure(failure)) {
//     console.log('failed navigation', failure)
//   }
// });

export default router;
