import React from "react";
import Container from "@material-ui/core/Container";
import Torrent from "./Torrent";
import List from "@material-ui/core/List";
import { Typography } from "@material-ui/core";

export default class TorrentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { torrents: [], offline: false };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    fetch(/*"http://127.0.0.1:8090" +*/ "/torrents", {
      method: "post",
      body: JSON.stringify({ action: "list" }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (json) => {
          this.setState({
            torrents: json,
            offline: false,
          });
        },
        (error) => {
          console.log(error);
          this.setState({ offline: true });
        }
      );
  }

  render() {
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          {!this.state.offline ? (
            <List>
              {this.state.torrents.map((torrent) => (
                <Torrent key={torrent.hash} torrent={torrent} />
              ))}
            </List>
          ) : (
            <Typography>Offline</Typography>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
