const con = require("../dbconfig/dbconfig");



function getStudents(req, resp) {

    con.query("select *from student order by sname", (err, result) => {

        if (err) {
            console.log(err);
        } else {

            var output = "<table class='table table-sm table-bordered table-striped text-center'>"
                + "<thead class='bg-dark text-light'>"
                + "<th>SID</th>"
                + "<th>SNAME</th>"
                + "<th>CITY</th>"
                + "<th>MARKS</th>"
                + "<th>ACTION</th>"
                + "</thead><tbody>";

            for (let i = 0; i < result.length; i++) {

                let sid = result[i].sid;

                output = output + `<tr>`
                    + `<td>${result[i].sid}</td>`
                    + `<td>${result[i].sname}</td>`
                    + `<td>${result[i].city}</td>`
                    + `<td>${result[i].marks}</td>`
                    + `<td class='w-25'>`
                    + `<a class='btn btn-sm btn-success mx-2 update-btn' data-sid='${sid}'>Update</a>`
                    + `<a class='btn btn-sm btn-danger mx-2 delete-btn' data-sid='${sid}'>Delete</a>`
                    + `</td>`
                    + `</tr>`;
            }

            resp.send(output);

        }
    });

}


function insertStudent(req, resp) {

    const sid = Math.random() * 100000;
    const name = req.body.name;
    const city = req.body.city;
    const marks = req.body.marks;

    const sql = `insert into student values(${sid},'${name}','${city}',${marks})`;

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            resp.send(err.sqlMessage);
        } else {
            console.log(result);
            resp.send(true);
        }
    });

}



function searchStudent(req, resp) {

    const sid = req.body.sid;
    let sql = `select *from student where sid='${sid}'`;

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            resp.send(err.sqlMessage);
        } else {
            console.log(result);
            if (result.length > 0) {

                let output = "<table class='table table-striped w-50 mx-auto text-center mt-3'>" +
                    "<tr>" +
                    "<th>Student Name : </th>" +
                    `<td>${result[0].sname}</td>` +
                    "</tr>" +
                    "<tr>" +
                    "<th>City : </th>" +
                    `<td>${result[0].city}</td>` +
                    "</tr>" +
                    "<tr>" +
                    "<th>Marks : </th>" +
                    `<td>${result[0].marks}</td> ` +
                    "</tr>";

                resp.send(output);


            } else {
                resp.send(false);
            }

        }
    });
}

function deleteStudent(req, resp) {

    const sid = req.body.id;

    sql = `delete from student where sid=${sid}`;

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            resp.send(err.sqlMessage);
        } else {
            resp.send(true);
        }
    });
}


function getUpdateForm(req, resp) {

    const sid = req.body.id;

    let sql = `select *from student where sid='${sid}'`;

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        } else {

        let output = `<input type='hidden' value='${result[0].sid}' name='sid' required>` +
                `<input type='text' value='${result[0].sname}' name='name' placeholder='Enter new name' required>` +
                `<input type='text' value='${result[0].city}' name='city' placeholder='Enter new City' required>` +
                `<input type='number' value='${result[0].marks}' name='marks' placeholder='Enter new Marks' required>` +
                `<input type='submit' value='Save Changes' class='btn btn-primary'>`;
             

            resp.send(output);
        }
    });

}

//
function update(req, resp) {

    const sid = req.body.sid;
    const name = req.body.name;
    const city = req.body.city; 
    const marks = req.body.marks;

    let sql = `update student set sname='${name}', city='${city}', marks=${marks} WHERE sid=${sid}`;

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            resp.send(err.sqlMessage);

        }else{
            resp.send(true);
        }
    });
}

module.exports = { getStudents, insertStudent, searchStudent, deleteStudent, getUpdateForm, update};


