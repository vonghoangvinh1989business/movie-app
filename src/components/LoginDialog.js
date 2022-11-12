import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function LoginDialog() {
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    navigate(-1);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "center" }}
          textAlign="center"
        >
          <Box>
            <Avatar sx={{ bgcolor: "rgb(215, 71, 66)" }}>
              <LockOutlinedIcon
                fontSize="small"
                sx={{
                  color: "black",
                  borderRadius: "50%",
                  bgcolor: "rgb(215, 71, 66)",
                }}
              />
            </Avatar>
            <Typography>Log In</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
