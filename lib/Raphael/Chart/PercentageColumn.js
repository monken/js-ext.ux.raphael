Ext.namespace('Ext.ux.Raphael.PercentageColumn');

Ext.ux.Raphael.Chart.PercentageColumn = Ext.extend(Ext.ux.Raphael.Chart.StackedColumn, {
    type: 'percentagecolumn',
    process: function() {
        Ext.ux.Raphael.Chart.PercentageColumn.superclass.process.apply(this, arguments);	
		var stack = [];
		var size = this.series.length;
		for(var i = 0; i < size; i++) {
			var chart = this.series[i];

			var k = 0;
			chart.getStore().each(function(r){
				if(!stack[k]) stack[k] = 0;
				stack[k++] += r.get(chart.yField);
			});
		}
		for(var i = 0; i < this.series.length; i++) {
			var chart = this.series[i];
			var clone = new Ext.data.Store({
				recordType: chart.getStore().recordType
			});
			var records = [];
			chart.getStore().each(function(r){
				records.push(r.copy());
			});

			clone.add(records);
			var k = 0;
			clone.each(function(r){
				r.set(chart.yField, (+r.get(chart.yField))/stack[k]*100000);
				chart.stackedOffset[k] *= 100000/stack[k];
				k++;
			});
			chart.setStore(clone);
		}
		
        
    },
	maxValueCeil: function() { return 100000; },
		tipRenderer: function(chart, record, index, series){	
		var value = record.get(chart.yField);
		return { title: chart.displayName, text: Ext.util.Format.number(value / 1000, '0.0') + ' %'};
	}
});

Ext.reg('rpercentagecolumnchart', Ext.ux.Raphael.Chart.PercentageColumn);