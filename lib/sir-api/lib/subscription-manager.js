import Maybe from 'data.maybe';
import Either from 'data.either';

const SubscriptionStore = {};

function subscription(id) {
  return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing();
}

function create(id, sub) {
  return subscription(id)
    .map(item => Either.Left())
    .orElse(() => Either.Right(SubscriptionStore[id] = sub));
}

export default {subscription, create}
