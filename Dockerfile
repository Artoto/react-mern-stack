# --- Stage 1: Build the React application ---
FROM node:18

# กำหนด Working Directory ภายใน Container
WORKDIR /app

# Copy ไฟล์ Source Code ทั้งหมด
COPY . /app

RUN npm ci
# Build React Application
# คำสั่งนี้จะสร้างโฟลเดอร์ 'build' หรือตามที่ตั้งค่าไว้ ซึ่งมีไฟล์ Static สำหรับ Production
RUN npm run build

EXPOSE 3000

# คำสั่งเริ่มต้นเมื่อ Container ถูกรัน (Default ของ Nginx Image)
CMD ["npx", "serve", "-s","dist"]