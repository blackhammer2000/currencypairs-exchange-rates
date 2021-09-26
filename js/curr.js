const tableContainer = document.querySelector("[data-table-container]");
const bidCurrencies = ["USD", "EUR", "CHF", "JPY", "NZD", "CAD", "GBP", "AUD"];
const askCurrencies = bidCurrencies.reverse();

//GO TO 'OANDA.COM, REGISTER FOR AN ACCOUNT,
// GET YOUR API KEY, WHICH GIVES YOU A LIMIT OF ONLY 1000 REQUESTS TO THEIR API ,
//AND PASTE IT  IN THE API KEY VARIABLE.

for (const buy of bidCurrencies) {
  for (const sell of askCurrencies) {
    function exchange() {
      const API_KEY = "hG4zpDl68CjYrmgJmOTm6DHn";
      const EXCHANGE_RATES_API = `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=${API_KEY}&base=${buy}&quote=${sell}`;
      if (buy === sell) return;
      fetch(EXCHANGE_RATES_API)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //console.log(data);
          const { base_currency, quote_currency, bid, ask } = data.quotes[0];
          const row = document.createElement("div");
          row.classList.add("row");
          row.innerHTML = `
            <div class="col-lg-2 bg-dark border-white border p-md-3 text-center text-warning">
                  ${base_currency}/${quote_currency}
            </div>
            <div class="col-lg-5 bg-dark border border-white p-md-3 text-xl-center text-success">
                  ${bid}
            </div>
            <div class="col-lg-5 bg-dark border border-white p-md-3 text-xl-center text-danger">
                  ${ask}
            </div>
          `;
          tableContainer.append(row);
        })
        .catch((err) => console.error(err));
    }
    exchange();
  }
}
