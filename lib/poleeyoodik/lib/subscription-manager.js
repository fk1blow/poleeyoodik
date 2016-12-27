import Maybe from 'data.maybe';

const SubscriptionStore = {};

export default {
  subscription(id) {
    return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
  },

  create(id, sub) {
    return Maybe.of(SubscriptionStore[id] = sub);
  }
}
