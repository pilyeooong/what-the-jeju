export const API_HOST =
  process.env.NODE_ENV === 'production'
  ? 'http://localhost:4000' // 배포 서버 내려서 임시로 작성 및 테스트 용도 
  : 'http://localhost:4000';
