import Rx from 'rxjs';
import Maybe from 'data.maybe';
import SubscriptionManager from './subscription-manager';
import PeriodicalHttp from './periodical-http';

export default {
  poll(resource, opts) {
    return SubscriptionManager
      .subscription(resource)
      .map(item => item)
      .orElse(() => {
        const sub = PeriodicalHttp.create(resource, opts)
        return SubscriptionManager.create(resource, sub)
      })
      .get();
  }
}
