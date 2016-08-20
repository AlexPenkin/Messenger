'use strict'

const $input = $('#search');
const $results = $('#results');
console.log($input);

var keyups = Rx.Observable.fromEvent($input, 'keyup')
  .pluck('target', 'value')
  .filter(text => text.length >= 1);

var debounced = keyups
  .debounce(200);

var distinct = debounced
  .distinctUntilChanged();

function searchUser(term) {
  console.log('we here');
  return $.ajax({
    url: '/searchUser',
    method: 'POST',
    data: {    
      search: term
    }
  }).promise();
}

var suggestions = distinct
  .flatMapLatest(searchUser);


suggestions.subscribe(
  data => {
    console.log(data);
    $results
      .empty();
      for(let i = 0; i < data.length; i++) {
        $results.append(`<a style = "display: block;"href ="/user/${data[i]}">${data[i]}</a>`)
      }

  },
  error => {
    $results
      .empty()
      .append($('<li>'))
      .text('Error:' + error);
  });
