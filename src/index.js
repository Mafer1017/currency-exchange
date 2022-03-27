import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CurrencyExchange from './js/currency-exchange';


function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
}

function getElements (response, input) {
  if (response) {
    const conversion = (response.conversion_rate * input).toFixed(2);
    $('#exchange-result').append(`USD is worth ${conversion} ${location}.<br>`);
  } else {
    $('.show-errors').text('There was an error: ${response}');
  }
}

async function makeApiCall(differentCurrency, input, currency) {
  const response = await CurrencyExchange.exchangeCurrency(differentCurrency);
  getElements(response, input, currency);
}

$(document).ready(function() {
  $('#makeExchange').click(function() {
    event.preventDefault();
    let location = $('#location').val();
    clearFields();
    makeApiCall(location);
    $('#exchange-result').show();
    $('#show-errors').show();
  });
});