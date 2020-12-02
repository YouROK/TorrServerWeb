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
import List from "@material-ui/core/List";

export default function AddDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (add) => {
    setOpen(false);
    if (add) {
      try {
        let magnet = this.refs.magnetField.getValue();
        if (magnet) {
          fetch("http://127.0.0.1:8090/torrents", {
            method: "post",
            body: JSON.stringify({ action: "add", link: "" }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
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
          <List>
            <ListItem>
              <TextField
                ref="magnetField"
                autoFocus
                margin="dense"
                id="magnet"
                label="Magnet"
                type="text"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                ref="titleField"
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                ref="posterField"
                autoFocus
                margin="dense"
                id="poster"
                label="Poster"
                type="url"
                fullWidth
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose(true)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
