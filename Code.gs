// GET

function doGet() {
  var t = HtmlService.createTemplateFromFile("index");
  t.data = loadSortedFeeds_('linux');
  return t.evaluate();
}

function loadSortedFeeds_(source) {
  var items = [];
  var result = findItemsBySource_(source);
  for (i = 0; i<result.length; i++) {
    items.push(result[i]);
  }
  return items;
}

function findItemsBySource_(source) {
  var query = "s=%7B%22timestamp%22: -1%7D&limit=100000";
  var result = UrlFetchApp.fetch(authUrl_(source, query));
  return JSON.parse(result.getContentText());
}

// VIEW

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// SAVE

function update1() {
  urls = ["http://www.haskellforall.com/feeds/posts/default",
            "http://www.reddit.com/r/haskell/.rss",
            "http://planet.haskell.org/rss20.xml"];
    updateSource_('haskell', urls);

    urls = ["http://programming.reddit.com/.rss",
            "http://lambda-the-ultimate.org/rss.xml",
            "http://www.codeproject.com/webservices/articlerss.aspx?cat=1",
            "http://feeds.feedburner.com/oreilly/programming",
            "http://feeds.feedburner.com/ScottHanselman",
            "http://feeds.feedburner.com/nettuts"];
    updateSource_('programming', urls);

    urls = ["http://www.scoop.it/t/gas/rss.xml",
            "http://code.google.com/feeds/updates.xml",
            "http://googleresearch.blogspot.com/atom.xml",
            "http://googleblog.blogspot.com/atom.xml",
            "http://googlewebmastercentral.blogspot.com/atom.xml",
            "http://feeds.feedburner.com/GoogleAppsUpdates"];
    updateSource_('google', urls);

    urls = ["http://feeds.feedburner.com/javaposse",
            "http://blog.gerardin.info/feed",
            "http://blog.interface21.com/main/feed/",
            "http://raibledesigns.com/rd/feed/entries/atom",
            "http://feeds.feedburner.com/JavaCodeGeeks",
            "http://www.dzone.com/feed/frontpage/rss.xml",
            "http://www.oreillynet.com/pub/feed/7?format=rss2",
            "http://codebetter.com/blogs/MainFeed.aspx",
            "http://feeds.feedburner.com/HighScalability",
            "http://www-128.ibm.com/developerworks/views/java/rss/libraryview.jsp",
            "http://www.javalobby.org/forumRSS/18032.xml",
            "http://www.antlr.org/wiki/spaces/createrssfeed.action?types=blogpost&spaces=~admin&sort=modified&title=Terence+Parr+Recent+News+Items&maxResults=15&rssType=atom",
            "http://www.springframework.org/node/feed",
            "http://jakarta.apache.org/site/rss.xml",
            "http://www.summa-tech.com/blog/feed/",
            "http://googlewebtoolkit.blogspot.com/feeds/posts/default",
            "http://www.javaworld.com/index.xml",
            "http://today.java.net/pub/q/articles_rss?x-ver=1.0"];
    updateSource_('java', urls);

    urls = ["http://www.python.org/channews.rdf",
            "http://www.djangoproject.com/rss/weblog/",
            "http://aspn.activestate.com/ASPN/Cookbook/Python/index_rss",
            "http://planet.python.org/rss10.xml"];
    updateSource_('python', urls);
}

function update2() {
    urls = ["http://search.cpan.org/uploads.rdf",
            "http://perlhacks.com/atom.xml",
            "http://www.oreillynet.com/pub/feed/16",
            "http://www.modernperlbooks.com/mt/atom.xml"];
    updateSource_('perl', urls);

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
    updateSource_('linux', urls);

    urls = ["http://pipes.yahoo.com/pipes/pipe.run?_id=4cc8ebb9ae0b852d6ab7d94956ce2638&_render=rss",
            "http://planet.clojure.in/atom.xml"];
    updateSource_('clojure', urls);

    urls = ["http://feeds.feedburner.com/The99Percent",
            "http://feeds.feedburner.com/zenhabits"];
    updateSource_('inspiration', urls);

    urls = ["http://dzone.com/mz/big-data/rss",
            "http://timoelliott.com/blog/feed/atom",
            "http://feeds.feedburner.com/michael-noll",
            "http://feeds.feedburner.com/dataminingblog",
            "http://feeds.feedburner.com/ibm-big-data-hub",
            "http://www.cloudera.com/blog/feed/",
            "http://siliconangle.com/feed/",
            "http://www.bigdata-startups.com/feed/",
            "http://feeds.feedburner.com/kdnuggets-data-mining-analytics",
            "http://feeds.feedburner.com/nosql",
            "http://junkcharts.typepad.com/numbersruleyourworld/atom.xml",
            "http://venturebeat.com/category/big-data/feed/",
            "http://feeds.feedburner.com/MonashInformationServices?format=xml",
            "http://blog.revolutionanalytics.com/atom.xml",
            "http://hortonworks.com/feed/",
            "http://feeds.feedburner.com/smartdatacollective_allposts",
            "http://www.dbms2.com/feed/",
            "http://blog.sematext.com/feed/",
            "http://blog.cloudera.com/feed/",
            "http://blogs.splunk.com/feed/",
            "http://feeds.feedburner.com/typepad/petewarden",
            "http://datascience101.wordpress.com/feed/",
            "http://strata.oreilly.com/feed",
            "http://feeds.feedburner.com/PlanetBigData"];
    updateSource_('bigdata', urls);
}

