Ext.namespace('Ext.ux.Raphael.Chart.Pie');

Ext.ux.Raphael.Chart.Pie = Ext.extend(Ext.ux.Raphael.Chart, {
    dataField: '',
    categoryField: '',
    radius: 100,
    x: null,
    y: null,
    draw: function(p) {
        Ext.ux.Raphael.Chart.Pie.superclass.draw.apply(this, arguments);
        
        var legend = [],
            data = [];
            
        this.store.each(function(record) {
            legend.push(record.get(this.categoryField));
            data.push(+record.get(this.dataField));
        }, this);
        var pie = p.g.piechart(this.x || this.radius / 0.85, this.y || this.radius / 0.85, this.radius, data, {
            nostroke: true,
            shade: true,
            legend: legend
        });
        
        var that = this;
        pie.each(function() {
            this.sector.oldpath = this.sector.attrs.path;
            this.sector.oldfill = this.sector.attrs.fill;
            Ext.QuickTips.register({
                target: this.cover.node,
                title: this.label[1].attrs.text,
                text: that.tipRenderer(that, that.getStore().getAt(this.value.order), this.value.order)
            });
        });
        
        
        pie.hover(function() {
            var anim = this.sector.highlight();
            this.label[0].animate({ fill: anim.fill, scale: 1.5 }, 300);
            anim.translation = [ (this.sector.middle.x - this.cx) / 3, (this.sector.middle.y - this.cy) / 3];
            this.sector.animate(anim, 300);
            

        },
        function() {
            this.label[0].animate({ fill: this.sector.oldfill, scale: 1 }, 300);
            this.sector.animate({
                path: this.sector.oldpath,
                fill: this.sector.oldfill
            },
            300);
        });
    },
    tipRenderer : function(chart, record, index, series){
        var total = 0;
        var value = record.get(chart.dataField);
        chart.getStore().each(function(r) { total += +r.get(chart.dataField); }); 
        return value + ' of ' + total + '<br/>' + Math.round(value * 100 / total) + '%';
    },
	barOffset: function(i) { return null }
});

Ext.reg('rpiechart', Ext.ux.Raphael.Chart.Pie);