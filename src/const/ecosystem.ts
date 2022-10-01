import { ReactComponent as SalsaLogo } from '../assets/spicyswap_logo.svg';
import { ReactComponent as MatterLogo } from '../assets/matter_logo.svg';

export interface IActiveProject {
  name: string;
  ticker: string;
  logo: React.ComponentType;
  tvl?: number;
  activity?: number;
}

export const spicySwap: IActiveProject = {
  name: 'SpicySwap',
  ticker: 'SPI',
  logo: SalsaLogo,
};

export const matterDefi: IActiveProject = {
  name: 'MatterDefi',
  ticker: 'MTTR',
  logo: MatterLogo,
};

export const salsaEcosystem: IActiveProject[] = [spicySwap, matterDefi];
