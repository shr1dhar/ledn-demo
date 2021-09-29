import * as mongoose from 'mongoose'

interface IAccount {
  _id: string
  firstName: string
  lastName: string
  country: string
  email: string
  dob: Date
  mfa: string
  amt: number
  createdDate: Date
  referredBy: string
}

const AccountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  country: String,
  email: { type: String, unique: true },
  dob: Date,
  mfa: String,
  amt: Number,
  createdDate: Date,
  referredBy: String,
})

// Add single field index to be able to sort quickly
AccountSchema.index({ amt: 1 })
AccountSchema.index({ createdDate: 1 })

// Add compound text index to filter on multiple fields
AccountSchema.index({ country: 'text', mfa: 'text', firstName: 'text', lastName: 'text' })

const AccountModel = mongoose.model('accounts', AccountSchema)

export { AccountModel, IAccount }
