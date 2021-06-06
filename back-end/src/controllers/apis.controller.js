const axios = require('axios');
const { main_labels } = require('../consts');
const apisController = {};

apisController.emotionKeywords = async (req, res) => {
    try {
        const { sentence } = req.body;
        const response = await axios.post(`${process.env.EMOTIONALKEYWORDS_URI}`, { sentence });
        if (response.data) {
            const wordProcess = sentence.split(" ").map((word) => {
                const [k, v] = Object.entries(response.data).find(([k]) => ( word === k ));
                if (v === 'stopword' || v === 'neutral') {
                    return {
                        keyword: k,
                        emotion: v,
                        color: 'black'
                    };
                } else {
                    const { color } = main_labels.find(({ emotion }) => {
                        return (emotion === v);
                    })
                    return {
                        keyword: k,
                        emotion: v,
                        color
                    };
                }
            })
            return res
                .json({ status: 200, success: true, data: wordProcess })
        }
        return res
            .json({ status: 400, success: false, message: 'error' })
    } catch (error) {
        return res
            .json({ status: 500, success: false, error: error.message })
    }
}

module.exports = apisController;