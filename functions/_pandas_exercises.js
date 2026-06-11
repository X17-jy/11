// Pandas 训练练习数据
export const PANDAS_EXERCISES = [
  {
    id: 1,
    title: "创建 DataFrame",
    level: "入门",
    duration: "5 分钟",
    description: "学习如何从字典、列表创建 DataFrame，这是 Pandas 最基础的操作。",
    instruction: "请创建一个包含学生信息的 DataFrame，包含 name（姓名）、age（年龄）、score（分数）三列，至少 3 条数据。",
    hint: "使用 pd.DataFrame() 函数，传入字典或列表作为参数。",
    starterCode: `import pandas as pd

# 创建一个学生信息的 DataFrame
data = {
    'name': ['张三', '李四', '王五'],
    'age': [20, 22, 21],
    'score': [85, 92, 78]
}
df = pd.DataFrame(data)

# 使用 print() 显示结果
print(df)
`,
    solution: `import pandas as pd

# 创建学生信息 DataFrame
data = {
    'name': ['张三', '李四', '王五'],
    'age': [20, 22, 21],
    'score': [85, 92, 78]
}
df = pd.DataFrame(data)
print(df)
`,
    expectedOutput: "一个包含 3 行 3 列的 DataFrame"
  },
  {
    id: 2,
    title: "读取 CSV 文件",
    level: "入门",
    duration: "8 分钟",
    description: "学习使用 pd.read_csv() 读取数据，这是数据分析的第一步。",
    instruction: "从给定的销售数据 CSV 字符串中读取数据，并显示前 5 行。",
    hint: "使用 pd.read_csv() 配合 StringIO 来读取字符串形式的 CSV 数据。",
    starterCode: `import pandas as pd
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

# 读取 CSV 并显示前 5 行
df = pd.read_csv(StringIO(csv_data.strip()))
print(df.head())
`,
    solution: `import pandas as pd
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
print(df.head())
`,
    expectedOutput: "显示包含日期、产品、数量、价格的数据表"
  },
  {
    id: 3,
    title: "数据筛选与过滤",
    level: "入门",
    duration: "10 分钟",
    description: "学习使用条件表达式筛选数据，提取满足条件的行。",
    instruction: "从员工数据中筛选出年龄大于 25 且薪资高于 8000 的员工。",
    hint: "使用 df[(条件1) & (条件2)] 进行多条件筛选。",
    starterCode: `import pandas as pd

# 员工数据
data = {
    'name': ['张伟', '王芳', '李明', '赵丽', '刘强', '陈静'],
    'age': [28, 24, 32, 26, 35, 23],
    'department': ['技术', '市场', '技术', '人事', '技术', '市场'],
    'salary': [9500, 6500, 12000, 7500, 15000, 5800]
}
df = pd.DataFrame(data)

# 筛选年龄>25且薪资>8000的员工
result = df[(df['age'] > 25) & (df['salary'] > 8000)]
print(result)
`,
    solution: `import pandas as pd

data = {
    'name': ['张伟', '王芳', '李明', '赵丽', '刘强', '陈静'],
    'age': [28, 24, 32, 26, 35, 23],
    'department': ['技术', '市场', '技术', '人事', '技术', '市场'],
    'salary': [9500, 6500, 12000, 7500, 15000, 5800]
}
df = pd.DataFrame(data)

# 筛选年龄>25且薪资>8000的员工
result = df[(df['age'] > 25) & (df['salary'] > 8000)]
print(result)
`,
    expectedOutput: "筛选出张伟、李明、刘强三位员工"
  },
  {
    id: 4,
    title: "数据排序与排名",
    level: "入门",
    duration: "8 分钟",
    description: "学习使用 sort_values 和 rank 进行数据排序和排名。",
    instruction: "将学生成绩按总分降序排列，并添加排名列。",
    hint: "使用 sort_values(by=列名, ascending=False) 降序排列，使用 rank() 添加排名。",
    starterCode: `import pandas as pd

# 学生成绩数据
data = {
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'math': [85, 92, 78, 88, 90],
    'english': [82, 88, 95, 76, 85],
    'chinese': [90, 85, 88, 92, 80]
}
df = pd.DataFrame(data)

# 计算总分并排序
df['total'] = df['math'] + df['english'] + df['chinese']
df = df.sort_values('total', ascending=False)
df['rank'] = range(1, len(df) + 1)
print(df)
`,
    solution: `import pandas as pd

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
df['rank'] = range(1, len(df) + 1)
print(df)
`,
    expectedOutput: "李四排名第一，总分265"
  },
  {
    id: 5,
    title: "缺失值处理",
    level: "进阶",
    duration: "12 分钟",
    description: "学习检测、删除和填充缺失值的多种方法。",
    instruction: "处理订单数据中的缺失值：删除完全空的行，用均值填充金额缺失，用'未知'填充城市缺失。",
    hint: "使用 dropna() 删除，fillna() 填充，isnull() 检测缺失值。",
    starterCode: `import pandas as pd
import numpy as np

# 订单数据（含缺失值）
data = {
    'order_id': ['A001', 'A002', 'A003', 'A004', 'A005', 'A006'],
    'amount': [150, np.nan, 280, 320, np.nan, 450],
    'city': ['北京', '上海', np.nan, '广州', '深圳', np.nan],
    'status': ['完成', '完成', '取消', '完成', np.nan, '完成']
}
df = pd.DataFrame(data)

# 查看缺失值
print("处理前：")
print(df)
print("\\n缺失值统计：")
print(df.isnull().sum())

# 删除 status 为空的行
df = df.dropna(subset=['status'])

# 用均值填充 amount
df['amount'] = df['amount'].fillna(df['amount'].mean())

# 用'未知'填充 city
df['city'] = df['city'].fillna('未知')

print("\\n处理后：")
print(df)
`,
    solution: `import pandas as pd
import numpy as np

data = {
    'order_id': ['A001', 'A002', 'A003', 'A004', 'A005', 'A006'],
    'amount': [150, np.nan, 280, 320, np.nan, 450],
    'city': ['北京', '上海', np.nan, '广州', '深圳', np.nan],
    'status': ['完成', '完成', '取消', '完成', np.nan, '完成']
}
df = pd.DataFrame(data)

# 查看缺失值
print("处理前：")
print(df)
print("\\n缺失值统计：")
print(df.isnull().sum())

# 删除 status 为空的行
df = df.dropna(subset=['status'])

# 用均值填充 amount
df['amount'] = df['amount'].fillna(df['amount'].mean())

# 用'未知'填充 city
df['city'] = df['city'].fillna('未知')

print("\\n处理后：")
print(df)
`,
    expectedOutput: "处理后的数据无缺失值"
  },
  {
    id: 6,
    title: "分组聚合 groupby",
    level: "进阶",
    duration: "15 分钟",
    description: "学习使用 groupby 进行数据分组和聚合统计。",
    instruction: "统计各产品类别的总销售额、平均单价和订单数量。",
    hint: "使用 df.groupby('列名').agg({'列': '聚合函数'}) 进行多列聚合。",
    starterCode: `import pandas as pd

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
print(result)
`,
    solution: `import pandas as pd

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
print(result)
`,
    expectedOutput: "电子产品总销售额最高"
  },
  {
    id: 7,
    title: "数据合并 merge",
    level: "进阶",
    duration: "12 分钟",
    description: "学习使用 merge 进行多表关联，类似 SQL JOIN。",
    instruction: "将订单表和客户表合并，显示每个订单的客户姓名和城市。",
    hint: "使用 pd.merge(df1, df2, on='关联列', how='连接方式')。",
    starterCode: `import pandas as pd

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

# 合并订单和客户信息
result = pd.merge(orders, customers, on='customer_id', how='left')
print(result)
`,
    solution: `import pandas as pd

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
print(result)
`,
    expectedOutput: "合并后显示订单和客户完整信息"
  },
  {
    id: 8,
    title: "数据透视表 pivot_table",
    level: "进阶",
    duration: "15 分钟",
    description: "学习使用 pivot_table 创建数据透视表，进行多维数据分析。",
    instruction: "创建一个透视表，按产品和地区统计销售额，并计算总计。",
    hint: "使用 pd.pivot_table(df, values='值', index='行', columns='列', aggfunc='聚合函数')。",
    starterCode: `import pandas as pd

# 销售数据
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
print(pivot)
`,
    solution: `import pandas as pd

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
print(pivot)
`,
    expectedOutput: "透视表显示各地区各产品销售额"
  },
  {
    id: 9,
    title: "时间序列处理",
    level: "进阶",
    duration: "15 分钟",
    description: "学习处理日期时间数据，进行时间序列分析。",
    instruction: "将日期列转换为 datetime 类型，按月统计销售额，并计算环比增长率。",
    hint: "使用 pd.to_datetime() 转换日期，dt 访问器提取时间部分，pct_change() 计算环比。",
    starterCode: `import pandas as pd

# 每日销售数据
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
print(monthly)
`,
    solution: `import pandas as pd

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
print(monthly)
`,
    expectedOutput: "显示月度销售额和环比增长率"
  },
  {
    id: 10,
    title: "综合实战：销售数据分析",
    level: "挑战",
    duration: "25 分钟",
    description: "综合运用所学知识，完成一个完整的销售数据分析任务。",
    instruction: "分析销售数据，完成：1) 数据概览 2) 按产品类别统计销售额 3) 找出销售额 TOP3 产品 4) 分析月度销售趋势。",
    hint: "综合运用 read_csv、groupby、sort_values、时间处理等技能。",
    starterCode: `import pandas as pd
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

# 读取数据
df = pd.read_csv(StringIO(csv_data.strip()))
df['sales'] = df['quantity'] * df['unit_price']

# 数据概览
print("=== 数据概览 ===")
print(f"行数: {len(df)}, 列数: {len(df.columns)}")
print(df.dtypes)

# 各类别销售额
print("\\n=== 各类别销售额 ===")
print(df.groupby('category')['sales'].sum().sort_values(ascending=False))

# TOP3 产品
print("\\n=== 销售额 TOP3 产品 ===")
print(df.groupby('product')['sales'].sum().nlargest(3))

# 月度趋势
print("\\n=== 月度销售趋势 ===")
df['order_date'] = pd.to_datetime(df['order_date'])
df['month'] = df['order_date'].dt.to_period('M')
print(df.groupby('month')['sales'].sum())
`,
    solution: `import pandas as pd
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
print(df.dtypes)

# 3. 按类别统计销售额
print("\\n=== 各类别销售额 ===")
print(df.groupby('category')['sales'].sum().sort_values(ascending=False))

# 4. 销售额 TOP3 产品
print("\\n=== 销售额 TOP3 产品 ===")
print(df.groupby('product')['sales'].sum().nlargest(3))

# 5. 月度销售趋势
print("\\n=== 月度销售趋势 ===")
df['order_date'] = pd.to_datetime(df['order_date'])
df['month'] = df['order_date'].dt.to_period('M')
print(df.groupby('month')['sales'].sum())
`,
    expectedOutput: "完整的销售数据分析报告"
  }
];
