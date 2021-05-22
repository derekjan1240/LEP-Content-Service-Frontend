import QRCode from "react-qr-code";
import { Grid, IconButton, Typography, Box } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

export default function ClassroomIntro({
  classroom,
  setPopup,
  setOpenPopup,
  isManager,
}) {
  return (
    <>
      <Grid item md={10}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3">{classroom.name}</Typography>
          {isManager && (
            <IconButton
              aria-label="edit"
              onClick={() => {
                setPopup({
                  title: `編輯班級 - ${classroom.name}`,
                  type: 0,
                });
                setOpenPopup(true);
              }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Box mt={3}>
          <Typography variant="h5">
            班級教師: {classroom.manager?.userName}
          </Typography>
        </Box>
        {isManager && (
          <Box mt={2}>
            <Typography variant="h5">
              是否開放學生加入班級: {classroom.isAllowAdd ? "是" : "否"}
            </Typography>
          </Box>
        )}
        <Box mt={4}>
          <Typography variant="h6">{classroom.description}</Typography>
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode value="https://www.youtube.com/" size={120} />
          <Box p={2}>
            <Typography>邀請碼: {classroom.invitationCode}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
