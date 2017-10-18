/**
 * Throw an array to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
export function sequence(items, consumer) {
  const results = [];
  const runner = () => {
    const item = items.shift();
    if (item) {
      const result = consumer(item);
      results.push(result);
      return runner();
    }

    return Promise.resolve(results);
  };

  return runner();
}
