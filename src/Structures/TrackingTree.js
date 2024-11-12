import TrackingNode from './TrackingNode';

class TrackingTree {
    constructor() {
        this.root = null;
    }

    addTrack(idReq, user, date, stage, description) {
        if (!this.root) {
            this.root = new TrackingNode(idReq, user, date, stage, description);
        } else {
            const reqNode = this.findRequerimentNode(idReq);
            if (reqNode) {
                reqNode.addChange(user, date, stage, description);
            } else {
                const newReqNode = new TrackingNode(idReq, user, date, stage, description);
                this.root.children.push(newReqNode);
            }
        }
    }

    findRequerimentNode(idReq) {
        if (!this.root) return null;
        return this._findRequerimentNode(this.root, idReq);
    }

    _findRequerimentNode(node, idReq) {
        if (node.idReq === idReq) return node;
        for (let child of node.children) {
            const result = this._findRequerimentNode(child, idReq);
            if (result) return result;
        }
        return null;
    }
}

export default TrackingTree;