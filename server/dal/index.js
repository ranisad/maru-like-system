const promise = require('promise');

module.exports = class DBData {
    getDriver() {
        return new promise((resolve, reject) => {
            connection.query("select id as value, driver_name as name from driver", (error, results, fields) => {
                if (error)
                    reject(error);
                resolve(results);
            })
        })
    }

    getCity() {
        return new Promise((resolve, reject) => {
            connection.query("select * from city where is_active = 1", (error, results, fields) => {
                if (error)
                    reject(error)
                resolve(results)
            })
        })
    }

    assignSlot(obj) {
        console.log(obj)
        return new Promise((resolve, reject) => {
            connection.query("call assign_time_slot(?,?,?,?,?)", [obj.p_date,obj.driver,obj.city,obj.starttime,obj.endtime], (error, results, fields) => {
                if (error)
                    reject(error)
                resolve(results)
            })
        })
    }

    getDashboardDataByCityId(cityId){
        return new Promise((resolve, reject) => {
            connection.query("call get_dashboard_data_by_cityid(?)", [cityId], (error, results, fields) => {
                if (error)
                    reject(error)
                resolve(results)
            })
        })
    }

    getDashboardDataByDriverId(driverId){
        return new Promise((resolve, reject) => {
            connection.query("call get_dashboard_data_by_driver(?)", [driverId], (error, results, fields) => {
                if (error)
                    reject(error)
                resolve(results)
            })
        })
    }
}