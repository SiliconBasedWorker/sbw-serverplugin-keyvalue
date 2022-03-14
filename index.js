const fs_extra = require("fs-extra");
const fs = require("fs");
const { join } = require("path");

const kvList = [];

class KVGroup {
    constructor(dataFileDirPath, appName) {
        this.dataFilePath = join(dataFileDirPath, `${appName}.json`);
        this.data = {};
        fs_extra.ensureFileSync(this.dataFilePath);
        this.loadFromFile()
        kvList.push(this)
    }

    getData(key, defaultValue = "") {
        return this.data[key] || defaultValue
    }

    setData(key, value) {
        this.data[key] = value
    }

    getEntityList() {
        let l = []
        for (let k in this.data) {
            l.push({
                key: k,
                value: this.data[k]
            })
        }
        return l
    }

    loadFromFile() {
        try {
            let json = JSON.parse(fs.readFileSync(this.dataFilePath));
            this.toObjectFromJsonObject(json)
        } catch (error) {
            console.log("data file is not exists or blank");
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.toJsonObjectFromObject()));
        } catch (error) {
            console.log(error);
        }
    }

    toJsonObjectFromObject() {
        return this.data
    }

    toObjectFromJsonObject(jsonData) {
        try {
            this.data = jsonData;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    KVGroup,
    kvList
}