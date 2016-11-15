import Maybe from 'data.maybe';
import Manager from './subscription-manager';
import Periodical from './periodical';
import Resource from './resource';

export default {
  /**
   *  Creates a periodical http task, runs at specific intervals or (re)tries to
   *  resolve the resource to a value. The periodical will drain the value from
   *  the resource with a strict number of repetitions.
   *
   *  run :: JSON -> JSON -> Observable
   */
  run({url, params = {}}, strategy) {
    return Manager
      .subscription(url)
      .map(item => item)
      .orElse(() =>
        Manager.create(url,
          Periodical.create(Resource.fetch(url, params), strategy)))
      .get();
  }
}
