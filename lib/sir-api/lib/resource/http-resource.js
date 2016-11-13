export default (endpoint, subject, after) => {
  return Rx.Observable
    .of(endpoint)
    .delay(after)
    .flatMap(url =>
      fetch(url, {credentials: 'include'})
        .then(r => r.json())
        .then(r => subject.next({response: Either.Right(r), last: after}))
        .catch(e => subject.next({response: Either.Left(e), last: after}))
    );
}
