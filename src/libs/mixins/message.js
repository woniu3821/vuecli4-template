export default {
  methods: {
    info(msg) {
      this.$Message.info(msg)
    },
    success(msg) {
      this.$Message.success(msg)
    },
    warning(msg) {
      this.$Message.warning(msg)
    },
    errors(msg) {
      this.$Message.error(msg)
    }
  }
}
