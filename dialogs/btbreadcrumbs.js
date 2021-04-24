CKEDITOR.dialog.add('btbreadcrumbs', function(editor){
	var lang = editor.lang.btbreadcrumbs;

	return {
		title: lang.label,
		height: 100,
		contents: [{
			id: 'main',
			elements: [
				{
					type: 'html',
					align: 'center',
					style: 'margin-bottom: -1em; font-weight: bold; word-spacing: 18em;',
					html: `<div>${lang.text} ${lang.link}</div>`
				},
				{
					type: 'html',
					id: 'items',
					html: '',
					setup: function(widget){
						widget.data.items.forEach(function(item){
							newDialogElement(item.txt, item.link);
						});

						newDialogElement();
					},
					commit: function(widget){
						var items = [];

						this.getElement().find('input:nth-child(odd)').toArray().forEach(function(input){
							var val = input.getValue();

							val && items.push({
								txt: val,
								link: input.getNext().getValue()
							});
						});

						widget.setData('items', items);
					},
					onHide: function(){
						this.getElement().setHtml('');
					}
				},
				{
					type: 'button',
					label: lang.addItem,
					style: 'width: 100%;',
					onClick: function(){
						newDialogElement();
					}
				}
			]
		}]
	}


	function newDialogElement(txt, link){
		var dialog = CKEDITOR.dialog.getCurrent(),
			div = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_ui_text">'),
			addInput = function(w, v){
				dialog.addFocusable(div.append(
					CKEDITOR.dom.element.createFromHtml(`<input style="width: ${w}%" class="cke_dialog_ui_input_text" value="${v || ''}">`)
				));
			};

		addInput(40, txt);
		addInput(60, link);

		dialog.getContentElement('main', 'items').getElement().append(div);
	}
});

