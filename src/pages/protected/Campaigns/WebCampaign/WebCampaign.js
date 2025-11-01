import React, { useEffect, useState } from 'react';
import { Box, Button, Slide, Stack, Typography } from '@mui/material';
import {
  DeleteCampaign,
  FetchAllCampaign,
  FetchAllSegment,
  FetchAllTemplate,
  UpdateCampaign,
} from 'Api/Api';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { CampaignTableColumns } from 'constants/appConstant';
import CreateCampaignModal from './CreateCampaignModal';
import EditCampaignModal from './EditCampaignModal';
import EditRealTimeCampaignModal from '../SocialCampaign/EditRealTimeCampaignModal';
import toast from 'react-hot-toast';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import NoRecord from 'components/NoRecord';
import EnlargeCampaign from './EnlargeCampaignModal';
import SearchBar from 'components/SearchBar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Campaign = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [templateDetails, setTemplateDetails] = useState([]);
  const [segmentDetails, setSegmentDetails] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editId, setEditId] = useState();
  const [searchTerms, setSearchTerms] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [enlargeOpen, setEnlargeOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editRealTimeModalOpen, setEditRealTimeModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const handleCreateModal = () => setCreateModalOpen(true);

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  const handleEditModel = (recordId, isDetail) => {
    if (recordId.type.toLowerCase() === 'social_proof') {
      setEditRealTimeModalOpen(true);
      setEditId(recordId);
      setIsDetail(isDetail);
    } else {
      setEditModalOpen(true);
      setEditId(recordId);
      setIsDetail(isDetail);
    }
  };

  const handleEnlargeCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setEnlargeOpen(true);
  };

  const onClose = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setEditRealTimeModalOpen(false);
    setDeleteModalOpen(false);
    setEnlargeOpen(false);
    setSelectedCampaign(null);
  };

  const fetch = async () => {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      setInitialLoading(true);
      const response = await FetchAllCampaign({
        page: page,
        limit: rowsPerPage,
      });
      if (response?.data?.status === true) {
        setCampaignData(response?.data?.data || []);
        setTotalCount(response?.data?.totalCount);
        if (selectedCampaign) {
          const updatedCampaign = response?.data?.data?.find(
            (campaign) => campaign.id === selectedCampaign.id
          );
          if (updatedCampaign) {
            setSelectedCampaign(updatedCampaign);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchTemplates = async () => {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      const response = await FetchAllTemplate({
        page: 1,
        limit: 25,
        welcomeTemplate: false,
      });
      if (response?.data?.status === true) {
        const activeTemplates = response?.data.data?.filter(
          (template) => template.status === 'Active'
        );
        setTemplateDetails(activeTemplates || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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

  const updateStatus = async (item) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [item.id]: true,
    }));
    try {
      const response = await UpdateCampaign(item?.id, {
        id: item.id,
        status: item.status === 'Active' ? 'Inactive' : 'Active',
      });
      if (response?.data?.status === true) {
        fetch();
      }
    } catch (error) {
      // toast.error('Failed to update status.');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [item.id]: false,
      }));
    }
  };

  const deleteCampaign = async (recordId) => {
    try {
      const response = await DeleteCampaign(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetch();
    onClose();
    fetchTemplates();
    fetchSegments();
  }, [page, rowsPerPage]);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule={false}
          title="Campaigns"
          onCreate={handleCreateModal}
        />

        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={campaignData}
            rowData={CampaignTableColumns}
            handleDeleteModel={handleDeleteModel}
            handleEditModel={handleEditModel}
            handleEnlargeModal={handleEnlargeCampaign}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            icons={['edit', 'delete', 'detail', 'enlarge']}
            sortingIndex={[
              'status',
              'campaignName',
              'type',
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
            isCampaignList={true}
            noRecordComponent={
              <NoRecord
                type="callback"
                moduleName="Campaign"
                title="Create Your First Campaign"
                description="Boost engagement with an all-in-one campaign suite: Web Push, Social Proof, Web Inbox, Email, Pop-ups, and more—drive conversions, build trust, and deliver personalized experiences across every customer touchpoint."
                onAction={handleCreateModal}
              />
            }
          />
        </Box>
        <CreateCampaignModal
          TransitionComponent={Transition}
          open={createModalOpen}
          onClose={onClose}
          templates={templateDetails}
          segments={segmentDetails}
          refresh={fetch}
          FetchTemplate={fetchTemplates}
          FetchSegment={fetchSegments}
          // openRealTime={createRealtimeModalOpen}
          // refreshRealTime={handleCampaignSubmit}
        />
        <EditCampaignModal
          TransitionComponent={Transition}
          open={editModalOpen}
          onClose={onClose}
          itemId={editId}
          isDetail={isDetail}
          refresh={fetch}
          templates={templateDetails}
          segments={segmentDetails}
          FetchTemplate={fetchTemplates}
          FetchSegment={fetchSegments}
        />

        <EditRealTimeCampaignModal
          TransitionComponent={Transition}
          open={editRealTimeModalOpen}
          onClose={onClose}
          itemId={editId}
          refresh={fetch}
          isDetail={isDetail}
          segments={segmentDetails}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
        />

        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          refresh={fetch}
          placeholder="campaign"
          deleteFunction={() => deleteCampaign(deleteId)}
        />
        <EnlargeCampaign
          open={enlargeOpen}
          onClose={onClose}
          item={selectedCampaign}
          refresh={fetch}
          templates={templateDetails}
          segments={segmentDetails}
          fetchTemplate={fetchTemplates}
          fetchSegment={fetchSegments}
        />
      </Box>
    </MainDashboard>
  );
};

export default Campaign;
