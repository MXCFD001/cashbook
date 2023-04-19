'use strict';

const Controller = require('egg').Controller;

class Event extends Controller {
  async addEvent(){
    const { ctx , app } = this;
    // 获取请求中携带的参数
    const { date , events } =ctx.request.body;
    // 判空操作
    if(!events || !date){
      ctx.body = {
      code:400,
      msg:'参数错误',
      date:null
      }
      return
    }
    try{
      let user_id
      const token = ctx.request.header.authorization;
      // 拿到token获取用户信息
      const decode = await app.jwt.verify(token , app.config.jwt.secret);
      if(!decode) return
      user_id = decode.id // 通过token解构出当前登录用户id

      const result = await ctx.service.event.addEvent({
        events,
        date,
        user_id
      });
      ctx.body={
        code:200,
        msg:'请求成功',
        data:null,
      }
    } catch(error){
      ctx.body={
        code:500,
        msg:'系统错误',
        data:null,
      }
    }
  }      

  async getEvent(){
    const {ctx , app } = this;
    // const { date }=ctx.query

    try{
      let user_id
      // 通过 token 解析，拿到 user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token , app.config.jwt.secret);
      if(!decode) return
      user_id = decode.id
      // 通过user_id 拿到该id的事件数组
      const list = await ctx.service.event.getEvent(user_id);

      // 筛选锤子，一堆破事
      // 通过传进来的月份筛选数据
      // const _list = list.filter(item =>{
      //   return moment(Number(item.data)).format('YYYY-MM') == date
      // })
      // 返回数据
      ctx.body={
        code:200,
        msg:'请求成功',
        data:{
          list // 就这么点数据还要筛选？
        }
      }
    }catch {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
        }
      }
    }

  // 返回日期数组
  async getEventDate(){
    const {ctx , app } = this;
    try{
      let user_id
      // 通过 token 解析，拿到 user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token , app.config.jwt.secret);
      if(!decode) return
      user_id = decode.id
      // 通过user_id 拿到该id的事件数组
      const list = await ctx.service.event.getEventDate(user_id);

      // 返回数据
      ctx.body={
        code:200,
        msg:'请求成功',
        data:{
          list 
        }
      }
    }catch {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
        }
      }
    }  


  async editEvent(){
    const {ctx , app } = this; 
    // 获取请求中携带的参数
    const { events , id } =ctx.request.body;
    // 判空操作
    if(!events || !id){
      ctx.body = {
      code:400,
      msg:'参数错误',
      date:null
      }
      return
    }
    try{
      let user_id
      // 通过 token 解析，拿到 user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token , app.config.jwt.secret);
      if(!decode) return
      user_id = decode.id

      const result = await ctx.service.event.editEvent({
        events,
        user_id,
        id
      })

      // 返回数据
      ctx.body={
        code:200,
        msg:'请求成功',
        data:null,
      }
    }catch {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
        }
      }
  }

  async deleteEvent(){
    const { ctx , app } = this;
    // 获取请求中携带的参数
    const { id } =ctx.request.body;
    // 判空操作
    if(!id){
      ctx.body = {
      code:400,
      msg:'参数错误',
      date:null
      }
    } else{
      try{
        let user_id
        const token = ctx.request.header.authorization;
        // 拿到token获取用户信息
        const decode = await app.jwt.verify(token , app.config.jwt.secret);
        if(!decode) return
        user_id = decode.id // 通过token解构出当前登录用户id
  
        const result = await ctx.service.event.deleteEvent({
          id,
          user_id
        });
        ctx.body={
          code:200,
          msg:'请求成功',
          data:null,
        }
      } catch(error){
        ctx.body={
          code:500,
          msg:'系统错误',
          data:null,
        }
      }
    }
  }
}

module.exports = Event;