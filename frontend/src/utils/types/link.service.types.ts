export type Link = {
  id: string;
  originalUrl: string;
  secretUrl: string;
  createdAt: string;
  timesOpened: number;
  visitorsIp: { key: string; value: number };
};
