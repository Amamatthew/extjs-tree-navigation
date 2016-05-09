/**
 * TreeNav.view.custom.navigation.NavigationController
 */
Ext.define('TreeNav.view.custom.navigation.NavigationController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.custom-navigation-navigation',

	/**
	 * Navigation item click
	 * @param {type} view
	 * @param {type} node
	 */
	navItemClick: function (el, td, cellIndex, node) {

		var me = this,
				  view = me.getView();

		// expand navigation if it's not expanded
		// don't select item
		if (!view.expanded) {

			me.setExpand(true);

			Ext.defer(function () {
				node.expand();
			}, 220);

			return false;

		} else {
			try{
				if (node.isExpanded())
					node.collapse();
				else
					node.expand();
			}catch(e){

			}

			// using this so we can have modal View opened on navigation click
			// because this is beforeclick event and fill not fire itemclick if we return false
			view.fireEvent('itemselect', el, node);

			if(node.get('modalView'))
				return false;

			return this.selectParent(node);

		}

	},

	/**
	 * - Atach click and mouse move listeners
	 * to some parts of application
	 * for Auto Collapse navigation
	 */
	setConfiguration: function () {

		var me = this,
				  north = TreeNav.app.getMainView().down('#north'),
				  center = TreeNav.app.getMainView().down('#center');

		north.setListeners({
			element: 'el',
			click: me.clickCollapse,
			mousemove: me.mouseMoveCollapse,
			scope: me
		});

		center.setListeners({
			element: 'el',
			click: me.clickCollapse,
			mousemove: me.mouseMoveCollapse,
			scope: me
		});

	},

	/**
	 * Monitor given component for mouse move
	 * to auto collapse navigation
	 * @param {type} e
	 * @param {type} t
	 */
	mouseMoveCollapse: function (e, t) {

		var me = this,
				  view = me.getView();

		if (!view)
			return;

		if (view.expanded) {
			if (!me.timeoutId) {
				me.timeoutId = Ext.Function.defer(function () {
					me.setExpand(false);
				}, 1000);
			}
		} else {
			clearTimeout(me.timeoutId);
			me.timeoutId = 0;
		}

	},

	/**
	 * Monitor given component (center or top of application)
	 * for click to auto collapse navigation
	 * @param {type} e
	 * @param {type} t
	 */

	clickCollapse: function (e, t) {

		if (!this.getView())
			return;

		if (this.getView().expanded)
			this.setExpand(false);
	},

	/**
	 * collapse/expand side menu
	 * @param {boolean} expand
	 */
	setExpand: function (expand) {

		var me = this,
				  view = me.getView();

		if (!expand)
			view.collapseAll(function () {
				animate();
			});
		else
			animate();


		function animate() {

			view.up('#west').animate({
				to: {
					width: expand ? 200 : 60
				},
				callback: function () {
					view.updateLayout();
				}
			});

		}

		view.expanded = expand;

	},

	/**
	 * Marks navigation item as selected
	 * @param {String} routeId
	 */
	setActiveItem: function (routeId) {

		var navigationTree = this.getView();
		var node = navigationTree.store.findNode('routeId', routeId) ||
				  navigationTree.store.findNode('viewType', routeId);

		if (node) {
			navigationTree.setSelection(node);
			this.selectParent(node);
		}

	},

	/**
	 * If submenu is clicked, select parent
	 * @to-do: find a way to check is parent already selected
	 */
	selectParent: function (node) {

		var parent = node.parentNode;
		var me = this;
		if (node.get('leaf') === false)
			return false;
		// remove previous submenu selection if any

		var previousSelectedNode = me.getView().store.findNode('cls', 'submenu-active');
		if (previousSelectedNode)
			previousSelectedNode.set('cls', 'submenu');

		// if element has a parent node, select it
		// add a class to subselection
		if (parent.get('id') !== 'root') {
			Ext.defer(function () {
				me.getView().setSelection(parent);
				node.set('cls', 'submenu-active');
			}, 1);
		}
	},

	/**
	 * @param {object} object of "routeId: permission" items
	 * Hide nodes that user don't have permission to see
	 * @to-do: hide parent node if all childs are hidden
	 */
	applyPermissions: function (perms) {

		if(Ext.isObject(perms)){

			var store = this.getView().getStore();
			store.filterBy(function (record) {
				var route = record.get('routeId');

				if(record.hasChildNodes()) // for now
					return true;

				return (record.get('routeId') in perms) && App.hasPermission(perms[route]);

			});

		}

	}




});
