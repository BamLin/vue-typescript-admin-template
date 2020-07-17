import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
import {UserModule} from "@/store/modules/user";

const hasPermission = (roles: string[], route: RouteConfig) => {
  console.debug("==== hasPermission =====")
  console.debug(route)
  console.debug(route.meta)
  if (route.meta && route.meta.roles) {
    // 对比 userInfo中的 roles 和 router/asyncRoutes 中的 roles
    // some some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  // todo 传进来的 routes 是 asyncRoutes
  const res: RouteConfig[] = []
  // todo forEach 遍历
  routes.forEach(route => {
    const r = { ...route }
    console.debug("==== filterAsyncRoutes ====")
    console.debug(r)
    console.debug(roles)
    // 有权限
    if (hasPermission(roles, r)) {
      // 子路由也要经过遍历
      if (r.children) {
        // 支持多层路由嵌套这样子的
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = [] // todo 最终 addRoutes 的数据

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      // await UserModule.GetUserInfo()
      // const roles = UserModule.roles
      console.debug(roles)
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
