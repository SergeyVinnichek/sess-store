'use strict';

class SessStore {

    constructor(checkPeriod = 3600, expires = 600) {
        this.store = {};
        this.checkTimerId = null;
        this.checkPeriod = checkPeriod; // in seconds
        this.expires = expires; // in seconds
    }

    set(id, session, callback) {
        var expires = new Date();
        expires.setSeconds(new Date().getSeconds() + this.expires);
        session.expires = expires;
        this.store[id] = session;
        callback();
    }

    get(id, callback) {
        const session = this.store[id];
        const now = new Date();

        if (session) {
            if (session.expires < now)
                callback(null);
            else
                callback(session);
        }
        else
            callback(null);
    }

    destroy(id, callback) {
        delete this.store[id];
        callback();
    }

    startCheck() {
        if (Number.isInteger(this.checkPeriod)) {
            if (this.checkPeriod > 0) {
                if (this.checkTimerId != null) {
                    clearInterval(this.checkTimerId)
                }
                this.checkTimerId = setInterval(() => this.shrinkStore(), this.checkPeriod * 1000);
            }
        }
    }

    shrinkStore() {
        const keys = Object.keys(this.store);

        for (const key of keys) {
            const now = new Date();
            if (this.store[key]) {
                if (now > this.store[key].expires)
                    delete this.store[key];
            }
        }
    }
}

module.exports = SessStore;