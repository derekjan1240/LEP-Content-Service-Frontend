import QRCode from "react-qr-code";
import { Grid, IconButton, Typography, Box } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

export default function ClassroomIntro({ classroom, setPopup, setOpenPopup }) {
  return (
    <>
      <Grid item md={10}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3">{classroom.name}</Typography>
          {classroom.isManager && (
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
            班級教師: {classroom.manager.userName}
          </Typography>
        </Box>
        {classroom.isManager && (
          <Box mt={2}>
            <Typography variant="h5">
              是否開放學生加入班級: {classroom.isAllowAdd ? "是" : "否"}
            </Typography>
          </Box>
        )}
        <Box whiteSpace="pre" mt={4}>
          <Typography variant="h6">{classroom.description}</Typography>
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode
            value={`https://443897a45ddf.ngrok.io/classroom/student/add/${classroom.id}`}
            size={120}
          />
          <Box p={2}>
            <Typography>加入班級</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
