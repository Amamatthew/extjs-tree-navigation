/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TreeNav.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'TreeNav.view.main.MainController',
        'TreeNav.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'container',
        region: 'north',
        cls: 'north',
        itemId: 'north',
        reference: 'north',
        height: 60,
        layout: {
            type: 'hbox',
            align: 'middle'
        }

    }, {
        xtype: 'container',
        itemId: 'west',
        reference: 'west',
        region: 'west',
        expanded: false,
        cls: 'west',
        width: 60
    }, {
        region: 'center',
        xtype: 'container',
        itemId: 'center',
        reference: 'center',
        layout: 'fit',
        style: {
            background: '#f5f5f5',
            padding: '0px'
        }
    }]
});
