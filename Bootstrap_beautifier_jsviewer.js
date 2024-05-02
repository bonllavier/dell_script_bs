(function ensightenInit() {
	var ensightenOptions = {
		client: "dell",
		clientId: 123,
		publishPath: "external",
		isPublic: 0,
		serverComponentLocation: "nexus.ensighten.com/dell/external/serverComponent.php",
		staticJavascriptPath: "nexus.ensighten.com/dell/external/code/",
		ns: 'Bootstrapper',
		nexus: "nexus.ensighten.com",
		scUseCacheBuster: "true",
		enableTagAuditBeacon: "true",
		enablePagePerfBeacon: "true",
		registryNs: "ensBootstraps",
		generatedOn: "Mon Apr 22 12:14:31 GMT 2024",
		beaconSamplingSeedValue: 11
	};
	if (!window[ensightenOptions.ns]) {
		window[ensightenOptions.registryNs] || (window[ensightenOptions.registryNs] = {});
		window[ensightenOptions.registryNs][ensightenOptions.ns] = window[ensightenOptions.ns] = function(l) {
			function m(a) {
				this.name = "DependencyNotAvailableException";
				this.message = "Dependency with id " + a + "is missing"
			}

			function n(a) {
				this.name = "BeaconException";
				this.message = "There was an error durring beacon initialization";
				a = a || {};
				this.lineNumber = a.lineNumber || a.line;
				this.fileName = a.fileName
			}

			function q() {
				for (var a = c.dataDefinitionIds.length, b = !0, d = 0; d < a; d++) {
					var f = c.dataDefinitions[c.dataDefinitionIds[d]];
					if (!f ||
						null == f.endRegistration) {
						b = !1;
						break
					}
				}
				b && c.callOnDataDefintionComplete()
			}
			var e = {},
				c = {};
			c.ensightenOptions = ensightenOptions;
			c.scDataObj = {};
			e.version = "1.26.0";
			e.nexus = l.nexus || "nexus.ensighten.com";
			e.rand = -1;
			e.currSec = (new Date).getSeconds();
			e.options = {
				interval: l.interval || 100,
				erLoc: l.errorLocation || e.nexus + "/error/e.gif",
				scLoc: l.serverComponentLocation || e.nexus + "/" + l.client + "/serverComponent.php",
				sjPath: l.staticJavascriptPath || e.nexus + "/" + l.client + "/code/",
				alLoc: l.alertLocation || e.nexus + "/alerts/a.gif",
				publishPath: l.publishPath,
				isPublic: l.isPublic,
				client: l.client,
				clientId: l.clientId,
				enableTagAuditBeacon: l.enableTagAuditBeacon,
				beaconSamplingSeedValue: l.beaconSamplingSeedValue || -1
			};
			e.ruleList = [];
			e.allDeploymentIds = [];
			e.runDeploymentIds = [];
			e.runRuleIds = [];
			e.exceptionList = [];
			e.ensightenVariables = {};
			e.test = function(a) {
				if (!(a.executionData.hasRun || a.executionData.runTime && 0 < a.executionData.runTime.length)) {
					for (var b = 0; b < a.dependencies.length; b++)
						if (!1 === a.dependencies[b]()) return;
					a.execute()
				}
			};
			m.prototype =
				Error();
			m.prototype || (m.prototype = {});
			m.prototype.constructor = m;
			e.DependencyNotAvailableException = m;
			n.prototype = Error();
			n.prototype || (n.prototype = {});
			n.prototype.constructor = n;
			e.BeaconException = n;
			e.checkForInvalidDependencies = function(a, b, d, f) {
				for (a = 0; a < d.length; a++)
					if ("DEPENDENCYNEVERAVAILABLE" === d[a]) return c.currentRuleId = this.id, c.currentDeploymentId = this.deploymentId, c.reportException(new e.DependencyNotAvailableException(f[a])), b && -1 !== b && e.allDeploymentIds.push(b), !0;
				return !1
			};
			c.currentRuleId = -1;
			c.currentDeploymentId = -1;
			c.reportedErrors = [];
			c.reportedAlerts = [];
			c.AF = [];
			c._serverTime = "";
			c._clientIP = "";
			c.sampleBeacon = function() {
				var a = !1;
				try {
					var b = (e.currSec || 0) % 20,
						d = e.options.beaconSamplingSeedValue; - 1 === d ? a = !0 : 0 !== b && 0 === d % b && (a = !0)
				} catch (f) {}
				return a
			};
			c.getServerComponent = function(a) {
				c.callOnGetServerComponent();
				c.insertScript(window.location.protocol + "//" + e.options.scLoc, !1, a || !0)
			};
			c.setVariable = function(a, b) {
				e.ensightenVariables[a] = b
			};
			c.getVariable = function(a) {
				return a in e.ensightenVariables ?
					e.ensightenVariables[a] : null
			};
			c.testAll = function() {
				for (var a = 0; a < e.ruleList.length; a++) e.test(e.ruleList[a])
			};
			c.executionState = {
				DOMParsed: !1,
				DOMLoaded: !1,
				dataDefinitionComplete: !1,
				conditionalRules: !1,
				readyForServerComponent: !1
			};
			c.reportException = function(a) {
				a.timestamp = (new Date).getTime();
				e.exceptionList.push(a);
				a = window.location.protocol + "//" + e.options.erLoc + "?msg=" + encodeURIComponent(a.message || "") + "&lnn=" + encodeURIComponent(a.lineNumber || a.line || -1) + "&fn=" + encodeURIComponent(a.fileName || "") + "&cid=" +
					encodeURIComponent(e.options.clientId || -1) + "&client=" + encodeURIComponent(e.options.client || "") + "&publishPath=" + encodeURIComponent(e.options.publishPath || "") + "&rid=" + encodeURIComponent(c.currentRuleId || -1) + "&did=" + encodeURIComponent(c.currentDeploymentId || -1) + "&errorName=" + encodeURIComponent(a.name || "");
				a = c.imageRequest(a);
				a.timestamp = (new Date).getTime();
				this.reportedErrors.push(a)
			};
			c.Rule = function(a) {
				this.execute = function() {
					this.executionData.runTime.push(new Date);
					c.currentRuleId = this.id;
					c.currentDeploymentId =
						this.deploymentId;
					try {
						this.code()
					} catch (b) {
						window[ensightenOptions.ns].reportException(b)
					} finally {
						this.executionData.hasRun = !0, -1 !== this.deploymentId && (e.runDeploymentIds.push(this.deploymentId), e.runRuleIds.push(this.id)), c.testAll()
					}
				};
				this.id = a.id;
				this.deploymentId = a.deploymentId;
				this.dependencies = a.dependencies || [];
				this.code = a.code;
				this.executionData = {
					hasRun: !1,
					runTime: []
				}
			};
			c.registerRule = function(a) {
				if (c.getRule(a.id) && -1 !== a.id) return !1;
				e.ruleList.push(a); - 1 !== a.deploymentId && e.allDeploymentIds.push(a.deploymentId);
				c.testAll();
				return !0
			};
			c.getRule = function(a) {
				for (var b = 0; b < e.ruleList.length; b++)
					if (e.ruleList[b].id === a) return e.ruleList[b];
				return !1
			};
			c.getRuleList = function() {
				return e.ruleList
			};
			c.clearRuleList = function() {
				e.ruleList = []
			};
			c.getAllDeploymentIds = function() {
				return e.allDeploymentIds
			};
			c.getRunRuleIds = function() {
				return e.runRuleIds
			};
			c.getRunDeploymentIds = function() {
				return e.runDeploymentIds
			};
			c.hasRuleRun = function(a) {
				return (a = c.getRule(a)) ? a.executionData.hasRun : !1
			};
			e.toTwoChar = function(a) {
				return (2 === a.toString().length ?
					"" : "0") + a
			};
			c.Alert = function(a) {
				var b = new Date;
				b = b.getFullYear() + "-" + e.toTwoChar(b.getMonth()) + "-" + e.toTwoChar(b.getDate()) + " " + e.toTwoChar(b.getHours()) + ":" + e.toTwoChar(b.getMinutes()) + ":" + e.toTwoChar(b.getSeconds());
				this.severity = a.severity || 1;
				this.subject = a.subject || "";
				this.type = a.type || 1;
				this.ruleId = a.ruleId || -1;
				this.severity = encodeURIComponent(this.severity);
				this.date = encodeURIComponent(b);
				this.subject = encodeURIComponent(this.subject);
				this.type = encodeURIComponent(this.type)
			};
			c.generateAlert = function(a) {
				a =
					c.imageRequest(window.location.protocol + "//" + e.options.alLoc + "?d=" + a.date + "&su=" + a.subject + "&se=" + a.severity + "&t=" + a.type + "&cid=" + e.options.clientId + "&client=" + e.options.client + "&publishPath=" + e.options.publishPath + "&rid=" + c.currentRuleId + "&did=" + c.currentDeploymentId);
				a.timestamp = (new Date).getTime();
				this.reportedAlerts.push(a)
			};
			c.imageRequest = function(a) {
				var b = new Image(0, 0);
				b.src = a;
				return b
			};
			c.insertScript = function(a, b, d) {
				var f = document.getElementsByTagName("script"),
					g;
				if (void 0 !== b ? b : 1)
					for (g =
						0; g < f.length; g++)
						if (f[g].src === a && f[g].readyState && /loaded|complete/.test(f[g].readyState)) return;
				if (d) {
					d = 1 == d && "object" == typeof c.scDataObj ? c.scDataObj : d;
					e.rand = Math.random() * ("1E" + (10 * Math.random()).toFixed(0));
					b = window.location.href;
					"object" === typeof d && d.PageID && (b = d.PageID, delete d.PageID);
					if ("object" === typeof d)
						for (g in d) {
							g = ~b.indexOf("#") ? b.slice(b.indexOf("#"), b.length) : "";
							b = b.slice(0, g.length ? b.length - g.length : b.length);
							b += ~b.indexOf("?") ? "&" : "?";
							for (k in d) b += k + "=" + d[k] + "&";
							b = b.slice(0,
								-1) + g;
							break
						}
					a = a + "?namespace=" + (ensightenOptions.ns + "&");
					a += "staticJsPath=" + ensightenOptions.staticJavascriptPath + "&";
					a += "publishedOn=" + ensightenOptions.generatedOn + "&";
					a += "ClientID=" + encodeURIComponent(e.options.clientId) + "&PageID=" + encodeURIComponent(b)
				}(function(h, p, u) {
					var r = p.head || p.getElementsByTagName("head");
					setTimeout(function() {
						if ("item" in r) {
							if (!r[0]) {
								setTimeout(arguments.callee, 25);
								return
							}
							r = r[0]
						}
						var t = p.createElement("script");
						t.src = u;
						t.onload = t.onerror = function() {
							this.addEventListener &&
								(this.readyState = "loaded")
						};
						r.insertBefore(t, r.firstChild)
					}, 0)
				})(window, document, a)
			};
			c.loadScriptCallback = function(a, b, d) {
				var f = document.getElementsByTagName("script"),
					g;
				d = f[0];
				for (g = 0; g < f.length; g++)
					if (f[g].src === a && f[g].readyState && /loaded|complete/.test(f[g].readyState)) try {
						b()
					} catch (h) {
						window[ensightenOptions.ns].reportException(h)
					} finally {
						return
					}
				f = document.createElement("script");
				f.type = "text/javascript";
				f.async = !0;
				f.src = a;
				f.onerror = function() {
					this.addEventListener && (this.readyState = "loaded")
				};
				f.onload = f.onreadystatechange = function() {
					if (!this.readyState || "complete" === this.readyState || "loaded" === this.readyState) {
						this.onload = this.onreadystatechange = null;
						this.addEventListener && (this.readyState = "loaded");
						try {
							b.call(this)
						} catch (h) {
							window[ensightenOptions.ns].reportException(h)
						}
					}
				};
				d.parentNode.insertBefore(f, d)
			};
			c.insertPageFiles = function(a) {
				var b = 0,
					d = 0,
					f = function() {
						d == a.length - 1 && window[ensightenOptions.ns].callOnPageSpecificCompletion();
						d++
					};
				for (b = 0; b < a.length; ++b) window[ensightenOptions.ns].loadScriptCallback(a[b],
					f)
			};
			c.unobtrusiveAddEvent = function(a, b, d) {
				try {
					var f = a[b] ? a[b] : function() {};
					a[b] = function() {
						d.apply(this, arguments);
						return f.apply(this, arguments)
					}
				} catch (g) {
					window[ensightenOptions.ns].reportException(g)
				}
			};
			c.anonymous = function(a, b) {
				return function() {
					try {
						c.currentRuleId = b ? b : "anonymous", a()
					} catch (d) {
						window[ensightenOptions.ns].reportException(d)
					}
				}
			};
			c.setCurrentRuleId = function(a) {
				c.currentRuleId = a
			};
			c.setCurrentDeploymentId = function(a) {
				c.currentDeploymentId = a
			};
			c.bindImmediate = function(a, b, d) {
				if ("function" ===
					typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.bindDOMParsed = function(a, b, d) {
				if ("function" === typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [function() {
						return window[ensightenOptions.ns].executionState.DOMParsed
					}],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.bindDOMLoaded = function(a, b, d) {
				if ("function" === typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [function() {
						return window[ensightenOptions.ns].executionState.DOMLoaded
					}],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.bindPageSpecificCompletion = function(a, b, d) {
				if ("function" === typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [function() {
						return window[ensightenOptions.ns].executionState.conditionalRules
					}],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.bindOnGetServerComponent = function(a, b, d) {
				if ("function" === typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [function() {
						return window[ensightenOptions.ns].executionState.readyForServerComponent
					}],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.bindDataDefinitionComplete = function(a, b, d) {
				if ("function" === typeof a) a = new c.Rule({
					id: b || -1,
					deploymentId: d || -1,
					dependencies: [function() {
						return window[ensightenOptions.ns].executionState.dataDefinitionComplete
					}],
					code: a
				});
				else if ("object" !== typeof a) return !1;
				c.registerRule(a)
			};
			c.checkHasRun = function(a) {
				if (0 === a.length) return !0;
				for (var b, d = 0; d < a.length; ++d)
					if (b = c.getRule(parseInt(a[d], 10)), !b || !b.executionData.hasRun) return !1;
				return !0
			};
			c.bindDependencyImmediate = function(a, b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !== typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.bindDependencyDOMLoaded = function(a, b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].executionState.DOMLoaded
					});
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !== typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.bindDependencyDOMParsed = function(a, b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].executionState.DOMParsed
					});
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !==
						typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.bindDependencyPageSpecificCompletion = function(a, b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].executionState.conditionalRules
					});
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !== typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.bindDependencyOnGetServerComponent = function(a,
				b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].executionState.readyForServerComponent
					});
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !== typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.bindDependencyPageSpecificCompletion = function(a, b, d, f, g) {
				var h = [];
				if (!e.checkForInvalidDependencies(b, f, d, g)) {
					h.push(function() {
						return window[ensightenOptions.ns].executionState.dataDefinitionComplete
					});
					h.push(function() {
						return window[ensightenOptions.ns].checkHasRun(d)
					});
					if ("function" === typeof a) a = new c.Rule({
						id: b || -1,
						deploymentId: f || -1,
						dependencies: h,
						code: a
					});
					else if ("object" !== typeof a) return !1;
					c.registerRule(a)
				}
			};
			c.dataDefintionIds = [];
			c.dataDefinitions = [];
			c.pageSpecificDataDefinitionsSet = !1;
			c.setPageSpecificDataDefinitionIds = function(a) {
				for (var b = a ? a.length : 0, d = 0; d < b; d++) {
					var f = a[d];
					if (Array.prototype.indexOf) - 1 == c.dataDefinitionIds.indexOf(f) && c.dataDefinitionIds.push(f);
					else {
						for (var g = !1, h =
								c.dataDefinitionIds.length, p = 0; p < h; p++)
							if (c.dataDefinitionIds[p] === f) {
								g = !0;
								break
							} g || c.dataDefinitionIds.push(f)
					}
				}
				c.pageSpecificDataDefinitionsSet = !0;
				q()
			};
			c.DataDefinition = function(a, b) {
				this.id = a;
				this.registrationFn = b;
				this.endRegistrationTime = this.startRegistrationTime = null;
				this.startRegistration = function() {
					this.startRegistrationTime = new Date
				};
				this.endRegistration = function() {
					this.endRegistrationTime = new Date
				}
			};
			c.registerDataDefinition = function(a, b) {
				var d = c.dataDefinitions[b];
				d || (d = new c.DataDefinition(b,
					a), c.dataDefinitions[b] = d);
				d.startRegistrationTime || (d.startRegistration(), d.registrationFn(), d.endRegistration());
				c.pageSpecificDataDefinitionsSet && q()
			};
			c.callOnDataDefintionComplete = function() {
				c.executionState.dataDefinitionComplete = !0;
				c.testAll()
			};
			c.callOnDOMParsed = function() {
				window[ensightenOptions.ns].executionState.DOMParsed = !0;
				window[ensightenOptions.ns].testAll()
			};
			c.callOnDOMLoaded = function() {
				window[ensightenOptions.ns].executionState.DOMParsed = !0;
				window[ensightenOptions.ns].executionState.DOMLoaded = !0;
				window[ensightenOptions.ns].testAll()
			};
			c.callOnPageSpecificCompletion = function() {
				for (var a = document.getElementsByTagName("script"), b = 0, d = a.length; b < d; b++)
					if (a[b].src && a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i) && "loaded" != a[b].readyState && "complete" != a[b].readyState) {
						setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion, 50);
						return
					} setTimeout(function() {
					window[ensightenOptions.ns].executionState.conditionalRules = !0;
					window[ensightenOptions.ns].testAll()
				}, 1)
			};
			c.callOnGetServerComponent =
				function() {
					window[ensightenOptions.ns].executionState.readyForServerComponent = !0;
					window[ensightenOptions.ns].testAll()
				};
			c.hasDOMParsed = function() {
				return window[ensightenOptions.ns].executionState.DOMParsed
			};
			c.hasDOMLoaded = function() {
				return window[ensightenOptions.ns].executionState.DOMLoaded
			};
			c.hasPageSpecificCompletion = function() {
				return window[ensightenOptions.ns].executionState.conditionalRules
			};
			var v = function() {
				var a = [],
					b = !1,
					d = !1;
				return {
					add: function(f) {
						b && !d ? f() : "function" == typeof f && (a[a.length] =
							f)
					},
					exec: function() {
						d = !0;
						do {
							var f = a;
							a = [];
							b = !0;
							for (var g = 0; g < f.length; g++) try {
								f[g].call(window)
							} catch (h) {
								window[ensightenOptions.ns].reportException(h)
							}
						} while (0 < a.length);
						d = !1
					},
					haveRun: function() {
						return b
					}
				}
			};
			c.new_fArray = function() {
				return v()
			};
			e.timer = null;
			(function() {
				function a(f, g) {
					return function() {
						f.apply(g, arguments)
					}
				}
				window.console || (window.console = {});
				var b = window.console;
				if (!b.log)
					if (window.log4javascript) {
						var d = log4javascript.getDefaultLogger();
						b.log = a(d.info, d);
						b.debug = a(d.debug, d);
						b.info =
							a(d.info, d);
						b.warn = a(d.warn, d);
						b.error = a(d.error, d)
					} else b.log = function() {};
				b.debug || (b.debug = b.log);
				b.info || (b.info = b.log);
				b.warn || (b.warn = b.log);
				b.error || (b.error = b.log)
			})();
			document.addEventListener ? (-1 < navigator.userAgent.indexOf("AppleWebKit/") ? e.timer = window.setInterval(function() {
				/loaded|interactive|complete/.test(document.readyState) && (clearInterval(e.timer), c.callOnDOMParsed())
			}, 50) : document.addEventListener("DOMContentLoaded", c.callOnDOMParsed, !1), window.addEventListener("load", c.callOnDOMLoaded,
				!1)) : (setTimeout(function() {
				var a = window.document;
				(function() {
					try {
						if (!document.body) throw "continue";
						a.documentElement.doScroll("left")
					} catch (b) {
						setTimeout(arguments.callee, 15);
						return
					}
					window[ensightenOptions.ns].callOnDOMParsed()
				})()
			}, 1), window.attachEvent("onload", function() {
				window[ensightenOptions.ns].callOnDOMLoaded()
			}));
			document.readyState && "complete" === document.readyState && (c.executionState.DOMParsed = !0, c.executionState.DOMLoaded = !0);
			"true" === e.options.enableTagAuditBeacon && c.sampleBeacon() &&
				window.setTimeout(function() {
					if (window[ensightenOptions.ns] && !window[ensightenOptions.ns].mobilePlatform) try {
						for (var a = [], b, d, f, g, h = 0; h < e.ruleList.length; ++h) d = e.ruleList[h], f = d.executionData.hasRun ? "1" : "0", g = d.deploymentId.toString() + "|" + d.id.toString() + "|" + f, a.push(g);
						b = "[" + a.join(";") + "]";
						var p = window.location.protocol + "//" + e.nexus + "/" + encodeURIComponent(l.client) + "/" + encodeURIComponent(l.publishPath) + "/TagAuditBeacon.rnc?cid=" + encodeURIComponent(l.clientId) + "&data=" + b + "&idx=0&r=" + e.rand;
						c.imageRequest(p)
					} catch (u) {
						c.currentRuleId = -1, c.currentDeploymentId = -1, a = new e.BeaconException(u), window[ensightenOptions.ns].reportException(a)
					}
				}, 3E3);
			window.setInterval(c.testAll, e.options.interval);
			return c
		}(ensightenOptions);
		"true" === ensightenOptions.enablePagePerfBeacon && window[ensightenOptions.ns] && window[ensightenOptions.ns].sampleBeacon() && window[ensightenOptions.ns].bindDOMParsed(function() {
			if (!window[ensightenOptions.ns].mobilePlatform) {
				var l = window.performance;
				if (l) {
					l = l.timing || {};
					var m = l.navigationStart || 0,
						n = {
							connectEnd: "ce",
							connectStart: "cs",
							domComplete: "dc",
							domContentLoadedEventEnd: "dclee",
							domContentLoadedEventStart: "dcles",
							domInteractive: "di",
							domLoading: "dl",
							domainLookupEnd: "dle",
							domainLookupStart: "dls",
							fetchStart: "fs",
							loadEventEnd: "lee",
							loadEventStart: "les",
							redirectEnd: "rede",
							redirectStart: "reds",
							requestStart: "reqs",
							responseStart: "resps",
							responseEnd: "respe",
							secureConnectionStart: "scs",
							unloadEventStart: "ues",
							unloadEventEnd: "uee"
						};
					var q = "&ns=" + encodeURIComponent(l.navigationStart);
					for (var e in n)
						if (void 0 !== l[e]) {
							var c = l[e] - m;
							q += "&" + n[e] + "=" + (0 < c ? encodeURIComponent(c) : 0)
						} else q += "&" + n[e] + "=-1";
					window[ensightenOptions.ns].timing = q;
					e = ensightenOptions.nexus || "nexus.ensighten.com";
					l = ensightenOptions.staticJavascriptPath ||
						"";
					q = l.indexOf("/", 0);
					m = l.indexOf("/code/");
					l = l.substring(q, m) + "/perf.rnc";
					l += "?cid=" + encodeURIComponent(ensightenOptions.clientId) + window[ensightenOptions.ns].timing;
					window[ensightenOptions.ns].imageRequest("//" + e + l)
				}
			}
		});

		/*
		 MIT License (c) copyright 2013 original author or authors */
		window[ensightenOptions.ns].data || (window[ensightenOptions.ns].when = function() {
			function f(a, b, d, c) {
				return l(a).then(b, d, c)
			}

			function p(a) {
				this.then = a
			}

			function l(a) {
				return c(function(b) {
					b(a)
				})
			}

			function c(b) {
				function g(a) {
					k && (r = e(a), d(k, r), k = u)
				}

				function f(a) {
					g(h(a))
				}

				function q(b) {
					k && d(k, a(b))
				}
				var r, k = [];
				try {
					b(g, f, q)
				} catch (E) {
					f(E)
				}
				return new p(function(a, b, d) {
					return c(function(c, g, e) {
						k ? k.push(function(f) {
							f.then(a, b, d).then(c, g, e)
						}) : n(function() {
							r.then(a, b, d).then(c, g, e)
						})
					})
				})
			}

			function e(a) {
				return a instanceof
				p ? a : a !== Object(a) ? m(a) : c(function(b, d, c) {
					n(function() {
						try {
							var g = a.then;
							"function" === typeof g ? z(g, a, b, d, c) : b(m(a))
						} catch (y) {
							d(y)
						}
					})
				})
			}

			function m(a) {
				var b = new p(function(d) {
					try {
						return "function" == typeof d ? e(d(a)) : b
					} catch (D) {
						return h(D)
					}
				});
				return b
			}

			function h(a) {
				var b = new p(function(d, c) {
					try {
						return "function" == typeof c ? e(c(a)) : b
					} catch (F) {
						return h(F)
					}
				});
				return b
			}

			function a(b) {
				var d = new p(function(c, g, e) {
					try {
						return "function" == typeof e ? a(e(b)) : d
					} catch (y) {
						return a(y)
					}
				});
				return d
			}

			function d(a, b) {
				n(function() {
					for (var d,
							c = 0; d = a[c++];) d(b)
				})
			}

			function b(a, b, d, g, e) {
				q(2, arguments);
				return f(a, function(a) {
					return c(function(d, c, g) {
						function e(a) {
							h(a)
						}

						function q(a) {
							u(a)
						}
						var k;
						var n = a.length >>> 0;
						var t = Math.max(0, Math.min(b, n));
						var w = [];
						var x = n - t + 1;
						var m = [];
						if (t) {
							var h = function(a) {
								m.push(a);
								--x || (u = h = r, c(m))
							};
							var u = function(a) {
								w.push(a);
								--t || (u = h = r, d(w))
							};
							for (k = 0; k < n; ++k) k in a && f(a[k], q, e, g)
						} else d(w)
					}).then(d, g, e)
				})
			}

			function t(a, b, d, c) {
				q(1, arguments);
				return k(a, w).then(b, d, c)
			}

			function k(a, b) {
				return f(a, function(a) {
					return c(function(d,
						c, g) {
						var e, q;
						var k = e = a.length >>> 0;
						var r = [];
						if (k) {
							var n = function(a, e) {
								f(a, b).then(function(a) {
									r[e] = a;
									--k || d(r)
								}, c, g)
							};
							for (q = 0; q < e; q++) q in a ? n(a[q], q) : --k
						} else d(r)
					})
				})
			}

			function n(a) {
				1 === x.push(a) && A(g)
			}

			function g() {
				for (var a, b = 0; a = x[b++];) a();
				x = []
			}

			function q(a, b) {
				for (var d, c = b.length; c > a;)
					if (d = b[--c], null != d && "function" != typeof d) throw Error("arg " + c + " must be a function");
			}

			function r() {}

			function w(a) {
				return a
			}
			f.defer = function() {
				var a, b;
				var d = {
					promise: u,
					resolve: u,
					reject: u,
					notify: u,
					resolver: {
						resolve: u,
						reject: u,
						notify: u
					}
				};
				d.promise = a = c(function(c, g, e) {
					d.resolve = d.resolver.resolve = function(d) {
						if (b) return l(d);
						b = !0;
						c(d);
						return a
					};
					d.reject = d.resolver.reject = function(d) {
						if (b) return l(h(d));
						b = !0;
						g(d);
						return a
					};
					d.notify = d.resolver.notify = function(a) {
						e(a);
						return a
					}
				});
				return d
			};
			f.resolve = l;
			f.reject = function(a) {
				return f(a, h)
			};
			f.join = function() {
				return k(arguments, w)
			};
			f.all = t;
			f.map = k;
			f.reduce = function(a, b) {
				var d = z(B, arguments, 1);
				return f(a, function(a) {
					var c = a.length;
					d[0] = function(a, d, g) {
						return f(a, function(a) {
							return f(d,
								function(d) {
									return b(a, d, g, c)
								})
						})
					};
					return G.apply(a, d)
				})
			};
			f.any = function(a, d, c, g) {
				return b(a, 1, function(a) {
					return d ? d(a[0]) : a[0]
				}, c, g)
			};
			f.some = b;
			f.isPromise = function(a) {
				return a && "function" === typeof a.then
			};
			p.prototype = {
				otherwise: function(a) {
					return this.then(u, a)
				},
				ensure: function(a) {
					function b() {
						return l(a())
					}
					return this.then(b, b).yield(this)
				},
				yield: function(a) {
					return this.then(function() {
						return a
					})
				},
				spread: function(a) {
					return this.then(function(b) {
						return t(b, function(b) {
							return a.apply(u, b)
						})
					})
				},
				always: function(a,
					b) {
					return this.then(a, a, b)
				}
			};
			var u;
			var x = [];
			var H = setTimeout;
			var A = "function" === typeof setImmediate ? "undefined" === typeof window ? setImmediate : setImmediate.bind(window) : "object" === typeof process && process.nextTick ? process.nextTick : function(a) {
				H(a, 0)
			};
			var v = Function.prototype;
			var C = v.call;
			var z = v.bind ? C.bind(C) : function(a, b) {
				return a.apply(b, B.call(arguments, 2))
			};
			v = [];
			var B = v.slice;
			var G = v.reduce || function(a) {
				var b = 0;
				var d = Object(this);
				var c = d.length >>> 0;
				var g = arguments;
				if (1 >= g.length)
					for (;;) {
						if (b in
							d) {
							g = d[b++];
							break
						}
						if (++b >= c) throw new TypeError;
					} else g = g[1];
				for (; b < c; ++b) b in d && (g = a(g, d[b], b, d));
				return g
			};
			return f
		}(), function() {
			function f(c, f) {
				return l.all(f || [], function(e) {
					return c.apply(null, e)
				})
			}

			function p(e) {
				var m = c.call(arguments, 1);
				return function() {
					return f(e, m.concat(c.call(arguments)))
				}
			}
			var l = window[ensightenOptions.ns].when;
			var c = [].slice;
			l.apply = f;
			l.call = function(e) {
				return f(e, c.call(arguments, 1))
			};
			l.lift = p;
			l.bind = p;
			l.compose = function(e) {
				var m = c.call(arguments, 1);
				return function() {
					var h =
						c.call(arguments);
					h = f(e, h);
					return l.reduce(m, function(a, d) {
						return d(a)
					}, h)
				}
			}
		}(), window[ensightenOptions.ns].data = function(f, p) {
			function l(a, d) {
				this.name = "DataDefinitionException";
				this.message = d || "Data definitions cannot be resolved as there are invalid id(s): " + a
			}
			var c = {
					engines: {
						memory: {
							get: function(a) {
								if (e.utils.isArray(a)) {
									for (var d = [], b = 0; b < a.length; b++) d.push(c.data[a[b]]);
									return f[ensightenOptions.ns].when.resolve(d)
								}
								d = c.dataDefinitions[a] || {
									storage: {
										get: function() {}
									}
								};
								d = d.storage.get(d);
								c.data[a] =
									d;
								return f[ensightenOptions.ns].when.resolve(c.data[a])
							},
							set: function(a, d) {
								if (e.utils.isArray(a))
									for (var b in a) c.data[a[b]] = d[b];
								else c.data[a] = d;
								return f[ensightenOptions.ns].when.resolve(!0)
							},
							remove: function(a) {
								if (e.utils.isArray(a))
									for (var d in a) delete c.data[a[d]];
								else delete c.data[a];
								return f[ensightenOptions.ns].when.resolve(!0)
							},
							clear: function(a) {
								c.data = {};
								c.definitions = {};
								return f[ensightenOptions.ns].when.resolve(!0)
							},
							all: function() {
								return f[ensightenOptions.ns].when.resolve(c.data)
							}
						}
					},
					normalizeInputArgs: function(a, d) {
						var b = {
								key: [],
								val: p
							},
							c;
						if (e.utils.isPlainObject(a))
							for (c in b.val = [], a) b.key.push(c), b.val.push(a[c]);
						else e.utils.isArray(a), b.key = a, b.val = d;
						return b
					},
					definitions: {},
					data: {}
				},
				e = {
					utils: {
						isPlainObject: function(a) {
							return !!a && "[object Object]" === Object.prototype.toString.call(a)
						},
						isArray: function(a) {
							return "[object Array]" === Object.prototype.toString.call(a)
						},
						escapeRegEx: function(a) {
							try {
								return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
							} catch (d) {
								return a
							}
						}
					}
				},
				m = function() {
					return f[ensightenOptions.ns].when.reject("Not Implemented.")
				};
			l.prototype = Error();
			l.prototype || (l.prototype = {});
			l.prototype.constructor = l;
			c.DataDefinitionException = l;
			c.checkForInvalidDataDefinitions = function(a) {
				e.utils.isArray(a) || (a = [a]);
				return a && 0 < a.length && (a = a.join(","), -1 < a.indexOf("invalid_id")) ? (f[ensightenOptions.ns].reportException(new c.DataDefinitionException(a)), !0) : !1
			};
			c.collectAvailableDataDefinitions = function(a) {
				for (var d = [], b = 0; b < a.length; b++) {
					var t = parseInt(a[b], 10),
						k = f[ensightenOptions.ns].dataDefinitions[t];
					if (null === k || k === p)
						if (k = e.storage.session.get({
								id: t
							}),
							null !== k && k !== p) e.set(t, k), c.dataDefinitions[t] = {
							id: t,
							load: "visitor",
							storage: e.storage.visitor,
							missingDDFromCache: !0
						}, d.push(f[ensightenOptions.ns].data.get("" + t));
						else return f[ensightenOptions.ns].reportException(new c.DataDefinitionException(a, "Invalid data definition used: " + t)), {
							promises: [],
							isInvalid: !0
						};
					else d.push(f[ensightenOptions.ns].data.get("" + a[b]))
				}
				return {
					promises: d,
					isInvalid: !1
				}
			};
			c.getSync = function(a) {
				function d(a) {
					var d = a.extract || t,
						c = a.transform || k,
						g = !1,
						e = null,
						f = null;
					try {
						e = d()
					} catch (v) {
						e =
							null, g = !0
					}
					try {
						f = c(e)
					} catch (v) {
						f = null, g = !0
					}
					g && b.push(a.id);
					return f
				}
				var b = [],
					t = function() {
						return document
					},
					k = function(a) {
						return null !== a && a !== p ? a.toString() : null
					},
					n = parseInt(a);
				a = "string" === typeof a ? a.split(".") : [];
				var g = {},
					q = "";
				if (!isNaN(n) && "undefined" === typeof c.dataDefinitions[n]) return f[ensightenOptions.ns].reportException(new c.DataDefinitionException(n, "Error resolving data definition: " + n + ".  Does not exist on the page.")), "Data definition specified does not exist on the page";
				if (isNaN(n) &&
					"undefined" === typeof c.dataDefinitionsBySourceCollName["" + a[0] + "." + a[1] + "." + a[2]]) return f[ensightenOptions.ns].reportException(new c.DataDefinitionException(a, "Error resolving data definition: " + a[0] + "." + a[1] + "." + a[2] + ".  Does not exist on the page.")), "Data definition specified does not exist on the page";
				isNaN(n) ? 3 == a.length && (g = e.getDataDefinitionBySourceCollectionName(a[0], a[1], a[2])) : g = e.getDataDefinitionById(n);
				q = g.load && g.load.match(/(session|visitor)/i) && g.storage && g.storage.get ? g.storage.get(g) :
					d(g);
				0 < b.length && f[ensightenOptions.ns].reportException(new c.DataDefinitionException(b, "Error resolving data definitions synchronously: " + b));
				return q
			};
			c.dataDefinitions = {};
			c.dataDefinitionsBySourceCollName = {};
			e.defineEngine = function(a, d) {
				var b, e = ["get", "set", "remove", "clear", "all"];
				c.engines[a] = d;
				if (!d.returnsPromise)
					for (b = 0; b < e.length; b++) {
						var k = e[b];
						d[k] = f[ensightenOptions.ns].when.lift(d[k])
					}
			};
			e.storage = {
				instance: {
					set: function(a, d) {},
					get: function(a) {
						return c.getSync(a.id)
					}
				},
				page: {
					set: function(a,
						d) {},
					get: function(a) {
						return c.data[a.id]
					}
				},
				session: {
					set: function(a, d) {
						var b = e.storage.session.get({
								id: a
							}),
							c = new Date,
							k = c.getTime();
						c.setTime(k + 18E5);
						null != b && (d = b);
						f[ensightenOptions.ns].data.cookie.utils.set(a, d, {
							expires: c.toGMTString()
						});
						b = {
							expires: c.getTime(),
							value: d
						};
						f[ensightenOptions.ns].data.local.utils.set(a, b)
					},
					get: function(a) {
						var d = f[ensightenOptions.ns].data.cookie.utils.get(a.id),
							b = f.JSON && f.JSON.stringify ? f.JSON : f[ensightenOptions.ns].JSON;
						b = b || {};
						var c = new Date;
						c = c.getTime();
						if (null ===
							d) {
							try {
								var e = b.parse(f[ensightenOptions.ns].data.local.utils.get(a.id))
							} catch (n) {
								e = null
							}
							null != e && (e.expires = +e.expires, c <= e.expires ? d = e.value : "" == e.expires && e.value != p ? d = e.value : f[ensightenOptions.ns].data.local.utils.remove(a.id))
						}
						return d
					}
				},
				visitor: {
					set: function(a, d) {
						var b = e.storage.session.get({
							id: a
						});
						null != b && (d = b);
						f[ensightenOptions.ns].data.cookie.utils.set(a, d);
						f[ensightenOptions.ns].data.local.utils.set(a, {
							expires: "",
							value: d
						})
					},
					get: function(a) {
						return e.storage.session.get(a)
					}
				}
			};
			e.getEngine =
				e.engine = function(a) {
					return a ? c.engines[a] || {
						get: m,
						set: m,
						remove: m,
						clear: m,
						all: m
					} : c.engines
				};
			e.all = function(a) {
				return f[ensightenOptions.ns].data.engine(a || "memory").all()
			};
			e.get = function(a, d, b) {
				d = d || "memory";
				b = b || {}; - 1 < a.indexOf(",") ? (a = a.split(","), a = c.normalizeInputArgs(a)) : a = c.normalizeInputArgs(a);
				return b.wait ? c.getWait(a.key, f[ensightenOptions.ns].data.engine(d), b) : c.data && c.data.hasOwnProperty(a.key) ? f[ensightenOptions.ns].data.engine(d).get(a.key) : c.getWaitForKey(a.key, f[ensightenOptions.ns].data.engine(d),
					b)
			};
			c.getWait = function(a, d, b) {
				var c = +new Date,
					k = f[ensightenOptions.ns].when.defer(),
					n = function() {
						var c = d.get(a);
						if (-1 === b.wait) return c;
						c.then(function(a) {
							b.setCheck(a) ? k.resolve(a) : setTimeout(g, b.interval)
						}, function(a) {
							setTimeout(g, b.interval)
						})
					},
					g = function() {
						var a = +new Date - c; - 1 !== b.wait && a < b.wait ? n() : k.reject("Timeout")
					};
				b.interval = b.interval || 500;
				b.wait = b.wait || 5E3;
				e.utils.isArray(a) ? b.setCheck = b.setCheck || function(a) {
						for (var b = !0, d = 0; d < a.length; d++) b = b && !!a[d];
						return b
					} : b.setCheck = b.setCheck ||
					function(a) {
						return !!a
					};
				n();
				return k.promise
			};
			c.getWaitForKey = function(a, d, b) {
				var e = f[ensightenOptions.ns].when.defer(),
					k = function() {
						if (c.data && c.data.hasOwnProperty(a)) {
							var g = d.get(a);
							if (-1 === b.wait) return g;
							g.then(function(a) {
								e.resolve(a)
							}, function(a) {
								e.reject(a)
							})
						} else setTimeout(n, b.interval)
					},
					n = function() {
						k()
					};
				b.interval = b.interval || 100;
				b.wait = b.wait || 1;
				k();
				return e.promise
			};
			e.set = function(a, d, b) {
				var e = c.normalizeInputArgs(a, d);
				Array.prototype.slice.call(arguments);
				return f[ensightenOptions.ns].data.engine(b ||
					"memory").set(e.key, e.val)
			};
			e.remove = function(a, d) {
				return f[ensightenOptions.ns].data.engine(d || "memory").remove(a)
			};
			e.clear = function(a) {
				return f[ensightenOptions.ns].data.engine(a || "memory").clear()
			};
			e.define = function(a, d) {
				d && (a.name = d.id || d.name);
				if (!a.name) return f[ensightenOptions.ns].when.reject(Error("Invalid parameters: missing 'name'"));
				a.id = a.name;
				var b = a.load || "page";
				a.load = a.load || "javascript";
				a.load = -1 < a.load.indexOf("javascript") ? a.load : a.load + ",javascript";
				a.trigger = a.trigger || function() {
					return f[ensightenOptions.ns].when.resolve()
				};
				a.priv = a.priv || !1;
				a.collection = a.collection || "Data Layer";
				a.persist = f[ensightenOptions.ns].data.engine("memory");
				a.storage = e.storage[b.toLowerCase()] || e.storage.page;
				var h = a.extract || function() {
						return document
					},
					k = a.transform || function(a) {
						return a
					},
					n = function(b, d) {
						var c = [];
						c.push(a.persist.set(b, d));
						a.storage.set(a.id, d);
						"object" == typeof f[ensightenOptions.ns].data.dataExport && f[ensightenOptions.ns].data.dataExport(b, d, a.collection);
						f[ensightenOptions.ns].when.all(c).then(function(a) {
								g.resolve(a)
							},
							function(a) {
								g.reject(a)
							})
					},
					g = f[ensightenOptions.ns].when.defer();
				try {
					var q = a.trigger()
				} catch (r) {
					f[ensightenOptions.ns].reportException(new c.DataDefinitionException(null, '"' + r + '" error caught in Data Definition trigger: ' + a.dataDefName + ", ID:" + a.id + ". Using bottom of body trigger.")), q = f[ensightenOptions.ns].data.bottomOfBodyTrigger()
				}
				q.then(function() {
					g.resolve(f[ensightenOptions.ns].when.reduce([function() {
						try {
							return h()
						} catch (r) {
							return f[ensightenOptions.ns].reportException(new c.DataDefinitionException(null,
								'"' + r + '" error caught in Data Definition extractor: ' + a.dataDefName + ", ID:" + a.id + ".")), null
						}
					}(), function() {
						try {
							return k.apply(this, arguments)
						} catch (r) {
							return f[ensightenOptions.ns].reportException(new c.DataDefinitionException(null, '"' + r + '" error caught in Data Definition transformer: ' + a.dataDefName + ", ID " + a.id + ".")), null
						}
					}, n], function(b, d, c, e) {
						if (1 == c) return d(b);
						2 == c && d(a.name, b)
					}))
				}, function(a) {
					g.reject(a)
				});
				c.dataDefinitions[a.id] = a;
				c.dataDefinitionsBySourceCollName["" + a.source + "." + a.collection +
					"." + a.dataDefName] = a;
				return g.promise
			};
			e.checkConditions = function(a) {
				var d, b = {
					lt: function(a, b) {
						var d = +a,
							e = +b;
						return isNaN(d) || isNaN(e) ? (f[ensightenOptions.ns].reportException(new c.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " + b)), !1) : d < e
					},
					gt: function(a, b) {
						var d = +a,
							e = +b;
						return isNaN(d) || isNaN(e) ? (f[ensightenOptions.ns].reportException(new c.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " +
							b)), !1) : d > e
					},
					eql: function(a, b) {
						return a == b
					},
					exists: function(a, b) {
						return null == a || a == p || "" == a ? !1 : !0
					},
					re: function(a, b, d) {
						b = new RegExp(b, d ? "i" : "");
						try {
							return a.match(b)
						} catch (q) {
							return !1
						}
					},
					starts: function(a, d, c) {
						d = e.utils.escapeRegEx(d);
						return b.re(a, "^" + d, c)
					},
					ends: function(a, d, c) {
						d = e.utils.escapeRegEx(d);
						return b.re(a, d + "$", c)
					},
					contains: function(a, d, c) {
						d = e.utils.escapeRegEx(d);
						return b.re(a, ".*" + d + ".*", c)
					}
				};
				b.is = b.eql;
				b["starts with"] = b.starts;
				b["ends with"] = b.ends;
				b["is greater than"] = b.gt;
				b["is less than"] =
					b.lt;
				b.matches = b.re;
				for (d = 0; d < a.values.length; d++) {
					var h = (a.customComparator ? a.customComparator[d] ? a.customComparator[d] : b[a.comparators[d]] : b[a.comparators[d]])(a.values[d], a.compareTo[d], a.caseInsensitive ? a.caseInsensitive[d] || !1 : !1);
					a.not[d] && (h = !h);
					if (!h) return !1
				}
				return !0
			};
			e.triggerPromise = function(a, d, b) {
				b = b || 5E3;
				var c = +new Date,
					e = f[ensightenOptions.ns].when.defer();
				(function() {
					var f = a();
					f != d ? e.resolve(f) : +new Date - c < b ? setTimeout(arguments.callee, 200) : e.reject("timed out")
				})();
				return e.promise
			};
			e.timeoutPromise = function(a, d) {
				var b = f[ensightenOptions.ns].when.defer();
				d = d || 800;
				a.then(b.resolve, b.reject);
				setTimeout(function() {
					b.reject(Error("timed out"))
				}, d);
				return b.promise
			};
			e.delayTrigger = function(a) {
				a = a || 10;
				var d = f[ensightenOptions.ns].when.defer();
				setTimeout(function() {
					d.resolve()
				}, a);
				return d.promise
			};
			e.delayUntilTrigger = function(a, d, b, c) {
				b = b || null;
				c = c || 200;
				var e = +new Date,
					h = f[ensightenOptions.ns].when.defer();
				(function() {
					var g = a();
					g != d ? h.resolve(g) : b ? +new Date - e < b ? setTimeout(arguments.callee,
						c) : h.reject("timed out") : setTimeout(arguments.callee, c)
				})();
				return h.promise
			};
			c.applyTrigger = function(a) {
				var d = f[ensightenOptions.ns].when.defer();
				a(function() {
					d.resolve(!0)
				});
				return d.promise
			};
			e.immediateTrigger = function() {
				return c.applyTrigger(f[ensightenOptions.ns].bindImmediate)
			};
			e.bottomOfBodyTrigger = function() {
				return c.applyTrigger(f[ensightenOptions.ns].bindDOMParsed)
			};
			e.whenValueExistsTrigger = function() {
				return f[ensightenOptions.ns].when.resolve(this.extract())
			};
			e.afterEnsightenCompleteTrigger =
				function() {
					return c.applyTrigger(f[ensightenOptions.ns].bindPageSpecificCompletion)
				};
			e.afterElementsDownloadedTrigger = function() {
				return c.applyTrigger(f[ensightenOptions.ns].bindDOMLoaded)
			};
			e.getAllDataDefinitionsOnCurrentPage = function() {
				return c.dataDefinitions
			};
			e.getAllDataDefinitionsOnCurrentPage_S_C_N = function() {
				return c.dataDefinitionsBySourceCollName
			};
			e.getDataDefinitionById = function(a) {
				return c.dataDefinitions[a || -1] || {}
			};
			e.getDataDefinitionBySourceCollectionName = function(a, d, b) {
				return c.dataDefinitionsBySourceCollName["" +
					a + "." + d + "." + b] || {}
			};
			e.getDataDefinitionByPercentSyntax = function(a) {
				a = ("" + a).split("_");
				return 1 > a.length ? {} : c.dataDefinitions[a[1]] || {}
			};
			e.resolve = function(a, d) {
				var b = this,
					h = null;
				if (!c.checkForInvalidDataDefinitions(a))
					if (d) f[ensightenOptions.ns].bindDataDefinitionComplete(function() {
						var e = c.collectAvailableDataDefinitions(a);
						e.isInvalid || f[ensightenOptions.ns].when.all(e.promises).then(function(e) {
							try {
								d.apply(b, e)
							} catch (r) {
								f[ensightenOptions.ns].reportException(new c.DataDefinitionException(a, "Error resolving data definitions: " +
									a + ". Details: " + r))
							}
						}, function(b) {
							f[ensightenOptions.ns].reportException(new c.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + b))
						})
					});
					else {
						h = [];
						var k = a;
						e.utils.isArray(a) || (k = [a]);
						for (var m = 0; m < k.length; m++) h.push(c.getSync(k[m]));
						return h = e.utils.isArray(a) ? h : h[0]
					}
			};
			e.extract = function(a, d) {
				var b = "",
					c = function(a, b) {
						var d = ~b.indexOf("#") ? b.split("#")[1] : "",
							c = d ? 0 : ~b.indexOf("[") ? parseInt(b.match(/\[(\d+)\]/)[1]) : 0,
							e = (d ? b.split("#")[0] : c ? b.split("[")[0] : b).toLowerCase();
						if (a == document && "html" == e && 0 == c) return document.getElementsByTagName("html")[0];
						if (~b.indexOf("#")) return document.getElementById(b.split("#")[1]);
						var g = a.firstChild;
						if (!g) return null;
						var f = 0;
						for (c = 0 != c ? c - 1 : c; g;) {
							if (1 == g.nodeType) {
								if (g.tagName.toLowerCase() == e && "" != d && g.id == d || g.tagName.toLowerCase() == e && f == c && "" == d) return g;
								g.tagName.toLowerCase() == e && f++
							}
							g = g.nextSibling
						}
					},
					e = function(a, b) {
						a = a.split("/");
						for (var d = c(b || document, a[1]), e = 2; e < a.length; e++) {
							if (null == d) return null;
							d = c(d, a[e])
						}
						return d
					},
					h = function() {
						for (var a = {}, b = f.document.getElementsByTagName("META") || [], d = 0, c = b.length; d < c; d++) {
							var e = b[d].name || b[d].getAttribute("property") || "";
							0 !== e.length && (a[e] = b[d].content)
						}
						return a
					}(),
					g = function(a) {
						var b = h[a];
						if (b) return b;
						b = f.document.getElementsByTagName("META") || [];
						for (var d = 0, c = b.length; d < c; d++) {
							var e = b[d].name || b[d].getAttribute("property") || "";
							if (a == e) return b[d].content
						}
					},
					q = function(a) {
						return (val = (new RegExp("&" + a + "=([^&]*)")).exec(f.location.search.replace(/^\?/, "&"))) ? val[0].split("=")[1] :
							""
					},
					r = function(a) {
						return (val = (new RegExp("^" + a + "=.*|;\\s*" + a + "=.*")).exec(f.document.cookie)) ? val[0].split("=")[1].split(";")[0] : ""
					},
					m = function(a) {
						(a = l(a)) && a.nodeType && 1 == a.nodeType && (a = a.value || a.innerHTML || "");
						return a.toString().replace(/\n|\r|\s\s+/g, "") || ""
					},
					l = function(a) {
						var b = "";
						if (0 == a.indexOf("/HTML/BODY")) b = e(a);
						else try {
							b = eval(a)
						} catch (A) {
							b = ""
						}
						return b
					};
				try {
					return d ? "meta" == d ? b = g(a) : "cookie" == d ? b = r(a) : "param" == d ? b = q(a) : "content" == d ? b = m(a) : "event" == d ? b = l(a) : "var" == d && (b = f[a]) : b = g(a) || r(a) ||
						q(a) || m(a) || l(a) || f[a] || "", b || ""
				} catch (x) {
					return ""
				}
			};
			if ("undefined" == typeof h) var h = {
				exports: {}
			};
			return e
		}(window), window[ensightenOptions.ns].data.defineEngine("store", function() {
			function f(a) {
				return function() {
					var d = Array.prototype.slice.call(arguments, 0);
					d.unshift(b);
					k.appendChild(b);
					b.addBehavior("#default#userData");
					b.load(h);
					d = a.apply(store, d);
					k.removeChild(b);
					return d
				}
			}

			function p(a) {
				return a.replace(l, "___")
			}
			var l = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
				c = {},
				e = window,
				m = e.document,
				h = "localStorage",
				a, d = Array.isArray || function(a) {
					return "[object Array]" === Object.prototype.toString.call(a)
				};
			c.set = function(a, b) {};
			c.get = function(a) {};
			c.remove = function(a) {};
			c.clear = function() {};
			try {
				if (h in e && e[h]) {
					var b = e[h];
					c.set = function(a, c) {
						var e, g = window.JSON && window.JSON.stringify ? window.JSON : window[ensightenOptions.ns].JSON;
						if (d(a)) {
							var f = 0;
							for (e = a.length; f < e; f++) b.setItem(a[f], "string" === typeof c[f] ? c[f] : g.stringify(c[f]))
						} else b.setItem(a, "string" === typeof c ? c : g.stringify(c))
					};
					c.get = function(a) {
						if (d(a)) {
							var c = {},
								e;
							var f = 0;
							for (e = a.length; f < e; f++) c[a[f]] = b.getItem(a[f]);
							return c
						}
						return b.getItem(a)
					};
					c.remove = function(a) {
						if (d(a)) {
							var c;
							var e = 0;
							for (c = a.length; e < c; e++) b.removeItem(a[e])
						} else b.removeItem(a)
					};
					c.clear = function() {
						b.clear()
					};
					c.all = function() {
						return b
					}
				} else if ("globalStorage" in e && e.globalStorage) b = e.globalStorage[e.location.hostname], c.set = function(a, c) {
					if (d(a)) {
						var e;
						var f = 0;
						for (e = a.length; f < e; f++) b[a[f]] = c[f]
					} else b[a] = c
				}, c.get = function(a) {
					if (d(a)) {
						var c = {},
							e;
						var f = 0;
						for (e = a.length; f < e; f++) c[a[f]] =
							b[a[f]] && b[a[f]].value;
						return c
					}
					return b[a] && b[a].value
				}, c.remove = function(a) {
					if (d(a)) {
						var c;
						var e = 0;
						for (c = a.length; e < c; e++) delete b[a[e]]
					} else delete b[a]
				}, c.clear = function() {
					for (var a in b) delete b[a]
				}, c.all = function() {
					return b
				};
				else if (m.documentElement.addBehavior) {
					try {
						var t = new ActiveXObject("htmlfile");
						t.open();
						t.write('<script>document.w=window\x3c/script><iframe src="/favicon.ico"></frame>');
						t.close();
						var k = t.w.frames[0].document;
						b = k.createElement("div")
					} catch (g) {
						b = m.createElement("div"),
							k = m.body
					}
					c.set = f(function(a, b, e) {
						if (d(b)) {
							var f;
							var g = 0;
							for (f = b.length; g < f; g++) {
								fixedKey = p(b[g]);
								if (void 0 === e[g]) return c.remove(fixedKey);
								a.setAttribute(fixedKey, e[g]);
								a.save(h)
							}
						} else {
							fixedKey = p(b);
							if (void 0 === e) return c.remove(fixedKey);
							a.setAttribute(fixedKey, e);
							a.save(h)
						}
					});
					c.get = f(function(a, b) {
						if (d(b)) {
							var c = {},
								e;
							var f = 0;
							for (e = b.length; f < e; f++) {
								var g = p(b[f]);
								c[b[f]] = a.getAttribute(g)
							}
							return c
						}
						b = p(b);
						return a.getAttribute(b)
					});
					c.remove = f(function(a, b) {
						if (d(b)) {
							var c;
							var e = 0;
							for (c = b.length; e <
								c; e++) a.removeAttribute(p(b[e])), a.save(h)
						} else b = p(b), a.removeAttribute(b), a.save(h)
					});
					c.clear = f(function(a) {
						var b = a.XMLDocument.documentElement.attributes;
						a.load(h);
						for (var d = 0, c; c = b[d]; d++) a.removeAttribute(c.name);
						a.save(h)
					});
					c.all = f(function(a) {
						for (var b = a.XMLDocument.documentElement.attributes, d = {}, c = 0, e; e = b[c]; ++c) {
							var f = p(e.name);
							d[e.name] = a.getAttribute(f)
						}
						return d
					})
				}
			} catch (g) {}
			var n = {};
			for (a in c) n[a] = c[a];
			n.testStorage = function() {
				try {
					var a = "tk_" + Math.ceil(5E7 * Math.random());
					n.set(a, "test");
					if ("test" === n.get(a)) return n.remove(a), !0
				} catch (q) {}
				return !1
			};
			c.utils = n;
			return window[ensightenOptions.ns].data.local = c
		}()), window[ensightenOptions.ns].data.defineEngine("cookie", function(f, p) {
			var l = function() {
					return l.get.apply(l, arguments)
				},
				c = l.utils = {
					isArray: Array.isArray || function(c) {
						return "[object Array]" === Object.prototype.toString.call(c)
					},
					isPlainObject: window[ensightenOptions.ns].data.utils.isPlainObject,
					toArray: function(c) {
						return Array.prototype.slice.call(c)
					},
					getKeys: Object.keys || function(c) {
						var e = [],
							f = "";
						for (f in c) c.hasOwnProperty(f) && e.push(f);
						return e
					},
					escape: function(c) {
						return String(c).replace(/[,;"\\=\s%]/g, function(c) {
							return encodeURIComponent(c)
						})
					},
					retrieve: function(c, f) {
						return null == c ? f : c
					},
					getAllCookies: function() {
						if ("" === f.cookie) return {};
						for (var c = f.cookie.split("; "), m = {}, h = 0, a = c.length; h < a; h++) {
							var d = c[h].split("=");
							m[decodeURIComponent(d[0])] = decodeURIComponent(d[1])
						}
						return m
					},
					set: function(e, m, h) {
						h = h || -1;
						if (c.isPlainObject(e))
							for (var a in e) e.hasOwnProperty(a) && l.set(a, e[a],
								m);
						else if (c.isArray(e)) {
							var d;
							a = 0;
							for (d = e.length; a < d; a++) l.set(e[a], m[a], h)
						} else {
							a = h.expires !== p ? h.expires : l.defaults.expires || "";
							"number" === typeof a && (a = new Date(a));
							a = c.isPlainObject(a) && "toGMTString" in a ? ";expires=" + a.toGMTString() : c.isPlainObject(a) && a instanceof Date ? ";expires=" + a.toUTCString() : ";expires=" + a;
							d = (d = h.path || l.defaults.path) ? ";path=" + d : "";
							var b = h.domain || l.defaults.domain;
							b = b ? ";domain=" + b : "";
							h = h.secure || l.defaults.secure ? ";secure" : "";
							f.cookie = c.escape(e) + "=" + c.escape(m) + a + d + b + h
						}
					},
					get: function(e, f) {
						f = f || p;
						var h = c.getAllCookies();
						if (c.isArray(e)) {
							for (var a = {}, d = 0, b = e.length; d < b; d++) a[e[d]] = c.retrieve(h[e[d]], f), a[e[d]] === p && (a[e[d]] = null);
							return a
						}
						a = c.retrieve(h[e], f);
						return a === p ? null : a
					},
					getGMTString: function(c) {
						var e = new Date;
						e.setTime(e.getTime() + 864E5 * c);
						return e.toGMTString()
					}
				};
			l.defaults = {
				path: "/",
				expires: c.getGMTString(90)
			};
			l.set = function(e, f) {
				c.set(e, f)
			};
			l.remove = function(e) {
				e = c.isArray(e) ? e : c.toArray(arguments);
				for (var f = 0, h = e.length; f < h; f++) c.set(e[f], "", {
					expires: -1
				})
			};
			l.clear = function() {
				return l.remove(c.getKeys(c.getAllCookies()))
			};
			l.get = function(e, f) {
				return c.get(e, f)
			};
			l.all = function() {
				return c.getAllCookies()
			};
			l.utils = c;
			return window[ensightenOptions.ns].data.cookie = l
		}(document)));
		Bootstrapper.dataDefinitionIds = [];
		Bootstrapper.bindImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			(function() {
				function m(a, b, d) {
					if ("_root" == b) return d;
					if (a !== d) {
						var c;
						p || (a.matches && (p = a.matches), a.webkitMatchesSelector && (p = a.webkitMatchesSelector), a.mozMatchesSelector && (p = a.mozMatchesSelector), a.msMatchesSelector && (p = a.msMatchesSelector), a.oMatchesSelector && (p = a.oMatchesSelector), p || (p = f.matchesSelector));
						c = p;
						if (c.call(a, b)) return a;
						if (a.parentNode) return r++, m(a.parentNode,
							b, d)
					}
				}

				function s(a, b, d, c) {
					g[a.id] || (g[a.id] = {});
					g[a.id][b] || (g[a.id][b] = {});
					g[a.id][b][d] || (g[a.id][b][d] = []);
					g[a.id][b][d].push(c)
				}

				function c(a, b, d, c) {
					if (c || d)
						if (c)
							for (var f = 0; f < g[a.id][b][d].length; f++) {
								if (g[a.id][b][d][f] === c) {
									g[a.id][b][d].pop(f, 1);
									break
								}
							} else delete g[a.id][b][d];
						else g[a.id][b] = {}
				}

				function e(a, b, d) {
					if (g[a][d]) {
						var c = b.target || b.srcElement,
							e, k, l = {},
							h = k = 0;
						r = 0;
						for (e in g[a][d]) g[a][d].hasOwnProperty(e) && (k = m(c, e, n[a].element)) && f.matchesEvent(d, n[a].element, k, "_root" == e, b) && (r++,
							g[a][d][e].match = k, l[r] = g[a][d][e]);
						b.stopPropagation = function() {
							b.cancelBubble = !0
						};
						for (k = 0; k <= r; k++)
							if (l[k])
								for (h = 0; h < l[k].length; h++) {
									if (!1 === l[k][h].call(l[k].match, b)) {
										f.cancel(b);
										return
									}
									if (b.cancelBubble) return
								}
					}
				}

				function h(a, b, d, h) {
					function m(a) {
						return function(b) {
							e(k, b, a)
						}
					}
					a instanceof Array || (a = [a]);
					d || "function" != typeof b || (d = b, b = "_root");
					var k = this.id,
						l;
					for (l = 0; l < a.length; l++) g[k] && g[k][a[l]] || f.addEvent(this, a[l], m(a[l])), h ? c(this, a[l], b, d) : s(this, a[l], b, d);
					return this
				}

				function f(a, b, c,
					e) {
					if ("string" == typeof a && "function" == typeof b || "string" == typeof b) f(document).on(a, b, c, e || !1);
					if (!(this instanceof f)) {
						for (var g in n)
							if (n[g].element === a) return n[g];
						q++;
						n[q] = new f(a, q);
						n[q]._on = n[q].on;
						n[q].on = function(a, b, c, d) {
							var e = "function" == typeof b ? b : c;
							if ("function" == typeof b ? c : d) a = [a], "string" == typeof b && a.push(b), a.push(function(a) {
									return function(b) {
										b.defaultPrevented || Bootstrapper.Delegate.load(this);
										"undefined" != typeof b.preventDefault ? b.preventDefault() : b.returnValue = !1;
										a.call(this)
									}
								}(e)),
								this._on.apply(this, a);
							else return this._on.call(this, a, b, c)
						};
						return n[q]
					}
					this.element = a;
					this.id = b
				}
				var p, r = 0,
					q = 0,
					g = {},
					n = {};
				f.prototype.on = function(a, b, c) {
					return h.call(this, a, b, c)
				};
				f.prototype.off = function(a, b, c) {
					return h.call(this, a, b, c, !0)
				};
				f.matchesSelector = function() {};
				f.cancel = function(a) {
					a.preventDefault();
					a.stopPropagation()
				};
				f.addEvent = function(a, b, c) {
					a.element.addEventListener(b, c, "blur" == b || "focus" == b)
				};
				f.matchesEvent = function() {
					return !0
				};
				f.load = function(a) {
					setTimeout(function(a, c) {
						return function() {
							if (a.nodeName &&
								"a" == a.nodeName.toLowerCase()) {
								if (c && /^javascript\s*:/.test(c)) return (new Function(unescape(c))).call(window);
								window.location.href = c
							}
						}
					}(a, a.href || window.location.href), 750)
				};
				window.Bootstrapper.Delegate = f
			})();
			(function(m) {
				var s = m.addEvent;
				m.addEvent = function(c, e, h) {
					if (c.element.addEventListener) return s(c, e, h);
					"focus" == e && (e = "focusin");
					"blur" == e && (e = "focusout");
					c.element.attachEvent("on" + e, h)
				};
				m.simpleMatchesSelector = function(c) {
					return "." === c.charAt(0) ? -1 < (" " + this.className + " ").indexOf(" " + c.slice(1) +
						" ") : "#" === c.charAt(0) ? this.id === c.slice(1) : this.tagName.toUpperCase() === c.toUpperCase()
				};
				m.matchesSelector = function(c) {
					if (~c.indexOf(" ") || ~c.indexOf("\x3e")) {
						var e = this;
						for (c = c.split(" ").reverse(); c.length;) {
							var h = c.shift();
							if (~h.indexOf("\x3e")) {
								for (h = h.split("\x3e").reverse(); h.length;)
									if (tempSel = h.shift(), m.simpleMatchesSelector.call(e, tempSel)) e = e.parentNode;
									else return !1;
								if (!c.length) return !0
							} else
								for (; e != document;) {
									var f = m.simpleMatchesSelector.call(e, h),
										e = e.parentNode;
									if (f) {
										if (!c.length) return !0;
										break
									}
								}
						}
						return !1
					}
					return m.simpleMatchesSelector.call(this, c)
				};
				m.cancel = function(c) {
					c.preventDefault && c.preventDefault();
					c.stopPropagation && c.stopPropagation();
					c.returnValue = !1;
					c.cancelBubble = !0
				}
			})(window.Bootstrapper.Delegate);
			Bootstrapper.on = Bootstrapper.Delegate
		}, 3761060, 717328);
		Bootstrapper.bindImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			document.getElementsByClassName = document.getElementsByClassName || function(b) {
				var c = this.all || this.getElementsByTagName("*"),
					d = [];
				b = RegExp("(?:^|\\s)" + b + "(?:\\s|$)");
				for (var a = 0; a < c.length; a++) b.test(c[a].className) && d.push(c[a]);
				return d
			}
		}, 3935181, 719641);
		Bootstrapper.bindDependencyImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			var data = Dell.Metrics.sc,
				curr_ctry = data.country.toLowerCase(),
				allSegmentCountries = ["at", "au", "be", "br", "ca", "cn", "es", "fr", "de", "ie", "in", "jp", "mx", "my", "nl", "nz", "se", "sg", "uk", "us"],
				appname = data.applicationname.toLowerCase(),
				cms = data.cms.toLowerCase(),
				pgname = data.pagename.toLowerCase(),
				url = location.href.toLowerCase();
			if (allSegmentCountries.indexOf(curr_ctry) >
				-1)
				if (window.privacyStatistics) fireCS();
				else window.addEventListener("privacy-statistics-consent", fireCS);

			function fireCS() {
				if (appname.match(/public pages/) && url.match(/dfs.dell.com|publicpages/) && curr_ctry === "us" || cms === "emcpartnerportal" || cms === "emcknowledgecenter" || cms === "emcsales" || curr_ctry === "us" && (pgname === "184_us_sl_so_reactive" || pgname === "227_us_con_chatportal_sl_multiple" || cms === "dfsportal" || url.indexOf("secured.dfs.dell.com/authentication/profilemigratenow") > -1))(function() {
					function callback() {
						if (!disableCallback) {
							disableCallback =
								true;
							if (window.CS_CONF) {
								CS_CONF.integrations = CS_CONF.integrations || [];
								CS_CONF.integrations.push("Adobe Analytics")
							}
						}
					}
					var disableCallback = false;
					window._uxa = window._uxa || [];
					_uxa.push(["afterPageView", callback]);
					var cn1 = "_cs_mk";
					var cn2 = "_cs_id";
					var cookies = "; " + document.cookie;
					if (cookies) {
						var getCookie1 = cookies.split("; " + cn1 + "\x3d");
						var getCookie2 = cookies.split("; " + cn2 + "\x3d");
						if (getCookie1.length > 1 && getCookie2.length > 1) return;

						function init(cookieValue) {
							var cmk = Math.random() + "_" + Date.now();
							if (cookieValue) cmk =
								cookieValue;
							if (window.Dell && Dell.Metrics && Dell.Metrics.sc) {
								Dell.Metrics.sc.contentsquareid = cmk;
								var tld = function() {
									var i = 0,
										domain = document.domain,
										p = domain.split("."),
										s = "_gd" + (new Date).getTime();
									while (i < p.length - 1 && document.cookie.indexOf(s + "\x3d" + s) == -1) {
										domain = p.slice(-1 - ++i).join(".");
										document.cookie = s + "\x3d" + s + ";domain\x3d" + domain + ";"
									}
									document.cookie = s + "\x3d;expires\x3dThu, 01 Jan 1970 00:00:01 GMT;domain\x3d" + domain + ";";
									return domain
								}();
								var now = new Date;
								var time = now.getTime();
								time += 30 * 60 * 1E3;
								now.setTime(time);
								document.cookie = cn1 + "\x3d" + cmk + "; expires\x3d" + now.toUTCString() + ";path\x3d/;domain\x3d" + tld;
								_uxa.push(["trackDynamicVariable", {
									key: "csMatchingKey",
									value: cmk
								}])
							}
						}
						if (getCookie1.length == 1) init();
						else {
							var getCookieValue = "";
							if (getCookie1) getCookieValue = getCookie1[1].split(";")[0];
							init(getCookieValue)
						}
					}
				})()
			}
		}, 3935180, [3935191], 717426, [717321]);
		Bootstrapper.bindDependencyImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			if (Dell.Metrics.sc.cms === "eshop" || Dell.Metrics.sc.applicationname === "dell-brand.com" || Dell.Metrics.sc.cms === "dellstore") {
				Bootstrapper.on("click", ".dellmetrics-browseconfig", function() {
					var btnName = "addtocart";
					s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
					s_dell.products = ";" + Dell.Metrics.sc.productid;
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					window.linkTracking("scAdd",
						"products", "prop13,prop14,prop29,prop47,prop49,prop52,prop65,prop69.prop75", btnName, true, "o")
				});
				clickSelectors = ".dellmetrics-socialfacebook,.dellmetrics-socialtwitter,.dellmetrics-sociallinkedin,.dellmetrics-socialemail," + ".dellmetrics-socialwidget,.dellmetrics-search,.dellmetrics-filter,.dellmetrics-eventregister";
				if (typeof jQuery !== "undefined")(function($) {
					Bootstrapper.on("click", clickSelectors, function() {
						var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
							metrics =
							$(this).data("metrics"),
							btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
						s_dell.prop13 = s_dell.pageName + "|" + btnName;
						window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69.prop75", suffix, true, "o")
					});
					Bootstrapper.on("click", "[data-pagenav]", function() {
						var pagenav = $(this).data("pagenav");
						s_dell.prop13 = s_dell.pageName + "|" + (typeof pagenav !== "undefined" && typeof pagenav.btnname !== "undefined") ? pagenav.btnname : s_dell.pageName;
						window.consent_tcall()
					});
					Bootstrapper.on("click", ".dellmetrics-download", function() {
						var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
							metrics = $(this).data("metrics"),
							btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
						s_dell.prop33 = s_dell.eVar23 = btnName;
						s_dell.prop13 = s_dell.prop32 = s_dell.pageName;
						s_dell.events = s_dell.apl(s_dell.events, "event24", ",", 2);
						window.linkTracking("event24", "eVar23", "prop13,prop14,prop29,prop32,prop33,prop46,prop47,prop49,prop69.prop75",
							suffix, true, "d")
					});
					$(".dellmetrics-pgdown").on("click", function() {
						var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
							metrics = $(this).data("metrics"),
							btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
						s_dell.prop13 = s_dell.pageName + "|" + btnName;
						window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69.prop75", suffix, true, "o")
					});
					Bootstrapper.on("click", ".dellmetrics-dataclick", function(e) {
						var clickMap =
							$(this).attr("data-metrics");
						clickMap = clickMap.replace(/'/g, '"');
						var metricsp = JSON.parse(clickMap);
						var btnName = typeof metricsp !== "undefined" && typeof metricsp.btnname !== "undefined" ? metricsp.btnname : "";
						var livechat = typeof metricsp !== "undefined" && typeof metricsp.LiveChat !== "undefined" ? metricsp.LiveChat : "";
						var contactsales = typeof metricsp !== "undefined" && typeof metricsp.contactsales !== "undefined" ? metricsp.contactsales : "";
						var contactussubmit = typeof metricsp !== "undefined" && typeof metricsp.Contactussubmit !==
							"undefined" ? metricsp.Contactussubmit : "";
						var clickthrutype = typeof metricsp.clickthru !== "undefined" ? metricsp.clickthru : "";
						var doctype = typeof metricsp.doctype !== "undefined" ? metricsp.doctype : "";
						var position = typeof metricsp.position !== "undefined" ? metricsp.position : "";
						var sitesearchdocid = typeof metricsp.productId !== "undefined" ? metricsp.productId : "";
						if (clickthrutype !== "") {
							s_dell.eVar21 = clickthrutype;
							s_dell.eVar19 = doctype;
							s_dell.eVar17 = position;
							if (sitesearchdocid !== "") {
								var strdesturi = sitesearchdocid.split("//");
								if (strdesturi.length > 1);
								s_dell.eVar18 = strdesturi[1]
							}
							s_dell.events = s_dell.apl(s_dell.events, "event20", ",", 2);
							if (btnName !== "") btnName = btnName + ":sitesearchclickthrough"
						}
						if (btnName !== "") s_dell.prop13 = s_dell.pageName + "|" + btnName;
						if (livechat !== "") {
							s_dell.eVar206 = livechat;
							s_dell.events = s_dell.apl(s_dell.events, "event200", ",", 2)
						}
						if (contactsales !== "") {
							s_dell.eVar206 = contactsales;
							s_dell.events = s_dell.apl(s_dell.events, "event201", ",", 2)
						}
						if (contactussubmit === "true") s_dell.events = s_dell.apl(s_dell.events, "event202",
							",", 2);
						if (typeof metricsp !== "undefined") window.linkTracking("event20,event200,event201,event202", "eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar36,eVar68,products,eVar206", "prop7,prop12,prop13,prop14,prop29,prop47,prop49,prop74,prop69.prop75", btnName, true, "o")
					})
				})(jQuery)
			}
		}, 3996707, [3996718], 717570, [717567]);
		Bootstrapper.bindDependencyImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			reportPerfTimings = function(value) {
				if (typeof Bootstrapper.perfTimingStart === "undefined" && typeof Bootstrapper.perfTimingEnd === "undefined") return false;
				else if (value === "start") {
					Bootstrapper.perfTimingStart("ruleId-" + globalThis.id + "-deploymentId-" + globalThis.deploymentId);
					return true
				} else if (value === "end") {
					Bootstrapper.perfTimingEnd("ruleId-" + globalThis.id + "-deploymentId-" +
						globalThis.deploymentId);
					return true
				}
			};
			reportPerfTimings("start");
			if (typeof window.adb === "undefined") window.adb = {};
			if (typeof window.adbFun === "undefined") window.adbFun = {};
			if (typeof window.adb.gbLogging === "undefined") window.adb.gbLogging = {};
			adb.publishPath = typeof Bootstrapper === "undefined" ? "NA" : typeof Bootstrapper.ensightenOptions === "undefined" ? "NA" : Bootstrapper.ensightenOptions.publishPath;
			adb.isProd = !(adb.publishPath.indexOf("dev") > -1 || adb.publishPath.indexOf("Dev") > -1) ? true : false;
			adb.allowedCMS = ["ddh", "careersites", "delltech", "dellemc", "emcknowledgecenter", "emcsales", "community", "cvent", "delldesignsystem", "defyboundaries", "dfsportal", "emcpartnerportal", "expertprogram", "insights", "mysales", "outlet", "solveonline", "techdirect", "workfront", "external", "epsilon", "dell community forum", "flexreporting", "dellrefurbished", "premierportal"];
			adb.hostList = ["eqlsupport", "mbcontact.dell.com", "yougeek.ca", "dell.mysupportaccess.com", "nohold.net", "securitythinkingcap.com", "techpageone.dell.com", "powermore.dell.com",
				"www.businessgrow.com", "stoweboyd.com", "millennialceo.com", "govcloudnetwork.com", "dell.getronicsservices.com", "dellworld.com", "activeevents.com", "dellassetlibrary.com", "dell-solution.com", "www.jurinnov.com/security-spotlight", "alienwarearena.com", "www.privacyguidance.com", "teksecurity.com", "tdm.dell.com"
			];
			adb.localDomains = ["dell.com", "dellstore.com", "cloudwaysapps.com"];
			adb.TntKeysToCapture = ["tntid", "tntname", "tntactivity", "tntrecipe", "tntrecipename", "tntrecipenumber"];
			adb.debug = false;
			adb.appendVisitorIDsCounter =
				0;
			adb.previousDataMetrics = {};
			adb.trackHashCounter = 0;
			adb.history = localStorage.getItem("ADB_Data");
			if (adb.history) {
				adb.history = JSON.parse(adb.history);
				if (typeof adb.history.MCMHash !== "undefined") adb.MCMHash = adb.history.MCMHash
			}
			adbFun.gbLoggingFun = function(type, data, initiator) {
				try {
					if (!data || !type) return;
					if (!adb.isProd || adb.debug) console.log("Log Type: " + type + " , Message " + e + " , Initiator: " + initiator);
					setTimeout(function() {
							adb.gbLogging.initiator = initiator;
							adb.gbLogging.parentURL = window.location.href;
							postURL = "https://gbxgateway.dell.com/post/WEB/gbxtarget.aspx?ADBGlassboxLogging\x3dtrue";
							if (type === "postTrackCall") {
								adb.gbLogging.callData = data;
								if (adb.gbLogging.callData.indexOf("pev2") > -1) postURL += "\x26callType\x3dconsent_tlcall";
								else postURL += "\x26callType\x3dconsent_tcall"
							} else if (type === "error") {
								adb.gbLogging.error = data;
								postURL += "\x26callType\x3derrorReport"
							}
							data = adb.gbLogging;
							var xhttp = new XMLHttpRequest;
							xhttp.withCredentials = true;
							xhttp.open("POST", postURL, true);
							xhttp.send(JSON.stringify(data))
						},
						100)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "gbLoggingFun")
				}
			};
			adbFun.getscMap = function(key) {
				return typeof adb.scMap[key] != "undefined" ? adb.scMap[key] : ""
			};
			if (typeof Visitor === "undefined" || Visitor === "") adbFun.initiateVisitorAPI = function() {
				var e = function() {
					function e(t) {
						return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
							return typeof e
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
						})(t)
					}

					function t(e,
						t, n) {
						return t in e ? Object.defineProperty(e, t, {
							value: n,
							enumerable: !0,
							configurable: !0,
							writable: !0
						}) : e[t] = n, e
					}

					function n() {
						return {
							callbacks: {},
							add: function(e, t) {
								this.callbacks[e] = this.callbacks[e] || [];
								var n = this.callbacks[e].push(t) - 1,
									i = this;
								return function() {
									i.callbacks[e].splice(n, 1)
								}
							},
							execute: function(e, t) {
								if (this.callbacks[e]) {
									t = void 0 === t ? [] : t, t = t instanceof Array ? t : [t];
									try {
										for (; this.callbacks[e].length;) {
											var n = this.callbacks[e].shift();
											"function" == typeof n ? n.apply(null, t) : n instanceof Array && n[1].apply(n[0],
												t)
										}
										delete this.callbacks[e]
									} catch (e) {}
								}
							},
							executeAll: function(e, t) {
								(t || e && !j.isObjectEmpty(e)) && Object.keys(this.callbacks).forEach(function(t) {
									var n = void 0 !== e[t] ? e[t] : "";
									this.execute(t, n)
								}, this)
							},
							hasCallbacks: function() {
								return Boolean(Object.keys(this.callbacks).length)
							}
						}
					}

					function i(e, t, n) {
						var i = null == e ? void 0 : e[t];
						return void 0 === i ? n : i
					}

					function r(e) {
						for (var t = /^\d+$/, n = 0, i = e.length; n < i; n++)
							if (!t.test(e[n])) return !1;
						return !0
					}

					function a(e, t) {
						for (; e.length < t.length;) e.push("0");
						for (; t.length < e.length;) t.push("0")
					}

					function o(e, t) {
						for (var n = 0; n < e.length; n++) {
							var i = parseInt(e[n], 10),
								r = parseInt(t[n], 10);
							if (i > r) return 1;
							if (r > i) return -1
						}
						return 0
					}

					function s(e, t) {
						if (e === t) return 0;
						var n = e.toString().split("."),
							i = t.toString().split(".");
						return r(n.concat(i)) ? (a(n, i), o(n, i)) : NaN
					}

					function l(e) {
						return e === Object(e) && 0 === Object.keys(e).length
					}

					function c(e) {
						return "function" == typeof e || e instanceof Array && e.length
					}

					function u() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
							t = arguments.length > 1 && void 0 !==
							arguments[1] ? arguments[1] : function() {
								return !0
							};
						this.log = _e("log", e, t), this.warn = _e("warn", e, t), this.error = _e("error", e, t)
					}

					function d() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = e.isEnabled,
							n = e.cookieName,
							i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
							r = i.cookies;
						return t && n && r ? {
							remove: function() {
								r.remove(n)
							},
							get: function() {
								var e = r.get(n),
									t = {};
								try {
									t = JSON.parse(e)
								} catch (e) {
									t = {}
								}
								return t
							},
							set: function(e, t) {
								t = t || {}, r.set(n, JSON.stringify(e), {
									domain: t.optInCookieDomain ||
										"",
									cookieLifetime: t.optInStorageExpiry || 3419E4,
									expires: !0
								})
							}
						} : {
							get: Le,
							set: Le,
							remove: Le
						}
					}

					function f(e) {
						this.name = this.constructor.name, this.message = e, "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error(e)).stack
					}

					function p() {
						function e(e, t) {
							var n = Se(e);
							return n.length ? n.every(function(e) {
								return !!t[e]
							}) : De(t)
						}

						function t() {
							M(b), O(ce.COMPLETE), _(h.status, h.permissions), m.set(h.permissions, {
								optInCookieDomain: l,
								optInStorageExpiry: c
							}), C.execute(xe)
						}

						function n(e) {
							return function(n, i) {
								if (!Ae(n)) throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");
								return O(ce.CHANGED), Object.assign(b, ye(Se(n), e)), i || t(), h
							}
						}
						var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							r = i.doesOptInApply,
							a = i.previousPermissions,
							o = i.preOptInApprovals,
							s = i.isOptInStorageEnabled,
							l = i.optInCookieDomain,
							c = i.optInStorageExpiry,
							u = i.isIabContext,
							f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
							p = f.cookies,
							g = Pe(a);
						Re(g, "Invalid `previousPermissions`!"),
							Re(o, "Invalid `preOptInApprovals`!");
						var m = d({
								isEnabled: !!s,
								cookieName: "adobeujs-optin"
							}, {
								cookies: p
							}),
							h = this,
							_ = le(h),
							C = ge(),
							I = Me(g),
							v = Me(o),
							S = m.get(),
							D = {},
							A = function(e, t) {
								return ke(e) || t && ke(t) ? ce.COMPLETE : ce.PENDING
							}(I, S),
							y = function(e, t, n) {
								var i = ye(pe, !r);
								return r ? Object.assign({}, i, e, t, n) : i
							}(v, I, S),
							b = be(y),
							O = function(e) {
								return A = e
							},
							M = function(e) {
								return y = e
							};
						h.deny = n(!1), h.approve = n(!0), h.denyAll = h.deny.bind(h, pe), h.approveAll = h.approve.bind(h, pe), h.isApproved = function(t) {
								return e(t, h.permissions)
							},
							h.isPreApproved = function(t) {
								return e(t, v)
							}, h.fetchPermissions = function(e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
									n = t ? h.on(ce.COMPLETE, e) : Le;
								return !r || r && h.isComplete || !!o ? e(h.permissions) : t || C.add(xe, function() {
									return e(h.permissions)
								}), n
							}, h.complete = function() {
								h.status === ce.CHANGED && t()
							}, h.registerPlugin = function(e) {
								if (!e || !e.name || "function" != typeof e.onRegister) throw new Error(je);
								D[e.name] || (D[e.name] = e, e.onRegister.call(e, h))
							}, h.execute = Ne(D), Object.defineProperties(h, {
								permissions: {
									get: function() {
										return y
									}
								},
								status: {
									get: function() {
										return A
									}
								},
								Categories: {
									get: function() {
										return ue
									}
								},
								doesOptInApply: {
									get: function() {
										return !!r
									}
								},
								isPending: {
									get: function() {
										return h.status === ce.PENDING
									}
								},
								isComplete: {
									get: function() {
										return h.status === ce.COMPLETE
									}
								},
								__plugins: {
									get: function() {
										return Object.keys(D)
									}
								},
								isIabContext: {
									get: function() {
										return u
									}
								}
							})
					}

					function g(e, t) {
						function n() {
							r = null, e.call(e, new f("The call took longer than you wanted!"))
						}

						function i() {
							r && (clearTimeout(r), e.apply(e, arguments))
						}
						if (void 0 === t) return e;
						var r = setTimeout(n, t);
						return i
					}

					function m() {
						if (window.__cmp) return window.__cmp;
						var e = window;
						if (e === window.top) return void Ie.error("__cmp not found");
						for (var t; !t;) {
							e = e.parent;
							try {
								e.frames.__cmpLocator && (t = e)
							} catch (e) {}
							if (e === window.top) break
						}
						if (!t) return void Ie.error("__cmp not found");
						var n = {};
						return window.__cmp = function(e, i, r) {
							var a = Math.random() + "",
								o = {
									__cmpCall: {
										command: e,
										parameter: i,
										callId: a
									}
								};
							n[a] = r, t.postMessage(o, "*")
						}, window.addEventListener("message", function(e) {
							var t =
								e.data;
							if ("string" == typeof t) try {
								t = JSON.parse(e.data)
							} catch (e) {}
							if (t.__cmpReturn) {
								var i = t.__cmpReturn;
								n[i.callId] && (n[i.callId](i.returnValue, i.success), delete n[i.callId])
							}
						}, !1), window.__cmp
					}

					function h() {
						var e = this;
						e.name = "iabPlugin", e.version = "0.0.1";
						var t = ge(),
							n = {
								allConsentData: null
							},
							i = function(e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
								return n[e] = t
							};
						e.fetchConsentData = function(e) {
							var t = e.callback,
								n = e.timeout,
								i = g(t, n);
							r({
								callback: i
							})
						}, e.isApproved = function(e) {
							var t = e.callback,
								i = e.category,
								a = e.timeout;
							if (n.allConsentData) return t(null, s(i, n.allConsentData.vendorConsents, n.allConsentData.purposeConsents));
							var o = g(function(e) {
								var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
									r = n.vendorConsents,
									a = n.purposeConsents;
								t(e, s(i, r, a))
							}, a);
							r({
								category: i,
								callback: o
							})
						}, e.onRegister = function(t) {
							var n = Object.keys(de),
								i = function(e) {
									var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
										r = i.purposeConsents,
										a = i.gdprApplies,
										o = i.vendorConsents;
									!e && a && o && r && (n.forEach(function(e) {
										var n =
											s(e, o, r);
										t[n ? "approve" : "deny"](e, !0)
									}), t.complete())
								};
							e.fetchConsentData({
								callback: i
							})
						};
						var r = function(e) {
								var r = e.callback;
								if (n.allConsentData) return r(null, n.allConsentData);
								t.add("FETCH_CONSENT_DATA", r);
								var s = {};
								o(function() {
									var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
										r = e.purposeConsents,
										o = e.gdprApplies,
										l = e.vendorConsents;
									(arguments.length > 1 ? arguments[1] : void 0) && (s = {
										purposeConsents: r,
										gdprApplies: o,
										vendorConsents: l
									}, i("allConsentData", s)), a(function() {
										var e = arguments.length >
											0 && void 0 !== arguments[0] ? arguments[0] : {};
										(arguments.length > 1 ? arguments[1] : void 0) && (s.consentString = e.consentData, i("allConsentData", s)), t.execute("FETCH_CONSENT_DATA", [null, n.allConsentData])
									})
								})
							},
							a = function(e) {
								var t = m();
								t && t("getConsentData", null, e)
							},
							o = function(e) {
								var t = Fe(de),
									n = m();
								n && n("getVendorConsents", t, e)
							},
							s = function(e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
									n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
									i = !!t[de[e]];
								return i && function() {
									return fe[e].every(function(e) {
										return n[e]
									})
								}()
							}
					}
					var _ = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
					Object.assign = Object.assign || function(e) {
						for (var t, n, i = 1; i < arguments.length; ++i) {
							n = arguments[i];
							for (t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
						}
						return e
					};
					var C, I, v = {
							HANDSHAKE: "HANDSHAKE",
							GETSTATE: "GETSTATE",
							PARENTSTATE: "PARENTSTATE"
						},
						S = {
							MCMID: "MCMID",
							MCAID: "MCAID",
							MCAAMB: "MCAAMB",
							MCAAMLH: "MCAAMLH",
							MCOPTOUT: "MCOPTOUT",
							CUSTOMERIDS: "CUSTOMERIDS"
						},
						D = {
							MCMID: "getMarketingCloudVisitorID",
							MCAID: "getAnalyticsVisitorID",
							MCAAMB: "getAudienceManagerBlob",
							MCAAMLH: "getAudienceManagerLocationHint",
							MCOPTOUT: "isOptedOut",
							ALLFIELDS: "getVisitorValues"
						},
						A = {
							CUSTOMERIDS: "getCustomerIDs"
						},
						y = {
							MCMID: "getMarketingCloudVisitorID",
							MCAAMB: "getAudienceManagerBlob",
							MCAAMLH: "getAudienceManagerLocationHint",
							MCOPTOUT: "isOptedOut",
							MCAID: "getAnalyticsVisitorID",
							CUSTOMERIDS: "getCustomerIDs",
							ALLFIELDS: "getVisitorValues"
						},
						b = {
							MC: "MCMID",
							A: "MCAID",
							AAM: "MCAAMB"
						},
						O = {
							MCMID: "MCMID",
							MCOPTOUT: "MCOPTOUT",
							MCAID: "MCAID",
							MCAAMLH: "MCAAMLH",
							MCAAMB: "MCAAMB"
						},
						M = {
							UNKNOWN: 0,
							AUTHENTICATED: 1,
							LOGGED_OUT: 2
						},
						k = {
							GLOBAL: "global"
						},
						E = {
							MESSAGES: v,
							STATE_KEYS_MAP: S,
							ASYNC_API_MAP: D,
							SYNC_API_MAP: A,
							ALL_APIS: y,
							FIELDGROUP_TO_FIELD: b,
							FIELDS: O,
							AUTH_STATE: M,
							OPT_OUT: k
						},
						T = E.STATE_KEYS_MAP,
						L = function(e) {
							function t() {}

							function n(t, n) {
								var i = this;
								return function() {
									var r = e(0, t),
										a = {};
									return a[t] = r, i.setStateAndPublish(a), n(r), r
								}
							}
							this.getMarketingCloudVisitorID = function(e) {
								e = e || t;
								var i = this.findField(T.MCMID, e),
									r =
									n.call(this, T.MCMID, e);
								return void 0 !== i ? i : r()
							}, this.getVisitorValues = function(e) {
								this.getMarketingCloudVisitorID(function(t) {
									e({
										MCMID: t
									})
								})
							}
						},
						P = E.MESSAGES,
						R = E.ASYNC_API_MAP,
						w = E.SYNC_API_MAP,
						F = function() {
							function e() {}

							function t(e, t) {
								var n = this;
								return function() {
									return n.callbackRegistry.add(e, t), n.messageParent(P.GETSTATE), ""
								}
							}

							function n(n) {
								this[R[n]] = function(i) {
									i = i || e;
									var r = this.findField(n, i),
										a = t.call(this, n, i);
									return void 0 !== r ? r : a()
								}
							}

							function i(t) {
								this[w[t]] = function() {
									return this.findField(t,
										e) || {}
								}
							}
							Object.keys(R).forEach(n, this), Object.keys(w).forEach(i, this)
						},
						N = E.ASYNC_API_MAP,
						x = function() {
							Object.keys(N).forEach(function(e) {
								this[N[e]] = function(t) {
									this.callbackRegistry.add(e, t)
								}
							}, this)
						},
						j = function(e, t) {
							return t = {
								exports: {}
							}, e(t, t.exports), t.exports
						}(function(t, n) {
							n.isObjectEmpty = function(e) {
								return e === Object(e) && 0 === Object.keys(e).length
							}, n.isValueEmpty = function(e) {
								return "" === e || n.isObjectEmpty(e)
							}, n.getIeVersion = function() {
								if (document.documentMode) return document.documentMode;
								for (var e =
										7; e > 4; e--) {
									var t = document.createElement("div");
									if (t.innerHTML = "\x3c!--[if IE " + e + "]\x3e\x3cspan\x3e\x3c/span\x3e\x3c![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e;
									t = null
								}
								return null
							}, n.encodeAndBuildRequest = function(e, t) {
								return e.map(encodeURIComponent).join(t)
							}, n.isObject = function(t) {
								return null !== t && "object" === e(t) && !1 === Array.isArray(t)
							}, n.defineGlobalNamespace = function() {
								return window.adobe = n.isObject(window.adobe) ? window.adobe : {}, window.adobe
							}, n.pluck = function(e, t) {
								return t.reduce(function(t,
									n) {
									return e[n] && (t[n] = e[n]), t
								}, Object.create(null))
							}, n.parseOptOut = function(e, t, n) {
								t || (t = n, e.d_optout && e.d_optout instanceof Array && (t = e.d_optout.join(",")));
								var i = parseInt(e.d_ottl, 10);
								return isNaN(i) && (i = 7200), {
									optOut: t,
									d_ottl: i
								}
							}, n.normalizeBoolean = function(e) {
								var t = e;
								return "true" === e ? t = !0 : "false" === e && (t = !1), t
							}
						}),
						V = (j.isObjectEmpty, j.isValueEmpty, j.getIeVersion, j.encodeAndBuildRequest, j.isObject, j.defineGlobalNamespace, j.pluck, j.parseOptOut, j.normalizeBoolean, n),
						H = E.MESSAGES,
						U = {
							0: "prefix",
							1: "orgID",
							2: "state"
						},
						B = function(e, t) {
							this.parse = function(e) {
								try {
									var t = {};
									return e.data.split("|").forEach(function(e, n) {
										if (void 0 !== e) t[U[n]] = 2 !== n ? e : JSON.parse(e)
									}), t
								} catch (e) {}
							}, this.isInvalid = function(n) {
								var i = this.parse(n);
								if (!i || Object.keys(i).length < 2) return !0;
								var r = e !== i.orgID,
									a = !t || n.origin !== t,
									o = -1 === Object.keys(H).indexOf(i.prefix);
								return r || a || o
							}, this.send = function(n, i, r) {
								var a = i + "|" + e;
								r && r === Object(r) && (a += "|" + JSON.stringify(r));
								try {
									n.postMessage(a, t)
								} catch (e) {}
							}
						},
						G = E.MESSAGES,
						Y = function(e, t, n,
							i) {
							function r(e) {
								Object.assign(p, e)
							}

							function a(e) {
								Object.assign(p.state, e), Object.assign(p.state.ALLFIELDS, e), p.callbackRegistry.executeAll(p.state)
							}

							function o(e) {
								if (!h.isInvalid(e)) {
									m = !1;
									var t = h.parse(e);
									p.setStateAndPublish(t.state)
								}
							}

							function s(e) {
								!m && g && (m = !0, h.send(i, e))
							}

							function l() {
								r(new L(n._generateID)), p.getMarketingCloudVisitorID(), p.callbackRegistry.executeAll(p.state, !0), _.removeEventListener("message", c)
							}

							function c(e) {
								if (!h.isInvalid(e)) {
									var t = h.parse(e);
									m = !1, _.clearTimeout(p._handshakeTimeout),
										_.removeEventListener("message", c), r(new F(p)), _.addEventListener("message", o), p.setStateAndPublish(t.state), p.callbackRegistry.hasCallbacks() && s(G.GETSTATE)
								}
							}

							function u() {
								g && postMessage ? (_.addEventListener("message", c), s(G.HANDSHAKE), p._handshakeTimeout = setTimeout(l, 250)) : l()
							}

							function d() {
								_.s_c_in || (_.s_c_il = [], _.s_c_in = 0), p._c = "Visitor", p._il = _.s_c_il, p._in = _.s_c_in, p._il[p._in] = p, _.s_c_in++
							}

							function f() {
								function e(e) {
									0 !== e.indexOf("_") && "function" == typeof n[e] && (p[e] = function() {})
								}
								Object.keys(n).forEach(e),
									p.getSupplementalDataID = n.getSupplementalDataID, p.isAllowed = function() {
										return !0
									}
							}
							var p = this,
								g = t.whitelistParentDomain;
							p.state = {
								ALLFIELDS: {}
							}, p.version = n.version, p.marketingCloudOrgID = e, p.cookieDomain = n.cookieDomain || "", p._instanceType = "child";
							var m = !1,
								h = new B(e, g);
							p.callbackRegistry = V(), p.init = function() {
								d(), f(), r(new x(p)), u()
							}, p.findField = function(e, t) {
								if (void 0 !== p.state[e]) return t(p.state[e]), p.state[e]
							}, p.messageParent = s, p.setStateAndPublish = a
						},
						q = E.MESSAGES,
						X = E.ALL_APIS,
						W = E.ASYNC_API_MAP,
						J =
						E.FIELDGROUP_TO_FIELD,
						K = function(e, t) {
							function n() {
								var t = {};
								return Object.keys(X).forEach(function(n) {
									var i = X[n],
										r = e[i]();
									j.isValueEmpty(r) || (t[n] = r)
								}), t
							}

							function i() {
								var t = [];
								return e._loading && Object.keys(e._loading).forEach(function(n) {
									if (e._loading[n]) {
										var i = J[n];
										t.push(i)
									}
								}), t.length ? t : null
							}

							function r(t) {
								return function n(r) {
									var a = i();
									if (a) {
										var o = W[a[0]];
										e[o](n, !0)
									} else t()
								}
							}

							function a(e, i) {
								var r = n();
								t.send(e, i, r)
							}

							function o(e) {
								l(e), a(e, q.HANDSHAKE)
							}

							function s(e) {
								r(function() {
									a(e, q.PARENTSTATE)
								})()
							}

							function l(n) {
								function i(i) {
									r.call(e, i), t.send(n, q.PARENTSTATE, {
										CUSTOMERIDS: e.getCustomerIDs()
									})
								}
								var r = e.setCustomerIDs;
								e.setCustomerIDs = i
							}
							return function(e) {
								if (!t.isInvalid(e))(t.parse(e).prefix === q.HANDSHAKE ? o : s)(e.source)
							}
						},
						z = function(e, t) {
							function n(e) {
								return function(n) {
									i[e] = n, r++, r === a && t(i)
								}
							}
							var i = {},
								r = 0,
								a = Object.keys(e).length;
							Object.keys(e).forEach(function(t) {
								var i = e[t];
								if (i.fn) {
									var r = i.args || [];
									r.unshift(n(t)), i.fn.apply(i.context || null, r)
								}
							})
						},
						Q = {
							get: function(e) {
								e = encodeURIComponent(e);
								var t = (";" + document.cookie).split(" ").join(";"),
									n = t.indexOf(";" + e + "\x3d"),
									i = n < 0 ? n : t.indexOf(";", n + 1);
								return n < 0 ? "" : decodeURIComponent(t.substring(n + 2 + e.length, i < 0 ? t.length : i))
							},
							set: function(e, t, n) {
								var r = i(n, "cookieLifetime"),
									a = i(n, "expires"),
									o = i(n, "domain"),
									s = i(n, "secure"),
									l = s ? "Secure" : "";
								if (a && "SESSION" !== r && "NONE" !== r) {
									var c = "" !== t ? parseInt(r || 0, 10) : -60;
									if (c) a = new Date, a.setTime(a.getTime() + 1E3 * c);
									else if (1 === a) {
										a = new Date;
										var u = a.getYear();
										a.setYear(u + 2 + (u < 1900 ? 1900 : 0))
									}
								} else a = 0;
								return e && "NONE" !==
									r ? (document.cookie = encodeURIComponent(e) + "\x3d" + encodeURIComponent(t) + "; path\x3d/;" + (a ? " expires\x3d" + a.toGMTString() + ";" : "") + (o ? " domain\x3d" + o + ";" : "") + l, this.get(e) === t) : 0
							},
							remove: function(e, t) {
								var n = i(t, "domain");
								n = n ? " domain\x3d" + n + ";" : "", document.cookie = encodeURIComponent(e) + "\x3d; Path\x3d/; Expires\x3dThu, 01 Jan 1970 00:00:01 GMT;" + n
							}
						},
						$ = function(e) {
							var t;
							!e && _.location && (e = _.location.hostname), t = e;
							var n, i = t.split(".");
							for (n = i.length - 2; n >= 0; n--)
								if (t = i.slice(n).join("."), Q.set("test", "cookie", {
										domain: t
									})) return Q.remove("test", {
									domain: t
								}), t;
							return ""
						},
						Z = {
							compare: s,
							isLessThan: function(e, t) {
								return s(e, t) < 0
							},
							areVersionsDifferent: function(e, t) {
								return 0 !== s(e, t)
							},
							isGreaterThan: function(e, t) {
								return s(e, t) > 0
							},
							isEqual: function(e, t) {
								return 0 === s(e, t)
							}
						},
						ee = !!_.postMessage,
						te = {
							postMessage: function(e, t, n) {
								var i = 1;
								t && (ee ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (n.location = t.replace(/#.*$/, "") + "#" + +new Date + i++ + "\x26" + e))
							},
							receiveMessage: function(e, t) {
								var n;
								try {
									ee && (e && (n = function(n) {
										if ("string" ==
											typeof t && n.origin !== t || "[object Function]" === Object.prototype.toString.call(t) && !1 === t(n.origin)) return !1;
										e(n)
									}), _.addEventListener ? _[e ? "addEventListener" : "removeEventListener"]("message", n) : _[e ? "attachEvent" : "detachEvent"]("onmessage", n))
								} catch (e) {}
							}
						},
						ne = function(e) {
							var t, n, i = "0123456789",
								r = "",
								a = "",
								o = 8,
								s = 10,
								l = 10;
							if (1 == e) {
								for (i += "ABCDEF", t = 0; 16 > t; t++) n = Math.floor(Math.random() * o), r += i.substring(n, n + 1), n = Math.floor(Math.random() * o), a += i.substring(n, n + 1), o = 16;
								return r + "-" + a
							}
							for (t = 0; 19 > t; t++) n = Math.floor(Math.random() *
								s), r += i.substring(n, n + 1), 0 === t && 9 == n ? s = 3 : (1 == t || 2 == t) && 10 != s && 2 > n ? s = 10 : 2 < t && (s = 10), n = Math.floor(Math.random() * l), a += i.substring(n, n + 1), 0 === t && 9 == n ? l = 3 : (1 == t || 2 == t) && 10 != l && 2 > n ? l = 10 : 2 < t && (l = 10);
							return r + a
						},
						ie = function(e, t) {
							return {
								corsMetadata: function() {
									var e = "none",
										t = !0;
									return "undefined" != typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? e = "XMLHttpRequest" : "undefined" != typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (t = !1), Object.prototype.toString.call(_.HTMLElement).indexOf("Constructor") >
										0 && (t = !1)), {
										corsType: e,
										corsCookiesEnabled: t
									}
								}(),
								getCORSInstance: function() {
									return "none" === this.corsMetadata.corsType ? null : new _[this.corsMetadata.corsType]
								},
								fireCORS: function(t, n, i) {
									function r(e) {
										var n;
										try {
											if ((n = JSON.parse(e)) !== Object(n)) return void a.handleCORSError(t, null, "Response is not JSON")
										} catch (e) {
											return void a.handleCORSError(t, e, "Error parsing response as JSON")
										}
										try {
											for (var i = t.callback, r = _, o = 0; o < i.length; o++) r = r[i[o]];
											r(n)
										} catch (e) {
											a.handleCORSError(t, e, "Error forming callback function")
										}
									}
									var a = this;
									n && (t.loadErrorHandler = n);
									try {
										var o = this.getCORSInstance();
										o.open("get", t.corsUrl + "\x26ts\x3d" + (new Date).getTime(), !0), "XMLHttpRequest" === this.corsMetadata.corsType && (o.withCredentials = !0, o.timeout = e.loadTimeout, o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.onreadystatechange = function() {
												4 === this.readyState && 200 === this.status && r(this.responseText)
											}), o.onerror = function(e) {
												a.handleCORSError(t, e, "onerror")
											}, o.ontimeout = function(e) {
												a.handleCORSError(t, e, "ontimeout")
											},
											o.send(), e._log.requests.push(t.corsUrl)
									} catch (e) {
										this.handleCORSError(t, e, "try-catch")
									}
								},
								handleCORSError: function(t, n, i) {
									e.CORSErrors.push({
										corsData: t,
										error: n,
										description: i
									}), t.loadErrorHandler && ("ontimeout" === i ? t.loadErrorHandler(!0) : t.loadErrorHandler(!1))
								}
							}
						},
						re = {
							POST_MESSAGE_ENABLED: !!_.postMessage,
							DAYS_BETWEEN_SYNC_ID_CALLS: 1,
							MILLIS_PER_DAY: 864E5,
							ADOBE_MC: "adobe_mc",
							ADOBE_MC_SDID: "adobe_mc_sdid",
							VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
							ADOBE_MC_TTL_IN_MIN: 5,
							VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,
							FIRST_PARTY_SERVER_COOKIE: "s_ecid"
						},
						ae = function(e, t) {
							var n = _.document;
							return {
								THROTTLE_START: 3E4,
								MAX_SYNCS_LENGTH: 649,
								throttleTimerSet: !1,
								id: null,
								onPagePixels: [],
								iframeHost: null,
								getIframeHost: function(e) {
									if ("string" == typeof e) {
										var t = e.split("/");
										return t[0] + "//" + t[2]
									}
								},
								subdomain: null,
								url: null,
								getUrl: function() {
									var t, i = "http://fast.",
										r = "?d_nsid\x3d" + e.idSyncContainerID + "#" + encodeURIComponent(n.location.origin);
									return this.subdomain || (this.subdomain = "nosubdomainreturned"), e.loadSSL && (i = e.idSyncSSLUseAkamai ?
										"https://fast." : "https://"), t = i + this.subdomain + ".demdex.net/dest5.html" + r, this.iframeHost = this.getIframeHost(t), this.id = "destination_publishing_iframe_" + this.subdomain + "_" + e.idSyncContainerID, t
								},
								checkDPIframeSrc: function() {
									var t = "?d_nsid\x3d" + e.idSyncContainerID + "#" + encodeURIComponent(n.location.href);
									"string" == typeof e.dpIframeSrc && e.dpIframeSrc.length && (this.id = "destination_publishing_iframe_" + (e._subdomain || this.subdomain || (new Date).getTime()) + "_" + e.idSyncContainerID, this.iframeHost = this.getIframeHost(e.dpIframeSrc),
										this.url = e.dpIframeSrc + t)
								},
								idCallNotProcesssed: null,
								doAttachIframe: !1,
								startedAttachingIframe: !1,
								iframeHasLoaded: null,
								iframeIdChanged: null,
								newIframeCreated: null,
								originalIframeHasLoadedAlready: null,
								iframeLoadedCallbacks: [],
								regionChanged: !1,
								timesRegionChanged: 0,
								sendingMessages: !1,
								messages: [],
								messagesPosted: [],
								messagesReceived: [],
								messageSendingInterval: re.POST_MESSAGE_ENABLED ? null : 100,
								onPageDestinationsFired: [],
								jsonForComparison: [],
								jsonDuplicates: [],
								jsonWaiting: [],
								jsonProcessed: [],
								canSetThirdPartyCookies: !0,
								receivedThirdPartyCookiesNotification: !1,
								readyToAttachIframePreliminary: function() {
									return !(e.idSyncDisableSyncs || e.disableIdSyncs || e.idSyncDisable3rdPartySyncing || e.disableThirdPartyCookies || e.disableThirdPartyCalls)
								},
								readyToAttachIframe: function() {
									return this.readyToAttachIframePreliminary() && (this.doAttachIframe || e._doAttachIframe) && (this.subdomain && "nosubdomainreturned" !== this.subdomain || e._subdomain) && this.url && !this.startedAttachingIframe
								},
								attachIframe: function() {
									function e() {
										r = n.createElement("iframe"),
											r.sandbox = "allow-scripts allow-same-origin", r.title = "Adobe ID Syncing iFrame", r.id = i.id, r.name = i.id + "_name", r.style.cssText = "display: none; width: 0; height: 0;", r.src = i.url, i.newIframeCreated = !0, t(), n.body.appendChild(r)
									}

									function t(e) {
										r.addEventListener("load", function() {
											r.className = "aamIframeLoaded", i.iframeHasLoaded = !0, i.fireIframeLoadedCallbacks(e), i.requestToProcess()
										})
									}
									this.startedAttachingIframe = !0;
									var i = this,
										r = n.getElementById(this.id);
									r ? "IFRAME" !== r.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, e()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== r.className ? (this.originalIframeHasLoadedAlready = !1, t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")) : (this.originalIframeHasLoadedAlready = !0, this.iframeHasLoaded = !0, this.iframe = r, this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."), this.requestToProcess())) : e(), this.iframe = r
								},
								fireIframeLoadedCallbacks: function(e) {
									this.iframeLoadedCallbacks.forEach(function(t) {
										"function" ==
										typeof t && t({
											message: e || "The destination publishing iframe was attached and loaded successfully."
										})
									}), this.iframeLoadedCallbacks = []
								},
								requestToProcess: function(t) {
									function n() {
										r.jsonForComparison.push(t), r.jsonWaiting.push(t), r.processSyncOnPage(t)
									}
									var i, r = this;
									if (t === Object(t) && t.ibs)
										if (i = JSON.stringify(t.ibs || []), this.jsonForComparison.length) {
											var a, o, s, l = !1;
											for (a = 0, o = this.jsonForComparison.length; a < o; a++)
												if (s = this.jsonForComparison[a], i === JSON.stringify(s.ibs || [])) {
													l = !0;
													break
												} l ? this.jsonDuplicates.push(t) :
												n()
										} else n();
									if ((this.receivedThirdPartyCookiesNotification || !re.POST_MESSAGE_ENABLED || this.iframeHasLoaded) && this.jsonWaiting.length) {
										var c = this.jsonWaiting.shift();
										this.process(c), this.requestToProcess()
									}
									e.idSyncDisableSyncs || e.disableIdSyncs || !this.iframeHasLoaded || !this.messages.length || this.sendingMessages || (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function() {
										r.messageSendingInterval = re.POST_MESSAGE_ENABLED ? null : 150
									}, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
								},
								getRegionAndCheckIfChanged: function(t, n) {
									var i = e._getField("MCAAMLH"),
										r = t.d_region || t.dcs_region;
									return i ? r && (e._setFieldExpire("MCAAMLH", n), e._setField("MCAAMLH", r), parseInt(i, 10) !== r && (this.regionChanged = !0, this.timesRegionChanged++, e._setField("MCSYNCSOP", ""), e._setField("MCSYNCS", ""), i = r)) : (i = r) && (e._setFieldExpire("MCAAMLH", n), e._setField("MCAAMLH", i)), i || (i = ""), i
								},
								processSyncOnPage: function(e) {
									var t, n, i, r;
									if ((t = e.ibs) && t instanceof Array && (n = t.length))
										for (i = 0; i < n; i++) r = t[i], r.syncOnPage && this.checkFirstPartyCookie(r,
											"", "syncOnPage")
								},
								process: function(e) {
									var t, n, i, r, a, o = encodeURIComponent,
										s = !1;
									if ((t = e.ibs) && t instanceof Array && (n = t.length))
										for (s = !0, i = 0; i < n; i++) r = t[i], a = [o("ibs"), o(r.id || ""), o(r.tag || ""), j.encodeAndBuildRequest(r.url || [], ","), o(r.ttl || ""), "", "", r.fireURLSync ? "true" : "false"], r.syncOnPage || (this.canSetThirdPartyCookies ? this.addMessage(a.join("|")) : r.fireURLSync && this.checkFirstPartyCookie(r, a.join("|")));
									s && this.jsonProcessed.push(e)
								},
								checkFirstPartyCookie: function(t, n, i) {
									var r = "syncOnPage" === i,
										a = r ? "MCSYNCSOP" : "MCSYNCS";
									e._readVisitor();
									var o, s, l = e._getField(a),
										c = !1,
										u = !1,
										d = Math.ceil((new Date).getTime() / re.MILLIS_PER_DAY);
									l ? (o = l.split("*"), s = this.pruneSyncData(o, t.id, d), c = s.dataPresent, u = s.dataValid, c && u || this.fireSync(r, t, n, o, a, d)) : (o = [], this.fireSync(r, t, n, o, a, d))
								},
								pruneSyncData: function(e, t, n) {
									var i, r, a, o = !1,
										s = !1;
									for (r = 0; r < e.length; r++) i = e[r], a = parseInt(i.split("-")[1], 10), i.match("^" + t + "-") ? (o = !0, n < a ? s = !0 : (e.splice(r, 1), r--)) : n >= a && (e.splice(r, 1), r--);
									return {
										dataPresent: o,
										dataValid: s
									}
								},
								manageSyncsSize: function(e) {
									if (e.join("*").length > this.MAX_SYNCS_LENGTH)
										for (e.sort(function(e, t) {
												return parseInt(e.split("-")[1], 10) - parseInt(t.split("-")[1], 10)
											}); e.join("*").length > this.MAX_SYNCS_LENGTH;) e.shift()
								},
								fireSync: function(t, n, i, r, a, o) {
									var s = this;
									if (t) {
										if ("img" === n.tag) {
											var l, c, u, d, f = n.url,
												p = e.loadSSL ? "https:" : "http:";
											for (l = 0, c = f.length; l < c; l++) {
												u = f[l], d = /^\/\//.test(u);
												var g = new Image;
												g.addEventListener("load", function(t, n, i, r) {
													return function() {
														s.onPagePixels[t] = null, e._readVisitor();
														var o, l = e._getField(a),
															c = [];
														if (l) {
															o = l.split("*");
															var u, d, f;
															for (u = 0, d = o.length; u < d; u++) f = o[u], f.match("^" + n.id + "-") || c.push(f)
														}
														s.setSyncTrackingData(c, n, i, r)
													}
												}(this.onPagePixels.length, n, a, o)), g.src = (d ? p : "") + u, this.onPagePixels.push(g)
											}
										}
									} else this.addMessage(i), this.setSyncTrackingData(r, n, a, o)
								},
								addMessage: function(t) {
									var n = encodeURIComponent,
										i = n(e._enableErrorReporting ? "---destpub-debug---" : "---destpub---");
									this.messages.push((re.POST_MESSAGE_ENABLED ? "" : i) + t)
								},
								setSyncTrackingData: function(t, n, i, r) {
									t.push(n.id +
										"-" + (r + Math.ceil(n.ttl / 60 / 24))), this.manageSyncsSize(t), e._setField(i, t.join("*"))
								},
								sendMessages: function() {
									var e, t = this,
										n = "",
										i = encodeURIComponent;
									this.regionChanged && (n = i("---destpub-clear-dextp---"), this.regionChanged = !1), this.messages.length ? re.POST_MESSAGE_ENABLED ? (e = n + i("---destpub-combined---") + this.messages.join("%01"), this.postMessage(e), this.messages = [], this.sendingMessages = !1) : (e = this.messages.shift(), this.postMessage(n + e), setTimeout(function() {
											t.sendMessages()
										}, this.messageSendingInterval)) :
										this.sendingMessages = !1
								},
								postMessage: function(e) {
									te.postMessage(e, this.url, this.iframe.contentWindow), this.messagesPosted.push(e)
								},
								receiveMessage: function(e) {
									var t, n = /^---destpub-to-parent---/;
									"string" == typeof e && n.test(e) && (t = e.replace(n, "").split("|"), "canSetThirdPartyCookies" === t[0] && (this.canSetThirdPartyCookies = "true" === t[1], this.receivedThirdPartyCookiesNotification = !0, this.requestToProcess()), this.messagesReceived.push(e))
								},
								processIDCallData: function(i) {
									(null == this.url || i.subdomain && "nosubdomainreturned" ===
										this.subdomain) && ("string" == typeof e._subdomain && e._subdomain.length ? this.subdomain = e._subdomain : this.subdomain = i.subdomain || "", this.url = this.getUrl()), i.ibs instanceof Array && i.ibs.length && (this.doAttachIframe = !0), this.readyToAttachIframe() && (e.idSyncAttachIframeOnWindowLoad ? (t.windowLoaded || "complete" === n.readyState || "loaded" === n.readyState) && this.attachIframe() : this.attachIframeASAP()), "function" == typeof e.idSyncIDCallResult ? e.idSyncIDCallResult(i) : this.requestToProcess(i), "function" == typeof e.idSyncAfterIDCallResult &&
										e.idSyncAfterIDCallResult(i)
								},
								canMakeSyncIDCall: function(t, n) {
									return e._forceSyncIDCall || !t || n - t > re.DAYS_BETWEEN_SYNC_ID_CALLS
								},
								attachIframeASAP: function() {
									function e() {
										t.startedAttachingIframe || (n.body ? t.attachIframe() : setTimeout(e, 30))
									}
									var t = this;
									e()
								}
							}
						},
						oe = {
							audienceManagerServer: {},
							audienceManagerServerSecure: {},
							cookieDomain: {},
							cookieLifetime: {},
							cookieName: {},
							doesOptInApply: {},
							disableThirdPartyCalls: {},
							discardTrackingServerECID: {},
							idSyncAfterIDCallResult: {},
							idSyncAttachIframeOnWindowLoad: {},
							idSyncContainerID: {},
							idSyncDisable3rdPartySyncing: {},
							disableThirdPartyCookies: {},
							idSyncDisableSyncs: {},
							disableIdSyncs: {},
							idSyncIDCallResult: {},
							idSyncSSLUseAkamai: {},
							isCoopSafe: {},
							isIabContext: {},
							isOptInStorageEnabled: {},
							loadSSL: {},
							loadTimeout: {},
							marketingCloudServer: {},
							marketingCloudServerSecure: {},
							optInCookieDomain: {},
							optInStorageExpiry: {},
							overwriteCrossDomainMCIDAndAID: {},
							preOptInApprovals: {},
							previousPermissions: {},
							resetBeforeVersion: {},
							sdidParamExpiry: {},
							serverState: {},
							sessionCookieName: {},
							secureCookie: {},
							takeTimeoutMetrics: {},
							trackingServer: {},
							trackingServerSecure: {},
							whitelistIframeDomains: {},
							whitelistParentDomain: {}
						},
						se = {
							getConfigNames: function() {
								return Object.keys(oe)
							},
							getConfigs: function() {
								return oe
							},
							normalizeConfig: function(e) {
								return "function" != typeof e ? e : e()
							}
						},
						le = function(e) {
							var t = {};
							return e.on = function(e, n, i) {
									if (!n || "function" != typeof n) throw new Error("[ON] Callback should be a function.");
									t.hasOwnProperty(e) || (t[e] = []);
									var r = t[e].push({
										callback: n,
										context: i
									}) - 1;
									return function() {
										t[e].splice(r, 1), t[e].length || delete t[e]
									}
								},
								e.off = function(e, n) {
									t.hasOwnProperty(e) && (t[e] = t[e].filter(function(e) {
										if (e.callback !== n) return e
									}))
								}, e.publish = function(e) {
									if (t.hasOwnProperty(e)) {
										var n = [].slice.call(arguments, 1);
										t[e].slice(0).forEach(function(e) {
											e.callback.apply(e.context, n)
										})
									}
								}, e.publish
						},
						ce = {
							PENDING: "pending",
							CHANGED: "changed",
							COMPLETE: "complete"
						},
						ue = {
							AAM: "aam",
							ADCLOUD: "adcloud",
							ANALYTICS: "aa",
							CAMPAIGN: "campaign",
							ECID: "ecid",
							LIVEFYRE: "livefyre",
							TARGET: "target",
							VIDEO_ANALYTICS: "videoaa"
						},
						de = (C = {}, t(C, ue.AAM, 565), t(C, ue.ECID, 565),
							C),
						fe = (I = {}, t(I, ue.AAM, [1, 2, 5]), t(I, ue.ECID, [1, 2, 5]), I),
						pe = function(e) {
							return Object.keys(e).map(function(t) {
								return e[t]
							})
						}(ue),
						ge = function() {
							var e = {};
							return e.callbacks = Object.create(null), e.add = function(t, n) {
								if (!c(n)) throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");
								e.callbacks[t] = e.callbacks[t] || [];
								var i = e.callbacks[t].push(n) - 1;
								return function() {
									e.callbacks[t].splice(i, 1)
								}
							}, e.execute = function(t, n) {
								if (e.callbacks[t]) {
									n = void 0 === n ? [] : n, n = n instanceof
									Array ? n : [n];
									try {
										for (; e.callbacks[t].length;) {
											var i = e.callbacks[t].shift();
											"function" == typeof i ? i.apply(null, n) : i instanceof Array && i[1].apply(i[0], n)
										}
										delete e.callbacks[t]
									} catch (e) {}
								}
							}, e.executeAll = function(t, n) {
								(n || t && !l(t)) && Object.keys(e.callbacks).forEach(function(n) {
									var i = void 0 !== t[n] ? t[n] : "";
									e.execute(n, i)
								}, e)
							}, e.hasCallbacks = function() {
								return Boolean(Object.keys(e.callbacks).length)
							}, e
						},
						me = function() {},
						he = function(e) {
							var t = window,
								n = t.console;
							return !!n && "function" == typeof n[e]
						},
						_e = function(e,
							t, n) {
							return n() ? function() {
								if (he(e)) {
									for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = arguments[r];
									console[e].apply(console, [t].concat(i))
								}
							} : me
						},
						Ce = u,
						Ie = new Ce("[ADOBE OPT-IN]"),
						ve = function(t, n) {
							return e(t) === n
						},
						Se = function(e, t) {
							return e instanceof Array ? e : ve(e, "string") ? [e] : t || []
						},
						De = function(e) {
							var t = Object.keys(e);
							return !!t.length && t.every(function(t) {
								return !0 === e[t]
							})
						},
						Ae = function(e) {
							return !(!e || Oe(e)) && Se(e).every(function(e) {
								return pe.indexOf(e) > -1
							})
						},
						ye = function(e, t) {
							return e.reduce(function(e,
								n) {
								return e[n] = t, e
							}, {})
						},
						be = function(e) {
							return JSON.parse(JSON.stringify(e))
						},
						Oe = function(e) {
							return "[object Array]" === Object.prototype.toString.call(e) && !e.length
						},
						Me = function(e) {
							if (Te(e)) return e;
							try {
								return JSON.parse(e)
							} catch (e) {
								return {}
							}
						},
						ke = function(e) {
							return void 0 === e || (Te(e) ? Ae(Object.keys(e)) : Ee(e))
						},
						Ee = function(e) {
							try {
								var t = JSON.parse(e);
								return !!e && ve(e, "string") && Ae(Object.keys(t))
							} catch (e) {
								return !1
							}
						},
						Te = function(e) {
							return null !== e && ve(e, "object") && !1 === Array.isArray(e)
						},
						Le = function() {},
						Pe = function(e) {
							return ve(e, "function") ? e() : e
						},
						Re = function(e, t) {
							ke(e) || Ie.error("".concat(t))
						},
						we = function(e) {
							return Object.keys(e).map(function(t) {
								return e[t]
							})
						},
						Fe = function(e) {
							return we(e).filter(function(e, t, n) {
								return n.indexOf(e) === t
							})
						},
						Ne = function(e) {
							return function() {
								var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
									n = t.command,
									i = t.params,
									r = void 0 === i ? {} : i,
									a = t.callback,
									o = void 0 === a ? Le : a;
								if (!n || -1 === n.indexOf(".")) throw new Error("[OptIn.execute] Please provide a valid command.");
								try {
									var s = n.split("."),
										l = e[s[0]],
										c = s[1];
									if (!l || "function" != typeof l[c]) throw new Error("Make sure the plugin and API name exist.");
									var u = Object.assign(r, {
										callback: o
									});
									l[c].call(l, u)
								} catch (e) {
									Ie.error("[execute] Something went wrong: " + e.message)
								}
							}
						};
					f.prototype = Object.create(Error.prototype), f.prototype.constructor = f;
					var xe = "fetchPermissions",
						je = "[OptIn#registerPlugin] Plugin is invalid.";
					p.Categories = ue, p.TimeoutError = f;
					var Ve = Object.freeze({
							OptIn: p,
							IabPlugin: h
						}),
						He = function(e, t) {
							e.publishDestinations =
								function(n) {
									var i = arguments[1],
										r = arguments[2];
									try {
										r = "function" == typeof r ? r : n.callback
									} catch (e) {
										r = function() {}
									}
									var a = t;
									if (!a.readyToAttachIframePreliminary()) return void r({
										error: "The destination publishing iframe is disabled in the Visitor library."
									});
									if ("string" == typeof n) {
										if (!n.length) return void r({
											error: "subdomain is not a populated string."
										});
										if (!(i instanceof Array && i.length)) return void r({
											error: "messages is not a populated array."
										});
										var o = !1;
										if (i.forEach(function(e) {
												"string" == typeof e && e.length &&
													(a.addMessage(e), o = !0)
											}), !o) return void r({
											error: "None of the messages are populated strings."
										})
									} else {
										if (!j.isObject(n)) return void r({
											error: "Invalid parameters passed."
										});
										var s = n;
										if ("string" != typeof(n = s.subdomain) || !n.length) return void r({
											error: "config.subdomain is not a populated string."
										});
										var l = s.urlDestinations;
										if (!(l instanceof Array && l.length)) return void r({
											error: "config.urlDestinations is not a populated array."
										});
										var c = [];
										l.forEach(function(e) {
											j.isObject(e) && (e.hideReferrer ? e.message &&
												a.addMessage(e.message) : c.push(e))
										});
										! function e() {
											c.length && setTimeout(function() {
												var t = new Image,
													n = c.shift();
												t.src = n.url, a.onPageDestinationsFired.push(n), e()
											}, 100)
										}()
									}
									a.iframe ? (r({
										message: "The destination publishing iframe is already attached and loaded."
									}), a.requestToProcess()) : !e.subdomain && e._getField("MCMID") ? (a.subdomain = n, a.doAttachIframe = !0, a.url = a.getUrl(), a.readyToAttachIframe() ? (a.iframeLoadedCallbacks.push(function(e) {
										r({
											message: "Attempted to attach and load the destination publishing iframe through this API call. Result: " +
												(e.message || "no result")
										})
									}), a.attachIframe()) : r({
										error: "Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."
									})) : a.iframeLoadedCallbacks.push(function(e) {
										r({
											message: "Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: " + (e.message || "no result")
										})
									})
								}
						},
						Ue = function e(t) {
							function n(e, t) {
								return e >>> t | e << 32 - t
							}
							for (var i, r, a = Math.pow, o = a(2, 32), s = "", l = [], c = 8 * t.length, u = e.h = e.h || [], d = e.k = e.k || [], f = d.length, p = {}, g = 2; f < 64; g++)
								if (!p[g]) {
									for (i = 0; i < 313; i += g) p[i] = g;
									u[f] = a(g, .5) * o | 0, d[f++] = a(g, 1 / 3) * o | 0
								} for (t += "\u0080"; t.length % 64 - 56;) t += "\x00";
							for (i = 0; i < t.length; i++) {
								if ((r = t.charCodeAt(i)) >> 8) return;
								l[i >> 2] |= r << (3 - i) % 4 * 8
							}
							for (l[l.length] = c / o | 0, l[l.length] = c, r = 0; r < l.length;) {
								var m = l.slice(r, r += 16),
									h = u;
								for (u = u.slice(0, 8), i = 0; i < 64; i++) {
									var _ = m[i - 15],
										C = m[i - 2],
										I = u[0],
										v = u[4],
										S = u[7] + (n(v, 6) ^ n(v, 11) ^ n(v, 25)) + (v & u[5] ^ ~v & u[6]) + d[i] + (m[i] = i < 16 ? m[i] : m[i - 16] + (n(_, 7) ^ n(_, 18) ^ _ >>> 3) + m[i - 7] + (n(C, 17) ^ n(C, 19) ^
											C >>> 10) | 0);
									u = [S + ((n(I, 2) ^ n(I, 13) ^ n(I, 22)) + (I & u[1] ^ I & u[2] ^ u[1] & u[2])) | 0].concat(u), u[4] = u[4] + S | 0
								}
								for (i = 0; i < 8; i++) u[i] = u[i] + h[i] | 0
							}
							for (i = 0; i < 8; i++)
								for (r = 3; r + 1; r--) {
									var D = u[i] >> 8 * r & 255;
									s += (D < 16 ? 0 : "") + D.toString(16)
								}
							return s
						},
						Be = function(e, t) {
							return "SHA-256" !== t && "SHA256" !== t && "sha256" !== t && "sha-256" !== t || (e = Ue(e)), e
						},
						Ge = function(e) {
							return String(e).trim().toLowerCase()
						},
						Ye = Ve.OptIn;
					j.defineGlobalNamespace(), window.adobe.OptInCategories = Ye.Categories;
					var qe = function(t, n, i) {
						function r(e) {
							var t = e;
							return function(e) {
								var n =
									e || v.location.href;
								try {
									var i = g._extractParamFromUri(n, t);
									if (i) return w.parsePipeDelimetedKeyValues(i)
								} catch (e) {}
							}
						}

						function a(e) {
							function t(e, t, n) {
								e && e.match(re.VALID_VISITOR_ID_REGEX) && (n === A && (I = !0), t(e))
							}
							t(e[A], g.setMarketingCloudVisitorID, A), g._setFieldExpire(k, -1), t(e[O], g.setAnalyticsVisitorID)
						}

						function o(e) {
							e = e || {}, g._supplementalDataIDCurrent = e.supplementalDataIDCurrent || "", g._supplementalDataIDCurrentConsumed = e.supplementalDataIDCurrentConsumed || {}, g._supplementalDataIDLast = e.supplementalDataIDLast ||
								"", g._supplementalDataIDLastConsumed = e.supplementalDataIDLastConsumed || {}
						}

						function s(e) {
							function t(e, t, n) {
								return n = n ? n += "|" : n, n += e + "\x3d" + encodeURIComponent(t)
							}

							function n(e, n) {
								var i = n[0],
									r = n[1];
								return null != r && r !== T && (e = t(i, r, e)), e
							}
							var i = e.reduce(n, "");
							return function(e) {
								var t = w.getTimestampInSeconds();
								return e = e ? e += "|" : e, e += "TS\x3d" + t
							}(i)
						}

						function l(e) {
							var t = e.minutesToLive,
								n = "";
							return (g.idSyncDisableSyncs || g.disableIdSyncs) && (n = n || "Error: id syncs have been disabled"), "string" == typeof e.dpid && e.dpid.length ||
								(n = n || "Error: config.dpid is empty"), "string" == typeof e.url && e.url.length || (n = n || "Error: config.url is empty"), void 0 === t ? t = 20160 : (t = parseInt(t, 10), (isNaN(t) || t <= 0) && (n = n || "Error: config.minutesToLive needs to be a positive number")), {
									error: n,
									ttl: t
								}
						}

						function c() {
							return !!g.configs.doesOptInApply && !(m.optIn.isComplete && u())
						}

						function u() {
							return g.configs.isIabContext ? m.optIn.isApproved(m.optIn.Categories.ECID) && C : m.optIn.isApproved(m.optIn.Categories.ECID)
						}

						function d(e, t) {
							if (C = !0, e) throw new Error("[IAB plugin] : " +
								e);
							t.gdprApplies && (h = t.consentString), g.init(), p()
						}

						function f() {
							m.optIn.isApproved(m.optIn.Categories.ECID) && (g.configs.isIabContext ? m.optIn.execute({
								command: "iabPlugin.fetchConsentData",
								callback: d
							}) : (g.init(), p()))
						}

						function p() {
							m.optIn.off("complete", f)
						}
						if (!i || i.split("").reverse().join("") !== t) throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");
						var g = this,
							m = window.adobe,
							h = "",
							C = !1,
							I = !1;
						g.version = "4.4.0";
						var v = _,
							S = v.Visitor;
						S.version = g.version, S.AuthState = E.AUTH_STATE, S.OptOut =
							E.OPT_OUT, v.s_c_in || (v.s_c_il = [], v.s_c_in = 0), g._c = "Visitor", g._il = v.s_c_il, g._in = v.s_c_in, g._il[g._in] = g, v.s_c_in++, g._instanceType = "regular", g._log = {
								requests: []
							}, g.marketingCloudOrgID = t, g.cookieName = "AMCV_" + t, g.sessionCookieName = "AMCVS_" + t, g.cookieDomain = $(), g.loadSSL = v.location.protocol.toLowerCase().indexOf("https") >= 0, g.loadTimeout = 3E4, g.CORSErrors = [], g.marketingCloudServer = g.audienceManagerServer = "dpm.demdex.net", g.sdidParamExpiry = 30;
						var D = null,
							A = "MCMID",
							y = "MCIDTS",
							b = "A",
							O = "MCAID",
							M = "AAM",
							k =
							"MCAAMB",
							T = "NONE",
							L = function(e) {
								return !Object.prototype[e]
							},
							P = ie(g);
						g.FIELDS = E.FIELDS, g.cookieRead = function(e) {
								return Q.get(e)
							}, g.cookieWrite = function(e, t, n) {
								var i = g.cookieLifetime ? ("" + g.cookieLifetime).toUpperCase() : "",
									r = !1;
								return g.configs && g.configs.secureCookie && "https:" === location.protocol && (r = !0), Q.set(e, "" + t, {
									expires: n,
									domain: g.cookieDomain,
									cookieLifetime: i,
									secure: r
								})
							}, g.resetState = function(e) {
								e ? g._mergeServerState(e) : o()
							}, g._isAllowedDone = !1, g._isAllowedFlag = !1, g.isAllowed = function() {
								return g._isAllowedDone ||
									(g._isAllowedDone = !0, (g.cookieRead(g.cookieName) || g.cookieWrite(g.cookieName, "T", 1)) && (g._isAllowedFlag = !0)), "T" === g.cookieRead(g.cookieName) && g._helpers.removeCookie(g.cookieName), g._isAllowedFlag
							}, g.setMarketingCloudVisitorID = function(e) {
								g._setMarketingCloudFields(e)
							}, g._use1stPartyMarketingCloudServer = !1, g.getMarketingCloudVisitorID = function(e, t) {
								g.marketingCloudServer && g.marketingCloudServer.indexOf(".demdex.net") < 0 && (g._use1stPartyMarketingCloudServer = !0);
								var n = g._getAudienceManagerURLData("_setMarketingCloudFields"),
									i = n.url;
								return g._getRemoteField(A, i, e, t, n)
							}, g.getVisitorValues = function(e, t) {
								var n = {
										MCMID: {
											fn: g.getMarketingCloudVisitorID,
											args: [!0],
											context: g
										},
										MCOPTOUT: {
											fn: g.isOptedOut,
											args: [void 0, !0],
											context: g
										},
										MCAID: {
											fn: g.getAnalyticsVisitorID,
											args: [!0],
											context: g
										},
										MCAAMLH: {
											fn: g.getAudienceManagerLocationHint,
											args: [!0],
											context: g
										},
										MCAAMB: {
											fn: g.getAudienceManagerBlob,
											args: [!0],
											context: g
										}
									},
									i = t && t.length ? j.pluck(n, t) : n;
								z(i, e)
							}, g._currentCustomerIDs = {}, g._customerIDsHashChanged = !1, g._newCustomerIDsHash = "", g.setCustomerIDs =
							function(t, n) {
								function i() {
									g._customerIDsHashChanged = !1
								}
								if (!g.isOptedOut() && t) {
									if (!j.isObject(t) || j.isObjectEmpty(t)) return !1;
									g._readVisitor();
									var r, a, o;
									for (r in t)
										if (L(r) && (a = t[r], n = a.hasOwnProperty("hashType") ? a.hashType : n, a))
											if ("object" === e(a)) {
												var s = {};
												if (a.id) {
													if (n) {
														if (!(o = Be(Ge(a.id), n))) return;
														a.id = o, s.hashType = n
													}
													s.id = a.id
												}
												void 0 != a.authState && (s.authState = a.authState), g._currentCustomerIDs[r] = s
											} else if (n) {
										if (!(o = Be(Ge(a), n))) return;
										g._currentCustomerIDs[r] = {
											id: o,
											hashType: n
										}
									} else g._currentCustomerIDs[r] = {
										id: a
									};
									var l = g.getCustomerIDs(),
										c = g._getField("MCCIDH"),
										u = "";
									c || (c = 0);
									for (r in l) L(r) && (a = l[r], u += (u ? "|" : "") + r + "|" + (a.id ? a.id : "") + (a.authState ? a.authState : ""));
									g._newCustomerIDsHash = String(g._hash(u)), g._newCustomerIDsHash !== c && (g._customerIDsHashChanged = !0, g._mapCustomerIDs(i))
								}
							}, g.getCustomerIDs = function() {
								g._readVisitor();
								var e, t, n = {};
								for (e in g._currentCustomerIDs) L(e) && (t = g._currentCustomerIDs[e], n[e] || (n[e] = {}), t.id && (n[e].id = t.id), void 0 != t.authState ? n[e].authState = t.authState : n[e].authState =
									S.AuthState.UNKNOWN, t.hashType && (n[e].hashType = t.hashType));
								return n
							}, g.setAnalyticsVisitorID = function(e) {
								g._setAnalyticsFields(e)
							}, g.getAnalyticsVisitorID = function(e, t, n) {
								if (!w.isTrackingServerPopulated() && !n) return g._callCallback(e, [""]), "";
								var i = "";
								if (n || (i = g.getMarketingCloudVisitorID(function(t) {
										g.getAnalyticsVisitorID(e, !0)
									})), i || n) {
									var r = n ? g.marketingCloudServer : g.trackingServer,
										a = "";
									g.loadSSL && (n ? g.marketingCloudServerSecure && (r = g.marketingCloudServerSecure) : g.trackingServerSecure && (r = g.trackingServerSecure));
									var o = {};
									if (r) {
										var s = "http" + (g.loadSSL ? "s" : "") + "://" + r + "/id",
											l = "d_visid_ver\x3d" + g.version + "\x26mcorgid\x3d" + encodeURIComponent(g.marketingCloudOrgID) + (i ? "\x26mid\x3d" + encodeURIComponent(i) : "") + (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies ? "\x26d_coppa\x3dtrue" : ""),
											c = ["s_c_il", g._in, "_set" + (n ? "MarketingCloud" : "Analytics") + "Fields"];
										a = s + "?" + l + "\x26callback\x3ds_c_il%5B" + g._in + "%5D._set" + (n ? "MarketingCloud" : "Analytics") + "Fields", o.corsUrl = s + "?" + l, o.callback = c
									}
									return o.url = a, g._getRemoteField(n ?
										A : O, a, e, t, o)
								}
								return ""
							}, g.getAudienceManagerLocationHint = function(e, t) {
								if (g.getMarketingCloudVisitorID(function(t) {
										g.getAudienceManagerLocationHint(e, !0)
									})) {
									var n = g._getField(O);
									if (!n && w.isTrackingServerPopulated() && (n = g.getAnalyticsVisitorID(function(t) {
											g.getAudienceManagerLocationHint(e, !0)
										})), n || !w.isTrackingServerPopulated()) {
										var i = g._getAudienceManagerURLData(),
											r = i.url;
										return g._getRemoteField("MCAAMLH", r, e, t, i)
									}
								}
								return ""
							}, g.getLocationHint = g.getAudienceManagerLocationHint, g.getAudienceManagerBlob =
							function(e, t) {
								if (g.getMarketingCloudVisitorID(function(t) {
										g.getAudienceManagerBlob(e, !0)
									})) {
									var n = g._getField(O);
									if (!n && w.isTrackingServerPopulated() && (n = g.getAnalyticsVisitorID(function(t) {
											g.getAudienceManagerBlob(e, !0)
										})), n || !w.isTrackingServerPopulated()) {
										var i = g._getAudienceManagerURLData(),
											r = i.url;
										return g._customerIDsHashChanged && g._setFieldExpire(k, -1), g._getRemoteField(k, r, e, t, i)
									}
								}
								return ""
							}, g._supplementalDataIDCurrent = "", g._supplementalDataIDCurrentConsumed = {}, g._supplementalDataIDLast = "",
							g._supplementalDataIDLastConsumed = {}, g.getSupplementalDataID = function(e, t) {
								g._supplementalDataIDCurrent || t || (g._supplementalDataIDCurrent = g._generateID(1));
								var n = g._supplementalDataIDCurrent;
								return g._supplementalDataIDLast && !g._supplementalDataIDLastConsumed[e] ? (n = g._supplementalDataIDLast, g._supplementalDataIDLastConsumed[e] = !0) : n && (g._supplementalDataIDCurrentConsumed[e] && (g._supplementalDataIDLast = g._supplementalDataIDCurrent, g._supplementalDataIDLastConsumed = g._supplementalDataIDCurrentConsumed,
									g._supplementalDataIDCurrent = n = t ? "" : g._generateID(1), g._supplementalDataIDCurrentConsumed = {}), n && (g._supplementalDataIDCurrentConsumed[e] = !0)), n
							};
						var R = !1;
						g._liberatedOptOut = null, g.getOptOut = function(e, t) {
								var n = g._getAudienceManagerURLData("_setMarketingCloudFields"),
									i = n.url;
								if (u()) return g._getRemoteField("MCOPTOUT", i, e, t, n);
								if (g._registerCallback("liberatedOptOut", e), null !== g._liberatedOptOut) return g._callAllCallbacks("liberatedOptOut", [g._liberatedOptOut]), R = !1, g._liberatedOptOut;
								if (R) return null;
								R = !0;
								var r = "liberatedGetOptOut";
								return n.corsUrl = n.corsUrl.replace(/dpm\.demdex\.net\/id\?/, "dpm.demdex.net/optOutStatus?"), n.callback = [r], _[r] = function(e) {
									if (e === Object(e)) {
										var t, n, i = j.parseOptOut(e, t, T);
										t = i.optOut, n = 1E3 * i.d_ottl, g._liberatedOptOut = t, setTimeout(function() {
											g._liberatedOptOut = null
										}, n)
									}
									g._callAllCallbacks("liberatedOptOut", [t]), R = !1
								}, P.fireCORS(n), null
							}, g.isOptedOut = function(e, t, n) {
								t || (t = S.OptOut.GLOBAL);
								var i = g.getOptOut(function(n) {
									var i = n === S.OptOut.GLOBAL || n.indexOf(t) >= 0;
									g._callCallback(e,
										[i])
								}, n);
								return i ? i === S.OptOut.GLOBAL || i.indexOf(t) >= 0 : null
							}, g._fields = null, g._fieldsExpired = null, g._hash = function(e) {
								var t, n, i = 0;
								if (e)
									for (t = 0; t < e.length; t++) n = e.charCodeAt(t), i = (i << 5) - i + n, i &= i;
								return i
							}, g._generateID = ne, g._generateLocalMID = function() {
								var e = g._generateID(0);
								return N.isClientSideMarketingCloudVisitorID = !0, e
							}, g._callbackList = null, g._callCallback = function(e, t) {
								try {
									"function" == typeof e ? e.apply(v, t) : e[1].apply(e[0], t)
								} catch (e) {}
							}, g._registerCallback = function(e, t) {
								t && (null == g._callbackList &&
									(g._callbackList = {}), void 0 == g._callbackList[e] && (g._callbackList[e] = []), g._callbackList[e].push(t))
							}, g._callAllCallbacks = function(e, t) {
								if (null != g._callbackList) {
									var n = g._callbackList[e];
									if (n)
										for (; n.length > 0;) g._callCallback(n.shift(), t)
								}
							}, g._addQuerystringParam = function(e, t, n, i) {
								var r = encodeURIComponent(t) + "\x3d" + encodeURIComponent(n),
									a = w.parseHash(e),
									o = w.hashlessUrl(e);
								if (-1 === o.indexOf("?")) return o + "?" + r + a;
								var s = o.split("?"),
									l = s[0] + "?",
									c = s[1];
								return l + w.addQueryParamAtLocation(c, r, i) + a
							}, g._extractParamFromUri =
							function(e, t) {
								var n = new RegExp("[\\?\x26#]" + t + "\x3d([^\x26#]*)"),
									i = n.exec(e);
								if (i && i.length) return decodeURIComponent(i[1])
							}, g._parseAdobeMcFromUrl = r(re.ADOBE_MC), g._parseAdobeMcSdidFromUrl = r(re.ADOBE_MC_SDID), g._attemptToPopulateSdidFromUrl = function(e) {
								var n = g._parseAdobeMcSdidFromUrl(e),
									i = 1E9;
								n && n.TS && (i = w.getTimestampInSeconds() - n.TS), n && n.SDID && n.MCORGID === t && i < g.sdidParamExpiry && (g._supplementalDataIDCurrent = n.SDID, g._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0)
							}, g._attemptToPopulateIdsFromUrl =
							function() {
								var e = g._parseAdobeMcFromUrl();
								if (e && e.TS) {
									var n = w.getTimestampInSeconds(),
										i = n - e.TS;
									if (Math.floor(i / 60) > re.ADOBE_MC_TTL_IN_MIN || e.MCORGID !== t) return;
									a(e)
								}
							}, g._mergeServerState = function(e) {
								if (e) try {
									if (e = function(e) {
											return w.isObject(e) ? e : JSON.parse(e)
										}(e), e[g.marketingCloudOrgID]) {
										var t = e[g.marketingCloudOrgID];
										! function(e) {
											w.isObject(e) && g.setCustomerIDs(e)
										}(t.customerIDs), o(t.sdid)
									}
								} catch (e) {
									throw new Error("`serverState` has an invalid format.");
								}
							}, g._timeout = null, g._loadData = function(e,
								t, n, i) {
								t = g._addQuerystringParam(t, "d_fieldgroup", e, 1), i.url = g._addQuerystringParam(i.url, "d_fieldgroup", e, 1), i.corsUrl = g._addQuerystringParam(i.corsUrl, "d_fieldgroup", e, 1), N.fieldGroupObj[e] = !0, i === Object(i) && i.corsUrl && "XMLHttpRequest" === P.corsMetadata.corsType && P.fireCORS(i, n, e)
							}, g._clearTimeout = function(e) {
								null != g._timeout && g._timeout[e] && (clearTimeout(g._timeout[e]), g._timeout[e] = 0)
							}, g._settingsDigest = 0, g._getSettingsDigest = function() {
								if (!g._settingsDigest) {
									var e = g.version;
									g.audienceManagerServer &&
										(e += "|" + g.audienceManagerServer), g.audienceManagerServerSecure && (e += "|" + g.audienceManagerServerSecure), g._settingsDigest = g._hash(e)
								}
								return g._settingsDigest
							}, g._readVisitorDone = !1, g._readVisitor = function() {
								if (!g._readVisitorDone) {
									g._readVisitorDone = !0;
									var e, t, n, i, r, a, o = g._getSettingsDigest(),
										s = !1,
										l = g.cookieRead(g.cookieName),
										c = new Date;
									if (l || I || g.discardTrackingServerECID || (l = g.cookieRead(re.FIRST_PARTY_SERVER_COOKIE)), null == g._fields && (g._fields = {}), l && "T" !== l)
										for (l = l.split("|"), l[0].match(/^[\-0-9]+$/) &&
											(parseInt(l[0], 10) !== o && (s = !0), l.shift()), l.length % 2 == 1 && l.pop(), e = 0; e < l.length; e += 2) t = l[e].split("-"), n = t[0], i = l[e + 1], t.length > 1 ? (r = parseInt(t[1], 10), a = t[1].indexOf("s") > 0) : (r = 0, a = !1), s && ("MCCIDH" === n && (i = ""), r > 0 && (r = c.getTime() / 1E3 - 60)), n && i && (g._setField(n, i, 1), r > 0 && (g._fields["expire" + n] = r + (a ? "s" : ""), (c.getTime() >= 1E3 * r || a && !g.cookieRead(g.sessionCookieName)) && (g._fieldsExpired || (g._fieldsExpired = {}), g._fieldsExpired[n] = !0)));
									!g._getField(O) && w.isTrackingServerPopulated() && (l = g.cookieRead("s_vi")) &&
										(l = l.split("|"), l.length > 1 && l[0].indexOf("v1") >= 0 && (i = l[1], e = i.indexOf("["), e >= 0 && (i = i.substring(0, e)), i && i.match(re.VALID_VISITOR_ID_REGEX) && g._setField(O, i)))
								}
							}, g._appendVersionTo = function(e) {
								var t = "vVersion|" + g.version,
									n = e ? g._getCookieVersion(e) : null;
								return n ? Z.areVersionsDifferent(n, g.version) && (e = e.replace(re.VERSION_REGEX, t)) : e += (e ? "|" : "") + t, e
							}, g._writeVisitor = function() {
								var e, t, n = g._getSettingsDigest();
								for (e in g._fields) L(e) && g._fields[e] && "expire" !== e.substring(0, 6) && (t = g._fields[e], n += (n ?
									"|" : "") + e + (g._fields["expire" + e] ? "-" + g._fields["expire" + e] : "") + "|" + t);
								n = g._appendVersionTo(n), g.cookieWrite(g.cookieName, n, 1)
							}, g._getField = function(e, t) {
								return null == g._fields || !t && g._fieldsExpired && g._fieldsExpired[e] ? null : g._fields[e]
							}, g._setField = function(e, t, n) {
								null == g._fields && (g._fields = {}), g._fields[e] = t, n || g._writeVisitor()
							}, g._getFieldList = function(e, t) {
								var n = g._getField(e, t);
								return n ? n.split("*") : null
							}, g._setFieldList = function(e, t, n) {
								g._setField(e, t ? t.join("*") : "", n)
							}, g._getFieldMap = function(e,
								t) {
								var n = g._getFieldList(e, t);
								if (n) {
									var i, r = {};
									for (i = 0; i < n.length; i += 2) r[n[i]] = n[i + 1];
									return r
								}
								return null
							}, g._setFieldMap = function(e, t, n) {
								var i, r = null;
								if (t) {
									r = [];
									for (i in t) L(i) && (r.push(i), r.push(t[i]))
								}
								g._setFieldList(e, r, n)
							}, g._setFieldExpire = function(e, t, n) {
								var i = new Date;
								i.setTime(i.getTime() + 1E3 * t), null == g._fields && (g._fields = {}), g._fields["expire" + e] = Math.floor(i.getTime() / 1E3) + (n ? "s" : ""), t < 0 ? (g._fieldsExpired || (g._fieldsExpired = {}), g._fieldsExpired[e] = !0) : g._fieldsExpired && (g._fieldsExpired[e] = !1), n && (g.cookieRead(g.sessionCookieName) || g.cookieWrite(g.sessionCookieName, "1"))
							}, g._findVisitorID = function(t) {
								return t && ("object" === e(t) && (t = t.d_mid ? t.d_mid : t.visitorID ? t.visitorID : t.id ? t.id : t.uuid ? t.uuid : "" + t), t && "NOTARGET" === (t = t.toUpperCase()) && (t = T), t && (t === T || t.match(re.VALID_VISITOR_ID_REGEX)) || (t = "")), t
							}, g._setFields = function(t, n) {
								if (g._clearTimeout(t), null != g._loading && (g._loading[t] = !1), N.fieldGroupObj[t] && N.setState(t, !1), "MC" === t) {
									!0 !== N.isClientSideMarketingCloudVisitorID && (N.isClientSideMarketingCloudVisitorID = !1);
									var i = g._getField(A);
									if (!i || g.overwriteCrossDomainMCIDAndAID) {
										if (!(i = "object" === e(n) && n.mid ? n.mid : g._findVisitorID(n))) {
											if (g._use1stPartyMarketingCloudServer && !g.tried1stPartyMarketingCloudServer) return g.tried1stPartyMarketingCloudServer = !0, void g.getAnalyticsVisitorID(null, !1, !0);
											i = g._generateLocalMID()
										}
										g._setField(A, i)
									}
									i && i !== T || (i = ""), "object" === e(n) && ((n.d_region || n.dcs_region || n.d_blob || n.blob) && g._setFields(M, n), g._use1stPartyMarketingCloudServer && n.mid && g._setFields(b, {
										id: n.id
									})), g._callAllCallbacks(A,
										[i])
								}
								if (t === M && "object" === e(n)) {
									var r = 604800;
									void 0 != n.id_sync_ttl && n.id_sync_ttl && (r = parseInt(n.id_sync_ttl, 10));
									var a = F.getRegionAndCheckIfChanged(n, r);
									g._callAllCallbacks("MCAAMLH", [a]);
									var o = g._getField(k);
									(n.d_blob || n.blob) && (o = n.d_blob, o || (o = n.blob), g._setFieldExpire(k, r), g._setField(k, o)), o || (o = ""), g._callAllCallbacks(k, [o]), !n.error_msg && g._newCustomerIDsHash && g._setField("MCCIDH", g._newCustomerIDsHash)
								}
								if (t === b) {
									var s = g._getField(O);
									s && !g.overwriteCrossDomainMCIDAndAID || (s = g._findVisitorID(n),
										s ? s !== T && g._setFieldExpire(k, -1) : s = T, g._setField(O, s)), s && s !== T || (s = ""), g._callAllCallbacks(O, [s])
								}
								if (g.idSyncDisableSyncs || g.disableIdSyncs) F.idCallNotProcesssed = !0;
								else {
									F.idCallNotProcesssed = !1;
									var l = {};
									l.ibs = n.ibs, l.subdomain = n.subdomain, F.processIDCallData(l)
								}
								if (n === Object(n)) {
									var c, d;
									u() && g.isAllowed() && (c = g._getField("MCOPTOUT"));
									var f = j.parseOptOut(n, c, T);
									c = f.optOut, d = f.d_ottl, g._setFieldExpire("MCOPTOUT", d, !0), g._setField("MCOPTOUT", c), g._callAllCallbacks("MCOPTOUT", [c])
								}
							}, g._loading = null,
							g._getRemoteField = function(e, t, n, i, r) {
								var a, o = "",
									s = w.isFirstPartyAnalyticsVisitorIDCall(e),
									l = {
										MCAAMLH: !0,
										MCAAMB: !0
									};
								if (u() && g.isAllowed()) {
									g._readVisitor(), o = g._getField(e, !0 === l[e]);
									if (function() {
											return (!o || g._fieldsExpired && g._fieldsExpired[e]) && (!g.disableThirdPartyCalls || s)
										}()) {
										if (e === A || "MCOPTOUT" === e ? a = "MC" : "MCAAMLH" === e || e === k ? a = M : e === O && (a = b), a) return !t || null != g._loading && g._loading[a] || (null == g._loading && (g._loading = {}), g._loading[a] = !0, g._loadData(a, t, function(t) {
											if (!g._getField(e)) {
												t &&
													N.setState(a, !0);
												var n = "";
												e === A ? n = g._generateLocalMID() : a === M && (n = {
													error_msg: "timeout"
												}), g._setFields(a, n)
											}
										}, r)), g._registerCallback(e, n), o || (t || g._setFields(a, {
											id: T
										}), "")
									} else o || (e === A ? (g._registerCallback(e, n), o = g._generateLocalMID(), g.setMarketingCloudVisitorID(o)) : e === O ? (g._registerCallback(e, n), o = "", g.setAnalyticsVisitorID(o)) : (o = "", i = !0))
								}
								return e !== A && e !== O || o !== T || (o = "", i = !0), n && i && g._callCallback(n, [o]), o
							}, g._setMarketingCloudFields = function(e) {
								g._readVisitor(), g._setFields("MC", e)
							}, g._mapCustomerIDs =
							function(e) {
								g.getAudienceManagerBlob(e, !0)
							}, g._setAnalyticsFields = function(e) {
								g._readVisitor(), g._setFields(b, e)
							}, g._setAudienceManagerFields = function(e) {
								g._readVisitor(), g._setFields(M, e)
							}, g._getAudienceManagerURLData = function(e) {
								var t = g.audienceManagerServer,
									n = "",
									i = g._getField(A),
									r = g._getField(k, !0),
									a = g._getField(O),
									o = a && a !== T ? "\x26d_cid_ic\x3dAVID%01" + encodeURIComponent(a) : "";
								if (g.loadSSL && g.audienceManagerServerSecure && (t = g.audienceManagerServerSecure), t) {
									var s, l, c = g.getCustomerIDs();
									if (c)
										for (s in c) L(s) &&
											(l = c[s], o += "\x26d_cid_ic\x3d" + encodeURIComponent(s) + "%01" + encodeURIComponent(l.id ? l.id : "") + (l.authState ? "%01" + l.authState : ""));
									e || (e = "_setAudienceManagerFields");
									var u = "http" + (g.loadSSL ? "s" : "") + "://" + t + "/id",
										d = "d_visid_ver\x3d" + g.version + (h && -1 !== u.indexOf("demdex.net") ? "\x26gdpr\x3d1\x26gdpr_force\x3d1\x26gdpr_consent\x3d" + h : "") + "\x26d_rtbd\x3djson\x26d_ver\x3d2" + (!i && g._use1stPartyMarketingCloudServer ? "\x26d_verify\x3d1" : "") + "\x26d_orgid\x3d" + encodeURIComponent(g.marketingCloudOrgID) + "\x26d_nsid\x3d" +
										(g.idSyncContainerID || 0) + (i ? "\x26d_mid\x3d" + encodeURIComponent(i) : "") + (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies ? "\x26d_coppa\x3dtrue" : "") + (!0 === D ? "\x26d_coop_safe\x3d1" : !1 === D ? "\x26d_coop_unsafe\x3d1" : "") + (r ? "\x26d_blob\x3d" + encodeURIComponent(r) : "") + o,
										f = ["s_c_il", g._in, e];
									return n = u + "?" + d + "\x26d_cb\x3ds_c_il%5B" + g._in + "%5D." + e, {
										url: n,
										corsUrl: u + "?" + d,
										callback: f
									}
								}
								return {
									url: n
								}
							}, g.appendVisitorIDsTo = function(e) {
								try {
									var t = [
										[A, g._getField(A)],
										[O, g._getField(O)],
										["MCORGID", g.marketingCloudOrgID]
									];
									return g._addQuerystringParam(e, re.ADOBE_MC, s(t))
								} catch (t) {
									return e
								}
							}, g.appendSupplementalDataIDTo = function(e, t) {
								if (!(t = t || g.getSupplementalDataID(w.generateRandomString(), !0))) return e;
								try {
									var n = s([
										["SDID", t],
										["MCORGID", g.marketingCloudOrgID]
									]);
									return g._addQuerystringParam(e, re.ADOBE_MC_SDID, n)
								} catch (t) {
									return e
								}
							};
						var w = {
							parseHash: function(e) {
								var t = e.indexOf("#");
								return t > 0 ? e.substr(t) : ""
							},
							hashlessUrl: function(e) {
								var t = e.indexOf("#");
								return t > 0 ? e.substr(0, t) : e
							},
							addQueryParamAtLocation: function(e,
								t, n) {
								var i = e.split("\x26");
								return n = null != n ? n : i.length, i.splice(n, 0, t), i.join("\x26")
							},
							isFirstPartyAnalyticsVisitorIDCall: function(e, t, n) {
								if (e !== O) return !1;
								var i;
								return t || (t = g.trackingServer), n || (n = g.trackingServerSecure), !("string" != typeof(i = g.loadSSL ? n : t) || !i.length) && (i.indexOf("2o7.net") < 0 && i.indexOf("omtrdc.net") < 0)
							},
							isObject: function(e) {
								return Boolean(e && e === Object(e))
							},
							removeCookie: function(e) {
								Q.remove(e, {
									domain: g.cookieDomain
								})
							},
							isTrackingServerPopulated: function() {
								return !!g.trackingServer ||
									!!g.trackingServerSecure
							},
							getTimestampInSeconds: function() {
								return Math.round((new Date).getTime() / 1E3)
							},
							parsePipeDelimetedKeyValues: function(e) {
								return e.split("|").reduce(function(e, t) {
									var n = t.split("\x3d");
									return e[n[0]] = decodeURIComponent(n[1]), e
								}, {})
							},
							generateRandomString: function(e) {
								e = e || 5;
								for (var t = "", n = "abcdefghijklmnopqrstuvwxyz0123456789"; e--;) t += n[Math.floor(Math.random() * n.length)];
								return t
							},
							normalizeBoolean: function(e) {
								return "true" === e || "false" !== e && e
							},
							parseBoolean: function(e) {
								return "true" ===
									e || "false" !== e && null
							},
							replaceMethodsWithFunction: function(e, t) {
								for (var n in e) e.hasOwnProperty(n) && "function" == typeof e[n] && (e[n] = t);
								return e
							}
						};
						g._helpers = w;
						var F = ae(g, S);
						g._destinationPublishing = F, g.timeoutMetricsLog = [];
						var N = {
							isClientSideMarketingCloudVisitorID: null,
							MCIDCallTimedOut: null,
							AnalyticsIDCallTimedOut: null,
							AAMIDCallTimedOut: null,
							fieldGroupObj: {},
							setState: function(e, t) {
								switch (e) {
									case "MC":
										!1 === t ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1) : this.MCIDCallTimedOut = t;
										break;
									case b:
										!1 ===
											t ? !0 !== this.AnalyticsIDCallTimedOut && (this.AnalyticsIDCallTimedOut = !1) : this.AnalyticsIDCallTimedOut = t;
										break;
									case M:
										!1 === t ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1) : this.AAMIDCallTimedOut = t
								}
							}
						};
						g.isClientSideMarketingCloudVisitorID = function() {
								return N.isClientSideMarketingCloudVisitorID
							}, g.MCIDCallTimedOut = function() {
								return N.MCIDCallTimedOut
							}, g.AnalyticsIDCallTimedOut = function() {
								return N.AnalyticsIDCallTimedOut
							}, g.AAMIDCallTimedOut = function() {
								return N.AAMIDCallTimedOut
							}, g.idSyncGetOnPageSyncInfo =
							function() {
								return g._readVisitor(), g._getField("MCSYNCSOP")
							}, g.idSyncByURL = function(e) {
								if (!g.isOptedOut()) {
									var t = l(e || {});
									if (t.error) return t.error;
									var n, i, r = e.url,
										a = encodeURIComponent,
										o = F;
									return r = r.replace(/^https:/, "").replace(/^http:/, ""), n = j.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ","), i = ["ibs", a(e.dpid), "img", a(r), t.ttl, "", n], o.addMessage(i.join("|")), o.requestToProcess(), "Successfully queued"
								}
							}, g.idSyncByDataSource = function(e) {
								if (!g.isOptedOut()) return e === Object(e) && "string" == typeof e.dpuuid &&
									e.dpuuid.length ? (e.url = "//dpm.demdex.net/ibs:dpid\x3d" + e.dpid + "\x26dpuuid\x3d" + e.dpuuid, g.idSyncByURL(e)) : "Error: config or config.dpuuid is empty"
							}, He(g, F), g._getCookieVersion = function(e) {
								e = e || g.cookieRead(g.cookieName);
								var t = re.VERSION_REGEX.exec(e);
								return t && t.length > 1 ? t[1] : null
							}, g._resetAmcvCookie = function(e) {
								var t = g._getCookieVersion();
								t && !Z.isLessThan(t, e) || w.removeCookie(g.cookieName)
							}, g.setAsCoopSafe = function() {
								D = !0
							}, g.setAsCoopUnsafe = function() {
								D = !1
							},
							function() {
								if (g.configs = Object.create(null),
									w.isObject(n))
									for (var e in n) L(e) && (g[e] = n[e], g.configs[e] = n[e])
							}(),
							function() {
								[
									["getMarketingCloudVisitorID"],
									["setCustomerIDs", void 0],
									["getAnalyticsVisitorID"],
									["getAudienceManagerLocationHint"],
									["getLocationHint"],
									["getAudienceManagerBlob"]
								].forEach(function(e) {
									var t = e[0],
										n = 2 === e.length ? e[1] : "",
										i = g[t];
									g[t] = function(e) {
										return u() && g.isAllowed() ? i.apply(g, arguments) : ("function" == typeof e && g._callCallback(e, [n]), n)
									}
								})
							}(), g.init = function() {
								if (c()) return m.optIn.fetchPermissions(f, !0);
								! function() {
									if (w.isObject(n)) {
										g.idSyncContainerID =
											g.idSyncContainerID || 0, D = "boolean" == typeof g.isCoopSafe ? g.isCoopSafe : w.parseBoolean(g.isCoopSafe), g.resetBeforeVersion && g._resetAmcvCookie(g.resetBeforeVersion), g._attemptToPopulateIdsFromUrl(), g._attemptToPopulateSdidFromUrl(), g._readVisitor();
										var e = g._getField(y),
											t = Math.ceil((new Date).getTime() / re.MILLIS_PER_DAY);
										g.idSyncDisableSyncs || g.disableIdSyncs || !F.canMakeSyncIDCall(e, t) || (g._setFieldExpire(k, -1), g._setField(y, t)), g.getMarketingCloudVisitorID(), g.getAudienceManagerLocationHint(), g.getAudienceManagerBlob(),
											g._mergeServerState(g.serverState)
									} else g._attemptToPopulateIdsFromUrl(), g._attemptToPopulateSdidFromUrl()
								}(),
								function() {
									if (!g.idSyncDisableSyncs && !g.disableIdSyncs) {
										F.checkDPIframeSrc();
										var e = function() {
											var e = F;
											e.readyToAttachIframe() && e.attachIframe()
										};
										v.addEventListener("load", function() {
											S.windowLoaded = !0, e()
										});
										try {
											te.receiveMessage(function(e) {
												F.receiveMessage(e.data)
											}, F.iframeHost)
										} catch (e) {}
									}
								}(),
								function() {
									g.whitelistIframeDomains && re.POST_MESSAGE_ENABLED && (g.whitelistIframeDomains = g.whitelistIframeDomains instanceof Array ? g.whitelistIframeDomains : [g.whitelistIframeDomains], g.whitelistIframeDomains.forEach(function(e) {
										var n = new B(t, e),
											i = K(g, n);
										te.receiveMessage(i, e)
									}))
								}()
							}
					};
					qe.config = se, _.Visitor = qe;
					var Xe = qe,
						We = function(e) {
							if (j.isObject(e)) return Object.keys(e).filter(function(t) {
								return "" !== e[t]
							}).reduce(function(t, n) {
								var i = "doesOptInApply" !== n ? e[n] : se.normalizeConfig(e[n]),
									r = j.normalizeBoolean(i);
								return t[n] = r, t
							}, Object.create(null))
						},
						Je = Ve.OptIn,
						Ke = Ve.IabPlugin;
					return Xe.getInstance = function(e, t) {
							if (!e) throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");
							e.indexOf("@") < 0 && (e += "@AdobeOrg");
							var n = function() {
								var t = _.s_c_il;
								if (t)
									for (var n = 0; n < t.length; n++) {
										var i = t[n];
										if (i && "Visitor" === i._c && i.marketingCloudOrgID === e) return i
									}
							}();
							if (n) return n;
							var i = We(t);
							! function(e) {
								_.adobe.optIn = _.adobe.optIn || function() {
									var t = j.pluck(e, ["doesOptInApply", "previousPermissions", "preOptInApprovals", "isOptInStorageEnabled", "optInStorageExpiry", "isIabContext"]),
										n = e.optInCookieDomain || e.cookieDomain;
									n = n || $(), n = n === window.location.hostname ? "" : n, t.optInCookieDomain = n;
									var i =
										new Je(t, {
											cookies: Q
										});
									if (t.isIabContext) {
										var r = new Ke(window.__cmp);
										i.registerPlugin(r)
									}
									return i
								}()
							}(i || {});
							var r = e,
								a = r.split("").reverse().join(""),
								o = new Xe(e, null, a);
							j.isObject(i) && i.cookieDomain && (o.cookieDomain = i.cookieDomain),
								function() {
									_.s_c_il.splice(--_.s_c_in, 1)
								}();
							var s = j.getIeVersion();
							if ("number" == typeof s && s < 10) return o._helpers.replaceMethodsWithFunction(o, function() {});
							var l = function() {
								try {
									return _.self !== _.parent
								} catch (e) {
									return !0
								}
							}() && ! function(e) {
								return e.cookieWrite("TEST_AMCV_COOKIE",
									"T", 1), "T" === e.cookieRead("TEST_AMCV_COOKIE") && (e._helpers.removeCookie("TEST_AMCV_COOKIE"), !0)
							}(o) && _.parent ? new Y(e, i, o, _.parent) : new Xe(e, i, a);
							return o = null, l.init(), l
						},
						function() {
							function e() {
								Xe.windowLoaded = !0
							}
							_.addEventListener ? _.addEventListener("load", e) : _.attachEvent && _.attachEvent("onload", e), Xe.codeLoadEnd = (new Date).getTime()
						}(), Xe
				}();
				window.s_dell_TLD = location.hostname.match(/dell\.com\.\S{2}$/g);
				s_dell_TLD = s_dell_TLD ? s_dell_TLD[0] : "";
				if (s_dell_TLD) var config = {
					trackingServer: "nsm.dell.com",
					trackingServerSecure: "sm.dell.com",
					marketingCloudServer: "nsm.dell.com",
					marketingCloudServerSecure: "sm.dell.com",
					loadTimeout: 4E3,
					disableThirdPartyCalls: true,
					cookieDomain: s_dell_TLD
				};
				else var config = {
					trackingServer: "nsm.dell.com",
					trackingServerSecure: "sm.dell.com",
					marketingCloudServer: "nsm.dell.com",
					marketingCloudServerSecure: "sm.dell.com",
					disableThirdPartyCalls: true,
					loadTimeout: 4E3
				};
				var visitor = Visitor.getInstance("4DD80861515CAB990A490D45@AdobeOrg", config);
				return true
			}(window);
			adbFun.getGlassboxSessionReplayLink =
				function() {
					try {
						var currentTime = new Date;
						t = s_dell.c_r("_cls_s");
						if (t !== "") {
							e = "glassbox.dell.com";
							if (adb.publishPath.indexOf("dev") > -1 || adb.publishPath.indexOf("Dev") > -1) e = "glassbox-dev.dell.com";
							var r = currentTime.getTime() - 792E5,
								i = currentTime.getTime() + 792E5;
							return "https://" + e + "/webinterface/webui/#/sessions/GlassboxCookie:" + t + "/replay?from\x3d" + r + "\x26till\x3d" + i
						} else return "NA"
					} catch (e) {
						adbFun.gbLoggingFun("error", e.toString(), "getGlassboxSessionReplayLink")
					}
				};
			adbFun.appendVisitorIDsTo = function() {
				adb.localDomains.forEach(function(domain) {
					var domainRegex =
						RegExp(domain);
					if (!domainRegex.test(location.hostname)) {
						hrefSelector = '[href*\x3d"' + domain + '"]';
						document.querySelectorAll(hrefSelector).forEach(function(href) {
							if (href.hasAttribute && !href.hasAttribute("ADB_VisitorID_Appended")) href.addEventListener("mousedown", function(event) {
								var destinationURLWithVisitorIDs = s_dell.visitor.appendVisitorIDsTo(event.currentTarget.href);
								event.currentTarget.href = destinationURLWithVisitorIDs.replace(/MCAID%3D.*%7CMCORGID/, "MCAID%3D%7CMCORGID");
								href.setAttribute("ADB_VisitorID_Appended",
									"true")
							})
						})
					}
				});
				if (adb.appendVisitorIDsCounter < 2) {
					adb.appendVisitorIDsCounter++;
					setTimeout(adbFun.appendVisitorIDsTo, 500)
				}
			};
			adbFun.processDataMetrics = function(metrics, targetElement, initiator) {
				isEqual = JSON.stringify(metrics) === JSON.stringify(adb.previousDataMetrics);
				if (isEqual) {
					setTimeout(function() {
						adb.previousDataMetrics = {}
					}, 100);
					return isEqual
				}
				btnName = typeof metrics.btnname !== "undefined" ? metrics.btnname : "dellmetrics";
				prod = typeof metrics.prod !== "undefined" ? metrics.prod : "";
				qty = typeof metrics.qty !==
					"undefined" ? metrics.qty : "";
				price = typeof metrics.price !== "undefined" ? metrics.price : "";
				discount = typeof metrics.discount !== "undefined" ? metrics.discount : "";
				if (adb.publishPath === "dev" || adb.publishPath === "prod") try {
					idp_id = typeof metrics.idp_id !== "undefined" ? metrics.idp_id : "";
					if (idp_id) s_dell.eVar166 = idp_id;
					configbtn = typeof metrics.configBtn !== "undefined" ? metrics.configBtn : "";
					systemchatorcall = typeof metrics.SystemChatorcall !== "undefined" ? metrics.SystemChatorcall : "";
					readystock = typeof metrics.readystock !==
						"undefined" ? metrics.readystock : "";
					if (readystock && readystock.toLowerCase() === "true") s_dell.events = s_dell.apl(s_dell.events, "event175", ",", 2);
					if (btnName.indexOf("addtocart") !== -1) s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
					if (configbtn !== "") btnName = configbtn;
					if (systemchatorcall !== "") btnName = systemchatorcall;
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					if (prod && s_dell.linkName !== "scaddallitems")
						if (qty !== "") s_dell.products = ";" + prod + ";" + qty + ";" + price + ";event28\x3d" + discount;
						else s_dell.products =
							";" + prod;
					window.linkTracking("scAdd,event175", "eVar68,eVar166,products", "prop12,prop13,prop14,prop29,prop47,prop49,prop74,prop69,prop75", btnName, true, "o", initiator)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "stpfooterdev" || adb.publishPath === "stpfooter") try {
					if (s_dell.getscMap("cms") === "qtoonline" || s_dell.getscMap("module") === "converged_quote_management" || s_dell.getscMap("cms") === "olr") {
						var equotestart = typeof metrics !== "undefined" ?
							metrics.equotestart : "";
						var equotesaved = typeof metrics !== "undefined" ? metrics.equotesaved : "";
						var equotenumber = typeof metrics !== "undefined" ? metrics.equotenumber : "";
						var premier_accessgroupid = typeof metrics !== "undefined" ? metrics.premier_accessgroupid : "";
						var cdsitemname = typeof metrics !== "undefined" ? metrics.cdsitemname : "";
						var requisitionsubmitted = typeof metrics !== "undefined" ? metrics.requisitionsubmitted : "";
						var currencycode = typeof metrics !== "undefined" ? metrics.currencycode : "";
						if (requisitionsubmitted === true) {
							s_dell.events =
								s_dell.apl(s_dell.events, "event74", ",", 2);
							s_dell.events = s_dell.apl(s_dell.events, "event75", ",", 2);
							s_dell.events = s_dell.apl(s_dell.events, "event76", ",", 2);
							s_dell.currencyCode = currencycode;
							var prcompare = prod;
							for (var i = 0; i < prcompare.length; i++)
								if (i === 0) s_dell.products = ";" + prcompare[i].id + ";;;" + "event75\x3d" + prcompare[i].quantity + "|event76\x3d" + prcompare[i].price;
								else s_dell.products = s_dell.products + "," + ";" + prcompare[i].id + ";;;" + "event75\x3d" + prcompare[i].quantity + "|event76\x3d" + prcompare[i].price
						}
						if (btnName ===
							"saveequote") {
							s_dell.events = s_dell.apl(s_dell.events, "event79", ",", 2);
							s_dell.events = s_dell.apl(s_dell.events, "event80", ",", 2);
							var prcompare = prod;
							if (prod)
								for (var i = 0; i < prcompare.length; i++)
									if (i === 0) s_dell.products = ";" + prcompare[i].id + ";;;" + "event79\x3d" + prcompare[i].quantity + "|event80\x3d" + prcompare[i].price;
									else s_dell.products = s_dell.products + "," + ";" + prcompare[i].id + ";;;" + "event79\x3d" + prcompare[i].quantity + "|event80\x3d" + prcompare[i].price
						}
						if (cdsitemname) s_dell.eVar164 = cdsitemname;
						if (equotestart ===
							true) s_dell.events = s_dell.apl(s_dell.events, "event78", ",", 2);
						if (equotesaved === true) s_dell.events = s_dell.apl(s_dell.events, "event77", ",", 2);
						if (equotenumber) s_dell.eVar7 = equotenumber;
						if (premier_accessgroupid) s_dell.eVar133 = premier_accessgroupid;
						if (btnName)
							if (s_dell.pageName) s_dell.prop13 = s_dell.pageName + "|" + btnName;
						if (btnName.indexOf("saveequote|success") !== -1) s_dell.events = s_dell.apl(s_dell.events, "event77", ",", 2)
					}
					totalrewardapplied = typeof metrics.totalrewardapplied !== "undefined" ? metrics.totalrewardapplied :
						"";
					itemlevel = typeof metrics.itemlevel !== "undefined" ? metrics.itemlevel : "";
					deliverychng = typeof metrics.deliverychng !== "undefined" ? metrics.deliverychng : "";
					deliverychgtype = typeof metrics.deliverychgtype !== "undefined" ? metrics.deliverychgtype : "";
					POstart = typeof metrics.postart !== "undefined" ? metrics.postart : "";
					PObox = typeof metrics.pobox !== "undefined" ? metrics.pobox : "";
					CouponCode = typeof metrics.couponcode !== "undefined" ? metrics.couponcode : "";
					vcsessionid = typeof metrics.sessionid !== "undefined" ? metrics.sessionid :
						"";
					vcref = typeof metrics.ref !== "undefined" ? metrics.ref : "";
					vcvirualchatlaunch = typeof metrics.virualchatlaunch !== "undefined" ? metrics.virualchatlaunch : "";
					expressinitiate = typeof metrics.expressstart !== "undefined" ? metrics.expressstart : "";
					prodid = typeof metrics.prodid !== "undefined" ? metrics.prodid : "";
					appcode = typeof metrics.appcode !== "undefined" ? metrics.appcode : "";
					position = typeof metrics.position !== "undefined" ? metrics.position : "";
					productid = typeof metrics.productid !== "undefined" ? metrics.productid : "";
					modopt =
						typeof metrics.modopt !== "undefined" ? metrics.modopt : "";
					upsellmodule = typeof metrics.upsellmodule !== "undefined" ? metrics.upsellmodule : "";
					upsellmodulename = typeof metrics.upsellmodulename !== "undefined" ? metrics.upsellmodulename : "";
					upsellprice = typeof metrics.upsellprice !== "undefined" ? metrics.upsellprice : "";
					upselloption = typeof metrics.upselloption !== "undefined" ? metrics.upselloption : "";
					stockstatus = typeof metrics.stockstatus !== "undefined" ? metrics.stockstatus : "";
					licensesqty = typeof metrics.licensesqty !== "undefined" ?
						metrics.licensesqty : "";
					subsrevenue = typeof metrics.subsrevenue !== "undefined" ? metrics.subsrevenue : "";
					subsoffer = typeof metrics.subsoffer !== "undefined" ? metrics.subsoffer : "";
					variant = typeof metrics.variant !== "undefined" ? metrics.variant : "";
					dpid = typeof metrics.dpid !== "undefined" ? metrics.dpid : "";
					workflow = typeof metrics.workflow !== "undefined" ? metrics.workflow : "";
					isshared = typeof metrics.isshared !== "undefined" ? metrics.isshared : "";
					multiship = typeof metrics.multiship !== "undefined" ? metrics.multiship : "";
					multishipflag =
						typeof metrics.multishipflag !== "undefined" ? metrics.multishipflag : "";
					multishipgroupno = typeof metrics.multishipgroupno !== "undefined" ? metrics.multishipgroupno : "";
					if (multiship) s_dell.events = s_dell.apl(s_dell.events, "event216", ",", 2);
					if (multishipflag || multishipgroupno) s_dell.eVar190 = multishipgroupno + " | " + multishipflag;
					if (workflow) s_dell.eVar91 = workflow;
					if (dpid) s_dell.eVar12 = dpid;
					if (subsoffer) s_dell.eVar187 = subsoffer;
					if (licensesqty) s_dell.events = s_dell.apl(s_dell.events, "event224\x3d" + licensesqty, ",",
						2);
					if (subsrevenue) s_dell.events = s_dell.apl(s_dell.events, "event225\x3d" + subsrevenue, ",", 2);
					if (isshared === "true") s_dell.events = s_dell.apl(s_dell.events, "event226", ",", 2);
					if (variant) s_dell.eVar101 = variant;
					if (productid) s_dell.eVar102 = productid;
					if (modopt) s_dell.eVar88 = modopt;
					if (upsellmodule) s_dell.eVar86 = upsellmodule + "|" + upselloption + "|" + upsellprice;
					if (upsellmodulename) s_dell.eVar89 = upsellmodulename;
					if (position) s_dell.eVar17 = position;
					if (productid) s_dell.products = ";" + productid;
					if (prodid) s_dell.products =
						";" + prodid;
					if (Dell.Metrics.sc.module) {
						anavcaption = typeof metrics.anav_caption !== "undefined" ? metrics.anav_caption : "";
						anavcaptionoption = typeof metrics.anav_caption_option !== "undefined" ? metrics.anav_caption_option : "";
						if (anavcaption) {
							checked = false;
							if (typeof targetElement !== "undefined" && typeof targetElement !== "string" && typeof targetElement.checked !== "undefined") checked = targetElement.checked;
							if (checked) {
								s_dell.eVar31 = metrics.anav_caption;
								s_dell.eVar30 = s_dell.eVar31 + ":" + metrics.anav_caption_option;
								s_dell.eVar40 =
									"anav";
								if (btnName === "dellmetrics") btnName = "anav";
								s_dell.prop13 = s_dell.prop13 + "|" + "anav"
							} else return
						}
					}
					if (expressinitiate === "true") s_dell.events = s_dell.apl(s_dell.events, "event136", ",", 2);
					if (totalrewardapplied === "true") s_dell.events = s_dell.apl(s_dell.events, "event114", ",", 2);
					else s_dell.events = s_dell.repl(s_dell.events, ",event114", "", 2);
					if (stockstatus) s_dell.eVar162 = stockstatus;
					s_dell.eVar140 = s_dell.getscMap("module");
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					if (s_dell.getscMap("cms") !== "qtoonline" &&
						s_dell.getscMap("module") !== "converged_quote_management" && s_dell.getscMap("cms") !== "olr")
						if (prod && s_dell.linkName !== "scaddallitems") {
							s_dell.products = ";" + prod + ";" + qty + ";" + price;
							if (discount) s_dell.products = s_dell.products + ";event28\x3d" + discount;
							if (btnName.indexOf("addtocart") >= 0) {
								s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
								qtydropdown = document.getElementById("snp-pd-quantity-dropdown");
								if (document.getElementById("#snp-pd-quantity-dropdown").val() !== null && Dell.Metrics.sc.qtydropdown) s_dell.prop13 =
									s_dell.prop13 + "[qtychanged]"
							}
						} else if (btnName.indexOf("addtocart") >= 0) s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
					if (typeof Dell.Metrics.sc.orderdeliveryoptions !== "undefined" && Dell.Metrics.sc.orderdeliveryoptions) s_dell.events = s_dell.apl(s_dell.events, "event111\x3d" + Dell.Metrics.sc.orderdeliveryoptions, ",", 2);
					if (itemlevel === "true") s_dell.events = s_dell.apl(s_dell.events, "event112", ",", 2);
					if (deliverychng === "true") s_dell.events = s_dell.apl(s_dell.events, "event113", ",", 2);
					if (deliverychgtype !==
						"") s_dell.eVar92 = deliverychgtype;
					if (POstart === "true") s_dell.events = s_dell.apl(s_dell.events, "event117", ",", 2);
					if (PObox === "true") s_dell.events = s_dell.apl(s_dell.events, "event124", ",", 2);
					if (btnName === "removefromcart") {
						s_dell.events = s_dell.apl(s_dell.events, "scRemove", ",", 2);
						if (prod !== "") s_dell.products = ";" + prod
					}
					if (btnName === "undo-remove")
						if (prod !== "") s_dell.products = ";" + prod;
					var ele = document.querySelectorAll(".delivery-option input[value\x3d'chooseforeachitem'][type\x3d'radio']:checked");
					if (ele[0]) s_dell.prop13 =
						s_dell.prop13 + "[" + ele.val() + "]";
					if (CouponCode !== "") s_dell.eVar96 = metrics.couponcode;
					if (vcsessionid !== "") s_dell.eVar97 = metrics.sessionid;
					if (vcvirualchatlaunch === "true") s_dell.events = s_dell.apl(s_dell.events, "event123", ",", 2);
					else s_dell.events = s_dell.repl(s_dell.events, ",event123", "", 2);
					if (vcref !== "") s_dell.eVar8 = metrics.ref;
					if (appcode) s_dell.prop20 = appcode;
					if (typeof metrics.clickthru === "undefined" || metrics.clickthru === "")
						if (metrics.hasOwnProperty("browsemod") === false) window.linkTracking("scAdd,scRemove,event74,event75,event76,event77,event78,event79,event80,event111,event112,event113,event114,event117,event123,event124,event136,event216,event224,event225,event226",
							"eVar7,eVar8,eVar12,eVar17,eVar30,eVar31,eVar40,eVar68,eVar85,eVar86,eVar88,eVar89,eVar91,eVar92,eVar96,eVar97,eVar101,eVar102,eVar133,eVar140,eVar144,eVar162,eVar164,eVar187,eVar190,products", "prop12,prop13,prop14,prop20,prop29,prop40,prop47,prop49,prop69,prop74,prop75", btnName, true, "o", initiator)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "internalDev" || adb.publishPath === "internal") try {
					var xdmData = metrics;
					xdmData = Object.assign(xdmData,
						Dell.Metrics.sc);
					alloy("sendEvent", {
						"xdm": {
							"_dell": xdmData,
							"web": {
								"webInteraction": {
									"linkClicks": {
										"value": 1
									},
									"type": "other",
									"name": btnName
								}
							}
						}
					}).then(function() {
						console.log("success event")
					})
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "externalDev" || adb.publishPath === "external") try {
					appCode = typeof metrics.appcode !== "undefined" ? metrics.appcode : "";
					clickthrutype = typeof metrics.clickthru !== "undefined" ? metrics.clickthru : "";
					doctype = typeof metrics.doctype !==
						"undefined" ? metrics.doctype : "";
					position = typeof metrics.position !== "undefined" ? metrics.position : "";
					sitesearchdocid = typeof metrics.productId !== "undefined" ? metrics.productId : "";
					pagenum = typeof metrics.pagenum !== "undefined" ? metrics.pagenum : "";
					Cms = typeof metrics.cms !== "undefined" ? metrics.cms : "";
					checkoutstart = typeof metrics.checkoutstart !== "undefined" ? metrics.checkoutstart : "";
					if (clickthrutype === "true") {
						s_dell.eVar21 = clickthrutype;
						s_dell.eVar19 = doctype;
						s_dell.eVar17 = position;
						s_dell.eVar18 = sitesearchdocid;
						s_dell.prop29 = Cms;
						s_dell.prop40 = pagenum;
						if (appCode === "111.700.300.900") s_dell.events = s_dell.apl(s_dell.events, "event20", ",", 2);
						if (btnName === "dellmetrics") btnName = "sitesearchclickthrough";
						if (btnName === "addtocart") s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2)
					}
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					s_dell.prop20 = appCode;
					if (checkoutstart === "true") {
						s_dell.events = s_dell.apl(s_dell.events, "scCheckout", ",", 2);
						s_dell.events = s_dell.apl(s_dell.events, "event158", ",", 2)
					}
					window.linkTracking("scAdd,scCheckout,event20,event22,event158",
						"eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar36,eVar63,eVar64,eVar65,eVar68,eVar71,products", "prop7,prop12,prop13,prop14,prop17,prop18,prop19,prop20,prop29,prop40,prop47,prop49,prop74,prop69.prop75", btnName, true, "o", initiator)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "unifiedpurchasedev" || adb.publishPath === "unifiedpurchase") try {
					var xdmData;
					var prodval;
					prodval = "";
					if (metrics.btnname !== "undefined")
						if (typeof metrics !== "undefined") {
							Dell.Metrics.sc.linktracktype =
								"other";
							if (metrics.productid) prodval = metrics.productid;
							updateformatproducts();
							checkconsent();
							xdmData = linktrackcallvalues(Dell.Metrics.sc, ["country", "language", "segment", "customerset", "cms", "pagename", "mcmid", "myaccount", "lwp", "consentval", "prodformatval", "linktracktype", "activitypagename", "activitylinkname", "activityregionname", "urlval", "consentusrint", "module", "d_vi"]);
							xdmData = Object.assign(xdmData, metrics);
							const dellDataString = JSON.stringify(xdmData);
							let parserval = function(key, val) {
								var val1 = typeof val !==
									"object" && val !== null ? String(val) : val;
								return val1
							};
							var dellData = JSON.parse(dellDataString, parserval);
							s_dell.contextData = dellData;
							if (Dell.Metrics.sc.pagename.indexOf("ecomm|shipping-payments|index") > -1 || Dell.Metrics.sc.pagename.indexOf("ecomm|contents|index|cart") > -1 || Dell.Metrics.sc.pagename.indexOf("ecomm|review|index") > -1)
								if (metrics.btnname)
									if (metrics.btnname.indexOf("addtocart") > -1 || metrics.btnname.indexOf("removecartitem") > -1 || metrics.btnname.indexOf("qtyupdateicon") > -1 || metrics.btnname.indexOf("viewspecs") >
										-1) s_dell.products = ";" + prodval;
									else s_dell.products = Dell.Metrics.sc.prodformatval;
							if (metrics.btnname.indexOf("recom-widget-addtocart") > -1 || metrics.btnname.indexOf("recomm_widget_addtocart") > -1) s_dell.products = ";" + xdmData.prodid;
							s_dell.pageName = Dell.Metrics.sc.pagename;
							adbFun.captureCommonPageEvents();
							s_dell.tl(this, "o", metrics.btnname);
							console.log("success event");
							try {
								s_dell.registerPostTrackCallback(function() {
									s_dell.contextData = "";
									s_dell.pageName = "";
									s_dell.clearVars();
									if (typeof Dell.Metrics.sc.linktracktype !==
										"undefined") delete Dell.Metrics.sc.linktracktype
								})
							} catch (err) {
								console.log("error: " + err)
							}
						}
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "PremierDev" || adb.publishPath === "Premier") try {
					btnName = typeof metrics.btnname !== "undefined" ? metrics.btnname : "dellmetrics";
					tabName = typeof metrics.tabname !== "undefined" ? metrics.tabname : "dellmetrics";
					prod = typeof metrics.products !== "undefined" ? metrics.products : "";
					Product = typeof metrics.product !== "undefined" ?
						metrics.product : "";
					Remove = typeof metrics.remove !== "undefined" ? metrics.remove : "";
					qty = typeof metrics.qty !== "undefined" ? metrics.qty : "";
					price = typeof metrics.price !== "undefined" ? metrics.price : "";
					cartupsell = typeof metrics.cartupsell !== "undefined" ? metrics.cartupsell : "";
					recom = typeof metrics.recom !== "undefined" ? metrics.recom : "";
					requisitionsubmitted = typeof metrics.requisitionsubmitted !== "undefined" ? metrics.requisitionsubmitted : "";
					currencycode = typeof metrics.currencycode !== "undefined" ? metrics.currencycode : "";
					equote = typeof metrics.equote !== "undefined" ? metrics.equote : "";
					equotenumber = typeof metrics.equotenumber !== "undefined" ? metrics.equotenumber : "";
					ref = typeof metrics.ref !== "undefined" ? metrics.ref : "";
					workflow = typeof metrics.workflow !== "undefined" ? metrics.workflow : "";
					offlinequote = typeof metrics.offlinequote !== "undefined" ? metrics.offlinequote : "";
					Prodposition = typeof metrics.position !== "undefined" ? metrics.position : "";
					smartSelect = typeof metrics.smartselect !== "undefined" ? metrics.smartselect : "";
					deliverychgtype =
						typeof metrics.deliverychgtype !== "undefined" ? metrics.deliverychgtype : "";
					selectionoption = typeof metrics.selectionoption !== "undefined" ? metrics.selectionoption : "";
					svctag = typeof metrics.svctag !== "undefined" ? metrics.svctag : "";
					partnum = typeof metrics.partnum !== "undefined" ? metrics.partnum : "";
					errmessage = typeof metrics.messagetext !== "undefined" ? metrics.messagetext : "";
					s_dell.eVar14 = s_dell.getscMap("mabdflag");
					if (Dell.Metrics.sc.mabdflag === "MABDdatechanged") s_dell.events = s_dell.apl(s_dell.events, "event215", ",",
						2);
					if (errmessage) s_dell.eVar146 = errmessage;
					if (workflow) s_dell.eVar91 = workflow;
					if (equotenumber) s_dell.eVar7 = equotenumber;
					if (ref) s_dell.eVar8 = ref;
					if (selectionoption !== "") s_dell.eVar126 = selectionoption;
					if (smartSelect === "true") s_dell.events = s_dell.apl(s_dell.events, "event127", ",", 2);
					if (requisitionsubmitted === "true") {
						s_dell.events = s_dell.apl(s_dell.events, "event74", ",", 2);
						s_dell.events = s_dell.apl(s_dell.events, "event75", ",", 2);
						s_dell.events = s_dell.apl(s_dell.events, "event76", ",", 2);
						s_dell.currencyCode =
							metrics.currencycode;
						var prcompare = Dell.Metrics.sc.products;
						for (var i = 0; i < prcompare.length; i++)
							if (i === 0) s_dell.products = ";" + prcompare[i].id + ";;;" + "event75\x3d" + prcompare[i].quantity + "|event76\x3d" + prcompare[i].price;
							else s_dell.products = s_dell.products + "," + ";" + prcompare[i].id + ";;;" + "event75\x3d" + prcompare[i].quantity + "|event76\x3d" + prcompare[i].price
					}
					if (btnName.toLowerCase().indexOf("applycoupon|") >= 0) {
						couponval = btnName.toLowerCase().split("applycoupon|");
						if (couponval.length > 1) {
							s_dell.eVar96 = couponval[1];
							btnName = "applycoupon"
						}
					}
					if (Remove === "true") {
						s_dell.events = s_dell.apl(s_dell.events, "scRemove", ",", 2);
						s_dell.products = ";" + Product
					}
					if (prod !== "") s_dell.products = ";" + prod + ";" + qty + ";" + price;
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					if (tabName !== "dellmetrics" && typeof tabName !== "undefined") s_dell.prop13 = s_dell.pageName + "|" + "[tab\x3d" + tabName + "]";
					if (Prodposition !== "undefined") s_dell.prop13 = s_dell.prop13 + "|" + Prodposition;
					if (cartupsell !== "") s_dell.eVar104 = cartupsell;
					if (recom !== "") s_dell.eVar104 = recom;
					if (equote !==
						"") s_dell.eVar7 = equote;
					if (offlinequote === "true") s_dell.events = s_dell.apl(s_dell.events, "event126", ",", 2);
					if (Dell.Metrics.sc.intelupsell)
						if (s_dell.inList("event188", s_dell.events, ","));
						else s_dell.events = s_dell.apl(s_dell.events, "event188,", ",", 2);
					if (btnName !== "dellmetrics") {
						if (btnName === "anav") {
							if (metrics.caption !== "undefined") s_dell.eVar31 = metrics.caption;
							if (metrics.captionoption !== "undefined") s_dell.eVar30 = metrics.captionoption;
							s_dell.eVar40 = "anav"
						}
						if (btnName === "addtocart") {
							s_dell.events = s_dell.apl(s_dell.events,
								"scAdd", ",", 2);
							if (qty !== "") s_dell.products = ";" + prod + ";" + qty + ";" + price;
							else s_dell.products = ";" + metrics.products
						}
						if (btnName === "addtolist") s_dell.products = ";" + metrics.products;
						if (btnName == "expresschkoutstart") s_dell.events = s_dell.apl(s_dell.events, "event61", ",", 2)
					}
					if (svctag !== "") s_dell.prop13 = s_dell.prop13 + "|" + svctag;
					if (partnum !== "") s_dell.prop13 = s_dell.prop13 + "|" + partnum;
					if (deliverychgtype !== "") {
						deliverychgtype = deliverychgtype.split("|");
						var prod;
						var prodtype;
						var deliverymeth;
						for (var i = 0; i < deliverychgtype.length; i++) {
							x =
								deliverychgtype[i];
							eachdelitem = x.split(":");
							for (var m = 0; m < eachdelitem.length; m++)
								if (i === 0)
									if (m === 0) prod = ";" + eachdelitem[m];
									else if (m === 1) prodtype = eachdelitem[m];
							else {
								if (m === 2) deliverymeth = eachdelitem[m]
							} else if (m === 0) prod = prod + ",;" + eachdelitem[m];
							else if (m === 1) prodtype = prodtype + "|" + eachdelitem[m];
							else if (m === 2) deliverymeth = deliverymeth + "|" + eachdelitem[m]
						}
						s_dell.eVar92 = prodtype;
						s_dell.products = prod;
						if (!s_dell.eVar121) s_dell.eVar121 = "chg:" + deliverymeth;
						else s_dell.eVar121 = s_dell.eVar121 + ",chg:" + deliverymeth
					}
					if (s_dell.events.indexOf("purchase") >
						0) s_dell.events = s_dell.repl(s_dell.events, ",purchase", "", 2);
					if (typeof Dell.Metrics.sc.configupsell !== "undefined")
						if (typeof Dell.Metrics.sc.configupsell.btnname !== "undefined" && Dell.Metrics.sc.configupsell.btnname.indexof("addto") >= 0);
						else {
							if (btnName !== "") window.linkTracking("scAdd,scRemove,event61,event74,event75,event76,event126,event127", "eVar7,eVar68,eVar30,eVar31,eVar40,eVar92,eVar96,eVar104,eVar121,eVar126,eVar144,eVar146,products", "prop12,prop13,prop14,prop29,prop47,prop49,prop74,prop69,prop75",
								btnName, true, "o", initiator)
						}
					else if (btnName !== "") window.linkTracking("scAdd,scRemove,event61,event74,event75,event76,event126,event127,event188,event215", "eVar7,eVar8,eVar14,eVar68,eVar30,eVar31,eVar40,eVar91,eVar92,eVar96,eVar104,eVar121,eVar126,eVar144,eVar146,products", "prop12,prop13,prop14,prop29,prop47,prop49,prop74,prop69,prop75", btnName, true, "o", initiator)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				} else if (adb.publishPath === "eSupport" || adb.publishPath ===
					"eSupportDev") try {
					btnName = typeof metrics.btnname !== "undefined" ? metrics.btnname : "dellmetrics";
					appcode = typeof metrics.appcode !== "undefined" ? metrics.appcode : "";
					ordernumber = typeof metrics.ordernumber !== "undefined" ? metrics.ordernumber : "";
					clickthrutype = typeof metrics.clickthru !== "undefined" ? metrics.clickthru : "";
					doctype = typeof metrics.doctype !== "undefined" ? metrics.doctype : "";
					position = typeof metrics.position !== "undefined" ? metrics.position : "";
					sitesearchdocid = typeof metrics.productId !== "undefined" ? metrics.productId :
						"";
					videoid = typeof metrics.videoid !== "undefined" ? metrics.videoid : "";
					videoplayer = typeof metrics.videoplayer !== "undefined" ? metrics.videoplayer : "";
					videotaggedflag = typeof metrics.videotaggedflag !== "undefined" ? metrics.videotaggedflag : "";
					prodid = typeof metrics.prodid !== "undefined" ? metrics.prodid : "";
					if (prodid) s_dell.products = ";" + prodid;
					if (clickthrutype !== "") {
						s_dell.eVar21 = clickthrutype;
						s_dell.eVar19 = doctype;
						s_dell.eVar17 = position;
						s_dell.eVar18 = sitesearchdocid;
						s_dell.events = s_dell.apl(s_dell.events, "event20",
							",", 2);
						if (btnName === "dellmetrics") btnName = "sitesearchclickthrough"
					}
					if (videoid !== "") {
						s_dell.eVar24 = videoid;
						s_dell.eVar17 = position;
						s_dell.prop1 = videoplayer;
						if (videotaggedflag === "yes") s_dell.events = s_dell.apl(s_dell.events, "event218", ",", 2)
					}
					s_dell.prop13 = s_dell.pageName + "|" + btnName;
					s_dell.prop20 = appcode;
					s_dell.prop22 = ordernumber;
					if (appcode === "222.100.310.130") {
						var popdriver;
						var timeoutID = setTimeout(function() {
							popdriver = 0;
							if (Dell.Metrics.sc.detailedpagename) {
								s_dell.prop13 = s_dell.prop13 + "|" + Dell.Metrics.sc.detailedpagename;
								btnName = btnName + "|" + Dell.Metrics.sc.detailedpagename;
								window.linkTracking("event20,event22, ", "eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar36,eVar63,eVar64,eVar65,eVar136,eVar205", "prop7,prop13,prop14,prop17,prop18,prop19,prop20,prop22,prop29,prop47,prop49,prop57,prop69,prop75", btnName, true, "o", initiator);
								popdrive = 1
							} else window.linkTracking("event20,event22, ", "eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar36,eVar63,eVar64,eVar65,eVar136,eVar205", "prop7,prop13,prop14,prop17,prop18,prop19,prop20,prop22,prop29,prop47,prop49,prop57,prop69,prop75",
								btnName, true, "o", initiator)
						}, 1E3)
					} else window.linkTracking("event20,event22,event218, ", "eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar24,eVar36,eVar63,eVar64,eVar65,eVar136,eVar205", "prop1,prop7,prop13,prop14,prop17,prop18,prop19,prop20,prop22,prop29,prop47,prop49,prop57,prop69,prop75", btnName, true, "o", initiator)
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "processDataMetrics_" + adb.publishPath)
				}
				adb.previousDataMetrics = metrics;
				setTimeout(function() {
					adb.previousDataMetrics = {}
				}, 100)
			};
			adbFun.appendTNTValues =
				function(data) {
					var tntValues = adb.TntKeysToCapture.map(function(key) {
						return data[key] || ""
					});
					if (tntValues.some(function(value) {
							return value !== ""
						})) concatenatedValues += tntValues.join("|") + "|"
				};
			document.addEventListener("click", function(e) {
				try {
					var metricsFound = false;
					var ignoreEvent = false;
					if (e.target.shadowRoot !== null) targetElement = typeof e.composedPath !== "undefined" && e.composedPath().length !== 0 ? e.composedPath()[0] : e.target.shadowRoot.activeElement !== null ? e.target.shadowRoot.activeElement : e.target.shadowRoot;
					else targetElement = e.target;
					ignoreElementClass = ["dellmetrics-browseconfig"];
					for (var i = 0; i < ignoreElementClass.length; i++)
						if (typeof targetElement.className !== "undefined" && typeof targetElement.className === "string" && targetElement.className.indexOf(ignoreElementClass[i]) > -1) {
							ignoreEvent = true;
							break
						} parentElementScanNodeName = ["A", "DIV", "H1", "SPAN", "BUTTON", "LI", "SVG", "INPUT", "LABEL"];
					if (!ignoreEvent && (typeof targetElement.hasAttribute !== "undefined" || targetElement.hasAttribute("data-metrics") || parentElementScanNodeName.indexOf(e.target.nodeName.toUppercase()) >
							-1)) {
						if (!targetElement.hasAttribute("data-metrics")) {
							ADBParentScanLimit = 10;
							ADBParent = e.target.parentElement;
							for (var i = 0; i < ADBParentScanLimit; i++) {
								if (ADBParent === null) break;
								if (typeof ADBParent.hasAttribute !== "undefined" && ADBParent.hasAttribute("data-metrics")) {
									ADBMetrics = ADBParent.getAttribute("data-metrics");
									targetElement = ADBParent;
									metricsFound = true;
									break
								} else ADBParent = ADBParent.parentElement
							}
						} else {
							ADBMetrics = targetElement.getAttribute("data-metrics");
							metricsFound = true
						}
						if (metricsFound) {
							if (ADBMetrics.includes("\x26quot;")) ADBMetrics =
								ADBMetrics.replaceAll("\x26quot;", '"');
							if (ADBMetrics === "") return;
							ADBMetrics = JSON.parse(ADBMetrics);
							adbFun.processDataMetrics(ADBMetrics, targetElement, "E1")
						}
					}
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "genericEventListener")
				}
			}, true);
			document.addEventListener("ADBUserActionTracker", function(e) {
				var data = e.detail;
				if (typeof data.type !== "undefined") data.type = data.type.toLowerCase();
				if (data.type == "metrics") {
					var metrics = data.metrics;
					adbFun.processDataMetrics(metrics, "", "E2")
				} else if (data.type == "focusmetrics") {
					var metrics =
						data.metrics;
					adbFun.processDataMetrics(metrics, "", "E3")
				} else if (data.type == "pageview") try {
					var metrics = data.metrics;
					pagename = "";
					if (typeof metrics.pagename !== "undefined") pagename = metrics.pagename;
					else if (typeof metrics.pageName !== "undefined") pagename = metrics.pageName;
					if (pagename) {
						s_dell.pageName = pagename;
						s_dell.prop13 = pagename;
						window.consent_tcall()
					}
				} catch (e) {
					adbFun.gbLoggingFun("error", e.toString(), "ADBUserActionTracker_PageView")
				}
			});
			window.consent_tcall = function() {
				var consentcookie;
				var consentval =
					"";
				if (localStorage.getItem("s_value") !== null) {
					var consent_s = localStorage.getItem("s_value");
					var consent_m = localStorage.getItem("m_value");
					var consent_d = localStorage.getItem("d_value");
					s_dell.prop61 = consent_d;
					if (consent_s === "1" && consent_m === "1") consentval = "s|m";
					else consentval = consent_s === "1" && "s" || consent_m === "1" && "m";
					if (!consentval) {
						consentval = "n";
						s_dell.prop69 = "usr|decl"
					}
					s_dell.prop75 = consentval;
					readpaid();
					s_dell.t()
				} else if (typeof s_dell.c_r("dell_cmp_consent") !== "undefined" && s_dell.c_r("dell_cmp_consent")) {
					consentcookie =
						JSON.parse(s_dell.c_r("dell_cmp_consent"));
					if (consentcookie.s === 1)
						if (!consentval) consentval = "s";
						else consentval = consentval + "|s";
					if (consentcookie.m === 1)
						if (!consentval) consentval = "m";
						else consentval = consentval + "|m";
					if (!consentval) {
						consentval = "n";
						s_dell.prop69 = "usr|decl"
					}
					s_dell.prop75 = consentval;
					readpaid();
					s_dell.t()
				} else if (window.privacyAnalytics || window.privacyMarketing) {
					if (window.privacyAnalytics) {
						s_dell.prop75 = "s";
						s_dell.prop69 = ""
					}
					if (window.privacyMarketing)
						if (!s_dell.prop75) {
							s_dell.prop75 = "m";
							s_dell.prop69 = ""
						} else s_dell.prop75 = s_dell.prop75 + "|m";
					if (s_dell.prop75) {
						readpaid();
						s_dell.t()
					}
				} else {
					window.addEventListener("privacy-analytics-consent", function() {
						s_dell.prop75 = "s";
						s_dell.prop69 = "";
						if (document.referrer && s_dell.server && document.referrer.indexOf(s_dell.server) === -1) {
							s_dell.referrer = document.referrer;
							s_dell.prop13 = s_dell.pageName + "|consentaccept:" + s_dell.prop75;
							s_dell.t()
						} else {
							readpaid();
							if (s_dell.referrer) {
								s_dell.prop13 = s_dell.pageName + "|consentaccept:" + s_dell.prop75;
								s_dell.t()
							} else {
								s_dell.prop13 =
									s_dell.pageName + "|:consentval:" + s_dell.prop75;
								linkTracking("event23", "eVar2,eVar28,eVar53,eVar55,eVar66,eVar148,eVar149,eVar154", "prop7,prop13,prop14,prop24,prop29,prop46,prop47,prop49,prop75", "consentval:" + s_dell.prop75, true, "o", "privacy-analytics-consent")
							}
						}
					});
					window.addEventListener("privacy-marketing-consent", function() {
						s_dell.prop75 = "m";
						s_dell.prop69 = "";
						if (document.referrer && s_dell.server && document.referrer.indexOf(s_dell.server) === -1) {
							s_dell.referrer = document.referrer;
							s_dell.prop13 = s_dell.pageName +
								"|consentaccept:" + s_dell.prop75;
							s_dell.t()
						} else {
							readpaid();
							if (s_dell.referrer) {
								s_dell.prop13 = s_dell.pageName + "|consentaccept:" + s_dell.prop75;
								s_dell.t()
							} else {
								s_dell.prop13 = s_dell.pageName + "|:consentval:" + s_dell.prop75;
								linkTracking("event23", "eVar2,eVar28,eVar53,eVar55,eVar148,eVar149", "prop7,prop13,prop14,prop24,prop29,prop46,prop47,prop49,prop75", "consentval:" + s_dell.prop75, true, "o", "privacy-marketing-consent")
							}
						}
					});
					if (!s_dell.prop75) {
						s_dell.prop75 = "n";
						s_dell.prop69 = "usr|ignore";
						s_dell.server = parseUri(document.location.href).host.replace(/^www[0-9]*\./i,
							"");
						var refcap = document.referrer;
						var fval;
						if (refcap) fval = refcap;
						if (s_dell.getQueryParam("gacd") && s_dell.getQueryParam("dgc")) {
							var gval = s_dell.getQueryParam("gacd");
							var dval = s_dell.getQueryParam("dgc");
							var glid = s_dell.getQueryParam("gclid");
							var ven1 = s_dell.getQueryParam("ven1");
							var ven2 = s_dell.getQueryParam("ven2");
							var ven3 = s_dell.getQueryParam("ven3");
							fval = refcap + "||" + gval + "||" + dval + "||" + glid + "||" + ven1 + "|" + ven2 + "|" + ven3;
							s_dell.c_w("s_paidval", fval)
						}
						s_dell.t()
					}
				}
			};
			window.consent_tlcall = function(delay,
				type, linkName) {
				var consentval = "";
				var consentcookie;
				if (localStorage.getItem("s_value") !== null) {
					var consent_s = localStorage.getItem("s_value");
					var consent_m = localStorage.getItem("m_value");
					var consent_d = localStorage.getItem("d_value");
					s_dell.prop61 = consent_d;
					if (consent_s === "1" && consent_m === "1") consentval = "s|m";
					else consentval = consent_s === "1" && "s" || consent_m === "1" && "m";
					if (!consentval) {
						consentval = "n";
						s_dell.prop69 = "usr|decl"
					}
					s_dell.prop75 = consentval;
					if (type && type === "o") s_dell.tl(delay, type, linkName)
				} else if (typeof s_dell.c_r("dell_cmp_consent") !==
					"undefined" && s_dell.c_r("dell_cmp_consent")) {
					consentcookie = JSON.parse(s_dell.c_r("dell_cmp_consent"));
					if (consentcookie.s === 1)
						if (!consentval) consentval = "s";
						else consentval = consentval + "|s";
					if (consentcookie.m === 1)
						if (!consentval) consentval = "m";
						else consentval = consentval + "|m";
					if (!consentval) {
						consentval = "n";
						s_dell.prop69 = "usr|decl"
					}
					s_dell.prop75 = consentval;
					if (type && type === "o") s_dell.tl(delay, type, linkName)
				} else if (window.privacyAnalytics || window.privacyMarketing) {
					if (window.privacyAnalytics) {
						s_dell.prop75 =
							"s";
						s_dell.prop69 = ""
					}
					if (window.privacyMarketing)
						if (!s_dell.prop75) {
							s_dell.prop75 = "m";
							s_dell.prop69 = ""
						} else {
							s_dell.prop75 = s_dell.prop75 + "|m";
							s_dell.prop69 = ""
						} if (s_dell.prop75)
						if (type && type === "o") s_dell.tl(delay, type, linkName)
				} else {
					if (!s_dell.prop75) {
						s_dell.prop75 = "n";
						s_dell.prop69 = "usr|ignore"
					}
					if (type && type === "o") s_dell.tl(delay, type, linkName)
				}
			};
			window.resetValues = function(list) {
				list = list.split(",");
				for (var i in list) s_dell[list[i]] = ""
			};
			window.resetEvents = function() {
				s_dell["events"] = ""
			};
			window.readpaid =
				function() {
					if (s_dell.c_r("s_paidval")) {
						var getpaidval = s_dell.c_r("s_paidval");
						if (getpaidval) {
							var splitval = getpaidval.split("||");
							for (var m = 0; m < splitval.length; m++) {
								if (m == 0)
									if (splitval[m]) s_dell.referrer = splitval[m];
								if (m == 1) {
									if (splitval[m]) {
										s_dell.eVar148 = splitval[m];
										s_dell.eVar149 = s_dell.eVar148
									}
								} else if (m == 2) {
									if (splitval[m]) s_dell.eVar2 = splitval[m]
								} else if (m == 3) {
									if (splitval[m]) s_dell.eVar154 = splitval[m]
								} else if (m == 4)
									if (splitval[m]) s_dell.eVar66 = splitval[m]
							}
							s_dell.c_w("s_paidval", "")
						}
					} else {
						s_dell.referrer =
							"";
						s_dell.eVar2 = "";
						s_dell.eVar148 = "";
						s_dell.eVar149 = "";
						s_dell.eVar154 = "";
						s_dell.eVar66 = ""
					}
				};
			adbFun.hashGenerator = async function(inputString) {
				try {
					const encoder = new TextEncoder;
					const data = encoder.encode(inputString);
					const hashBuffer = await crypto.subtle.digest("SHA-256", data);
					const hashedString = Array.from(new Uint8Array(hashBuffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
					localStorage.setItem("ADB_Data", JSON.stringify({
						"MCMHash": hashedString
					}));
					return hashedString
				} catch (e) {
					adbFun.gbLoggingFun("error",
						e.toString(), "hashGenerator")
				}
			};
			window.linkTracking = function(events, eVars, props, linkName, delay, type, initiator) {
				try {
					if (typeof adb.MCMHash !== "undefined" && adb.MCMHash !== "") s_dell.contextData["MCMHash"] = adb.MCMHash;
					else adbFun.hashGenerator(s_dell.eVar71).then((securedString) => {
						s_dell.contextData["MCMHash"] = securedString;
						adb["MCMHash"] = securedString
					});
					adb.visitorAPIStatus = typeof Visitor != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing";
					adb.jQueryStatus = typeof jQuery != "undefined" ? "jQuery Present" :
						"jQuery Missing";
					s_dell.eVar37 = adb.visitorAPIStatus + " | " + adb.jQueryStatus;
					if (typeof initiator !== "undefined" && initiator !== "") s_dell.eVar37 += " | " + initiator;
					if (adb.publishPath !== "NA") s_dell.prop53 = adb.publishPath;
					props += ",prop53";
					s_dell.eVar114 = adbFun.getGlassboxSessionReplayLink();
					eVars += ",eVar114";
					s_dell.linkTrackVars = props + ",contextData.MCMHash,prop17,prop18,prop69,prop75," + eVars;
					s_dell.linkTrackEvents = events;
					if (typeof Dell.Metrics.sc.detailedPagename !== "undefined") try {
						s_dell.pageURL = History.getState().cleanUrl
					} catch (e) {} else s_dell.pageURL =
						window.location.href;
					if (adb.publishPath === "eSupport" || adb.publishPath === "eSupportDev" || adb.publishPath === "emc" || adb.publishPath === "emcDev") {
						window.consent_tlcall(delay, type, linkName);
						if (type == "d") s_dell.tl(delay, type, linkName)
					} else window.consent_tlcall(delay, type, linkName);
					resetEvents();
					resetValues(eVars);
					resetValues(props)
				} catch (e) {
					adbFun.gbLoggingFun("Error", e.toString(), "linkTracking")
				}
			};
			adbFun.trackHash = function() {
				if (adb.trackHashCounter === 0) {
					adb.trackHashCounter++;
					s_dell.trackHash = s_dell.track;
					s_dell.track = s_dell.t = function() {
						try {
							if (typeof adb.MCMHash !== "undefined" && adb.MCMHash !== "") s_dell.contextData["MCMHash"] = adb.MCMHash;
							else adbFun.hashGenerator(s_dell.eVar71).then((securedString) => {
								s_dell.contextData["MCMHash"] = securedString;
								adb["MCMHash"] = securedString
							})
						} catch (e) {
							adbFun.gbLoggingFun("error", e.toString(), "trackHash")
						} finally {
							if (adb.publishPath.indexOf("unifiedpurchase") === -1)
								if (typeof s_dell.linkTrackVars === "undefined" || s_dell.linkTrackVars === "") s_dell.linkTrackVars = "contextData.MCMHash";
								else if (s_dell.linkTrackVars.indexOf("contextData.MCMHash") === -1) s_dell.linkTrackVars += ",contextData.MCMHash";
							s_dell.trackHash()
						}
					}
				}
			};
			window.AppMeasurement_Module_ActivityMap = function(k) {
				function p() {
					var a = f.pageYOffset + (f.innerHeight || 0);
					a && a > +g && (g = a)
				}

				function q() {
					if (e.scrollReachSelector) {
						var a = k.d.querySelector && k.d.querySelector(e.scrollReachSelector);
						a ? (g = a.scrollTop || 0, a.addEventListener("scroll", function() {
							var d;
							(d = a && a.scrollTop + a.clientHeight || 0) > g && (g = d)
						})) : 0 < v-- && setTimeout(q, 1E3)
					}
				}

				function l(a,
					d) {
					var b, c, n;
					if (a && d && (b = e.c[d] || (e.c[d] = d.split(","))))
						for (n = 0; n < b.length && (c = b[n++]);)
							if (-1 < a.indexOf(c)) return null;
					return a
				}

				function r(a, d, b, c, e) {
					var f, h;
					if (a.dataset && (h = a.dataset[d])) f = h;
					else if (a.getAttribute)
						if (h = a.getAttribute("data-" + b)) f = h;
						else if (h = a.getAttribute(b)) f = h;
					if (!f && k.useForcedLinkTracking && e) {
						var g;
						a = a.onclick ? "" + a.onclick : "";
						d = "";
						if (c && a && (b = a.indexOf(c), 0 <= b)) {
							for (b += c.length; b < a.length;)
								if (h = a.charAt(b++), 0 <= "'\"".indexOf(h)) {
									g = h;
									break
								} for (var l = !1; b < a.length && g;) {
								h = a.charAt(b);
								if (!l && h === g) break;
								"\\" === h ? l = !0 : (d += h, l = !1);
								b++
							}
						}(g = d) && (k.w[c] = g)
					}
					return f || e && k.w[c]
				}

				function s(a, d, b) {
					var c;
					return (c = e[d](a, b)) && l(m(c), e[d + "Exclusions"])
				}

				function t(a, d, b) {
					var c;
					if (a && !(1 === (c = a.nodeType) && (c = a.nodeName) && (c = c.toUpperCase()) && w[c]) && (1 === a.nodeType && (c = a.nodeValue) && (d[d.length] = c), b.a || b.t || b.s || !a.getAttribute || ((c = a.getAttribute("alt")) ? b.a = c : (c = a.getAttribute("title")) ? b.t = c : "IMG" == ("" + a.nodeName).toUpperCase() && (c = a.getAttribute("src") || a.src) && (b.s = c)), (c = a.childNodes) &&
							c.length))
						for (a = 0; a < c.length; a++) t(c[a], d, b)
				}

				function m(a) {
					if (null == a || void 0 == a) return a;
					try {
						return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}", "mg"), " ").substring(0, 254)
					} catch (d) {}
				}
				var e = this;
				e.s = k;
				var f = window;
				f.s_c_in || (f.s_c_il = [], f.s_c_in = 0);
				e._il = f.s_c_il;
				e._in = f.s_c_in;
				e._il[e._in] = e;
				f.s_c_in++;
				e._c = "s_m";
				var g = 0,
					u, v = 60;
				e.c = {};
				var w = {
					SCRIPT: 1,
					STYLE: 1,
					LINK: 1,
					CANVAS: 1
				};
				e._g = function() {
					var a, d, b, c = k.contextData,
						e = k.linkObject;
					(a = k.pageName || k.pageURL) && (d = s(e, "link", k.linkName)) && (b = s(e, "region")) && (c["a.activitymap.page"] = a.substring(0, 255), c["a.activitymap.link"] = 128 < d.length ? d.substring(0, 128) : d, c["a.activitymap.region"] = 127 < b.length ? b.substring(0, 127) : b, 0 < g && (c["a.activitymap.xy"] = 10 * Math.floor(g /
						10)), c["a.activitymap.pageIDType"] = k.pageName ? 1 : 0)
				};
				e._d = function() {
					e.trackScrollReach && !u && (e.scrollReachSelector ? q() : (p(), f.addEventListener && f.addEventListener("scroll", p, !1)), u = !0)
				};
				e.link = function(a, d) {
					var b;
					if (d) b = l(m(d), e.linkExclusions);
					else if ((b = a) && !(b = r(a, "sObjectId", "s-object-id", "s_objectID", 1))) {
						var c, f;
						(f = l(m(a.innerText || a.textContent), e.linkExclusions)) || (t(a, c = [], b = {
							a: void 0,
							t: void 0,
							s: void 0
						}), (f = l(m(c.join("")))) || (f = l(m(b.a ? b.a : b.t ? b.t : b.s ? b.s : void 0))) || !(c = (c = a.tagName) && c.toUpperCase ?
							c.toUpperCase() : "") || ("INPUT" == c || "SUBMIT" == c && a.value ? f = l(m(a.value)) : "IMAGE" == c && a.src && (f = l(m(a.src)))));
						b = f
					}
					return b
				};
				e.region = function(a) {
					for (var d, b = e.regionIDAttribute || "id"; a && (a = a.parentNode);) {
						if (d = r(a, b, b, b)) return d;
						if ("BODY" == a.nodeName) return "BODY"
					}
				}
			};

			function AppMeasurement(r) {
				var a = this;
				a.version = "2.25.0";
				var h = window;
				h.s_c_in || (h.s_c_il = [], h.s_c_in = 0);
				a._il = h.s_c_il;
				a._in = h.s_c_in;
				a._il[a._in] = a;
				h.s_c_in++;
				a._c = "s_c";
				try {
					var q = h.AppMeasurement.uc
				} catch (e) {}
				q || (q = null);
				var p = h,
					m, s;
				try {
					for (m = p.parent, s = p.location; m && m.location && s && "" + m.location !== "" + s && p.location && "" + m.location !== "" + p.location && m.location.host === s.host;) p = m, m = p.parent
				} catch (u) {}
				a.log = function(a) {
					try {
						console.log(a)
					} catch (c) {}
				};
				a.Ya = function(a) {
					return "" + parseInt(a) == "" + a
				};
				a.replace = function(a, c, d) {
					return !a || 0 > a.indexOf(c) ? a : a.split(c).join(d)
				};
				a.escape = function(b) {
					var c, d;
					if (!b) return b;
					b = encodeURIComponent(b);
					for (c = 0; 7 > c; c++) d = "+~!*()'".substring(c, c + 1), 0 <= b.indexOf(d) && (b = a.replace(b, d, "%" + d.charCodeAt(0).toString(16).toUpperCase()));
					return b
				};
				a.unescape = function(b) {
					if (!b) return b;
					b = 0 <= b.indexOf("+") ? a.replace(b, "+", " ") : b;
					try {
						return decodeURIComponent(b)
					} catch (c) {}
					return unescape(b)
				};
				a.ac = function() {
					var b = h.location.hostname,
						c = a.fpCookieDomainPeriods,
						d;
					c || (c = a.cookieDomainPeriods);
					if (b && !a.Ra && !/^[0-9.]+$/.test(b) && (c = c ? parseInt(c) : 2, c = 2 < c ? c : 2, d = b.lastIndexOf("."), 0 <= d)) {
						for (; 0 <= d && 1 < c;) d = b.lastIndexOf(".", d - 1), c--;
						a.Ra = 0 < d ? b.substring(d) : b
					}
					return a.Ra
				};
				a.c_r = a.cookieRead = function(b) {
					b = a.escape(b);
					var c = " " + a.d.cookie,
						d = c.indexOf(" " +
							b + "\x3d"),
						f = 0 > d ? d : c.indexOf(";", d);
					b = 0 > d ? "" : a.unescape(c.substring(d + 2 + b.length, 0 > f ? c.length : f));
					return "[[B]]" != b ? b : ""
				};
				a.c_w = a.cookieWrite = function(b, c, d) {
					var f = a.ac(),
						e = a.cookieLifetime,
						g;
					c = "" + c;
					e = e ? ("" + e).toUpperCase() : "";
					d && "SESSION" != e && "NONE" != e && ((g = "" != c ? parseInt(e ? e : 0) : -60) ? (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 === d && (d = new Date, g = d.getYear(), d.setYear(g + 2 + (1900 > g ? 1900 : 0))));
					return b && "NONE" != e ? (a.d.cookie = a.escape(b) + "\x3d" + a.escape("" != c ? c : "[[B]]") + "; path\x3d/;" + (d && "SESSION" != e ?
						" expires\x3d" + d.toUTCString() + ";" : "") + (f ? " domain\x3d" + f + ";" : "") + (a.writeSecureCookies ? " secure;" : ""), a.cookieRead(b) == c) : 0
				};
				a.Yb = function() {
					var b = a.Util.getIeVersion();
					"number" === typeof b && 10 > b && (a.unsupportedBrowser = !0, a.Jb(a, function() {}))
				};
				a.Ea = function() {
					var a = navigator.userAgent;
					return "Microsoft Internet Explorer" === navigator.appName || 0 <= a.indexOf("MSIE ") || 0 <= a.indexOf("Trident/") && 0 <= a.indexOf("Windows NT 6") ? !0 : !1
				};
				a.Jb = function(a, c) {
					for (var d in a) Object.prototype.hasOwnProperty.call(a,
						d) && "function" === typeof a[d] && (a[d] = c)
				};
				a.M = [];
				a.ja = function(b, c, d) {
					if (a.Sa) return 0;
					a.maxDelay || (a.maxDelay = 250);
					var f = 0,
						e = (new Date).getTime() + a.maxDelay,
						g = a.d.visibilityState,
						k = ["webkitvisibilitychange", "visibilitychange"];
					g || (g = a.d.webkitVisibilityState);
					if (g && "prerender" == g) {
						if (!a.ka)
							for (a.ka = 1, d = 0; d < k.length; d++) a.d.addEventListener(k[d], function() {
								var b = a.d.visibilityState;
								b || (b = a.d.webkitVisibilityState);
								"visible" == b && (a.ka = 0, a.delayReady())
							});
						f = 1;
						e = 0
					} else d || a.v("_d") && (f = 1);
					f && (a.M.push({
						m: b,
						a: c,
						t: e
					}), a.ka || setTimeout(a.delayReady, a.maxDelay));
					return f
				};
				a.delayReady = function() {
					var b = (new Date).getTime(),
						c = 0,
						d;
					for (a.v("_d") ? c = 1 : a.Ga(); 0 < a.M.length;) {
						d = a.M.shift();
						if (c && !d.t && d.t > b) {
							a.M.unshift(d);
							setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
							break
						}
						a.Sa = 1;
						a[d.m].apply(a, d.a);
						a.Sa = 0
					}
				};
				a.setAccount = a.sa = function(b) {
					var c, d;
					if (!a.ja("setAccount", arguments))
						if (a.account = b, a.allAccounts)
							for (c = a.allAccounts.concat(b.split(",")), a.allAccounts = [], c.sort(), d = 0; d < c.length; d++) 0 != d && c[d - 1] == c[d] ||
								a.allAccounts.push(c[d]);
						else a.allAccounts = b.split(",")
				};
				a.foreachVar = function(b, c) {
					var d, f, e, g, k = "";
					e = f = "";
					if (a.lightProfileID) d = a.Q, (k = a.lightTrackVars) && (k = "," + k + "," + a.pa.join(",") + ",");
					else {
						d = a.i;
						if (a.pe || a.linkType) k = a.linkTrackVars, f = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (k = a[e].qc, f = a[e].pc));
						k && (k = "," + k + "," + a.F.join(",") + ",");
						f && k && (k += ",events,")
					}
					c && (c = "," + c + ",");
					for (f = 0; f < d.length; f++) e = d[f], (g = a[e]) && (!k || 0 <= k.indexOf("," + e + ",")) && (!c || 0 <=
						c.indexOf("," + e + ",")) && b(e, g)
				};
				a.l = function(b, c, d, f, e) {
					var g = "",
						k, l, h, n, m = 0;
					"contextData" == b && (b = "c");
					"clientHints" == b && (b = "h");
					if (c) {
						for (k in c)
							if (!(Object.prototype[k] || e && k.substring(0, e.length) != e) && c[k] && (!d || 0 <= d.indexOf("," + (f ? f + "." : "") + k + ","))) {
								h = !1;
								if (m)
									for (l = 0; l < m.length; l++)
										if (k.substring(0, m[l].length) == m[l]) {
											h = !0;
											break
										} if (!h && ("" == g && (g += "\x26" + b + "."), l = c[k], e && (k = k.substring(e.length)), 0 < k.length))
									if (h = k.indexOf("."), 0 < h) l = k.substring(0, h), h = (e ? e : "") + l + ".", m || (m = []), m.push(h), g += a.l(l,
										c, d, f, h);
									else if ("boolean" == typeof l && (l = l ? "true" : "false"), l) {
									if ("retrieveLightData" == f && 0 > e.indexOf(".contextData.")) switch (h = k.substring(0, 4), n = k.substring(4), k) {
										case "transactionID":
											k = "xact";
											break;
										case "channel":
											k = "ch";
											break;
										case "campaign":
											k = "v0";
											break;
										default:
											a.Ya(n) && ("prop" == h ? k = "c" + n : "eVar" == h ? k = "v" + n : "list" == h ? k = "l" + n : "hier" == h && (k = "h" + n, l = l.substring(0, 255)))
									}
									g += "\x26" + a.escape(k) + "\x3d" + a.escape(l)
								}
							}
						"" != g && (g += "\x26." + b)
					}
					return g
				};
				a.usePostbacks = 0;
				a.ec = function() {
					var b = "",
						c, d, f, e, g, k, l,
						h, n = "",
						m = "",
						p = e = "",
						r = a.W();
					if (a.lightProfileID) c = a.Q, (n = a.lightTrackVars) && (n = "," + n + "," + a.pa.join(",") + ",");
					else {
						c = a.i;
						if (a.pe || a.linkType) n = a.linkTrackVars, m = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (n = a[e].qc, m = a[e].pc));
						n && (n = "," + n + "," + a.F.join(",") + ",");
						m && (m = "," + m + ",", n && (n += ",events,"));
						a.events2 && (p += ("" != p ? "," : "") + a.events2)
					}
					if (r && r.getCustomerIDs) {
						e = q;
						if (g = r.getCustomerIDs())
							for (d in g) Object.prototype[d] || (f = g[d], "object" == typeof f && (e || (e = {}),
								f.id && (e[d + ".id"] = f.id), f.authState && (e[d + ".as"] = f.authState)));
						e && (b += a.l("cid", e))
					}
					a.AudienceManagement && a.AudienceManagement.isReady() && (b += a.l("d", a.AudienceManagement.getEventCallConfigParams()));
					for (d = 0; d < c.length; d++) {
						e = c[d];
						g = a[e];
						f = e.substring(0, 4);
						k = e.substring(4);
						g || ("events" == e && p ? (g = p, p = "") : "marketingCloudOrgID" == e && r && a.X("ECID") && (g = r.marketingCloudOrgID));
						if (g && (!n || 0 <= n.indexOf("," + e + ","))) {
							switch (e) {
								case "customerPerspective":
									e = "cp";
									break;
								case "marketingCloudOrgID":
									e = "mcorgid";
									break;
								case "supplementalDataID":
									e = "sdid";
									break;
								case "timestamp":
									e = "ts";
									break;
								case "dynamicVariablePrefix":
									e = "D";
									break;
								case "visitorID":
									e = "vid";
									break;
								case "marketingCloudVisitorID":
									e = "mid";
									break;
								case "analyticsVisitorID":
									e = "aid";
									break;
								case "audienceManagerLocationHint":
									e = "aamlh";
									break;
								case "audienceManagerBlob":
									e = "aamb";
									break;
								case "authState":
									e = "as";
									break;
								case "pageURL":
									e = "g";
									255 < g.length && (a.pageURLRest = g.substring(255), g = g.substring(0, 255));
									break;
								case "pageURLRest":
									e = "-g";
									break;
								case "referrer":
									e = "r";
									break;
								case "vmk":
								case "visitorMigrationKey":
									e = "vmt";
									break;
								case "visitorMigrationServer":
									e = "vmf";
									a.ssl && a.visitorMigrationServerSecure && (g = "");
									break;
								case "visitorMigrationServerSecure":
									e = "vmf";
									!a.ssl && a.visitorMigrationServer && (g = "");
									break;
								case "charSet":
									e = "ce";
									break;
								case "visitorNamespace":
									e = "ns";
									break;
								case "cookieDomainPeriods":
									e = "cdp";
									break;
								case "cookieLifetime":
									e = "cl";
									break;
								case "variableProvider":
									e = "vvp";
									break;
								case "currencyCode":
									e = "cc";
									break;
								case "channel":
									e = "ch";
									break;
								case "transactionID":
									e = "xact";
									break;
								case "campaign":
									e = "v0";
									break;
								case "latitude":
									e = "lat";
									break;
								case "longitude":
									e = "lon";
									break;
								case "resolution":
									e = "s";
									break;
								case "colorDepth":
									e = "c";
									break;
								case "javascriptVersion":
									e = "j";
									break;
								case "javaEnabled":
									e = "v";
									break;
								case "cookiesEnabled":
									e = "k";
									break;
								case "browserWidth":
									e = "bw";
									break;
								case "browserHeight":
									e = "bh";
									break;
								case "connectionType":
									e = "ct";
									break;
								case "homepage":
									e = "hp";
									break;
								case "events":
									p && (g += ("" != g ? "," : "") + p);
									if (m)
										for (k = g.split(","), g = "", f = 0; f < k.length; f++) l = k[f], h = l.indexOf("\x3d"),
											0 <= h && (l = l.substring(0, h)), h = l.indexOf(":"), 0 <= h && (l = l.substring(0, h)), 0 <= m.indexOf("," + l + ",") && (g += (g ? "," : "") + k[f]);
									break;
								case "events2":
									g = "";
									break;
								case "contextData":
									b += a.l("c", a[e], n, e);
									g = "";
									break;
								case "clientHints":
									b += a.l("h", a[e], n, e);
									g = "";
									break;
								case "lightProfileID":
									e = "mtp";
									break;
								case "lightStoreForSeconds":
									e = "mtss";
									a.lightProfileID || (g = "");
									break;
								case "lightIncrementBy":
									e = "mti";
									a.lightProfileID || (g = "");
									break;
								case "retrieveLightProfiles":
									e = "mtsr";
									break;
								case "deleteLightProfiles":
									e = "mtsd";
									break;
								case "retrieveLightData":
									a.retrieveLightProfiles && (b += a.l("mts", a[e], n, e));
									g = "";
									break;
								default:
									a.Ya(k) && ("prop" == f ? e = "c" + k : "eVar" == f ? e = "v" + k : "list" == f ? e = "l" + k : "hier" == f && (e = "h" + k, g = g.substring(0, 255)))
							}
							g && (b += "\x26" + e + "\x3d" + ("pev" != e.substring(0, 3) ? a.escape(g) : g))
						}
						"pev3" == e && a.e && (b += a.e)
					}
					a.oa && (b += "\x26lrt\x3d" + a.oa, a.oa = null);
					return b
				};
				a.C = function(a) {
					var c = a.tagName;
					if ("undefined" != "" + a.xc || "undefined" != "" + a.lc && "HTML" != ("" + a.lc).toUpperCase()) return "";
					c = c && c.toUpperCase ? c.toUpperCase() : "";
					"SHAPE" ==
					c && (c = "");
					c && (("INPUT" == c || "BUTTON" == c) && a.type && a.type.toUpperCase ? c = a.type.toUpperCase() : !c && a.href && (c = "A"));
					return c
				};
				a.Ua = function(a) {
					var c = h.location,
						d = a.href ? a.href : "",
						f, e, g;
					"string" !== typeof d && (d = "");
					f = d.indexOf(":");
					e = d.indexOf("?");
					g = d.indexOf("/");
					d && (0 > f || 0 <= e && f > e || 0 <= g && f > g) && (e = a.protocol && 1 < a.protocol.length ? a.protocol : c.protocol ? c.protocol : "", f = c.pathname.lastIndexOf("/"), d = (e ? e + "//" : "") + (a.host ? a.host : c.host ? c.host : "") + ("/" != d.substring(0, 1) ? c.pathname.substring(0, 0 > f ? 0 : f) + "/" :
						"") + d);
					return d
				};
				a.N = function(b) {
					var c = a.C(b),
						d, f, e = "",
						g = 0;
					return c && (d = b.protocol, f = b.onclick, !b.href || "A" != c && "AREA" != c || f && d && !(0 > d.toLowerCase().indexOf("javascript")) ? f ? (e = a.replace(a.replace(a.replace(a.replace("" + f, "\r", ""), "\n", ""), "\t", ""), " ", ""), g = 2) : "INPUT" == c || "SUBMIT" == c ? (b.value ? e = b.value : b.innerText ? e = b.innerText : b.textContent && (e = b.textContent), g = 3) : "IMAGE" == c && b.src && (e = b.src) : e = a.Ua(b), e) ? {
						id: e.substring(0, 100),
						type: g
					} : 0
				};
				a.vc = function(b) {
					for (var c = a.C(b), d = a.N(b); b && !d && "BODY" !=
						c;)
						if (b = b.parentElement ? b.parentElement : b.parentNode) c = a.C(b), d = a.N(b);
					d && "BODY" != c || (b = 0);
					b && (c = b.onclick ? "" + b.onclick : "", 0 <= c.indexOf(".tl(") || 0 <= c.indexOf(".trackLink(")) && (b = 0);
					return b
				};
				a.kc = function() {
					var b, c, d = a.linkObject,
						f = a.linkType,
						e = a.linkURL,
						g, k;
					a.qa = 1;
					d || (a.qa = 0, d = a.clickObject);
					if (d) {
						b = a.C(d);
						for (c = a.N(d); d && !c && "BODY" != b;)
							if (d = d.parentElement ? d.parentElement : d.parentNode) b = a.C(d), c = a.N(d);
						c && "BODY" != b || (d = 0);
						if (d && !a.linkObject) {
							var l = d.onclick ? "" + d.onclick : "";
							if (0 <= l.indexOf(".tl(") ||
								0 <= l.indexOf(".trackLink(")) d = 0
						}
					} else a.qa = 1;
					!e && d && (e = a.Ua(d));
					e && !a.linkLeaveQueryString && (g = e.indexOf("?"), 0 <= g && (e = e.substring(0, g)));
					if (!f && e) {
						var m = 0,
							n = 0,
							p;
						if (a.trackDownloadLinks && a.linkDownloadFileTypes)
							for (l = e.toLowerCase(), g = l.indexOf("?"), k = l.indexOf("#"), 0 <= g ? 0 <= k && k < g && (g = k) : g = k, 0 <= g && (l = l.substring(0, g)), g = a.linkDownloadFileTypes.toLowerCase().split(","), k = 0; k < g.length; k++)(p = g[k]) && l.substring(l.length - (p.length + 1)) == "." + p && (f = "d");
						if (a.trackExternalLinks && !f && (l = e.toLowerCase(), a.Xa(l) &&
								(a.linkInternalFilters || (a.linkInternalFilters = h.location.hostname), g = 0, a.linkExternalFilters ? (g = a.linkExternalFilters.toLowerCase().split(","), m = 1) : a.linkInternalFilters && (g = a.linkInternalFilters.toLowerCase().split(",")), g))) {
							for (k = 0; k < g.length; k++) p = g[k], 0 <= l.indexOf(p) && (n = 1);
							n ? m && (f = "e") : m || (f = "e")
						}
					}
					a.linkObject = d;
					a.linkURL = e;
					a.linkType = f;
					if (a.trackClickMap || a.trackInlineStats) a.e = "", d && (f = a.pageName, e = 1, d = d.sourceIndex, f || (f = a.pageURL, e = 0), h.s_objectID && (c.id = h.s_objectID, d = c.type = 1), f && c &&
						c.id && b && (a.e = "\x26pid\x3d" + a.escape(f.substring(0, 255)) + (e ? "\x26pidt\x3d" + e : "") + "\x26oid\x3d" + a.escape(c.id.substring(0, 100)) + (c.type ? "\x26oidt\x3d" + c.type : "") + "\x26ot\x3d" + b + (d ? "\x26oi\x3d" + d : "")))
				};
				a.fc = function() {
					var b = a.qa,
						c = a.linkType,
						d = a.linkURL,
						f = a.linkName;
					c && (d || f) && (c = c.toLowerCase(), "d" != c && "e" != c && (c = "o"), a.pe = "lnk_" + c, a.decodeLinkParameters ? (a.pev1 = d ? a.unescape(d) : "", a.pev2 = f ? a.unescape(f) : "", a.pev1 = a.escape(a.pev1), a.pev2 = a.escape(a.pev2)) : (a.pev1 = d ? a.escape(d) : "", a.pev2 = f ? a.escape(f) :
						""), b = 1);
					a.abort && (b = 0);
					if (a.trackClickMap || a.trackInlineStats || a.hc()) {
						var c = {},
							d = 0,
							e = a.Db(),
							g = e ? e.split("\x26") : 0,
							k, l, h, e = 0;
						if (g)
							for (k = 0; k < g.length; k++) l = g[k].split("\x3d"), f = a.unescape(l[0]).split(","), l = a.unescape(l[1]), c[l] = f;
						f = a.account.split(",");
						k = {};
						for (h in a.contextData) h && !Object.prototype[h] && "a.activitymap." == h.substring(0, 14) && (k[h] = a.contextData[h], a.contextData[h] = "");
						a.e = a.l("c", k) + (a.e ? a.e : "");
						if (b || a.e) {
							b && !a.e && (e = 1);
							for (l in c)
								if (!Object.prototype[l])
									for (h = 0; h < f.length; h++)
										for (e &&
											(g = c[l].join(","), g == a.account && (a.e += ("\x26" != l.charAt(0) ? "\x26" : "") + l, c[l] = [], d = 1)), k = 0; k < c[l].length; k++) g = c[l][k], g == f[h] && (e && (a.e += "\x26u\x3d" + a.escape(g) + ("\x26" != l.charAt(0) ? "\x26" : "") + l + "\x26u\x3d0"), c[l].splice(k, 1), d = 1);
							b || (d = 1);
							if (d) {
								e = "";
								k = 2;
								!b && a.e && (e = a.escape(f.join(",")) + "\x3d" + a.escape(a.e), k = 1);
								for (l in c) !Object.prototype[l] && 0 < k && 0 < c[l].length && (e += (e ? "\x26" : "") + a.escape(c[l].join(",")) + "\x3d" + a.escape(l), k--);
								a.Lb(e)
							}
						}
					}
					return b
				};
				a.Db = function() {
					if (a.useLinkTrackSessionStorage) {
						if (a.o(h.sessionStorage)) try {
							return h.sessionStorage.getItem(a.R)
						} catch (b) {}
					} else return a.cookieRead(a.R)
				};
				a.Lb = function(b) {
					if (a.useLinkTrackSessionStorage) {
						if (a.o(h.sessionStorage)) try {
							h.sessionStorage.setItem(a.R, b)
						} catch (c) {}
					} else a.cookieWrite(a.R, b)
				};
				a.gc = function() {
					if (!a.oc) {
						var b = new Date,
							c = p.location,
							d, f, e = f = d = "",
							g = "",
							k = "",
							h = "1.2",
							m = a.cookieWrite("s_cc", "true", 0) ? "Y" : "N",
							n = "",
							q = "";
						if (b.setUTCDate && (h = "1.3", (0).toPrecision && (h = "1.5", b = [], b.forEach))) {
							h = "1.6";
							f = 0;
							d = {};
							try {
								f = new Iterator(d), f.next && (h = "1.7", b.reduce && (h = "1.8", h.trim && (h = "1.8.1", Date.parse && (h = "1.8.2", Object.create && (h = "1.8.5")))))
							} catch (r) {}
						}
						d =
							screen.width + "x" + screen.height;
						e = navigator.javaEnabled() ? "Y" : "N";
						f = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
						g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
						k = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
						try {
							a.b.addBehavior("#default#homePage"), n = a.b.wc(c) ? "Y" : "N"
						} catch (s) {}
						try {
							a.b.addBehavior("#default#clientCaps"), q = a.b.connectionType
						} catch (t) {}
						a.resolution = d;
						a.colorDepth = f;
						a.javascriptVersion = h;
						a.javaEnabled = e;
						a.cookiesEnabled = m;
						a.browserWidth = g;
						a.browserHeight = k;
						a.connectionType = q;
						a.homepage = n;
						a.oc = 1
					}
				};
				a.ob = function() {
					if (a.collectHighEntropyUserAgentHints && !a.J && a.jb()) {
						a.J = !0;
						try {
							navigator.userAgentData.getHighEntropyValues(a.wa).then(function(b) {
								a.clientHints = {};
								a.wa.forEach(function(d) {
									Object.prototype.hasOwnProperty.call(b, d) && (a.clientHints[d] = b[d])
								})
							})["catch"](function(b) {
								a.J = !1;
								a.clientHints = {};
								a.debugTracking && a.log(b.message)
							})
						} catch (b) {
							a.J = !1, a.clientHints = {}, a.debugTracking && a.log(b.message)
						}
					} else a.clientHints = {}
				};
				a.jb = function() {
					return "undefined" !==
						typeof navigator.userAgentData
				};
				a.S = {};
				a.loadModule = function(b, c) {
					var d = a.S[b];
					if (!d) {
						d = h["AppMeasurement_Module_" + b] ? new h["AppMeasurement_Module_" + b](a) : {};
						a.S[b] = a[b] = d;
						d.vb = function() {
							return d.Gb
						};
						d.Mb = function(c) {
							if (d.Gb = c) a[b + "_onLoad"] = c, a.ja(b + "_onLoad", [a, d], 1) || c(a, d)
						};
						try {
							Object.defineProperty ? Object.defineProperty(d, "onLoad", {
								get: d.vb,
								set: d.Mb
							}) : d._olc = 1
						} catch (f) {
							d._olc = 1
						}
					}
					c && (a[b + "_onLoad"] = c, a.ja(b + "_onLoad", [a, d], 1) || c(a, d))
				};
				a.v = function(b) {
					var c, d;
					for (c in a.S)
						if (!Object.prototype[c] &&
							(d = a.S[c]) && (d._olc && d.onLoad && (d._olc = 0, d.onLoad(a, d)), d[b] && d[b]())) return 1;
					return 0
				};
				a.hc = function() {
					return a.ActivityMap && a.ActivityMap._c ? !0 : !1
				};
				a.ic = function() {
					var b = Math.floor(1E13 * Math.random()),
						c = a.visitorSampling,
						d = a.visitorSamplingGroup,
						d = "s_vsn_" + (a.visitorNamespace ? a.visitorNamespace : a.account) + (d ? "_" + d : ""),
						f = a.cookieRead(d);
					if (c) {
						c *= 100;
						f && (f = parseInt(f));
						if (!f) {
							if (!a.cookieWrite(d, b)) return 0;
							f = b
						}
						if (f % 1E4 > c) return 0
					}
					return 1
				};
				a.U = function(b, c) {
					var d, f, e, g, k, h, m;
					m = {};
					for (d = 0; 2 > d; d++)
						for (f =
							0 < d ? a.Na : a.i, e = 0; e < f.length; e++)
							if (g = f[e], (k = b[g]) || b["!" + g]) {
								if (k && !c && ("contextData" == g || "retrieveLightData" == g) && a[g])
									for (h in a[g]) k[h] || (k[h] = a[g][h]);
								a[g] || (m["!" + g] = 1);
								m[g] = a[g];
								a[g] = k
							} return m
				};
				a.tc = function(b) {
					var c, d, f, e;
					for (c = 0; 2 > c; c++)
						for (d = 0 < c ? a.Na : a.i, f = 0; f < d.length; f++) e = d[f], b[e] = a[e], b[e] || "prop" !== e.substring(0, 4) && "eVar" !== e.substring(0, 4) && "hier" !== e.substring(0, 4) && "list" !== e.substring(0, 4) && "channel" !== e && "events" !== e && "eventList" !== e && "products" !== e && "productList" !== e && "purchaseID" !==
							e && "transactionID" !== e && "state" !== e && "zip" !== e && "campaign" !== e && "events2" !== e && "latitude" !== e && "longitude" !== e && "ms_a" !== e && "contextData" !== e && "supplementalDataID" !== e && "tnt" !== e && "timestamp" !== e && "abort" !== e && "useBeacon" !== e && "linkObject" !== e && "clickObject" !== e && "linkType" !== e && "linkName" !== e && "linkURL" !== e && "bodyClickTarget" !== e && "bodyClickFunction" !== e || (b["!" + e] = 1)
				};
				a.$b = function(a) {
					var c, d, f, e, g, h = 0,
						l, m = "",
						n = "";
					if (a && 255 < a.length && (c = "" + a, d = c.indexOf("?"), 0 < d && (l = c.substring(d + 1), c = c.substring(0,
							d), e = c.toLowerCase(), f = 0, "http://" == e.substring(0, 7) ? f += 7 : "https://" == e.substring(0, 8) && (f += 8), d = e.indexOf("/", f), 0 < d && (e = e.substring(f, d), g = c.substring(d), c = c.substring(0, d), 0 <= e.indexOf("google") ? h = ",q,ie,start,search_key,word,kw,cd," : 0 <= e.indexOf("yahoo.co") ? h = ",p,ei," : 0 <= e.indexOf("baidu.") && (h = ",wd,word,"), h && l)))) {
						if ((a = l.split("\x26")) && 1 < a.length) {
							for (f = 0; f < a.length; f++) e = a[f], d = e.indexOf("\x3d"), 0 < d && 0 <= h.indexOf("," + e.substring(0, d) + ",") ? m += (m ? "\x26" : "") + e : n += (n ? "\x26" : "") + e;
							m && n ? l = m + "\x26" +
								n : n = ""
						}
						d = 253 - (l.length - n.length) - c.length;
						a = c + (0 < d ? g.substring(0, d) : "") + "?" + l
					}
					return a
				};
				a.mb = function(b) {
					var c = a.d.visibilityState,
						d = ["webkitvisibilitychange", "visibilitychange"];
					c || (c = a.d.webkitVisibilityState);
					if (c && "prerender" == c) {
						if (b)
							for (c = 0; c < d.length; c++) a.d.addEventListener(d[c], function() {
								var c = a.d.visibilityState;
								c || (c = a.d.webkitVisibilityState);
								"visible" == c && b()
							});
						return !1
					}
					return !0
				};
				a.ga = !1;
				a.H = !1;
				a.Pb = function() {
					a.H = !0;
					a.q()
				};
				a.K = !1;
				a.Qb = function(b) {
					a.marketingCloudVisitorID = b.MCMID;
					a.visitorOptedOut =
						b.MCOPTOUT;
					a.analyticsVisitorID = b.MCAID;
					a.audienceManagerLocationHint = b.MCAAMLH;
					a.audienceManagerBlob = b.MCAAMB;
					a.K = !1;
					a.q()
				};
				a.lb = function(b) {
					a.maxDelay || (a.maxDelay = 250);
					return a.v("_d") ? (b && setTimeout(function() {
						b()
					}, a.maxDelay), !1) : !0
				};
				a.ea = !1;
				a.G = !1;
				a.Ga = function() {
					a.G = !0;
					a.q()
				};
				a.isReadyToTrack = function() {
					var b = !0;
					if (!a.Ab() || !a.yb()) return !1;
					a.Cb() || (b = !1);
					a.Fb() || (b = !1);
					a.nb() || (b = !1);
					return b
				};
				a.Ab = function() {
					a.ga || a.H || (a.mb(a.Pb) ? a.H = !0 : a.ga = !0);
					return a.ga && !a.H ? !1 : !0
				};
				a.yb = function() {
					var b =
						a.Ca();
					if (b)
						if (a.ya || a.fa)
							if (a.ya) {
								if (!b.isApproved(b.Categories.ANALYTICS)) return !1
							} else return !1;
					else return b.fetchPermissions(a.Hb, !0), a.fa = !0, !1;
					return !0
				};
				a.X = function(b) {
					var c = a.Ca();
					return c && !c.isApproved(c.Categories[b]) ? !1 : !0
				};
				a.Ca = function() {
					return h.adobe && h.adobe.optIn ? h.adobe.optIn : null
				};
				a.ca = !0;
				a.Cb = function() {
					var b = a.W();
					if (!b || !b.getVisitorValues) return !0;
					a.ca && (a.ca = !1, a.K || (a.K = !0, b.getVisitorValues(a.Qb)));
					return !a.K
				};
				a.W = function() {
					var b = a.visitor;
					b && !b.isAllowed() && (b = null);
					return b
				};
				a.Fb = function() {
					a.ea || a.G || (a.lb(a.Ga) ? a.G = !0 : a.ea = !0);
					return a.ea && !a.G ? !1 : !0
				};
				a.nb = function() {
					a.J || a.clientHints || a.ob();
					return a.clientHints
				};
				a.fa = !1;
				a.Hb = function() {
					a.fa = !1;
					a.ya = !0
				};
				a.j = q;
				a.r = 0;
				a.callbackWhenReadyToTrack = function(b, c, d) {
					var f;
					f = {};
					f.Ub = b;
					f.Tb = c;
					f.Rb = d;
					a.j == q && (a.j = []);
					a.j.push(f);
					0 == a.r && (a.r = setInterval(a.q, 100))
				};
				a.q = function() {
					var b;
					if (a.isReadyToTrack() && (a.Nb(), a.j != q))
						for (; 0 < a.j.length;) b = a.j.shift(), b.Tb.apply(b.Ub, b.Rb)
				};
				a.Nb = function() {
					a.r && (clearInterval(a.r),
						a.r = 0)
				};
				a.za = function(b) {
					var c, d = {};
					a.tc(d);
					if (b != q)
						for (c in b) d[c] = b[c];
					a.callbackWhenReadyToTrack(a, a.Ma, [d]);
					a.Ja()
				};
				a.bc = function() {
					var b = a.cookieRead("s_fid"),
						c = "",
						d = "",
						f;
					f = 8;
					var e = 4;
					if (!b || 0 > b.indexOf("-")) {
						for (b = 0; 16 > b; b++) f = Math.floor(Math.random() * f), c += "0123456789ABCDEF".substring(f, f + 1), f = Math.floor(Math.random() * e), d += "0123456789ABCDEF".substring(f, f + 1), f = e = 16;
						b = c + "-" + d
					}
					a.cookieWrite("s_fid", b, 1) || (b = 0);
					return b
				};
				a.Ma = function(b) {
					var c = new Date,
						d = "s" + Math.floor(c.getTime() / 108E5) % 10 + Math.floor(1E13 *
							Math.random()),
						f = c.getYear(),
						f = "t\x3d" + a.escape(c.getDate() + "/" + c.getMonth() + "/" + (1900 > f ? f + 1900 : f) + " " + c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds() + " " + c.getDay() + " " + c.getTimezoneOffset()),
						e = a.W(),
						g;
					b && (g = a.U(b, 1));
					a.ic() && !a.visitorOptedOut && (a.Da() || (a.fid = a.bc()), a.kc(), a.usePlugins && a.doPlugins && a.doPlugins(a), a.account && (a.abort || (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(c.getTime() / 1E3)), b = h.location, a.pageURL || (a.pageURL = b.href ? b.href : b), a.referrer || a.hb || (b = a.Util.getQueryParam("adobe_mc_ref",
						null, null, !0), a.referrer = b || void 0 === b ? void 0 === b ? "" : b : p.document.referrer), a.hb = 1, !a.referrer && a.da && (a.referrer = a.da), a.da = 0, a.referrer = a.$b(a.referrer), a.v("_g")), a.fc() && !a.abort && (e && a.X("TARGET") && !a.supplementalDataID && e.getSupplementalDataID && (a.supplementalDataID = e.getSupplementalDataID("AppMeasurement:" + a._in, a.expectSupplementalData ? !1 : !0)), a.X("AAM") || (a.contextData["cm.ssf"] = 1), a.gc(), a.Ib(), f += a.ec(), a.Eb(d, f), a.v("_t"), a.referrer = "", a.contextData && a.contextData.excCodes && (a.contextData.excCodes =
						0))));
					a.referrer && (a.da = a.referrer);
					a.Ja();
					g && a.U(g, 1)
				};
				a.t = a.track = function(b, c) {
					c && a.U(c);
					a.ca = !0;
					a.isReadyToTrack() ? null != a.j && 0 < a.j.length ? (a.za(b), a.q()) : a.Ma(b) : a.za(b)
				};
				a.Ib = function() {
					a.writeSecureCookies && !a.ssl && a.ib()
				};
				a.ib = function() {
					a.contextData.excCodes = a.contextData.excCodes || [];
					a.contextData.excCodes.push(1)
				};
				a.Ja = function() {
					a.abort = a.supplementalDataID = a.timestamp = a.pageURLRest = a.linkObject = a.clickObject = a.linkURL = a.linkName = a.linkType = h.s_objectID = a.pe = a.pev1 = a.pev2 = a.pev3 = a.e =
						a.lightProfileID = a.useBeacon = a.referrer = 0
				};
				a.Ia = [];
				a.registerPreTrackCallback = function(b) {
					for (var c = [], d = 1; d < arguments.length; d++) c.push(arguments[d]);
					"function" == typeof b ? a.Ia.push([b, c]) : a.debugTracking && a.log("Warning, Non function type passed to registerPreTrackCallback")
				};
				a.sb = function(b) {
					a.Ba(a.Ia, b)
				};
				a.Ha = [];
				a.registerPostTrackCallback = function(b) {
					for (var c = [], d = 1; d < arguments.length; d++) c.push(arguments[d]);
					"function" == typeof b ? a.Ha.push([b, c]) : a.debugTracking && a.log("Warning, Non function type passed to registerPostTrackCallback")
				};
				a.rb = function(b) {
					a.Ba(a.Ha, b)
				};
				a.Ba = function(b, c) {
					if ("object" == typeof b)
						for (var d = 0; d < b.length; d++) {
							var f = b[d][0],
								e = b[d][1].slice();
							e.unshift(c);
							if ("function" == typeof f) try {
								f.apply(null, e)
							} catch (g) {
								a.debugTracking && a.log(g.message)
							}
						}
				};
				a.tl = a.trackLink = function(b, c, d, f, e) {
					a.linkObject = b;
					a.linkType = c;
					a.linkName = d;
					e && (a.bodyClickTarget = b, a.bodyClickFunction = e);
					return a.track(f)
				};
				a.trackLight = function(b, c, d, f) {
					a.lightProfileID = b;
					a.lightStoreForSeconds = c;
					a.lightIncrementBy = d;
					return a.track(f)
				};
				a.clearVars =
					function() {
						var b, c;
						for (b = 0; b < a.i.length; b++)
							if (c = a.i[b], "prop" == c.substring(0, 4) || "eVar" == c.substring(0, 4) || "hier" == c.substring(0, 4) || "list" == c.substring(0, 4) || "channel" == c || "events" == c || "eventList" == c || "products" == c || "productList" == c || "purchaseID" == c || "transactionID" == c || "state" == c || "zip" == c || "campaign" == c) a[c] = void 0
					};
				a.tagContainerMarker = "";
				a.Eb = function(b, c) {
					var d = a.tb() + "/" + b + "?AQB\x3d1\x26ndh\x3d1\x26pf\x3d1\x26" + (a.Fa() ? "callback\x3ds_c_il[" + a._in + "].doPostbacks\x26et\x3d1\x26" : "") + c + "\x26AQE\x3d1";
					a.sb(d);
					a.V ? a.Ob(h.sessionStorage, d) : (a.Ka(), a.Aa(d), a.I())
				};
				a.tb = function() {
					var b = a.ub();
					return "http" + (a.ssl ? "s" : "") + "://" + b + "/b/ss/" + a.account + "/" + (a.mobile ? "5." : "") + (a.Fa() ? "10" : "1") + "/JS-" + a.version + (a.nc ? "T" : "") + (a.tagContainerMarker ? "-" + a.tagContainerMarker : "")
				};
				a.Fa = function() {
					return a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks
				};
				a.ub = function() {
					var b = a.dc,
						c = a.trackingServer;
					c ? a.trackingServerSecure && a.ssl && (c = a.trackingServerSecure) : (b = b ? ("" + b).toLowerCase() : "d1",
						"d1" == b ? b = "112" : "d2" == b && (b = "122"), c = a.wb() + "." + b + ".2o7.net");
					return c
				};
				a.wb = function() {
					var b = a.visitorNamespace;
					b || (b = a.account.split(",")[0], b = b.replace(/[^0-9a-z]/gi, ""));
					return b
				};
				a.gb = /{(%?)(.*?)(%?)}/;
				a.sc = RegExp(a.gb.source, "g");
				a.Zb = function(b) {
					if ("object" == typeof b.dests)
						for (var c = 0; c < b.dests.length; ++c) {
							var d = b.dests[c];
							if ("string" == typeof d.c && "aa." == d.id.substr(0, 3))
								for (var f = d.c.match(a.sc), e = 0; e < f.length; ++e) {
									var g = f[e],
										h = g.match(a.gb),
										l = "";
									"%" == h[1] && "timezone_offset" == h[2] ? l = (new Date).getTimezoneOffset() :
										"%" == h[1] && "timestampz" == h[2] && (l = a.cc());
									d.c = d.c.replace(g, a.escape(l))
								}
						}
				};
				a.cc = function() {
					var b = new Date,
						c = new Date(6E4 * Math.abs(b.getTimezoneOffset()));
					return a.k(4, b.getFullYear()) + "-" + a.k(2, b.getMonth() + 1) + "-" + a.k(2, b.getDate()) + "T" + a.k(2, b.getHours()) + ":" + a.k(2, b.getMinutes()) + ":" + a.k(2, b.getSeconds()) + (0 < b.getTimezoneOffset() ? "-" : "+") + a.k(2, c.getUTCHours()) + ":" + a.k(2, c.getUTCMinutes())
				};
				a.k = function(a, c) {
					return (Array(a + 1).join(0) + c).slice(-a)
				};
				a.ua = {};
				a.doPostbacks = function(b) {
					if ("object" ==
						typeof b)
						if (a.Zb(b), "object" == typeof a.AudienceManagement && "function" == typeof a.AudienceManagement.isReady && a.AudienceManagement.isReady() && "function" == typeof a.AudienceManagement.passData) a.AudienceManagement.passData(b);
						else if ("object" == typeof b && "object" == typeof b.dests)
						for (var c = 0; c < b.dests.length; ++c) {
							var d = b.dests[c];
							"object" == typeof d && "string" == typeof d.c && "string" == typeof d.id && "aa." == d.id.substr(0, 3) && (a.ua[d.id] = new Image, a.ua[d.id].alt = "", a.ua[d.id].src = d.c)
						}
				};
				a.bufferRequests = function(b) {
					b ||
						void 0 === b ? a.qb() : a.pb()
				};
				a.qb = function() {
					a.o(a.w.sessionStorage) ? a.V = !0 : a.log("Warning, session storage is not available. Requests will not be buffered.")
				};
				a.pb = function() {
					a.V && a.Ka();
					a.V = !1
				};
				a.o = function(a) {
					var c = !0;
					a && a.setItem && h.JSON || (c = !1);
					return c
				};
				a.Ka = function() {
					var b = a.aa(h.sessionStorage);
					if (b) {
						for (var c = 0; c < b.length; c++) a.Aa(b[c]);
						a.xa(h.sessionStorage);
						a.I()
					}
				};
				a.Aa = function(b) {
					a.g || a.xb();
					a.g.push(b);
					a.na = a.B();
					a.fb()
				};
				a.Ob = function(b, c) {
					var d = a.aa(b) || [];
					d.push(c);
					a.La(b, d)
				};
				a.La = function(b,
					c) {
					try {
						b.setItem(a.ba(), h.JSON.stringify(c))
					} catch (d) {}
				};
				a.aa = function(b) {
					var c, d;
					if (a.o(b)) {
						try {
							(d = b.getItem(a.ba())) && (c = h.JSON.parse(d))
						} catch (f) {}
						return c
					}
				};
				a.xb = function() {
					a.ta() && (a.g = a.aa(h.localStorage));
					a.g || (a.g = [])
				};
				a.xa = function(b) {
					if (a.o(b)) try {
						b.removeItem(a.ba())
					} catch (c) {}
				};
				a.ta = function() {
					var b = !0;
					a.trackOffline && a.storageFilename && a.o(h.localStorage) || (b = !1);
					return b
				};
				a.Va = function() {
					var b = 0;
					a.g && (b = a.g.length);
					a.p && b++;
					return b
				};
				a.I = function() {
					if (a.p && (a.A && a.A.complete && a.A.D &&
							a.A.T(), a.p)) return;
					a.Wa = q;
					if (a.ra) a.na > a.P && a.cb(a.g), a.va(500);
					else {
						var b = a.Sb();
						if (0 < b) a.va(b);
						else if (b = a.Ta()) a.p = 1, a.jc(b), a.mc(b)
					}
				};
				a.va = function(b) {
					a.Wa || (b || (b = 0), a.Wa = setTimeout(a.I, b))
				};
				a.Sb = function() {
					var b;
					if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
					b = a.B() - a.ab;
					return a.offlineThrottleDelay < b ? 0 : a.offlineThrottleDelay - b
				};
				a.Ta = function() {
					if (a.g && 0 < a.g.length) return a.g.shift()
				};
				a.jc = function(b) {
					if (a.debugTracking) {
						var c = "AppMeasurement Debug: " + b;
						b = b.split("\x26");
						var d;
						for (d =
							0; d < b.length; d++) c += "\n\t" + a.unescape(b[d]);
						a.log(c)
					}
				};
				a.Da = function() {
					return a.marketingCloudVisitorID || a.analyticsVisitorID
				};
				a.Z = !1;
				var t;
				try {
					t = JSON.parse('{"x":"y"}')
				} catch (v) {
					t = null
				}
				t && "y" == t.x ? (a.Z = !0, a.Y = function(a) {
					return JSON.parse(a)
				}) : h.$ && h.$.parseJSON ? (a.Y = function(a) {
					return h.$.parseJSON(a)
				}, a.Z = !0) : a.Y = function() {
					return null
				};
				a.mc = function(b) {
					var c, d, f;
					a.zb(b) && (d = 1, c = {
						send: function(b) {
							a.useBeacon = !1;
							navigator.sendBeacon(b) ? c.T() : c.la()
						}
					});
					!c && a.Da() && 2047 < b.length && (a.kb() && (d = 2, c =
						new XMLHttpRequest), c && (a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks) && (a.Z ? c.Oa = !0 : c = 0));
					!c && a.rc && (b = b.substring(0, 2047));
					!c && a.d.createElement && (0 != a.usePostbacks || a.AudienceManagement && a.AudienceManagement.isReady()) && (c = a.d.createElement("SCRIPT")) && "async" in c && ((f = (f = a.d.getElementsByTagName("HEAD")) && f[0] ? f[0] : a.d.body) ? (c.type = "text/javascript", c.setAttribute("async", "async"), d = 3) : c = 0);
					c || (c = new Image, d = 4, c.alt = "", c.abort || "undefined" === typeof h.InstallTrigger ||
						(c.abort = function() {
							c.src = q
						}));
					c.bb = Date.now();
					c.Qa = function() {
						try {
							c.D && (clearTimeout(c.D), c.D = 0)
						} catch (a) {}
					};
					c.onload = c.T = function() {
						if (!0 !== c.Vb && (c.Vb = !0, c.bb && (a.oa = Date.now() - c.bb), a.rb(b), c.Qa(), a.Xb(), a.ha(), a.p = 0, a.I(), c.Oa)) {
							c.Oa = !1;
							try {
								a.doPostbacks(a.Y(c.responseText))
							} catch (d) {}
						}
					};
					c.onabort = c.onerror = c.la = function() {
						c.Qa();
						(a.trackOffline || a.ra) && a.p && a.g.unshift(a.Wb);
						a.p = 0;
						a.na > a.P && a.cb(a.g);
						a.ha();
						a.va(500)
					};
					c.onreadystatechange = function() {
						4 == c.readyState && (200 == c.status ? c.T() : c.la())
					};
					a.ab = a.B();
					if (1 === d) c.send(b);
					else if (2 === d) f = b.indexOf("?"), d = b.substring(0, f), f = b.substring(f + 1), f = f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, ""), c.open("POST", d, !0), c.withCredentials = !0, c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c.send(f);
					else if (c.src = b, 3 === d) {
						if (a.Za) try {
							f.removeChild(a.Za)
						} catch (e) {}
						f.firstChild ? f.insertBefore(c, f.firstChild) : f.appendChild(c);
						a.Za = a.A
					}
					c.D = setTimeout(function() {
						c.D && (c.complete ? c.T() : (a.trackOffline && c.abort && c.abort(), c.la()))
					}, 5E3);
					a.Wb = b;
					a.A = h["s_i_" + a.replace(a.account, ",", "_")] = c;
					if (a.useForcedLinkTracking && a.L || a.bodyClickFunction) a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250), a.ia = setTimeout(a.ha, a.forcedLinkTrackingTimeout)
				};
				a.zb = function(b) {
					var c = !1;
					navigator.sendBeacon && (a.Bb(b) ? c = !0 : a.useBeacon && (c = !0));
					a.Kb(b) && (c = !1);
					return c
				};
				a.Bb = function(a) {
					return a && 0 < a.indexOf("pe\x3dlnk_e") ? !0 : !1
				};
				a.Kb = function(a) {
					return 64E3 <= a.length
				};
				a.kb = function() {
					return "undefined" !== typeof XMLHttpRequest && "withCredentials" in
						new XMLHttpRequest ? !0 : !1
				};
				a.Xb = function() {
					!a.ta() || a.$a > a.P || (a.xa(h.localStorage), a.$a = a.B())
				};
				a.cb = function(b) {
					a.ta() && (a.fb(), a.La(h.localStorage, b), a.P = a.B())
				};
				a.fb = function() {
					if (a.trackOffline) {
						if (!a.offlineLimit || 0 >= a.offlineLimit) a.offlineLimit = 10;
						for (; a.g.length > a.offlineLimit;) a.Ta()
					}
				};
				a.forceOffline = function() {
					a.ra = !0
				};
				a.forceOnline = function() {
					a.ra = !1
				};
				a.ba = function() {
					return a.storageFilename + "-" + a.visitorNamespace + a.account
				};
				a.B = function() {
					return (new Date).getTime()
				};
				a.Xa = function(a) {
					a =
						a.toLowerCase();
					return 0 != a.indexOf("#") && 0 != a.indexOf("about:") && 0 != a.indexOf("opera:") && 0 != a.indexOf("javascript:") ? !0 : !1
				};
				a.setTagContainer = function(b) {
					var c, d, f;
					a.nc = b;
					for (c = 0; c < a._il.length; c++)
						if ((d = a._il[c]) && "s_l" == d._c && d.tagContainerName == b) {
							a.U(d);
							if (d.lmq)
								for (c = 0; c < d.lmq.length; c++) f = d.lmq[c], a.loadModule(f.n);
							if (d.ml)
								for (f in d.ml)
									if (a[f])
										for (c in b = a[f], f = d.ml[f], f) !Object.prototype[c] && ("function" != typeof f[c] || 0 > ("" + f[c]).indexOf("s_c_il")) && (b[c] = f[c]);
							if (d.mmq)
								for (c = 0; c < d.mmq.length; c++) f =
									d.mmq[c], a[f.m] && (b = a[f.m], b[f.f] && "function" == typeof b[f.f] && (f.a ? b[f.f].apply(b, f.a) : b[f.f].apply(b)));
							if (d.tq)
								for (c = 0; c < d.tq.length; c++) a.track(d.tq[c]);
							d.s = a;
							break
						}
				};
				a.Util = {
					urlEncode: a.escape,
					urlDecode: a.unescape,
					cookieRead: a.cookieRead,
					cookieWrite: a.cookieWrite,
					getQueryParam: function(b, c, d, f) {
						var e, g = "";
						c || (c = a.pageURL ? a.pageURL : h.location);
						d = d ? d : "\x26";
						if (!b || !c) return g;
						c = "" + c;
						e = c.indexOf("?");
						if (0 > e) return g;
						c = d + c.substring(e + 1) + d;
						if (!f || !(0 <= c.indexOf(d + b + d) || 0 <= c.indexOf(d + b + "\x3d" + d))) {
							e =
								c.indexOf("#");
							0 <= e && (c = c.substr(0, e) + d);
							e = c.indexOf(d + b + "\x3d");
							if (0 > e) return g;
							c = c.substring(e + d.length + b.length + 1);
							e = c.indexOf(d);
							0 <= e && (c = c.substring(0, e));
							0 < c.length && (g = a.unescape(c));
							return g
						}
					},
					getIeVersion: function() {
						return document.documentMode ? document.documentMode : a.Ea() ? 7 : null
					}
				};
				a.F = "supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData contextData.cm.ssf contextData.opt.dmp contextData.opt.sell clientHints currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
				a.i = a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));
				a.pa = "timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");
				a.Q = a.pa.slice(0);
				a.Na = "account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay storageFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies decodeLinkParameters useLinkTrackSessionStorage collectHighEntropyUserAgentHints trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction bufferRequests AudienceManagement".split(" ");
				for (m = 0; 250 >= m; m++) 76 > m && (a.i.push("prop" + m), a.Q.push("prop" + m)), a.i.push("eVar" + m), a.Q.push("eVar" + m), 6 > m && a.i.push("hier" + m), 4 > m && a.i.push("list" + m);
				m = "pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");
				a.i = a.i.concat(m);
				a.F = a.F.concat(m);
				a.ssl = 0 <= h.location.protocol.toLowerCase().indexOf("https");
				a.charSet = "UTF-8";
				a.contextData = {};
				a.wa = ["architecture",
					"bitness", "model", "platformVersion", "wow64"
				];
				a.writeSecureCookies = !1;
				a.collectHighEntropyUserAgentHints = !1;
				a.offlineThrottleDelay = 0;
				a.storageFilename = "AppMeasurement.requests";
				a.R = "s_sq";
				a.ab = 0;
				a.na = 0;
				a.P = 0;
				a.$a = 0;
				a.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
				a.w = h;
				a.d = h.document;
				a.ha = function() {
					a.ia && (h.clearTimeout(a.ia), a.ia = q);
					a.bodyClickTarget && a.L && a.bodyClickTarget.dispatchEvent(a.L);
					a.bodyClickFunction && ("function" == typeof a.bodyClickFunction ? a.bodyClickFunction() :
						a.bodyClickTarget && a.bodyClickTarget.href && (a.d.location = a.bodyClickTarget.href));
					a.bodyClickTarget = a.L = a.bodyClickFunction = 0
				};
				a.eb = function() {
					a.b = a.d.body;
					a.b ? (a.u = function(b) {
							var c, d, f, e, g;
							if (!(a.d && a.d.getElementById("cppXYctnr") || b && b["s_fe_" + a._in])) {
								if (a.Pa)
									if (a.useForcedLinkTracking) a.b.removeEventListener("click", a.u, !1);
									else {
										a.b.removeEventListener("click", a.u, !0);
										a.Pa = a.useForcedLinkTracking = 0;
										return
									}
								else a.useForcedLinkTracking = 0;
								a.clickObject = b.srcElement ? b.srcElement : b.target;
								try {
									if (!a.clickObject ||
										a.O && a.O == a.clickObject || !(a.clickObject.tagName || a.clickObject.parentElement || a.clickObject.parentNode)) a.clickObject = 0;
									else {
										var k = a.O = a.clickObject;
										a.ma && (clearTimeout(a.ma), a.ma = 0);
										a.ma = setTimeout(function() {
											a.O == k && (a.O = 0)
										}, 1E4);
										f = a.Va();
										a.track();
										if (f < a.Va() && a.useForcedLinkTracking && b.target) {
											for (e = b.target; e && e != a.b && "A" != e.tagName.toUpperCase() && "AREA" != e.tagName.toUpperCase();) e = e.parentNode;
											if (e && (g = e.href, a.Xa(g) || (g = 0), d = e.target, b.target.dispatchEvent && g && (!d || "_self" == d || "_top" == d ||
													"_parent" == d || h.name && d == h.name))) {
												try {
													c = a.d.createEvent("MouseEvents")
												} catch (l) {
													c = new h.MouseEvent
												}
												if (c) {
													try {
														c.initMouseEvent("click", b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget)
													} catch (m) {
														c = 0
													}
													c && (c["s_fe_" + a._in] = c.s_fe = 1, b.stopPropagation(), b.stopImmediatePropagation && b.stopImmediatePropagation(), b.preventDefault(), a.bodyClickTarget = b.target, a.L = c)
												}
											}
										}
									}
								} catch (n) {
									a.clickObject = 0
								}
							}
						}, a.b && a.b.attachEvent ?
						a.b.attachEvent("onclick", a.u) : a.b && a.b.addEventListener && (navigator && (0 <= navigator.userAgent.indexOf("WebKit") && a.d.createEvent || 0 <= navigator.userAgent.indexOf("Firefox/2") && h.MouseEvent) && (a.Pa = 1, a.useForcedLinkTracking = 1, a.b.addEventListener("click", a.u, !0)), a.b.addEventListener("click", a.u, !1))) : setTimeout(a.eb, 30)
				};
				a.rc = a.Ea();
				a.Yb();
				a.yc || (r ? a.setAccount(r) : a.log("Error, missing Report Suite ID in AppMeasurement initialization"), a.eb(), a.loadModule("ActivityMap"))
			}
			window.s_gi = function(r) {
				var a,
					h = window.s_c_il,
					q, p, m = r.split(","),
					s, u, t = 0;
				if (h)
					for (q = 0; !t && q < h.length;) {
						a = h[q];
						if ("s_c" == a._c && (a.account || a.oun))
							if (a.account && a.account == r) t = 1;
							else
								for (p = a.account ? a.account : a.oun, p = a.allAccounts ? a.allAccounts : p.split(","), s = 0; s < m.length; s++)
									for (u = 0; u < p.length; u++) m[s] == p[u] && (t = 1);
						q++
					}
				t ? a.setAccount && a.setAccount(r) : a = new AppMeasurement(r);
				return a
			};
			AppMeasurement.getInstance = s_gi;
			window.s_objectID || (window.s_objectID = 0);

			function s_pgicq() {
				var r = window,
					a = r.s_giq,
					h, q, p;
				if (a)
					for (h = 0; h < a.length; h++) q =
						a[h], p = s_gi(q.oun), p.setAccount(q.un), p.setTagContainer(q.tagContainerName);
				r.s_giq = 0
			}
			s_pgicq();
			adbFun.loadConfig = function() {
				Dell = window.Dell || {};
				Dell.Metrics = Dell.Metrics || {};
				Dell.Metrics.sc = Dell.Metrics.sc || {};
				var scMap = Dell.Metrics.sc;
				adb.scMap = Dell.Metrics.sc;
				var version = "AppMeasurement 2.25.0",
					env = "dev";
				try {
					var env = /dev/ig.test(Bootstrapper.ensightenOptions.publishPath) ? "dev" : ""
				} catch (e) {}
				var s_account = "dellglobalonlinemaster" + env;
				if (adbFun.getscMap("cms") === "ddh") s_account = "dellinternalsites" +
					env;
				s_dell = s_gi(s_account);
				adbFun.trackHash();
				if (!s_dell.localDoms) s_dell.localDoms = "javascript:,dell.,dell-solution.,getronicsservices.,delltrainingcentre.,dellworld.,activeevents.,dellstorage.,dellcomputer.,dellcomputers.,dellcustomerservice.,delldirect.,delldrivers.,dellfinancial.,dellfinancialservices.,dellideas.,dellnet.,dellstore.,dellsupport.,delltalk.,dellteam.,dellvistaupgrade.,dfsdirectsales.,inspiron.,defyboundaries.";
				if (!s_dell.supportDoms) s_dell.supportDoms = "docs.,dellcustomerservice.";
				s_dell.isPageLoad = true;
				s_dell.charSet = "UTF-8";
				s_dell.trackDownloadLinks = true;
				s_dell.trackExternalLinks = true;
				s_dell.trackInlineStats = true;
				s_dell.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,png,download,mp4,xlsm,dotx,docm,ppsx,vmdk,ovf,ova,mobi,epub,ibooks,gz,vmoapp,xlsb,ics,pptm";
				s_dell.linkInternalFilters = s_dell.localDoms + ",madebydell.,futurereadyeconomies.,info-event.,alienwarearena.,securitythinkingcap.,teksecurityblog.,yougeek.,privacyguidance.,jurinnov.,businessesgrow.,stoweboyd.,millennialceo.,govcloudnetwork.,dellassetlibrary.,picwebtools.,eloqua.,paywithdfs.,techpageone.,yourdellsolution.,imagebank.,dellnewscentre.,dellmodularservices.,techconcierge.,equallogic.,secureworks.,alienware.,alienwarearena.,alienwaregiveaway.,dell-ins.,easy2.,ideastorm.,livelook.,sellpoint.,syndication.intel.,triaddigital.,webcollage.,force.,salesforce.,delldigitalmodule.,dellcoloradvantage.,dellcloud.,dellcampaignbuilder.,kacenetworks.,dell-brand.,kace.,netexam.,iolo.,myalienware.,dellunite.,workforcetransformationtool.,dellworkforcestudy.,emc.,delltechnologies.,dellemcworld.,dellemcevents.,dell-brand.,compuindia.,nohold.,techdirect.,workforcetransformation.,sonicwall.,lithium.,dell-ambassador.,cvent.,delldesignsystem.,dellexpertprogram.";
				s_dell.linkLeaveQueryString = false;
				s_dell.ActionDepthTest = true;
				s_dell.eventList = "event81,event82,event83,event84,event85,event87,event56,event58,event21";
				s_dell.usePlugins = true;
				var doPluginsRanAlready = false;
				s_dell.getscMap = function(key) {
					return typeof scMap[key] != "undefined" ? scMap[key] : ""
				};
				try {
					if (typeof Visitor != "undefined") {
						s_dell.visitor = Visitor.getInstance("4DD80861515CAB990A490D45@AdobeOrg");
						setTimeout(adbFun.appendVisitorIDsTo, 0);
						s_dell.eVar71 = s_dell.visitor.getMarketingCloudVisitorID();
						if (!s_dell.eVar71) s_dell.eVar71 =
							typeof s_dell.visitor._fields !== "undefined" && typeof s_dell.visitor._fields.MCMID !== "undefined" ? s_dell.visitor._fields.MCMID : "NA";
						s_dell.contextData["MCMHash"] = adb.MCMHash;
						adbFun.hashGenerator(s_dell.eVar71).then((securedString) => {
							s_dell.contextData["MCMHash"] = securedString;
							adb["MCMHash"] = securedString
						});
						s_dell.eVar80 = s_dell.visitor.getAnalyticsVisitorID();
						s_dell.eVar98 = "clientsidecookie\x3d" + s_dell.visitor.isClientSideMarketingCloudVisitorID();
						s_dell.eVar99 = "mid\x3d" + s_dell.visitor.MCIDCallTimedOut() +
							"|aid\x3d" + s_dell.visitor.AnalyticsIDCallTimedOut() + "|aamid\x3d" + s_dell.visitor.AAMIDCallTimedOut()
					}
					if (s_dell_TLD) s_dell.cookieDomainPeriods = "3";
					if (s_dell.c_r("d_vi")) s_dell.eVar165 = s_dell.c_r("d_vi")
				} catch (e) {}
				adb.visitorAPIStatus = typeof Visitor != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing";
				adb.jQueryStatus = typeof jQuery != "undefined" ? "jQuery Present" : "jQuery  Missing";
				s_dell.eVar37 = adb.visitorAPIStatus + " | " + adb.jQueryStatus;

				function s_dell_doPlugins(s) {
					s.wd = window;
					s.cookieLifetime = "";
					s.prop60 =
						version;
					if (!s.server) s.server = parseUri(document.location.href).host.replace(/^www[0-9]*\./i, "");
					if (!doPluginsRanAlready) s.processLWP();
					s.events = s.events ? s.events : "";
					if (s.onDellCMS()) {
						var pn = s.getHTMLtag("meta", "metricspath").toLowerCase(),
							n = "";
						if (pn.indexOf("\x26eiwatch\x3d") > -1) pn = s.repl(pn, "\x26eiwatch\x3d", "");
						if (!s.pageName || s.pageName.indexOf("dellstore^") > -1) {
							s.pageName = "";
							if (document.location.href == "http://www.dell.com/" || pn == "www1.us.dell.com/us/en/gen//content^default/") s.pageName = "dell.com homepage";
							var pna = s.split(pn, "/");
							if (pna.length > 0 && pna.length < 6)
								if (!s.pageName) {
									if (pn.indexOf("//") > -1) pn = pn.substring(pn.indexOf("//") + 2);
									pn = pn.replace(/^www[0-9]*\./i, "");
									if (pn.indexOf("?") > -1) s.pageName = pn.substring(0, pn.indexOf("?"));
									else s.pageName = pn
								} var sc15_host = window.location.host;
							if (sc15_host.indexOf("dell") > -1) {
								var hostSplits = sc15_host.split(".");
								sc15_host = hostSplits[0] == "www" ? hostSplits[1] : hostSplits[0];
								switch (sc15_host) {
									case "configure":
									case "configure2":
									case "pc-configure":
									case "outlet":
									case "outletus":
									case "outletusps3":
									case "cart":
									case "premierecomm":
									case "ecomm":
									case "ecomm2":
									case "lastore":
									case "catalog":
									case "catalog2":
									case "premiercatalog":
									case "brstore":
									case "premierconfigure":
									case "pcommerce":
									case "premierconfig":
									case "aposconfigure":
										s.events =
											s.apl(s.events, "event83", ",", 2);
										break
								}
							}
							if (s.determineCMS() == "storm" && pn && !s.pageName) {
								var a7 = pna[7],
									a6 = pna[6];
								var ovf = af = false;
								var pn = dpn = n = "";
								for (var i = 1; i < 8; i++) {
									if (i == 4 && pna[0].indexOf("premier") > -1) {
										pn = s.apl(pn, "", ":", 0);
										af = true
									}
									if (i == 4 && pna[4].indexOf("rc") == 0 && !af) {
										pn = s.apl(pn, "", ":", 0);
										af = true
									}
									if (i == 6 && a6 && a7) {
										if (pna[6].indexOf("[") > -1) {
											pn = s.apl(pn, "", ":", 0);
											af = true
										}
									} else if (i == 6 && a6) {
										if (pna[6].indexOf("[") > -1) af = true
									} else if (i == 6) {
										pn = s.apl(pn, pna[i], ":", 0);
										af = true
									}
									if (i == 7 && a7) {
										if (a7.indexOf("category_id\x3d") >
											-1) {
											n = a7.substring(a7.indexOf("category_id\x3d") + 12);
											n = n.substring(0, n.indexOf("]"));
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("categoryid\x3d") > -1) {
											n = a7.substring(a7.indexOf("categoryid\x3d") + 11);
											n = n.substring(0, n.indexOf("]"));
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("sku\x3d") > -1 && pn.indexOf("addedtocart") == -1) {
											n = a7.substring(a7.indexOf("sku\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn =
													s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("oc\x3d") > -1 && pna[0].indexOf("premier") == -1 && pn.indexOf("dellstore^config") > -1) {
											n = a7.substring(a7.indexOf("oc\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("product_id\x3d") > -1) {
											n = a7.substring(a7.indexOf("product_id\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf =
													true;
												af = true
											}
										}
										if (a7.indexOf("productid\x3d") > -1) {
											n = a7.substring(a7.indexOf("productid\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("[~id\x3d") > -1 && pn.indexOf("imagedirect") == -1) {
											n = a7.substring(a7.indexOf("id\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("[id\x3d") > -1 && pn.indexOf("imagedirect") == -1) {
											n = a7.substring(a7.indexOf("id\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("topic\x3d") > -1) {
											n = a7.substring(a7.indexOf("topic\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												pn = s.apl(pn, n, "", 0);
												af = true
											} else {
												pn = s.apl(pn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										dpn = pn;
										if (a7.indexOf("section\x3d") > -1) {
											n = a7.substring(a7.indexOf("section\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												dpn = s.apl(dpn, n, "", 0);
												af = true
											} else {
												dpn = s.apl(dpn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("tab\x3d") > -1) {
											n = a7.substring(a7.indexOf("tab\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												dpn = s.apl(dpn, n, "", 0);
												af = true
											} else {
												dpn = s.apl(dpn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("page\x3d") > -1) {
											n = a7.substring(a7.indexOf("page\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												dpn = s.apl(dpn, n, "", 0);
												af = true
											} else {
												dpn = s.apl(dpn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("brandid\x3d") > -1) {
											n = a7.substring(a7.indexOf("brandid\x3d"));
											n = "[" + n.substring(0, n.indexOf("]") + 1);
											if (ovf) {
												dpn = s.apl(dpn, n, "", 0);
												af = true
											} else {
												dpn = s.apl(dpn, n, ":", 0);
												ovf = true;
												af = true
											}
										}
										if (a7.indexOf("cat\x3d") > -1) {
											n = a7.substring(a7.indexOf("cat\x3d") + 4);
											n = n.substring(0, n.indexOf("]"));
											if (pna[0].indexOf("search") > -1) s.eVar9 = n;
											af = true
										}
									}
									if (!af && i != 7) pn = s.apl(pn, pna[i], ":", 0);
									af = false
								}
								if (pn.length - 1 == pn.lastIndexOf(":")) pn = pn.substring(0, pn.length - 1);
								if (pn.indexOf(":undefined") > -1) pn = pn.substring(0, pn.indexOf(":undefined"));
								if (dpn.length - 1 == dpn.lastIndexOf(":")) dpn = dpn.substring(0, dpn.length - 1);
								if (pn.indexOf("dellstore:") ==
									0) pn = pn.substring(10, pn.length);
								if (dpn.indexOf("dellstore:") == 0) dpn = dpn.substring(10, dpn.length);
								s.pageName = pn;
								dpn = dpn ? s.prop13 = dpn : s.prop13 = pn
							}
						}
						if (!s.pageName) s.pageName = s_dell.getPNfromURL();
						if (!s.prop13) s.prop13 = s.pageName;
						if (s.prop29 == "unknown" || !s.prop29) s.prop29 = "unknown:" + s.server;
						if (s.pageName.indexOf("ajax") > -1)
							if (s.prop13.indexOf(":ajax") > -1) s.pageName = s.prop13.substring(0, s.prop13.indexOf(":ajax"));
							else {
								s.pageName = s.prop13;
								s.prop13 = s.prop13 + ":ajax"
							}
					} else {
						if (!s.pageName) s.pageName = s.getPNfromURL();
						if (!s.prop13) s.prop13 = s.pageName;
						if (s.pageName.indexOf("ideastorm") > -1) {
							s_dell.getQueryParam("Type") ? s_dell.pageName += "|type:" + s_dell.getQueryParam("Type") : "";
							s_dell.getQueryParam("Filter") ? s_dell.pageName += "|filter:" + s_dell.getQueryParam("Filter") : "";
							if (s_dell.getQueryParam("cat")) s_dell.pageName += "|cat:" + s_dell.getQueryParam("cat");
							else if (s_dell.getQueryParam("sta")) s_dell.pageName += "|status:" + s_dell.getQueryParam("sta");
							s_dell.prop13 = s_dell.pageName + (s_dell.getQueryParam("lsi") ? "|:sort:" + s_dell.getQueryParam("lsi") :
								"")
						}
					}
					if (typeof s.linkType == "undefined" || s.linkType == "e") {
						s.gpv_pn = s.getPreviousValue(s.pageName, "gpv_pn", "");
						if (s.gpv_pn == "no value") s.gpv_pn = ""
					}
					var spg = false;
					if (!spg && s.server.indexOf("dell") >= 0 && s.server.indexOf("support") >= 0) spg = true;
					if (!spg && s.server.match("(" + s.supportDoms.replace(/,/gi, "|").replace(/\./gi, "\\.") + ")")) spg = true;
					if (!spg && s.determineCMS() == "nextgen") {
						var urlpn = document.location.pathname.toLowerCase();
						if (urlpn) {
							if (!spg && urlpn.indexOf("/order-support") >= 0) spg = true;
							if (!spg && urlpn.indexOf("/support") >=
								0) spg = true
						}
					}
					s.events = s.apl(s.events, spg ? "event22" : "event23", ",", 2);
					s.events = s.apl(s.events, spg ? "event85" : "event86", ",", 2);
					if (typeof s.linkType != "undefined" && s.linkType != 0) {
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop49", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop46", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "server", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop5", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop13", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop20", ",", 2);
						s.linkTrackVars =
							s.apl(s.linkTrackVars, "events", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event22", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event23", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event81", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event82", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event83", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event84", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event85", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event86",
							",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event87", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop61", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar30", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar31", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar37", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar40", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar71,eVar80", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar165", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop53", ",",
							2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "eVar114", ",", 2)
					}
					if (s.onDellCMS()) {
						s.prop7 = s.getscMap("searchTerm");
						s.ss_kw = s.getHTMLtag("input", "kw", "id", "value");
						s.ss_rff = s.getHTMLtag("input", "rff", "id", "value");
						s.es_on = s.getHTMLtag("input", "order_number", "name", "value");
						if (s.es_on) s.prop22 = s.es_on;
						if (s.getscMap("searchterm")) s.prop7 = s_dell.getscMap("cms") + ":" + s.getscMap("searchterm");
						if (s.ss_kw && s.ss_rff)
							if (s.ss_rff == "1") s.prop7 = s.ss_kw;
							else if (s.ss_rff == "2") s.prop7 = "reclink:" + s.ss_kw;
						else if (s.ss_rff ==
							"3") s.prop7 = "othercat:" + s.ss_kw;
						else {
							if (s.ss_rff == "0") s.prop7 = "null:" + s.ss_kw
						} else if (s.ss_dkw) s.prop7 = "redirect:" + s.ss_dkw;
						if (s.prop7) {
							s.prop7 = s.prop7.toLowerCase();
							s.eVar36 = s.prop7;
							var t_search = s.getValOnce(s.eVar36, "v36", 0);
							if (t_search) {
								s.events = s.apl(s.events, "event6", ",", 2);
								s.prop42 = s.gpv_pn
							}
						}
						s.prop43 = s.getQueryParam("ID", "", "?" + gC("SITESERVER"));
						if (!s.prop17) s.prop17 = s.getHTMLtag("input", "servicetagmetricsid", "id", "value");
						if (s.pageName.indexOf("order^recentorders") > -1 || s.pageName.indexOf("order^details") >
							-1 || s.pageName.indexOf("order^singlestatus") > -1 || s.pageName.indexOf("order^multiplestatus") > -1) s.events = s.apl(s.events, "event11", ",", 2);
						if (s.pageName.indexOf("dellstore^basket") > -1) {
							s.events = s.apl(s.events, "scView", ",", 2);
							s.events = s.apl(s.events, "event81", ",", 2)
						}
						if (s.pageName.indexOf("chkout") > -1) {
							s.events = s.apl(s.events, "scCheckout", ",", 2);
							s.events = s.apl(s.events, "event82", ",", 2)
						}
						if (s.pageName.indexOf("sna^productdetail") > -1 || s.pageName.indexOf("content^products^productdetails") > -1) {
							var prod = s.getQueryParam("sku,oc");
							s.events = s.events ? s.events : "";
							if (s.events.indexOf("prodView,event2") > -1) s.events = s.repl(s.events, "prodView,event2", "");
							if (prod && s.events.indexOf("event3") > -1) {
								if (prod.indexOf(",")) prod = s.repl(prod, ",", ",;");
								s.products = s.apl(s.products, ";" + prod, ",", 2)
							} else if (prod) {
								prod = s.dedupVal("sku_oc", prod);
								if (prod) {
									if (prod.indexOf(",")) prod = s.repl(prod, ",", ",;");
									s.products = s.apl(s.products, ";" + prod, ",", 2);
									s.events = s.apl(s.events, "prodView", ",", 2);
									s.events = s.apl(s.events, "event2", ",", 2)
								}
							}
						}
						if (s.pageName.indexOf("dellstore^config") >
							-1) {
							var oc = s.getQueryParam("oc");
							if (oc) oc = s.dedupVal("ocstart", oc);
							if (oc) {
								s.products = s.apl(s.products, ";" + oc, ",", 2);
								s.events = s.apl(s.events, "event10", ",", 2);
								s.events = s.apl(s.events, "prodView", ",", 2);
								s.events = s.apl(s.events, "event2", ",", 2)
							}
						}
						if (s.pageName.indexOf("candyaisle") > -1) {
							var oc = s.getQueryParam("oc");
							if (oc) oc = s.dedupVal("ocstart", oc);
							if (oc) {
								s.products = s.apl(s.products, ";" + oc, ",", 2);
								s.events = s.apl(s.events, "event56", ",", 2)
							}
						}
						if (s.products) {
							s.products = s.events ? s.products : "";
							s.events = s.events ?
								s.events : "";
							if (s.products && s.products.indexOf(";") != 0 && s.events.indexOf("scAdd") > -1) {
								var p = s.products;
								if (p.indexOf(";") > -1 && p.indexOf(",;") > -1) s.products = ";" + p;
								else if (p.indexOf(";") > -1) {
									var pa = s.split(p, ";");
									p = ";" + pa[0];
									for (var i = 1; i < pa.length; i++) p += ",;" + pa[i];
									s.products = p
								} else s.products = ";" + p
							}
						}
						var loc = document.location.href;
						if (loc.indexOf("/financing/app.aspx") > -1 || loc.indexOf("/financing/us_ca/app.aspx") > -1 || loc.indexOf("/financing/process.aspx") > -1) s.events = s.apl(s.events, "event8", ",", 2);
						if (loc.indexOf("/financing/approved.aspx") >
							-1 || loc.indexOf("/financing/us_ca/approved.aspx") > -1 || loc.indexOf("/financing/declined.aspx") > -1 || loc.indexOf("/financing/reviewed.aspx") > -1 || loc.indexOf("/financing/us_ca/reviewed.aspx") > -1) s.events = s.apl(s.events, "event9", ",", 2);
						if (loc.indexOf("accessories") > -1 || s.pageName.indexOf("accessories") > -1) {
							s.events = s.apl(s.events, "event12", ",", 2);
							s.events = s.apl(s.events, "event84", ",", 2)
						}
						s.prop45 = s.c_r("GAAuth");
						if (!s.prop45) {
							var cookieArray = document.cookie.split(";");
							for (var i = 0; i < cookieArray.length; i++) {
								var cookie =
									cookieArray[i];
								while (cookie.charAt(0) == " ") cookie = cookie.substring(1, cookie.length);
								if (cookie.match(/gahot=/i)) s.prop45 = cookie.substring(6, cookie.length)
							}
						}
						if (!s.prop45) s.prop45 = s.c_r("aem_sto");
						if (!s.prop45) s.prop45 = s.c_r("dellTechSPToken");
						s.prop46 = s.c_r("Profile") ? s.c_r("Profile") : s.c_r("profile");
						s.prop48 = s.parseCookie("prt:Prof", "cnm,sid,cs", ",");
						s.prop16 = s.parseCookie("StormPCookie", "penv", ",");
						var bn_search = s.c_r("search_bn");
						s.prop16 = s.getQueryParam("penv", "", s.prop16);
						s.prop12 = s.prop45 ? "logged in" :
							"not logged in";
						if (s.pageName.indexOf("content^public^notfound") > -1 || s.pageName.indexOf("content^public^error") > -1) {
							if (!s.prop44) {
								var errQP = s.getQueryParam("searched");
								if (!errQP) errQP = s.getQueryParam("aspxerrorpath");
								s.prop44 = errQP ? errQP.replace(":80", "") : document.location.href
							}
							var refdom = parseUri(document.referrer).host.toLowerCase();
							if (refdom.indexOf("dell.") == -1 || !gC("lwp")) s.prop5 = "not set"
						}
						loc = document.location.href;
						if (loc.indexOf("ecomm") > -1 && s.eVar30) {
							s.eVar30 = "";
							if (s.events.indexOf("event10") >
								-1) {
								var eventlist = s.split(s.events, ",");
								for (i in eventlist)
									if (eventlist[i] == "event10") eventlist[i] = "";
								s.events = "";
								for (i in eventlist)
									if (eventlist[i]) s.events = s.apl(s.events, eventlist[i], ",", 2)
							}
						}
						loc = document.location.href;
						loc = (loc && loc.indexOf("?") > -1 ? loc.substring(0, loc.indexOf("?")) : loc).toLowerCase();
						if (s.inList("event6", s.events, ",")) s.eVar40 = "site search";
						else if (s.eVar30 && s.eVar31) {
							s.eVar40 = "anav";
							if (s.p_gh()) s.linkTrackVars = s.apl(s.linkTrackVars, "eVar40", ",", 2)
						} else if (s.getQueryParam("~ck").toLowerCase() ==
							"mn") s.eVar40 = "masthead";
						else if (s.getQueryParam("~ck").toLowerCase() == "hbn" || s.getQueryParam("ref").toLowerCase() == "hbn" || s.getQueryParam("~ck").toLowerCase() == "bnn" || s.getQueryParam("ref").toLowerCase() == "bnn" || s.getQueryParam("ref").toLowerCase() == "gzilla" || s.getQueryParam("~ck").toLowerCase() == "gzilla") s.eVar40 = "banner";
						else if (s.pageName)
							if (s.pageName.indexOf("advisorweb") > -1) s.eVar40 = "advisor";
						if (getDomainLevels(document.referrer, 3) == "nicos.co.jp") s.referrer = document.location.protocol + "//" +
							document.location.host.toString() + "/nicos-payment-processing"
					}
					s.tnt = s.trackTNT();
					if (typeof Dell.Metrics.sc.tti !== "undefined") s.eVar11 = Dell.Metrics.sc.tti;
					var ppv_c = s.getPercentPageViewed(s.pageName);
					if (ppv_c && ppv_c.length >= 4) {
						var ppv_pn = ppv_c.length > 0 ? ppv_c[0] : "";
						var ppv_v = (ppv_c.length > 0 ? ppv_c[1] : "") + (ppv_c.length > 2 ? "|" + ppv_c[2] : "");
						if (ppv_pn && ppv_v) {
							s.prop34 = ppv_pn;
							s.prop31 = ppv_v
						}
					}
					if (!s.campaign) s.campaign = s.getQueryParam("cid");
					if (!s.eVar1) s.eVar1 = s.getQueryParam("lid");
					var cidLID = s.campaign + "::" +
						s.eVar1;
					cidLID = s.getValOnce(cidLID, "cidlid", 0);
					cidLID = cidLID.split("::");
					if (cidLID.length > 1) {
						s.campaign = cidLID[0];
						s.eVar1 = cidLID[1]
					} else {
						s.campaign = "";
						s.eVar1 = ""
					}
					if (!s.eVar2) {
						var dgc = s.getQueryParam("dgc");
						s.eVar2 = dgc
					}
					if (!s.eVar3) s.eVar3 = s.getQueryParam("st");
					if (!s.eVar28) s.eVar28 = s.getQueryParam("acd");
					if (!s.eVar43) s.eVar43 = s.getQueryParam("mid");
					if (!s.eVar44) s.eVar44 = s.getQueryParam("rid");
					if (!s.eVar149) {
						s.eVar149 = s.getQueryParam("gacd");
						if (s.eVar149) s.eVar148 = s.eVar149
					}
					if (!s.eVar66) {
						var ven1 = s_dell.getQueryParam("ven1");
						var ven2 = s_dell.getQueryParam("ven2");
						var ven3 = s_dell.getQueryParam("ven3");
						var venData = ven1 + "|" + ven2 + "|" + ven3;
						if (venData !== "||") s.eVar66 = venData
					}
					if (typeof s.linkType == "undefined") {
						s.odgValues = "|af|ba|bf|cj|co|db|dc|ds|ec|em|ls|mb|ms|mt|rs|sm|ss|st|";
						var countrySegment = "";
						if (s.prop2 && s.eVar32) countrySegment = s.prop2 + "-" + s.eVar32;
						if (countrySegment) {
							var d = new Date,
								valueNotDeleted = true;
							if (s.c_r("e21") && s.c_r("e21").indexOf(countrySegment) > -1) {
								var e21Array = s.split(s.c_r("e21"), "::");
								for (i in e21Array)
									if (e21Array[i].toString().indexOf(countrySegment) >
										-1) {
										var e21Array2 = s.split(e21Array[i], ":");
										if (d.getTime() > e21Array2[1]) {
											if (e21Array.length == 1) {
												d.setTime(d.getTime() - 864E5);
												s.c_w("e21", "", d)
											} else {
												e21Array.splice(i, 1);
												d.setTime(d.getTime() + 30 * 864E5);
												s.c_w("e21", e21Array, d)
											}
											valueNotDeleted = false
										}
										if (valueNotDeleted) {
											var tempReferrer = s.d.referrer.substring(0, s.d.referrer.indexOf("?"));
											if (s.eVar2 && s.odgValues.indexOf(s.eVar2.toLowerCase() + "|") == -1 && s.eVar2 != "ir" || !s.getQueryParam("dgc") && tempReferrer && !s.isInternal(tempReferrer))
												if (e21Array.length ==
													1) {
													d.setTime(d.getTime() - 864E5);
													s.c_w("e21", "", d)
												} else {
													e21Array.splice(i, 1);
													d.setTime(d.getTime() + 30 * 864E5);
													s.c_w("e21", e21Array, d)
												}
											else s.events = s.apl(s.events, "event21", ",", 1)
										}
									}
							} else if (s.eVar2 && s.odgValues.indexOf(s.eVar2.toLowerCase() + "|") > -1) {
								s.events = s.apl(s.events, "event21", ",", 1);
								d.setTime(d.getTime() + 30 * 864E5);
								var e21Cookie = s.c_r("e21");
								e21Cookie = e21Cookie ? e21Cookie + "::" + countrySegment + ":" + d.getTime() : countrySegment + ":" + d.getTime();
								s.c_w("e21", e21Cookie, d)
							}
						}
					}
					if (s.tCall())
						if (s.isInternal(document.location.href))
							if (s.ActionDepthTest)
								if (typeof s.gpv_pn !=
									"undefined" && s.gpv_pn != s.pageName) {
									s.pdvalue = s.getActionDepth("s_depth");
									if (s.pdvalue == 1) s.events = s.apl(s.events, "event44", ",", 2);
									if (s.pdvalue == 2) s.events = s.apl(s.events, "event45", ",", 2);
									s.ActionDepthTest = false
								} if (dgc && dgc.toLowerCase() == "ir") {
						if (typeof s.gpv_pn != "undefined" && s.gpv_pn != s.pageName && s.c_r("s_depth") > 1) {
							s.eVar29 = s.getQueryParam("cid") + ":" + s.getQueryParam("lid");
							s.eVar29 = s.getValOnce(s.eVar29, "ir", 0)
						}
						s.campaign = s.eVar1 = s.eVar2 = s.eVar3 = s.eVar28 = ""
					}
					if (s.linkURL && s.linkType === "d") {
						s.prop33 =
							s.linkURL;
						s.prop33 = s.prop33.indexOf("//") ? s.prop33.substring(s.prop33.indexOf("//") + 2) : s.prop33;
						s.eVar23 = s.prop33;
						s.prop32 = s.pageName;
						window.consent_tlcall("", "d", "");
						s.events = s.apl(s.events, "event24", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop69", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop75", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop5", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop32", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop33", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars,
							"eVar23", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "events", ",", 2);
						s.linkTrackEvents = s.apl(s.linkTrackEvents, "event24", ",", 2)
					}
					if (s.linkType === "e") window.consent_tlcall("", "e", "");
					s.linkTrackVars = s.apl(s.linkTrackVars, "prop69", ",", 2);
					s.linkTrackVars = s.apl(s.linkTrackVars, "prop75", ",", 2);
					if (s.isInternal(document.location.href) && !s.onDellCMS()) {
						s.prop7 = s.getQueryParam("sk,k,q", "::");
						if (s.prop7) {
							s.prop7 = s.prop7.toLowerCase();
							s.eVar36 = s.prop7;
							var t_search = s.getValOnce(s.eVar36, "v36", 0);
							if (t_search) {
								s.events =
									s.apl(s.events, "event6", ",", 2);
								s.prop42 = s.gpv_pn
							}
						}
					}
					s.eVar7 = s.c_r("EQuoteID");
					s.eVar45 = s.getQueryParam("link_number");
					s.prop51 = s.getQueryParam("docid");
					s.events = s.events = s.apl(s.events, "event37", ",", 2);
					s.eVar14 = s.getQueryParam("avt,avtsub");
					var roleNameCookie = s.getCookie("prt:Prof");
					roleNameCookie = roleNameCookie == undefined ? "" : roleNameCookie;
					var roleName = roleNameCookie.split("\x26")[0].split("\x3d");
					if (roleName[0] == "rolename") s.eVar58 = roleName[1];
					if (s._keywords && s._keywords != "n/a" && s._channel == "Natural Search") {
						s.eVar49 =
							s._keywords;
						s.eVar52 = s._keywords + ":" + document.location.href
					}
					var CID = s.getQueryParam("cid");
					if (CID && s.campaign) s.eVar48 = s.campaign;
					else if (CID);
					else if (location.href.indexOf("s_kwcid") > -1) s.eVar48 = "SearchCenter";
					else if (s._keywords && s._keywords != "n/a") s.eVar48 = s._partner + " organic";
					s.prop47 = "D\x3ds_vi";
					if (s.prop1 == "productdetails") s.events = s.apl(s.events, "event46", ",", 2);
					s.eVar53 = "D\x3dpageName";
					s.prop14 = location.href.split("?")[0];
					if (location.href.indexOf("support") > -1 && location.href.indexOf("contact") >
						-1) s.events = s.apl(s.events, "event41", ",", 2);
					if (!s_dell.events.match("event22") && location.href.indexOf("accessories") < 0) {
						s.events = s.apl(s.events, "event49", ",", 2);
						s.events = s.apl(s.events, "event87", ",", 2)
					}
					if (document.getElementById("floatingToolbar") && (s.eVar38 === undefined || s.evar38 == ""))
						if (s.c_r("hideDellToolbar") == "true") s.eVar38 = "floating toolbar: closed";
						else s.eVar38 = "floating toolbar: open";
					else if (s.eVar38 === undefined || s.evar38 == "") s.eVar38 = "floating toolbar: no toolbar";
					s.eVar59 = s.getQueryParam("mfgpid");
					if (document.getElementById("ctl00_ctl00_PartnerData")) {
						var element = document.getElementById("ctl00_ctl00_PartnerData");
						s.eVar57 = element.value
					}
					var hostname = s_dell.d.location.hostname;
					if (hostname.indexOf("partnerdirect.dell.com") > -1 || hostname.indexOf("ping.dellcampaignbuilder.com") > -1 || hostname.indexOf("dell.netexam.com") > -1) s_dell.prop5 = "Channel Online";
					s.mboxCookie = s.c_r("mbox");
					if (s.mboxCookie) try {
						s.mboxCookie = s.mboxCookie.split("|");
						for (var i = 0; i < s.mboxCookie.length; i++)
							if (s.mboxCookie[i].indexOf("PC") >
								-1) {
								s.pcid = i;
								break
							} s.pcid = s.mboxCookie[s.pcid];
						s.pcid = s.pcid.split("#");
						s.pcid = s.pcid[1];
						s.prop59 = s.pcid
					} catch (err) {} finally {
						if (s.c_r("mbox").indexOf("timeout") > -1) s.prop59 = "browsertimeout"
					}
					s.readmboxcookie = s.c_r("mboxtimeouts");
					if (s.readmboxcookie) try {
						var cmboxtimeout = JSON.parse(s.readmboxcookie);
						var mboxval;
						var pgnameinitval;
						var pgnameval;
						var strtimeout;
						for (i = 0; i < cmboxtimeout.length; i++)
							if (i == 0) {
								mboxval = cmboxtimeout[i].mbox;
								pgnameinitval = cmboxtimeout[i].pgname;
								strtimeout = cmboxtimeout[i].pgname +
									":" + cmboxtimeout[i].mbox
							} else if (cmboxtimeout[i].pgname === pgnameinitval) strtimeout = strtimeout + "*" + cmboxtimeout[i].mbox;
						else {
							strtimeout = strtimeout + "," + cmboxtimeout[i].pgname + ":" + cmboxtimeout[i].mbox;
							pgnameinitval = cmboxtimeout[i].pgname
						}
						s.eVar108 = strtimeout;
						if (s.eVar108) document.cookie = "mboxtimeouts" + "\x3d;Expires\x3dThu, 01 Jan 1970 00:00:01 GMT;" + "Path\x3d/;" + "domain\x3ddell.com;"
					} catch (e) {}
					if (!doPluginsRanAlready) {
						s.readtnttrack = s.c_r("tntTrack");
						if (s.readtnttrack) try {
							var trackvals = JSON.parse(s.readtnttrack),
								curr, spl;
							for (i = 0; i < trackvals.length; i++) {
								curr = trackvals[i];
								spl = curr.indexOf(",") > -1 ? curr.split(",") : curr;
								if (i == 0) s.prop16 = spl;
								else if (i === 1);
								else if (i === 2) s.eVar120 = spl
							}
							document.cookie = "tntTrack" + "\x3d;Expires\x3dThu, 01 Jan 1970 00:00:01 GMT;" + "Path\x3d/;" + "domain\x3ddell.com;"
						} catch (e) {}
					}
					s.eVar79 = s.getscMap("solutionpro");
					if (s.getscMap("searchresults")) {
						s.event98 = s.getscMap("searchresults");
						s.events = s.apl(s.events, "event98", ",", 2)
					}
					if (s_dell.linkType !== "o" && s_dell.linkType !== "d") s_dell.prop20 = s_dell.getscMap("supportappindex");
					s_dell.prop40 = s_dell.getscMap("pageNumber");
					s_dell.hier1 = s_dell.getscMap("hier");
					s_dell.eVar73 = s_dell.getscMap("lithiumsearchrefinement");
					s_dell.eVar129 = s_dell.getscMap("tenantID");
					if (!s.hier1) s.hier1 = s.getscMap("hier1");
					s.eVar81 = s.getscMap("searchresults");
					if (s.getValOnce(s.eVar81, "v81", 0)) s.events = s.apl(s.events, "event99", ",", 2);
					if (s.getscMap("searchterm")) {
						s.prop7 = s_dell.getscMap("cms") + ":" + s.getscMap("searchterm");
						s.prop40 = s.getscMap("pageNumber");
						s.eVar109 = s.getscMap("coveovisitor");
						if (s.getscMap("coveosearchrefinement") !==
							"") s.eVar73 = s.getscMap("coveosearchrefinement")
					}
					if (Dell.Metrics.sc.persona) s.eVar213 = s.getscMap("persona");
					if (Dell.Metrics.sc.userdata) {
						if (Dell.Metrics.sc.userdata.affinityId) s_dell.eVar57 = Dell.Metrics.sc.userdata.affinityId;
						if (!s_dell.prop46) s_dell.prop46 = Dell.Metrics.sc.userdata.guid;
						s_dell.eVar207 = Dell.Metrics.sc.userdata.companyName;
						if (Dell.Metrics.sc.userdata.userId) s_dell.eVar110 = Dell.Metrics.sc.userdata.userId;
						if (Dell.Metrics.sc.userdata.partnerTrack) s_dell.eVar208 = Dell.Metrics.sc.userdata.partnerTrack;
						if (Dell.Metrics.sc.userdata.partnerTier) s_dell.eVar209 = Dell.Metrics.sc.userdata.partnerTier;
						if (Dell.Metrics.sc.userdata.productPurchasePath) s_dell.eVar210 = Dell.Metrics.sc.userdata.productPurchasePath;
						if (Dell.Metrics.sc.userdata.emcIdentityType)
							for (i = 0; i < Dell.Metrics.sc.userdata.emcIdentityType.length; i++)
								if (i == 0) s_dell.eVar111 = Dell.Metrics.sc.userdata.emcIdentityType[i];
								else s_dell.eVar111 = s_dell.eVar111 + "|" + Dell.Metrics.sc.userdata.emcIdentityType[i]
					}
					var temp = s.c_r("mhclicktrack");
					if (temp && !doPluginsRanAlready) {
						temp =
							s.split(temp, "|");
						var mhValues = new Array;
						var pairs;
						for (var x = 0; x < temp.length; x++) {
							if (temp[x]) pairs = s.split(temp[x], "\x3d");
							if (pairs[1]) mhValues[x] = pairs[1]
						}
						s.prop62 = mhValues[3] + "|" + mhValues[5] + "|" + mhValues[1] + "|" + mhValues[2];
						s.prop62 = s.getValOnce(s.prop62, "gvo_c62")
					}
					if (s.getPNfromURL().indexOf("accessories") > -1) {
						var metricsFamily = "",
							metricsPath = s.getHTMLtag("meta", "metricspath");
						if (metricsPath.indexOf("family") > -1) {
							metricsFamily = "::" + metricsPath.split("family\x3d")[1].split("]")[0];
							s.pageName += metricsFamily;
							s.prop13 += metricsFamily
						} else if (metricsPath.indexOf("mfgpid") > -1) {
							metricsFamily = "::" + metricsPath.split("mfgpid\x3d")[1].split("]")[0];
							s.pageName += metricsFamily;
							s.prop13 += metricsFamily
						}
					}
					if (document.location.protocol == "file:") s.un = "dellinternal";
					s.cookieLifetime = 63113900;
					doPluginsRanAlready = true
				}
				s_dell.doPlugins = s_dell_doPlugins;
				var gigya_omniture_conf = {
					linkName: "Gigya Action",
					eventMap: [{
						gigEvent: "login",
						omtrEvents: ["event42"],
						mapVars: ["eVar55\x3duser.loginProvider", "eVar54\x3dgetAge()", "eVar54\x3dgetGender()",
							"eVar54\x3dgetiRank()"
						]
					}, {
						gigEvent: "sendDone",
						omtrEvents: ["event43"],
						mapVars: ["eVar55\x3dproviders", "products"]
					}, {
						gigEvent: "commentSubmitted--disabled",
						omtrEvents: [""],
						mapVars: ["eVar55\x3dproviderPostIDs", "products"]
					}, {
						gigEvent: "reactionClicked--disabled",
						omtrEvents: [""],
						mapVars: ["\x3dreaction.ID", "products"]
					}],
					getAge: function(evt) {
						var a = evt.user["age"];
						if (typeof a == "number" && a > 0) return a;
						return "?"
					},
					getGender: function(evt) {
						var g = evt.user["gender"];
						if (typeof g == "string" && g.length > 0) return g;
						return "?"
					},
					getiRank: function(evt) {
						if (typeof evt.user["iRank"] == "string") {
							var r = parseFloat(evt.user["iRank"]).toFixed(0);
							if (r >= 1E-4) return r
						}
						return "?"
					}
				};
				s_dell.baseCategory = "";
				s_dell.viewerFrame = "";
				s_dell.lastFrame = "";
				s_dell.viewerType = "unknown";
				s_dell.asset = "";
				s_dell.internalCounter = 0;
				s_dell.currAsset = "";
				s_dell.currZoomLevel = "";
				s_dell.currImageMaps = new Array;
				s_dell.zoomLevelNumbers = [37, 74, 100];
				s_dell.zoomLevelCategories = ["I", "II", "III"];
				s_dell.currEvent = "";
				s_dell.prevEvent = "";
				s_dell.currAssetType = "";
				s_dell.zoomEventCnt =
					0;
				window.s7ComponentEvent = function(objectID, componentClass, instanceName, timeStamp, eventData) {
					s7track(eventData)
				};

				function s7pullProductParam(query) {
					if (!query) return "";
					var dQuery;
					try {
						dQuery = decodeURIComponent(query)
					} catch (e) {
						dQuery = query
					}
					var lQuery = dQuery.toLowerCase();
					var params = ["rolloverkey", "rollover_key", "p", "productkey", "pid"];
					for (var n in params) {
						var m1 = lQuery.indexOf(params[n] + "\x3d");
						if (m1 == undefined || m1 == -1) continue;
						m1 += params[n].length + 1;
						var m2 = lQuery.indexOf("\x26", m1);
						return m2 > m1 ? dQuery.substring(m1,
							m2) : dQuery.substr(m1)
					}
					return ""
				}

				function s7track(eventInfo, rolloverInfo) {
					var eventValues = eventInfo.split(",");
					var eventType = eventValues[0].toString();
					var eventData = eventValues.length > 1 ? unescape(eventValues[1].toString()) : "";
					var params = new Array;
					var paramsRaw = eventInfo.split(",");
					var tmp = "";
					for (var param in paramsRaw) {
						tmp = paramsRaw[param].toString();
						if (tmp.length < 100) params.push(decodeURIComponent(paramsRaw[param] + ""))
					}
					if (eventType == "SWATCH") eventType = "PAGE";
					if (eventType == "SPIN") eventType = "PAGE";
					if (eventType ==
						"TARG") eventType = "TARGET";
					if (eventType == "PAGE") s_dell.currEvent = "PAGE";
					if (eventType == "SWAP") {
						s_dell.lastFrame = s_dell.viewerFrame;
						s_dell.viewerFrame = params[1];
						if (params.length >= 2) s_dell.asset = params[1]
					} else if (eventType == "LOAD")
						if (params.length > 1) {
							s_dell.currEvent = "LOAD";
							s_dell.viewerType = params[1];
							var assetPos = 6;
							if (s_dell.viewerType == 3) assetPos = 7;
							else if (s_dell.viewerType == 2) assetPos = 7;
							else if (s_dell.viewerType == 5) assetPos = 7;
							else if (s_dell.viewerType < 100) assetPos = 7;
							if (params.length >= assetPos) s_dell.asset =
								params[assetPos] + "";
							var url = "http://scene7-cdn.dell.com/is/image/" + s_dell.asset + "?req\x3dset,json";
							$.ajax({
								url: url,
								data: "id\x3dresponse1",
								dataType: "jsonp"
							})
						} s_dell.prop4 = "";
					s_dell.internalCounter++;
					if (eventType == "ITEM" && eventData.indexOf("rollover") != -1) {
						var equalIndex = eventData.indexOf("\x3d");
						var keyData = eventData.substring(equalIndex + 1);
						var found = false;
						var currImageMapName = "";
						for (var i = 0; i < s_dell.currImageMaps.length; i++) {
							currImageMapName = s_dell.currImageMaps[i];
							if (currImageMapName == keyData) {
								found =
									true;
								break
							}
						}
						if (!found) {
							s_dell.currImageMaps.push(keyData);
							s_dell.prop4 = keyData;
							s_dell.linkTrackVars = "prop4";
							return s_dell.t()
						}
					}
					if (eventType == "ZOOM") {
						var bWriteZoomEventData = true;
						if (s_dell.prevEvent == "PAGE" || s_dell.zoomEventCnt > 0) s_dell.zoomEventCnt = s_dell.zoomEventCnt + 1;
						if (s_dell.currEvent == "LOAD" || s_dell.currEvent == "SWAP" || s_dell.currEvent == "PAGE" || s_dell.prevEvent == "PAGE" || s_dell.zoomEventCnt > 1 && s_dell.zoomEventCnt <= 3) {
							s_dell.currEvent = "ZOOM";
							bWriteZoomEventData = false
						}
						if (bWriteZoomEventData) {
							var zoomLevel =
								Math.round(params[1]);
							for (var i = 0; i < s_dell.zoomLevelNumbers.length; i++)
								if (zoomLevel <= s_dell.zoomLevelNumbers[i]) {
									s_dell.prop4 = "targ:" + s_dell.currAsset + ":" + s_dell.zoomLevelCategories[i];
									break
								} s_dell.currAssetType = "";
							s_dell.linkTrackVars = "prop4";
							return s_dell.t()
						}
					}
					if (eventType == "TARGET") {
						s_dell.prop4 = params[0];
						s_dell.linkTrackVars = "prop4";
						return s_dell.t()
					}
					if (eventType == "SWAP") {
						s_dell.currEvent = "SWAP";
						s_dell.prop4 = s_dell.asset;
						s_dell.currAsset = s_dell.asset;
						s_dell.linkTrackVars = "prop4";
						return s_dell.t()
					}
					if (eventType ==
						"HREF") {
						s_dell.prop4 = rolloverInfo == undefined ? s7pullProductParam(eventData) : rolloverInfo;
						s_dell.linkTrackVars = "prop4";
						return s_dell.t()
					}
					s_dell.prevEvent = s_dell.currEvent;
					s_dell.internalCounter--
				}
				window.s7jsonResponse = function(data, id) {
					s_dell.currAsset = data.set.item[0].i.n;
					s_dell.currAssetType = data.set.type
				};
				window.assetType = function(data, id) {
					s_dell.currAssetType = data.set.type
				};
				s_dell.getVisitNum = function(rp, erp) {
					var s = this,
						c = function(rp) {
							return isNaN(rp) ? !1 : (parseFloat(rp) | 0) === parseFloat(rp)
						};
					rp =
						rp ? rp : 365;
					erp = "undefined" !== typeof erp ? !!erp : c(rp) ? !0 : !1;
					var e = (new Date).getTime(),
						b = endOfDatePeriod(rp);
					if (s.c_r("s_vnc" + rp)) var g = s.c_r("s_vnc" + rp).split("\x26vn\x3d"),
						d = g[1];
					if (s.c_r("s_ivc")) return d ? (b.setTime(e + 18E5), s.c_w("s_ivc", !0, b), d) : "unknown visit number";
					if ("undefined" !== typeof d) return d++, c = erp && c(rp) ? e + 864E5 * rp : g[0], b.setTime(c), s.c_w("s_vnc" + rp, c + "\x26vn\x3d" + d, b), b.setTime(e + 18E5), s.c_w("s_ivc", !0, b), d;
					c = c(rp) ? e + 864E5 * rp : endOfDatePeriod(rp).getTime();
					s.c_w("s_vnc" + rp, c + "\x26vn\x3d1",
						b);
					b.setTime(e + 18E5);
					s.c_w("s_ivc", !0, b);
					return "1"
				};
				var endOfDatePeriod = function(dp) {
					var a = new Date,
						b = isNaN(dp) ? 0 : Math.floor(dp);
					a.setHours(23);
					a.setMinutes(59);
					a.setSeconds(59);
					"w" === dp && (b = 6 - a.getDay());
					if ("m" === dp) {
						b = a.getMonth() + 1;
						var d = a.getFullYear();
						b = (new Date(d ? d : 1970, b ? b : 1, 0)).getDate() - a.getDate()
					}
					a.setDate(a.getDate() + b);
					"y" === dp && (a.setMonth(11), a.setDate(31));
					return a
				};
				s_dell.getCookie = function(a) {
					var b, c, d, e = document.cookie.split(";");
					for (b = 0; b < e.length; b++) {
						c = e[b].substr(0, e[b].indexOf("\x3d"));
						d = e[b].substr(e[b].indexOf("\x3d") + 1);
						c = c.replace(/^\s+|\s+$/g, "");
						if (c == a) return unescape(d)
					}
					return ""
				};
				s_dell.getValOnce = function(vtc, cn, et, ep) {
					if (vtc && (cn = cn || "s_gvo", et = et || 0, ep = "m" === ep ? 6E4 : 864E5, vtc !== this.c_r(cn))) {
						var e = new Date;
						e.setTime(e.getTime() + et * ep);
						this.c_w(cn, vtc, 0 === et ? 0 : e);
						return vtc
					}
					return ""
				};
				s_dell.getPreviousValue = function(v, c) {
					var k = v,
						d = c;
					if ("-v" === k) return {
						plugin: "getPreviousValue",
						version: "3.0"
					};
					var a = function() {
						if ("undefined" !== typeof window.s_c_il)
							for (var c = 0, b; c < window.s_c_il.length; c++)
								if (b =
									window.s_c_il[c], b._c && "s_c" === b._c) return b
					}();
					"undefined" !== typeof a && (a.contextData.getPreviousValue = "3.0");
					window.cookieWrite = window.cookieWrite || function(c, b, f) {
						if ("string" === typeof c) {
							var h = window.location.hostname,
								a = window.location.hostname.split(".").length - 1;
							if (h && !/^[0-9.]+$/.test(h)) {
								a = 2 < a ? a : 2;
								var e = h.lastIndexOf(".");
								if (0 <= e) {
									for (; 0 <= e && 1 < a;) e = h.lastIndexOf(".", e - 1), a--;
									e = 0 < e ? h.substring(e) : h
								}
							}
							g = e;
							b = "undefined" !== typeof b ? "" + b : "";
							if (f || "" === b)
								if ("" === b && (f = -60), "number" === typeof f) {
									var d =
										new Date;
									d.setTime(d.getTime() + 6E4 * f)
								} else d = f;
							return c && (document.cookie = encodeURIComponent(c) + "\x3d" + encodeURIComponent(b) + "; path\x3d/;" + (f ? " expires\x3d" + d.toUTCString() + ";" : "") + (g ? " domain\x3d" + g + ";" : ""), "undefined" !== typeof cookieRead) ? cookieRead(c) === b : !1
						}
					};
					window.cookieRead = window.cookieRead || function(c) {
						if ("string" === typeof c) c = encodeURIComponent(c);
						else return "";
						var b = " " + document.cookie,
							a = b.indexOf(" " + c + "\x3d"),
							d = 0 > a ? a : b.indexOf(";", a);
						return (c = 0 > a ? "" : decodeURIComponent(b.substring(a +
							2 + c.length, 0 > d ? b.length : d))) ? c : ""
					};
					var l;
					d = d || "s_gpv";
					a = new Date;
					a.setTime(a.getTime() + 18E5);
					window.cookieRead(d) && (l = window.cookieRead(d));
					k ? window.cookieWrite(d, k, a) : window.cookieWrite(d, l, a);
					return l
				};
				s_dell.downloadLinkHandler = function(p) {
					var s = this,
						h = s.p_gh(),
						n = "linkDownloadFileTypes",
						i, t;
					if (!h || s.linkType && (h || s.linkName)) return "";
					i = h.indexOf("?");
					t = s[n];
					s[n] = p ? p : t;
					if (s.lt(h) == "d") s.linkType = "d";
					else h = "";
					s[n] = t;
					return h
				};
				s_dell.p_gh = function() {
					var s = this;
					if (!s.eo && !s.lnk) return "";
					var o = s.eo ?
						s.eo : s.lnk,
						y = s.ot(o),
						n = s.oid(o),
						x = o.s_oidt;
					if (s.eo && o == s.eo)
						while (o && !n && y != "BODY") {
							o = o.parentElement ? o.parentElement : o.parentNode;
							if (!o) return "";
							y = s.ot(o);
							n = s.oid(o);
							x = o.s_oidt
						}
					return o.href ? o.href : ""
				};
				s_dell.apl = function(lv, vta, d1, d2, cc) {
					if (!lv || "string" === typeof lv) {
						if ("undefined" === typeof this.inList || "string" !== typeof vta || "" === vta) return lv;
						d1 = d1 || ",";
						d2 = d2 || d1;
						1 == d2 && (d2 = d1, cc || (cc = 1));
						2 == d2 && 1 != cc && (d2 = d1);
						vta = vta.split(",");
						for (var g = vta.length, e = 0; e < g; e++) this.inList(lv, vta[e], d1, cc) || (lv =
							lv ? lv + d2 + vta[e] : vta[e])
					}
					return lv
				};
				s_dell.inList = function(lv, vtc, d, cc) {
					if ("string" !== typeof vtc) return !1;
					if ("string" === typeof lv) lv = lv.split(d || ",");
					else if ("object" !== typeof lv) return !1;
					d = 0;
					for (var e = lv.length; d < e; d++)
						if (1 == cc && vtc === lv[d] || vtc.toLowerCase() === lv[d].toLowerCase()) return !0;
					return !1
				};
				s_dell.split = function(l, d) {
					var i, x = 0,
						a = new Array;
					while (l) {
						i = l.indexOf(d);
						i = i > -1 ? i : l.length;
						a[x++] = l.substring(0, i);
						l = l.substring(i + d.length)
					}
					return a
				};
				s_dell.repl = function(x, o, n) {
					var i = x.indexOf(o),
						l =
						n.length;
					while (x && i >= 0) {
						x = x.substring(0, i) + n + x.substring(i + o.length);
						i = x.indexOf(o, i + l)
					}
					return x
				};
				s_dell.manageVars = function(cb, l, il) {
					var s = this;
					if (!s[cb]) return !1;
					l = l || "";
					il = il || !0;
					var a, d = "pageName,purchaseID,channel,server, pageType,campaign,state,zip,events,products,transactionID";
					for (a = 1; 76 > a; a++) d += ",prop" + a;
					for (a = 1; 251 > a; a++) d += ",eVar" + a;
					for (a = 1; 6 > a; a++) d += ",hier" + a;
					for (a = 1; 4 > a; a++) d += ",list" + a;
					for (a in s.contextData) d += ",contextData." + a;
					if (l) {
						if (1 == il) d = l.replace("['", ".").replace("']", "");
						else if (0 == il) {
							l = l.split(",");
							il = d.split(",");
							d = "";
							for (x in l)
								for (y in -1 < l[x].indexOf("contextData") && (l[x] = "contextData." + l[x].split("'")[1]), il) l[x] === il[y] && (il[y] = "");
							for (y in il) d += il[y] ? "," + il[y] : ""
						}
						s.pt(d, ",", cb, 0);
						return !0
					}
					return "" === l && il ? (s.pt(d, ",", cb, 0), !0) : !1
				};
				s_dell.lowerCaseVars = function(v) {
					var s = this;
					s[v] && ("events" !== v && -1 === v.indexOf("contextData") ? (s[v] = s[v].toString(), 0 !== s[v].indexOf("D\x3d") && (s[v] = s[v].toLowerCase())) : -1 < v.indexOf("contextData") && (v = v.substring(v.indexOf(".") +
						1), s.contextData[v] && (s.contextData[v] = s.contextData[v].toString().toLowerCase())))
				};
				s_dell.cleanStr = function(v) {
					var s = this;
					s[v] && "function" !== typeof cleanStr && (0 > v.indexOf("contextData") ? s[v] = cleanStr(s[v]) : (v = v.substring(v.indexOf(".") + 1), s.contextData[v] && (s.contextData[v] = cleanStr(s.contextData[v].toString()))))
				};

				function cleanStr(str) {
					if ("string" === typeof str) {
						str = str.replace(/<\/?[^>]+(>|$)/g, "").trim().replace(/[\u2018\u2019\u201A]/g, "'").replace(/\t+/g, "").replace(/[\n\r]/g, " ");
						for (; - 1 < str.indexOf("  ");) str =
							str.replace(/\s\s/g, " ");
						return str
					}
					return ""
				}
				s_dell.pt = function(l, de, cf, fa) {
					if (l && this[cf]) {
						l = l.split(de || ",");
						de = l.length;
						for (var e, c = 0; c < de; c++)
							if (e = this[cf](l[c], fa)) return e
					}
				};
				s_dell.parseCookie = function(c, pl, d) {
					var s = this,
						pla, ca, o = "",
						j, l;
					c = s.c_r(c);
					if (c) {
						pla = s.split(pl, d);
						ca = s.split(c, "\x26");
						for (x in pla)
							for (y in ca) {
								j = pla[x] + "\x3d";
								l = "" + ca[y];
								l = l.toLowerCase();
								l = l.indexOf(j.toLowerCase());
								if (l > -1) o = s.apl(o, ca[y], "\x26", 0)
							}
						if (o) o = "?" + o
					}
					return o
				};
				s_dell.dedupVal = function(c, v) {
					var s = this,
						r;
					if (s.c_r(c)) {
						r =
							s.c_r(c);
						if (v == r) return "";
						else s.c_w(c, v)
					} else s.c_w(c, v);
					return v
				};
				s_dell.trackTNT = function(v, p, b) {
					var s = this,
						n = "s_tnt",
						q = "s_tntref",
						p = p ? p : n,
						v = v ? v : n,
						r = "",
						pm = false,
						b = b ? b : true;
					if (s.Util.getQueryParam(q) != "") s.referrer = s.Util.getQueryParam(q);
					else if (s.c_r(q) != "") {
						s.referrer = s.c_r(q);
						document.cookie = q + "\x3d;path\x3d/;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;"
					} else if (document.cookie.indexOf(q) != -1 && s.c_r(q) == "" || location.search.indexOf(q + "\x3d") != -1 && s.Util.getQueryParam(q) == "") {
						s.referrer = "Typed/Bookmarked";
						document.cookie = q + "\x3d;path\x3d/;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;"
					}
					if (s.Util.getQueryParam(p) != "") pm = s.Util.getQueryParam(p);
					else if (s.c_r(p)) {
						pm = s.c_r(p);
						document.cookie = p + "\x3d;path\x3d/;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;"
					} else if (s.c_r(p) == "" && s.Util.getQueryParam(p) == "") pm = "";
					if (pm) r += pm + ",";
					if (window[v] != undefined) r += window[v];
					if (b) window[v] = "";
					return r
				};
				s_dell.getPercentPageViewed = function(pid, ch) {
					var s = this,
						a = s.c_r("s_ppv");
					a = -1 < a.indexOf(",") ? a.split(",") : [];
					a[0] = s.unescape(a[0]);
					pid = pid ? pid : s.pageName ? s.pageName : document.location.href;
					s.ppvChange = "undefined" === typeof ch || !0 == ch ? !0 : !1;
					if ("undefined" === typeof s.linkType || "o" !== s.linkType) s.ppvID && s.ppvID === pid || (s.ppvID = pid, s.c_w("s_ppv", ""), s.handlePPVevents()), s.p_fo("s_gppvLoad") && window.addEventListener && (window.addEventListener("load", s.handlePPVevents, !1), window.addEventListener("click", s.handlePPVevents, !1), window.addEventListener("scroll", s.handlePPVevents, !1)), s._ppvPreviousPage = a[0] ? a[0] : "", s._ppvHighestPercentViewed =
						a[1] ? a[1] : "", s._ppvInitialPercentViewed = a[2] ? a[2] : "", s._ppvHighestPixelsSeen = a[3] ? a[3] : "", s._ppvFoldsSeen = a[4] ? a[4] : "", s._ppvFoldsAvailable = a[5] ? a[5] : ""
				};
				s_dell.handlePPVevents = function() {
					if ("undefined" !== typeof s_c_il) {
						for (var c = 0, g = s_c_il.length; c < g; c++)
							if (s_c_il[c] && (s_c_il[c].getPercentPageViewed || s_c_il[c].getPreviousPageActivity)) {
								var s = s_c_il[c];
								break
							} if (s && s.ppvID) {
							var f = Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight,
									document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight)),
								h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
							c = (window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop) + h;
							g = Math.min(Math.round(c / f * 100), 100);
							var k = Math.floor(c / h);
							h = Math.floor(f / h);
							var d = "";
							if (!s.c_r("s_tp") || s.unescape(s.c_r("s_ppv").split(",")[0]) !== s.ppvID || s.p_fo(s.ppvID) || 1 == s.ppvChange && s.c_r("s_tp") &&
								f != s.c_r("s_tp")) {
								(s.unescape(s.c_r("s_ppv").split(",")[0]) !== s.ppvID || s.p_fo(s.ppvID + "1")) && s.c_w("s_ips", c);
								if (s.c_r("s_tp") && s.unescape(s.c_r("s_ppv").split(",")[0]) === s.ppvID) {
									s.c_r("s_tp");
									d = s.c_r("s_ppv");
									var e = -1 < d.indexOf(",") ? d.split(",") : [];
									d = e[0] ? e[0] : "";
									e = e[3] ? e[3] : "";
									var l = s.c_r("s_ips");
									d = d + "," + Math.round(e / f * 100) + "," + Math.round(l / f * 100) + "," + e + "," + k
								}
								s.c_w("s_tp", f)
							} else d = s.c_r("s_ppv");
							var b = d && -1 < d.indexOf(",") ? d.split(",", 6) : [];
							f = 0 < b.length ? b[0] : escape(s.ppvID);
							e = 1 < b.length ? parseInt(b[1]) :
								g;
							l = 2 < b.length ? parseInt(b[2]) : g;
							var m = 3 < b.length ? parseInt(b[3]) : c,
								n = 4 < b.length ? parseInt(b[4]) : k;
							b = 5 < b.length ? parseInt(b[5]) : h;
							0 < g && (d = f + "," + (g > e ? g : e) + "," + l + "," + (c > m ? c : m) + "," + (k > n ? k : n) + "," + (h > b ? h : b));
							s.c_w("s_ppv", d)
						}
					}
				};
				s_dell.p_fo = function(on) {
					var s = this;
					s.__fo || (s.__fo = {});
					if (s.__fo[on]) return !1;
					s.__fo[on] = {};
					return !0
				};
				parseUri = function(u) {
					var l = {
							strictMode: false,
							key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
							U: {
								name: "queryKey",
								c: /(?:^|&)([^&=]*)=?([^&]*)/g
							},
							c: {
								strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,
								loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\\d*))?)(((\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\\?([^#]*))?(?:#(.*))?)/
							}
						},
						t = l.c[l.strictMode ? "strict" : "loose"].exec(u),
						p = {},
						b = 14;
					while (b--) p[l.key[b]] = t[b] || "";
					p[l.U.name] = {};
					p[l.key[12]].replace(l.U.c, function($0, $1, $2) {
						if ($1) p[l.U.name][$1] = $2
					});
					return p
				};
				sC = function(b, s) {
					document.cookie = b + "\x3d" + escape(s) + "; " + " expires\x3d" + (arguments.length >= 3 ? arguments[2].toGMTString() : "") + "; path\x3d/; domain\x3d." + getDomainLevels() + ";"
				};
				gC = function(b) {
					var q = document.cookie,
						v = b + "\x3d",
						m = q.indexOf(v);
					if (m != 0) m = q.indexOf(";" + v);
					if (m == -1) return "";
					v = q.substring(m);
					v = v.substring(v.indexOf("\x3d") + 1);
					m = v.indexOf(";");
					if (m != -1) v = v.substring(0, m);
					return unescape(v)
				};
				getDomainLevels =
					function() {
						var z;
						if (arguments.length > 0) z = arguments[0];
						else {
							if (typeof document.location.href == "undefined") return "";
							z = document.location.href
						}
						var r = parseUri(z).host.toLowerCase();
						var c = r.split(".".toString());
						if (arguments.length >= 2) {
							var w = arguments[1];
							for (var b = 1, i = ""; b <= w; b++)
								if (c.length >= b) i = c[c.length - b] + (b > 1 ? "." : "") + i
						} else {
							var i = c.length >= 1 ? c[c.length - 1] : "";
							var n = c.length >= 2 ? c[c.length - 2] : "";
							var w = i.length == 2 && (n.length == 2 || n == "com") ? 3 : 2;
							for (var b = 2; b <= w; b++)
								if (c.length >= b) i = c[c.length - b] + (b > 1 ? "." :
									"") + i
						}
						return i
					};
				s_dell.getActionDepth = function(c) {
					var s = this,
						v = 1,
						t = new Date;
					t.setTime(t.getTime() + 18E5);
					if (!s.c_r(c)) v = 1;
					if (s.c_r(c)) {
						v = s.c_r(c);
						v++
					}
					if (!s.c_w(c, v, t)) s.c_w(c, v, 0);
					return v
				};
				s_dell.tCall = function() {
					var t = this.linkType;
					return typeof t == "undefined" || typeof t == ""
				};
				s_dell.isInternal = function() {
					return matchList(arguments.length == 0 ? document.location.href : arguments[0].toString(), s_dell.linkInternalFilters)
				};
				s_dell.hostedLocally = function(v) {
					return matchList(!v ? document.location.href : v.toString().toLowerCase(),
						s_dell.localDoms)
				};
				matchList = function(v, l) {
					v = v.toString();
					if (typeof v != "string" || typeof l != "string") return 0;
					var m = parseUri(v).protocol,
						h = parseUri(v).host;
					if (h) h = "//" + h;
					if (m) h = m + ":" + h;
					return h.match("(" + l.toLowerCase().replace(/\.(?![*+?])/gi, "\\.").replace(/,(?![*+?])/gi, "|") + ")") ? 1 : 0
				};
				s_dell.join = function(v, p) {
					var s = this;
					var f, b, d, w;
					if (p) {
						f = p.front ? p.front : "";
						b = p.back ? p.back : "";
						d = p.delim ? p.delim : "";
						w = p.wrap ? p.wrap : ""
					}
					var str = "";
					for (var x = 0; x < v.length; x++) {
						if (typeof v[x] == "object") str += s.join(v[x],
							p);
						else str += w + v[x] + w;
						if (x < v.length - 1) str += d
					}
					return f + str + b
				};
				s_dell.getQueryParam = function(n, s, h) {
					h || (h = s_dell.pageURL ? s_dell.pageURL.toLowerCase() : window.location.href.toLowerCase(), n = n.toLowerCase());
					return s_dell.Util.getQueryParam(n, h, s)
				};

				function s_dell_determineCMS() {
					var s = s_dell;
					if (!s.CMS) {
						s.CMS = "unknown";
						var gen = s.getHTMLtag("meta", "generator").toLowerCase();
						if (gen.indexOf(" ") > 0) gen = gen.substring(0, gen.indexOf(" "));
						if (gen.indexOf("ng") == 0) s.CMS = "nextgen";
						if (gen.indexOf("build:") == 0 || gen.indexOf("mshtml") ==
							0) s.CMS = "olr";
						if (gen.indexOf("storm") == 0) s.CMS = "storm";
						if (gen.indexOf("telligent") == 0) s.CMS = "telligent";
						if (s.CMS == "unknown" && s.getHTMLtag("meta", "waapplicationname")) s.CMS = "olr";
						if (s.CMS == "unknown" && Dell.Metrics.sc.cms.indexOf("emc") >= 0) s.CMS = Dell.Metrics.sc.cms;
						if (s.CMS == "unknown" && (Dell.Metrics.sc.cms == "lithium" || Dell.Metrics.sc.cms == "coveo" || Dell.Metrics.sc.cms == "lithium|coveo")) s.CMS = "community"
					}
					return s.CMS
				}
				s_dell.determineCMS = s_dell_determineCMS;

				function s_dell_onDellCMS() {
					return s_dell.determineCMS() ==
						"storm" || s_dell.determineCMS() == "community" || s_dell.determineCMS() == "nextgen" || s_dell.determineCMS() == "olr" || s_dell.determineCMS() == "telligent" || s_dell.determineCMS() == "emcsales" || s_dell.determineCMS() == "emcknowledgecenter" || s_dell.determineCMS() == "emcpartnerportal"
				}
				s_dell.onDellCMS = s_dell_onDellCMS;

				function s_dell_processLWP() {
					var s = s_dell;
					if (document.location.search) s.setLWPvarsFromStr(document.location.search);
					s.setLWPvarsFromMetaTags();
					if (!s.onDellCMS()) {
						if (s.prop49) s.setLWPvarsFromStr(s.prop49);
						if (s.hostedLocally(document.referrer)) s.setLWPvarsFromStr(parseUri(document.referrer).query)
					}
					var lwpc = s.readLWPcookie();
					if (lwpc) s.setLWPvarsFromStr(lwpc);
					else s.setLWPvarsFromStr(s.readProp49cookie());
					s.setCCfromURL();
					var lv = s.getLWPvariables();
					if (lv && !s.prop49) {
						s.prop49 = "?" + lv;
						s.writeProp49cookie(lv)
					}
				}
				s_dell.processLWP = s_dell_processLWP;

				function s_dell_setLWPvarsFromMetaTags() {
					var s = s_dell;
					if (!s.prop2) s.prop2 = s.getHTMLtag("meta", "country");
					if (!s.prop2) s.prop2 = s.getHTMLtag("meta", "documentcountrycode");
					if (!s.prop3) s.prop3 = s.getHTMLtag("meta", "language");
					if (!s.eVar32) s.eVar32 = s.getHTMLtag("meta", "segment");
					if (!s.prop6) s.prop6 = s.getHTMLtag("meta", "customerset")
				}
				s_dell.setLWPvarsFromMetaTags = s_dell_setLWPvarsFromMetaTags;

				function s_dell_getHTMLtag(tg, nm) {
					var k = arguments.length > 2 ? arguments[2] : "NAME",
						v = arguments.length > 3 ? arguments[3] : "CONTENT",
						metas = document.getElementsByTagName ? document.getElementsByTagName(tg) : "";
					for (var i = metas.length - 1; i >= 0; i--) {
						var n = metas[i].getAttribute(k);
						n = n ? n.toLowerCase() :
							"";
						if (n == nm) return metas[i].getAttribute(v).toLowerCase()
					}
					return ""
				}
				s_dell.getHTMLtag = s_dell_getHTMLtag;

				function s_dell_setLWPvarsFromStr(v) {
					var s = s_dell;
					if (!v) return;
					v = v.toString().toLowerCase();
					if (v.substring(0, 1) == "\x26") v = "?" + v.substring(1);
					if (v.substring(0, 1) != "?") v = "?" + v;
					if (!s.prop2) s.prop2 = s.getQueryParam("shopper_country", "", v);
					if (!s.prop2) s.prop2 = s.getQueryParam("ctry_id", "", v);
					if (!s.prop2) s.prop2 = s.getQueryParam("c", "", v);
					if (!s.prop3) s.prop3 = s.getQueryParam("l", "", v);
					if (!s.eVar32) s.eVar32 =
						s.getQueryParam("s", "", v);
					if (!s.eVar32) s.eVar32 = s.getQueryParam("shopper_segment", "", v);
					if (!s.prop6) s.prop6 = s.getQueryParam("customer_id", "", v);
					if (!s.prop6) s.prop6 = s.getQueryParam("cs", "", v);
					if (!s.prop17) s.prop17 = s.getQueryParam("svctag", "", v);
					if (!s.prop17) s.prop17 = s.getQueryParam("servicetag", "", v);
					if (!s.prop17) s.prop17 = s.getQueryParam("st55", "", v);
					if (!s.prop17) s.prop17 = s.getQueryParam("tag", "", v);
					if (!s.prop18) s.prop18 = s.getQueryParam("systemid", "", v)
				}
				s_dell.setLWPvarsFromStr = s_dell_setLWPvarsFromStr;

				function s_dell_getLWPvariables() {
					var v = "",
						s = this;
					if (s.prop2) v += "\x26c\x3d" + s.prop2;
					if (s.prop3) v += "\x26l\x3d" + s.prop3;
					if (s.eVar32) v += "\x26s\x3d" + s.eVar32;
					if (s.prop6) v += "\x26cs\x3d" + s.prop6;
					if (s.prop17) v += "\x26servicetag\x3d" + s.prop17;
					if (s.prop18) v += "\x26systemid\x3d" + s.prop18;
					if (v) return v.substring(1);
					return ""
				}
				s_dell.getLWPvariables = s_dell_getLWPvariables;
				s_dell.cCodes = ["ae", "ag", "ai", "al", "am", "an", "ao", "ar", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bg", "bh", "bm", "bo", "br", "bs", "bw", "by", "bz", "ca",
					"ch", "cl", "cm", "cn", "co", "cr", "cy", "cz", "de", "dk", "dm", "do", "dz", "ec", "ed", "ee", "eg", "es", "et", "eu", "fi", "fj", "fr", "gb", "gd", "ge", "gh", "gr", "gt", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "ir", "is", "it", "jm", "jo", "jp", "ke", "kn", "kr", "kw", "ky", "kz", "lb", "lc", "li", "lk", "lt", "lu", "lv", "ma", "md", "me", "mk", "ml", "mq", "ms", "mt", "mu", "mx", "my", "mz", "na", "ng", "ni", "nl", "no", "nz", "om", "pa", "pe", "ph", "pk", "pl", "pr", "pt", "py", "qa", "ro", "rs", "ru", "ru", "rw", "sa", "se", "sg", "si", "sk", "sn", "sr", "sv", "sy", "tc",
					"td", "th", "tm", "tn", "tr", "tt", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "vc", "ve", "vg", "vi", "vn", "ye", "yu", "za", "zm", "zw"
				];

				function s_dell_setCCfromURL() {
					var s = s_dell;
					if (s.prop2) return;
					if (arguments.length > 0) var r = arguments[0];
					else {
						if (typeof document.location.href == "undefined") return;
						var r = document.location.href
					}
					var h = parseUri(r).host.split(".");
					var d = h.length >= 3 ? h[h.length - 1] : "";
					if (d.length == 2 && s.inList(d, s.cCodes)) {
						s.prop2 = d;
						return
					}
					for (var i = 1; i < h.length; i++)
						if (h[i] == "dell") {
							d = h[i - 1];
							if (s.inList(d,
									s.cCodes)) {
								s.prop2 = d;
								return
							}
						} var p = parseUri(r).directory;
					if (p.length < 4 || p[3] != "/") return;
					var p1 = p.substring(1, 3);
					if (s.inList(p1, s.cCodes)) {
						s.prop2 = p1;
						return
					}
				}
				s_dell.setCCfromURL = s_dell_setCCfromURL;

				function s_dell_readLWPcookie() {
					return gC("lwp")
				}
				s_dell.readLWPcookie = s_dell_readLWPcookie;

				function s_dell_readProp49cookie() {
					return gC("s_c49")
				}
				s_dell.readProp49cookie = s_dell_readProp49cookie;

				function s_dell_writeProp49cookie() {
					var v = s_dell.getLWPvariables();
					if (v) sC("s_c49", v)
				}
				s_dell.writeProp49cookie =
					s_dell_writeProp49cookie;

				function s_dell_getPNfromURL() {
					var s = s_dell,
						p = document.location.protocol;
					if (p.indexOf("http") == 0) {
						var pn = parseUri(document.location.href).host.replace(/^www[0-9]*\./i, "") + parseUri(document.location.href).path.replace(/\.(aspx?|s?html?|cgi|php[0-9]|wml)/i, "").replace(/\/(default|home|index)/i, "");
						if (pn.indexOf("/") == -1) pn = pn + "/";
						sku = s.getQueryParam("sku", "", document.location.search);
						if (!sku) sku = s.getQueryParam("channel-product-id", "", document.location.search);
						if (sku) pn += "[sku\x3d" +
							sku + "]"
					} else pn = p;
					return pn.toLowerCase()
				}
				s_dell.getPNfromURL = s_dell_getPNfromURL;

				function s_dell_getObjectID(o) {
					return o.href
				}
				s_dell.getObjectID = s_dell_getObjectID;
				window.adTrackClickThroughs = function() {
					var s = s_dell;
					var q = s.determineCMS() == "nextgen" ? ".omnitureADTrack[omnitureadid]" : ".omnitureADTrack[@omnitureadid]";
					try {
						jQuery(q).each(function() {
							jQuery(this).click(function() {
								try {
									s.eVar6 = jQuery(this).attr("omnitureadid");
									s.prop28 = "";
									s.linkTrackVars = s.apl(s.linkTrackVars, "eVar6", ",", 2);
									s.tl(this, "o",
										"ADTrack");
									s.eVar6 = ""
								} catch (e) {}
							})
						})
					} catch (e) {}
				};
				window.adTrackImpressions = function() {
					var s = s_dell;
					var q = s.determineCMS() == "nextgen" ? ".omnitureADTrack[omnitureadid]" : ".omnitureADTrack[@omnitureadid]";
					try {
						var adImpressionsArray = new Array;
						jQuery(q).each(function() {
							if (adImpressionsArray != null) {
								var omnitureadid = jQuery(this).attr("omnitureadid");
								if (adImpressionsArray.indexOf(omnitureadid) == -1 && adImpressionsArray.length < 11) adImpressionsArray.push(omnitureadid)
							}
						});
						s.prop28 = adImpressionsArray.join("|")
					} catch (e) {}
				};
				s_dell.visitorNamespace = "dell";
				{
					s_dell.trackingServer = "nsm.dell.com";
					s_dell.trackingServerSecure = "sm.dell.com"
				}
				s_dell.dc = 112;
				var s_sv_dynamic_root = "survey.112.2o7.net/survey/dynamic";
				var s_sv_gather_root = "survey.112.2o7.net/survey/gather";
				var analytics_ctry = ["ar", "at", "ba", "gb", "be", "bg", "br", "ch", "ci", "cl", "cn", "co", "cr", "cy", "cz", "de", "dk", "ed", "ee", "es", "fi", "fr", "gf", "gp", "gr", "hr", "hu", "ie", "is", "it", "jp", "kv", "li", "lt", "lu", "lv", "mt", "nl", "no", "pa", "pe", "pf", "pl", "pt", "ro", "se", "si", "sk", "uk"];
				window.dellmetricsTrack = function(appcode, btnName, sevtag) {
					s_dell.prop20 = appcode;
					if (s_dell.pageName && s_dell.pageName !== "undefined") s_dell.prop13 = s_dell.pageName + "[tab\x3d" + btnName + "]";
					else s_dell.prop13 = Dell.Metrics.sc.pagename + "[tab\x3d" + btnName + "]";
					if (Dell.Metrics.sc.detailedpagename) {
						s_dell.prop13 = s_dell.prop13 + "|" + Dell.Metrics.sc.detailedpagename;
						btnName = btnName + "|" + Dell.Metrics.sc.detailedpagename
					}
					if (s_dell.c_r("drvcanary")) s_dell.prop13 = s_dell.prop13 + "|c:" + s_dell.c_r("drvcanary");
					if (Dell.Metrics.sc.emcproducts &&
						!s_dell.eVar205) s_dell.eVar205 = Dell.Metrics.sc.emcproducts;
					if (Dell.Metrics.sc.emcserialnum && !s_dell.eVar136) s_dell.eVar136 = Dell.Metrics.sc.emcserialnum;
					if (Dell.Metrics.sc.userid && !s_dell.eVar110) s_dell.eVar110 = Dell.Metrics.sc.userid;
					if (Dell.Metrics.sc.userrole && !s_dell.eVar111) s_dell.eVar111 = Dell.Metrics.sc.userrole;
					if (Dell.Metrics.sc.usercompany && !s_dell.eVar112) s_dell.eVar112 = Dell.Metrics.sc.usercompany;
					if (Dell.Metrics.sc.sitedunsnum && !s_dell.eVar113) s_dell.eVar113 = Dell.Metrics.sc.sitedunsnum;
					if (Dell.Metrics.sc.servicetag &&
						!s_dell.prop17) s_dell.prop17 = Dell.Metrics.sc.servicetag;
					if (sevtag) s_dell.prop17 = sevtag;
					if (Dell.Metrics.sc.supportsystem && !s_dell.prop18) s_dell.prop18 = Dell.Metrics.sc.supportsystem;
					if (Dell.Metrics.sc.warranty && !s_dell.prop57) s_dell.prop57 = Dell.Metrics.sc.warranty;
					if (Dell.Metrics.sc.supportorder && !s_dell.prop22) s_dell.prop22 = Dell.Metrics.sc.supportorder;
					if (Dell.Metrics.sc.supportdpid && !s_dell.prop22) s_dell.prop22 = Dell.Metrics.sc.supportdpid;
					if (appcode === "890.220.920" && btnName.toLowerCase() !== "chatagentunavailable");
					else if (appcode == "111.851.103.500");
					else linkTracking("event22", "eVar63,eVar64,eVar65,eVar110,eVar111,eVar112,eVar113,eVar136,eVar205", "prop12,prop13,prop14,prop17,prop18,prop20,prop22,prop29,prop46,prop49,prop57,prop67,prop69,prop75", btnName, true, "o")
				};
				s_dell.pageName = s_dell.getscMap("pagename");
				s_dell.prop2 = s_dell.getscMap("country");
				s_dell.prop3 = s_dell.getscMap("language");
				s_dell.eVar32 = s_dell.eVar34 = s_dell.getscMap("segment");
				if (parseUri(document.location.href).host.replace(/^www[0-9]*\./i, "").indexOf("dell-ambassador") ==
					-1) s_dell.prop5 = "Corporate Online";
				s_dell.prop6 = s_dell.eVar33 = s_dell.getscMap("customerset");
				if (s_dell.getscMap("detailpagename")) s_dell.prop13 = s_dell.pageName + "|" + s_dell.getscMap("detailpagename");
				s_dell.events = "";
				if (Dell.Metrics.sc.cms != "undefined" && (Dell.Metrics.sc.cms === "coveo" || Dell.Metrics.sc.cms === "outlet" || Dell.Metrics.sc.cms === "lithium" || Dell.Metrics.sc.cms === "lithium|coveo" || Dell.Metrics.sc.cms === "Insights" || Dell.Metrics.sc.cms === "dellemc" || Dell.Metrics.sc.cms === "emcsales" || Dell.Metrics.sc.cms ===
						"emcknowledgecenter" || Dell.Metrics.sc.cms === "emcpartnerportal" || Dell.Metrics.sc.cms === "dfsportal" || Dell.Metrics.sc.cms === "mysales" || Dell.Metrics.sc.cms === "techdirect" || Dell.Metrics.sc.cms === "defyboundaries" || Dell.Metrics.sc.cms === "workfront" || Dell.Metrics.sc.cms === "cvent" || Dell.Metrics.sc.cms === "careersites" || Dell.Metrics.sc.cms === "delldesignsystem" || Dell.Metrics.sc.cms === "expertprogram" || Dell.Metrics.sc.cms === "Dell Community Forum" || Dell.Metrics.sc.cms === "tradein" || Dell.Metrics.sc.cms === "solveonline" ||
						Dell.Metrics.sc.cms === "ddh")) s_dell.prop29 = Dell.Metrics.sc.cms;
				else s_dell.prop29 = "3rd party sites";
				s_dell.eVar60 = Dell.Metrics.sc.mmconnid !== "undefined" ? Dell.Metrics.sc.mmconnid : "";
				s_dell.eVar61 = Dell.Metrics.sc.mmuuid !== "undefined" ? Dell.Metrics.sc.mmuuid : "";
				s_dell.eVar8 = s_dell.getscMap("ref");
				if (s_dell.getscMap("lwp")) s_dell.prop49 = "?" + s_dell.getscMap("lwp");
				else if (typeof Dell.Metrics.sc.country !== "undefined" && typeof Dell.Metrics.sc.language !== "undefined") s_dell.prop49 = "?c\x3d" + Dell.Metrics.sc.country +
					"\x26l\x3d" + Dell.Metrics.sc.language + "\x26s\x3dcorp";
				else s_dell.prop49 = "?c\x3dus\x26l\x3den\x26s\x3dcorp";
				if (adb.publishPath !== "NA") s_dell.prop53 = adb.publishPath;
				s_dell.eVar114 = adbFun.getGlassboxSessionReplayLink();
				s_dell.eVar100 = s_dell.getscMap("contentsquareid");
				s_dell.prop7 = s_dell.getscMap("searchTerm");
				if (s_dell.getscMap("sessionid")) s_dell.eVar147 = s_dell.getscMap("sessionid");
				if (!s_dell.prop17) s_dell.prop17 = s_dell.getscMap("servicetag");
				s_dell.eVar136 = s_dell.getscMap("emcserialnum");
				if (s_dell.getscMap("authenticated")) s_dell.prop12 =
					s_dell.getscMap("authenticated") == "true" ? "logged in" : "not logged in";
				s_dell.eVar129 = s_dell.getscMap("tenantID");
				if (s_dell.getscMap("eshoptotalrevenue")) {
					s_dell.currencyCode = "cny";
					s_dell.events = s_dell.apl(s_dell.events, "event130\x3d" + s_dell.getscMap("eshoptotalrevenue"), ",", 2)
				}
				if (s_dell.getscMap("eshoptotalunits")) s_dell.events = s_dell.apl(s_dell.events, "event131\x3d" + s_dell.getscMap("eshoptotalunits"), ",", 2);
				s_dell.prop64 = s_dell.getscMap("multioc");
				s_dell.eVar101 = s_dell.getscMap("productvariant");
				s_dell.eVar102 = s_dell.getscMap("productid");
				s_dell.eVar150 = s_dell.getscMap("eshoppaymenttype");
				s_dell.eVar151 = s_dell.getscMap("eshoppurchaseid");
				var eshopprodlist = s_dell.getscMap("eshopproducts");
				s_dell.waapplication = s_dell.getscMap("waapplication");
				s_dell.wacontroller = s_dell.getscMap("wacontroller");
				if (s_dell.waapplication.toLowerCase() == "ecomm" || s_dell.wacontroller.toLowerCase() == "contents") {
					s_dell.events = s_dell.apl(s_dell.events, "scView", ",", 2);
					s_dell.events = s_dell.apl(s_dell.events, "event160",
						",", 2)
				}
				if (s_dell.waapplication.toLowerCase() == "ecomm")
					if (s_dell.wacontroller.toLowerCase() == "shipping" || s_dell.wacontroller.toLowerCase() == "confirmation") {
						s_dell.events = s_dell.apl(s_dell.events, "scCheckout", ",", 2);
						s_dell.events = s_dell.apl(s_dell.events, "event158", ",", 2)
					} if (eshopprodlist) {
					eshopprodinfo = eshopprodlist.split(",");
					var system_units = 0;
					var system_revenue = 0;
					var prodval = "";
					for (m = 0; m < eshopprodinfo.length; m++) {
						eshopproddets = eshopprodinfo[m].split(";");
						if (eshopproddets[0] === "system") {
							if (s_dell.events.indexOf("event155") <
								0) s_dell.events = s_dell.apl(s_dell.events, "event155", ",", 2);
							if (!prodval) prodval = eshopproddets[1];
							else prodval = prodval + "," + eshopproddets[1];
							system_units = system_units + parseInt(eshopproddets[2]);
							system_revenue = system_revenue + parseInt(eshopproddets[3])
						}
					}
					if (system_units > 0) s_dell.events = s_dell.apl(s_dell.events, "event156\x3d" + system_units, ",", 2);
					if (system_revenue > 0) s_dell.events = s_dell.apl(s_dell.events, "event157\x3d" + system_revenue, ",", 2);
					s_dell.eVar152 = prodval
				}
				s_dell.eVar25 = s_dell.getscMap("salesforcecampaignid");
				s_dell.eVar50 = s_dell.getscMap("leadgenrespondentid");
				if (s_dell.getscMap("leadforminitiated") === "true") s_dell.events = s_dell.apl(s_dell.events, "event17,event32", ",", 2);
				if (s_dell.getscMap("leadformcompleted") === "true") s_dell.events = s_dell.apl(s_dell.events, "event18", ",", 2);
				var products = s_dell.getscMap("products");
				var rev = 0;
				var tot_units = 0;
				if (products)
					for (i = 0; i < products.length; i++)
						if (typeof products[i].sku !== "undefined")
							if (s_dell.products) {
								s_dell.products += ",;" + products[i].sku + ";" + products[i].qty + ";" +
									products[i].price;
								rev = rev + products[i].price;
								tot_units = tot_units + products[i].qty
							} else {
								s_dell.products = ";" + products[i].sku + ";" + products[i].qty + ";" + products[i].price;
								rev = products[i].price;
								tot_units = products[i].qty
							} if (s_dell.getscMap("gpid")) {
					s_dell.currencyCode = s_dell.getscMap("currencycode");
					var event_val = "event181:" + s_dell.getscMap("gpid");
					s_dell.events = s_dell.apl(s_dell.events, event_val, ",", 2);
					s_dell.eVar172 = s_dell.getscMap("gpid");
					s_dell.eVar173 = s_dell.getscMap("paymentmethod");
					s_dell.events = s_dell.apl(s_dell.events,
						"event186\x3d" + rev, ",", 2);
					s_dell.events = s_dell.apl(s_dell.events, "event187\x3d" + tot_units, ",", 2)
				}
				window.dellmetrics_pagenav = function(pagename, message) {
					if (pagename) {
						s_dell.prop13 = "";
						if (Dell.Metrics.sc.cms)
							if (Dell.Metrics.sc.cms === "dfsportal" || Dell.Metrics.sc.cms === "Insights" || Dell.Metrics.sc.cms === "dellemc") s_dell.pageName = pagename;
						window.consent_tcall()
					} else if (message) {
						s_dell.prop13 = s_dell.pageName + "|" + message;
						window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69,prop75", message,
							true, "o")
					}
				};
				window.Iperceptionsurveyinvite = function(iperceptionuserid, btnName) {
					s_dell.prop13 = s_dell.pageName + "[tab\x3d" + btnName + "]";
					s_dell.eVar42 = iperceptionuserid;
					linkTracking("event23", "eVar42", "prop13,prop14,prop17,prop27,prop29,prop46,prop49,prop69,prop75", btnName, true, "o")
				};
				window.pageView = function() {
					s_dell.prop13 = "";
					resetEvents();
					s_dell.prop16 = "";
					s_dell.eVar120 = "";
					s_dell.eVar23 = "";
					s_dell.prop33 = "";
					s_dell.events = "event23";
					s_dell.eVar40 = "site search";
					window.consent_tcall()
				};
				window.eshopmetricsTrack =
					function(btnname, prodid) {
						if (btnname) {
							s_dell.prop13 = s_dell.pageName + "|" + btnname;
							s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
							if (prodid) {
								prodval = prodid.split(",");
								for (i = 0; i < prodval.length; i++)
									if (i == 0) s_dell.products = ";" + prodval[i];
									else s_dell.products = s_dell.products + ",;" + prodval[i]
							}
							window.linkTracking("scAdd", "products,eVar32", "prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75", btnname, true, "o")
						}
					};
				window.eshop_registrationlogin = function(action, status) {
					s_dell.events = s_dell.repl(s_dell.events,
						",event159", "", 2);
					btnname = action + status;
					if (action === "register")
						if (status === "pass") {
							s_dell.events = s_dell.apl(s_dell.events, "event159", ",", 2);
							s_dell.prop13 = s_dell.pageName + "|" + btnname
						} else s_dell.prop13 = s_dell.pageName + "|" + btnname;
					if (action === "login")
						if (status === "pass") {
							s_dell.prop13 = s_dell.pageName + "|" + btnname;
							s_dell.prop12 = "logged in"
						} else {
							s_dell.prop13 = s_dell.pageName + "|" + btnname;
							s_dell.prop12 = "not logged in"
						} window.linkTracking("event159", "eVar105", "prop12,prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75",
						btnname, true, "o")
				};
				if (typeof Dell.Metrics.sc.cms !== "undefined" && Dell.Metrics.sc.cms.indexOf("emc") >= 0 && document.URL.indexOf("auth/search.htm") >= 0);
				else window.consent_tcall();
				window.dellmetricsopinionlabTrack = function(submission_id, btnname) {
					if (submission_id !== "undefined") {
						Dell.Metrics.sc.submission_id = submission_id;
						s_dell.eVar105 = Dell.Metrics.sc.submission_id
					}
					if (btnname !== "undefined" && btnname !== "") s_dell.prop13 = btnname;
					window.linkTracking("", "eVar105", "prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75",
						btnname, true, "o")
				};
				window.dellmetrics_trackvalue = function(btnname, videoid, vocguid) {
					if (btnname !== "") {
						if (s_dell.prop13) s_dell.prop13 = s_dell.prop13 + "|" + btnname;
						else s_dell.prop13 = s_dell.pageName + "|" + btnname;
						if (typeof videoid !== "undefined" && videoid !== "") {
							s_dell.prop24 = videoid;
							s_dell.events = "event16"
						}
						if (typeof vocguid !== "undefined" && vocguid !== "") s_dell.eVar13 = vocguid;
						linkTracking("event16,event23", "eVar13,eVar53,eVar55", "prop13,prop14,prop24,prop29,prop46,prop47,prop49,prop75", btnname, true, "o")
					}
				};
				window.dellmetrics_trackdata =
					function(btnname, keyword) {
						if (btnname !== "") {
							s_dell.prop13 = s_dell.pageName + "|" + btnname;
							if (keyword !== "") s_dell.prop7 = keyword;
							linkTracking("event23", "eVar53,eVar55", "prop7,prop13,prop14,prop24,prop29,prop46,prop47,prop49,prop75", btnname, true, "o")
						}
					};
				clickSelectors = ".dellmetrics-socialfacebook,.dellmetrics-socialtwitter,.dellmetrics-sociallinkedin,.dellmetrics-socialemail," + ".dellmetrics-socialwidget,.dellmetrics-search,.dellmetrics-filter,.dellmetrics-eventregister";

				function setJQueryListeners() {
					(function($) {
						Bootstrapper.on("click",
							clickSelectors,
							function() {
								var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
									metrics = $(this).data("metrics"),
									btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
								s_dell.prop13 = s_dell.pageName + "|" + btnName;
								window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69,prop75", suffix, true, "o")
							});
						Bootstrapper.on("click", "[data-pagenav]", function() {
							var pagenav = $(this).data("pagenav");
							s_dell.prop13 = s_dell.pageName +
								"|" + (typeof pagenav !== "undefined" && typeof pagenav.btnname !== "undefined") ? pagenav.btnname : s_dell.pageName;
							s_dell.t()
						});
						Bootstrapper.on("click", ".dellmetrics-download", function() {
							var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
								metrics = $(this).data("metrics"),
								btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
							s_dell.prop33 = s_dell.eVar23 = btnName;
							s_dell.prop13 = s_dell.prop32 = s_dell.pageName;
							s_dell.events = s_dell.apl(s_dell.events,
								"event24", ",", 2);
							window.linkTracking("event24", "eVar23", "prop13,prop14,prop29,prop32,prop33,prop46,prop47,prop49,prop69,prop75", suffix, true, "d")
						});
						Bootstrapper.on("click", ".dellmetrics-pgdown", function() {
							var suffix = $(this).attr("class").match(/dellmetrics-\w+/g)[0].replace("dellmetrics-", ""),
								metrics = $(this).data("metrics"),
								btnName = typeof metrics !== "undefined" && typeof metrics.btnname !== "undefined" ? metrics.btnname : suffix;
							s_dell.prop13 = s_dell.pageName + "|" + btnName;
							window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69,prop75",
								suffix, true, "o")
						});
						Bootstrapper.on("click", ".dellmetrics-dataclick", function(e) {
							var clickMap = $(this).attr("data-metrics");
							clickMap = clickMap.replace(/'/g, '"');
							var metricsp = JSON.parse(clickMap);
							var btnName = typeof metricsp !== "undefined" && typeof metricsp.btnname !== "undefined" ? metricsp.btnname : "";
							var livechat = typeof metricsp !== "undefined" && typeof metricsp.LiveChat !== "undefined" ? metricsp.LiveChat : "";
							var contactsales = typeof metricsp !== "undefined" && typeof metricsp.contactsales !== "undefined" ? metricsp.contactsales :
								"";
							var contactussubmit = typeof metricsp !== "undefined" && typeof metricsp.Contactussubmit !== "undefined" ? metricsp.Contactussubmit : "";
							var clickthrutype = typeof metricsp.clickthru !== "undefined" ? metricsp.clickthru : "";
							var doctype = typeof metricsp.doctype !== "undefined" ? metricsp.doctype : "";
							var position = typeof metricsp.position !== "undefined" ? metricsp.position : "";
							var sitesearchdocid = typeof metricsp.productId !== "undefined" ? metricsp.productId : "";
							if (clickthrutype !== "") {
								s_dell.eVar21 = clickthrutype;
								s_dell.eVar19 = doctype;
								s_dell.eVar17 = position;
								if (sitesearchdocid !== "") {
									var strdesturi = sitesearchdocid.split("//");
									if (strdesturi.length > 1);
									s_dell.eVar18 = strdesturi[1]
								}
								s_dell.events = s_dell.apl(s_dell.events, "event20", ",", 2);
								if (btnName !== "") btnName = btnName + ":sitesearchclickthrough"
							}
							if (btnName !== "") s_dell.prop13 = s_dell.pageName + "|" + btnName;
							if (livechat !== "") {
								s_dell.eVar206 = livechat;
								s_dell.events = s_dell.apl(s_dell.events, "event200", ",", 2)
							}
							if (contactsales !== "") {
								s_dell.eVar206 = contactsales;
								s_dell.events = s_dell.apl(s_dell.events,
									"event201", ",", 2)
							}
							if (contactussubmit === "true") s_dell.events = s_dell.apl(s_dell.events, "event202", ",", 2);
							if (typeof metricsp !== "undefined") window.linkTracking("event20,event200,event201,event202", "eVar9,eVar17,eVar18,eVar19,eVar21,eVar22,eVar36,eVar68,products,eVar206", "prop7,prop12,prop13,prop14,prop29,prop47,prop49,,prop69,prop74,prop75", btnName, true, "o")
						})
					})(jQuery)
				}

				function initJQuery() {
					if (typeof jQuery !== "undefined") setJQueryListeners();
					else {
						if (adb.jQueryRetryCount < 3) setTimeout(initJQuery, 1E3);
						adb.jQueryRetryCount++
					}
				}
				adb.jQueryRetryCount = 0;
				initJQuery()
			};
			adbFun.loadADB = function() {
				try {
					if (adb.publishPath === "external" || adb.publishPath === "externalDev")
						if (document.location.href.indexOf("tdm.dell.com") > -1) setTimeout(adbFun.loadConfig, 500);
						else if (Dell.Metrics.sc.applicationname !== "dell-brand.com" && adb.allowedCMS.indexOf(Dell.Metrics.sc.cms.toLowerCase()) > -1) {
						setTimeout(adbFun.loadConfig, 0);
						return true
					} else
						for (let i = 0; i < adb.hostList.length; i++) {
							if (document.location.href.includes(adb.hostList[i])) {
								setTimeout(adbFun.loadConfig,
									0);
								return true
							}
						} else if (adb.publishPath === "stpfooter" || adb.publishPath === "stpfooterdev")
							if (Dell.Metrics.sc.country === "cn" && typeof Dell.Metrics.sc.module !== "undefined" && Dell.Metrics.sc.module === "csb_chinalandingpage") return false;
							else {
								setTimeout(adbFun.loadConfig, 0);
								return true
							}
					else {
						setTimeout(adbFun.loadConfig, 0);
						return true
					}
				} catch (e) {
					adbFun.gbLoggingFun("Error", e.toString(), "loadADB")
				}
			};
			adb.executeADB = adbFun.loadADB();
			reportPerfTimings("end")
		}, 4014135, [3935191, 3761060], 759955, [717321, 717328]);
		Bootstrapper.bindDependencyImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			if (Dell.Metrics.sc.cms === "eshop" || Dell.Metrics.sc.applicationname === "dell-brand.com" || Dell.Metrics.sc.cms === "dellstore") {
				function resetValues(list) {
					list = list.split(",");
					for (var i in list) s_dell[list[i]] = ""
				}
				resetEvents = function() {
					s_dell["events"] = ""
				};
				if (s_dell && s_dell != undefined) {
					var analytics_ctry = ["ar", "at", "ba", "gb", "be", "bg", "br", "ch", "ci", "cl", "co", "cn", "cr",
						"cy", "cz", "de", "dk", "ed", "ee", "es", "fi", "fr", "gf", "gp", "gr", "hr", "hu", "ie", "is", "it", "jp", "kv", "li", "lt", "lu", "lv", "mt", "nl", "no", "pa", "pe", "pf", "pl", "pt", "ro", "se", "si", "sk", "uk"
					];
					s_dell.pageName = s_dell.getscMap("pagename");
					s_dell.prop2 = s_dell.getscMap("country");
					s_dell.prop3 = s_dell.getscMap("language");
					s_dell.eVar32 = s_dell.eVar34 = s_dell.getscMap("segment");
					if (Dell.Metrics.sc.cms !== "dellstore") s_dell.prop5 = "Corporate Online";
					s_dell.prop6 = s_dell.eVar33 = s_dell.getscMap("customerset");
					if (s_dell.getscMap("detailpagename")) s_dell.prop13 =
						s_dell.pageName + "|" + s_dell.getscMap("detailpagename");
					s_dell.events = "";
					if (Dell.Metrics.sc.cms != "undefined" && (Dell.Metrics.sc.cms === "dellstore" || Dell.Metrics.sc.cms === "lithium" || Dell.Metrics.sc.cms === "lithium|coveo" || Dell.Metrics.sc.cms === "emcsales" || Dell.Metrics.sc.cms === "emcknowledgecenter" || Dell.Metrics.sc.cms === "emcpartnerportal" || Dell.Metrics.sc.cms === "dfsportal" || Dell.Metrics.sc.cms === "Insights" || Dell.Metrics.sc.cms === "mysales")) s_dell.prop29 = Dell.Metrics.sc.cms;
					else s_dell.prop29 = "3rd party sites";
					s_dell.prop7 = s_dell.getscMap("searchTerm");
					s_dell.eVar60 = Dell.Metrics.sc.mmconnid !== "undefined" ? Dell.Metrics.sc.mmconnid : "";
					s_dell.eVar61 = Dell.Metrics.sc.mmuuid !== "undefined" ? Dell.Metrics.sc.mmuuid : "";
					s_dell.eVar8 = s_dell.getscMap("ref");
					if (s_dell.getscMap("lwp")) s_dell.prop49 = "?" + s_dell.getscMap("lwp");
					else if (typeof Dell.Metrics.sc.country !== "undefined" && typeof Dell.Metrics.sc.language !== "undefined") s_dell.prop49 = "?c\x3d" + Dell.Metrics.sc.country + "\x26l\x3d" + Dell.Metrics.sc.language + "\x26s\x3dcorp";
					else s_dell.prop49 = "?c\x3dus\x26l\x3den\x26s\x3dcorp";
					if (adb.publishPath !== "NA") s_dell.prop53 = adb.publishPath;
					s_dell.eVar114 = adbFun.getGlassboxSessionReplayLink();
					if (Dell.Metrics.sc.cms === "dellstore") {
						s_dell.prop49 = "?c\x3d" + Dell.Metrics.sc.country + "\x26l\x3d" + Dell.Metrics.sc.language + "\x26s\x3d" + Dell.Metrics.sc.segment;
						if (!s_dell.prop11) s_dell.prop11 = s_dell.getscMap("categoryid");
						if (s_dell.getscMap("devicetype")) s_dell.eVar63 = s_dell.getscMap("devicetype");
						if (s_dell.getscMap("myaccountlogin") === "true") s_dell.prop12 =
							"logged in";
						else s_dell.prop12 = "not logged in";
						if (!s_dell.prop40) s_dell.prop40 = s_dell.getscMap("pagenumber")
					}
					s_dell.prop64 = s_dell.getscMap("multioc");
					s_dell.eVar101 = s_dell.getscMap("productvariant");
					s_dell.eVar102 = s_dell.getscMap("productid");
					s_dell.eVar150 = s_dell.getscMap("eshoppaymenttype");
					s_dell.eVar151 = s_dell.getscMap("eshoppurchaseid");
					if (Dell.Metrics.sc.cms === "dellstore") {
						if (!s_dell.eVar171) s_dell.eVar171 = s_dell.getscMap("paymentmethod");
						if (!s_dell.eVar170) s_dell.eVar170 = s_dell.getscMap("ordernumber");
						s_dell.eVar122 = s_dell.getscMap("itemtype");
						if (typeof s_dell.getscMap("products") === "object" && s_dell.getscMap("products").length > 0) {
							var str_array = s_dell.getscMap("products");
							var tot_units = 0;
							var tot_revenue = 0;
							var config_units = 0;
							var snp_units = 0;
							var str_unit_cpm;
							if (s_dell.eVar122) var str_units = Dell.Metrics.sc.itemtype.split(",");
							for (var i = 0; i < str_array.length; i++)
								if (i == 0)
									if (typeof str_array[i].qty !== "undefined") {
										s_dell.products = ";" + str_array[i].id + ";" + str_array[i].qty + ";" + str_array[i].price;
										tot_units =
											tot_units + str_array[i].qty;
										tot_revenue = tot_revenue + str_array[i].price;
										if (str_units && str_units.length > 0) {
											str_unit_cpm = str_units[i].split(":");
											if (str_unit_cpm[i] === str_array[i].id)
												if (str_unit_cpm[1].indexOf("config") > -1) config_units = config_units + str_array[i].qty;
												else if (str_unit_cpm[1].indexOf("SNA") > -1) snp_units = snp_units + str_array[i].qty
										}
									} else s_dell.products = ";" + str_array[i].id;
							else if (typeof str_array[i].qty !== "undefined") {
								s_dell.products = s_dell.products + ",;" + str_array[i].id + ";" + str_array[i].qty +
									";" + str_array[i].price;
								tot_units = tot_units + str_array[i].qty;
								tot_revenue = tot_revenue + str_array[i].price;
								if (str_units && str_units.length > 0) {
									str_unit_cpm = str_units[i].split(":");
									if (str_unit_cpm[0] === str_array[i].id)
										if (str_unit_cpm[1].indexOf("config") > -1) config_units = config_units + str_array[i].qty;
										else if (str_unit_cpm[1].indexOf("SNA") > -1) snp_units = snp_units + str_array[i].qty
								}
							} else s_dell.products = s_dell.products + ",;" + str_array[i].id;
							if (s_dell.eVar170) {
								if (tot_units > 0) s_dell.events = s_dell.apl(s_dell.events,
									"event172\x3d" + tot_units, ",", 2);
								if (tot_revenue > 0) s_dell.events = s_dell.apl(s_dell.events, "event171\x3d" + tot_revenue, ",", 2);
								if (config_units > 0) s_dell.events = s_dell.apl(s_dell.events, "event144\x3d" + config_units, ",", 2);
								if (snp_units > 0) s_dell.events = s_dell.apl(s_dell.events, "event145\x3d" + snp_units, ",", 2)
							}
						}
					}
					var eshopprodlist = s_dell.getscMap("eshopproducts");
					if (s_dell.getscMap("eshoptotalrevenue")) {
						s_dell.currencyCode = "cny";
						s_dell.events = s_dell.apl(s_dell.events, "event130\x3d" + s_dell.getscMap("eshoptotalrevenue"),
							",", 2)
					}
					if (s_dell.getscMap("eshoptotalunits")) s_dell.events = s_dell.apl(s_dell.events, "event131\x3d" + s_dell.getscMap("eshoptotalunits"), ",", 2);
					s_dell.waapplication = s_dell.getscMap("waapplication");
					if (s_dell.getscMap("cms") === "dellstore") s_dell.waapplication = s_dell.getscMap("waapplicationname").toLowerCase();
					s_dell.wacontroller = s_dell.getscMap("wacontroller");
					if (s_dell.waapplication.toLowerCase() == "ecomm" || s_dell.wacontroller.toLowerCase() == "contents") {
						s_dell.events = s_dell.apl(s_dell.events, "scView",
							",", 2);
						if (s_dell.getscMap("cms") === "eshop") s_dell.events = s_dell.apl(s_dell.events, "event160", ",", 2)
					}
					if (s_dell.waapplication.toLowerCase() == "ecomm") {
						if (s_dell.wacontroller.toLowerCase() == "shipping" || s_dell.wacontroller.toLowerCase() == "confirmation") {
							s_dell.events = s_dell.apl(s_dell.events, "scCheckout", ",", 2);
							if (s_dell.getscMap("cms") === "eshop") s_dell.events = s_dell.apl(s_dell.events, "event158", ",", 2)
						}
						if (s_dell.wacontroller.toLowerCase() == "confirmation" && s_dell.getscMap("cms") == "dellstore")
							if (s_dell.getscMap("ordernumber")) {
								s_dell.purchaseID =
									s_dell.getscMap("ordernumber");
								s_dell.events = s_dell.apl(s_dell.events, "purchase" + ":" + s_dell.purchaseID, ",", 2);
								s_dell.currencyCode = s_dell.getscMap("currencycode");
								s_dell.state = s_dell.getscMap("state");
								s_dell.zip = s_dell.getscMap("zip")
							}
					}
					if (eshopprodlist) {
						eshopprodinfo = eshopprodlist.split(",");
						var system_units = 0;
						var system_revenue = 0;
						var prodval = "";
						for (m = 0; m < eshopprodinfo.length; m++) {
							eshopproddets = eshopprodinfo[m].split(";");
							if (eshopproddets[0] === "system") {
								if (s_dell.events.indexOf("event155") < 0) s_dell.events =
									s_dell.apl(s_dell.events, "event155", ",", 2);
								if (!prodval) prodval = eshopproddets[1];
								else prodval = prodval + "," + eshopproddets[1];
								system_units = system_units + parseInt(eshopproddets[2]);
								system_revenue = system_revenue + parseInt(eshopproddets[3])
							}
						}
						if (system_units > 0) s_dell.events = s_dell.apl(s_dell.events, "event156\x3d" + system_units, ",", 2);
						if (system_revenue > 0) s_dell.events = s_dell.apl(s_dell.events, "event157\x3d" + system_revenue, ",", 2);
						s_dell.eVar152 = prodval
					}
					s_dell.eVar25 = s_dell.getscMap("salesforcecampaignid");
					s_dell.eVar50 =
						s_dell.getscMap("leadgenrespondentid");
					if (s_dell.getscMap("leadforminitiated") === "true") s_dell.events = s_dell.apl(s_dell.events, "event17,event32", ",", 2);
					if (s_dell.getscMap("leadformcompleted") === "true") s_dell.events = s_dell.apl(s_dell.events, "event18", ",", 2);
					if (s_dell.getscMap("emcstartcheckout") === "true") s_dell.events = s_dell.apl(s_dell.events, "event150", ",", 2);
					if (s_dell.getscMap("emccheckout") === "true") s_dell.events = s_dell.apl(s_dell.events, "event151", ",", 2);
					if (Dell.Metrics.sc.userdata)
						if (Dell.Metrics.sc.userdata.affinityId) {
							s_dell.eVar57 =
								Dell.Metrics.sc.userdata.affinityId;
							s_dell.prop46 = Dell.Metrics.sc.userdata.guid;
							if (s_dell.prop46) s_dell.prop12 = "logged in";
							else s_dell.prop12 = "not logged in";
							s_dell.eVar207 = Dell.Metrics.sc.userdata.companyName;
							if (Dell.Metrics.sc.userdata.partnerTrack)
								if (Dell.Metrics.sc.userdata.partnerTrack.length > 0)
									for (i = 0; i < Dell.Metrics.sc.userdata.partnerTrack.length; i++)
										if (i == 0) s_dell.eVar208 = Dell.Metrics.sc.userdata.partnerTrack[i];
										else s_dell.eVar208 = s_dell.eVar208 + "|" + Dell.Metrics.sc.userdata.partnerTrack[i];
							if (Dell.Metrics.sc.userdata.partnerRelationship)
								if (Dell.Metrics.sc.userdata.partnerRelationship.length > 0)
									for (i = 0; i < Dell.Metrics.sc.userdata.partnerRelationship.length; i++)
										if (i == 0) s_dell.eVar209 = Dell.Metrics.sc.userdata.partnerRelationship[i];
										else s_dell.eVar209 = s_dell.eVar209 + "|" + Dell.Metrics.sc.userdata.partnerRelationship[i];
							if (Dell.Metrics.sc.userdata.partnerPurchaseModel)
								if (Dell.Metrics.sc.userdata.partnerPurchaseModel.length > 0)
									for (i = 0; i < Dell.Metrics.sc.userdata.partnerPurchaseModel.length; i++)
										if (i ==
											0) s_dell.eVar210 = Dell.Metrics.sc.userdata.partnerPurchaseModel[i];
										else s_dell.eVar210 = s_dell.eVar210 + "|" + Dell.Metrics.sc.userdata.partnerPurchaseModel[i];
							if (Dell.Metrics.sc.userdata.emcIdentityType)
								for (i = 0; i <= Dell.Metrics.sc.userdata.emcIdentityType.length; i++)
									if (i == 0) s_dell.eVar111 = Dell.Metrics.sc.userdata.emcIdentityType[i];
									else s_dell.eVar111 = s_dell.eVar111 + "|" + Dell.Metrics.sc.userdata.emcIdentityType[i]
						} window.dellmetrics_pagenav = function(pagename, message) {
						if (pagename) {
							s_dell.prop13 = "";
							if (Dell.Metrics.sc.cms)
								if (Dell.Metrics.sc.cms ===
									"dfsportal" || Dell.Metrics.sc.cms === "Insights") s_dell.pageName = pagename;
							window.consent_tcall()
						} else if (message) {
							s_dell.prop13 = s_dell.pageName + "|" + message;
							window.linkTracking("", "", "prop13,prop14,prop29,prop46,prop47,prop49,prop69,prop75", message, true, "o")
						}
					};
					window.Iperceptionsurveyinvite = function(iperceptionuserid, btnName) {
						s_dell.prop13 = s_dell.pageName + "[tab\x3d" + btnName + "]";
						s_dell.eVar42 = iperceptionuserid;
						linkTracking("event23", "eVar42", "prop13,prop14,prop17,prop27,prop29,prop46,prop49,prop69,prop75",
							btnName, true, "o")
					};
					window.pageView = function() {
						s_dell.prop13 = "";
						resetEvents();
						s_dell.eVar23 = "";
						s_dell.prop33 = "";
						s_dell.prop16 = "";
						s_dell.eVar120 = "";
						s_dell.events = "event23";
						s_dell.eVar40 = "site search";
						window.consent_tcall()
					};
					Bootstrapper.on("click", ".dellmetrics-pp", function() {
						try {
							if (s_dell.prop29 === "dfsportal") {
								s_dell.pageName = Dell.Metrics.sc.pagename;
								s_dell.prop13 = Dell.Metrics.sc.detailpagename !== "undefined" ? Dell.Metrics.sc.detailpagename : "";
								s_dell.pageName = Dell.Metrics.sc.pagename !== "undefined" ? Dell.Metrics.sc.pagename :
									"";
								window.dellmetrics_pagenav(s_dell.pageName)
							}
						} catch (e) {}
					});
					window.dellmetricsopinionlabTrack = function(submission_id, btnname) {
						if (submission_id !== "undefined") {
							Dell.Metrics.sc.submission_id = submission_id;
							s_dell.eVar105 = Dell.Metrics.sc.submission_id
						}
						if (btnname !== "undefined" && btnname !== "") s_dell.prop13 = btnname;
						window.linkTracking("", "eVar105", "prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75", btnname, true, "o")
					};
					window.eshopmetricsTrack = function(btnname, prodid) {
						if (btnname) {
							s_dell.prop13 =
								s_dell.pageName + "|" + btnname;
							s_dell.events = s_dell.apl(s_dell.events, "scAdd", ",", 2);
							if (prodid) {
								prodval = prodid.split(",");
								for (i = 0; i < prodval.length; i++)
									if (i == 0) s_dell.products = ";" + prodval[i];
									else s_dell.products = s_dell.products + ",;" + prodval[i]
							}
							window.linkTracking("scAdd", "products,eVar32", "prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75", btnname, true, "o")
						}
					};
					window.eshop_registrationlogin = function(action, status) {
						s_dell.events = s_dell.repl(s_dell.events, ",event159", "", 2);
						btnname = action + status;
						if (action === "register")
							if (status === "pass") {
								s_dell.events = s_dell.apl(s_dell.events, "event159", ",", 2);
								s_dell.prop13 = s_dell.pageName + "|" + btnname
							} else s_dell.prop13 = s_dell.pageName + "|" + btnname;
						if (action === "login")
							if (status === "pass") {
								s_dell.prop13 = s_dell.pageName + "|" + btnname;
								s_dell.prop12 = "logged in"
							} else {
								s_dell.prop13 = s_dell.pageName + "|" + btnname;
								s_dell.prop12 = "not logged in"
							} window.linkTracking("event159", "eVar105", "prop12,prop13,prop14,prop17,prop20,prop29,prop46,prop49,prop69,prop75", btnname, true, "o")
					};
					if (Dell.Metrics.sc.cms.indexOf("emc") >= 0 && document.URL.indexOf("auth/search.htm") >= 0);
					else window.consent_tcall()
				}
			}
		}, 3996718, [4013984], 717567, [717561]);
		Bootstrapper.bindImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			window.dell_tms_util = {};
			window.DELL_mBox_cmsTimeout = 0;
			Dell = window.Dell || {};
			Dell.Metrics = Dell.Metrics || {};
			Dell.Metrics.sc = Dell.Metrics.sc || {};
			dell_tms_util.getCookie = function(cookie_name) {
				var results = document.cookie.match("(^|;) ?" + cookie_name + "\x3d([^;]*)(;|$)");
				if (results) return unescape(results[2]);
				else return null
			};
			dell_tms_util.getParameterByName = function(name, qstring) {
				name =
					name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?\x26]" + name + "\x3d([^\x26#]*)"),
					results = regex.exec(qstring);
				return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
			};
			dell_tms_util.iFrame = function() {
				try {
					return window.self !== window.top
				} catch (e) {
					return true
				}
			};
			dell_tms_util.getscMap = function(key) {
				var scMap = Dell.Metrics.sc;
				return typeof scMap[key] != "undefined" ? scMap[key].toLowerCase() : "undefined"
			};
			if (dell_tms_util.getscMap("country") !== "undefined" && dell_tms_util.getscMap("language") !==
				"undefined" && dell_tms_util.getscMap("segment") !== "undefined" && dell_tms_util.getscMap("customerset") !== "undefined" && dell_tms_util.getscMap("cms") !== "undefined") {
				Bootstrapper.scDataObj.country = dell_tms_util.getscMap("country");
				Bootstrapper.scDataObj.language = dell_tms_util.getscMap("language");
				Bootstrapper.scDataObj.segment = dell_tms_util.getscMap("segment");
				Bootstrapper.scDataObj.cset = dell_tms_util.getscMap("customerset");
				Bootstrapper.scDataObj.cms = dell_tms_util.getscMap("cms");
				if (Bootstrapper.scDataObj.cms.toLowerCase() ===
					"stp") Bootstrapper.scDataObj.cms = "stp-datalayer"
			} else {
				var metaTags = document.getElementsByTagName("meta"),
					metaName = "",
					metaContent = "",
					metaCount = 0,
					metaLength = metaTags.length;
				Bootstrapper.scDataObj = Bootstrapper.scDataObj || {};
				for (metaCount; metaCount < metaLength; metaCount++) {
					metaName = metaTags[metaCount].name || "";
					metaContent = metaTags[metaCount].content.toLowerCase() || "";
					if (/language/i.test(metaName)) Bootstrapper.scDataObj.language = Dell.Metrics.sc.language = metaContent;
					else if (/segment/i.test(metaName)) Bootstrapper.scDataObj.segment =
						Dell.Metrics.sc.segment = metaContent;
					else if (/customerset/i.test(metaName)) Bootstrapper.scDataObj.cset = Dell.Metrics.sc.customerset = metaContent;
					else if (/documentcountrycode|country/i.test(metaName)) Bootstrapper.scDataObj.country = Dell.Metrics.sc.country = metaContent;
					else if (/generator/i.test(metaName)) {
						var cmsVal = "other";
						if (/^storm/i.test(metaContent)) cmsVal = "Storm";
						else if (/^ng/i.test(metaContent)) cmsVal = "NG";
						else if (/^(stp|transactional)/i.test(metaContent)) cmsVal = "STP";
						else if (/^mse/i.test(metaContent)) cmsVal =
							"FUELSPA";
						else if (/^build:\s\d+\./i.test(metaContent)) cmsVal = metaContent.split("Built")[0].replace(/(\s|:)/g, "");
						Bootstrapper.scDataObj.cms = Dell.Metrics.sc.cms = cmsVal
					} else if (/mbox-to/i.test(metaName)) window.DELL_mBox_cmsTimeout = metaContent
				}
				var location_href = window.location.href,
					lwp = dell_tms_util.getCookie("lwp");
				if (typeof Bootstrapper.scDataObj.cset === "undefined")
					if (/cs=/i.test(location_href)) Bootstrapper.scDataObj.cset = Dell.Metrics.sc.customerset = dell_tms_util.getParameterByName("cs", location_href);
					else Bootstrapper.scDataObj.cset = Dell.Metrics.sc.customerset = dell_tms_util.getParameterByName("cs", lwp);
				if (typeof Bootstrapper.scDataObj.segment === "undefined")
					if (/\\?s=/i.test(location_href) || /&s=/i.test(location_href)) Bootstrapper.scDataObj.segment = Dell.Metrics.sc.segment = dell_tms_util.getParameterByName("s", location_href);
					else Bootstrapper.scDataObj.segment = Dell.Metrics.sc.segment = dell_tms_util.getParameterByName("s", lwp);
				metaTags = null
			}
		}, 3935191, 717321);
		Bootstrapper.bindDependencyImmediate(function() {
				var Bootstrapper = window["Bootstrapper"];
				var ensightenOptions = Bootstrapper.ensightenOptions;
				if (Dell.Metrics.sc.cms === "eshop" || Dell.Metrics.sc.applicationname === "dell-brand.com" || Dell.Metrics.sc.cms === "dellstore") {
					Dell = window.Dell || {};
					Dell.Metrics = Dell.Metrics || {};
					Dell.Metrics.sc = Dell.Metrics.sc || {};
					var scMap = Dell.Metrics.sc;
					var version = "AppMeasurement 2.25.0",
						env = "dev";
					try {
						var env = /dev/ig.test(Bootstrapper.ensightenOptions.publishPath) ? "dev" : ""
					} catch (e) {}
					var s_account =
						"dellglobalonlinemaster" + env;
					s_dell = s_gi(s_account);
					adbFun.trackHash();
					if (!s_dell.localDoms) s_dell.localDoms = "javascript:,dell.,dell-solution.,getronicsservices.,delltrainingcentre.,dellworld.,activeevents.,dellstorage.,dellcomputer.,dellcomputers.,dellcustomerservice.,delldirect.,delldrivers.,dellfinancial.,dellfinancialservices.,dellideas.,dellnet.,dellstore.,dellsupport.,delltalk.,dellteam.,dellvistaupgrade.,dfsdirectsales.,inspiron.";
					if (!s_dell.supportDoms) s_dell.supportDoms = "docs.,dellcustomerservice.";
					s_dell.isPageLoad = true;
					s_dell.charSet = "UTF-8";
					s_dell.trackDownloadLinks = true;
					s_dell.trackExternalLinks = true;
					s_dell.trackInlineStats = true;
					s_dell.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,png,xlsm";
					s_dell.linkInternalFilters = s_dell.localDoms + ",madebydell.,futurereadyeconomies.,info-event.,alienwarearena.,securitythinkingcap.,teksecurityblog.,yougeek.,privacyguidance.,jurinnov.,businessesgrow.,stoweboyd.,millennialceo.,govcloudnetwork.,dellassetlibrary.,cloudwaysapps.,dellstore.,picwebtools.,eloqua.,paywithdfs.,techpageone.,yourdellsolution.,imagebank.,dellnewscentre.,dellmodularservices.,techconcierge.,equallogic.,secureworks.,alienware.,alienwarearena.,alienwaregiveaway.,dell-ins.,easy2.,ideastorm.,livelook.,sellpoint.,syndication.intel.,triaddigital.,webcollage.,force.,salesforce.,delldigitalmodule.,dellcoloradvantage.,dellcloud.,dellcampaignbuilder.,kacenetworks.,dell-brand.,kace.,netexam.,iolo.,myalienware.,dellunite.,workforcetransformationtool.,dellworkforcestudy.,emc.,delltechnologies.,dellemcworld.,dellemcevents.,dell-brand.,compuindia.,nohold.,techdirect.,workforcetransformation.,sonicwall.,lithium.,cloudfront.";
					s_dell.linkLeaveQueryString = false;
					s_dell.ActionDepthTest = true;
					s_dell.eventList = "event81,event82,event83,event84,event85,event87,event56,event58,event21";
					s_dell.usePlugins = true;
					var doPluginsRanAlready = false;
					s_dell.getscMap = function(key) {
						return typeof scMap[key] != "undefined" ? scMap[key] : ""
					};
					try {
						if (typeof Visitor != "undefined") {
							s_dell.visitor = Visitor.getInstance("4DD80861515CAB990A490D45@AdobeOrg");
							setTimeout(adbFun.appendVisitorIDsTo, 0);
							s_dell.eVar71 = s_dell.visitor.getMarketingCloudVisitorID();
							if (!s_dell.eVar71) s_dell.eVar71 =
								typeof s_dell.visitor._fields !== "undefined" && typeof s_dell.visitor._fields.MCMID !== "undefined" ? s_dell.visitor._fields.MCMID : "NA";
							s_dell.contextData["MCMHash"] = adb.MCMHash;
							adbFun.hashGenerator(s_dell.eVar71).then((securedString) => {
								s_dell.contextData["MCMHash"] = securedString;
								adb["MCMHash"] = securedString
							});
							s_dell.eVar80 = s_dell.visitor.getAnalyticsVisitorID();
							s_dell.eVar98 = "clientsidecookie\x3d" + s_dell.visitor.isClientSideMarketingCloudVisitorID();
							s_dell.eVar99 = "mid\x3d" + s_dell.visitor.MCIDCallTimedOut() +
								"|aid\x3d" + s_dell.visitor.AnalyticsIDCallTimedOut() + "|aamid\x3d" + s_dell.visitor.AAMIDCallTimedOut()
						}
						if (s_dell_TLD) s_dell.cookieDomainPeriods = "3"
					} catch (e) {}
					adb.visitorAPIStatus = typeof Visitor != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing";
					adb.jQueryStatus = typeof jQuery != "undefined" ? "jQuery Present" : "jQuery Missing";
					s_dell.eVar37 = adb.visitorAPIStatus + " | " + adb.jQueryStatus;

					function s_dell_doPlugins(s) {
						s.wd = window;
						s.cookieLifetime = "";
						s.prop60 = version;
						if (!s.server) s.server = parseUri(document.location.href).host.replace(/^www[0-9]*\./i,
							"");
						if (!doPluginsRanAlready) s.processLWP();
						s.events = s.events ? s.events : "";
						if (s.onDellCMS()) {
							var pn = s.getHTMLtag("meta", "metricspath").toLowerCase(),
								n = "";
							if (pn.indexOf("\x26eiwatch\x3d") > -1) pn = s.repl(pn, "\x26eiwatch\x3d", "");
							if (!s.pageName || s.pageName.indexOf("dellstore^") > -1) {
								s.pageName = "";
								if (document.location.href == "http://www.dell.com/" || pn == "www1.us.dell.com/us/en/gen//content^default/") s.pageName = "dell.com homepage";
								var pna = s.split(pn, "/");
								if (pna.length > 0 && pna.length < 6)
									if (!s.pageName) {
										if (pn.indexOf("//") >
											-1) pn = pn.substring(pn.indexOf("//") + 2);
										pn = pn.replace(/^www[0-9]*\./i, "");
										if (pn.indexOf("?") > -1) s.pageName = pn.substring(0, pn.indexOf("?"));
										else s.pageName = pn
									} var sc15_host = window.location.host;
								if (sc15_host.indexOf("dell") > -1) {
									var hostSplits = sc15_host.split(".");
									sc15_host = hostSplits[0] == "www" ? hostSplits[1] : hostSplits[0];
									switch (sc15_host) {
										case "configure":
										case "configure2":
										case "pc-configure":
										case "outlet":
										case "outletus":
										case "outletusps3":
										case "cart":
										case "premierecomm":
										case "ecomm":
										case "ecomm2":
										case "lastore":
										case "catalog":
										case "catalog2":
										case "premiercatalog":
										case "brstore":
										case "premierconfigure":
										case "pcommerce":
										case "premierconfig":
										case "aposconfigure":
											s.events =
												s.apl(s.events, "event83", ",", 2);
											break
									}
								}
								if (s.determineCMS() == "storm" && pn && !s.pageName) {
									var a7 = pna[7],
										a6 = pna[6];
									var ovf = af = false;
									var pn = dpn = n = "";
									for (var i = 1; i < 8; i++) {
										if (i == 4 && pna[0].indexOf("premier") > -1) {
											pn = s.apl(pn, "", ":", 0);
											af = true
										}
										if (i == 4 && pna[4].indexOf("rc") == 0 && !af) {
											pn = s.apl(pn, "", ":", 0);
											af = true
										}
										if (i == 6 && a6 && a7) {
											if (pna[6].indexOf("[") > -1) {
												pn = s.apl(pn, "", ":", 0);
												af = true
											}
										} else if (i == 6 && a6) {
											if (pna[6].indexOf("[") > -1) af = true
										} else if (i == 6) {
											pn = s.apl(pn, pna[i], ":", 0);
											af = true
										}
										if (i == 7 && a7) {
											if (a7.indexOf("category_id\x3d") >
												-1) {
												n = a7.substring(a7.indexOf("category_id\x3d") + 12);
												n = n.substring(0, n.indexOf("]"));
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("categoryid\x3d") > -1) {
												n = a7.substring(a7.indexOf("categoryid\x3d") + 11);
												n = n.substring(0, n.indexOf("]"));
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("sku\x3d") > -1 && pn.indexOf("addedtocart") == -1) {
												n = a7.substring(a7.indexOf("sku\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn =
														s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("oc\x3d") > -1 && pna[0].indexOf("premier") == -1 && pn.indexOf("dellstore^config") > -1) {
												n = a7.substring(a7.indexOf("oc\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("product_id\x3d") > -1) {
												n = a7.substring(a7.indexOf("product_id\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf =
														true;
													af = true
												}
											}
											if (a7.indexOf("productid\x3d") > -1) {
												n = a7.substring(a7.indexOf("productid\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("[~id\x3d") > -1 && pn.indexOf("imagedirect") == -1) {
												n = a7.substring(a7.indexOf("id\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("[id\x3d") > -1 && pn.indexOf("imagedirect") == -1) {
												n = a7.substring(a7.indexOf("id\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("topic\x3d") > -1) {
												n = a7.substring(a7.indexOf("topic\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													pn = s.apl(pn, n, "", 0);
													af = true
												} else {
													pn = s.apl(pn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											dpn = pn;
											if (a7.indexOf("section\x3d") > -1) {
												n = a7.substring(a7.indexOf("section\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													dpn = s.apl(dpn, n, "", 0);
													af = true
												} else {
													dpn = s.apl(dpn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("tab\x3d") > -1) {
												n = a7.substring(a7.indexOf("tab\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													dpn = s.apl(dpn, n, "", 0);
													af = true
												} else {
													dpn = s.apl(dpn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("page\x3d") > -1) {
												n = a7.substring(a7.indexOf("page\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													dpn = s.apl(dpn, n, "", 0);
													af = true
												} else {
													dpn = s.apl(dpn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("brandid\x3d") > -1) {
												n = a7.substring(a7.indexOf("brandid\x3d"));
												n = "[" + n.substring(0, n.indexOf("]") + 1);
												if (ovf) {
													dpn = s.apl(dpn, n, "", 0);
													af = true
												} else {
													dpn = s.apl(dpn, n, ":", 0);
													ovf = true;
													af = true
												}
											}
											if (a7.indexOf("cat\x3d") > -1) {
												n = a7.substring(a7.indexOf("cat\x3d") + 4);
												n = n.substring(0, n.indexOf("]"));
												if (pna[0].indexOf("search") > -1) s.eVar9 = n;
												af = true
											}
										}
										if (!af && i != 7) pn = s.apl(pn, pna[i], ":", 0);
										af = false
									}
									if (pn.length - 1 == pn.lastIndexOf(":")) pn = pn.substring(0, pn.length - 1);
									if (pn.indexOf(":undefined") > -1) pn = pn.substring(0, pn.indexOf(":undefined"));
									if (dpn.length - 1 == dpn.lastIndexOf(":")) dpn = dpn.substring(0, dpn.length - 1);
									if (pn.indexOf("dellstore:") ==
										0) pn = pn.substring(10, pn.length);
									if (dpn.indexOf("dellstore:") == 0) dpn = dpn.substring(10, dpn.length);
									s.pageName = pn;
									dpn = dpn ? s.prop13 = dpn : s.prop13 = pn
								}
							}
							if (!s.pageName) s.pageName = s_dell.getPNfromURL();
							if (!s.prop13) s.prop13 = s.pageName;
							if (s.prop29 == "unknown" || !s.prop29) s.prop29 = "unknown:" + s.server;
							if (s.pageName.indexOf("ajax") > -1)
								if (s.prop13.indexOf(":ajax") > -1) s.pageName = s.prop13.substring(0, s.prop13.indexOf(":ajax"));
								else {
									s.pageName = s.prop13;
									s.prop13 = s.prop13 + ":ajax"
								}
						} else {
							if (!s.pageName) s.pageName = s.getPNfromURL();
							if (!s.prop13) s.prop13 = s.pageName;
							if (s.pageName.indexOf("ideastorm") > -1) {
								s_dell.getQueryParam("Type") ? s_dell.pageName += "|type:" + s_dell.getQueryParam("Type") : "";
								s_dell.getQueryParam("Filter") ? s_dell.pageName += "|filter:" + s_dell.getQueryParam("Filter") : "";
								if (s_dell.getQueryParam("cat")) s_dell.pageName += "|cat:" + s_dell.getQueryParam("cat");
								else if (s_dell.getQueryParam("sta")) s_dell.pageName += "|status:" + s_dell.getQueryParam("sta");
								s_dell.prop13 = s_dell.pageName + (s_dell.getQueryParam("lsi") ? "|:sort:" + s_dell.getQueryParam("lsi") :
									"")
							}
						}
						if (typeof s.linkType == "undefined" || s.linkType == "e") {
							s.gpv_pn = s.getPreviousValue(s.pageName, "gpv_pn", "");
							if (s.gpv_pn == "no value") s.gpv_pn = ""
						}
						var spg = false;
						if (!spg && s.server.indexOf("dell") >= 0 && s.server.indexOf("support") >= 0) spg = true;
						if (!spg && s.server.match("(" + s.supportDoms.replace(/,/gi, "|").replace(/\./gi, "\\.") + ")")) spg = true;
						if (!spg && s.determineCMS() == "nextgen") {
							var urlpn = document.location.pathname.toLowerCase();
							if (urlpn) {
								if (!spg && urlpn.indexOf("/order-support") >= 0) spg = true;
								if (!spg && urlpn.indexOf("/support") >=
									0) spg = true
							}
						}
						s.events = s.apl(s.events, spg ? "event22" : "event23", ",", 2);
						s.events = s.apl(s.events, spg ? "event85" : "event86", ",", 2);
						if (typeof s.linkType != "undefined" && s.linkType != 0) {
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop49", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop46", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "server", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop5", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop13", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "events", ",", 2);
							s.linkTrackEvents =
								s.apl(s.linkTrackEvents, "event22", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event23", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event81", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event82", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event83", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event84", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event85", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event86", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event87",
								",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "eVar37", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "eVar71,eVar80", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop53", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "eVar114", ",", 2)
						}
						if (s.onDellCMS()) {
							s.prop7 = s.getscMap("searchTerm");
							if (s.getscMap("searchterm")) s.prop7 = s_dell.getscMap("cms") + ":" + s.getscMap("searchterm");
							s.ss_kw = s.getHTMLtag("input", "kw", "id", "value");
							s.ss_rff = s.getHTMLtag("input", "rff", "id", "value");
							s.es_on = s.getHTMLtag("input", "order_number",
								"name", "value");
							s.ss_dkw = s.getQueryParam("sk");
							if (s.es_on) s.prop22 = s.es_on;
							if (s.ss_kw && s.ss_rff)
								if (s.ss_rff == "1") s.prop7 = s.ss_kw;
								else if (s.ss_rff == "2") s.prop7 = "reclink:" + s.ss_kw;
							else if (s.ss_rff == "3") s.prop7 = "othercat:" + s.ss_kw;
							else {
								if (s.ss_rff == "0") s.prop7 = "null:" + s.ss_kw
							} else if (s.ss_dkw) s.prop7 = "redirect:" + s.ss_dkw;
							if (s.prop7) {
								s.prop7 = s.prop7.toLowerCase();
								s.eVar36 = s.prop7;
								var t_search = s.getValOnce(s.eVar36, "v36", 0);
								if (t_search) {
									s.events = s.apl(s.events, "event6", ",", 2);
									s.prop42 = s.gpv_pn
								}
							}
							s.prop43 =
								s.getQueryParam("ID", "", "?" + gC("SITESERVER"));
							if (!s.prop17) s.prop17 = s.getHTMLtag("input", "servicetagmetricsid", "id", "value");
							if (s.pageName.indexOf("order^recentorders") > -1 || s.pageName.indexOf("order^details") > -1 || s.pageName.indexOf("order^singlestatus") > -1 || s.pageName.indexOf("order^multiplestatus") > -1) s.events = s.apl(s.events, "event11", ",", 2);
							if (s.pageName.indexOf("dellstore^basket") > -1) {
								s.events = s.apl(s.events, "scView", ",", 2);
								s.events = s.apl(s.events, "event81", ",", 2)
							}
							if (s.pageName.indexOf("chkout") >
								-1) {
								s.events = s.apl(s.events, "scCheckout", ",", 2);
								s.events = s.apl(s.events, "event82", ",", 2)
							}
							if (s.pageName.indexOf("sna^productdetail") > -1 || s.pageName.indexOf("content^products^productdetails") > -1) {
								var prod = s.getQueryParam("sku,oc");
								s.events = s.events ? s.events : "";
								if (s.events.indexOf("prodView,event2") > -1) s.events = s.repl(s.events, "prodView,event2", "");
								if (prod && s.events.indexOf("event3") > -1) {
									if (prod.indexOf(",")) prod = s.repl(prod, ",", ",;");
									s.products = s.apl(s.products, ";" + prod, ",", 2)
								} else if (prod) {
									prod = s.dedupVal("sku_oc",
										prod);
									if (prod) {
										if (prod.indexOf(",")) prod = s.repl(prod, ",", ",;");
										s.products = s.apl(s.products, ";" + prod, ",", 2);
										s.events = s.apl(s.events, "prodView", ",", 2);
										s.events = s.apl(s.events, "event2", ",", 2)
									}
								}
							}
							if (s.pageName.indexOf("dellstore^config") > -1) {
								var oc = s.getQueryParam("oc");
								if (oc) oc = s.dedupVal("ocstart", oc);
								if (oc) {
									s.products = s.apl(s.products, ";" + oc, ",", 2);
									s.events = s.apl(s.events, "event10", ",", 2);
									s.events = s.apl(s.events, "prodView", ",", 2);
									s.events = s.apl(s.events, "event2", ",", 2)
								}
							}
							if (s.pageName.indexOf("candyaisle") >
								-1) {
								var oc = s.getQueryParam("oc");
								if (oc) oc = s.dedupVal("ocstart", oc);
								if (oc) {
									s.products = s.apl(s.products, ";" + oc, ",", 2);
									s.events = s.apl(s.events, "event56", ",", 2)
								}
							}
							if (s.products) {
								s.products = s.events ? s.products : "";
								s.events = s.events ? s.events : "";
								if (s.products && s.products.indexOf(";") != 0 && s.events.indexOf("scAdd") > -1) {
									var p = s.products;
									if (p.indexOf(";") > -1 && p.indexOf(",;") > -1) s.products = ";" + p;
									else if (p.indexOf(";") > -1) {
										var pa = s.split(p, ";");
										p = ";" + pa[0];
										for (var i = 1; i < pa.length; i++) p += ",;" + pa[i];
										s.products = p
									} else s.products =
										";" + p
								}
							}
							var loc = document.location.href;
							if (loc.indexOf("/financing/app.aspx") > -1 || loc.indexOf("/financing/us_ca/app.aspx") > -1 || loc.indexOf("/financing/process.aspx") > -1) s.events = s.apl(s.events, "event8", ",", 2);
							if (loc.indexOf("/financing/approved.aspx") > -1 || loc.indexOf("/financing/us_ca/approved.aspx") > -1 || loc.indexOf("/financing/declined.aspx") > -1 || loc.indexOf("/financing/reviewed.aspx") > -1 || loc.indexOf("/financing/us_ca/reviewed.aspx") > -1) s.events = s.apl(s.events, "event9", ",", 2);
							if (loc.indexOf("accessories") >
								-1 || s.pageName.indexOf("accessories") > -1) {
								s.events = s.apl(s.events, "event12", ",", 2);
								s.events = s.apl(s.events, "event84", ",", 2)
							}
							s.prop45 = s.c_r("GAAuth");
							if (!s.prop45) {
								var cookieArray = document.cookie.split(";");
								for (var i = 0; i < cookieArray.length; i++) {
									var cookie = cookieArray[i];
									while (cookie.charAt(0) == " ") cookie = cookie.substring(1, cookie.length);
									if (cookie.match(/gahot=/i)) s.prop45 = cookie.substring(6, cookie.length)
								}
							}
							s.prop46 = s.c_r("Profile") ? s.c_r("Profile") : s.c_r("profile");
							s.prop48 = s.parseCookie("prt:Prof",
								"cnm,sid,cs", ",");
							s.prop16 = s.parseCookie("StormPCookie", "penv", ",");
							var bn_search = s.c_r("search_bn");
							s.prop16 = s.getQueryParam("penv", "", s.prop16);
							s.prop12 = s.prop45 ? "logged in" : "not logged in";
							if (s.pageName.indexOf("content^public^notfound") > -1 || s.pageName.indexOf("content^public^error") > -1) {
								if (!s.prop44) {
									var errQP = s.getQueryParam("searched");
									if (!errQP) errQP = s.getQueryParam("aspxerrorpath");
									s.prop44 = errQP ? errQP.replace(":80", "") : document.location.href
								}
								var refdom = parseUri(document.referrer).host.toLowerCase();
								if (refdom.indexOf("dell.") == -1 || !gC("lwp")) s.prop5 = "not set"
							}
							loc = document.location.href;
							if (loc.indexOf("ecomm") > -1 && s.eVar30) {
								s.eVar30 = "";
								if (s.events.indexOf("event10") > -1) {
									var eventlist = s.split(s.events, ",");
									for (i in eventlist)
										if (eventlist[i] == "event10") eventlist[i] = "";
									s.events = "";
									for (i in eventlist)
										if (eventlist[i]) s.events = s.apl(s.events, eventlist[i], ",", 2)
								}
							}
							loc = document.location.href;
							loc = (loc && loc.indexOf("?") > -1 ? loc.substring(0, loc.indexOf("?")) : loc).toLowerCase();
							s.iPerceptionsURL = (window.location.protocol ==
								"https:" ? "https://si.cdn" : "http://i") + ".dell.com/images/global/omniture/ipge" + (s_account.substring(s_account.length - 3) == "dev" ? "_sit" : "") + ".htm";
							s.GenesisExchange.setExchangePageURL("iPerceptions", s.iPerceptionsURL);
							if (s.inList("event6", s.events, ",")) s.eVar40 = "site search";
							else if (s.eVar30 && s.eVar31) {
								s.eVar40 = "anav";
								if (s.p_gh()) s.linkTrackVars = s.apl(s.linkTrackVars, "eVar40", ",", 2)
							} else if (s.getQueryParam("~ck").toLowerCase() == "mn") s.eVar40 = "masthead";
							else if (s.getQueryParam("~ck").toLowerCase() == "hbn" ||
								s.getQueryParam("ref").toLowerCase() == "hbn" || s.getQueryParam("~ck").toLowerCase() == "bnn" || s.getQueryParam("ref").toLowerCase() == "bnn" || s.getQueryParam("ref").toLowerCase() == "gzilla" || s.getQueryParam("~ck").toLowerCase() == "gzilla") s.eVar40 = "banner";
							else if (s.pageName)
								if (s.pageName.indexOf("advisorweb") > -1) s.eVar40 = "advisor";
							if (getDomainLevels(document.referrer, 3) == "nicos.co.jp") s.referrer = document.location.protocol + "//" + document.location.host.toString() + "/nicos-payment-processing"
						}
						s.tnt = s.trackTNT();
						if (typeof Dell.Metrics.sc.tti !== "undefined") s.eVar11 = Dell.Metrics.sc.tti;
						var ppv_c = s.getPercentPageViewed(s.pageName);
						if (ppv_c && ppv_c.length >= 4) {
							var ppv_pn = ppv_c.length > 0 ? ppv_c[0] : "";
							var ppv_v = (ppv_c.length > 0 ? ppv_c[1] : "") + (ppv_c.length > 2 ? "|" + ppv_c[2] : "");
							if (ppv_pn && ppv_v) {
								s.prop34 = ppv_pn;
								s.prop31 = ppv_v
							}
						}
						if (!s.campaign) s.campaign = s.getQueryParam("cid");
						if (!s.eVar1) s.eVar1 = s.getQueryParam("lid");
						var cidLID = s.campaign + "::" + s.eVar1;
						cidLID = s.getValOnce(cidLID, "cidlid", 0);
						cidLID = cidLID.split("::");
						if (cidLID.length >
							1) {
							s.campaign = cidLID[0];
							s.eVar1 = cidLID[1]
						} else {
							s.campaign = "";
							s.eVar1 = ""
						}
						if (!s.eVar2 && s.campaign != "") {
							var dgc = s.getQueryParam("dgc");
							s.eVar2 = dgc
						}
						if (!s.eVar3) s.eVar3 = s.getQueryParam("st");
						if (!s.eVar28) s.eVar28 = s.getQueryParam("acd");
						if (!s.eVar43) s.eVar43 = s.getQueryParam("mid");
						if (!s.eVar44) s.eVar44 = s.getQueryParam("rid");
						if (!s.eVar149) {
							s.eVar149 = s.getQueryParam("gacd");
							if (s.eVar149) s.eVar148 = s.eVar149
						}
						if (typeof s.linkType == "undefined") {
							s.odgValues = "|af|ba|bf|cj|co|db|dc|ds|ec|em|ls|mb|ms|mt|rs|sm|ss|st|";
							var countrySegment = "";
							if (s.prop2 && s.eVar32) countrySegment = s.prop2 + "-" + s.eVar32;
							if (countrySegment) {
								var d = new Date,
									valueNotDeleted = true;
								if (s.c_r("e21") && s.c_r("e21").indexOf(countrySegment) > -1) {
									var e21Array = s.split(s.c_r("e21"), "::");
									for (i in e21Array)
										if (e21Array[i].toString().indexOf(countrySegment) > -1) {
											var e21Array2 = s.split(e21Array[i], ":");
											if (d.getTime() > e21Array2[1]) {
												if (e21Array.length == 1) {
													d.setTime(d.getTime() - 864E5);
													s.c_w("e21", "", d)
												} else {
													e21Array.splice(i, 1);
													d.setTime(d.getTime() + 30 * 864E5);
													s.c_w("e21",
														e21Array, d)
												}
												valueNotDeleted = false
											}
											if (valueNotDeleted) {
												var tempReferrer = s.d.referrer.substring(0, s.d.referrer.indexOf("?"));
												if (s.eVar2 && s.odgValues.indexOf(s.eVar2.toLowerCase() + "|") == -1 && s.eVar2 != "ir" || !s.getQueryParam("dgc") && tempReferrer && !s.isInternal(tempReferrer))
													if (e21Array.length == 1) {
														d.setTime(d.getTime() - 864E5);
														s.c_w("e21", "", d)
													} else {
														e21Array.splice(i, 1);
														d.setTime(d.getTime() + 30 * 864E5);
														s.c_w("e21", e21Array, d)
													}
												else s.events = s.apl(s.events, "event21", ",", 1)
											}
										}
								} else if (s.eVar2 && s.odgValues.indexOf(s.eVar2.toLowerCase() +
										"|") > -1) {
									s.events = s.apl(s.events, "event21", ",", 1);
									d.setTime(d.getTime() + 30 * 864E5);
									var e21Cookie = s.c_r("e21");
									e21Cookie = e21Cookie ? e21Cookie + "::" + countrySegment + ":" + d.getTime() : countrySegment + ":" + d.getTime();
									s.c_w("e21", e21Cookie, d)
								}
							}
						}
						if (s.tCall()) {
							s.SEMvar = s.getQueryParam("s_kwcid");
							s.SEMvar = s.getValOnce(s.SEMvar, "SEM_var", 0);
							s.clickPast(s.SEMvar, "event46", "event47", "br_psearch");
							if (s.isInternal(document.location.href))
								if (s.ActionDepthTest)
									if (typeof s.gpv_pn != "undefined" && s.gpv_pn != s.pageName) {
										s.pdvalue =
											s.getActionDepth("s_depth");
										if (s.pdvalue == 1) s.events = s.apl(s.events, "event44", ",", 2);
										if (s.pdvalue == 2) s.events = s.apl(s.events, "event45", ",", 2);
										s.ActionDepthTest = false
									}
						}
						if (dgc && dgc.toLowerCase() == "ir") {
							if (typeof s.gpv_pn != "undefined" && s.gpv_pn != s.pageName && s.c_r("s_depth") > 1) {
								s.eVar29 = s.getQueryParam("cid") + ":" + s.getQueryParam("lid");
								s.eVar29 = s.getValOnce(s.eVar29, "ir", 0)
							}
							s.campaign = s.eVar1 = s.eVar2 = s.eVar3 = s.eVar28 = ""
						}
						if (s.linkURL && s.linkType === "d") {
							s.prop33 = s.linkURL;
							s.prop33 = s.prop33.indexOf("//") ?
								s.prop33.substring(s.prop33.indexOf("//") + 2) : s.prop33;
							s.eVar23 = s.prop33;
							s.prop32 = s.pageName;
							s.events = s.apl(s.events, "event24", ",", 2);
							window.consent_tlcall("", "d", "");
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop69", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop75", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop5", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop32", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "prop33", ",", 2);
							s.linkTrackVars = s.apl(s.linkTrackVars, "eVar23", ",", 2);
							s.linkTrackVars =
								s.apl(s.linkTrackVars, "events", ",", 2);
							s.linkTrackEvents = s.apl(s.linkTrackEvents, "event24", ",", 2)
						}
						if (s.linkType === "e") window.consent_tlcall("", "e", "");
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop69", ",", 2);
						s.linkTrackVars = s.apl(s.linkTrackVars, "prop75", ",", 2);
						if (s.isInternal(document.location.href) && !s.onDellCMS()) {
							s.prop7 = s.getQueryParam("sk,k,q", "::");
							if (s.prop7) {
								s.prop7 = s.prop7.toLowerCase();
								s.eVar36 = s.prop7;
								var t_search = s.getValOnce(s.eVar36, "v36", 0);
								if (t_search) {
									s.events = s.apl(s.events, "event6",
										",", 2);
									s.prop42 = s.gpv_pn
								}
							}
						}
						s.eVar7 = s.c_r("EQuoteID");
						s.eVar45 = s.getQueryParam("link_number");
						s.prop51 = s.getQueryParam("docid");
						s.events = s.events = s.apl(s.events, "event37", ",", 2);
						s.eVar14 = s.getQueryParam("avt,avtsub");
						var roleNameCookie = s.getCookie("prt:Prof");
						roleNameCookie = roleNameCookie == undefined ? "" : roleNameCookie;
						var roleName = roleNameCookie.split("\x26")[0].split("\x3d");
						if (roleName[0] == "rolename") s.eVar58 = roleName[1];
						s.channelManager("ba,st,em,af,cj,ss,dm,dc,sm,ec,jp,ad,ms,tv,ds,rs,mb,co,cid",
							"", "0", 1, "s_dl");
						if (s._keywords && s._keywords != "n/a" && s._channel == "Natural Search") {
							s.eVar49 = s._keywords;
							s.eVar52 = s._keywords + ":" + document.location.href
						}
						var CID = s.getQueryParam("cid");
						if (CID && s.campaign) s.eVar48 = s.campaign;
						else if (CID);
						else if (location.href.indexOf("s_kwcid") > -1) s.eVar48 = "SearchCenter";
						else if (s._keywords && s._keywords != "n/a") s.eVar48 = s._partner + " organic";
						else if (s._referrer != "Direct Load" && s._referrer != "" && s._referringDomain != "" && s._referringDomain.indexOf("dell.") == -1 && s._referringDomain.indexOf("dellfinancialservices.com") ==
							-1 && s._referringDomain.indexOf("dellcomputers.") == -1 && s._referringDomain.indexOf("dellcomputer.") == -1) {
							var domain = s._referringDomain.split(".");
							s.eVar48 = (domain.length > 2 ? domain[domain.length - 3] + "." : "") + domain[domain.length - 2] + "." + domain[domain.length - 1]
						}
						s.eVar51 = s.eVar2;
						if (s.eVar51 == undefined || s.eVar51 == "")
							if (s._channel) s.eVar51 = s._channel;
							else if (s._keywords) s.eVar51 = "Organic Search";
						else if (s._referringDomain) s.eVar51 = s._referringDomain;
						s.eVar51 = s.crossVisitParticipation(s.eVar51, "s_channelstack",
							"90", "5", " \x3e ", "purchase", "1");
						s.prop47 = "D\x3ds_vi";
						if (s.prop1 == "productdetails") s.events = s.apl(s.events, "event46", ",", 2);
						s.eVar53 = "D\x3dpageName";
						s.prop14 = location.href.split("?")[0];
						if (location.href.indexOf("support") > -1 && location.href.indexOf("contact") > -1) s.events = s.apl(s.events, "event41", ",", 2);
						if (!s_dell.events.match("event22") && location.href.indexOf("accessories") < 0) {
							s.events = s.apl(s.events, "event49", ",", 2);
							s.events = s.apl(s.events, "event87", ",", 2)
						}
						if (document.getElementById("floatingToolbar") &&
							(s.eVar38 === undefined || s.evar38 == ""))
							if (s.c_r("hideDellToolbar") == "true") s.eVar38 = "floating toolbar: closed";
							else s.eVar38 = "floating toolbar: open";
						else if (s.eVar38 === undefined || s.evar38 == "") s.eVar38 = "floating toolbar: no toolbar";
						s.eVar59 = s.getQueryParam("mfgpid");
						if (document.getElementById("ctl00_ctl00_PartnerData")) {
							var element = document.getElementById("ctl00_ctl00_PartnerData");
							s.eVar57 = element.value
						}
						var hostname = s_dell.d.location.hostname;
						if (hostname.indexOf("partnerdirect.dell.com") > -1 || hostname.indexOf("ping.dellcampaignbuilder.com") >
							-1 || hostname.indexOf("dell.netexam.com") > -1) s_dell.prop5 = "Channel Online";
						s.mboxCookie = s.c_r("mbox");
						if (s.mboxCookie) try {
							s.mboxCookie = s.mboxCookie.split("|");
							for (var i = 0; i < s.mboxCookie.length; i++)
								if (s.mboxCookie[i].indexOf("PC") > -1) {
									s.pcid = i;
									break
								} s.pcid = s.mboxCookie[s.pcid];
							s.pcid = s.pcid.split("#");
							s.pcid = s.pcid[1];
							s.prop59 = s.pcid
						} catch (err) {} finally {
							if (s.c_r("mbox").indexOf("timeout") > -1) s.prop59 = "browsertimeout"
						}
						s.eVar79 = s.getscMap("solutionpro");
						if (s.getscMap("searchresults")) {
							s.event98 = s.getscMap("searchresults");
							s.events = s.apl(s.events, "event98", ",", 2)
						}
						s_dell.eVar129 = s_dell.getscMap("tenantID");
						s.eVar105 = s.getscMap("submission_id");
						if (s_dell.linkType !== "o" && s_dell.linkType !== "d") s_dell.prop20 = s_dell.getscMap("supportappindex");
						s_dell.prop40 = s_dell.getscMap("pageNumber");
						s_dell.hier1 = s_dell.getscMap("hier");
						s_dell.eVar73 = s_dell.getscMap("lithiumsearchrefinement");
						if (!s.hier1) s.hier1 = s.getscMap("hier1");
						s.eVar81 = s.getscMap("searchresults");
						if (s.getValOnce(s.eVar81, "v81", 0)) s.events = s.apl(s.events, "event99",
							",", 2);
						if (s.getscMap("searchterm")) {
							s.prop7 = s_dell.getscMap("cms") + ":" + s.getscMap("searchterm");
							s.prop40 = s.getscMap("pageNumber");
							s.eVar109 = s.getscMap("coveovisitor");
							if (s.getscMap("coveosearchrefinement") !== "") s.eVar73 = s.getscMap("coveosearchrefinement")
						}
						if (Dell.Metrics.sc.userdata) {
							if (Dell.Metrics.sc.userdata.affinityId) s_dell.eVar57 = Dell.Metrics.sc.userdata.affinityId;
							s_dell.prop46 = Dell.Metrics.sc.userdata.guid;
							if (s_dell.prop46) s_dell.prop12 = "logged in";
							else s_dell.prop12 = "not logged in";
							s_dell.eVar207 =
								Dell.Metrics.sc.userdata.companyName;
							if (Dell.Metrics.sc.userdata.userId) s_dell.eVar110 = Dell.Metrics.sc.userdata.userId;
							if (Dell.Metrics.sc.userdata.partnerTrack) s_dell.eVar208 = Dell.Metrics.sc.userdata.partnerTrack;
							if (Dell.Metrics.sc.userdata.partnerTier) s_dell.eVar209 = Dell.Metrics.sc.userdata.partnerTier;
							if (Dell.Metrics.sc.userdata.productPurchasePath) s_dell.eVar210 = Dell.Metrics.sc.userdata.productPurchasePath;
							if (Dell.Metrics.sc.userdata.emcIdentityType)
								for (i = 0; i < Dell.Metrics.sc.userdata.emcIdentityType.length; i++)
									if (i ==
										0) s_dell.eVar111 = Dell.Metrics.sc.userdata.emcIdentityType[i];
									else s_dell.eVar111 = s_dell.eVar111 + "|" + Dell.Metrics.sc.userdata.emcIdentityType[i]
						}
						s.readmboxcookie = s.c_r("mboxtimeouts");
						if (s.readmboxcookie) try {
							var cmboxtimeout = JSON.parse(s.readmboxcookie);
							var mboxval;
							var pgnameinitval;
							var pgnameval;
							var strtimeout;
							for (i = 0; i < cmboxtimeout.length; i++)
								if (i == 0) {
									mboxval = cmboxtimeout[i].mbox;
									pgnameinitval = cmboxtimeout[i].pgname;
									strtimeout = cmboxtimeout[i].pgname + ":" + cmboxtimeout[i].mbox
								} else if (cmboxtimeout[i].pgname ===
								pgnameinitval) strtimeout = strtimeout + "*" + cmboxtimeout[i].mbox;
							else {
								strtimeout = strtimeout + "," + cmboxtimeout[i].pgname + ":" + cmboxtimeout[i].mbox;
								pgnameinitval = cmboxtimeout[i].pgname
							}
							s.eVar108 = strtimeout;
							if (s.eVar108) document.cookie = "mboxtimeouts" + "\x3d;Expires\x3dThu, 01 Jan 1970 00:00:01 GMT;" + "Path\x3d/;" + "domain\x3ddell.com;"
						} catch (e) {}
						if (!doPluginsRanAlready) {
							s.readtnttrack = s.c_r("tntTrack");
							if (s.readtnttrack) try {
								var trackvals = JSON.parse(s.readtnttrack),
									curr, spl;
								for (i = 0; i < trackvals.length; i++) {
									curr =
										trackvals[i];
									spl = curr.indexOf(",") > -1 ? curr.split(",") : curr;
									if (i == 0) s.prop16 = spl;
									else if (i === 1);
									else if (i === 2) s.eVar120 = spl
								}
								document.cookie = "tntTrack" + "\x3d;Expires\x3dThu, 01 Jan 1970 00:00:01 GMT;" + "Path\x3d/;" + "domain\x3ddell.com;"
							} catch (e) {}
						}
						s.c_r("s_hwp") == "" ? s.createData() : s.updateData();
						var temp = s.c_r("mhclicktrack");
						if (temp && !doPluginsRanAlready) {
							temp = s.split(temp, "|");
							var mhValues = new Array;
							var pairs;
							for (var x = 0; x < temp.length; x++) {
								if (temp[x]) pairs = s.split(temp[x], "\x3d");
								if (pairs[1]) mhValues[x] =
									pairs[1]
							}
							s.prop62 = mhValues[3] + "|" + mhValues[5] + "|" + mhValues[1] + "|" + mhValues[2];
							s.prop62 = s.getValOnce(s.prop62, "gvo_c62")
						}
						if (s.getPNfromURL().indexOf("accessories") > -1) {
							var metricsFamily = "",
								metricsPath = s.getHTMLtag("meta", "metricspath");
							if (metricsPath.indexOf("family") > -1) {
								metricsFamily = "::" + metricsPath.split("family\x3d")[1].split("]")[0];
								s.pageName += metricsFamily;
								s.prop13 += metricsFamily
							} else if (metricsPath.indexOf("mfgpid") > -1) {
								metricsFamily = "::" + metricsPath.split("mfgpid\x3d")[1].split("]")[0];
								s.pageName +=
									metricsFamily;
								s.prop13 += metricsFamily
							}
						}
						if (!s.eVar71) s.eVar71 = s.visitor.getMarketingCloudVisitorID();
						if (document.location.protocol == "file:") s.un = "dellinternal";
						s.cookieLifetime = 63113900;
						doPluginsRanAlready = true
					}
					s_dell.doPlugins = s_dell_doPlugins;
					var gigya_omniture_conf = {
						linkName: "Gigya Action",
						eventMap: [{
							gigEvent: "login",
							omtrEvents: ["event42"],
							mapVars: ["eVar55\x3duser.loginProvider", "eVar54\x3dgetAge()", "eVar54\x3dgetGender()", "eVar54\x3dgetiRank()"]
						}, {
							gigEvent: "sendDone",
							omtrEvents: ["event43"],
							mapVars: ["eVar55\x3dproviders",
								"products"
							]
						}, {
							gigEvent: "commentSubmitted--disabled",
							omtrEvents: [""],
							mapVars: ["eVar55\x3dproviderPostIDs", "products"]
						}, {
							gigEvent: "reactionClicked--disabled",
							omtrEvents: [""],
							mapVars: ["\x3dreaction.ID", "products"]
						}],
						getAge: function(evt) {
							var a = evt.user["age"];
							if (typeof a == "number" && a > 0) return a;
							return "?"
						},
						getGender: function(evt) {
							var g = evt.user["gender"];
							if (typeof g == "string" && g.length > 0) return g;
							return "?"
						},
						getiRank: function(evt) {
							if (typeof evt.user["iRank"] == "string") {
								var r = parseFloat(evt.user["iRank"]).toFixed(0);
								if (r >= 1E-4) return r
							}
							return "?"
						}
					};
					s_dell.baseCategory = "";
					s_dell.viewerFrame = "";
					s_dell.lastFrame = "";
					s_dell.viewerType = "unknown";
					s_dell.asset = "";
					s_dell.internalCounter = 0;
					s_dell.currAsset = "";
					s_dell.currZoomLevel = "";
					s_dell.currImageMaps = new Array;
					s_dell.zoomLevelNumbers = [37, 74, 100];
					s_dell.zoomLevelCategories = ["I", "II", "III"];
					s_dell.currEvent = "";
					s_dell.prevEvent = "";
					s_dell.currAssetType = "";
					s_dell.zoomEventCnt = 0;
					window.s7ComponentEvent = function(objectID, componentClass, instanceName, timeStamp, eventData) {
						s7track(eventData)
					};

					function s7pullProductParam(query) {
						if (!query) return "";
						var dQuery;
						try {
							dQuery = decodeURIComponent(query)
						} catch (e) {
							dQuery = query
						}
						var lQuery = dQuery.toLowerCase();
						var params = ["rolloverkey", "rollover_key", "p", "productkey", "pid"];
						for (var n in params) {
							var m1 = lQuery.indexOf(params[n] + "\x3d");
							if (m1 == undefined || m1 == -1) continue;
							m1 += params[n].length + 1;
							var m2 = lQuery.indexOf("\x26", m1);
							return m2 > m1 ? dQuery.substring(m1, m2) : dQuery.substr(m1)
						}
						return ""
					}

					function s7track(eventInfo, rolloverInfo) {
						var eventValues = eventInfo.split(",");
						var eventType = eventValues[0].toString();
						var eventData = eventValues.length > 1 ? unescape(eventValues[1].toString()) : "";
						var params = new Array;
						var paramsRaw = eventInfo.split(",");
						var tmp = "";
						for (var param in paramsRaw) {
							tmp = paramsRaw[param].toString();
							if (tmp.length < 100) params.push(decodeURIComponent(paramsRaw[param] + ""))
						}
						if (eventType == "SWATCH") eventType = "PAGE";
						if (eventType == "SPIN") eventType = "PAGE";
						if (eventType == "TARG") eventType = "TARGET";
						if (eventType == "PAGE") s_dell.currEvent = "PAGE";
						if (eventType == "SWAP") {
							s_dell.lastFrame =
								s_dell.viewerFrame;
							s_dell.viewerFrame = params[1];
							if (params.length >= 2) s_dell.asset = params[1]
						} else if (eventType == "LOAD")
							if (params.length > 1) {
								s_dell.currEvent = "LOAD";
								s_dell.viewerType = params[1];
								var assetPos = 6;
								if (s_dell.viewerType == 3) assetPos = 7;
								else if (s_dell.viewerType == 2) assetPos = 7;
								else if (s_dell.viewerType == 5) assetPos = 7;
								else if (s_dell.viewerType < 100) assetPos = 7;
								if (params.length >= assetPos) s_dell.asset = params[assetPos] + "";
								var url = "http://scene7-cdn.dell.com/is/image/" + s_dell.asset + "?req\x3dset,json";
								$.ajax({
									url: url,
									data: "id\x3dresponse1",
									dataType: "jsonp"
								})
							} s_dell.prop4 = "";
						s_dell.internalCounter++;
						if (eventType == "ITEM" && eventData.indexOf("rollover") != -1) {
							var equalIndex = eventData.indexOf("\x3d");
							var keyData = eventData.substring(equalIndex + 1);
							var found = false;
							var currImageMapName = "";
							for (var i = 0; i < s_dell.currImageMaps.length; i++) {
								currImageMapName = s_dell.currImageMaps[i];
								if (currImageMapName == keyData) {
									found = true;
									break
								}
							}
							if (!found) {
								s_dell.currImageMaps.push(keyData);
								s_dell.prop4 = keyData;
								s_dell.linkTrackVars = "prop4";
								return s_dell.t()
							}
						}
						if (eventType ==
							"ZOOM") {
							var bWriteZoomEventData = true;
							if (s_dell.prevEvent == "PAGE" || s_dell.zoomEventCnt > 0) s_dell.zoomEventCnt = s_dell.zoomEventCnt + 1;
							if (s_dell.currEvent == "LOAD" || s_dell.currEvent == "SWAP" || s_dell.currEvent == "PAGE" || s_dell.prevEvent == "PAGE" || s_dell.zoomEventCnt > 1 && s_dell.zoomEventCnt <= 3) {
								s_dell.currEvent = "ZOOM";
								bWriteZoomEventData = false
							}
							if (bWriteZoomEventData) {
								var zoomLevel = Math.round(params[1]);
								for (var i = 0; i < s_dell.zoomLevelNumbers.length; i++)
									if (zoomLevel <= s_dell.zoomLevelNumbers[i]) {
										s_dell.prop4 = "targ:" +
											s_dell.currAsset + ":" + s_dell.zoomLevelCategories[i];
										break
									} s_dell.currAssetType = "";
								s_dell.linkTrackVars = "prop4";
								return s_dell.t()
							}
						}
						if (eventType == "TARGET") {
							s_dell.prop4 = params[0];
							s_dell.linkTrackVars = "prop4";
							return s_dell.t()
						}
						if (eventType == "SWAP") {
							s_dell.currEvent = "SWAP";
							s_dell.prop4 = s_dell.asset;
							s_dell.currAsset = s_dell.asset;
							s_dell.linkTrackVars = "prop4";
							return s_dell.t()
						}
						if (eventType == "HREF") {
							s_dell.prop4 = rolloverInfo == undefined ? s7pullProductParam(eventData) : rolloverInfo;
							s_dell.linkTrackVars = "prop4";
							return s_dell.t()
						}
						s_dell.prevEvent = s_dell.currEvent;
						s_dell.internalCounter--
					}
					window.s7jsonResponse = function(data, id) {
						s_dell.currAsset = data.set.item[0].i.n;
						s_dell.currAssetType = data.set.type
					};
					window.assetType = function(data, id) {
						s_dell.currAssetType = data.set.type
					};
					s_dell.getVisitNum = new Function("tp", "c", "c2", "" + "var s\x3dthis,e\x3dnew Date,cval,cvisit,ct\x3de.getTime(),d;if(!tp){tp\x3d'm';}" + "if(tp\x3d\x3d'm'||tp\x3d\x3d'w'||tp\x3d\x3d'd'){eo\x3ds.endof(tp),y\x3deo.getTime();e.setTi" + "me(y);}else {d\x3dtp*86400000;e.setTime(ct+d);}if(!c){c\x3d's_vnum';}if(!" +
						"c2){c2\x3d's_invisit';}cval\x3ds.c_r(c);if(cval){var i\x3dcval.indexOf('\x26vn\x3d" + "'),str\x3dcval.substring(i+4,cval.length),k;}cvisit\x3ds.c_r(c2);if(cvisi" + "t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els" + "e {return 'unknown visit number';}}else {if(str){str++;k\x3dcval.substri" + "ng(0,i);e.setTime(k);s.c_w(c,k+'\x26vn\x3d'+str,e);e.setTime(ct+1800000);" + "s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'\x26vn\x3d1',e)" + ";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
					s_dell.dimo = new Function("m", "y", "" + "var d\x3dnew Date(y,m+1,0);return d.getDate();");
					s_dell.endof = new Function("x", "" + "var t\x3dnew Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x\x3d\x3d" + "'m'){d\x3ds.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if(" + "x\x3d\x3d'w'){d\x3d7-t.getDay();}else {d\x3d1;}t.setDate(t.getDate()+d);return " + "t;");
					s_dell.getCookie = function(a) {
						var b, c, d, e = document.cookie.split(";");
						for (b = 0; b < e.length; b++) {
							c = e[b].substr(0, e[b].indexOf("\x3d"));
							d = e[b].substr(e[b].indexOf("\x3d") +
								1);
							c = c.replace(/^\s+|\s+$/g, "");
							if (c == a) return unescape(d)
						}
						return ""
					};
					s_dell.rml = new Function("value", "list", "separator", "" + "separator\x3dseparator||',';var values\x3dlist.split(',');for(var i\x3d0;i\x3cv" + "alues.length;i++){if(values[i]\x3d\x3dvalue){values.splice(i,1);return va" + "lues.join(',');}}return list;");
					s_dell.oncePerVisit = new Function("key", "eventList", "days", "cookieName", "" + "var s\x3dthis;var keyValueString,keyValues;var events;var foundKey\x3dfal" + "se;var date;var newEventList;var cookieEvents;var newCookieValue\x3d''" +
						";if(days){if(days!\x3d0){date\x3dnew Date();var currentTime\x3ddate.getTime(" + ");date.setTime(currentTime+days*24*60*60*1000);}else date\x3d0;}else{d" + "ate\x3dnew Date();var currentTime\x3ddate.getTime();date.setTime(currentT" + "ime+30*60*1000);}eventList\x3deventList?eventList:s.eventList;eventLis" + "t\x3ds.split(eventList,',');cookieName\x3dcookieName?cookieName:'s_opv';v" + "ar cookieValue\x3ds.c_r(cookieName);if(cookieValue){keyValueString\x3ds.s" + "plit(cookieValue,'\x3e');var keys;for(i\x3d0;i\x3ckeyValueString.length;i++)" +
						"{keyValues\x3ds.split(keyValueString[i],'|');newEventList\x3dcookieEvents" + "\x3dkeyValues[1];if(keyValues[0]\x3d\x3dkey){foundKey\x3dtrue;events\x3ds.split(s." + "events,',');for(x\x3d0;x\x3cevents.length;x++){for(y\x3d0;y\x3ceventList.length" + ";y++){if(events[x]\x3d\x3deventList[y]){if(s.inList(events[x],cookieEvent" + "s)){s.events\x3ds.rml(events[x],s.events);}newEventList\x3ds.apl(newEvent" + "List,events[x],',',2);}}}}newCookieValue\x3ds.apl(newCookieValue,keyVa" + "lues[0]+'|'+newEventList,'\x3e',0);}if(!foundKey){for(x\x3d0;x\x3ceventList." +
						"length;x++){if(s.inList(eventList[x],s.events)){newEventList\x3ds.apl(" + "newEventList,eventList[x],',',2);}else{newEventList\x3ds.rml(eventLis" + "t[x],newEventList);}}if(newEventList)s.c_w(cookieName" + ",cookieVal" + "ue+'\x3e'+key+'|'+newEventList,date);else s.c_w(cookieName,n" + "ewCook" + "ieValue,date);}else{s.c_w(cookieName,newCookieValue,date);}}e" + "lse{events\x3ds.split(s.events,',');for(x\x3d0;x\x3ceventList.length;x++){fo" + "r(y\x3d0;y\x3cevents.length;y++){if(eventList[x]\x3d\x3devents[y]){newEventList" +
						"\x3ds.apl(newEventList,events[y],',',0);}}}if(newEventList)s.c_w(cooki" + "eName,key+'|'+newEventList,date);}");
					s_dell.getValOnce = new Function("v", "c", "e", "" + "var s\x3dthis,k\x3ds.c_r(c),a\x3dnew Date;e\x3de?e:0;if(v){a.setTime(a.getTime(" + ")+e*86400000);s.c_w(c,v,e?a:0);}return v\x3d\x3dk?'':v");
					s_dell.getPreviousValue = new Function("v", "c", "el", "" + "var s\x3dthis,t\x3dnew Date,i,j,r\x3d'';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i\x3ds.split(el,',');j\x3ds.split(s.events,',');for(x in i" +
						"){for(y in j){if(i[x]\x3d\x3dj[y]){if(s.c_r(c)) r\x3ds.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r\x3ds.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
					s_dell.setupDynamicObjectIDs = new Function("" + "var s\x3dthis;if(!s.doi){s.doi\x3d1;if(s.apv\x3e3\x26\x26(!s.isie||!s.ismac||s.apv" + "\x3e\x3d5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else" + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa" + "lse);else{s.doiol\x3ds.wd.onload;s.wd.onload\x3ds.setOIDs}}s.wd.s_semapho" +
						"re\x3d1}");
					s_dell.setOIDs = new Function("e", "" + "var s\x3ds_c_il[" + s_dell._in + "],b\x3ds.eh(s.wd,'onload'),o\x3d'onclick',x,l,u,c,i" + ",a\x3dnew Array;if(s.doiol){if(b)s[b]\x3ds.wd[b];s.doiol(e)}if(s.d.links)" + "{for(i\x3d0;i\x3cs.d.links.length;i++){l\x3ds.d.links[i];c\x3dl[o]?''+l[o]:'';b" + "\x3ds.eh(l,o);z\x3dl[b]?''+l[b]:'';u\x3ds.getObjectID(l);if(u\x26\x26c.indexOf('s_" + "objectID')\x3c0\x26\x26z.indexOf('s_objectID')\x3c0){u\x3ds.repl(u,'\"','');u\x3ds.re" + "pl(u,'\\n','').substring(0,97);l.s_oc\x3dl[o];a[u]\x3da[u]?a[u]+1:1;x\x3d'';" +
						"if(c.indexOf('.t(')\x3e\x3d0||c.indexOf('.tl(')\x3e\x3d0||c.indexOf('s_gs(')\x3e\x3d0" + ")x\x3d'var x\x3d\".tl(\";';x+\x3d's_objectID\x3d\"'+u+'_'+a[u]+'\";return this." + "s_oc?this.s_oc(e):true';if(s.isns\x26\x26s.apv\x3e\x3d5)l.setAttribute(o,x);l[o" + "]\x3dnew Function('e',x)}}}s.wd.s_semaphore\x3d0;return true");
					s_dell.downloadLinkHandler = new Function("p", "" + "var s\x3dthis,h\x3ds.p_gh(),n\x3d'linkDownloadFileTypes',i,t;if(!h||(s.linkT" + "ype\x26\x26(h||s.linkName)))return '';i\x3dh.indexOf('?');t\x3ds[n];s[n]\x3dp?p:t;" +
						"if(s.lt(h)\x3d\x3d'd')s.linkType\x3d'd';else h\x3d'';s[n]\x3dt;return h;");
					s_dell.p_gh = new Function("" + "var s\x3dthis;if(!s.eo\x26\x26!s.lnk)return '';var o\x3ds.eo?s.eo:s.lnk,y\x3ds.ot(" + "o),n\x3ds.oid(o),x\x3do.s_oidt;if(s.eo\x26\x26o\x3d\x3ds.eo){while(o\x26\x26!n\x26\x26y!\x3d'BODY'){" + "o\x3do.parentElement?o.parentElement:o.parentNode;if(!o)return '';y\x3ds." + "ot(o);n\x3ds.oid(o);x\x3do.s_oidt}}return o.href?o.href:'';");
					s_dell.pt = new Function("x", "d", "f", "a", "" + "var s\x3dthis,t\x3dx,z\x3d0,y,r;while(t){y\x3dt.indexOf(d);y\x3dy\x3c0?t.length:y;t\x3dt.substri" +
						"ng(0,y);r\x3ds[f](t,a);if(r)return r;z+\x3dy+d.length;t\x3dx.substring(z,x.length);t\x3dz\x3cx.length?t:''}return ''");
					s_dell.clearVars = new Function("l", "f", "" + "var s\x3dthis,vl,la,vla;l\x3dl?l:'';f\x3df?f:'';vl\x3d'pageName,purchaseID,chan" + "nel,server,pageType,campaign,state,zip,events,products';for(var n\x3d1" + ";n\x3c51;n++)vl+\x3d',prop'+n+',eVar'+n+',hier'+n;if(l\x26\x26(f\x3d\x3d1||f\x3d\x3d2)){if(" + "f\x3d\x3d1){vl\x3dl}if(f\x3d\x3d2){la\x3ds.split(l,',');vla\x3ds.split(vl,',');vl\x3d'';for" +
						"(x in la){for(y in vla){if(la[x]\x3d\x3dvla[y]){vla[y]\x3d''}}}for(y in vla)" + "{vl+\x3dvla[y]?','+vla[y]:'';}}s.pt(vl,',','p_clr',0);return true}else" + " if(l\x3d\x3d''\x26\x26f\x3d\x3d''){s.pt(vl,',','p_clr',0);return true}else{return fa" + "lse}");
					s_dell.p_clr = new Function("t", "var s\x3dthis;s[t]\x3d''");
					s_dell.apl = new Function("l", "v", "d", "u", "" + "var s\x3dthis,m\x3d0;if(!l)l\x3d'';if(u){var i,n,a\x3ds.split(l,d);for(i\x3d0;i\x3ca." + "length;i++){n\x3da[i];m\x3dm||(u\x3d\x3d1?(n\x3d\x3dv):(n.toLowerCase()\x3d\x3dv.toLowerCas" +
						"e()));}}if(!m)l\x3dl?l+d+v:v;return l");
					s_dell.inList = new Function("v", "l", "d", "" + "var s\x3dthis,ar\x3dArray(),i\x3d0,d\x3d(d)?d:',';if(typeof(l)\x3d\x3d'string'){if(s." + "split)ar\x3ds.split(l,d);else if(l.split)ar\x3dl.split(d);else return-1}e" + "lse ar\x3dl;while(i\x3car.length){if(v\x3d\x3dar[i])return true;i++}return fals" + "e;");
					s_dell.split = new Function("l", "d", "" + "var i,x\x3d0,a\x3dnew Array;while(l){i\x3dl.indexOf(d);i\x3di\x3e-1?i:l.length;a[x" + "++]\x3dl.substring(0,i);l\x3dl.substring(i+d.length);}return a");
					s_dell.repl = new Function("x", "o", "n", "" + "var i\x3dx.indexOf(o),l\x3dn.length;while(x\x26\x26i\x3e\x3d0){x\x3dx.substring(0,i)+n+x." + "substring(i+o.length);i\x3dx.indexOf(o,i+l)}return x");
					s_dell.manageVars = new Function("c", "l", "f", "" + "var s\x3dthis,vl,la,vla;l\x3dl?l:'';f\x3df?f:1 ;if(!s[c])return false;vl\x3d'pa" + "geName,purchaseID,channel,server,pageType,campaign,state,zip,events" + ",products,transactionID';for(var n\x3d1;n\x3c51;n++){vl+\x3d',prop'+n+',eVar" + "'+n+',hier'+n;}if(l\x26\x26(f\x3d\x3d1||f\x3d\x3d2)){if(f\x3d\x3d1){vl\x3dl;}if(f\x3d\x3d2){la\x3ds.spl" +
						"it(l,',');vla\x3ds.split(vl,',');vl\x3d'';for(x in la){for(y in vla){if(l" + "a[x]\x3d\x3dvla[y]){vla[y]\x3d'';}}}for(y in vla){vl+\x3dvla[y]?','+vla[y]:'';}" + "}s.pt(vl,',',c,0);return true;}else if(l\x3d\x3d''\x26\x26f\x3d\x3d1){s.pt(vl,',',c,0" + ");return true;}else{return false;}");
					s_dell.clearVars = new Function("t", "var s\x3dthis;s[t]\x3d'';");
					s_dell.lowercaseVars = new Function("t", "" + "var s\x3dthis;if(s[t]){s[t]\x3ds[t].toLowerCase();}");
					s_dell.parseCookie = new Function("c", "pl", "d", "" + "var s\x3dthis,pla,ca,o\x3d'',j,l;c\x3ds.c_r(c);if(c){pla\x3ds.split(pl,d);ca\x3ds.s" +
						"plit(c,'\x26');for(x in pla){for(y in ca){j\x3dpla[x]+'\x3d';l\x3d''+ca[y];l\x3dl.t" + "oLowerCase();l\x3dl.indexOf(j.toLowerCase());if(l\x3e-1)o\x3ds.apl(o,ca[y],'\x26" + "',0)}}if(o)o\x3d'?'+o;}return o");
					s_dell.dedupVal = new Function("c", "v", "" + "var s\x3dthis,r;if(s.c_r(c)){r\x3ds.c_r(c);if(v\x3d\x3dr)return '';else s.c_w(c," + "v)}else{s.c_w(c,v)}return v");
					s_dell.trackTNT = new Function("v", "p", "b", "" + "var s\x3dthis,n\x3d's_tnt',q\x3d's_tntref',p\x3d(p)?p:n,v\x3d(v)?v:n,r\x3d'',pm\x3dfalse" + ",b\x3d(b)?b:true;if(s.Util.getQueryParam(q)!\x3d''){s.referrer\x3ds.Util.get" +
						"QueryParam(q);}else if(s.c_r(q)!\x3d''){s.referrer\x3ds.c_r(q);document.c" + "ookie\x3dq+'\x3d;path\x3d/;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;';}else if(" + "(document.cookie.indexOf(q)!\x3d-1\x26\x26s.c_r(q)\x3d\x3d'')||(location.search.in" + "dexOf(q+'\x3d')!\x3d-1\x26\x26s.Util.getQueryParam(q)\x3d\x3d'')){s.referrer\x3d'Typed/B" + "ookmarked';document.cookie\x3dq+'\x3d;path\x3d/;expires\x3dThu, 01-Jan-1970 00:" + "00:01 GMT;';}if(s.Util.getQueryParam(p)!\x3d''){pm\x3ds.Util.getQueryPara" + "m(p);}else if(s.c_r(p)){pm\x3ds.c_r(p);document.cookie\x3dp+'\x3d;path\x3d/;exp" +
						"ires\x3dThu, 01-Jan-1970 00:00:01 GMT;';}else if(s.c_r(p)\x3d\x3d''\x26\x26s.Util." + "getQueryParam(p)\x3d\x3d''){pm\x3d'';}if(pm)r+\x3d(pm+',');if(window[v]!\x3dundefi" + "ned)r+\x3dwindow[v];if(b)window[v]\x3d'';return r;");
					s_dell.createGEObject = new Function("s", "" + "var _g\x3dnew Object;_g.s\x3ds;_g.p\x3dnew Object;_g.setPartnerEventHandler\x3d" + "function(pId,eh){if(!this.p[pId]){this.p[pId]\x3dnew Object;}this.p[pI" + "d].__eh\x3deh;};_g.firePartnerEvent\x3dfunction(pId,eId,ePm){this.p[pId]." + "__eh(eId,ePm);};_g.setExchangePageURL\x3dfunction(pId,url){if(!this.p[" +
						"pId]){this.p[pId]\x3dnew Object;}this.p[pId].__ep\x3durl;};_g.getPageData" + "\x3dfunction(pId){var q\x3d'';if(this.p[pId]\x26\x26this.p[pId].__ep){q+\x3d'ge_pI" + "d\x3d'+this._euc(pId)+'\x26ge_url\x3d'+this._euc(this.p[pId].__ep)+'\x26pageURL" + "\x3d'+this._euc(document.location.href);}var v\x3d'pageName,server,channe" + "l,pageType,products,events,campaign,purchaseID,hier1,hier2,hier3,hi" + "er4,hier5';for(var i\x3d1;i\x3c\x3d50;i++){v+\x3d',prop'+i+',eVar'+i;}var a\x3dthi" + "s._split(v,',');for(var i\x3d0;i\x3ca.length;i++){if(this.s[a[i]]){q+\x3d(q?" +
						"'\x26':'')+a[i]+'\x3d'+this._euc(this.s[a[i]]);}}return q;};_g.getObjectF" + "romQueryString\x3dfunction(qsParam){var v\x3dthis._getQParam(qsParam);var" + " r\x3dnew Object;if(v){v\x3dthis._duc(v);l\x3dthis._split(v,'\x26');for(i\x3d0;i\x3cl" + ".length;i++){kv\x3dthis._split(l[i],'\x3d');r[kv[0]]\x3dthis._duc(kv[1]);}}r" + "eturn r;};_g.productsInsert\x3dfunction(p,e,v){var i\x3d0,j\x3d0,r\x3d'',pd\x3dthi" + "s._split(p,',');for(i\x3d0;i\x3cpd.length;i++){if(i\x3e0){r+\x3d',';}var el\x3dthi" + "s._split(pd[i],';');for(j\x3d0;j\x3c6;j++){if(j\x3c4){r+\x3d(el.length\x3ej?el[j]:" +
						"'')+';';}else if(j\x3d\x3d4){r+\x3d(el[j]?el[j]+'|':'')+e+';';}else if(j\x3d\x3d5)" + "{r+\x3d(el[j]?el[j]+'|':'')+v;}}}return r;};_g._getQParam\x3dfunction(k,q" + "){var m\x3dthis,l,i,kv;if(q\x3d\x3dundefined||!q){q\x3dwindow.location.href;}if" + "(q){i\x3dq.indexOf('?');if(i\x3e\x3d0){q\x3dq.substring(i+1);}l\x3dthis._split(q,'" + "\x26');for(i\x3d0;i\x3cl.length;i++){kv\x3dthis._split(l[i],'\x3d');if(kv[0]\x3d\x3dk){r" + "eturn kv[1];}}}return '';};_g._euc\x3dfunction(str){return typeof enco" + "deURIComponent\x3d\x3d'function'?encodeURIComponent(str):escape(str);};_g" +
						"._duc\x3dfunction(str){return typeof decodeURIComponent\x3d\x3d'function'?de" + "codeURIComponent(str):unescape(str);};_g._split\x3dfunction(l,d){var i" + ",x\x3d0,a\x3dnew Array;while(l){i\x3dl.indexOf(d);i\x3di\x3e-1?i:l.length;a[x++]\x3dl" + ".substring(0,i);l\x3dl.substring(i+d.length);}return a;};return _g;");
					s_dell.GenesisExchange = s_dell.createGEObject(s_dell);
					s_dell.handlePPVevents = new Function("" + "var s\x3ds_c_il[" + s_dell._in + "];" + "if(!s.getPPVid)return;var dh\x3dMath.max(Math.max(s.d.body.scrollHeigh" +
						"t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight," + "s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s." + "d.documentElement.clientHeight));var vph\x3ds.wd.innerHeight||(s.d.doc" + "umentElement.clientHeight||s.d.body.clientHeight),st\x3ds.wd.pageYOffs" + "et||(s.wd.document.documentElement.scrollTop||s.wd.document.body.sc" + "rollTop),vh\x3dst+vph,pv\x3dMath.min(Math.round(vh/dh*100),100),c\x3ds.c_r('" + "s_ppv'),a\x3d(c.indexOf(',')\x3e-1)?c.split(',',4):[],id\x3d(a.length\x3e0)?(a[" +
						"0]):escape(s.getPPVid),cv\x3d(a.length\x3e1)?parseInt(a[1]):(0),p0\x3d(a.len" + "gth\x3e2)?parseInt(a[2]):(pv),cy\x3d(a.length\x3e3)?parseInt(a[3]):(0),cn\x3d(p" + "v\x3e0)?(id+','+((pv\x3ecv)?pv:cv)+','+p0+','+((vh\x3ecy)?vh:cy)):('');s.c_w" + "('s_ppv',cn);");
					s_dell.getPercentPageViewed = new Function("pgid", "" + "var s\x3dthis,pgid\x3d(arguments.length\x3e0)?(arguments[0]):('-'),ist\x3d(!s.ge" + "tPPVid)?(true):(false);if(typeof(s.linkType)!\x3d'undefined'\x26\x26s.linkTy" + "pe!\x3d'e')return'';var v\x3ds.c_r('s_ppv'),a\x3d(v.indexOf(',')\x3e-1)?v.split" +
						"(',',4):[];if(a.length\x3c4){for(var i\x3d3;i\x3e0;i--)a[i]\x3d(i\x3ca.length)?(a[" + "i-1]):('');a[0]\x3d'';}a[0]\x3dunescape(a[0]);s.getPPVpid\x3dpgid;s.c_w('s_p" + "pv',escape(pgid));if(ist){s.getPPVid\x3d(pgid)?(pgid):(s.pageName?s.pa" + "geName:document.location.href);s.c_w('s_ppv',escape(s.getPPVid));if" + "(s.wd.addEventListener){s.wd.addEventListener('load',s.handlePPVeve" + "nts,false);s.wd.addEventListener('scroll',s.handlePPVevents,false);" + "s.wd.addEventListener('resize',s.handlePPVevents,false);}else if(s." +
						"wd.attachEvent){s.wd.attachEvent('onload',s.handlePPVevents);s.wd.a" + "ttachEvent('onscroll',s.handlePPVevents);s.wd.attachEvent('onresize" + "',s.handlePPVevents);}}return(pgid!\x3d'-')?(a):(a[1]);");
					s_dell.clickPast = new Function("scp", "ct_ev", "cp_ev", "cpc", "" + "var s\x3dthis,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)\x3d\x3d1){if(!cpc)" + "{cpc\x3d's_cpc';}ev\x3ds.events?s.events+',':'';if(scp){s.events\x3dev+ct_ev" + ";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)\x3e\x3d1){s.events\x3dev+cp_ev;s.c_w(cpc" + ",0,0);}}}");
					s_dell.p_fo = new Function("n", "" + "var s\x3dthis;if(!s.__fo){s.__fo\x3dnew Object;}if(!s.__fo[n]){s.__fo[n]\x3d" + "new Object;return 1;}else {return 0;}");
					parseUri = new Function("u", "" + "var l\x3d{strictMode:false,key:['source','protocol','authority','userI" + "nfo','user','password','host','port','relative','path','directory'," + "'file','query','anchor'],U:{name:'queryKey',c:/(?:^|\x26)([^\x26\x3d]*)\x3d?(" + "[^\x26]*)/g},c:{strict:/^(?:([^:\\/?#]+):)?(?:\\/\\/((?:(([^:@]*)(?::" + "([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?))?((((?:[^?#\\/]*\\/)*)([^?" +
						"#]*))(?:\\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\\/]*@)([" + "^:\\/?#.]+):)?(?:\\/\\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]" + "*)(?::(\\d*))?)(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*" + "\\/?)?([^?#\\/]*))(?:\\?([^#]*))?(?:#(.*))?)/}},t\x3dl.c[l.strictMode?" + "'strict':'loose'].exec(u),p\x3d{},b\x3d14;while(b--)p[l.key[b]]\x3dt[b]||'';" + "p[l.U.name]\x3d{};p[l.key[12]].replace(l.U.c,function($0,$1,$2){if($1)" + "{p[l.U.name][$1]\x3d$2}});return p");
					sC = new Function("b", "s", "" + "document.cookie\x3db+'\x3d'+escape(s)+'; '+' expires\x3d'+(arguments.length\x3e" +
						"\x3d3?arguments[2].toGMTString():'')+'; path\x3d/; domain\x3d.'+getDomainLev" + "els()+';'");
					gC = new Function("b", "" + "var q\x3ddocument.cookie,v\x3db+'\x3d',m\x3dq.indexOf(v);if(m!\x3d0)m\x3dq.indexOf(';" + " '+v);if(m\x3d\x3d-1)return '';v\x3dq.substring(m);v\x3dv.substring(v.indexOf('" + "\x3d')+1);m\x3dv.indexOf(';');if(m!\x3d-1)v\x3dv.substring(0,m);return unescape" + "(v)");
					getDomainLevels = new Function("" + "var z;if(arguments.length\x3e0){z\x3darguments[0]}else{if(typeof document" + ".location.href\x3d\x3d'undefined')return'';z\x3ddocument.location.href}var r" +
						"\x3dparseUri(z).host.toLowerCase();var c\x3dr.split('.'.toString());if(ar" + "guments.length\x3e\x3d2){var w\x3darguments[1];for(var b\x3d1,i\x3d'';b\x3c\x3dw;b++){if" + "(c.length\x3e\x3db){i\x3dc[c.length-b]+(b\x3e1?'.':'')+i}}}else{var i\x3dc.length\x3e" + "\x3d1?c[c.length-1]:'';var n\x3dc.length\x3e\x3d2?c[c.length-2]:'';var w\x3di.leng" + "th\x3d\x3d2\x26\x26(n.length\x3d\x3d2||n\x3d\x3d'com')?3:2;for(var b\x3d2;b\x3c\x3dw;b++){if(c.lengt" + "h\x3e\x3db){i\x3dc[c.length-b]+(b\x3e1?'.':'')+i}}}return i");
					s_dell.getActionDepth = new Function("c", "" + "var s\x3dthis,v\x3d1,t\x3dnew Date;t.setTime(t.getTime()+1800000);" + "if(!s.c_r(c)){v\x3d1}if(s.c_r(c)){v\x3ds.c_r(c);v++}" + "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");
					s_dell.tCall = new Function("", "var t\x3dthis.linkType;return typeof(t)\x3d\x3d'undefined'||typeof(t)\x3d\x3d''");
					s_dell.isInternal = new Function("v", "" + "return matchList(((!v)?document.location.href:v.toString().toLowerC" + "ase()),s_dell.linkInternalFilters)");
					s_dell.hostedLocally = new Function("v",
						"" + "return matchList(((!v)?document.location.href:v.toString().toLowerC" + "ase()),s_dell.localDoms)");
					matchList = new Function("v", "l", "" + "v\x3dv.toString().toLowerCase();if(typeof(v)!\x3d'string'||typeof(l)!\x3d" + "'string')return 0;var m\x3dparseUri(v).protocol,h\x3dparseUri(v).host;i" + "f(m.indexOf('http')!\x3d0\x26\x26m.indexOf('ftp')!\x3d0)return 1;return h" + ".match('('+l.toLowerCase().replace(/\\.(?![*+?])/gi,'\\\\." + "').replace(/,(?![*+?])/gi,'|')+')')?2:0");
					s_dell.channelManager = new Function("a",
						"b", "c", "d", "e", "f", "" + "var s\x3dthis,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v\x3d0," + "X,Y,W,n\x3dnew Date;n.setTime(n.getTime()+1800000);if(e){v\x3d1;if(s.c_r(" + "e)){v\x3d0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v\x3d0}}g\x3ds.refer" + "rer?s.referrer:document.referrer;g\x3dg.toLowerCase();if(!g){h\x3d1}i\x3dg.i" + "ndexOf('?')\x3e-1?g.indexOf('?'):g.length;j\x3dg.substring(0,i);k\x3ds.linkI" + "nternalFilters.toLowerCase();k\x3ds.split(k,',');l\x3dk.length;for(m\x3d0;m\x3c" + "l;m++){B\x3dj.indexOf(k[m])\x3d\x3d-1?'':g;if(B)O\x3dB}if(!O\x26\x26!h){p\x3dg;U\x3dg.index" +
						"Of('//');q\x3dU\x3e-1?U+2:0;Y\x3dg.indexOf('/',q);r\x3dY\x3e-1?Y:i;t\x3dg.substring(q" + ",r);t\x3dt.toLowerCase();u\x3dt;P\x3d'Referrers';S\x3ds.seList+'\x3e'+s._extraSear" + "chEngines;if(d\x3d\x3d1){j\x3ds.repl(j,'oogle','%');j\x3ds.repl(j,'ahoo','^');g" + "\x3ds.repl(g,'as_q','*')}A\x3ds.split(S,'\x3e');T\x3dA.length;for(i\x3d0;i\x3cT;i++){" + "D\x3dA[i];D\x3ds.split(D,'|');E\x3ds.split(D[0],',');F\x3dE.length;for(G\x3d0;G\x3cF;" + "G++){H\x3dj.indexOf(E[G]);if(H\x3e-1){i\x3ds.split(D[1],',');U\x3di.length;for(" +
						"k\x3d0;k\x3cU;k++){l\x3ds.getQueryParam(i[k],'',g);if(l){l\x3dl.toLowerCase();M" + "\x3dl;if(D[2]){u\x3dD[2];N\x3dD[2]}else{N\x3dt}if(d\x3d\x3d1){N\x3ds.repl(N,'#',' - ');g" + "\x3ds.repl(g,'*','as_q');N\x3ds.repl(N,'^','ahoo');N\x3ds.repl(N,'%','oogle'" + ");}}}}}}}if(!O||f!\x3d'1'){O\x3ds.getQueryParam(a,b);if(O){u\x3dO;if(M){P\x3d'P" + "aid Search'}else{P\x3d'Paid Non-Search';}}if(!O\x26\x26M){u\x3dN;P\x3d'Natural Sea" + "rch'}}if(h\x3d\x3d1\x26\x26!O\x26\x26v\x3d\x3d1){u\x3dP\x3dt\x3dp\x3d'Direct Load'}X\x3dM+u+t;c\x3dc?c:'c_m';" +
						"if(c!\x3d'0'){X\x3ds.getValOnce(X,c,0);}g\x3ds._channelDomain;if(g\x26\x26X){k\x3ds.s" + "plit(g,'\x3e');l\x3dk.length;for(m\x3d0;m\x3cl;m++){q\x3ds.split(k[m],'|');r\x3ds.spl" + "it(q[1],',');S\x3dr.length;for(T\x3d0;T\x3cS;T++){Y\x3dr[T];Y\x3dY.toLowerCase();i" + "\x3dj.indexOf(Y);if(i\x3e-1)P\x3dq[0]}}}g\x3ds._channelParameter;if(g\x26\x26X){k\x3ds.s" + "plit(g,'\x3e');l\x3dk.length;for(m\x3d0;m\x3cl;m++){q\x3ds.split(k[m],'|');r\x3ds.spl" + "it(q[1],',');S\x3dr.length;for(T\x3d0;T\x3cS;T++){U\x3ds.getQueryParam(r[T]);if" +
						"(U)P\x3dq[0]}}}g\x3ds._channelPattern;if(g\x26\x26X){k\x3ds.split(g,'\x3e');l\x3dk.lengt" + "h;for(m\x3d0;m\x3cl;m++){q\x3ds.split(k[m],'|');r\x3ds.split(q[1],',');S\x3dr.leng" + "th;for(T\x3d0;T\x3cS;T++){Y\x3dr[T];Y\x3dY.toLowerCase();i\x3dO.toLowerCase();H\x3di." + "indexOf(Y);if(H\x3d\x3d0)P\x3dq[0]}}}if(X)M\x3dM?M:'n/a';p\x3dX\x26\x26p?p:'';t\x3dX\x26\x26t?t:'" + "';N\x3dX\x26\x26N?N:'';O\x3dX\x26\x26O?O:'';u\x3dX\x26\x26u?u:'';M\x3dX\x26\x26M?M:'';P\x3dX\x26\x26P?P:'';s._re" + "ferrer\x3dp;s._referringDomain\x3dt;s._partner\x3dN;s._campaignID\x3dO;s._campa" +
						"ign\x3du;s._keywords\x3dM;s._channel\x3dP");
					s_dell.seList = "search`|qu|7search.com\x3esearch.about`|terms|About.com\x3ealltheweb`|query,q|All The Web\x3ealtavista.co|q,r|AltaVista\x3edk.altavista`|q|AltaVista#Denmark\x3efr.altavista`|q,r|AltaVista#France\x3eit.altavista`|q,r|AltaVista#Italy\x3enl.altavista`|q|AltaVista#Netherlands\x3eno.altavista`|q|AltaVista#Norway\x3ees.altavista`|q,r|AltaVista#Spain\x3ese.altavista`|q,r|AltaVista#Sweden\x3ech.altavista`|q,r|AltaVista#Switzerland\x3eananzi.co.za|qt|Ananzi\x3eaol.fr|q|AOL#France\x3esuche.aol.de,suche.aolsvc.de|q|AOL#Germany\x3eaol.co.uk,search.aol.co.uk|query|AOL#United Kingdom\x3esearch.aol`,search.aol.ca|query,q|AOL.com Search\x3eaport.ru|r|Aport\x3eask`,ask.co.uk|ask,q|Ask Jeeves\x3ewww.baidu`|wd,word|Baidu\x3ewww.baidu.jp|wd,word|Baidu Japan\x3esearch.biglobe.ne.jp|q|Biglobe\x3ebuscapique`|phrase|BUSCApique\x3ebusiness`/search|query|Business.com\x3ecentrum.cz|q|Centrum.cz\x3eclix.pt|question|Clix\x3edaum.net,search.daum.net|q|Daum\x3eDictionary`,Dictionary|term,query,q|Dictionary.com\x3edirecthit`|qry,q|DirectHit\x3eeniro.dk|search_word|Eniro\x3eeniro.fi|search_word|Eniro#Finland\x3eeniro.se|search_word|Eniro#Sweden\x3eeuroseek`|query,string|Euroseek\x3eexcite.fr|search,q|Excite#France\x3eexcite.co.jp|search,s|Excite#Japan\x3efireball.de|q,query|Fireball\x3esearch.fresheye`|ord,kw|FreshEye\x3egoo.ne.jp|MT|Goo (Jp.)\x3eg%.co,g%syndication`|q,*|G%\x3eg%`.af|q,*|G%#Afghanistan\x3eg%.as|q,*|G%#American Samoa\x3eg%`.ai|q,*|G%#Anguilla\x3eg%`.ag|q,*|G%#Antigua and Barbuda\x3eg%`.ar|q,*|G%#Argentina\x3eg%.am|q,*|G%#Armenia\x3eg%`.au|q,*|G%#Australia\x3eg%.at|q,*|G%#Austria\x3eg%.az|q,*|G%#Azerbaijan\x3eg%`.bh|q,*|G%#Bahrain\x3eg%`.bd|q,*|G%#Bangladesh\x3eg%`.by|q,*|G%#Belarus\x3eg%.be|q,*|G%#Belgium\x3eg%`.bz|q,*|G%#Belize\x3eg%`.bo|q,*|G%#Bolivia\x3eg%.ba|q,*|G%#Bosnia-Hercegovina\x3eg%.co.bw|q,*|G%#Botswana\x3eg%`.br|q,*|G%#Brasil\x3eg%.vg|q,*|G%#British Virgin Islands\x3eg%`.bn|q,*|G%#Brunei\x3eg%.bg|q,*|G%#Bulgaria\x3eg%.bi|q,*|G%#Burundi\x3eg%`.kh|q,*|G%#Cambodia\x3eg%.ca|q,*|G%#Canada\x3eg%.cl|q,*|G%#Chile\x3eg%.cn|q,*|G%#China\x3eg%`.co|q,*|G%#Colombia\x3eg%.co.ck|q,*|G%#Cook Islands\x3eg%.co.cr|q,*|G%#Costa Rica\x3eg%.ci|q,*|G%#Cote D'Ivoire\x3eg%.hr|q,*|G%#Croatia\x3eg%`.cu|q,*|G%#Cuba\x3eg%.cz|q,*|G%#Czech Republic\x3eg%.dk|q,*|G%#Denmark\x3eg%.dj|q,*|G%#Djibouti\x3eg%.dm|q,*|G%#Dominica\x3eg%`.do|q,*|G%#Dominican Republic\x3eg%`.ec|q,*|G%#Ecuador\x3eg%`.eg|q,*|G%#Egypt\x3eg%`.sv|q,*|G%#El Salvador\x3eg%.ee|q,*|G%#Estonia\x3eg%`.et|q,*|G%#Ethiopia\x3eg%`.fj|q,*|G%#Fiji\x3eg%.fi|q,*|G%#Finland\x3eg%.fr|q,*|G%#France\x3eg%.de|q,*|G%#Germany\x3eg%.gr|q,*|G%#Greece\x3eg%.gl|q,*|G%#Greenland\x3eg%.gp|q,*|G%#Guadeloupe\x3eg%`.gt|q,*|G%#Guatemala\x3eg%.gg|q,*|G%#Guernsey\x3eg%.gy|q,*|G%#Guyana\x3eg%.ht|q,*|G%#Haiti\x3eg%.hn|q,*|G%#Honduras\x3eg%`.hk|q,*|G%#Hong Kong\x3eg%.hu|q,*|G%#Hungary\x3eg%.co.in|q,*|G%#India\x3eg%.co.id|q,*|G%#Indonesia\x3eg%.ie|q,*|G%#Ireland\x3eg%.is|q,*|G%#Island\x3eg%`.gi|q,*|G%#Isle of Gibraltar\x3eg%.im|q,*|G%#Isle of Man\x3eg%.co.il|q,*|G%#Israel\x3eg%.it|q,*|G%#Italy\x3eg%`.jm|q,*|G%#Jamaica\x3eg%.co.jp|q,*|G%#Japan\x3eg%.je|q,*|G%#Jersey\x3eg%.jo|q,*|G%#Jordan\x3eg%.kz|q,*|G%#Kazakhstan\x3eg%.co.ke|q,*|G%#Kenya\x3eg%.ki|q,*|G%#Kiribati\x3eg%.co.kr|q,*|G%#Korea\x3eg%.kg|q,*|G%#Kyrgyzstan\x3eg%.la|q,*|G%#Laos\x3eg%.lv|q,*|G%#Latvia\x3eg%.co.ls|q,*|G%#Lesotho\x3eg%`.ly|q,*|G%#Libya\x3eg%.li|q,*|G%#Liechtenstein\x3eg%.lt|q,*|G%#Lithuania\x3eg%.lu|q,*|G%#Luxembourg\x3eg%.mw|q,*|G%#Malawi\x3eg%`.my|q,*|G%#Malaysia\x3eg%.mv|q,*|G%#Maldives\x3eg%`.mt|q,*|G%#Malta\x3eg%.mu|q,*|G%#Mauritius\x3eg%`.mx|q,*|G%#Mexico\x3eg%.fm|q,*|G%#Micronesia\x3eg%.md|q,*|G%#Moldova\x3eg%.mn|q,*|G%#Mongolia\x3eg%.ms|q,*|G%#Montserrat\x3eg%.co.ma|q,*|G%#Morocco\x3eg%`.na|q,*|G%#Namibia\x3eg%.nr|q,*|G%#Nauru\x3eg%`.np|q,*|G%#Nepal\x3eg%.nl|q,*|G%#Netherlands\x3estartg%.startpagina.nl|q|G%#Netherlands (Startpagina)\x3eg%.co.nz|q,*|G%#New Zealand\x3eg%`.ni|q,*|G%#Nicaragua\x3eg%`.ng|q,*|G%#Nigeria\x3eg%.nu|q,*|G%#Niue\x3eg%`.nf|q,*|G%#Norfolk Island\x3eg%.no|q,*|G%#Norway\x3eg%`.om|q,*|G%#Oman\x3eg%`.pk|q,*|G%#Pakistan\x3eg%`.pa|q,*|G%#Panama\x3eg%`.py|q,*|G%#Paraguay\x3eg%`.pe|q,*|G%#Peru\x3eg%`.ph|q,*|G%#Philippines\x3eg%.pn|q,*|G%#Pitcairn Islands\x3eg%.pl|q,*|G%#Poland\x3eg%.pt|q,*|G%#Portugal\x3eg%`.pr|q,*|G%#Puerto Rico\x3eg%`.qa|q,*|G%#Qatar\x3eg%.cd|q,*|G%#Rep. Dem. du Congo\x3eg%.cg|q,*|G%#Rep. du Congo\x3eg%.ge|q,*|G%#Repulic of Georgia\x3eg%.ro|q,*|G%#Romania\x3eg%.ru|q,*|G%#Russia\x3eg%.rw|q,*|G%#Rwanda\x3eg%.sh|q,*|G%#Saint Helena\x3eg%`.vc|q,*|G%#Saint Vincent and the Grenadine\x3eg%.ws|q,*|G%#Samoa\x3eg%.sm|q,*|G%#San Marino\x3eg%.st|q,*|G%#Sao Tome and Principe\x3eg%`.sa|q,*|G%#Saudi Arabia\x3eg%.sn|q,*|G%#Senegal\x3eg%.sc|q,*|G%#Seychelles\x3eg%`.sg|q,*|G%#Singapore\x3eg%.sk|q,*|G%#Slovakia\x3eg%.si|q,*|G%#Slovenia\x3eg%`.sb|q,*|G%#Solomon Islands\x3eg%.co.za|q,*|G%#South Africa\x3eg%.es|q,*|G%#Spain\x3eg%.lk|q,*|G%#Sri Lanka\x3eg%.se|q,*|G%#Sweden\x3eg%.ch|q,*|G%#Switzerland\x3eg%`.tw|q,*|G%#Taiwan\x3eg%`.tj|q,*|G%#Tajikistan\x3eg%.co.th|q,*|G%#Thailand\x3eg%.bs|q,*|G%#The Bahamas\x3eg%.gm|q,*|G%#The Gambia\x3eg%.tk|q,*|G%#Tokelau\x3eg%.to|q,*|G%#Tonga\x3eg%.tt|q,*|G%#Trinidad and Tobago\x3eg%`.tr|q,*|G%#Turkey\x3eg%.tm|q,*|G%#Turkmenistan\x3eg%.co.ug|q,*|G%#Uganda\x3eg%`.ua|q,*|G%#Ukraine\x3eg%.ae|q,*|G%#United Arab Emirates\x3eg%.co.uk|q,*|G%#United Kingdom\x3eg%`.uy|q,*|G%#Uruguay\x3eg%.co.uz|q,*|G%#Uzbekiston\x3eg%.vu|q,*|G%#Vanuatu\x3eg%.co.ve|q,*|G%#Venezuela\x3eg%`.vn|q,*|G%#Viet Nam\x3eg%.co.vi|q,*|G%#Virgin Islands\x3eg%.co.zm|q,*|G%#Zambia\x3eg%.co.zw|q,*|G%#Zimbabwe\x3ehispavista`|cadena|HispaVista\x3eicqit`|q|icq\x3einfoseek.co.jp|qt|Infoseek#Japan\x3eiwon`|searchfor|iWon\x3eixquick`|query|ixquick\x3ekakaku.com|query|Kakaku\x3ekelkoo.se|siteSearchQuery|Kelkoo#Sweden\x3ekvasir.no|q,searchExpr|Kvasir\x3elibero.it|query|Libero\x3earianna.libero.it|query|Libero-Ricerca\x3ebing`|q|Microsoft Bing\x3esearch.livedoor`|q|Livedoor.com\x3ewww.lycos`,search.lycos`|query|Lycos\x3elycos.fr|query|Lycos#France\x3elycol.de,search.lycos.de|query|Lycos#Germany\x3elycos.it|query|Lycos#Italy\x3elycos.es|query|Lycos#Spain\x3elycos.co.uk|query|Lycos#United Kingdom\x3em.bing.com|Q|m.bing\x3email.ru/search,go.mail.ru/search|q|Mail.ru\x3emarchsearch`,search.curryguide`|query|MarchSearch\x3ebing`|q|Microsoft Bing\x3emyway`|searchfor|MyWay.com\x3esearch.mywebsearch.com|searchfor|mywebsearch\x3enate`,search.nate`|query|Nate.com\x3enaver`,search.naver`|query|Naver\x3enetscape`|query,search|Netscape Search\x3esearch.nifty`|q|Nifty\x3eodn.excite.co.jp|search|ODN\x3eoingo`|s,q|Oingo\x3eoverture`|Keywords|Overture\x3eozu.es|q|Ozu\x3eqksearch`|query|QkSearch\x3erambler.ru/srch|words|Rambler\x3ereference`|q|Reference.com\x3esearch.ch|q|Search.ch\x3esearchalot`|query,q|Searchalot\x3esensis`.au|find|Sensis.com.au\x3eseznam|w|Seznam.cz\x3eg%.sina`.tw|kw|Sina#Taiwan\x3esogou.com|query|Sogou\x3esoso.com|w|SoSo\x3estarmedia`|q|Starmedia\x3eabcsok.no|q|Startsiden\x3esuchmaschine`|suchstr|Suchmaschine\x3eteoma`|q|Teoma\x3eterra.es|query|Terra\x3etiscali.it|key|Tiscali\x3etoile`|query,q|Toile du Quebec\x3ebusca.uol`.br|q|UOL Busca\x3eusseek`|string|Usseek\x3evinden.nl|query|Vinden\x3evindex.nl|search_for|Vindex\x3evirgilio.it|qs|Virgilio\x3evoila.fr|kw|Voila\x3ewalla.co.il|q|Walla\x3eweb.de|su|Web.de\x3ewebalta.ru|q|Webalta\x3ewp.pl|szukaj|Wirtualna Polska\x3ewow.pl|q|WOW\x3ey^`,search.y^`|p|Y^!\x3ear.y^`,ar.search.y^`|p|Y^!#Argentina\x3easia.y^`,asia.search.y^`|p|Y^!#Asia\x3eau.y^`,au.search.y^`|p|Y^!#Australia\x3eat.search.y^`|p|Y^!#Austria\x3ebr.y^`,br.search.y^`|p|Y^!#Brazil\x3eca.y^`,ca.search.y^`|p|Y^!#Canada\x3eqc.y^`,cf.search.y^`|p|Y^!#Canada (French)\x3ecn.y^`,search.cn.y^`|p|Y^!#China\x3edk.y^`,dk.search.y^`|p|Y^!#Denmark\x3efi.search.y^`|p|Y^!#Finland\x3efr.y^`,fr.search.y^`|p|Y^!#France\x3ede.y^`,de.search.y^`|p|Y^!#Germany\x3ehk.y^`,hk.search.y^`|p|Y^!#Hong Kong\x3ein.y^`,in.search.y^`|p|Y^!#India\x3eid.y^`,id.search.y^`|p|Y^!#Indonesia\x3eit.y^`,it.search.y^`|p|Y^!#Italy\x3ey^.co.jp,search.y^.co.jp|p,va|Y^!#Japan\x3ekr.y^`,kr.search.y^`|p|Y^!#Korea\x3emalaysia.y^`,malaysia.search.y^`|p|Y^!#Malaysia\x3emx.y^`,mx.search.y^`|p|Y^!#Mexico\x3enl.y^`,nl.search.y^`|p|Y^!#Netherlands\x3enz.y^`,nz.search.y^`|p|Y^!#New Zealand\x3eno.y^`,no.search.y^`|p|Y^!#Norway\x3eph.y^`,ph.search.y^`|p|Y^!#Philippines\x3eru.y^`,ru.search.y^`|p|Y^!#Russia\x3esg.y^`,sg.search.y^`|p|Y^!#Singapore\x3ees.y^`,es.search.y^`|p|Y^!#Spain\x3etelemundo.y^`,espanol.search.y^`|p|Y^!#Spanish (US : Telemundo)\x3ese.y^`,se.search.y^`|p|Y^!#Sweden\x3ech.search.y^`|p|Y^!#Switzerland\x3etw.y^`,tw.search.y^`|p|Y^!#Taiwan\x3eth.y^`,th.search.y^`|p|Y^!#Thailand\x3euk.y^`,uk.search.y^`|p|Y^!#UK and Ireland\x3evn.y^`,vn.search.y^`|p|Y^!#Viet Nam\x3emobile.y^.co.jp|p|Y^Japan#Mobile\x3eyandex|text|Yandex.ru\x3ezbozi.cz|q|Zbozi.cz\x3ewww.zoeken.nl/|query|zoeken.nl";
					s_dell.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", "" + "var s\x3dthis,ce;if(typeof(dv)\x3d\x3d\x3d'undefined')dv\x3d0;if(s.events\x26\x26ev){var" + " ay\x3ds.split(ev,',');var ea\x3ds.split(s.events,',');for(var u\x3d0;u\x3cay.l" + "ength;u++){for(var x\x3d0;x\x3cea.length;x++){if(ay[u]\x3d\x3dea[x]){ce\x3d1;}}}}i" + "f(!v||v\x3d\x3d''){if(ce){s.c_w(cn,'');return'';}else return'';}v\x3descape(" + "v);var arry\x3dnew Array(),a\x3dnew Array(),c\x3ds.c_r(cn),g\x3d0,h\x3dnew Array()" +
						";if(c\x26\x26c!\x3d''){arry\x3ds.split(c,'],[');for(q\x3d0;q\x3carry.length;q++){z\x3dar" + "ry[q];z\x3ds.repl(z,'[','');z\x3ds.repl(z,']','');z\x3ds.repl(z,\"'\",'');arry" + "[q]\x3ds.split(z,',')}}var e\x3dnew Date();e.setFullYear(e.getFullYear()+" + "5);if(dv\x3d\x3d0\x26\x26arry.length\x3e0\x26\x26arry[arry.length-1][0]\x3d\x3dv)arry[arry.len" + "gth-1]\x3d[v,new Date().getTime()];else arry[arry.length]\x3d[v,new Date(" + ").getTime()];var start\x3darry.length-ct\x3c0?0:arry.length-ct;var td\x3dnew" + " Date();for(var x\x3dstart;x\x3carry.length;x++){var diff\x3dMath.round((td." +
						"getTime()-arry[x][1])/86400000);if(diff\x3cex){h[g]\x3dunescape(arry[x][0" + "]);a[g]\x3d[arry[x][0],arry[x][1]];g++;}}var data\x3ds_dell.join(a,{delim:','," + "front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r\x3ds_dell.join(h,{deli" + "m:dl});if(ce)s.c_w(cn,'');return r;");
					s_dell.join = new Function("v", "p", "" + "var s \x3d this;var f,b,d,w;if(p){f\x3dp.front?p.front:'';b\x3dp.back?p.back" + ":'';d\x3dp.delim?p.delim:'';w\x3dp.wrap?p.wrap:'';}var str\x3d'';for(var x\x3d0" + ";x\x3cv.length;x++){if(typeof(v[x])\x3d\x3d'object' )str+\x3ds.join( v[x],p);el" +
						"se str+\x3dw+v[x]+w;if(x\x3cv.length-1)str+\x3dd;}return f+str+b;");
					s_dell.createData = new Function("", "" + "var s\x3dthis,dataArray,ts,seg,pv,pc,pd,cs,odg,ca,pt,st,tos,pp,ic;var " + "expDate\x3dnew Date();s.c_w('sessionTime',expDate.getFullYear()+','+ex" + "pDate.getMonth()+','+expDate.getDate()+','+expDate.getHours()+','+e" + "xpDate.getMinutes()+','+expDate.getSeconds()+','+expDate.getMillise" + "conds(),0);ts\x3ds.getTimeStamp();seg\x3ds.prop6?s.prop6:'null';pv\x3d'null'" + ";cs\x3ds.events.indexOf('scCheckout')\x3e-1?'Y':'N';pc\x3ds.events.indexOf('" +
						"purchase')\x3e-1?'Y':'N';if(s.inList('event2',s.events,',')){if(s.prod" + "ucts!\x3dundefined)var splitProd\x3ds.products.split(',');if(splitProd.le" + "ngth\x3e0\x26\x26splitProd[0]!\x3dundefined\x26\x26splitProd[0]!\x3dnull){var splitProd\x3d" + "splitProd[0].split(';');pd\x3dsplitProd[1];}}else{pd\x3d'null';}pp\x3d'null'" + ";odg\x3ds.eVar2?s.eVar2:'null';ca\x3ds.events.indexOf('scAdd')\x3e-1?'Y':'N'" + ";ic\x3d'null';pt\x3ds.eVar10?s.eVar10:'null';st\x3ds.prop17?s.prop17:'null';" + "tos\x3d0;var profile\x3dseg+'||'+pv+'||'+ts+'||'+cs+'||'+pc+'||'+pd+'||'+" +
						"tos+'||'+pp+'||'+odg+'||'+ca+'||'+ic+'||'+pt+'||'+st;expDate.setDat" + "e(expDate.getDate()+365);s.c_w('s_hwp',profile,expDate);");
					s_dell.getTimeStamp = new Function("", "" + "var d\x3dnew Date();return d.getDate()+':'+(d.getMonth()+1)+':'+d.getF" + "ullYear()+':'+d.getHours()+':'+d.getMinutes();");
					s_dell.updateData = new Function("", "" + "var s\x3dthis,dataArray,ts,seg,pv,pc,pd,cs,odg,ca,pt,st,tos,pp,ic;var " + "expDate\x3dnew Date();expDate.setDate(expDate.getDate()+365);dataArray" + "\x3d(s.c_r('s_hwp')).split('||');ts\x3ds.getTimeStamp();seg\x3ds.prop6?s.pro" +
						"p6:dataArray[0];s.pageName.indexOf('productdetails')\x3e-1?(pv\x3d(s.page" + "Name.split('productdetails:'))[1]):pv\x3ddataArray[1];dataArray[3]\x3d\x3d'Y" + "'?cs\x3d'Y':cs\x3ds.events.indexOf('scCheckout')\x3e-1?'Y':'N';dataArray[4]\x3d" + "\x3d'Y'?pc\x3d'Y':pc\x3ds.events.indexOf('purchase')\x3e-1?'Y':'N';if(s.inList(" + "'event2',s.events,',')){if(s.products!\x3dundefined)var splitProd\x3ds.pr" + "oducts.split(',');if(splitProd.length\x3e0\x26\x26splitProd[0]!\x3dundefined\x26\x26s" + "plitProd[0]!\x3dnull){var splitProd\x3dsplitProd[0].split(';');pd\x3dsplitPr" +
						"od[1];}}else{pd\x3ddataArray[5];}odg\x3ds.eVar2?s.eVar2:dataArray[8];data" + "Array[9]\x3d\x3d'Y'?ca\x3d'Y':ca\x3ds.events.indexOf('scAdd')\x3e-1?'Y':'N';pt\x3ds.e" + "Var10?s.eVar10:'null';st\x3ds.prop17?s.prop17:dataArray[12];var today\x3d" + "new Date();if(s.c_r('sessionTime')){var oldTime\x3ds.c_r('sessionTime'" + ");oldTime\x3doldTime.split(',');oldTime\x3dnew Date(oldTime[0],oldTime[1]" + ",oldTime[2],oldTime[3],oldTime[4],oldTime[5],oldTime[6]);tos\x3dMath.r" + "ound(((today-oldTime)/1000)/60);}else{s.c_w('sessionTime',today,0);" +
						"tos\x3d0;}if(pc\x3d\x3d'Y'){if(s.products!\x3dundefined)var prodArray\x3ds.product" + "s.split(',');if(prodArray\x26\x26prodArray.length\x3e0\x26\x26prodArray[0]!\x3dundefi" + "ned\x26\x26prodArray[0]!\x3dnull){pp\x3d(prodArray[0].split(';'))[1];if(pp\x3d\x3d''|" + "|pp\x3d\x3dnull){pp\x3ddataArray[7];}}}else{pp\x3d'null';}if(s.events.indexOf('" + "purchase')\x3e-1){if(s.products!\x3dundefined)var product\x3d(s.products.spl" + "it(','))[0];if(product!\x3dundefined\x26\x26product!\x3dnull){var cartArray\x3dpro" +
						"duct.split(';');}if(cartArray.length\x3e0)ic\x3dcartArray[1];if(cartArray" + ".length\x3e1)ic\x3dic+','+cartArray[2];if(cartArray.length\x3e2)ic\x3dic+','+ca" + "rtArray[3];}else if(dataArray[10]!\x3d'null'){ic\x3ddataArray[10];}else i" + "c\x3d'null';var profile\x3dseg+'||'+pv+'||'+ts+'||'+cs+'||'+pc+'||'+pd+'|" + "|'+tos+'||'+pp+'||'+odg+'||'+ca+'||'+ic+'||'+pt+'||'+st;s.c_w('s_hw" + "p',profile,expDate);");
					s_dell.getQueryParam = function(n, s, h) {
						h || (h = s_dell.pageURL ? s_dell.pageURL.toLowerCase() : window.location.href.toLowerCase(),
							n = n.toLowerCase());
						return s_dell.Util.getQueryParam(n, h, s)
					};

					function s_dell_determineCMS() {
						var s = s_dell;
						if (!s.CMS) {
							s.CMS = "unknown";
							var gen = s.getHTMLtag("meta", "generator").toLowerCase();
							if (gen.indexOf(" ") > 0) gen = gen.substring(0, gen.indexOf(" "));
							if (gen.indexOf("ng") == 0) s.CMS = "nextgen";
							if (gen.indexOf("build:") == 0 || gen.indexOf("mshtml") == 0) s.CMS = "olr";
							if (gen.indexOf("storm") == 0) s.CMS = "storm";
							if (gen.indexOf("telligent") == 0) s.CMS = "telligent";
							if (s.CMS == "unknown" && s.getHTMLtag("meta", "waapplicationname")) s.CMS =
								"olr";
							if (s.CMS == "unknown" && Dell.Metrics.sc.cms.indexOf("emc") >= 0) s.CMS = Dell.Metrics.sc.cms;
							if (s.CMS == "unknown" && (Dell.Metrics.sc.cms == "lithium" || Dell.Metrics.sc.cms == "coveo" || Dell.Metrics.sc.cms == "lithium|coveo")) s.CMS = "community"
						}
						return s.CMS
					}
					s_dell.determineCMS = s_dell_determineCMS;

					function s_dell_onDellCMS() {
						return s_dell.determineCMS() == "storm" || s_dell.determineCMS() == "community" || s_dell.determineCMS() == "nextgen" || s_dell.determineCMS() == "olr" || s_dell.determineCMS() == "telligent" || s_dell.determineCMS() ==
							"emcsales" || s_dell.determineCMS() == "emcknowledgecenter" || s_dell.determineCMS() == "emcpartnerportal"
					}
					s_dell.onDellCMS = s_dell_onDellCMS;

					function s_dell_processLWP() {
						var s = s_dell;
						if (document.location.search) s.setLWPvarsFromStr(document.location.search);
						s.setLWPvarsFromMetaTags();
						if (!s.onDellCMS()) {
							if (s.prop49) s.setLWPvarsFromStr(s.prop49);
							if (s.hostedLocally(document.referrer)) s.setLWPvarsFromStr(parseUri(document.referrer).query)
						}
						var lwpc = s.readLWPcookie();
						if (lwpc) s.setLWPvarsFromStr(lwpc);
						else s.setLWPvarsFromStr(s.readProp49cookie());
						s.setCCfromURL();
						var lv = s.getLWPvariables();
						if (lv && !s.prop49) {
							s.prop49 = "?" + lv;
							s.writeProp49cookie(lv)
						}
					}
					s_dell.processLWP = s_dell_processLWP;

					function s_dell_setLWPvarsFromMetaTags() {
						var s = s_dell;
						if (!s.prop2) s.prop2 = s.getHTMLtag("meta", "country");
						if (!s.prop2) s.prop2 = s.getHTMLtag("meta", "documentcountrycode");
						if (!s.prop3) s.prop3 = s.getHTMLtag("meta", "language");
						if (!s.eVar32) s.eVar32 = s.getHTMLtag("meta", "segment");
						if (!s.prop6) s.prop6 = s.getHTMLtag("meta", "customerset")
					}
					s_dell.setLWPvarsFromMetaTags = s_dell_setLWPvarsFromMetaTags;

					function s_dell_getHTMLtag(tg, nm) {
						var k = arguments.length > 2 ? arguments[2] : "NAME",
							v = arguments.length > 3 ? arguments[3] : "CONTENT",
							metas = document.getElementsByTagName ? document.getElementsByTagName(tg) : "";
						for (var i = metas.length - 1; i >= 0; i--) {
							var n = metas[i].getAttribute(k);
							n = n ? n.toLowerCase() : "";
							if (n == nm) return metas[i].getAttribute(v).toLowerCase()
						}
						return ""
					}
					s_dell.getHTMLtag = s_dell_getHTMLtag;

					function s_dell_setLWPvarsFromStr(v) {
						var s = s_dell;
						if (!v) return;
						v = v.toString().toLowerCase();
						if (v.substring(0, 1) == "\x26") v =
							"?" + v.substring(1);
						if (v.substring(0, 1) != "?") v = "?" + v;
						if (!s.prop2) s.prop2 = s.getQueryParam("shopper_country", "", v);
						if (!s.prop2) s.prop2 = s.getQueryParam("ctry_id", "", v);
						if (!s.prop2) s.prop2 = s.getQueryParam("c", "", v);
						if (!s.prop3) s.prop3 = s.getQueryParam("l", "", v);
						if (!s.eVar32) s.eVar32 = s.getQueryParam("s", "", v);
						if (!s.eVar32) s.eVar32 = s.getQueryParam("shopper_segment", "", v);
						if (!s.prop6) s.prop6 = s.getQueryParam("customer_id", "", v);
						if (!s.prop6) s.prop6 = s.getQueryParam("cs", "", v);
						if (!s.prop17) s.prop17 = s.getQueryParam("svctag",
							"", v);
						if (!s.prop17) s.prop17 = s.getQueryParam("servicetag", "", v);
						if (!s.prop17) s.prop17 = s.getQueryParam("st55", "", v);
						if (!s.prop17) s.prop17 = s.getQueryParam("tag", "", v);
						if (!s.prop18) s.prop18 = s.getQueryParam("systemid", "", v)
					}
					s_dell.setLWPvarsFromStr = s_dell_setLWPvarsFromStr;

					function s_dell_getLWPvariables() {
						var v = "",
							s = this;
						if (s.prop2) v += "\x26c\x3d" + s.prop2;
						if (s.prop3) v += "\x26l\x3d" + s.prop3;
						if (s.eVar32) v += "\x26s\x3d" + s.eVar32;
						if (s.prop6) v += "\x26cs\x3d" + s.prop6;
						if (s.prop17) v += "\x26servicetag\x3d" + s.prop17;
						if (s.prop18) v += "\x26systemid\x3d" + s.prop18;
						if (v) return v.substring(1);
						return ""
					}
					s_dell.getLWPvariables = s_dell_getLWPvariables;
					s_dell.cCodes = ["ae", "ag", "ai", "al", "am", "an", "ao", "ar", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bg", "bh", "bm", "bo", "br", "bs", "bw", "by", "bz", "ca", "ch", "cl", "cm", "cn", "co", "cr", "cy", "cz", "de", "dk", "dm", "do", "dz", "ec", "ed", "ee", "eg", "es", "et", "eu", "fi", "fj", "fr", "gb", "gd", "ge", "gh", "gr", "gt", "gy", "hk", "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "ir", "is", "it", "jm", "jo", "jp", "ke", "kn",
						"kr", "kw", "ky", "kz", "lb", "lc", "li", "lk", "lt", "lu", "lv", "ma", "md", "me", "mk", "ml", "mq", "ms", "mt", "mu", "mx", "my", "mz", "na", "ng", "ni", "nl", "no", "nz", "om", "pa", "pe", "ph", "pk", "pl", "pr", "pt", "py", "qa", "ro", "rs", "ru", "ru", "rw", "sa", "se", "sg", "si", "sk", "sn", "sr", "sv", "sy", "tc", "td", "th", "tm", "tn", "tr", "tt", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "vc", "ve", "vg", "vi", "vn", "ye", "yu", "za", "zm", "zw"
					];

					function s_dell_setCCfromURL() {
						var s = s_dell;
						if (s.prop2) return;
						if (arguments.length > 0) var r = arguments[0];
						else {
							if (typeof document.location.href ==
								"undefined") return;
							var r = document.location.href
						}
						var h = parseUri(r).host.split(".");
						var d = h.length >= 3 ? h[h.length - 1] : "";
						if (d.length == 2 && s.inList(d, s.cCodes)) {
							s.prop2 = d;
							return
						}
						for (var i = 1; i < h.length; i++)
							if (h[i] == "dell") {
								d = h[i - 1];
								if (s.inList(d, s.cCodes)) {
									s.prop2 = d;
									return
								}
							} var p = parseUri(r).directory;
						if (p.length < 4 || p[3] != "/") return;
						var p1 = p.substring(1, 3);
						if (s.inList(p1, s.cCodes)) {
							s.prop2 = p1;
							return
						}
					}
					s_dell.setCCfromURL = s_dell_setCCfromURL;

					function s_dell_readLWPcookie() {
						return gC("lwp")
					}
					s_dell.readLWPcookie =
						s_dell_readLWPcookie;

					function s_dell_readProp49cookie() {
						return gC("s_c49")
					}
					s_dell.readProp49cookie = s_dell_readProp49cookie;

					function s_dell_writeProp49cookie() {
						var v = s_dell.getLWPvariables();
						if (v) sC("s_c49", v)
					}
					s_dell.writeProp49cookie = s_dell_writeProp49cookie;

					function s_dell_getPNfromURL() {
						var s = s_dell,
							p = document.location.protocol;
						if (p.indexOf("http") == 0) {
							var pn = parseUri(document.location.href).host.replace(/^www[0-9]*\./i, "") + parseUri(document.location.href).path.replace(/\.(aspx?|s?html?|cgi|php[0-9]|wml)/i,
								"").replace(/\/(default|index)/i, "");
							if (pn.indexOf("/") == -1) pn = pn + "/";
							sku = s.getQueryParam("sku", "", document.location.search);
							if (!sku) sku = s.getQueryParam("channel-product-id", "", document.location.search);
							if (sku) pn += "[sku\x3d" + sku + "]"
						} else pn = p;
						return pn.toLowerCase()
					}
					s_dell.getPNfromURL = s_dell_getPNfromURL;

					function s_dell_getObjectID(o) {
						return o.href
					}
					s_dell.getObjectID = s_dell_getObjectID;
					window.adTrackClickThroughs = function() {
						var s = s_dell;
						var q = s.determineCMS() == "nextgen" ? ".omnitureADTrack[omnitureadid]" :
							".omnitureADTrack[@omnitureadid]";
						try {
							jQuery(q).each(function() {
								jQuery(this).click(function() {
									try {
										s.eVar6 = jQuery(this).attr("omnitureadid");
										s.prop28 = "";
										s.linkTrackVars = s.apl(s.linkTrackVars, "eVar6", ",", 2);
										s.tl(this, "o", "ADTrack");
										s.eVar6 = ""
									} catch (e) {}
								})
							})
						} catch (e) {}
					};
					window.adTrackImpressions = function() {
						var s = s_dell;
						var q = s.determineCMS() == "nextgen" ? ".omnitureADTrack[omnitureadid]" : ".omnitureADTrack[@omnitureadid]";
						try {
							var adImpressionsArray = new Array;
							jQuery(q).each(function() {
								if (adImpressionsArray !=
									null) {
									var omnitureadid = jQuery(this).attr("omnitureadid");
									if (adImpressionsArray.indexOf(omnitureadid) == -1 && adImpressionsArray.length < 11) adImpressionsArray.push(omnitureadid)
								}
							});
							s.prop28 = adImpressionsArray.join("|")
						} catch (e) {}
					};
					s_dell.visitorNamespace = "dell";
					{
						s_dell.trackingServer = "nsm.dell.com";
						s_dell.trackingServerSecure = "sm.dell.com"
					}
					s_dell.dc = 112;
					var s_sv_dynamic_root = "survey.112.2o7.net/survey/dynamic";
					var s_sv_gather_root = "survey.112.2o7.net/survey/gather"
				}
			}, 4013984, [3935191, 3761060, 4014135],
			717561, [717321, 717328, 759955]);
		Bootstrapper.bindImmediate(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			try {
				var perfMarkerName = "ensighten-privacy-ruleId-" + this.id + "-deploymentId-" + this.deploymentId,
					perfStartMarker = perfMarkerName + "-start",
					perfEndMarker = perfMarkerName + "-end";
				if (performance && performance.mark) performance.mark(perfStartMarker);
				var hostMap = {
					"dev": {
						tenantUUID: "d6460cb3-dd32-432e-a031-6c131de2e437",
						"www-wip.dell.com": {
							domainUUID: "2f9ad160-9cf6-485a-964a-ee00f2a8827f"
						}
					},
					"prod": {
						tenantUUID: "c2d13f10-990f-429e-8c66-f83d6907e9fc",
						"dell": {
							domainUUID: "b1e50479-0943-4b05-9b08-2f5f77c82102"
						},
						"delltechnologies": {
							domainUUID: "357fb13d-34ab-4f80-b2f2-ec6843835e19"
						},
						"dellemc": {
							domainUUID: "beb20e42-c9a9-4ed3-bf6b-8f23048f1994"
						},
						"www.dellrefurbished.co.uk": {
							domainUUID: "853b5977-8801-45d9-acef-bcf3e754a53a"
						},
						"www.dellrefurbished.com": {
							domainUUID: "a955dc11-ad6a-4f16-a361-576291a76c4e"
						},
						"www.dellrefurbished.ca": {
							domainUUID: "b372a21c-9154-4176-8724-079511bad42c"
						},
						"dwen": {
							domainUUID: "d03643aa-b274-4883-b3ec-781ffec17206"
						},
						"dell-brand": {
							domainUUID: "39eed704-827d-49de-a556-fc7045feb551"
						},
						"alienwarearena": {
							domainUUID: "a8fc74cb-1418-4af6-80eb-24acf9e03a3a"
						},
						"dellstore": {
							domainUUID: "0267a582-9d57-495a-ad47-422e2c795ffe"
						},
						"dellretailstores": {
							domainUUID: "82056dd4-1148-4907-997e-a72fd00f08fb"
						},
						"delltechnologiespodference": {
							domainUUID: "a31113d6-6994-444b-a8e5-a56e0e75dbc4"
						},
						"cvent": {
							domainUUID: "13e31203-6085-4ff7-ae7e-20c7eabbf427"
						},
						"uk.dellexpertprogram.com": {
							domainUUID: "5f00a999-e632-4324-be4c-167e48ad1c97"
						},
						"de.dellexpertprogram.com": {
							domainUUID: "646981fe-dbaa-4aeb-8bf9-239f70929ccd"
						},
						"fr.dellexpertprogram.com": {
							domainUUID: "45684024-6c34-4547-87c8-822d39ba4f1a"
						},
						"in.dellexpertprogram.com": {
							domainUUID: "2d503a6c-6f12-4c61-aef3-b999d50ae919"
						},
						"au.dellexpertprogram.com": {
							domainUUID: "1f73f884-b41d-42e0-960c-fd14926d0a07"
						},
						"nz.dellexpertprogram.com": {
							domainUUID: "b39485e2-d107-4235-85cf-ad4685c3b187"
						},
						"jp.dellexpertprogram.com": {
							domainUUID: "95c71ade-b25f-4d92-8946-852ab2fe7b34"
						},
						"us.dellexpertprogram.com": {
							domainUUID: "7e877998-81fb-4a3d-974c-31791e329780"
						},
						"democenter.delltechnologies.com": {
							domainUUID: "25449af7-750e-41a9-bc6b-7893b9017045"
						},
						"dellonline": {
							domainUUID: "319a2a63-5eef-4afa-8ea5-16996e783548"
						},
						"vercel": {
							domainUUID: "823d262a-c889-44cd-bdab-e99e0681235a"
						},
						"force": {
							domainUUID: "f50a8a35-74e2-44bd-aa8e-4a12dbeacf92"
						},
						"site": {
							domainUUID: "0b359948-1ab7-4200-93ba-ad9fe95df2c0"
						},
						"alienware": {
							domainUUID: "4f053925-3c85-4dba-ac0e-8c0906bcca70"
						}
					}
				};
				Dell = window.Dell || {};
				Dell.Metrics = Dell.Metrics || {};
				Dell.Metrics.sc = Dell.Metrics.sc || {};
				var is2parttld = function(value) {
					var tldindicators = ["co", "com", "info", "web", "info", "gov", "edu", "biz", "net",
						"org"
					];
					var countryindicators = ["uk", "us", "fr", "es", "de", "at", "au", "ae", "be", "br", "ca", "ch", "cn", "co", "cz", "dk", "eg", "eu", "fi", "gb", "gr", "hk", "hr", "hu", "ie", "in", "jp", "mx", "nl", "no", "nz", "pl", "ro", "ru", "se"];
					return tldindicators.indexOf(value) !== -1 || countryindicators.indexOf(value) !== -1
				};
				var getRootDomain = function() {
					var parts = window.location.hostname.split(".");
					if (parts.length === 2) rootDomain = parts[0];
					else if (parts.length > 2) {
						var part = parts[parts.length - 2];
						if (is2parttld(part)) rootDomain = parts[parts.length -
							3];
						else rootDomain = part
					}
					return rootDomain
				};
				var rootDomain = getRootDomain();
				var env = /(dev|stage)/ig.test(Bootstrapper.ensightenOptions.publishPath) ? "dev" : "prod",
					curr_hostname = env != "dev" ? rootDomain : "www-wip.dell.com",
					curr_url = location.href,
					tenantUUID = hostMap[env] ? hostMap[env].tenantUUID : "",
					domainUUID = hostMap[env][curr_hostname] ? hostMap[env][curr_hostname].domainUUID : "";
				domainUUID = !domainUUID ? hostMap[env][location.hostname].domainUUID : domainUUID;
				var ensBootstrapElem = document.querySelector("script[src*\x3d'Bootstrap.js']") ||
					"";
				var nonceAttr = ensBootstrapElem.nonce || "";
				if (tenantUUID && domainUUID) {
					window.dellcmp = true;
					var autoBlockingXhr = new XMLHttpRequest,
						autoBlockingSrc = "https://cdn-prod.eu.securiti.ai/consent/auto_blocking/" + tenantUUID + "/" + domainUUID + ".js";
					autoBlockingXhr.open("GET", autoBlockingSrc);
					autoBlockingXhr.addEventListener("load", function() {
						var autoBlockingElement = document.createElement("script");
						autoBlockingElement.async = false;
						autoBlockingElement.type = "text/javascript";
						autoBlockingElement.crossOrigin = "anonymous";
						autoBlockingElement.text = autoBlockingXhr.responseText;
						if (nonceAttr) autoBlockingElement.setAttribute("nonce", nonceAttr);
						document.head.appendChild(autoBlockingElement)
					});
					autoBlockingXhr.send("");
					var securitiCSS = document.createElement("link");
					securitiCSS.setAttribute("rel", "stylesheet");
					securitiCSS.setAttribute("href", "https://cdn-prod.eu.securiti.ai/consent/cookie-consent.css");
					document.head.appendChild(securitiCSS);
					var tenantCSS = document.createElement("link");
					tenantCSS.setAttribute("rel", "stylesheet");
					tenantCSS.setAttribute("href", "https://cdn-prod.eu.securiti.ai/consent/styles/" + tenantUUID + "/" + domainUUID + ".css");
					document.head.appendChild(tenantCSS);
					var customEventFunc = function(eventName) {
						var event;
						if (document.createEvent) {
							event = document.createEvent("Event");
							event.initEvent(eventName, true, true);
							event.eventName = eventName;
							window.dispatchEvent(event)
						}
					};
					var callConsentSDK = function() {
						var bannerElement = document.createElement("script");
						bannerElement.async = false;
						bannerElement.setAttribute("data-tenant-uuid",
							tenantUUID);
						bannerElement.setAttribute("data-domain-uuid", domainUUID);
						bannerElement.setAttribute("data-backend-url", "https://app.eu.securiti.ai");
						bannerElement.setAttribute("data-strict-csp", true);
						bannerElement.crossOrigin = "anonymous";
						bannerElement.src = "https://cdn-prod.eu.securiti.ai/consent/cookie-consent-sdk-strict-csp.js";
						document.head.appendChild(bannerElement);
						bannerElement.addEventListener("load", function() {
							var overrideBannerLanguage = {};
							overrideBannerLanguage[curr_url] = Dell.Metrics.sc.language ||
								"en";
							window.initCmp();
							window.setConsentBannerParams({
								overrideBannerLanguage: overrideBannerLanguage
							});
							window.privacyReady = true;
							customEventFunc("privacy-ready")
						})
					};
					var cmpStyle = document.createElement("style");
					if (nonceAttr) cmpStyle.setAttribute("nonce", nonceAttr);
					cmpStyle.innerText = ".cmp-loader{display:none !important}" + ".cmp-body *,.cc-window{font-family:roboto,Arial,Helvetica,sans-serif;color:#0E0E0E;font-weight:normal}" + ".cmp-tab-content,.cmp-accordion{color:#0E0E0E !important}" + ".cmp-body em \x3e span {color: #0672cb !important}" +
						".cc-dismiss{border: 1px solid #0672CB !important; background-color:#0672CB !important;  color: #fff !important; margin: 10px 0 !important;text-decoration: none !important;}" + ".cc-btn{font-size:inherit;font-weight:normal; border:0;background-color: #0672cb; color:#fff}" + ".cmp-pref-link{font-size:inherit;font-weight:normal;text-decoration: none !important; color: #0672CB !important}" + ".cmp-switch.readonly{display:none}" + ".cmp-tabs__nav ul li a {border-radius:0}" + ".cmp-tabs__nav ul li a span{font-weight:normal}" +
						".cmp-tabs__nav ul li a:hover {color: #0672CB;background: #F5F6F7;}" + ".cmp-tabs .cmp-tabs__nav ul li.is-active a{background-color:#0672CB}" + ".cmp-tabs__opt-out.active {border:0;background:#D9F5FD;color:#002A58}" + ".cmp-accordion__sub-title {display:none}" + ".cmp-accordion__sub-title.cmp-text-ellipsis {display:block}" + ".cmp-modal__title {font-size:32px !important; font-weight:300!important}" + ".cmp-tabs__title {font-weight: normal}" + ".cmp-modal__sub-title {border-bottom:1px solid #D2D2D2}" + ".cmp-accordion__content\x3e.cmp-accordion,.cmp-accordion__item {border-color: #D2D2D2}" +
						".cmp-accordion__content .cmp-accordion__title {font-weight: bold;}" + ".cmp-modal__body {background: #fff}" + ".cmp-modal__footer{background:#f5f6f7}" + ".cmp-modal__footer .cmp-btn-wrapper{border-color:#d2d2d2;background:#f5f6f7}" + ".cmp-switch__slider{background:#fff; border:1px solid #7E7E7E}" + ".cmp-switch__slider:after{background-color: #7e7e7e}" + ".cmp-switch input:checked+.cmp-switch__slider{border:0}" + ".cmp-horizontal-tabs__content{border:0}" + ".cmp-tabs__sub-title{cursor:pointer; color:#0672cb !important; text-decoration:underline}" +
						".cmp-modal__footer .cmp-save-btn, .cmp-modal__footer .cmp-decline-btn{background-color:#0672CB}" + ".cc-type-opt-out .cc-dismiss{border: 0 !important;color: #fff !important;background-color: #0672cb !important;}" + ".cc-type-opt-out .cc-deny{border: 0 !important;color: #fff !important;background-color: #0672cb !important;}" + ".cc-window.cc-floating{background-color:#f5f6f7 !important; z-index:999999 !important;}" + ".cmp-body{z-index: 999999 !important;}" + ".cc-type-info{display:none;}" + ".cc-dismiss.hide{display:none;}" +
						".cmp-tabs__content{min-height:330px;}";
					if (/jp/i.test(Dell.Metrics.sc.country)) cmpStyle.innerText += ".cc-compliance .cc-dismiss{display:none}";
					document.head.appendChild(cmpStyle);
					var dispatchPrivacyEvent = function() {
						window.addEventListener("message", function(ev) {
							var privacyPolicy = document.querySelector(".cc-message .cc-link");
							var region = typeof bannerConfigUtils != "undefined" && bannerConfigUtils.getParams ? bannerConfigUtils.getParams().location : "";
							if (region && region.indexOf("#") > -1) {
								window.privacyCountry =
									region.split("#")[1].toLowerCase();
								window.privacyState = region.split("#")[0].toLowerCase()
							}
							if (ev.data.message === "consent_given") {
								window.privacyGPC = bannerConfigUtils.getGpcStatusInSelectedLocation() && navigator.globalPrivacyControl;
								if (window.privacyGPC) {
									var ccpaStyle = document.createElement("style");
									if (nonceAttr) ccpaStyle.setAttribute("nonce", nonceAttr);
									ccpaStyle.innerText = ".cmp-switch,.cmp-tabs__sub-title,.cmp-check-icon,.cmp-save-btn,.cmp-third-party-cookie{display:none !important}";
									document.head.appendChild(ccpaStyle);
									sessionStorage.setItem("dellcjpublisher", "gpc");
									sessionStorage.setItem("dellcjgdpr", "gpc")
								} else {
									if (ev.data.consentStatuses.Statistical) {
										if (!window.privacyStatistics) {
											customEventFunc("privacy-statistics-consent");
											customEventFunc("privacy-analytics-consent")
										}
										window.privacyStatistics = true;
										window.privacyAnalytics = true
									}
									if (ev.data.consentStatuses.Marketing) {
										if (!window.privacyMarketing) customEventFunc("privacy-marketing-consent");
										window.privacyMarketing = true
									}
								}
							}
							if (ev.data === "SECURITI_AB_LOADED") {
								window.privacyAuto =
									true;
								customEventFunc("privacy-auto")
							}
							if (privacyPolicy && Dell.Metrics.sc.country && Dell.Metrics.sc.language) privacyPolicy.href = "https://www.dell.com/learn/" + Dell.Metrics.sc.country + "/" + Dell.Metrics.sc.language + "/" + Dell.Metrics.sc.country + "corp1/policies-privacy"
						});
						callConsentSDK()
					};
					dispatchPrivacyEvent();
					var orig_serverComponent = window[ensightenOptions.ns].getServerComponent;
					window[ensightenOptions.ns].getServerComponent = function() {
						return function() {
							var orig_args = arguments;
							if (window.privacyReady) orig_serverComponent.apply(window[ensightenOptions.ns],
								orig_args);
							else window.addEventListener("privacy-ready", function() {
								orig_serverComponent.apply(window[ensightenOptions.ns], orig_args)
							})
						}
					}();
					var getCookie = function(cookie_name) {
						var results = document.cookie.match("(^|;) ?" + cookie_name + "\x3d([^;]*)(;|$)");
						if (results) return unescape(results[2]);
						else return null
					};
					var setCookie = function(name, val, opts) {
						var cookie;
						cookie = name + "\x3d" + val;
						if (opts) {
							if (opts.expDate) cookie += "; expires\x3d" + opts.expDate.toGMTString();
							if (opts.path) cookie += "; path\x3d" + escape(opts.path);
							if (opts.domain) cookie += "; domain\x3d" + escape(opts.domain);
							if (opts.secure) cookie += "; secure"
						}
						return document.cookie = cookie
					};
					var set_d_vi = function() {
						(new Image).src = "//nexus.dell.com/d_vi"
					};
					window.addEventListener("message", function(ev) {
						if (ev.data.message === "consent_given") {
							var d_vi_exist = getCookie("d_vi");
							var consentsGiven = JSON.parse(getCookie("__privaci_cookie_consents")),
								noAction = getCookie("__privaci_cookie_no_action");
							if (consentsGiven && bannerConfigUtils) {
								var categoryMap = {},
									s_consent = 0,
									m_consent =
									0,
									e_consent = 1,
									categories = bannerConfigUtils.getParams().categories;
								categories.forEach(function(element) {
									if (element.name.toLowerCase() == "essential") e_consent = consentsGiven.consents[element.id];
									else if (element.name.toLowerCase() == "marketing") m_consent = consentsGiven.consents[element.id];
									else s_consent = consentsGiven.consents[element.id]
								});
								categoryMap = {
									s: s_consent,
									m: m_consent,
									e: e_consent
								};
								setCookie("dell_cmp_consent", JSON.stringify(categoryMap), {
									path: "/",
									secure: true,
									domain: "dell.com"
								});
								if (!d_vi_exist &&
									m_consent) set_d_vi()
							} else if (noAction && consentBannerUtils.getComplianceType() && consentBannerUtils.getComplianceType() != "opt-in") {
								setCookie("dell_cmp_consent", JSON.stringify({
									s: 1,
									m: 1,
									e: 1
								}), {
									path: "/",
									secure: true,
									domain: "dell.com"
								});
								if (!d_vi_exist) set_d_vi()
							}
						}
					})
				}
				if (performance && performance.mark) performance.mark(perfEndMarker);
				if (performance && performance.measure) performance.measure(perfMarkerName, perfStartMarker, perfEndMarker)
			} catch (e) {}
		}, 4015869, 683289);
		Bootstrapper.bindDependencyDOMParsed(function() {
			var Bootstrapper = window["Bootstrapper"];
			var ensightenOptions = Bootstrapper.ensightenOptions;
			try {
				var perfMarkerName = "ensighten-privacy-ruleId-" + this.id + "-deploymentId-" + this.deploymentId,
					perfStartMarker = perfMarkerName + "-start",
					perfEndMarker = perfMarkerName + "-end";
				if (performance && performance.mark) performance.mark(perfStartMarker);
				var setupButton = function() {
					var ensBootstrapElem = document.querySelector("script[src*\x3d'Bootstrap.js']") || "";
					var nonceAttr = ensBootstrapElem.nonce ||
						"";
					var consentButton = document.createElement("button"),
						consentButtonDiv = document.createElement("div");
					consentButtonDiv.setAttribute("id", "consent-button-div");
					consentButton.setAttribute("class", "cmp-revoke-consent");
					consentButton.setAttribute("id", "cmp-revoke-consent");
					consentButton.setAttribute("type", "button");
					consentButton.setAttribute("aria-label", "manage your cookies");
					consentButtonDiv.appendChild(consentButton);
					var footerElement = document.querySelector("footer") || document.querySelector(".footercontainer");
					if (footerElement) {
						footerElement.insertBefore(consentButtonDiv, footerElement.firstChild);
						consentButton.innerHTML = '\x3cspan class\x3d"cookie-icon"\x3e\x3csvg width\x3d"34" height\x3d"34" viewBox\x3d"0 0 24 25" fill\x3d"none" xmlns\x3d"http://www.w3.org/2000/svg"\x3e' + '\x3cpath d\x3d"M9.8251 14.363C10.4671 14.363 10.9876 13.8426 10.9876 13.2005C10.9876 12.5585 10.4671 12.038 9.8251 12.038C9.18307 12.038 8.6626 12.5585 8.6626 13.2005C8.6626 13.8426 9.18307 14.363 9.8251 14.363Z" fill\x3d"white"/\x3e' +
							'\x3cpath d\x3d"M6.33755 10.6505C6.97958 10.6505 7.50005 10.13 7.50005 9.488C7.50005 8.84597 6.97958 8.3255 6.33755 8.3255C5.69552 8.3255 5.17505 8.84597 5.17505 9.488C5.17505 10.13 5.69552 10.6505 6.33755 10.6505Z" fill\x3d"white"/\x3e' + '\x3cpath d\x3d"M12.4501 19.0505C13.0921 19.0505 13.6126 18.5301 13.6126 17.888C13.6126 17.246 13.0921 16.7255 12.4501 16.7255C11.8081 16.7255 11.2876 17.246 11.2876 17.888C11.2876 18.5301 11.8081 19.0505 12.4501 19.0505Z" fill\x3d"white"/\x3e' + '\x3cpath d\x3d"M16.9874 15.3005C17.6295 15.3005 18.15 14.7801 18.15 14.138C18.15 13.496 17.6295 12.9755 16.9874 12.9755C16.3454 12.9755 15.825 13.496 15.825 14.138C15.825 14.7801 16.3454 15.3005 16.9874 15.3005Z" fill\x3d"white"/\x3e' +
							'\x3cpath fill-rule\x3d"evenodd" clip-rule\x3d"evenodd" d\x3d"M8.34399 0.774475L8.46883 1.74205C8.7209 3.69559 10.3922 5.21303 12.45 5.21303C12.8948 5.21303 13.2185 5.1788 13.5628 5.06402L14.3517 4.80104L14.5321 5.61283C14.6716 6.24049 14.8722 6.82593 15.186 7.32803L15.1881 7.33139L15.1902 7.33478C16.7393 9.87279 20.0703 10.6947 22.6029 9.18167L23.4804 8.65745L23.7171 9.65181C23.9209 10.5079 24 11.3929 24 12.2255C24 18.8272 18.6017 24.2255 12 24.2255C5.39829 24.2255 0 18.8272 0 12.2255C0 7.26344 3.0412 2.94379 7.44103 1.14387L8.34399 0.774475ZM7.19786 2.90534C3.79036 4.65352 1.5 8.19937 1.5 12.2255C1.5 17.9988 6.22671 22.7255 12 22.7255C17.7733 22.7255 22.5 17.9988 22.5 12.2255C22.5 11.8004 22.4767 11.3678 22.4247 10.9408C19.3458 12.1864 15.7009 11.0469 13.9119 8.11961C13.6213 7.65391 13.4138 7.15862 13.2602 6.66607C12.9902 6.70214 12.724 6.71303 12.45 6.71303C9.98192 6.71303 7.90792 5.11462 7.19786 2.90534Z" fill\x3d"white"/\x3e' +
							"\x3c/svg\x3e\x3c/span\x3e";
						consentButtonDiv.style.position = "absolute";
						consentButton.style.display = "block";
						consentButton.style.position = "relative";
						consentButton.style.cursor = "pointer";
						consentButton.style.right = "auto";
						consentButton.style.bottom = "45px";
						consentButton.style.left = "14px";
						consentButton.style.background = "#0672CB";
						consentButton.style.border = 0;
						consentButton.style.color = "#fff";
						consentButton.style.fontSize = "14px";
						consentButton.style.padding = 0;
						consentButton.style.zIndex = 999;
						consentButton.style.lineHeight =
							"normal";
						consentButton.onclick = function() {
							showConsentPreferencesPopup()
						};
						var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
						var isSticky = true;
						var toggleSticky = function toggleSticky(makeSticky) {
							consentButton.style.position = makeSticky ? "fixed" : "relative";
							isSticky = makeSticky
						};
						var btnStyle = document.createElement("style");
						if (nonceAttr) btnStyle.setAttribute("nonce", nonceAttr);
						btnStyle.innerText = "@media (max-width: 992px){#cmp-revoke-consent{bottom:10px !important;font-size:0 !important}}";
						btnStyle.innerText += ".cmp-revoke-consent:focus{background-color: #0063b8 !important;outline:2px solid #000 !important}";
						document.head.appendChild(btnStyle)
					}
				};
				var setPrivacyPageLink = function() {
					var cmpPreferences = document.querySelectorAll(".cmp-preferences");
					if (cmpPreferences)
						for (var i = 0; i < cmpPreferences.length; i++) {
							cmpPreferences[i].style.cursor = "pointer";
							cmpPreferences[i].onclick = function() {
								showConsentPreferencesPopup()
							}
						}
				};
				var setDoNotSellLink = function() {
					document.querySelectorAll(".ccpa-do-not-sell").forEach(function(elem) {
						elem.onclick =
							function() {
								bannerGenerator.dropPrivaciCookies({
									"Essential": 1,
									"Marketing": 0,
									"Statistical": 0
								});
								showConsentPreferencesPopup()
							}
					})
				};
				if (window.dellcmp) {
					if (window.privacyReady) {
						if (!document.querySelector("#consent-button-div")) setupButton();
						setPrivacyPageLink();
						setDoNotSellLink()
					} else window.addEventListener("privacy-ready", function() {
						if (!document.querySelector("#consent-button-div")) setupButton();
						setPrivacyPageLink();
						setDoNotSellLink()
					});
					setTimeout(function() {
							if (!document.querySelector("#consent-button-div")) setupButton()
						},
						1E3)
				}
				if (performance && performance.mark) performance.mark(perfEndMarker);
				if (performance && performance.measure) performance.measure(perfMarkerName, perfStartMarker, perfEndMarker)
			} catch (e) {}
		}, 4021163, [4015869], 689045, [683289]);
		Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
	}
})();