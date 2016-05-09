/**
 * TreeNav.view.custom.navigation.Navigation
 */
Ext.define("TreeNav.view.custom.navigation.Navigation", {
	extend: "Ext.tree.Panel",
	alias: 'widget.custom-navigation',
	requires: [
		"TreeNav.view.custom.navigation.NavigationController",
		"TreeNav.view.custom.navigation.NavigationModel"
	],
	controller: "custom-navigation-navigation",
	viewModel: {
		type: "custom-navigation-navigation"
	},
	animate: false,
	singleExpand: true,
	rootVisible: false,
	lines: false,
	useArrows: true,
	header: false,
	iconCls: 'navicon',
	listeners: {
		beforecellclick: 'navItemClick',
		afterrender: 'setConfiguration'
	}


});
