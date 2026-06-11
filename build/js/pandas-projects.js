// ====================
// Pandas实战项目模块
// 可直接嵌入现有网站
// ====================

// 10个项目数据
const pdProjects = [
    {
        id: 1,
        title: "数据清洗实战",
        icon: "bi-eraser",
        difficulty: "easy",
        duration: "30分钟",
        dataset: "retail_orders.csv",
        description: "学习处理缺失值、重复值和异常值，掌握数据清洗的基本技能。",
        tasks: [
            "加载并检查数据基本信息",
            "处理缺失值（填充/删除）",
            "查找并删除重复值",
            "检测并处理异常值",
            "导出清洗后的数据"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成模拟零售订单数据
np.random.seed(42)
n = 1000

# 使用权重抽样代替概率
products = ['A', 'B', 'C', 'D', 'Unknown']
product_weights = [24, 24, 24, 24, 4]
product_weights = np.array(product_weights) / 100.0

quantities = [1, 2, 3, 4, 5, 100]
quantity_weights = [19, 20, 20, 20, 20, 1]
quantity_weights = np.array(quantity_weights) / 100.0

# 生成产品 - 使用加权抽样
def weighted_choice(choices, weights, n):
    cumsum = np.cumsum(weights)
    idx = np.searchsorted(cumsum, np.random.rand(n))
    return [choices[i] for i in idx]

data = {
    'order_id': np.arange(1, n+1),
    'product': weighted_choice(products, product_weights, n),
    'quantity': weighted_choice(quantities, quantity_weights, n),
    'price': np.abs(np.random.normal(50, 15, n)).round(2),
}
# 添加客户
customers = [f'Cust_{i}' for i in range(1, 201)]
customer_weights = [0.98] * 200
customer_weights.append(0.02)
customer_weights = np.array(customer_weights)
data['customer'] = weighted_choice(customers + ['Unknown'], customer_weights, n)

df = pd.DataFrame(data)
# 添加缺失值
missing_idx = np.random.choice(df.index, 20, replace=False)
df.loc[missing_idx, 'quantity'] = np.nan

print("原始数据形状:", df.shape)
print("\\n前5行:")
print(df.head())
print("\\n缺失值统计:")
print(df.isnull().sum())
print("\\n重复值数量:", df.duplicated().sum())

# 2. 数据清洗
df_clean = df.copy()

# 处理缺失值
df_clean['product'] = df_clean['product'].fillna('Unknown')
df_clean['customer'] = df_clean['customer'].fillna('Unknown')
df_clean['quantity'] = df_clean['quantity'].fillna(df_clean['quantity'].median())

# 删除重复值
df_clean = df_clean.drop_duplicates()

# 处理异常值 (数量 > 20 视为异常)
q99 = df_clean['quantity'].quantile(0.99)
df_clean = df_clean[df_clean['quantity'] <= q99]

print("\\n===== 清洗后数据 =====")
print("数据形状:", df_clean.shape)
print("\\n缺失值统计:")
print(df_clean.isnull().sum())
print("\\n数据描述:")
print(df_clean.describe())
`
    },
    {
        id: 2,
        title: "分组聚合分析",
        icon: "bi-diagram-3",
        difficulty: "easy",
        duration: "30分钟",
        dataset: "retail_orders.csv",
        description: "使用groupby进行分组统计，分析不同维度的业务指标。",
        tasks: [
            "按产品分组统计销量和销售额",
            "计算客户购买频次",
            "多维度交叉分析",
            "排序筛选Top N",
            "可视化展示结果"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成数据
np.random.seed(42)
n = 2000
data = {
    'product': np.random.choice(['iPhone', 'MacBook', 'iPad', 'AirPods', 'Watch'], n),
    'category': np.random.choice(['手机', '电脑', '平板', '配件', '穿戴'], n),
    'region': np.random.choice(['华东', '华南', '华北', '西南', '西北'], n),
    'quantity': np.random.randint(1, 10, n),
    'price': np.abs(np.random.normal(2000, 1500, n)).round(2),
    'date': pd.date_range('2024-01-01', periods=n, freq='H')
}
df = pd.DataFrame(data)
df['sales'] = df['quantity'] * df['price']

print("数据预览:")
print(df.head())

# 2. 按产品分组统计
print("\\n===== 产品销售统计 =====")
product_stats = df.groupby('product').agg({
    'quantity': 'sum',
    'sales': ['sum', 'mean', 'count']
}).round(2)
product_stats.columns = ['销量', '总销售额', '平均单价', '订单数']
print(product_stats.sort_values('总销售额', ascending=False))

# 3. 按地区+品类分组
print("\\n===== 地区-品类交叉分析 =====")
region_cat = df.groupby(['region', 'category'])['sales'].sum().unstack().fillna(0)
print(region_cat.round(0))

# 4. Top 5 产品
print("\\n===== Top 5 产品（按销量） =====")
top5 = df.groupby('product')['quantity'].sum().nlargest(5)
print(top5)
`
    },
    {
        id: 3,
        title: "购物篮分析",
        icon: "bi-basket",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "market_basket.csv",
        description: "挖掘商品关联规则，发现顾客购买习惯。",
        tasks: [
            "数据预处理与转换",
            "计算商品支持度",
            "挖掘关联规则",
            "筛选高置信度规则",
            "分析结果并给出建议"
        ],
        initialCode: `import pandas as pd
import numpy as np
from itertools import combinations

# 1. 生成购物篮数据
np.random.seed(42)
products = ['牛奶', '面包', '鸡蛋', '啤酒', '尿布', '薯片', '可乐', '饼干']
transactions = []
for _ in range(1000):
    basket_size = np.random.randint(1, 6)
    basket = list(np.random.choice(products, basket_size, replace=False))
    transactions.append(basket)

print("购物篮数据（前5笔）:")
for i, t in enumerate(transactions[:5]):
    print(f"订单{i+1}: {t}")

# 2. 计算商品支持度
all_items = [item for t in transactions for item in t]
item_counts = {}
for item in all_items:
    item_counts[item] = item_counts.get(item, 0) + 1

support = {item: count / len(transactions) for item, count in item_counts.items()}
print("\\n===== 商品支持度 =====")
for item, sup in sorted(support.items(), key=lambda x: -x[1]):
    print(f"{item}: {sup:.3f}")

# 3. 简单关联规则挖掘 (二阶)
print("\\n===== 商品组合出现频率（Top 10） =====")
pairs = []
for t in transactions:
    if len(t) >= 2:
        for pair in combinations(sorted(t), 2):
            pairs.append(pair)

pair_counts = {}
for pair in pairs:
    pair_counts[pair] = pair_counts.get(pair, 0) + 1

for (a, b), cnt in sorted(pair_counts.items(), key=lambda x: -x[1])[:10]:
    support_ab = cnt / len(transactions)
    confidence = cnt / item_counts[a]
    print(f"{a} -> {b}: 支持度={support_ab:.3f}, 置信度={confidence:.3f}")
`
    },
    {
        id: 4,
        title: "客户聚类分析",
        icon: "bi-people",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "customer_features.csv",
        description: "使用KMeans对客户进行分群，实现精准营销。",
        tasks: [
            "特征标准化处理",
            "确定最佳聚类数",
            "KMeans聚类建模",
            "分析各客户群特征",
            "给出运营建议"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成客户特征数据
np.random.seed(42)
n = 500
data = {
    'customer_id': range(1, n+1),
    'recency': np.random.randint(1, 365, n),
    'frequency': np.random.randint(1, 50, n),
    'monetary': np.random.lognormal(6, 1, n).round(2),
    'avg_order_value': np.random.lognormal(4, 0.8, n).round(2)
}
df = pd.DataFrame(data)

print("客户特征数据预览:")
print(df.head())
print("\\n描述性统计:")
print(df.describe())

# 2. 简单聚类实现 (不使用sklearn)
def simple_kmeans(X, k, n_init=10):
    best_labels = None
    best_centers = None
    best_inertia = float('inf')
    
    for _ in range(n_init):
        # 随机选k个点作为初始中心
        idx = np.random.choice(len(X), k, replace=False)
        centers = X[idx].copy()
        
        for _ in range(100):
            # 计算距离
            distances = np.zeros((len(X), k))
            for j in range(k):
                distances[:, j] = np.sqrt(((X - centers[j]) ** 2).sum(axis=1))
            
            # 分配标签
            labels = distances.argmin(axis=1)
            
            # 更新中心
            new_centers = np.array([X[labels == j].mean(axis=0) for j in range(k)])
            
            if np.allclose(centers, new_centers):
                break
            centers = new_centers
        
        # 计算惯性
        inertia = ((X - centers[labels]) ** 2).sum()
        if inertia < best_inertia:
            best_inertia = inertia
            best_labels = labels
            best_centers = centers
    
    return best_labels, best_centers

# 标准化特征
features = ['recency', 'frequency', 'monetary', 'avg_order_value']
X = df[features].values
X_scaled = (X - X.mean(axis=0)) / X.std(axis=0)

# 聚类
labels, centers = simple_kmeans(X_scaled, k=4)

df['cluster'] = labels

print("\\n===== 客户分群结果 =====")
cluster_stats = df.groupby('cluster').agg({
    'recency': 'mean',
    'frequency': 'mean',
    'monetary': 'mean',
    'customer_id': 'count'
}).round(2)
cluster_stats.columns = ['平均最近购买(天)', '平均购买频次', '平均消费金额', '客户数']
print(cluster_stats)

# 3. 定义客户类型
print("\\n===== 客户群体标签 =====")
print("0: 高价值活跃客户")
print("1: 新客户") 
print("2: 重要挽留客户")
print("3: 一般客户")
`
    },
    {
        id: 5,
        title: "数据可视化",
        icon: "bi-bar-chart-steps",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "retail_orders.csv",
        description: "使用Matplotlib创建各种统计图表，让数据说话。",
        tasks: [
            "折线图展示趋势",
            "柱状图对比分析",
            "饼图展示占比",
            "散点图分析相关性",
            "组合图表综合展示"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
n = len(dates)
data = {
    'date': dates,
    'sales': np.random.normal(10000, 2000, n).cumsum() / 10 + 50000,
    'orders': np.random.poisson(50, n),
    'traffic': np.random.randint(1000, 5000, n)
}
df = pd.DataFrame(data)

print("数据预览:")
print(df.head())

# 2. 简单文本可视化展示
print("\\n===== 销售数据年度汇总 =====")
df['month'] = df['date'].dt.month
monthly = df.groupby('month')['orders'].sum()
print("月度订单量:")
for m, o in monthly.items():
    bar = "█" * int(o / 100)
    print(f"{m:2d}月: {bar} {o}")

print("\\n===== 品类占比（模拟数据） =====")
categories = ['手机', '电脑', '配件', '服务', '其他']
sizes = [35, 25, 20, 12, 8]
total = sum(sizes)
for cat, size in zip(categories, sizes):
    pct = size / total * 100
    bar = "█" * int(pct / 2)
    print(f"{cat}: {bar} {pct:.1f}%")

print("\\n===== 流量与销量相关性 =====")
corr = df['traffic'].corr(df['sales'])
print(f"相关系数: {corr:.4f}")
print("相关性解读:", end=" ")
if corr > 0.7:
    print("强正相关")
elif corr > 0.4:
    print("中等正相关")
elif corr > 0:
    print("弱正相关")
elif corr > -0.4:
    print("弱负相关")
else:
    print("强负相关")

print("\\n===== 数据可视化说明 =====")
print("在完整的前端环境中，这些数据会以图表形式展示。")
print("本终端输出为文本形式的替代展示。")
`
    },
    {
        id: 6,
        title: "A/B测试分析",
        icon: "bi-shuffle",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "ab_test.csv",
        description: "进行显著性检验，评估A/B测试效果，帮助决策。",
        tasks: [
            "数据加载与探索",
            "计算核心指标",
            "假设检验（z检验）",
            "计算置信区间",
            "结论与建议"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成A/B测试数据
np.random.seed(42)
n_a, n_b = 5000, 5000

# A组（对照组）
conv_a = np.random.binomial(1, 0.10, n_a)
revenue_a = np.where(conv_a == 1, np.random.exponential(50, n_a), 0)

# B组（实验组）
conv_b = np.random.binomial(1, 0.12, n_b)
revenue_b = np.where(conv_b == 1, np.random.exponential(52, n_b), 0)

df = pd.DataFrame({
    'group': ['A'] * n_a + ['B'] * n_b,
    'converted': np.concatenate([conv_a, conv_b]),
    'revenue': np.concatenate([revenue_a, revenue_b])
})

print("A/B测试数据预览:")
print(df.head(10))

# 2. 核心指标统计
print("\\n===== 指标统计 =====")
results = df.groupby('group').agg({
    'converted': ['mean', 'sum', 'count'],
    'revenue': 'mean'
})
results.columns = ['转化率', '转化人数', '样本量', '人均收入']
print(results.round(4))

# 3. 简单统计显著性检验 (Z检验)
conv_rate_a = conv_a.mean()
conv_rate_b = conv_b.mean()
pooled_rate = (conv_a.sum() + conv_b.sum()) / (n_a + n_b)
se = np.sqrt(pooled_rate * (1 - pooled_rate) * (1/n_a + 1/n_b))
z_score = (conv_rate_b - conv_rate_a) / se
p_value = 2 * (1 - np.exp(-z_score**2 / 2))  # 近似

print("\\n===== 统计检验 =====")
print(f"Z值: {z_score:.4f}")
print(f"P值（近似）: {p_value:.6f}")

if p_value < 0.05:
    print("\\n结果显著！B组表现优于A组")
    lift = (conv_rate_b - conv_rate_a) / conv_rate_a * 100
    print(f"提升幅度: {lift:.2f}%")
    print("建议: 采纳B方案")
else:
    print("\\n结果不显著，无法判断差异")
    print("建议: 继续观察或增大样本量")
`
    },
    {
        id: 7,
        title: "时间序列分析",
        icon: "bi-graph-up-arrow",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "time_series_sales.csv",
        description: "分析时间序列数据，识别趋势、季节性和周期性。",
        tasks: [
            "时间序列可视化",
            "趋势分析",
            "移动平均平滑",
            "季节性分析",
            "简单预测"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成时间序列销售数据
np.random.seed(42)
dates = pd.date_range('2022-01-01', '2024-12-31', freq='D')
n = len(dates)

# 构建有趋势+季节+噪声的序列
trend = np.linspace(100, 200, n)
seasonal = 30 * np.sin(np.arange(n) * 2 * np.pi / 365)
noise = np.random.normal(0, 10, n)
sales = trend + seasonal + noise

df = pd.DataFrame({'date': dates, 'sales': sales})
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['dayofweek'] = df['date'].dt.dayofweek

print("时间序列数据预览:")
print(df.head())

# 2. 时间序列分析
print("\\n===== 年度统计 =====")
yearly = df.groupby('year')['sales'].agg(['mean', 'min', 'max'])
print(yearly.round(2))

print("\\n===== 月度平均（季节性） =====")
monthly = df.groupby('month')['sales'].mean()
month_names = ['1月', '2月', '3月', '4月', '5月', '6月', 
               '7月', '8月', '9月', '10月', '11月', '12月']
for m, val in monthly.items():
    bar = "█" * int(val / 5)
    print(f"{month_names[m-1]}: {bar} {val:.2f}")

print("\\n===== 周几平均 =====")
weekday_names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
weekday = df.groupby('dayofweek')['sales'].mean()
for i, val in enumerate(weekday):
    bar = "█" * int(val / 5)
    print(f"{weekday_names[i]}: {bar} {val:.2f}")

# 3. 移动平均
print("\\n===== 移动平均（最近10天） =====")
df['MA7'] = df['sales'].rolling(7).mean()
df['MA30'] = df['sales'].rolling(30).mean()
print(df[['date', 'sales', 'MA7', 'MA30']].tail(10).round(2))

# 4. 简单预测
print("\\n===== 简单预测 =====")
last_date = df['date'].max()
print(f"最后日期: {last_date.date()}")
print(f"30天移动平均: {df['MA30'].iloc[-1]:.2f}")
print(f"趋势值: {trend[-1]:.2f}")
`
    },
    {
        id: 8,
        title: "特征工程",
        icon: "bi-tools",
        difficulty: "hard",
        duration: "60分钟",
        dataset: "customer_features.csv",
        description: "学习特征构造、编码、标准化，为建模做准备。",
        tasks: [
            "特征构造与衍生",
            "类别特征编码",
            "数值特征标准化",
            "特征选择",
            "生成最终特征矩阵"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成原始客户数据
np.random.seed(42)
n = 1000
data = {
    'age': np.random.randint(18, 70, n),
    'gender': np.random.choice(['男', '女'], n),
    'city': np.random.choice(['北京', '上海', '广州', '深圳', '杭州'], n),
    'register_date': pd.date_range('2020-01-01', periods=n, freq='H'),
    'last_login': pd.date_range('2024-01-01', periods=n, freq='H'),
    'total_orders': np.random.randint(0, 50, n),
    'total_spent': np.random.lognormal(5, 1.5, n).round(2),
    'is_active': np.random.binomial(1, 0.7, n)
}
df = pd.DataFrame(data)

print("原始数据:")
print(df.head())
print(f"\\n原始特征数: {df.shape[1]}")

# 2. 特征工程
df_feat = df.copy()

# a) 时间特征
df_feat['days_since_register'] = (pd.Timestamp('2024-12-31') - df_feat['register_date']).dt.days
df_feat['days_since_login'] = (pd.Timestamp('2024-12-31') - df_feat['last_login']).dt.days
df_feat['month_register'] = df_feat['register_date'].dt.month

# b) 数值特征衍生
df_feat['avg_order_value'] = df_feat['total_spent'] / (df_feat['total_orders'] + 1)
df_feat['is_new'] = (df_feat['days_since_register'] < 30).astype(int)
df_feat['is_churn_risk'] = (df_feat['days_since_login'] > 30).astype(int)

# c) 分箱/分段
age_bins = [0, 25, 35, 45, 55, 100]
age_labels = ['18-25', '26-35', '36-45', '46-55', '55+']
df_feat['age_group'] = pd.cut(df_feat['age'], bins=age_bins, labels=age_labels)

# d) Label Encoding
gender_map = {'男': 0, '女': 1}
df_feat['gender_encoded'] = df_feat['gender'].map(gender_map)

city_map = {'北京': 0, '上海': 1, '广州': 2, '深圳': 3, '杭州': 4}
df_feat['city_encoded'] = df_feat['city'].map(city_map)

# e) 特征标准化
for col in ['age', 'total_orders', 'total_spent', 'avg_order_value']:
    mean_val = df_feat[col].mean()
    std_val = df_feat[col].std()
    df_feat[f'{col}_norm'] = (df_feat[col] - mean_val) / (std_val + 1e-8)

print(f"\\n===== 特征工程完成 =====")
print(f"新特征数: {df_feat.shape[1]}")
print("\\n新特征列表:")
print(list(df_feat.columns))
print("\\n处理后数据预览:")
print(df_feat[['age', 'age_group', 'avg_order_value', 'gender_encoded', 'city_encoded']].head(10))
`
    },
    {
        id: 9,
        title: "异常值检测",
        icon: "bi-exclamation-triangle",
        difficulty: "hard",
        duration: "45分钟",
        dataset: "customer_features.csv",
        description: "使用多种方法检测数据中的异常值，提升数据质量。",
        tasks: [
            "可视化探索异常",
            "3σ原则检测",
            "IQR方法检测",
            "Z-score方法",
            "综合处理策略"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成含异常值的数据
np.random.seed(42)
n = 1000
data = {
    'normal': np.random.normal(100, 10, n),
    'with_outliers': np.random.normal(100, 10, n),
    'spending': np.random.lognormal(5, 0.8, n),
    'orders': np.random.poisson(5, n)
}
df = pd.DataFrame(data)

# 注入异常值
outlier_idx = np.random.choice(df.index, 20, replace=False)
df.loc[outlier_idx[:10], 'with_outliers'] *= 3
df.loc[outlier_idx[10:], 'with_outliers'] /= 3
df.loc[np.random.choice(df.index, 15), 'spending'] *= 5

print("数据预览:")
print(df.head())

# 2. 统计描述
print("\\n===== 统计描述 =====")
print(df.describe())

# 3. 异常检测 - 3σ原则
def detect_3sigma(series):
    mean, std = series.mean(), series.std()
    lower, upper = mean - 3*std, mean + 3*std
    outliers = (series < lower) | (series > upper)
    return outliers, lower, upper

outliers_3sigma, low, high = detect_3sigma(df['with_outliers'])
print(f"\\n===== 3σ原则检测 =====")
print(f"正常范围: [{low:.2f}, {high:.2f}]")
print(f"异常值数量: {outliers_3sigma.sum()}")
print(f"异常值比例: {outliers_3sigma.mean()*100:.2f}%")

# 4. 异常检测 - IQR方法
def detect_iqr(series):
    Q1, Q3 = series.quantile([0.25, 0.75])
    IQR = Q3 - Q1
    lower, upper = Q1 - 1.5*IQR, Q3 + 1.5*IQR
    outliers = (series < lower) | (series > upper)
    return outliers, lower, upper

outliers_iqr, low, high = detect_iqr(df['spending'])
print(f"\\n===== IQR方法检测 =====")
print(f"正常范围: [{low:.2f}, {high:.2f}]")
print(f"异常值数量: {outliers_iqr.sum()}")

# 5. 异常检测 - Z-score
def detect_zscore(series, threshold=3):
    z_scores = (series - series.mean()) / series.std()
    outliers = abs(z_scores) > threshold
    return outliers, z_scores

outliers_z, z_scores = detect_zscore(df['with_outliers'])
print(f"\\n===== Z-score方法检测 =====")
print(f"最大Z-score: {z_scores.abs().max():.2f}")
print(f"异常值数量: {outliers_z.sum()}")

# 6. 综合处理策略
print("\\n===== 异常值处理策略 =====")
print("1. 删除：适用于明显错误且占比小")
print("2. 盖帽：将超过阈值的值设为阈值")
print("3. 均值/中位数填充")
print("4. 分箱离散化")
print("\\n建议：根据业务场景选择合适的处理方式")
`
    },
    {
        id: 10,
        title: "多数据集合并",
        icon: "bi-link-45deg",
        difficulty: "medium",
        duration: "45分钟",
        dataset: "多表数据",
        description: "掌握各种数据合并与连接操作，整合多源数据。",
        tasks: [
            "数据加载与预览",
            "主键连接（merge）",
            "纵向拼接（concat）",
            "横向合并",
            "处理连接后的数据"
        ],
        initialCode: `import pandas as pd
import numpy as np

# 1. 生成多个数据集
np.random.seed(42)
n_customers = 100
n_orders = 500
n_products = 50

# 客户表
customers = pd.DataFrame({
    'customer_id': range(1, n_customers + 1),
    'name': [f'客户{i}' for i in range(1, n_customers + 1)],
    'city': np.random.choice(['北京', '上海', '广州', '深圳'], n_customers),
    'level': np.random.choice(['普通', '银牌', '金牌', 'VIP'], n_customers, p=[0.5, 0.25, 0.15, 0.1])
})

# 商品表
products = pd.DataFrame({
    'product_id': range(1, n_products + 1),
    'product_name': [f'商品{i}' for i in range(1, n_products + 1)],
    'category': np.random.choice(['电子产品', '服装', '食品', '家居'], n_products),
    'price': np.random.uniform(10, 1000, n_products).round(2)
})

# 订单表
orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'customer_id': np.random.choice(customers['customer_id'], n_orders),
    'product_id': np.random.choice(products['product_id'], n_orders),
    'quantity': np.random.randint(1, 5, n_orders),
    'order_date': pd.date_range('2024-01-01', periods=n_orders, freq='H')
})

print("===== 各表信息 =====")
print(f"客户表: {customers.shape[0]} 行")
print(f"商品表: {products.shape[0]} 行")
print(f"订单表: {orders.shape[0]} 行")

# 2. 连接订单与客户
orders_customers = pd.merge(orders, customers, on='customer_id', how='left')
print(f"\\n订单-客户连接后: {orders_customers.shape[0]} 行")

# 3. 再连接商品信息
full_data = pd.merge(orders_customers, products, on='product_id', how='left')
print(f"完整数据: {full_data.shape[0]} 行, {full_data.shape[1]} 列")

print("\\n===== 完整数据预览 =====")
print(full_data[['order_id', 'name', 'product_name', 'category', 'quantity', 'price', 'city']].head(10))

# 4. 计算指标
full_data['total_amount'] = full_data['quantity'] * full_data['price']
print("\\n===== 分析统计 =====")
city_stats = full_data.groupby('city')['total_amount'].agg(['sum', 'mean', 'count'])
city_stats.columns = ['总销售额', '客单价', '订单数']
print("按城市统计:")
print(city_stats.round(2))

cat_stats = full_data.groupby('category')['total_amount'].sum().sort_values(ascending=False)
print("\\n按品类统计:")
print(cat_stats.round(2))
`
    }
];

// 全局变量
let monacoEditor = null;
let currentProject = null;
let pyodideLoaded = false;
let pyodideInstance = null;

// 初始化函数
function initPdProjects() {
    renderPdProjectList();
    initPyodideLoader();
}

// 初始化Pyodide加载器
function initPyodideLoader() {
    const outputDiv = document.getElementById('pd-editor-output');
    if (!outputDiv) return;
    
    outputDiv.innerHTML = `
        <div class="pd-loading">
            <div class="pd-loading-spinner"></div>
            <span id="pd-status-text">点击"运行代码"按钮加载Python环境</span>
        </div>
    `;
}

// 渲染项目列表
function renderPdProjectList() {
    const container = document.getElementById('pd-project-list');
    if (!container) return;

    container.innerHTML = pdProjects.map(project => {
        const difficultyClass = project.difficulty === 'easy' ? 'pd-tag-easy' : 
                               project.difficulty === 'medium' ? 'pd-tag-medium' : 'pd-tag-hard';
        const difficultyText = project.difficulty === 'easy' ? '入门' : 
                              project.difficulty === 'medium' ? '进阶' : '高级';

        return `
            <div class="col-lg-4 col-md-6">
                <div class="pd-project-card" onclick="openPdEditor(${project.id})">
                    <div class="pd-project-icon">
                        <i class="bi ${project.icon}"></i>
                    </div>
                    <h3 class="pd-project-title">${project.title}</h3>
                    <p class="pd-project-desc">${project.description}</p>
                    <div class="pd-project-meta">
                        <span class="pd-tag ${difficultyClass}">${difficultyText}</span>
                        <span class="pd-tag pd-tag-time"><i class="bi bi-clock"></i> ${project.duration}</span>
                    </div>
                    <div class="pd-project-tasks">
                        <strong>任务：</strong>
                        ${project.tasks.slice(0, 3).join('、')}...
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 打开编辑器
function openPdEditor(projectId) {
    currentProject = pdProjects.find(p => p.id === projectId);
    if (!currentProject) return;

    document.getElementById('pd-editor-title').textContent = currentProject.title;
    document.getElementById('pd-editor-description').textContent = currentProject.description;
    document.getElementById('pd-editor-dataset').innerHTML = `
        <strong>📁 ${currentProject.dataset}</strong><br>
        <small>（代码中会自动生成模拟数据）</small>
    `;
    document.getElementById('pd-editor-tasks').innerHTML = currentProject.tasks.map(t => 
        `<li>${t}</li>`
    ).join('');

    document.getElementById('pd-editor-container').classList.add('active');
    document.body.style.overflow = 'hidden';

    if (!monacoEditor) {
        initMonacoEditor();
    } else {
        monacoEditor.setValue(currentProject.initialCode);
    }
    
    // 重置Pyodide状态
    resetPyodideStatus();
}

// 重置Pyodide状态
function resetPyodideStatus() {
    const outputDiv = document.getElementById('pd-editor-output');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <div class="pd-loading">
                <div class="pd-loading-spinner"></div>
                <span>点击"运行代码"按钮加载Python环境</span>
            </div>
        `;
    }
}

// 关闭编辑器
function closePdEditor() {
    document.getElementById('pd-editor-container').classList.remove('active');
    document.body.style.overflow = '';
}

// 初始化Monaco Editor
function initMonacoEditor() {
    if (typeof monaco === 'undefined') {
        loadMonacoEditor();
        return;
    }

    monacoEditor = monaco.editor.create(document.getElementById('pd-monaco-editor'), {
        value: currentProject ? currentProject.initialCode : pdProjects[0].initialCode,
        language: 'python',
        theme: 'vs',
        fontSize: 14,
        lineNumbers: 'on',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on'
    });
}

// 加载Monaco Editor
function loadMonacoEditor() {
    if (document.getElementById('monaco-loader')) {
        setTimeout(initMonacoEditor, 1000);
        return;
    }

    const outputDiv = document.getElementById('pd-editor-output');
    if (outputDiv) {
        outputDiv.innerHTML = `
            <div class="pd-loading">
                <div class="pd-loading-spinner"></div>
                <span>正在加载代码编辑器...</span>
            </div>
        `;
    }

    const script = document.createElement('script');
    script.id = 'monaco-loader';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
    script.onload = function() {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            initMonacoEditor();
            if (document.getElementById('pd-editor-output')) {
                document.getElementById('pd-editor-output').innerHTML = '<div class="pd-success">✅ 编辑器已加载，点击"运行代码"开始！</div>';
            }
        });
    };
    document.head.appendChild(script);
}

// 加载Pyodide - 修复版
async function loadPyodideRuntime() {
    const outputDiv = document.getElementById('pd-editor-output');
    if (!outputDiv) return;
    
    if (pyodideLoaded) {
        outputDiv.innerHTML = '<div class="pd-success">✅ Python 环境已就绪，可以运行代码</div>';
        return;
    }

    outputDiv.innerHTML = `
        <div class="pd-loading">
            <div class="pd-loading-spinner"></div>
            <span>正在加载 Python 运行环境（约20-50MB）...</span>
        </div>
    `;

    try {
        // 检查是否已经加载过
        if (typeof window.loadPyodide !== 'function') {
            // 动态加载Pyodide脚本
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Pyodide脚本加载失败'));
                document.head.appendChild(script);
            });
        }

        outputDiv.innerHTML = `
            <div class="pd-loading">
                <div class="pd-loading-spinner"></div>
                <span>正在初始化 Python 运行时...</span>
            </div>
        `;

        // 初始化Pyodide
        pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });

        outputDiv.innerHTML = `
            <div class="pd-loading">
                <div class="pd-loading-spinner"></div>
                <span>正在加载 numpy 和 pandas 库...</span>
            </div>
        `;

        // 加载必要的包
        await pyodideInstance.loadPackage(['numpy', 'pandas']);
        
        pyodideLoaded = true;
        outputDiv.innerHTML = '<div class="pd-success">✅ Python 环境加载完成！可以运行代码了</div>';
        
    } catch (error) {
        outputDiv.innerHTML = `
            <div class="pd-error">
                ❌ Pyodide加载失败: ${error.message}<br>
                <small>请检查网络连接后刷新页面重试</small>
            </div>
        `;
    }
}

