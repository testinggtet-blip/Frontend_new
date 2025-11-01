import React, { useState, useEffect } from 'react';
import { Box, Slide } from '@mui/material';
import toast from 'react-hot-toast';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { FormsTableColumns } from 'constants/appConstant';
import NoRecord from 'components/NoRecord';
import SearchBar from 'components/SearchBar';
import CreateSurveyModal from './CreateFormModal';
import { UpdateForm, FetchAllForms, DeleteForm } from 'Api/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Forms = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleCreateModal = () => setCreateModalOpen(true);

  const handleEnlargeModal = (form) => {
    const connectionId = localStorage.getItem('connectionId');
    const isAuthUser = localStorage.getItem('token'); // or check Redux state
    const preview = !!isAuthUser;
    const connection = connectionId || 'guest';

    const url = `/show-forms/${form.id}?connectionId=${connection}&preview=${preview}`;
    window.open(url, '_blank');
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const onClose = () => {
    setCreateModalOpen(false);
    setDeleteModalOpen(false);
  };

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  const fetch = async () => {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }

    setInitialLoading(true);
    try {
      const response = await FetchAllForms();
      if (response?.data?.status) {
        setSurveyData(response.data.data || []);
        setTotalCount(response.data.data?.length || 0);
        if (selectedForm) {
          const updatedForm = response?.data?.data?.find(
            (form) => form.id === selectedForm.id
          );
          if (updatedForm) {
            setSelectedForm(updatedForm);
          }
        }
      }
    } catch (error) {
      toast.error('Failed to fetch surveys');
      setSurveyData([]);
      setTotalCount(0);
    } finally {
      setInitialLoading(false);
    }
  };

  const deleteSurvey = async (recordId) => {
    try {
      const response = await DeleteForm(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const updateStatus = async (item) => {
    setLoading((prev) => ({ ...prev, [item.id]: true }));
    try {
      const response = await UpdateForm(item.id, {
        ...item,
        status: item.status === 'Active' ? 'Inactive' : 'Active',
      });
      if (response?.data?.status) fetch();
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  useEffect(() => {
    fetch();
    onClose();
  }, []);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule={false}
          title="Forms"
          onCreate={handleCreateModal}
        />

        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={surveyData}
            rowData={FormsTableColumns}
            // handleEditModel={handleEditModel}
            handleDeleteModel={handleDeleteModel}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            sortingIndex={[
              'status',
              'name',
              'surveyId',
              'createdTime',
              'modifiedTime',
            ]}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleEnlargeModal={handleEnlargeModal}
            noRecordComponent={
              <NoRecord
                type="callback"
                moduleName="Forms"
                onAction={handleCreateModal}
              />
            }
          />
        </Box>
        <CreateSurveyModal
          TransitionComponent={Transition}
          open={createModalOpen}
          onClose={onClose}
          refresh={fetch}
        />
        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          refresh={fetch}
          placeholder="Surveys"
          deleteFunction={() => deleteSurvey(deleteId)}
        />
      </Box>
    </MainDashboard>
  );
};

export default Forms;
