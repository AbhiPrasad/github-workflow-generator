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
export class Run {
  constructor(public readonly commands: string[]) {
    if (commands.length === 0) {
      throw new Error('At least one command must be defined');
    }

    if (commands.some(command => command === '')) {
      throw new Error('Commands cannot be empty');
    }

    // TODO: Validate passed in commands
    this.commands = commands;
  }

  public toString(): string {
    return this.commands.join('\n');
  }
}
