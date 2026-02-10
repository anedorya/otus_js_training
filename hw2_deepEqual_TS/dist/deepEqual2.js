"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeepEqualityCompare {
    // Map для хранения пар объектов, которые уже были сравнены
    visited;
    constructor() {
        this.visited = new Map();
    }
    equal(a, b) {
        // 1. Сравнение примитивов и null/undefined
        if (a === b)
            return true;
        if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
            // Разные типы, null и примитивы, которые не ===
            return false;
        }
        // 2. Обработка циклических ссылок
        // Проверяем, были ли эти объекты уже сравнены в текущем контексте
        const objA = a;
        const objB = b;
        let visitedB = this.visited.get(objA);
        if (visitedB?.has(objB)) {
            return true;
        }
        if (!visitedB) {
            visitedB = new Set();
            this.visited.set(objA, visitedB);
        }
        visitedB.add(objB);
        // 3. Сравнение типов объектов (массив/объект/дата и т.д.)       
        const typeA = Object.prototype.toString.call(a);
        const typeB = Object.prototype.toString.call(b);
        if (typeA !== typeB) {
            return false;
        }
        // Специальная обработка для дат (если нужно)
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }
        // 4. Сравнение массивов
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (!this.equal(a[i], b[i]))
                    return false;
            }
            return true;
        }
        // 5. Сравнение простых объектов
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length)
            return false;
        for (const key of keysA) {
            const valA = a[key];
            const valB = b[key];
            if (!Object.prototype.hasOwnProperty.call(b, key) || !this.equal(valA, valB)) {
                return false;
            }
        }
        return true;
    }
}
function deepEqual(a, b) {
    const comparer = new DeepEqualityCompare();
    return comparer.equal(a, b);
}
// // --- Тесты ---
// console.log("--- Запуск тестов. Все результаты тестов должны быть true ---");
// // 1. Примитивы
// console.log("Тест 1 (Примитивы. Числа):", deepEqual(1, 1) === true);
// console.log("Тест 1.1 (Примитивы. Строки):", deepEqual('11', '11') === true);
// console.log("Тест 2 (Разные типы):", deepEqual(1, '1') === false);
// console.log("Тест 3 (Null и Undefined):", deepEqual(null, undefined) === false);
// console.log("Тест 3.1 (Null и Null):", deepEqual(null, null) === true);
// console.log("Тест 3.2 (Undefined и Undefined):", deepEqual(undefined, undefined) === true);
// // 2. Массивы
// console.log("Тест 4 (Массивы простые):", deepEqual([1, 2, 3], [1, 2, 3]) === true);
// console.log("Тест 5 (Массивы разные):", deepEqual([1, 2, 3], [1, 2, 4]) === false);
// console.log("Тест 6 (Вложенные массивы):", deepEqual([[1, 2], 3], [[1, 2], 3]) === true);
// // 3. Вложенные объекты
// const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
// const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
// const obj3 = { a: 1, b: { c: 2, d: [3, 4, 5] } };
// console.log("Тест 7 (Вложенные объекты):", deepEqual(obj1, obj2) === true);
// console.log("Тест 8 (Разные вложенные объекты):", deepEqual(obj1, obj3) === false);
// // 4. Циклические ссылки
// const cycleObj1 = { a: 1 };
// cycleObj1.b = cycleObj1;
// const cycleObj2 = { a: 1 };
// cycleObj2.b = cycleObj2;
// const cycleObj3 = { a: 1, b: { c: 2 } };
// console.log("Тест 9 (Циклические ссылки, равные):", deepEqual(cycleObj1, cycleObj2) === true);
// console.log("Тест 10 (Циклические ссылки, разные):", deepEqual(cycleObj1, cycleObj3) === false);
// // 5. Комбинированный тест с датами
// const date1 = new Date('2023-01-01T00:00:00.000Z');
// const date2 = new Date('2023-01-01T00:00:00.000Z');
// const date3 = new Date('2023-01-02T00:00:00.000Z');
// const complexObj1 = { date: date1, arr: [cycleObj1, { x: 1 }] };
// const complexObj2 = { date: date2, arr: [cycleObj2, { x: 1 }] };
// const complexObj3 = { date: date3, arr: [cycleObj1, { x: 1 }] };
// console.log("Тест 11 (Комбинированный с датами и циклами):", deepEqual(complexObj1, complexObj2) === true);
// console.log("Тест 12 (Комбинированный, разные даты):", deepEqual(complexObj1, complexObj3) === false);
