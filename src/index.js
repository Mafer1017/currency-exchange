import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import CurrencyExchange from './js/currency-exchange';


function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
}

function getElements (response, amount, currencyCode) {
  if (response) {
    const conversion = (response.conversion_rate * amount).toFixed(2);
    console.log(response, conversion)
    $('.exchange-result').append(`USD is worth ${conversion} ${currencyCode}.<br>`);
  } else {
    $('.show-errors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(amount, currencyCode) {
  const response = await CurrencyExchange.exchangeCurrency(currencyCode);
  getElements(response, amount, currencyCode);
}

$(document).ready(function() {
  $('#makeExchange').click(function() {
    let amount = $('#amount').val();
    let currencyCode = $('#currencyCode').val();
    clearFields();
    makeApiCall(amount, currencyCode);
    $('#exchange-result').show();
    $('#show-errors').show();
  });
});