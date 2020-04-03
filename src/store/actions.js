import ajax from '@/libs/ajax'
import { awaitWrap } from '@/libs/tools'

import { Message } from 'iview'

export default {
  // async getThemeInfos({ commit }, data) {
  //   const [err, res] = await getThemeInfos() //查询主题
  //   if (err) {
  //     Message.error(err)
  //     return
  //   }
  //   commit('setThemeList', res.data)
  // }

  // ======================日志审计=====================
  //查询模块名称
  async getModuleList({ commit }, data) {
    return awaitWrap(ajax.post('/systemSetting/auditlog/getModuleList', data))
  },
  //查询操作类型
  async getOperateTypeList({ commit }, data) {
    return awaitWrap(
      ajax.post('/systemSetting/auditlog/getOperateTypeList', data)
    )
  },
  //查询日志列表
  async queryOperateLogs({ commit }, data) {
    return awaitWrap(
      ajax.post('/systemSetting/auditlog/queryOperateLogs', data)
    )
  },
  //查询日志详情
  async getOperateLogDetail({ commit }, data) {
    return awaitWrap(
      ajax.post('/systemSetting/auditlog/getOperateLogDetail', data)
    )
  }
}
