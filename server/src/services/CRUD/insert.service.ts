import executeQuery from "../Other/queryExecuter.service";


const insertData = (tableName: string, columnNames: string[], valueArr: string[]) => {

    try {
        let newValue: string = "";
        for (let i = 0; i < valueArr.length; i++) {
            if (i == valueArr.length - 1) {
                newValue = newValue.concat(`"`, valueArr[i], `"`)
            } else {
                newValue = newValue.concat(`"`, valueArr[i], `"`, `,`)
            }
        }

        let insertQuery = `insert into ${tableName}(${columnNames})values(${newValue})`

        executeQuery(insertQuery)

    }
    catch (err:any) {
        throw new Error(err)
    }
}

export = insertData