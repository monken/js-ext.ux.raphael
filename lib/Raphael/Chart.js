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
    constructors: {
        column : function(p) { return new Ext.ux.Raphael.Chart.Column(p); },
        stackedcolumn : function(p) { return new Ext.ux.Raphael.Chart.StackedColumnChart(p); }
    },
    initComponent : function(){
        Ext.ux.Raphael.Chart.superclass.initComponent.call(this);
        Ext.applyIf(this, {xAxis: {render:true}, yAxis : {render:true}});
        
    },
    tipRenderer : function(chart, record, index, series){
        var total = 0;
        var value = record.get(chart.yField);
        return Ext.util.Format.number(value, '0,00');
    },
    draw: function() {
        var p = this.paper;
        p.g.txtattr = {font: "11px Arial, sans-serif"};
        if(!this.series.length) return;
        Raphael.getColor.reset();
        Raphael.getColor();
        
        var columns = [];
        var columnsSorted = [];
        var stackedOffset = [];
        for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
            Ext.applyIf(series, {
                store: this.getStore(),
                xField: this.xField,
                paper: p,
                type: this.type
            });
            if(this.type == 'stackedcolumn') {
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
            var chart = this.constructors[series.type](series);
            columns.push(chart);
            columnsSorted.push(chart);
        }
        columnsSorted.sort(function(a,b){return b.maxValue() - a.maxValue()});
        var max = 0;
        if(this.type == 'column') {
            max = columnsSorted[0].maxValueCeil();
        } else {
            for(var i = 0; i < columns.length; i++)
              max += columns[i].maxValue();
            max = this.ceil(max);
        }
        columns.reverse();
        for(var i = 0; i < columns.length; i++) {
            this.ownerCt.add(columns[i]);
            columns[i].yAxis.max = max;
            if(i != 0) {
                columns[i].yAxis.render = false;
                columns[i].xAxis.render = false;
            }
            
            if(this.type != 'stackedcolumn')
              columns[i].barOffset = -(-1+2/(columns.length-1)*i);
            columns[i].draw(p);
            
            
        }
        
    },
    getStore: function() { return this.store; },
    maxValue: function() {
        var max = 0;
        this.getStore().each(function(r) {
            if(r.get(this.yField) > max) max = r.get(this.yField);
        }, this);
        return max;
    },
    maxValueCeil: function() {
        var max = this.maxValue();
        return this.ceil(max);
    },
    ceil: function(max) {
        var exp = Math.pow(10,(("" + Math.floor(max)).length-1));
        return Math.ceil(max/exp) * exp;
    }
});

Ext.reg('rchart', Ext.ux.Raphael.Chart);