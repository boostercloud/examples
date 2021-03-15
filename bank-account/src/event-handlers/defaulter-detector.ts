import { WithdrawPerformed } from '../events/withdraw-performed'
import {Booster, EventHandler} from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import {Account} from '../entities/account'
import {DefaulterDetected} from '../events/defaulter-detected'

@EventHandler(WithdrawPerformed)
export class DefaulterDetector {
  public static async handle(event: WithdrawPerformed, register: Register): Promise<void> {
    const account = await Booster.fetchEntitySnapshot(Account, event.iban)
    if (!account) {
      console.log('[DefaulterDetector] No account found with IBAN: ' + event.iban)
      return
    }
    if (account.balance < 0) {
      register.events(new DefaulterDetected(account.owner, account.id, account.balance))
    }
  }
}
