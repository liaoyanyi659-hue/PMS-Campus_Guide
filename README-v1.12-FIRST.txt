PMS Explore v1.12 — Screenshot issue fix

安装：
1. 解压本 ZIP，将里面的全部文件和文件夹更新到 GitHub 网站原根目录（index.html 同一层）。
2. 等 GitHub Pages 更新完成，电脑按 Ctrl+F5；手机关闭旧页面再重新打开。
3. 查看页面源代码，mobile-layout.css、ui-system.css、forum.css、mobile-layout.js 应带 ?v=1.12。
4. 本包只更新前端，已经导入的 SQL 和后台 PHP 不需要重装。

修复：
- 论坛帖子标题和 Like / Comments / Delete / Pin / Hide / Report 文字不可见的问题。
- 通用深色按钮规则不再套用到透明帖子标题与浅色操作按钮。
- 论坛、资讯与 Admin 使用相同的紧凑页头；桌面时品牌、语言、账号/菜单排列同一行。
- 手机时工具栏换行，并保留原有控件、事件及四个固定底部导航。
- Logo 独立字号、内边距和不压缩宽度，避免 PMS / EXPLORE 裁切。
- Admin View website / Log out / 语言 / 菜单正确分组，不再产生空的页头行。
- Admin 导入按 UTF-8 字节数分批，每批不超过 60000 字节，修复原请求 74629 字节超过服务器 65536 限制。
- 所有本地 CSS / JS 加上统一版本号，避免新旧样式混用。

保留 v1.11 的巴士总站、Taxi、Vegas Technology、Ayam Gepuk Boss Ry 与全部原有功能。

验证：
已运行四页面三语言 DOM 检查、认证管理员模拟测试、论坛真实渲染函数的模拟数据测试（标题、操作按钮样式及评论弹窗）与文件引用检查。
尚未修改线上网站。浏览器无法访问本地测试服务器，因此未完成真实浏览器手机截图验收；模拟测试不代表已在 Hostinger 实际运行。

完整 UI / 语言 / 功能 / 安全审查仍待继续，本版先处理这三张截图中的故障。
