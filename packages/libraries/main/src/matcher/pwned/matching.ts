import { MatchExtended, MatchOptions } from '../../types'
import haveIBeenPwned from './haveIBeenPwned'

/*
 * -------------------------------------------------------------------------------
 *  Have i been pwned matching factory ---------------------------------------------------
 * -------------------------------------------------------------------------------
 */
export default (universalFetch: Function, url?: string) => {
  return class MatchPwned {
    async match({ password }: MatchOptions) {
      const matches: MatchExtended[] = []
      const pwned = await haveIBeenPwned(password, universalFetch, url)
      if (pwned) {
        // @ts-ignore
        matches.push({
          pattern: 'pwned',
          pwnedAmount: parseInt(pwned.split(':')[1], 10),
        })
      }
      return matches
    }
  }
}
