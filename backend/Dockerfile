# Stage 1: Build ứng dụng React
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Bỏ qua các cảnh báo/lỗi ESLint khi build production
ENV DISABLE_ESLINT_PLUGIN=true
ENV CI=false

RUN npm run build

# Stage 2: Chạy ứng dụng bằng NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]