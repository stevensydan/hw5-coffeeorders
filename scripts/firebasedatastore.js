(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class FireBaseDataStore {
        constructor() {
            console.log('running the FireBaseDataStore function');
            firebase.initializeApp(window.FireBaseConfig);
            this.db = firebase.firestore();
            this.getAll()
                .then(d => {
                    console.log(`d: ${JSON.stringify(d)}`)
                });
        }
        async add(key, val) { return this.db.collection(`coffeeorders`).add(val); }
        async get(email, cb)  { 
            const docRef = this.db.collection(`coffeeorders`);
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.db.collection(`coffeeorders`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(email)   { 
            const docRef = await this.db.collection(`coffeeorders`);
            const batch = this.db.batch();
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
    }
    App.FireBaseDataStore = FireBaseDataStore;
    window.App = App;

})(window);