/**
 * @description 业务相关工具函数
 */

export const scrollToBottom = vm => {
  vm.$nextTick(() => {
    const container = vm.$el;
    container.scrollTop = container.scrollHeight;
  });
};
