Проблема цифрового кочевника Джо

Цифровой кочевник Джо оказался не готов к магнитной буре. Теперь в его файловой системе творится настоящая неразбериха.

Джо — минималист, поэтому всегда все файлы называл file и использовал собственную асинхронную файловую систему, которая базировалась на объекте Folder c двумя методами:

type File = string | Folder | {} | null | undefined;

type Folder = {
// Получить по индексу файл или папку  
 read(index: number, callback: (file: File) => void): void;

// Получить количество элементов в директории  
 size(callback: (size: number) => void): void;
}
Часть файлов осталась неповреждённой, часть потеряна навсегда — превратилась в null или {}, а еще часть повреждена, но, кажется, может быть восстановлена. Понять, что файл поврежден, очень просто — часть букв в названии дублируется. Помогите цифровому кочевнику Джо найти все такие файлы и сложите их в массив для дальнейшего анализа. Массив надо отсортировать лексикографически.

Формат ввода
Объект с определенной структурой:

Folder([
'file',
'ffffile',
Folder([
'file',
]),
Folder([
'fiiile',
]),
Folder([
{},
null,
'file',
'ffiillee',
'ffiillee',
]),
Folder([
Folder([
'filllle',
'file',
null,
]),
{},
Folder([]),
]),
]);
Формат вывода
Массив строк, отсортированный в лексикографическом порядке:

[
'ffffile',
'ffiillee',
'ffiillee',
'fiiile',
'filllle',
]
Примечание
Задачу требуется решить на JavaScript (ES2017) и оформить решение по шаблону:

module.exports = async function(input) {
// ...
return result;
}
Песочница для решения:

'use strict';

((global) => {
const timeout = 20;

    const _async = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * timeout);
    };

    const Folder = function (a = []) {
        if (!new.target) {
            return new Folder(a);
        }

        this.read = (index, cb) => _async(() => a[index], cb);
        this.size = (cb) => _async(() => a.length, cb);
    };

    Object.freeze(Folder);
    global.Folder = Folder;

})(typeof window === 'undefined' ? global : window);

const input = Folder([
'file',
'ffffile',
Folder([
'file',
]),
Folder([
'fiiile',
]),
Folder([
{},
null,
'file',
'ffiillee',
'ffiillee',
]),
Folder([
Folder([
'filllle',
'file',
null,
]),
{},
Folder([])
]),
]);

// проверка решения
solution(input).then(result => {
const answer = ['ffffile', 'ffiillee', 'ffiillee', 'fiiile', 'filllle'];
const isEqual = String(answer) === String(result);

    if (isEqual) {
        console.log('OK');
    } else {
        console.log('WRONG');
    }

});

async function solution(input) {
// ... решение задачи

    // пример вызова read
    input.read(1, (file) => console.log(file));

    // пример вызова size
    input.size((size) => console.log(size));

}
