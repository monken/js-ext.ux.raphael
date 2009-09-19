
Ext.onReady(function() {
    
    Ext.QuickTips.init();
    
    Ext.apply(Ext.QuickTips.getQuickTip(), {
        trackMouse: true
    });
    
    var pieStore = new Ext.data.JsonStore({
            fields: ['season', 'total'],
            data: [{
                season: 'Summer',
                total: 150
            },{
                season: 'Fall',
                total: 245
            },{
                season: 'Winter',
                total: 117
            },{
                season: 'Spring',
                total: 184
            }]
        });
        
    var windows = [
        
                { draw: function(paper) {
                    var circle = paper.circle(50, 40, 10);
                    circle.attr("fill", "#f00");
                    circle.attr("stroke", "#fff");
                    circle.animate({
                        cx: 20,
                        r: 20
                    },
                    2000);
                } 
            }, {
                xtype: 'rpiechart',
                dataField: 'total',
                categoryField: 'season',
                store: pieStore,
                radius: 80
            }
        
    ];
    
    for(var i = 0; i < windows.length; i++) {
    var window = new Ext.Window({
        title: 'Resize Me',
        width: 300,
        height:300,
        x: 300 * i,
        y: 0,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: new Ext.ux.Raphael({ items : windows[i] }),

        buttons: [{
            text: 'Send'
        },{
            text: 'Cancel'
        }]
    });

    window.show();
}
});