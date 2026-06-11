# Tasks

- [x] Task 1: 搭建 Flask 项目骨架与数据层
  - [x] SubTask 1.1: 创建项目根目录结构（`app.py`、`templates/`、`static/css/`、`static/images/`）
  - [x] SubTask 1.2: 在 `app.py` 中实现 Flask 应用工厂、路由占位、内置示例数据（4 门课程 + 4 个项目）
  - [x] SubTask 1.3: 编写 `requirements.txt`，仅声明 `flask` 依赖

- [x] Task 2: 实现基础模板与全局样式
  - [x] SubTask 2.1: 编写 `templates/base.html`，包含导航栏（首页/课程/项目）与页脚，以及 `{% block content %}` 占位
  - [x] SubTask 2.2: 编写 `static/css/style.css`，定义蓝白灰主题变量、通用布局、卡片、按钮、导航栏样式

- [x] Task 3: 实现首页 `/`
  - [x] SubTask 3.1: 创建 `templates/index.html` 继承 `base.html`
  - [x] SubTask 3.2: 实现 Banner（平台介绍 + CTA）、课程推荐区（3 张卡片）、项目推荐区（3 张卡片）、平台数据展示区

- [x] Task 4: 实现课程页
  - [x] SubTask 4.1: 在 `app.py` 实现 `/courses` 与 `/courses/<course_id>` 路由（含 404 处理）
  - [x] SubTask 4.2: 创建 `templates/courses.html` 课程列表网格
  - [x] SubTask 4.3: 创建 `templates/course_detail.html` 课程详情页

- [x] Task 5: 实现项目页
  - [x] SubTask 5.1: 在 `app.py` 实现 `/projects` 与 `/projects/<project_id>` 路由（含 404 处理）
  - [x] SubTask 5.2: 创建 `templates/projects.html` 项目列表网格
  - [x] SubTask 5.3: 创建 `templates/project_detail.html` 项目详情页（含项目说明 / 数据集介绍 / 任务描述三段式）

- [x] Task 6: 实现 404 错误页
  - [x] SubTask 6.1: 创建 `templates/404.html`
  - [x] SubTask 6.2: 在 `app.py` 注册 404 错误处理器

- [x] Task 7: 验证项目可运行
  - [x] SubTask 7.1: 安装依赖 `pip install -r requirements.txt`
  - [x] SubTask 7.2: 启动开发服务器 `python app.py` 并确认无报错
  - [x] SubTask 7.3: 通过 `curl` 或浏览器分别访问 `/`、`/courses`、`/courses/<id>`、`/projects`、`/projects/<id>`、`/notexist`，验证状态码与页面内容

# Task Dependencies
- Task 2 依赖 Task 1（先有骨架与数据才能写模板渲染）
- Task 3 依赖 Task 2
- Task 4 依赖 Task 2
- Task 5 依赖 Task 2
- Task 6 依赖 Task 1
- Task 7 依赖 Task 1 ~ Task 6 全部完成
