import { Slide, Typography } from '@mui/material';
import { FetchAllCustomPrompt, FetchAllSegment, UpdateCustomPrompt } from 'Api/Api';
import DashboardList from 'components/ListView';
import SearchBar from 'components/SearchBar';
import { MainDashboard } from 'components/Style';
import { SequenceTableColumns } from 'constants/appConstant';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditConnectModal from '../EditConnectModal';
import { DeleteModal } from 'components/Modals';
import CreateCustompromptPage from './CreateCustomPrompt';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CustomPromptDashboard = () => {
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState({ action: 'search' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const [customPromptData, setCustomPromptData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);


  const navigate = useNavigate();

  const NavigateToCreate = () => {
    navigate('/connections/custom-prompt/create');
  };
  // const onSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };
  // var filterData = customPromptData?.filter((item) => {
  //   if (item?.sequence_name?.toLowerCase()?.startsWith(search?.toLowerCase())) {
  //     return true;
  //   }
  // });

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(customPromptData?.length || parseInt(event.target.value, 50));
  //   setPage(0);
  // };

  const onClose = () => {
    setDeleteModalOpen(false);
  };

  const onCloseModal = () => {
    setCreateModalOpen(false);
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const handleEditModel = (recordId, isDetail) => {
    setEditModalOpen(true);
    setEditId(recordId);
    setIsDetail(isDetail);
  };
  async function updateStatus(item) {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [item.id]: true,
    }));
    if (item?.status === 'Active') {
      const response = await UpdateCustomPrompt({
        id: item.id,
        name: item.name,
        status: item.status === 'Active' ? 'Inactive' : '',
      });
      if (response?.status === 200) {
        fetch();
      }
      setLoading((prevLoading) => ({
        ...prevLoading,
        [item.id]: false,
      }));
    }
  }
  async function fetch() {
    try {
      setInitialLoading(true);
      let response = await FetchAllCustomPrompt();
      if (response?.data?.status === true) {
        setCustomPromptData(response?.data?.data);
        setInitialLoading(false);
      }
    } catch (error) {
      setInitialLoading(false);
    }
  }

  const handleCreateModal = () => {
    setCreateModalOpen(true);
  };

  useEffect(()=>{
    fetch()
  },[])

  return (
    <MainDashboard sx={{height:'100vh'}}>
      {/* <SearchBar
        handleOpen={NavigateToCreate}
        // search={search}
        // onSearchChange={onSearchChange}
        placeHolder="Custom Prompt"
      /> */}
      <SearchBar placeHolder="Custom Prompt" handleOpen={handleCreateModal} />

      <DashboardList
        tableData={customPromptData}
        rowData={SequenceTableColumns}
        handleDeleteModel={handleDeleteModel}
        updateStatus={updateStatus}
        handleEditModel={handleEditModel}
        initialLoading={initialLoading}
        loading={loading}
        icons={['edit', 'delete']}
        sortingIndex={['status', 'createdTime', 'modifiedTime']}
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
       <CreateCustompromptPage
        TransitionComponent={Transition}
        open={createModalOpen}
        onClose={onCloseModal}
        refresh={fetch}
        
      />
       <EditConnectModal
        TransitionComponent={Transition}
        open={editModalOpen}
        onClose={onClose}
        itemId={editId}
        isDetail={isDetail}
        refresh={fetch}
      />
      <DeleteModal
        open={deleteModalOpen}
        close={onClose}
        placeholder="campaign"
        deleteFunction={''}
      />
    </MainDashboard>
  );
};

export default CustomPromptDashboard;
