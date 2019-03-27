import {observable, computed, autorun, when} from 'mobx';

class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();

    @observable string = 'hello';
    @observable number = 20;
    @observable bool = false;

    @computed get mixed() {
        return store.string + '/' + store.number;
    }
}

// computed
var store = new Store();
var foo = computed(function() {
    return store.string + '/' + store.number;
});

foo.observe(function(change) {
    console.log(change);
});
store.string = 'world';
store.number = 30;
// ComputedValue$$1 {dependenciesState: -1, observing: Array(0), newObserving: null, isBeingObserved: false, isPendingUnobservation: false, …}
// hello/20
console.log(foo.get());

// autorun
autorun(() => {
    // world/30
    console.log(store.string + '/' + store.number);
});
