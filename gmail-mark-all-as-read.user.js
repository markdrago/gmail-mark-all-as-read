// Copyright (c) 2007, Mark Drago
// Released under the GPL license:
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Gmail Mark All As Read
// @namespace     http://www.markdrago.com/
// @description   Adds a Mark All As Read button to the Gmail Threadlist
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

var gmail;

function view_changed () {
  GM_log("view changed");
  new_view = gmail.getActiveViewType();
  if (new_view == 'tl') {
    add_button();
  }
}

function add_button() {
  GM_log("consider the button created");
  var elem = gmail.getActiveViewElement();

  //we take a few steps down in the DOM to find the right element
  for (var i = 0; i < 7; i++) {
    elem = elem.firstChild;
  }

  //see if the button has already been created
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (elem.childNodes[i].id == 'maar') {
      return;
    }
  }

  var button = window.document["createElement"]('button');   
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'BuNwUe');
  button.setAttribute('id', 'maar');
  button.innerHTML = 'Mark All As Read';
  button.addEventListener('click', button_pressed, false);

  elem.appendChild(button);
}

function button_pressed(e) {
  //find 'select all' node
  var elem = gmail.getActiveViewElement();
  elem = elem.firstChild;
  elem = elem.firstChild;
  elem = elem.childNodes[1];
  elem = elem.firstChild;
  elem = elem.firstChild;
  elem = elem.childNodes[1];
  elem = elem.firstChild;  

  //create 'click' event and dispatch
  var event1 = document.createEvent("MouseEvents");
  event1.initMouseEvent("mousedown", true, true, window,
			1, 0, 0, 0, 0, false, false, false,
			false, 0, null);
  elem.dispatchEvent(event1);
}

function main_func(gmail_obj) {
  GM_log("got in to main_func");
  gmail = gmail_obj;
  gmail.registerViewChangeCallback(view_changed);
  view_changed();
}

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    GM_log("in event listener");
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      GM_log("in gmonkey loader");
      main_func(gmail);
    });
  }
}, true);
