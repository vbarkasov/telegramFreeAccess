TLGR = (function(){
	var settings = {
		debug: false
	};

	var proxyList = [
		'nl1.postls.com:443',
		'nl2.postls.com:443',
		'nl3.postls.com:443',
		'nl4.postls.com:443',
		'nl5.postls.com:443',
		'nl6.postls.com:443',
		'nl7.postls.com:443',
		'nl8.postls.com:443',
		'nl9.postls.com:443',
		'nl10.postls.com:443',
		'nl11.postls.com:443',
		'nl12.postls.com:443',
		'nl13.postls.com:443',
		'nl14.postls.com:443',
		'nl15.postls.com:443',
		'nl16.postls.com:443',
		'nl17.postls.com:443',
		'nl18.postls.com:443',
		'nl19.postls.com:443',
		'nl20.postls.com:443',

		'sg1.postls.com',
		'sg2.postls.com',
		'sg3.postls.com',
		'sg4.postls.com',
		'sg5.postls.com',
		'sg6.postls.com',
		'sg7.postls.com',
		'sg8.postls.com',
		'sg9.postls.com',
		'sg10.postls.com',
		'sg11.postls.com',
		'sg12.postls.com',
		'sg13.postls.com',

		'uk1.postls.com',
		'uk2.postls.com',
		'uk4.postls.com',
		'uk5.postls.com',
		'uk6.postls.com',
		'uk7.postls.com',
		'uk8.postls.com',
		'uk9.postls.com',
		'uk10.postls.com',
		'uk11.postls.com',
		'uk12.postls.com',
		'uk13.postls.com',
		'uk14.postls.com',
		'uk15.postls.com',
		'uk16.postls.com',
		'uk17.postls.com',
		'uk18.postls.com',
		'uk19.postls.com',
		'uk20.postls.com',
		'uk21.postls.com',
		'us-ny-0.justproxy.io:51229',
		'us-ny-17.justproxy.io:443',
		'gb-london-0.justproxy.io:51229',
		'sg-0.justproxy.io:51229'
	];

	var vars = {};

	var methods = {
		log: function(message) {
			if(settings.debug) {
				console.log(message);
			}
		},
		getBrowser: function(){
			if(typeof(chrome) === 'undefined' && typeof(browser) !== 'undefined') {
				return browser;
			} else return chrome;
		},
		init: function() {
			methods.getBrowser().browserAction.onClicked.addListener(function() {
				methods.getBrowser().tabs.create({
					url: 'https://web.telegram.org'
				});
			});
			methods.initProxy();
		},
		initProxy: function(){

			var pacScriptStr = '' +
				'function FindProxyForURL(url, host) {' +
					'if (shExpMatch(host, "telegram.org") || shExpMatch(host, "*.telegram.org") ' +
						'|| shExpMatch(host, "telegra.ph") || shExpMatch(host, "*.telegra.ph") ' +
						'|| shExpMatch(host, "t.me") || shExpMatch(host, "*.t.me")' +
						'|| shExpMatch(host, "cdn4.telesco.pe")) {' +
						'return "' + methods.generateProxyRequestString() + 'DIRECT;"' +
					'} ' +
					'return "DIRECT";' +
				'}';

			var proxySettings = {
				mode: 'pac_script',
				pacScript: {
					data: (function() {
						return pacScriptStr;
					})()
				}
			};

			methods.log(proxySettings);

			methods.getBrowser().proxy.settings.set({
				value: proxySettings,
				scope: 'regular'
			}, function() {
				methods.log('Proxy settings are activated');
			});

			methods.getBrowser().proxy.onProxyError.addListener(function(a) {
				methods.log(a)
			});
		},
		generateProxyRequestString: function(){
			var proxy = methods.shuffleArray(proxyList);

			return 'HTTPS ' + proxy[0] + '; '
				+ 'HTTPS ' + proxy[1] + '; '
				+ 'HTTPS ' + proxy[2] + '; ';
		},

		shuffleArray: function (array) {
			var currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}
	};

	methods.init();
})();
