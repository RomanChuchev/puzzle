const body = document.body;

const frame = document.createElement("div");
frame.classList.add("frame");

body.append(frame);

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile");

  frame.append(tile);
}

for (let i = 0; i < 15; i++) {
  createTile();
}
