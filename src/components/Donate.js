import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import CreditCardIcon from '@material-ui/icons/CreditCard'
import List from '@material-ui/core/List'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const donateFrame =
    '<iframe src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D0%B2&targets-hint=&default-sum=200&button-text=14&payment-type-choice=on&mobile-payment-type-choice=on&comment=on&hint=&successURL=&quickpay=shop&account=410013733697114" width="100%" height="302" frameborder="0" allowtransparency="true" scrolling="no"></iframe>'

export default function DonateDialog() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <ListItem button key="Donate" onClick={handleClickOpen}>
                <ListItemIcon>
                    <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary="Donate" />
            </ListItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Donate</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                <Button onClick={() => window.open('https://www.paypal.com/paypalme/yourok', '_blank')}>PayPal</Button>
                                <Button onClick={() => window.open('https://yoomoney.ru/to/410013733697114', '_blank')}>Yandex.Money</Button>
                            </ButtonGroup>
                        </ListItem>
                        <ListItem>
                            <div dangerouslySetInnerHTML={{ __html: donateFrame }} />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
