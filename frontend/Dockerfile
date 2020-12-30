FROM node:12-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# 프록시 거치지 않고, 바로 화면을 보여줄 때, nginx 서빙 테스트
# default.conf를 따로 설정하지 않으면 기본 listen은 보통 80
# FROM nginx
# EXPOSE 80
# COPY --from=builder /app/build /usr/share/nginx/html

# 배포 시 프록시 거칠 때
# ./nginx/default.conf 설정 사용
FROM nginx
EXPOSE 3000 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build  /usr/share/nginx/html