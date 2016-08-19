const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Investments Model
 * =============
 */

const Investments = new keystone.List('Investments', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Investments', // Never show 'Investmentss' in admin UI
	label: 'Investments', // Use'Investments' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Investments.add({
		title: {
			type: String,
			required: true,
		},
	},
	'Landing Section', {
		section_1: {
			content: {
				type: Types.Textarea,
				height: 500,
				label: 'Content',
			},
		},
	},
	'Section 2', {
		section_2: {
			content1: {
				type: Types.Html,
				wysiwyg: true,
				height: 500,
				label: 'Small paragraph',
			},
			content2: {
				type: Types.Html,
				wysiwyg: true,
				height: 500,
				label: 'Longer text',
			},
		},
	}
);

Investments.defaultColumns = 'section_1.content1';
Investments.register();
