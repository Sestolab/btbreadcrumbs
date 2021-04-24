CKEDITOR.plugins.add('btbreadcrumbs', {
	requires: 'widget,dialog',
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
				var items = [];

				this.element.getElementsByTag('li').toArray().forEach(function(item){
					var a = item.findOne('a');

					items.push({
						txt: item.getText(),
						link: a ? a.getAttribute('href') : ''
					});
				});

				this.setData('items', items);

				this.on('dialog', function(e){
					e.data.widget = this;
				}, this);
			},
			data: function(){
				var html = '';

				this.data.items.forEach(function(item, index, items){
					html += (index !== items.length - 1)
						? `<li class="breadcrumb-item">${item.link ? `<a href="${item.link}">${item.txt}</a>` : item.txt}</li>`
						: `<li class="breadcrumb-item active" aria-current="page">${item.txt}</li>`;
				});

				this.element.getFirst().setHtml(html);
			}
		});
	}
});

