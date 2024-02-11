// interface ParentJob {
//   name: string;
//   output: {
//     foo: 'bar';
//   };
// }

import type { Workflow } from 'github-workflow-ts-schema';

// interface JobWithNeeds<T> {
//   needs: BaseJob<T>;
//   output?: Record<string, string>;
// }

// interface BaseJob<T> {
//   output?: T;
// }

// function getNeedOutputs<U, T extends JobWithNeeds<U>>(job: T): U | undefined {
//   return job.needs.output;
// }

// const j: BaseJob<{ foo: string }> = {
//   output: {
//     foo: 'bar',
//   },
// };

// const j2: JobWithNeeds<typeof j['output']> = {
//   needs: j,
// };

// const l = getNeedOutputs(j2);

// class Job<Output extends Record<string, string> = {}> {
//   readonly #parent: Job;
//   readonly #output: Output;

//   constructor({ output, parent }: { output: Output; parent: Job }) {
//     this.#parent = parent;
//     this.#output = output;
//   }

//   public addParentJob(parent: Job): this {
//     return new Job<Output>({ output: this.#output, parent });
//   }

//   public getOutput(): Output {
//     return this.#output;
//   }
// }

// interface Job<T extends Job = Job> {
//   name: string;
//   parent: T;
//   input: T['output'];
//   output?: Record<string, string>;
// }

// type Job = ParentJob | ChildJob<ParentJob>;

// const j: Job = {
//   name: 'parent',
//   output: {
//     foo: 'bar',
//   },
// };

// const childJ: Job = {
//   name: 'child',
//   parent: j,
// };

// const child2J

// // function getOutput

// interface IWith<Target, Supplied> {
//   with<T extends Omit<Target, keyof Supplied>, K extends keyof T>(
//     key: K,
//     value: T[K],
//   ): keyof Omit<Omit<Target, keyof Supplied>, K> extends never ? IBuild<Target> : IWith<Target, Supplied & Pick<T, K>>;
// }

// interface IBuild<Target> {
//   build(): Target;
// }
// class Builder<Target, Supplied> implements IBuild<Target>, IWith<Target, Supplied> {
//   constructor(private target: Partial<Target>) {}

//   // biome-ignore lint/complexity/noBannedTypes: <explanation>
//   public static new<Target>(): IWith<Target, {}> {
//     // biome-ignore lint/complexity/noBannedTypes: <explanation>
//     return new Builder<Target, {}>({});
//   }

//   with<T extends Omit<Target, keyof Supplied>, K extends keyof T>(key: K, value: T[K]) {
//     const target: Partial<Target> = { ...this.target, [key]: value };

//     return new Builder<Target, Supplied & Pick<T, K>>(target);
//   }

//   build() {
//     return this.target as Target;
//   }
// }

// const b = Builder.new<Workflow['jobs'][string]>().with('name', 'foo').with(''
