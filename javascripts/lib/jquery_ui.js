/*! jQuery UI - v1.10.3 - 2013-09-16
* http://jqueryui.com
* Includes: jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
!function(e,t){var i=0,n=Array.prototype.slice,s=e.cleanData;e.cleanData=function(t){for(var i,n=0;null!=(i=t[n]);n++)try{e(i).triggerHandler("remove")}catch(o){}s(t)},e.widget=function(i,n,s){var o,r,a,l,h={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,s||(s=n,n=e.Widget),e.expr[":"][o.toLowerCase()]=function(t){return!!e.data(t,o)},e[c]=e[c]||{},r=e[c][i],a=e[c][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new a(e,i)},e.extend(a,r,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),l=new n,l.options=e.widget.extend({},l.options),e.each(s,function(i,s){return e.isFunction(s)?(h[i]=function(){var e=function(){return n.prototype[i].apply(this,arguments)},t=function(e){return n.prototype[i].apply(this,e)};return function(){var i,n=this._super,o=this._superApply;return this._super=e,this._superApply=t,i=s.apply(this,arguments),this._super=n,this._superApply=o,i}}(),t):(h[i]=s,t)}),a.prototype=e.widget.extend(l,{widgetEventPrefix:r?l.widgetEventPrefix:i},h,{constructor:a,namespace:c,widgetName:i,widgetFullName:o}),r?(e.each(r._childConstructors,function(t,i){var n=i.prototype;e.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete r._childConstructors):n._childConstructors.push(a),e.widget.bridge(i,a)},e.widget.extend=function(i){for(var s,o,r=n.call(arguments,1),a=0,l=r.length;l>a;a++)for(s in r[a])o=r[a][s],r[a].hasOwnProperty(s)&&o!==t&&(i[s]=e.isPlainObject(o)?e.isPlainObject(i[s])?e.widget.extend({},i[s],o):e.widget.extend({},o):o);return i},e.widget.bridge=function(i,s){var o=s.prototype.widgetFullName||i;e.fn[i]=function(r){var a="string"==typeof r,l=n.call(arguments,1),h=this;return r=!a&&l.length?e.widget.extend.apply(null,[r].concat(l)):r,a?this.each(function(){var n,s=e.data(this,o);return s?e.isFunction(s[r])&&"_"!==r.charAt(0)?(n=s[r].apply(s,l),n!==s&&n!==t?(h=n&&n.jquery?h.pushStack(n.get()):n,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,o);t?t.option(r||{})._init():e.data(this,o,new s(r,this))}),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,n){n=e(n||this.defaultElement||this)[0],this.element=e(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),n!==this&&(e.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===n&&this.destroy()}}),this.document=e(n.style?n.ownerDocument:n.document||n),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,n){var s,o,r,a=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(a={},s=i.split("."),i=s.shift(),s.length){for(o=a[i]=e.widget.extend({},this.options[i]),r=0;s.length-1>r;r++)o[s[r]]=o[s[r]]||{},o=o[s[r]];if(i=s.pop(),n===t)return o[i]===t?null:o[i];o[i]=n}else{if(n===t)return this.options[i]===t?null:this.options[i];a[i]=n}return this._setOptions(a),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,n,s){var o,r=this;"boolean"!=typeof i&&(s=n,n=i,i=!1),s?(n=o=e(n),this.bindings=this.bindings.add(n)):(s=n,n=this.element,o=this.widget()),e.each(s,function(s,a){function l(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof a?r[a]:a).apply(r,arguments):t}"string"!=typeof a&&(l.guid=a.guid=a.guid||l.guid||e.guid++);var h=s.match(/^(\w+)\s*(.*)$/),c=h[1]+r.eventNamespace,u=h[2];u?o.delegate(u,c,l):n.bind(c,l)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?n[e]:e).apply(n,arguments)}var n=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,n){var s,o,r=this.options[t];if(n=n||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(n,s,o){"string"==typeof s&&(s={effect:s});var r,a=s?s===!0||"number"==typeof s?i:s.effect||i:t;s=s||{},"number"==typeof s&&(s={duration:s}),r=!e.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),r&&e.effects&&e.effects.effect[a]?n[t](s):a!==t&&n[a]?n[a](s.duration,s.easing,o):n.queue(function(i){e(this)[t](),o&&o.call(n[0]),i()})}})}(jQuery);