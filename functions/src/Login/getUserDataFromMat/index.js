const functions = require("firebase-functions");

const getUserDataFromMat = functions.https.onCall(async (data, context) => {
    
    try {
        const { mat } = data;
        const { firestore } = require("../../firebase");
        const userRef = firestore.collection("tecAccounts").doc(mat);
        const user = await userRef.get();

        if (!user.exists) {
            throw new Error("User not found");
        }

        return {
            error: false,
            data: user.data(),
        };

    } catch (err) {
        return {
            error: true,
            message: err.message,
        };
    }
});

module.exports = {
    getUserDataFromMat
}