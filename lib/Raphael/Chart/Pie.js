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
        
        
        pie.each(function() {
            console.log(this.value);
            Ext.QuickTips.register({
                target: this.cover.node,
                title: this.legend,
                text: this.value.valueOf() + ' of ' + this.total + '<br/>' + Math.floor(this.value.valueOf() * 100 / this.total) + '%',
            });
        });
        
        pie.hover(function() {
            this.sector.animate({
                path: this.sector.exposed
            },
            300);

        },
        function() {
            this.sector.animate({
                path: this.sector.pluggedin
            },
            300);
        });
    }
});

Ext.reg('rpiechart', Ext.ux.Raphael.Chart.Pie);