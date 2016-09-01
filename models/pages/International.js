const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * International Model
 * =============
 */

const International = new keystone.List('International', {
	// nocreate: true,
	// nodelete: true,
	plural: 'International', // Never show 'Internationals' in admin UI
	label: 'International', // Use'International' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true,
	},
});

International.add({
		title: {
			type: String,
			required: true,
		},
	},
	'Landing section', {
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
      title: {
        type: Types.Text,
        label: 'Title',
      },
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
      title: {
        type: Types.Text,
        label: 'Title',
      },
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 400,
				label: 'Content',
			},
			images: {
				type: Types.CloudinaryImages,
			},
		},
	});
// International.defaultColumns = 'section_1.content_1';
International.register();
