// Front - end code

const BACKEND_URL = "http://localhost:3000";

function loadList() {
  $.ajax(
    BACKEND_URL + "/person", // request url
    {
      type: "GET",
      success: function (data, status, xhr) {
        console.log(data);
        for (let person of data.list) {
          // console.log(person);
<<<<<<< HEAD
          var imnotarobot = "";
          if (person.imnotarobot == "true") {
            imnotarobot="checked";
          }
=======
          var $checked = "";
          if(person.isFilipino == "true")
          {
            $checked = "checked";
          }  
>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
          let rowHtml = `<tr>
                <td><a href="form.html?id=${person.id}">${person.id}</a></td>
                <td>${person.first_name}</td>
                <td>${person.last_name}</td>
<<<<<<< HEAD
                <td>${person.datepicker}</td>
                <td>${person.Gender}</td>
                <td><input type="checkbox" ` + imnotarobot + `></td>
=======
                <td>${person.birthday}</td>
                <td>${person.age}</td>
                <td>${person.gender}</td>
                <td>${person.email}</td>
                <td>${person.mobileno}</td>
                <td><input type="checkbox" ` + $checked + ` disabled/></td>
>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
                <td><button onclick="deletePerson(${person.id}, '${person.first_name}')">Delete</button></td>
            </tr>`;
          $("#table1 > tbody").append(rowHtml);
        }
      },
    }
  );
}

function goto(url) {
  window.location = url;
}

function save() {
  // alert("clicked save()");
  let id = $("input[name=id]").val();
  let first_name = $("input[name=first_name]").val();
  let last_name = $("input[name=last_name]").val();
<<<<<<< HEAD
  let datepicker = $("input[name=datepicker]").val();
  let Gender = $("#Gender").val();
  let errorMessage = "";
  let imnotarobot = $("#imnotarobot").prop("checked");
  $("#errorMessage").html("");

  if (first_name.trim() == "") {
    $("#errorMessage").html("firstname is empty");
  } else if (last_name.trim() == "") {
    $("#errorMessage").html("lastname is empty");
  } else if (datepicker.trim() == "") {
    $("#errorMessage").html("date is required");
  } else if (Gender.trim() == "n/a") {
    $("#errorMessage").html("Gender is required");
  } else if (!imnotarobot) {
    $("#errorMessage").html("Robot is not allowed");
  }
   else {
    let action = +id > 0 ? "put" : "post";
    let url = +id > 0 ? id : "";
    errorMessage = "";

    var postData = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      datepicker: datepicker,
      Gender: Gender,
      imnotarobot: imnotarobot,
      errorMessage: errorMessage,
    };

    $.ajax(
      //BACKEND_URL + "/person", // request url
      {
        url: BACKEND_URL + "/person/" + url,
        type: action,
        data: postData,
        success: function (data, status, xhr) {
          // console.log(data);
          if (data.status == 1) {
            console.log(postData);

            goto("index.html");
          }
        },
      }
    );
  }

  // let action = +id > 0 ? "update" : "insert";
=======
  let gender = $("#gender").val();
  let birthday = $("#birthday").val();
  let email = $("#email").val();
  let mobileno = $("#mobileno").val();
  let isFilipino = $("#isFilipino").prop('checked');
  // let action = +id > 0 ? "update" : "insert";
  let action = +id > 0 ? "put" : "post";
  let url = +id > 0 ? id : "";
  var postData =
  {
    id: id,
    first_name: first_name,
    last_name: last_name,
    birthday: birthday,
    gender: gender,
    email: email,
    mobileno: mobileno,
    age: 0,
    isFilipino: isFilipino
  };


  $.ajax(
    //BACKEND_URL + "/person", // request url
    {
      url: BACKEND_URL + "/person/" + url,
      type: action,
      data: postData,
      success: function (data, status, xhr) {
        // console.log(data);
        if (data.status == 1) {

          console.log(postData);
          goto('index.html');
        }
        else
        {
          console.log(data);
              $("#errorMsg").html("<span>" + data.message + "</span>");
        }
      }

      ,
    }
  );
