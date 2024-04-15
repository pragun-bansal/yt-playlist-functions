import logo from './logo.svg';
import './App.css';
import PlaylistCalculator from './PlaylistCalculator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App ">
      <header className="App-header  bg-gradient-to-r from-indigo-400 to-cyan-400">
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <PlaylistCalculator />
      </header>
    </div>
  );
}

export default App;
