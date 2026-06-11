import os
import shutil

os.makedirs('dist', exist_ok=True)
os.makedirs('dist/css', exist_ok=True)

shutil.copy('static/css/style.css', 'dist/css/style.css')

with open('templates/base.html', 'r', encoding='utf-8') as f:
    base_html = f.read()

with open('templates/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

full_html = base_html.replace('{% block content %}', index_html)
full_html = full_html.replace('{% endblock %}', '')
full_html = full_html.replace('{{ url_for(\'pandas_training\') }}', '#')
full_html = full_html.replace('{{ url_for(\'courses\') }}', '#')
full_html = full_html.replace('{{ url_for(\'projects\') }}', '#')

with open('dist/index.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("✅ 静态网站已导出")