// 运行代码
async function runPdCode() {
    if (!monacoEditor) {
        alert('编辑器未加载完成，请稍候');
        return;
    }

    const outputDiv = document.getElementById('pd-editor-output');
    const code = monacoEditor.getValue();

    // 如果Pyodide未加载，先加载
    if (!pyodideLoaded) {
        await loadPyodideRuntime();
        if (!pyodideLoaded) return; // 如果加载失败则不继续
    }

    outputDiv.innerHTML = `
        <div class="pd-loading">
            <div class="pd-loading-spinner"></div>
            <span>正在运行代码...</span>
        </div>
    `;

    try {
        // 设置输出捕获
        pyodideInstance.runPython(`
import sys
from io import StringIO

old_stdout = sys.stdout
old_stderr = sys.stderr
sys.stdout = mystdout = StringIO()
sys.stderr = mystderr = StringIO()
`);

        // 运行用户代码
        pyodideInstance.runPython(code);

        // 获取输出
        pyodideInstance.runPython(`
stdout_content = mystdout.getvalue()
stderr_content = mystderr.getvalue()
sys.stdout = old_stdout
sys.stderr = old_stderr
`);

        const stdout = pyodideInstance.globals.get('stdout_content');
        const stderr = pyodideInstance.globals.get('stderr_content');

        let output = '';
        if (stdout && stdout !== 'undefined') output += `<pre>${escapeHtml(stdout)}</pre>`;
        if (stderr && stderr !== 'undefined') output += `<pre class="pd-error">${escapeHtml(stderr)}</pre>`;
        
        outputDiv.innerHTML = output || '<div class="pd-success">✅ 代码运行成功（无输出）</div>';

    } catch (error) {
        outputDiv.innerHTML = `<pre class="pd-error">❌ 运行错误:\n${escapeHtml(error.message)}</pre>`;
    }
}

// 重置代码
function resetPdCode() {
    if (currentProject && monacoEditor) {
        monacoEditor.setValue(currentProject.initialCode);
        if (document.getElementById('pd-editor-output')) {
            document.getElementById('pd-editor-output').innerHTML = '<div class="pd-success">✅ 代码已重置</div>';
        }
    }
}

// HTML转义
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPdProjects);
} else {
    setTimeout(initPdProjects, 100);
}
