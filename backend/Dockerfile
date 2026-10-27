# Sử dụng Node.js image chính thức
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json để cài thư viện
COPY package*.json ./

# Cài đặt các thư viện phụ thuộc
RUN npm install

# Copy toàn bộ mã nguồn backend vào container
COPY . .

# Mở cổng 5000 cho backend
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["node", "server.js"]