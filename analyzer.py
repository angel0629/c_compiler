# import sys
# import json
# code = ''
# clean_code = []
# with open("code.txt", "r", encoding="utf-8") as f:
#     code = f.read()

# lines = code.split('\n')

# # print(lines)
# # print()
# # print()

# index = 1
# for line in lines:
#     line = line.strip()
#     line = line.strip(';')
#     line = line.split('//')[0].strip()
#     if line.startswith('#'):
#         continue
#     if line == '':
#         continue
#     if line.startswith('/'):
#         continue
#     clean_code.append(f'{line}')

# def show():
#     for i in range(len(clean_code)):
#         print(f"{i+1}.{clean_code[i]}")


# def analyze(index,ele):
#     # print(ele)
#     if 'main()' in ele: 
#         return {'line_no':index,
#                 'meaning':'entry_point',
#                 'type':'int',
#                 'varible_name':None,
#                 'value':None,
#                 'size':None}
#     elif 'return 0' in ele:
#         return {'line_no':index,
#                 'meaning':'exit',
#                 'type':None,
#                 'varible_name':None,
#                 'value':0,
#                 'size':None}

#     elif 'printf' in ele:
#         # print(ele)
#         message = ele.split('(',maxsplit=1)
#         clean_message = message[1].strip(')')
#         # print(clean_message)
#         return 'print 待開發'
#     # 整數
#     elif ele.startswith('int'):
#         token = ele.split(' ',maxsplit=1)
#         type = token[0]
#         # print(token)
#         tmp = token[1].split('=',maxsplit=1)
#         # print(tmp)
#         for i in range(len(tmp)):
#             tmp[i] = tmp[i].strip()
#         # print(tmp)
#         if ('[' in tmp[0])and(']' in tmp[0]):
#             # print(f"{ele} => case:int array")
#             temp = tmp[0].split('[',maxsplit=1)
#             for i in range(len(temp)):
#                 temp[i] = temp[i].strip()
#                 temp[i] = temp[i].strip(']')
#             var_name = temp[0]
#             size = temp[1]
#             if '=' in token[1]:
#                 return {'line_no':index,
#                         'meaning':'declare',
#                         'type':type+' array',
#                         'varible_name':var_name,
#                         'value':tmp[1],
#                         'size':size}
#             else:
#                 return {'line_no':index,
#                         'meaning':'declare',
#                         'type':type+' array',
#                         'varible_name':var_name,
#                         'value':None,
#                         'size':size}
#         else: # 一般 int
#             if '=' in token[1]:
#                 return {'line_no':index,
#                         'meaning':'declare',
#                         'type':type,
#                         'varible_name':tmp[0],
#                         'value':tmp[1],
#                         'size':None}
#             else:
#                 return {'line_no':index,
#                         'meaning':'declare',
#                         'type':type,
#                         'varible_name':tmp[0],
#                         'value':None,
#                         'size':None}

#     elif ele.startswith('char'):
#         return 'char 待開發'

# print("🧠 Python 腳本啟動", file=sys.stderr)
# # show()
# results = []
# for ele in clean_code:
#     if ele == '}':
#         continue
#     # print(index)
#     Semantic = analyze(index,ele)
#     if isinstance(Semantic, dict):
#         results.append(Semantic)
#     # print(Semantic)
#     index+=1
# # print(results)
# # result = {"message": "測試", "length": len(code)}
# print(json.dumps(results, ensure_ascii=False))


# analyzer.py
import sys, json, re

with open("code.txt", "r", encoding="utf-8") as f:
    code = f.read()

lines = code.split('\n')

# 建立清洗後的行，但保留原始行號
clean_lines = []
block_comment = False

for lineno, raw in enumerate(lines, start=1):
    line = raw

    # 粗略處理 /* ... */ 區塊註解
    if block_comment:
        if '*/' in line:
            block_comment = False
            line = line.split('*/', 1)[1]
        else:
            continue
    if '/*' in line:
        before, after = line.split('/*', 1)
        if '*/' in after:
            after = after.split('*/', 1)[1]
            line = before + after
        else:
            block_comment = True
            line = before

    # 去掉 // 註解
    line = line.split('//', 1)[0].strip()

    # 跳過不分析的行（但不影響原始行號）
    if not line:
        continue
    if line.startswith('#'):
        continue
    if line == '}':
        continue

    # 僅為分析方便移除結尾 ';'
    if line.endswith(';'):
        line = line[:-1].strip()

    clean_lines.append({'text': line, 'src_line': lineno})

def analyze(ele):
    s   = ele['text']
    src = ele['src_line']

    if re.search(r'\bmain\s*\(\s*\)', s):
        return {'line_no': src, 'meaning':'entry_point',
                'type':'int','varible_name':None,'value':None,'size':None}

    if re.search(r'\breturn\s+0\b', s):
        return {'line_no': src, 'meaning':'exit',
                'type':None,'varible_name':None,'value':0,'size':None}

    if s.startswith('int'):
        token = s.split(' ', 1)
        ctype = token[0]
        rhs   = token[1] if len(token) > 1 else ''

        # 陣列 int a[5] (= {...} 可先忽略)
        if '[' in rhs and ']' in rhs:
            name = rhs.split('[', 1)[0].strip()
            size = rhs.split('[', 1)[1].split(']', 1)[0].strip()
            val  = rhs.split('=', 1)[1].strip() if '=' in rhs else None
            return {'line_no': src, 'meaning':'declare',
                    'type': f'{ctype} array', 'varible_name': name,
                    'value': val, 'size': size}

        # 標量 int x (= v)
        if '=' in rhs:
            name, val = [t.strip() for t in rhs.split('=', 1)]
            return {'line_no': src, 'meaning':'declare',
                    'type': ctype, 'varible_name': name, 'value': val, 'size': None}
        else:
            return {'line_no': src, 'meaning':'declare',
                    'type': ctype, 'varible_name': rhs.strip(), 'value': None, 'size': None}

    if s.startswith('char'):
        return None
    if 'printf' in s:
        return None
    return None

print("🧠 Python 腳本啟動", file=sys.stderr)

results = []
for ele in clean_lines:
    sem = analyze(ele)
    if isinstance(sem, dict):
        results.append(sem)

print(json.dumps(results, ensure_ascii=False))
