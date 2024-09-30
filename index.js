import chalk from 'chalk';
import { InterfaceManager } from './InterfaceManager.js';
import { UI } from './UI.js';
import { sleep, checkAdmin } from './utils.js';
import { TaskScheduler } from './TaskScheduler.js';



console.clear();
console.log(chalk.blue('Checking if the application is running as an administrator...'));
await checkAdmin();
console.clear();


let TS = new TaskScheduler(10000);


while (true) {
    console.clear();
    let interfaceName = await UI.chooseInterface(InterfaceManager.getAvailableInterfaces());

    switch (interfaceName) {
        case 'delay':
            TS.delay = await UI.changeDelay();
            console.log(chalk.green(`Task scheduler delay changed to ${TS.delay} milliseconds`));
            await sleep(2000);
            continue; 
        case 'exit':
            process.exit();
    }

    manageInterface:
    while (true) {
        console.clear();
        let choice = await UI.manageInterface(interfaceName); 
        
        switch (choice) {
            case 'enable':
                console.log(chalk.yellow(`Enabling "${interfaceName}"`));
                let enableResult = InterfaceManager.enableInterface(interfaceName);  
                if (enableResult !== true) {
                    console.log(chalk.red(`Failed to enable ${interfaceName}\n${enableResult}`));
                    await sleep(2500);
                    continue;
                }
                console.log(chalk.green(`Successfully enabled "${interfaceName}"`));
                await sleep(1200);
                break;

            case 'disable':
                console.log(chalk.yellow(`Disabling "${interfaceName}"`));
                let disableResult = InterfaceManager.disableInterface(interfaceName);  
                if (disableResult !== true) {
                    console.log(chalk.red(`Failed to disable ${interfaceName}\n${disableResult}`));
                    await sleep(2500);
                    continue;
                }
                console.log(chalk.green(`Successfully disabled "${interfaceName}"`));
                await sleep(1200);
                break;

            case 'enablelater':
                TS.enableInterfaceLater(interfaceName);
                console.log(chalk.green('Task created'));
                await sleep(700);
                break;
            
            case 'disablelater':
                TS.disableInterfaceLater(interfaceName);
                console.log(chalk.green('Task created'));
                await sleep(700);
                break;
            
            case 'back':
                TS.clearAllScheduledTasks();
                break manageInterface;
        }
    }
}
