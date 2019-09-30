const https = require('https');
const { Database } = require("../src/db/Database");
const { UserService } = require("../src/services/UserService");

const db = new Database();
const userService = new UserService(db);

async function getData(pageNumber) {
    let data = '';
    const req = await https.get(`https://reqres.in/api/users?page=${pageNumber}`, res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', d => {
            data += d.toString();
        });
        res.on('end', async function () {
            const userData = JSON.parse(data);
            await Promise.all([userData.data.forEach((user) => userService.createUser(user))]);
            if(userData.total_pages > pageNumber) await getData(++pageNumber);
        });
    });

    req.on('error', error => {
        console.error(error)
    });

    req.end();
}

getData(1).then(r => {console.log("FETCH DATA COMPLETED")});

