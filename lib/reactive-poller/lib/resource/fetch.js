import Rx from 'rxjs';
import Either from 'data.either';

export default (url, params = {}) => {
  return (subject, strategy) =>
    Rx.Observable
      .of(url)
      .delay(strategy.interval)
      .flatMap(url =>
        fetch(url)
          .then(r => r.json())
          .then(r => subject.next({response: Either.Right(r), strategy}))
          .catch(e => subject.next({response: Either.Left(e), strategy})))
}
