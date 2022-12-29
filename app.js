const express = require('express');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
var app = express();




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var result = {
    status: 0,
    message: "",
    list: [],
};


let listDataRaw = fs.readFileSync("database/person-list.json");
listDataJson = JSON.parse(listDataRaw);

app.post('/person', function (req, res) {


   //    let dataObj = req.body;
    console.log(req.body);
    // console.log(dataObj);
    let newPerson = {
        id: listDataJson.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    listDataJson.push(newPerson);
    writeFile(JSON.stringify(listDataJson));
    result.status = 1;
    result.message = "Inserting new person";
    result.list = listDataJson;
    res.send(result);

});

app.get('/person', (req, res) => {
    let listDataRaw = fs.readFileSync("database/person-list.json");
    listDataJson = JSON.parse(listDataRaw);
    result.status = 1;
    result.message = "Displaying all person";
    result.list = listDataJson;
    res.send(result);
});

app.get('/person/:id', (req, res) => {
    var id = req.params.id;

    result.status = 1;
    result.message = "Displaying person with id " + id;
    result.list = listDataJson.filter((item) => {
        return +item.id == +id; // Note: + before variable means casting string value into integer
    });

    res.send(result);

});


app.put('/person/:id', (req, res) => {
    var id = req.body.id;
    result.status = 1;
    result.message = "Updating person with id  " + id;
    let updatedList = listDataJson.map((item) => {
        if (+item.id == +id) {
            item.first_name = req.body.first_name;
            item.last_name = req.body.last_name;
        }
        return item;
    });
    result.list = updatedList;
    writeFile(JSON.stringify(updatedList));
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

app.listen(3000, () => console.log('Listening to port 3000'));


