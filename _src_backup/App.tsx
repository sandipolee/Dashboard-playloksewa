import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModelSets from './pages/ModelSets';
import CreateModelSet from './pages/CreateModelSet';
import UserManagement from './pages/UserManagement';
import Revenue from './pages/Revenue';
import GlobalSettings from './pages/GlobalSettings';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/model-sets" element={<ModelSets />} />
          <Route path="/model-sets/create" element={<CreateModelSet />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/settings" element={<GlobalSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
