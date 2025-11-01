import React, { useEffect, useState } from 'react';
import { Box, Slide } from '@mui/material';
import toast from 'react-hot-toast';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { SegmentTableColumns } from 'constants/appConstant';
import CreateSegmentModal from './CreateSegmentModal';
import EditSegmentModal from './EditSegmentModal';
import NoRecord from 'components/NoRecord';
import { DeleteSegment, FetchAllSegment, UpdateSegment } from 'Api/Api';
import EnlargeSegmentModal from './EnlargeSegmentModal';
import { Button, Stack, Typography } from '@mui/material';
import SearchBar from 'components/SearchBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Segment = () => {
  const [segmentData, setSegmentData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState({});
  const [searchTerms, setSearchTerms] = useState({ action: 'search' });
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openEnlarge, setOpenEnlarge] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleCreateModal = () => setCreateModalOpen(true);

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  const handleEditModel = (recordId, isDetail) => {
    setEditModalOpen(true);
    setEditId(recordId);
    setIsDetail(isDetail);
  };

  const handleEnlargeView = (item) => {
    setSelectedSegment(item);
    setOpenEnlarge(true);
  };

  const onClose = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setOpenEnlarge(false);
    setSelectedSegment(null);
  };

  async function fetch() {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      setInitialLoading(true);
      let response = await FetchAllSegment({
        page: page,
        limit: rowsPerPage,
      });
      if (response?.data?.status === true) {
        setSegmentData(response?.data?.data);
        setTotalCount(response?.data?.totalCount);
        if (selectedSegment) {
          const updatedSegment = response?.data?.data?.find(
            (segment) => segment.id === selectedSegment.id
          );
          if (updatedSegment) {
            setSelectedSegment(updatedSegment);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setInitialLoading(false);
    }
  }

  async function deleteSegment(recordId) {
    try {
      const response = await DeleteSegment(recordId);
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
      const response = await UpdateSegment(item?.id, {
        id: item.id,
        segmentName: item.segmentName,
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
  }, [page, rowsPerPage]);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule={false}
          title="Segments"
          onCreate={handleCreateModal}
        />
        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={segmentData}
            rowData={SegmentTableColumns}
            handleDeleteModel={handleDeleteModel}
            handleEditModel={handleEditModel}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            sortingIndex={[
              'status',
              'segmentName',
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
            handleEnlargeModal={handleEnlargeView}
            noRecordComponent={
              <NoRecord
                moduleName="Segments"
                title="Create your first segment"
                description="Segments help you filter and target specific groups of subscribers based on their behavior and attributes. Create a segment to start organizing your audience for more targeted notifications."
                onAction={handleCreateModal}
              />
            }
          />
        </Box>
        <EnlargeSegmentModal
          open={openEnlarge}
          onCloseModal={onClose}
          item={selectedSegment}
          refresh={fetch}
        />
        <CreateSegmentModal
          TransitionComponent={Transition}
          open={createModalOpen}
          onClose={onClose}
          refresh={fetch}
        />
        <EditSegmentModal
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
          placeholder="Segment"
          deleteFunction={() => deleteSegment(deleteId)}
        />
      </Box>
    </MainDashboard>
  );
};

export default Segment;
