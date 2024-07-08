import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { RestApiUrl } from "../../URL";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ApiUrl = RestApiUrl;

const columns = [
  { field: "Id", headerName: "Id", type: "number", width: 100 },
  { field: "name", headerName: "Name", width: 100 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "gender",
    headerName: "Gender",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

export default function Crud() {
  const [Data, SetData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [Id, SetId] = useState();
  const [Name, SetName] = useState("");
  const [age, Setage] = useState();
  const [Email, Setemail] = useState("");
  const [gender, Setgender] = useState("");
  const [IsEditMode, SetIsEditMode] = useState(false);
  const [Data_1, SetData_1] = useState();

  

  useEffect(() => {
    SetData_1(
      {
        Id: Number(Id),
        name: Name,
        age: Number(age),
        email: Email,
        gender: gender,
      },
      [Id, Name, age, Email, gender]
    );
  });
  const CreateRecord = () => {
    axios.post(ApiUrl, Data_1).then((result) => {
      alert("Added");
      handleClose();
      reset();
      Getall();
    });
  };
  const handlesubmit = () => {
    if (Id === "" || Name === "") {
      alert("Please Fill the Mandotory fields");
      return false;
    }
    if (Email === "" || age === "") {
      alert("Please Fill the Mandotory fields");
      return false;
    } else {
      if (IsEditMode) {
        console.log("Updat");
        Updaterecord(Id);
        SetIsEditMode(false);
      } else {
        CreateRecord();
      }
    }
  };
  const reset = () => {
    SetId("");
    SetName("");
    Setemail("");
    Setage("");
    Setgender("");
  };
  const Getall = () => {
    axios.get(ApiUrl).then((result) => {
      SetData(result.data);
      console.log(result.data);
    });
  };
  const GetbyId = (id) => {
    axios.get(RestApiUrl + id).then((result) => {
      console.log(result);
      SetId(result.data.Id);
      SetName(result.data.name);
      Setage(result.data.age);
      Setemail(result.data.email);
      Setgender(result.data.gender);
    });
  };
  const Updaterecord = (id) => {
    axios.put(RestApiUrl + id, Data_1).then((result) => {
      handleClose();
      reset();
      Getall();
    });
  };
  const DeleteRecord = (id) => {
    console.log(id);
    axios.delete(RestApiUrl + id).then((result) => {
      Getall();
      alert("Deleted");
    });
  };
  useEffect(Getall, []);
  const HandleRowClick = (id) => {
    SetIsEditMode(true);
    GetbyId(id);

    setOpen(true);
  };

  return (
    <div>
      <div className="row">
        {/* <div className="col-lg-2 col-md-3 col-xs-2"></div> */}
        <div className="col-lg-12 col-md-12 col-xs-12">
          <div className="row">
            <div style={{ height: "50px" }}></div>
            <div className="col-lg-10"></div>
            <div className="col-lg-2 .float-lg-right">
              <Button variant="contained" onClick={() => handleOpen()}>
                Add
              </Button>
            </div>
          </div>
          <hr />
          <div className="row">
            <DataGrid
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  color: "darkgreen",
                  fontWeight: 800,
                  fontSize:"bold"
                },
                "& .MuiDataGrid-cell": {
                  backgroundColor: "aliceblue",
                  color: "darkblue",
                },
              }}
              getRowId={(Data) => Data.Id}
              rows={Data}
              columns={columns}
              onRowClick={(Data) => {
                HandleRowClick(Data.id);
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
            />
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{IsEditMode ? "Edit" : "Add"} User</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                required
                margin="dense"
                id="Id"
                name="Id"
                label="ID "
                type="number"
                fullWidth
                variant="standard"
                value={Id}
                onChange={(e) => {
                  SetId(e.target.value);
                }}
                disabled={IsEditMode}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="Name"
                name="Name"
                label="Name "
                type="text"
                fullWidth
                variant="standard"
                value={Name}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="age"
                name="age"
                label="Age "
                type="number"
                fullWidth
                variant="standard"
                value={age}
                onChange={(e) => {
                  Setage(e.target.value);
                }}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email "
                type="email"
                fullWidth
                variant="standard"
                value={Email}
                onChange={(e) => {
                  Setemail(e.target.value);
                }}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="Gender"
                name="Gender"
                label="Gender "
                type="Gender"
                fullWidth
                variant="standard"
                value={gender}
                onChange={(e) => {
                  Setgender(e.target.value);
                }}
              />
              <br />
              {IsEditMode ? (
                <Button
                  onClick={() => {
                    DeleteRecord(Id);
                    SetIsEditMode(false);
                    handleClose();
                  }}
                >
                  Delete
                </Button>
              ) : (
                <Button type="reset" onClick={reset}>
                  Reset
                </Button>
              )}
              <Button type="submit" variant="contained" onClick={handlesubmit}>
                Submit
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
