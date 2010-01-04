Ext.namespace('Ext.ux.Raphael.StackedColumn');

Ext.ux.Raphael.Chart.StackedColumn = Ext.extend(Ext.ux.Raphael.Chart, {
    type: 'stackedcolumn',
    process: function() {
        var p = this.paper;
		if(!this.series.length) return;
		var stackedOffset = [];
		for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
			Ext.applyIf(series, {
                store: this.getStore(),
                xField: this.xField,
				tipRenderer : this.tipRenderer,
                paper: p,
                type: 'column',
				yAxis: { render: (i == 0 ? true : false) }
            });
			var j = 0;
			if(i == 0)
			  series.store.each(function(r){
				stackedOffset[j++] = 0;});
			series.stackedOffset = stackedOffset.slice();
			j = 0;
			series.store.each(function(r){
				stackedOffset[j++] += r.get(series.yField);
			});
        }
        Ext.ux.Raphael.Chart.StackedColumn.superclass.process.apply(this, arguments);
        
    },
	maxValueCeil: function() {
		var stack = [];
		for(var i = 0; i < this.series.length; i++) {
			var chart = this.series[i];
			var k = 0;
			chart.getStore().each(function(r){
				if(!stack[k]) stack[k] = 0;
				stack[k++] += r.get(chart.yField);
			});
		}
		var max = 0;
		for(var i = 0; i < stack.length; i++)
			if(stack[i] > max)
				max = stack[i];
		return this.ceil(max || this.maxValue());
    },
	getBarOffset: function(i) { return null },
	tipRenderer: function(chart, record, index, series){
		var value = record.get(chart.yField);
		return { title: chart.displayName, text: Ext.util.Format.number(value, '0,00') };
	}
    
});

Ext.reg('rstackedcolumnchart', Ext.ux.Raphael.Chart.StackedColumn);