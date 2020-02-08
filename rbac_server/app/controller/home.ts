import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    //  ctx.body = await ctx.service.test.sayHi('egg');
    const users = await this.app.mysql.select('user');
    ctx.body = {
      success: true,
      data: users,
    };
  }
}
