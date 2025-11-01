import CreateRealCampaign from '../SocialCampaign/CreateRealCampaign';

const CampaignSocialProof = ({ campaignDetails, setCampaignDetails, handleRealTimeSubmit, segments=[], FetchSegment, setPreviewImage }) => {
  return (
    <CreateRealCampaign
      campaignDetails={campaignDetails}
      setCampaignDetails={setCampaignDetails}
      handleRealTimeSubmit={handleRealTimeSubmit}
      segments={segments}
      FetchSegment={FetchSegment}
      setPreviewImage={setPreviewImage}
    />
  );
};

export default CampaignSocialProof;
