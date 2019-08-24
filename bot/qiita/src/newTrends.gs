/*
 * qiitaのトレンドの記事をslackに投稿するbot
 */
var SLACK_TOKEN = 'ワークスペースのトークン';

var QIITA_URL = 'https://qiita.com/';
var QIITA_COLOR_NEW = '#5ac300';
var QIITA_COLOR_WEEKLY = '#FFF33F';
var QIITA_COLOR_MONTHLY = '#1D2088';
var SLACL_CHANNEL = '投稿するチャンネル名';
var BOT_NAME = 'qiitaトレンド通知bot';

/**
 * 新着のトレンドを送信する
 *
 * 送信　5時　17時
 **/
function postNewTrends() {
  var date = new Date();
  var time = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日 h時');

  var attachments = createTrendsAttachments(QIITA_URL, QIITA_COLOR_NEW, true);
  var text = '投稿日時：' + time + '\n' + 'new：' + attachments.length + '件'
  var option = createPostOption(SLACL_CHANNEL, text, BOT_NAME, attachments);
  postMessage(SLACK_TOKEN, option);
}

/**
 * 週のトレンドを送信する
 *
 * 送信　月曜日　木曜日
 **/
function postWeeklyTrends() {
  var date = new Date();
  var time = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日');

  var qiitaUrl = QIITA_URL + '?scope=weekly';

  var attachments = createTrendsAttachments(qiitaUrl, QIITA_COLOR_WEEKLY, false);
  var text = '投稿日時：' + time + '\n' + 'new：' + attachments.length + '件'
  var option = createPostOption(SLACL_CHANNEL, text, BOT_NAME, attachments);
  postMessage(SLACK_TOKEN, option);
}

/**
 * 月のトレンドを送信する
 *
 * 送信　1日　15日
 **/
function postMonthlyTrends() {
  var date = new Date();
  var time = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日');

  var qiitaUrl = QIITA_URL + '?scope=monthly';

  var attachments = createTrendsAttachments(qiitaUrl, QIITA_COLOR_MONTHLY, false);
  var text = '投稿日時：' + time + '\n' + 'new：' + attachments.length + '件'
  var option = createPostOption(SLACL_CHANNEL, text, BOT_NAME, attachments);
  postMessage(SLACK_TOKEN, option);
}

/**
 * 記事のattachmentsを作成する
 *
 * qiitaUrl : スレイピングするURL
 * coler : インデントの線の色
 * isNew : true 新記事のみを表示する false すべて表示する。
 **/
function createTrendsAttachments(qiitaUrl, color, isNew) {
  var attachments = [];

  var html = UrlFetchApp.fetch(qiitaUrl).getContentText();

  var items = Parser.data(html).from('{&quot;followingLikers').to('}}}').iterate();
  for (var i = 0; i < items.length; i++) {

    var isNewArrival = items[i].match(/isNewArrival&quot;:(.+?),/)[1]
    if (isNew && isNewArrival === 'false') {
      continue
    }
    var createdAt = items[i].match(/createdAt&quot;:&quot;(.+?)&quot;,/)[1]
    var likesCount = items[i].match(/likesCount&quot;:(.+?),/)[1]
    var title = items[i].match(/title&quot;:&quot;(.+?)&quot;,/)[1]
    var uuid = items[i].match(/uuid&quot;:&quot;(.+?)&quot;,/)[1]
    var urlName = items[i].match(/urlName&quot;:&quot;(.+?)&quot;/)[1]

    var userUrl = QIITA_URL + urlName;
    var trendUrl = userUrl + '/items/' + uuid;

    var text = '投稿日 : ' + createdAt + '\n' + 'いいね数 : ' + likesCount;

    attachments.push(createAttachment(color, null, 'by ' + urlName, userUrl, title, trendUrl, text))
  }

  return attachments;
}
