/// <reference path="raphael.js" />
/// <reference path="_references.js" />

var CocoCommandVM = function() {
    var self = this;
    var paper;
    var $window = $(window);
    
    commandHub.client.newStatus = function (status) {
        self.status(status);
    };

    this.status = ko.observable(currentThreatLevel);

    this.statusText = ko.computed(function () {
        switch (self.status()) {
            case 0:
                return 'CoCo Calm';
            case 1:
                return 'CoCo Concern';
            case 2:
                return 'CoCo Consternation';
            case 3:
                return 'CoCo Crisis';
            case 4:
                return 'CoCo Catastrophe';
            default:
                return 'Coco Confusion :(';
        }
    }, this);
    
    this.style = ko.computed(function () {
        switch (self.status()) {
            case 0:
                return 'Calm';
            case 1:
                return 'Concern';
            case 2:
                return 'Consternation';
            case 3:
                return 'Crisis';
            case 4:
                return 'Catastrophe';
            default:
                return '';
        }
    }, this);

    this.status.subscribe(function() {
        self.redraw();
    });
        
    this.redraw = function () {
        
        var val = self.status();
        if (paper) {
            paper.remove();
        }

        var width = $window.width();
        var height = $window.height();

        var canvassHeight, canvassWidth;
        if (width > 2 * height) {
            canvassWidth = height * 2;
            canvassHeight = height;
        } else {
            canvassWidth = width;
            canvassHeight = width / 2;
        }
        canvassHeight -= 100;

        var beginX = width / 2 - canvassWidth / 2;

        paper = Raphael(beginX + 40, 60, canvassWidth - 20, canvassHeight + 50);

        segment(paper, 0, canvassHeight, "#00FF00", val==0);
        segment(paper, 1, canvassHeight, "#0000FF", val==1);
        segment(paper, 2, canvassHeight, "#FFFF00", val==2);
        segment(paper, 3, canvassHeight, "#FF8800", val==3);
        segment(paper, 4, canvassHeight, "#FF0000", val==4);
    };

    self.redraw();
};

$(function () {
    
    window.commandHub = $.connection.cocoCommandHub;
    var vm = new CocoCommandVM();
        
    $.connection.hub.start().done(function () {
        ko.applyBindings(vm);
        commandHub.server.getStatus();
        
        $(window).resize(vm.redraw);
    });
});


var segment = function (ctx, segmentNumber, r, colour, active) {
    
    var a1 = 180 + segmentNumber * 36;
    var a2 = a1 + 36;
    var x = r+50, y = r+50;
    
    if (active) {
        r += 50;
    }
    
    var flag = (a2 - a1) > 180,
    a1 = (a1 % 360) * Math.PI / 180;
    a2 = (a2 % 360) * Math.PI / 180;

    var border = active ? "black" : "white";
    ctx.path([["M", x, y], ["l", r * Math.cos(a1), r * Math.sin(a1)], ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)], ["z"]])
          .attr({ "type": "path", "stroke": border, "fill": colour, "stroke-width":3 });
};


$(function() {
    setInterval(function() {
        $.get('/ping');
    }, 1000 * 60 * 10);
});
