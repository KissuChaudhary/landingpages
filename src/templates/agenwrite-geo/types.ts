export interface MetricPoint {
  time: string;
  value: number;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
  timestamp?: string;
}

export enum ConnectionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  FAILED = 'FAILED'
}

export interface ServiceNode {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  latency: number;
}
