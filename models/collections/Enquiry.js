const keystone = require('keystone');
const Types = keystone.Field.Types;
const email = require('../utils/email');
const databaseRecordToHtml = require('../utils/databaseRecordToHtml');

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: false,
});

Enquiry.add({
	name: { type: Types.Name, required: true, noedit: true },
	email: { type: Types.Email, required: true, noedit: true },
	phone: { type: String, noedit: true },
	message: { type: Types.Textarea, required: false, noedit: true },
	createdAt: { type: Date, default: Date.now, noedit: true },
  answered: { type: Boolean, default: false },
});

Enquiry.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function (callback) {
  if (typeof callback !== 'function') {
		callback = () => {};
	}

  const emailSubject = 'New Enquiry for Evolv';
  const emailHeading = `<h3>${emailSubject}</h3>`;
  const emailBody = databaseRecordToHtml(Enquiry, this);
  const emailContent = emailHeading + emailBody;

  email.send({
      to: 'marcelo@fourlabs.co.uk',
      subject: emailSubject,
      html: emailContent
  })
  .then(callback);
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, answered, createdAt';
Enquiry.register();
