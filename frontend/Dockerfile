FROM node:12-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# default.conf를 따로 설정하지 않으면 기본 listen은 80
# 배포 시 프록시 거칠 때
# ./nginx/default.conf 설정 사용
FROM nginx
EXPOSE 3000 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build  /usr/share/nginx/html