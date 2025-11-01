import React, { useEffect, useState } from 'react';
import { Box, Slide, useMediaQuery } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  DeleteConnection,
  FetchAllConnnection,
  FetchAllCustomPrompt,
  FetchAllTemplate,
  UpdateConnection,
} from 'Api/Api';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { ConnectionTableColumns } from 'constants/appConstant';
import EditConnectModal from './EditConnectModal';
import { protectedRoutes } from 'constants/appRoutes';
import NoRecord from 'components/NoRecord';
import EnlargeCustomModal from './EnlargeConnectionModal';
import SearchBar from 'components/SearchBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ConnectDashboard = () => {
  const [connectionData, setConnectionData] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tempItem, setTempItem] = useState({});
  const [openEnlarge, setEnlarge] = useState(false);
  const [welcomeTemplate, setWelcomeTemplate] = useState(null);
  const [customPrompt, setCustomPrompt] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [noConnectionToastShown, setNoConnectionToastShown] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleCreateModal = () => {
    if (connectionData.length >= 1) {
      toast.error('You cannot create more than one Connection');
    } else {
      navigate(protectedRoutes.createConnect);
    }
  };

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  const helperDocs = () => navigate(protectedRoutes.createConnect);

  const handleEnlargeModal = (item) => {
    setTempItem(item);
    setEnlarge(true);
  };

  const handleEditModel = (recordId, isDetail) => {
    setEditModalOpen(true);
    setEditId(recordId);
    setIsDetail(isDetail);
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const onClose = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const closeEnlargeModal = () => setEnlarge(false);

  const fetchConnections = async () => {
    try {
      setInitialLoading(true);
      const response = await FetchAllConnnection({ page, limit: rowsPerPage });

      if (response?.data?.status === true) {
        const connections = response.data.data || [];
        if (!connections.length) {
          setConnectionData([]);
          setTotalCount(0);
          if (!sessionStorage.getItem('noConnectionToastShown')) {
            toast.error('There is no connection, please create one.');
            sessionStorage.setItem('noConnectionToastShown', 'true');
          }
        } else {
          const firstConnection = connections[0];
          localStorage.setItem('connectionId', firstConnection.id);
          localStorage.setItem('siteId', firstConnection.siteId);
          setConnectionData(connections);
          setTotalCount(response.data.totalCount);
          sessionStorage.removeItem('noConnectionToastShown');
        }
      } else {
        setConnectionData([]);
        setTotalCount(0);
      }
    } catch (error) {
      setConnectionData([]);
      setTotalCount(0);
    } finally {
      setInitialLoading(false);
    }
  };

  const deleteConnect = async (recordId) => {
    try {
      const response = await DeleteConnection(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetchConnections();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to delete connection'
      );
    }
  };

  const updateStatus = async (item) => {
    setLoading((prev) => ({ ...prev, [item.id]: true }));
    try {
      if (item.status === 'Active') {
        const response = await UpdateConnection({
          id: item.id,
          name: item.name,
          status: 'Inactive',
        });
        if (response?.status === 200) fetchConnections();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const fetchWelcomeTemplate = async () => {
    if (!hasConnectionId()) return;

    try {
      const response = await FetchAllTemplate({
        page: 1,
        limit: 5,
        welcomeTemplate: true,
      });
      if (response?.data?.status) {
        const welcome = response.data.data.find(
          (t) => t.welcomeTemplate === true
        );
        if (welcome) setWelcomeTemplate(welcome);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchCustomPrompt = async () => {
    if (!hasConnectionId()) return;

    try {
      let response = await FetchAllCustomPrompt();
      if (response?.data?.data !== null) {
        const { connection, ...dataWithoutConnection } = response?.data?.data;
        setCustomPrompt(dataWithoutConnection);
      } else {
        setCustomPrompt(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
    onClose();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (!initialLoading) {
      fetchWelcomeTemplate();
      fetchCustomPrompt();
    }
  }, [initialLoading]);

  useEffect(() => {
    const updatedItem = connectionData.find((item) => item.id === tempItem.id);
    if (updatedItem) setTempItem(updatedItem);
  }, [connectionData]);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule
          title="Connections"
          connectionDataLength={connectionData.length}
          onCreate={handleCreateModal}
          onHelpDocs={helperDocs}
        />

        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={connectionData}
            rowData={ConnectionTableColumns}
            handleDeleteModel={handleDeleteModel}
            handleEditModel={handleEditModel}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            icons={['edit', 'delete', 'detail']}
            sortingIndex={['name', 'createdTime', 'modifiedTime']}
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
                moduleName="Connection"
                title="Connect Your Website"
                description="Set up the connection between your website and our platform to enable powerful notification features. This one-time setup will allow you to engage with your visitors effectively."
                onAction={handleCreateModal}
              />
            }
          />
        </Box>

        <EnlargeCustomModal
          close={closeEnlargeModal}
          open={openEnlarge}
          item={tempItem}
          welcomeTemplate={welcomeTemplate}
          refresh={fetchConnections}
          refreshWelcomeTemplate={fetchWelcomeTemplate}
          refreshCustomPrompt={fetchCustomPrompt}
          customPrompt={customPrompt}
          setCustomPrompts={setCustomPrompt}
          setWelcomeTemplates={setWelcomeTemplate}
          initialLoading={initialLoading}
        />

        <EditConnectModal
          TransitionComponent={Transition}
          open={editModalOpen}
          onClose={onClose}
          itemId={editId}
          isDetail={isDetail}
          refresh={fetchConnections}
        />

        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          refresh={fetchConnections}
          placeholder="Connection"
          deleteFunction={() => deleteConnect(deleteId)}
        />
      </Box>
    </MainDashboard>
  );
};

export default ConnectDashboard;
