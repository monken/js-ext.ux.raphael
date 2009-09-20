Ext.namespace('Ext.ux.Raphael');


Raphael.el.highlight = function (times) {
    times = times || 2;
    var fs = [this.attrs.fill, this.attrs.stroke];
    this.fs = this.fs || [fs[0], fs[1]];
    fs[0] = Raphael.rgb2hsb(Raphael.getRGB(fs[0]).hex);
    fs[1] = Raphael.rgb2hsb(Raphael.getRGB(fs[1]).hex);
    fs[0].b = Math.min(fs[0].b * times, 1);
    fs[1].b = Math.min(fs[1].b * times, 1);
    return {fill: "hsb(" + [fs[0].h, fs[0].s, fs[0].b] + ")", stroke: "hsb(" + [fs[1].h, fs[1].s, fs[1].b] + ")"};
};


Ext.ux.Raphael = Ext.extend(Ext.Container, {
    defaults: {
        xtype: 'rlayer'
    }
});

Ext.reg('raphael', Ext.ux.Raphael);