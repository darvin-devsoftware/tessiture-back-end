const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    const result = jwt.sign(
        {
            id: user.id,
            email: user.email,
            rolId: user.rolId
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    console.log("Generated Access Token:", result);
    return result;
};

const generateRefreshToken = (user) => {
    const result = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
    console.log("Generated Refresh Token:", result);
    return result;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
