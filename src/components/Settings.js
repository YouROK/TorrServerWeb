import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useEffect } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { FormControlLabel, Switch } from '@material-ui/core'
import { settingsHost } from '../utils/Hosts'

export default function SettingsDialog() {
    const [open, setOpen] = React.useState(false)
    const [settings, setSets] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseSave = () => {
        setOpen(false)
        let sets = settings
        sets.CacheSize *= 1024 * 1024
        sets.PreloadBufferSize *= 1024 * 1024
        fetch(settingsHost, {
            method: 'post',
            body: JSON.stringify({ action: 'set', sets: sets }),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        })
    }

    useEffect(() => {
        fetch(settingsHost, {
            method: 'post',
            body: JSON.stringify({ action: 'get' }),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(
                (json) => {
                    json.CacheSize /= 1024 * 1024
                    json.PreloadBufferSize /= 1024 * 1024
                    setSets(json)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    const inputForm = (event) => {
        let sets = JSON.parse(JSON.stringify(settings))
        if (event.target.type === 'number') {
            sets[event.target.id] = Number(event.target.value)
        } else if (event.target.type === 'checkbox') {
            sets[event.target.id] = Boolean(event.target.checked)
        }
        setSets(sets)
    }

    return (
        <div>
            <ListItem button key="Settings" onClick={handleClickOpen}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <TextField onChange={inputForm} margin="dense" id="CacheSize" label="CacheSize" value={settings.CacheSize} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="PreloadBufferSize" label="PreloadBufferSize" value={settings.PreloadBufferSize} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="RetrackersMode" label="RetrackersMode" value={settings.RetrackersMode} type="text" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="TorrentDisconnectTimeout" label="TorrentDisconnectTimeout" value={settings.TorrentDisconnectTimeout} type="text" fullWidth />
                    <FormControlLabel control={<Switch checked={settings.EnableIPv6} onChange={inputForm} id="EnableIPv6" color="primary" />} label="EnableIPv6" />
                    <FormControlLabel control={<Switch checked={settings.DisableTCP} onChange={inputForm} id="DisableTCP" color="primary" />} label="DisableTCP" />
                    <FormControlLabel control={<Switch checked={settings.DisableUTP} onChange={inputForm} id="DisableUTP" color="primary" />} label="DisableUTP" />
                    <FormControlLabel control={<Switch checked={settings.DisableUPNP} onChange={inputForm} id="DisableUPNP" color="primary" />} label="DisableUPNP" />
                    <FormControlLabel control={<Switch checked={settings.DisableDHT} onChange={inputForm} id="DisableDHT" color="primary" />} label="DisableDHT" />
                    <FormControlLabel control={<Switch checked={settings.DisableUpload} onChange={inputForm} id="DisableUpload" color="primary" />} label="DisableUpload" />
                    <TextField onChange={inputForm} margin="dense" id="DownloadRateLimit" label="DownloadRateLimit" value={settings.DownloadRateLimit} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="UploadRateLimit" label="UploadRateLimit" value={settings.UploadRateLimit} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="ConnectionsLimit" label="ConnectionsLimit" value={settings.ConnectionsLimit} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="DhtConnectionLimit" label="DhtConnectionLimit" value={settings.DhtConnectionLimit} type="number" fullWidth />
                    <TextField onChange={inputForm} margin="dense" id="PeersListenPort" label="PeersListenPort" value={settings.PeersListenPort} type="number" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

/*
{
	"CacheSize": 209715200,
	"PreloadBufferSize": 20971520,
	"RetrackersMode": 1,
	"TorrentDisconnectTimeout": 30,
	"EnableIPv6": false,
	"DisableTCP": false,
	"DisableUTP": true,
	"DisableUPNP": false,
	"DisableDHT": false,
	"DisableUpload": false,
	"DownloadRateLimit": 0,
	"UploadRateLimit": 0,
	"ConnectionsLimit": 20,
	"DhtConnectionLimit": 500,
	"PeersListenPort": 0
}
 */
