

function convert() {
    console.log('start convert')
    let lines = document.getElementById("sqlLog").value.split("\n")
    let list = []
    let sqlmap = {}
    const preparingPrefix = "Preparing: "
    const paramPrefix = "Parameters: "
    for (let line of lines) {
        let preIndex = line.indexOf(preparingPrefix)
        if (preIndex != -1) {
            sqlmap = {}
            sqlmap.preparing = line.substring(preIndex + preparingPrefix.length)
        }

        let paramIndex = line.indexOf(paramPrefix)
        if (paramIndex != -1) {
            sqlmap.param = line.substring(paramIndex + paramPrefix.length)
            list.push(sqlmap)
        }
    }

    let sqlList = []
    for (let data of list) {
        let preparing = data.preparing
        let params = data.param.split(",")
        for (let p of params) {
            let ptrim = p.trim()
            let pv = ptrim.substring(0, ptrim.indexOf("("))
            let pt = ptrim.substring(ptrim.indexOf("(") + 1, ptrim.indexOf(")"))
            switch(pt) {
                case "Integer":
                case "Long":
                case "BigDecimal":
                    break
                default:
                    pv = "'" + pv + "'"
            }

            preparing = preparing.replace('?', pv)
        }
        sqlList.push(preparing)
    }
    document.getElementById("resultSql").innerHTML = sqlList.join('\n')
}

document.getElementById('convert').addEventListener('click', convert);