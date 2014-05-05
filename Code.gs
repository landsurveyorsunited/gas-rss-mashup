function doGet() {
  var t = HtmlService.createTemplateFromFile("index");
  t.data = loadSortedFeeds_();
  return t.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function update() {
  urls = ["http://www.howtoforge.com/node/feed", "http://www.osnews.com/files/recent.xml", 
          "http://www.webupd8.org/feeds/posts/default", "http://linuxtoday.com/backend/biglt.rss", 
          "http://www.linuxjournal.com/node/feed", "http://feeds.feedburner.com/d0od",
          "http://www.ubuntugeek.com/feed/", "http://rss.slashdot.org/Slashdot/slashdotLinux"];
  for (i = 0; i<urls.length; i++) {
    saveFeed_(urls[i]);
  }
}

function loadSortedFeeds_() {
  var items = [];
  var db = ScriptDb.getMyDb();
  var result = db.query({}).sortBy('timestamp', db.DESCENDING);
  while (result.hasNext()) {
    items.push(result.next());
  }
  return items;
}

function saveFeed_(url) {
  saveItems_(url, getItems_(url, getFeedFrom_(url)));
}

function getFeedFrom_(url) {
  var result = UrlFetchApp.fetch(url);
  var items = [];
  if (result.getResponseCode() == 200) {
    var feed = result.getContentText();
    var doc = Xml.parse(feed, false);  
    items = doc.getElement().getElement("channel").getElements("item");
  }
  return items;
}

function getItems_(url, items) {
  var parsedItems = [];
  for (var i = 0; i < items.length; i++) {
    var utc = new Date(items[i].getElement("pubDate").getText()).toUTCString();
    var utcDate = new Date(utc);
    var item = {
      title: items[i].getElement("title").getText(),
      link: items[i].getElement("link").getText(),
      day: utcDate.getUTCDate(),
      month: utcDate.getUTCMonth(),
      year: utcDate.getUTCFullYear(),
      timestamp: utcDate.getTime(),
      source: url
    };
    parsedItems.push(item);
  }
  return parsedItems;
}

function saveItems_(url, items) {
  if (items.length > 0) {
    var db = ScriptDb.getMyDb();
    var result = db.query({source: url});
    while (result.hasNext()) {
      var item = result.next()
      db.remove(item);
    }
    result = db.saveBatch(items, false);
  }  
}
