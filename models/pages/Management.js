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
			content_1: {
				type: Types.Textarea,
				height: 200,
				label: 'Small paragraph',
			},
		},
	},
  'Section 4', {
    section_4: {
      title: {
        type: Types.Text,
        label: 'Title',
      },
      content_1: {
        type: Types.Textarea,
        height: 200,
        label: 'Small paragraph',
      },
      illustration: {
        type: Types.CloudinaryImage,
        label: 'Illustration',
      },
    },
  },
  'Section 5', {
    section_5: {
      title: {
        type: Types.Text,
        label: 'Title',
      },
      content_1: {
        type: Types.Textarea,
        height: 200,
        label: 'Small paragraph',
      },
      illustration: {
        type: Types.CloudinaryImage,
        label: 'Illustration',
      },
    },
  },
	'Section 6', {
		section_6: {
      content_1: {
				type: Types.Textarea,
				height: 200,
				label: 'Small paragraph',
			},
		},
	},
  'Section 7', {
		section_7: {
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
      illustration: {
				type: Types.CloudinaryImage,
				label: 'Illustration',
			},
		},
	});

// Management.defaultColumns = 'section_1.content_1';
Management.register();
