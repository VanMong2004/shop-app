Bước 1 — Tạo cấu trúc thư mục
Mở terminal (Git Bash hoặc CMD), chạy:
bashmkdir shop-app
cd shop-app
mkdir server
npm create vite@latest client -- --template react

Bước 2 — Setup Tailwind cho FE
bashcd client
npm install
npm install -D tailwindcss @tailwindcss/vite