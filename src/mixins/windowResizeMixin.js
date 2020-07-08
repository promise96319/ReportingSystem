// 监听窗口变化事件，获取窗口高度
export default {
  data() {
    return {
      windowHeight: 0,
      timer: null
    }
  },
  created () {
    this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 1000
  },
  methods: {
    handleWindowResize() {      
      // 节流
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 1000
      }, 400);
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}