import { createScene } from "./scene.js";
import { createCity } from "./city.js";
import buildingFactory, { createBuilding } from "./buildings.js";

export function createGame() {
  let activeToolId = "";

  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);
  scene.onObjectSelected = (selectedObject) => {
    let { x, y } = selectedObject.userData;
    const tile = city.data[x][y];

    if (activeToolId === "bulldoze") {
      // 건물 삭제
      tile.building = undefined;
    } else if (!tile.building) {
      // 건물 생성
      tile.building = buildingFactory[activeToolId]();
    }
    scene.update(city);
  };
  document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
  document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
  document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
    setActiveToolId(toolId) {
      activeToolId = toolId;
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  function useActiveTool(object) {
    if (!object) {
      updateInfoPanel(null);
      return;
    }

    const { x, y } = object.userData;
    const tile = city.tiles[x][y];

    if (activeToolId === "select") {
      scene.setActiveObject(object);
      updateInfoPanel(tile);
    } else if (activeToolId === "bulldoze") {
      this.removeBuilding();
      scene.update(city);
    } else if (!tile.building) {
      const buildingType = activeToolId;
      tile.placeBuilding(buildingType);
      scene.update(city);
    }
  }

  function updateInfoPanel(tile) {
    document.getElementById("selected-object-info").innerHTML = tile
      ? JSON.stringify(tile, " ", 2)
      : "";
  }

  scene.start();

  return game;
}
