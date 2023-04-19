'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware} = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);//中间件验证token

  router.post('/api/user/register',controller.user.register); // 注册接口 
  router.post('/api/user/login',controller.user.login); // 登录接口
  router.get('/api/user/test',_jwt,controller.user.test); // 测试
  router.get('/api/user/get_userinfo',_jwt,controller.user.getUserInfo);  // 获取用户信息
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.post('/api/upload',controller.upload.upload);  // 头像更改

  router.get('/api/type/list', _jwt, controller.type.list); // 获取消费类型列表
  router.post('/api/bill/add',_jwt,controller.bill.add);//添加账单
  router.get('/api/bill/list',_jwt,controller.bill.list);//获取账单列表
  router.get('/api/bill/yearlist',_jwt,controller.bill.yearlist); // 获取全年账单
  router.get('/api/bill/detail',_jwt,controller.bill.detail);//获取详情
  router.post('/api/bill/update',_jwt,controller.bill.update)//账单更新
  router.post('/api/bill/delete',_jwt,controller.bill.delete);//删除账单
  router.get('/api/bill/data', _jwt, controller.bill.data); // 获取数据

  router.post('/api/feedback',_jwt,controller.feedback.mes); // 反馈信息
  router.get('/api/fbmes',controller.feedback.getMes);  // 获取反馈信息

  router.post('/api/addevent',_jwt,controller.event.addEvent); // 添加日程
  router.get('/api/getevent',_jwt,controller.event.getEvent); // 获取日程
  router.get('/api/geteventdate',_jwt,controller.event.getEventDate); // 获取日程时间
  router.post('/api/editevent',_jwt,controller.event.editEvent);//修改日程
  router.post('/api/deleteevent',_jwt,controller.event.deleteEvent);//修改日程
};
