import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, ButtonGroup, Grid, List, ListItem } from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached'

import { humanizeSize } from '../utils/Utils'
import { playlistTorrHost, streamHost } from '../utils/Hosts'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'

const style = {
    width100: {
        width: '100%',
    },
    poster: {
        display: 'flex',
        flexDirection: 'row',
    },
}

export default function DialogTorrentInfo(props) {
    const [torrent, setTorrent] = React.useState(props.torrent)

    useEffect(() => {
        setTorrent(props.torrent)
    }, [props.torrent])

    return (
        <div>
            <DialogTitle id="form-dialog-title">
                <Grid container spacing={1}>
                    <Grid item>{torrent.poster && <img height="200" align="left" style={style.poster} src={torrent.poster} />}</Grid>
                    <Grid item>
                        {torrent.title} {torrent.name && torrent.name != torrent.title && ' | ' + torrent.name}
                        <Typography>
                            <b>Peers: </b> {getPeer(torrent)}
                            <br />
                            <b>Loaded: </b> {getPreload(torrent)}
                            <br />
                            <b>Speed: </b> {humanizeSize(torrent.download_speed)}
                            <br />
                            <b>Status: </b> {torrent.stat_string}
                            <br />
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ButtonGroup style={style.width100} variant="contained" aria-label="contained primary button group">
                            <Button
                                style={style.width100}
                                onClick={() => window.open(playlistTorrHost + '/' + encodeURI(torrent.name || torrent.title || 'file') + '.m3u?link=' + torrent.hash + '&m3u', '_blank')}
                            >
                                Playlist
                            </Button>
                            <Button
                                style={style.width100}
                                onClick={() => window.open(playlistTorrHost + '/' + encodeURI(torrent.name || torrent.title || 'file') + '.m3u?link=' + torrent.hash + '&m3u&fromlast', '_blank')}
                            >
                                Playlist after last view
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                    {torrent.file_stats &&
                        torrent.file_stats.map((file) => (
                            <ButtonGroup style={style.width100} disableElevation variant="contained" color="primary">
                                <Button
                                    style={style.width100}
                                    href={streamHost + '/' + encodeURI(file.path.split('\\').pop().split('/').pop()) + '?link=' + torrent.hash + '&index=' + file.id + '&play'}
                                    // onClick={() => window.open(streamHost + '/' + encodeURI(file.path.split('\\').pop().split('/').pop()) + '?link=' + torrent.hash + '&index=' + file.id + '&play', '_blank')}
                                >
                                    <Typography>
                                        {file.path.split('\\').pop().split('/').pop()} | {humanizeSize(file.length)}
                                    </Typography>
                                </Button>
                                <Button onClick={() => fetch(streamHost + '?link=' + torrent.hash + '&index=' + file.id + '&preload')}>
                                    <CachedIcon />
                                    <Typography>Preload</Typography>
                                </Button>
                            </ButtonGroup>
                        ))}
                </List>
            </DialogContent>
        </div>
    )
}

function getPreload(torrent) {
    if (torrent.preloaded_bytes > 0 && torrent.preload_size > 0 && torrent.preloaded_bytes < torrent.preload_size) {
        let progress = ((torrent.preloaded_bytes * 100) / torrent.preload_size).toFixed(2)
        return humanizeSize(torrent.preloaded_bytes) + ' / ' + humanizeSize(torrent.preload_size) + '   ' + progress + '%'
    }

    if (!torrent.preloaded_bytes) return humanizeSize(0)

    return humanizeSize(torrent.preloaded_bytes)
}

function getPeer(torrent) {
    if (!torrent.connected_seeders) return '[0] 0 / 0'
    return '[' + torrent.connected_seeders + '] ' + torrent.active_peers + ' / ' + torrent.total_peers
}
