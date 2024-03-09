import { ExtensionModule } from '@rokii/api';

const run: ExtensionModule['run'] = async () => {

};

const MathExtension: ExtensionModule = {
  name: 'Math',
  run,
  icon: ''
};

export default MathExtension;
