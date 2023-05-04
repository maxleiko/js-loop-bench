function createArray(n: number): number[] {
  return new Array(n).fill(0).map((_, i) => i);
}

function forEach(arr: number[]) {
  let sum = 0;
  arr.forEach((v) => (sum += v));
  return sum;
}

function forLoopOldSchool(arr: number[]) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function forOf(arr: number[]) {
  let sum = 0;
  for (const v of arr) {
    sum += v;
  }
  return sum;
}

function reduce(arr: number[]) {
  return arr.reduce((p, n) => p + n, 0);
}

function run(n: number, arr: number[], fn: (arr: number[]) => void) {
  const start = performance.now();
  for (let i = 0; i < n; i++) {
    fn(arr);
  }
  return (performance.now() - start) / n;
}

const batches = [10, 100, 1_000, 10_000, 100_000, 1_000_000]
  .map((size) => createArray(size))
  .map((arr) => {
    const nb_runs = 1000;
    let max = 0;

    const fe = run(nb_runs, arr, forEach);
    if (fe > max) {
      max = fe;
    }

    const fl = run(nb_runs, arr, forLoopOldSchool);
    if (fl > max) {
      max = fl;
    }

    const fo = run(nb_runs, arr, forOf);
    if (fo > max) {
      max = fo;
    }

    const re = run(nb_runs, arr, reduce);
    if (re > max) {
      max = re;
    }

    return {
      size: `${arr.length}`.padEnd(7, ' '),
      forEach: (fe / max).toPrecision(2).padEnd(7, ' '),
      forLoopOldSchool: (fl / max).toPrecision(2).padEnd(7, ' '),
      forOf: (fo / max).toPrecision(2).padEnd(7, ' '),
      reduce: (re / max).toPrecision(2).padEnd(7, ' '),
    };
  });


console.log(`size   ;forEach;forLoop;forOf  ;reduce`);
for (const b of batches) {
  console.log(`${b.size};${b.forEach};${b.forLoopOldSchool};${b.forOf};${b.reduce}`);
}
