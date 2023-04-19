'use strict';

const Service = require('egg').Service;

class Feedbackservice extends Service{
  // 获取
  async getMes(){
    const {app} = this;
    let sql = 'select * from feedback';
    try{
      const result = await app.mysql.query(sql);
      return result;
    } catch (error){
      console.log(error);
      return null;
    }
  }

  // 写入
  async mes(params){
    const { app } = this;
    try{
      const result = await app.mysql.insert('feedback',params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports=Feedbackservice;