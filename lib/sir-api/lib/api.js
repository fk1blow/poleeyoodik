import Maybe from 'data.maybe';
import SubscriptionManager from './subscription-manager';
import Periodical from './periodical';
import {HttpResource} from './resource';

export default {
  /**
   *  Creates a periodical http task, runs at specific intervals or (re)tries to
   *  resolve the resource to a value. The periodical will drain the value from
   *  the resource with a strict number of repetitions.
   *
   *  _It shouldn't retry indefinetely, but with a clear and finite strategy_
   *
   *  old version: `poll(resource, opts)`
   *
   *  periodicalHttp :: JSON -> JSON -> Observable
   */
  //  {
  periodicalHttp(resource_path, opts) {
    return SubscriptionManager
      .subscription(resource_path)
      .map(item => item)
      .orElse(() =>
        SubscriptionManager.create(
          resource_path,
          Periodical.create(HttpResource, opts)))
      .get();
  }
}
