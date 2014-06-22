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
  urls = ["http://www.osnews.com/files/recent.xml",
          "http://lwn.net/headlines/newrss",
          "http://fullcirclemagazine.org/feed/",
          "http://www.raspberrypi.org/feed",
          "http://www.linuxjournal.com/node/feed",
          "http://www.linux.com/rss/feeds.php",
          "http://feeds.feedburner.com/TheGeekStuff",
          "http://www.howtoforge.com/node/feed",
          "http://www.webupd8.org/feeds/posts/default",
          "http://feeds.cyberciti.biz/Nixcraft-LinuxFreebsdSolarisTipsTricks",
          "http://planet.ubuntulinux.org/rss20.xml",
          "http://www.archlinux.org/feeds/news/",
          "http://linuxtoday.com/backend/biglt.rss",
          "http://distrowatch.com/news/dw.xml",
          "http://feeds.feedburner.com/d0od",
          "http://feeds.feedburner.com/Phoronix",
          "http://www.linuxinsider.com/perl/syndication/rssfull.pl",
          "http://rss.slashdot.org/Slashdot/slashdotLinux",
          "http://www.ubuntugeek.com/feed/",
          "http://feeds2.feedburner.com/Command-line-fu"];
  for (i = 0; i<urls.length; i++) {
    try {
      saveFeed_(urls[i]);    
    } catch (ex) {
    }
  }
}

function loadSortedFeeds_() {
  var items = [];
  var result = findItemsBySource_();
  for (i = 0; i<result.length; i++) {
    items.push(result[i]);
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
    saveItemsBySource_(url, items);    
  }  
}

function saveItemsBySource_(source, items) {
  var payload = JSON.stringify(items);
  var options =
   {
     "payload": payload,
     "method": "PUT",
	 "contentType": "application/json"
   };
  var query = "q=%7B%22source%22: %22" + source + "%22%7D";
  UrlFetchApp.fetch(authUrl_(query), options);
}

function findItemsBySource_() {
  var query = "s=%7B%22timestamp%22: -1%7D&limit=100000";
  var result = UrlFetchApp.fetch(authUrl_(query));
  return JSON.parse(result.getContentText());
}

function authUrl_(query) {
  return "https://api.mongolab.com/api/1/databases/linux/collections/thedailylinux?" + query + "&apiKey=<your-apikey-from-mongolab>";
}
