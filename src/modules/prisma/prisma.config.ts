
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export const PRISMA_LOG_CONFIG: Array<LogDefinition> = [
  { level: 'warn', emit: 'stdout' },
  { level: 'info', emit: 'stdout' },
  { level: 'error', emit: 'stdout' },
  { level: 'query', emit: 'stdout' },
];

// Configura el cliente Prisma con la opción de log
export const PRISMA_CLIENT_OPTIONS = {
  log: PRISMA_LOG_CONFIG,
};


 