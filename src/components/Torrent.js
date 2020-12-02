import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import "fontsource-roboto";

import NumericLabel from "react-pretty-numbers";

import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

const style = {
  name_button: {
    width: 300,
  },
};

export default class Torrent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torrent: {},
    };
  }

  render() {
    return (
      <ListItem>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button style={style.name_button}>
            <Typography>
              {this.props.torrent.name
                ? this.props.torrent.name
                : this.props.torrent.title}
            </Typography>
          </Button>
          <Button>
            <DeleteIcon />
            <Typography>Delete</Typography>
          </Button>
        </ButtonGroup>
      </ListItem>
    );
  }
}

/*
{
	"title": "Mulan 2020",
	"poster": "https://kinohod.ru/o/88/d3/88d3054f-8fd3-4daf-8977-bb4bc8b95206.jpg",
	"timestamp": 1606897747,
	"name": "Mulan.2020.MVO.BDRip.1.46Gb",
	"hash": "f6c992b437c04d0f5a44b42852bb61de7ce90f9a",
	"stat": 2,
	"stat_string": "Torrent preload",
	"loaded_size": 6160384,
	"torrent_size": 1569489783,
	"preloaded_bytes": 5046272,
	"preload_size": 20971520,
	"download_speed": 737156.3390754947,
	"total_peers": 149,
	"pending_peers": 136,
	"active_peers": 10,
	"connected_seeders": 9,
	"half_open_peers": 15,
	"bytes_written": 100327,
	"bytes_read": 8077590,
	"bytes_read_data": 7831552,
	"bytes_read_useful_data": 6160384,
	"chunks_read": 478,
	"chunks_read_useful": 376,
	"chunks_read_wasted": 102,
	"pieces_dirtied_good": 2,
	"file_stats": [{
		"id": 1,
		"path": "Mulan.2020.MVO.BDRip.1.46Gb/Mulan.2020.MVO.BDRip.1.46Gb.avi",
		"length": 1569415168
	}, {
		"id": 2,
		"path": "Mulan.2020.MVO.BDRip.1.46Gb/Mulan.2020.MVO.BDRip.1.46Gb_forced.rus.srt",
		"length": 765
	}, {
		"id": 3,
		"path": "Mulan.2020.MVO.BDRip.1.46Gb/Mulan.2020.MVO.BDRip.1.46Gb_full.rus.srt",
		"length": 73850
	}]
}
 */
