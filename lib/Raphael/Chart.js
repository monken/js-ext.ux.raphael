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
    constructors: {
        column : function(p) { return new Ext.ux.Raphael.Chart.Column(p); }
    },
    tipRenderer : function(chart, record, index, series){
        var total = 0;
        var value = record.get(chart.yField);
        return Ext.util.Format.number(value, '0,00');
    },
    draw: function(p) {
        p.g.txtattr = {font: "11px Arial, sans-serif"};
        if(!this.series.length) return;
        for(var i = 0; i < this.series.length; i++) {
            var series = this.series[i];
            series.store = this.getStore();
            var chart = this.constructors[series.type](series);
            this.ownerCt.add(chart);
            chart.draw(p);
        }
    },
    getStore: function() { return this.store; }
});

Ext.reg('rchart', Ext.ux.Raphael.Chart);