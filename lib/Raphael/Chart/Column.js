Ext.namespace('Ext.ux.Raphael.Chart.Column');

Ext.ux.Raphael.Chart.Column = Ext.extend(Ext.ux.Raphael.Chart, {
    x: null,
    y: null,
    offset: 0,
    type: 'column',
    draw: function() {
        var p = this.paper;
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


        var scale;
        if(!this.yAxis.max) {
            this.yAxis.max = this.maxValueCeil();
        }
        scale = max/this.yAxis.max * this.yAxis.max/this.maxValueCeil();
        
        var yLabels = [];
        for(var i = 0; i <= this.ySteps; i++) {
            yLabels.push(Ext.util.Format.number(this.yAxis.max/this.ySteps*i, '0,0'));
        }
        
        
        var xOffset;
        
        var yAxis = p.g.axis(0,height-40,height-50,0, this.yAxis.max, this.ySteps, 1, yLabels);
        xOffset = yAxis.all.getBBox().width;
        if(this.yAxis.render)
            yAxis.all.translate(xOffset, 0);
        else
            yAxis.hide();
        
        var xAxisWidth = Math.floor((width - xOffset) /data.length)*data.length;
        var barDistance = xAxisWidth / (data.length+1);
        var graphWidth = xAxisWidth;
        
        var chart = p.set();
        var color = Raphael.getColor();
        var barWidth = 20;
        for(var i = 0; i < data.length; i++) {
            var barHeight = data[i] / this.yAxis.max * (height-30) * scale;
            var bar = p.rect(this.offset + xOffset + barDistance * (i+1) - barWidth/2,height - 40 - barHeight, 20,barHeight);
            bar.attr({fill: color, stroke: '0px'});
            
            var record = this.getStore().getAt(i);
            Ext.QuickTips.register({
                     target: bar.node,
                     title: record.get(this.xField),
                     text: this.tipRenderer(this, record, i, {xField: this.xField, yField: this.yField})
                 });
            chart.push(bar);
        }
        
        if(this.xAxis.render) 
          p.g.axis(xOffset,height-40,xAxisWidth,0, 0, labels.length-1, 0, labels);
        
        
    }
});

Ext.reg('rcolumnchart', Ext.ux.Raphael.Chart.Column);