//THIS IS 'USER MODEL'

//Require mongoose
const mongoose                    =     require('mongoose');
//Import passportLocalMongoose
const passportLocalMongoose       =     require('passport-local-mongoose');

//Defined User Schema

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
//take our passportLocalMongoose package that we required, this add a bunch
//of methods that come with package to user schema.
//bunch of important auth features
//telling mongoose to use serualize and deserialize from app
UserSchema.plugin(passportLocalMongoose);

//mongoose.model('Name of model', we are building it from UserSchema);
module.exports = mongoose.model('User', UserSchema);
