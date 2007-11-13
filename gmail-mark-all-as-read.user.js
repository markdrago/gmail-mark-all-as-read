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
  GM_log("consider the button created");
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
