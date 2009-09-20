Ext.namespace('Ext.ux.Raphael.Chart.Column');

Ext.ux.Raphael.Chart.Column = Ext.extend(Ext.ux.Raphael.Chart, {
    x: null,
    y: null,
    type: 'column',
    draw: function(p) {
        Ext.ux.Raphael.Chart.Column.superclass.draw.apply(this, arguments);
        if(this.series.length) return;
        
        var width = this.ownerCt.getEl().getWidth();
        var height = this.ownerCt.getEl().getHeight();
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
        var maxCeil = Math.ceil(max/exp) * exp;
        var scale = max/maxCeil;
        
        var yLabels = [];
        for(var i = 0; i <= this.ySteps; i++) {
            yLabels.push(Ext.util.Format.number(maxCeil/this.ySteps*i, '0,0'));
        }
        
        var yAxis = p.g.axis(0,height-40,height-50,0, maxCeil, this.ySteps, 1, yLabels);
        var xOffset = yAxis.all.getBBox().width;
        yAxis.all.translate(xOffset, 0);
        var chart = p.g.barchart(xOffset + 10, 10, width - xOffset - 13, height-50, [data], {vgutter: 00, gutter: '70%'});
        chart.bars.attr({scale: [1, scale,0,height - 30 ]});
        p.g.axis(xOffset,height-40,width - xOffset,0, 0, labels.length-1, 0, labels, 't');
        
        var that = this;
        var i = data.length-1;
        chart.each(function() {
            console.log(this);
            this.attr({ scale: [1,this.bar.value/maxCeil,0,height - 40] });
            Ext.QuickTips.register({
                target: this.node,
                title: that.getStore().getAt(i).get(that.xField),
                text: that.tipRenderer(that, that.getStore().getAt(i--), i, {xField: this.xField, yField: this.yField}),
            });
        });
        
    }
});

Ext.reg('rcolumnchart', Ext.ux.Raphael.Chart.Column);