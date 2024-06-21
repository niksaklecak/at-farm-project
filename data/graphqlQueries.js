/**
 * Contains GraphQL queries and mutations for interacting with farms, fields, subscriptions, and crop regions.
 *
 * @typedef {Object} graphqlQuery
 * @property {string} getFarms - GraphQL query to retrieve farms.
 * @property {function} createFarm - GraphQL mutation to create a new farm.
 * @property {function} createField - GraphQL mutation to create a new field.
 * @property {function} deleteField - GraphQL mutation to delete a field.
 * @property {function} deleteFarm - GraphQL mutation to delete a farm assignment.
 * @property {string} getUserSubscriptions - GraphQL query to retrieve user subscriptions.
 * @property {function} cancelSubscription - GraphQL mutation to cancel a subscription.
 * @property {function} addFreeSubscription - GraphQL mutation to add a free subscription.
 * @property {function} detectRegions - GraphQL query to detect regions.
 * @property {function} getCropTypes - GraphQL query to retrieve crop types for a specific region.
 * @property {function} updateUser - GraphQL mutation to update user information.
 * @property {string} me - GraphQL query to retrieve user information.
 * @property {string} deleteJdocUserToken - GraphQL mutation to delete Jdoc user token.
 */
export const graphqlQuery = {
  /**
   * GraphQL query to retrieve farms.
   * @type {string}
   */
  getFarms: `
    query Farms {
      farms {
        id
        name
        productFeatures
      }
    }
  `,
  /**
   * GraphQL mutation to create a new farm.
   * @type {function}
   * @param {string} farmName - The name of the farm.
   * @param {string} notes - Additional notes about the farm.
   * @returns {string} The GraphQL mutation.
   */
  createFarm: (farmName, notes) => `
    mutation CreateFarm {
      createFarm(input: { name: "${farmName}", notes: "${notes}" }) {
        ... on Farm {
          id
          name
          notes
          size
          updated
          created
          fieldsCount
          productFeatures
        }
      }
    }
  `,
  /**
   * GraphQL mutation to create a new field.
   * @type {function}
   * @param {string} cropType - The type of crop for the field.
   * @param {Array<Array<number>>} coordinates - The coordinates of the field's geometry.
   * @param {string} name - The name of the field.
   * @param {string} farmId - The ID of the farm to which the field belongs.
   * @param {string} regionId - The ID of the crop region for the field.
   * @returns {string} The GraphQL mutation.
   */
  createField: (cropType, coordinates, name, farmId, regionId) => `
    mutation CreateField {
      createField(
        farmFieldInput: {
          cropType: "${cropType}"
          area: null
          countryCode: null
          feature: {
            geometry: {
              type: "Polygon"
              coordinates: ${JSON.stringify(coordinates)}
            }
            id: "111452cc82df28f48a7eee604001d111"
            type: "Feature"
          }
          name: "${name}"
          farmId: "${farmId}"
          isFieldAutoDetected: false
          polarisCropRegionId: "${regionId}"
        }
        farmId: "${farmId}"
      ) {
        id
        cropType
        polarisCountryCodeId
        featureId
        name
        farmId
        area
        boundingBox
        countryCode
        updated
        created
        supportedProductFeatures
        productFeatures
        polarisCropRegionId
        isFieldAutoDetected
      }
    }
  `,
  /**
   * GraphQL mutation to delete a field.
   * @type {function}
   * @param {string} fieldId - The ID of the field to delete.
   * @returns {string} The GraphQL mutation.
   */
  deleteField: (fieldId) => `
  mutation DeleteField {
    deleteField(fieldId: "${fieldId}") {
        ... on OperationStatus {
            message
            status
        }
        ... on FormValidationError {
            fields {
                field
                value
                errors {
                    key
                    message
                }
            }
        }
    }
}
`,
  /**
   * GraphQL mutation to delete a farm assignment.
   * @type {function}
   * @param {string} fieldId - The ID of the farm assignment to delete.
   * @param {string} userId - The ID of the user associated with the farm assignment.
   * @returns {string} The GraphQL mutation.
   */
  deleteFarm: (fieldId, userId) => `
  mutation DeleteFarmAssignment {
    deleteFarmAssignment(
        farmId: "${fieldId}"
        userId: "${userId}"
    ) {
        ... on Farm {
            id
            name
            notes
            size
            updated
            created
            fieldsCount
        }
        ... on FormValidationError {
            fields {
                field
                value
                errors {
                    key
                    message
                }
            }
        }
    }
}

`,
  /**
   * GraphQL query to retrieve user subscriptions.
   * @type {string}
   */
  getUserSubscriptions: `
    query Subscriptions {
      subscriptions {
          userId
          id
          startedAt
          endsAt
          canceledAt
          isCancelable
          expired
          name
          price
          clientId
      }
  }
  `,
  /**
   * GraphQL mutation to cancel a subscription.
   * @type {function}
   * @param {string} subId - The ID of the subscription to cancel.
   * @param {string} userId - The ID of the user associated with the subscription.
   * @returns {string} The GraphQL mutation.
   */
  cancelSubscription: (subId, userId) => `
mutation CancelSubscription {
  cancelSubscription(id: "${subId}", userId: "${userId}") {
      id
      farmId
      fieldId
      userId
      clientId
      startedAt
      endsAt
      canceledAt
      productSKU
      price
      currency
      isCancelable
      promoCode
      expired
      orderNumber
  }
}
`,
  /**
   * GraphQL mutation to add a free subscription.
   * @type {function}
   * @param {string} farmId - The ID of the farm for the subscription.
   * @param {string} fieldId - The ID of the field for the subscription.
   * @param {string} currency - The currency for the subscription.
   * @param {string} countryCode - The country code for the subscription.
   * @returns {string} The GraphQL mutation.
   */
  addFreeSubscription: (farmId, fieldId, currency, countryCode) => `
    mutation CreateFreeSubscription {
        createFreeSubscriptionUnion(
            fieldId: "${fieldId}"
            farmId: "${farmId}"
            client: null
            countryCode: ${countryCode}
            currency: ${currency}
        ) {
            ... on FormValidationError {
                form {
                    key
                    message
                }
                fields {
                    field
                    value
                    errors {
                        key
                        message
                    }
                }
            }
            ... on SubscriptionEntity {
                id
                farmId
                fieldId
            }
        }
    }

`,
  /**
   * GraphQL query to detect regions.
   * @type {function}
   * @param {Array<Array<number>>} coordinates - The coordinates for region detection.
   * @returns {string} The GraphQL query.
   */
  detectRegions: (coordinates) => `
    query DetectRegions {
    detectRegions(geometry: { coordinates:  ${JSON.stringify(coordinates)}}) {
        region {
            id
            name
            geometryId
            translationKey
            countryId
            testRegion
            boundary
            area
            created
            modified
            modifiedBy
            deleted
            cropRegionsCount
        }
    }
}

`,
  /**
   * GraphQL query to retrieve crop types for a specific region.
   * @type {function}
   * @param {string} regionId - The ID of the region.
   * @returns {string} The GraphQL query.
   */
  getCropTypes: (regionId) => `
    query CropRegions {
        cropRegions(filter: [{key: "regionId", type: EQ, value: "${regionId}"}, {key: "applicationTags", type: IN, value: "CNP, PA, VRA Basic, VRA NSensor, Ntester"}]) {
            entities {
              id
              applicationTags
              planValidation {
                id
                soilAnalysisStatus
              }
              cropDescription {
                id
                name
                atFarmCropType
                cropSubClass {
                  id
                  name
              }
            }
          }
        }
    }

`,
  /**
   * GraphQL mutation to update user information.
   * @type {function}
   * @param {string} userId - The ID of the user to update.
   * @param {string} firstName - The updated first name of the user.
   * @param {string} lastName - The updated last name of the user.
   * @param {string} email - The updated email of the user.
   * @param {string} countryCode - The updated country code of the user.
   * @param {string} locale - The updated locale of the user.
   * @param {string} role - The updated role of the user.
   * @returns {string} The GraphQL mutation.
   */
  updateUser: (userId, firstName, lastName, email, countryCode, locale, role) =>
    `
  mutation UpdateUser {
    updateUser(
        input: {
            countryCode: "${countryCode}"
            email: "${email}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            locale: "${locale}"
            newsletterOptIn: false
            role: ${role}
        }
        id: "${userId}"
    ) {
        ... on User {
            email
            firstName
            lastName
            countryCode
            locale
            yaraMktConsent
            id
            farmsMapped
            role
            paidFeatures
            isAtFarmSubscriptionMigrated
        }
    }
}
`,
  /**
   * GraphQL query to retrieve user information.
   * @type {string}
   */
  me: `
  query Me {
    me {
        email
        firstName
        lastName
        countryCode
        locale
        yaraMktConsent
        id
        newsletterOptIn
        createdAt
        farmsMapped
        emailVerified
        role
        paidFeatures
        isAtFarmSubscriptionMigrated
        farms {
            id
            name
            notes
            size
            updated
            created
            fieldsCount
            productFeatures
            jdoc {
                id
                atfarmUserId
                jdocFarmId
                atfarmFarmId
                jdocOrgId
                createdAt
                updatedAt
                syncedFields {
                    id
                    atfarmFieldId
                    jdocFieldId
                    syncedFarmId
                    createdAt
                    updatedAt
                    syncedFarm {
                        id
                        atfarmUserId
                        jdocFarmId
                        atfarmFarmId
                        jdocOrgId
                        createdAt
                        updatedAt
                        syncedFields {
                            id
                            atfarmFieldId
                            jdocFieldId
                            syncedFarmId
                            createdAt
                            updatedAt
                        }
                    }
                }
            }
            fields {
                cropType
                polarisCountryCodeId
                polarisCropRegionId
                featureId
                name
                farmId
                area
                boundingBox
                countryCode
                updated
                created
                supportedProductFeatures
                isFieldAutoDetected
                productFeatures
                id
            }
        }
        jdocUserSettings {
            id
            biomassUpdateInterval
            createdAt
            updatedAt
        }
        subscriptions {
            id
            farmId
            fieldId
            userId
            clientId
            startedAt
            endsAt
            canceledAt
            productSKU
            price
            currency
            isCancelable
            promoCode
            expired
            orderNumber
            name
            level
        }
    }
}
`,
  /**
   * GraphQL mutation to delete Jdoc user token.
   * @type {string}
   */
  deleteJdocUserToken: `
    mutation DeleteJdocUserToken {
    deleteJdocUserToken {
        id
        accessToken
        refreshToken
        expiresAt
        scope
        sub
        atfarmUserId
        atfarmUserSub
        createdAt
        updatedAt
    }
}

  `,
};
