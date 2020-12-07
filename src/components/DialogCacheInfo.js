import React, { useEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography'

import { humanizeSize } from '../utils/Utils'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { cacheHost } from '../utils/Hosts'

export default function DialogCacheInfo(props) {
    const [hash, setHash] = React.useState(props.hash)
    const [cache, setCache] = React.useState({})
    const timerID = useRef(-1)

    useEffect(() => {
        if (hash)
            timerID.current = setInterval(() => {
                getCache(hash, (cache) => {
                    setCache(cache)
                })
            }, 1000)
        else clearInterval(timerID.current)

        return () => {
            clearInterval(timerID.current)
        }
    }, [hash])

    return (
        <div>
            <DialogTitle id="form-dialog-title">
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
                    {humanizeSize(cache.PiecesLength)}
                </Typography>
                <Typography fullWidth>
                    <b>Pieces count </b>
                    {cache.PiecesCount}
                </Typography>
                <Typography fullWidth>
                    <b>Download speed </b>
                    {cache.DownloadSpeed ? humanizeSize(cache.DownloadSpeed) + '/sec' : ''}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className="cache" dangerouslySetInnerHTML={{ __html: getCacheMap(cache) }} />
            </DialogContent>
        </div>
    )
}

function getCacheMap(cache) {
    if (!cache || !cache.PiecesCount) return ''
    var html = ''
    for (let i = 0; i < cache.PiecesCount; i++) {
        html += "<span class='piece"
        if (cache.Pieces && cache.Pieces[i]) {
            let piece = cache.Pieces[i]
            if (piece.Completed && piece.Size >= piece.Length) html += ' piece-complete'
            else html += ' piece-loading'
        }
        html += "' title='" + i + "'></span>"
    }
    return html
}

function getPiece(cache, i) {}

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
        callback({})
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
