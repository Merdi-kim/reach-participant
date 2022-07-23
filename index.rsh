'reach 0.1';
'use strict'

export const main = Reach.App(() => {
  setOptions({ untrustworthyMaps: true });
  const A = Participant('Deployer', {
    reportInfo:Fun([], Null),
    reportNewUser:Fun([Address], Null)
  });
  const B = API('Participant', {
    whiteList:Fun([Address], UInt),
  });

  init();

  A.publish()
  A.interact.reportInfo()

  const whiteListedAddresses = new Set()

  const [whiteListedAddressesLength, canWhiteList] =
  parallelReduce([0, true])
  .invariant(balance() == 0)
  .while(canWhiteList)
  .api(B.whiteList, 
    (_) => {
      check(!whiteListedAddresses.member(this), "You're already whitelisted")
      check(whiteListedAddressesLength < 5, "Whitelist spots are done")
    },
    (_) => 0,
    (who, k) => {
      check(!whiteListedAddresses.member(this), "You're already whitelisted")
      check(whiteListedAddressesLength < 5, "Whitelist spots are done")
      whiteListedAddresses.insert(who)
      A.interact.reportNewUser(who)
      k(whiteListedAddressesLength+1)
      return [whiteListedAddressesLength+1, true];
    }
  )
  
  commit();
  exit();

})