const nodes = require('../../src/nodes');

// works !
async function getNode(req, res) {
    if (!req.body.nodeId) {
        return res.send({ success: false, error: true, message: 'NodeID_EMPTY' });
    }
    return res.send({ success: true, error: false, nodeData: await (await nodes.getNodeData(req.body.nodeId)).rows[0].node_data });
}

module.exports = getNode;