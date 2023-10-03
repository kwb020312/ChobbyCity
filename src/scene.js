import * as THREE from "three";
import { createCameraManager } from "./camera.js";
import { createAssetInstance } from "./assets.js";

export function createScene() {
  // Scene 초기설정
  const gameWindow = document.getElementById("render-target");
  const scene = new THREE.Scene();

  const cameraManager = createCameraManager(gameWindow);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameWindow.appendChild(renderer.domElement);

  // 오브젝트 선택 관련
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 최근 선택된 obj
  let activeObject = undefined;

  // 최근 마우스오버 된 obj
  let hoverObject = undefined;

  // tile위치 정보가 저장된 1차원 배열
  let buildings = [];

  function initialize(city) {
    scene.clear();
    buildings = [];

    // grass geometry
    for (let x = 0; x < city.size; x++) {
      const column = [];
      for (let y = 0; y < city.size; y++) {
        const mesh = createAssetInstance(city.data[x][y].terrainId, x, y);
        scene.add(mesh);
        column.push(mesh);
      }
      // terrain.push(column);
      buildings.push([...Array(city.size)]);
    }

    setupLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y];
        const existingBuildingMesh = buildings[x][y];

        // 플레이어가 건물을 지웠을 경우, scene 적용
        if (!tile.building && existingBuildingMesh) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = undefined;
        }

        // 데이터 모델이 변경된 경우, scene update
        if (tile.building && tile.building.updated) {
          scene.remove(existingBuildingMesh);
          buildings[x][y] = createAssetInstance(
            tile.building.type,
            x,
            y,
            tile.building
          );
          scene.add(buildings[x][y]);
          tile.building.updated = false;
        }
      }
    }
  }

  function setupLights() {
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(20, 20, 20);
    sun.castShadow = true;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 0;
    sun.shadow.camera.bottom = -10;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
  }

  function draw() {
    renderer.render(scene, cameraManager.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function onMouseDown(event) {
    cameraManager.onMouseDown(event);

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cameraManager.camera);

    let intersections = raycaster.intersectObjects(scene.children, false);
    if (intersections.length > 0) {
      if (activeObject) activeObject.material.emissive.setHex(0);
      activeObject = intersections[0].object;
      activeObject.material.emissive.setHex(0x555555);

      if (this.onObjectSelected) {
        this.onObjectSelected(activeObject);
      }
    }
  }

  function onMouseUp(event) {
    cameraManager.onMouseUp(event);
  }

  function onMouseMove(event) {
    cameraManager.onMouseMove(event);
  }

  return {
    activeObject,
    initialize,
    update,
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
}
