// app.ts
import { Application, IBoot } from 'egg';
import { Strategy } from 'passport-local';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configDidLoad() {
    const { app } = this;
    // 配置鉴权的策略
    app.passport.use(new Strategy({
      usernameField: 'userName', // 从请求体 的哪个字段取到用户名
      passReqToCallback: true, // 向 callback 中传递 request 对象
    }, async (request, userName, password, done) => {
      const user = await app.mysql.get('user', { userName, password });
      if (user) {
        done(null, user);
      } else {
        request.logout();
        done(null, false);
      }
    }));
  }
}
