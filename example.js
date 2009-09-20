
Ext.onReady(function() {
    
    Ext.QuickTips.init();
    
    Ext.apply(Ext.QuickTips.getQuickTip(), {
        trackMouse: true,
        showDelay: 0,
        hideDelay: 0
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
        
    var barStore = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [
            {name:'Jul 07', visits: 245000, views: 3000000},
            {name:'Aug 07', visits: 240000, views: 3500000},
            {name:'Sep 07', visits: 355000, views: 4000000},
            {name:'Oct 07', visits: 375000, views: 4200000},
            {name:'Nov 07', visits: 490000, views: 4500000},
            {name:'Dec 07', visits: 495000, views: 5800000},
            {name:'Jan 08', visits: 520000, views: 6000000},
            {name:'Feb 08', visits: 620000, views: 7500000}
        ]
    });
    
    var windows = [
        
            //     { draw: function(paper) {
            //         var circle = paper.circle(50, 40, 10);
            //         circle.attr("fill", "#f00");
            //         circle.attr("stroke", "#fff");
            //         circle.animate({
            //             cx: 20,
            //             r: 20
            //         },
            //         2000);
            //     } 
            // }, 
            // {
            //     xtype: 'rpiechart',
            //     dataField: 'total',
            //     categoryField: 'season',
            //     store: pieStore,
            //     radius: 80
             //}, 
             {
                 xtype: 'rcolumnchart',
                 store: barStore,
                 yField: 'visits',
                 xField: 'name'
             }, 
            {
                xtype: 'rcolumnchart',
                store: barStore,
                xField: 'name',
                series: [{
                    type: 'column',
                    yField: 'visits',
                    displayName: 'Visits'
                },{
                    type: 'column',
                    yField: 'views',
                    displayName: 'Page Views'
                }]
            }
        
    ];
    
    for(var i = 0; i < windows.length; i++) {
    var window = new Ext.Window({
        title: 'Rapahel',
        width: 400,
        height:400,
        x: 400 * i,
        y: 0,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: new Ext.ux.Raphael({ items : windows[i] })
    });

    window.show();
}




});


