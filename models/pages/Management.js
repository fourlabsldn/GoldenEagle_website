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
		unique: true,
	},
});

Management.add({
		title: {
			type: String,
			required: true,
		},
	},
	'Landing section', {
		landing_section: {
			background_image: {
				type: Types.CloudinaryImage,
			},
			section_1: {
				content: {
					type: Types.Textarea,
					height: 200,
					label: 'Content',
				},
			},
		},
	},
	'Tab 1', {
		tab_1: {
			title: {
				type: Types.Text,
				label: 'Title',
			},
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Longer text',
			},
		},
  },
  'Tab 2',
  {
		tab_2: {
			title: {
				type: Types.Text,
				label: 'Title',
			},
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Longer text',
			},
		},
  },
  'Tab 3',
  {
		tab_3: {
			title: {
				type: Types.Text,
				label: 'Title',
			},
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Longer text',
			},
		},
  },
  'Tab 4',
  {
		tab_4: {
			title: {
				type: Types.Text,
				label: 'Title',
			},
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Longer text',
			},
		},
	},
	'Section 3', {
		section_3: {
			background: {
				type: Types.CloudinaryImage,
				label: 'Background image',
			},
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 300,
				label: 'Small paragraph',
			},
		},
	},
	'Section 4', {
		section_4: {
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 300,
				label: 'Longer text',
			},
		},
	},
	'Section 5', {
		section_5: {
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 300,
				label: 'Small paragraph',
			},
		},
	},
	'Section 6', {
		section_6: {
			content_1: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Small paragraph',
			},
			content_2: {
				type: Types.Html,
				wysiwyg: true,
				height: 200,
				label: 'Longer text',
			},
		},
	});

// Management.defaultColumns = 'section_1.content_1';
Management.register();
