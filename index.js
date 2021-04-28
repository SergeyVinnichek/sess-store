'use strict';

class SessStore {

    constructor(checkPeriod = 60, expires = 600) {
        this.store = new Map();
        this.checkTimerId = null;
        this.checkPeriod = checkPeriod; // in seconds
        this.expires = expires; // in seconds
    }

    set(id, session, callback) {
        var expires = new Date();
        expires.setSeconds(new Date().getSeconds() + this.expires);
        session.expires = expires;
        this.store.set(id, session)
        callback();
    }

    get(id, callback) {
        const session = this.store.get(id);

        if (session) {
            const now = new Date();

            if (session.expires < now) {
                this.store.delete(id);
                callback(null);
            }
            else
                callback(session);
        }
        else
            callback(null);
    }

    destroy(id, callback) {
        this.store.delete(id);
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
		const now = new Date();

		Array.from(this.store, ([key, value]) => {
			if (now > value.expires) this.store.delete(key);
		});
    }
}

module.exports = SessStore;