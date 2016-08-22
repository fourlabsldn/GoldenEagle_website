const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Developments Model
 * =============
 */

const Developments = new keystone.List('Developments', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Developments', // Never show 'Developmentss' in admin UI
	label: 'Developments', // Use'Developments' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Developments.add({
		title: {
			type: String,
			required: true,
		},
	},
	'Landing Section', {
		section_1: {
			content_1: {
				type: Types.Textarea,
				height: 200,
				label: 'Content',
			},
		},
	},
	'Section 2', {
		section_2: {
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 500,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 500,
				label: 'Longer text',
			},
		},
	}
);

Developments.defaultColumns = 'section_1.content1';
Developments.register();
