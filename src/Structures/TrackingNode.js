class TrackingNode {
    constructor(idReq, user, date, stage, description) {
        this.idReq = idReq;
        this.user = user;
        this.date = date;
        this.stage = stage;
        this.description = description;
        this.children = [];
    }

    addChange(user, date, stage, description) {
        const newChange = new TrackingNode(this.idReq, user, date, stage, description);
        this.children.push(newChange);
        this.children.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

export default TrackingNode;