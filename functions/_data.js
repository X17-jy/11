// 课程数据
export const COURSES = [
  {
    id: "pandas-fundamentals",
    name: "Pandas 数据分析基础",
    category: "Pandas",
    level: "入门",
    duration: "32 学时",
    summary: "从零开始掌握 Pandas 核心数据结构 Series 与 DataFrame，学会数据读取、清洗、聚合与分组运算。",
    objectives: [
      "熟练使用 Series 与 DataFrame 进行数据操作",
      "掌握数据清洗、缺失值处理、重复值处理的常用方法",
      "熟练使用 groupby、merge、pivot_table 进行数据聚合",
      "能够独立完成一份结构化数据的探索性分析"
    ],
    chapters: [
      "第 1 章 Pandas 快速上手：数据结构与基础操作",
      "第 2 章 数据读取与写入：CSV / Excel / SQL",
      "第 3 章 数据清洗：缺失值、异常值、重复值",
      "第 4 章 数据变换：映射、替换、离散化",
      "第 5 章 分组聚合：groupby 与 agg",
      "第 6 章 多表合并：merge / join / concat",
      "第 7 章 时间序列：日期类型与重采样"
    ],
    audience: [
      "商务数据分析与应用专业大一、大二学生",
      "零编程基础，希望系统入门 Python 数据分析的初学者",
      "需要处理 Excel 报表、希望提升效率的商科同学"
    ],
    outcomes: [
      "能够使用 Pandas 完成日常业务数据的清洗与汇总",
      "具备解决真实业务数据问题的能力",
      "为后续学习数据可视化与机器学习打下基础"
    ]
  },
  {
    id: "data-visualization",
    name: "Python 数据可视化实战",
    category: "数据可视化",
    level: "进阶",
    duration: "28 学时",
    summary: "系统学习 Matplotlib 与 Seaborn，从基础图表到商务可视化作品，掌握用图表讲好数据故事的能力。",
    objectives: [
      "掌握 Matplotlib 的 Figure / Axes 体系与底层 API",
      "熟练使用 Seaborn 绘制统计图表",
      "能够根据业务场景选择合适的图表类型",
      "掌握商务级仪表盘的设计与排版原则"
    ],
    chapters: [
      "第 1 章 Matplotlib 基础：折线图、柱状图、饼图",
      "第 2 章 图表美化：颜色、字体、注释、子图布局",
      "第 3 章 Seaborn 统计图：分布图、关系图、分类图",
      "第 4 章 商务可视化：KPI 卡片、趋势对比、构成分析",
      "第 5 章 综合实战：销售仪表盘"
    ],
    audience: [
      "已完成 Pandas 基础学习的同学",
      "需要制作商务分析报告、毕业设计的同学",
      "希望提升数据表达能力的数据岗求职者"
    ],
    outcomes: [
      "能够独立完成一份商务分析可视化报告",
      "掌握图表选择与故事化呈现技巧",
      "形成美观专业的可视化作品集"
    ]
  },
  {
    id: "business-data-analysis",
    name: "商务数据分析方法论",
    category: "商务数据分析",
    level: "进阶",
    duration: "40 学时",
    summary: "结合真实商务场景，学习用户画像、RFM 模型、漏斗分析、留存分析等经典方法论与 Python 实现。",
    objectives: [
      "理解常用商务分析模型与指标体系",
      "掌握用户行为分析、运营分析的核心思路",
      "能够使用 Python 实现 RFM、漏斗、留存等分析",
      "具备从数据中发现业务洞察的能力"
    ],
    chapters: [
      "第 1 章 商务数据分析思维：指标、维度、漏斗",
      "第 2 章 用户画像与标签体系",
      "第 3 章 RFM 用户分群模型",
      "第 4 章 漏斗分析与转化率优化",
      "第 5 章 留存分析与 Cohort 表",
      "第 6 章 A/B 测试与显著性检验",
      "第 7 章 综合实战：电商运营分析报告"
    ],
    audience: [
      "商务数据分析与应用专业高年级学生",
      "希望从事数据分析、用户增长、运营分析岗位的同学",
      "希望将分析方法论与 Python 工具结合的从业者"
    ],
    outcomes: [
      "建立完整的商务数据分析知识体系",
      "能够针对具体业务问题选择合适的分析方法",
      "形成可写入简历的实战项目作品"
    ]
  },
  {
    id: "sql-for-analytics",
    name: "数据分析 SQL 进阶",
    category: "SQL",
    level: "入门",
    duration: "24 学时",
    summary: "聚焦数据分析场景的 SQL 技能，掌握窗口函数、复杂联表与性能优化基础。",
    objectives: [
      "熟练使用 SQL 进行多表关联与子查询",
      "掌握窗口函数在排行、累计、同比场景的应用",
      "了解 SQL 执行计划与基础优化思路",
      "能够在 Python 中通过 SQLAlchemy 操作数据库"
    ],
    chapters: [
      "第 1 章 SQL 回顾：SELECT / WHERE / GROUP BY",
      "第 2 章 多表连接：INNER / LEFT / FULL JOIN",
      "第 3 章 窗口函数：ROW_NUMBER / RANK / LAG / LEAD",
      "第 4 章 CTE 与递归查询",
      "第 5 章 Python + SQLAlchemy 数据分析工作流"
    ],
    audience: [
      "数据分析方向的学生与初学者",
      "希望补齐 SQL 短板的产品、运营同学"
    ],
    outcomes: [
      "能够使用 SQL 独立完成业务数据提取与分析",
      "为后续学习数据仓库与大数据分析打下基础"
    ]
  }
];

