import Manager from './subscription-manager';
import Periodical from './periodical';
import {prepareFetch} from './resource';

export default {
  // run :: Object -> Object -> Observable
  run({url, params = {}}, strategy) {
    return Manager
      .subscription(url)
      .orElse(() =>
        Manager.create(url, Periodical(prepareFetch(url, params), strategy)))
      .get();
  }
}
