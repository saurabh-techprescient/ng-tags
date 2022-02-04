/**
 * Created by adriangillette on 1/10/17.
 */

export class UserModel {
  constructor(
    public areaOfInterest           = '',
    public assignedCompanyId        = '',
    public assignedCompanyName      = '',
    public assignedTenantId         = '',
    public assignedTenantName       = '',
    public city                     = '',
    public countryCode              = '',
    public email                    = '',
    public externalId               = '',
    public firstName                = '',
    public jobTitle                 = '',
    public lastName                 = '',
    public mobilePhone              = '',
    public postalCode               = '',
    public region                   = '',
    public requestedCompanyId       = '',
    public requestedCompanyName     = '',
    public requestedCompanyWebsite  = '',
    public requestedTenantId        = '',
    public requestedTenantName      = '',
    public status                   = '',
    public userName                 = '',
    public userNameWithAt           = '',
    public customPermission         = {}
  ) {  }

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
