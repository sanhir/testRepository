const fs = require('fs');

function markdownToMrkdwn(text) {
    // コードブロックとインラインコードを一時的に置き換える
    const codeBlocks = [];
    text = text.replace(/(```[\s\S]*?```|`[^`]*`)/g, (match) => {
        codeBlocks.push(match);
        return `\x1A${codeBlocks.length - 1}\x1A`;
    });

    // 見出しの変換
    text = text.replace(/^(#{1,6}) (.*)/gm, (_, p1, p2) => {
        const level = p1.length;
        return `${'*'.repeat(level)}${p2}${'*'.repeat(level)}`;
    });

    // ボールドの変換
    text = text.replace(/\*\*(.*?)\*\*/g, '*$1*');

    // イタリックの変換
    text = text.replace(/\*(.*?)\*/g, '_$1_');

    // リンクの変換
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<$2|$1>');

    // リストの変換
    text = text.replace(/^(\s*)-\s+/gm, '$1• ');
    text = text.replace(/^(\s*)\d+\.\s+/gm, '$1• ');

    // 引用の変換
    text = text.replace(/^>\s+/gm, '> ');

    // 水平線の変換
    text = text.replace(/^---+/gm, '---');

    // コードブロックとインラインコードを元に戻す
    text = text.replace(/\x1A(\d+)\x1A/g, (_, p1) => codeBlocks[parseInt(p1, 10)]);

    return text;
}

if (require.main === module) {
    const inputText = fs.readFileSync(0, 'utf-8'); // 標準入力から読み込む
    console.log(markdownToMrkdwn(inputText));
}