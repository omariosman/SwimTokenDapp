import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const WalletModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='modal-box'
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter" >
          <h3 className='modal-head'> PICK YOUR WALLET</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='walletHere'>
          <img src='images/metamask.png' />
          <p>Metamask</p>
        </div>
        <div className='walletHere'>
          <img src='images/wallet-connect.jpg' />
          <p>Wallet Connect</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default WalletModal;