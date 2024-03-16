import Stats from "three/addons/libs/stats.module.js";

export const createStats = () => {
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  return stats;
};

export const updateStats = (stats: Stats) => {
  stats.update();
};
