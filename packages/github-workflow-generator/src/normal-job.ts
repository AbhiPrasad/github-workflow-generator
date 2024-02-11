import { Concurrency, Matrix, NormalJob } from 'github-workflow-ts-schema';

import { Step } from './step';
import { ObjectToCamel } from './vendor/ts-case-convert';

interface JobBuilderOptions {
  runsOn: NormalJob['runs-on'];
}

export class JobBuilder {
  /**
   * The type of machine to run the job on. The machine can be either a GitHub-hosted runner, or a self-hosted runner.
   */
  #runsOn: NormalJob['runs-on'];

  /**
   * The name of the job displayed on GitHub.
   */
  #name?: string;

  /**
   * Identifies any jobs that must complete successfully before this job will run.
   * It can be a string or array of strings.
   *
   * If a job fails, all jobs that need it are skipped unless the jobs use a conditional
   * statement that causes the job tocontinue.
   */
  #needs?: string[];

  /**
   * You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required,
   * so that you only allow the minimum required access.
   */
  #permissions?: NormalJob['permissions'];

  /**
   * The environment that the job references.
   */
  #environment?: NormalJob['environment'];

  /**
   * A map of outputs for a job. Job outputs are available to all downstream jobs that depend on this job.
   */
  #outputs?: NormalJob['outputs'];

  /**
   * To set custom environment variables, you need to specify the variables in the workflow file.
   * You can define environment variables for a step, job, or entire workflow using
   * the jobs.<job_id>.steps[*].env, jobs.<job_id>.env, and env keywords.
   *
   * For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv
   */
  #env?: NormalJob['env'];

  /**
   * A map of default settings that will apply to all steps in the job.
   */
  #defaults?: NormalJob['defaults'];

  /**
   * You can use the if conditional to prevent a job from running unless a condition is met.
   * You can use any supported context and expression to create a conditional.
   *
   * Expressions in an if conditional do not require the ${{ }} syntax.
   * For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  #if?: NormalJob['if'];

  /**
   * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action
   * in your repository, a public repository, or an action published in a Docker registry.
   *
   * Not all steps run actions, but all actions run as a step. Each step runs in its own process in the virtual environment
   * and has access to the workspace and filesystem. Because steps run in their own process, changes to environment
   * variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
   *
   * Must contain either `uses` or `run`
   *
   * @minItems 1
   */
  #steps?: Step[];

  /**
   * A strategy creates a build matrix for your jobs. You can define different variations of an environment to run each job in.
   */
  #strategy?: ObjectToCamel<NormalJob['strategy']>;

  /**
   * Prevents a workflow run from failing when a job fails. Set to true to allow a workflow run to pass when this job fails.
   */
  #continueOnError?: NormalJob['continue-on-error'];

  /**
   * A container to run any steps in a job that don't already specify a container. If you have steps that use both script and
   * container actions, the container actions will run as sibling containers on the same network with the same volume mounts.
   *
   * If you do not set a container, all steps will run directly on the host specified by runs-on unless a step refers to an
   * action configured to run in a container.
   */
  container?: NormalJob['container'];

  /**
   * Additional containers to host services for a job in a workflow. These are useful for creating databases or cache services
   * like redis. The runner on the virtual machine will automatically create a network and manage the life cycle of the service
   * containers.
   *
   * When you use a service container for a job or your step uses container actions, you don't need to set port information to
   * access the service. Docker automatically exposes all ports between containers on the same network.
   *
   * When both the job and the action run in a container, you can directly reference the container by its hostname. The hostname
   * is automatically mapped to the service name.
   *
   * When a step does not use a container action, you must access the service using localhost and bind the ports.
   */
  #services?: NormalJob['services'];

  /**
   * Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. A concurrency group can be any string or expression. The expression can use any context except for the secrets context.
   * You can also specify concurrency at the workflow level.
   * When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending. Any previously pending job or workflow in the concurrency group will be canceled. To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.
   */
  #concurrency?: ObjectToCamel<Concurrency>;

  constructor({ runsOn }: JobBuilderOptions) {
    this.#runsOn = runsOn;
  }
}
