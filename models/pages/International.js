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
			see_more_url: {
				type: Types.Text,
				label: 'See More Url',
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
			see_more_url: {
				type: Types.Text,
				label: 'See More Url',
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
			see_more_url: {
				type: Types.Text,
				label: 'See More Url',
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
				height: 300,
				label: 'Longer text',
			},
			see_more_url: {
				type: Types.Text,
				label: 'See More Url',
			},
		},
	},
	'Section 3', {
		section_3: {
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
