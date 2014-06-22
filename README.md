Gas Rss Mashup
==============

This script shows you an example of mashed up rss feeds embeddable in your Google site.

The main code in the file Code.gs includes two public methods:

```
function doGet() {...}

function update() {...}
```

The first returns the saved content from the ~~ScriptDb~~ MongoDb (at [Mongolab] via remote API) that will be displayed on your website.

The second fetches and parses the feeds and saves the result on the ~~ScriptDb~~ MongoDb. This method needs to be time-driven triggered (e.g. to run every 2 hours). That can be done easily from your Google's script editor page as suggested [at this page].

Before continuing, please visit the sample website running this script [here].

To include the script in your site follow [these instructions]. 

[here]:http://sites.google.com/site/thedailylinux/
[these instructions]:http://developers.google.com/apps-script/execution_gadgets#embedding
[at this page]:http://developers.google.com/apps-script/understanding_triggers#TimeTriggers
[Mongolab]:http://mongolab.com/

