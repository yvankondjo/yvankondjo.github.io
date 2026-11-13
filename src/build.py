"""Build ../index.html from template.html + base.css + violet.css + app.js + logos/*.b64.
Run: python3 src/build.py"""
import os, re
here = os.path.dirname(os.path.abspath(__file__)); os.chdir(here)
r = lambda f: open(f, encoding='utf-8').read()
t = r('template.html').replace('__CSS__', r('base.css')).replace('__JS__', r('app.js'))
i = t.rindex('@media (prefers-reduced-motion:reduce)'); t = t[:i] + r('violet.css') + t[i:]
t = t.replace('__PALETTE__', '')
for k, f in [('__GCLOUD__', 'gcloud'), ('__STANFORD__', 'stanford'), ('__STATIONF__', 'stationf')]:
    t = t.replace(k, r('logos/' + f + '.b64'))
t = t.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
DESC = "Jacob Kondjo, AI Engineer in Paris. Agents, search and deep learning shipped to production on Google Cloud. Google Cloud Professional ML Engineer."
URL = "https://yvankondjo.github.io/"
ICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%234f2a8c'/%3E"
        "%3Ctext x='32' y='42' font-family='Georgia,serif' font-size='28' fill='white' text-anchor='middle'%3EJK%3C/text%3E%3C/svg%3E")
head = f'''<!doctype html>
<html lang="en" data-palette="indigo">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#4f2a8c">
<link rel="canonical" href="{URL}">
<link rel="icon" href="{ICON}">
<meta property="og:type" content="website">
<meta property="og:title" content="Jacob Kondjo · AI Engineer">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{URL}">
<meta name="twitter:card" content="summary">
'''
t = head + t.replace('</style>', '</style>\n</head>\n<body>', 1) + '\n</body>\n</html>\n'
open('../index.html', 'w', encoding='utf-8').write(t)
open('/dev/stdout', 'w').write('placeholders left: %s\n' % re.findall(r'__[A-Z]+__', t))
