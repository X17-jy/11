"""
商务数据分析在线教育平台
面向商务数据分析与应用专业学生的数据分析在线教育平台网站
"""
from flask import Flask, render_template, abort

app = Flask(__name__)


# ==================== 示例数据 ====================

COURSES = [
    {
        "id": "pandas-fundamentals",
        "name": "Pandas 数据分析基础",
        "category": "Pandas",
        "level": "入门",
        "duration": "32 学时",
        "summary": "从零开始掌握 Pandas 核心数据结构 Series 与 DataFrame，学会数据读取、清洗、聚合与分组运算。",
        "objectives": [
            "熟练使用 Series 与 DataFrame 进行数据操作",
            "掌握数据清洗、缺失值处理、重复值处理的常用方法",
            "熟练使用 groupby、merge、pivot_table 进行数据聚合",
            "能够独立完成一份结构化数据的探索性分析"
        ],
        "chapters": [
            "第 1 章 Pandas 快速上手：数据结构与基础操作",
            "第 2 章 数据读取与写入：CSV / Excel / SQL",
            "第 3 章 数据清洗：缺失值、异常值、重复值",
            "第 4 章 数据变换：映射、替换、离散化",
            "第 5 章 分组聚合：groupby 与 agg",
            "第 6 章 多表合并：merge / join / concat",
            "第 7 章 时间序列：日期类型与重采样"
        ],
        "audience": [
            "商务数据分析与应用专业大一、大二学生",
            "零编程基础，希望系统入门 Python 数据分析的初学者",
            "需要处理 Excel 报表、希望提升效率的商科同学"
        ],
        "outcomes": [
            "能够使用 Pandas 完成日常业务数据的清洗与汇总",
            "具备解决真实业务数据问题的能力",
            "为后续学习数据可视化与机器学习打下基础"
        ]
    },
    {
        "id": "data-visualization",
        "name": "Python 数据可视化实战",
        "category": "数据可视化",
        "level": "进阶",
        "duration": "28 学时",
        "summary": "系统学习 Matplotlib 与 Seaborn，从基础图表到商务可视化作品，掌握用图表讲好数据故事的能力。",
        "objectives": [
            "掌握 Matplotlib 的 Figure / Axes 体系与底层 API",
            "熟练使用 Seaborn 绘制统计图表",
            "能够根据业务场景选择合适的图表类型",
            "掌握商务级仪表盘的设计与排版原则"
        ],
        "chapters": [
            "第 1 章 Matplotlib 基础：折线图、柱状图、饼图",
            "第 2 章 图表美化：颜色、字体、注释、子图布局",
            "第 3 章 Seaborn 统计图：分布图、关系图、分类图",
            "第 4 章 商务可视化：KPI 卡片、趋势对比、构成分析",
            "第 5 章 综合实战：销售仪表盘"
        ],
        "audience": [
            "已完成 Pandas 基础学习的同学",
            "需要制作商务分析报告、毕业设计的同学",
            "希望提升数据表达能力的数据岗求职者"
        ],
        "outcomes": [
            "能够独立完成一份商务分析可视化报告",
            "掌握图表选择与故事化呈现技巧",
            "形成美观专业的可视化作品集"
        ]
    },
    {
        "id": "business-data-analysis",
        "name": "商务数据分析方法论",
        "category": "商务数据分析",
        "level": "进阶",
        "duration": "40 学时",
        "summary": "结合真实商务场景，学习用户画像、RFM 模型、漏斗分析、留存分析等经典方法论与 Python 实现。",
        "objectives": [
            "理解常用商务分析模型与指标体系",
            "掌握用户行为分析、运营分析的核心思路",
            "能够使用 Python 实现 RFM、漏斗、留存等分析",
            "具备从数据中发现业务洞察的能力"
        ],
        "chapters": [
            "第 1 章 商务数据分析思维：指标、维度、漏斗",
            "第 2 章 用户画像与标签体系",
            "第 3 章 RFM 用户分群模型",
            "第 4 章 漏斗分析与转化率优化",
            "第 5 章 留存分析与 Cohort 表",
            "第 6 章 A/B 测试与显著性检验",
            "第 7 章 综合实战：电商运营分析报告"
        ],
        "audience": [
            "商务数据分析与应用专业高年级学生",
            "希望从事数据分析、用户增长、运营分析岗位的同学",
            "希望将分析方法论与 Python 工具结合的从业者"
        ],
        "outcomes": [
            "建立完整的商务数据分析知识体系",
            "能够针对具体业务问题选择合适的分析方法",
            "形成可写入简历的实战项目作品"
        ]
    },
    {
        "id": "sql-for-analytics",
        "name": "数据分析 SQL 进阶",
        "category": "SQL",
        "level": "入门",
        "duration": "24 学时",
        "summary": "聚焦数据分析场景的 SQL 技能，掌握窗口函数、复杂联表与性能优化基础。",
        "objectives": [
            "熟练使用 SQL 进行多表关联与子查询",
            "掌握窗口函数在排行、累计、同比场景的应用",
            "了解 SQL 执行计划与基础优化思路",
            "能够在 Python 中通过 SQLAlchemy 操作数据库"
        ],
        "chapters": [
            "第 1 章 SQL 回顾：SELECT / WHERE / GROUP BY",
            "第 2 章 多表连接：INNER / LEFT / FULL JOIN",
            "第 3 章 窗口函数：ROW_NUMBER / RANK / LAG / LEAD",
            "第 4 章 CTE 与递归查询",
            "第 5 章 Python + SQLAlchemy 数据分析工作流"
        ],
        "audience": [
            "数据分析方向的学生与初学者",
            "希望补齐 SQL 短板的产品、运营同学"
        ],
        "outcomes": [
            "能够使用 SQL 独立完成业务数据提取与分析",
            "为后续学习数据仓库与大数据分析打下基础"
        ]
    }
]


