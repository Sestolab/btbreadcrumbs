CKEDITOR.plugins.add('btbreadcrumbs', {
	requires: 'widget,dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'btbreadcrumbs',

	init: function(editor){
		CKEDITOR.dialog.add('btbreadcrumbs', `${this.path}dialogs/btbreadcrumbs.js`);

		editor.widgets.add('btbreadcrumbs', {
			allowedContent: 'nav[aria-label]; ol(!breadcrumb); li(!breadcrumb-item,active)[aria-current]',
			template: '<nav aria-label="breadcrumb"><ol class="breadcrumb"></ol></nav>',
			button: editor.lang.btbreadcrumbs.label,
			dialog: 'btbreadcrumbs',

			upcast: function(element){
				return element.name == 'nav' && element.attributes['aria-label'] == 'breadcrumb';
			},
			init: function(){
				for (const item of this.element.getElementsByTag('li').toArray())
					this.pushData('items', [{
							txt: item.getText(),
							link: item.findOne('a') && item.findOne('a').getAttribute('href') || ''
						}]);
				this.on('dialog', function(evt){
					evt.data.widget = this;
				}, this);
			},
			data: function(){
				var items = '';

				if (!this.data.items)
					return;

				for (const item of this.data.items)
					if (item !== this.data.items.slice(-1)[0])
						items += `<li class="breadcrumb-item">${`<a href="${item.link}">${item.txt}</a>` || item.txt}</li>`;
					else
						items += `<li class="breadcrumb-item active" aria-current="page">${item.txt}</li>`;

				this.element.getFirst().setHtml(items);
			}
		});
	}
});