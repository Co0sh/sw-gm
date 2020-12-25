export interface MapId extends String {
  __mapId: never;
}

export interface RoomId extends String {
  __roomId: never;
}

export interface DoorId extends String {
  __doorId: never;
}

export const asMapId = (id: string): MapId => id as any;
export const asRoomId = (id: string): RoomId => id as any;
export const asDoorId = (id: string): DoorId => id as any;

export interface Map {
  id: MapId;
  name: string;
  startingRoom: RoomId;
  rooms: Room[];
}

export interface Room {
  id: RoomId;
  name: string;
  description: string;
  doors: Door[];
}

export interface Door {
  id: DoorId;
  name: string;
  targetRoom: RoomId;
}
