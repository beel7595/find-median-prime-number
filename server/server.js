const express = require('express')
const app = express()
const port = 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/getResult', (req, res) => {
    let { number } = req.body;
    if (!checkIsInteger(number)) {
        res.send(initRet(null, 1, "not a integer"));
        return;
    }
    number = Number(number);
    if (number < 2) {
        res.send(initRet(null, 1, "no prime"));
        return;
    }

    const medianArr = (getMedianArr(getPrimeArrByNumber(number)));
    res.send(initRet(medianArr, 0, "sucess"));
})

const getPrimeArrByNumber = (number) => {
    const arr = Array.from(new Array(number + 1).keys()).slice(2);
    const primeArr = arr.filter((a) => {
        let len = Math.sqrt(a);
        for (let i = 2; i <= len; i++) {
            if (a % i == 0) return false
        }
        return true;
    });
    return primeArr;
}

const getMedianArr = (arr) => {
    if (arr.length % 2 == 0) {
        return arr.splice(arr.length / 2 - 1, 2);
    } else {
        return arr.splice(arr.length / 2, 1);
    }
};


const checkIsInteger = (value) => {
    return !isNaN(value) && Number.isInteger(Number(value));
}

const initRet = (data, code, msg) => {
    return {
        data: data,
        code: code,
        msg: msg
    }
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = {
    getPrimeArrByNumber,
    getMedianArr,
    checkIsInteger
};