import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CurrencyExchange from './js/currency-exchange';


function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
}

function getElements (response, input, location) {
  if (response) {
    const conversion = (response.conversion_rate * input).toFixed(2);
    $('#exchange-result').append(`USD is worth ${conversion} ${location}.<br>`);
  } else {
    $('.show-errors').text('There was an error: ${response}');
  }
}

async function makeApiCall(location, input, currency) {
  const response = await CurrencyExchange.exchangeCurrency(location, input, currency);
  getElements(response, input, currency);
}

$(document).ready(function() {
  $('#makeExchange').click(function() {
    let location = $('#location').val();
    let currencyCode = $('#currencyCode').val;
    clearFields();
    makeApiCall(location, currencyCode);
    $('#exchange-result').show();
    $('#show-errors').show();
  });
});