PROJECTS = [
    {
        "id": "ecommerce-rfm",
        "name": "电商用户 RFM 分群与运营策略",
        "industry": "电商零售",
        "scale": "约 50 万条订单记录",
        "level": "进阶",
        "summary": "基于某电商平台一年交易数据，构建 RFM 模型对用户进行分群，并针对不同分群提出运营策略建议。",
        "description": (
            "电商平台积累了大量的用户交易数据，如何从历史订单中发现高价值用户、"
            "识别流失风险用户，是精细化运营的关键。本项目以电商业务为背景，"
            "带学生完整经历\"业务问题 → 数据理解 → 指标构建 → 模型实现 → 策略输出\"的"
            "全流程，掌握 RFM 这一经典用户分群方法。"
        ),
        "objectives": [
            "理解电商业务的核心指标：GMV、ARPU、复购率、客单价",
            "能够基于订单数据计算 R / F / M 三个维度的得分",
            "使用 K-Means 或分位数方法完成用户分群",
            "针对不同分群提出可落地的运营策略"
        ],
        "dataset": {
            "source": "开源电商交易模拟数据集（Kaggle / UCI 公开数据集改造）",
            "scale": "约 50 万条订单记录，涵盖约 4 万名用户，时间跨度 1 年",
            "fields": [
                "OrderID：订单编号",
                "UserID：用户编号",
                "OrderDate：下单时间",
                "ProductID：商品编号",
                "Quantity：购买数量",
                "UnitPrice：单价",
                "TotalAmount：订单金额",
                "Channel：下单渠道（Web / App / 小程序）"
            ]
        },
        "tasks": [
            "任务 1：数据探索：使用 Pandas 读取订单数据，统计总订单数、用户数、时间区间，绘制订单趋势图",
            "任务 2：指标计算：计算每位用户的最近一次下单时间、累计消费金额、下单频次，得到 R / F / M 原始值",
            "任务 3：分群建模：使用分位数打分法将 R / F / M 量化为 1-5 分，相加得到 RFM 得分，按得分划分用户分群",
            "任务 4：可视化呈现：使用 Seaborn 绘制各分群用户数、贡献 GMV 的对比图，输出用户画像",
            "任务 5：策略建议：针对高价值客户、潜力客户、流失风险客户分别给出 1-2 条可落地的运营策略"
        ]
    },
    {
        "id": "marketing-funnel",
        "name": "互联网产品营销漏斗与转化分析",
        "industry": "互联网产品",
        "scale": "约 20 万条用户行为日志",
        "level": "进阶",
        "summary": "分析某互联网产品从曝光、点击、注册到付费的完整漏斗，定位转化率瓶颈环节并提出优化建议。",
        "description": (
            "漏斗分析是互联网产品运营的核心方法之一。本项目以一个典型的 SaaS 产品为背景，"
            "分析用户从首次曝光到最终付费的完整路径，计算各环节转化率，"
            "定位流失最严重的环节，并基于用户分群探索不同来源用户的转化差异。"
        ),
        "objectives": [
            "理解漏斗分析在互联网产品中的应用",
            "能够使用 Python 构建多步骤漏斗模型",
            "掌握按用户分群对比转化率的方法",
            "具备从数据中提出产品优化建议的能力"
        ],
        "dataset": {
            "source": "模拟 SaaS 产品埋点日志",
            "scale": "约 20 万条用户行为事件，覆盖 5 万名用户",
            "fields": [
                "UserID：用户编号",
                "EventTime：事件发生时间",
                "EventType：事件类型（exposure / click / register / activate / pay）",
                "Source：流量来源（搜索 / 信息流 / 投放 / 自然访问）",
                "Device：设备类型（iOS / Android / Web）"
            ]
        },
        "tasks": [
            "任务 1：构建漏斗：按事件类型统计唯一用户数，计算各环节相对上一环节的转化率与整体转化率",
            "任务 2：分群分析：按流量来源、设备类型分别构建漏斗，绘制对比图找出高转化渠道",
            "任务 3：流失用户画像：分析从点击到注册流失用户的特征，是否集中在特定渠道或设备",
            "任务 4：优化建议：基于数据结论，从产品、运营、渠道三方面提出 3 条优化建议"
        ]
    },
    {
        "id": "retail-sales-prediction",
        "name": "零售门店销量预测与库存优化",
        "industry": "零售连锁",
        "scale": "约 10 万条日销售记录",
        "level": "进阶",
        "summary": "基于历史日销售数据，预测门店未来 30 天销量，并给出库存补货建议。",
        "description": (
            "零售门店的销量受促销活动、节假日、天气等多重因素影响，准确的需求预测可以显著"
            "降低缺货与积压成本。本项目以一家连锁便利店为背景，使用 Python 完成"
            "从数据预处理、特征工程到模型训练与评估的完整流程，预测门店未来销量。"
        ),
        "objectives": [
            "掌握时间序列特征工程方法",
            "能够使用 Scikit-learn 构建销量预测回归模型",
            "理解评估指标 MAE、RMSE、MAPE 的业务含义",
            "能够将预测结果转化为库存补货建议"
        ],
        "dataset": {
            "source": "模拟便利店 2 年日销售数据",
            "scale": "约 10 万条日销售记录，涵盖 50 家门店、200 个 SKU",
            "fields": [
                "Date：销售日期",
                "StoreID：门店编号",
                "SKU：商品编号",
                "Category：商品品类",
                "Sales：当日销量",
                "Price：当日售价",
                "Promotion：是否参与促销",
                "Holiday：是否节假日",
                "Weather：天气状况"
            ]
        },
        "tasks": [
            "任务 1：数据探索：分析整体销量趋势、季节性、促销日效应",
            "任务 2：特征工程：构造日期特征、滞后特征、滚动均值特征",
            "任务 3：建模训练：使用 RandomForest 或 LightGBM 训练销量预测模型，使用时间切分评估",
            "任务 4：未来 30 天预测：对单店单 SKU 输出预测销量曲线",
            "任务 5：库存建议：基于安全库存公式，给出补货数量与建议到货日"
        ]
    },
    {
        "id": "user-retention-analysis",
        "name": "App 用户留存与 Cohort 分析",
        "industry": "移动应用",
        "scale": "约 30 万条用户活跃记录",
        "level": "入门",
        "summary": "对某 App 的新用户进行 Cohort 留存分析，识别影响留存的关键因素并提出产品改进建议。",
        "description": (
            "留存是衡量 App 健康度的核心指标。本项目以一款工具类 App 为背景，"
            "对新用户按注册周进行 Cohort 分组，绘制留存热力图，分析不同来源、"
            "不同首日行为对新用户次日及 7 日留存的影响。"
        ),
        "objectives": [
            "理解 Cohort 留存分析的核心概念",
            "能够使用 Pandas 构造 Cohort 表并绘制热力图",
            "掌握按用户属性对比留存差异的方法",
            "能够基于数据提出产品改进建议"
        ],
        "dataset": {
            "source": "模拟 App 用户活跃日志",
            "scale": "约 30 万条用户活跃记录，覆盖 8 万名新用户",
            "fields": [
                "UserID：用户编号",
                "RegisterDate：注册日期",
                "ActiveDate：活跃日期",
                "Channel：注册渠道",
                "Device：设备平台",
                "FirstAction：首日核心行为（完成引导 / 跳过引导）"
            ]
        },
        "tasks": [
            "任务 1：构造 Cohort 表：按注册周分组，统计后续每周的活跃用户数与留存率",
            "任务 2：绘制留存热力图：使用 Seaborn heatmap 呈现 Cohort × 周次的留存矩阵",
            "任务 3：分群对比：按注册渠道、设备平台、首日行为分别对比次日留存与 7 日留存",
            "任务 4：AHA 时刻分析：探索首日完成特定动作用户的留存是否显著更高",
            "任务 5：产品建议：基于以上结论，提出 2-3 条产品改进建议"
        ]
    }
]


