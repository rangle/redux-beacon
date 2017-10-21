import {
  Amplitude,
  SetUserId,
  SetUserProperties,
  ClearUserProperties,
  LogEvent,
  SetGroup,
  RegenerateDeviceId,
  SetOptOut,
  SetVersionName,
  Identify,
  LogRevenueV2,
} from '../';
import { Target } from '../../../../';

let amplitudeTarget: Target;

amplitudeTarget = Amplitude();
