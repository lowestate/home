import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import HomePage from './homePage'
import ResPage from './resPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import AccountPage from './accountPage';
import AuthPage from './authPage';
import NavBar from '../components/navigation/NavBar';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import store from '../store/store';
import ReportsPage from './reportsPage';
import ReportDetailedPage from './reportDetailedPage';
import ManageResources from './manageResourcesPage';
//import NewResPage from './newResourcePage';
import EditPage from './editPage';
import MenuPage from './menuPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <BrowserRouter>
        <NavBar />
        <Breadcrumbs />
        <Routes>
          <Route path="/home" Component={MenuPage} />
          <Route path="/resources" Component={HomePage} />
          <Route path="/resources/:resource_name" Component={ResPage} />
          <Route path="/resources/:resource_name/edit" Component={EditPage} />
          <Route path="/resources/new" Component={EditPage} />
          <Route path="/reports" Component={ReportsPage} />
          <Route path="/reports/:report_id" Component={ReportDetailedPage} />
          <Route path="/manage_reports" Component={ManageResources} />
          <Route path="/auth" Component={AuthPage} />
          <Route path="/profile" Component={AccountPage} />

          <Route path="/resources-front" element={<HomePage />} />
          <Route path="/resources-front/:resource_name" element={<ResPage />} />
          
        </Routes>
      </BrowserRouter>
    </Provider>
)