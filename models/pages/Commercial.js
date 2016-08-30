const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Commercial Model
 * =============
 */

const Commercial = new keystone.List('Commercial', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Commercial', // Never show 'Commercials' in admin UI
	label: 'Commercial', // Use'Commercial' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Commercial.add({
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
	},
	'Section 3', {
		section_3: {
			quote: {
				type: Types.Text,
				label: 'quote',
			},
			company_position: {
				type: Types.Text,
				label: 'Company position',
			},
			author: {
				type: Types.Text,
				label: 'Author',
			},
		},
	});

Commercial.defaultColumns = 'section_1.content1';
Commercial.register();
