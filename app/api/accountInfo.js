const users = require('../../src/users');

// works !
async function accountInfo(req, res) {
    if (!req.body.login || !req.body.password) {
        return res.send({ success: false, error: true, message: 'LOGIN_FIELD_EMPTY' });
    }
    var dbQuery = await users.accountInfo(req.body.login);
    if (dbQuery.rowCount === 0) {
        return res.send({ seccess: false, error: true, message: 'LOGIN_USER_NOT_FOUND' });
    }
    try {
        dbQuery = await users.accountInfo(req.body.login);
        if (dbQuery.rows[0].password !== req.body.password) {
            return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
        }
    } catch (error) {
        return res.send({ success: false, error: true, message: 'LOGIN_PASSWORD_WRONG' });
    }
    const userData = await users.accountInfo(req.body.login);
    return res.send({ success: true, error: false, username: userData.rows[0].login, nodes: userData.rows[0].nodes });
}

module.exports = accountInfo;