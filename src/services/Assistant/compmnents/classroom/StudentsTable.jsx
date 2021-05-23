import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

// Components
import useTable from "../../../Utility/compmnents/UseTable";

const headCells = [
  { id: "name", label: "姓名" },
  { id: "age", label: "年齡" },
  { id: "email", label: "Email" },
  { id: "group", label: "組別" },
  { id: "actions", label: "操作", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function StudentsTable({
  groupList,
  studentList,
  handleStudentRemove,
}) {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  useEffect(() => {
    studentList.map((student) => {
      student.group = group(student);
      return student;
    });
    setRecords(studentList || []);
  }, [studentList]);

  const classes = useStyles();

  const group = (student) => {
    const group = groupList.filter((group) => group.memberSet.has(student.id));
    if (group.length) {
      return group[0].name;
    } else {
      return "無";
    }
  };

  return (
    <Grid item md={12}>
      <Paper>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{group(student)}</TableCell>
                <TableCell style={{ width: "30%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PlaylistAddIcon />}
                  >
                    指派任務
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AssignmentIcon />}
                  >
                    學習紀錄
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleStudentRemove(student);
                    }}
                  >
                    移除學生
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </Grid>
  );
}
