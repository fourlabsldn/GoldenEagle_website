const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Management Model
 * =============
 */

const Management = new keystone.List('Management', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Management', // Never show 'Managements' in admin UI
	label: 'Management', // Use'Management' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Management.add({
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

Management.defaultColumns = 'section_1.content1';
Management.register();
