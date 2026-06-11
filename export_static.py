import os
import shutil
import re

os.makedirs('dist', exist_ok=True)
os.makedirs('dist/css', exist_ok=True)

shutil.copy('static/css/style.css', 'dist/css/style.css')

with open('templates/base.html', 'r', encoding='utf-8') as f:
    base_html = f.read()

with open('templates/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 移除所有 Jinja2 模板标签
full_html = base_html

# 移除 block 标签
full_html = re.sub(r'\{% block [a-zA-Z]+\ %}', '', full_html)
full_html = re.sub(r'\{% endblock %\}', '', full_html)

# 移除 extends
full_html = re.sub(r'\{% extends "[^"]+" %\}', '', full_html)

# 移除 set 语句
full_html = re.sub(r'\{% set [^%]+\ %}', '', full_html)

# 移除 if 语句
full_html = re.sub(r'\{% if [^%]+\ %}', '', full_html)
full_html = re.sub(r'\{% endif %\}', '', full_html)

# 替换 url_for
full_html = full_html.replace('{{ url_for(\'index\') }}', '/')
full_html = full_html.replace('{{ url_for(\'courses\') }}', '#')
full_html = full_html.replace('{{ url_for(\'projects\') }}', '#')
full_html = full_html.replace('{{ url_for(\'pandas_training\') }}', '#')
full_html = full_html.replace('{{ url_for(\'static\', filename=\'css/style.css\') }}', '/css/style.css')

# 处理内容中的 url_for
full_html = full_html.replace('{{ url_for(\'course_detail\', course_id=course.id) }}', '#')
full_html = full_html.replace('{{ url_for(\'project_detail\', project_id=project.id) }}', '#')
full_html = full_html.replace('{{ url_for(\'pandas_exercise\', exercise_id=ex.id) }}', '#')

# 移除内容中的模板标签
index_html = re.sub(r'\{% extends "[^"]+" %\}', '', index_html)
index_html = re.sub(r'\{% block [a-zA-Z]+\ %}', '', index_html)
index_html = re.sub(r'\{% endblock %\}', '', index_html)
index_html = re.sub(r'\{\{ url_for\([^)]+\) \}\}', '#', index_html)

# 添加页面内容
full_html = full_html.replace('<main class="site-main">', '<main class="site-main">' + index_html)

# 清理多余的空格和空行
full_html = '\n'.join(line for line in full_html.split('\n') if line.strip())

with open('dist/index.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("✅ 静态网站已导出")
