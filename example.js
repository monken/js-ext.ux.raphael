Ext.onReady(function() {
    var form = new Ext.ux.Raphael({
        id: 'foo'
    });

    var window = new Ext.Window({
        title: 'Resize Me',
        width: 300,
        height:300,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: form,

        buttons: [{
            text: 'Send'
        },{
            text: 'Cancel'
        }]
    });

    window.show();
});