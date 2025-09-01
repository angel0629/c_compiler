// build_mem.js
const SIZE_TABLES = {
  LP64: { char:1, short:2, int:4, long:8, float:4, double:8 },
  ILP32:{ char:1, short:2, int:4, long:4, float:4, double:8 },
};
const clone = (o) => JSON.parse(JSON.stringify(o));
const sizeof = (t='int', model='LP64') => (SIZE_TABLES[model]||SIZE_TABLES.LP64)[String(t).toLowerCase()] ?? 4;

function buildMemoryModel(events=[], { code='', model='LP64' }={}) {
  const frame = { name:'main', vars:[], frameSize:0 };
  const heap = [];
  let offset = 0;

  for (const e of events) {
    if (e.meaning !== 'declare') continue;

    if (e.type === 'int') {
      const size = sizeof('int', model);
      frame.vars.push({
        name: e.varible_name, ctype: 'int', kind:'scalar',
        size, value: e.value ?? null, initialized: e.value != null, offset
      });
      offset += size;
    }

    if (e.type === 'int array') {
      const elemSize = sizeof('int', model);
      const length = Number(e.size || 0);
      const total = elemSize * length;
      frame.vars.push({
        name: e.varible_name, ctype:'int', kind:'array',
        elemSize, length, size: total, initialized:false, offset
      });
      offset += total;
    }
  }
  frame.frameSize = offset;
  return { stack:[frame], heap };
}

// 依序套用每一筆事件，產生「快照」清單
function buildTimeline(events=[], opts={}) {
  const snapshots = [];
  // 初始狀態（第 0 步：尚未執行任何一行）
  snapshots.push({ step:0, line:0, desc:'程式開始', model: buildMemoryModel([], opts) });

  const acc = buildMemoryModel([], opts); // 從空模型開始，一步一步 apply
  for (let i=0;i<events.length;i++) {
    const e = events[i];
    applyEvent(acc, e, opts);
    snapshots.push({
      step: i+1,
      line: e.line_no ?? i+1,
      desc: prettyDesc(e),
      model: clone(acc)
    });
  }
  return snapshots;
}

function prettyDesc(e){
  if (e.meaning === 'declare') {
    if (e.type === 'int') return `宣告 int ${e.varible_name}${e.value!=null?` = ${e.value}`:''}`;
    if (e.type === 'int array') return `宣告 int ${e.varible_name}[${e.size}]`;
  }
  if (e.meaning === 'entry_point') return '進入 main()';
  if (e.meaning === 'exit') return 'return 0;';
  return e.meaning || '執行';
}

// 這裡先處理 MVP（宣告）；之後你可擴充 assignment、陣列寫入、malloc/free…
function applyEvent(model, e, { model:abi='LP64' }={}) {
  const frame = model.stack[0];

  if (e.meaning === 'declare' && e.type === 'int') {
    const size = sizeof('int', abi);
    const offset = frame.frameSize;
    frame.vars.push({
      name:e.varible_name, ctype:'int', kind:'scalar',
      size, value:e.value ?? null, initialized:e.value!=null, offset
    });
    frame.frameSize += size;
  }

  if (e.meaning === 'declare' && e.type === 'int array') {
    const elemSize = sizeof('int', abi);
    const length = Number(e.size||0);
    const total = elemSize * length;
    const offset = frame.frameSize;
    frame.vars.push({
      name:e.varible_name, ctype:'int', kind:'array',
      elemSize, length, size:total, initialized:false, offset
    });
    frame.frameSize += total;
  }

  // TODO: 之後擴充：
  // if (e.meaning === 'assign' && e.targetKind === 'scalar') { ... }
  // if (e.meaning === 'arr_store') { ... }
  // if (e.meaning === 'malloc') { ... }
}

module.exports = { buildMemoryModel, buildTimeline, sizeof };
