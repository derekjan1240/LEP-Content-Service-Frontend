import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  td: {
    padding: 10,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
  },
}));

function DataTable(props) {
  const classes = useStyles();
  return props.data.map((data, index) => {
    return (
      <tr>
        <td className={classes.td}>{data.id}</td>
        <td className={classes.td}>{data.title}</td>
        <td className={classes.td}>{data.description}</td>
        <td className={classes.td}>{data.rate}</td>
        {data.author ? <td className={classes.td}>{data.author}</td> : null}
        <td className={classes.td}>
          <Button variant="contained" color="primary">
            查看
          </Button>
        </td>
      </tr>
    );
  });
}

export default function QuestionnaireTable(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box p={3}>
        <Typography variant="h4" align="center" className={classes.title}>
          系統提供
        </Typography>
      </Box>
      <Box p={3}>
        <table className={classes.table}>
          <tr>
            <th>ID</th>
            <th>標題</th>
            <th>敘述</th>
            <th>評分</th>
            <th>操作</th>
          </tr>
          <DataTable data={props.data.system} />
        </table>
      </Box>
      <hr />
      <Box p={3}>
        <Typography variant="h4" align="center" className={classes.title}>
          用戶提供
        </Typography>
      </Box>
      <Box p={3}>
        <table className={classes.table}>
          <tr>
            <th>ID</th>
            <th>標題</th>
            <th>敘述</th>
            <th>評分</th>
            <th>作者</th>
            <th>操作</th>
          </tr>
          <DataTable data={props.data.custom} />
        </table>
      </Box>
    </Box>
  );
}
