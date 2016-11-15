import Rx from 'rxjs';
import Either from 'data.either';

export default (url, params = {}) => {
  return (subject, last) =>
    Rx.Observable
      .of(url)
      .delay(last)
      .flatMap(url =>
        fetch(url, {credentials: 'include'})
          .then(r => r.json())
          .then(r => subject.next({response: Either.Right(r), last}))
          .catch(e => subject.next({response: Either.Left(e), last})))
}
