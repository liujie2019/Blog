function getStockSymbol(name) {
	return name + '1';
}
function getStockPrice(symbol) {
	return symbol + '2';
}
//异步函数
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('google').then((result) => {
  console.log(result);
});