import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import hrIcon from './horizontalrule.svg';

export default class HorizontalRule extends Plugin {
	init() {
		const editor = this.editor;
		const model = editor.model;
		const conversion = editor.conversion;
		const doc = model.document;
		const schema = model.schema;

		// Configure new horizontal rule schema
		schema.register('horizontalRule', {
			allowIn: '$root',
			isObject: true,
			isBlock: true,
		});

		// Configure upcast converter.
		conversion.for('upcast').elementToElement({
			model: 'horizontalRule',
			view: 'hr'
		});

		// Configure downcast converter.
		conversion.for('downcast').elementToElement({
			model: 'horizontalRule',
			view: (modelElement, viewWriter) => {
				return viewWriter.createEmptyElement('hr');
			}
		});

		// Configure the button
		editor.ui.componentFactory.add('horizontalRule', locale => {
			const view = new ButtonView(locale);

			view.set({
				label: 'Vložit vodorovnou čáru',
				icon: hrIcon,
				tooltip: true
			});

			// Callback executed once the button is clicked.
			view.on('execute', () => {
				model.change(writer => {
					const horizontalRuleElement = writer.createElement('horizontalRule');

					// Insert the hr at the end of the selection
					writer.insert(horizontalRuleElement, doc.selection.focus);
					writer.setSelection(horizontalRuleElement, 'after');
				});

			});

			return view;
		});
	}
}
