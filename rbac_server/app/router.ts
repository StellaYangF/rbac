import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // 参数 1 是鉴权的方法s
  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/api/loginCallback',
    failureRedirect: '/api/loginCallback',
  });
  // localStrategy 功能先从请求中获取用户和密码，然后传入自己写的 callback
  router.post('/api/login/account', localStrategy);
  router.get('/api/loginCallback', controller.user.loginCallback);
};
