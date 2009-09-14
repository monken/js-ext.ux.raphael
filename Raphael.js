Ext.namespace('Ext.ux.Raphael');

Ext.ux.Raphael = Ext.extend(Ext.BoxComponent, {
    autoHeight: true,
    initComponent: function() {
        Ext.BoxComponent.superclass.initComponent.apply(this, arguments);

    },
    listeners: {
        render: function(ct, position) {
            console.log(this.getBox());
            var paper = Raphael(this.el.dom, this.el.getWidth(), this.el.getHeight());
            // Creates circle at x = 50, y = 40, with radius 10
            var circle = paper.circle(50, 40, 10);
            // Sets the fill attribute of the circle to red (#f00)
            circle.attr("fill", "#f00");
            // Sets the stroke attribute of the circle to white (#fff)
            circle.attr("stroke", "#fff");
            circle.animate({
                cx: 20,
                r: 20
            },
            2000);
        }
    }

});

Ext.reg('raphael', Ext.ux.Raphael);