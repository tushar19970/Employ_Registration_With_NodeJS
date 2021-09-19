const jwt = require('jsonwebtoken')

const generatToken = (data) => {
    const  token = jwt.sign(data, 'Tushar')
    return token
}

const accessToken = (req, res, next) => {
    console.log(req.headers)
    const decoded = jwt.verify(token, 'Tushar')
    req.data = decoded
    next()
}

module.exports = {generatToken, accessToken}