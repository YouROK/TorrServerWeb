import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

export default function RemoveAll() {
  const fnRemoveAll = () => {
    fetch("http://127.0.0.1:8090" + "/torrents", {
      method: "post",
      body: JSON.stringify({ action: "list" }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        json.forEach((torr) => {
          fetch("http://127.0.0.1:8090" + "/torrents", {
            method: "post",
            body: JSON.stringify({ action: "rem", hash: torr.hash }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
        });
      });
  };
  return (
    <ListItem button key="Remove all" onClick={fnRemoveAll}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Remove all" />
    </ListItem>
  );
}
