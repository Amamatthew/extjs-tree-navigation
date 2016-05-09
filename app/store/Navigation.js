/**
 * Navigation store
 *
 * Some of the key properties:
 *
 * - routeId: is xtype of the view and the route hash
 *				  it's also used on perrmisions filtering (Application.js properties)
 *				  
 *	- modal: if true, view should open in modal and user should stay on current page
 */
Ext.define('TreeNav.store.Navigation', {
	extend: 'Ext.data.TreeStore',
	storeId: 'navigation',
	alias: 'store.navigation',
	autoDestroy: true,
	root: {
		children: [
			{
				text: 'Dashboard',
				leaf: true,
				routeId: 'main-dashboard',
				glyph: 0xf0e4
			},
			{
				text: 'Reports',
				leaf: true,
				routeId: 'reports',
				glyph: 0xf201
			},
			{
				text: 'Users',
				leaf: true,
				routeId: 'users',
				glyph: 0xf11b
			},
			{
				text: 'Settings',
				leaf: false,
				glyph: 0xf013,
				children: [{
					text: 'Security',
					leaf: true,
					routeId: 'security',
					cls: 'submenu',
					modalView: true
				}]
			}
			
		]
	}
});
