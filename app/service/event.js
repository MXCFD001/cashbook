'use strict';

const Service = require('egg').Service;

class Eventservice extends Service{
  // 添加
  async addEvent(params){
    const { app } = this;
    try{
      const result = await app.mysql.insert('event',params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  } 
  // 查询数据
  async getEvent(id){
    const {ctx,app}=this;
    const QUERY_STR = 'id,events,date';
    let sql = `select ${QUERY_STR} from event where user_id = ${id}`;
    try{
      const result = await app.mysql.query(sql);
      return result;
    } catch(error){
      console.log(error);
      return null;
    }
  }

  // 查询日期
  async getEventDate(id){
    const {ctx,app}=this;
    const QUERY_STR = 'date';
    let sql = `select ${QUERY_STR} from event where user_id = ${id}`;
    try{
      const result = await app.mysql.query(sql);
      return result;
    } catch(error){
      console.log(error);
      return null;
    }
  }

  // 更新数据
  async editEvent(params){
    const { ctx , app } = this;
    try{
      let result = await app.mysql.update('event',{
        ...params
      },{
        id:params.id,
        user_id:params.user_id
      });
      return result
    } catch(error){
      console.log(error);
      return null;
    }
  }

  // 删除数据
  async deleteEvent(params){
    const {ctx,app}= this;
    try{
      let result = await app.mysql.delete('event',{
        id:params.id,
        user_id:params.user_id
      });
    return result 
    } catch(error){
      console.log(error);
      return error;
    }
  }
}
module.exports=Eventservice;