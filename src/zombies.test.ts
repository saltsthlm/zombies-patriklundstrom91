import { ok } from "node:assert/strict";
import { test } from "node:test";

const createRoom = (capacity: number) => {
  const _capacity = capacity;
  let zombies: string[] = [];
  return { addZombie(zombie: string){
    zombies.push(zombie);
  },
    isFull: () => {
      if (_capacity > zombies.length) {
        return false;
      } else {
        return true;
      }
    },
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

test.skip("second zombie consumes first zombie when added to a one-roomer", () => {});

// You are free to add more tests that you think are relevant!
