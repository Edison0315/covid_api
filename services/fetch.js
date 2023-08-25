const axios = require('axios')

/**
 * @param String method
 * @param String url
 * @return JSON response || Error
*/
const fetch = async(method, url) => {

  try {

    const res = axios({ method, url
    }).then((rs) => {
      return rs.data
    });

    return res

  } catch (error) {
		console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

module.exports = {
  fetch
};
