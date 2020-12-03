import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Button, ButtonGroup, Divider, List, ListItem } from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached'

const style = {
    width100: {
        width: '100%',
    },
}

export default function TorrentInfo(props) {
    const [torrent, setTorrent] = React.useState(props.torrent)
    const [progress, setProgress] = React.useState(0)

    const getPreload = () => {
        if (torrent.preloaded_bytes > 0 && torrent.preload_size > 0 && torrent.preloaded_bytes < torrent.preload_size) {
            setProgress((torrent.preloaded_bytes * 100) / torrent.preload_size)
            return humanizeSize(torrent.preloaded_bytes) + ' / ' + humanizeSize(torrent.preload_size) + '   ' + progress + '%'
        }
        return humanizeSize(torrent.preloaded_bytes)
    }

    const getPeer = () => {
        if (!torrent.connected_seeders) return ''
        return '[' + torrent.connected_seeders + '] ' + torrent.active_peers + ' / ' + torrent.total_peers
    }

    const humanizeSize = (size) => {
        if (!size) return ''
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    }

    return (
        <List>
            <ListItem>
                <Typography>
                    {getPeer()} <Divider orientation="vertical" flexItem /> {getPreload()} <Divider orientation="vertical" flexItem /> {humanizeSize(torrent.download_speed)}
                    <b>Status: </b> {torrent.stat_string}
                </Typography>
            </ListItem>
            <ListItem>
                <LinearProgress variant="determinate" value={progress} />
            </ListItem>
            {torrent.file_stats &&
                torrent.file_stats.map((file) => (
                    <ButtonGroup style={style.width100} disableElevation variant="contained" color="primary">
                        <Button
                            style={style.width100}
                            onClick={() =>
                                window.open('http://127.0.0.1:8090' + '/stream/' + file.path.split('\\').pop().split('/').pop() + '?link=' + torrent.hash + '&index=' + file.id + '&play', '_blank')
                            }
                        >
                            <Typography>
                                {file.path.split('\\').pop().split('/').pop()} | {humanizeSize(file.length)}
                            </Typography>
                        </Button>
                        <Button onClick={() => window.open('http://127.0.0.1:8090' + '/stream?link=' + torrent.hash + '&index=' + file.id + '&preload', '_blank')}>
                            <CachedIcon />
                            <Typography>Preload</Typography>
                        </Button>
                    </ButtonGroup>
                ))}
        </List>
    )
}
