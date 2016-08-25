const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Contact Model
 * =============
 */

const Contact = new keystone.List('Contact', {
	// nocreate: true,
	// nodelete: true,
	plural: 'Contact', // Never show 'Contacts' in admin UI
	label: 'Contact', // Use'Contact' in admin UI
	map: {
		name: 'title',
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true,
	},
});

Contact.add({
	title: {
		type: String,
		required: true,
	},
	contact_text: {
    type: Types.Html,
    wysiwyg: true,
		height: 200,
		label: 'Contact Text',
	},
	careers: {
    type: Types.Html,
    wysiwyg: true,
		height: 200,
		label: 'Careers',
	},
  address: {
    type: Types.Html,
    wysiwyg: true,
    height: 200,
    label: 'Address',
  },
	contact_info: {
    type: Types.Html,
    wysiwyg: true,
		height: 200,
		label: 'Contact Info',
	},
});

Contact.defaultColumns = 'section_1.content|40%, section_2.content|40%';
Contact.register();
