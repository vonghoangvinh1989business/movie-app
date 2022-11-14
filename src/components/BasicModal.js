import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e84393",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ textContent }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 sx={{ color: "red" }} id="parent-modal-title">
            {textContent}
          </h2>
          <p id="parent-modal-description">Click outside to close message.</p>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
