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

const fetchResource = (endpoint, subject, after) => {
  return Rx.Observable
    .of(endpoint)
    .delay(after)
    .flatMap(url =>
      fetch(url, {credentials: 'include'})
        .then(checkStatus)
        .then(r => r.json())
        .then(r => subject.next({response: Either.Right(r), last: after}))
        .catch(e => subject.next({response: Either.Left(e), last: after}))
    );
}

export default {
  create(url, opts = {timeout: 5000, periodic: 5000, repetitions: 5}) {
    const periodical = new Rx.ReplaySubject(1);
    const initial = Rx.Observable
      .create(obs => connectObservable(fetchResource(url, periodical, opts.periodic)))
      .share()

    periodical.subscribe(
      ({response, last}) => {

        response
          .map(r => {
            connectObservable(fetchResource(url, periodical, opts.periodic));
          })
          .orElse(() => {
            connectObservable(fetchResource(url, periodical, last + opts.periodic));
          });
      },

      ({error, last}) => {
        console.log('something errord with: ', error);
      },

      () => {
        console.log('periodical complete');
      });

    return periodical
      .merge(initial)
      .map(({response, last}) => response.value);
  }
}
