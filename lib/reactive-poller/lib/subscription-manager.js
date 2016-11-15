import Maybe from 'data.maybe';
import Either from 'data.either';

const SubscriptionStore = {};

export default {
  subscription(id) {
    return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
  },

  create(id, sub) {
    return Maybe.of(SubscriptionStore[id] = sub);
  }
}
