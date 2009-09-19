Ext.namespace('Ext.ux.Raphael.Chart.Column');

Ext.ux.Raphael.Chart.Column = Ext.extend(Ext.ux.Raphael.Chart, {
    x: null,
    y: null,
    draw: function(p) {
        Ext.ux.Raphael.Chart.Column.superclass.draw.apply(this, arguments);
        if(this.series.length) return;
        
        var width = this.getEl().getWidth();
        var height = 230;
        var data = [];
        var labels = [null];
        var max = 0;
            
        this.store.each(function(record) {
            data.push(+record.get(this.yField));
            labels.push(record.get(this.xField));
            if(record.get(this.yField) > max) max = record.get(this.yField);
        }, this);
        labels.push(' ');
        
        var exp = Math.pow(10,(("" + Math.floor(max)).length-1));
        max = Math.ceil(max/exp) * exp;
        
        var yLabels = [];
        for(var i = 0; i <= this.ySteps; i++) {
            yLabels.push(Ext.util.Format.number(max/this.ySteps*i, '0,0'));
        }
        
        var yAxis = p.g.axis(0,height-30,height-30,0, max, this.ySteps, 1, yLabels);
        var xOffset = yAxis.all.getBBox().width;
        yAxis.all.translate(xOffset, 0);
        var chart = p.g.barchart(xOffset + 10, 0, width - xOffset - 13, height-20, [data], {vgutter: 10, gutter: '70%'});
        //chart.bars.attr({scale: [1, 0.01,0,height - 10]}).animate({scale: [1,1,0,height - 10]}, 2000);
        p.g.axis(xOffset,height-30,width - xOffset,0, 0, labels.length-1, 0, labels, 't');
        
        var that = this;
        var i = data.length-1;
        chart.each(function() {
            console.log(this);
            Ext.QuickTips.register({
                target: this.node,
                title: that.getStore().getAt(i).get(that.xField),
                text: that.tipRenderer(that, that.getStore().getAt(i--), i, {xField: this.xField, yField: this.yField}),
            });
        });
        
    }
});

Ext.reg('rcolumnchart', Ext.ux.Raphael.Chart.Column);