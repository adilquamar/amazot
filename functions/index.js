const functions = require('firebase-functions');
const admin = require('firebase-admin');

// -------------- background triggers ----------------------
// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    // if collection doesn't exist, firestore will create it
    return admin.firestore().collection('users').doc(user.uid).set({
        // user firebase attributes
        email: user.email,
        productsSold: [],
        productsBought: []
    });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid); // database
    return doc.delete();
});