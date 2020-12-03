import React, { useEffect } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import 'fontsource-roboto'

import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

import TorrentInfo from './TorrentInfo'

const style = {
    width100: {
        width: '100%',
    },
}

export default function Torrent(props) {
    const [open, setOpen] = React.useState(false)
    const [torrent, setTorrent] = React.useState(props.torrent)
    var timerID = null

    const deleteHandler = () => {
        try {
            fetch('http://127.0.0.1:8090' + '/torrents', {
                method: 'post',
                body: JSON.stringify({
                    action: 'rem',
                    hash: torrent.hash,
                }),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    const humanizeSize = (size) => {
        if (!size) return ''
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    }

    useEffect(() => {
        timerID = setInterval(() => update(), 1000)
        return () => {
            clearInterval(timerID)
        }
    }, [])

    const update = () => {
        if (open)
            getTorrent(torrent.hash, (torr, error) => {
                if (error) console.error(error)
                else if (torr) setTorrent(torr)
            })
    }

    return (
        <div>
            <ListItem>
                <ButtonGroup style={style.width100} disableElevation variant="contained" color="primary">
                    <Button
                        style={style.width100}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <Typography>
                            {torrent.name ? torrent.name : torrent.title}
                            {torrent.torrent_size > 0 ? ' | ' + humanizeSize(torrent.torrent_size) : ''}
                            {torrent.download_speed > 0 ? ' | ' + humanizeSize(torrent.download_speed) + '/sec' : ''}
                        </Typography>
                    </Button>
                    <Button onClick={deleteHandler}>
                        <DeleteIcon />
                        <Typography>Delete</Typography>
                    </Button>
                </ButtonGroup>
            </ListItem>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    {torrent.title} {torrent.name && ' | ' + torrent.name}
                </DialogTitle>
                <DialogContent>
                    <TorrentInfo torrent={torrent} start={open} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        color="primary"
                    >
                        OK
                    </Button>
                    <Button
                        color="primary"
                        aria-label="text primary button"
                        onClick={() => {
                            dropTorrent(torrent)
                            setOpen(false)
                        }}
                    >
                        Drop
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function getTorrent(hash, callback) {
    fetch('http://127.0.0.1:8090' + '/torrents', {
        method: 'post',
        body: JSON.stringify({ action: 'get', hash: hash }),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (json) => {
                callback(json, null)
            },
            (error) => {
                callback(null, error)
            }
        )
}

function dropTorrent(torrent) {
    fetch('http://127.0.0.1:8090' + '/torrents', {
        method: 'post',
        body: JSON.stringify({
            action: 'drop',
            hash: torrent.hash,
        }),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
    })
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
