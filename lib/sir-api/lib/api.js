import Rx from 'rxjs';
import Maybe from 'data.maybe';
import SubscriptionManager from './subscription-manager';
import PeriodicalHttp from './periodical-http';

export default {
  poll(resource, opts) {
    return SubscriptionManager
      .subscription(resource)
      .map(item => item)
      .orElse(() =>
        SubscriptionManager.create(resource, PeriodicalHttp.create(resource, opts)))
      .get();
  }
}
