Zapatec.Calendar = function (firstDayOfWeek, dateStr, onSelected, onClose) {
	// member variables
	this.activeDiv = null;
	this.currentDateEl = null;
	this.getDateStatus = null;
	this.getDateToolTip = null;
	this.getDateText = null;
	this.timeout = null;
	this.onSelected = onSelected || null;
	this.onClose = onClose || null;
	this.onFDOW = null;
	this.dragging = false;
	this.hidden = false;
	this.minYear = 1970;
	this.maxYear = 2050;
	this.minMonth = 0;
	this.maxMonth = 11;
	this.dateFormat = Zapatec.Calendar.i18n("DEF_DATE_FORMAT");
	this.ttDateFormat = Zapatec.Calendar.i18n("TT_DATE_FORMAT");
	this.historyDateFormat = "%B %d, %Y";
	this.isPopup = true;
	this.weekNumbers = true;
	this.noGrab = false;
	if (Zapatec.Calendar.prefs.fdow || (Zapatec.Calendar.prefs.fdow == 0)) {
		this.firstDayOfWeek = parseInt(Zapatec.Calendar.prefs.fdow, 10);
	}
	else {
		var fd = 0;
		if (typeof firstDayOfWeek == "number") {
			fd = firstDayOfWeek;
		} else if (typeof Zapatec.Calendar._FD == 'number') {
			fd = Zapatec.Calendar._FD;
		}
		this.firstDayOfWeek = fd;
	}
	this.showsOtherMonths = false;
	this.dateStr = dateStr;
	this.ar_days = null;
	this.showsTime = false;
	this.time24 = true;
	this.yearStep = 2;
	this.hiliteToday = true;
	this.multiple = null;
	// HTML elements
	this.table = null;
	this.element = null;
	this.tbody = null;
	this.firstdayname = null;
	// Combo boxes
	this.monthsCombo = null;   // months
	this.hilitedMonth = null;
	this.activeMonth = null;
	this.yearsCombo = null;	   // years
	this.hilitedYear = null;
	this.activeYear = null;
	this.histCombo = null;	   // history
	this.hilitedHist = null;
	// Information
	this.dateClicked = false;

	// one-time initializations
	Zapatec.Calendar._initSDN();
};


Zapatec.Calendar._initSDN = function() {
	if (typeof Zapatec.Calendar._TT._SDN == "undefined") {
		// table of short day names
		if (typeof Zapatec.Calendar._TT._SDN_len == "undefined")
			Zapatec.Calendar._TT._SDN_len = 3;
		var ar = [];
		for (var i = 8; i > 0;) {
			ar[--i] = Zapatec.Calendar._TT._DN[i].substr(0, Zapatec.Calendar._TT._SDN_len);
		}
		Zapatec.Calendar._TT._SDN = ar;
		// table of short month names
		if (typeof Zapatec.Calendar._TT._SMN_len == "undefined")
			Zapatec.Calendar._TT._SMN_len = 3;
		ar = [];
		for (var i = 12; i > 0;) {
			ar[--i] = Zapatec.Calendar._TT._MN[i].substr(0, Zapatec.Calendar._TT._SMN_len);
		}
		Zapatec.Calendar._TT._SMN = ar;
	}
};


Zapatec.Calendar.i18n = function(str, type) {
	var tr = '';
	if (!type) {
		// normal _TT request
		if (Zapatec.Calendar._TT)
			tr = Zapatec.Calendar._TT[str];
		if (!tr && Zapatec.Calendar._TT_en)
			tr = Zapatec.Calendar._TT_en[str];
	} else switch(type) {
	    case "dn"  : tr = Zapatec.Calendar._TT._DN[str];  break;
	    case "sdn" : tr = Zapatec.Calendar._TT._SDN[str]; break;
	    case "mn"  : tr = Zapatec.Calendar._TT._MN[str];  break;
	    case "smn" : tr = Zapatec.Calendar._TT._SMN[str]; break;
	}
	if (!tr) tr = "" + str;
	return tr;
};

// ** constants

/// "static", needed for event handlers.
Zapatec.Calendar._C = null;

/// preferences
Zapatec.Calendar.prefs = {
	fdow     : null,	/**< when NULL we will use the options passed at Zapatec.Calendar.setup */
	history  : "",		/**< keeps the history as one big string */
	hsize    : 9		/**< maximum history size (number of stored items) */
};

// BEGIN: CALENDAR STATIC FUNCTIONS

/**
 * Writes the preferences cookie.
 */
Zapatec.Calendar.savePrefs = function() {
	// FIXME: should we make the domain, path and expiration time configurable?
	// I guess these defaults are right though..
	Zapatec.Utils.writeCookie("DYN_CAL", Zapatec.Utils.makePref(this.prefs), null, '/', 30);
};

/**
 * Loads the preference cookie and merges saved prefs to Zapatec.Calendar.prefs.
 */
Zapatec.Calendar.loadPrefs = function() {
	var txt = Zapatec.Utils.getCookie("DYN_CAL"), tmp;
	if (txt) {
		tmp = Zapatec.Utils.loadPref(txt);
		if (tmp)
			Zapatec.Utils.mergeObjects(this.prefs, tmp);
	}
	// FIXME: DEBUG!
	//this.prefs.history = "1979/03/08,1976/12/28,1978/08/31,1998/09/21";
	//this.prefs.history = null;
};


Zapatec.Calendar._add_evs = function(el) {
	var C = Zapatec.Calendar;
	Zapatec.Utils.addEvent(el, "mouseover", C.dayMouseOver);
	Zapatec.Utils.addEvent(el, "mousedown", C.dayMouseDown);
	Zapatec.Utils.addEvent(el, "mouseout", C.dayMouseOut);
	if (Zapatec.is_ie)
		Zapatec.Utils.addEvent(el, "dblclick", C.dayMouseDblClick);
};


Zapatec.Calendar._del_evs = function(el) {
	var C = this;
	Zapatec.Utils.removeEvent(el, "mouseover", C.dayMouseOver);
	Zapatec.Utils.removeEvent(el, "mousedown", C.dayMouseDown);
	Zapatec.Utils.removeEvent(el, "mouseout", C.dayMouseOut);
	if (Zapatec.is_ie)
		Zapatec.Utils.removeEvent(el, "dblclick", C.dayMouseDblClick);
};


Zapatec.Calendar.findMonth = function(el) {
	if (typeof el.month != "undefined") {
		return el;
	} else if (el.parentNode && typeof el.parentNode.month != "undefined") {
		return el.parentNode;
	}
	return null;
};

/** Similar to findMonth() but for the history combo. */
Zapatec.Calendar.findHist = function(el) {
	if (typeof el.histDate != "undefined") {
		return el;
	} else if (el.parentNode && typeof el.parentNode.histDate != "undefined") {
		return el.parentNode;
	}
	return null;
};

/** Similar to the above functions, but for the years combo. */
Zapatec.Calendar.findYear = function(el) {
	if (typeof el.year != "undefined") {
		return el;
	} else if (el.parentNode && typeof el.parentNode.year != "undefined") {
		return el.parentNode;
	}
	return null;
};


Zapatec.Calendar.showMonthsCombo = function () {
	var cal = Zapatec.Calendar._C;
	if (!cal) {
		return false;
	}
	var cd = cal.activeDiv;
	var mc = cal.monthsCombo;
	var date = cal.date,
		MM = cal.date.getMonth(),
		YY = cal.date.getFullYear(),
		min = (YY == cal.minYear),
		max = (YY == cal.maxYear);
	for (var i = mc.firstChild; i; i = i.nextSibling) {
		var m = i.month;
		Zapatec.Utils.removeClass(i, "hilite");
		Zapatec.Utils.removeClass(i, "active");
		Zapatec.Utils.removeClass(i, "disabled");
		i.disabled = false;
		if ((min && m < cal.minMonth) ||
		    (max && m > cal.maxMonth)) {
			Zapatec.Utils.addClass(i, "disabled");
			i.disabled = true;
		}
		if (m == MM)
			Zapatec.Utils.addClass(cal.activeMonth = i, "active");
	}
	var s = mc.style;
	s.display = "block";
	if (cd.navtype < 0)
		s.left = cd.offsetLeft + "px";
	else {
		var mcw = mc.offsetWidth;
		if (typeof mcw == "undefined")
			// Konqueror brain-dead techniques
			mcw = 50;
		s.left = (cd.offsetLeft + cd.offsetWidth - mcw) + "px";
	}
	s.top = (cd.offsetTop + cd.offsetHeight) + "px";
	cal.updateWCH(mc);
};


