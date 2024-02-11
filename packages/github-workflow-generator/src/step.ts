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

import type { Env, ExpressionSyntax, NormalJob, Shell, WorkingDirectory } from 'github-workflow-ts-schema';
import type { Run } from './run';
import { dropUndefinedKeys } from './utils';

export type StepOptions = {
  /**
   * A unique identifier for the step. You can use the id to reference the step in contexts.
   * For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  id?: string;
  /**
   * You can use the if conditional to prevent a step from running unless a condition is met. You can use any supported context and expression to create a conditional.
   * Expressions in an if conditional do not require the ${{ }} syntax. For more information, see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  if?: boolean | number | string;
  /**
   * A name for your step to display on GitHub.
   */
  name?: string;
  /**
   * Using the working-directory keyword, you can specify the working directory of where to run the command.
   */
  workingDirectory?: WorkingDirectory;
  /**
   * You can override the default shell settings in the runner's operating system using the shell keyword.
   * You can use built-in shell keywords, or you can define a custom set of shell options.
   */
  shell?: Shell;
  /**
   * To set custom environment variables, you need to specify the variables in the workflow file.
   * You can define environment variables for a step, job, or entire workflow using the
   * jobs.<job_id>.steps[*].env, jobs.<job_id>.env, and env keywords.
   * For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv
   */
  with?: Env;
  /**
   * To set custom environment variables, you need to specify the variables in the workflow file.
   * You can define environment variables for a step, job, or entire workflow using the
   * jobs.<job_id>.steps[*].env, jobs.<job_id>.env, and env keywords.
   * For more information, see https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsenv
   */
  env?: string | Record<string, string | number | boolean | undefined>;
  /**
   * Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails.
   */
  continueOnError?: boolean | ExpressionSyntax;
  /**
   * The maximum number of minutes to run the step before killing the process.
   */
  timeoutMinutes?: number | ExpressionSyntax;
};

export type CommunityStepOptions = Omit<StepOptions, 'with'>;

export type SerializedStep = {
  if?: boolean | number | string;
  id?: string;
  name?: string;
  'working-directory'?: WorkingDirectory;
  shell?: Shell;
  with?: Env;
  env?: string | Record<string, string | number | boolean | undefined>;
  'continue-on-error'?: boolean | ExpressionSyntax;
  'timeout-minutes'?: number | ExpressionSyntax;
};

abstract class BaseStep {
  #options: StepOptions;

  constructor(options: StepOptions) {
    this.#options = options;
  }

  toJSON(): SerializedStep {
    return dropUndefinedKeys({
      if: this.#options.if,
      id: this.#options.id,
      name: this.#options.name,
      'working-directory': this.#options.workingDirectory,
      shell: this.#options.shell,
      with: this.#options.with,
      env: this.#options.env,
      'continue-on-error': this.#options.continueOnError,
      'timeout-minutes': this.#options.timeoutMinutes,
    });
  }
}

export abstract class UsesStep extends BaseStep {
  /**
   * Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image (https://hub.docker.com/).
   * We strongly recommend that you include the version of the action you are using by specifying a Git ref, SHA, or Docker tag number. If you don't specify a version, it could break your workflows or cause unexpected behavior when the action owner publishes an update.
   * - Using the commit SHA of a released action version is the safest for stability and security.
   * - Using the specific major action version allows you to receive critical fixes and security patches while still maintaining compatibility. It also assures that your workflow should still work.
   * - Using the master branch of an action may be convenient, but if someone releases a new major version with a breaking change, your workflow could break.
   * Some actions require inputs that you must set using the with keyword. Review the action's README file to determine the inputs required.
   * Actions are either JavaScript files or Docker containers. If the action you're using is a Docker container you must run the job in a Linux virtual environment. For more details, see https://help.github.com/en/articles/virtual-environments-for-github-actions.
   */
  #uses: string;

  constructor(uses: string, options: StepOptions = {}) {
    super(options);

    this.#uses = uses;
  }

  toJSON(): SerializedStep & { uses: string } {
    return dropUndefinedKeys({
      ...super.toJSON(),
      uses: this.#uses,
    });
  }
}

export abstract class RunStep extends BaseStep {
  /**
   * Runs command-line programs using the operating system's shell. If you do not provide a name, the step name will default
   * to the text specified in the run command.
   *
   * Commands run using non-login shells by default. You can choose a different shell and customize the shell used to run commands.
   * For more information, see https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#using-a-specific-shell.
   *
   * Each run keyword represents a new process and shell in the virtual environment. When you provide multi-line commands,
   * each line runs in the same shell.
   */
  #run: Run;

  constructor(run: Run, options: StepOptions = {}) {
    super(options);

    this.#run = run;
  }

  toJSON(): SerializedStep & { run: Run } {
    return dropUndefinedKeys({
      ...super.toJSON(),

      // TODO: run will be no longer a string
      run: this.#run,
    });
  }
}

export type Step = UsesStep | RunStep;
