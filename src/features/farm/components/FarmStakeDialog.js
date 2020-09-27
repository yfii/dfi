import React, {useState, useImperativeHandle} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({poolInfo, tokenName, cRef}) => {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState(0);

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    showDialog: () => {
      setOpen(true)
    }
  }));

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        存入 {tokenName} Tokens
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{fontSize: 15}}>
          可用余额： {balance}
          <a style={{marginLeft: 10, cursor: 'pointer'}}
             onClick={() => {
               setAmount(balance)
             }}>
            全部存入
          </a>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="存入数量"
          type="number"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
            // 调用父组件的存入函数
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleClose} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  )
}