import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { STATUS, DOCUMENT_TYPES } from "../config/constants";
import { randomUUID } from "../helpers";

export interface IKycDocument extends Document {
  dateOfBirth?: Date;
  gender?: "Male" | "Female" | "Other";
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  occupation?: string;
  status: string;
  reason?: string;
  adminId?: mongoose.Types.ObjectId;
  documentType: string;
  images: { name: string }[];
  documents: { name: string }[];
}

const kycSchema: Schema<IKycDocument> = new Schema(
  {
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String },
    occupation: { type: String },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    reason: { type: String, trim: true, minlength: 5, maxlength: 500 },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    documentType: {
      type: String,
      enum: Object.values(DOCUMENT_TYPES),
      required: true,
    },
    images: [{ name: { type: String, required: true } }],
    documents: [{ name: { type: String, required: true } }],
  },
  { timestamps: true }
);

export interface IUserDocument extends Document {
  uuid?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  referralId?: mongoose.Types.ObjectId;
  password: string;
  termsAndConditions: boolean;
  investmentLevel?: string | null;
  investmentSubLevel?: string | null;
  kyc?: IKycDocument;
  profitBalance: number;
  referralCreditBalance: number;
  depositBalance: number;
  rewardBalance: number;
  isActive: boolean;
  alertNotifications: boolean;
  emailNotifications: boolean;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    uuid: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      required: [true, "Country Code is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    referralId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    termsAndConditions: {
      type: Boolean,
      required: [true, "Please Accept Our Terms And Conditions."],
    },
    investmentLevel: {
      type: String,
      required: false,
      default: null,
    },
    investmentSubLevel: {
      type: String,
      required: false,
      default: null,
    },
    kyc: { type: kycSchema },
    profitBalance: { type: Number, default: 0, min: 0 },
    referralCreditBalance: { type: Number, default: 0, min: 0 },
    depositBalance: { type: Number, default: 0, min: 0 },
    rewardBalance: { type: Number, required: false, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    alertNotifications: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.virtual("id").get(function (this: IUserDocument) {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.uuid = randomUUID();
    return next();
  } catch (error) {
    // return next(error);
  }
});

userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getJWTToken = function (this: IUserDocument) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.setResetPasswordToken = function (this: IUserDocument) {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
  return resetToken;
};

const User: Model<IUserDocument> = mongoose.model("User", userSchema);

export default User;
