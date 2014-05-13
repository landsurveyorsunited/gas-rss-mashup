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
  urls = ["http://www.howtoforge.com/node/feed", 
          "http://www.osnews.com/files/recent.xml", 
          "http://www.webupd8.org/feeds/posts/default", 
          "http://linuxtoday.com/backend/biglt.rss",
          "http://www.linuxjournal.com/node/feed", 
          "http://feeds.feedburner.com/d0od",
          "http://www.ubuntugeek.com/feed/", 
          "http://rss.slashdot.org/Slashdot/slashdotLinux"];
  for (i = 0; i<urls.length; i++) {
    try {
      saveFeed_(urls[i]);    
    } catch (ex) {
    }
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
  var feed = result.getContentText();
  var doc = Xml.parse(feed, false);  
  var items = doc.getElement().getElement("channel").getElements("item");
  return items;
}

function getItems_(url, items) {
  var parsedItems = [];
  for (var i = 0; i < items.length; i++) {
    var utc = new Date(items[i].getElement("pubDate").getText());
    var item = {
      title: items[i].getElement("title").getText(),
      link: items[i].getElement("link").getText(),
      timestamp: utc.getTime().toString(),
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