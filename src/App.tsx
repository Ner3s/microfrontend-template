import Logo from '../public/logo.png';
import './index.css';
import packageJson from '../package.json';

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <img src={Logo} />
      {packageJson.version}
    </div>
  );
}

export default App;