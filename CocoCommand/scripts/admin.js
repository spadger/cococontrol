/// <reference path="_references.js" />

var CocoCommandVM = function() {
    this.status = ko.observable();

    this.status.subscribe(function (val) {
        commandHub.server.updateStatus(val);
    });
};

ko.bindingHandlers.slider = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).slider().bind('slide', function (ev) {
            var modelValue = valueAccessor();
            ko.expressionRewriting.writeValueToProperty(modelValue, allBindingsAccessor, 'checked', ev.value, true);
        });
    },
};

$(function () {
    
    window.commandHub = $.connection.cocoCommandHub;
    var vm = new CocoCommandVM();
        
    $.connection.hub.start().done(function () {
        ko.applyBindings(vm);
    });
});
