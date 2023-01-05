// Front - end code

const BACKEND_URL = "http://localhost:3000";

function loadList() {
  $.ajax(
    BACKEND_URL + "/person", // request url
    {
      type: 'GET',
      success: function (data, status, xhr) {
        console.log(data);
        for (let person of data.list) {
          // console.log(person);
          var $checked = "";
          if(person.isFilipino == "true")
          {
            $checked = "checked";
          }  
          let rowHtml = `<tr>
                <td><a href="form.html?id=${person.id}">${person.id}</a></td>
                <td>${person.first_name}</td>
                <td>${person.last_name}</td>
                <td>${person.birthday}</td>
                <td>${person.age}</td>
                <td>${person.gender}</td>
                <td>${person.email}</td>
                <td>${person.mobileno}</td>
                <td><input type="checkbox" ` + $checked + ` disabled/></td>
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
            $("#birthday").val(person.birthday);
            $("#gender").val(person.gender);
            $("#email").val(person.email);
            $("#mobileno").val(person.mobileno);
            $("#isFilipino").prop('checked', person.isFilipino == 'true'? true : false);
            
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

    BACKEND_URL + "/person/" + url, // request url

    {
      type: 'GET',
      success: function (data, status, xhr) {
        console.log(data);
        $("#table1 > tbody").html("");
        for (let person of data.list) {
          // console.log(person);

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
        type: 'DELETE',
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
