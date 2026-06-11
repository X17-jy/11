# DataInsight · 商务数据分析在线教育平台

> 面向商务数据分析与应用专业学生的数据分析在线教育平台 · 部署在 Cloudflare Pages

## 技术栈

- **前端**：纯 HTML / CSS / 原生 JavaScript（无构建步骤）
- **后端**：Cloudflare Pages Functions（基于 Workers）
- **Python 运行环境**：Pyodide（浏览器端 WebAssembly）
- **样式**：自定义 CSS（蓝白灰主题）
- **部署**：Cloudflare Pages（全球 CDN + Functions）

## 项目结构

```
.
├── functions/                 # Cloudflare Pages Functions（API）
│   ├── _data.js              # 课程、项目、用户数据
│   ├── _pandas_exercises.js  # Pandas 训练题数据
│   └── api/
│       ├── home.js           # GET /api/home
│       ├── user.js           # GET /api/user
│       ├── courses.js        # GET /api/courses
│       ├── projects.js       # GET /api/projects
│       ├── pandas.js         # GET /api/pandas
│       ├── courses/[course_id].js
│       ├── projects/[project_id].js
│       └── pandas/[exercise_id].js
├── public/                    # 静态资源
│   ├── index.html            # 首页
│   ├── courses.html          # 课程列表
│   ├── course.html           # 课程详情（通过 ?id=）
│   ├── projects.html         # 项目列表
│   ├── project.html          # 项目详情（通过 ?id=）
│   ├── pandas.html           # Pandas 训练页
│   └── css/
│       └── style.css         # 全局样式
├── package.json              # 项目配置
├── wrangler.toml             # Cloudflare 配置
└── README.md
```

## API 端点

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/home` | 首页数据（用户+推荐+统计） |
| GET | `/api/user` | 用户信息 |
| GET | `/api/courses` | 课程列表 |
| GET | `/api/courses/:id` | 课程详情 |
| GET | `/api/projects` | 项目列表 |
| GET | `/api/projects/:id` | 项目详情 |
| GET | `/api/pandas` | Pandas 训练列表 |
| GET | `/api/pandas/:id` | 单个练习详情（含答案） |

## 本地开发

```bash
# 安装 wrangler
npm install

# 启动本地开发服务器
npm run dev
# 访问 http://localhost:8788
```

## 部署到 Cloudflare Pages

### 方式一：通过 Git 连接（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选择仓库 `X17-jy/11`
4. 配置构建设置：
   - **Build command**: `npm run build`（或留空）
   - **Build output directory**: `public`
   - **Root directory**: `.`
5. 点击 **Save and Deploy**

部署后，访问类似 `https://datainsight.pages.dev` 的域名。

### 方式二：Wrangler CLI

```bash
# 登录
npx wrangler login

# 部署
npm run deploy
```

## 关键功能

### 1. 浏览器端 Python 运行环境

通过 Pyodide (WebAssembly)，用户可以在浏览器中直接运行 Python 代码，无需安装任何环境。
- Pandas + NumPy 预装
- 支持 print 输出捕获
- 支持 DataFrame 表格预览

### 2. 动态内容加载

所有页面通过 `fetch('/api/...')` 加载数据：
- 首页数据通过 `/api/home` 聚合
- 详情页通过 URL 参数 `?id=xxx` 加载
- 完整的错误处理和加载状态

### 3. 响应式设计

- 桌面、平板、手机完美适配
- 蓝白灰专业配色
- 流畅的动画和交互

## 与原 Flask 版本对比

| 原 Flask 版本 | 改造后 Cloudflare Pages |
|---|---|
| `app.py` (Flask 路由) | `functions/api/*.js` (Pages Functions) |
| `templates/*.html` (Jinja2) | `public/*.html` (纯 HTML) |
| `static/css/*` (Flask 静态) | `public/css/*` (Cloudflare 静态) |
| `url_for()` (动态路由) | `?id=xxx` (URL 参数) |
| 服务端渲染 (Jinja2) | 客户端 fetch + DOM 注入 |
| Pandas 练习无交互 | Pyodide 浏览器端执行 |

## 修改清单（如果从 Flask 版本迁移）

| 原文件 | 替换为 | 说明 |
|---|---|---|
| `app.py` | `functions/api/*.js` | 拆分为多个 Functions |
| `templates/base.html` | 各 HTML 文件内联 | 无模板继承 |
| `templates/index.html` | `public/index.html` | 移除所有 Jinja2 语法 |
| `templates/courses.html` | `public/courses.html` | 客户端 fetch 加载 |
| `templates/projects.html` | `public/projects.html` | 客户端 fetch 加载 |
| `templates/course_detail.html` | `public/course.html` | 通过 `?id=` 加载 |
| `templates/project_detail.html` | `public/project.html` | 通过 `?id=` 加载 |
| `templates/pandas_*.html` | `public/pandas.html` | 集成 Pyodide |
| `requirements.txt` | 删除 | 无需 Python 后端 |

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Pyodide 需要 WebAssembly 支持，现代浏览器均已支持。

## 许可证

MIT
