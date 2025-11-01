import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { TrackerContainer } from '../../Profile/style';
import { AddSite, GetJavascriptTag, DeleteSite, FetchOneSite } from 'Api/Api';
import WelcomePage from './WelcomePage';
import toast from 'react-hot-toast';

export default function DashboardMain() {
  const [range, setRange] = useState('last7');
  const [siteId, setSiteId] = useState(null);
  const [sites, setSites] = useState();
  const [selectedSite, setSelectedSite] = useState(null);
  const [jsTag, setJsTag] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isCodeStepVisible, setIsCodeStepVisible] = useState(false);
  const navigate = useNavigate();

  const setupComplete = () => {
    setIsSetupComplete(true);
    setIsCodeStepVisible(false); // prevent showing snippet again
  };

  const fetchSiteData = async (id) => {
    try {
      const [oneSite, rawTagData] = await Promise.all([
        FetchOneSite(id),
        GetJavascriptTag(id),
      ]);

      const cleanedTag = (rawTagData?.value ?? '')
        .replace(/\\n/g, '\n')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();

      setJsTag(cleanedTag);
      setSites(oneSite);
      setSelectedSite(oneSite || null);
    } catch {
      toast.error('Failed to load site');
    }
  };

  const handleCreateSite = async () => {
    const connectionId = localStorage.getItem('connectionId');
    if (!connectionId) return toast.error('Missing connection ID');

    try {
      const result = await toast.promise(AddSite(connectionId), {
        loading: 'Creating site...',
        success: 'Site created!',
      });

      if (result?.siteId) {
        localStorage.setItem('siteId', result.siteId);
        setSiteId(result.siteId);
        setIsSetupComplete(true);
        setIsCodeStepVisible(false);
        fetchSiteData(result.siteId);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteSite = async (id) => {
    try {
      await DeleteSite(id);
      localStorage.removeItem('siteId');
      setSiteId(null);
      setSelectedSite(null);
      setJsTag('');
      setIsSetupComplete(false);
      setIsCodeStepVisible(false);
      setSites((prev) =>
        Array.isArray(prev) ? prev.filter((s) => s.id !== id) : []
      );
      navigate('/website-tracker');
    } catch {
      toast.error('Failed to delete site');
    }
  };

  useEffect(() => {
    const init = async () => {
      const storedId = localStorage.getItem('siteId');
      if (storedId && storedId !== 'null' && storedId !== 'undefined') {
        setSiteId(storedId);
        setIsSetupComplete(true);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!siteId) return;
    fetchSiteData(siteId);
  }, [siteId]);

  const shouldShowWelcome = !siteId;
  const shouldShowCodeSnippet = !isSetupComplete && siteId && isCodeStepVisible;

  return (
    <Box sx={TrackerContainer}>
      {!siteId ? (
        <WelcomePage handleCreateSite={handleCreateSite} />
      ) : (
        <>
          <Header
            sites={sites}
            selectedSite={selectedSite}
            onSiteChange={(site) => {
              setSelectedSite(site);
              navigate('/website-tracker');
            }}
            setRange={setRange}
            jsTag={jsTag}
            onDeleteSite={handleDeleteSite}
            siteId={siteId}
          />
          <Dashboard range={range} selectedSite={selectedSite} />
        </>
      )}
    </Box>
  );
}
