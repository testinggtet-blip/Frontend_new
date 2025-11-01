import React, { useEffect, useState } from 'react';
import { Box, Slide } from '@mui/material';
import Editor from './editor/Editor';
import { UpdateWebBuilder } from 'Api/Api';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const EditWebBuilder = ({ open, onClose, editData, refresh }) => {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (open && editData) {
      setShowEditor(true);
    } else {
      setShowEditor(false);
    }
  }, [open, editData]);

  const handleClose = () => {
    setShowEditor(false);
    onClose();
  };

  if (showEditor && editData) {
    return (
      <Editor
        onClose={handleClose}
        TransitionComponent={Transition}
        open={open}
        refresh={refresh}
        editMode={true}
        editData={editData}
        updateFunction={UpdateWebBuilder}
      />
    );
  }

  return null;
};

export default EditWebBuilder; 