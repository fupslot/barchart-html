;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'FunnelViz'
      , defaults;

    defaults = {
        compare:   true,
        brakedown: false,
        events:    [],
        labels:    [],
        sections:  [],
        barColorName: 'blue'
    };

    function init () {
        var sections;

        if (this.el.tagName !== 'UL') throw Error('FunnelViz. Error: The root element must be an UL element');

        // Hide element
        this.$el
            .addClass('fun-container')
            .css('display', 'none');

        sections = this.options.sections;

        // Convert settings to a convenient structure
        this._events = transformData2FunnelVizFormat(this.options);

        // console.log(this.options); // !!!
        // console.log(this._events); // !!! 
        
        // Draw an event
        this._events.forEach($.proxy(drawColumn, this));
        
        // Show element
        this.$el.fadeIn();
    }

    function drawColumn (model, index) {
        var events
          , columnEl;

        events = model.events;

        columnEl = $('<li>')
            .addClass('fun-column')
            .append($('<div>')
                .addClass('fun-event-name')
                .attr('title', model.name)
                .text(model.name));

        if (this.options.brakedown) {
            // Draw a brakedown
            drawBrakedown.call(this, columnEl, model, index);
        }
        else {
            // Draw a bar
            drawBar.call(this, columnEl, model, index);
        }

        // Draw panels
        var panels = ['actual'];
        if (this.options.compare) panels.push('compare');
        
        panels.forEach($.proxy(function (val) {
            drawPanelValue.call(this, columnEl, model, index, val === 'compare');
        }, this));

        this.$el.append(columnEl);
    }

    function drawBrakedown (el, model, columnIndex) {
        var barEl;
        barEl = $('<ul>').addClass('fun-bar');
        model.sections.forEach($.proxy(function (section) {
            var el = $('<li>');
            drawBar.call(this, el, section, columnIndex);
            el.appendTo(barEl);
        }), this);

        el.append(barEl);
    }

    function drawBar(el, model, columnIndex) {
        var isBrakeDown
          , colorName
          , labelOrientation;

        isBrakeDown = this.options.brakedown;
        colorName   = this.options.barColorName;
        labelOrientation = isBrakeDown ? 'verticaly' : 'horizontaly';

        $('<div>')
            .addClass('fun-bar-value')
            .addClass(colorName + 'ish')
            .append($('<div>')
                .addClass('fun-bar-value-top'))
            .append($('<div>')
                .addClass('fun-bar-value-bottom')
                .addClass('fun-label')
                .addClass(labelOrientation)
                .attr('data-value', model.value)
                .css('top', '0%'))
            .appendTo(el);
    }

    function drawPanelValue (el, model, columnIndex, isCompare) {
        var self
          , overallClazz
          , isOverall;

        self = this;
        isOverall = columnIndex == 0;
        
        overallClazz = isOverall ? 'overall' : '';

        $('<div>')
            .addClass('fun-panel-value')
            .addClass(overallClazz)
            .append(function () {
                var formatted
                  , value
                  , formatedValue
                  , clazz;

                value = !isCompare ? model.conversion : model.compare;
                formatted = numeral(value).format('0.0');

                if (isCompare) $(this).addClass('compare');
                
                if (!isOverall) {
                    clazz = value < 0 ? 'minus' : 'plus';
                    formatted = $('<span>').addClass(clazz).text(formatted);
                }

                return formatted
            })
            .append(function () {
                var labels, label;
                labels = self.options.labels || [];
                label  = !isOverall ? labels[columnIndex - 1] : '';
                return label || '';
            })
            .appendTo(el);
    }

    function transformData2FunnelVizFormat (options) {
        /*
        {
            name:       'Event Name',
            value:      0, // Total
            conversion: 0, // Total
            compare:    0, // Total
            sections: [
                {
                    value: 0,
                }
            ]
        }
        */
        
        var getTotalValue = function (index, timeFrame) {
            var value = 0;
            options.sections.forEach(function (section) {
                value += section[timeFrame][index];
            });
            return value;
        }

        var getCompareValue = function (curr, prev) {
            var a,b;

            a = getTotalValue(curr, 'compare');
            b = getTotalValue(prev, 'compare');

            return (b / a) * 100;
        };

        var getConversionValue = function (curr, prev) {
            var a,b;
            a = getTotalValue(curr, 'actual');
            b = getTotalValue(prev, 'actual');
            return (b / a) * 100;
        };

        var eventTotals = function (eventName, index) {
            var a,b,c, curr, prev;
            
            a = getTotalValue(index, 'actual');
            
            curr = index;
            // First column always have an overall values
            prev = index === 0 ? options.events.length -1 : index -1;
            
            c = getConversionValue(curr, prev);
            b = c - getCompareValue(curr, prev);

            return {
                name:       eventName,
                value:      a,
                compare:    b,
                conversion: c,
            };
        };

        var eventSections = function (index) {
            var sections = [];

            options.sections.forEach(function (s) {
                var section  = {};
                section.value = s.actual[index];
                sections.push(section);
            });

            return sections;
        };
        
        var transformedEvent = function (eventName, index) {
            var obj = eventTotals(eventName, index);
            obj.sections = eventSections(index);
            return obj;
        };

        var events;
        events = options.events.map(transformedEvent);
        return events;
    }

    function Plugin (el, options) {
        // Save the element reference, both as a jQuery
        // reference and a normal reference
        this.el  = el;
        this.$el = $(el);

        this.options   = options;
        this._defaults = defaults;
        this._name     = pluginName;
        
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            init.apply(this);
        },
    };

    $.fn[pluginName] = function (method) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('plugin_'+pluginName)
                , options = $.extend({}, defaults, $.isPlainObject(method) && method);

            if (!data) $this.data('plugin_'+pluginName, (data = new Plugin(this, options)));
            if (typeof method == 'string') data[method].apply(data, Array.prototype.slice.call(args, 1));
        });
    };
})(jQuery, window, document);