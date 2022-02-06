import packageJson from '../package.json';
import Logo from '../public/logo.png';
import './index.css';

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
