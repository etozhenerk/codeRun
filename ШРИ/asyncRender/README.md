Вы пишете движок для асинхронного рендеринга. Необходимо написать функцию для асинхронного рендеринга с приоритетом.

Формат ввода
На вход подается массив объектов, описывающих данные для рендеринга. Объект имеет структуру:

interface RenderItem {
id: string; // идентификатор элемента
priority: number; // приоритет рендеринга - сначала рендерим элементы с наибольшим приоритетом
render: () => Promise<RenderItem[]>; // асинхронная функция, которая выполняет рендеринг текущего элемента и возвращает список вложенных элементов для рендеринга либо null
}
Формат вывода
От вас требуется написать асинхронную функцию, которая принимает на вход список элементов для рендеринга и максимальное количество элементов для одновременного рендеринга, а возвращает список идентификаторов всех элементов в порядке их рендеринга:

function renderAsync(renderItems: RenderItem[], n: Number): Promise<string[]>;
Необходимо рендерить элементы максимально возможными по количеству группами, но не большими, чем n элементов. Пока элементы группы не отрендерены, другие элементы не берутся в обработку, а ожидают своей очереди.
Элементы с одинаковым приоритетом нужно рендерить в порядке их перечисления или появления.
Примечания
Исходный код нужно оформить следующим образом:

module.exports = function (renderItems, n) {  
 // ваше решение
}
