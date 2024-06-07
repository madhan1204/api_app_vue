import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path:'/photos',
    component:()=> import('layouts/MainLayout.vue'),
    children:[{path:'',component:() => import('pages/PhotosPage.vue')}]
  },
  {
    path:'/art',
    component:()=> import('pages/ArtworksPage.vue')
  },
  {
    path:'/movie',
    component:()=> import('layouts/MainLayout.vue'),
    children:[{path:'',component:() => import('pages/MoviePage.vue')}]
  },
  {
    path:'/blogs',
    component:()=> import('layouts/MainLayout.vue'),
    children:[{path:'',component:() => import('pages/BlogList.vue')}]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
