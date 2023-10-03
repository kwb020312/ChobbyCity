import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
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
