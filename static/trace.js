var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setReadOnly(true);
// editor.clearSelection();
editor.setFontSize(14);
editor.setOptions({
  vScrollBarAlwaysVisible: true,
  scrollPastEnd: 0.5,
  animatedScroll: true
});

// 程式追蹤
