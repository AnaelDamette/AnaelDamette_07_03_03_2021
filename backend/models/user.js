
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    pseudo: {type : String, required: true, unique: true},
    password: { type: String, required: true }
});


module.exports = model('User', userSchema); 