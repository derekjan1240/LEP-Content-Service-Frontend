import Swal from "sweetalert2";

export function showInfoSwal(title = "顯示提示訊息標題", hintText = null) {
  Swal.fire({
    title: title,
    text: hintText,
    icon: "info",
    showConfirmButton: false,
  });
}

export function showSuccessSwal(title = "操作成功") {
  Swal.fire({
    title: title,
    icon: "success",
    showConfirmButton: false,
  });
}

export function showFailSwal(title = "操作失敗", hintText = null) {
  Swal.fire({
    title: title,
    text: hintText,
    icon: "error",
    showConfirmButton: false,
  });
}
