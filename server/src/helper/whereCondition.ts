const whereCondition =  (columnNames: string[], columnValues: (string | number)[], and?:boolean) =>{
    let whereQuery:string = "";
    let columnLength = columnNames.length
    for(let i:number = 0; i<columnLength; i++){
        let tempCondition: string = ` ${columnNames[i]} ="${columnValues[i]}" ${i !== columnLength-1 ? `${and == true ? "and" : "or"}` : "" }`
        whereQuery += tempCondition
    }
    return whereQuery
}


export =  whereCondition