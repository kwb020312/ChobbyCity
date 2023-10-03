import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

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
  residential: (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "residentail", x, y };
    mesh.position.set(x, 0.5, y);

    return mesh;
  },
  commercial: (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "commercial", x, y };
    mesh.position.set(x, 0.5, y);

    return mesh;
  },
  industrial: (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0xffff00,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id: "industrial", x, y };
    mesh.position.set(x, 0.5, y);

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

export function createAssetInstance(assetId, x, y) {
  if (assetId in assets) {
    return assets[assetId](x, y);
  } else {
    console.warn(`Asset Id ${assetId} is undefined`);
    return undefined;
  }
}
