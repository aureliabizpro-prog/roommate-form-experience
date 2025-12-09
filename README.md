# 好室友 housemate_tw® - 找室友媒合體驗

> 智能室友配對系統，通過多維度評估幫助您找到最合適的室友

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## ✨ 功能特色

- 📱 **完美響應式設計** - 針對手機、平板、桌面優化的用戶體驗
- 🎯 **19 題智能問卷** - 全方位評估生活習慣、預算、地點偏好
- 💾 **自動存檔** - localStorage 自動儲存填寫進度
- 📊 **實時統計** - 查看您的排名和社群數據
- ✅ **表單驗證** - Zod 驗證確保數據完整性
- 🎨 **流暢動畫** - Framer Motion 打造絲滑過渡效果
- 📈 **GA4 追蹤** - 完整的用戶行為分析
- 🔄 **Google Form 整合** - 自動提交到 Google 表單

## 🚀 快速開始

### 環境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 安裝

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 開始體驗！

### 構建生產版本

```bash
# 構建
npm run build

# 啟動生產服務器
npm run start
```

## 🛠 技術棧

- **框架**: [Next.js 16](https://nextjs.org/) with App Router
- **語言**: [TypeScript 5](https://www.typescriptlang.org/)
- **樣式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **狀態管理**: [Zustand](https://github.com/pmndrs/zustand)
- **表單驗證**: [Zod](https://github.com/colinhacks/zod)
- **動畫**: [Framer Motion](https://www.framer.com/motion/)

## 📋 項目結構

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── form/             # 表單頁面
│   ├── success/          # 成功頁面
│   └── page.tsx          # 首頁
├── components/            # UI 組件
├── hooks/                 # React Hooks
└── lib/                   # 工具庫
```

## 📊 問卷結構

問卷包含 9 個主要部分，共 19 個問題，涵蓋：

- 📧 基本信息
- 🏠 生活習慣與相處偏好
- 👤 個人資料
- 📍 租屋條件（地點、預算、日期）
- 🌸 健康與生活方式

## 🎨 UI/UX 優化

### 手機端優化
- ✅ 48x48px 最小觸控區域
- ✅ 響應式字體和間距
- ✅ 優化的長文本換行
- ✅ 流暢的過渡動畫

### 視覺設計
- 🎨 Indigo + Purple 漸層配色
- 💫 Framer Motion 動畫
- 📱 iOS/Android 設計適配

## 🚢 部署

### Vercel (推薦)

最簡單的部署方式是使用 [Vercel Platform](https://vercel.com/new)

### 其他平台

也可部署到：
- Netlify
- AWS Amplify
- Cloudflare Pages

## 📝 許可證

MIT License

---

**⭐ 如果這個項目對您有幫助，請給我們一個星標！**
