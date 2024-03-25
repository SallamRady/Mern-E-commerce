const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postions = [
  [51.0, -0.09],
  [51.5, -0.09],
];
module.exports.movePoint = async (req, res, next) => {
  const io = require("../socket").getIO();
  let start = [51.0, -0.09];
  await sleep(1000);

  for (let i = 0; i < 400; i++) {
    start[0] = start[0] + 0.01;
    io.emit("deliveryMoves", {
      action: "delivery man is moved",
      content: { postion: start },
    });
    if (i == 4) {
      return res.json({ msg: "done" });
    }
  }
};
