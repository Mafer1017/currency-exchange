export default class CurrencyExchange {
  static async exchangeCurrency(location) {
    try {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${location}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}