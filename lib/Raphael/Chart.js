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
        column : function(p) { return new Ext.ux.Raphael.Chart.Column(p); }
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
        for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
            series.store = this.getStore();
            series.xField = this.xField;
            series.paper = p;
            var chart = this.constructors[series.type](series);
            columns.push(chart);
            columnsSorted.push(chart);
        }
        columnsSorted.sort(function(a,b){return b.maxValue() - a.maxValue()});
        var max = columnsSorted[0].maxValueCeil();
        columns.reverse();
        for(var i = 0; i < columns.length; i++) {
            this.ownerCt.add(columns[i]);
            columns[i].yAxis.max = max;
            if(i != 0) {
                columns[i].yAxis.render = false;
                columns[i].xAxis.render = false;
            }
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
        var exp = Math.pow(10,(("" + Math.floor(max)).length-1));
        return Math.ceil(max/exp) * exp;
    }
});

Ext.reg('rchart', Ext.ux.Raphael.Chart);