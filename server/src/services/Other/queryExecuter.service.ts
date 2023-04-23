import conn from '../../config/dbConnection'

const executeQuery = async (databaseQuery: string) => {
    try {
        var responseData:any;
        await new Promise((resolve, reject) => {
            conn.query(databaseQuery, function (err: any, data: string) {
                if (err) return reject(err)
                resolve(data)
                responseData = data
            })
        })
        return responseData
    }
    catch (err: any) {
        throw new Error(err)
    }
}

export = executeQuery