Zapatec.Calendar.showHistoryCombo = function() {
	var cal = Zapatec.Calendar._C, a, h, i, cd, hc, s, tmp, div;
	if (!cal)
		return false;
	hc = cal.histCombo;
	while (hc.firstChild)
		hc.removeChild(hc.lastChild);
	if (Zapatec.Calendar.prefs.history) {
		a = Zapatec.Calendar.prefs.history.split(/,/);
		i = 0;
		while (tmp = a[i++]) {
			tmp = tmp.split(/\//);
			h = Zapatec.Utils.createElement("div");
			h.className = Zapatec.is_ie ? "label-IEfix" : "label";
			h.histDate = new Date(parseInt(tmp[0], 10), parseInt(tmp[1], 10)-1, parseInt(tmp[2], 10),
					      tmp[3] ? parseInt(tmp[3], 10) : 0,
					      tmp[4] ? parseInt(tmp[4], 10) : 0);
			h.appendChild(window.document.createTextNode(h.histDate.print(cal.historyDateFormat)));
			hc.appendChild(h);
			if (h.histDate.dateEqualsTo(cal.date))
				Zapatec.Utils.addClass(h, "active");
		}
	}
	cd = cal.activeDiv;
	s = hc.style;
	s.display = "block";
	s.left = Math.floor(cd.offsetLeft + (cd.offsetWidth-hc.offsetWidth)/2) + "px";
	s.top = (cd.offsetTop + cd.offsetHeight) + "px";
	cal.updateWCH(hc);
};


Zapatec.Calendar.showYearsCombo = function (fwd) {
	var cal = Zapatec.Calendar._C;
	if (!cal) {
		return false;
	}
	var cd = cal.activeDiv;
	var yc = cal.yearsCombo;
	if (cal.hilitedYear) {
		Zapatec.Utils.removeClass(cal.hilitedYear, "hilite");
	}
	if (cal.activeYear) {
		Zapatec.Utils.removeClass(cal.activeYear, "active");
	}
	cal.activeYear = null;
	var Y = cal.date.getFullYear() + (fwd ? 1 : -1);
	var yr = yc.firstChild;
	var show = false;
	for (var i = 12; i > 0; --i) {
		if (Y >= cal.minYear && Y <= cal.maxYear) {
			yr.firstChild.data = Y;
			yr.year = Y;
			yr.style.display = "block";
			show = true;
		} else {
			yr.style.display = "none";
		}
		yr = yr.nextSibling;
		Y += fwd ? cal.yearStep : -cal.yearStep;
	}
	if (show) {
		var s = yc.style;
		s.display = "block";
		if (cd.navtype < 0)
			s.left = cd.offsetLeft + "px";
		else {
			var ycw = yc.offsetWidth;
			if (typeof ycw == "undefined")
				// Konqueror brain-dead techniques
				ycw = 50;
			s.left = (cd.offsetLeft + cd.offsetWidth - ycw) + "px";
		}
		s.top = (cd.offsetTop + cd.offsetHeight) + "px";
	}
	cal.updateWCH(yc);
};


Zapatec.Calendar.tableMouseUp = function(ev) {
	var cal = Zapatec.Calendar._C;
	if (!cal) {
		return false;
	}
	if (cal.timeout) {
		clearTimeout(cal.timeout);
	}
	var el = cal.activeDiv;
	if (!el) {
		return false;
	}
	var target = Zapatec.Utils.getTargetElement(ev);
	ev || (ev = window.event);
	Zapatec.Utils.removeClass(el, "active");
	if (target == el || target.parentNode == el) {
		Zapatec.Calendar.cellClick(el, ev);
	}
	var mon = Zapatec.Calendar.findMonth(target);
	var date = null;
	if (mon) {
		if (!mon.disabled) {
			date = new Date(cal.date);
			if (mon.month != date.getMonth()) {
				date.setMonth(mon.month);
				cal.setDate(date);
				cal.dateClicked = false;
				cal.callHandler();
			}
		}
	} else {
		var year = Zapatec.Calendar.findYear(target);
		if (year) {
			date = new Date(cal.date);
			if (year.year != date.getFullYear()) {
				date.setFullYear(year.year);
				cal.setDate(date);
				cal.dateClicked = false;
				cal.callHandler();
			}
		} else {
			var hist = Zapatec.Calendar.findHist(target);
			if (hist && !hist.histDate.dateEqualsTo(cal.date)) {
				//(date = new Date(cal.date)).setDateOnly(hist.histDate);
				date = new Date(hist.histDate);
				cal._init(cal.firstDayOfWeek, cal.date = date);
				cal.dateClicked = false;
				cal.callHandler();
				cal.updateHistory();
			}
		}
	}
	Zapatec.Utils.removeEvent(window.document, "mouseup", Zapatec.Calendar.tableMouseUp);
	Zapatec.Utils.removeEvent(window.document, "mouseover", Zapatec.Calendar.tableMouseOver);
	Zapatec.Utils.removeEvent(window.document, "mousemove", Zapatec.Calendar.tableMouseOver);
	cal._hideCombos();
	Zapatec.Calendar._C = null;
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.tableMouseOver = function (ev) {
	var cal = Zapatec.Calendar._C;
	if (!cal) {
		return;
	}
	var el = cal.activeDiv;
	var target = Zapatec.Utils.getTargetElement(ev);
	if (target == el || target.parentNode == el) {
		Zapatec.Utils.addClass(el, "hilite active");
		Zapatec.Utils.addClass(el.parentNode, "rowhilite");
	} else {
		if (typeof el.navtype == "undefined" ||
		    (el.navtype != 50 && ((el.navtype == 0 && !cal.histCombo) || Math.abs(el.navtype) > 2)))
			Zapatec.Utils.removeClass(el, "active");
		Zapatec.Utils.removeClass(el, "hilite");
		Zapatec.Utils.removeClass(el.parentNode, "rowhilite");
	}
	ev || (ev = window.event);
	if (el.navtype == 50 && target != el) {
		var pos = Zapatec.Utils.getAbsolutePos(el);
		var w = el.offsetWidth;
		var x = ev.clientX;
		var dx;
		var decrease = true;
		if (x > pos.x + w) {
			dx = x - pos.x - w;
			decrease = false;
		} else
			dx = pos.x - x;

		if (dx < 0) dx = 0;
		var range = el._range;
		var current = el._current;
		var count = Math.floor(dx / 10) % range.length;
		for (var i = range.length; --i >= 0;)
			if (range[i] == current)
				break;
		while (count-- > 0)
			if (decrease) {
				if (--i < 0)
					i = range.length - 1;
			} else if ( ++i >= range.length )
				i = 0;
		el.firstChild.data = range[i];

		cal.onUpdateTime();
	}
	var mon = Zapatec.Calendar.findMonth(target);
	if (mon) {
		if (!mon.disabled) {
			if (mon.month != cal.date.getMonth()) {
				if (cal.hilitedMonth) {
					Zapatec.Utils.removeClass(cal.hilitedMonth, "hilite");
				}
				Zapatec.Utils.addClass(mon, "hilite");
				cal.hilitedMonth = mon;
			} else if (cal.hilitedMonth) {
				Zapatec.Utils.removeClass(cal.hilitedMonth, "hilite");
			}
		}
	} else {
		if (cal.hilitedMonth) {
			Zapatec.Utils.removeClass(cal.hilitedMonth, "hilite");
		}
		var year = Zapatec.Calendar.findYear(target);
		if (year) {
			if (year.year != cal.date.getFullYear()) {
				if (cal.hilitedYear) {
					Zapatec.Utils.removeClass(cal.hilitedYear, "hilite");
				}
				Zapatec.Utils.addClass(year, "hilite");
				cal.hilitedYear = year;
			} else if (cal.hilitedYear) {
				Zapatec.Utils.removeClass(cal.hilitedYear, "hilite");
			}
		} else {
			if (cal.hilitedYear) {
				Zapatec.Utils.removeClass(cal.hilitedYear, "hilite");
			}
			var hist = Zapatec.Calendar.findHist(target);
			if (hist) {
				if (!hist.histDate.dateEqualsTo(cal.date)) {
					if (cal.hilitedHist) {
						Zapatec.Utils.removeClass(cal.hilitedHist, "hilite");
					}
					Zapatec.Utils.addClass(hist, "hilite");
					cal.hilitedHist = hist;
				} else if (cal.hilitedHist) {
					Zapatec.Utils.removeClass(cal.hilitedHist, "hilite");
				}
			} else if (cal.hilitedHist) {
				Zapatec.Utils.removeClass(cal.hilitedHist, "hilite");
			}
		}
	}
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.tableMouseDown = function (ev) {
	if (Zapatec.Utils.getTargetElement(ev) == Zapatec.Utils.getElement(ev)) {
		return Zapatec.Utils.stopEvent(ev);
	}
};

Zapatec.Calendar.calDragIt = function (ev) {
	ev || (ev = window.event);
	var cal = Zapatec.Calendar._C;
	if (!(cal && cal.dragging)) {
		return false;
	}
	var posX = ev.clientX + window.document.body.scrollLeft;
	var posY = ev.clientY + window.document.body.scrollTop;
	cal.hideShowCovered();
	var st = cal.element.style, L = posX - cal.xOffs, T = posY - cal.yOffs;
	st.left = L + "px";
	st.top = T + "px";
	Zapatec.Utils.setupWCH(cal.WCH, L, T);
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.calDragEnd = function (ev) {
	var cal = Zapatec.Calendar._C;
	if (!cal) {
		return false;
	}
	cal.dragging = false;
	Zapatec.Utils.removeEvent(window.document, "mousemove", Zapatec.Calendar.calDragIt);
	Zapatec.Utils.removeEvent(window.document, "mouseover", Zapatec.Calendar.calDragIt);
	Zapatec.Utils.removeEvent(window.document, "mouseup", Zapatec.Calendar.calDragEnd);
	Zapatec.Calendar.tableMouseUp(ev);
	cal.hideShowCovered();
};

Zapatec.Calendar.dayMouseDown = function(ev) {
	var el = Zapatec.Utils.getElement(ev);
	if (el.disabled) {
		return false;
	}
	var cal = el.calendar;
	cal.activeDiv = el;
	Zapatec.Calendar._C = cal;
	if (el.navtype != 300) {
		if (el.navtype == 50) {
			el._current = el.firstChild.data;
			Zapatec.Utils.addEvent(window.document, "mousemove", Zapatec.Calendar.tableMouseOver);
		} else
			Zapatec.Utils.addEvent(window.document, Zapatec.is_ie5 ? "mousemove" : "mouseover", Zapatec.Calendar.tableMouseOver);
		Zapatec.Utils.addClass(el, "hilite active");
		Zapatec.Utils.addEvent(window.document, "mouseup", Zapatec.Calendar.tableMouseUp);
	} else if (cal.isPopup) {
		cal._dragStart(ev);
	}
	if (el.navtype == -1 || el.navtype == 1) {
		if (cal.timeout) clearTimeout(cal.timeout);
		cal.timeout = setTimeout("Zapatec.Calendar.showMonthsCombo()", 250);
	} else if (el.navtype == -2 || el.navtype == 2) {
		if (cal.timeout) clearTimeout(cal.timeout);
		cal.timeout = setTimeout((el.navtype > 0) ? "Zapatec.Calendar.showYearsCombo(true)" : "Zapatec.Calendar.showYearsCombo(false)", 250);
	} else if (el.navtype == 0 && Zapatec.Calendar.prefs.history) {
		if (cal.timeout) clearTimeout(cal.timeout);
		cal.timeout = setTimeout("Zapatec.Calendar.showHistoryCombo()", 250);
	} else {
		cal.timeout = null;
	}
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.dayMouseDblClick = function(ev) {
	Zapatec.Calendar.cellClick(Zapatec.Utils.getElement(ev), ev || window.event);
	if (Zapatec.is_ie)
		window.document.selection.empty();
};


Zapatec.Calendar.dayMouseOver = function(ev) {
	var el = Zapatec.Utils.getElement(ev),
		caldate = el.caldate;
	if (caldate)
		caldate = new Date(caldate[0], caldate[1], caldate[2]);
	if (Zapatec.Utils.isRelated(el, ev) || Zapatec.Calendar._C || el.disabled) {
		return false;
	}
	if (el.ttip) {
		if (el.ttip.substr(0, 1) == "_") {
			el.ttip = caldate.print(el.calendar.ttDateFormat) + el.ttip.substr(1);
		}
		el.calendar.showHint(el.ttip);
	}
	if (el.navtype != 300) {
		Zapatec.Utils.addClass(el, "hilite");
		if (caldate) {
			Zapatec.Utils.addClass(el.parentNode, "rowhilite");
		}
	}
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.dayMouseOut = function(ev) {
	var el = Zapatec.Utils.getElement(ev);
	if (Zapatec.Utils.isRelated(el, ev) || Zapatec.Calendar._C || el.disabled)
		return false;
	Zapatec.Utils.removeClass(el, "hilite");
	if (el.caldate)
		Zapatec.Utils.removeClass(el.parentNode, "rowhilite");
	if (el.calendar)
		el.calendar.showHint(Zapatec.Calendar.i18n("SEL_DATE"));
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.cellClick = function(el, ev) {
	var cal = el.calendar;
	var closing = false;
	var newdate = false;
	var date = null;
	if (typeof el.navtype == "undefined") {
		if (cal.currentDateEl) {
			Zapatec.Utils.removeClass(cal.currentDateEl, "selected");
			Zapatec.Utils.addClass(el, "selected");
			closing = (cal.currentDateEl == el);
			if (!closing) {
				cal.currentDateEl = el;
			}
		}
		cal.date.setDateOnly(new Date(el.caldate[0], el.caldate[1], el.caldate[2]));
		date = cal.date;
		var other_month = !(cal.dateClicked = !el.otherMonth);
		if (!other_month && cal.multiple)
			cal._toggleMultipleDate(new Date(date));
		else
			newdate = true;
		// a date was clicked
		if (other_month)
			cal._init(cal.firstDayOfWeek, date);
	} else {
		if (el.navtype == 200) {
			Zapatec.Utils.removeClass(el, "hilite");
			cal.callCloseHandler();
			return;
		}
		date = new Date(cal.date);
		if (el.navtype == 0)
			date.setDateOnly(new Date()); // TODAY
		
		cal.dateClicked = false;
		var year = date.getFullYear();
		var mon = date.getMonth();
		function setMonth(m) {
			var day = date.getDate();
			var max = date.getMonthDays(m);
			if (day > max) {
				date.setDate(max);
			}
			date.setMonth(m);
		};
		switch (el.navtype) {
		    case 400:
			Zapatec.Utils.removeClass(el, "hilite");
			var text = Zapatec.Calendar.i18n("ABOUT");
			if (typeof text != "undefined") {
				text += cal.showsTime ? Zapatec.Calendar.i18n("ABOUT_TIME") : "";
			} else {
				// FIXME: this should be removed as soon as lang files get updated!
				text = "Help and about box text is not translated into this language.\n" +
					"If you know this language and you feel generous please update\n" +
					"the corresponding file in \"lang\" subdir to match calendar-en.js\n" +
					"and send it back to <support@zapatec.com> to get it into the distribution  ;-)\n\n" +
					"Thank you!\n" +
					"http://www.zapatec.com\n";
			}
			alert(text);
			return;
		    case -2:
			if (year > cal.minYear) {
				date.setFullYear(year - 1);
			}
			break;
		    case -1:
			if (mon > 0) {
				setMonth(mon - 1);
			} else if (year-- > cal.minYear) {
				date.setFullYear(year);
				setMonth(11);
			}
			break;
		    case 1:
			if (mon < 11) {
				setMonth(mon + 1);
			} else if (year < cal.maxYear) {
				date.setFullYear(year + 1);
				setMonth(0);
			}
			break;
		    case 2:
			if (year < cal.maxYear) {
				date.setFullYear(year + 1);
			}
			break;
		    case 100:
			cal.setFirstDayOfWeek(el.fdow);
			Zapatec.Calendar.prefs.fdow = cal.firstDayOfWeek;
			Zapatec.Calendar.savePrefs();
			if (cal.onFDOW)
				cal.onFDOW(cal.firstDayOfWeek);
			return;
		    case 50:
			var range = el._range;
			var current = el.firstChild.data;
			for (var i = range.length; --i >= 0;)
				if (range[i] == current)
					break;
			if (ev && ev.shiftKey) {
				if (--i < 0)
					i = range.length - 1;
			} else if ( ++i >= range.length )
				i = 0;
			el.firstChild.data = range[i];
			cal.onUpdateTime();
			return;
		    case 201: // timepart, UP
		    case 202: // timepart, DOWN
			var cel = el.timePart;
			var val = parseInt(cel.firstChild.data, 10);
			var range = cel._range;
			for (var i = range.length; --i >= 0;)
				if (val == range[i]) {
					val = i;
					break;
				}
			var step = cel._step;
			if (el.navtype == 201) {
				val = step*Math.floor(val/step);
				val += step;
				if (val >= range.length)
					val = 0;
			} else {
				val = step*Math.ceil(val/step);
				val -= step;
				if (val < 0)
					val = range.length-1;
			}
			cel.firstChild.data = range[val];
			cal.onUpdateTime();
			return;
		    case 0:
			// TODAY will bring us here
			if (cal.getDateStatus && cal.getDateStatus(date, date.getFullYear(), date.getMonth(), date.getDate())) {
				// remember, "date" was previously set to new
				// Date() if TODAY was clicked; thus, it
				// contains today date.
				return false;
			}
			break;
		}
		if (!date.equalsTo(cal.date)) {
			cal.setDate(date);
			newdate = true;
		}
	}
	if (newdate) {
		cal.callHandler();
	}
	if (closing) {
		Zapatec.Utils.removeClass(el, "hilite");
		cal.callCloseHandler();
	}
};

Zapatec.Calendar.prototype.create = function (_par) {
	var parent = null;
	if (! _par) {
		// default parent is the document body, in which case we create
		// a popup calendar.
		parent = window.document.getElementsByTagName("body")[0];
		this.isPopup = true;
		this.WCH = Zapatec.Utils.createWCH();
	} else {
		parent = _par;
		this.isPopup = false;
	}
	this.date = this.dateStr ? new Date(this.dateStr) : new Date();

	var table = Zapatec.Utils.createElement("table");
	this.table = table;
	table.cellSpacing = 0;
	table.cellPadding = 0;
	table.calendar = this;
	Zapatec.Utils.addEvent(table, "mousedown", Zapatec.Calendar.tableMouseDown);

	var div = Zapatec.Utils.createElement("div");
	this.element = div;
	div.className = "calendar";
	if (this.isPopup) {
		div.style.position = "absolute";
		div.style.display = "none";
	}
	div.appendChild(table);

	var thead = Zapatec.Utils.createElement("thead", table);
	var cell = null;
	var row = null;

	var cal = this;
	var hh = function (text, cs, navtype) {
		cell = Zapatec.Utils.createElement("td", row);
		cell.colSpan = cs;
		cell.className = "button";
		if (Math.abs(navtype) <= 2)
			cell.className += " nav";
		Zapatec.Calendar._add_evs(cell);
		cell.calendar = cal;
		cell.navtype = navtype;
		if (text.substr(0, 1) != "&") {
			cell.appendChild(document.createTextNode(text));
		}
		else {
			// FIXME: dirty hack for entities
			cell.innerHTML = text;
		}
		return cell;
	};

	row = Zapatec.Utils.createElement("tr", thead);
	var title_length = 6;
	this.isPopup && --title_length;
	this.weekNumbers && ++title_length;

	hh("?", 1, 400).ttip = Zapatec.Calendar.i18n("INFO");
	this.title = hh("", title_length, 300);
	this.title.className = "title";
	if (this.isPopup) {
		this.title.ttip = Zapatec.Calendar.i18n("DRAG_TO_MOVE");
		this.title.style.cursor = "move";
		hh("&#x00d7;", 1, 200).ttip = Zapatec.Calendar.i18n("CLOSE");
	}

	row = Zapatec.Utils.createElement("tr", thead);
	row.className = "headrow";

	this._nav_py = hh("&#x00ab;", 1, -2);
	this._nav_py.ttip = Zapatec.Calendar.i18n("PREV_YEAR");

	this._nav_pm = hh("&#x2039;", 1, -1);
	this._nav_pm.ttip = Zapatec.Calendar.i18n("PREV_MONTH");

	this._nav_now = hh(Zapatec.Calendar.i18n("TODAY"), this.weekNumbers ? 4 : 3, 0);
	this._nav_now.ttip = Zapatec.Calendar.i18n("GO_TODAY");

	this._nav_nm = hh("&#x203a;", 1, 1);
	this._nav_nm.ttip = Zapatec.Calendar.i18n("NEXT_MONTH");

	this._nav_ny = hh("&#x00bb;", 1, 2);
	this._nav_ny.ttip = Zapatec.Calendar.i18n("NEXT_YEAR");

	// day names
	row = Zapatec.Utils.createElement("tr", thead);
	row.className = "daynames";
	if (this.weekNumbers) {
		cell = Zapatec.Utils.createElement("td", row);
		cell.className = "name wn";
		cell.appendChild(window.document.createTextNode(Zapatec.Calendar.i18n("WK")));
		var cal_wk = Zapatec.Calendar.i18n("WK")
			if (cal_wk == null) {
				//if it's not defined in the language file, leave it blank
				cal_wk = "";
			}

	}
	for (var i = 7; i > 0; --i) {
		cell = Zapatec.Utils.createElement("td", row);
		cell.appendChild(window.document.createTextNode(""));
		if (!i) {
			cell.navtype = 100;
			cell.calendar = this;
			Zapatec.Calendar._add_evs(cell);
		}
	}
	this.firstdayname = row.childNodes[this.weekNumbers?1:0];
	this._displayWeekdays();

	var tbody = Zapatec.Utils.createElement("tbody", table);
	this.tbody = tbody;

	for (i = 6; i > 0; --i) {
		row = Zapatec.Utils.createElement("tr", tbody);
		if (this.weekNumbers) {
			cell = Zapatec.Utils.createElement("td", row);
			cell.appendChild(document.createTextNode(""));
		}
		for (var j = 7; j > 0; --j) {
			cell = Zapatec.Utils.createElement("td", row);
			cell.appendChild(document.createTextNode(""));
			cell.calendar = this;
			Zapatec.Calendar._add_evs(cell);
		}
	}

	var tfoot = Zapatec.Utils.createElement("tfoot", table);

	if (this.showsTime) {
		row = Zapatec.Utils.createElement("tr", tfoot);
		row.className = "time";

		cell = Zapatec.Utils.createElement("td", row);
		cell.className = "timetext";
		cell.colSpan = this.weekNumbers ? 2 : 1;
		cell.innerHTML = Zapatec.Calendar.i18n("TIME") || "&nbsp;";

		(function(){
			function makeTimePart(className, init, range_start, range_end) {
				var table, tbody, tr, tr2, part;
				if (range_end) {
					cell = Zapatec.Utils.createElement("td", row);
					cell.colSpan = 2;
					cell.className = "parent-" + className;
					table = Zapatec.Utils.createElement("table", cell);
					table.cellSpacing = table.cellPadding = 0;
					if (className == "hour")
						table.align = "right";
					table.className = "calendar-time-scroller";
					tbody = Zapatec.Utils.createElement("tbody", table);
					tr    = Zapatec.Utils.createElement("tr", tbody);
					tr2   = Zapatec.Utils.createElement("tr", tbody);
				} else
					tr = row;
				part = Zapatec.Utils.createElement("td", tr);
				part.className = className;
				part.appendChild(window.document.createTextNode(init));
				part.calendar = cal;
				part.ttip = Zapatec.Calendar.i18n("TIME_PART");
				part.navtype = 50;
				part._range = [];
				if (!range_end)
					part._range = range_start;
				else {
					part.rowSpan = 2;
					for (var i = range_start; i <= range_end; ++i) {
						var txt;
						if (i < 10 && range_end >= 10) txt = '0' + i;
						else txt = '' + i;
						part._range[part._range.length] = txt;
					}
					var up = Zapatec.Utils.createElement("td", tr);
					up.className = "up";
					up.navtype = 201;
					up.calendar = cal;
					up.timePart = part;
					if (Zapatec.is_khtml)
						up.innerHTML = "&nbsp;";
					Zapatec.Calendar._add_evs(up);

					var down = Zapatec.Utils.createElement("td", tr2);
					down.className = "down";
					down.navtype = 202;
					down.calendar = cal;
					down.timePart = part;
					if (Zapatec.is_khtml)
						down.innerHTML = "&nbsp;";
					Zapatec.Calendar._add_evs(down);
				}
				Zapatec.Calendar._add_evs(part);
				return part;
			};
			var hrs = cal.date.getHours();
			var mins = cal.date.getMinutes();
			var t12 = !cal.time24;
			var pm = (hrs > 12);
			if (t12 && pm) hrs -= 12;
			var H = makeTimePart("hour", hrs, t12 ? 1 : 0, t12 ? 12 : 23);
			H._step = 1;
			cell = Zapatec.Utils.createElement("td", row);
			cell.innerHTML = ":";
			cell.className = "colon";
			var M = makeTimePart("minute", mins, 0, 59);
			M._step = 5; // FIXME: make this part configurable
			var AP = null;
			if (t12) {
				AP = makeTimePart("ampm", pm ? "pm" : "am", ["am", "pm"]);
				AP.className += " button";
			} else
				Zapatec.Utils.createElement("td", row).innerHTML = "&nbsp;";

			cal.onSetTime = function() {
				var hrs = this.date.getHours();
				var mins = this.date.getMinutes();
				var pm = (hrs > 12);
				if (pm && t12) hrs -= 12;
				H.firstChild.data = (hrs < 10) ? ("0" + hrs) : hrs;
				M.firstChild.data = (mins < 10) ? ("0" + mins) : mins;
				if (t12)
					AP.firstChild.data = pm ? "pm" : "am";
			};

			cal.onUpdateTime = function() {
				var date = this.date;
				var h = parseInt(H.firstChild.data, 10);
				if (t12) {
					if (/pm/i.test(AP.firstChild.data) && h < 12)
						h += 12;
					else if (/am/i.test(AP.firstChild.data) && h == 12)
						h = 0;
				}
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				date.setHours(h);
				date.setMinutes(parseInt(M.firstChild.data, 10));
				date.setFullYear(y);
				date.setMonth(m);
				date.setDate(d);
				this.dateClicked = false;
				this.callHandler();
			};
		})();
	} else {
		this.onSetTime = this.onUpdateTime = function() {};
	}

	row = Zapatec.Utils.createElement("tr", tfoot);
	row.className = "footrow";

	cell = hh(Zapatec.Calendar.i18n("SEL_DATE"), this.weekNumbers ? 8 : 7, 300);
	cell.className = "ttip";
	if (this.isPopup) {
		cell.ttip = Zapatec.Calendar.i18n("DRAG_TO_MOVE");
		cell.style.cursor = "move";
	}
	this.tooltips = cell;

	div = this.monthsCombo = Zapatec.Utils.createElement("div", this.element);
	div.className = "combo";
	for (i = 0; i < 12; ++i) {
		var mn = Zapatec.Utils.createElement("div");
		mn.className = Zapatec.is_ie ? "label-IEfix" : "label";
		mn.month = i;
		mn.appendChild(window.document.createTextNode(Zapatec.Calendar.i18n(i, "smn")));
		div.appendChild(mn);
	}

	div = this.yearsCombo = Zapatec.Utils.createElement("div", this.element);
	div.className = "combo";
	for (i = 12; i > 0; --i) {
		var yr = Zapatec.Utils.createElement("div");
		yr.className = Zapatec.is_ie ? "label-IEfix" : "label";
		yr.appendChild(window.document.createTextNode(""));
		div.appendChild(yr);
	}

	div = this.histCombo = Zapatec.Utils.createElement("div", this.element);
	div.className = "combo history";

	this._init(this.firstDayOfWeek, this.date);
	parent.appendChild(this.element);
};

Zapatec.Calendar._keyEvent = function(ev) {
	if (!window.calendar) {
		return false;
	}
	(Zapatec.is_ie) && (ev = window.event);
	var cal = window.calendar;
	var act = (Zapatec.is_ie || ev.type == "keypress");
	var K = ev.keyCode;
	if (ev.ctrlKey) {
		switch (K) {
		    case 37: // KEY left
			act && Zapatec.Calendar.cellClick(cal._nav_pm);
			break;
		    case 38: // KEY up
			act && Zapatec.Calendar.cellClick(cal._nav_py);
			break;
		    case 39: // KEY right
			act && Zapatec.Calendar.cellClick(cal._nav_nm);
			break;
		    case 40: // KEY down
			act && Zapatec.Calendar.cellClick(cal._nav_ny);
			break;
		    default:
			return false;
		}
	} else switch (K) {
	    case 32: // KEY space (now)
		Zapatec.Calendar.cellClick(cal._nav_now);
		break;
	    case 27: // KEY esc
		act && cal.callCloseHandler();
		break;
	    case 37: // KEY left
	    case 38: // KEY up
	    case 39: // KEY right
	    case 40: // KEY down
		if (act) {
			var prev, pos, x, y, ne, el;
			prev = (K == 37) || (K == 38);
			function setVars() {
				el = cal.currentDateEl;
				pos = el.pos;
				y = pos[0];
				x = pos[1];
				ne = cal.ar_days[y][x];
			};setVars();
			function prevMonth() {
				//Zapatec.Calendar.cellClick(cal._nav_pm);
				var date = new Date(cal.date.getFullYear(), cal.date.getMonth()-1, 1);
				date.setDate(date.getMonthDays());
				cal.setDate(date);
			};
			function nextMonth() {
				//Zapatec.Calendar.cellClick(cal._nav_nm);
				var date = new Date(cal.date.getFullYear(), cal.date.getMonth()+1, 1);
				cal.setDate(date);
			};
			while (1) {
				switch (K) {
				    case 37: // KEY left
					if (--x >= 0)
						ne = cal.ar_days[y][x];
					else {
						x = 6;
						K = 38;
						continue;
					}
					break;
				    case 38: // KEY up
					if (--y >= 0)
						ne = cal.ar_days[y][x];
					else {
						prevMonth();
						setVars();
					}
					break;
				    case 39: // KEY right
					if (++x < 7)
						ne = cal.ar_days[y][x];
					else {
						x = 0;
						K = 40;
						continue;
					}
					break;
				    case 40: // KEY down
					if (++y < cal.ar_days.length)
						ne = cal.ar_days[y][x];
					else {
						nextMonth();
						setVars();
					}
					break;
				}
				break;
			}
			if (ne) {
				if (!ne.otherMonth) {
					Zapatec.Utils.removeClass(el, "selected");
					Zapatec.Utils.addClass(ne, "selected");
					cal.date.setDateOnly(new Date(ne.caldate[0], ne.caldate[1], ne.caldate[2]));
					cal.currentDateEl = ne;
				} else {
					if (!ne.disabled)
						Zapatec.Calendar.cellClick(ne);
					else if (prev)
						prevMonth();
					else
						nextMonth();
				}
			}
			cal.callHandler();
		}
		break;
	    case 13: // KEY enter
		if (act) {
			cal.callHandler();
			cal.hide();
		}
		break;
	    default:
		return false;
	}
	return Zapatec.Utils.stopEvent(ev);
};


Zapatec.Calendar.prototype._init = function (firstDayOfWeek, date) {
	var
		today = new Date(),
		TD = today.getDate(),
		TY = today.getFullYear(),
		TM = today.getMonth();
	//this.table.style.visibility = "hidden";
	var year = date.getFullYear();
	var month = date.getMonth();
	if (year < this.minYear)
		date.setFullYear(year = this.minYear);
	else if (year > this.maxYear)
		date.setFullYear(year = this.maxYear);
	if (year == this.minYear && month < this.minMonth)
		date.setMonth(month = this.minMonth);
	else if (year == this.maxYear && month > this.maxMonth)
		date.setMonth(month = this.maxMonth);
	this.firstDayOfWeek = firstDayOfWeek;
	this.date = date;
	(this.date = new Date(this.date)).setDateOnly(date);
	var mday = date.getDate();
	var no_days = date.getMonthDays();

	// calendar voodoo for computing the first day that would actually be
	// displayed in the calendar, even if it's from the previous month.
	// WARNING: this is magic. ;-)
	date.setDate(1);
	var day1 = (date.getDay() - this.firstDayOfWeek) % 7;
	if (day1 < 0)
		day1 += 7;
	date.setDate(-day1);
	date.setDate(date.getDate() + 1);

	var row = this.tbody.firstChild;
	var MN = Zapatec.Calendar.i18n(month, "smn");
	var ar_days = this.ar_days = [];
	//var weekend = Zapatec.Calendar.i18n("WEEKEND"); //Commented By Yogesh for changing the Weekend from Sat & Sun to Sun
	var weekend = "0"; // Added By Yogesh to set the Weekend to Sun
	var dates = this.multiple ? (this.datesCells = {}) : null;
	var DATETXT = this.getDateText;
	for (var i = 7; --i > 0; row = row.nextSibling) {
		var cell = row.firstChild;
		if (this.weekNumbers) {
			cell.className = "day wn";
			cell.innerHTML = date.getWeekNumber();
			cell = cell.nextSibling;
		}
		var ar_days_y = ar_days[ar_days.length] = [];
		row.className = "daysrow";
		var hasdays = false, iday;
		for (; cell && (iday = date.getDate()); date.setDate(iday+1), cell = cell.nextSibling) {
			cell.pos = [6-i, ar_days_y.length];
			ar_days_y[ar_days_y.length] = cell;
			var
				wday = date.getDay(),
				dmonth = date.getMonth(),
				dyear = date.getFullYear();
			cell.className = "day";
			var current_month = !(cell.otherMonth = !(dmonth == month));
			if (!current_month) {
				if (this.showsOtherMonths)
					cell.className += " othermonth";
				else {
					cell.className = "emptycell";
					cell.innerHTML = "&nbsp;";
					cell.disabled = true;
					continue;
				}
			} else
				hasdays = true;
			cell.disabled = false;
			cell.innerHTML = DATETXT ? DATETXT(date, year, month, iday) : iday;
			dates && (dates[date.print("%Y%m%d")] = cell);
			if (this.getDateStatus) {
				var status = this.getDateStatus(date, year, month, iday);
				if (this.getDateToolTip) {
					var toolTip = this.getDateToolTip(date, year, month, iday);
					if (toolTip)
						cell.title = toolTip;
				}
				if (status === true) {
					cell.className += " disabled";
					cell.disabled = true;
				} else {
					if (/disabled/i.test(status))
						cell.disabled = true;
					cell.className += " " + status;
				}
			}
			if (!cell.disabled) {
				cell.caldate = [dyear, dmonth, iday];
				cell.ttip = "_";
				if (!this.multiple && current_month && iday == mday && this.hiliteToday) {
					cell.className += " selected";
					this.currentDateEl = cell;
				}
				if (dyear == TY && dmonth == TM && iday == TD) {
					cell.className += " today";
					cell.ttip += Zapatec.Calendar.i18n("PART_TODAY");
				}
				if ((weekend != null) && (weekend.indexOf(wday.toString()) != -1)) {
					cell.className += cell.otherMonth ? " oweekend" : " weekend";
				}
			}
		}
		if (!(hasdays || this.showsOtherMonths))
			row.className = "emptyrow";
	}
	//this.title.firstChild.data = Zapatec.Calendar.i18n(month, "mn") + ", " + year;
	this.title.innerHTML = Zapatec.Calendar.i18n(month, "mn") + ", " + year;
	this.onSetTime();
	//this.table.style.visibility = "visible";
	this._initMultipleDates();
	this.updateWCH();
	// PROFILE
	// this.showHint("Generated in " + ((new Date()) - today) + " ms");
};


Zapatec.Calendar.prototype._initMultipleDates = function() {
	if (this.multiple) {
		for (var i in this.multiple) {
			var cell = this.datesCells[i];
			var d = this.multiple[i];
			if (!d)
				continue;
			if (cell)
				cell.className += " selected";
		}
	}
};


Zapatec.Calendar.prototype._toggleMultipleDate = function(date) {
	if (this.multiple) {
		var ds = date.print("%Y%m%d");
		var cell = this.datesCells[ds];
		if (cell) {
			var d = this.multiple[ds];
			if (!d) {
				Zapatec.Utils.addClass(cell, "selected");
				this.multiple[ds] = date;
			} else {
				Zapatec.Utils.removeClass(cell, "selected");
				delete this.multiple[ds];
			}
		}
	}
};


Zapatec.Calendar.prototype.setDateToolTipHandler = function (unaryFunction) {
	this.getDateToolTip = unaryFunction;
};

Zapatec.Calendar.prototype.setDate = function (date) {
	// workaround for some bugs in our parseDate code
	if (!date)
		date = new Date();
	if (!date.equalsTo(this.date)) {
		var year = date.getFullYear(), m = date.getMonth();
		if (year == this.minYear && m < this.minMonth)
			this.showHint("<div class='error'>" + Zapatec.Calendar.i18n("E_RANGE") + " »»»</div>");
		else if (year == this.maxYear && m > this.maxMonth)
			this.showHint("<div class='error'>««« " + Zapatec.Calendar.i18n("E_RANGE") + "</div>");
		this._init(this.firstDayOfWeek, date);
	}
};


Zapatec.Calendar.prototype.showHint = function(text) {
	this.tooltips.innerHTML = text;
};


Zapatec.Calendar.prototype.reinit = function() {
	this._init(this.firstDayOfWeek, this.date);
};


Zapatec.Calendar.prototype.refresh = function() {
	var p = this.isPopup ? null : this.element.parentNode;
	var x = parseInt(this.element.style.left);
	var y = parseInt(this.element.style.top);
	this.destroy();
	this.dateStr = this.date;
	this.create(p);
	if (this.isPopup)
		this.showAt(x, y);
	else
		this.show();
};


Zapatec.Calendar.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
	if (this.firstDayOfWeek != firstDayOfWeek) {
		this._init(firstDayOfWeek, this.date);
		this._displayWeekdays();
	}
};


Zapatec.Calendar.prototype.setDateStatusHandler = Zapatec.Calendar.prototype.setDisabledHandler = function (unaryFunction) {
	this.getDateStatus = unaryFunction;
};


Zapatec.Calendar.prototype.setRange = function (A, Z) {
	var m,
		a = Math.min(A, Z),
		z = Math.max(A, Z);
	this.minYear = m = Math.floor(a);
	this.minMonth = (m == a) ? 0 : Math.ceil((a-m)*100-1);
	this.maxYear = m = Math.floor(z);
	this.maxMonth = (m == z) ? 11 : Math.ceil((z-m)*100-1);
};


Zapatec.Calendar.prototype.callHandler = function () {
	if (this.onSelected) {
		this.onSelected(this, this.date.print(this.dateFormat));
	}
};


Zapatec.Calendar.prototype.updateHistory = function () {
	var a, i, d, tmp, s, str = "", len = Zapatec.Calendar.prefs.hsize - 1;
	if (Zapatec.Calendar.prefs.history) {
		a = Zapatec.Calendar.prefs.history.split(/,/);
		i = 0;
		while (i < len && (tmp = a[i++])) {
			s = tmp.split(/\//);
			d = new Date(parseInt(s[0], 10), parseInt(s[1], 10)-1, parseInt(s[2], 10),
				     parseInt(s[3], 10), parseInt(s[4], 10));
			if (!d.dateEqualsTo(this.date))
				str += "," + tmp;
		}
	}
	Zapatec.Calendar.prefs.history = this.date.print("%Y/%m/%d/%H/%M") + str;
	Zapatec.Calendar.savePrefs();
};


Zapatec.Calendar.prototype.callCloseHandler = function () {
	if (this.dateClicked) {
		this.updateHistory();
	}
	if (this.onClose) {
		this.onClose(this);
	}
	this.hideShowCovered();
};

/** Removes the calendar object from the DOM tree and destroys it. */
Zapatec.Calendar.prototype.destroy = function () {
	this.hide();		// this also removes keyboard events :-\
	Zapatec.Utils.destroy(this.element);
	Zapatec.Utils.destroy(this.WCH);
	Zapatec.Calendar._C = null;
	window.calendar = null;
};


Zapatec.Calendar.prototype.reparent = function (new_parent) {
	var el = this.element;
	el.parentNode.removeChild(el);
	new_parent.appendChild(el);
};


Zapatec.Calendar._checkCalendar = function(ev) {
	if (!window.calendar) {
		return false;
	}
	var el = Zapatec.is_ie ? Zapatec.Utils.getElement(ev) : Zapatec.Utils.getTargetElement(ev);
	for (; el != null && el != calendar.element; el = el.parentNode);
	if (el == null) {
		// calls closeHandler which should hide the calendar.
		window.calendar.callCloseHandler();
		return Zapatec.Utils.stopEvent(ev);
	}
};


Zapatec.Calendar.prototype.updateWCH = function(other_el) {
	Zapatec.Utils.setupWCH_el(this.WCH, this.element, other_el);
};


Zapatec.Calendar.prototype.show = function () {
	var rows = this.table.getElementsByTagName("tr");
	for (var i = rows.length; i > 0;) {
		var row = rows[--i];
		Zapatec.Utils.removeClass(row, "rowhilite");
		var cells = row.getElementsByTagName("td");
		for (var j = cells.length; j > 0;) {
			var cell = cells[--j];
			Zapatec.Utils.removeClass(cell, "hilite");
			Zapatec.Utils.removeClass(cell, "active");
		}
	}
	this.element.style.display = "block";
	this.hidden = false;
	if (this.isPopup) {
		this.updateWCH();
		window.calendar = this;
		if (!this.noGrab) {
			Zapatec.Utils.addEvent(window.document, "keydown", Zapatec.Calendar._keyEvent);
			Zapatec.Utils.addEvent(window.document, "keypress", Zapatec.Calendar._keyEvent);
			Zapatec.Utils.addEvent(window.document, "mousedown", Zapatec.Calendar._checkCalendar);
		}
	}
	this.hideShowCovered();
};


Zapatec.Calendar.prototype.hide = function () {
	if (this.isPopup) {
		Zapatec.Utils.removeEvent(window.document, "keydown", Zapatec.Calendar._keyEvent);
		Zapatec.Utils.removeEvent(window.document, "keypress", Zapatec.Calendar._keyEvent);
		Zapatec.Utils.removeEvent(window.document, "mousedown", Zapatec.Calendar._checkCalendar);
	}
	this.element.style.display = "none";
	Zapatec.Utils.hideWCH(this.WCH);
	this.hidden = true;
	this.hideShowCovered();
};


Zapatec.Calendar.prototype.showAt = function (x, y) {
	var s = this.element.style;
	s.left = x + "px";
	s.top = y + "px";
	this.show();
};


Zapatec.Calendar.prototype.showAtElement = function (el, opts) {
	var self = this;
	var p = Zapatec.Utils.getAbsolutePos(el);
	if (!opts || typeof opts != "string") {
		this.showAt(p.x, p.y + el.offsetHeight);
		return true;
	}
	this.element.style.display = "block";
	var w = self.element.offsetWidth;
	var h = self.element.offsetHeight;
	self.element.style.display = "none";
	var valign = opts.substr(0, 1);
	var halign = "l";
	if (opts.length > 1) {
		halign = opts.substr(1, 1);
	}
	// vertical alignment
	switch (valign) {
	    case "T": p.y -= h; break;
	    case "B": p.y += el.offsetHeight; break;
	    case "C": p.y += (el.offsetHeight - h) / 2; break;
	    case "t": p.y += el.offsetHeight - h; break;
	    case "b": break; // already there
	}
	// horizontal alignment
	switch (halign) {
	    case "L": p.x -= w; break;
	    case "R": p.x += el.offsetWidth; break;
	    case "C": p.x += (el.offsetWidth - w) / 2; break;
	    case "l": p.x += el.offsetWidth - w; break;
	    case "r": break; // already there
	}
	p.width = w;
	p.height = h + 40;
	self.monthsCombo.style.display = "none";
	Zapatec.Utils.fixBoxPosition(p);
	self.showAt(p.x, p.y);
};


Zapatec.Calendar.prototype.setDateFormat = function (str) {
	this.dateFormat = str;
};


Zapatec.Calendar.prototype.setTtDateFormat = function (str) {
	this.ttDateFormat = str;
};


Zapatec.Calendar.prototype.parseDate = function (str, fmt) {
	// Konqueror
	if (!str)
		return this.setDate(this.date);
	if (!fmt)
		fmt = this.dateFormat;
	var date = Date.parseDate(str, fmt);
	return this.setDate(date);
};


Zapatec.Calendar.prototype.hideShowCovered = function () {
	if (!Zapatec.is_ie5)
		return;
	var self = this;
	function getVisib(obj){
		var value = obj.style.visibility;
		if (!value) {
			if (window.document.defaultView && typeof (window.document.defaultView.getComputedStyle) == "function") { // Gecko, W3C
				if (!Zapatec.is_khtml)
					value = window.document.defaultView.
						getComputedStyle(obj, "").getPropertyValue("visibility");
				else
					value = '';
			} else if (obj.currentStyle) { // IE
				value = obj.currentStyle.visibility;
			} else
				value = '';
		}
		return value;
	};

	var tags = ["applet", "iframe", "select"];
	var el = self.element;

	var p = Zapatec.Utils.getAbsolutePos(el);
	var EX1 = p.x;
	var EX2 = el.offsetWidth + EX1;
	var EY1 = p.y;
	var EY2 = el.offsetHeight + EY1;

	for (var k = tags.length; k > 0; ) {
		var ar = window.document.getElementsByTagName(tags[--k]);
		var cc = null;

		for (var i = ar.length; i > 0;) {
			cc = ar[--i];

			p = Zapatec.Utils.getAbsolutePos(cc);
			var CX1 = p.x;
			var CX2 = cc.offsetWidth + CX1;
			var CY1 = p.y;
			var CY2 = cc.offsetHeight + CY1;

			if (self.hidden || (CX1 > EX2) || (CX2 < EX1) || (CY1 > EY2) || (CY2 < EY1)) {
				if (!cc.__msh_save_visibility) {
					cc.__msh_save_visibility = getVisib(cc);
				}
				cc.style.visibility = cc.__msh_save_visibility;
			} else {
				if (!cc.__msh_save_visibility) {
					cc.__msh_save_visibility = getVisib(cc);
				}
				cc.style.visibility = "hidden";
			}
		}
	}
};


Zapatec.Calendar.prototype._displayWeekdays = function () {
	var fdow = this.firstDayOfWeek;
	var cell = this.firstdayname;
	//var weekend = Zapatec.Calendar.i18n("WEEKEND"); //Commented By Yogesh for changing the Weekend from Sat & Sun to Sun
	var weekend = "0"; // Added By Yogesh to set the Weekend to Sun	
	for (var i = 0; i < 7; ++i) {
		cell.className = "day name";
		var realday = (i + fdow) % 7;
		if (i) {
			if (Zapatec.Calendar.i18n("DAY_FIRST") != null) {
				cell.ttip = Zapatec.Calendar.i18n("DAY_FIRST").replace("%s", Zapatec.Calendar.i18n(realday, "dn"));
			}
			cell.navtype = 100;
			cell.calendar = this;
			cell.fdow = realday;
			Zapatec.Calendar._add_evs(cell);
		}
		if ((weekend != null) && (weekend.indexOf(realday.toString()) != -1)) {
						Zapatec.Utils.addClass(cell, "weekend");
		}
		cell.innerHTML = Zapatec.Calendar.i18n((i + fdow) % 7, "sdn");
		cell = cell.nextSibling;
	}
};

/** \internal Hides all combo boxes that might be displayed. */
Zapatec.Calendar.prototype._hideCombos = function () {
	this.monthsCombo.style.display = "none";
	this.yearsCombo.style.display = "none";
	this.histCombo.style.display = "none";
	this.updateWCH();
};

/** \internal Starts dragging the element. */
Zapatec.Calendar.prototype._dragStart = function (ev) {
	ev || (ev = window.event);
	if (this.dragging) {
		return;
	}
	this.dragging = true;
	var posX = ev.clientX + window.document.body.scrollLeft;
	var posY = ev.clientY + window.document.body.scrollTop;
	var st = this.element.style;
	this.xOffs = posX - parseInt(st.left);
	this.yOffs = posY - parseInt(st.top);
	Zapatec.Utils.addEvent(window.document, "mousemove", Zapatec.Calendar.calDragIt);
	Zapatec.Utils.addEvent(window.document, "mouseover", Zapatec.Calendar.calDragIt);
	Zapatec.Utils.addEvent(window.document, "mouseup", Zapatec.Calendar.calDragEnd);
};



Date._MD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; /**< Number of days in each month */

Date.SECOND = 1000;		/**< One second has 1000 milliseconds. */
Date.MINUTE = 60 * Date.SECOND;	/**< One minute has 60 seconds. */
Date.HOUR   = 60 * Date.MINUTE;	/**< One hour has 60 minutes. */
Date.DAY    = 24 * Date.HOUR;	/**< One day has 24 hours. */
Date.WEEK   =  7 * Date.DAY;	/**< One week has 7 days. */

Date.prototype.getMonthDays = function(month) {
	var year = this.getFullYear();
	if (typeof month == "undefined") {
		month = this.getMonth();
	}
	if (((0 == (year%4)) && ( (0 != (year%100)) || (0 == (year%400)))) && month == 1) {
		return 29;
	} else {
		return Date._MD[month];
	}
};

/** Returns the number of the current day in the current year. */
Date.prototype.getDayOfYear = function() {
	var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
	var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
	var time = now - then;
	return Math.floor(time / Date.DAY);
};

/** Returns the number of the week in year, as defined in ISO 8601. */
Date.prototype.getWeekNumber = function() {
	var d = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
	var DoW = d.getDay();
	d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
	var ms = d.valueOf(); // GMT
	d.setMonth(0);
	d.setDate(4); // Thu in Week 1
	return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
};

/** Checks dates equality.  Checks time too. */
Date.prototype.equalsTo = function(date) {
	return ((this.getFullYear() == date.getFullYear()) &&
		(this.getMonth() == date.getMonth()) &&
		(this.getDate() == date.getDate()) &&
		(this.getHours() == date.getHours()) &&
		(this.getMinutes() == date.getMinutes()));
};

/** Checks dates equality.  Ignores time. */
Date.prototype.dateEqualsTo = function(date) {
	return ((this.getFullYear() == date.getFullYear()) &&
		(this.getMonth() == date.getMonth()) &&
		(this.getDate() == date.getDate()));
};

/** Set only the year, month, date parts (keep existing time) */
Date.prototype.setDateOnly = function(date) {
	var tmp = new Date(date);
	this.setDate(1);
	this.setFullYear(tmp.getFullYear());
	this.setMonth(tmp.getMonth());
	this.setDate(tmp.getDate());
};

Date.prototype.print = function (str) {
	var m = this.getMonth();
	var d = this.getDate();
	var y = this.getFullYear();
	var wn = this.getWeekNumber();
	var w = this.getDay();
	var s = {};
	var hr = this.getHours();
	var pm = (hr >= 12);
	var ir = (pm) ? (hr - 12) : hr;
	var dy = this.getDayOfYear();
	if (ir == 0)
		ir = 12;
	var min = this.getMinutes();
	var sec = this.getSeconds();
	s["%a"] = Zapatec.Calendar.i18n(w, "sdn"); // abbreviated weekday name [FIXME: I18N]
	s["%A"] = Zapatec.Calendar.i18n(w, "dn"); // full weekday name
	s["%b"] = Zapatec.Calendar.i18n(m, "smn"); // abbreviated month name [FIXME: I18N]
	s["%B"] = Zapatec.Calendar.i18n(m, "mn"); // full month name
	// FIXME: %c : preferred date and time representation for the current locale
	s["%C"] = 1 + Math.floor(y / 100); // the century number
	s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
	s["%e"] = d; // the day of the month (range 1 to 31)
	// FIXME: %D : american date style: %m/%d/%y
	// FIXME: %E, %F, %G, %g, %h (man strftime)
	s["%H"] = (hr < 10) ? ("0" + hr) : hr; // hour, range 00 to 23 (24h format)
	s["%I"] = (ir < 10) ? ("0" + ir) : ir; // hour, range 01 to 12 (12h format)
	s["%j"] = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy; // day of the year (range 001 to 366)
	s["%k"] = hr;		// hour, range 0 to 23 (24h format)
	s["%l"] = ir;		// hour, range 1 to 12 (12h format)
	s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
	s["%M"] = (min < 10) ? ("0" + min) : min; // minute, range 00 to 59
	s["%n"] = "\n";		// a newline character
	s["%p"] = pm ? "PM" : "AM";
	s["%P"] = pm ? "pm" : "am";
	// FIXME: %r : the time in am/pm notation %I:%M:%S %p
	// FIXME: %R : the time in 24-hour notation %H:%M
	s["%s"] = Math.floor(this.getTime() / 1000);
	s["%S"] = (sec < 10) ? ("0" + sec) : sec; // seconds, range 00 to 59
	s["%t"] = "\t";		// a tab character
	// FIXME: %T : the time in 24-hour notation (%H:%M:%S)
	s["%U"] = s["%W"] = s["%V"] = (wn < 10) ? ("0" + wn) : wn;
	s["%u"] = w + 1;	// the day of the week (range 1 to 7, 1 = MON)
	s["%w"] = w;		// the day of the week (range 0 to 6, 0 = SUN)
	// FIXME: %x : preferred date representation for the current locale without the time
	// FIXME: %X : preferred time representation for the current locale without the date
	s["%y"] = ('' + y).substr(2, 2); // year without the century (range 00 to 99)
	s["%Y"] = y;		// year with the century
	s["%%"] = "%";		// a literal '%' character

	var re = /%./g;
	if (!Zapatec.is_ie5 && !Zapatec.is_khtml && !Zapatec.is_mac_ie)
		return str.replace(re, function (par) { return s[par] || par; });

	var a = str.match(re);
	for (var i = 0; i < a.length; i++) {
		var tmp = s[a[i]];
		if (tmp) {
			re = new RegExp(a[i], 'g');
			str = str.replace(re, tmp);
		}
	}

	return str;
};


Date.parseDate = function (str, fmt) {
	// Konqueror
	if (!str)
		return new Date();
	var y = 0;
	var m = -1;
	var d = 0;
	var a = str.split(/\W+/);
	var b = fmt.match(/%./g);
	var i = 0, j = 0;
	var hr = 0;
	var min = 0;
	for (i = 0; i < a.length; ++i) {
		if (!a[i])
			continue;
		switch (b[i]) {
		    case "%d":
		    case "%e":
			d = parseInt(a[i], 10);
			break;

		    case "%m":
			m = parseInt(a[i], 10) - 1;
			break;

		    case "%Y":
		    case "%y":
			y = parseInt(a[i], 10);
			(y < 100) && (y += (y > 29) ? 1900 : 2000);
			break;

		    case "%b":
		    case "%B":
			for (j = 0; j < 12; ++j)
				if (Zapatec.Calendar.i18n(j, "mn").substr(0, a[i].length).toLowerCase() == a[i].toLowerCase()) {
					m = j;
					break;
				}
			break;

		    case "%H":
		    case "%I":
		    case "%k":
		    case "%l":
			hr = parseInt(a[i], 10);
			break;

		    case "%P":
		    case "%p":
			if (/pm/i.test(a[i]) && hr < 12)
				hr += 12;
			break;

		    case "%M":
			min = parseInt(a[i], 10);
			break;
		}
	}
	if (y != 0 && m != -1 && d != 0)
		return new Date(y, m, d, hr, min, 0);
	y = 0; m = -1; d = 0;
	for (i = 0; i < a.length; ++i) {
		if (a[i].search(/[a-zA-Z]+/) != -1) {
			var t = -1;
			for (j = 0; j < 12; ++j)
				if (Zapatec.Calendar.i18n(j, "mn").substr(0, a[i].length).toLowerCase() == a[i].toLowerCase()) {
					t = j;
					break;
				}
			if (t != -1) {
				if (m != -1)
					d = m+1;
				m = t;
			}
		} else if (parseInt(a[i], 10) <= 12 && m == -1) {
			m = a[i]-1;
		} else if (parseInt(a[i], 10) > 31 && y == 0) {
			y = parseInt(a[i], 10);
			(y < 100) && (y += (y > 29) ? 1900 : 2000);
		} else if (d == 0) {
			d = a[i];
		}
	}
	if (y == 0) {
		var today = new Date();
		y = today.getFullYear();
	}
	if (m != -1 && d != 0)
		return new Date(y, m, d, hr, min, 0);
	return null;
};

Date.prototype.__msh_oldSetFullYear = Date.prototype.setFullYear; /**< save a reference to the original setFullYear function */


Date.prototype.setFullYear = function(y) {
	var d = new Date(this);
	d.__msh_oldSetFullYear(y);
	if (d.getMonth() != this.getMonth())
		this.setDate(28);
	this.__msh_oldSetFullYear(y);
};

//@}

// END: DATE OBJECT PATCHES

window.calendar = null;		/**< global object that remembers the calendar */

// initialize the preferences object;
// embed it in a try/catch so we don't have any surprises
try {
	Zapatec.Calendar.loadPrefs();
} catch(e) {};