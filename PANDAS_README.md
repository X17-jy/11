# Pandas数据分析实战模块 - 使用说明

## 已集成到项目中

模块已成功集成到你的网站中！访问 `/projects` 页面即可看到新增的 **Pandas数据分析实战** 区域。

---

## 文件说明

| 文件 | 路径 | 说明 |
|------|------|------|
| `pandas-projects.css` | `/workspace/static/css/` | 项目样式文件 |
| `pandas-projects.js` | `/workspace/static/js/` | 项目逻辑脚本 |
| `pandas-projects.html` | `/workspace/templates/` | 项目列表HTML组件 |

---

## 功能特性

1. **10个实战项目**
   - 数据清洗
   - 分组聚合分析
   - 购物篮分析
   - 客户聚类分析
   - 数据可视化
   - A/B测试分析
   - 时间序列分析
   - 特征工程
   - 异常值检测
   - 多数据集合并

2. **在线代码编辑器**
   - Monaco Editor（VS Code同款）
   - Python语法高亮
   - 代码自动格式化

3. **Pyodide运行环境**
   - 纯前端运行Python代码
   - 支持Pandas、NumPy等库
   - 无后端依赖

---

## 独立嵌入到其他网站

如果你想把这个模块嵌入到其他网站，只需：

### 1. 复制文件

复制以下文件到你的项目：
- `static/css/pandas-projects.css`
- `static/js/pandas-projects.js`

### 2. 复制HTML片段

```html
<!-- 引入CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
<link href="pandas-projects.css" rel="stylesheet">

<!-- 引入项目列表组件（内容来自pandas-projects.html） -->
<div id="pd-projects-container">
    <!-- ... 复制 pandas-projects.html 的内容 ... -->
</div>

<!-- 引入JS -->
<script src="pandas-projects.js"></script>
```

---

## 项目运行说明

1. 点击任意项目卡片，进入在线编辑器
2. 等待Pyodide环境加载（首次约20-50MB下载）
3. 编辑或直接运行预置代码
4. 在下方查看运行结果

---

## 更新项目代码

如需修改项目内容，编辑 `/workspace/static/js/pandas-projects.js` 中的 `pdProjects` 数组。
