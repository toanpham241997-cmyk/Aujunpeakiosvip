# Aujunpeak Web App

Giao diện web cho hệ thống Aujunpeak Game Optimizer. Kết nối với Bot API để xác thực key, hiển thị thông báo và lịch sử đăng nhập.

## Yêu cầu

- Node.js 18+
- Aujunpeak API Server đang chạy (xem `aujunpeak-api`)

## Cài đặt

```bash
npm install
```

## Cấu hình

Sao chép file `.env.example` thành `.env.local` (hoặc `.env`) và điền URL API server:

```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local`:
```
VITE_API_URL=https://your-api-server.onrender.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id   # tùy chọn
```

## Chạy development

```bash
npm run dev
```

Mở http://localhost:5173

## Build production

```bash
npm run build
```

File tĩnh sẽ được tạo trong thư mục `dist/`. Deploy thư mục này lên bất kỳ static host nào (Netlify, Vercel, Cloudflare Pages, GitHub Pages...).

## Deploy

### Netlify / Vercel
1. Kết nối repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Thêm environment variable: `VITE_API_URL=https://your-api.onrender.com`

### Cloudflare Pages
1. Framework preset: Vite
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Thêm environment variable: `VITE_API_URL=https://your-api.onrender.com`

## Tính năng

- 🔐 Đăng nhập bằng Key (kết nối API)
- 🔓 Hỗ trợ đăng nhập Google (tùy chọn)
- 🎮 Tab Home / Game / Function / Settings / Profile
- 🔔 Thông báo realtime từ Discord Bot
- 📊 Lịch sử đăng nhập thiết bị
- 🎁 Trang nhận key Free (link từ Bot)
- ✨ Hiệu ứng UI đẹp mắt (Framer Motion, particles, glassmorphism)

## Cấu trúc thư mục

```
src/
├── App.tsx                    # Router chính
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── components/
│   ├── layout/                # Header, BottomNav, MainLayout, SplashScreen
│   └── ui/                    # UI components (buttons, cards, effects...)
├── contexts/
│   └── AppContext.tsx          # Global state (auth, tabs, notifications)
├── hooks/                     # Custom hooks
├── lib/
│   ├── api.ts                 # API client → kết nối với Bot API
│   ├── storage.ts             # localStorage helpers
│   └── utils.ts               # Utility functions
├── pages/                     # not-found page
├── screens/                   # LoginScreen, FreeKeyScreen
└── tabs/                      # HomeTab, GameTab, FunctionTab, SettingsTab, ProfileTab
```

## Lưu ý quan trọng

- Web App **không** chứa Discord Bot. Bot được deploy riêng.
- Web App **không** kết nối trực tiếp database. Tất cả đi qua API server.
- `VITE_API_URL` phải trỏ đúng URL API server đang chạy.
- Nếu chạy trên domain khác với API, đảm bảo API server đã bật CORS.
