Ext.namespace('Ext.ux.Raphael.Chart.Column');

Ext.ux.Raphael.Chart.Column = Ext.extend(Ext.ux.Raphael.Chart, {
    x: null,
    y: null,
    barOffset: 0,
    type: 'column',
    stackedOffset: [],
    draw: function() {
        var p = this.paper;
        Ext.ux.Raphael.Chart.Column.superclass.draw.apply(this, arguments);
        if(this.series.length) return;

        var width = this.ownerCt.getEl().getWidth();
        var height = this.ownerCt.getEl().getHeight();
        var data = [];
        var labels = [null];
        var max = 0;
        
        var j = 0;
        this.store.each(function(record) {
            var value = +record.get(this.yField);
            value += this.stackedOffset[j++] || 0;
            data.push(value);
            labels.push(record.get(this.xField));
            if(record.get(this.yField) > max) max = record.get(this.yField);
        }, this);
        labels.push(' ');

        if(!this.yAxis.max) {
            this.yAxis.max = this.maxValueCeil();
        }
        
        var yLabels = [];
        for(var i = 0; i <= this.ySteps; i++) {
            yLabels.push(Ext.util.Format.number(this.yAxis.max/this.ySteps*i, '0,0'));
        }
        
        var yAxis = p.g.axis(0,height-40,height-50,0, this.yAxis.max, this.ySteps, 1, yLabels);
        var xOffset = yAxis.all.getBBox().width;
        if(this.yAxis.render)
            yAxis.all.translate(xOffset, 0);
        else
            yAxis.hide();
        
        var xAxisWidth = Math.floor((width - xOffset) /data.length)*data.length;
        var barDistance = xAxisWidth / (data.length+1);
        var graphWidth = xAxisWidth;
        
        this.bars = p.set();
        var color = Raphael.getColor();
        var barWidth = barDistance * 0.5;
        for(var i = 0; i < data.length; i++) {
            var barHeight = data[i] / this.yAxis.max * (height-50);
            //var bar = p.rect(this.barOffset * barWidth / 3 + xOffset + barDistance * (i+1) - barWidth/2,height - 40 - barHeight, barWidth,barHeight);
            var bar = p.g.finger(this.barOffset * barWidth / 3 + xOffset + barDistance * (i+1),height - 40 + (Ext.isIE ? 1 : 0), barWidth,barHeight,1,"square");
			bar.attr({fill: color, 'stroke-width': 0});
            
            bar.mouseover(function(){
                this.animate(this.highlight(),200).mouseout(function(){
                    this.animate({fill: color, 'stroke-width': 0},200)});
            });
            
            var record = this.getStore().getAt(i);
            Ext.QuickTips.register(Ext.apply({
                     target: bar.node },
                     this.tipRenderer(this, record, i, {xField: this.xField, yField: this.yField}))
                 );
            this.bars.push(bar);
        }
        
        if(this.xAxis.render) 
          p.g.axis(xOffset,height-40,xAxisWidth,0, 0, labels.length-1, 0, labels);
        
        
    },
	maxValue: function() {
        var max = 0;
        this.getStore().each(function(r) {
            if(r.get(this.yField) > max) max = r.get(this.yField);
        }, this);
        return max;
    },
	sum: function() {
		var sum = 0;
        this.getStore().each(function(r) {
            sum += r.get(this.yField);
        }, this);
        return sum;
	},
    maxValueCeil: function() {
		if(this.series.length) {
			var columnsSorted = this.series.slice();
			columnsSorted.sort(function(a,b){return b.maxValue() - a.maxValue()});
			return columnsSorted[0].maxValueCeil();
		}
        return this.ceil(this.maxValue());
    },
	getStore: function() { return this.store; },
	setStore: function(store) { return this.store = store; }
});

Ext.reg('rcolumnchart', Ext.ux.Raphael.Chart.Column);