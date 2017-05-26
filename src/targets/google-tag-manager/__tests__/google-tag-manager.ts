import { GoogleTagManager } from '../';
import { Target } from '../../../../';

let gtmTarget: Target;

gtmTarget = GoogleTagManager();
gtmTarget = GoogleTagManager({ dataLayerName: 'someDataLayerName' });
