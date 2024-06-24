/**
 * Markdown形式のメッセージをmrkdwnに変換するスクリプト
 **/
const marked = require("marked");

function markdownToHtml(markdown) {
    return marked.parse(markdown);
}

function htmlToMrkdwn(html) {
    return html
    .replace(/<a href=\\"(.*?)\\">(.*?)<\/a>/g, "<$1|$2>")
    .replace(/<strong>(.*?)<\/strong>/g, "*$1*")
    .replace(/<em>(.*?)<\/em>/g, "_$1_")
    .replace(/<pre><code>(.*?)<\/code><\/pre>/g, "```\n$1\n```")
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<h1>(.*?)<\/h1>/g, "*$1*\n")
    .replace(/<h2>(.*?)<\/h2>/g, "*$1*\n")
    .replace(/<h3>(.*?)<\/h3>/g, "*$1*\n")
    .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => p1.replace(/<li>(.*?)<\/li>/g, "• $1\n"))
    .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => p1.replace(/<li>(.*?)<\/li>/g, "• $1\n"))
    .replace(/<blockquote>(.*?)<\/blockquote>/gs, (match, p1) => p1.split("\n").map(line => line && `> ${line}`).join("\n"))
    .replace(/<p>(.*?)<\/p>/g, "$1\n")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\`/g, "\\\`")
    .replace(/\"/g, "\\\"")
    .replace(/\$/g, "\\$");
}

function markdownToMrkdwn(markdown) {
    const html = markdownToHtml(markdown);
    return htmlToMrkdwn(html);
}

// 与えられた文字列をmrkdwnに変換
const markdownText = process.argv[2];
const result = String(markdownToMrkdwn(markdownText));

// 変換後のメッセージを環境変数に設定する
console.log(`commentBody<<EOF\n${result}\nEOF`);