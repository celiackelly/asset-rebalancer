import fetch from 'node-fetch';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path: './config/.env'})


const apiKey = process.env.TWELVE_DATA_API_KEY

//add error handling
async function getCurrentPrices(tickers) {
    const twelveDataURL = `https://api.twelvedata.com/price?symbol=${tickers}&apikey=${apiKey}`

    try {
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
    } catch(err) {
        console.log(err)
    }
}


//add error handling
async function getStockInfo(ticker) {
    const twelveDataURL = `https://api.twelvedata.com/symbol_search?symbol=${ticker}&apikey=${apiKey}`

    const response = await fetch(twelveDataURL);
    const data = await response.json();

    return data
}

// let thisSearch = await getCurrentPrices(['VTI', 'VXUS', 'BND'])
// console.log(thisSearch)

// const myTestFunction = async () => {
//     const search = await getCurrentPrices(['VFAIX'])
//     console.log(search['VFAIX'])
// }

export { getCurrentPrices, getStockInfo };

