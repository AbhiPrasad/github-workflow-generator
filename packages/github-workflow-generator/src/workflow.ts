import type { Workflow } from './schema/types';

interface WorkflowGeneratorOptions {
  name?: string;
}

export class WorkflowGenerator {
  #name?: Workflow['name'];
  #on?: Workflow['on'];
  #jobs: Workflow['jobs'] = {};

  constructor({ name }: WorkflowGeneratorOptions = {}) {
    this.#name = name;
  }

  public setName(name: Workflow['name']): this {
    this.#name = name;
    return this;
  }

  public setOn(on: Workflow['on']) {
    this.#on = on;
    return this;
  }

  public addJob(name: string, job: Workflow['jobs'][string]): this {
    this.#jobs[name] = job;
    return this;
  }

  public generate(): Workflow {
    if (!this.#on) {
      throw new Error('on is required');
    }

    if (Object.keys(this.#jobs).length === 0) {
      throw new Error('At least one job must be defined');
    }

    return {
      name: this.#name,
      on: this.#on,
      jobs: this.#jobs,
    };
  }
}
