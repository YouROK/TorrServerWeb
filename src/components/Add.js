import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default function AddDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleCloseSave = () => {
    try {
      var magnet =

      if (this != null && this.myRefs.magnet) {
        fetch("http://127.0.0.1:8090/torrents", {
          method: "post",
          body: JSON.stringify({
            action: "add",
            link: this.myRefs.magnet,
            title: this.myRefs.title,
            poster: this.myRefs.poster,
            save_to_db: true,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button key="Add" onClick={handleClickOpen}>
        <ListItemIcon>
          <LibraryAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add" />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Add Magnet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add magnet or link to torrent file
          </DialogContentText>
          <TextField
            onChange={this.handleMagnet}
            autoFocus
            margin="dense"
            id="magnet"
            label="Magnet"
            type="text"
            fullWidth
          />
          <TextField
              onChange={this.handleTitle}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
              onChange={this.handlePoster}
            autoFocus
            margin="dense"
            id="poster"
            label="Poster"
            type="url"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
