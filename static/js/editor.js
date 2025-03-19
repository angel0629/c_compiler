// 配置 Monaco Editor 的路徑
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' }});
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
        language: 'c',
        theme: 'vs-dark'
    });

    // 設定延遲 timer 進行即時語法檢查
    var timeout;
    editor.onDidChangeModelContent(function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            var code = editor.getValue();
            // 呼叫後端 API 檢查語法錯誤
            fetch('/check_syntax', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            })
            .then(response => response.json())
            .then(data => {
                // 清除先前的 marker
                monaco.editor.setModelMarkers(editor.getModel(), 'owner', []);
                var markers = [];
                if (data.errors && data.errors.length > 0) {
                    data.errors.forEach(function (err) {
                        // 假設錯誤訊息中包含「:line:col:」格式，進行簡單解析
                        var regex = /:(\d+):(\d+):/;
                        var match = err.match(regex);
                        if (match) {
                            var lineNumber = parseInt(match[1]);
                            var column = parseInt(match[2]);
                            markers.push({
                                startLineNumber: lineNumber,
                                startColumn: column,
                                endLineNumber: lineNumber,
                                endColumn: column + 1,
                                message: err,
                                severity: monaco.MarkerSeverity.Error
                            });
                        }
                    });
                    monaco.editor.setModelMarkers(editor.getModel(), 'owner', markers);
                }
            });
        }, 500);
    });
});
