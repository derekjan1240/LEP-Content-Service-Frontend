import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
// Components
import PageHeader from "../../Utility/compmnents/PageHeader";
import Controls from "../../Utility/compmnents/Controls/Controls";
import AccountForm from "../compmnents/AccountForm";
import useTable from "../../Utility/compmnents/UseTable";
import Popup from "../../Utility/compmnents/Popup";
import ConfirmDialog from "../../Utility/compmnents/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "姓名" },
  { id: "age", label: "年齡" },
  { id: "email", label: "Email" },
  { id: "role", label: "身分" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function AccountManagement() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
  }, [userState]);

  // -------------------------

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AUTHENTICATION_SERVICE}/users`)
      .then((res) => {
        console.log(res);
        setRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "你確定要刪除此帳號嗎?",
    subTitle: "注意! 刪除後無法復原",
  });

  const [records, setRecords] = useState([]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.userName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // setRecords(employeeService.getAllEmployees());
  };

  const openInPopup = (item) => {
    console.log(item);
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log("delete:", id);
    // employeeService.deleteEmployee(id);
    // setRecords(employeeService.getAllEmployees());
  };

  return (
    <>
      <PageHeader
        title="帳號管理"
        subTitle="subTitle"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "你確定要刪除此帳號嗎?",
                          subTitle: "注意! 刪除後無法復原",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          <Popup
            title="新增帳號"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <AccountForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </Paper>
      )}
    </>
  );
}
