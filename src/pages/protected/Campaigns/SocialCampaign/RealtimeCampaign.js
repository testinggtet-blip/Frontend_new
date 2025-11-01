import React, { useEffect, useState } from 'react';
import { Slide, Box, Stack, Button, Typography } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { DeleteCampaign, FetchAllCampaign, UpdateCampaign } from 'Api/Api';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { MainDashboard } from 'components/Style';
import { CampaignTableColumns } from 'constants/appConstant';
import CreateCampaignModal from './CreateRealTimeCampaignModal';
import EditCampaignModal from './EditRealTimeCampaignModal';
import toast from 'react-hot-toast';
import NoRecord from 'components/NoRecord';
import EnlargeCampaign from './EnlargeRealTimeCampaignModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const CampaignStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '84vw',
    margin: '0',
    padding: '20px 16px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'absolute',
    marginLeft: '-4px',
  },
  topBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  heading: {
    color: 'black',
    fontWeight: 'normal',
  },
  listView: {
    flexGrow: 1,
    width: '100%',
    overflow: 'hidden',
  },
};

const RealtimeCampaign = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [enlargeOpen, setEnlargeOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const fetchCampaigns = () => {
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      setCampaignData(JSON.parse(storedCampaigns));
    } else {
      console.log("No campaigns found in local storage.");
    }
    setInitialLoading(false);
  };

  const handleCampaignSubmit = (newCampaign) => {
    const timestamp = new Date().toISOString();
    const campaignWithTimestamps = {
      ...newCampaign,
      createdTime: timestamp,
      updatedTime: timestamp,
      frequency: '',
    };
    setCampaignData((prevCampaigns) => {
      const updatedCampaigns = [...prevCampaigns, campaignWithTimestamps];
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      return updatedCampaigns;
    });
    toast.success("Campaign created successfully!");
  };

  const updateStatus = async (item) => {
    setLoading((prev) => ({ ...prev, [item.id]: true }));
    try {
      const response = await UpdateCampaign({
        id: item.id,
        status: item.status === 'Active' ? 'Inactive' : 'Active',
      });
      if (response?.data?.status) {
        setCampaignData((prevCampaigns) => {
          const updatedCampaigns = prevCampaigns.map(campaign =>
            campaign.id === item.id ? { ...campaign, status: item.status === 'Active' ? 'Inactive' : 'Active' } : campaign
          );
          localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
          return updatedCampaigns;
        });
        toast.success("Campaign status updated successfully!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating campaign');
    } finally {
      setLoading((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const deleteCampaign = (recordId) => {
    const updatedCampaigns = campaignData.filter(campaign => campaign.id !== recordId);
    setCampaignData(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    toast.success("Campaign deleted successfully!");
  };

  const handleCloseModals = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setEnlargeOpen(false);
    setSelectedCampaign(null);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <MainDashboard>
      <Box sx={CampaignStyle.container}>
        <Stack direction="row" sx={CampaignStyle.topBar}>
          <Typography variant="h5" sx={CampaignStyle.heading}>
            Realtime Notifications
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddToPhotosIcon />}
            onClick={() => setCreateModalOpen(true)}
            size="large"
            sx={{ width: '150px', marginLeft: '16px', marginBottom: '6px' }}
          >
            Create
          </Button>
        </Stack>
        <Box sx={CampaignStyle.listView}>
          <ListView
            tableData={campaignData}
            rowData={CampaignTableColumns}
            handleDeleteModel={(recordId) => {
              setDeleteId(recordId);
              setDeleteModalOpen(true);
            }}
            handleEditModel={(recordId, isDetail) => {
              const selectedCampaign = campaignData.find(campaign => campaign.id === recordId);
              setEditId(recordId);
              setIsDetail(isDetail);
              setSelectedCampaign(selectedCampaign); 
              setEditModalOpen(true);
            }}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            icons={['edit', 'delete', 'detail']}
            sortingIndex={['status', 'campaignName', 'createdTime', 'modifiedTime']}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            noRecordComponent={
              <NoRecord
                type="callback"
                moduleName="Campaign"
                onAction={() => setCreateModalOpen(true)}
              />
            }
            handleEnlargeModal={(campaign) => {
              setSelectedCampaign(campaign);
              setEnlargeOpen(true);
            }}
          />
        </Box>

        <CreateCampaignModal
          TransitionComponent={Transition}
          open={createModalOpen}
          onClose={handleCloseModals}
          refresh={handleCampaignSubmit}
        />

        <EditCampaignModal
          TransitionComponent={Transition}
          open={editModalOpen}
          onClose={handleCloseModals}
          itemId={editId}
          isDetail={isDetail}
          refresh={fetchCampaigns}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
        />

        <DeleteModal
          open={deleteModalOpen}
          close={handleCloseModals}
          placeholder="campaign"
          deleteFunction={() => deleteCampaign(deleteId)}
        />

        <EnlargeCampaign
          open={enlargeOpen}
          onClose={() => setEnlargeOpen(false)}
          item={selectedCampaign}
        />
      </Box>
    </MainDashboard>
  );
};

export default RealtimeCampaign;
