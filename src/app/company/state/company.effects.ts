import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'

import { CompanyService } from '../company.service'
import * as companyActions from './company.actions'

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {
  }

  // tslint:disable-next-line:member-ordering
  @Effect() loadCompanies$ = this.actions$.pipe(
    ofType(companyActions.LOAD_COMPANIES),
    switchMap(
      () => this.companyService.loadCompanies()
        .pipe(
          map(companies => new companyActions.LoadCompaniesSuccessAction(companies))
        )
    )
  )

  // tslint:disable-next-line:member-ordering
  @Effect() deleteCompany$ = this.actions$.pipe(
    ofType(companyActions.DELETE_COMPANY),
    switchMap(
      (action: companyActions.DeleteCompanyAction) => this.companyService.deleteCompany(action.payload)
        .pipe(
          map(company => new companyActions.DeleteCompanySuccessAction(company.id))
        )
    )
  )

}
