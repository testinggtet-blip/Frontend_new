import {
  DeleteSequence,
  FetchAllSegment,
  FetchAllSequence,
  UpdateSequence,
} from 'Api/Api';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { SequenceTableColumns } from 'constants/appConstant';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetState,
  updateToEdit,
} from '../../../redux/reducers/sequenceReducer';
import NoRecord from 'components/NoRecord';
import { Box, Slide } from '@mui/material';
import ListView from 'components/ListView';
import { protectedRoutes } from 'constants/appRoutes';
import SearchBar from 'components/SearchBar';
import EnlargeSequenceModal from './EnlargeSequenceModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Sequence = () => {
  const [sequenceData, setSequenceData] = useState([]);
  const [segmentDetails, setSegmentDetails] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [enlargeOpen, setEnlargeOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NavigateToCreate = () => {
    navigate(protectedRoutes.createflows);
  };

  const EditSequence = (record) => {
    let parsed = {};
    try {
      parsed = record.sequenceData ? JSON.parse(record.sequenceData) : {};
    } catch (err) {
      console.error('Failed to parse sequenceData', err);
    }

    dispatch(
      updateToEdit({
        sequenceName: record.name,
        ...parsed,
      })
    );

    navigate(`/create-flows/${record.id}`);
  };

  const handleEnlargeSequence = (sequence) => {
    setSelectedSequence(sequence);
    setEnlargeOpen(true);
  };

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const onClose = () => {
    setDeleteModalOpen(false);
    setEnlargeOpen(false);
    setSelectedSequence(null);
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
      let response = await FetchAllSequence({ page: page, limit: rowsPerPage });
      if (response?.data?.status === true) {
        setSequenceData(response?.data?.data || []);
        setTotalCount(response?.data?.totalCount);
        if (selectedSequence) {
          const updatedSequence = response?.data?.data?.find(
            (sequence) => sequence.id === selectedSequence.id
          );
          if (updatedSequence) {
            setSelectedSequence(updatedSequence);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setInitialLoading(false);
    }
  }

  const fetchSegments = async () => {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      const response = await FetchAllSegment({
        page: 1,
        limit: 25,
      });
      if (response?.data?.status === true) {
        const activeSegments = response.data.data?.filter(
          (segment) => segment.status === 'Active'
        );
        setSegmentDetails(activeSegments || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  async function updateStatus(item) {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [item.id]: true,
    }));
    try {
      const response = await UpdateSequence(item?.id, {
        id: item.id,
        segment_name: item.segment_name,
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

  async function deleteSequenceFunc(recordId) {
    try {
      const response = await DeleteSequence(recordId);
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
    fetchSegments();
    onClose();
  }, [page, rowsPerPage]);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule={false}
          title="Flows"
          navigateTo={protectedRoutes.createflows}
        />
        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={sequenceData}
            rowData={SequenceTableColumns}
            handleEditModel={EditSequence}
            handleEnlargeModal={handleEnlargeSequence}
            handleDeleteModel={handleDeleteModel}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            sortingIndex={['status', 'name', 'createdTime', 'modifiedTime']}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            noRecordComponent={
              <NoRecord
                type="callback"
                moduleName="Flow"
                onAction={NavigateToCreate}
              />
            }
          />
        </Box>
        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          placeholder="campaign"
          deleteFunction={() => deleteSequenceFunc(deleteId)}
        />
        <EnlargeSequenceModal
          open={enlargeOpen}
          segments={segmentDetails}
          onClose={onClose}
          item={selectedSequence}
          refresh={fetch}
        />
      </Box>
    </MainDashboard>
  );
};

export default Sequence;
