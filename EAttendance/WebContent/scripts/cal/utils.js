var Zapatec = {};

/// define the Utils namespace
Zapatec.Utils = {};
Zapatec.Utils.getAbsolutePos = function(el) {
	var SL = 0, ST = 0;
	var is_div = /^div$/i.test(el.tagName);
	if (is_div && el.scrollLeft)
		SL = el.scrollLeft;
	if (is_div && el.scrollTop)
		ST = el.scrollTop;
	var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
	if (el.offsetParent) {
		var tmp = this.getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};


Zapatec.Utils.fixBoxPosition = function(box) {
	if (box.x < 0)
		box.x = 0;
	if (box.y < 0)
		box.y = 0;
	var cp = Zapatec.Utils.createElement("div");
	var s = cp.style;
	s.position = "absolute";
	s.right = s.bottom = s.width = s.height = "0px";
	window.document.body.appendChild(cp);
	var br = Zapatec.Utils.getAbsolutePos(cp);
	window.document.body.removeChild(cp);
	if (Zapatec.is_ie) {
		br.y += window.document.body.scrollTop;
		br.x += window.document.body.scrollLeft;
	} else {
		br.y += window.scrollY;
		br.x += window.scrollX;
	}
	var tmp = box.x + box.width - br.x;
	if (tmp > 0) box.x -= tmp;
	tmp = box.y + box.height - br.y;
	if (tmp > 0) box.y -= tmp;
};


Zapatec.Utils.isRelated = function (el, evt) {
	evt || (evt = window.event);
	var related = evt.relatedTarget;
	if (!related) {
		var type = evt.type;
		if (type == "mouseover") {
			related = evt.fromElement;
		} else if (type == "mouseout") {
			related = evt.toElement;
		}
	}
	try {
		while (related) {
			if (related == el) {
				return true;
			}
			related = related.parentNode;
		}
	} catch(e) {};
	return false;
};


Zapatec.Utils.removeClass = function(el, className) {
	if (!(el && el.className)) {
		return;
	}
	var cls = el.className.split(" ");
	var ar = [];
	for (var i = cls.length; i > 0;) {
		if (cls[--i] != className) {
			ar[ar.length] = cls[i];
		}
	}
	el.className = ar.join(" ");
};


Zapatec.Utils.addClass = function(el, className) {
	Zapatec.Utils.removeClass(el, className);
	el.className += " " + className;
};


Zapatec.Utils.getElement = function(ev) {
	if (Zapatec.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.currentTarget;
	}
};


Zapatec.Utils.getTargetElement = function(ev) {
	if (Zapatec.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.target;
	}
};

Zapatec.Utils.stopEvent = function(ev) {
	ev || (ev = window.event);
	if (Zapatec.is_ie) {
		ev.cancelBubble = true;
		ev.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
	return false;
};


Zapatec.Utils.addEvent = function(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, true);
	} else {
		el["on" + evname] = func;
	}
};


Zapatec.Utils.removeEvent = function(el, evname, func) {
	if (el.detachEvent) { // IE
		el.detachEvent("on" + evname, func);
	} else if (el.removeEventListener) { // Gecko / W3C
		el.removeEventListener(evname, func, true);
	} else {
		el["on" + evname] = null;
	}
};


Zapatec.Utils.createElement = function(type, parent) {
	var el = null;
	if (window.self.document.createElementNS)
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		el = window.self.document.createElementNS("http://www.w3.org/1999/xhtml", type);
	else
		el = window.self.document.createElement(type);
	if (typeof parent != "undefined")
		parent.appendChild(el);
	if (Zapatec.is_ie)
		el.setAttribute("unselectable", true);
	if (Zapatec.is_gecko)
		el.style.setProperty("-moz-user-select", "none", "");
	return el;
};


Zapatec.Utils.writeCookie = function(name, value, domain, path, exp_days) {
	value = escape(value);
	var ck = name + "=" + value, exp;
	if (domain)
		ck += ";domain=" + domain;
	if (path)
		ck += ";path=" + path;
	if (exp_days) {
		exp = new Date();
		exp.setTime(exp_days * 86400000 + exp.getTime());
		ck += ";expires=" + exp.toGMTString();
	}
	document.cookie = ck;
};


Zapatec.Utils.getCookie = function(name) {
	var re = new RegExp("(^|;\\s*)" + name + "\\s*=(.*?)(;|$)");
	if (re.test(document.cookie)) {
		var value = RegExp.$2;
		value = unescape(value);
		return (value);
	}
	return null;
};


Zapatec.Utils.makePref = function(obj) {
	function stringify(val) {
		if (typeof val == "object" && !val)
			return "null";
		else if (typeof val == "number" || typeof val == "boolean")
			return val;
		else if (typeof val == "string")
			return '"' + val.replace(/\22/, "\\22") + '"';
		else return null;
	};
	var txt = "", i;
	for (i in obj)
		txt += (txt ? ",'" : "'") + i + "':" + stringify(obj[i]);
	return txt;
};

Zapatec.Utils.loadPref = function(txt) {
	var obj = null;
	try {
		eval("obj={" + txt + "}");
	} catch(e) {}
	return obj;
};


Zapatec.Utils.mergeObjects = function(dest, src) {
	for (var i in src)
		dest[i] = src[i];
};


Zapatec.Utils.__wch_id = 0;	/**< [number, static] used to create ID-s for the WCH objects */


