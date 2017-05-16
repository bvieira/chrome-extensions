(function() {
	'use strict';

	chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
		var urlContent = document.createElement('a');
	    urlContent.href = details.url;

		if( !urlContent.hostname.match(/^ip-([0-9]{1,3}-){3}[0-9]{1,3}.*(\.compute\.internal|\.ec2\.internal)$/) ) {
			return;
		}

		var urlIP = details.url.replace(/.*ip-([0-9]{1,3})-([0-9]{1,3})-([0-9]{1,3})-([0-9]{1,3}).*/g, "$1.$2.$3.$4")
		chrome.tabs.update(details.tabId, { url:  details.url.replace(urlContent.hostname, urlIP)})
	});

})();