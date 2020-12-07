import React, { useEffect, useRef } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { cacheHost } from '../utils/Hosts'
import { humanizeSize } from '../utils/Utils'

export default function CacheDialog(props) {
    const [open, setOpen] = React.useState(props.open)
    const [hash, setHash] = React.useState(props.hash)
    const [cache, setCache] = React.useState({})
    const timerID = useRef(-1)

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (open)
            timerID.current = setInterval(() => {
                getCache(hash, (cache) => {
                    if (cache) setCache(cache)
                })
            }, 1000)
        else clearInterval(timerID.current)

        return () => {
            clearInterval(timerID.current)
        }
    }, [hash, open])

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Add Magnet</DialogTitle>
                <DialogContent>
                    <Typography fullWidth>
                        <b>Hash </b>
                        {cache.Hash}
                    </Typography>
                    <Typography fullWidth>
                        <b>Capacity </b>
                        {humanizeSize(cache.Capacity)}
                    </Typography>
                    <Typography fullWidth>
                        <b>Filled </b>
                        {humanizeSize(cache.Filled)}
                    </Typography>
                    <Typography fullWidth>
                        <b>Pieces length </b>
                        {cache.PiecesLength}
                    </Typography>
                    <Typography fullWidth>
                        <b>Pieces count </b>
                        {cache.PiecesCount}
                    </Typography>
                    <Typography fullWidth>
                        <b>Download speed </b>
                        {cache.DownloadSpeed ? humanizeSize(cache.DownloadSpeed) + '/sec' : ''}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function getCache(hash, callback) {
    try {
        fetch(cacheHost(), {
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
                    callback(json)
                },
                (error) => {
                    callback({})
                    console.error(error)
                }
            )
    } catch (e) {
        console.error(e)
    }
}
/*
{
	"Hash": "41e36c8de915d80db83fc134bee4e7e2d292657e",
	"Capacity": 209715200,
	"Filled": 2914808,
	"PiecesLength": 4194304,
	"PiecesCount": 2065,
	"DownloadSpeed": 32770.860273455524,
	"Pieces": {
		"2064": {
			"Id": 2064,
			"Length": 2914808,
			"Size": 162296,
			"Completed": false
		}
	}
}
 */
