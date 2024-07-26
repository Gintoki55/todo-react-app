import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Stack from "@mui/material/Stack";
import { blue, green, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { UseContextData } from "./context/context";
import { useEffect } from "react";


export default function Todo({ todoProp, showDeleteDilaog, showDilaogUpdate }) {
  const { todos, dispatch } = UseContextData()
  const { enqueueSnackbar } = useSnackbar();

  function handlecheckComplete() {
      dispatch({ type: "check", payload: { todo: todoProp } });
    enqueueSnackbar("تم نقل المهام إلى قائم المنجزة والغير المنجزة", {
      variant: "warning",
      autoHideDuration: 3000,
    });
    // variant could be success, error, warning, info, or default
  }

  useEffect(()=>{
    dispatch({type: "get"})
  },[])



  return (
    <>
      <Card
        sx={{
          minWidth: 475,
          marginTop: "10px",
          backgroundColor: "rgb(1 22 158);",
        }}
        className="task"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="delete"
                  sx={{
                    border: `2px solid ${red[400]}`,
                    backgroundColor: "#fff",
                  }}
                  className="icon"
                  onClick={() => {
                    showDeleteDilaog(todoProp);
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ color: red[500] }} />
                </IconButton>

                <IconButton
                  aria-label="update"
                  sx={{
                    border: `2px solid ${blue[400]}`,
                    backgroundColor: "#fff",
                  }}
                  className="icon"
                  onClick={() => {
                    showDilaogUpdate(todoProp);
                  }}
                >
                  <CreateOutlinedIcon sx={{ color: blue[500] }} />
                </IconButton>

                <IconButton
                  aria-label="check"
                  sx={{
                    border: `2px solid ${green[400]}`,
                    backgroundColor: todoProp.completed ? green[500] : "#fff",
                  }}
                  className="icon"
                  onClick={() => {
                    handlecheckComplete();
                  }}
                >
                  <CheckOutlinedIcon
                    sx={{
                      color: todoProp.completed ? "#fff" : green[500],
                    }}
                  />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  textAlign: "right",
                  textDecoration: todoProp.completed ? "line-through" : "",
                }}
              >
                {todoProp.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#fff", textAlign: "right", fontWeight: "100" }}
              >
                {todoProp.des}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
