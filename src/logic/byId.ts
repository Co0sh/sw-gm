export const byId = (targetId: string) => ({ id: sourceId }: { id: string }) =>
  targetId === sourceId;
