const users = require('../../src/users');
const nodes = require('../../src/nodes');
const uniqid = require('uniqid');

// works !
async function addNode(req, res) {
    if (!req.body.serverId || !req.body.imageData) {
        return res.send({ success: false, error: true, message: 'FIELD_EMPTY' });
    }
    let nodeId = uniqid(req.body.serverId);
    await users.updateNodes(req.body.serverId, nodeId);
    await nodes.insertNode(nodeId, req.body.imageData);
    return res.send({ success: true, error: false });
}

module.exports = addNode;