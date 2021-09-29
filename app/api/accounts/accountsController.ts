import { Controller, Get, Path, Res, Query, Route, TsoaResponse } from 'tsoa'

import { AccountModel, IAccount } from './accountModel'

@Route('accounts')
export class AccountsController extends Controller {
  /**
   * Sorts the accounts on the specified property of the account object.
   * @param property Specifies the property of account object to sort on
   * @param order Specifies the sort order
   * @param limit Specifies the maximum number of accounts in response
   * @param skip Specifies the number of account object to skip/offset response
   */
  @Get('sort/{property}')
  public async sortAccounts(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Path() property: 'amt' | 'createdDate',
    @Query() order?: 'ASCENDING' | 'DESCENDING',
    @Query() limit = 100,
    @Query() skip = 0
  ): Promise<IAccount[]> {
    try {
      let sort_expression: any = {}
      sort_expression[property] = order == 'DESCENDING' ? -1 : 1

      let accounts: any = await AccountModel.find({}).sort(sort_expression).skip(skip).limit(limit)

      accounts = accounts.map((account: any) => {
        return {
          id: account._id,
          firstName: account.firstName,
          lastName: account.lastName,
          country: account.country,
          email: account.email,
          dob: account.dob,
          mfa: account.mfa,
          amt: account.amt,
          createdDate: account.createdDate,
          referredBy: account.referredBy,
        }
      })

      return accounts
    } catch (err: any) {
      console.error('Caught error', err)
      return badReqest(400, { reason: err.message })
    }
  }

  /**
   * Filters the accounts on the specified property(s) of the account object.
   * @param country Specifies the country filter
   * @param mfa Specifies the mfa (multi factor authentication) filter
   * @param firstName Specifies the firstName filter
   * @param lastName Specifies the lastName filter
   * @param limit Specifies the maximum number of accounts in response
   * @param skip Specifies the number of account object to skip/offset response
   * @example country "CA"
   * @example mfa "SMS"
   * @example firstName "Judd"
   * @example lastName "Kuvalis"
   */
  @Get('filter')
  public async filterAccounts(
    @Res() badReqest: TsoaResponse<400, { reason: string }>,
    @Query() country?: string,
    @Query() mfa?: string,
    @Query() firstName?: string,
    @Query() lastName?: string,
    @Query() limit = 100,
    @Query() skip = 0
  ): Promise<IAccount[]> {
    try {
      let filter_expression = { country, mfa, firstName, lastName }
      filter_expression = JSON.parse(JSON.stringify(filter_expression))

      let accounts: any = await AccountModel.find(filter_expression).skip(skip).limit(limit)

      accounts = accounts.map((account: any) => {
        return {
          id: account._id,
          firstName: account.firstName,
          lastName: account.lastName,
          country: account.country,
          email: account.email,
          dob: account.dob,
          mfa: account.mfa,
          amt: account.amt,
          createdDate: account.createdDate,
          referredBy: account.referredBy,
        }
      })

      return accounts
    } catch (err: any) {
      console.error('Caught error', err)
      return badReqest(400, { reason: err.message })
    }
  }
}
