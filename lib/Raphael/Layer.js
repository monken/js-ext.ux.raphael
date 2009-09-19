Ext.namespace('Ext.ux.Raphael.Layer');

Ext.ux.Raphael.Layer = Ext.extend(Ext.Component, {
    draw: function() {},
    afterRender: function(ct, position) {
        Ext.ux.Raphael.Layer.superclass.afterRender.apply(this, arguments);
        this.paper = Raphael(this.el.id, this.el.getWidth(), this.el.getHeight());
        this.draw(this.paper);
    }
});

Ext.reg('rlayer', Ext.ux.Raphael.Layer);