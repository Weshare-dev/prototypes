__smjsonp__([4],{291:function(t,n,e){(function(n){function i(){var t=this,n=null;t.get=function(){return t.requestPromise?t.requestPromise:t.requestPromise=new Promise(function(e,i){if(t.config)return e(t.config);var f=c.urls.war_config,l=c.war_endpoint,p=a.getContactId();(new r).withEndpoint(l).withPath(f).ap("s",o.get("_smapp")+o.get("_smid")).ap("u",p.smuuid).ap("d",window.location.host+window.location.pathname).ap("c",p.smclient).ajaxGet().then(function(i){n&&(clearTimeout(n),n=null,t.config=u.from(i),e(t.config))}).catch(function(){i()}),n=setTimeout(function(){i()},s.WAR_CONFIG_REQUEST_TIMEOUT)})}}var r=e(3),o=e(7),c=e(2),u=e(8),a=e(4),s=e(38);t.exports=new i}).call(n,e(0))},292:function(t,n,e){(function(n){function i(){var t=this,n=null;t.report=function(e){return new Promise(function(i,s){var f=c.urls.war_report,l=c.war_endpoint,p=u.getContactId(),d={s:o.get("_smapp")+o.get("_smid"),id:e.id,smuuid:p.smuuid,smclient:p.smclient};return d.rr=e.rr,t.request=(new r).withEndpoint(l).withPath(f).apo(d).ajaxPost().then(function(t){n&&(clearTimeout(n),n=null,i(t))}).catch(function(){s()}),n=setTimeout(function(){s()},a.WAR_REPORT_REQUEST_TIMEOUT),t.request})}}var r=e(3),o=e(7),c=e(2),u=e(4),a=e(38);t.exports=new i}).call(n,e(0))},298:function(t,n,e){(function(n){var i=e(291),r=e(64),o=e(6),c=e(38),u=function(t,n){var e=JSON.parse(JSON.stringify(t));e.rr=n.rr,e.rrId=n.id;var i="AFTER_X_SECONDS"==n.cfg.st?1e3*n.cfg.v:0;switch(e.warAction=n.cfg,n.cfg.at){case"sp":e.cfg.exit=n.cfg.onExit,e.cfg.delay=i,"BASIC"!==e.type&&(e.exit=!1,e.delayValue=0,e.delay=!1);break;case"scf":case"scc":case"sci":e.delayValue=i}return e},a=function(t,n,e,i){if(n&&t.war[e]){var r=n.map(function(n){var r=(i||t.war[e]).filter(function(t){return n.itemId==t.id})[0];return r&&(r=u(r,n)),r}),o=t[e].filter(function(n){return-1===t.war[e].findIndex(function(t){return t.id===n.id})});"f"===e?t.f=r.length?r:o:t[e]=r.concat(o)}};t.exports=function(){var t,n=!1;return{getRunner:function(){return t||this.initRunner()},initRunner:function(){var e,u=new Promise(function(t){e=setTimeout(function(){t()},c.WAR_PROCESSING_TIMEOUT)}),s={},f=new Promise(function(t){if(n)return t(n);u.then(function(){r.get().then(function(n){t(n)})}),s.run=function(r){o.isNotNull(r.war)?(i.get().then(function(i){n||(r.war&&(a(r,i.sp,"p",r.war.p.concat(r.war.pp)),a(r,i.scc.concat(i.sci),"c",r.c),a(r,i.scf,"f")),n=r,t(n),clearTimeout(e))},function(){clearTimeout(e),t(r)}),u.then(function(){t(r)})):t(r)}});return s.processed=f,t=s}}}()}).call(n,e(0))},299:function(t,n,e){var i=e(300);t.exports={isWarAction:function(t){return t.rr},modifyPopupConfig:function(t,n){n.rr=t.rr,n.rrId=t.rrId,"BASIC"!==t.type&&"IMAGE"!==t.type&&(n.popupCfg=t)},scheduleChatActions:function(t,n,e){return i.scheduleChatActions(t,n,e)},getChatToDisplayImmediately:function(t){return i.getChatToDisplayImmediately(t)}}},300:function(t,n,e){var i=e(292),r=function(){var t=this;t.enabled=!0,t.ACTION_INTERVAL=1e4};r.prototype.enqueue=function(t,n){var e=this;return new Promise(function(i,r){e.enabled&&(0===n.delayValue?c(t,n).then(function(){i()},function(){r()}):setTimeout(function(){e.enabled&&c(t,n).then(function(){i()},function(){r()})},n.delayValue))})},r.prototype.setOnStateChange=function(t,n){this.enabled=!t||"fake-conversation"==t};var o=function(t){return'<div align="'+t.align+'">'+t.text+"</div>"},c=function(t,n){return new Promise(function(e,i){switch(n.warAction.at){case"scc":t.showWithMessage(o(n.warAction.content)).then(function(t){!0===t&&e(),!1===t&&i()});break;case"sci":var r=t.setBanner({html:o(n.warAction.content)});!0===r&&e(),!1===r&&i()}})},u=function(){var t=this;t.scheduler=new r,t.setOnStateChange=this.scheduler.setOnStateChange};u.prototype.scheduleChatActions=function(t,n,e){var r=this,o=!1;e.setOnStateChange=r.setOnStateChange,r.scheduler.enabled=!e.state.enabled,setTimeout(function(){n.c.filter(function(t){return t&&t.warAction&&e.chatId==t.id}).forEach(function(t){o=!0,r.scheduler.enqueue(e,t).then(function(){i.report({rr:t.rr,id:t.rrId})})}),o||("EXPANDED"===e.config.display?e.vm.toggleChat():"WIDGET"===e.config.display&&e.setBanner())})},u.prototype.getChatToDisplayImmediately=function(t){return t.c.filter(function(t){return t.rr})},t.exports=new u},301:function(t,n,e){var i=e(302),r=e(291),o=e(292);t.exports={run:function(){r.get().then(function(t){t.ecs.forEach(function(t){i.schedule(t.cfg.scr,{delay:"IMMEDIATELY"!==t.cfg.st?1e3*t.cfg.v:0}).then(function(){o.report({rr:t.rr,id:t.id})})})}).catch(function(){})}}},302:function(module,exports){var CustomScriptExecutor=function(){};CustomScriptExecutor.prototype.execute=function(script){eval(script)},CustomScriptExecutor.prototype.schedule=function(t,n){var e=this;return new Promise(function(i){"number"==typeof n.delay&&n.delay>0?setTimeout(function(){i(),e.execute(t)},n.delay):(i(),e.execute(t))})},module.exports=new CustomScriptExecutor},63:function(t,n,e){t.exports=new function(){this.Config=e(291),this.Properties=e(38),this.QueueModifier=e(298),this.Reporter=e(292),this.Utils=e(299),this.WarCSExecutor=e(301)}}});