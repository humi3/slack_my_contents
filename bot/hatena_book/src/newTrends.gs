/*
 * HATENA_BOOK_ITのトレンドの記事をslackに投稿するbot
 */
const SLACK_TOKEN = 'slackのトークン';

const HATENA_BOOK_IT_URL = 'https://b.hatena.ne.jp/hotentry/it';
const HATENA_BOOK_IT_COLOR_NEW = '#5ac300';
const SLACL_CHANNEL = '通知チャンネル名';
const BOT_NAME = 'はてなブックマークIT通知bot';

/**
 * 現状の記事を送信する
 **/
function postNewTrends() {
  let date = new Date();
  let time = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日 h時');

  let attachments = createTrendsAttachments();
  let option = createPostOption(SLACL_CHANNEL, BOT_NAME, attachments);
  postMessage(SLACK_TOKEN, option);
}

/**
 * 記事のattachmentsを作成する
 **/
function createTrendsAttachments() {
  let attachments = [];
  
  let hatena_book_it_url = HATENA_BOOK_IT_URL;
  
  let html = UrlFetchApp.fetch(hatena_book_it_url).getContentText('UTF-8');
  
  let items = Parser.data(html).from('<h3 class="entrylist-contents-title">').to('</h3>').iterate();
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];    
    let title = item.match(/title="(.+?)"/)[1];
    let url = item.match(/href="(.+?)"/)[1];
    attachments.push(createAttachment(HATENA_BOOK_IT_COLOR_NEW, null, null, null, title, url, null))
  }

  return attachments;
}
