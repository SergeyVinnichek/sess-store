# sess-store
## Setup

$ npm install SergeyVinnichek/sess-store

```javascript
const SessStore = require('sess-store');
mySessionStore = new SessStore();
```

## Methods

Constructor parameters: (checkPeriod, expires).
CheckPeriod - interval for checking old sessions.
Expires - live time for session.

- `set(id, session, callback)` method to add session to store.

- `get(id, callback)` method to get session from store.

- `destroy(id, callback)` method to remove session from store.

- `startCheck()` method to start timer for old session removing.

- `shrinkStore()` method to remove old sessions.

# Author

Sergey Vinnichek

# License

MIT
