const utils = {
    getUserInfo: () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            return userInfo;
        } else {
            return;
        }
    },

    authHeader: () => {
        const userInfo = utils.getUserInfo();
        if (userInfo) {
            return {
                Authorization: 'Bearer ' + userInfo.token,
                'Content-Type': 'application/json'
            };
        } else {
            return {};
        }
    }
};

module.exports = utils;
