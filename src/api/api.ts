import ky from "ky";

const KY = ky.create({
  timeout: 300000,
  prefixUrl: "/app/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default KY;
