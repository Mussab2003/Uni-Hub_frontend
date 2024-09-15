import {Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Modal from "../modal";

export const ModalForm = ({
  control,
  onClose,
  state,
  title,
  handleSubmit,
  onSubmit,
  categories,
  errors,
  isSubmit,
  watch,
}) => {
  return <Modal onClose={onClose} isOpen={state.isOpen} title={title}>
    <form  onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                
            </Grid>
        </Grid>
    </form>

  </Modal>;
};
