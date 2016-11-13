import Maybe from 'data.maybe';
// import Either from 'data.either';

const SubscriptionStore = {};
window.sx = SubscriptionStore;

function subscription(id) {
  return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
}

function create(id, sub) {
  return Maybe.of(SubscriptionStore[id] = sub);
}

export default { subscription, create };