# ==================== Pandas 训练项目数据 ====================

PANDAS_EXERCISES = [
    {
        "id": 1,
        "title": "创建 DataFrame",
        "level": "入门",
        "duration": "5 分钟",
        "description": "学习如何从字典、列表创建 DataFrame，这是 Pandas 最基础的操作。",
        "instruction": "请创建一个包含学生信息的 DataFrame，包含 name（姓名）、age（年龄）、score（分数）三列，至少 3 条数据。",
        "hint": "使用 pd.DataFrame() 函数，传入字典或列表作为参数。",
        "starter_code": """import pandas as pd

# 在下方编写代码，创建一个学生信息的 DataFrame



# 显示 DataFrame
# df
""",
        "solution": """import pandas as pd

# 创建学生信息 DataFrame
data = {
    'name': ['张三', '李四', '王五'],
    'age': [20, 22, 21],
    'score': [85, 92, 78]
}
df = pd.DataFrame(data)
df
""",
        "expected_output": "一个包含 3 行 3 列的 DataFrame"
    },
    {
        "id": 2,
        "title": "读取 CSV 文件",
        "level": "入门",
        "duration": "8 分钟",
        "description": "学习使用 pd.read_csv() 读取数据，这是数据分析的第一步。",
        "instruction": "从给定的销售数据 CSV 字符串中读取数据，并显示前 5 行。",
        "hint": "使用 pd.read_csv() 配合 StringIO 来读取字符串形式的 CSV 数据。",
        "starter_code": """import pandas as pd
from io import StringIO

# 模拟销售数据 CSV
csv_data = '''
date,product,quantity,price
2024-01-01,苹果,100,5.5
2024-01-01,香蕉,150,3.2
2024-01-02,苹果,80,5.5
2024-01-02,橙子,120,4.8
2024-01-03,香蕉,200,3.2
2024-01-03,苹果,90,5.5
2024-01-04,橙子,150,4.8
2024-01-04,苹果,110,5.5
'''

# 在下方编写代码，读取 CSV 并显示前 5 行


""",
        "solution": """import pandas as pd
from io import StringIO

csv_data = '''
date,product,quantity,price
2024-01-01,苹果,100,5.5
2024-01-01,香蕉,150,3.2
2024-01-02,苹果,80,5.5
2024-01-02,橙子,120,4.8
2024-01-03,香蕉,200,3.2
2024-01-03,苹果,90,5.5
2024-01-04,橙子,150,4.8
2024-01-04,苹果,110,5.5
'''

df = pd.read_csv(StringIO(csv_data.strip()))
df.head()
""",
        "expected_output": "显示包含日期、产品、数量、价格的数据表"
    },
    {
        "id": 3,
        "title": "数据筛选与过滤",
        "level": "入门",
        "duration": "10 分钟",
        "description": "学习使用条件表达式筛选数据，提取满足条件的行。",
        "instruction": "从员工数据中筛选出年龄大于 25 且薪资高于 8000 的员工。",
        "hint": "使用 df[(条件1) & (条件2)] 进行多条件筛选。",
        "starter_code": """import pandas as pd

# 员工数据
data = {
    'name': ['张伟', '王芳', '李明', '赵丽', '刘强', '陈静'],
    'age': [28, 24, 32, 26, 35, 23],
    'department': ['技术', '市场', '技术', '人事', '技术', '市场'],
    'salary': [9500, 6500, 12000, 7500, 15000, 5800]
}
df = pd.DataFrame(data)

# 在下方编写代码，筛选年龄>25且薪资>8000的员工


""",
        "solution": """import pandas as pd

data = {
    'name': ['张伟', '王芳', '李明', '赵丽', '刘强', '陈静'],
    'age': [28, 24, 32, 26, 35, 23],
    'department': ['技术', '市场', '技术', '人事', '技术', '市场'],
    'salary': [9500, 6500, 12000, 7500, 15000, 5800]
}
df = pd.DataFrame(data)

# 筛选年龄>25且薪资>8000的员工
result = df[(df['age'] > 25) & (df['salary'] > 8000)]
result
""",
        "expected_output": "筛选出张伟、李明、刘强三位员工"
    },
    {
        "id": 4,
        "title": "数据排序与排名",
        "level": "入门",
        "duration": "8 分钟",
        "description": "学习使用 sort_values 和 rank 进行数据排序和排名。",
        "instruction": "将学生成绩按总分降序排列，并添加排名列。",
        "hint": "使用 sort_values(by=列名, ascending=False) 降序排列，使用 rank() 添加排名。",
        "starter_code": """import pandas as pd

# 学生成绩数据
data = {
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'math': [85, 92, 78, 88, 90],
    'english': [82, 88, 95, 76, 85],
    'chinese': [90, 85, 88, 92, 80]
}
df = pd.DataFrame(data)

# 在下方编写代码：
# 1. 计算总分列
# 2. 按总分降序排列
# 3. 添加排名列


""",
        "solution": """import pandas as pd

data = {
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'math': [85, 92, 78, 88, 90],
    'english': [82, 88, 95, 76, 85],
    'chinese': [90, 85, 88, 92, 80]
}
df = pd.DataFrame(data)

# 计算总分
df['total'] = df['math'] + df['english'] + df['chinese']

# 按总分降序排列
df = df.sort_values('total', ascending=False)

# 添加排名
df['rank'] = df['total'].rank(method='min', ascending=False).astype(int)
df
""",
        "expected_output": "李四排名第一，总分265"
    },
    {
        "id": 5,
        "title": "缺失值处理",
        "level": "进阶",
        "duration": "12 分钟",
        "description": "学习检测、删除和填充缺失值的多种方法。",
        "instruction": "处理订单数据中的缺失值：删除完全空的行，用均值填充金额缺失，用'未知'填充城市缺失。",
        "hint": "使用 dropna() 删除，fillna() 填充，isnull() 检测缺失值。",
        "starter_code": """import pandas as pd
import numpy as np

# 订单数据（含缺失值）
data = {
    'order_id': ['A001', 'A002', 'A003', 'A004', 'A005', 'A006'],
    'amount': [150, np.nan, 280, 320, np.nan, 450],
    'city': ['北京', '上海', np.nan, '广州', '深圳', np.nan],
    'status': ['完成', '完成', '取消', '完成', np.nan, '完成']
}
df = pd.DataFrame(data)

# 在下方编写代码处理缺失值：
# 1. 查看缺失值情况
# 2. 删除 status 完全为空的行
# 3. 用均值填充 amount 缺失
# 4. 用'未知'填充 city 缺失


""",
        "solution": """import pandas as pd
import numpy as np

data = {
    'order_id': ['A001', 'A002', 'A003', 'A004', 'A005', 'A006'],
    'amount': [150, np.nan, 280, 320, np.nan, 450],
    'city': ['北京', '上海', np.nan, '广州', '深圳', np.nan],
    'status': ['完成', '完成', '取消', '完成', np.nan, '完成']
}
df = pd.DataFrame(data)

# 查看缺失值
print("缺失值统计：")
print(df.isnull().sum())

# 删除 status 为空的行
df = df.dropna(subset=['status'])

# 用均值填充 amount
df['amount'] = df['amount'].fillna(df['amount'].mean())

# 用'未知'填充 city
df['city'] = df['city'].fillna('未知')

df
""",
        "expected_output": "处理后的数据无缺失值"
    },
    {
        "id": 6,
        "title": "分组聚合 groupby",
        "level": "进阶",
        "duration": "15 分钟",
        "description": "学习使用 groupby 进行数据分组和聚合统计。",
        "instruction": "统计各产品类别的总销售额、平均单价和订单数量。",
        "hint": "使用 df.groupby('列名').agg({'列': '聚合函数'}) 进行多列聚合。",
        "starter_code": """import pandas as pd

# 销售数据
data = {
    'order_id': range(1, 21),
    'category': ['电子产品', '服装', '食品', '电子产品', '服装', 
                 '食品', '电子产品', '服装', '食品', '电子产品',
                 '服装', '食品', '电子产品', '服装', '食品',
                 '电子产品', '服装', '食品', '电子产品', '服装'],
    'product': ['手机', 'T恤', '零食', '电脑', '裤子', '饮料', '平板', '外套', '水果', '耳机',
                '裙子', '蔬菜', '相机', '衬衫', '肉类', '音箱', '毛衣', '牛奶', '手表', '夹克'],
    'quantity': [2, 3, 5, 1, 2, 10, 1, 2, 8, 3, 1, 6, 1, 4, 3, 2, 2, 5, 1, 3],
    'unit_price': [3999, 89, 25, 5999, 199, 5, 2999, 299, 8, 599,
                   259, 4, 4999, 149, 35, 899, 189, 6, 2999, 399]
}
df = pd.DataFrame(data)
df['total'] = df['quantity'] * df['unit_price']

# 在下方编写代码：
# 按类别分组，统计总销售额、平均单价、订单数量


""",
        "solution": """import pandas as pd

data = {
    'order_id': range(1, 21),
    'category': ['电子产品', '服装', '食品', '电子产品', '服装', 
                 '食品', '电子产品', '服装', '食品', '电子产品',
                 '服装', '食品', '电子产品', '服装', '食品',
                 '电子产品', '服装', '食品', '电子产品', '服装'],
    'product': ['手机', 'T恤', '零食', '电脑', '裤子', '饮料', '平板', '外套', '水果', '耳机',
                '裙子', '蔬菜', '相机', '衬衫', '肉类', '音箱', '毛衣', '牛奶', '手表', '夹克'],
    'quantity': [2, 3, 5, 1, 2, 10, 1, 2, 8, 3, 1, 6, 1, 4, 3, 2, 2, 5, 1, 3],
    'unit_price': [3999, 89, 25, 5999, 199, 5, 2999, 299, 8, 599,
                   259, 4, 4999, 149, 35, 899, 189, 6, 2999, 399]
}
df = pd.DataFrame(data)
df['total'] = df['quantity'] * df['unit_price']

# 按类别分组统计
result = df.groupby('category').agg({
    'total': 'sum',
    'unit_price': 'mean',
    'order_id': 'count'
}).rename(columns={
    'total': '总销售额',
    'unit_price': '平均单价',
    'order_id': '订单数量'
})
result
""",
        "expected_output": "电子产品总销售额最高"
    },
    {
        "id": 7,
        "title": "数据合并 merge",
        "level": "进阶",
        "duration": "12 分钟",
        "description": "学习使用 merge 进行多表关联，类似 SQL JOIN。",
        "instruction": "将订单表和客户表合并，显示每个订单的客户姓名和城市。",
        "hint": "使用 pd.merge(df1, df2, on='关联列', how='连接方式')。",
        "starter_code": """import pandas as pd

# 订单表
orders = pd.DataFrame({
    'order_id': ['O001', 'O002', 'O003', 'O004', 'O005'],
    'customer_id': ['C001', 'C002', 'C001', 'C003', 'C002'],
    'product': ['手机', '电脑', '耳机', '平板', '键盘'],
    'amount': [3999, 5999, 599, 2999, 299]
})

# 客户表
customers = pd.DataFrame({
    'customer_id': ['C001', 'C002', 'C003', 'C004'],
    'name': ['张三', '李四', '王五', '赵六'],
    'city': ['北京', '上海', '广州', '深圳'],
    'level': ['VIP', '普通', 'VIP', '普通']
})

# 在下方编写代码：
# 合并订单表和客户表，显示订单详情和客户信息


""",
        "solution": """import pandas as pd

orders = pd.DataFrame({
    'order_id': ['O001', 'O002', 'O003', 'O004', 'O005'],
    'customer_id': ['C001', 'C002', 'C001', 'C003', 'C002'],
    'product': ['手机', '电脑', '耳机', '平板', '键盘'],
    'amount': [3999, 5999, 599, 2999, 299]
})

customers = pd.DataFrame({
    'customer_id': ['C001', 'C002', 'C003', 'C004'],
    'name': ['张三', '李四', '王五', '赵六'],
    'city': ['北京', '上海', '广州', '深圳'],
    'level': ['VIP', '普通', 'VIP', '普通']
})

# 合并订单和客户信息
result = pd.merge(orders, customers, on='customer_id', how='left')
result
""",
        "expected_output": "合并后显示订单和客户完整信息"
    },
    {
        "id": 8,
        "title": "数据透视表 pivot_table",
        "level": "进阶",
        "duration": "15 分钟",
        "description": "学习使用 pivot_table 创建数据透视表，进行多维数据分析。",
        "instruction": "创建一个透视表，按产品和地区统计销售额，并计算总计。",
        "hint": "使用 pd.pivot_table(df, values='值', index='行', columns='列', aggfunc='聚合函数')。",
        "starter_code": """import pandas as pd

# 销售数据
data = {
    'date': ['2024-01', '2024-01', '2024-01', '2024-01', '2024-02', '2024-02', '2024-02', '2024-02'],
    'region': ['华北', '华东', '华北', '华南', '华北', '华东', '华南', '华东'],
    'product': ['A', 'A', 'B', 'A', 'B', 'B', 'A', 'A'],
    'sales': [12000, 15000, 8000, 9000, 10000, 12000, 11000, 14000]
}
df = pd.DataFrame(data)

# 在下方编写代码：
# 创建透视表：行为地区，列为产品，值为销售额总和


""",
        "solution": """import pandas as pd

data = {
    'date': ['2024-01', '2024-01', '2024-01', '2024-01', '2024-02', '2024-02', '2024-02', '2024-02'],
    'region': ['华北', '华东', '华北', '华南', '华北', '华东', '华南', '华东'],
    'product': ['A', 'A', 'B', 'A', 'B', 'B', 'A', 'A'],
    'sales': [12000, 15000, 8000, 9000, 10000, 12000, 11000, 14000]
}
df = pd.DataFrame(data)

# 创建透视表
pivot = pd.pivot_table(
    df, 
    values='sales', 
    index='region', 
    columns='product', 
    aggfunc='sum',
    margins=True,
    margins_name='总计'
)
pivot
""",
        "expected_output": "透视表显示各地区各产品销售额"
    },
    {
        "id": 9,
        "title": "时间序列处理",
        "level": "进阶",
        "duration": "15 分钟",
        "description": "学习处理日期时间数据，进行时间序列分析。",
        "instruction": "将日期列转换为 datetime 类型，按月统计销售额，并计算环比增长率。",
        "hint": "使用 pd.to_datetime() 转换日期，dt 访问器提取时间部分，pct_change() 计算环比。",
        "starter_code": """import pandas as pd

# 每日销售数据
data = {
    'date': ['2024-01-05', '2024-01-12', '2024-01-20', '2024-02-03', '2024-02-15', 
             '2024-02-28', '2024-03-05', '2024-03-18', '2024-03-25', '2024-04-02'],
    'sales': [45000, 52000, 48000, 55000, 62000, 58000, 65000, 72000, 68000, 75000]
}
df = pd.DataFrame(data)

# 在下方编写代码：
# 1. 将 date 转为 datetime 类型
# 2. 设置 date 为索引
# 3. 按月重采样统计销售额
# 4. 计算环比增长率


""",
        "solution": """import pandas as pd

data = {
    'date': ['2024-01-05', '2024-01-12', '2024-01-20', '2024-02-03', '2024-02-15', 
             '2024-02-28', '2024-03-05', '2024-03-18', '2024-03-25', '2024-04-02'],
    'sales': [45000, 52000, 48000, 55000, 62000, 58000, 65000, 72000, 68000, 75000]
}
df = pd.DataFrame(data)

# 转换日期类型
df['date'] = pd.to_datetime(df['date'])

# 设置日期为索引
df = df.set_index('date')

# 按月重采样统计
monthly = df.resample('M').sum()

# 计算环比增长率
monthly['growth_rate'] = monthly['sales'].pct_change() * 100

monthly
""",
        "expected_output": "显示月度销售额和环比增长率"
    },
    {
        "id": 10,
        "title": "综合实战：销售数据分析",
        "level": "挑战",
        "duration": "25 分钟",
        "description": "综合运用所学知识，完成一个完整的销售数据分析任务。",
        "instruction": "分析销售数据，完成：1) 数据概览 2) 按产品类别统计销售额 3) 找出销售额 TOP3 产品 4) 分析月度销售趋势。",
        "hint": "综合运用 read_csv、groupby、sort_values、时间处理等技能。",
        "starter_code": """import pandas as pd
from io import StringIO

# 销售数据
csv_data = '''
order_date,product,category,quantity,unit_price
2024-01-05,手机,电子产品,2,3999
2024-01-08,T恤,服装,5,89
2024-01-12,零食,食品,10,25
2024-01-18,电脑,电子产品,1,5999
2024-01-25,裤子,服装,3,199
2024-02-03,饮料,食品,20,5
2024-02-10,平板,电子产品,1,2999
2024-02-18,外套,服装,2,299
2024-02-25,水果,食品,15,8
2024-03-05,耳机,电子产品,3,599
2024-03-12,裙子,服装,1,259
2024-03-20,蔬菜,食品,12,4
2024-03-28,相机,电子产品,1,4999
2024-04-05,衬衫,服装,4,149
2024-04-15,肉类,食品,8,35
'''

# 在下方编写代码完成分析：
# 1. 读取数据并计算销售额
# 2. 数据概览（行数、列数、数据类型）
# 3. 按类别统计销售额
# 4. 销售额 TOP3 产品
# 5. 月度销售趋势


""",
        "solution": """import pandas as pd
from io import StringIO

csv_data = '''
order_date,product,category,quantity,unit_price
2024-01-05,手机,电子产品,2,3999
2024-01-08,T恤,服装,5,89
2024-01-12,零食,食品,10,25
2024-01-18,电脑,电子产品,1,5999
2024-01-25,裤子,服装,3,199
2024-02-03,饮料,食品,20,5
2024-02-10,平板,电子产品,1,2999
2024-02-18,外套,服装,2,299
2024-02-25,水果,食品,15,8
2024-03-05,耳机,电子产品,3,599
2024-03-12,裙子,服装,1,259
2024-03-20,蔬菜,食品,12,4
2024-03-28,相机,电子产品,1,4999
2024-04-05,衬衫,服装,4,149
2024-04-15,肉类,食品,8,35
'''

# 1. 读取数据
df = pd.read_csv(StringIO(csv_data.strip()))
df['sales'] = df['quantity'] * df['unit_price']

# 2. 数据概览
print("=== 数据概览 ===")
print(f"行数: {len(df)}, 列数: {len(df.columns)}")
print(f"数据类型:\\n{df.dtypes}")

# 3. 按类别统计销售额
print("\\n=== 各类别销售额 ===")
category_sales = df.groupby('category')['sales'].sum().sort_values(ascending=False)
print(category_sales)

# 4. 销售额 TOP3 产品
print("\\n=== 销售额 TOP3 产品 ===")
top3 = df.groupby('product')['sales'].sum().nlargest(3)
print(top3)

# 5. 月度销售趋势
print("\\n=== 月度销售趋势 ===")
df['order_date'] = pd.to_datetime(df['order_date'])
df['month'] = df['order_date'].dt.to_period('M')
monthly = df.groupby('month')['sales'].sum()
print(monthly)
""",
        "expected_output": "完整的销售数据分析报告"
    }
]


