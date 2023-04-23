import executeQuery from "../Other/queryExecuter.service";


const updateData = (tableName: string, columnNames: string[], valueArr: string[], updateWhereCondition: string) => {

    try {
        let setCondtions: string = "";
        for (let i = 0; i < valueArr.length; i++) {
            if (i == valueArr.length - 1) {
                setCondtions = setCondtions.concat(`${columnNames[i]} = `, `"`, valueArr[i], `"`)
            } else {
                setCondtions = setCondtions.concat(`${columnNames[i]} = `,`"`, valueArr[i], `"`, `,`)
            }
        }

        let updateQuery = `update ${tableName} set ${setCondtions} where ${updateWhereCondition}`

        executeQuery(updateQuery)

    }
    catch (err:any) {
        return ({err: err.message})
    }
}

export = updateData