import { ReactComponent as SalsaLogo } from '../assets/spicyswap_logo.svg';
import { ReactComponent as MatterLogo } from '../assets/matter_logo.svg';

export type TezosToken = {
  tag: number;
  contract: string;
};

export interface IProjectMetric {
  id: number;
  tvl: number;
  token: TezosToken;
  tokenSupply: number;
  tokenBurn: number;
}

export interface IActiveProject {
  name: string;
  ticker: string;
  logo: React.ComponentType;
  metrics?: IProjectMetric;
  activity?: number;
}

export const spicySwap: IActiveProject = {
  name: 'SpicySwap',
  ticker: 'SPI',
  logo: SalsaLogo,
};

export interface ISpicyToken {
  symbol: string;
  derivedXtz: number;
  tag: number;
  decimals: number;
}

export interface ISpicyPool {
  symbol: string;
  derivedXtz: number;
  tag: number;
  decimals: number;
}

export interface ISpicyMetric {
  dailyXtz: number;
  tvlXtz: number;
  volumeXtz: number;
  txCount: number;
}

export const matterDefi: IActiveProject = {
  name: 'MatterDefi',
  ticker: 'MTTR',
  logo: MatterLogo,
};

export const salsaEcosystem: IActiveProject[] = [spicySwap, matterDefi];
