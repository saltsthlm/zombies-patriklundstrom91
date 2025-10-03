import { ok } from "node:assert/strict";
import { test } from "node:test";

const createRoom = (capacity: number) => {
  const _capacity = capacity;
  let zombies: string[] = [];
  return { addZombie(zombie: string){
    if (zombies.length < _capacity) {
      zombies.push(zombie);
    } else {
      zombies = [zombie];
    }
  },
    isFull: () => {
      if (_capacity > zombies.length) {
        return false;
      } else {
        return true;
      }
    },
    zombieName: () => {
      return zombies[0];
    }
  };
};

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("empty room that fits one zombie is not full", () => {
  const room = createRoom(1);
  const isRoomFull = room.isFull();

  ok(!isRoomFull);
});

test("room with no capacity cannot fit any zombies", () => {
  const room = createRoom(0);
  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("one-roomer becomes full when a zombie is added", () => {
  const room = createRoom(1);
  room.addZombie("z1");
  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("two-roomer is not full when a zombie is added", () => {
  const room = createRoom(2);
  room.addZombie("z1");
  const isRoomFull = room.isFull();

  ok(!isRoomFull);
});

test("second zombie consumes first zombie when added to a one-roomer", () => {
  const room = createRoom(1);
  room.addZombie("z1");
  room.addZombie("z2");
  const isRoomFull = room.isFull();
  const zombieName = room.zombieName();

  ok(isRoomFull && zombieName == "z2")
});

// You are free to add more tests that you think are relevant!
