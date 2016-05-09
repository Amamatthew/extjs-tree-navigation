/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('TreeNav.Application', {
    extend: 'Ext.app.Application',

    glyphFontFamily: 'FontAwesome',

    name: 'TreeNav',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    views: [
    
		'custom.navigation.Navigation'

	],

	requires: [
		'TreeNav.view.*',
		'TreeNav.store.*'
	],
	launch: function () {
        
		var navStore = Ext.create('TreeNav.store.Navigation');

		var nav = Ext.create('TreeNav.view.custom.navigation.Navigation', {
			cls: 'main-navigation',
			store: navStore,
			itemId: 'navigation',
			listeners: {
				itemselect: function (view, node) {
					/*if (node.isLeaf())
						me.onNavigationItemClick(node.data.routeId);*/
				},
				afterrender: function () {
					//me.loadPage();
				}
			}
		});

		// apply permissions here, basicaly we can filter store
		//nav.controller.applyPermissions(TreeNav.app.permissions);

		this.getMainView().lookupReference('west').add(nav);
			


    }
});
