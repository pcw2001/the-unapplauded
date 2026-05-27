# PWA 安装与离线验证清单

版本：v0.6

## 验证结果

**v0.6 manual test — PASSED**

验证时间：2026-05-27

| 测试项 | 结果 |
|--------|------|
| Service Worker 注册 | ✅ activated and running |
| Cache Storage | ✅ `unapplauded-v0.6` 存在 |
| 首页离线加载 | ✅ 从缓存加载成功 |
| /museum 离线访问 | ✅ 正常加载 |
| localStorage 展品 | ✅ 离线状态下仍然可见 |

## 前置条件

确保应用已部署到 HTTPS 环境（如 Vercel）。PWA 要求 HTTPS。

## 验证 Manifest

1. 打开 https://your-domain.vercel.app/manifest.webmanifest
2. 确认 JSON 包含以下字段：
   - `name`: "The Unapplauded"
   - `short_name`: "Unapplauded"
   - `display`: "standalone"
   - `icons`: 包含 192x192 和 512x512 的 PNG 图标
3. 在 Chrome DevTools → Application → Manifest 中检查是否有错误

## iPhone / iPad Safari 测试

1. 用 Safari 打开 https://your-domain.vercel.app
2. 点击底部的「分享」按钮（方框+箭头图标）
3. 向下滚动，点击「添加到主屏幕」
4. 确认名称显示为「Unapplauded」
5. 点击「添加」
6. 从主屏幕打开应用
7. 确认：
   - 应用以全屏模式打开（无 Safari 地址栏）
   - 图标显示正确
   - 启动画面背景色为 #F5F0EB（米白色）

## Android Chrome 测试

1. 用 Chrome 打开 https://your-domain.vercel.app
2. 点击右上角菜单（三个点）
3. 点击「安装应用」或「添加到主屏幕」
4. 确认安装对话框显示正确的名称和图标
5. 点击「安装」
6. 从主屏幕打开应用
7. 确认：
   - 应用以 standalone 模式打开
   - 图标显示正确
   - 应用名称正确

## 桌面 Chrome 测试

1. 用 Chrome 打开 https://your-domain.vercel.app
2. 在地址栏右侧应该出现一个安装图标（电脑+向下箭头）
3. 点击安装图标
4. 确认安装对话框显示正确的名称和图标
5. 点击「安装」
6. 应用应该作为独立窗口打开
7. 确认：
   - 窗口无地址栏
   - 图标显示在任务栏/Dock
   - 应用名称正确

## 离线功能测试

### 首次加载（在线）

1. 用 Chrome 打开 https://your-domain.vercel.app
2. 等待页面完全加载
3. 打开 DevTools → Application → Service Workers
4. 确认 `/sw.js` 已注册并激活
5. 打开 DevTools → Application → Cache Storage
6. 确认缓存 `unapplauded-v0.6` 存在且包含预缓存的页面

### 离线测试

1. 确保应用已在线加载过（SW 已激活并缓存）
2. 打开 DevTools → Network → 勾选 "Offline"
3. 刷新页面
4. 确认：
   - 首页可以加载（从缓存）
   - 点击「进入博物馆」可以加载博物馆页
   - 之前保存的展品仍然显示（来自 localStorage）
   - 页面样式正常
5. 断开网络后尝试访问一个未缓存的页面
6. 确认显示离线提示页面："博物馆还在。你保存的展品在这个浏览器里，一直都在。"

### 部署更新测试

1. 部署新版本到 Vercel
2. 用已安装 PWA 的浏览器打开应用
3. 确认 Service Worker 更新（DevTools → Application → Service Workers）
4. 刷新页面，确认加载的是新版本
5. 确认旧缓存已被清理（DevTools → Application → Cache Storage）

### 调试：取消注册 Service Worker

1. 打开 DevTools → Application → Service Workers
2. 点击 "Unregister" 按钮
3. 刷新页面
4. 确认应用仍然正常工作（只是没有离线缓存）

## 已知限制

- **离线范围有限：** 应用外壳可离线访问，但创建新展品需要网络（模板生成在客户端完成，实际不需要网络）
- **数据本地存储：** 展品保存在浏览器 localStorage 中，清除浏览器数据会丢失展品
- **无跨设备同步：** 不同设备之间的数据不互通
- **缓存更新：** 新版本部署后可能需要刷新一次才能看到最新内容
- **图标格式：** 提供 PNG 和 SVG 两种格式，PNG 用于最大兼容性，SVG 用于现代浏览器

## 图标文件说明

| 文件 | 尺寸 | 用途 |
|------|------|------|
| `icon-192.png` | 192×192 | Android Chrome 通知/安装图标 |
| `icon-512.png` | 512×512 | Android Chrome 启动画面 |
| `icon-maskable-512.png` | 512×512 | Android 自适应图标（maskable） |
| `apple-touch-icon.png` | 180×180 | iOS Safari 添加到主屏幕 |
| `icon-192.svg` | 192×192 | 现代浏览器 SVG 图标 |
| `icon-512.svg` | 512×512 | 现代浏览器 SVG 图标 |
| `icon-maskable.svg` | 512×512 | 现代浏览器 maskable SVG 图标 |
| `favicon.svg` | 32×32 | 浏览器标签页图标 |

## 故障排查

### 图标不显示
- 清除浏览器缓存后重试
- 检查图标文件是否可直接访问（如 https://your-domain.vercel.app/icon-192.png）
- 确认 manifest.webmanifest 中的图标路径正确

### 安装选项不出现
- 确认使用 HTTPS
- 确认 manifest.webmanifest 可访问且格式正确
- 在 Chrome DevTools → Application → Manifest 中检查错误
- 某些浏览器需要用户交互后才显示安装提示

### iOS 添加到主屏幕后图标不正确
- iOS Safari 使用 `apple-touch-icon.png`（180×180）
- 清除 Safari 缓存后重新添加
- 确认 `apple-touch-icon.png` 文件存在且可访问
