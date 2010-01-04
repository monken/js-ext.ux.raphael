Ext.namespace('Ext.ux.Raphael.Chart.Series');


Ext.ux.Raphael.Chart.Series = Ext.extend(Ext.Component, {
	xField: '',
    yField: '',
	charts: [],
	store: null,
	chartTypes: {column: 'Column', 
				 stackedcolumn: 'StackedColumn', 
				 percentagecolumn: 'PercentageColumn', 
				 pie: 'Pie'},
	getClass: function(class) {
		return this.chartTypes[class];
	},
	initComponent : function(config){
        Ext.ux.Raphael.Chart.Series.superclass.initComponent.call(this);
		if(!this.initialConfig instanceof Array) {
			this.initialConfig = [this.initialConfig];
		}
		for(var i = 0; i < this.initialConfig.length; i++) {
			var chart = this.initialConfig[i];
            Ext.applyIf(chart, {
                xField: this.xField,
                paper: p,
                type: this.type
            });
            this.charts[i] = Ext.ux.Raphael.Chart[this.getClass(chart.type)](chart);
		}
		console.log(this.charts);
    },
	getStore: function() {
		return this.store;
	},
	setStore: function(store) {
		this.store = store;
	}

});