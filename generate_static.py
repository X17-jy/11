#!/usr/bin/env python3
"""
静态网站生成脚本
使用Flask应用上下文预渲染Jinja2模板为静态HTML
"""
import os
import shutil
from flask import Flask, render_template

# 创建Flask应用（仅用于渲染）
app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SERVER_NAME'] = 'localhost'
app.config['PREFERRED_URL_SCHEME'] = 'http'
app.config['APPLICATION_ROOT'] = '/'

# 注册简单路由用于静态生成
@app.route('/')
def index(): return render_template('index.html', courses=courses[:4], projects=projects[:3])

@app.route('/courses/')
@app.route('/courses.html')
def courses_page(): return render_template('courses.html', courses=courses)

@app.route('/projects/')
@app.route('/projects.html')
def projects_page(): return render_template('projects.html', projects=projects)

@app.route('/pandas-projects/')
@app.route('/pandas-projects.html')
def pandas_projects(): return render_template('pandas-projects-page.html', pandas_projects=pandas_projects)

# 数据
courses = [
    {"icon": "bi-code-slash", "title": "Python数据分析基础", "description": "学习Python数据分析的基本概念和方法，掌握数据读取、清洗、转换的基本技能，为后续深入学习打下坚实基础。", "tags": ["Pandas", "入门"]},
    {"icon": "bi-table", "title": "Pandas数据处理实战", "description": "深入掌握Pandas库进行数据清洗、转换、聚合和分析，学习处理缺失数据、数据透视表等高级操作。", "tags": ["Pandas", "进阶"]},
    {"icon": "bi-bar-chart-line", "title": "数据可视化与图表制作", "description": "使用Matplotlib和Seaborn创建专业的统计图表，包括折线图、柱状图、散点图、热力图等，让数据讲故事。", "tags": ["可视化", "图表"]},
    {"icon": "bi-briefcase", "title": "商务数据分析实战", "description": "运用数据分析技能解决真实商务问题，包括销售分析、客户分析、市场分析等，提升业务决策能力。", "tags": ["商务分析", "实战"]}
]

projects = [
    {"icon": "bi-shop", "title": "电商销售数据分析", "description": "分析电商平台销售数据，发现销售规律和增长机会。", "dataset": "包含订单数据、商品数据、用户数据，涵盖3个月的销售记录。", "tasks": ["数据清洗与预处理", "销售趋势分析", "品类销售排行", "用户购买行为分析"]},
    {"icon": "bi-people", "title": "客户流失预测分析", "description": "预测客户流失风险，帮助企业制定客户挽留策略。", "dataset": "包含客户基本信息、消费记录、行为日志等脱敏数据。", "tasks": ["特征工程与提取", "流失原因分析", "预测模型构建", "风险评估与可视化"]},
    {"icon": "bi-megaphone", "title": "市场营销效果分析", "description": "评估营销活动效果，优化市场投放策略和预算分配。", "dataset": "包含多渠道营销活动数据、广告投放数据、转化漏斗数据。", "tasks": ["ROI计算与分析", "渠道效果对比", "转化漏斗分析", "营销策略优化建议"]}
]

pandas_projects = [
    {"id": 1, "name": "数据清洗实战", "icon": "bi-eraser", "difficulty": "入门", "time": "30分钟", "description": "学习处理缺失值、重复值和异常值，掌握数据清洗的基本技能。"},
    {"id": 2, "name": "分组聚合分析", "icon": "bi-diagram-3", "difficulty": "入门", "time": "30分钟", "description": "使用groupby进行分组统计，分析不同维度的业务指标。"},
    {"id": 3, "name": "购物篮分析", "icon": "bi-basket", "difficulty": "进阶", "time": "45分钟", "description": "挖掘商品关联规则，发现顾客购买习惯。"},
    {"id": 4, "name": "客户聚类分析", "icon": "bi-people", "difficulty": "进阶", "time": "45分钟", "description": "使用KMeans对客户进行分群，实现精准营销。"},
    {"id": 5, "name": "数据可视化", "icon": "bi-bar-chart-steps", "difficulty": "进阶", "time": "45分钟", "description": "创建各种统计图表，让数据说话。"},
    {"id": 6, "name": "A/B测试分析", "icon": "bi-shuffle", "difficulty": "进阶", "time": "45分钟", "description": "进行显著性检验，评估A/B测试效果，帮助决策。"},
    {"id": 7, "name": "时间序列分析", "icon": "bi-graph-up-arrow", "difficulty": "进阶", "time": "45分钟", "description": "分析时间序列数据，识别趋势、季节性和周期性。"},
    {"id": 8, "name": "特征工程", "icon": "bi-tools", "difficulty": "高级", "time": "60分钟", "description": "学习特征构造、编码、标准化，为建模做准备。"},
    {"id": 9, "name": "异常值检测", "icon": "bi-exclamation-triangle", "difficulty": "高级", "time": "45分钟", "description": "使用多种方法检测数据中的异常值，提升数据质量。"},
    {"id": 10, "name": "多数据集合并", "icon": "bi-link-45deg", "difficulty": "进阶", "time": "45分钟", "description": "掌握各种数据合并与连接操作，整合多源数据。"}
]

# 创建build目录
build_dir = 'build'
if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.makedirs(build_dir)
os.makedirs(f'{build_dir}/css', exist_ok=True)
os.makedirs(f'{build_dir}/js', exist_ok=True)

def render_page(path, output_name, **context):
    """渲染模板并写入build目录"""
    with app.test_request_context(path=path):
        from flask import globals as _flask_globals
        html = _flask_globals.request.get_data()
        # 使用正确的请求上下文来渲染
        pass
    # 直接用 client 获取渲染结果
    with app.test_client() as client:
        response = client.get(path)
        html = response.get_data(as_text=True)
        filepath = os.path.join(build_dir, output_name)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Generated: {filepath}')

# 生成静态页面
render_page('/', 'index.html')
render_page('/courses/', 'courses.html')
render_page('/projects/', 'projects.html')
render_page('/pandas-projects/', 'pandas-projects.html')

# 复制静态资源
if os.path.exists('static/css/style.css'):
    shutil.copy('static/css/style.css', f'{build_dir}/css/style.css')
    print(f'Copied: {build_dir}/css/style.css')
if os.path.exists('static/css/pandas-projects.css'):
    shutil.copy('static/css/pandas-projects.css', f'{build_dir}/css/pandas-projects.css')
    print(f'Copied: {build_dir}/css/pandas-projects.css')
if os.path.exists('static/js/pandas-projects.js'):
    shutil.copy('static/js/pandas-projects.js', f'{build_dir}/js/pandas-projects.js')
    print(f'Copied: {build_dir}/js/pandas-projects.js')

print(f'\nStatic site generation complete!')
print(f'Build directory contents: {os.listdir(build_dir)}')
