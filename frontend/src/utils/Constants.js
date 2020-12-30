export const API_HOST =
  process.env.NODE_ENV === 'production'
  ? 'http://hotjeju-env.eba-fzpsip2j.ap-northeast-2.elasticbeanstalk.com'
  : 'http://localhost:4000';
