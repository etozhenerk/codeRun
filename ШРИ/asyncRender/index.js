async function renderAsync(renderItems, n) {
  const queue = [...renderItems].sort(
    (a, b) =>
      b.priority - a.priority || renderItems.indexOf(a) - renderItems.indexOf(b)
  );

  let result = [];
  while (queue.length > 0) {
    const batch = [];
    while (queue.length > 0 && batch.length < n) {
      batch.push(queue.shift());
    }

    const promises = batch.map((item) => item.render());

    const batchResult = await Promise.all(promises);
    queue.push(
      ...batchResult
        .flatMap((item) => item)
        .filter((item) => !!item)
        .sort((a, b) => b.priority - a.priority)
    );
    queue.sort((a, b) => b.priority - a.priority);
    result.push(...batch.map(({ id }) => id));
  }

  return result;
}

renderAsync(
  [
    {
      id: "A",
      priority: 1,
      render: () =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 1, [
            {
              id: "A.1",
              priority: 2,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, [
                    {
                      id: "A.1.1",
                      priority: 2,
                      render: () =>
                        new Promise((resolve, reject) => {
                          setTimeout(resolve, 1, null);
                        }),
                    },
                  ]);
                }),
            },
          ]);
        }),
    },
    {
      id: "B",
      priority: 2,
      render: () =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 1, [
            {
              id: "B.1",
              priority: 3,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
            {
              id: "B.2",
              priority: 3,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
            {
              id: "B.3",
              priority: 3,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
            {
              id: "B.4",
              priority: 1,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
            {
              id: "B.5",
              priority: 1,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
            {
              id: "B.6",
              priority: 1,
              render: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 1, null);
                }),
            },
          ]);
        }),
    },
  ],
  5
).then((t) => console.log(t));
