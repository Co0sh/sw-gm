import { Reducer } from "react";
import { produce } from "immer";

import { DoorId, Map, MapId, RoomId } from "../model/map.model";

export type MapsAction =
  | CreateMap
  | DeleteMap
  | ResetMap
  | CreateRoom
  | EditRoom
  | DeleteRoom
  | CreateDoor
  | EditDoor
  | DeleteDoor;

interface CreateMap {
  type: "create";
  name: string;
  mapId: MapId;
  roomId: RoomId;
}

interface DeleteMap {
  type: "delete";
  id: MapId;
}

interface ResetMap {
  type: "reset";
  maps: Map[];
}

interface CreateRoom {
  type: "createRoom";
  map: MapId;
  roomId: RoomId;
  name: string;
}

interface EditRoom {
  type: "editRoom";
  mapId: MapId;
  roomId: RoomId;
  name: string;
  description: string;
}

interface DeleteRoom {
  type: "deleteRoom";
  map: MapId;
  roomId: RoomId;
}

interface CreateDoor {
  type: "createDoor";
  mapId: MapId;
  roomId: RoomId;
  doorId: DoorId;
  name: string;
  targetRoomId: RoomId;
}

interface EditDoor {
  type: "editDoor";
  mapId: MapId;
  roomId: RoomId;
  doorId: DoorId;
  name: string;
  targetRoomId: RoomId;
}

interface DeleteDoor {
  type: "deleteDoor";
  mapId: MapId;
  roomId: RoomId;
  doorId: DoorId;
}

export const mapsReducer: Reducer<Map[], MapsAction> = (state, action) =>
  produce(state, (state) => {
    switch (action.type) {
      case "create": {
        state.push({
          id: action.mapId,
          name: action.name,
          rooms: [
            {
              id: action.roomId,
              name: "Default",
              description: "This is the default room",
              doors: [],
            },
          ],
          startingRoom: action.roomId,
        });
        return;
      }
      case "delete": {
        const index = state.findIndex((map) => map.id === action.id);
        if (index < 0) {
          return;
        }
        state.splice(index, 1);
        return;
      }
      case "reset": {
        return action.maps;
      }
      case "createRoom": {
        const map = state.find((m) => m.id === action.map);
        if (!map) {
          return;
        }
        map.rooms.push({
          id: action.roomId,
          name: action.name,
          description: "New room",
          doors: [],
        });
        return;
      }
      case "editRoom": {
        const map = state.find((m) => m.id === action.mapId);
        if (!map) {
          return;
        }
        const room = map.rooms.find((r) => r.id === action.roomId);
        if (!room) {
          return;
        }
        room.name = action.name;
        room.description = action.description;
        return;
      }
      case "deleteRoom": {
        const map = state.find((m) => m.id === action.map);
        if (!map) {
          return;
        }
        if (map.startingRoom === action.roomId) {
          return;
        }
        const index = map.rooms.findIndex((r) => r.id === action.roomId);
        if (index < 0) {
          return;
        }
        map.rooms.splice(index, 1);
        map.rooms.forEach((room) => {
          const filteredDoors = room.doors.filter(
            (door) => door.targetRoom !== action.roomId
          );
          if (filteredDoors.length !== room.doors.length) {
            room.doors = filteredDoors;
          }
        });
        return;
      }
      case "createDoor": {
        const map = state.find((m) => m.id === action.mapId);
        if (!map) {
          return;
        }
        const room = map.rooms.find((r) => r.id === action.roomId);
        if (!room) {
          return;
        }
        room.doors.push({
          id: action.doorId,
          name: action.name,
          targetRoom: action.targetRoomId,
        });
        return;
      }
      case "editDoor": {
        const map = state.find((m) => m.id === action.mapId);
        if (!map) {
          return;
        }
        const room = map.rooms.find((r) => r.id === action.roomId);
        if (!room) {
          return;
        }
        const door = room.doors.find((d) => d.id === action.doorId);
        if (!door) {
          return;
        }
        door.name = action.name;
        door.targetRoom = action.targetRoomId;
        return;
      }
      case "deleteDoor": {
        const map = state.find((m) => m.id === action.mapId);
        if (!map) {
          return;
        }
        const room = map.rooms.find((r) => r.id === action.roomId);
        if (!room) {
          return;
        }
        const index = room.doors.findIndex((d) => d.id === action.doorId);
        if (index < 0) {
          return;
        }
        room.doors.splice(index, 1);
        return;
      }
      default: {
        return;
      }
    }
  });