>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
}

function readyForm() {
  const urlParams = new URLSearchParams(window.location.search); // <= to get the param `id`
  let id = urlParams.get("id");

  // view
  if (+id > 0) {
    $.ajax(
      BACKEND_URL + "/person/" + id, // request url
      {
        success: function (data, status, xhr) {
          console.log(data);
          let person = data.list[0];
          if (person) {
            $("input[name=id]").val(person.id);
            $("input[name=first_name]").val(person.first_name);
            $("input[name=last_name]").val(person.last_name);
<<<<<<< HEAD
            $("#datepicker").val(person.datepicker);
            $("#Gender").val(person.Gender);
            $("#imnotarobot").prop("checked", person.imnotarobot ? true:false);
=======
            $("#birthday").val(person.birthday);
            $("#gender").val(person.gender);
            $("#email").val(person.email);
            $("#mobileno").val(person.mobileno);
            $("#isFilipino").prop('checked', person.isFilipino == 'true'? true : false);
            
>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
          }
        },
      }
    );
  }
}

function searchById() {
  let id = $("input[name=personId]").val();
  let url = "";

  if (id != "") {
    url = id;
  }
  $.ajax(
<<<<<<< HEAD
=======

>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
    BACKEND_URL + "/person/" + url, // request url

    {
      type: "GET",
      success: function (data, status, xhr) {
        console.log(data);
        $("#table1 > tbody").html("");
        for (let person of data.list) {
          // console.log(person);

<<<<<<< HEAD
=======
          let rowHtml = `<tr>
                <td><a href="form.html?id=${person.id}">${person.id}</a></td>
                <td>${person.first_name}</td>
                <td>${person.last_name}</td>
                <td><button onclick="deletePerson(${person.id}, '${person.first_name}')">Delete</button></td>
            </tr>`;
          $("#table1 > tbody").append(rowHtml);
        }
      },
    }
  );
}

function searchByAny() {

  let searchstr = $("input[name=personId]").val();
  let url = "";

  if (searchstr != "") {
    url = searchstr;
  }
  $.ajax(

    BACKEND_URL + "/person/" + url, // request url

    {
      type: 'GET',
      success: function (data, status, xhr) {
        console.log(data);
        $("#table1 > tbody").html("");
        for (let person of data.list) {
          // console.log(person);

>>>>>>> e5f854aaff71109ac94c9cf9c7da6b6b07c1bab1
          let rowHtml = `<tr>
                <td><a href="form.html?id=${person.id}">${person.id}</a></td>
                <td>${person.first_name}</td>
                <td>${person.last_name}</td>
                <td>${person.datepicker}</td>
                <td>${person.Gender}</td>
                <td><button onclick="deletePerson(${person.id}, '${person.first_name}')">Delete</button></td>
            </tr>`;
          $("#table1 > tbody").append(rowHtml);
        }
      },
    }
  );
}

function deletePerson(id, firstName) {
  // console.log("deleting id: " + id, firstName);
  var confirmation = confirm(
    "Are you sure you want to delete " + firstName + "?"
  );

  // view
  if (confirmation) {
    $.ajax(
      BACKEND_URL + "/person/" + id, // request url
      {
        type: "DELETE",
        data: { id: id, first_name: firstName },
        success: function (data, status, xhr) {
          // console.log("deleted!");
          if (data.status == 1) {
            $("#table1 > tbody").html("");
            loadList();
          }

          // let person = data.list[0];
          // if (person) {
          //   $("input[name=id]").val(person.id);
          //   $("input[name=first_name]").val(person.first_name);
          //   $("input[name=last_name]").val(person.last_name);
          // }
        },
      }
    );
  }
}

function exportExcel() {
  window.open(BACKEND_URL + "?action=download-excel");
}
