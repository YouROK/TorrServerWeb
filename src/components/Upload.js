import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import PublishIcon from "@material-ui/icons/Publish";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function UploadDialog() {
  const classes = useStyles();
  return (
    <div>
      <input type="file" className={classes.input} id="filesUpload" multiple />
      <label htmlFor="filesUpload">
        <ListItem button type="submit" component="button" key="Upload file">
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary="Upload file" />
        </ListItem>
      </label>
    </div>
  );
}
