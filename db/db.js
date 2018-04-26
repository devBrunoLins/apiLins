const mongoose = require('mongoose');
// const uri = "mongodb://naboo.mongodb.umbler.com:43611";
const uri = "mongodb://localhost/apitest"
mongoose.connect(uri);
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    email: String
}, { collection: 'customers' }
);

const usersSchema = new Schema({
    name: String,
    age: String,
    address: String
}, { collection: 'users' }
);

const mailerSchema = new Schema({
    name: String,
    user: String,
    pass: String,
    from: String,
    to: Array,
    subject: String,
    body: String
}, { collection: 'mailer' }
);

module.exports = {
    Mongoose: mongoose,
    CustomerSchema: customerSchema,
    UsersSchema: usersSchema,
    MailerSchema: mailerSchema
}