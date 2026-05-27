# PWA 安装验证清单

版本：v0.5.1

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

## 已知限制

- **无离线支持：** 目前没有 Service Worker，需要网络连接才能使用
- **数据本地存储：** 展品保存在浏览器 localStorage 中，清除浏览器数据会丢失展品
- **无跨设备同步：** 不同设备之间的数据不互通
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
