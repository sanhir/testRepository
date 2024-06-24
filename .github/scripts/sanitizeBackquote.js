// 文字列のバッククォートをエスケープするスクリプト
const text = process.argv[2];
const result = String(text.replace(/\`/g, "\\\`"));
console.log(`EOF\n${result}\nEOF`);