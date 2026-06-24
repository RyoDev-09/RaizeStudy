export function runCodeEnv(javaCode) {
    let outputLines = [];
    const print = (text = "") => outputLines.push(String(text));
    const println = (text = "") => outputLines.push(String(text) + '\n');
    
    // Định nghĩa hàm printf
    const printf = (format, ...args) => {
        let result = format;
        let argIndex = 0;
        
        result = result.replace(/%[a-zA-Z%]|%,?\.\d+[fF]|%,d/g, (match) => {
            if (match === '%%') return '%';
            if (match === '%n') return '\n';
            
            let arg = args[argIndex++];
            if (arg === undefined) return match;
            
            if (match === '%s') return String(arg);
            if (match === '%d') return parseInt(arg).toString();
            
            if (match.includes(',') && (match.endsWith('f') || match.endsWith('F') || match.endsWith('d'))) {
                let parts = match.match(/%,?\.(\d+)f/);
                let decimals = parts ? parseInt(parts[1]) : 0;
                let formatted = Number(arg).toFixed(decimals);
                let numParts = formatted.split('.');
                numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return numParts.join('.');
            }
            if (match.endsWith('f') || match.endsWith('F')) {
                let parts = match.match(/%\.(\d+)f/);
                let decimals = parts ? parseInt(parts[1]) : 6;
                return Number(arg).toFixed(decimals);
            }
            return String(arg);
        });
        
        outputLines.push(result);
    };

    // Chuẩn hóa và làm sạch code Java để biên dịch sang JS thực thi
    let js = javaCode;
    
    // Xóa imports (hỗ trợ cả import java.util.Arrays; và import java.util.*;)
    js = js.replace(/import\s+[\w\.]+(\.\*)?;/g, '');
    
    // Xử lý các phép nối chuỗi trong printf
    js = js.replace(/System\.out\.println\s*\((.*?)\);/g, 'println($1);');
    js = js.replace(/System\.out\.print\s*\((.*?)\);/g, 'print($1);');
    js = js.replace(/System\.out\.printf\s*\((.*?)\);/g, 'printf($1);');
    
    // Dịch các phép ép kiểu Java (Casts) thành hàm JS
    js = rewriteCasts(js);


    // Trích xuất các chuỗi ký tự (string literals) để không bị các regex dịch sai
    const stringLiterals = [];
    let literalCount = 0;
    js = js.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, (match) => {
        const placeholder = `__JAVA_STR_LITERAL_${literalCount}__`;
        stringLiterals.push({ placeholder, original: match });
        literalCount++;
        return placeholder;
    });

    // 1. Phục hồi một số Polyfill chuỗi để code Java chạy đúng trên JS
    const polyfills = `
        if (!String.prototype.equals) {
            String.prototype.equals = function(other) { 
                return this.toString() === (other !== null && other !== undefined ? other.toString() : null); 
            };
        }
        if (!String.prototype.equalsIgnoreCase) {
            String.prototype.equalsIgnoreCase = function(other) { 
                if (other === null || other === undefined) return false;
                return this.toLowerCase() === other.toString().toLowerCase(); 
            };
        }
        if (!String.prototype.contains) {
            String.prototype.contains = function(other) { 
                return this.includes(other); 
            };
        }
        if (!String.prototype.isEmpty) {
            String.prototype.isEmpty = function() { 
                return this.length === 0; 
            };
        }
        if (!String.prototype.isBlank) {
            String.prototype.isBlank = function() { 
                return this.trim().length === 0; 
            };
        }
    `;

    // 2. Tìm tất cả tên Class
    const classNames = [];
    const classRegex = /\bclass\s+([\w_$]+)/g;
    let match;
    while ((match = classRegex.exec(js)) !== null) {
        classNames.push(match[1]);
    }

    // 3. Tìm tên Class chính (chứa main) để strip lớp bọc
    let mainClassName = null;
    const mainClassRegex = /\bclass\s+([\w_$]+)\s*(?:extends\s+[\w_$]+\s*)?\{[\s\S]*?public\s+static\s+void\s+main/g;
    const mainClassMatch = mainClassRegex.exec(js);
    if (mainClassMatch) {
        mainClassName = mainClassMatch[1];
    } else {
        const fallbackMainRegex = /\bclass\s+([\w_$]+)\s*\{[\s\S]*?\bmain\s*\(/g;
        const fallbackMatch = fallbackMainRegex.exec(js);
        if (fallbackMatch) mainClassName = fallbackMatch[1];
    }

    if (mainClassName) {
        const classHeaderRegex = new RegExp(`(?:public\\s+)?class\\s+${mainClassName}\\s*(?:extends\\s+\\w+\\s*)?\\{`);
        const headerMatch = classHeaderRegex.exec(js);
        if (headerMatch) {
            const startIdx = headerMatch.index;
            const openBraceIdx = js.indexOf('{', startIdx);
            if (openBraceIdx !== -1) {
                let braceCount = 1;
                let endIdx = -1;
                for (let i = openBraceIdx + 1; i < js.length; i++) {
                    if (js[i] === '{') braceCount++;
                    else if (js[i] === '}') braceCount--;
                    if (braceCount === 0) {
                        endIdx = i;
                        break;
                    }
                }
                if (endIdx !== -1) {
                    const beforeClass = js.substring(0, startIdx);
                    const classContent = js.substring(openBraceIdx + 1, endIdx);
                    const afterClass = js.substring(endIdx + 1);
                    js = beforeClass + classContent + afterClass;
                }
            }
        }
    }

    function cleanParams(paramStr) {
        if (!paramStr || !paramStr.trim()) return '';
        return paramStr.split(',').map(param => {
            const parts = param.trim().split(/\s+/);
            return parts[parts.length - 1].replace(/\.\.\./g, '');
        }).join(', ');
    }

    // 4. Cắt tách mã thành khối class và khối top-level
    let blocks = [];
    let lastIdx = 0;
    const classBlockRegex = /\bclass\s+([\w_$]+)\s*(?:extends\s+([\w_$]+)\s*)?\{/g;
    let classMatch;
    
    while ((classMatch = classBlockRegex.exec(js)) !== null) {
        const startIdx = classMatch.index;
        const className = classMatch[1];
        const openBraceIdx = js.indexOf('{', startIdx);
        if (openBraceIdx !== -1) {
            let braceCount = 1;
            let endIdx = -1;
            for (let i = openBraceIdx + 1; i < js.length; i++) {
                if (js[i] === '{') braceCount++;
                else if (js[i] === '}') braceCount--;
                if (braceCount === 0) {
                    endIdx = i;
                    break;
                }
            }
            if (endIdx !== -1) {
                if (startIdx > lastIdx) {
                    blocks.push({ type: 'top', content: js.substring(lastIdx, startIdx) });
                }
                blocks.push({
                    type: 'class',
                    className: className,
                    content: js.substring(startIdx, endIdx + 1)
                });
                lastIdx = endIdx + 1;
                classBlockRegex.lastIndex = lastIdx;
            }
        }
    }
    if (lastIdx < js.length) {
        blocks.push({ type: 'top', content: js.substring(lastIdx) });
    }

    const keywords = new Set([
        'public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements',
        'new', 'return', 'throw', 'import', 'package', 'true', 'false', 'null', 'this', 'super',
        'if', 'else', 'while', 'for', 'do', 'switch', 'case', 'break', 'continue', 'default',
        'try', 'catch', 'finally', 'void', 'throw', 'const', 'let', 'var', 'function', 'class'
    ]);

    function translateVarDeclarations(bodyText) {
        let tText = bodyText;
        
        // Dịch vòng lặp enhanced for: for (int x : list) -> for (let x of list)
        tText = tText.replace(/\bfor\s*\(\s*(?:final\s+)?([\w_$<>]+)(?:\[\])*\s+([\w_$]+)\s*:\s*([^)]+)\)/g, 'for (let $2 of $3)');

        // Mảng 2 chiều: int[][] a = {{1,2},{3,4}} -> let a = [[1,2],[3,4]]
        tText = tText.replace(/\b[\w_$<>]+\[\]\[\]\s+([\w_$]+)\s*=\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, (m, varName, inner) => {
            // Chuyển {1,2,3} -> [1,2,3] trong từng hàng
            const converted = inner.replace(/\{([^{}]*)\}/g, '[$1]');
            return `let ${varName} = [${converted}]`;
        });
        // Mảng 2 chiều: int[][] a = new int[r][c] -> let a = Array.from({length:r}, ()=>new Array(c))
        tText = tText.replace(/\b[\w_$<>]+\[\]\[\]\s+([\w_$]+)\s*=\s*new\s+\w+\[([^\]]*)\]\[([^\]]*)\]/g,
            'let $1 = Array.from({length: $2}, () => new Array($3).fill(0))');

        // Mảng 1 chiều: int[] a = {1, 2} -> let a = [1, 2]
        tText = tText.replace(/\b[\w_$<>]+\[\]\s+([\w_$]+)\s*=\s*\{([^{}]*)\}/g, 'let $1 = [ $2 ]');
        // Mảng 1 chiều: int[] a = new int[5] -> let a = new Array(5).fill(0)
        tText = tText.replace(/\b[\w_$<>]+\[\]\s+([\w_$]+)\s*=\s*new\s+\w+\[\s*([^\]]*)\s*\]/g, 'let $1 = new Array($2).fill(0)');

        // Type var = val;
        tText = tText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*=/g, (m, type, varName) => {
            const cleanType = type.split('<')[0];
            if (keywords.has(cleanType)) return m;
            return `let ${varName} =`;
        });

        // Type var;
        tText = tText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*;/g, (m, type, varName) => {
            const cleanType = type.split('<')[0];
            if (keywords.has(cleanType) || varName === 'out') return m;
            return `let ${varName};`;
        });

        // Dịch length() trên chuỗi Java sang length trong JS
        tText = tText.replace(/\.length\s*\(\s*\)/g, '.length');

        return tText;
    }

    const processedBlocks = blocks.map(block => {
        if (block.type === 'top') {
            let content = block.content;
            const methodRegex = /\b(?:(?:public|private|protected|static|final|synchronized|void|[\w_$<>[\].?]+)\s+)*([\w_$]+)\s*\(([^)]*)\)\s*\{/g;
            let mMatch;
            let lastMIdx = 0;
            let newContent = "";
            
            while ((mMatch = methodRegex.exec(content)) !== null) {
                const startIdx = mMatch.index;
                const methodName = mMatch[1];
                const paramsStr = mMatch[2];
                if (['if', 'while', 'for', 'switch', 'catch'].includes(methodName)) {
                    newContent += content.substring(lastMIdx, methodRegex.lastIndex);
                    lastMIdx = methodRegex.lastIndex;
                    continue;
                }
                const openBraceIdx = content.indexOf('{', startIdx);
                if (openBraceIdx !== -1) {
                    let braceCount = 1;
                    let endIdx = -1;
                    for (let i = openBraceIdx + 1; i < content.length; i++) {
                        if (content[i] === '{') braceCount++;
                        else if (content[i] === '}') braceCount--;
                        if (braceCount === 0) {
                            endIdx = i;
                            break;
                        }
                    }
                    if (endIdx !== -1) {
                        newContent += content.substring(lastMIdx, startIdx);
                        let methodBody = content.substring(openBraceIdx + 1, endIdx);
                        methodBody = translateVarDeclarations(methodBody);
                        
                        const cleanedParams = cleanParams(paramsStr);
                        newContent += `function ${methodName}(${cleanedParams}) {${methodBody}}`;
                        lastMIdx = endIdx + 1;
                        methodRegex.lastIndex = lastMIdx;
                    }
                }
            }
            if (lastMIdx < content.length) {
                newContent += content.substring(lastMIdx);
            }
            return translateVarDeclarations(newContent);
        } else {
            let content = block.content;
            const className = block.className;
            const openBraceIdx = content.indexOf('{');
            const classHeader = content.substring(0, openBraceIdx + 1);
            const classBody = content.substring(openBraceIdx + 1, content.length - 1);
            
            const methodRegex = /\b(?:(?:public|private|protected|static|final|synchronized|void|[\w_$<>[\].?]+)\s+)*([\w_$]+)\s*\(([^)]*)\)\s*\{/g;
            let mMatch;
            let lastMIdx = 0;
            let newBody = "";
            
            while ((mMatch = methodRegex.exec(classBody)) !== null) {
                const startIdx = mMatch.index;
                const methodName = mMatch[1];
                const paramsStr = mMatch[2];
                if (['if', 'while', 'for', 'switch', 'catch'].includes(methodName)) {
                    newBody += classBody.substring(lastMIdx, methodRegex.lastIndex);
                    lastMIdx = methodRegex.lastIndex;
                    continue;
                }
                const openBraceIdx = classBody.indexOf('{', startIdx);
                if (openBraceIdx !== -1) {
                    let braceCount = 1;
                    let endIdx = -1;
                    for (let i = openBraceIdx + 1; i < classBody.length; i++) {
                        if (classBody[i] === '{') braceCount++;
                        else if (classBody[i] === '}') braceCount--;
                        if (braceCount === 0) {
                            endIdx = i;
                            break;
                        }
                    }
                    if (endIdx !== -1) {
                        let fieldsText = classBody.substring(lastMIdx, startIdx);
                        fieldsText = fieldsText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*=/g, (m, type, varName) => {
                            if (keywords.has(type)) return m;
                            return `${varName} =`;
                        });
                        fieldsText = fieldsText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*;/g, (m, type, varName) => {
                            if (keywords.has(type)) return m;
                            return `${varName};`;
                        });
                        newBody += fieldsText;
                        
                        let methodBody = classBody.substring(openBraceIdx + 1, endIdx);
                        methodBody = translateVarDeclarations(methodBody);
                        
                        const cleanedParams = cleanParams(paramsStr);
                        const isConstructor = (methodName === className);
                        const jsMethodName = isConstructor ? 'constructor' : methodName;
                        
                        newBody += `${jsMethodName}(${cleanedParams}) {${methodBody}}`;
                        lastMIdx = endIdx + 1;
                        methodRegex.lastIndex = lastMIdx;
                    }
                }
            }
            if (lastMIdx < classBody.length) {
                let fieldsText = classBody.substring(lastMIdx);
                fieldsText = fieldsText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*=/g, (m, type, varName) => {
                    if (keywords.has(type)) return m;
                    return `${varName} =`;
                });
                fieldsText = fieldsText.replace(/\b([\w_$<>]+)\s+([\w_$]+)\s*;/g, (m, type, varName) => {
                    if (keywords.has(type)) return m;
                    return `${varName};`;
                });
                newBody += fieldsText;
            }
            
            return classHeader + newBody + '}';
        }
    });

    let codeToRun = polyfills + '\n' + processedBlocks.join('\n');
    codeToRun += `\nif (typeof main !== 'undefined') { main(); }\n`;

    // Phục hồi các chuỗi ký tự ban đầu từ các placeholder
    for (let i = stringLiterals.length - 1; i >= 0; i--) {
        codeToRun = codeToRun.split(stringLiterals[i].placeholder).join(stringLiterals[i].original);
    }
    
    // Môi trường chạy ảo
    const deepToString = (arr) => {
        if (!Array.isArray(arr)) return String(arr);
        return '[' + arr.map(item => Array.isArray(item) ? deepToString(item) : item).join(', ') + ']';
    };
    const runEnv = {
        print,
        println,
        printf,
        Math,
        Arrays: {
            deepToString: (arr) => deepToString(arr),
            toString: (arr) => '[' + (Array.isArray(arr) ? arr.join(', ') : arr) + ']',
            sort: (arr) => { arr.sort((a, b) => a - b); return arr; },
            fill: (arr, val) => { arr.fill(val); return arr; },
            copyOf: (arr, len) => arr.slice(0, len),
        },
        StringBuilder: function() {
            this.str = "";
            this.append = function(x) { this.str += String(x); return this; };
            this.toString = function() { return this.str; };
        },
        byte: (x) => (x << 24) >> 24,
        short: (x) => (x << 16) >> 16,
        int: (x) => x | 0,
        long: (x) => Number(x),
        float: (x) => Math.fround(x),
        double: (x) => Number(x),
        char: (x) => {
            if (typeof x === 'number') {
                return String.fromCharCode(x & 0xffff);
            }
            const s = String(x);
            return s ? s.charAt(0) : '';
        }
    };
    
    try {
        const runner = new Function(
            'print', 'println', 'printf', 'StringBuilder', 'Arrays',
            'byte', 'short', 'int', 'long', 'float', 'double', 'char', 
            codeToRun
        );
        runner(
            runEnv.print, runEnv.println, runEnv.printf, runEnv.StringBuilder, runEnv.Arrays,
            runEnv.byte, runEnv.short, runEnv.int, runEnv.long, runEnv.float, runEnv.double, runEnv.char
        );
        return { success: true, output: outputLines.join('') };
    } catch (err) {
        return { success: false, output: `[Lỗi biên dịch / Runtime Java]:\nLine: ${err.lineNumber || 'Unknown'} - ${err.message}` };
    }
}

