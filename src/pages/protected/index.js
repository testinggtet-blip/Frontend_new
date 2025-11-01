import { Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen/HomeScreen';
import { AppScreenRoute, protectedRoutes } from '../../constants/appRoutes';
import Template from './Templates/Template';
import ConnectDashboard from './Connections/ConnectDashboard';
import Campaign from './Campaigns/WebCampaign/WebCampaign';
import CodeInjection from './Connections/CodeInjection';
import AboutCustomer from './Users/AboutCustomer';
import Subscribers from './Subscribers/Subscribers';
import Segment from './Segments/Segment';
import ProfileScreen from './Profile/ProfileScreen';
import DashboardMain from './WebsiteTracker/Dashboard/DashboardMain';
import CustomPromptMain from './Connections/customPrompt/CustomPromptMain';
import Connections from './Connections/Connection';
import AppScreenLayout from 'components/AppScreenLayout';
import RealtimeCampaign from './Campaigns/SocialCampaign/RealtimeCampaign';
import RealtimeAnalytics from './Analytics/RealtimeAnalytics';
import RealtimeFeeds from './RealtimeFeeds/RealtimeFeeds';
import WebBuilder from './WebBuilder/WebBuilder';
import Forms from './Forms/Forms';
import Sequence from './Sequence/Sequence';
import CreateSequence from './Sequence/CreateSequence';
import EnlargeFormModal from './Forms/EnlargeFormModal';


const ProtectedScreen = () => {
  return (
    <Routes>
      <Route path={AppScreenRoute} element={<AppScreenLayout />}>
        <Route path={protectedRoutes.home} element={<HomeScreen />} />
        <Route path={protectedRoutes.websiteTracker} element={<DashboardMain />} />
        <Route path={protectedRoutes.templates} element={<Template />} />
        <Route path={protectedRoutes.flows} element={<Sequence />} />
        <Route path={protectedRoutes.createflows} element={<CreateSequence />} />
        <Route path={protectedRoutes.editflows} element={<CreateSequence />} />
        <Route path={protectedRoutes.forms} element={<Forms />} />
        {/* <Route path={protectedRoutes.enlargeforms} element={<EnlargeFormModal />} /> */}
        <Route path={protectedRoutes.editforms} element={<Forms />} />
        <Route path={protectedRoutes.connections} element={<ConnectDashboard />}/>
        <Route path={protectedRoutes.customPrompt}element={<CustomPromptMain />}/>
        <Route path={protectedRoutes.webCampaigns} element={<Campaign />} />
        <Route path={protectedRoutes.subscribers} element={<Subscribers />} />
        <Route path={protectedRoutes.segments} element={<Segment />} />
        <Route path={protectedRoutes.webBuilder} element={<WebBuilder />} />
        <Route path={protectedRoutes.profile} element={<ProfileScreen />} />
        <Route path={protectedRoutes.realtimeCampaigns} element={<RealtimeCampaign />} />
        <Route path={protectedRoutes.analytics} element={<RealtimeAnalytics/>} />
        <Route path={protectedRoutes.feeds} element={<RealtimeFeeds/>} />
      </Route>
      <Route path={protectedRoutes.questions} element={<AboutCustomer />} />
      <Route path={protectedRoutes.createConnect} element={<Connections />} />
      <Route path={protectedRoutes.codeInjection} element={<CodeInjection />} />
    </Routes>
  );
};

export default ProtectedScreen;
