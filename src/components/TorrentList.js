import React from "react";
import Container from "@material-ui/core/Container";
import Torrent from "./Torrent";
import List from "@material-ui/core/List";

export default class TorrentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { torrents: [] };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    fetch("http://127.0.0.1:8090/torrents", {
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
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <List>
            {this.state.torrents.map((torrent) => (
              <Torrent key={torrent.hash} torrent={torrent} />
            ))}
          </List>
        </Container>
      </React.Fragment>
    );
  }
}
