const entry = document.querySelector("entry");
function solution(entry) {
  let children = entry.children;
  const copies = [];
  const removes = [];
  const removeChildrens = [];
  const switches = [];
  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    if (element.hasAttribute("x-make")) {
      let [command, value] = element.getAttribute("x-make").split(":");
      switch (command) {
        case "copy":
          copies.push([element, value]);
          break;
        case "remove":
          removes.push([element, value]);
          break;
        case "removeChildren":
          removeChildrens.push([element, value]);
          break;
        case "switch":
          switches.push([element, value]);
          break;
      }
    }
  }

  copies.forEach(([element, value]) => {
    element.removeAttribute("x-make");

    for (let i = 0; i < value; i++) {
      let clonedElement = element.cloneNode(true);
      element.parentNode.insertBefore(clonedElement, element.nextSibling);
    }
  });

  removes.forEach(([element, value]) => {
    element.removeAttribute("x-make");
    let nextElement = element.nextElementSibling;
    for (let i = 0; i < value; i++) {
      if (nextElement) {
        nextElement.remove();
        nextElement = nextElement.nextElementSibling;
      }
    }
  });

  removeChildrens.forEach(([element, value]) => {
    element.removeAttribute("x-make");
    let children = element.children;

    for (let i = 0; i < value; i++) {
      if (children.length > 0) {
        children[0].remove();
      }
    }
  });

  switches.forEach(([element, value]) => {
    element.removeAttribute("x-make");
    let parent = element.parentNode;
    let nextElement = element;
    for (let i = 0; i < value; i++) {
      if (nextElement.nextElementSibling) {
        nextElement = nextElement.nextElementSibling;
      } else if (parent) {
        nextElement = parent.children[0];
      } else {
        nextElement = null;
      }
    }

    if (nextElement) {
      swap(element, nextElement);
    }
  });

  for (let i = 0; i < children.length; i++) {
    const element = children[i];

    solution(element);
  }
}

function swap(node1, node2) {
  const parent1 = node1.parentNode;
  const parent2 = node2.parentNode;
  const nextNode1 = node1.nextSibling;
  const nextNode2 = node2.nextSibling;

  parent1.insertBefore(node2, nextNode1);
  parent2.insertBefore(node1, nextNode2);
}

solution(entry);
