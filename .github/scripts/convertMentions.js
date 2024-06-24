// 文字列のバッククォートをエスケープするスクリプト
const text = process.argv[2];
const result = String(text.replace(/\`/g, "\\`"));
console.log(`sanitizedTitle<<EOF\n${result}\nEOF`);
