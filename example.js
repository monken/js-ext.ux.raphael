Ext.onReady(function() {

    Ext.QuickTips.init();

    Ext.apply(Ext.QuickTips.getQuickTip(), {
        trackMouse: true,
        showDelay: 0,
        hideDelay: 0
    });
    
    var stackedStore = new Ext.data.JsonStore({
        fields: ['year', 'comedy', 'action', 'drama', 'thriller'],
        data: [
                {year: 2005, comedy: 34000000, action: 23890000, drama: 18450000, thriller: 20060000},
                {year: 2006, comedy: 56703000, action: 38900000, drama: 12650000, thriller: 21000000},
                {year: 2007, comedy: 42100000, action: 50410000, drama: 25780000, thriller: 23040000},
                {year: 2008, comedy: 38910000, action: 56070000, drama: 24810000, thriller: 26940000}
              ]
    });


    var pieStore = new Ext.data.JsonStore({
        fields: ['season', 'total'],
        data: [{
            season: 'Summer',
            total: 150
        },
        {
            season: 'Fall',
            total: 245
        },
        {
            season: 'Winter',
            total: 117
        },
        {
            season: 'Spring',
            total: 184
        }]
    });

    var barStore = new Ext.data.JsonStore({
        fields: ['name', 'visits', 'views'],
        data: [{
            name: 'Jul 07',
            visits: 245000,
            views: 3000000
        },
        {
            name: 'Aug 07',
            visits: 240000,
            views: 3500000
        },
        {
            name: 'Sep 07',
            visits: 355000,
            views: 4000000
        },
        {
            name: 'Oct 07',
            visits: 375000,
            views: 4200000
        },
        {
            name: 'Nov 07',
            visits: 490000,
            views: 4500000
        },
        {
            name: 'Dec 07',
            visits: 495000,
            views: 5800000
        },
        {
            name: 'Jan 08',
            visits: 520000,
            views: 6000000
        },
        {
            name: 'Feb 08',
            visits: 620000,
            views: 7500000
        }]
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
	
    {
        xtype: 'rpercentagecolumnchart',
        xField: 'year',
        store: stackedStore,
        series: [{
            yField: 'comedy',
            displayName: 'Comedy'
        },{
            yField: 'action',
            displayName: 'Action'
        },{
            yField: 'drama',
            displayName: 'Drama'
        },{
            yField: 'thriller',
            displayName: 'Thriller'
        }]

    },
	{
        xtype: 'rstackedcolumnchart',
        xField: 'year',
        store: stackedStore,
        series: [{
            yField: 'comedy',
            displayName: 'Comedy'
        },{
            yField: 'action',
            displayName: 'Action'
        },{
            yField: 'drama',
            displayName: 'Drama'
        },{
            yField: 'thriller',
            displayName: 'Thriller'
        }]

    },
    {
        xtype: 'rpiechart',
        dataField: 'total',
        categoryField: 'season',
        store: pieStore,
        radius: 120
    }, 
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
        },
        {
            type: 'column',
            yField: 'views',
            displayName: 'Page Views'
        }]
    }

    ];

    for (var i = 0; i < windows.length; i++) {
        var window = new Ext.Window({
            title: 'Raphael',
            width: 400,
            height: 400,
            x: (400 * i) % 800,
            y: 200  + 400 * Math.floor(i/2),
            layout: 'fit',
            resizable: false,
            bodyStyle: 'padding:5px;',
            buttonAlign: 'center',
            items: new Ext.ux.Raphael({
                items: windows[i]
            })
        });

        window.show();
    }

    var changesStore = new Ext.data.JsonStore({
        data: {
            results: 3,
            rows: [
            {
                version: '0.06',
                date: '2010-01-04',
                log: ['switched to ExtJS 3.1.0', 'PercentageColumn clones the store instead of altering the original one', 'adjusted height of yAxis', 'fixed floating columns in IE']
            },
            {
                version: '0.05',
                date: '2009-12-01',
                log: ['Height of bars adjusted', 'Pie: highlight label by scaling the button', 'new chart types: StackedColumn and PercentageColumn', 'Lots of bug fixes and improvements']
            },
            {
                version: '0.04',
                date: '2009-09-21',
                log: ['works now fine with IE', 'added highlight to the piechart']
            },
            {
                version: '0.03',
                date: '2009-09-20',
                log: ['fixed the quicktip of the columnchart', 'columnchart support for series', 'removed dependency on g.bar.js', 'reduced payload by 15kb']
            },
            {
                version: '0.02',
                date: '2009-09-19',
                log: ['added columnchart', 'use .round instead of .floor in Pie\'s tipRenderer']
            },
            {
                version: '0.01',
                date: '2009-09-18',
                log: ['released on an unsuspecting world']
            }],

            metaData: {
                fields: ['version', {
                    type: 'date',
                    dateFormat: 'c',
                    name: 'date'
                },
                'log'],
                root: 'rows',
                idProperty: 'date',
                totalProperty: 'results'
            },
            success: true
        }
    });

    var logTmpl = new Ext.XTemplate(
    '<tpl for="log"><li>{.}</li></tpl>'
    );

    var changesGrid = new Ext.grid.GridPanel({
        store: changesStore,
        columns: [{
            header: 'Version',
            dataIndex: 'version'
        },
        {
            header: 'Date',
            dataIndex: 'date',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        }],
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true
        }),
        region: 'west',
		width: 200,
        split: true,
        viewConfig: {forceFit: true }
    });
    
    changesGrid.getSelectionModel().on('rowselect', function(sm, i, r) {
        var panel = Ext.getCmp("changeLogDetails");
        logTmpl.overwrite(panel.body, r.data);
    });

    var changes = new Ext.Panel({
        renderTo: document.body,
        title: 'Changelog',
        layout: 'border',
        height: 200,
        items: [changesGrid, {
            id: 'changeLogDetails',
            region: 'center',
            html: 'Select a version to see additional details.',
            bodyStyle: { padding: '5px', font: '12px tahoma', 'line-height': '20px' }
        }]
    });

});