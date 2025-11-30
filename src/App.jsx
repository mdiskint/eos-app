import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Results from './components/Results';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
