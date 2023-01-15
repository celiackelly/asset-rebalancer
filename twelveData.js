import fetch from 'node-fetch';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path: './config/.env'})


const apiKey = process.env.TWELVE_DATA_API_KEY

//add error handling
async function getCurrentPrices(tickers) {
    const twelveDataURL = `https://api.twelvedata.com/price?symbol=${tickers}&apikey=${apiKey}`

    const response = await fetch(twelveDataURL);
    const data = await response.json();

    const reformattedData = {}
    if (tickers.length === 1) {
        const key = tickers[0];
        reformattedData[key] = parseFloat(data.price)
    } else if (tickers.length > 1) {
        for (let key in data) {
            reformattedData[key] = parseFloat(data[key].price)
        }
    }

    return reformattedData
}

// let thisSearch = await getCurrentPrices(['VTI', 'VXUS', 'BND'])
// console.log(thisSearch)

async function myTestFunction() {
    const search = await getCurrentPrices(['META'])
    console.log(search['META'])
}

// myTestFunction()

