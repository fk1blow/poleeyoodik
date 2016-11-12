import Rx from 'rxjs';
import Either from 'data.either';

const connectObservable = (observable) => observable.publish().connect();

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const fetchResource = (endpoint, subjectTarget, after) => {
  return Rx.Observable
    .of(endpoint)
    .delay(after)
    .flatMap(url =>
      fetch(url, {credentials: 'include'})
        .then(checkStatus)
        .then(r => r.json())
        .then(r => subjectTarget.next({response: Either.Right(r), last: after}))
        .catch(e => subjectTarget.next({response: Either.Left(e), last: after}))
    )
}

export default {
  create(url, opts = {timeout: 5000, periodic: 5000, repetitions: 5}) {
    const periodical = new Rx.Subject();
    const target = new Rx.Subject();

    periodical.subscribe(
      ({response, last}) => {
        console.log('repeat')

        response
          .map(() => {
            target.next(response)
            connectObservable(fetchResource(url, periodical, opts.periodic))
          })
          .orElse(() =>
            connectObservable(fetchResource(url, periodical, last + opts.periodic)))
      },

      ({error, last}) => {
        target.error(error)
      },

      () => {
        console.log('periodical complete')
      });

    return Rx.Observable
      .create(obs => connectObservable(fetchResource(url, periodical, opts.periodic)))
      .merge(target)
      .share();
  }
}
