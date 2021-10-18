const users = require('../../src/users');

// works !
async function signup(req, res)  {
    if (!req.body.login || !req.body.password) {
        return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_FIELDS_EMPTY' });
    }
    var dbQuery = await users.accountInfo(req.body.login);
    if (dbQuery.rowCount != 0) {
        return res.send({ seccess: false, error: true, message: 'LOGIN_USER_EXISTS' });
    }
    await users.insertToDatabase(req.body.login, req.body.password);
    dbQuery = await users.accountInfo(req.body.login);
    if (dbQuery.rowCount === 0) {
        return res.send({ success: false, error: true, message: 'INTERNAL_ERROR' });
    }
    return res.send({ success: true, error: false, message: 'SIGNUP_SUCCESS' });
}

module.exports = signup;