import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
  grass: (x, y) => {
    // 1. 각 좌표에 해당하는 메시/3D 객체를 불러온다.
    // 2. scene에 mesh를 추가한다.
    // grass geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, -0.5, y);

    return mesh;
  },
  "building-1": (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x777777,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 0.5, y);

    return mesh;
  },
  "building-2": (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x777777,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 2, 1);
    mesh.position.set(x, 1, y);

    return mesh;
  },
  "building-3": (x, y) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x777777,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 3, 1);
    mesh.position.set(x, 1.5, y);

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
