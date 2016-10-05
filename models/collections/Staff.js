const keystone = require('keystone');
const Types = keystone.Field.Types;
/**
 * Staff Model
 * ==========
 */

const Staff = new keystone.List('Staff', {
  plural: 'Staff', // Never show 'Abouts' in admin UI
});

Staff.add({
  portrait: { type: Types.CloudinaryImage },
  name: { type: Types.Name },
  role: { type: Types.Text },
  info: { type: Types.Textarea, height: 150 },
  phone: { type: Types.Text },
  email: { type: Types.Email },
  linkedin: { type: Types.Url },
});

Staff.defaultColumns = 'name|70%, email|20%';
Staff.register();
