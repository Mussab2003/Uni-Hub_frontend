import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react"

export const Modal = ({ isOpen, handleOpen, children, title, buttonTitlePrimary, buttonTitleSecondary}) => {
  return (
    <Dialog
      open={isOpen}
      handler={handleOpen}
      className="w-1/2"
    > 
      <DialogHeader>{title}</DialogHeader>
        <DialogBody>
          {children}
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-10">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="outlined" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </div>
        </DialogFooter>
    </Dialog>
  )
}

export default Modal
