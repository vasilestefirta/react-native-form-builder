import { AppRegistry } from 'react-native';
import App from './App';
import SignUp from './SignUp';
import { name as appName } from './app.json';

// NOTE: set this flag to `true` if you want to see the Salary Calculator form
const showCalculatorForm = false;

AppRegistry.registerComponent(appName, () => (showCalculatorForm ? App : SignUp));
