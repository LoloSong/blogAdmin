import Vue from 'vue'
import Router from 'vue-router'

// import Layout from '@/view/layout/layout'
// import Login from '@/view/login/login'
// import Dashboard from '@/view/dashboard/dashboard'
// import Table from '@/view/table/table'
// import Tree from '@/view/tree/tree'
// import Form from '@/view/form/form'
// import Permission from '@/view/permission/permission'

const Login = () => import('@/view/login/login')
const Layout = () => import('@/view/layout/layout')
const Dashboard = () => import('@/view/dashboard/dashboard')
const Table = () => import('@/view/table/table')
const Tree = () => import('@/view/tree/tree')
const Permission = () => import('@/view/permission/permission')
const Category = () => import('@/view/category/category')
const ArticleList = () => import('@/view/articleList/articleList')
const ArticleCreate = () => import('@/view/articleCreate/articleCreate')
const ArticleEdit = () => import('@/view/articleEdit/articleEdit')

Vue.use(Router)

export const constantRouter = [
  {path: '/login', name: 'login', component: Login, hidden: true},
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    hidden: true,
    children: [{path: 'dashboard', name: 'Dashboard', component: Dashboard}]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '文章管理',
        component: ArticleList
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '分类管理',
        component: Category
      }
    ]
  },
  {
    path: '/example',
    redirect: '/example/table',
    name: '例子',
    component: Layout,
    children: [
      {
        path: 'table',
        name: '表格',
        component: Table
      },
      {
        path: 'tree',
        name: '树结构',
        component: Tree
      }
    ]
  }
]

export const asyncRouter = [
  {
    path: '/permission',
    redirect: '/permission/index',
    component: Layout,
    name: '权限测试',
    meta: {roles: ['admin']},
    children: [
      {
        path: 'index',
        component: Permission,
        name: '权限测试页',
        meta: {roles: ['admin']}
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: {roles: ['admin']},
    hidden: true,
    children: [
      {
        path: 'createArticle',
        name: '创建文章',
        component: ArticleCreate
      },
      {
        path: 'editArticle/:articleID',
        name: '编辑文章',
        component: ArticleEdit
      }
    ]
  }
]

export default new Router({
  base: 'admin',
  mode: 'history',
  routes: constantRouter
})
