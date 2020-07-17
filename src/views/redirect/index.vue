<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Redirect'
})
export default class extends Vue {
  created() {
    const { params, query } = this.$route
    const { path } = params
    console.debug(query)
    console.debug(params) // {path: "profile/index"}
    console.debug(path) // profile/index

    // todo 传入数据一般为 /redirect' + fullPath   ，eg  /redirect/profile/index
    // router中的写法 path: '/redirect/:path(.*)',  todo 将 fullPath ==》 给了 path
    this.$router.replace({ path: '/' + path, query })
  }

  render() {
    // Avoid warning for missing template
  }
}
</script>
