# qiita bot
　Qiitaのトレンドのページをマイニングし記事をslackに通知する。
## 使い方
1. グーグルのアカウントで`Google Apps Script `を追加する  
ドライブ等を開き`＋新規`ボタンより追加
1. メニューの`リソース＞ライブラリー`よりParserを追加する  
  key : `M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV`
1. 新しいプロジェクトが開かれたら任意のプロジェクト名にする。
1. メニューの`ファイル＞新規作成＞スクリプトファイル`より以下の2つのファイルを作成する
  * newTrends.gs
  * postMessage.gs
1. 作成したファイルにそれぞれの内容をコピーする。
1. 以下のURLよりSlackのワークスペースのトークンを生成する。(＊トークンの扱いには注意)  
  https://api.slack.com/custom-integrations/legacy-tokens  
1. 作成したトークンを`newTrends.gs`のSLACK_TOKENに設定する。
1. 投稿するチャンネル名を設定する。
1. メニューの`編集＞現在のプロジェクトのトリガー`より以下のfunctionのトリガーを設定する。
  * postNewTrends : 新規記事専用
  * postWeeklyTrends : 週記事専用
  * postMonthlyTrends : 月記事専用
