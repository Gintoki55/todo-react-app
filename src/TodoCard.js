import * as React from "react";
//// Component Imports////
import Todo from "./todo";
/// Card Content Component////////
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
//////*****/ Card Content Component////////*** */
import { useSnackbar } from "notistack";
import { useState,useMemo } from "react";
import { UseContextData } from "./context/context";
///diloag
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


function CardTodo() {
    const { enqueueSnackbar } = useSnackbar();
    const [openDeleteDiloag, setOpenDeleteDiloag] = useState(false);
    const [dialogTodoPropValue, setdialogTodoPropValue] = useState(null)
    const { todos, dispatch } = UseContextData();
    const [value, setValue] = useState("all");
    const [TextFieldValue, setTextFieldValue] = useState("");
    const [dialogTodoPropValueUptade, setdialogTodoPropValueUptade] = useState({});
    const [openUpdateDiloag, setOpenUpdateDiloag] = useState(false);
  
  
   function handleAddTodo() {
      dispatch({ type: "added", payload: { title: TextFieldValue } });
      setTextFieldValue("");
      enqueueSnackbar("تمت الإضافة المهمة بنجاح", {
        variant: "success",
        autoHideDuration: 2000,
      });
      // variant could be success, error, warning, info, or default
   }
 
  const handleChange = (e) => {
    setValue(e.target.value);
  };



   function showDeleteDilaog(todoProp) {
     console.log(todoProp);
     setOpenDeleteDiloag(true);
     setdialogTodoPropValue(todoProp);
   }

  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { todo: dialogTodoPropValue } });
    setOpenDeleteDiloag(false);
    enqueueSnackbar("لقد حذفت مهمة ", {
      variant: "error",
      autoHideDuration: 2000,
    });
    // variant could be success, error, warning, info, or default
  }

    function handleCloseDelete() {
      setOpenDeleteDiloag(false);
    }

    function showDilaogUpdate(todoProp) {
      console.log(todoProp);
      setdialogTodoPropValueUptade(todoProp);
      setOpenUpdateDiloag(true);
      
    }

    function handleCloseUpdate() {
      setOpenUpdateDiloag(false);
    }

    function handleUpdate() {
      dispatch({
        type: "updated",
        payload: {
          title: dialogTodoPropValueUptade.title,
          des: dialogTodoPropValueUptade.des,
          todo: dialogTodoPropValueUptade,
        },
      });
      setOpenUpdateDiloag(false);
      enqueueSnackbar("تم تحديث المعلومات", {
        variant: "info",
        autoHideDuration: 2000,
      });
      // variant could be success, error, warning, info, or default
    }


    const CompleteTodo = useMemo(() => {
      return todos
        .slice()
        .reverse()
        .filter((t) => {
          console.log("done");
          return t.completed;
        });
    }, [todos]);

  const UnCompleteTodo = useMemo(()=>{
    return todos.filter((t) => {
      console.log("uncompleted");
      return !t.completed;
    });
  },[todos]);
  
  

  let todosTooBeRender = todos;
  if (value == "CompleteTodo") {
    todosTooBeRender = CompleteTodo;
  } else if (value == "unCompleteTodo") {
    todosTooBeRender = UnCompleteTodo;
  } else {
    todosTooBeRender = todos;
  }

  const todoJsx = todosTooBeRender
    .slice()
    .reverse()
    .map((t) => {
      return (
        <Todo
          key={t.id}
          todoProp={t}
          showDeleteDilaog={showDeleteDilaog}
          showDilaogUpdate={showDilaogUpdate}
        />
      );
    });
    

  return (
    <>
      {/* {Delete  Diloag} */}
      <Dialog
        open={openDeleteDiloag}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك في الحذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع عن الحذف في حال الضغظ على زر(الحذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* {EDIT  Diloag} */}
      <Dialog
        open={openUpdateDiloag}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ width: "400px" }}>
          {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="العنوان"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodoPropValueUptade.title}
            onChange={(e) => {
              setdialogTodoPropValueUptade({
                ...dialogTodoPropValueUptade,
                title: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="التفاصيل"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodoPropValueUptade.des}
            onChange={(e) => {
              setdialogTodoPropValueUptade({
                ...dialogTodoPropValueUptade,
                des: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdate}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <Typography variant="h1" sx={{ color: "black" }}>
            مهامي
          </Typography>
          <Divider />
        </CardContent>
        <CardContent>
          <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="unCompleteTodo">غير منجز</ToggleButton>
            <ToggleButton value="CompleteTodo">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
        <CardContent sx={{ height: "250px", overflow: "auto" }}>
          {todoJsx}
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              sx={{ width: "120px " }}
              onClick={() => {
                handleAddTodo(TextFieldValue);
              }}
              disabled={TextFieldValue.length == 0}
            >
              إضافة
            </Button>
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              sx={{ width: "220px ", flex: "1" }}
              value={TextFieldValue}
              onChange={(e) => {
                setTextFieldValue(e.target.value);
              }}
            />
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default CardTodo;