export const PROJECTS = [
  {
    id: "ecommerce-rfm",
    name: "电商用户 RFM 分群与运营策略",
    industry: "电商零售",
    scale: "约 50 万条订单记录",
    level: "进阶",
    summary: "基于某电商平台一年交易数据，构建 RFM 模型对用户进行分群，并针对不同分群提出运营策略建议。",
    description: "电商平台积累了大量的用户交易数据，如何从历史订单中发现高价值用户、识别流失风险用户，是精细化运营的关键。本项目以电商业务为背景，带学生完整经历\"业务问题 → 数据理解 → 指标构建 → 模型实现 → 策略输出\"的全流程，掌握 RFM 这一经典用户分群方法。",
    objectives: [
      "理解电商业务的核心指标：GMV、ARPU、复购率、客单价",
      "能够基于订单数据计算 R / F / M 三个维度的得分",
      "使用 K-Means 或分位数方法完成用户分群",
      "针对不同分群提出可落地的运营策略"
    ],
    dataset: {
      source: "开源电商交易模拟数据集（Kaggle / UCI 公开数据集改造）",
      scale: "约 50 万条订单记录，涵盖约 4 万名用户，时间跨度 1 年",
      fields: [
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
    tasks: [
      "任务 1：数据探索：使用 Pandas 读取订单数据，统计总订单数、用户数、时间区间，绘制订单趋势图",
      "任务 2：指标计算：计算每位用户的最近一次下单时间、累计消费金额、下单频次，得到 R / F / M 原始值",
      "任务 3：分群建模：使用分位数打分法将 R / F / M 量化为 1-5 分，相加得到 RFM 得分，按得分划分用户分群",
      "任务 4：可视化呈现：使用 Seaborn 绘制各分群用户数、贡献 GMV 的对比图，输出用户画像",
      "任务 5：策略建议：针对高价值客户、潜力客户、流失风险客户分别给出 1-2 条可落地的运营策略"
    ]
  },
  {
    id: "marketing-funnel",
    name: "互联网产品营销漏斗与转化分析",
    industry: "互联网产品",
    scale: "约 20 万条用户行为日志",
    level: "进阶",
    summary: "分析某互联网产品从曝光、点击、注册到付费的完整漏斗，定位转化率瓶颈环节并提出优化建议。",
    description: "漏斗分析是互联网产品运营的核心方法之一。本项目以一个典型的 SaaS 产品为背景，分析用户从首次曝光到最终付费的完整路径，计算各环节转化率，定位流失最严重的环节，并基于用户分群探索不同来源用户的转化差异。",
    objectives: [
      "理解漏斗分析在互联网产品中的应用",
      "能够使用 Python 构建多步骤漏斗模型",
      "掌握按用户分群对比转化率的方法",
      "具备从数据中提出产品优化建议的能力"
    ],
    dataset: {
      source: "模拟 SaaS 产品埋点日志",
      scale: "约 20 万条用户行为事件，覆盖 5 万名用户",
      fields: [
        "UserID：用户编号",
        "EventTime：事件发生时间",
        "EventType：事件类型（exposure / click / register / activate / pay）",
        "Source：流量来源（搜索 / 信息流 / 投放 / 自然访问）",
        "Device：设备类型（iOS / Android / Web）"
      ]
    },
    tasks: [
      "任务 1：构建漏斗：按事件类型统计唯一用户数，计算各环节相对上一环节的转化率与整体转化率",
      "任务 2：分群分析：按流量来源、设备类型分别构建漏斗，绘制对比图找出高转化渠道",
      "任务 3：流失用户画像：分析从点击到注册流失用户的特征，是否集中在特定渠道或设备",
      "任务 4：优化建议：基于数据结论，从产品、运营、渠道三方面提出 3 条优化建议"
    ]
  },
  {
    id: "retail-sales-prediction",
    name: "零售门店销量预测与库存优化",
    industry: "零售连锁",
    scale: "约 10 万条日销售记录",
    level: "进阶",
    summary: "基于历史日销售数据，预测门店未来 30 天销量，并给出库存补货建议。",
    description: "零售门店的销量受促销活动、节假日、天气等多重因素影响，准确的需求预测可以显著降低缺货与积压成本。本项目以一家连锁便利店为背景，使用 Python 完成从数据预处理、特征工程到模型训练与评估的完整流程，预测门店未来销量。",
    objectives: [
      "掌握时间序列特征工程方法",
      "能够使用 Scikit-learn 构建销量预测回归模型",
      "理解评估指标 MAE、RMSE、MAPE 的业务含义",
      "能够将预测结果转化为库存补货建议"
    ],
    dataset: {
      source: "模拟便利店 2 年日销售数据",
      scale: "约 10 万条日销售记录，涵盖 50 家门店、200 个 SKU",
      fields: [
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
    tasks: [
      "任务 1：数据探索：分析整体销量趋势、季节性、促销日效应",
      "任务 2：特征工程：构造日期特征、滞后特征、滚动均值特征",
      "任务 3：建模训练：使用 RandomForest 或 LightGBM 训练销量预测模型，使用时间切分评估",
      "任务 4：未来 30 天预测：对单店单 SKU 输出预测销量曲线",
      "任务 5：库存建议：基于安全库存公式，给出补货数量与建议到货日"
    ]
  },
  {
    id: "user-retention-analysis",
    name: "App 用户留存与 Cohort 分析",
    industry: "移动应用",
    scale: "约 30 万条用户活跃记录",
    level: "入门",
    summary: "对某 App 的新用户进行 Cohort 留存分析，识别影响留存的关键因素并提出产品改进建议。",
    description: "留存是衡量 App 健康度的核心指标。本项目以一款工具类 App 为背景，对新用户按注册周进行 Cohort 分组，绘制留存热力图，分析不同来源、不同首日行为对新用户次日及 7 日留存的影响。",
    objectives: [
      "理解 Cohort 留存分析的核心概念",
      "能够使用 Pandas 构造 Cohort 表并绘制热力图",
      "掌握按用户属性对比留存差异的方法",
      "能够基于数据提出产品改进建议"
    ],
    dataset: {
      source: "模拟 App 用户活跃日志",
      scale: "约 30 万条用户活跃记录，覆盖 8 万名新用户",
      fields: [
        "UserID：用户编号",
        "RegisterDate：注册日期",
        "ActiveDate：活跃日期",
        "Channel：注册渠道",
        "Device：设备平台",
        "FirstAction：首日核心行为（完成引导 / 跳过引导）"
      ]
    },
    tasks: [
      "任务 1：构造 Cohort 表：按注册周分组，统计后续每周的活跃用户数与留存率",
      "任务 2：绘制留存热力图：使用 Seaborn heatmap 呈现 Cohort × 周次的留存矩阵",
      "任务 3：分群对比：按注册渠道、设备平台、首日行为分别对比次日留存与 7 日留存",
      "任务 4：AHA 时刻分析：探索首日完成特定动作用户的留存是否显著更高",
      "任务 5：产品建议：基于以上结论，提出 2-3 条产品改进建议"
    ]
  }
];

export const STATS = [
  { label: "精品课程", value: "30+" },
  { label: "实战项目", value: "20+" },
  { label: "在校学员", value: "5,000+" },
  { label: "合作院校", value: "50+" }
];

export const USER_PROFILE = {
  name: "xjy",
  school: "广东科学技术职业学院",
  department: "商学院",
  major: "商务数据分析与应用专业",
  avatar: "👨‍🎓",
  bio: "热爱数据分析，致力于用数据驱动商业决策。通过这个平台分享学习心得，与大家一起成长！",
  badge: "学生"
};
