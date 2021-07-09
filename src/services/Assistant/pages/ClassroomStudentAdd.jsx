import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PageHeader from "../../Utility/compmnents/PageHeader";

export default function ClassroomStudentAdd() {
  const { classroom_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      // 取得班級資料
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/${classroom_id}`,
        params: {
          isGuest: true,
        },
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((response) => {
          console.log(response.data, userState.user);
          const classroom = response.data;

          // 已在班級中
          if (
            classroom.studentList.filter(
              (student) => student._id === userState.user._id
            ).length
          ) {
            Swal.fire({
              icon: "warning",
              title: `您已在 班級-${classroom.name} 中!`,
              width: 700,
              confirmButtonText: "前往班級",
            }).then(() => {
              navigate(`/classroom/${classroom_id}`);
            });
            return;
          }

          // 班級未開放學生加入
          if (!classroom.isAllowAdd) {
            Swal.fire({
              icon: "error",
              title: "您無法加入此班級!",
              width: 700,
              confirmButtonText: "離開",
            }).then(() => {
              navigate("/classroom");
            });
            return;
          }

          Swal.fire({
            title: `是否確定要加入 班級-${classroom.name}`,
            icon: "question",
            width: 700,
            confirmButtonText: "加入",
            cancelButtonText: "取消",
            allowOutsideClick: false,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // 打加入班級的 API
              handleStudentAdd();
            } else {
              navigate("/classroom");
            }
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "班級不存在!",
            width: 700,
          }).then(() => {
            navigate("/classroom");
          });
        });
    }
  }, [userState]);

  const handleStudentAdd = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/join`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: {
        classroom: classroom_id,
      },
    })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: `加入 班級-${response.data.name}`,
          confirmButtonText: "前往班級",
          width: 700,
        }).then(() => {
          navigate(`/classroom/${response.data.id}`);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <PageHeader
        title="班級系統"
        subTitle="加入班級"
        icon={<SupervisedUserCircleIcon fontSize="large" />}
      />
    </>
  );
}
