'use strict';

const Controller = require('egg').Controller;

class FeedbackController extends Controller {
  // 获取反馈消息
  async getMes(){
    const { ctx, app } = this;
    const mesInfo = await ctx.service.feedback.getMes()
    ctx.body ={
      code: 200,
      msg: '请求成功',
      data:{
        mesInfo
      }
    }
  }

  // 反馈消息
    async mes(){
      const {ctx} = this;
      const { content , email , date}=ctx.request.body; //获取反馈消息参数

      // 判空
      if(!content||!email || !date ){
        ctx.body={
          code:500,
          msg:'内容/联系不能为空',
          data:null
        }
        return
      }

      const result = await ctx.service.feedback.mes({
        content,
        email,
        date
      });

      if(result){
        ctx.body = {
          code:200,
          msg:'反馈成功',
          data:null
        }
      } else{
        ctx.body ={
          code:500,
          msg:'反馈失败',
          data:null
        }
      }      
    }
}

module.exports = FeedbackController;