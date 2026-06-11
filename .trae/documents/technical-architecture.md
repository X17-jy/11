# 数据分析在线教育平台 技术架构文档

## 1. 项目架构

```
dataedu/
├── app.py              # Flask应用入口
├── static/
│   ├── css/
│   │   └── style.css   # 自定义样式
│   └── images/         # 静态图片
├── templates/
│   ├── base.html       # 基础模板
│   ├── index.html      # 首页
│   ├── courses.html    # 课程页
│   └── projects.html   # 项目页
└── requirements.txt    # 依赖文件
```

## 2. 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 后端 | Python 3.x + Flask | 轻量级Web框架 |
| 前端 | HTML5 + CSS3 + JavaScript | 标准Web技术 |
| UI框架 | Bootstrap 5 | 响应式CSS框架 |
| 字体 | Bootstrap Icons | 图标库 |

## 3. 路由定义

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | index.html | 首页 |
| `/courses` | courses.html | 课程列表页 |
| `/projects` | projects.html | 项目列表页 |

## 4. 页面模板结构

### 4.1 基础模板 (base.html)
- 顶部固定导航栏
- 内容区域 ({% block content %})
- 页脚

### 4.2 导航栏结构
```
- Logo: 数据分析平台
- 导航链接: 首页(/), 课程(/courses), 项目(/projects)
```

### 4.3 首页结构
- Hero区域：平台标语
- 平台介绍：三个核心价值点
- 课程推荐：4门精选课程卡片
- 项目推荐：3个实战项目卡片

### 4.4 课程页结构
- 页面标题
- 课程网格（4门课程卡片）
- 课程卡片：图标、标题、描述、标签

### 4.5 项目页结构
- 页面标题
- 项目网格（3个项目卡片）
- 项目卡片：图标、标题、描述、数据集说明、任务描述

## 5. 数据结构

### 5.1 课程数据
```python
courses = [
    {
        "icon": "bi-code-slash",
        "title": "Python数据分析基础",
        "description": "...",
        "tags": ["Pandas", "入门"]
    },
    ...
]
```

### 5.2 项目数据
```python
projects = [
    {
        "icon": "bi-graph-up",
        "title": "电商销售数据分析",
        "description": "...",
        "dataset": "...",
        "tasks": ["...", "..."]
    },
    ...
]
```

## 6. 静态资源

| 资源 | 来源 |
|------|------|
| Bootstrap 5 | CDN |
| Bootstrap Icons | CDN |
| 自定义样式 | static/css/style.css |
