CKEDITOR.dialog.add('btbreadcrumbs', function(editor){
	var rows = editor.config.btbreadcrumbs_maxRows || 6,
		dialog = {
			title: editor.lang.btbreadcrumbs.label,
			onShow: function(){
				var widget = editor.widgets.focused;

				if (widget)
					for (var i = 0; i < rows; i++)
						if (widget.data.items[i]){
							this.setValueOf('info', `txt${i}`, widget.data.items[i].txt);
							this.setValueOf('info', `link${i}`, widget.data.items[i].link);
						}
			},
			onOk: function(){
				var items = [];

				for (var i = 0; i < rows; i++)
					if (this.getValueOf('info', `txt${i}`))
						items.push({
							txt: this.getValueOf('info', `txt${i}`),
							link: this.getValueOf('info', `link${i}`),
						});
				this.widget.setData('items', items);
			},

			contents: [
				{
					id: 'info',
					elements: []
				}
			]
		};

	for (var i = 0; i < rows; i++){
		dialog.contents[0].elements.push({
			type: 'hbox',
			widths: ['40%', '60%'],
			children: [
				{
					id: `txt${i}`,
					type: 'text',
					label: editor.lang.btbreadcrumbs.text
				},
				{
					id: `link${i}`,
					type: 'text',
					label: editor.lang.btbreadcrumbs.link
				}
			]
		});
	}

	return dialog;
});