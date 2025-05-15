export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      hasOnboard?: boolean
    }
    firstName?: string
  }
}