Zapatec.Utils.createWCH = function() {
	var f = null;
	if (Zapatec.is_ie && !Zapatec.is_ie5) {
		var filter = 'filter:progid:DXImageTransform.Microsoft.alpha(style=0,opacity=0);';
		var id = "WCH" + (++Zapatec.Utils.__wch_id);
		window.self.document.body.insertAdjacentHTML
			('beforeEnd', '<iframe id="' + id + '" scroll="no" frameborder="0" ' +
			 'style="z-index:0;position:absolute;visibility:hidden;' + filter +
			 'border:0;top:0;left:0;width:0;height:0;" ' +
			 'src="javascript:false;"></iframe>');
		f = window.self.document.getElementById(id);
	}
	return f;
};

Zapatec.Utils.setupWCH_el = function(f, el, el2) {
	if (f) {
		var pos = Zapatec.Utils.getAbsolutePos(el),
			X1 = pos.x,
			Y1 = pos.y,
			X2 = X1 + el.offsetWidth,
			Y2 = Y1 + el.offsetHeight;
		if (el2) {
			var p2 = Zapatec.Utils.getAbsolutePos(el2),
				XX1 = p2.x,
				YY1 = p2.y,
				XX2 = XX1 + el2.offsetWidth,
				YY2 = YY1 + el2.offsetHeight;
			if (X1 > XX1)
				X1 = XX1;
			if (Y1 > YY1)
				Y1 = YY1;
			if (X2 < XX2)
				X2 = XX2;
			if (Y2 < YY2)
				Y2 = YY2;
		}
		Zapatec.Utils.setupWCH(f, X1, Y1, X2-X1, Y2-Y1);
	}
};


Zapatec.Utils.setupWCH = function(f, x, y, w, h) {
	if (f) {
		var s = f.style;
		(typeof x != "undefined") && (s.left = x + "px");
		(typeof y != "undefined") && (s.top = y + "px");
		(typeof w != "undefined") && (s.width = w + "px");
		(typeof h != "undefined") && (s.height = h + "px");
		s.visibility = "visible";
	}
};


Zapatec.Utils.hideWCH = function(f) {
	if (f)
		f.style.visibility = "hidden";
};


Zapatec.Utils.destroy = function(el) {
	if (el && el.parentNode)
		el.parentNode.removeChild(el);
};


Zapatec.Utils.newCenteredWindow = function(url, windowName, width, height, scrollbars){
	var leftPosition = 0;
	var topPosition = 0;
	if (screen.width)
		leftPosition = (screen.width -  width)/2;
	if (screen.height)
		topPosition = (screen.height -  height)/2;
	var winArgs =
		'height=' + height +
		',width=' + width +
		',top=' + topPosition +
		',left=' + leftPosition +
		',scrollbars=' + scrollbars +
		',resizable';
	window.open(url,windowName,winArgs);
	return false;
};


Zapatec.Utils.selectOption = function(sel, val, call_default) {
	var a = sel.options, i, o;
	for (i = a.length; --i >= 0;) {
		o = a[i];
		o.selected = (o.val == val);
	}
	sel.value = val;
	if (call_default) {
		if (typeof sel.onchange == "function")
			sel.onchange();
		else if (typeof sel.onchange == "string")
			eval(sel.onchange);
	}
};


Zapatec.Utils.getNextSibling = function(el, tag) {
	el = el.nextSibling;
	if (!tag)
		return el;
	tag = tag.toLowerCase();
	while (el && (el.nodeType != 1 || el.tagName.toLowerCase() != tag))
		el = el.nextSibling;
	return el;
};


Zapatec.Utils.getFirstChild = function(el, tag) {
	el = el.firstChild;
	if (!tag)
		return el;
	tag = tag.toLowerCase();
	if (el.nodeType == 1 && el.tagName.toLowerCase() == tag)
		return el;
	return Zapatec.Utils.getNextSibling(el, tag);
};

Zapatec.Utils._ids = {};	/**< [number, static] maintains a list of generated IDs */

Zapatec.Utils.generateID = function(code, id) {
	if (typeof id == "undefined") {
		if (typeof this._ids[code] == "undefined")
			this._ids[code] = 0;
		id = ++this._ids[code];
	}
	return "zapatec-" + code + "-" + id;
};

Zapatec.Utils.addTooltip = function(target, tooltip) {
return new Zapatec.Tooltip(target, tooltip);
};


// Browser sniffing

/// detect Opera browser
Zapatec.is_opera = /opera/i.test(navigator.userAgent);

/// detect a special case of "web browser"
Zapatec.is_ie = ( /msie/i.test(navigator.userAgent) && !Zapatec.is_opera );

/// detect IE5.0/Win
Zapatec.is_ie5 = ( Zapatec.is_ie && /msie 5\.0/i.test(navigator.userAgent) );

/// detect IE for Macintosh
Zapatec.is_mac_ie = ( /msie.*mac/i.test(navigator.userAgent) && !Zapatec.is_opera );

/// detect KHTML-based browsers
Zapatec.is_khtml = /Konqueror|Safari|KHTML/i.test(navigator.userAgent);

/// detect Konqueror
Zapatec.is_konqueror = /Konqueror/i.test(navigator.userAgent);

/// detect Gecko
Zapatec.is_gecko = /Gecko/i.test(navigator.userAgent);