import * as THREE from "three";

const cube = new THREE.BoxGeometry(1, 1, 1);

let loader = new THREE.TextureLoader();

function loadTexture(url) {
  const tex = loader.load(url);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  return tex;
}

const textures = {
  grass: loadTexture("/public/textures/grass.png"),
  residential1: loadTexture("/public/textures/residential1.png"),
  residential2: loadTexture("/public/textures/residential2.png"),
  residential3: loadTexture("/public/textures/residential3.png"),
  commercial1: loadTexture("/public/textures/commercial1.png"),
  commercial2: loadTexture("/public/textures/commercial2.png"),
  commercial3: loadTexture("/public/textures/commercial3.png"),
  industrial1: loadTexture("/public/textures/industrial1.png"),
  industrial2: loadTexture("/public/textures/industrial2.png"),
  industrial3: loadTexture("/public/textures/industrial3.png"),
};

function getTopMaterial() {
  return new THREE.MeshLambertMaterial({ color: 0x555555 });
}

function getSideMaterial(textureName) {
  return new THREE.MeshLambertMaterial({ map: textures[textureName].clone() });
}

export function createAssetInstance(type, x, y, data) {
  if (type in assets) {
    return assets[type](x, y, data);
  } else {
    console.warn(`Asset Id ${type} is undefined`);
    return undefined;
  }
}

const assets = {
  grass: (x, y) => {
    // 1. 각 좌표에 해당하는 메시/3D 객체를 불러온다.
    // 2. scene에 mesh를 추가한다.
    // grass geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "grass", x, y };
    mesh.position.set(x, -0.5, y);

    return mesh;
  },
  residential: (x, y, data) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "residentail", x, y };
    mesh.scale.set(1, data.height, 1);
    mesh.position.set(x, data.height / 2, y);

    return mesh;
  },
  commercial: (x, y, data) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "commercial", x, y };
    mesh.scale.set(1, data.height, 1);
    mesh.position.set(x, data.height / 2, y);

    return mesh;
  },
  industrial: (x, y, data) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0xffff00,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "industrial", x, y };
    mesh.scale.set(1, data.height, 1);
    mesh.position.set(x, data.height / 2, y);

    return mesh;
  },
  road: (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x444440,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "road", x, y };
    mesh.scale.set(1, 0.1, 1);
    mesh.position.set(x, 0.05, y);

    return mesh;
  },
};

function createZoneMesh(x, y, data) {
  const textureName = data.type + data.style;

  const topMaterial = getTopMaterial();
  const sideMaterial = getSideMaterial(textureName);
  let materialArray = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    topMaterial,
    sideMaterial,
    sideMaterial,
  ];
  let mesh = new THREE.Mesh(cube, materialArray);
  mesh.userData = { x, y };
  mesh.scale.set(0.8, (data.height - 0.95) / 2, 0.8);
  mesh.material.forEach((material) =>
    material.map?.repeat.set(1, data.height - 1)
  );
  mesh.position.set(x, (data.height - 0.95) / 4, y);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
