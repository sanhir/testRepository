/**
 * GithubのメンションをSlackメンションに変換するスクリプト
 **/
const fs = require('fs');

// ユーザーマッピングを読み込む
const userMapping = JSON.parse(fs.readFileSync('user_mapping.json', 'utf8'));

// メッセージを定義する
let message = process.argv[2];

// GitHubユーザー名をSlackユーザーIDに変換する
for (const [githubUser, slackUser] of Object.entries(userMapping)) {
  const githubMention = `@${githubUser}`;
  const slackMention = `<@${slackUser}>`;
  message = message.replace(new RegExp(githubMention, 'g'), slackMention);
}

// 変換後のメッセージを環境変数に設定する
console.log(`commentBody<<EOF\n${result}\nEOF`);