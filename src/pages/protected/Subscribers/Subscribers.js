import { Box, Slide } from '@mui/material';
import { DeleteSubscriber, FetchAllSubscribers } from 'Api/Api';
import ListView from 'components/ListView';
import NoRecord from 'components/NoRecord';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { SubscribersTableColumns } from 'constants/appConstant';
import React, { useEffect, useState } from 'react';
import EnlargeSubscribersModal from './EnlargeSubscriberModal';
import { DeleteModal } from 'components/Modals';
import toast from 'react-hot-toast';
import SearchBar from 'components/SearchBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Subscribers = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openEnlarge, setEnlarge] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleEnlargeModal = (item) => {
    setSelectedSubscriber(item);
    setEnlarge(true);
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const onClose = () => {
    setDeleteModalOpen(false);
    setEnlarge(false);
    setSelectedSubscriber(null);
  };

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  async function fetch() {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      setInitialLoading(true);
      let response = await FetchAllSubscribers({
        page: page,
        limit: rowsPerPage,
      });
      if (response?.data?.status === true) {
        setSubscribersData(response?.data?.data);
        setTotalCount(response?.data?.totalCount);
        if (selectedSubscriber) {
          const updatedSubscriber = response?.data?.data?.find(
            (subscriber) => subscriber.id === selectedSubscriber.id
          );
          if (updatedSubscriber) {
            setSelectedSubscriber(updatedSubscriber);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setInitialLoading(false);
    }
  }

  async function deleteSubscribers(recordId) {
    try {
      const response = await DeleteSubscriber(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetch();
    onClose();
  }, [page, rowsPerPage]);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar connectionModule={false} title="Subscribers" hideCreate />
        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={subscribersData}
            rowData={SubscribersTableColumns}
            handleDeleteModel={handleDeleteModel}
            initialLoading={initialLoading}
            loading={loading}
            sortingIndex={['status', 'createdTime', 'modifiedTime']}
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
                moduleName="Subscribers"
                title="No subscribers found"
                description="Subscribers will appear here once they opt-in to your notifications. Make sure you've completed the setup by adding the notification widget to your website as per the connection settings."
                hideButton={true}
              />
            }
          />
        </Box>

        <EnlargeSubscribersModal
          onCloseModal={onClose}
          open={openEnlarge}
          item={selectedSubscriber}
          refresh={fetch}
        />

        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          refresh={fetch}
          placeholder="Subscriber"
          deleteFunction={() => deleteSubscribers(deleteId)}
        />
      </Box>
    </MainDashboard>
  );
};

export default Subscribers;
