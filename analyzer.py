import sys
import json
code = ''
clean_code = []
with open("code.txt", "r", encoding="utf-8") as f:
    code = f.read()

lines = code.split('\n')

# print(lines)
# print()
# print()

index = 1
for line in lines:
    line = line.strip()
    line = line.strip(';')
    line = line.split('//')[0].strip()
    if line.startswith('#'):
        continue
    if line == '':
        continue
    if line.startswith('/'):
        continue
    clean_code.append(f'{line}')

def show():
    for i in range(len(clean_code)):
        print(f"{i+1}.{clean_code[i]}")


def analyze(index,ele):
    # print(ele)
    if 'main()' in ele: 
        return {'line_no':index,
                'meaning':'entry_point',
                'type':'int',
                'varible_name':None,
                'value':None,
                'size':None}
    elif 'return 0' in ele:
        return {'line_no':index,
                'meaning':'exit',
                'type':None,
                'varible_name':None,
                'value':0,
                'size':None}

    elif 'printf' in ele:
        # print(ele)
        message = ele.split('(',maxsplit=1)
        clean_message = message[1].strip(')')
        # print(clean_message)
        return 'print 待開發'
    # 整數
    elif ele.startswith('int'):
        token = ele.split(' ',maxsplit=1)
        type = token[0]
        # print(token)
        tmp = token[1].split('=',maxsplit=1)
        # print(tmp)
        for i in range(len(tmp)):
            tmp[i] = tmp[i].strip()
        # print(tmp)
        if ('[' in tmp[0])and(']' in tmp[0]):
            # print(f"{ele} => case:int array")
            temp = tmp[0].split('[',maxsplit=1)
            for i in range(len(temp)):
                temp[i] = temp[i].strip()
                temp[i] = temp[i].strip(']')
            var_name = temp[0]
            size = temp[1]
            if '=' in token[1]:
                return {'line_no':index,
                        'meaning':'declare',
                        'type':type+' array',
                        'varible_name':var_name,
                        'value':tmp[1],
                        'size':size}
            else:
                return {'line_no':index,
                        'meaning':'declare',
                        'type':type+' array',
                        'varible_name':var_name,
                        'value':None,
                        'size':size}
        else: # 一般 int
            if '=' in token[1]:
                return {'line_no':index,
                        'meaning':'declare',
                        'type':type,
                        'varible_name':tmp[0],
                        'value':tmp[1],
                        'size':None}
            else:
                return {'line_no':index,
                        'meaning':'declare',
                        'type':type,
                        'varible_name':tmp[0],
                        'value':None,
                        'size':None}

    elif ele.startswith('char'):
        return 'char 待開發'

print("🧠 Python 腳本啟動", file=sys.stderr)
# show()
results = []
for ele in clean_code:
    if ele == '}':
        continue
    # print(index)
    Semantic = analyze(index,ele)
    if isinstance(Semantic, dict):
        results.append(Semantic)
    # print(Semantic)
    index+=1
# print(results)
# result = {"message": "測試", "length": len(code)}
print(json.dumps(results, ensure_ascii=False))