import { loadStdlib, ask } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs'

const stdlib = loadStdlib(process.env);

const roles = ["Deployer", "Participant"]
const role = await ask.ask("Which role are you playing: 1.Deployer or 2.Participant")
const initialAmount = stdlib.parseCurrency(20)

if(roles[role-1] === "Deployer") {
    const deployerAccount= await stdlib.newTestAccount(initialAmount);
    const accountToWhiteList= await stdlib.newTestAccount(initialAmount);
    const deployerCtc = deployerAccount.contract(backend);
    const DeployerInteract = {
        reportInfo: async() => {
          console.log(`Contract info: ${JSON.stringify(await deployerCtc.getInfo())}`);
          console.log(`People are now able to whiteList themselves`);
        },
        reportNewUser: (addr) => {
          console.log(`New user has joined:${addr}`)
        }
    };
    await deployerCtc.participants.Deployer(DeployerInteract)
} else {
    const accounts = await stdlib.newTestAccounts(7,initialAmount);
    const whiteList = async(who) => {
      try {
        const user = accounts[who]
        const info = await ask.ask('Paste contract info:', (s) => JSON.parse(s));
        const attacherCtc = user.contract(backend, info);
        const passed = await attacherCtc.apis.Participant.whiteList(user.networkAccount.addr);
        console.log(`spot-${Number(passed)} filled`)
      } catch(err) {
        const newErr = 'Whitelist spots are done'
        console.log(newErr)
      }
      
    }

    for(let i = 0; i<7;i++) {
      await whiteList(i)
    }
    
  }
    


ask.done();