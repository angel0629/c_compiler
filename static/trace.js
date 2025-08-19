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

// if (window.serverCode) {
//   editor.setValue(window.serverCode, -1); // -1 表示游標跳到第一行
// }
