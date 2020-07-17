<template>
  <el-dropdown
    id="size-select"
    trigger="click"
    @command="handleSetSize"
  >
    <div>
      <svg-icon
        class="size-icon"
        name="size"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value"
      >
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'SizeSelect'
})
export default class extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ]

  get size() {
    return AppModule.size
  }

  /**
   * 选中 size
   * @param size
   */
  private handleSetSize(size: string) {
    (this as any).$ELEMENT.size = size
    AppModule.SetSize(size)
    this.refreshView()
    this.$message({
      message: 'Switch Size Success',
      type: 'success'
    })
  }

  private refreshView() {
    // In order to make the cached page re-rendered
    TagsViewModule.delAllCachedViews()
    const { fullPath } = this.$route
    console.debug(this.$route)
    console.debug(this.$router)
    console.debug(fullPath)
    this.$nextTick(() => {
      this.$router.replace({
        // 这里用 push 也有同样的效果，并
      // this.$router.push({
        path: '/redirect' + fullPath
      })
    })
    /**
     * fullPath  ---- 路由对象属性 之一
     * https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7
     * */
    // $route.fullPath
    //
    // 类型: string
    //
    // 完成解析后的 URL，包含查询参数和 hash 的完整路径。

    /**
     * Router 实例属性 ！====  Route 路由对象
     * Router 实例属性 ！====  Route 路由对象
     * Router 实例属性 ！====  Route 路由对象
     * Router 实例属性 ！====  Route 路由对象
     *
     * router 类型: Vue instance  配置了 router 的 Vue 根实例。 实例属性实例属性实例属性实例属性
     *
     *
     *
     *
     * 路由对象 route （注意，不是 router）
     * https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1
     *
     * 一个路由对象 (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

     路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

     路由对象出现在多个地方:

     在组件内，即 this.$route

     在 $route 观察者回调内

     router.match(location) 的返回值

     router.beforeEach((to, from, next) => {
  // `to` 和 `from` 都是路由对象
})

     */
  }
}
</script>
