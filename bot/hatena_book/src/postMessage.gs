// ----------------------------------------------------------------------------
// Post Message
//
// Slack記事を投稿する
// ----------------------------------------------------------------------------

var SLACK_API_URL = 'https://slack.com/api/chat.postMessage?token=';

/*
 * slack にchatを飛ばすためのfunction
 * ver token : slack のワークスペースのトークン
 * ver option : function createPostOptionより作成。
 */
function postMessage(token, option) {
  UrlFetchApp.fetch(SLACK_API_URL + token, option);
}

/**
 * slack のchatのoptionを作成する
 * channel : 投稿するチャンネル名
 * text : テキスト
 * userName : 投稿者名
 * attachments : リッチなメッセージを送るためのデータ　なくても行ける。
 **/
function createPostOption(channel, text, userName, attachments) {
  var payload = {
    'channel': channel,
    'text': text,
    'username': userName,
    'attachments': JSON.stringify([attachments])
  };

  var option = {
    'method': 'POST',
    'payload': payload
  };

  return option;
}

/**
* slack のリッチなメッセージを作成
* color : インデントの線の色
* pretext : その外のメッセージ
* authorName : インデント内に表示される著者名
* authorLink : インデント内に表示されるリンク
* title : インデント内に表示されるタイトル
* titleLink : インデント内に表示されるタイトルのリンク
* text : インデント内に表示されるテキスト
**/
function createAttachment(color,pretext,authorName,authorLink,title,titleLink,text) {
  var attachment = {
    color: color,
    pretext: pretext,
    author_name: authorName,
    author_link: authorLink,
    title: title,
    title_link: titleLink,
    text: text
  };
  return attachment;
}
