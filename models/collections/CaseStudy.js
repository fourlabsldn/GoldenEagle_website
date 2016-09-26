const keystone = require('keystone');
const Types = keystone.Field.Types;
const logger = require('../../utils/logger');

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
  location: {
    type: Types.Location,
    defaults: { country: 'United Kingdom' },
    required: true,
    initial: true
  },
  images: { type: Types.CloudinaryImages },
  bedrooms: { type: Number },
  livingrooms: { type: Number },
  bathrooms: { type: Number },
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


CaseStudy.schema.virtual('location.latitude').get(function () {
  const geo = this.location.geo || [];
  return geo[1];
});

CaseStudy.schema.virtual('location.longitude').get(function () {
  const geo = this.location.geo || [];
  return geo[0];
});

CaseStudy.schema.virtual('hasGeoInfo').get(function () {
  const geo = this.location.geo || [];
  return geo.length > 0;
});

function setCaseStudyCoordinates(next) {
  // Insert geolocation data
  const region = 'United Kingdom';
  const updateRecord = 'overwrite';
  this._.location.googleLookup(region, updateRecord, (err) => {
    if (err) {
      logger.warn(err);
    }
    next();
  });
}
CaseStudy.schema.pre('save', setCaseStudyCoordinates);


CaseStudy.defaultSort = '-createdAt';
CaseStudy.defaultColumns = 'title, short_description, createdAt';
CaseStudy.register();
