const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * CaseStudy Model
 * =============
 */

const CaseStudy = new keystone.List('CaseStudy', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title',	unique: true },
});

CaseStudy.add({
  title: {
      type: String,
      required: true,
  },
  images: { type: Types.CloudinaryImages },
  short_description: {
    type: Types.Textarea,
    height: 500,
    label: 'Short description (one paaragraph)',
  },
  expanded_description: {
    type: Types.Html,
    wysiwyg: true,
    height: 500,
    label: 'Expanded description',
  },
  createdAt: { type: Date, default: Date.now },
});

CaseStudy.defaultSort = '-createdAt';
CaseStudy.defaultColumns = 'title, short_description, createdAt';
CaseStudy.register();
