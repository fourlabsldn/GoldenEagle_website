const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Home Model
 * =============
 */

const Home = new keystone.List('Home', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Home', // Never show 'Homes' in admin UI
	label: 'Home', // Use'Home' in admin UI
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title',	unique: true },
});

Home.add({
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
	'Who we are paragraph', {
		section_2: {
			content_1: {
        type: Types.Text,
				label: 'Content',
			},
		},
	}
);

Home.defaultColumns = 'section_1.content|40%, section_2.content|40%';
Home.register();