# ==================== 路由 ====================

@app.route("/")
def index():
    """首页：平台介绍 + 推荐课程 + 推荐项目"""
    return render_template(
        "index.html",
        recommended_courses=COURSES[:3],
        recommended_projects=PROJECTS[:3],
        stats=[
            {"label": "精品课程", "value": "30+"},
            {"label": "实战项目", "value": "20+"},
            {"label": "在校学员", "value": "5,000+"},
            {"label": "合作院校", "value": "50+"},
        ]
    )


@app.route("/courses")
def courses():
    """课程列表页"""
    return render_template("courses.html", courses=COURSES)


@app.route("/courses/<course_id>")
def course_detail(course_id):
    """课程详情页"""
    course = next((c for c in COURSES if c["id"] == course_id), None)
    if course is None:
        abort(404)
    return render_template("course_detail.html", course=course)


@app.route("/projects")
def projects():
    """项目列表页"""
    return render_template("projects.html", projects=PROJECTS)


@app.route("/projects/<project_id>")
def project_detail(project_id):
    """项目详情页"""
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if project is None:
        abort(404)
    return render_template("project_detail.html", project=project)


@app.route("/pandas-training")
def pandas_training():
    """Pandas 数据分析训练项目首页"""
    return render_template("pandas_training.html", exercises=PANDAS_EXERCISES)


@app.route("/pandas-training/<int:exercise_id>")
def pandas_exercise(exercise_id):
    """单个练习页面"""
    exercise = next((e for e in PANDAS_EXERCISES if e["id"] == exercise_id), None)
    if exercise is None:
        abort(404)
    return render_template("pandas_exercise.html", exercise=exercise, total=len(PANDAS_EXERCISES))


# ==================== 错误处理 ====================

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# ==================== 启动 ====================

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
