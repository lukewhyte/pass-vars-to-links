(function ($) {
  'use strict';

  var pluginName = 'passVarsToLinks',
    defaults = {
      addOnly: [],
      modify: {}
    };

  function PassVars (element, options) {
    this.$links = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  PassVars.prototype = {
    appendQuery: function () {
      var that = this;
      if (this.query.substring(0,1) !== '&') this.query = '&' + this.query;
      this.$links.each(function () {
        if (!$(this).is('a')) return;
        var href = $(this).attr('href');
        if (href.indexOf('?') !== -1) $(this).attr('href', href + that.query);
        else $(this).attr('href', href + '?' + that.query);
      });
    },

    splitQuery: function (callback) {
      var vars = this.query.split('&'), i = 0;
      for (; i < vars.length; i++) {
        callback(vars[i]); 
      } 
    },

    modifyQuery: function () {
      var modObj = this.options.modify;
      if (!$.isEmptyObject(modObj)) {
        var result = '';
        this.splitQuery(function (variable) {
          var pair = variable.split('=');
          if (modObj[pair[0]]) {
            result += '&' + pair[0] + '=' + modObj[pair[0]];
          } else result += '&' + variable;
        });
        this.query = result;
      }
      return this.query;
    },

    trimQuery: function () {
      var addOnly = this.options.addOnly;
      if ($.isArray(addOnly) && addOnly.length > 0) {
        var result = '';
        this.splitQuery(function (variable) {
          for (var j = 0; j < addOnly.length; j++) {
            if (variable.split('=')[0] == addOnly[j]) result += '&' + variable;
          }
        });
        this.query = result;
      }
      return this.query;
    },

    getQuery: function () {
      return window.location.search.substring(1);
    },

    init: function () {
      this.query = this.getQuery();
      this.trimQuery();
      this.modifyQuery();
      this.appendQuery();
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new PassVars(this, options));
      }
    });
  };
}(jQuery));