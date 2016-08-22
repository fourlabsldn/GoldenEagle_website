const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * About Model
 * =============
 */

const About = new keystone.List('About', {
	// nocreate: true,
	// nodelete: true,
	plural: 'About', // Never show 'Abouts' in admin UI
	label: 'About', // Use'About' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true,
	},
});

About.add({
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
				height: 300,
				label: 'Longer text',
			},
		},
	},
	'Radi and Paul\'s quote', {
		section_3: {
			content_1: {
				type: Types.Textarea,
				height: 200,
				label: 'Small paragraph',
			},
		},
	});

// About.defaultColumns = 'section_1.content_1';
About.register();
