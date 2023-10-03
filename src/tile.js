// 격자 칸에 object 생성
export function createTile(x, y) {
  return {
    x,
    y,
    terrainId: "grass",
    building: null,

    // 메서드
    removeBuilding(tile) {
      this.building = null;
    },

    placeBuilding(buildingType) {
      this.building = createBuilding(buildingType);
    },
  };
}
