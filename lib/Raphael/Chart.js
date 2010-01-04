Ext.namespace('Ext.ux.Raphael.Chart');


Ext.ux.Raphael.Chart = Ext.extend(Ext.ux.Raphael.Layer, {
    xField: '',
    yField: '',
    x2Field: '',
    y2Field: '',
    ySteps: 8,
    xSteps: 10,
    y2Steps: 10,
    x2Steps: 10,
    series : [],
    yAxis: null,
    xAxis: null,
	chartTypes: {column: 'Column', 
				 stackedcolumn: 'StackedColumn', 
				 percentagecolumn: 'PercentageColumn', 
				 pie: 'Pie'},
	getClass: function(myClass) {
		return this.chartTypes[myClass];
	},
    initComponent : function() {
        Ext.ux.Raphael.Chart.superclass.initComponent.call(this);
		Ext.apply(this, {xAxis: {render:true}, yAxis : {render:true}});
    },
    tipRenderer : function(chart, record, index, series){
        var value = record.get(chart.yField);
        return { title: chart.displayName || record.get(chart.xField), 
				 text: Ext.util.Format.number(value, '0,00') };
    },
	process: function() {
        var p = this.paper;
        p.g.txtattr = {font: "11px Arial, sans-serif"};
        if(!this.series.length) return;
        Raphael.getColor.reset();
        Raphael.getColor();
        
        //var columns = [];
        //var columnsSorted = [];
        for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
            Ext.applyIf(series, {
                store: this.getStore(),
                xField: this.xField,
                paper: p,
                type: this.type
            });
			if(!series.type)
				series.type = this.type || this.xtype;
			series.type = series.type.replace(/^r/g, '')
			series.type = series.type.replace(/chart$/g, '');
            this.series[i] = new Ext.ux.Raphael.Chart[this.getClass(series.type)](series);
        }
		var columns = this.series;
		var max = this.maxValueCeil();
        
        for(var i = 0; i < this.series.length; i++) {
            this.ownerCt.add(this.series[i]);
            this.series[i].yAxis.max = max;
			if(i != 0) {
                this.series[i].yAxis.render = false;
                this.series[i].xAxis.render = false;
            }
            
            this.series[i].barOffset = this.getBarOffset(i);
            
            
        }
	},
    draw: function() {
		var series = this.series;
		series.reverse();
        for(var i = 0; i < series.length; i++) {
            series[i].draw(this.paper);
        }
    },
	getBarOffset: function(i) { return -(-1+2/(this.series.length-1)*i) },
    getStore: function() { return this.store; },
	
    ceil: function(max) {
		var string = "" + Math.floor(max);
		var first = string.substr(0,1);
        var exp = Math.pow(10,(string.length - (first < 3 ? 2 : 1)));
        return Math.ceil(max/exp) * exp;
    }

});

Ext.reg('rchart', Ext.ux.Raphael.Chart);
