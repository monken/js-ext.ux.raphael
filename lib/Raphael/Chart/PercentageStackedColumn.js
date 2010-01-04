Ext.namespace('Ext.ux.Raphael.PercentageStackedColumn');

Ext.ux.Raphael.Chart.PercentageStackedColumn = Ext.extend(Ext.ux.Raphael.Chart.StackedColumn, {
    type: 'percentagestackedcolumn',
    draw: function() {
        var p = this.paper;
		if(!this.series.length) return;
		for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
			Ext.applyIf(series, {
                percentage: 1
            });
        }
        Ext.ux.Raphael.Chart.PercentageStackedColumn.superclass.draw.apply(this, arguments);
        
    }
});

Ext.reg('rpercentagestackedcolumnchart', Ext.ux.Raphael.Chart.PercentageStackedColumn);