function rewriteCasts(jsCode) {
    const castRegex = /\b\(\s*(byte|short|int|long|float|double|char)\s*\)/g;
    let result = jsCode;
    const matches = [];
    let match;
    
    while ((match = castRegex.exec(result)) !== null) {
        matches.push({
            index: match.index,
            length: match[0].length,
            type: match[1]
        });
    }
    
    for (let i = matches.length - 1; i >= 0; i--) {
        const m = matches[i];
        const castStart = m.index;
        const castEnd = castStart + m.length;
        
        let scanIdx = castEnd;
        while (scanIdx < result.length && /\s/.test(result[scanIdx])) {
            scanIdx++;
        }
        
        if (scanIdx >= result.length) continue;
        
        if (result[scanIdx] === '(') {
            let parenCount = 1;
            let exprStart = scanIdx + 1;
            let exprEnd = -1;
            for (let j = exprStart; j < result.length; j++) {
                if (result[j] === '(') parenCount++;
                else if (result[j] === ')') parenCount--;
                if (parenCount === 0) {
                    exprEnd = j;
                    break;
                }
            }
            if (exprEnd !== -1) {
                const expr = result.substring(exprStart, exprEnd);
                const before = result.substring(0, castStart);
                const after = result.substring(exprEnd + 1);
                result = before + `${m.type}(${expr})` + after;
            }
        } else {
            const remaining = result.substring(scanIdx);
            const termRegex = /^(?:[a-zA-Z_$][\w_$]*(?:\.[a-zA-Z_$][\w_$]*)*(?:\s*\([^)]*\))?|\d+(?:\.\d+)?)/;
            const termMatch = termRegex.exec(remaining);
            if (termMatch) {
                const term = termMatch[0];
                const termEnd = scanIdx + term.length;
                const before = result.substring(0, castStart);
                const after = result.substring(termEnd);
                result = before + `${m.type}(${term})` + after;
            }
        }
    }
    
    return result;
}

