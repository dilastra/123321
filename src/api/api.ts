import ky from "ky";

const KY = ky.create({
  timeout: 300000,
  prefixUrl: "/api/",
});

export default KY;
