"""
数据分析在线教育平台 - Flask应用
面向商务数据分析与应用专业学生
"""

from flask import Flask, render_template

app = Flask(__name__)

try:
    from flask_frozen import Freezer
    freezer = Freezer(app, output_dir='build')
    HAS_FREEZER = True
except ImportError:
    HAS_FREEZER = False

# 课程数据
courses = [
    {
        "icon": "bi-code-slash",
        "title": "Python数据分析基础",
        "description": "学习Python数据分析的基本概念和方法，掌握数据读取、清洗、转换的基本技能，为后续深入学习打下坚实基础。",
        "tags": ["Pandas", "入门"]
    },
    {
        "icon": "bi-table",
        "title": "Pandas数据处理实战",
        "description": "深入掌握Pandas库进行数据清洗、转换、聚合和分析，学习处理缺失数据、数据透视表等高级操作。",
        "tags": ["Pandas", "进阶"]
    },
    {
        "icon": "bi-bar-chart-line",
        "title": "数据可视化与图表制作",
        "description": "使用Matplotlib和Seaborn创建专业的统计图表，包括折线图、柱状图、散点图、热力图等，让数据讲故事。",
        "tags": ["可视化", "图表"]
    },
    {
        "icon": "bi-briefcase",
        "title": "商务数据分析实战",
        "description": "运用数据分析技能解决真实商务问题，包括销售分析、客户分析、市场分析等，提升业务决策能力。",
        "tags": ["商务分析", "实战"]
    }
]

# 项目数据
projects = [
    {
        "icon": "bi-shop",
        "title": "电商销售数据分析",
        "description": "分析电商平台销售数据，发现销售规律和增长机会。",
        "dataset": "包含订单数据、商品数据、用户数据，涵盖3个月的销售记录。",
        "tasks": ["数据清洗与预处理", "销售趋势分析", "品类销售排行", "用户购买行为分析"]
    },
    {
        "icon": "bi-people",
        "title": "客户流失预测分析",
        "description": "预测客户流失风险，帮助企业制定客户挽留策略。",
        "dataset": "包含客户基本信息、消费记录、行为日志等脱敏数据。",
        "tasks": ["特征工程与提取", "流失原因分析", "预测模型构建", "风险评估与可视化"]
    },
    {
        "icon": "bi-megaphone",
        "title": "市场营销效果分析",
        "description": "评估营销活动效果，优化市场投放策略和预算分配。",
        "dataset": "包含多渠道营销活动数据、广告投放数据、转化漏斗数据。",
        "tasks": ["ROI计算与分析", "渠道效果对比", "转化漏斗分析", "营销策略优化建议"]
    }
]


@app.route('/')
@app.route('/index.html')
def index():
    """首页"""
    return render_template('index.html', courses=courses[:4], projects=projects[:3])


@app.route('/courses')
@app.route('/courses.html')
def courses_page():
    """课程页"""
    return render_template('courses.html', courses=courses)


@app.route('/projects')
@app.route('/projects.html')
def projects_page():
    """项目页"""
    return render_template('projects.html', projects=projects)

@app.route('/pandas-projects')
@app.route('/pandas-projects.html')
def pandas_projects():
    """Pandas数据分析实战项目页"""
    return render_template('pandas-projects-page.html')


if HAS_FREEZER:
    @freezer.register_generator
    def url_generator():
        yield '/'
        yield '/index.html'
        yield '/courses.html'
        yield '/projects.html'
        yield '/pandas-projects.html'


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'freeze' and HAS_FREEZER:
        freezer.freeze()
    else:
        app.run(debug=True, host='0.0.0.0', port=5000)
