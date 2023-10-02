export function createCity(size) {
  const data = [];

  initialize();

  //   N * N 의 데이터 생성
  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = { x, y, building: undefined };

        if (Math.random() > 0.7) {
          tile.building = "building";
        }

        column.push(tile);
      }
      data.push(column);
    }
  }

  return {
    size,
    data,
  };
}
