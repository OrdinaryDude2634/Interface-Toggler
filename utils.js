import { execSync } from 'child_process';
import chalk from 'chalk';



export function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function isAdmin() {
    try {
        execSync(`net session`, {windowsHide: true, stdio: ['ignore', 'ignore', 'pipe']});
    } catch (e) {
        if (e.toString().includes('Access is denied')) {
            console.log(chalk.red('This application requires administrative privileges to function properly, please run it as an administrator'));
            await sleep(3000);
            process.exit();
        } else {
            console.log(chalk.red(`An unexpected error has happened\n${e.toString()}`));
            await sleep(3000);
            process.exit();
        }
    }
}