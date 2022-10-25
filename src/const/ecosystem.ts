import { ReactComponent as SalsaLogo } from '../assets/spicyswap_logo.svg';
import { ReactComponent as MatterLogo } from '../assets/matter_logo.svg';

export const SDAO: string = 'KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA';
export const BURNER: string = 'KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6';

export const casinoMappings: Map<string, CasinoEvent> = new Map([
  ['KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS', 'standard'],
  ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'high'],
  ['KT1HYDwHUnxNptQyrYSNF6uy9145igJ7MNPX', 'high'],
]);

export type CasinoEvent = 'standard' | 'high';

export type TezosToken = {
  tag: number;
  contract: string;
};

export interface ICasinoEvent {
  type?: CasinoEvent;
  start: Date;
  end: Date;
  participants?: number;
  burn: number;
  buyFee: number;
  buyIn: number;
  buyIns: {};
  pot: number;
}

export interface IActiveEvent {}

export interface IProjectMetric {
  id: number;
  tvl: number;
  token: TezosToken;
  tokenSupply: number;
  tokenBurn: number;
  eventStart: string;
  eventEnd: string;
}

export interface IActiveProject {
  name: string;
  ticker: string;
  logo: React.ComponentType;
  metrics?: IProjectMetric;
  activity?: number;
}

export const spicySwap: IActiveProject = {
  name: 'SpicySwap 🌶️',
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

export const salsaDao: IActiveProject = {
  name: 'SalsaDao',
  ticker: 'SDAO',
  logo: MatterLogo,
};

export const salsaEcosystem: IActiveProject[] = [salsaDao];
