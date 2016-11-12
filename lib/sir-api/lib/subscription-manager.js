import Maybe from 'data.maybe';
import Either from 'data.either';
import Rx from 'rxjs';

const SubscriptionStore = {};

function subscription(id) {
  return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
}

function create(id) {
  return subscription(id)
    .orElse(() => Either.Right(SubscriptionStore[id] = new Rx.BehaviorSubject()));
}

export default {subscription, create}
