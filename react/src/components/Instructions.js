import Modal from '@material-ui/core/Modal';
import { useEffect, useState } from 'react'
import '../App.css';

export default function Instruction(){
    //Modal Related
	const [open, setOpen] = useState(false); 
    const handleOpenModal = () => {
      setOpen(true);
    };
    const handleCloseModal = () => {
      setOpen(false);
    };

    function Body(){
        return(
            <div>
                <div>INSTRUCTIONS</div>
            </div>
        )
    }

    return(
        <div>
            <button type="button" onClick={handleOpenModal} >Instructions</button>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <Body></Body>
            </Modal>
        </div>
    )
}