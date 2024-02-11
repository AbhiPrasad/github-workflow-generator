import { NormalJob } from 'github-workflow-ts-schema';

import { Step } from './step';

interface JobBuilderOptions {
  runsOn: NormalJob['runs-on'];
}

class JobBuilder {
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

  constructor({ runsOn }: JobBuilderOptions) {
    this.#runsOn = runsOn;
  }
}
