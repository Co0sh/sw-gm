export const byId = <T extends String>(targetId: T) => ({
  id: sourceId,
}: {
  id: T;
}) => targetId === sourceId;
