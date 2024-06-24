/**
 * GithubのメンションをSlackメンションに変換するスクリプト
 **/
const fs = require("fs");

// ユーザーマッピングを読み込む
const userMapping = JSON.parse(
  fs.readFileSync(".github/scripts/github-slack_user_mapping.json", "utf8"),
);

// メッセージを定義するgithub-slack_user_mapping
let message = process.argv[2];

// GitHubユーザー名をSlackユーザーIDに変換する
for (const [githubUser, slackUser] of Object.entries(userMapping)) {
  const githubMention = `@${githubUser}`;
  const slackMention = `<@${slackUser}>`;
  message = message.replace(new RegExp(githubMention, "g"), slackMention);
}

// 変換後のメッセージを環境変数に設定する
console.log(`commentBody<<EOF\n${message}\nEOF`);
