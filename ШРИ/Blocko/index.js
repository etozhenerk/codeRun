// interface Block {
//   id: number;
//   form: number[][];
// }

// interface LayoutResult {
//   blockId: number;
//   position: number;
//   isRotated: boolean;
// }

function layout(blocks) {
  const length = blocks.reduce((acc, block) => acc + block.form.length, 0);

  const grid = Array.from({ length: length }, () =>
    Array(blocks[0].form[0].length).fill(0)
  );

  function canInsert(block, row, col, rotated) {
    const form = rotated ? transpose(block.form) : block.form;
    if (
      row + form.length > grid.length ||
      col + form[0].length > grid[0].length
    ) {
      return false; // блок выходит за пределы сетки
    }
    for (let i = row; i < row + form.length; i++) {
      for (let j = col; j < col + form[0].length; j++) {
        if (grid[i][j] !== 0 && form[i - row][j - col] === 0) {
          return false; // блок перекрывается с другим блоком
        }
      }
    }

    return true;
  }

  function insert(block, row, col, rotated) {
    const form = rotated ? transpose(block.form) : block.form;
    for (let i = row; i < row + form.length; i++) {
      for (let j = col; j < col + form[0].length; j++) {
        grid[i][j] = form[i - row][j - col];
      }
    }
  }

  function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }

  const result = [];
  let position = 1;
  for (const block of blocks) {
    let row = 0,
      col = 0,
      rotated = false;
    while (
      !canInsert(block, row, col, rotated) &&
      !canInsert(block, row, col, !rotated)
    ) {
      col++;
      console.log(col, row);
      if (col + block.form[0].length > grid[0].length) {
        col = 0;
        row++;
      }
    }
    if (canInsert(block, row, col, rotated)) {
      insert(block, row, col, rotated);
    } else {
      insert(block, row, col, !rotated);
      rotated = true;
    }

    result.push({
      blockId: block.id,
      position: position++,
      isRotated: rotated,
    });
  }
  console.log(grid);
  return result;
}

console.log(
  layout([
    {
      id: 443,
      form: [
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      id: 327,
      form: [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
        [0, 1, 0],
      ],
    },
    {
      id: 891,
      form: [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
  ])
);