function update3() {
    urls = ["http://blogs.thoughtworks.com/rss20.xml",
            "http://martinfowler.com/bliki/bliki.atom",
            "http://dannorth.net/feed/"];
    updateSource_('agilewhatever', urls);

    urls = ["http://jmlr.csail.mit.edu/jmlr.xml",
            "http://hunch.net/?feed=rss2",
            "http://ieeexplore.ieee.org/rss/TOC34.XML"];
    updateSource_('machinelearning', urls);

    urls = ["http://feeds.feedburner.com/wpbeginner",
            "http://feeds.feedburner.com/ElegantThemes",
            "http://www.bloggingpro.com/feed/"];
    updateSource_('wordpress', urls);

    urls = ["http://news.ycombinator.com/rss",
            "http://feeds.gawker.com/gizmodo/full",
            "http://feeds.labnol.org/labnol",
            "http://www.hackaday.com/rss.xml",
            "http://feeds.mashable.com/Mashable",
            "http://feeds.feedburner.com/Techcrunch",
            "http://feeds.gawker.com/lifehacker/vip",
            "http://feeds2.feedburner.com/Geekissimo"];
    updateSource_('tech', urls);

    urls = ["http://blog.lusis.org/atom.xml",
            "http://continuousdelivery.com/feed/",
            "http://www.planetpuppet.org/?type=atom10",
            "http://codeascraft.etsy.com/feed/",
            "http://blog.docker.io/feed/",
            "http://www.planetdevops.net/?feed=rss2",
            "http://feeds.everythingsysadmin.com/EverythingSysadmin",
            "http://blog.boxedice.com/feed/",
            "http://rackerhacker.com/feed/",
            "http://feeds.feedburner.com/AllAtlassianBlogs",
            "http://dzone.com/mz/devops/rss",
            "http://jamesbetteley.wordpress.com/feed/",
            "http://standalone-sysadmin.blogspot.com/feeds/posts/default",
            "http://theagileadmin.com/feed/",
            "http://blog.newrelic.com/feed/",
            "http://devopsreactions.tumblr.com/rss",
            "http://feeds.feedburner.com/PuppetLabs",
            "http://feeds.feedburner.com/ContinuousBlog",
            "http://www.opscode.com/blog/feed/"];
    updateSource_('devops', urls);
}

function update4() {
    urls = ["http://sethgodin.typepad.com/seths_blog/atom.xml",
            "http://feeds.feedburner.com/KISSmetrics",
            "http://feeds.feedburner.com/ProbloggerHelpingBloggersEarnMoney",
            "http://feeds.feedburner.com/ducttapemarketing/nRUD",
            "http://feeds.searchenginewatch.com/sewblog",
            "http://feeds.feedburner.com/seomoz",
            "http://feeds.searchengineland.com/searchengineland",
            "http://www.mattcutts.com/blog/feed/",
            "http://blog.hubspot.com/CMS/UI/Modules/BizBlogger/rss.aspx?tabid=6307&moduleid=8441&maxcount=25"];
    updateSource_('seomarketing', urls);

    urls = ["http://feeds.feedburner.com/DilbertDailyStrip",
            "http://what-if.xkcd.com/feed.atom",
            "http://xkcd.com/rss.xml",
            "http://feeds.feedburner.com/Explosm"];
    updateSource_('comics', urls);

    urls = ["http://www.badlogicgames.com/wordpress/?feed=rss2",
            "http://feeds.feedburner.com/blogspot/hsDu",
            "http://www.androidtapp.com/feed/",
            "http://www.androidcentral.com/feed"];
    updateSource_('android', urls);

    urls = ["http://feeds.feedburner.com/CssTricks"];
    updateSource_('ui', urls);

    urls = ["http://feeds.feedburner.com/mrhaki",
            "http://feeds.feedburner.com/groovyblogs",
            "http://feeds.dzone.com/zones/groovy",
            "http://glaforge.free.fr/weblog/xml-rss2.php?catid=2"];
    updateSource_('groovy', urls);
}

function updateSource_(source, urls) {
  for (i = 0; i<urls.length; i++) {
    try {
      var url = urls[i];
      saveItems_(source, url, getItems_(url, getFeedFrom_(url)));    
    } catch (ex) {}
  }
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

function saveItems_(source, url, items) {
  if (items.length > 0) {
    var payload = JSON.stringify(items);
    var options =
        {
          "payload": payload,
          "method": "PUT",
          "contentType": "application/json"
        };
    var query = "q=%7B%22source%22: %22" + url + "%22%7D";
    UrlFetchApp.fetch(authUrl_(source, query), options);
  }  
}

// HELPER

function authUrl_(source, query) {
  return "https://api.mongolab.com/api/1/databases/news/collections/" + source + "?" + query + "&apiKey=<your-apikey-from-mongolab>";
}
