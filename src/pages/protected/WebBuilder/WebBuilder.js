import React, { useEffect, useState } from 'react';
import { Box, Slide, Button, Stack, Typography } from '@mui/material';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { WebBuilderTableColumns, listViewIcons } from 'constants/appConstant';
import NoRecord from 'components/NoRecord';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Editor from './editor/Editor';
import { DeleteWebBuilder, FetchWebBuilder, UpdateWebBuilder } from 'Api/Api';
import EditWebBuilder from './EditWebBuilder';
import toast from 'react-hot-toast';
import SearchBar from 'components/SearchBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const WebBuilder = () => {
  const [webBuilderData, setWebBuilderData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showEditor, setShowEditor] = useState(false);

  // Custom icons for WebBuilder (exclude Enlarge icon)
  const webBuilderIcons = listViewIcons.filter(
    (icon) => icon.title !== 'Enlarge'
  );

  const handleCreateModal = () => {
    setShowEditor(true);
    setCreateModalOpen(true);
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const handleEditModel = (recordId, secondParam) => {
    // If recordId is an object (from ListView), extract the id
    const id =
      typeof recordId === 'object' ? recordId.id || recordId._id : recordId;

    const selectedData = webBuilderData.find(
      (item) => item.id === id || item._id === id
    );

    if (selectedData) {
      setEditData(selectedData);
      setEditModalOpen(true);
    }
  };

  const onClose = () => {
    setShowEditor(false);
    setDeleteModalOpen(false);
    setEditModalOpen(false);
    setEditData(null);
    setCreateModalOpen(false);
  };

  async function fetch() {
    try {
      setInitialLoading(true);
      let response = await FetchWebBuilder();
      if (response?.data?.status === true) {
        setWebBuilderData(response?.data?.data);
        setInitialLoading(false);
      }
    } catch (error) {
      setInitialLoading(false);
    }
  }

  async function deleteTemplates(recordId) {
    try {
      const response = await DeleteWebBuilder(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function updateStatus(item) {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [item.id]: true,
    }));
    try {
      const response = await UpdateWebBuilder(item?.id, {
        id: item.id,
        websiteName: item.websiteName,
        websiteUrl: item.websiteUrl,
        status: item.status === 'Active' ? 'Inactive' : 'Active',
      });
      if (response?.data?.status === true) {
        fetch();
      }
    } catch (error) {
      toast.error('Failed to update status.');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [item.id]: false,
      }));
    }
  }

  useEffect(() => {
    fetch();
    onClose();
  }, []);

  if (showEditor) {
    return (
      <Editor
        onClose={onClose}
        TransitionComponent={Transition}
        open={createModalOpen}
        refresh={fetch}
      />
    );
  }

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        {!editModalOpen && (
          <SearchBar
            connectionModule={false}
            title="Web Builder"
            onCreate={handleCreateModal}
          />
        )}
        {!editModalOpen && (
          <Box sx={ContainerStyle.listView}>
            <ListView
              tableData={webBuilderData}
              rowData={WebBuilderTableColumns}
              handleDeleteModel={handleDeleteModel}
              handleEditModel={handleEditModel}
              updateStatus={updateStatus}
              initialLoading={initialLoading}
              loading={loading}
              sortingIndex={['websiteName', 'createdTime', 'modifiedTime']}
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              noRecordComponent={
                <NoRecord
                  moduleName="Web Builder"
                  title="Create stunning websites with our easy-to-use web builder"
                  description="Design and publish beautiful, responsive websites without writing a single line of code. Our intuitive drag-and-drop interface makes website creation simple and enjoyable."
                  onAction={handleCreateModal}
                />
              }
              customIcons={webBuilderIcons}
            />
          </Box>
        )}
        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          placeholder="Web Builder"
          deleteFunction={() => deleteTemplates(deleteId)}
        />
        <EditWebBuilder
          open={editModalOpen}
          onClose={onClose}
          editData={editData}
          refresh={fetch}
        />
      </Box>
    </MainDashboard>
  );
};

export default WebBuilder;
