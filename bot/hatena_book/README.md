# はてなブックマーク bot

はてなブックマークの IT のページをマイニングし記事を slack に通知する。

## 使い方

1. グーグルのアカウントで`Google Apps Script`を追加する  
   ドライブ等を開き`＋新規`ボタンより追加
1. メニューの`リソース＞ライブラリー`より Parser を追加する  
   key : `M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV`
1. 新しいプロジェクトが開かれたら任意のプロジェクト名にする。
1. メニューの`ファイル＞新規作成＞スクリプトファイル`より以下の 2 つのファイルを作成する

- newTrends.gs
- postMessage.gs

1. 作成したファイルにそれぞれの内容をコピーする。
1. 以下の URL より Slack のワークスペースのトークンを生成する。(＊トークンの扱いには注意)  
   https://api.slack.com/custom-integrations/legacy-tokens
1. 作成したトークンを`newTrends.gs`の SLACK_TOKEN に設定する。
1. 投稿するチャンネル名を設定する。
1. メニューの`編集＞現在のプロジェクトのトリガー`より以下の function のトリガーを設定する。

- postNewTrends : 新規記事専用
