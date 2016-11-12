import Maybe from 'data.maybe';
import Either from 'data.either';

const SubscriptionStore = {};
window.sx = SubscriptionStore

function subscription(id) {
  return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
}

function create(id, sub) {
  // return subscription(id)
  //   .orElse(() => Either.Right(SubscriptionStore[id] = new Rx.BehaviorSubject()));
  return Maybe.of(SubscriptionStore[id] = sub);
}

export default {subscription, create}
