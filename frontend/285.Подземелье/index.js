function check(map, x, y, res) {
  if (
    y < 0 ||
    y >= map.length ||
    x < 0 ||
    x >= map[y].length ||
    map[y][x] !== 1
  ) {
    return;
  }

  if (y === 0) {
    res.ceil = true;
  }
  if (y === map.length - 1) {
    res.floor = true;
  }

  map[y][x] = -1;

  check(map, x, y - 1, res);
  check(map, x - 1, y, res);
  check(map, x + 1, y, res);
  check(map, x, y + 1, res);
}

function scan(map) {
  const ans = {
    ceil: 0,
    floor: 0,
    both: 0,
  };

  if (map.length === 0) {
    return ans;
  }

  for (let i = 0; i < map[0].length; i++) {
    let touched = {
      ceil: false,
      floor: false,
    };
    check(map, i, 0, touched);
    if (touched.ceil) {
      if (touched.floor) {
        ans.both++;
      } else {
        ans.ceil++;
      }
    }

    touched = {
      ceil: false,
      floor: false,
    };
    check(map, i, map.length - 1, touched);
    if (touched.floor) {
      if (touched.ceil) {
        ans.both++;
      } else {
        ans.floor++;
      }
    }
  }
  return ans;
}

module.exports = { scan };
