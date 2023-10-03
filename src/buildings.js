export function createBuilding(buildingType) {
  switch (buildingType) {
    case "residential":
      return createResidentialBuilding();
    case "commercial":
      return createCommercialBuilding();
    case "industrial":
      return createIndustrialBuilding();
    case "road":
      return createRoad();
    default:
      console.error(`${buildingType} is not a recognired building type`);
  }
}

function createResidentialBuilding() {
  return {
    type: "residential",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: true,
    update: function () {
      if (Math.random() < 0.01) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
  };
}

function createCommercialBuilding() {
  return {
    type: "commercial",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: true,
    update: function () {
      if (Math.random() < 0.01) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
  };
}

function createIndustrialBuilding() {
  return {
    type: "industrial",
    style: Math.floor(3 * Math.random()) + 1,
    height: 1,
    updated: true,
    update: function () {
      if (Math.random() < 0.01) {
        if (this.height < 5) {
          this.height += 1;
          this.updated = true;
        }
      }
    },
  };
}

function createRoad() {
  return {
    type: "road",
    updated: true,
    update: function () {
      this.updated = false;
    },
  };
}
