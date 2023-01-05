const express = require('express');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const moment = require('moment');
const { isUint32Array, isInt32Array } = require('util/types');
var app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var result = {
    status: 0,
    message: "",
    list: [],
};

var listDataJson = readFile();

function validate(req) {

    var errMsg = "";
    if (req.body.first_name.trim() == "") {
        errMsg += "<li>Firstname is required!</li> \n";
    }

    if (req.body.last_name.trim() == "") {
        errMsg += "<li>Lastname is required!</li> \n";
    }

    if (req.body.birthday == "") {
        errMsg += "<li>Birthday is required!</li> \n";
    }

    if(req.body.gender == "") {
        errMsg += "<li>Please select gender!</li>";
    }

    if (!moment(req.body.birthday, "YYYY-MM-DD").isValid()) {
        errMsg += "<li>Invalid Birthday!</li> \n";
    }

    if (!req.body.email.includes("@")) {
        errMsg += "<li>Invalid email address</li>";
    }
    if (req.body.mobileno.match(/^[0-9]+$/) == null) {
        errMsg += "<li>Mobile # is incorrect format</li>";
    }
    
    if (req.body.mobileno.length != 11) {
        errMsg += "<li>Mobile # invalid</li>";
    }
    return errMsg;


}

app.post('/person', function (req, res) {


    //    let dataObj = req.body;
    console.log(req.body);
    // console.log(dataObj);

    var errMsg = validate(req);
    if (errMsg != "") {
        result.status = 0;
        result.message = errMsg;
    }
    else {
        let newPerson = {
            id: listDataJson.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            age: 0,
            email: req.body.email,
            mobileno: req.body.mobileno,
            isFilipino: req.body.isFilipino
        };
        newPerson.age = moment().diff(newPerson.birthday, 'years');

        listDataJson = readFile();
        listDataJson.push(newPerson);
        writeFile(JSON.stringify(listDataJson)); result.status = 1;
        result.message = "Successfully Inserted New Person";
        result.list = listDataJson;
    }
    res.send(result);

});

app.get('/person', (req, res) => {
    listDataJson = readFile();
    result.status = 1;
    result.message = "Displaying all person";
    result.list = listDataJson;
    res.send(result);
});

// app.get('/person/:id', (req, res) => {
//     var id = req.params.id;

//     result.status = 1;
//     result.message = "Displaying person with id " + id;
//     result.list = listDataJson.filter((item) => {
//         return +item.id == +id; // Note: + before variable means casting string value into integer
//     });

//     res.send(result);

// });






app.get('/person/:searchstr', (req, res) => {
    var searchstr = req.params.searchstr;

    result.status = 1;
    result.message = "Displaying person with " + searchstr;
    result.list = listDataJson.filter((item) => {
        return (+item.id == +searchstr || 
                item.first_name.toLowerCase().includes(searchstr) || 
                item.last_name.toLowerCase().includes(searchstr) ||
                item.gender.toLowerCase().includes(searchstr) ||
                item.birthday.toLowerCase().includes(searchstr)
                ); // Note: + before variable means casting string value into integer
    });

    res.send(result);

});


app.put('/person/:id', (req, res) => {
    var id = req.body.id;

    var errMsg = validate(req);
    if (errMsg != "") {
        result.status = 0;
        result.message = errMsg;
    }
    else {
        result.status = 1;
        result.message = "Updating person with id  " + id;
        let updatedList = listDataJson.map((item) => {
            if (+item.id == +id) {
                item.first_name = req.body.first_name;
                item.last_name = req.body.last_name;
                item.birthday = req.body.birthday;
                item.gender = req.body.gender;
                item.age = moment().diff(item.birthday, 'years');
                item.email = req.body.email;
                item.mobileno = req.body.mobileno;
                item.isFilipino = req.body.isFilipino;
            }
            return item;
        });
        result.list = updatedList;
        writeFile(JSON.stringify(updatedList));

    }
    res.send(result);
});

app.delete('/person/:id', (req, res) => {
    var id = req.body.id;


    let newList = listDataJson.filter((item) => {
        return +item.id != +id;
    });
    // reindex ids
    let i = 1;
    newList = newList.map((item) => {
        item.id = i++;
        return item;
    });

    result.status = 1;
    result.message = "Deleting person with id " + id;
    result.list = newList;
    writeFile(JSON.stringify(newList));
    res.send(result);

});


function writeFile(data) {
    fs.writeFile("database/person-list.json", data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function readFile() {
    let listDataRaw = fs.readFileSync("database/person-list.json");
    return JSON.parse(listDataRaw);

}

app.listen(3000, () => console.log('Listening to port 3000'));


